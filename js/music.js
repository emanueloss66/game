// Música de fundo, gerada proceduralmente via Web Audio API (sem precisar de
// arquivos .mp3/.ogg). Usa o MESMO AudioContext do SFX (SFX._ensure()), para
// que o desbloqueio de áudio pelo navegador (que exige um clique do usuário)
// libere as duas coisas de uma vez.
//
// Duas trilhas:
//  - "menu"   : um pad calmo em loop, para as telas de menu/seleção/história.
//  - "battle" : uma batida de ação (kick + baixo + hats), como uma torcida
//               de boxe hypada, tocando durante as partidas.
const Music = {
  ctx: null,
  enabled: true,
  volume: 0.32, // um pouco abaixo do SFX, pra não abafar os efeitos
  current: null, // 'menu' | 'battle' | null
  _timerId: null,
  _runId: 0, // invalida o loop de agendamento anterior ao trocar de música

  _ensure() {
    SFX._ensure();
    this.ctx = SFX.ctx;
    if (!this.ctx) this.enabled = false;
  },

  setVolume(v) { this.volume = Math.max(0, Math.min(1, v)); },

  stop() {
    this._runId++; // qualquer loop de agendamento antigo para de se re-agendar
    if (this._timerId) { clearTimeout(this._timerId); this._timerId = null; }
    this.current = null;
  },

  // ---------- "instrumentos" ----------
  _kick(time) {
    if (!this.ctx || !this.enabled) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, time);
    osc.frequency.exponentialRampToValueAtTime(45, time + 0.12);
    gain.gain.setValueAtTime(0.9 * this.volume, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.22);
    osc.connect(gain); gain.connect(this.ctx.destination);
    osc.start(time); osc.stop(time + 0.24);
  },

  _hat(time, vol) {
    if (!this.ctx || !this.enabled) return;
    const n = Math.max(1, Math.floor(this.ctx.sampleRate * 0.045));
    const buffer = this.ctx.createBuffer(1, n, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < n; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / n);
    const src = this.ctx.createBufferSource();
    src.buffer = buffer;
    const hp = this.ctx.createBiquadFilter();
    hp.type = 'highpass'; hp.frequency.value = 7000;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(vol * this.volume, time);
    src.connect(hp); hp.connect(gain); gain.connect(this.ctx.destination);
    src.start(time);
  },

  _bass(time, freq, dur) {
    if (!this.ctx || !this.enabled || !freq) return;
    const osc = this.ctx.createOscillator();
    const filt = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, time);
    filt.type = 'lowpass'; filt.frequency.value = 480;
    gain.gain.setValueAtTime(0.001, time);
    gain.gain.linearRampToValueAtTime(0.55 * this.volume, time + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, time + dur);
    osc.connect(filt); filt.connect(gain); gain.connect(this.ctx.destination);
    osc.start(time); osc.stop(time + dur + 0.03);
  },

  _stab(time, freq) {
    if (!this.ctx || !this.enabled) return;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc1.type = 'square'; osc2.type = 'sawtooth';
    osc1.frequency.value = freq; osc2.frequency.value = freq * 1.004;
    gain.gain.setValueAtTime(0.001, time);
    gain.gain.linearRampToValueAtTime(0.3 * this.volume, time + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.2);
    osc1.connect(gain); osc2.connect(gain); gain.connect(this.ctx.destination);
    osc1.start(time); osc1.stop(time + 0.22);
    osc2.start(time); osc2.stop(time + 0.22);
  },

  _pad(time, freq, dur) {
    if (!this.ctx || !this.enabled) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.001, time);
    gain.gain.linearRampToValueAtTime(0.13 * this.volume, time + 0.7);
    gain.gain.linearRampToValueAtTime(0.0001, time + dur);
    osc.connect(gain); gain.connect(this.ctx.destination);
    osc.start(time); osc.stop(time + dur + 0.05);
  },

  // ---------- trilhas ----------

  // Trilha de ação para a partida: batida de boxe hypada (kick no tempo,
  // hats no contratempo e uma linha de baixo curta em loop de 8 tempos).
  startBattle() {
    this._ensure();
    if (!this.ctx || this.current === 'battle') return;
    this.stop();
    this.current = 'battle';
    const myRun = this._runId;
    const bpm = 132;
    const beat = 60 / bpm;
    const bassPattern = [82.41, 82.41, 0, 82.41, 110.00, 0, 98.00, 0]; // E2 E2 - E2 A2 - G2 -
    let step = 0;
    let nextTime = this.ctx.currentTime + 0.05;
    const scheduleAhead = 0.22;

    const tick = () => {
      if (this._runId !== myRun) return; // música foi trocada/parada
      while (nextTime < this.ctx.currentTime + scheduleAhead) {
        const i = step % bassPattern.length;
        if (i % 2 === 0) this._kick(nextTime);
        this._hat(nextTime, i % 2 === 0 ? 0.10 : 0.20);
        if (bassPattern[i]) this._bass(nextTime, bassPattern[i], beat * 0.9);
        if (i === 0 && step % 32 === 0) this._stab(nextTime, 164.81); // acento a cada 4 compassos
        nextTime += beat / 2; // colcheias
        step++;
      }
      this._timerId = setTimeout(tick, 45);
    };
    tick();
  },

  // Trilha calma para menus/seleção/história: um pad de acordes em loop lento.
  startMenu() {
    this._ensure();
    if (!this.ctx || this.current === 'menu') return;
    this.stop();
    this.current = 'menu';
    const myRun = this._runId;
    const bpm = 92;
    const beat = 60 / bpm;
    const chords = [
      [220.00, 261.63, 329.63], // Am
      [196.00, 246.94, 293.66], // G
      [174.61, 220.00, 261.63], // F
      [196.00, 246.94, 293.66], // G
    ];
    let step = 0;
    let nextTime = this.ctx.currentTime + 0.05;
    const scheduleAhead = 0.3;

    const tick = () => {
      if (this._runId !== myRun) return;
      while (nextTime < this.ctx.currentTime + scheduleAhead) {
        if (step % 4 === 0) {
          const chord = chords[Math.floor(step / 4) % chords.length];
          chord.forEach(f => this._pad(nextTime, f, beat * 4));
        }
        nextTime += beat;
        step++;
      }
      this._timerId = setTimeout(tick, 90);
    };
    tick();
  },
};
