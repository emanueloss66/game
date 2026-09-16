// Gerenciador de input - captura teclado para os 2 jogadores
const Input = {
  keys: {},
  pressed: {}, // "just pressed this frame"
  _prevKeys: {},

  init() {
    window.addEventListener('keydown', (e) => {
      this.keys[e.code] = true;
      // evita rolar a página com setas/espaço
      if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space'].includes(e.code)) {
        e.preventDefault();
      }
    });
    window.addEventListener('keyup', (e) => {
      this.keys[e.code] = false;
    });
  },

  // deve ser chamado 1x por frame, no fim do loop, para calcular "justPressed"
  update() {
    this.pressed = {};
    for (const k in this.keys) {
      if (this.keys[k] && !this._prevKeys[k]) this.pressed[k] = true;
    }
    this._prevKeys = { ...this.keys };
  },

  isDown(code) { return !!this.keys[code]; },
  wasPressed(code) { return !!this.pressed[code]; },
};

// Mapeamento de controles (editável na tela de Opções)
const CONTROLS = {
  p1: {
    left: 'KeyA', right: 'KeyD', up: 'KeyW', down: 'KeyS',
    punch: 'KeyF', uppercut: 'KeyG', block: 'KeyH',
  },
  p2: {
    left: 'ArrowLeft', right: 'ArrowRight', up: 'ArrowUp', down: 'ArrowDown',
    punch: 'KeyK', uppercut: 'KeyL', block: 'Semicolon',
  },
};

// Ações disponíveis para remapeamento, na ordem em que aparecem na tela de Opções
const CONTROL_ACTIONS = [
  { key: 'left', label: 'Esquerda' },
  { key: 'right', label: 'Direita' },
  { key: 'up', label: 'Pular' },
  { key: 'down', label: 'Agachar' },
  { key: 'punch', label: 'Soco' },
  { key: 'uppercut', label: 'Uppercut' },
  { key: 'block', label: 'Bloquear' },
];

// Converte um "code" de teclado (ex: 'KeyA', 'ArrowLeft', 'Semicolon') em texto legível
function keyCodeToLabel(code) {
  if (!code) return '---';
  if (code.startsWith('Key')) return code.slice(3);
  if (code.startsWith('Digit')) return code.slice(5);
  const map = {
    ArrowLeft: '←', ArrowRight: '→', ArrowUp: '↑', ArrowDown: '↓',
    Space: 'ESPAÇO', Semicolon: ';', Quote: "'", Comma: ',', Period: '.',
    Slash: '/', ShiftLeft: 'SHIFT ESQ', ShiftRight: 'SHIFT DIR',
    ControlLeft: 'CTRL ESQ', ControlRight: 'CTRL DIR', Backslash: '\\',
    BracketLeft: '[', BracketRight: ']', Minus: '-', Equal: '=',
    Enter: 'ENTER', Tab: 'TAB', CapsLock: 'CAPS',
  };
  return map[code] || code;
}
