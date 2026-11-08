/* Views registry + shared view helpers + Main Homepage */
JB.views = {};
JB.vh = {
  head(o){
    return `<header class="vhead frame-dark">
      <div class="vhead-copy">${o.ribbon ? `<span class="ribbon">${o.ribbon}${o.ribbonEn ? ` <small>${o.ribbonEn}</small>` : ''}</span>` : ''}
        <h1 class="h-title">${o.title}<span class="en-sub">${o.en}</span></h1>
        ${o.lead ? `<p class="lead">${o.lead}</p>` : ''}${o.extra || ''}</div>
      <div class="vhead-art"><img src="${JB.asset(o.img)}" alt="${o.alt || ''}"></div></header>`;
  },
  missionSteps(cur){
    const S = JB.store.S;
    const items = [['academy','書齋'],['m1','詞彙'],['m2','配對'],['m3','線索'],['m4','宣判']];
    return `<div class="steps4" aria-label="主線進度">${items.map(([k,l]) => {
      const done = S[k].done, open = JB.store.unlocked(k);
      return `<span class="${k === cur ? 'on' : done ? 'done' : ''}">${done ? JB.ICON('check') : open ? '' : JB.ICON('lock')}${l}</span>`; }).join('')}</div>`;
  },
  stars(n){ return `<span class="stars" aria-label="難度 ${n} 星">${[1,2,3].map(i => JB.ICON('star', i <= n ? '' : 'dim')).join('')}</span>`; },
  opts(Q, sel, act, extra){
    const answered = sel !== undefined && sel !== null;
    const long = Q.opts.some(o => o.length > 24);
    return `<div class="opts ${long ? 'long' : ''}">${Q.opts.map((o,i) => {
      let cls = ''; if(answered){ if(i === Q.a) cls = 'right'; else if(i === sel) cls = 'wrong'; }
      return `<button type="button" class="opt ${cls}" data-act="${act}" data-i="${i}" ${extra||''} ${answered ? 'disabled' : ''}><span class="L">${'ABCD'[i]}</span><span>${o}</span></button>`;
    }).join('')}</div>`;
  },
  fb(ok, ex, plus, pts){
    return `<div class="fb ${ok ? 'ok' : 'no'}" aria-live="polite"><b>${ok ? `回答正確！${pts ? ` +${pts} 分` : ''}` : '再看一次證據。'}</b>${ex}${plus ? `<span class="plus">${plus}</span>` : ''}</div>`;
  },
  award(el, pts, kind){ if(pts){ JB.ui.float(el, (pts > 0 ? '+' : '') + pts, kind); JB.audio.sfx(pts > 0 ? 'coin' : 'bad'); } },
  justUnlocked(id){ JB.store.S.seen['unlock-' + id] = true; JB.ui.unlock(id); JB.store.log('lock', `解鎖「${JB.UNLOCK_NAME[id]}」`); }
};

