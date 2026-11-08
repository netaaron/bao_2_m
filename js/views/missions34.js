/* Mission 3 (Clues & Investigation) and Mission 4 (Final Verdict in court) */
JB.views.m3 = {
  render(el){
    const st = JB.store, S = st.S, M = S.m3, ui = JB.ui, I = JB.ICON, P = JB.PTS;
    const N = JB.CLUES.length, answered = M.ans.filter(Boolean).length;
    const practice = JB.m3Practice || null;
    const cur = JB.m3Cur;
    let qi = practice ? practice.list[practice.i] : (cur !== undefined && cur !== null ? cur : Math.min(answered, N-1));
    if(!practice && M.done && (cur === undefined || cur === null)) qi = null;
    const br = st.m3Breakdown();
    let streak = 0; for(let i = 0; i < N; i++){ const a = M.ans[i]; if(!a) break; streak = a.ok ? streak + 1 : 0; }
    const notes = JB.CLUES.map((c,i) => { const a = M.ans[i];
      return a ? `<li class="${a.ok ? 'ok' : 'no'}"><span class="n">#${i+1}</span><span>${c.note}</span>${I(a.ok ? 'check' : 'x')}</li>` : `<li class="empty"><span class="n">#${i+1}</span><span>線索 ${i+1} · 尚未調查</span><span></span></li>`; }).join('');
    let card = '';
    if(qi !== null){
      const Q = JB.CLUES[qi], a = practice ? practice.ans : M.ans[qi];
      const presenter = Q.by === 'zhan' ? ['zhan', Q.face] : ['wang', Q.face];
      card = `
      ${ui.dialog(presenter[0], a ? (a.ok ? (presenter[0] === 'zhan' ? 'smile' : 'happy') : 'surprised') : presenter[1],
        presenter[0] === 'zhan' ? (Q.dims.includes('RA') ? '注意，這條線索有陷阱。先讀證據，再作答。' : '我在市場上找到一條線索，你看看。') : '這是我整理好的卷宗資料，請大人過目！',
        presenter[0] === 'zhan' ? 'I found a clue in the market. Read it carefully.' : 'Here is the file I organized for you.', {id:'m3-dlg', cls:'dlg-in'})}
      <article class="frame pad q-card">
        <div class="q-meta"><span class="q-tag">${practice ? '練習模式 Practice · 不計分' : `Clue ${qi+1} / ${N} · ${Q.type}`}</span><span class="row">${JB.vh.stars(Q.stars)}<span class="chip" style="color:var(--ink);background:none;border-color:var(--ivory-3)">${I('fire')}連續答對 <b style="color:var(--verm)">${streak}</b></span></span></div>
        ${practice ? '' : `<div class="bar"><span style="width:${(answered)/N*100}%"></span></div>`}
        <div class="evidence"><span class="stamp-bg">證物</span>${Q.clue}${ui.zhOn() ? `<small>${Q.clueZh}</small>` : ''}</div>
        <p class="q-en">${Q.q} <button type="button" class="mini-say" data-act="say" data-text="${ui.esc(Q.clue + ' ' + Q.q)}" aria-label="朗讀線索與題目">${I('sound')}</button></p>
        <p class="q-zh">中文輔助：${Q.zh}</p>
        ${JB.vh.opts(Q, a ? a.sel : undefined, 'cq')}
        ${a ? JB.vh.fb(a.ok, Q.ex, Q.plus, practice ? 0 : a.ok ? P.clue + (a.bonus || 0) : 0) : ''}
        ${a ? `<div class="row end">${practice ? `<button type="button" class="btn btn-navy" data-a="pnext">${practice.i < practice.list.length - 1 ? '下一題練習' : '結束練習'} ${I('arrow')}</button>`
          : `<button type="button" class="btn btn-navy" data-a="next">${qi < N-1 ? '下一條線索' : '查看調查結果'} ${I('arrow')}</button>`}</div>` : ''}
      </article>`;
    } else {
      const wrong = M.ans.map((a,i) => a && !a.ok ? i : -1).filter(i => i >= 0);
      card = `
      ${ui.dialog('wang', 'completed', `八條線索全部歸檔！答對 ${M.ans.filter(a => a && a.ok).length} 條，連擊加分 +${br.bonus}。包大人已經在公堂上等你了！`, 'All clues are filed. Justice Bao is waiting in court.', {id:'m3-dlg', cls:'dlg-in big'})}
      <article class="frame pad q-card">
        <div class="round-sum"><div><b>${M.ans.filter(a => a && a.ok).length}/8</b><span>答對線索</span></div><div><b>+${br.base}</b><span>答題得分</span></div><div><b>+${br.bonus}</b><span>連擊加分</span></div><div><b>${br.total}</b><span>本關總分</span></div></div>
        <div class="row between">
          <span class="row"><button type="button" class="btn btn-ghost btn-sm" data-a="practice" ${wrong.length ? '' : 'disabled'}>${I('refresh')} 重練答錯題目（${wrong.length}）</button>
          <button type="button" class="btn btn-ghost btn-sm" data-a="restart">${I('refresh')} 重新挑戰本關</button></span>
          <a class="btn btn-red" href="#m4">前往任務四：斷案宣判 ${I('gavel')}</a></div>
      </article>`;
    }
    el.innerHTML = `
      ${JB.vh.head({ribbon:'任務三', ribbonEn:'Mission 3', title:'訊問與線索', en:'Clues & Investigation', img:JB.ASSETS.scenes.investigation, alt:'展昭手持放大鏡調查',
        lead:'展昭負責市場線索，王朝負責整理資料。8 道英文閱讀與金融推理題，難度逐步提高；連續答對 3 題起每題再 +5。', extra:JB.vh.missionSteps('m3')})}
      <section class="inv"><div style="display:flex;flex-direction:column;gap:14px;min-width:0">${card}</div>
        <aside class="notes"><div class="frame-dark pad" style="padding:16px">
          <div class="row" style="gap:10px;margin-bottom:10px">${ui.portrait('wang', 'organize')}<div><p class="eyebrow">Wang's Case Notes</p><b style="font-family:var(--f-display);font-size:17px">王朝的卷宗</b><p style="font-size:13px;color:#c9d4e6">得分 <b class="num" style="color:var(--gold-2)">${br.total}</b> · 連擊 +${br.bonus}</p></div></div>
          <ul class="notes-list">${notes}</ul></div></aside></section>`;
    el.onclick = async e => {
      const o = e.target.closest('[data-act="cq"]');
      if(o){
        const i = +o.dataset.i, Q = JB.CLUES[qi];
        ui.hideToast();
        if(practice){ if(practice.ans) return; practice.ans = {sel:i, ok:i === Q.a}; JB.audio.sfx(i === Q.a ? 'ok' : 'bad'); JB.app.rerender(); return; }
        if(M.ans[qi]) return;
        const ok = i === Q.a; let s2 = ok ? streak + 1 : 0;
        const bonus = ok && s2 >= 3 ? P.clueStreak : 0;
        M.ans[qi] = {sel:i, ok, bonus}; JB.m3Cur = qi;
        st.log(ok ? 'check' : 'x', `線索 ${qi+1}「${Q.type}」${ok ? '答對' : '答錯'}`);
        if(ok){ JB.vh.award(o, P.clue + bonus); if(bonus) setTimeout(() => ui.toast(`${I('fire')} 連續答對 ${s2} 題！連擊 +${bonus}`), 250); } else { JB.audio.sfx('bad'); ui.flash('red'); }
        if(qi === N-1){ const first = !S.opened.m4; M.done = true; st.log('check', '完成任務三：訊問與線索'); st.save(); JB.app.rerender(); if(first){ setTimeout(() => { JB.vh.justUnlocked('m4'); JB.ui.flash('gold'); }, 1200); } }
        else { st.save(); JB.app.rerender(); }
        return;
      }
      const b = e.target.closest('[data-a]'); if(!b) return;
      const a = b.dataset.a;
      if(a === 'next'){ JB.m3Cur = null; JB.audio.sfx('click'); JB.app.rerender(); window.scrollTo({top:0, behavior:'smooth'}); }
      if(a === 'practice'){ JB.m3Cur = null; const list = M.ans.map((x,i) => x && !x.ok ? i : -1).filter(i => i >= 0); JB.m3Practice = {list, i:0, ans:null}; JB.app.rerender(); }
      if(a === 'pnext'){ const p = JB.m3Practice; if(p.i < p.list.length - 1){ p.i++; p.ans = null; } else JB.m3Practice = null; JB.app.rerender(); }
      if(a === 'restart'){ if(await ui.confirm('重新挑戰訊問與線索？', '8 條線索的作答與分數會清除重來，已解鎖的任務四不受影響。', '重新挑戰')){ st.resetMission('m3'); JB.m3Cur = null; JB.app.rerender(); } }
    };
  }
};

