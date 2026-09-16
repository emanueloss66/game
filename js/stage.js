// Renderiza o cenário (ringue) como um único sprite estático.
class Stage {
  constructor() {
    // Usa somente o primeiro frame do cenário — sem alternância/flicker.
    const src = GAME_DATA.stage.frames[0];
    this.img = new Image();
    this.img.src = src;
    this.w = GAME_DATA.stage.width;
    this.h = GAME_DATA.stage.height;
  }

  update(dt) {
    // Cenário estático: nada para atualizar.
  }

  draw(ctx, canvasW, canvasH) {
    const img = this.img;
    if (!img || !img.complete) return;
    // cover: preenche o canvas mantendo proporção. Ancorado no TOPO (em vez
    // de centralizado) para nunca cortar o telão "RANKING"/luzes que ficam
    // perto do topo da arte — se sobrar recorte, ele fica só embaixo (chão).
    const scale = Math.max(canvasW / this.w, canvasH / this.h);
    const dw = this.w * scale, dh = this.h * scale;
    const dx = (canvasW - dw) / 2, dy = 0;
    ctx.drawImage(img, dx, dy, dw, dh);
    this._lastTransform = { scale, dx, dy };
  }

  // Desenha o placar (top 5) por cima do telão "RANKING" já desenhado no
  // fundo do ringue, usando as mesmas coordenadas de escala/posição do
  // fundo para o texto sempre cair certinho em cima de cada linha "1º..5º".
  drawRanking(ctx, ranking) {
    const t = this._lastTransform;
    if (!t) return;
    const { scale, dx, dy } = t;
    // posições das 5 linhas na imagem original (1536x1024)
    const rows = [146, 190, 236, 280, 328];
    const nameX = 685;
    const maxW = 210;
    ctx.save();
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.font = `${Math.round(30 * scale)}px "Courier New", monospace`;
    ctx.fillStyle = '#eaf2ff';
    ctx.strokeStyle = 'rgba(0,0,0,0.6)';
    ctx.lineWidth = Math.max(1, 3 * scale);
    for (let i = 0; i < 5; i++) {
      const entry = ranking && ranking[i];
      if (!entry) continue;
      const label = `${entry.nickname}  ${entry.points}pt${entry.points === 1 ? '' : 's'}`;
      const x = dx + nameX * scale;
      const y = dy + rows[i] * scale;
      ctx.strokeText(label, x, y, maxW * scale);
      ctx.fillText(label, x, y, maxW * scale);
    }
    ctx.restore();
  }
}
