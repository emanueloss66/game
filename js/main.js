// ================= ESTADO GLOBAL =================
const STATE = {
  mode: null, // 'historia' | 'ia' | 'vs'
  nickname: '',
  p1Char: null,
  p2Char: null,
  storyQueue: [],   // ids restantes no modo história
  storyBeaten: [],
  roundWins: { p1: 0, p2: 0 },
  settings: {
    volume: 50,
    roundTime: 60,
    difficulty: 'normal',
  },
  pendingPick: 'p1', // para tela de seleção em modo VS
};

const CHAR_IDS = Object.keys(GAME_DATA.characters);

// ================= NAVEGAÇÃO DE TELAS =================
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
  document.getElementById('screen-' + id).classList.remove('hidden');
  if (id === 'nickname') {
    const input = document.getElementById('nickname-input');
    input.value = STATE.nickname || localStorage.getItem('luvasDeOuro_nickname') || '';
    document.getElementById('nickname-hint').textContent = '';
    setTimeout(() => input.focus(), 50);
  }
  // Música: uma trilha de ação toca durante a luta; todas as outras telas
  // (menu, seleção, história, resultado, opções, sobre...) usam a trilha
  // calma de menu. Trocar só quando muda de fato evita reiniciar a música
  // toda vez que showScreen('battle') é chamado de novo entre rounds.
  if (id === 'battle') { Music.startBattle(); }
  else { Music.startMenu(); }
  navFocusIndex = 0;
  setTimeout(applyNavFocus, 30);
}

document.querySelectorAll('[data-goto]').forEach(btn => {
  btn.addEventListener('click', () => {
    SFX.select();
    showScreen(btn.dataset.goto);
  });
});

document.querySelectorAll('.mode-card').forEach(btn => {
  btn.addEventListener('click', () => {
    SFX.confirm();
    STATE.mode = btn.dataset.mode;
    openCharSelect();
  });
});

// ================= NICKNAME =================
function confirmNickname() {
  const input = document.getElementById('nickname-input');
  const value = input.value.trim();
  if (!value) {
    document.getElementById('nickname-hint').textContent = 'Digite um nickname para continuar.';
    input.focus();
    return;
  }
  STATE.nickname = value;
  try { localStorage.setItem('luvasDeOuro_nickname', value); } catch (e) {}
  SFX.confirm();
  showScreen('mode');
}
document.getElementById('btn-nickname-confirm').addEventListener('click', confirmNickname);
document.getElementById('nickname-input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') confirmNickname();
});

// ================= SELEÇÃO DE PERSONAGEM =================
function openCharSelect() {
  STATE.p1Char = null;
  STATE.p2Char = null;
  STATE.pendingPick = 'p1';
  const grid = document.getElementById('char-grid');
  grid.innerHTML = '';
  CHAR_IDS.forEach(id => {
    const def = GAME_DATA.characters[id];
    const card = document.createElement('div');
    card.className = 'char-card';
    card.dataset.id = id;
    card.title = def.name;
    // O retrato e o nome já vêm desenhados na arte de fundo (bg_select_*.jpg);
    // este card fica só como área clicável invisível + contorno ao selecionar.
    card.addEventListener('click', () => pickCharacter(id, card));
    grid.appendChild(card);
  });
  updateSelectStatus();

  // sprite de fundo diferente para a seleção de personagem em cada modo de jogo
  const artFrame = document.getElementById('select-art-frame');
  artFrame.style.backgroundImage = `url('game/assets/ui/screens/bg_select_${STATE.mode}.jpg')`;

  // botão de dificuldade da IA só aparece no modo VS IA
  const diffPicker = document.getElementById('difficulty-picker');
  if (STATE.mode === 'ia') {
    diffPicker.classList.remove('hidden');
    updateDifficultyButtons();
  } else {
    diffPicker.classList.add('hidden');
  }

  showScreen('select');
}

// ================= DIFICULDADE DA IA (botão, modo VS IA) =================
function updateDifficultyButtons() {
  document.querySelectorAll('.diff-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.diff === STATE.settings.difficulty);
  });
}
document.querySelectorAll('.diff-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    SFX.select();
    STATE.settings.difficulty = btn.dataset.diff;
    updateDifficultyButtons();
  });
});

