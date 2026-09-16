// Classe Fighter: controla estado, animação e física de um lutador
class Fighter {
  constructor(charId, x, facing, controls, isCPU) {
    const def = GAME_DATA.characters[charId];
    this.charId = charId;
    this.name = def.name;
    this.color = def.color;
    this.anims = def.anims;
    this.controls = controls;
    this.isCPU = isCPU;

    // imagens carregadas por nome de animação
    this.images = {};
    for (const animName in this.anims) {
      const img = new Image();
      img.src = this.anims[animName].file;
      this.images[animName] = img;
    }

    // posição / física
    this.x = x;
    this.groundY = 0; // definido pelo Stage
    this.y = 0;
    this.vy = 0;
    this.facing = facing; // 1 = direita, -1 = esquerda
    // Aumenta o personagem na tela para parecer mais perto da câmera.
    // Todos os frames de sprite têm 360px de altura, mas o desenho do
    // lutador dentro desse frame ocupa uma altura de pixels diferente em
    // cada animação e em cada personagem (uma pose de "socar" ou "andar"
    // naturalmente ocupa uma fração do quadro diferente da pose "parado").
    // "animScale" (calculado a partir da altura real do conteúdo de CADA
    // animação, medida pixel a pixel, e definido em data.js) corrige isso
    // pose a pose, para que dois lutadores parados fiquem do mesmo
    // tamanho, os dois andando fiquem do mesmo tamanho, os dois agachados
    // fiquem do mesmo tamanho, etc. — em vez de só igualar o "parado".
    this.baseScale = 1.65;
    this.animScale = def.animScale || {};
    // Sonoridade própria de cada lutador (golpe, dano, bloqueio, pulo) —
    // ver "sfx" em data.js: cada personagem tem um pitch/timbre diferente.
    this.sfxProfile = def.sfx || { pitch: 1, tone: 'sawtooth' };
    this.speed = 4.1; // velocidade de movimento (levemente mais rápida para uma caminhada mais fluida)
    this.jumpPower = -14;
    this.gravity = 0.7;
    this.grounded = true;

    // combate
    this.maxHealth = 100;
    this.health = 100;
    this.attackDamagePunch = 8;
    this.attackDamageUppercut = 12;
    this.blocking = false;
    this.hitCooldown = 0; // impede múltiplos hits do mesmo golpe
    this.wins = 0;

    // estado de animação
    this.state = 'idle'; // idle, walk, crouch, block, punch_horizontal, punch_vertical, hit_horizontal, hit_vertical, jump, ko
    this.frame = 0;
    this.frameTimer = 0;
    this.locked = false; // enquanto true, não aceita novos comandos (durante golpe/hit/ko)
    this.attackHasHit = false; // se o golpe atual já acertou (evita hit múltiplo)
    this.finished = false; // ko concluído

    // IA
    this.aiTimer = 0;
    this.aiState = 'approach';
  }

  setState(newState, force = false) {
    if (this.state === newState && !force) return;
    this.state = newState;
    this.frame = 0;
    this.frameTimer = 0;
    this.attackHasHit = false;
  }

  currentAnim() { return this.anims[this.state]; }

  // avança a animação; retorna true se terminou um ciclo não-looping
  updateAnimation(dt) {
    const anim = this.currentAnim();
    if (!anim) return false;
    const durations = anim.durations;
    this.frameTimer += dt;
    const frameDur = durations[this.frame] || 100;
    let finishedCycle = false;
    if (this.frameTimer >= frameDur) {
      this.frameTimer = 0;
      const loop = ['idle', 'walk'].includes(this.state);
      if (this.frame < anim.frameCount - 1) {
        this.frame++;
      } else {
        if (loop) {
          this.frame = 0;
        } else {
          finishedCycle = true; // fica no último frame até trocarmos de estado
        }
      }
    }
    return finishedCycle;
  }

  get isAttacking() {
    return this.state === 'punch_horizontal' || this.state === 'punch_vertical';
  }
  get isHit() {
    return this.state === 'hit_horizontal' || this.state === 'hit_vertical';
  }

  startAttack(type) {
    if (this.locked || this.finished) return;
    SFX.punch(this.sfxProfile.pitch);
    this.setState(type, true);
    this.locked = true;
  }

  takeHit(dmg, type) {
    if (this.finished) return;
    if (this.blocking) {
      this.health -= Math.max(1, Math.round(dmg * 0.15));
      // sem travar animação de dano ao bloquear, só um leve recuo
      this.x -= this.facing * 6;
    } else {
      this.health -= dmg;
      this.setState(type, true);
      this.locked = true;
      this.x -= this.facing * 10;
    }
    if (this.health <= 0) {
      this.health = 0;
      this.setState('ko', true);
      this.locked = true;
      this.finished = true;
    }
    SFX.hit(this.sfxProfile.pitch, this.sfxProfile.tone);
  }

