/* Audio: background music (user-supplied track, looped), synthesized sound effects (Web Audio API) and English speech.
   Every call is wrapped so a blocked or missing audio API never stops the game. */
JB.audio = (function(){
  let ctx = null, master = null, synthGain = null, synthTimer = null;
  const set = () => JB.store.S.settings;

  /* ---------- Web Audio (sound effects + fallback music) ---------- */
  function ac(){
    if(ctx) return ctx;
    try{
      const C = window.AudioContext || window.webkitAudioContext; if(!C) return null;
      ctx = new C(); master = ctx.createGain(); master.gain.value = .5; master.connect(ctx.destination);
    }catch(e){ ctx = null; }
    return ctx;
  }
  function tone(freq, t0, dur, type, vol, dest){
    const c = ac(); if(!c) return;
    const o = c.createOscillator(), g = c.createGain();
    o.type = type || 'sine'; o.frequency.setValueAtTime(freq, c.currentTime + t0);
    g.gain.setValueAtTime(0.0001, c.currentTime + t0);
    g.gain.exponentialRampToValueAtTime(vol || .2, c.currentTime + t0 + .015);
    g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + t0 + dur);
    o.connect(g); g.connect(dest || master); o.start(c.currentTime + t0); o.stop(c.currentTime + t0 + dur + .05);
  }
  function noise(t0, dur, vol){
    const c = ac(); if(!c) return;
    const b = c.createBuffer(1, c.sampleRate*dur, c.sampleRate), d = b.getChannelData(0);
    for(let i=0;i<d.length;i++) d[i] = (Math.random()*2-1) * Math.pow(1 - i/d.length, 3);
    const s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
    f.type = 'lowpass'; f.frequency.value = 900; g.gain.value = vol || .5;
    s.buffer = b; s.connect(f); f.connect(g); g.connect(master); s.start(c.currentTime + t0);
  }
  const SFX = {
    click(){ tone(660,0,.06,'triangle',.08); },
    flip(){ tone(520,0,.08,'sine',.1); tone(780,.05,.1,'sine',.08); },
    ok(){ tone(784,0,.18,'triangle',.18); tone(1175,.09,.28,'triangle',.16); },
    bad(){ tone(196,0,.22,'sawtooth',.07); tone(147,.08,.26,'sawtooth',.06); },
    coin(){ tone(988,0,.08,'square',.06); tone(1319,.07,.16,'square',.06); },
    unlock(){ [523,659,784,1047].forEach((f,i) => tone(f,i*.09,.35,'triangle',.14)); },
    ach(){ [659,784,988,1319,1568].forEach((f,i) => tone(f,i*.08,.5,'triangle',.12)); },
    gavel(){ noise(0,.35,.9); tone(110,0,.3,'sine',.35); }
  };
  function sfx(name){
    try{ if(!set().sound) return; const c = ac(); if(!c) return; if(c.state === 'suspended') c.resume(); SFX[name] && SFX[name](); }catch(e){}
  }

  /* ---------- background music: the supplied track ---------- */
  const BGM = JB.ASSETS.audio;
  let bgm = null, bgmFailed = false, pending = false, duck = 1, fadeT = null, announced = false, hiddenPause = false;
  function bgmLevel(){ const v = set().bgmVol; return Math.max(0, Math.min(1, (v === undefined ? .5 : v) * duck)); }
  function ensure(){
    if(bgm) return bgm;
    bgm = new Audio(); bgm.preload = 'auto'; bgm.loop = true; bgm.volume = 0;
    bgm.addEventListener('error', () => {
      if(bgmFailed) return; bgmFailed = true;
      if(set().music){ startSynth(); try{ JB.ui.toast('背景音樂檔案無法載入，已改用內建音樂。', 'bad'); }catch(e){} }
    });
    bgm.src = JB.asset(BGM.bgm);
    return bgm;
  }
  function fadeTo(v, ms, then){
    if(!bgm) return; clearInterval(fadeT);
    const from = bgm.volume, t0 = performance.now();
    fadeT = setInterval(() => {
      const k = Math.min(1, (performance.now() - t0) / ms);
      try{ bgm.volume = Math.max(0, Math.min(1, from + (v - from) * k)); }catch(e){}
      if(k >= 1){ clearInterval(fadeT); then && then(); }
    }, 40);
  }
  function startMusic(){
    if(!set().music) return;
    if(bgmFailed){ startSynth(); return; }
    try{
      const a = ensure(); pending = false;
      const p = a.play();
      const ok = () => { fadeTo(bgmLevel(), 1500); if(!announced){ announced = true; try{ JB.ui.toast(`${JB.ICON('music')} 背景音樂：〈${BGM.title}〉`); }catch(e){} } };
      if(p && p.then) p.then(ok).catch(err => { if(err && err.name === 'NotAllowedError') pending = true; else if(!bgmFailed){ bgmFailed = true; startSynth(); } });
      else ok();
    }catch(e){ bgmFailed = true; startSynth(); }
  }
  function stopMusic(){
    pending = false; stopSynth();
    if(bgm && !bgm.paused) fadeTo(0, 600, () => { try{ bgm.pause(); }catch(e){} });
  }
  function setVolume(v){ set().bgmVol = v; if(bgm && !bgm.paused) fadeTo(bgmLevel(), 150); }
  function duckTo(f){ duck = f; if(bgm && !bgm.paused) fadeTo(bgmLevel(), 300); }
  function playing(){ return !!(bgm && !bgm.paused) || !!synthTimer; }
  // browsers only allow sound after a user gesture: retry on the first tap / key press
  const retry = () => { if(pending && set().music) startMusic(); };
  document.addEventListener('pointerdown', retry, true);
  document.addEventListener('keydown', retry, true);
  document.addEventListener('visibilitychange', () => {
    if(document.hidden){ if(bgm && !bgm.paused){ hiddenPause = true; bgm.pause(); } }
    else if(hiddenPause){ hiddenPause = false; if(set().music) startMusic(); }
  });

  /* ---------- fallback: synthesized pentatonic ambience ---------- */
  const SCALE = [261.6, 293.7, 329.6, 392, 440, 523.3, 587.3, 659.3];
  function startSynth(){
    try{
      const c = ac(); if(!c || synthTimer) return; if(c.state === 'suspended') c.resume();
      synthGain = c.createGain(); synthGain.gain.value = .0; synthGain.connect(master);
      synthGain.gain.linearRampToValueAtTime(.35, c.currentTime + 2);
      let step = 0;
      const bar = () => {
        const root = [0,3,4,2][Math.floor(step/4)%4];
        tone(SCALE[root]/2, 0, 2.4, 'sine', .07, synthGain);
        tone(SCALE[(root + [0,2,4,5,4,2][step%6]) % SCALE.length], .1, 1.4, 'triangle', .05, synthGain);
        if(step % 2) tone(SCALE[(root+4)%SCALE.length]*2, .7, 1.1, 'sine', .025, synthGain);
        step++;
      };
      bar(); synthTimer = setInterval(bar, 1300);
    }catch(e){}
  }
  function stopSynth(){
    try{ if(synthTimer){ clearInterval(synthTimer); synthTimer = null; } if(synthGain && ctx){ synthGain.gain.linearRampToValueAtTime(0, ctx.currentTime + .6); } }catch(e){}
  }

  /* ---------- English speech (music ducks while speaking) ---------- */
  let unduckT = null;
  function speak(text, onFail){
    try{
      if(!('speechSynthesis' in window)){ onFail && onFail(); return false; }
      speechSynthesis.cancel();
      const t = String(text).replace(/_{3,}/g,'blank');
      const u = new SpeechSynthesisUtterance(t);
      u.lang = 'en-US'; u.rate = set().rate || .9;
      const v = speechSynthesis.getVoices().find(v => /en[-_]US/i.test(v.lang)); if(v) u.voice = v;
      const restore = () => { clearTimeout(unduckT); duckTo(1); };
      u.onstart = () => duckTo(.3); u.onend = restore; u.onerror = restore;
      clearTimeout(unduckT); unduckT = setTimeout(restore, 2500 + t.length * 90);
      speechSynthesis.speak(u); return true;
    }catch(e){ onFail && onFail(); return false; }
  }
  return {sfx, startMusic, stopMusic, setVolume, playing, speak, unlock(){ try{ const c = ac(); c && c.state === 'suspended' && c.resume(); }catch(e){} }};
})();