function updateSelectStatus() {
  const status = document.getElementById('select-status');
  if (STATE.mode === 'vs') {
    if (!STATE.p1Char) status.textContent = 'Jogador 1: escolha seu lutador';
    else if (!STATE.p2Char) status.textContent = 'Jogador 2: escolha seu lutador';
    else status.textContent = 'Prontos!';
  } else {
    status.textContent = STATE.p1Char ? 'Pronto!' : 'Escolha seu lutador';
  }
}

function pickCharacter(id, cardEl) {
  SFX.select();
  if (STATE.mode === 'vs') {
    if (!STATE.p1Char) {
      STATE.p1Char = id;
      cardEl.classList.add('picked-p1');
    } else if (!STATE.p2Char) {
      // Espelho permitido: o Jogador 2 pode escolher o mesmo lutador do
      // Jogador 1 e competir contra uma cópia dele mesmo.
      STATE.p2Char = id;
      cardEl.classList.add('picked-p2');
    }
    updateSelectStatus();
    if (STATE.p1Char && STATE.p2Char) {
      setTimeout(() => startBattleFlow(), 400);
    }
  } else {
    STATE.p1Char = id;
    document.querySelectorAll('.char-card').forEach(c => c.classList.remove('picked-p1'));
    cardEl.classList.add('picked-p1');
    updateSelectStatus();
    setTimeout(() => {
      if (STATE.mode === 'historia') {
        const storyDef = GAME_DATA.characters[STATE.p1Char].story;
        STATE.storyQueue = storyDef.sequence.slice();
        STATE.storyBeaten = [];
        STATE.storyFirst = true;
        STATE.storyTotal = storyDef.sequence.length;
        STATE.storyIndex = 0;
        nextStoryFight();
      } else {
        // IA: escolhe oponente aleatório diferente do jogador
        const options = CHAR_IDS.filter(c => c !== STATE.p1Char);
        STATE.p2Char = options[Math.floor(Math.random() * options.length)];
        startBattleFlow();
      }
    }, 400);
  }
}

document.getElementById('btn-random').addEventListener('click', () => {
  const remaining = CHAR_IDS.filter(id => id !== STATE.p1Char);
  const pool = (STATE.mode === 'vs' && STATE.p1Char) ? remaining : CHAR_IDS;
  const pick = pool[Math.floor(Math.random() * pool.length)];
  const card = document.querySelector(`.char-card[data-id="${pick}"]`);
  pickCharacter(pick, card);
});

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// ================= MODO HISTÓRIA: TELA DE PRÓXIMO DESAFIANTE =================
function nextStoryFight() {
  if (STATE.storyQueue.length === 0) {
    showFinalVictory();
    return;
  }
  const step = STATE.storyQueue.shift();
  STATE.storyIndex = (STATE.storyIndex || 0) + 1;
  STATE.p2Char = step.opponent;
  const p1 = GAME_DATA.characters[STATE.p1Char];
  const p2 = GAME_DATA.characters[STATE.p2Char];

  document.getElementById('vs-title').textContent = `MODO HISTÓRIA — ${p1.name.toUpperCase()}`;
  document.getElementById('vs-card-p1').innerHTML = `<img src="${p1.portrait}"><div class="vc-name" style="color:${p1.color}">${p1.name}</div>`;
  document.getElementById('vs-card-p2').innerHTML = `<img src="${p2.portrait}"><div class="vc-name" style="color:${p2.color}">${p2.name}</div>`;

  let html = '';
  if (STATE.storyFirst) {
    html += `<p class="story-intro">${p1.story.intro}</p>`;
    STATE.storyFirst = false;
  }
  html += `<h3 class="story-chapter">${step.chapter}</h3><p class="story-text">${step.text}</p>`;
  document.getElementById('story-narrative').innerHTML = html;

  showScreen('vs');
}
document.getElementById('btn-fight').addEventListener('click', () => {
  SFX.confirm();
  startBattleFlow();
});

