/* App shell: router, HUD, global actions, settings / help / leaderboard / glossary modals */
(function(){
  const ui = JB.ui, store = JB.store, I = JB.ICON, $ = id => document.getElementById(id);
  const NAV = [
    {h:'#home', k:'home', zh:'首頁', ico:'home'},
    {h:'#gallery', k:'gallery', zh:'角色圖鑑', ico:'users'},
    {h:'#academy', k:'academy', zh:'金融書齋', ico:'book'},
    {h:'#mission', k:'mission', zh:'任務', ico:'scroll'},
    {h:'#cases', k:'cases', zh:'進階卷宗', ico:'seal'},
    {h:'#tools', k:'tools', zh:'金融工具', ico:'chart'},
    {h:'#honor', k:'honor', zh:'榮譽殿堂', ico:'trophy'}
  ];
  const BG = {home:'court', gallery:'honor', academy:'study', m1:'court', m2:'trading', m3:'investigation', m4:'judgment', report:'honor', honor:'honor', tools:'trading', cases:'investigation'};
  let current = null, currentBg = null, sceneFlip = 0;

  /* ---------- HUD ---------- */
  function hud(){
    document.querySelector('.hud').innerHTML = `<div class="wrap hud-row">
      <a class="brand" href="#home" aria-label="包青天 2.1 首頁"><span class="brand-seal">包</span><span class="brand-t"><b>包青天 2.1<i>Justice Bao 2.1</i></b><span>The Financial Detective Academy</span></span></a>
      <div class="hud-stats">
        <span class="chip" title="目前得分">${I('star')}<b id="hud-score">0</b></span>
        <span class="chip lvl" title="偵探等級" id="hud-lvl"></span>
        <span class="chip" title="任務進度">${I('scroll')}<b id="hud-stage">0/4</b></span>
      </div>
      <div class="hud-tools">
        <button type="button" class="tool opt-tool" data-act="leaderboard" data-tip="排行榜" aria-label="排行榜">${I('trophy')}</button>
        <button type="button" class="tool opt-tool" data-act="glossary" data-tip="詞彙筆記" aria-label="詞彙筆記">${I('book')}</button>
        <button type="button" class="tool opt-tool" data-act="help" data-tip="說明" aria-label="遊戲說明">${I('help')}</button>
        <button type="button" class="tool opt-tool" data-act="settings" data-tip="設定" aria-label="設定">${I('gear')}</button>
        <button type="button" class="tool snd" data-act="toggle-sound" id="t-sound" data-tip="音效" aria-label="音效開關"></button>
        <button type="button" class="tool opt-tool" data-act="toggle-music" id="t-music" data-tip="背景音樂〈${JB.ASSETS.audio.title}〉" aria-label="背景音樂開關">${I('music')}</button>
        <button type="button" class="tool menu-btn" data-act="drawer" aria-label="開啟選單">${I('menu')}</button>
      </div></div>
      <div class="hud-navrow"><div class="wrap"><nav class="hud-nav" aria-label="主選單">${NAV.map(n => `<a href="${n.h}" data-nav="${n.k}">${I(n.ico)}<span>${n.zh}</span></a>`).join('')}</nav></div></div>`;
  }
  function refreshHud(){
    const sc = store.scores(), L = store.level(sc.total), S = store.S;
    $('hud-score').textContent = sc.total;
    $('hud-lvl').innerHTML = `Lv.${L.n} ${L.zh}`;
    $('hud-stage').textContent = store.stage() + '/4';
    const snd = $('t-sound'); snd.innerHTML = I(S.settings.sound ? 'sound' : 'mute'); snd.classList.toggle('off', !S.settings.sound);
    $('t-music').classList.toggle('off', !S.settings.music);
    document.querySelectorAll('[data-nav]').forEach(a => {
      const k = a.dataset.nav;
      a.classList.toggle('on', k === navKey(current));
      a.classList.toggle('locked', k === 'cases' && !store.unlocked('cases'));
    });
    const motion = S.settings.motion;
    document.documentElement.classList.toggle('reduce-motion', motion === 'reduce');
    document.documentElement.classList.toggle('motion-full', motion === 'full');
  }
  function navKey(v){ if(!v) return ''; if(/^m[1-4]$|^report$/.test(v)) return 'mission'; return v; }

  /* ---------- scene backdrop ---------- */
  function setScene(key){
    if(key === currentBg) return; currentBg = key;
    const a = $('scene-a'), b = $('scene-b');
    const show = sceneFlip ? a : b, hide = sceneFlip ? b : a; sceneFlip = 1 - sceneFlip;
    show.style.backgroundImage = `url("${JB.asset(JB.ASSETS.backgrounds[key])}")`;
    show.classList.add('on'); hide.classList.remove('on');
  }

  /* ---------- router ---------- */
  function parse(){
    const h = (location.hash || '#home').slice(1);
    if(h === 'mission') return {v:store.nextHash().slice(1)};
    let m;
    if((m = h.match(/^gallery(?:-(bao|gongsun|zhan|wang))?$/))) return {v:'gallery', p:m[1]};
    if((m = h.match(/^case-([1-5])$/))) return {v:'cases', p:'case-' + m[1]};
    if(h === 'grand-trial') return {v:'cases', p:'grand-trial'};
    if(JB.views[h]) return {v:h};
    return {v:'home'};
  }
  function route(){
    let {v, p} = parse();
    if(!store.unlocked(v)){
      const need = {m1:'academy', m2:'m1', m3:'m2', m4:'m3', report:'m4', cases:'academy'}[v];
      ui.toast(`${I('lock')} 請先完成「${JB.UNLOCK_NAME[need] || need}」`, 'bad');
      JB.audio.sfx('bad');
      history.replaceState(null, '', '#home'); v = 'home'; p = null;
    }
    const view = JB.views[v];
    const main = $('view');
    const draw = () => {
      current = v; document.body.dataset.view = v; ui.hideToast();
      setScene(view.bg ? view.bg(p) : BG[v] || 'court');
      const sec = document.createElement('div'); sec.className = 'view wrap';
      main.replaceChildren(sec);
      try{ view.render(sec, p); }catch(e){ console.error(e); sec.innerHTML = `<div class="frame pad"><h2 class="h-title">頁面載入失敗</h2><p>請重新整理頁面。錯誤：${ui.esc(e.message)}</p><div class="row"><a class="btn btn-red" href="#home">回首頁</a></div></div>`; }
      refreshHud();
      drainAchievements();
    };
    const old = main.firstElementChild;
    if(old && !document.documentElement.classList.contains('reduce-motion')){ old.classList.add('leaving'); setTimeout(draw, 160); } else draw();
    window.scrollTo(0, 0);
  }
  function rerender(){ const y = scrollY; const {v, p} = parse(); if(v !== current) return route(); const sec = $('view').firstElementChild; if(!sec) return route(); sec.style.animation = 'none'; JB.views[v].render(sec, p); refreshHud(); drainAchievements(); scrollTo(0, y); }
  function drainAchievements(){ store.takeAchievements().forEach(a => ui.achievement(a)); }
  store.onChange(() => { refreshHud(); setTimeout(drainAchievements, 400); });
  JB.app = {route, rerender, refreshHud, go(h){ if(location.hash === h) route(); else location.hash = h; }};

  /* ---------- global actions ---------- */
  document.addEventListener('click', e => {
    JB.audio.unlock();
    const t = e.target.closest('[data-act]'); if(!t) return;
    const S = store.S;
    switch(t.dataset.act){
      case 'say': JB.audio.speak(t.dataset.text, () => ui.toast('此瀏覽器不支援英文語音播放，請改看音標與例句。', 'bad')); break;
      case 'toggle-sound': S.settings.sound = !S.settings.sound; store.save(); if(S.settings.sound) JB.audio.sfx('click'); ui.toast(S.settings.sound ? '音效已開啟' : '音效已關閉'); break;
      case 'toggle-music': S.settings.music = !S.settings.music; store.save(); S.settings.music ? JB.audio.startMusic() : JB.audio.stopMusic(); ui.toast(S.settings.music ? `${I('music')} 背景音樂已開啟：〈${JB.ASSETS.audio.title}〉` : '背景音樂已關閉'); break;
      case 'help': help(); break;
      case 'settings': settings(); break;
      case 'leaderboard': leaderboard(); break;
      case 'glossary': glossary(); break;
      case 'drawer': drawer(); break;
      case 'vocab-term': termCard(t.dataset.term); break;
      case 'start': start(); break;
    }
  });
  document.addEventListener('keydown', e => { if(e.key === 'Escape'){ ui.close(); const d = $('jb-drawer'); if(d) d.hidden = true; } });

  /* ---------- modals ---------- */
  function start(){
    const S = store.S;
    if(!S.seen.briefing) return briefing();
    JB.audio.sfx('click'); JB.app.go(store.nextHash());
  }
  function briefing(){
    JB.audio.sfx('gavel');
    ui.modal({title:'任務發布 Mission Briefing', wide:true,
      html:`<img class="briefing-art" src="${JB.asset(JB.ASSETS.scenes.briefing)}" alt="包青天手持任務卷軸">
        ${ui.dialog('bao','strict','本府接獲一樁「人生資產懸案」：投資新手阿明的 50 萬元，一年只剩 31 萬。是市場的錯，還是判斷的錯？','A rookie investor lost 38% of his money. Find out why.')}
        ${ui.dialog('wang','report','我來說明規則！先到書齋跟公孫先生學 9 個核心觀念，再完成四項任務：詞彙、配對、線索、大堂宣判。每一關都會解鎖下一關！','Learn first, then complete four missions.')}
        <div class="field-in"><label for="player-name">你的偵探大名（會寫在結案令上）</label><input type="text" id="player-name" maxlength="16" autocomplete="nickname" placeholder="例如：Aaron" value="${ui.esc(S().player.name||'')}"></div>`,
      actions:[{label:`${I('play')} 接下任務，前往書齋`, cls:'btn-red', onClick(m){
        const v = m.querySelector('#player-name').value.trim(); const s = store.S;
        s.player.name = v; s.seen.briefing = true; store.log('scroll', `${v || '見習偵探'} 接下「人生資產懸案」`); store.save();
        JB.app.go('#academy');
      }}]});
    function S(){ return store.S; }
  }
  function help(){
    ui.modal({title:'遊戲說明 How to Play', wide:true, html:`
      <img src="${JB.asset(JB.ASSETS.ui.poster)}" alt="包青天 2.1 主視覺海報" style="float:right;width:min(38%,210px);margin:0 0 8px 14px;box-shadow:0 0 0 2px var(--gold)">
      <h4>你的身分</h4><p>開封府金融偵探學院的見習偵探。在公孫策、展昭、王朝協助下，破解「人生資產懸案」，最後由包青天開堂判決。</p>
      <h4>主線流程（完成前一關才解鎖下一關）</h4>
      <ol><li><b>金融知識書齋</b>：公孫策逐張教你 9 個核心觀念（含 KK 音標、例句、發音），學完做 3 題小測驗。</li>
      <li><b>任務一 案件與詞彙</b>：讀阿明的案情，翻開 12 張單字卡，再接受王朝抽考 4 題。</li>
      <li><b>任務二 配對特訓</b>：英中配對兩回合，計時、連擊加分、配錯會解析。</li>
      <li><b>任務三 訊問與線索</b>：8 條英文線索，難度逐步提高；連續答對 3 題起每題 +5。</li>
      <li><b>任務四 斷案宣判</b>：在公堂上回答五大面向的問題，選出最有紀律的投資建議，獲得最終判決與成績報告。</li></ol>
      <h4>計分與等級</h4><p>主線滿分 ${JB.MAX_MAIN} 分；進階卷宗另有加分。等級：見習偵探 → 初級偵探 → 金融分析師 → 投資策略師 → 資本市場大師。最終判決依五大面向（金融知識、英文理解、邏輯推理、風險意識、決策判斷）平均：85 以上金牌金融偵探、70 以上優秀見習偵探、50 以上繼續修習，其餘重新調查。</p>
      <h4>音樂與音效</h4><p>背景音樂〈${JB.ASSETS.audio.title}〉在你第一次點擊畫面後開始播放，可用右上角 ♪ 按鈕開關，或在「設定」調整音量。朗讀英文時音樂會自動降低。答題、解鎖、成就另有提示音，可用喇叭按鈕關閉。</p>
      <h4>其他</h4><ul><li>進度自動儲存在這台裝置的瀏覽器；換裝置或清除瀏覽資料會重來。</li><li>點有底線的英文字可看解釋；喇叭按鈕播放美式發音。</li><li>本遊戲所有數字皆為教學示意，不構成投資建議。</li></ul>`,
      actions:[{label:'了解', cls:'btn-navy'}]});
  }
  function settings(){
    const S = store.S;
    const seg = (key, opts) => `<span class="seg" role="group">${opts.map(([v,l]) => `<button type="button" data-set="${key}" data-v="${v}" class="${String(S.settings[key]) === String(v) ? 'on' : ''}">${l}</button>`).join('')}</span>`;
    ui.modal({title:'設定 Settings', html:`
      <div class="field-in"><label for="set-name">偵探大名</label><input type="text" id="set-name" maxlength="16" value="${ui.esc(S.player.name||'')}"></div>
      <div class="set-row"><span>音效<small>答題、解鎖、成就的提示音</small></span>${seg('sound',[[true,'開'],[false,'關']])}</div>
      <div class="set-row"><span>背景音樂<small>〈${JB.ASSETS.audio.title}〉循環播放；朗讀英文時自動降低音量</small></span>${seg('music',[[true,'開'],[false,'關']])}</div>
      <div class="set-row"><label for="set-bgm">音樂音量<small>iPhone／iPad 的音量依裝置按鍵控制</small></label><span class="row" style="gap:8px;flex-wrap:nowrap"><input type="range" id="set-bgm" min="0" max="100" step="5" value="${Math.round((S.settings.bgmVol ?? .5)*100)}" style="accent-color:var(--verm);width:140px"><b class="num" id="set-bgm-v" style="min-width:3ch;text-align:right">${Math.round((S.settings.bgmVol ?? .5)*100)}</b></span></div>
      <div class="set-row"><span>英文語速<small>單字與例句的朗讀速度</small></span>${seg('rate',[[0.7,'慢'],[0.9,'中'],[1.05,'快']])}</div>
      <div class="set-row"><span>中文提示<small>英文段落下方顯示中文</small></span>${seg('zh',[[true,'顯示'],[false,'隱藏']])}</div>
      <div class="set-row"><span>動態效果<small>「自動」會跟隨系統的減少動態設定</small></span>${seg('motion',[['auto','自動'],['full','完整'],['reduce','減少']])}</div>
      <div class="set-row"><span>重新開始全案<small>清除所有任務進度、分數與成就（排行榜保留）</small></span><button type="button" class="btn btn-red btn-sm" id="set-reset">重置遊戲</button></div>
      <div class="set-row"><span>清除排行榜<small>刪除這台裝置上的歷次成績</small></span><button type="button" class="btn btn-ghost btn-sm" id="set-clear-lb">清除</button></div>`,
      actions:[{label:'儲存並關閉', cls:'btn-navy', onClick(m){ store.S.player.name = m.querySelector('#set-name').value.trim(); store.save(); rerender(); }}],
      onOpen(m){
        m.querySelectorAll('[data-set]').forEach(b => b.addEventListener('click', () => {
          const k = b.dataset.set; let v = b.dataset.v; v = v === 'true' ? true : v === 'false' ? false : isNaN(+v) ? v : +v;
          store.S.settings[k] = v; b.parentElement.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b));
          if(k === 'music') v ? JB.audio.startMusic() : JB.audio.stopMusic();
          if(k === 'motion') applyMotion();
          store.save();
        }));
        const vol = m.querySelector('#set-bgm');
        vol.addEventListener('input', () => { m.querySelector('#set-bgm-v').textContent = vol.value; JB.audio.setVolume(vol.value/100); });
        vol.addEventListener('change', () => store.save());
        m.querySelector('#set-reset').addEventListener('click', async () => {
          ui.close();
          if(await ui.confirm('確定重新開始全案？', '所有任務進度、分數、成就與進階卷宗紀錄都會清除，無法復原。排行榜會保留。', '清除並重來')){
            store.reset(); if(JB.CF) JB.CF.reset(); ui.toast('案件已重置，重新開始！'); JB.app.go('#home'); route();
          }
        });
        m.querySelector('#set-clear-lb').addEventListener('click', async () => {
          ui.close(); if(await ui.confirm('清除排行榜？', '這台裝置上的歷次成績都會刪除。', '清除')){ store.clearBoard(); ui.toast('排行榜已清除'); }
        });
      }});
  }
  function applyMotion(){
    const m = store.S.settings.motion, reduce = m === 'reduce' || (m === 'auto' && matchMedia('(prefers-reduced-motion: reduce)').matches);
    reduce ? ui.particles.stop() : ui.particles.start();
    refreshHud();
  }
  function leaderboard(){
    const rows = store.board();
    ui.modal({title:'排行榜 Leaderboard', wide:true, html: rows.length ? `
      <p>這台裝置上完成「斷案宣判」的歷次成績，依五大面向平均排序。</p>
      <div style="overflow-x:auto"><table class="lb"><thead><tr><th>#</th><th>偵探</th><th>判決等級</th><th class="n">面向平均</th><th class="n">主線得分</th><th>日期</th></tr></thead>
      <tbody>${rows.map((r,i) => `<tr><td class="n">${i+1}</td><td>${ui.esc(r.name)}</td><td>${r.rank}</td><td class="n">${r.pct}</td><td class="n">${r.score}</td><td>${new Date(r.date).toLocaleDateString('zh-TW')}</td></tr>`).join('')}</tbody></table></div>`
      : `<p>還沒有紀錄。完成任務四「斷案宣判」後，你的成績會出現在這裡。</p>`,
      actions:[{label:'前往榮譽殿堂', cls:'btn-gold', onClick(){ JB.app.go('#honor'); }},{label:'關閉', cls:'btn-navy'}]});
  }
  function glossary(){
    const S = store.S;
    const sec = (title, list, open, note) => `<h4>${title}</h4>${open ? list.map(v => `<div class="set-row"><span><b class="en">${v.word}</b> <span class="kk">${v.kk||''}</span><small>${v.zh} · ${ui.esc(v.def)}</small></span><button type="button" class="mini-say" data-act="say" data-text="${ui.esc(v.word)}" aria-label="播放 ${ui.esc(v.word)} 發音">${I('sound')}</button></div>`).join('') : `<p class="muted">${I('lock')} ${note}</p>`}`;
    let cf = '';
    if(JB.CF){ const t = JB.CF.terms(); cf = sec('進階卷宗詞彙', t, t.length, '打開進階卷宗後解鎖'); }
    ui.modal({title:'詞彙筆記 Glossary', wide:true, html:
      sec('金融書齋 · 9 個核心觀念', JB.ACADEMY, true) + sec('任務一 · 12 個股市單字', JB.VOCAB, S.academy.done, '完成金融書齋後解鎖') + cf,
      actions:[{label:'關閉', cls:'btn-navy'}]});
  }
  function termCard(k){
    const v = JB.VOCAB.find(x => x.word === k) || JB.ACADEMY.find(x => x.word === k); if(!v) return;
    ui.modal({title:`${v.word} <span class="kk" style="font-weight:400;font-size:17px">${v.kk}</span>`, html:`
      <p style="font-family:var(--f-display);font-weight:900;color:var(--verm);font-size:20px">${v.zh}</p>
      <p class="en" style="color:var(--ink)">${v.def}</p><p class="en" style="font-style:italic">${v.ex}</p><p>${v.exZh}</p>`,
      actions:[{label:`${I('sound')} 發音`, cls:'btn-gold', onClick(){ JB.audio.speak(v.word); return false; }},{label:'關閉', cls:'btn-navy'}]});
  }
  function drawer(){
    let d = $('jb-drawer');
    if(!d){ d = document.createElement('div'); d.id = 'jb-drawer'; d.className = 'drawer'; document.body.appendChild(d); d.addEventListener('click', e => { if(e.target === d || e.target.closest('a,button.dr')) d.hidden = true; }); }
    d.innerHTML = `<div class="drawer-panel" role="dialog" aria-label="選單">
      ${NAV.map(n => `<a href="${n.h}" class="${n.k === navKey(current) ? 'on' : ''}">${I(n.ico)}${n.zh}</a>`).join('')}
      <button type="button" class="dr" data-act="leaderboard">${I('trophy')}排行榜</button>
      <button type="button" class="dr" data-act="glossary">${I('book')}詞彙筆記</button>
      <button type="button" class="dr" data-act="help">${I('help')}遊戲說明</button>
      <button type="button" class="dr" data-act="settings">${I('gear')}設定</button>
      <button type="button" class="dr" data-act="toggle-music">${I('music')}背景音樂 ${store.S.settings.music ? '（開）' : '（關）'}</button></div>`;
    d.hidden = false;
  }

  /* ---------- boot ---------- */
  hud();
  addEventListener('hashchange', route);
  applyMotion();
  route();
  // background music: browsers allow sound only after the first tap/click, JB.audio retries on that gesture
  if(store.S.settings.music) JB.audio.startMusic();
})();
