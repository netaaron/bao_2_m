/* UI helpers: dialogue, modal/confirm, toast, score float, achievement & unlock pops, particles, image fallback */
JB.ui = (function(){
  const $ = id => document.getElementById(id);
  const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  const zhOn = () => JB.store.S.settings.zh;

  /* ---- character dialogue ---- */
  function portrait(id, expr, cls){
    const C = JB.CHARACTERS[id];
    return `<figure class="portrait ${cls||''}" data-char="${id}"><img src="${JB.face(id, expr)}" alt="${C.name}（${(C.expressions.find(e => e.key === expr)||C.expressions[0]).zh}）" data-expr="${expr}"></figure>`;
  }
  function dialog(id, expr, zh, en, opts){
    opts = opts || {};
    const C = JB.CHARACTERS[id];
    return `<div class="dlg ${opts.cls||''}" id="${opts.id||''}" data-char="${id}">
      ${portrait(id, expr, 'dlg-face')}
      <div class="dlg-body"><p class="dlg-name"><b>${C.name}</b><span>${C.en} · ${C.title}</span></p>
        <p class="dlg-zh">${zh}</p>${en ? `<p class="dlg-en">${en}${opts.speak !== false ? ` <button type="button" class="mini-say" data-act="say" data-text="${esc(en.replace(/<[^>]+>/g,''))}" aria-label="朗讀英文">${JB.ICON('sound')}</button>` : ''}</p>` : ''}</div>
    </div>`;
  }
  function say(el, id, expr, zh, en){
    if(typeof el === 'string') el = $(el); if(!el) return;
    const tmp = document.createElement('div'); tmp.innerHTML = dialog(id, expr, zh, en, {id:el.id, cls:(el.className.replace(/\bdlg\b|\bdlg-in\b/g,'')).trim()});
    const n = tmp.firstElementChild; n.classList.add('dlg-in'); el.replaceWith(n);
  }
  function react(el, id, expr){
    if(typeof el === 'string') el = $(el); if(!el) return;
    const img = el.querySelector('.dlg-face img, img'); if(!img) return;
    img.src = JB.face(id, expr); img.dataset.expr = expr;
    const f = img.closest('.portrait'); if(f){ f.classList.remove('pop'); void f.offsetWidth; f.classList.add('pop'); }
  }

  /* ---- toast ---- */
  let toastT;
  function toast(msg, kind){
    const t = $('jb-toast'); t.className = 'toast show ' + (kind||''); t.innerHTML = msg;
    clearTimeout(toastT); toastT = setTimeout(() => t.className = 'toast', 2200);
  }

  /* ---- modal ---- */
  let modalClose = null;
  function modal(o){
    const m = $('jb-modal');
    m.innerHTML = `<div class="modal-card frame ${o.wide?'wide':''}" role="dialog" aria-modal="true" aria-labelledby="jb-m-title">
      <div class="modal-head"><h3 id="jb-m-title">${o.title||''}</h3><button type="button" class="x-btn" data-modal="close" aria-label="關閉">${JB.ICON('x')}</button></div>
      <div class="modal-body">${o.html||''}</div>
      ${o.actions ? `<div class="modal-actions">${o.actions.map((a,i) => `<button type="button" class="btn ${a.cls||'btn-navy'}" data-modal="${i}">${a.label}</button>`).join('')}</div>` : ''}
    </div>`;
    m.hidden = false; document.body.classList.add('modal-open');
    modalClose = o.onClose || null;
    m.onclick = e => {
      const b = e.target.closest('[data-modal]');
      if(e.target === m || (b && b.dataset.modal === 'close')){ close(); return; }
      if(b){ const a = o.actions[+b.dataset.modal]; const keep = a.onClick && a.onClick(m) === false; if(!keep) close(); }
    };
    setTimeout(() => { const f = m.querySelector('input,button.btn'); f && f.focus(); }, 30);
    if(o.onOpen) o.onOpen(m);
  }
  function close(){ const m = $('jb-modal'); if(m.hidden) return; m.hidden = true; m.innerHTML = ''; document.body.classList.remove('modal-open'); const f = modalClose; modalClose = null; f && f(); }
  function confirm(title, text, okLabel){
    return new Promise(res => modal({title, html:`<p>${text}</p>`, actions:[{label:'取消', cls:'btn-ghost', onClick:() => res(false)}, {label:okLabel||'確定', cls:'btn-red', onClick:() => res(true)}], onClose:() => res(false)}));
  }

  /* ---- score / reward animations ---- */
  function float(el, text, kind){
    try{
      const r = (el && el.getBoundingClientRect) ? el.getBoundingClientRect() : {left:innerWidth/2, top:innerHeight/2, width:0};
      const f = document.createElement('div'); f.className = 'float-pts ' + (kind||''); f.textContent = text;
      f.style.left = (r.left + r.width/2) + 'px'; f.style.top = (r.top) + 'px';
      document.body.appendChild(f); setTimeout(() => f.remove(), 1200);
    }catch(e){}
    bumpScore();
  }
  function bumpScore(){ const s = $('hud-score'); if(s){ s.classList.remove('bump'); void s.offsetWidth; s.classList.add('bump'); } }
  const popQ = []; let popping = false;
  function pop(html, cls, ms){ popQ.push({html, cls, ms}); if(!popping) nextPop(); }
  function nextPop(){
    const p = popQ.shift(); if(!p){ popping = false; return; }
    popping = true; const el = $('jb-pop'); el.className = 'pop-wrap show ' + (p.cls||''); el.innerHTML = p.html;
    setTimeout(() => { el.className = 'pop-wrap'; setTimeout(nextPop, 350); }, p.ms || 2600);
  }
  function achievement(a){
    JB.audio.sfx('ach');
    pop(`<div class="pop-card ach">${badge(a, true)}<div><p class="pop-k">成就解鎖 Achievement Unlocked</p><p class="pop-t">${a.zh} <span>${a.en}</span></p><p class="pop-d">${a.desc}</p></div></div>`, 'p-ach', 3200);
  }
  function unlock(id){
    JB.audio.sfx('unlock');
    pop(`<div class="pop-card unlock"><span class="lock-anim">${JB.ICON('lock')}</span><div><p class="pop-k">關卡解鎖 Unlocked</p><p class="pop-t">${JB.UNLOCK_NAME[id]||id}</p></div></div>`, 'p-unlock', 2400);
  }
  function badge(a, on){
    return `<span class="badge ${on?'on':''}" aria-hidden="true"><svg viewBox="0 0 64 72"><polygon points="32,2 62,19 62,53 32,70 2,53 2,19" class="b-out"/><polygon points="32,8 57,22 57,50 32,64 7,50 7,22" class="b-in"/></svg><span class="b-ico">${on ? JB.ICON(a.icon) : '?'}</span></span>`;
  }
  function flash(cls){ const f = $('jb-flash'); f.className = 'flash ' + (cls||''); void f.offsetWidth; f.classList.add('go'); }

  /* ---- particles: drifting petals and gold dust ---- */
  const particles = (function(){
    let cv, g, P = [], raf = null, w = 0, h = 0;
    function size(){ const d = Math.min(2, devicePixelRatio||1); w = innerWidth; h = innerHeight; cv.width = w*d; cv.height = h*d; g.setTransform(d,0,0,d,0,0); }
    function seed(){ P = []; const n = Math.round(Math.min(34, w/40)); for(let i=0;i<n;i++) P.push(make(true)); }
    function make(any){ const petal = Math.random() < .55; return {x:Math.random()*w, y:any ? Math.random()*h : -20, r: petal ? 4+Math.random()*4 : 1+Math.random()*1.6, vx:.15+Math.random()*.35, vy: petal ? .35+Math.random()*.45 : -.1-Math.random()*.2, a:Math.random()*6.28, va:(Math.random()-.5)*.03, petal, o:.35+Math.random()*.45}; }
    function frame(){
      g.clearRect(0,0,w,h);
      for(const p of P){
        p.x += p.vx + Math.sin(p.a)*.25; p.y += p.vy; p.a += p.va;
        if(p.y > h+20 || p.x > w+20 || p.y < -30){ Object.assign(p, make(false)); if(!p.petal) p.y = h + 10; p.x = Math.random()*w*.9; }
        g.globalAlpha = p.o;
        if(p.petal){ g.save(); g.translate(p.x,p.y); g.rotate(p.a); g.fillStyle = '#f4b9c8'; g.beginPath(); g.ellipse(0,0,p.r,p.r*.55,0,0,6.28); g.fill(); g.fillStyle = '#fbd9e2'; g.beginPath(); g.ellipse(-p.r*.3,-p.r*.1,p.r*.45,p.r*.22,0,0,6.28); g.fill(); g.restore(); }
        else { g.fillStyle = '#e8c374'; g.beginPath(); g.arc(p.x,p.y,p.r,0,6.28); g.fill(); }
      }
      g.globalAlpha = 1; raf = requestAnimationFrame(frame);
    }
    function start(){ cv = cv || $('jb-particles'); if(!cv) return; g = g || cv.getContext('2d'); size(); seed(); if(!raf) raf = requestAnimationFrame(frame); cv.hidden = false; }
    function stop(){ if(raf && raf !== 'paused') cancelAnimationFrame(raf); raf = null; cv = cv || $('jb-particles'); if(cv){ cv.hidden = true; } }
    addEventListener('resize', () => { if(raf){ size(); } });
    document.addEventListener('visibilitychange', () => { if(document.hidden){ if(raf){ cancelAnimationFrame(raf); raf = 'paused'; } } else if(raf === 'paused'){ raf = requestAnimationFrame(frame); } });
    return {start, stop};
  })();

  /* ---- image fallback ---- */
  document.addEventListener('error', e => {
    const im = e.target;
    if(!(im instanceof HTMLImageElement) || im.dataset.failed) return;
    im.dataset.failed = '1';
    const label = (im.alt || '圖片').slice(0, 6);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240"><rect width="200" height="240" fill="#173152"/><rect x="8" y="8" width="184" height="224" fill="none" stroke="#C89B45" stroke-width="3"/><text x="100" y="128" font-size="26" text-anchor="middle" fill="#E5C27A" font-family="serif">${label.replace(/[<&]/g,'')}</text></svg>`;
    im.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    im.classList.add('img-fallback');
  }, true);

  function marked(text, act){
    return text.replace(/\{\{([^}|]+)(?:\|([^}]+))?\}\}/g, (m,k,d) => `<button type="button" class="term" data-act="${act||'vocab-term'}" data-term="${esc(k)}">${d||k}</button>`);
  }
  const plain = text => text.replace(/\{\{([^}|]+)(?:\|([^}]+))?\}\}/g, (m,k,d) => d||k);
  function hideToast(){ clearTimeout(toastT); const t = $('jb-toast'); if(t) t.className = 'toast'; }
  return {hideToast, esc, zhOn, portrait, dialog, say, react, toast, modal, close, confirm, float, bumpScore, achievement, unlock, badge, flash, particles, marked, plain};
})();