function setRematchLabel(text) {
  document.getElementById('btn-rematch-label').textContent = text;
}

// Guarda, entre sessões, quais personagens já tiveram o modo história
// completado — usado para desbloquear o epílogo secreto "A Sétima Coroa"
// depois que o jogador terminar a jornada dos 6 lutadores.
function markStoryCompleted(id) {
  let list = [];
  try { list = JSON.parse(localStorage.getItem('luvasDeOuro_storyCompleted') || '[]'); } catch (e) {}
  if (!list.includes(id)) list.push(id);
  try { localStorage.setItem('luvasDeOuro_storyCompleted', JSON.stringify(list)); } catch (e) {}
  return list;
}
function allStoryCompleted() {
  let list = [];
  try { list = JSON.parse(localStorage.getItem('luvasDeOuro_storyCompleted') || '[]'); } catch (e) {}
  return CHAR_IDS.every(c => list.includes(c));
}

function showFinalVictory() {
  const p1 = GAME_DATA.characters[STATE.p1Char];
  document.getElementById('results-title').textContent = 'VOCÊ É O CAMPEÃO!';
  document.getElementById('results-desc').textContent = p1.story.ending;
  markStoryCompleted(STATE.p1Char);

  if (allStoryCompleted()) {
    setRematchLabel('CONTINUAR');
    document.getElementById('btn-rematch').onclick = () => { showEpilogue(); };
  } else {
    setRematchLabel('JOGAR NOVAMENTE');
    document.getElementById('btn-rematch').onclick = () => { openCharSelect(); };
  }
  showScreen('results');
}

// ================= EPÍLOGO SECRETO: "A SÉTIMA COROA" =================
function showEpilogue() {
  const body = document.getElementById('epilogue-body');
  const surnames = {
    ryu: 'TAKAMURA', thunder: 'WASHINGTON', ivan: 'PETROV',
    luna: 'FERREIRA', eltoro: 'MORALES', leonie: 'ADLER',
  };
  body.innerHTML = '';
  let delay = 300;
  CHAR_IDS.forEach((id) => {
    const line = document.createElement('div');
    line.className = 'file-active';
    line.textContent = `${surnames[id]} ......... ATIVO`;
    line.style.opacity = '0';
    body.appendChild(line);
    setTimeout(() => { line.style.opacity = '1'; }, delay);
    delay += 260;
  });
  setTimeout(() => {
    const gap = document.createElement('div');
    gap.textContent = ' ';
    body.appendChild(gap);
    const line2 = document.createElement('div');
    line2.className = 'file-new';
    line2.textContent = 'PROJETO ÍMPETO — FASE 2';
    line2.style.opacity = '0';
    body.appendChild(line2);
    setTimeout(() => { line2.style.opacity = '1'; }, 200);
  }, delay + 200);
  delay += 700;
  setTimeout(() => {
    const line3 = document.createElement('div');
    line3.className = 'file-new';
    line3.textContent = 'STATUS: INICIADO.';
    line3.style.opacity = '0';
    body.appendChild(line3);
    setTimeout(() => { line3.style.opacity = '1'; }, 200);
    const line4 = document.createElement('div');
    line4.style.marginTop = '18px';
    line4.style.color = '#8fffb0';
    line4.textContent = 'A jornada dos seis continua... "A Sétima Coroa" — em breve.';
    line4.style.opacity = '0';
    body.appendChild(line4);
    setTimeout(() => { line4.style.opacity = '1'; }, 500);
  }, delay + 200);
  showScreen('epilogue');
}

// ================= BATALHA =================
let canvas, ctx, stage, p1, p2, rafId;
let battleActive = false;
let roundTimeLeft = 60;
let roundTimerAcc = 0;
let roundOver = false;
let matchOver = false;

canvas = document.getElementById('game-canvas');
ctx = canvas.getContext('2d');

