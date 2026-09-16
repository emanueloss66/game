// Efeitos sonoros sintetizados via Web Audio API (sem precisar de arquivos de áudio)
const SFX = {
  ctx: null,
  enabled: true,
  volume: 0.5,

  _ensure() {
    if (!this.ctx) {
      try { this.ctx = new (window.AudioContext || window.webkitAudioContext)(); }
      catch (e) { this.enabled = false; }
    }
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
  },

  _tone(freq, dur, type, vol) {
    if (!this.enabled) return;
    this._ensure();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.value = vol * this.volume;
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    const now = this.ctx.currentTime;
    gain.gain.setValueAtTime(vol * this.volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + dur);
    osc.start(now);
    osc.stop(now + dur);
  },

  // Golpes, blocos, pulos e "grunhidos" de dano aceitam um multiplicador de
  // pitch (e, no caso do hit, um timbre) para que cada personagem tenha uma
  // sonoridade própria (ver "sfx" em data.js e Fighter.sfxProfile).
  punch(pitchMul = 1) { this._tone(180 * pitchMul, 0.08, 'square', 0.5); },
  hit(pitchMul = 1, tone = 'sawtooth') { this._tone(90 * pitchMul, 0.15, tone, 0.6); },
  block(pitchMul = 1) { this._tone(300 * pitchMul, 0.06, 'triangle', 0.4); },
  jump(pitchMul = 1) { this._tone(500 * pitchMul, 0.1, 'sine', 0.3); },
  select() { this._tone(660, 0.07, 'square', 0.35); },
  confirm() { this._tone(880, 0.12, 'square', 0.45); },
  ko() {
    if (!this.enabled) return;
    this._ensure();
    if (!this.ctx) return;
    [440, 349, 261].forEach((f, i) => {
      setTimeout(() => this._tone(f, 0.3, 'sawtooth', 0.5), i * 180);
    });
  },
  roundStart() { this._tone(523, 0.15, 'square', 0.4); },
};
