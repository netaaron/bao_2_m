/* Final report, Hall of Honor (profile / achievements / leaderboard / log), Financial Tools */
JB.views.report = {
  render(el){
    const st = JB.store, S = st.S, ui = JB.ui, I = JB.ICON;
    const d = st.dims(), R = st.rank(d.overall), sc = st.scores(), L = st.level(sc.total);
    const radar = (() => {
      const cx = 150, cy = 140, r = 100, n = 5, ang = i => -Math.PI/2 + i*2*Math.PI/n;
      const pt = (i, f) => [cx + Math.cos(ang(i))*r*f, cy + Math.sin(ang(i))*r*f];
      let g = '';
      [.25,.5,.75,1].forEach(f => { g += `<polygon points="${JB.DIMS.map((_,i) => pt(i,f).join(',')).join(' ')}" fill="none" stroke="#d8c9aa" stroke-width="1"/>`; });
      JB.DIMS.forEach((D,i) => { const [x,y] = pt(i,1); g += `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="#d8c9aa"/>`;
        const [lx,ly] = pt(i,1.24); g += `<text x="${lx}" y="${ly}" text-anchor="middle" dominant-baseline="middle">${D.zh}</text>`;
        const [vx,vy] = pt(i, Math.max(.08,(d[D.k]||0)/100)); g += `<text class="val" x="${vx}" y="${vy-9}" text-anchor="middle">${d[D.k] ?? '—'}</text>`; });
      g += `<polygon points="${JB.DIMS.map((D,i) => pt(i, Math.max(.02,(d[D.k]||0)/100)).join(',')).join(' ')}" fill="rgba(185,71,50,.28)" stroke="#B94732" stroke-width="2"/>`;
      g += JB.DIMS.map((D,i) => { const [x,y] = pt(i, Math.max(.02,(d[D.k]||0)/100)); return `<circle cx="${x}" cy="${y}" r="3.5" fill="#B94732"/>`; }).join('');
      return `<svg class="radar" viewBox="0 0 300 290" role="img" aria-label="五大面向雷達圖：${JB.DIMS.map(D => D.zh + ' ' + d[D.k]).join('、')}" style="width:100%;max-width:380px;margin:0 auto;display:block">${g}</svg>`;
    })();
    const rows = [['金融知識書齋 Academy', sc.academy, 90],['任務一 案件與詞彙', sc.m1, 100],['任務二 配對特訓', sc.m2, 180],['任務三 訊問與線索', sc.m3, 150],['任務四 斷案宣判', sc.m4, 180]];
    const date = new Date(); const ds = `${date.getFullYear()} 年 ${date.getMonth()+1} 月 ${date.getDate()} 日`;
    el.innerHTML = `
      ${JB.vh.head({ribbon:'結案榮譽殿堂', ribbonEn:'Hall of Honor', title:'完整成績報告', en:'Case Report', img:JB.ASSETS.scenes.honor, alt:'四位角色在榮譽殿堂慶祝', extra:JB.vh.missionSteps('report')})}
      ${ui.dialog('wang', 'completed', `報告整理好了！你的五大面向平均 ${d.overall} 分，判決等級「${R.zh}」。`, `Your final rank: ${R.en}.`, {id:'r-dlg', cls:'dlg-in'})}
      <section class="report">
        <article class="frame pad" style="display:flex;flex-direction:column;gap:14px">
          <div class="rank-seal"><span class="eyebrow">Final Verdict 最終判決</span><span class="rk">${R.zh}</span><span class="rk-en">${R.en} · ${d.overall} / 100</span></div>
          ${radar}
          <div style="display:flex;flex-direction:column;gap:8px">${JB.DIMS.map(D => `<div class="dimrow"><span>${D.zh}<small>${D.en}</small></span><div class="bar"><span style="width:${d[D.k]||0}%"></span></div><b>${d[D.k] ?? '—'}</b></div>`).join('')}</div>
          <p class="muted" style="font-size:12.5px">判決等級：85 以上金牌金融偵探、70 以上優秀見習偵探、50 以上繼續修習、其餘重新調查。各面向依整場遊戲中對應題目的答對率計算。</p>
        </article>
        <article class="frame pad" style="display:flex;flex-direction:column;gap:14px">
          ${ui.dialog('bao', R.face, R.say, '', {cls:'big'})}
          <table class="ptable"><thead><tr><th>關卡</th><th class="n">得分</th><th class="n">滿分</th></tr></thead><tbody>
            ${rows.map(r => `<tr><td>${r[0]}</td><td class="n">${r[1]}</td><td class="n">${r[2]}</td></tr>`).join('')}
            <tr class="tot"><td>主線總分</td><td class="n">${sc.main}</td><td class="n">${JB.MAX_MAIN}</td></tr>
            ${sc.cases ? `<tr><td>進階卷宗加分</td><td class="n">${sc.cases}</td><td class="n">—</td></tr>` : ''}</tbody></table>
          <div class="row between"><span>偵探等級 <b>Lv.${L.n} ${L.zh}</b> <span class="muted">${L.en}</span></span><span class="num">${sc.total} 分</span></div>
          <div class="row" style="gap:6px">${JB.ACHIEVEMENTS.map(a => `<span title="${a.zh}">${ui.badge(a, !!S.ach[a.id])}</span>`).join('')}</div>
          <div class="row"><a class="btn btn-gold btn-sm" href="#honor">${I('trophy')} 榮譽殿堂</a><a class="btn btn-navy btn-sm" href="#cases">${I('seal')} 進階卷宗</a><a class="btn btn-ghost btn-sm" href="#m4">${I('refresh')} 重新審理</a></div>
        </article>
      </section>
      <section class="frame cert">
        <p class="eyebrow">Kaifeng Prefecture · Certificate of Closure</p><h3>結案令</h3>
        <p class="body">茲證明偵探 <b style="color:var(--verm)">「${ui.esc(S.player.name || '無名偵探')}」</b>，於開封府金融偵探學院偵破「人生資產懸案」，明辨股票、ETF、本益比、殖利率與風險之理，判決等級「<b>${R.zh}</b>」，特頒此令。</p>
        <div class="sign"><span>${ds}</span><span class="brand-seal">包</span><span>開封府尹 包拯</span></div>
      </section>
      <section class="frame pad" style="display:flex;flex-direction:column;gap:12px">
        <span class="ribbon">本案學說 <small>Key Concepts</small></span>
        <div class="concepts">${JB.CONCEPTS.map(c => `<div class="concept"><h4>${c.t}<small>${c.en}</small></h4><p>${c.p}</p>${c.bars ? `<div class="cbars" aria-hidden="true">${c.bars.map(h => `<i style="height:${h}%"></i>`).join('')}</div><p class="muted" style="font-size:12px;margin-top:4px">需求 → 買盤 → 增加 → 價格壓力↑</p>` : ''}</div>`).join('')}</div>
        <div class="note"><b>本案結語：投資新手的五項基本功</b><br>${JB.FIVE_SKILLS.map(([e,z]) => `<b class="en">${e}</b> ${z}`).join('；')}。</div>
      </section>
      <p class="disclaimer">教學聲明：本互動教材僅用於英文與金融基礎知識教育，不構成個別投資建議。</p>`;
  }
};

