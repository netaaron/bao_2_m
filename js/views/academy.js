/* Financial Learning Academy: Gongsun teaches 9 core concepts one card at a time, then a 3-question check */
JB.views.academy = {
  render(el){
    const st = JB.store, S = st.S, A = S.academy, ui = JB.ui, I = JB.ICON, P = JB.PTS;
    const N = JB.ACADEMY.length;
    if(A.idx >= N || A.idx < 0) A.idx = 0;
    const T = JB.ACADEMY[A.idx];
    const nLearned = st.cnt(A.learned), allLearned = nLearned === N;
    const flipped = !!JB.academyFlip;
    JB.academyFlip = false;
    const face = A.done ? 'smile' : allLearned ? 'thinking' : A.learned[T.id] ? 'approve' : 'explain';
    const say = A.done ? ['書齋課程全部完成！任務一已為你解鎖，去看看阿明的案子吧。', 'Well done. Mission 1 is open.']
      : allLearned ? ['九個觀念都學會了。接下來三題小測驗，答完就能出發。', 'Three quick questions, then you are ready.']
      : [`第 ${A.idx+1} 張：「${T.zh}」。先看正面、聽發音，再翻到背面讀定義與例句。`, `Card ${A.idx+1}: ${T.word}. Flip the card to learn more.`];
    const card = `
      <div class="flip lcard ${flipped ? 'flipped' : ''}" id="lcard">
        <div class="flip-inner">
          <div class="face front frame" role="button" tabindex="0" data-flip="1" aria-label="翻面：${T.word}">
            <img class="ic" src="${JB.asset(JB.ASSETS.icons[T.icon])}" alt="">
            <p class="word">${T.word}</p>${T.full ? `<p class="full">${T.full}</p>` : ''}
            <p class="kkline"><span class="kk">KK ${T.kk}</span><span class="pos">${T.pos}</span>
              <button type="button" class="mini-say" data-act="say" data-text="${ui.esc(T.full ? T.word + '. ' + T.full : T.word)}" aria-label="播放 ${T.word} 發音">${I('sound')}</button></p>
            <p class="zh-big">${T.zh}</p>
            <p class="hint">${I('flip')} 點卡片翻面 Tap to flip</p>
          </div>
          <div class="face back frame">
            <div class="back-head"><b>${T.word} <span class="kk" style="font-size:16px;color:var(--ink-2)">${T.kk}</span></b><span>${T.zh}</span></div>
            <div class="field"><span>Definition</span><p class="en">${T.def}</p></div>
            ${T.formula ? `<div class="field"><span>Formula</span><p><span class="formula">${T.formula}</span></p></div>` : ''}
            <div class="field"><span>Example</span><p class="en ex">${T.ex} <button type="button" class="mini-say" data-act="say" data-text="${ui.esc(T.ex)}" aria-label="朗讀例句">${I('sound')}</button></p></div>
            <div class="field"><span>中文翻譯</span><p>${T.exZh}</p></div>
            <div class="field"><span>Related</span><p class="en" style="color:var(--verm-2)">${T.related}</p></div>
            <p class="note">${T.note}</p>
            <div class="actions">
              <button type="button" class="icon-txt" data-flip="1">${I('flip')} 翻回正面</button>
              ${A.learned[T.id] ? `<span class="fb ok" style="padding:6px 12px"><b style="display:inline">已學會 ✓</b></span>`
                : `<button type="button" class="btn btn-red" data-a="learn">${I('check')} 我學會了 +${P.academyCard}</button>`}
            </div>
          </div>
        </div>
      </div>`;
    const quiz = allLearned ? `
      <section class="frame pad q-card" id="aquiz">
        <div class="q-meta"><span class="ribbon">公孫策小測驗 <small>Quick Check</small></span><span class="q-tag">${A.quiz.filter(Boolean).length} / 3 · +${P.academyQ} each</span></div>
        ${JB.ACADEMY_QUIZ.map((Q,qi) => { const a = A.quiz[qi]; return `
          <div class="q-card" style="gap:10px"><p class="q-en">${qi+1}. ${Q.q} <button type="button" class="mini-say" data-act="say" data-text="${ui.esc(Q.q)}" aria-label="朗讀題目">${I('sound')}</button></p>
          ${ui.zhOn() ? `<p class="q-zh">${Q.zh}</p>` : ''}
          ${JB.vh.opts(Q, a ? a.sel : undefined, 'aq', `data-q="${qi}"`)}
          ${a ? JB.vh.fb(a.ok, Q.ex, '', a.ok ? P.academyQ : 0) : ''}</div>`; }).join('')}
        ${A.done ? `<div class="row end"><a class="btn btn-red" href="#m1">前往任務一：案件與詞彙 ${I('arrow')}</a></div>` : ''}
      </section>` : '';
    el.innerHTML = `
      ${JB.vh.head({ribbon:'金融知識書齋', ribbonEn:'Financial Learning Study', title:'公孫策的九堂課', en:'Nine Core Concepts', img:JB.ASSETS.scenes.learning, alt:'公孫策在書齋講課',
        lead:'每張卡都有英文、KK 音標、中文、英文定義、例句與翻譯、發音與相關概念。九張學完並通過小測驗，才能進入任務一。', extra:JB.vh.missionSteps('academy')})}
      ${ui.dialog('gongsun', face, say[0], say[1], {id:'a-dlg', cls:'dlg-in'})}
      <section class="study">
        <div class="carousel">
          ${card}
          <div class="row between">
            <button type="button" class="btn btn-navy" data-a="prev" ${A.idx === 0 ? 'disabled' : ''}>${I('back')} 上一張</button>
            <div class="dots" role="tablist" aria-label="九張卡片">${JB.ACADEMY.map((t,i) => `<button type="button" role="tab" class="${i === A.idx ? 'on' : ''} ${A.learned[t.id] ? 'done' : ''}" data-go="${i}" aria-label="${t.word}${A.learned[t.id] ? '（已學會）' : ''}" aria-selected="${i === A.idx}">${i+1}</button>`).join('')}</div>
            <button type="button" class="btn btn-navy" data-a="next" ${A.idx === N-1 ? 'disabled' : ''}>下一張 ${I('arrow')}</button>
          </div>
        </div>
        <aside class="study-side">
          <div class="frame-dark">
            <p class="eyebrow">Study List 學習清單</p>
            <div class="row between" style="margin:6px 0"><span>已學會 <b class="num">${nLearned}</b> / ${N}</span><span class="num" style="color:var(--gold-2)">+${st.scores().academy}</span></div>
            <div class="bar"><span style="width:${nLearned/N*100}%"></span></div>
            <ul class="checklist" style="margin-top:10px">${JB.ACADEMY.map((t,i) => `<li class="${A.learned[t.id] ? 'done' : ''}"><button type="button" data-go="${i}" class="${i === A.idx ? 'on' : ''}"><i>${A.learned[t.id] ? I('check') : ''}</i><span>${t.word}</span><small>${t.zh}</small></button></li>`).join('')}</ul>
          </div>
          ${!allLearned ? `<p class="disclaimer" style="text-align:left">${I('lock')} 學會全部 9 張後，開啟公孫策小測驗。</p>` : ''}
        </aside>
      </section>
      ${quiz}`;

    const flip = () => { const c = el.querySelector('#lcard'); c.classList.toggle('flipped'); JB.audio.sfx('flip');
      if(c.classList.contains('flipped')){ if(!A.flipped[T.id]){ A.flipped[T.id] = true; st.save(); } ui.react('a-dlg', 'gongsun', 'reading'); } };
    el.onclick = e => {
      if(e.target.closest('[data-act="say"]')) return;
      const f = e.target.closest('[data-flip]'); if(f){ flip(); return; }
      const g = e.target.closest('[data-go]'); if(g){ A.idx = +g.dataset.go; st.save(); JB.audio.sfx('click'); JB.app.rerender(); return; }
      const b = e.target.closest('[data-a]'); if(b){
        const a = b.dataset.a;
        if(a === 'prev' && A.idx > 0){ A.idx--; st.save(); JB.app.rerender(); }
        if(a === 'next' && A.idx < N-1){ A.idx++; st.save(); JB.app.rerender(); }
        if(a === 'learn' && !A.learned[T.id]){
          A.learned[T.id] = true; st.log('book', `書齋學會「${T.word} ${T.zh}」`);
          JB.vh.award(b, P.academyCard); ui.react('a-dlg', 'gongsun', 'approve'); st.save();
          setTimeout(() => {
            const nxt = JB.ACADEMY.findIndex(t => !A.learned[t.id]);
            if(nxt >= 0) A.idx = nxt; st.save(); JB.app.rerender();
            if(nxt < 0){ const q = document.getElementById('aquiz'); q && q.scrollIntoView({behavior:'smooth', block:'start'}); }
          }, 650);
        }
        return;
      }
      const o = e.target.closest('[data-act="aq"]'); if(o){
        const qi = +o.dataset.q, i = +o.dataset.i; if(A.quiz[qi]) return;
        const ok = i === JB.ACADEMY_QUIZ[qi].a; A.quiz[qi] = {sel:i, ok};
        if(ok) JB.vh.award(o, P.academyQ); else JB.audio.sfx('bad');
        if(A.quiz.filter(Boolean).length === 3 && !A.done){
          A.done = true; st.log('check', '完成金融知識書齋'); st.save(); JB.app.rerender();
          JB.vh.justUnlocked('m1'); JB.ui.flash('gold');
        } else { st.save(); JB.app.rerender(); }
      }
    };
    el.querySelector('.face.front').addEventListener('keydown', e => { if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); flip(); } });
  }
};
