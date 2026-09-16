// ============================================================================
// RANKING — placar dos jogadores que mais venceram contra a IA / no modo
// história. Tenta sempre usar o servidor (banco de dados SQLite, ranking.db)
// para que o placar seja o mesmo em qualquer computador que acesse o mesmo
// servidor. Se o servidor não estiver rodando (por exemplo, se o jogo foi
// aberto direto do arquivo index.html), usa o armazenamento local do
// navegador como alternativa, só para não travar o jogo.
// ============================================================================
const Ranking = (() => {
  const LOCAL_KEY = 'luvasDeOuro_ranking_local';
  let cache = [];       // último ranking conhecido (mostrado no telão)
  let usingServer = true;

  function readLocal() {
    try {
      return JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]');
    } catch (e) { return []; }
  }
  function writeLocal(list) {
    try { localStorage.setItem(LOCAL_KEY, JSON.stringify(list)); } catch (e) {}
  }
  function topFromLocal(limit = 5) {
    const list = readLocal();
    list.sort((a, b) => b.points - a.points);
    return list.slice(0, limit);
  }
  function addPointsLocal(nickname, points) {
    const list = readLocal();
    const row = list.find(r => r.nickname === nickname);
    if (row) row.points += points;
    else list.push({ nickname, points });
    writeLocal(list);
    return topFromLocal();
  }

  async function refresh() {
    try {
      const r = await fetch('/api/ranking', { cache: 'no-store' });
      if (!r.ok) throw new Error('status ' + r.status);
      const data = await r.json();
      cache = data.ranking || [];
      usingServer = true;
    } catch (e) {
      usingServer = false;
      cache = topFromLocal();
    }
    return cache;
  }

  async function addWin(nickname, points) {
    if (!nickname || points <= 0) return cache;
    try {
      const r = await fetch('/api/ranking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname, points }),
      });
      if (!r.ok) throw new Error('status ' + r.status);
      const data = await r.json();
      cache = data.ranking || [];
      usingServer = true;
    } catch (e) {
      usingServer = false;
      cache = addPointsLocal(nickname, points);
    }
    return cache;
  }

  function getCached() { return cache; }
  function isUsingServer() { return usingServer; }

  return { refresh, addWin, getCached, isUsingServer };
})();
