/* Inline SVG icon set (no icon font needed) */
JB.ICON = (function(){
  const P = {
    home:'<path d="M3 11 12 4l9 7"/><path d="M5 10v10h5v-6h4v6h5V10"/>',
    users:'<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.5"/><path d="M15.5 14.2c3 .2 5.5 2.6 5.5 5.8"/>',
    book:'<path d="M4 5c3-1.3 6-1.3 8 .5 2-1.8 5-1.8 8-.5v14c-3-1.3-6-1.3-8 .5-2-1.8-5-1.8-8-.5z"/><path d="M12 5.5v14"/>',
    scroll:'<path d="M7 4h11a2 2 0 0 1 2 2v1h-4"/><path d="M16 7v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1h10"/><path d="M7 4a2 2 0 0 0-2 2v11"/><path d="M9 9h5M9 13h5"/>',
    magnifier:'<circle cx="10.5" cy="10.5" r="6"/><path d="m15 15 5.5 5.5"/>',
    gavel:'<path d="m13 4 7 7"/><path d="m10.5 6.5 7 7"/><path d="m12 5-4 4 7 7 4-4"/><path d="m10 13-7 7"/><path d="M3 21h9"/>',
    puzzle:'<path d="M9 3h4v2.5a1.8 1.8 0 1 0 3.5 0V3H20v6h-2.5a1.8 1.8 0 1 0 0 3.5H20V20h-6v-2.5a1.8 1.8 0 1 0-3.5 0V20H4v-6h2.5a1.8 1.8 0 1 0 0-3.5H4V3z"/>',
    trophy:'<path d="M8 4h8v5a4 4 0 0 1-8 0z"/><path d="M8 6H4.5a3 3 0 0 0 3.5 4M16 6h3.5a3 3 0 0 1-3.5 4"/><path d="M12 13v4M8 20h8M9 17h6"/>',
    medal:'<circle cx="12" cy="14" r="5.5"/><path d="M8 3h3l1 5M16 3h-3l-1 5"/><path d="m12 11.5.9 1.9 2 .3-1.5 1.4.4 2-1.8-1-1.8 1 .4-2-1.5-1.4 2-.3z"/>',
    chart:'<path d="M4 20V4"/><path d="M4 20h16"/><path d="m7 15 4-4 3 3 5-6"/>',
    gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/>',
    help:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .9-1 1.6V14"/><circle cx="12" cy="17.2" r=".6" fill="currentColor"/>',
    sound:'<path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16 8.5a4.5 4.5 0 0 1 0 7M18.5 6a8 8 0 0 1 0 12"/>',
    mute:'<path d="M4 9h4l5-4v14l-5-4H4z"/><path d="m16.5 9.5 5 5M21.5 9.5l-5 5"/>',
    music:'<path d="M9 18V5l11-2v13"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/>',
    play:'<path d="M7 4.5v15l12-7.5z"/>',
    lock:'<rect x="5" y="11" width="14" height="10" rx="1.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    check:'<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    x:'<path d="M6 6l12 12M18 6 6 18"/>',
    arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',
    back:'<path d="M19 12H5M11 6l-6 6 6 6"/>',
    flip:'<path d="M4 9a8 8 0 0 1 14-3l2 2"/><path d="M20 4v4h-4"/><path d="M20 15a8 8 0 0 1-14 3l-2-2"/><path d="M4 20v-4h4"/>',
    star:'<path d="m12 3 2.8 5.8 6.2.9-4.5 4.4 1.1 6.2L12 17.3l-5.6 3 1.1-6.2L3 9.7l6.2-.9z"/>',
    shield:'<path d="M12 3 4.5 6v6c0 4.5 3.2 7.8 7.5 9 4.3-1.2 7.5-4.5 7.5-9V6z"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
    seal:'<rect x="5" y="5" width="14" height="14" rx="1"/><path d="M9 9h6M12 9v6M9 15h6"/>',
    menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',
    clock:'<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    tools:'<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h8M8 11h2M12 11h2M16 11h0M8 15h2M12 15h2M16 15v2"/>',
    refresh:'<path d="M20 11a8 8 0 0 0-14.5-4.5L4 8"/><path d="M4 4v4h4"/><path d="M4 13a8 8 0 0 0 14.5 4.5L20 16"/><path d="M20 20v-4h-4"/>',
    fire:'<path d="M12 3c1 3.5 5 5 5 10a5 5 0 0 1-10 0c0-2.5 1.5-4 2.5-5 0 2 1 3 2 3 0-3-1-5 .5-8z"/>'
  };
  return function(name, cls){
    return `<svg class="ico ${cls||''}" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${P[name]||''}</svg>`;
  };
})();