// Caixa do timer agora é desenhada dentro do próprio canvas (junto com o
// cenário e os lutadores), em vez de ser um <div> HTML flutuando por cima
// de tudo. Isso resolve o problema de o timer sempre "vencer" visualmente
// o lutador quando ele caminha até o centro do ringue: como agora ele é
// desenhado ANTES dos lutadores (ver render()), o personagem passa por
// cima do timer, e não o contrário. O visual (dourado, cantos cortados)
// segue o mesmo padrão usado nos botões do resto do jogo (.pixel-btn).
function drawTimer(ctx, canvasW, canvasH) {
  const size = Math.max(46, Math.min(74, canvasH * 0.09));
  const cut = size * 0.16;
  const x = canvasW / 2 - size / 2;
  const y = canvasH * 0.30;

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x + cut, y);
  ctx.lineTo(x + size - cut, y);
  ctx.lineTo(x + size, y + cut);
  ctx.lineTo(x + size, y + size - cut);
  ctx.lineTo(x + size - cut, y + size);
  ctx.lineTo(x + cut, y + size);
  ctx.lineTo(x, y + size - cut);
  ctx.lineTo(x, y + cut);
  ctx.closePath();

  const grad = ctx.createLinearGradient(x, y, x, y + size);
  grad.addColorStop(0, '#232a3a');
  grad.addColorStop(1, '#12151f');
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.lineWidth = Math.max(2, size * 0.055);
  ctx.strokeStyle = '#d98a1c';
  ctx.stroke();
  ctx.lineWidth = Math.max(1, size * 0.02);
  ctx.strokeStyle = 'rgba(255,210,120,0.55)';
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `bold ${Math.round(size * 0.42)}px "Courier New", monospace`;
  ctx.fillStyle = '#ffd76b';
  ctx.strokeStyle = 'rgba(0,0,0,0.85)';
  ctx.lineWidth = 3;
  const label = String(roundTimeLeft);
  ctx.strokeText(label, x + size / 2, y + size / 2 + 1);
  ctx.fillText(label, x + size / 2, y + size / 2 + 1);
  ctx.restore();
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function startBattleFlow() {
  STATE.roundWins = { p1: 0, p2: 0 };
  showScreen('battle');
  setupRound();
}

function setupRound() {
  stage = new Stage();
  const groundX1 = canvas.width * 0.32;
  const groundX2 = canvas.width * 0.68;
  p1 = new Fighter(STATE.p1Char, groundX1, 1, CONTROLS.p1, false);
  p2 = new Fighter(STATE.p2Char, groundX2, -1, CONTROLS.p2, STATE.mode !== 'vs');
  applyDifficulty(p2);

  document.getElementById('p1-name').textContent = GAME_DATA.characters[STATE.p1Char].name;
  document.getElementById('p2-name').textContent = GAME_DATA.characters[STATE.p2Char].name;
  document.getElementById('p1-name').style.color = GAME_DATA.characters[STATE.p1Char].color;
  document.getElementById('p2-name').style.color = GAME_DATA.characters[STATE.p2Char].color;

  renderPips();
  roundTimeLeft = STATE.settings.roundTime;
  roundTimerAcc = 0;
  roundOver = false;
  matchOver = false;
  updateHUD();
  showRoundBanner(`ROUND ${STATE.roundWins.p1 + STATE.roundWins.p2 + 1}`, () => {
    SFX.roundStart();
  });

  if (!battleActive) {
    battleActive = true;
    lastTime = performance.now();
    rafId = requestAnimationFrame(loop);
  }
}

function renderPips() {
  const need = 2; // melhor de 3 -> precisa de 2 vitórias
  const p1Pips = document.getElementById('p1-pips');
  const p2Pips = document.getElementById('p2-pips');
  p1Pips.innerHTML = ''; p2Pips.innerHTML = '';
  for (let i = 0; i < need; i++) {
    const img1 = document.createElement('img');
    img1.src = i < STATE.roundWins.p1 ? 'game/assets/ui/round_pip_full.png' : 'game/assets/ui/round_pip_empty.png';
    p1Pips.appendChild(img1);
    const img2 = document.createElement('img');
    img2.src = i < STATE.roundWins.p2 ? 'game/assets/ui/round_pip_full.png' : 'game/assets/ui/round_pip_empty.png';
    p2Pips.appendChild(img2);
  }
}