JB.views.home = {
  render(el){
    const S = JB.store.S, st = JB.store, I = JB.ICON, ui = JB.ui;
    const sc = st.scores(), L = st.level(sc.total), stage = st.stage();
    const started = S.seen.briefing;
    const C = JB.CHARACTERS;
    const guide = () => {
      if(!started) return ui.dialog('wang', 'report', '我是王朝，負責回報進度！大人已經升堂了。按下「升堂辦案」，先到金融書齋跟公孫先生學 9 個核心觀念，再闖四大任務。', 'Tap “Start the Mission” to begin.', {cls:'dlg-in'});
      if(S.m4.done) return ui.dialog('wang', 'completed', `全案已結！你的得分是 ${sc.total} 分。到榮譽殿堂看成績報告，或挑戰進階卷宗的五件案子。`, 'Case closed! Check your report in the Hall of Honor.', {cls:'dlg-in'});
      const nx = JB.store.nextHash().slice(1);
      return ui.dialog('wang', stage >= 2 ? 'cheer' : 'organize', `報告大人：目前完成 ${stage} / 4 關，得分 ${sc.total}。下一站是「${JB.UNLOCK_NAME[nx] || '成績報告'}」，按「繼續辦案」就會直接帶你過去！`, 'Tap “Continue the Mission” to go to your next stop.', {cls:'dlg-in'});
    };
    const actor = (id, src) => `<a class="actor ${id}" href="#gallery-${id}" aria-label="${C[id].name} ${C[id].title}，查看角色圖鑑">
        <img src="${src}" alt="${C[id].name}"><span class="vtag">${C[id].name}<small>${C[id].title}</small></span>${id === 'bao' ? '' : `<span class="np">${C[id].en}</span>`}</a>`;
    const cast = actor('wang', JB.body('wang')) + actor('gongsun', JB.body('gongsun')) + actor('zhan', JB.body('zhan')) + actor('bao', JB.asset(JB.ASSETS.characters.bao.hero));
    const tasks = [
      ['學習金融書齋 9 個觀念', st.cnt(S.academy.learned), 9],
      ['完成單字任務 12 字', st.cnt(S.m1.learned), 12],
      ['完成配對挑戰 2 回合', S.m2.rounds.filter(r => r && r.done).length, 2],
      ['找出關鍵線索 8 條', S.m3.ans.filter(Boolean).length, 8],
      ['大堂宣判', S.m4.done ? 1 : 0, 1]
    ];
    const missions = JB.MISSIONS.map(m => {
      const open = st.unlocked(m.id), done = S[m.id].done, now = open && !done;
      const fresh = open && !S.seen['tile-' + m.id] && m.id !== 'm1' ? 'just-unlocked' : '';
      if(open) S.seen['tile-' + m.id] = true;
      return `<a class="mtile frame ${open ? '' : 'locked'} ${fresh}" href="#${m.id}" ${open ? '' : `aria-disabled="true" title="完成${JB.UNLOCK_NAME[m.needs]}後解鎖"`}>
        <span class="state ${done ? 'done' : now ? 'now' : ''}">${done ? '已完成' : now ? '進行中' : '未解鎖'}</span>
        <span class="art"><img src="${JB.asset(m.img)}" alt="">${open ? '' : `<span class="lockico">${I('lock')}</span>`}</span>
        <span class="cap"><b>${m.n}. ${m.zh}</b><i>${m.en}</i><span>${m.desc}</span></span></a>`;
    }).join('');
    const kicons = JB.ACADEMY.map((a,i) => `<button type="button" class="kicon" data-k="${i}"><img src="${JB.asset(JB.ASSETS.icons[a.icon])}" alt=""><b>${a.word}</b><span>${a.zh}</span></button>`).join('');
    const map = [['learn','#academy','課程學習：金融書齋'],['missions','#mission','任務挑戰：主線任務'],['tools','#tools','金融工具：試算實驗'],['casestudy','#cases','案例分析：進階卷宗'],['game','#tools','模擬投資：資產配置沙盤'],['ranking','#honor','成就與排名']];
    el.innerHTML = `
      <section class="court-hero">
        <div class="home-title">
          <h1>包青天 2.1<i>Justice Bao 2.1</i></h1>
          <p class="academy"><b>開封府金融偵探學院</b><span>The Financial Detective Academy</span></p>
          <p class="tag">正義辦案，也解人生難題！</p>
        </div>
        <div class="court" aria-label="開封府大堂：包青天與公孫策、展昭、王朝">
          <span class="sun" aria-hidden="true"></span>
          ${cast}
          <div class="desk" aria-hidden="true"><span class="desk-gavel"></span><span class="desk-tube"></span><span class="desk-top"></span><span class="desk-cloth"><span class="plaque"><b>明鏡高懸</b><small>Justice Bao · Chief Judge</small></span></span></div>
        </div>
        <div class="court-cta">
          <button type="button" class="btn btn-red btn-lg" data-act="start">${JB.ICON('gavel')} ${started ? '繼續辦案' : '升堂辦案'}<small>${started ? 'Continue the Mission' : 'Start the Mission'}</small></button>
          <a class="btn btn-ghost" href="#gallery">${JB.ICON('users')} 認識四位角色</a>
        </div>
      </section>
      <div class="home-guide">${guide()}</div>
      <section class="home-info">
        <article class="story-card frame">
          <span class="ribbon">本次任務 <small>Mission</small></span>
          <h2>人生<em>資產</em>懸案</h2><p class="en">The Mystery of Your Life Assets</p>
          <p class="body">投資新手阿明帶著 50 萬元進場，一年後只剩 31 萬。是市場波動？投資判斷錯誤？還是風險管理出了問題？</p>
          <p class="body">加入開封府金融偵探小組，運用英文與投資知識，蒐集線索、分析證據，向包大人提出你的判斷。</p>
          <div class="case-stats" aria-label="阿明的帳戶">
            <div><span>期初本金<i>Start</i></span><b>500,000</b></div>
            <div><span>一年後<i>Now</i></span><b>310,000</b></div>
            <div class="bad"><span>帳戶報酬<i>Return</i></span><b>−38%</b></div>
            <div class="good"><span>同期大盤<i>Market</i></span><b>+8%</b></div>
          </div>
          <ol class="howto"><li>金融書齋：公孫策教你 9 個核心觀念</li><li>四大任務：詞彙、配對、線索、宣判</li><li>包大人開堂，給你最終判決與成績報告</li></ol>
          <p class="tagline">用宋代的智慧，打造現代的人生勝算！</p>
        </article>
        <aside class="side frame">
          <h3>偵探進度<small>Your Progress</small></h3>
          <div class="kv"><span>${ui.esc(S.player.name || '見習偵探')}</span><b>關卡 ${stage} / 4</b></div>
          <div class="prog4" aria-label="四階段進度">${[1,2,3,4].map(n => `${n > 1 ? `<i class="${stage >= n ? 'on' : ''}"></i>` : ''}<b class="${stage >= n ? 'on' : ''}">${stage >= n ? I('check') : (st.unlocked('m' + n) ? n : I('lock'))}</b>`).join('')}</div>
          <div class="score-big">${I('star')}<span class="num">${sc.total}</span></div>
          <div class="lvl-line"><div class="row between"><span>Lv.${L.n} ${L.zh}<span class="muted"> ${L.en}</span></span><span class="num muted">${L.next ? `${sc.total}/${L.next}` : 'MAX'}</span></div><div class="bar"><span style="width:${Math.round(L.pct*100)}%"></span></div></div>
          <div class="kv"><span>獲得徽章</span><a href="#honor" class="muted" style="font-size:12.5px">全部成就 →</a></div>
          <div class="badges">${JB.ACHIEVEMENTS.map(a => `<span title="${a.zh}：${S.ach[a.id] ? '已獲得' : a.desc}">${ui.badge(a, !!S.ach[a.id])}</span>`).join('')}</div>
          <div class="kv"><b style="font-family:var(--f-display);font-weight:900">今日任務</b><span class="muted" style="font-size:12.5px">Today</span></div>
          <ul class="tasks">${tasks.map(([t,n,m]) => `<li class="${n >= m ? 'done' : ''}"><i>${n >= m ? I('check') : ''}</i><span>${t}</span><b>${Math.min(n,m)}/${m}</b></li>`).join('')}</ul>
        </aside>
      </section>
      <section class="missions" aria-label="四大任務">${missions}</section>
      <section class="learn-strip frame">
        <span class="lbl">你將學會<small>What You'll Learn</small></span>
        <div class="kicons">${kicons}</div>
        <button type="button" class="btn btn-red btn-lg start-btn" data-act="start">${started ? '繼續辦案' : '開始辦案'}<small>${started ? 'Continue the Mission' : 'Start the Mission'}</small></button>
      </section>
      <section aria-label="學院地圖"><div class="row between" style="margin-bottom:10px"><span class="ribbon">學院地圖 <small>Academy Map</small></span></div>
        <div class="map-grid">${map.map(([k,h,t]) => `<a class="map-tile" href="${h}" ${k === 'game' ? 'data-tooltab="portfolio"' : k === 'tools' ? 'data-tooltab="compound"' : ''}><img src="${JB.asset(JB.ASSETS.scenes[k])}" alt=""><span>${t}</span></a>`).join('')}</div></section>
      <p class="disclaimer">教學聲明：本互動教材僅用於英文與金融基礎知識教育，不構成個別投資建議。股票價格可能上漲或下跌；任何策略都無法保證獲利。</p>`;
    el.onclick = e => {
      const k = e.target.closest('.kicon');
      if(k){ JB.store.S.academy.idx = +k.dataset.k; JB.store.save(); JB.app.go('#academy'); return; }
      const t = e.target.closest('[data-tooltab]'); if(t) JB.toolTab = t.dataset.tooltab;
      const m = e.target.closest('.mtile.locked'); if(m){ e.preventDefault(); JB.audio.sfx('bad'); ui.toast(`${I('lock')} ${m.getAttribute('title')}`, 'bad'); }
    };
    JB.store.save();
  }
};
