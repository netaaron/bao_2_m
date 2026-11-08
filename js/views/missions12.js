/* Mission 1 (Case & Vocabulary) and Mission 2 (Matching Challenge) */
JB.views.m1 = {
  render(el){
    const st = JB.store, S = st.S, M = S.m1, ui = JB.ui, I = JB.ICON, P = JB.PTS;
    const n = st.cnt(M.learned), all = n === 12;
    const face = M.done ? 'victory' : all ? 'thinking' : n ? 'explain' : 'neutral';
    const cs = JB.CASE_STORY;
    const cards = JB.VOCAB.map(v => `
      <div class="flip vcard" data-v="${v.id}" tabindex="0" role="button" aria-label="${v.word} 單字卡，按下翻面">
        <div class="flip-inner">
          <div class="face front frame">${M.learned[v.id] ? `<span class="learned">${I('check')}已學</span>` : ''}
            <p class="w">${v.word}</p><p class="kk">${v.kk}</p><p class="muted en" style="font-style:italic">${v.pos}</p>
            <button type="button" class="mini-say" data-act="say" data-text="${ui.esc(v.word)}" aria-label="播放 ${v.word} 發音">${I('sound')}</button></div>
          <div class="face back frame"><p class="w">${v.word}</p><p class="zh">${v.zh}</p><p class="d">${v.def}</p>
            <p class="x">${v.ex} <button type="button" class="mini-say" data-act="say" data-text="${ui.esc(v.ex)}" aria-label="朗讀例句">${I('sound')}</button></p><p class="xz">${v.exZh}</p>${v.note ? `<p class="xz">※ ${v.note}</p>` : ''}</div>
        </div></div>`).join('');
    const check = all ? `
      <section class="frame pad q-card" id="spot">
        <div class="q-meta"><span class="ribbon">王朝抽考 <small>Spot Check</small></span><span class="q-tag">${M.check.filter(Boolean).length} / 4 · +${P.spotQ} each</span></div>
        ${ui.dialog('wang', M.check.filter(Boolean).length === 4 ? 'completed' : 'report', '抽考來囉！選出空格最適合的單字。', 'Fill in the blank with the best word.', {id:'spot-dlg'})}
        ${JB.SPOT_CHECK.map((Q,qi) => { const a = M.check[qi]; return `<div class="q-card" style="gap:10px">
          <p class="q-en">${qi+1}. ${Q.q} <button type="button" class="mini-say" data-act="say" data-text="${ui.esc(Q.q)}" aria-label="朗讀題目">${I('sound')}</button></p>
          ${ui.zhOn() ? `<p class="q-zh">${Q.zh}</p>` : ''}${JB.vh.opts(Q, a ? a.sel : undefined, 'sc', `data-q="${qi}"`)}${a ? JB.vh.fb(a.ok, Q.ex, '', a.ok ? P.spotQ : 0) : ''}</div>`; }).join('')}
        ${M.done ? `<div class="row end"><a class="btn btn-red" href="#m2">前往任務二：配對特訓 ${I('arrow')}</a></div>` : ''}
      </section>` : '';
    el.innerHTML = `
      ${JB.vh.head({ribbon:'任務一', ribbonEn:'Mission 1', title:'案件與詞彙', en:'Case & Vocabulary', img:JB.ASSETS.scenes.briefing, alt:'包青天發布任務',
        lead:'先讀懂案情，再翻開 12 張單字卡。全部學完後接受王朝抽考。', extra:JB.vh.missionSteps('m1')})}
      ${ui.dialog('bao', face, M.done ? '詞彙已備，證詞讀得懂了。去配對特訓，練到滾瓜爛熟！' : '包大人有令：不懂名詞，何以斷案？先讀阿明的案情，畫底線的字都是證據。', M.done ? 'Good. Now train with the matching challenge.' : 'If you don\'t know the words, you can\'t judge the case.', {id:'m1-dlg', cls:'big dlg-in'})}
      <section class="frame pad casefile">
        <div class="row between"><span class="ribbon">案件摘要 <small>${cs.title}</small></span>
          <span class="row"><button type="button" class="icon-txt" data-act="say" data-text="${ui.esc(cs.paras.map(p => ui.plain(p.en)).join(' '))}">${I('sound')} 朗讀全文</button>
          <label class="toggle"><input type="checkbox" id="zh-tg" ${ui.zhOn() ? 'checked' : ''}> 中文提示</label></span></div>
        <p class="en" style="font-weight:600;color:var(--navy)">A stock represents a small ownership in a company. Its price can rise or fall as investors react to information, expectations, and emotions.</p>
        ${cs.paras.map(p => `<p class="p-en">${ui.marked(p.en)}</p><p class="p-zh" ${ui.zhOn() ? '' : 'hidden'}>${p.zh}</p>`).join('')}
        <div class="note bao-reminder"><span>包大人的第一個提醒</span><b>Price is what you pay; value is what you believe the business is worth.</b><span>價格是市場此刻給出的數字；價值則是你根據公司基本面所做的判斷。兩者不一定相同。</span></div>
      </section>
      <section class="frame-dark pad" style="display:flex;flex-direction:column;gap:12px">
        <div class="row between"><span class="ribbon">金融英文詞庫 <small>12 Words</small></span><span>已學會 <b class="num" style="color:var(--gold-2)">${n}</b> / 12 · 翻面即學會 +${P.vocabCard}</span></div>
        <div class="bar"><span style="width:${n/12*100}%"></span></div>
        <div class="vgrid">${cards}</div>
      </section>
      ${check}`;
    const flip = c => {
      c.classList.toggle('flipped'); JB.audio.sfx('flip');
      const id = c.dataset.v;
      if(c.classList.contains('flipped') && !M.learned[id]){
        M.learned[id] = true; const v = JB.VOCAB.find(x => x.id === id); st.log('book', `任務一學會「${v.word} ${v.zh}」`);
        JB.vh.award(c, P.vocabCard); st.save();
        const front = c.querySelector('.front'); front.insertAdjacentHTML('afterbegin', `<span class="learned">${I('check')}已學</span>`);
        if(st.cnt(M.learned) === 12) setTimeout(() => { JB.app.rerender(); const s = document.getElementById('spot'); s && s.scrollIntoView({behavior:'smooth'}); }, 900);
        else JB.ui.react('m1-dlg', 'bao', 'explain');
      }
    };
    el.onclick = e => {
      if(e.target.closest('[data-act="say"]') || e.target.closest('.term')) return;
      const c = e.target.closest('.vcard'); if(c){ flip(c); return; }
      const o = e.target.closest('[data-act="sc"]'); if(o){
        const qi = +o.dataset.q, i = +o.dataset.i; if(M.check[qi]) return;
        const ok = i === JB.SPOT_CHECK[qi].a; M.check[qi] = {sel:i, ok};
        if(ok) JB.vh.award(o, P.spotQ); else JB.audio.sfx('bad');
        if(M.check.filter(Boolean).length === 4 && !M.done){ M.done = true; st.log('check', '完成任務一：案件與詞彙'); st.save(); JB.app.rerender(); JB.vh.justUnlocked('m2'); JB.ui.flash('gold'); }
        else { st.save(); JB.app.rerender(); }
      }
    };
    el.addEventListener('keydown', e => { const c = e.target.closest && e.target.closest('.vcard'); if(c && (e.key === 'Enter' || e.key === ' ') && e.target === c){ e.preventDefault(); flip(c); } });
    el.querySelector('#zh-tg').addEventListener('change', e => { S.settings.zh = e.target.checked; st.save(); el.querySelectorAll('.p-zh').forEach(p => p.hidden = !e.target.checked); });
  }
};