function applyDifficulty(cpuFighter) {
  const d = STATE.settings.difficulty;
  if (d === 'facil') { cpuFighter.speed *= 0.8; }
  if (d === 'dificil') { cpuFighter.speed *= 1.15; cpuFighter.attackDamagePunch += 2; }

  // Modo história: cada adversário da sequência é um pouco mais forte que
  // o anterior, para a campanha ficar progressivamente mais difícil em vez
  // de todos os lutadores terem sempre a mesma força.
  if (STATE.mode === 'historia') {
    const step = Math.max(0, (STATE.storyIndex || 1) - 1); // 0 no 1º combate, 1 no 2º, ...
    cpuFighter.speed *= 1 + step * 0.05;
    cpuFighter.attackDamagePunch += Math.floor(step / 2);
    cpuFighter.attackDamageUppercut += Math.floor(step / 2);
    cpuFighter.reactionBoost = step * 0.06; // deixa a IA reagir/bloquear mais
  }
}

function showRoundBanner(text, cb) {
  const banner = document.getElementById('round-banner');
  banner.textContent = text;
  banner.classList.remove('hidden');
  banner.style.animation = 'none';
  void banner.offsetWidth;
  banner.style.animation = 'bannerPop 0.4s ease';
  if (cb) cb();
  setTimeout(() => banner.classList.add('hidden'), 1100);
}

let lastTime = 0;
let paused = false;

function loop(now) {
  if (!battleActive) return;
  const dt = Math.min(now - lastTime, 50);
  lastTime = now;

  if (!paused) {
    update(dt);
  }
  render();
  Input.update();
  rafId = requestAnimationFrame(loop);
}

function update(dt) {
  stage.update(dt);

  if (!roundOver) {
    const arena = { left: canvas.width * 0.08, right: canvas.width * 0.92 };
    p1.groundY = canvas.height * 0.90;
    p2.groundY = canvas.height * 0.90;
    p1.update(dt, p2, arena);
    p2.update(dt, p1, arena);

    // timer
    roundTimerAcc += dt;
    if (roundTimerAcc >= 1000) {
      roundTimerAcc -= 1000;
      roundTimeLeft = Math.max(0, roundTimeLeft - 1);
    }

    updateHUD();

    if (p1.finished || p2.finished) {
      // Se os dois terminaram no mesmo frame (duplo KO), o round empata
      // em vez de dar a vitória automaticamente para o p2.
      let roundWinner;
      if (p1.finished && p2.finished) roundWinner = 'draw';
      else roundWinner = p1.finished ? 'p2' : 'p1';
      endRound(roundWinner);
    } else if (roundTimeLeft <= 0) {
      const winner = p1.health === p2.health ? 'draw' : (p1.health > p2.health ? 'p1' : 'p2');
      endRound(winner);
    }
  }
}

function updateHUD() {
  const p1pct = Math.max(0, p1.health / p1.maxHealth * 100);
  const p2pct = Math.max(0, p2.health / p2.maxHealth * 100);
  const p1fill = document.getElementById('p1-hp');
  const p2fill = document.getElementById('p2-hp');
  p1fill.style.width = p1pct + '%';
  p2fill.style.width = p2pct + '%';
  p1fill.style.background = healthColor(p1pct);
  p2fill.style.background = healthColor(p2pct);
}
function healthColor(pct) {
  if (pct > 50) return 'linear-gradient(180deg, #7CFC90 0%, #2e9e4a 100%)';
  if (pct > 20) return 'linear-gradient(180deg, #ffe066 0%, #c79a1e 100%)';
  return 'linear-gradient(180deg, #ff6a6a 0%, #a01e1e 100%)';
}

function endRound(winner) {
  roundOver = true;
  if (winner === 'p1') { STATE.roundWins.p1++; SFX.ko(); }
  else if (winner === 'p2') { STATE.roundWins.p2++; SFX.ko(); }
  else if (winner === 'draw') { SFX.ko(); }
  renderPips();

  const need = 2;
  setTimeout(() => {
    if (STATE.roundWins.p1 >= need || STATE.roundWins.p2 >= need) {
      finishMatch(STATE.roundWins.p1 >= need ? 'p1' : 'p2');
    } else {
      showScreen('battle');
      setupRoundContinue();
    }
  }, 1200);

  showRoundBanner(winner === 'draw' ? 'EMPATE!' : (winner === 'p1' ? `${p1.name} VENCEU O ROUND!` : `${p2.name} VENCEU O ROUND!`));
}