JB.views.honor = {
  render(el){
    const st = JB.store, S = st.S, ui = JB.ui, I = JB.ICON;
    const sc = st.scores(), L = st.level(sc.total), d = st.dims();
    const rows = st.board();
    const nTerms = st.cnt(S.academy.learned) + st.cnt(S.m1.learned);
    el.innerHTML = `
      ${JB.vh.head({ribbon:'成就與排名', ribbonEn:'Achievements & Ranking', title:'榮譽殿堂', en:'Hall of Honor', img:JB.ASSETS.scenes.ranking, alt:'獎盃與旗幟'})}
      <section class="honor">
        <aside class="frame pad profile">
          <span class="ribbon">偵探檔案 <small>Player Profile</small></span>
          <div class="who">${ui.portrait('wang', 'report')}<div><b>${ui.esc(S.player.name || '無名偵探')}</b><span>Lv.${L.n} ${L.zh} · ${L.en}</span></div></div>
          <div class="score-big">${I('star')}<span class="num">${sc.total}</span></div>
          <div class="lvl-line"><div class="row between"><span>距離下一級</span><span class="num muted">${L.next ? `${sc.total} / ${L.next}` : '已達最高級'}</span></div><div class="bar"><span style="width:${Math.round(L.pct*100)}%"></span></div></div>
          <div class="levels">${JB.LEVELS.map((x,i) => `<div class="${i+1 === L.n ? 'on' : ''}">${x.zh}<b>${x.min}+</b></div>`).join('')}</div>
          <div class="kv"><span>完成任務</span><b>${st.stage()} / 4</b></div>
          <div class="kv"><span>學會詞彙</span><b>${nTerms} / 21</b></div>
          <div class="kv"><span>獲得成就</span><b>${Object.keys(S.ach).length} / ${JB.ACHIEVEMENTS.length}</b></div>
          <div class="kv"><span>五大面向平均</span><b>${d.overall ?? '—'}</b></div>
          <div class="row"><button type="button" class="btn btn-navy btn-sm" data-act="settings">${I('gear')} 修改大名／重置</button>${S.m4.done ? `<a class="btn btn-gold btn-sm" href="#report">${I('scroll')} 成績報告</a>` : ''}</div>
        </aside>
        <div style="display:flex;flex-direction:column;gap:18px;min-width:0">
          <section class="frame pad" style="display:flex;flex-direction:column;gap:12px">
            <span class="ribbon">成就 <small>Achievements</small></span>
            <div class="ach-grid">${JB.ACHIEVEMENTS.map(a => { const t = S.ach[a.id]; return `<div class="ach ${t ? '' : 'lock'}">${ui.badge(a, !!t)}<div><b>${a.zh}</b><i>${a.en}</i><p>${a.desc}</p>${t ? `<span class="when">${new Date(t).toLocaleDateString('zh-TW')} 獲得</span>` : ''}</div></div>`; }).join('')}</div>
          </section>
          <section class="frame pad" style="display:flex;flex-direction:column;gap:10px">
            <span class="ribbon">本機排行榜 <small>Leaderboard</small></span>
            ${rows.length ? `<div style="overflow-x:auto"><table class="lb"><thead><tr><th>#</th><th>偵探</th><th>判決等級</th><th class="n">面向平均</th><th class="n">主線得分</th><th>日期</th></tr></thead><tbody>${rows.map((r,i) => `<tr><td class="n">${i+1}</td><td>${ui.esc(r.name)}</td><td>${r.rank}</td><td class="n">${r.pct}</td><td class="n">${r.score}</td><td>${new Date(r.date).toLocaleDateString('zh-TW')}</td></tr>`).join('')}</tbody></table></div>`
              : `<p class="muted">完成任務四「斷案宣判」後，成績會記錄在這台裝置的排行榜。</p>`}
          </section>
          <section class="frame pad" style="display:flex;flex-direction:column;gap:10px">
            <span class="ribbon">遊戲紀錄 <small>Game Log</small></span>
            ${S.log.length ? `<ul class="log">${S.log.map(l => `<li>${I(l.i || 'check')}<span>${ui.esc(l.m)}</span><time>${new Date(l.t).toLocaleString('zh-TW',{month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit'})}</time></li>`).join('')}</ul>` : '<p class="muted">還沒有紀錄。開始辦案後，每一步都會記在這裡。</p>'}
          </section>
        </div>
      </section>`;
  }
};