  update(dt, opponent, arena) {
    if (this.hitCooldown > 0) this.hitCooldown -= dt;

    if (this.finished) {
      this.updateAnimation(dt);
      return;
    }

    const ctl = this.isCPU ? null : this.controls;
    let moveDir = 0;
    let wantJump = false, wantCrouch = false, wantBlock = false, wantPunch = false, wantUpper = false;

    if (this.isCPU) {
      this._runAI(dt, opponent);
      moveDir = this._aiMoveDir || 0;
      wantJump = this._aiJump || false;
      wantCrouch = this._aiCrouch || false;
      wantBlock = this._aiBlock || false;
      wantPunch = this._aiPunch || false;
      wantUpper = this._aiUpper || false;
    } else {
      if (Input.isDown(ctl.left)) moveDir = -1;
      if (Input.isDown(ctl.right)) moveDir = 1;
      wantJump = Input.wasPressed(ctl.up);
      wantCrouch = Input.isDown(ctl.down);
      wantBlock = Input.isDown(ctl.block);
      wantPunch = Input.wasPressed(ctl.punch);
      wantUpper = Input.wasPressed(ctl.uppercut);
    }

    // trocar direção que o lutador encara (sempre olha pro oponente se não estiver atacando/travado)
    if (!this.locked && opponent) {
      this.facing = opponent.x > this.x ? 1 : -1;
    }

    if (!this.locked) {
      if (wantPunch) { this.startAttack('punch_horizontal'); }
      else if (wantUpper) { this.startAttack('punch_vertical'); }
      else if (wantJump && this.grounded) {
        this.vy = this.jumpPower;
        this.grounded = false;
        this.setState('jump', true);
        SFX.jump(this.sfxProfile.pitch);
      } else if (!this.grounded) {
        this.setState('jump');
      } else if (wantBlock) {
        if (!this.blocking) SFX.block(this.sfxProfile.pitch);
        this.blocking = true;
        this.setState('block');
      } else if (wantCrouch) {
        this.blocking = false;
        this.setState('crouch');
      } else if (moveDir !== 0) {
        this.blocking = false;
        this.x += moveDir * this.speed * this.facing_move_sign(moveDir);
        this.setState('walk');
      } else {
        this.blocking = false;
        this.setState('idle');
      }
    }

    // física vertical (pulo)
    if (!this.grounded) {
      this.y += this.vy;
      this.vy += this.gravity;
      if (this.y >= 0) {
        this.y = 0;
        this.grounded = true;
      }
    }

    // limites da arena
    if (arena) {
      this.x = Math.max(arena.left, Math.min(arena.right, this.x));
    }

    const finishedCycle = this.updateAnimation(dt);
    if (finishedCycle) {
      if (this.isAttacking || this.isHit || this.state === 'ko') {
        this.locked = false;
        if (this.state !== 'ko') this.setState('idle', true);
      }
    }

    // detectar acerto de golpe (frame "ativo" = penúltimo frame da animação de ataque)
    if (this.isAttacking && !this.attackHasHit && opponent && !opponent.finished) {
      const anim = this.currentAnim();
      const activeFrame = Math.max(1, anim.frameCount - 2);
      if (this.frame >= activeFrame) {
        const dist = Math.abs(opponent.x - this.x);
        const facingCorrect = (opponent.x - this.x) * this.facing >= 0;
        if (dist < 150 && facingCorrect) {
          const dmg = this.state === 'punch_vertical' ? this.attackDamageUppercut : this.attackDamagePunch;
          const hitType = this.state === 'punch_vertical' ? 'hit_vertical' : 'hit_horizontal';
          opponent.takeHit(dmg, hitType);
          this.attackHasHit = true;
        }
      }
    }
  }

  // ao andar, moveDir é relativo ao teclado (-1 esquerda / 1 direita), independente do facing
  facing_move_sign() { return 1; }

  _runAI(dt, opponent) {
    if (!opponent) return;
    this.aiTimer -= dt;
    // Enquanto o timer não expira, mantemos a última decisão (mover/atacar/bloquear)
    // em vez de zerar tudo a cada frame - antes disso a IA só "agia" 1 frame a cada
    // 250-600ms e ficava parada o resto do tempo.
    if (this.aiTimer > 0) {
      this._aiJump = false; // pulo e ataques são ações de 1 frame, não devem repetir sozinhas
      this._aiPunch = false;
      this._aiUpper = false;
      return;
    }
    this.aiTimer = Math.max(90, (250 + Math.random() * 350) - (this.reactionBoost || 0) * 800);

    const dist = opponent.x - this.x;
    const absDist = Math.abs(dist);
    const rb = this.reactionBoost || 0; // 0 a ~0.3 conforme a história avança
    this._aiMoveDir = 0; this._aiJump = false; this._aiCrouch = false;
    this._aiBlock = false; this._aiPunch = false; this._aiUpper = false;

    if (absDist > 220) {
      this._aiMoveDir = dist > 0 ? 1 : -1;
      this.aiState = 'approach';
    } else if (absDist < 140) {
      const roll = Math.random();
      if (roll < 0.45 + rb * 0.4) this._aiPunch = true;
      else if (roll < 0.65 + rb * 0.55) this._aiUpper = true;
      else if (roll < 0.85 + rb * 0.15) this._aiBlock = true;
      else this._aiMoveDir = dist > 0 ? -1 : 1; // recua
    } else {
      const roll = Math.random();
      if (roll < 0.5) this._aiMoveDir = dist > 0 ? 1 : -1;
      else if (roll < 0.7 + rb * 0.2) this._aiBlock = true;
      else if (roll < 0.85) this._aiPunch = true;
    }
  }

  draw(ctx, groundScreenY) {
    const anim = this.currentAnim();
    const img = this.images[this.state];
    if (!img || !anim) return;
    const fw = anim.frameWidth, fh = anim.frameHeight;
    const sx = this.frame * fw;
    const scale = this.baseScale * (this.animScale[this.state] || 1);
    const drawW = fw * scale, drawH = fh * scale;
    const drawX = this.x - drawW / 2;
    const drawY = groundScreenY - drawH + this.y;

    ctx.save();
    if (this.facing === -1) {
      ctx.translate(this.x, 0);
      ctx.scale(-1, 1);
      ctx.translate(-this.x, 0);
    }
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(img, sx, 0, fw, fh, drawX, drawY, drawW, drawH);
    ctx.restore();
  }
}