function setupRoundContinue() {
  // reinicia posições e vida mantendo placar de rounds
  const groundX1 = canvas.width * 0.32;
  const groundX2 = canvas.width * 0.68;
  p1.x = groundX1; p1.health = p1.maxHealth; p1.finished = false; p1.locked = false; p1.setState('idle', true);
  p2.x = groundX2; p2.health = p2.maxHealth; p2.finished = false; p2.locked = false; p2.setState('idle', true);
  roundTimeLeft = STATE.settings.roundTime;
  roundTimerAcc = 0;
  roundOver = false;
  updateHUD();
  showRoundBanner(`ROUND ${STATE.roundWins.p1 + STATE.roundWins.p2 + 1}`, () => SFX.roundStart());
}

// Pontos concedidos ao jogador (P1) por vitória, conforme o modo/dificuldade
const WIN_POINTS = { facil: 1, normal: 2, dificil: 3 };

function finishMatch(winner) {
  matchOver = true;
  battleActive = false;
  cancelAnimationFrame(rafId);

  const playerWon = winner === 'p1';

  if (playerWon && STATE.nickname) {
    let points = 0;
    if (STATE.mode === 'ia') points = WIN_POINTS[STATE.settings.difficulty] || 2;
    else if (STATE.mode === 'historia') points = 2;
    if (points > 0) {
      Ranking.addWin(STATE.nickname, points).then(() => {
        // atualiza o placar assim que o servidor confirmar os pontos
      });
    }
  }

  if (STATE.mode === 'historia') {
    if (playerWon) {
      document.getElementById('results-title').textContent = 'VOCÊ VENCEU!';
      document.getElementById('results-desc').textContent = `${p1.name} derrotou ${p2.name}! Prepare-se para o próximo desafiante.`;
      setRematchLabel('CONTINUAR');
      document.getElementById('btn-rematch').onclick = () => { nextStoryFight(); };
    } else {
      document.getElementById('results-title').textContent = 'VOCÊ PERDEU...';
      document.getElementById('results-desc').textContent = `${p2.name} venceu a luta. Tente novamente!`;
      setRematchLabel('TENTAR NOVAMENTE');
      document.getElementById('btn-rematch').onclick = () => { startBattleFlow(); };
    }
  } else {
    const winnerName = playerWon ? p1.name : p2.name;
    document.getElementById('results-title').textContent = `${winnerName.toUpperCase()} VENCEU!`;
    document.getElementById('results-desc').textContent = 'Boa luta! Deseja jogar novamente?';
    setRematchLabel('REVANCHE');
    document.getElementById('btn-rematch').onclick = () => { startBattleFlow(); };
  }
  showScreen('results');
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stage.draw(ctx, canvas.width, canvas.height);
  stage.drawRanking(ctx, Ranking.getCached());
  drawTimer(ctx, canvas.width, canvas.height);
  const groundScreenY = canvas.height * 0.90;
  // desenha o lutador mais atrás primeiro (profundidade simples pela posição X)
  const order = p1.x < p2.x ? [p1, p2] : [p2, p1];
  order[0].draw(ctx, groundScreenY);
  order[1].draw(ctx, groundScreenY);
}

// ================= PAUSE =================
document.getElementById('btn-pause').addEventListener('click', () => {
  paused = true;
  document.getElementById('pause-menu').classList.remove('hidden');
});
document.getElementById('btn-resume').addEventListener('click', () => {
  paused = false;
  lastTime = performance.now();
  document.getElementById('pause-menu').classList.add('hidden');
});
document.getElementById('btn-quit').addEventListener('click', () => {
  paused = false;
  battleActive = false;
  cancelAnimationFrame(rafId);
  document.getElementById('pause-menu').classList.add('hidden');
  showScreen('main');
});
window.addEventListener('keydown', (e) => {
  if (e.code === 'Escape' && !document.getElementById('screen-battle').classList.contains('hidden')) {
    if (paused) document.getElementById('btn-resume').click();
    else document.getElementById('btn-pause').click();
  }
});