JB.views.m2 = {
  render(el){
    const st = JB.store, S = st.S, M = S.m2, ui = JB.ui, I = JB.ICON, P = JB.PTS;
    let ri = 0;
    if(M.rounds[0] && M.rounds[0].done && (M.rounds[1] || JB.m2Next)) ri = 1;
    JB.m2Next = false;
    const pools = [JB.ACADEMY, JB.VOCAB];
    let R = M.rounds[ri];
    if(!R){
      const pick = [...pools[ri]].sort(() => Math.random() - .5).slice(0, 6).map(v => v.id || v.word);
      R = M.rounds[ri] = {ids:pick, en:[...pick].sort(() => Math.random() - .5), zh:[...pick].sort(() => Math.random() - .5), matched:[], wrong:0, streak:0, bonus:0, start:null, time:0, pts:0, done:false};
    }
    const pool = pools[ri], get = id => pool.find(v => v.id === id);
    const allDone = M.done;
    let sel = {}, timer = null;
    const roundPts = r => Math.max(0, r.matched.length*P.pair - r.wrong*P.pairWrong) + r.bonus + (r.done ? timeBonus(r.time) : 0);
    function timeBonus(t){ return t <= 45 ? 10 : t <= 75 ? 5 : 0; }
    const fmtT = s => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(Math.floor(s%60)).padStart(2,'0')}`;
    const elapsed = () => R.done ? R.time : R.start ? (Date.now() - R.start)/1000 : 0;
    const sum = (r, k) => `<div class="round-sum"><div><b>${r.matched.length}/6</b><span>配對</span></div><div><b>${fmtT(r.time)}</b><span>用時</span></div><div><b>${r.wrong}</b><span>配錯</span></div><div><b>+${roundPts(r)}</b><span>本回合得分</span></div></div>
      <p class="muted" style="font-size:13px">時間加分：${r.time <= 45 ? '45 秒內 +10' : r.time <= 75 ? '75 秒內 +5' : '無'}；連擊加分 +${r.bonus}；配錯扣 ${r.wrong*P.pairWrong}</p>`;
    const card = (id, side) => {
      const ok = R.matched.includes(id), v = get(id);
      return `<button type="button" class="mcard ${side} ${ok ? 'ok' : ''}" data-side="${side}" data-id="${id}" ${ok || R.done ? 'disabled' : ''}>${side === 'en' ? v.word : v.zh}${ok ? I('check') : ''}</button>`;
    };
    el.innerHTML = `
      ${JB.vh.head({ribbon:'任務二', ribbonEn:'Mission 2', title:'配對特訓', en:'Matching Challenge', img:JB.ASSETS.scenes.trading, alt:'王朝在交易室歡呼',
        lead:'左邊選英文、右邊選中文。答對 +10，連續 3 對起每對再 +5，配錯 −2。兩回合都完成才算過關。', extra:JB.vh.missionSteps('m2')})}
      ${ui.dialog('wang', R.done ? 'completed' : 'organize', ri === 0 ? '第一回合：公孫先生書齋裡的 9 個觀念，隨機抽 6 個！' : '第二回合：任務一的 12 個單字，再抽 6 個！', ri === 0 ? 'Round 1: concepts from the Academy.' : 'Round 2: words from Mission 1.', {id:'m2-dlg', cls:'dlg-in'})}
      <section class="frame pad" style="display:flex;flex-direction:column;gap:14px">
        <div class="row between"><span class="ribbon">第 ${ri+1} / 2 回合 <small>Round ${ri+1}</small></span>
          <div class="mhud"><span class="chip">${I('clock')}<b id="m2-time">${fmtT(elapsed())}</b></span><span class="chip">${I('check')}<b id="m2-n">${R.matched.length}</b>/6</span><span class="chip streak">${I('fire')}連擊 <b id="m2-streak">${R.streak}</b></span><span class="chip">${I('star')}<b id="m2-pts">${roundPts(R)}</b></span></div></div>
        <div class="match"><div class="col">${R.en.map(id => card(id, 'en')).join('')}</div><div class="col">${R.zh.map(id => card(id, 'zh')).join('')}</div></div>
        <div id="m2-fb" aria-live="polite"></div>
        ${R.done ? sum(R) : ''}
        <div class="row between">
          <button type="button" class="btn btn-ghost btn-sm" data-a="restart">${I('refresh')} 重新挑戰本關</button>
          ${R.done && ri === 0 && !M.rounds[1] ? `<button type="button" class="btn btn-red" data-a="next">進入第 2 回合 ${I('arrow')}</button>` : ''}
          ${allDone ? `<a class="btn btn-red" href="#m3">前往任務三：訊問與線索 ${I('arrow')}</a>` : ''}
        </div>
      </section>
      ${M.rounds[0] && M.rounds[0].done && ri === 1 ? `<section class="frame-dark pad"><p class="eyebrow">Round 1 Result 第一回合成績</p>${sum(M.rounds[0]).replace(/var\(--navy\)/g,'var(--gold-2)')}</section>` : ''}`;
    const tick = () => { const t = el.querySelector('#m2-time'); if(!t || !document.body.contains(t)){ clearInterval(timer); return; } t.textContent = fmtT(elapsed()); };
    if(R.start && !R.done){ timer = setInterval(tick, 500); }
    const fb = el.querySelector('#m2-fb');
    el.onclick = async e => {
      const b = e.target.closest('[data-a]');
      if(b){
        if(b.dataset.a === 'next'){ JB.m2Next = true; JB.app.rerender(); return; }
        if(b.dataset.a === 'restart'){
          if(M.done || M.rounds.some(r => r && r.done)){ if(!(await ui.confirm('重新挑戰配對特訓？', '兩回合的配對成績會清除重算，已解鎖的關卡不受影響。', '重新挑戰'))) return; }
          clearInterval(timer); st.resetMission('m2'); JB.app.rerender(); return;
        }
      }
      const c = e.target.closest('.mcard'); if(!c || c.disabled || R.done) return;
      if(!R.start){ R.start = Date.now(); timer = setInterval(tick, 500); }
      JB.audio.sfx('click');
      const side = c.dataset.side;
      el.querySelectorAll(`.mcard.${side}`).forEach(x => x.classList.remove('sel', 'bad'));
      c.classList.add('sel'); sel[side] = c;
      if(sel.en && sel.zh){
        const a = sel.en, z = sel.zh; sel = {};
        if(a.dataset.id === z.dataset.id){
          R.matched.push(a.dataset.id); R.streak++;
          let gain = P.pair; if(R.streak >= 3){ R.bonus += P.pairStreak; gain += P.pairStreak; }
          [a,z].forEach(x => { x.classList.remove('sel'); x.classList.add('ok'); x.disabled = true; x.insertAdjacentHTML('beforeend', I('check')); });
          JB.vh.award(z, gain); ui.react('m2-dlg', 'wang', R.streak >= 3 ? 'cheer' : 'happy');
          const v = get(a.dataset.id); fb.innerHTML = `<div class="fb ok"><b>配對正確！+${gain}${R.streak >= 3 ? `（連擊 ×${R.streak}）` : ''}</b><span class="en">${v.word}</span> ＝ ${v.zh}</div>`;
        } else {
          R.wrong++; R.streak = 0; JB.audio.sfx('bad'); JB.ui.float(z, '−' + P.pairWrong, 'bad');
          [a,z].forEach(x => { x.classList.remove('sel'); x.classList.add('bad'); });
          setTimeout(() => [a,z].forEach(x => x.classList.remove('bad')), 600);
          const va = get(a.dataset.id), vz = get(z.dataset.id); ui.react('m2-dlg', 'wang', 'surprised');
          fb.innerHTML = `<div class="fb no"><b>配錯了，−${P.pairWrong}。錯誤解析：</b><span class="en">${va.word}</span> 的意思是「${va.zh}」；你選的「${vz.zh}」對應的是 <span class="en">${vz.word}</span>。</div>`;
        }
        el.querySelector('#m2-n').textContent = R.matched.length; el.querySelector('#m2-streak').textContent = R.streak; el.querySelector('#m2-pts').textContent = roundPts(R);
        if(R.matched.length === 6){
          clearInterval(timer); R.time = Math.round((Date.now() - R.start)/1000); R.done = true; R.pts = roundPts(R);
          st.log('puzzle', `配對特訓第 ${ri+1} 回合：${fmtT(R.time)}、配錯 ${R.wrong} 次、+${R.pts}`);
          const tb = timeBonus(R.time); if(tb) setTimeout(() => JB.ui.float(el.querySelector('#m2-time'), '+' + tb + ' 時間加分'), 300);
          if(M.rounds.filter(r => r && r.done).length === 2){
            const first = !S.opened.m3; M.done = true; st.log('check', '完成任務二：配對特訓'); st.save();
            setTimeout(() => { JB.app.rerender(); if(first){ JB.vh.justUnlocked('m3'); JB.ui.flash('gold'); } }, 700);
          } else { st.save(); setTimeout(() => JB.app.rerender(), 700); }
        } else st.save();
      }
    };
  }
};
