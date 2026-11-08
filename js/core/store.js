/* Store: game state, persistence (localStorage), derived scoring, dimensions, achievements, log, leaderboard */
JB.store = (function(){
  const KEY = 'jb2-academy-v2', LB = 'jb2-leaderboard-v1';
  const listeners = [];
  const achQueue = [];
  function fresh(){
    return {v:2, created:Date.now(), player:{name:''},
      settings:{sound:true, music:true, bgmVol:0.5, bgmInit:true, zh:true, motion:'auto', rate:0.9},
      seen:{}, academy:{learned:{}, flipped:{}, quiz:[], done:false, idx:0},
      m1:{learned:{}, check:[], done:false},
      m2:{rounds:[], done:false},
      m3:{ans:[], done:false},
      m4:{phase:0, ans:{}, ra:null, tries:[], done:false},
      ach:{}, opened:{}, log:[], cf:null, recorded:false};
  }
  function merge(base, saved){
    for(const k in saved){
      if(saved[k] && typeof saved[k] === 'object' && !Array.isArray(saved[k]) && base[k] && typeof base[k] === 'object' && !Array.isArray(base[k])) merge(base[k], saved[k]);
      else base[k] = saved[k];
    }
    return base;
  }
  function load(){
    try{ const t = localStorage.getItem(KEY); if(t){ const o = JSON.parse(t); if(o && o.v === 2) return merge(fresh(), o); } }catch(e){}
    return fresh();
  }
  let S = load();
  // v2.1: the game now ships a real soundtrack — switch music on once for saves made before it existed
  if(!S.settings.bgmInit){ S.settings.music = true; S.settings.bgmVol = S.settings.bgmVol === undefined ? .5 : S.settings.bgmVol; S.settings.bgmInit = true; }
  let saving = false;
  function save(){
    if(saving) return; saving = true;
    ['m1','m2','m3','m4','report','cases'].forEach(k => { if(cond(k)) S.opened[k] = true; });
    try{ checkAchievements(); }catch(e){ console.warn(e); }
    try{ localStorage.setItem(KEY, JSON.stringify(S)); }catch(e){}
    saving = false;
    listeners.forEach(fn => { try{ fn(); }catch(e){ console.warn(e); } });
  }
  function onChange(fn){ listeners.push(fn); }
  function log(icon, text){
    S.log.unshift({t:Date.now(), i:icon, m:text});
    if(S.log.length > 60) S.log.length = 60;
  }

  /* ---------- derived scoring ---------- */
  const P = JB.PTS;
  const cnt = o => Object.keys(o||{}).filter(k => o[k]).length;
  function ptsAcademy(){ return cnt(S.academy.learned)*P.academyCard + S.academy.quiz.filter(a => a && a.ok).length*P.academyQ; }
  function ptsM1(){ return cnt(S.m1.learned)*P.vocabCard + S.m1.check.filter(a => a && a.ok).length*P.spotQ; }
  function ptsM2(){ return S.m2.rounds.reduce((s,r) => s + (r && r.done ? r.pts : 0), 0); }
  function m3Breakdown(){
    let streak = 0, base = 0, bonus = 0;
    JB.CLUES.forEach((q,i) => { const a = S.m3.ans[i]; if(!a) return; if(a.ok){ streak++; base += P.clue; if(streak >= 3) bonus += P.clueStreak; } else streak = 0; });
    return {base, bonus, total: base + bonus};
  }
  function ptsM3(){ return m3Breakdown().total; }
  function raFraction(){
    const r = S.m4.ra; if(!r) return null;
    const items = JB.TRIAL.questions[3].items; let ok = 0;
    items.forEach((it,i) => { if(!!r.picks[i] === it.risk) ok++; });
    return ok / items.length;
  }
  function decisionScore(){ const t = S.m4.tries; if(!t.length || t[t.length-1] !== JB.TRIAL.correct) return 0; return P.decision[Math.min(t.length-1, 2)]; }
  function ptsM4(){
    let s = 0; ['FK','EN','LR'].forEach(k => { if(S.m4.ans[k] && S.m4.ans[k].ok) s += P.trialQ; });
    const f = raFraction(); if(f !== null) s += Math.round(P.trialQ*f);
    return s + decisionScore();
  }
  function ptsCases(){ try{ return JB.CF ? JB.CF.totalScore() : 0; }catch(e){ return 0; } }
  function scores(){
    const o = {academy:ptsAcademy(), m1:ptsM1(), m2:ptsM2(), m3:ptsM3(), m4:ptsM4(), cases:ptsCases()};
    o.main = o.academy + o.m1 + o.m2 + o.m3 + o.m4; o.total = o.main + o.cases; return o;
  }
  function level(score){
    const s = score === undefined ? scores().total : score;
    let i = 0; JB.LEVELS.forEach((L,k) => { if(s >= L.min) i = k; });
    const L = JB.LEVELS[i], N = JB.LEVELS[i+1];
    return {n:i+1, ...L, next:N ? N.min : null, pct: N ? (s - L.min)/(N.min - L.min) : 1, score:s};
  }

  /* ---------- five dimensions ---------- */
  function dims(){
    const acc = {}; JB.DIMS.forEach(d => acc[d.k] = {w:0, v:0});
    const add = (k, w, v) => { acc[k].w += w; acc[k].v += w*v; };
    S.academy.quiz.forEach((a,i) => { if(a) JB.ACADEMY_QUIZ[i].dims.forEach(k => add(k,1,a.ok?1:0)); });
    S.m1.check.forEach((a,i) => { if(a) add('EN',1,a.ok?1:0); });
    const rs = S.m2.rounds.filter(r => r && r.done);
    if(rs.length){ const c = rs.length*6, w = rs.reduce((s,r) => s + r.wrong, 0); add('EN', 2, c/(c+w)); }
    S.m3.ans.forEach((a,i) => { if(a) JB.CLUES[i].dims.forEach(k => add(k,1,a.ok?1:0)); });
    if(S.m4.ans.FK) add('FK',1,S.m4.ans.FK.ok?1:0);
    if(S.m4.ans.EN) add('EN',1,S.m4.ans.EN.ok?1:0);
    if(S.m4.ans.LR) add('LR',2,S.m4.ans.LR.ok?1:0);
    const f = raFraction(); if(f !== null) add('RA',2,f);
    const t = S.m4.tries; if(t.length && t[t.length-1] === JB.TRIAL.correct) add('DM',3,[1,.5,0][Math.min(t.length-1,2)]);
    const out = {}; let sum = 0, n = 0;
    JB.DIMS.forEach(d => { const a = acc[d.k]; out[d.k] = a.w ? Math.round(a.v/a.w*100) : null; if(a.w){ sum += out[d.k]; n++; } });
    out.overall = n ? Math.round(sum/n) : null;
    return out;
  }
  function rank(pct){ return JB.RANKS.find(r => pct >= r.min); }

  /* ---------- unlocks ---------- */
  function unlocked(id){ return !!S.opened[id] || cond(id); }
  function cond(id){
    switch(id){
      case 'academy': case 'home': case 'gallery': case 'tools': case 'honor': return true;
      case 'm1': return S.academy.done;
      case 'm2': return S.m1.done;
      case 'm3': return S.m2.done;
      case 'm4': return S.m3.done;
      case 'report': return S.m4.done;
      case 'cases': return S.academy.done;
      default: return true;
    }
  }
  function stage(){ return ['m1','m2','m3','m4'].filter(k => S[k].done).length; }
  function nextHash(){
    if(!S.academy.done) return '#academy';
    for(const k of ['m1','m2','m3','m4']) if(!S[k].done) return '#' + k;
    return '#report';
  }

  /* ---------- achievements ---------- */
  function checkAchievements(){
    const c = {
      vocab: () => S.academy.done && cnt(S.m1.learned) === 12 && S.m1.check.filter(a => a && a.ok).length >= 3,
      detective: () => S.m2.done && S.m2.rounds.reduce((s,r) => s + (r ? r.wrong : 0), 0) <= 2,
      investigator: () => S.m3.ans.filter(a => a && a.ok).length >= 7,
      guardian: () => raFraction() === 1 || !!(JB.CF && JB.CF.guardian && JB.CF.guardian()),
      champion: () => S.m4.done && dims().overall >= 85,
      casemaster: () => !!(JB.CF && JB.CF.allDone && JB.CF.allDone())
    };
    JB.ACHIEVEMENTS.forEach(a => {
      if(!S.ach[a.id] && c[a.id] && c[a.id]()){ S.ach[a.id] = Date.now(); log('trophy', `獲得成就「${a.zh} ${a.en}」`); achQueue.push(a); }
    });
  }
  function takeAchievements(){ return achQueue.splice(0); }

  /* ---------- leaderboard (kept across resets) ---------- */
  function board(){ try{ return JSON.parse(localStorage.getItem(LB) || '[]'); }catch(e){ return []; } }
  function record(){
    const d = dims(), sc = scores(), r = rank(d.overall);
    const rows = board(); rows.push({name:S.player.name || '無名偵探', score:sc.main, pct:d.overall, rank:r.zh, date:Date.now()});
    rows.sort((a,b) => b.pct - a.pct || b.score - a.score);
    try{ localStorage.setItem(LB, JSON.stringify(rows.slice(0,20))); }catch(e){}
  }
  function clearBoard(){ try{ localStorage.removeItem(LB); }catch(e){} }

  function reset(){
    const keep = S.settings, name = S.player.name;
    S = fresh(); S.settings = keep; S.player.name = name; log('refresh','重新開始全案'); save();
  }
  function resetMission(id){
    const f = fresh(); S[id] = f[id];
    if(id === 'm4') S.recorded = false;
    log('refresh', `重新挑戰${JB.UNLOCK_NAME[id] || id}`); save();
  }
  return {get S(){ return S; }, save, onChange, log, scores, level, dims, rank, unlocked, stage, nextHash,
          m3Breakdown, raFraction, decisionScore, takeAchievements, board, record, clearBoard, reset, resetMission, cnt};
})();