// ================= OPÇÕES =================
const optVolume = document.getElementById('opt-volume');
const optTime = document.getElementById('opt-time');
const optTimeVal = document.getElementById('opt-time-val');
optVolume.addEventListener('input', () => {
  STATE.settings.volume = parseInt(optVolume.value, 10);
  SFX.volume = STATE.settings.volume / 100;
  Music.setVolume(STATE.settings.volume / 100 * 0.65); // música fica um pouco abaixo dos efeitos
});
optTime.addEventListener('input', () => {
  STATE.settings.roundTime = parseInt(optTime.value, 10);
  optTimeVal.textContent = optTime.value;
});

// ================= REMAPEAMENTO DE TECLAS =================
const DEFAULT_CONTROLS = JSON.parse(JSON.stringify(CONTROLS)); // cópia dos controles originais, para "restaurar padrão"
let awaitingRebind = null; // { player: 'p1'|'p2', action: 'left'... } enquanto espera o usuário apertar uma tecla

function buildControlsGrid() {
  const gridEl = document.getElementById('controls-grid');
  gridEl.innerHTML = '';
  ['p1', 'p2'].forEach(player => {
    const col = document.createElement('div');
    col.className = 'controls-col';
    const title = document.createElement('strong');
    title.textContent = player === 'p1' ? 'Jogador 1' : 'Jogador 2';
    col.appendChild(title);
    CONTROL_ACTIONS.forEach(action => {
      const row = document.createElement('div');
      row.className = 'rebind-row';
      const label = document.createElement('span');
      label.className = 'rebind-label';
      label.textContent = action.label;
      const btn = document.createElement('button');
      btn.className = 'pixel-btn tiny rebind-key';
      btn.dataset.player = player;
      btn.dataset.action = action.key;
      btn.textContent = keyCodeToLabel(CONTROLS[player][action.key]);
      btn.addEventListener('click', () => startRebind(player, action.key, btn));
      row.appendChild(label);
      row.appendChild(btn);
      col.appendChild(row);
    });
    gridEl.appendChild(col);
  });
}

function startRebind(player, action, btnEl) {
  if (awaitingRebind) {
    // cancela um remapeamento anterior que ficou pendente
    const prevBtn = document.querySelector(`.rebind-key[data-player="${awaitingRebind.player}"][data-action="${awaitingRebind.action}"]`);
    if (prevBtn) prevBtn.classList.remove('listening');
  }
  awaitingRebind = { player, action };
  btnEl.classList.add('listening');
  btnEl.textContent = '...';
  document.getElementById('rebind-hint').textContent = 'Pressione a tecla desejada (ESC para cancelar).';
}

window.addEventListener('keydown', (e) => {
  if (!awaitingRebind) return;
  e.preventDefault();
  const { player, action } = awaitingRebind;
  const btnEl = document.querySelector(`.rebind-key[data-player="${player}"][data-action="${action}"]`);

  if (e.code === 'Escape') {
    // cancela e mantém a tecla anterior
    if (btnEl) {
      btnEl.classList.remove('listening');
      btnEl.textContent = keyCodeToLabel(CONTROLS[player][action]);
    }
    awaitingRebind = null;
    document.getElementById('rebind-hint').textContent = 'Clique em uma tecla e pressione a nova tecla desejada.';
    return;
  }

  // impede usar a mesma tecla 2x para o mesmo jogador
  const alreadyUsedBy = Object.keys(CONTROLS[player]).find(k => CONTROLS[player][k] === e.code && k !== action);
  if (alreadyUsedBy) {
    document.getElementById('rebind-hint').textContent = `Essa tecla já está em uso em "${CONTROL_ACTIONS.find(a => a.key === alreadyUsedBy).label}" para este jogador.`;
    return;
  }

  CONTROLS[player][action] = e.code;
  if (btnEl) {
    btnEl.classList.remove('listening');
    btnEl.textContent = keyCodeToLabel(e.code);
  }
  awaitingRebind = null;
  document.getElementById('rebind-hint').textContent = 'Clique em uma tecla e pressione a nova tecla desejada.';
  SFX.select();
});