JB.views.m4 = {
  render(el){
    const st = JB.store, S = st.S, M = S.m4, ui = JB.ui, I = JB.ICON, T = JB.TRIAL, P = JB.PTS;
    const phase = M.phase;  // 0 intro, 1-4 questions, 5 decision, 6 verdict
    const steps = ['開堂','知識','英文','推理','風險','決策','宣判'];
    const stepBar = `<div class="steps4" aria-label="審理進度">${steps.map((s,i) => `<span class="${i === phase ? 'on' : i < phase ? 'done' : ''}">${i < phase ? I('check') : ''}${s}</span>`).join('')}</div>`;
    let body = '';
    if(phase === 0){
      body = `
        ${ui.dialog('bao', 'strict', '升堂！今日審理「人生資產懸案」。阿明說股市偷了他的錢，本府要看證據。', 'Court is in session. Let the evidence speak.', {id:'m4-dlg', cls:'big dlg-in'})}
        <section class="frame pad court-intro">
          <div class="row between"><span class="ribbon">案情陳述 <small>${T.title}</small></span>
            <button type="button" class="icon-txt" data-act="say" data-text="${ui.esc(T.story.map(p => p.en).join(' '))}">${I('sound')} 朗讀案情</button></div>
          <div class="casefile">${T.story.map(p => `<p class="p-en">${p.en}</p>${ui.zhOn() ? `<p class="p-zh">${p.zh}</p>` : ''}`).join('')}</div>
          <div class="exhibits">${T.exhibits.map(x => `<div class="exhibit"><p class="tag">${x.tag}</p>${
            x.rows ? `<div class="stmt">${x.rows.map(r => `<div><span>${r[0]}</span><span>${r[1]}</span></div>`).join('')}</div>`
            : x.chat ? `<div class="chat"><p class="grp">飆股 VIP 群 · Hot Stock VIP (2,318)</p><p class="bubble"><span class="who">股市老師 "Teacher"</span>Rocket Tech will DOUBLE!!! Everyone is buying. Don't miss out!</p><p class="bubble me">All in!! 🚀</p></div>`
            : indexChart()}<p class="zh">${x.zh}</p></div>`).join('')}</div>
          <div class="row end"><button type="button" class="btn btn-red btn-lg" data-a="begin">${I('gavel')} 開始審問<small>Begin the Trial</small></button></div>
        </section>`;
    } else if(phase >= 1 && phase <= 4){
      const Q = T.questions[phase-1], a = Q.multi ? M.ra : M.ans[Q.dim];
      let inner;
      if(Q.multi){
        const picks = a ? a.picks : (JB.m4Picks || {});
        inner = `<div class="multi">${Q.items.map((it,i) => {
          let cls = picks[i] ? 'on' : '';
          if(a){ cls = (it.risk ? 'right' : '') + (!!picks[i] !== it.risk ? ' miss' : '') + (picks[i] ? ' on' : ''); }
          return `<button type="button" class="chk ${cls}" data-pick="${i}" ${a ? 'disabled' : ''} aria-pressed="${!!picks[i]}"><i>${picks[i] ? I('check') : ''}</i><span>${it.t}<small>${it.zh}${a ? (it.risk ? ' · 風險警訊' : ' · 好習慣') : ''}</small></span></button>`; }).join('')}</div>
          ${a ? JB.vh.fb(st.raFraction() === 1, `你判對 ${Math.round(st.raFraction()*6)} / 6 項，得 ${Math.round(P.trialQ*st.raFraction())} 分。${Q.ex}`) : `<div class="row end"><button type="button" class="btn btn-red" data-a="submit-ra">${I('check')} 提交判斷</button></div>`}`;
      } else {
        inner = `${JB.vh.opts(Q, a ? a.sel : undefined, 'tq')}${a ? JB.vh.fb(a.ok, Q.ex, '', a.ok ? P.trialQ : 0) : ''}`;
      }
      const face = a ? (Q.multi ? (st.raFraction() === 1 ? 'victory' : 'scold') : a.ok ? 'explain' : 'scold') : Q.face;
      body = `
        ${ui.dialog('bao', face, a ? (Q.multi ? (st.raFraction() === 1 ? '好眼力！所有警訊都被你揪出來了。' : '還有漏網之魚，看清楚綠框與紅框。') : a.ok ? '說得好，證據確鑿。' : '大膽！這不是證據說的。看清楚解析。')
          : `第 ${phase} 問：${Q.label}。`, a ? '' : Q.q, {id:'m4-dlg', cls:'big dlg-in', speak:!a})}
        <article class="frame pad q-card">
          <div class="q-meta"><span class="q-tag">Question ${phase} / 4 · ${Q.label}</span><span class="q-tag">+${P.trialQ}</span></div>
          <p class="q-en">${Q.q}</p><p class="q-zh">${Q.zh}</p>
          ${inner}
          ${a ? `<div class="row end"><button type="button" class="btn btn-navy" data-a="adv">${phase < 4 ? '下一問' : '進入最終決策'} ${I('arrow')}</button></div>` : ''}
        </article>`;
    } else if(phase === 5){
      const solved = M.tries.length && M.tries[M.tries.length-1] === T.correct;
      const last = M.tries[M.tries.length-1], lastAdv = last && T.advisers.find(x => x.id === last);
      body = `
        ${ui.dialog('bao', solved ? 'verdict' : last ? 'scold' : 'thinking', solved ? '判決成立！' : last ? '此人說法站不住腳，再審！' : '阿明還剩 31 萬元。三位顧問各有說法，誰的計畫最有紀律？', solved ? '' : 'Whose plan is the most disciplined?', {id:'m4-dlg', cls:'big dlg-in'})}
        <article class="frame pad q-card">
          <div class="q-meta"><span class="q-tag">Final Decision · Decision Making 決策判斷</span><span class="q-tag">第一次 +60 · 第二次 +30 · 第三次 +10</span></div>
          <div class="advisers">${T.advisers.map(ad => { const out = M.tries.includes(ad.id) && ad.id !== T.correct, win = solved && ad.id === T.correct;
            return `<button type="button" class="adviser ${out ? 'out' : ''} ${win ? 'win' : ''}" data-adv="${ad.id}" ${out || solved ? 'disabled' : ''}>
              <span class="face">${JB.CF ? JB.CF.avatar(ad.who) : ''}</span><h4>${ad.zh}<small>${ad.name}</small></h4><p class="tagline">${ad.tag}</p>
              <p class="say">“${ad.say}”</p>${ui.zhOn() ? `<p class="sayzh">${ad.sayZh}</p>` : ''}</button>`; }).join('')}</div>
          ${lastAdv ? JB.vh.fb(solved, lastAdv.verdict) : ''}
          ${solved ? `<div class="row end"><button type="button" class="btn btn-red btn-lg" data-a="verdict">${I('gavel')} 宣判<small>Announce the Verdict</small></button></div>` : ''}
        </article>`;
    } else {
      const d = st.dims(), R = st.rank(d.overall);
      body = `
        <section class="gavel-scene frame-dark"><span class="big-stamp ${JB.m4Anim ? 'stamp-in' : ''}">判決</span>
          ${ui.portrait('bao', R.face)}
          <div style="display:flex;flex-direction:column;gap:8px"><h3>包大人判詞</h3>
            <p style="font-size:16px;line-height:1.85">本府宣判：股市無罪！阿明的損失，源於孤注一擲、跟風明牌、高價買進且沒有出場計畫。今後依王有策之法：先顧生活安全，再分散配置、定期投入。</p>
            <p style="font-size:16px;line-height:1.85;color:var(--gold-2)">至於你，偵探：${R.say}</p>
            <p class="eyebrow" style="font-size:18px">“The market didn't take your money. Your choices did.”</p>
            <div class="row"><span class="ribbon">${R.zh} <small>${R.en}</small></span><span class="chip">五大面向平均 <b>${d.overall}</b></span></div>
            <div class="row"><a class="btn btn-gold" href="#report">${I('scroll')} 查看完整成績報告</a><button type="button" class="btn btn-ghost btn-sm" data-a="retrial">${I('refresh')} 重新審理</button></div></div>
        </section>`;
      JB.m4Anim = false;
    }
    el.innerHTML = `
      ${JB.vh.head({ribbon:'任務四', ribbonEn:'Mission 4', title:'斷案宣判', en:'Final Verdict', img:JB.ASSETS.scenes.judgment, alt:'包青天在最終審判大堂',
        lead:'包青天正式開堂。根據你學到的知識，對綜合性金融案例做出判斷。評分五大面向：金融知識、英文理解、邏輯推理、風險意識、決策判斷。', extra:JB.vh.missionSteps('m4') + stepBar})}
      ${body}`;
    el.onclick = async e => {
      const b = e.target.closest('[data-a]');
      const o = e.target.closest('[data-act="tq"]');
      const pk = e.target.closest('[data-pick]');
      const adv = e.target.closest('[data-adv]');
      if(o){ const Q = T.questions[phase-1]; if(M.ans[Q.dim]) return; const i = +o.dataset.i, ok = i === Q.a; M.ans[Q.dim] = {sel:i, ok};
        st.log(ok ? 'check' : 'x', `公堂第 ${phase} 問（${Q.label}）${ok ? '答對' : '答錯'}`);
        if(ok) JB.vh.award(o, P.trialQ); else { JB.audio.sfx('bad'); ui.flash('red'); }
        st.save(); JB.app.rerender(); return; }
      if(pk){ JB.m4Picks = JB.m4Picks || {}; const i = +pk.dataset.pick; JB.m4Picks[i] = !JB.m4Picks[i]; JB.audio.sfx('click'); JB.app.rerender(); return; }
      if(adv){ const id = adv.dataset.adv; M.tries.push(id); const ok = id === T.correct;
        st.log(ok ? 'gavel' : 'x', `指認建議：${T.advisers.find(x => x.id === id).zh}${ok ? '（正確）' : '（錯誤）'}`);
        if(ok){ JB.vh.award(adv, st.decisionScore()); JB.audio.sfx('gavel'); ui.flash('gold'); } else { JB.audio.sfx('bad'); ui.flash('red'); document.body.classList.add('shake-screen'); setTimeout(() => document.body.classList.remove('shake-screen'), 500); }
        st.save(); JB.app.rerender(); return; }
      if(!b) return;
      const a = b.dataset.a;
      if(a === 'begin'){ JB.audio.sfx('gavel'); M.phase = 1; st.save(); JB.app.rerender(); }
      if(a === 'adv'){ M.phase++; st.save(); JB.app.rerender(); window.scrollTo({top:0, behavior:'smooth'}); }
      if(a === 'submit-ra'){ const picks = JB.m4Picks || {}; M.ra = {picks}; JB.m4Picks = null; const f = st.raFraction(); JB.vh.award(b, Math.round(P.trialQ*f)); st.log('shield', `公堂第 4 問（風險意識）判對 ${Math.round(f*6)}/6`); st.save(); JB.app.rerender(); }
      if(a === 'verdict'){
        M.phase = 6; M.done = true; st.log('gavel', `大堂宣判：${st.rank(st.dims().overall).zh}`);
        if(!S.recorded){ st.record(); S.recorded = true; }
        JB.m4Anim = true; JB.audio.sfx('gavel'); setTimeout(() => JB.audio.sfx('gavel'), 380); ui.flash('gold');
        document.body.classList.add('shake-screen'); setTimeout(() => document.body.classList.remove('shake-screen'), 500);
        st.save(); JB.app.rerender(); window.scrollTo({top:0, behavior:'smooth'});
      }
      if(a === 'retrial'){ if(await ui.confirm('重新審理？', '公堂上的作答與決策會清除重來，成績報告將依新的審理結果更新。排行榜會再新增一筆紀錄。', '重新審理')){ st.resetMission('m4'); JB.app.rerender(); } }
    };
    function indexChart(){
      const v = [100,102,99,103,101,96,98,101,104,106,105,108], W = 320, H = 120, pl = 30, pr = 8, pt = 10, pb = 20, lo = 92, hi = 112;
      const x = i => pl + i/11*(W-pl-pr), y = d => pt + (1-(d-lo)/(hi-lo))*(H-pt-pb);
      let g = ''; [95,100,105,110].forEach(d => { g += `<line x1="${pl}" x2="${W-pr}" y1="${y(d)}" y2="${y(d)}" stroke="#d8c9aa"/><text x="${pl-4}" y="${y(d)+3}" text-anchor="end" font-size="9" fill="#7b7f88">${d}</text>`; });
      ['J','F','M','A','M','J','J','A','S','O','N','D'].forEach((m,i) => { g += `<text x="${x(i)}" y="${H-5}" text-anchor="middle" font-size="9" fill="#7b7f88">${m}</text>`; });
      g += `<polyline points="${v.map((d,i) => `${x(i)},${y(d)}`).join(' ')}" fill="none" stroke="#2f7a5b" stroke-width="2.2"/><circle cx="${x(11)}" cy="${y(108)}" r="3.5" fill="#2f7a5b"/><text x="${x(11)-5}" y="${y(108)-7}" text-anchor="end" font-size="10" font-weight="700" fill="#2f7a5b">+8%</text>`;
      return `<svg class="chart-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="大盤指數全年走勢，從 100 上升到 108">${g}</svg>`;
    }
  }
};
