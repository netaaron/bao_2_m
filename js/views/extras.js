/* Case Files (進階卷宗) and Financial Tools (金融工具) views — both powered by the ported JB.CF module */
JB.views.cases = {
  bg(){ return 'investigation'; },
  render(el, p){
    const I = JB.ICON;
    el.innerHTML = '';
    if(!p){
      el.innerHTML = JB.vh.head({ribbon:'案例分析', ribbonEn:'Case Study', title:'進階卷宗', en:'Advanced Case Files', img:JB.ASSETS.scenes.casestudy, alt:'包青天研究案例',
        lead:'五大人生資產課題：財富增長、風險防禦、目標規劃、資產配置、人生平衡。每卷都有互動實驗、英文審問與一隻投資妖怪。五案全破，開啟終極大審。進階卷宗的分數計入總分與等級。',
        extra:`<div class="row"><a class="btn btn-gold btn-sm" href="#tools">${I('chart')} 只想用試算工具</a></div>`});
    }
    JB.CF.render(el, p);
  }
};
JB.views.tools = {
  bg(){ return 'trading'; },
  render(el){
    const I = JB.ICON;
    const tabs = [['compound','複利煉金爐','Compound Interest','scenes/tools.webp'],['drawdown','回本照妖鏡','Drawdown & Leverage'],['goal','超前部署審判庭','Goal & CAGR'],['portfolio','黃金組合沙盤','Portfolio Sandbox']];
    let cur = JB.toolTab || 'compound'; JB.toolTab = null;
    el.innerHTML = `
      ${JB.vh.head({ribbon:'金融工具', ribbonEn:'Financial Tools', title:'模擬試算實驗室', en:'Calculators & Investment Game', img:JB.ASSETS.scenes.game, alt:'模擬投資的筆電與牛熊',
        lead:'把課堂學到的觀念拿來算：複利、虧損回本、目標所需報酬率、資產配置在不同行情下的表現。'})}
      ${JB.ui.dialog('wang', 'happy', '這裡的工具隨時可以用！拉動滑桿或輸入數字，結果會立刻更新。', 'Move the sliders and watch the numbers change.', {cls:'dlg-in'})}
      <nav class="row tool-tabs" role="tablist" aria-label="選擇工具">${tabs.map(t => `<button type="button" role="tab" class="btn ${t[0] === cur ? 'btn-gold' : 'btn-navy'} btn-sm" data-tab="${t[0]}" aria-selected="${t[0] === cur}">${t[1]} <small class="en" style="font-weight:400;font-style:italic;font-size:13px">${t[2]}</small></button>`).join('')}</nav>
      <div id="tool-box"></div>
      <p class="disclaimer">試算採年複利等簡化假設，情境報酬為教學示意，不構成投資建議。</p>`;
    const box = el.querySelector('#tool-box');
    const draw = () => JB.CF.renderTool(box, cur);
    draw();
    el.onclick = e => {
      const t = e.target.closest('[data-tab]'); if(!t) return;
      cur = t.dataset.tab; JB.audio.sfx('click');
      el.querySelectorAll('[data-tab]').forEach(b => { const on = b === t; b.classList.toggle('btn-gold', on); b.classList.toggle('btn-navy', !on); b.setAttribute('aria-selected', on); });
      draw();
    };
  }
};