document.getElementById('btn-reset-controls').addEventListener('click', () => {
  CONTROLS.p1 = { ...DEFAULT_CONTROLS.p1 };
  CONTROLS.p2 = { ...DEFAULT_CONTROLS.p2 };
  buildControlsGrid();
  SFX.select();
});

buildControlsGrid();

// ================= NAVEGAÇÃO POR TECLADO (setas + A confirma + B volta) =================
// Funciona em todas as telas de menu (não interfere na luta, que já usa as
// setas/WASD para mover o lutador, nem na tela de Opções, que usa as setas
// nativamente para os controles deslizantes).
const BACK_TARGET = {
  nickname: 'main',
  mode: 'main',
  select: 'mode',
  vs: 'select',
  options: 'main',
  about: 'main',
  results: 'main',
  epilogue: 'main',
};

let navFocusIndex = 0;

function getNavItems(screenEl) {
  return Array.from(screenEl.querySelectorAll(
    '.art-hotspot, .mode-card, .char-card, .diff-btn, .pixel-btn'
  )).filter(el => {
    if (el.closest('.hidden')) return false;
    const rect = el.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  });
}

function applyNavFocus() {
  const screenEl = document.querySelector('.screen:not(.hidden)');
  if (!screenEl || screenEl.id === 'screen-options' || screenEl.id === 'screen-battle') return;
  const items = getNavItems(screenEl);
  items.forEach(el => el.classList.remove('nav-focus'));
  if (items.length === 0) return;
  navFocusIndex = ((navFocusIndex % items.length) + items.length) % items.length;
  items[navFocusIndex].classList.add('nav-focus');
  items[navFocusIndex].scrollIntoView({ block: 'nearest', inline: 'nearest' });
}

document.addEventListener('keydown', (e) => {
  const screenEl = document.querySelector('.screen:not(.hidden)');
  if (!screenEl) return;
  const id = screenEl.id.replace('screen-', '');

  // Tela de opções: as setas controlam os sliders nativamente, então não mexemos.
  // Tela de luta: as setas/WASD movem o lutador (ver input.js).
  if (id === 'options' || id === 'battle') return;

  // Enquanto o campo de nickname está com foco, o teclado digita normalmente
  // (inclusive a letra "B" — várias pessoas têm "b" no nome!). A navegação
  // por atalho (B = voltar) só se aplica fora de campos de texto; para
  // voltar aqui, use o botão "Voltar" na tela ou o mouse/toque.
  if (document.activeElement && document.activeElement.tagName === 'INPUT') {
    return;
  }

  const items = getNavItems(screenEl);

  if (e.code === 'ArrowRight' || e.code === 'ArrowDown') {
    e.preventDefault();
    navFocusIndex++;
    applyNavFocus();
    SFX.select();
  } else if (e.code === 'ArrowLeft' || e.code === 'ArrowUp') {
    e.preventDefault();
    navFocusIndex--;
    applyNavFocus();
    SFX.select();
  } else if (e.code === 'KeyA' || e.code === 'Enter' || e.code === 'NumpadEnter') {
    e.preventDefault();
    if (items[navFocusIndex]) items[navFocusIndex].click();
  } else if (e.code === 'KeyB') {
    e.preventDefault();
    const back = BACK_TARGET[id];
    if (back) { SFX.select(); showScreen(back); }
  }
});

// ================= INIT =================
Input.init();
SFX.volume = STATE.settings.volume / 100;
Music.setVolume(STATE.settings.volume / 100 * 0.65);
showScreen('main');

// Ranking: busca o placar assim que o jogo abre e atualiza periodicamente,
// para o telão mostrar sempre os dados mais recentes do servidor.
Ranking.refresh();
setInterval(() => Ranking.refresh(), 20000);
