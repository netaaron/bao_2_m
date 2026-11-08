/* Character Gallery: full-body stage + 8 expressions per character */
JB.views.gallery = {
  bg(){ return 'honor'; },
  render(el, p){
    const id = p || JB.galleryLast || 'bao'; JB.galleryLast = id;
    const C = JB.CHARACTERS[id], ui = JB.ui, I = JB.ICON;
    let expr = 'full';
    const bodySrc = JB.body(id);
    const list = ['bao','gongsun','zhan','wang'].map(k => {
      const c = JB.CHARACTERS[k];
      return `<a class="gal-pick ${k === id ? 'on' : ''}" href="#gallery-${k}" ${k === id ? 'aria-current="page"' : ''}>${ui.portrait(k, 'neutral')}<span><b>${c.name}</b><span>${c.en}</span></span></a>`;
    }).join('');
    const exprBtns = `<button type="button" class="expr full on" data-e="full"><span class="ph"><img src="${bodySrc}" alt="${C.name} 全身立繪"></span><span>全身<i>Full Body</i></span></button>` +
      C.expressions.map(e => `<button type="button" class="expr" data-e="${e.key}"><span class="ph"><img src="${JB.face(id, e.key)}" alt="${C.name} ${e.zh}" loading="lazy"></span><span>${e.zh}<i>${e.en}</i></span></button>`).join('');
    el.innerHTML = `
      ${JB.vh.head({ribbon:'角色圖鑑', ribbonEn:'Character Gallery', title:'開封府金融偵探小組', en:'Meet the Detective Team', img:JB.ASSETS.scenes['loc-court'], alt:'開封府大堂與四位角色',
        lead:'點選人物查看介紹、職責與故事；點選右側表情，中央立繪會即時切換。'})}
      <section class="gal">
        <nav class="gal-list" aria-label="選擇角色">${list}</nav>
        <div class="gal-stage frame-dark">
          <span class="halo"></span>
          <div class="gal-img" id="gal-img"><img src="${bodySrc}" alt="${C.name} 全身立繪"></div>
          <div class="gal-cap"><span class="ribbon" id="gal-cap">${C.name} · 全身 <small>Full Body</small></span>
            <button type="button" class="mini-say" data-act="say" data-text="${ui.esc(C.quote.en)}" aria-label="聽${C.name}說一句">${I('sound')}</button></div>
        </div>
        <div class="gal-side">
          <article class="gal-info frame">
            <h2>${C.name}<small>${C.en}</small></h2>
            <p class="role">${C.role}</p>
            <div class="pills">${C.personality.map(t => `<span>${t}</span>`).join('')}</div>
            <p class="eyebrow">Duties 職責</p>
            <ul>${C.duties.map(d => `<li>${d}</li>`).join('')}</ul>
            <p class="story">${C.story}</p>
            <q>${C.quote.en}</q><p class="qzh">${C.quote.zh}</p>
          </article>
          <div class="frame"><div class="expr-grid" role="group" aria-label="${C.name} 的表情">${exprBtns}</div></div>
        </div>
      </section>
      <section aria-label="場景圖鑑"><div class="row between" style="margin-bottom:10px"><span class="ribbon">場景圖鑑 <small>Locations</small></span></div>
        <div class="map-grid">${[['loc-court','#home','開封府大堂 · 首頁'],['loc-study','#academy','金融知識書齋'],['loc-investigation','#m3','金融調查室 · 任務三'],['loc-trading','#tools','現代金融交易室 · 工具'],['loc-judgment','#m4','最終審判大堂 · 任務四'],['loc-honor','#honor','結案榮譽殿堂']].map(([k,h,t]) => `<a class="map-tile" href="${h}"><img src="${JB.asset(JB.ASSETS.scenes[k])}" alt="" loading="lazy"><span>${t}</span></a>`).join('')}</div></section>
      <div class="row between"><a class="btn btn-ghost" href="#home">${I('back')} 回首頁</a><button type="button" class="btn btn-red" data-act="start">${JB.store.S.seen.briefing ? '繼續辦案' : '開始辦案'} ${I('arrow')}</button></div>`;
    el.onclick = e => {
      const b = e.target.closest('.expr'); if(!b) return;
      expr = b.dataset.e; JB.audio.sfx('flip');
      el.querySelectorAll('.expr').forEach(x => x.classList.toggle('on', x === b));
      const box = el.querySelector('#gal-img'), info = expr === 'full' ? {zh:'全身', en:'Full Body'} : C.expressions.find(x => x.key === expr);
      box.classList.toggle('bust', expr !== 'full');
      box.innerHTML = `<img src="${expr === 'full' ? bodySrc : JB.face(id, expr)}" alt="${C.name} ${info.zh}">`;
      el.querySelector('#gal-cap').innerHTML = `${C.name} · ${info.zh} <small>${info.en}</small>`;
    };
  }
};
