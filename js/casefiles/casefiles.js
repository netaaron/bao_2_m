/* Case Files module — ported from the first Justice Bao 2.0 build (5 cases, 4 financial labs, grand trial). */
(function(){
const VILLAIN_SVG = {
moth: `<svg viewBox="0 0 120 120" aria-hidden="true">
<polygon points="60,52 16,18 8,48 40,62" fill="#8d7f6c"/><polygon points="60,52 16,18 34,46" fill="#a89882"/>
<polygon points="60,52 104,18 112,48 80,62" fill="#7b6e5d"/><polygon points="60,52 104,18 86,46" fill="#958670"/>
<polygon points="60,60 30,66 24,96 52,80" fill="#6f6352"/><polygon points="60,60 30,66 44,78" fill="#857764"/>
<polygon points="60,60 90,66 96,96 68,80" fill="#62574a"/><polygon points="60,60 90,66 76,78" fill="#786b5a"/>
<circle cx="30" cy="40" r="7" fill="#d9a441" stroke="#7a5a1c" stroke-width="1.5"/><rect x="27.5" y="37.5" width="5" height="5" fill="#7a5a1c"/>
<circle cx="90" cy="40" r="7" fill="#d9a441" stroke="#7a5a1c" stroke-width="1.5"/><rect x="87.5" y="37.5" width="5" height="5" fill="#7a5a1c"/>
<polygon points="60,38 65,56 60,96 55,56" fill="#3b322a"/>
<path d="M57 40 L44 20 M63 40 L76 20" stroke="#3b322a" stroke-width="2" fill="none" stroke-linecap="round"/>
<circle cx="44" cy="20" r="2.5" fill="#3b322a"/><circle cx="76" cy="20" r="2.5" fill="#3b322a"/>
</svg>`,
puffer: `<svg viewBox="0 0 120 120" aria-hidden="true">
<g fill="#c9862b"><polygon points="60,18 64,30 56,30"/><polygon points="88,28 82,39 77,33"/><polygon points="100,56 88,60 88,52"/><polygon points="90,90 80,84 85,79"/><polygon points="60,102 56,90 64,90"/><polygon points="30,92 35,80 40,86"/><polygon points="20,56 32,52 32,60"/><polygon points="32,26 43,32 37,37"/><polygon points="76,20 74,32 68,28"/><polygon points="44,20 52,28 46,32"/><polygon points="98,76 86,73 89,67"/><polygon points="22,76 33,68 35,75"/></g>
<polygon points="102,62 116,46 114,78" fill="#d99a3a"/><polygon points="102,62 116,46 108,62" fill="#e8b45a"/>
<polygon points="60,28 84,36 94,60 84,84 60,92 36,84 26,60 36,36" fill="#e9b04c"/>
<polygon points="60,60 60,28 84,36" fill="#f2c56c"/><polygon points="60,60 84,36 94,60" fill="#dca13e"/><polygon points="60,60 94,60 84,84" fill="#e6ab47"/><polygon points="60,60 84,84 60,92" fill="#cf9536"/>
<polygon points="60,60 60,92 36,84" fill="#f0d79a"/><polygon points="60,60 36,84 26,60" fill="#f6e4b5"/><polygon points="60,60 26,60 36,36" fill="#f3c972"/><polygon points="60,60 36,36 60,28" fill="#f7d488"/>
<circle cx="44" cy="52" r="8" fill="#fff"/><circle cx="42" cy="52" r="4" fill="#1f1a17"/><circle cx="41" cy="50.5" r="1.3" fill="#fff"/>
<ellipse cx="30" cy="68" rx="4" ry="3.2" fill="#8a3b23"/>
<polygon points="66,26 80,14 78,30" fill="#d99a3a"/>
</svg>`,
fox: `<svg viewBox="0 0 120 120" aria-hidden="true">
<polygon points="14,10 48,38 26,58" fill="#d06d26"/><polygon points="21,22 40,38 28,49" fill="#3a2a22"/>
<polygon points="106,10 72,38 94,58" fill="#b85d1f"/><polygon points="99,22 80,38 92,49" fill="#3a2a22"/>
<polygon points="48,38 72,38 60,58" fill="#e8873a"/>
<polygon points="26,58 48,38 60,58 40,72" fill="#f0973f"/><polygon points="94,58 72,38 60,58 80,72" fill="#d77a2c"/>
<polygon points="26,58 40,72 14,76" fill="#f6ebd9"/><polygon points="94,58 80,72 106,76" fill="#e6d6bf"/>
<polygon points="40,72 60,58 60,106" fill="#f6ebd9"/><polygon points="60,58 80,72 60,106" fill="#e3d2b9"/>
<polygon points="53,98 67,98 60,108" fill="#2a211c"/>
<polygon points="40,58 52,60 50,64" fill="#2a211c"/><polygon points="80,58 68,60 70,64" fill="#2a211c"/>
<circle cx="88" cy="80" r="6" fill="#e2b14a" stroke="#8a6418" stroke-width="1.5"/><text x="88" y="83" font-size="7" text-anchor="middle" fill="#6b4c10" font-weight="700">$</text>
</svg>`,
hen: `<svg viewBox="0 0 120 120" aria-hidden="true">
<polygon points="86,48 106,20 98,58" fill="#c9b08a"/><polygon points="90,54 114,36 104,64" fill="#b39873"/>
<polygon points="30,62 58,40 92,46 100,70 70,86 38,82" fill="#f1e6d2"/>
<polygon points="58,40 92,46 70,60" fill="#e4d6bd"/><polygon points="70,60 92,46 100,70" fill="#d6c6aa"/>
<polygon points="54,56 82,54 72,72" fill="#cdbb9c"/>
<polygon points="26,30 44,24 50,46 34,52" fill="#f6eddc"/><polygon points="44,24 50,46 40,40" fill="#e6d8bf"/>
<polygon points="28,27 31,16 35,24 39,13 42,22 47,15 45,26" fill="#c8372d"/>
<polygon points="27,34 15,38 27,41" fill="#e2a23a"/>
<polygon points="29,43 26,52 33,47" fill="#c8372d"/>
<circle cx="34" cy="33" r="2.4" fill="#1f1a17"/>
<g fill="#fbf4e6" stroke="#cbb89a" stroke-width="1"><ellipse cx="38" cy="82" rx="7" ry="9"/><ellipse cx="52" cy="80" rx="7" ry="9"/><ellipse cx="66" cy="82" rx="7" ry="9"/><ellipse cx="80" cy="80" rx="7" ry="9"/><ellipse cx="93" cy="82" rx="6" ry="8"/></g>
<polygon points="22,84 104,84 96,110 30,110" fill="#a86b3c"/><polygon points="22,84 104,84 102,90 24,90" fill="#c4874f"/>
<path d="M28 98 H98 M45 90 L42 110 M63 90 L63 110 M81 90 L84 110" stroke="#7d4b25" stroke-width="1.6" fill="none"/>
</svg>`,
mouse: `<svg viewBox="0 0 120 120" aria-hidden="true">
<polygon points="32,12 50,20 52,40 36,50 18,42 14,24" fill="#8d939b"/><polygon points="32,20 44,25 44,38 35,43 24,38 22,27" fill="#e8a5a5"/>
<polygon points="88,12 70,20 68,40 84,50 102,42 106,24" fill="#7f858d"/><polygon points="88,20 76,25 76,38 85,43 96,38 98,27" fill="#df9a9a"/>
<polygon points="30,50 60,34 90,50 84,80 60,104 36,80" fill="#a7adb5"/>
<polygon points="30,50 60,34 60,62" fill="#bcc1c8"/><polygon points="90,50 60,34 60,62" fill="#959ba3"/>
<polygon points="36,80 60,62 60,104" fill="#c9cdd3"/><polygon points="84,80 60,62 60,104" fill="#b0b5bc"/>
<circle cx="47" cy="62" r="7" fill="#fff"/><circle cx="73" cy="62" r="7" fill="#fff"/>
<circle cx="47" cy="62" r="2.4" fill="#1f1a17"/><circle cx="73" cy="62" r="2.4" fill="#1f1a17"/>
<polygon points="55,94 65,94 60,101" fill="#d9767a"/>
<path d="M50 96 L24 90 M50 99 L24 102 M70 96 L96 90 M70 99 L96 102" stroke="#5a6068" stroke-width="1.3"/>
<path d="M98 50 C93 58 93 64 98 66 C103 64 103 58 98 50 Z" fill="#7db7e8"/>
<path d="M54 84 Q60 80 66 84" stroke="#4a4f56" stroke-width="2" fill="none" stroke-linecap="round"/>
</svg>`,
bull: `<svg viewBox="0 0 120 120" aria-hidden="true">
<polygon points="36,40 12,30 4,8 20,24 42,32" fill="#efe2c6"/><polygon points="12,30 4,8 20,24" fill="#d9caa8"/>
<polygon points="84,40 108,30 116,8 100,24 78,32" fill="#e3d4b5"/><polygon points="108,30 116,8 100,24" fill="#cdbd99"/>
<polygon points="34,44 12,50 30,58" fill="#8a3a27"/><polygon points="86,44 108,50 90,58" fill="#7a3322"/>
<polygon points="34,34 86,34 82,70 72,98 48,98 38,70" fill="#b4533a"/>
<polygon points="34,34 60,34 60,64 38,70" fill="#c4634a"/><polygon points="86,34 60,34 60,64 82,70" fill="#a3492f"/>
<polygon points="60,38 67,50 60,62 53,50" fill="#f3e6cc"/>
<polygon points="44,80 76,80 74,102 46,102" fill="#e2a488"/><polygon points="60,80 76,80 74,102 60,102" fill="#d6957a"/>
<ellipse cx="53" cy="90" rx="3" ry="4" fill="#5a2418"/><ellipse cx="67" cy="90" rx="3" ry="4" fill="#5a2418"/>
<circle cx="60" cy="104" r="6" fill="none" stroke="#d9a441" stroke-width="3"/>
<polygon points="42,54 52,52 50,58" fill="#2a1712"/><polygon points="78,54 68,52 70,58" fill="#2a1712"/>
</svg>`,
turtle: `<svg viewBox="0 0 120 120" aria-hidden="true">
<polygon points="53,30 55,14 60,8 65,14 67,30" fill="#9cc79a"/><circle cx="57" cy="16" r="1.6" fill="#1f1a17"/><circle cx="63" cy="16" r="1.6" fill="#1f1a17"/>
<polygon points="36,42 16,32 22,52" fill="#8dbb8b"/><polygon points="84,42 104,32 98,52" fill="#80ad7e"/>
<polygon points="36,80 16,92 26,72" fill="#80ad7e"/><polygon points="84,80 104,92 94,72" fill="#74a172"/>
<polygon points="56,92 60,106 64,92" fill="#80ad7e"/>
<polygon points="60,26 89.4,43 89.4,77 60,94 30.6,77 30.6,43" fill="#2f6b43"/>
<polygon points="60,26 89.4,43 72.1,53 60,46" fill="#4f8a5b"/><polygon points="89.4,43 89.4,77 72.1,67 72.1,53" fill="#3f744a"/>
<polygon points="89.4,77 60,94 60,74 72.1,67" fill="#4f8a5b"/><polygon points="60,94 30.6,77 47.9,67 60,74" fill="#3f744a"/>
<polygon points="30.6,77 30.6,43 47.9,53 47.9,67" fill="#5d9c69"/><polygon points="30.6,43 60,26 60,46 47.9,53" fill="#69a874"/>
<polygon points="60,46 72.1,53 72.1,67 60,74 47.9,67 47.9,53" fill="#8fc48f"/>
<path d="M54 60 L60 54 L66 60" stroke="#2f6b43" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M54 67 L60 61 L66 67" stroke="#2f6b43" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
};

function personSVG(robe, robeDark, hat){
  const hats = {
    square:`<polygon points="37,20 83,20 85,42 35,42" fill="#2a2a33"/><polygon points="60,20 83,20 85,42 60,42" fill="#1b1b22"/><rect x="55" y="27" width="10" height="6" fill="#d8a443"/>`,
    bun:`<polygon points="37,46 42,28 60,22 78,28 83,46 72,36 48,36" fill="#2a211c"/><circle cx="60" cy="17" r="7" fill="#2a211c"/><rect x="56" y="22" width="8" height="3" fill="#b5302a"/>`,
    band:`<polygon points="37,46 42,28 60,23 78,28 83,46 72,38 48,38" fill="#3b2c22"/><polygon points="38,36 82,36 82,42 38,42" fill="#b5302a"/><polygon points="82,38 92,34 90,44" fill="#b5302a"/>`,
    round:`<polygon points="44,36 48,16 72,16 76,36" fill="#6c4782"/><polygon points="60,16 72,16 76,36 60,36" fill="#593870"/><ellipse cx="60" cy="37" rx="31" ry="6" fill="#4b2f5e"/><circle cx="60" cy="24" r="3" fill="#d8a443"/>`
  };
  const beard = hat==='round' ? `<polygon points="50,72 70,72 64,84 56,84" fill="#3b2c22"/>` : '';
  return `<svg viewBox="0 0 120 120" aria-hidden="true">
<polygon points="16,120 28,86 60,78 92,86 104,120" fill="${robe}"/><polygon points="60,78 92,86 104,120 60,120" fill="${robeDark}"/>
<polygon points="47,80 60,100 73,80 60,86" fill="#f3ead7"/>
<polygon points="40,40 80,40 82,62 72,78 48,78 38,62" fill="#ebc29c"/><polygon points="60,40 80,40 82,62 72,78 60,78" fill="#dcab83"/>
<polygon points="45,56 54,55 53,58.5" fill="#2a1d16"/><polygon points="75,56 66,55 67,58.5" fill="#2a1d16"/>
<path d="M54 68 Q60 71 66 68" stroke="#7a4a35" stroke-width="2" fill="none" stroke-linecap="round"/>${beard}${hats[hat]}</svg>`;
}
Object.assign(VILLAIN_SVG, {
  carpenter: personSVG('#8a5a34','#734a2a','band'),
  grandson: personSVG('#4a6fa8','#3b5b8c','bun'),
  clerk: personSVG('#3f7a63','#33654f','square'),
  zhou: personSVG('#7a4e8f','#653f77','round'),
  company:`<svg viewBox="0 0 120 120" aria-hidden="true">
<polygon points="30,112 30,28 68,14 68,112" fill="#5b6c8f"/><polygon points="68,14 92,26 92,112 68,112" fill="#46557a"/>
<g fill="#d7e4f5"><rect x="37" y="34" width="8" height="8"/><rect x="52" y="30" width="8" height="8"/><rect x="37" y="52" width="8" height="8"/><rect x="52" y="48" width="8" height="8"/><rect x="37" y="70" width="8" height="8"/><rect x="52" y="66" width="8" height="8"/><rect x="37" y="88" width="8" height="8"/><rect x="52" y="84" width="8" height="8"/></g>
<g fill="#9fb2d3"><rect x="74" y="36" width="10" height="7"/><rect x="74" y="54" width="10" height="7"/><rect x="74" y="72" width="10" height="7"/><rect x="74" y="90" width="10" height="7"/></g>
<path d="M44 16 L54 40 L42 58 L58 80 L48 112" stroke="#b5302a" stroke-width="3.5" fill="none" stroke-linejoin="round"/>
<polygon points="20,112 100,112 100,118 20,118" fill="#2c3550"/></svg>`,
  etf:`<svg viewBox="0 0 120 120" aria-hidden="true">
<polygon points="18,32 102,32 96,108 24,108" fill="#efe4cc" stroke="#8a6a3a" stroke-width="3"/>
<g><rect x="30" y="44" width="16" height="14" fill="#2c7a57"/><rect x="52" y="44" width="16" height="14" fill="#d8a443"/><rect x="74" y="44" width="16" height="14" fill="#2f3f78"/>
<rect x="30" y="64" width="16" height="14" fill="#d8a443"/><rect x="52" y="64" width="16" height="14" fill="#2f3f78"/><rect x="74" y="64" width="16" height="14" fill="#2c7a57"/>
<rect x="32" y="84" width="16" height="14" fill="#2f3f78"/><rect x="52" y="84" width="16" height="14" fill="#2c7a57"/><rect x="72" y="84" width="16" height="14" fill="#b5302a" opacity=".55"/></g>
<polygon points="26,12 94,12 98,30 22,30" fill="#b5302a"/>
<text x="60" y="27" text-anchor="middle" font-family="IBM Plex Mono,monospace" font-weight="700" font-size="14" fill="#f4ecd9">ETF</text></svg>`,
  phone:`<svg viewBox="0 0 120 120" aria-hidden="true">
<rect x="36" y="10" width="48" height="100" rx="8" fill="#2a2d36"/><rect x="41" y="20" width="38" height="78" fill="#10131a"/>
<g><line x1="48" y1="34" x2="48" y2="62" stroke="#3ccf8e" stroke-width="1.5"/><rect x="45" y="40" width="6" height="14" fill="#3ccf8e"/>
<line x1="58" y1="44" x2="58" y2="78" stroke="#ff5b5b" stroke-width="1.5"/><rect x="55" y="48" width="6" height="22" fill="#ff5b5b"/>
<line x1="68" y1="56" x2="68" y2="90" stroke="#ff5b5b" stroke-width="1.5"/><rect x="65" y="62" width="6" height="20" fill="#ff5b5b"/>
<line x1="75" y1="66" x2="75" y2="86" stroke="#3ccf8e" stroke-width="1.5"/><rect x="72" y="70" width="5" height="10" fill="#3ccf8e"/></g>
<circle cx="84" cy="14" r="11" fill="#b5302a"/><text x="84" y="18" text-anchor="middle" font-family="IBM Plex Mono,monospace" font-weight="700" font-size="10" fill="#fff">99+</text>
<rect x="54" y="102" width="12" height="3" rx="1.5" fill="#555"/></svg>`
});

Object.assign(VILLAIN_SVG, {adv1: personSVG('#b94732','#8e3022','band'), adv2: personSVG('#c89b45','#8d6a2b','round'), adv3: personSVG('#2f7a5b','#245e46','square')});

const MENTORS = {
  bao:{name:"包青天",en:"Justice Bao",role:"公平・正義・超前部署",roleEn:"The Judge",img:JB.face('bao','explain'),
       q:"Do the math before you decide.",zh:"先算清楚，再下判斷。"},
  gongsun:{name:"公孫策",en:"Gongsun Ce",role:"智囊軍師・策略分析",roleEn:"The Strategist",img:JB.face('gongsun','explain'),
       q:"Numbers don't lie. Feelings often do.",zh:"數字不會說謊，情緒常常會。"},
  zhan:{name:"展昭",en:"Zhan Zhao",role:"御貓侍衛・風險控管",roleEn:"The Risk Guard",img:JB.face('zhan','observe'),
       q:"Decide your exit before you enter.",zh:"進場前，先想好怎麼出場。"}
};

const TERMS = {
  "inflation":{pos:"n.",zh:"通貨膨脹",def:"When prices go up over time, so the same money buys less.",ex:"Inflation quietly made Mr. Wu's savings worth less.",c:1},
  "purchasing power":{pos:"n.",zh:"購買力",def:"How much your money can buy.",ex:"His money lost about one third of its purchasing power.",c:1},
  "principal":{pos:"n.",zh:"本金",def:"The first amount of money you put in.",ex:"Mrs. Lin's principal was 1,000,000 dollars.",c:1},
  "return":{pos:"n.",zh:"報酬（率）",def:"The money you gain or lose from an investment, often shown as a %.",ex:"An average return of 7% a year is an example, not a promise.",c:1},
  "compound interest":{pos:"n.",zh:"複利",def:"Earning interest on your money AND on the interest you already earned.",ex:"Compound interest made her money grow faster every year.",c:1},
  "interest rate":{pos:"n.",zh:"利率",def:"The % a bank pays you (or you pay a bank) each year.",ex:"The bank's interest rate was lower than inflation.",c:1},
  "margin":{pos:"n.",zh:"融資（借錢買股）",def:"Money you borrow from your broker to buy stocks. 'Buying on margin.'",ex:"Ah-Hu bought on margin with 600,000 borrowed dollars.",c:2},
  "leverage":{pos:"n.",zh:"槓桿",def:"Using borrowed money to make your investment bigger. It makes gains AND losses bigger.",ex:"Leverage turned a 30% drop into a 75% loss.",c:2},
  "volatility":{pos:"n.",zh:"波動性",def:"How much and how fast a price moves up and down.",ex:"High volatility means big jumps and big drops.",c:2},
  "stop-loss":{pos:"n.",zh:"停損",def:"A price you choose in advance: if the stock falls there, you sell to limit the loss.",ex:"Zhan Zhao always sets a stop-loss before he buys.",c:2},
  "drawdown":{pos:"n.",zh:"回撤（從高點的跌幅）",def:"How far your account falls from its highest point.",ex:"A 50% drawdown needs a 100% gain to recover.",c:2},
  "margin call":{pos:"n.",zh:"追繳保證金",def:"A broker's warning: add money now, or we will sell your stocks.",ex:"The margin call came at the worst moment.",c:2},
  "guaranteed":{pos:"adj.",zh:"保證的",def:"Promised to happen for sure. High investment returns are never guaranteed.",ex:"'Guaranteed profit' is a warning sign.",c:3},
  "CAGR":{pos:"n.",zh:"年化報酬率（複合年增長率）",def:"Compound Annual Growth Rate: the steady yearly rate that takes you from your start to your end.",ex:"5 million to 40 million in 3 years needs a CAGR of 100%.",c:3},
  "annual return":{pos:"n.",zh:"年報酬率",def:"How much an investment grows or falls in one year, in %.",ex:"The market's annual return was +12% this year.",c:3},
  "time horizon":{pos:"n.",zh:"投資期限",def:"How long you plan to keep your money invested.",ex:"A 20-year time horizon gives compound interest time to work.",c:3},
  "red flag":{pos:"n.",zh:"警訊、危險信號",def:"A sign that something is wrong or dangerous.",ex:"'Zero risk' is a big red flag.",c:3},
  "scam":{pos:"n.",zh:"詐騙",def:"A dishonest plan to take people's money.",ex:"Teacher Fox's LINE group was a scam.",c:3},
  "asset allocation":{pos:"n.",zh:"資產配置",def:"How you divide your money among different types of assets.",ex:"Second Brother's asset allocation saved him in the storm.",c:4},
  "ETF":{pos:"n.",zh:"指數股票型基金",def:"Exchange-Traded Fund: one fund you buy like a stock. Many ETFs hold all the companies in an index.",ex:"One index ETF can hold 50 companies at once.",c:4},
  "real estate":{pos:"n.",zh:"房地產、不動產",def:"Land and buildings, like homes, offices and shops.",ex:"He put 15% in real estate funds.",c:4},
  "bond":{pos:"n.",zh:"債券",def:"A loan you give to a government or a company. They pay you interest.",ex:"Bonds usually move less than stocks.",c:4},
  "diversification":{pos:"n.",zh:"分散投資",def:"Spreading money across many investments, so one bad one cannot ruin you.",ex:"Diversification is like using many baskets for your eggs.",c:4},
  "rebalancing":{pos:"n.",zh:"再平衡",def:"Selling some of what grew and buying what shrank, to go back to your plan.",ex:"He does rebalancing once a year.",c:4},
  "bull market":{pos:"n.",zh:"牛市（多頭市場）",def:"A long period when prices keep rising.",ex:"In a bull market, everyone looks like a genius.",c:5},
  "FOMO":{pos:"n.",zh:"錯失恐懼",def:"Fear Of Missing Out: buying because others are buying and you feel left behind.",ex:"FOMO made Mr. Lin buy at the top.",c:5},
  "bear market":{pos:"n.",zh:"熊市（空頭市場）",def:"A period when prices fall a lot, often 20% or more from the top.",ex:"Bear markets feel endless, but they end.",c:5},
  "panic selling":{pos:"n.",zh:"恐慌性拋售",def:"Selling quickly because of fear, often at a low price.",ex:"Panic selling locked in his loss.",c:5},
  "emergency fund":{pos:"n.",zh:"緊急預備金",def:"Cash saved for surprises, often 3 to 6 months of living costs.",ex:"An emergency fund means you never have to sell at a bad time.",c:5},
  "dollar-cost averaging":{pos:"n.",zh:"定期定額",def:"Investing the same amount at regular times, in good and bad markets.",ex:"Dollar-cost averaging takes the guessing out of investing.",c:5}
};

const CASES = [
{
  id:1, pillar:"財富增長", pillarEn:"Wealth Growth", ask:"如何讓資產穩健放大？", icon:JB.asset('icons/pillar1.webp'),
  title:"The Shrinking Silver", titleZh:"縮水的銀子", mentor:"gongsun", villain:"moth", villainName:"通膨蛀蟲", villainEn:"The Invisible Moth",
  line:{en:"Not one coin is missing… but the thief is still in this room.",zh:"一枚銅錢都沒少，小偷卻還在這個房間裡。"},
  story:[
    {en:"In 2006, old Mr. Wu saved 1,000,000 dollars. He did not trust banks, so he hid the money in a wooden box under his bed. Every night he counted it. Twenty years later, every coin is still there.",
     zh:"2006 年，吳老伯存了 100 萬元。他不信任銀行，把錢藏在床底的木箱裡，每晚數一遍。二十年後，一枚銅錢都沒少。"},
    {en:"But something strange happened. In 2006, a lunch box cost 60 dollars. Today it costs about 90. Prices went up about 2% every year. This is {{inflation}}. Mr. Wu's money did not move, but its {{purchasing power}} fell by about one third. Today his 1,000,000 buys only what 673,000 could buy in 2006.",
     zh:"怪事發生了：2006 年一個便當 60 元，現在大約 90 元。物價每年漲約 2%，這就是通貨膨脹。吳老伯的錢沒動，購買力卻少了約三分之一——今天的 100 萬，只買得到 2006 年 67.3 萬能買的東西。"},
    {en:"His neighbor, Mrs. Lin, invested the same {{principal}} in a stock fund. In this example it earned an average {{return}} of 7% a year. She did not spend the gains, so the gains earned more gains. That is {{compound interest}}. After 20 years she had about 3,870,000 dollars.",
     zh:"鄰居林大娘把同樣的本金投入股票基金。以這個例子來說，平均年報酬 7%。她不把獲利花掉，讓獲利再生獲利，這就是複利。20 年後，大約變成 387 萬。"},
    {en:"Even a bank account with an {{interest rate}} of about 1.5% would not fully beat 2% inflation. Mr. Wu shouted, 'Someone stole my money!' Gongsun smiled. 'Not one coin is missing… but the thief is still in this room.'",
     zh:"就算放銀行，利率約 1.5%，也追不上 2% 的通膨。吳老伯大喊：「有人偷了我的錢！」公孫策微笑：「一枚銅錢都沒少……但小偷還在這個房間裡。」"}
  ],
  terms:["inflation","purchasing power","principal","return","compound interest","interest rate"],
  lab:{type:"compound", title:"複利煉金爐", titleEn:"The Compound Interest Furnace",
    intro:"公孫策的實驗：拉動滑桿，看看<b>本金、每月投入、年報酬、時間</b>四個變數，如何讓錢「利滾利」。紅色虛線是同樣的錢藏在床底、被 2% 通膨侵蝕後的<b>實質購買力</b>。",
    ch:{q:"Use the Rule of 72. If your money grows 8% a year, about how many years does it take to double?",opts:["6 years","9 years","12 years","18 years"],a:1,
        ex:"72 ÷ 8 = 9。年報酬 8%，大約 9 年翻倍。反過來看：通膨 3% 時，72 ÷ 3 = 24 年，購買力就會減半。"}},
  qs:[
    {q:"Mr. Wu still has 1,000,000 dollars, but it buys less than before. This problem is called ______.",opts:["leverage","rebalancing","inflation","a margin call"],a:2,
     ex:"inflation 通貨膨脹：物價長期上漲，同樣的錢能買的東西變少。"},
    {q:"Which sentence explains compound interest?",opts:["You earn interest only on the money you first put in.","You earn interest on your money AND on the interest you already earned.","The bank takes a little money from you every month.","You get the same fixed amount every year, forever."],a:1,
     ex:"複利＝利滾利：本金生出的利息，會再生利息。只對本金計息的叫「單利」。"},
    {q:"Mrs. Lin's money grew about 7% a year. Mr. Wu's money grew 0%. What is the BEST lesson?",opts:["Cash under the bed has no risk at all.","Investments go up every single year.","Old banknotes become more valuable.","Over many years, money that does not grow loses purchasing power."],a:3,
     ex:"長期不成長的現金，會被通膨慢慢吃掉購買力。但要記得：7% 是長期平均的示意數字，投資每年有漲有跌，不是每年都賺。"}
  ],
  verdict:{q:"Who stole the value of Mr. Wu's money?",qZh:"是誰偷走了吳老伯銀子的「價值」？",
    suspects:[
      {who:"carpenter",name:"Carpenter Zhang",zh:"木匠老張",say:"I made that box with the best wood in Kaifeng. Without the key, nobody can open it.",sayZh:"那口箱子是我用開封府最好的木頭做的，沒有鑰匙誰也打不開。"},
      {who:"moth",name:"The Invisible Moth",zh:"通膨蛀蟲",say:"Me? I never took one coin. I only made rice, noodles and rent a little more expensive… every single year. Hee hee.",sayZh:"我？我一枚銅錢也沒拿。我只是讓米、麵、房租每年貴一點點……年年如此。嘻嘻。"},
      {who:"grandson",name:"Grandson Ah-Fu",zh:"孫子阿福",say:"I never touched Grandpa's box. He sleeps on top of it every night!",sayZh:"我從沒碰過爺爺的箱子，他每晚都睡在上面！"}
    ],
    culprit:"moth", hint:"錢一枚都沒少，所以不是有人打開了箱子。想想看：是什麼讓同樣的錢，買到越來越少的東西？",
    judgment:"本府判定：真兇是「通膨蛀蟲」！它一枚銅錢也沒拿，卻讓每一枚銅錢越來越不值錢。錢放著不動，不叫安全，叫慢慢縮水。",
    motto:{en:"Cash that sleeps slowly shrinks.",zh:"睡著的現金，會慢慢縮水。"},
    theory:{t:"複利與 72 法則",en:"Compound Interest & the Rule of 72",
      p:"複利：錢生的利息會繼續生利息，時間越長效果越明顯。72 法則：72 ÷ 年報酬率(%) ≈ 翻倍所需年數。年報酬 6% 約 12 年翻倍；反過來，通膨 3% 約 24 年就讓購買力減半。對抗通膨的第一步，是讓錢「動起來」。"}}
},
{
  id:2, pillar:"風險防禦", pillarEn:"Risk Defense", ask:"市場風浪大，如何守住財富？", icon:JB.asset('icons/pillar2.webp'),
  title:"The Night of the Great Wave", titleZh:"大浪之夜", mentor:"zhan", villain:"puffer", villainName:"槓桿河豚", villainEn:"Puffer Leverage",
  line:{en:"Decide your exit before you enter.",zh:"進場前，先想好怎麼出場。"},
  story:[
    {en:"Ah-Hu was young and in a hurry. He had 400,000 dollars, but he wanted to get rich faster. So he borrowed 600,000 dollars from his broker and bought 1,000,000 dollars of one stock. Buying with borrowed money is called buying on {{margin}}. Using borrowed money to make your bet bigger is called {{leverage}}.",
     zh:"阿虎年輕又心急。他有 40 萬，卻想更快致富，於是向券商借了 60 萬，買進 100 萬元的同一檔股票。借錢買股叫「融資」；用借來的錢把賭注放大，叫「槓桿」。"},
    {en:"The stock had high {{volatility}}: some days it jumped 5%, some days it dropped 7%. Ah-Hu never set a {{stop-loss}}. 'It will always come back,' he said.",
     zh:"這檔股票波動很大：有時一天漲 5%，有時跌 7%。阿虎從不設停損：「它一定會漲回來。」"},
    {en:"Then a big wave hit the market. In two weeks, the stock fell 30%. His 1,000,000 of stock was now worth 700,000 — but he still owed 600,000. His own money fell from 400,000 to 100,000. That is a 75% {{drawdown}}.",
     zh:"大浪來了。兩週內股價跌 30%，他的 100 萬股票只剩 70 萬——但他還欠 60 萬。自己的錢從 40 萬變成 10 萬，回撤 75%。"},
    {en:"The broker sent a {{margin call}}: 'Add money now, or we sell your stock!' Ah-Hu had no more money. His stock was sold at the lowest price of the month.",
     zh:"券商發出追繳通知：「馬上補錢，否則我們賣掉你的股票！」阿虎已經沒錢了，股票在當月最低價被強制賣出。"}
  ],
  terms:["margin","leverage","volatility","stop-loss","drawdown","margin call"],
  lab:{type:"drawdown", title:"回本照妖鏡", titleEn:"The Recovery Mirror",
    intro:"展昭的照妖鏡：選擇<b>股價跌幅</b>與<b>槓桿倍數</b>，看看你自己的錢會跌多少、又要漲多少才能回本。台股融資約可放大 2.5 倍，維持率低於約 130% 就會被追繳（示意）。",
    ch:{q:"A stock falls 50%. How much must it rise to get back to where it started?",opts:["50%","75%","100%","150%"],a:2,
        ex:"剩下一半（0.5），要回到 1 必須翻倍：0.5 ×（1 + 100%）= 1。跌越深，回本越難。"}},
  qs:[
    {q:"Ah-Hu borrowed money from his broker to buy more stock. This is called ______.",opts:["dollar-cost averaging","buying on margin","rebalancing","diversification"],a:1,
     ex:"buying on margin 融資買進：向券商借錢買股票。"},
    {q:"The stock fell 30%, but Ah-Hu lost 75% of his own money. Why?",opts:["The broker stole his money.","The market was closed for two weeks.","He paid too much tax.","Leverage makes losses bigger, not only gains."],a:3,
     ex:"100 萬裡只有 40 萬是自己的（2.5 倍槓桿）。股價跌 30% ＝ 少了 30 萬，全部由自己的 40 萬承擔 → 虧 75%。"},
    {q:"Zhan Zhao says, 'Decide your exit before you enter.' Which tool matches this idea?",opts:["a margin call","a hot tip","a stop-loss","inflation"],a:2,
     ex:"stop-loss 停損：進場前先決定「跌到哪裡就出場」，避免小傷變重傷。"}
  ],
  verdict:{q:"Who turned a 30% fall into a 75% loss?",qZh:"是誰把 30% 的下跌，變成 75% 的虧損？",
    suspects:[
      {who:"bull",name:"Old Bull, the Market",zh:"股市老牛",say:"I go up and down. I always have. A 30% fall hurts, but I didn't make it 75%.",sayZh:"我本來就有漲有跌。跌 30% 很痛，但把它變成 75% 的不是我。"},
      {who:"clerk",name:"Broker Clerk Li",zh:"營業員小李",say:"I lent him the money he asked for. I even gave him a risk warning — he signed it without reading.",sayZh:"我只是借給他他要的錢，還給了風險告知書——他看都沒看就簽了。"},
      {who:"puffer",name:"Puffer Leverage",zh:"槓桿河豚",say:"Puff! I make everything bigger. When the stock went up, he felt like a king. When it fell 30%, I puffed his loss up to 75%!",sayZh:"噗！我會把一切放大。股票漲時他覺得自己是國王；跌 30% 時，我把他的虧損吹成 75%！"}
    ],
    culprit:"puffer", hint:"股票只跌了 30%，阿虎卻虧了 75%。是誰把損失「放大」了 2.5 倍？",
    judgment:"本府判定：真兇是「槓桿河豚」！股價跌三成，本是皮肉傷；被槓桿一吹，變成七成五的重傷，最後還被追繳、斷頭。漲時它讓你當國王，跌時它讓你沒有回頭路。",
    motto:{en:"Leverage is a magnifying glass: it makes gains AND losses bigger.",zh:"槓桿是放大鏡：放大獲利，也放大虧損。"},
    theory:{t:"虧損不對稱",en:"Loss Asymmetry",
      p:"跌 10% 要漲 11% 才回本；跌 50% 要漲 100%；跌 75% 要漲 300%。所以展昭的第一守則是：先控制虧損，再談獲利。給新手的三件護甲：設停損、不借錢、分散投資。"}}
},
{
  id:3, pillar:"目標規劃", pillarEn:"Goal Planning", ask:"三年四千萬？十年一億？可行嗎？", icon:JB.asset('icons/pillar3.webp'),
  title:"The Fox Who Promised Forty Million", titleZh:"三年四千萬之謎", mentor:"bao", villain:"fox", villainName:"金狐老師", villainEn:"Teacher Golden Fox",
  line:{en:"Do the math before you decide.",zh:"先算清楚，再下判斷。"},
  story:[
    {en:"One morning, a man in a shiny golden robe arrived in Kaifeng. He called himself 'Teacher Golden Fox.' He stood in the market and shouted: 'Join my LINE group! Give me 5,000,000 dollars, and in three years you will have 40,000,000. It's {{guaranteed}}! Zero risk! Only three seats left!'",
     zh:"某天早上，一位穿著金光閃閃長袍的人來到開封，自稱「金狐老師」。他在市集大喊：「加入我的 LINE 群！給我 500 萬，三年後變 4,000 萬，保證獲利！零風險！只剩三個名額！」"},
    {en:"Rich Mr. Zhou was excited. 'Forty million! My family will be rich!' He ran to the court to borrow money. Justice Bao stopped him. 'Wait. Before you decide, let's do the math.'",
     zh:"周員外興奮極了：「四千萬！我們家要發了！」他跑到府衙想借錢，被包大人攔下：「慢著。做決定之前，先把數字算清楚。」"},
    {en:"Bao wrote on the board: 5,000,000 → 40,000,000 is 8 times bigger. In 3 years, that needs a {{CAGR}} of 100% — the money must double every year, three years in a row. 'Over many years,' said Bao, 'a broad stock market has given an {{annual return}} of roughly 7 to 10% on average, with many bad years along the way.'",
     zh:"包大人在板上寫：500 萬 → 4,000 萬是 8 倍。三年內做到，年化報酬率要 100%——每年翻倍，連翻三年。「長期來看，」包大人說，「整體股市的平均年報酬大約 7–10%，中間還有不少壞年頭。」"},
    {en:"'A good plan has a long {{time horizon}} and a realistic goal,' Bao said. 'Guaranteed, zero risk, hurry up — when you hear all three, it is a big {{red flag}}. It is probably a {{scam}}.'",
     zh:"「好的計畫要有夠長的投資期限、合理的目標。」包大人說，「保證、零風險、快點——三句一起出現，就是大大的警訊，八成是詐騙。」"}
  ],
  terms:["guaranteed","CAGR","annual return","time horizon","red flag","scam"],
  lab:{type:"goal", title:"超前部署審判庭", titleEn:"The Goal Court",
    intro:"包大人的「超前部署」就是<b>倒著算</b>：輸入起始資金、每月投入、目標與年數，算出需要的<b>年化報酬率</b>，再看它落在哪個區間。先試試海報上的兩道難題。",
    ch:{q:"Teacher Fox promised 5,000,000 → 40,000,000 in 3 years. Use the Goal Court. What yearly return (CAGR) is needed?",opts:["26%","50%","100%","300%"],a:2,
        ex:"(40,000,000 ÷ 5,000,000)^(1/3) − 1 ＝ 8^(1/3) − 1 ＝ 2 − 1 ＝ 100%。每年翻倍，連翻三年。"}},
  qs:[
    {q:"'Guaranteed 100% return with zero risk!' In investing, this sentence is a big ______.",opts:["bull market","bond","time horizon","red flag"],a:3,
     ex:"red flag 警訊：投資世界裡，沒有「高報酬又保證、零風險」這種事。"},
    {q:"Why is a long time horizon helpful for investors?",opts:["Compound interest has more time to work, and you can wait out bad years.","Stocks never fall over long periods.","You can borrow more money.","Taxes disappear after ten years."],a:0,
     ex:"投資期限越長，複利越有時間發酵，也比較撐得過空頭。但「長期」不代表「不會跌」。"},
    {q:"Which goal is the MOST realistic for a beginner?",opts:["Turn 100,000 into 10,000,000 in one year.","Invest 10,000 every month in a diversified fund for 20 years.","Follow a hot tip and double your money every month.","Borrow 5 million to buy one hot stock."],a:1,
     ex:"每月固定投入、分散、長期——這是一般人最可行的路。其他選項不是不切實際，就是風險極高。"}
  ],
  verdict:{q:"Three people gave Mr. Zhou advice. Who is the liar?",qZh:"三個人給了周員外建議，誰在說謊？",
    suspects:[
      {who:"zhou",name:"Mr. Zhou",zh:"周員外",say:"I only want a better life for my family. Is it wrong to dream?",sayZh:"我只是想讓家人過好日子。做夢有錯嗎？"},
      {who:"gongsun",name:"Gongsun Ce",zh:"公孫策",say:"Save every month, invest in a diversified fund, wait ten years or more, and expect some bad years.",sayZh:"每月存錢、投資分散的基金、等十年以上，並且預期會遇到幾個壞年頭。"},
      {who:"fox",name:"Teacher Golden Fox",zh:"金狐老師",say:"My secret system wins every time! 100% a year, guaranteed. Zero risk. Hurry — only three seats left!",sayZh:"我的祕密系統百戰百勝！每年 100%，保證獲利，零風險。快點——只剩三個名額！"}
    ],
    culprit:"fox", hint:"誰的話裡同時出現「保證、零風險、名額有限」？",
    judgment:"本府判定：「金狐老師」妖言惑眾！三年八倍，等於每年翻一倍、連翻三年；而整體股市長期年報酬大約只有 7–10%。「保證獲利、零風險、名額有限」三句同時出現，就是詐騙的味道。周員外有夢無罪，被騙才是真冤。",
    motto:{en:"If it sounds too good to be true, it probably is.",zh:"好到不像真的，通常就不是真的。"},
    theory:{t:"年化報酬率與超前部署",en:"CAGR & Planning Backward",
      p:"CAGR ＝（目標 ÷ 起點）^(1/年數) − 1。超前部署就是倒著算：先定目標與年數 → 算出需要的年報酬 → 檢查合不合理。長期要求超過 15% 就該非常小心；長期 30% 以上，幾乎只存在於傳說與詐騙之中。"}}
},
{
  id:4, pillar:"資產配置", pillarEn:"Asset Allocation", ask:"股票・ETF・房地產，怎麼黃金組合？", icon:JB.asset('icons/pillar4.webp'),
  title:"All the Eggs in One Basket", titleZh:"一籃子雞蛋案", mentor:"gongsun", villain:"hen", villainName:"全押母雞", villainEn:"Hen All-In",
  line:{en:"Don't put all your eggs in one basket.",zh:"別把所有雞蛋放進同一個籃子。"},
  story:[
    {en:"Three brothers each received 1,000,000 dollars from their father. Big Brother put 100% into one hot tech stock. 'This company is the future!' he said.",
     zh:"三兄弟各從父親那裡拿到 100 萬。大哥把 100% 押在一檔熱門科技股：「這家公司就是未來！」"},
    {en:"Second Brother made a plan. This plan is his {{asset allocation}}: 50% in an index {{ETF}} that holds many companies, 15% in {{real estate}} funds, 25% in {{bond|bonds}} and cash, and only 10% in single stocks. Spreading money like this is called {{diversification}}.",
     zh:"二哥做了計畫，這就是他的資產配置：50% 放在持有許多公司的指數 ETF、15% 放房地產基金、25% 放債券與現金，只有 10% 買個股。這樣分散資金，叫分散投資。"},
    {en:"Little Brother was afraid of everything. He kept 100% in cash.",
     zh:"小弟什麼都怕，100% 留現金。"},
    {en:"Then a storm came. The hot tech company had lied about its accounts. Its stock fell 70% in one week. Big Brother lost 700,000 dollars. Second Brother's account fell only about 8%. Every year, Second Brother also does {{rebalancing}}: he moves money back to his plan, so no basket gets too heavy.",
     zh:"風暴來了：那家科技公司做假帳，股價一週跌 70%。大哥賠掉 70 萬，二哥只跌約 8%。二哥每年還會做再平衡：把資金調回原本的比例，不讓任何一個籃子太重。"}
  ],
  terms:["asset allocation","ETF","real estate","bond","diversification","rebalancing"],
  lab:{type:"portfolio", title:"黃金組合沙盤", titleEn:"The Portfolio Sandbox",
    intro:"公孫策的沙盤推演：調整<b>個股、指數 ETF、房地產、債券與現金</b>四個籃子的比例，看看同一筆 100 萬在三種天氣下的結果。情境數字為教學示意。",
    ch:{q:"Use the sandbox. In a bear market, about how much does Second Brother's mix (10 / 50 / 15 / 25) fall?",opts:["about 5%","about 20%","about 45%","about 70%"],a:1,
        ex:"10%×(−45%) + 50%×(−30%) + 15%×(−10%) + 25%×(+3%) ≈ −20%。只有大哥（−45%）的一半不到，牛市時仍有約 +15%。"}},
  qs:[
    {q:"'Don't put all your eggs in one basket.' This is the idea of ______.",opts:["diversification","leverage","inflation","a margin call"],a:0,
     ex:"diversification 分散投資：一個籃子翻了，其他籃子的蛋還在。"},
    {q:"An index ETF usually holds ______.",opts:["only one company","only gold bars","many companies at the same time","only cash"],a:2,
     ex:"ETF（Exchange-Traded Fund）像一籃子股票，在交易所像股票一樣買賣；追蹤指數的 ETF 一次持有幾十甚至上百家公司。"},
    {q:"Second Brother planned 60% stocks and 40% bonds. After a strong year, he has 75% stocks and 25% bonds. He sells some stocks and buys bonds to go back to 60/40. This is called ______.",opts:["panic selling","buying on margin","FOMO","rebalancing"],a:3,
     ex:"rebalancing 再平衡：定期把比例拉回原計畫，等於自動「賣高買低」。"}
  ],
  verdict:{q:"The company lied. But who turned the company's problem into Big Brother's disaster?",qZh:"公司做假帳。但是誰把公司的問題，變成大哥的災難？",
    suspects:[
      {who:"company",name:"TechStar Inc.",zh:"星科技公司",say:"Yes, our managers lied about the numbers. But we never told anyone to buy only our stock!",sayZh:"是，我們的主管做了假帳。但我們從沒叫任何人只買我們一家！"},
      {who:"etf",name:"Index ETF",zh:"指數 ETF",say:"I hold 50 companies. When TechStar fell, I only felt a small scratch.",sayZh:"我持有 50 家公司。星科技暴跌時，我只擦破一點皮。"},
      {who:"hen",name:"Hen All-In",zh:"全押母雞",say:"Why carry many baskets? One basket is so easy to carry! Cluck… oh no, my eggs!",sayZh:"何必提那麼多籃子？一個籃子多好提！咯咯……糟了，我的蛋！"}
    ],
    culprit:"hen", hint:"公司做假帳是起因。但同一場風暴，二哥只跌 8%。兩兄弟的差別在哪裡？",
    judgment:"本府判定：公司做假帳固然可惡，但把大哥推入深淵的，是「全押母雞」——把所有雞蛋放進同一個籃子。籃子一翻，全部破光。二哥遇到同一場風暴，卻因分散配置只受輕傷。",
    motto:{en:"Diversification is the only free lunch in investing.",zh:"分散投資，是投資世界裡唯一的免費午餐。（常被認為出自馬可維茲）"},
    theory:{t:"現代投資組合理論",en:"Modern Portfolio Theory",
      p:"1952 年，經濟學家馬可維茲（Harry Markowitz）提出：把「不會一起漲跌」的資產組合在一起，可以在報酬相近的情況下降低整體風險，他因此獲得 1990 年諾貝爾經濟學獎。實務口訣：股票、債券、房地產、現金各司其職，每年再平衡一次。"}}
},
{
  id:5, pillar:"人生平衡", pillarEn:"Life Balance", ask:"財富、家庭與理想生活，如何兼顧？", icon:JB.asset('icons/pillar5.webp'),
  title:"The Man Who Lived in His Phone", titleZh:"盯盤百回案", mentor:"bao", villain:"mouse", villainName:"恐慌鼠", villainEn:"Panic Mouse",
  line:{en:"Invest for your life. Don't give your life to the screen.",zh:"賺錢是為了生活，不是把生活賠給螢幕。"},
  story:[
    {en:"Mr. Lin opens his stock app 100 times a day. In a {{bull market}}, when everyone in his LINE group is buying, he buys too. He has strong {{FOMO}}: he is afraid of missing out.",
     zh:"林先生每天打開看盤 App 100 次。牛市時，群組裡大家都在買，他也跟著買——他有很重的 FOMO，害怕錯過。"},
    {en:"When a {{bear market}} comes and the news looks scary, he sells everything. This is {{panic selling}}. He buys high and sells low, again and again.",
     zh:"熊市一來、新聞一嚇人，他就全部賣光，這叫恐慌性拋售。他一次又一次買在高點、賣在低點。"},
    {en:"He sleeps only four hours a night. He missed his daughter's school play because he was watching charts. Then his car broke down. He had no {{emergency fund}}, so he had to sell his stocks on a bad day, at a loss.",
     zh:"他每晚只睡四小時，還因為盯盤錯過女兒的學校表演。後來車子壞了，他沒有緊急預備金，只好在壞日子賠錢賣股。"},
    {en:"His sister has a quieter plan. She uses {{dollar-cost averaging}}: 10,000 dollars into an index fund on the 6th of every month, in good months and bad months. She checks her account once a month and spends Sundays hiking with her kids.",
     zh:"他的妹妹用安靜得多的方法：定期定額，每月 6 號投入 1 萬元到指數基金，不管行情好壞。她一個月看一次帳戶，週日帶孩子去爬山。"}
  ],
  terms:["bull market","FOMO","bear market","panic selling","emergency fund","dollar-cost averaging"],
  lab:{type:"balance", title:"人生天平", titleEn:"The Scale of Life",
    intro:"包大人升堂審習慣：把 8 個投資習慣分成<b>「留在府中」</b>或<b>「逐出公堂」</b>。全部判對，人生天平才會平衡。一次全對可得 10 分。"},
  habits:[
    {en:"Keep 6 months of living costs in an emergency fund.",zh:"預留 6 個月生活費當緊急預備金。",keep:true,why:"生活出狀況時，不必在壞時機賣股票。"},
    {en:"Buy because everyone in the LINE group is buying.",zh:"因為群組大家都在買，所以跟著買。",keep:false,why:"這是 FOMO 錯失恐懼，跟風常常買在高點。"},
    {en:"Invest the same amount every month, in good and bad markets.",zh:"每月固定金額投入，不論漲跌。",keep:true,why:"定期定額不用猜高低點，長期平均成本。"},
    {en:"Sell everything when the news looks scary.",zh:"新聞一嚇人就全部賣光。",keep:false,why:"恐慌性拋售，常常賣在最低點。"},
    {en:"Check your portfolio once a month, not 100 times a day.",zh:"一個月檢查一次，而不是一天看 100 次。",keep:true,why:"盯盤越頻繁，越容易被短期波動牽著走。"},
    {en:"Use next month's rent money to buy a hot stock.",zh:"拿下個月的房租錢買熱門股。",keep:false,why:"短期要用的錢不該進股市，被迫賣出時只能認賠。"},
    {en:"Spend Sunday with family, not with charts.",zh:"週日陪家人，不陪 K 線。",keep:true,why:"時間、健康和家人也是資產，而且買不回來。"},
    {en:"Trade every day to win back yesterday's loss.",zh:"每天交易，想把昨天的虧損贏回來。",keep:false,why:"急著翻本是情緒交易，常常越虧越多。"}
  ],
  qs:[
    {q:"Mr. Lin buys a stock only because everyone else is buying, and he is afraid of being left behind. This feeling is called ______.",opts:["rebalancing","CAGR","FOMO","a bond"],a:2,
     ex:"FOMO ＝ Fear Of Missing Out，錯失恐懼。"},
    {q:"How does an emergency fund protect your investments?",opts:["It makes stock prices go up.","You don't have to sell stocks at a bad time when life surprises you.","It lets you borrow more money from your broker.","Banks pay 20% interest on it."],a:1,
     ex:"有緊急預備金，生活出意外時就不必在低點賣股票，投資才能真正「長期」。"},
    {q:"Dollar-cost averaging means ______.",opts:["buying only when prices are at the top","putting all your money in at once with a loan","selling everything when prices fall","investing the same amount at regular times, in good and bad markets"],a:3,
     ex:"定期定額：固定時間、固定金額。價格低時買到較多單位，價格高時買到較少，長期攤平成本。"}
  ],
  verdict:{q:"Who is stealing Mr. Lin's money AND his life?",qZh:"是誰偷走了林先生的錢，還有他的生活？",
    suspects:[
      {who:"bull",name:"Mr. Market",zh:"市場先生",say:"Every day I shout a new price. Some days I'm happy, some days I'm sad. You don't have to listen to me every minute.",sayZh:"我每天都喊一個新價格，有時開心、有時難過。你不必每分鐘都聽我的。"},
      {who:"mouse",name:"Panic Mouse",zh:"恐慌鼠",say:"When others buy, I squeak, 'Buy! Buy!' When prices fall, I squeak, 'Run! Run!' He always listens to me.",sayZh:"別人買的時候，我吱吱叫「快買！快買！」；價格一跌，我叫「快逃！快逃！」他每次都聽我的。"},
      {who:"phone",name:"Mr. Lin's Phone",zh:"林先生的手機",say:"I only show the numbers. He's the one who opens me 100 times a day!",sayZh:"我只是顯示數字。是他自己一天打開我 100 次！"}
    ],
    culprit:"mouse", hint:"市場本來就會漲跌，手機只是工具。是誰讓林先生「追高殺低」？",
    judgment:"本府判定：真兇是「恐慌鼠」！市場先生每天喊價，本來就忽喜忽憂；是恐慌鼠讓林先生聽到上漲就追、看到下跌就逃。把情緒關進大牢，才有時間陪家人、顧健康。",
    motto:{en:"Invest for your life. Don't give your life to the screen.",zh:"賺錢是為了生活，不是把生活賠給螢幕。"},
    theory:{t:"市場先生寓言",en:"Mr. Market",
      p:"價值投資之父葛拉漢（Benjamin Graham）在《智慧型股票投資人》（1949）中，把市場比喻成一位情緒化的合夥人：每天開一個價格，有時狂喜、有時絕望。你可以利用他的報價，但不必被他的情緒帶著走。搭配定期定額與緊急預備金，讓投資自動駕駛，把時間留給人生。"}}
}
];

const FINAL = {
  title:"The Vanishing Account of Xiao Chen", titleZh:"小陳帳戶消失案",
  story:[
    {en:"Xiao Chen is 26. In January, he opened a stock account with 500,000 dollars. He started a smart plan: 5,000 dollars every month into an index ETF.",
     zh:"小陳 26 歲。一月，他帶著 50 萬開了證券戶，還啟動一個聰明的計畫：每月 5,000 元定期定額買指數 ETF。"},
    {en:"In March, a 'teacher' in a LINE group posted: 'Stock XYZ will TRIPLE by summer! Guaranteed!' Xiao Chen stopped his monthly plan. He put all his money into XYZ. Then he borrowed 750,000 dollars more on margin.",
     zh:"三月，LINE 群組裡的「老師」貼文：「XYZ 夏天前漲三倍！保證！」小陳停掉定期定額，把所有錢押進 XYZ，又用融資多借了 75 萬。"},
    {en:"In June, XYZ fell 35%. The broker sent a margin call. Xiao Chen was so scared that he sold everything at 9:01 in the morning — the lowest price of the year.",
     zh:"六月，XYZ 跌了 35%，券商發出追繳通知。小陳嚇壞了，早上 9:01 全部賣光——賣在全年最低價。"},
    {en:"In December, his account shows only about 60,000 dollars. He runs into the court and shouts: 'The stock market stole my money!' Justice Bao strikes the gavel. 'Bring in the suspects!'",
     zh:"十二月，他的帳戶只剩約 6 萬元。他衝進公堂大喊：「股市偷了我的錢！」包大人一拍驚堂木：「帶嫌犯！」"}
  ],
  suspects:[
    {who:"bull",name:"Old Bull, the Market",zh:"股市老牛",guilty:false,say:"I went up 12% this year. I had one bad month in June, but I came back. Look at Exhibit A.",sayZh:"我今年漲了 12%。六月是有一個月不好，但我漲回來了。請看證物 A。"},
    {who:"fox",name:"Teacher Golden Fox",zh:"金狐老師",guilty:true,say:"I only said XYZ would triple. Is it my fault that people believed me?",sayZh:"我只是說 XYZ 會漲三倍。大家相信我，是我的錯嗎？"},
    {who:"hen",name:"Hen All-In",zh:"全押母雞",guilty:true,say:"One hundred percent in XYZ! One basket, easy to carry… oops.",sayZh:"百分之百押 XYZ！一個籃子，好提又方便……哎呀。"},
    {who:"puffer",name:"Puffer Leverage",zh:"槓桿河豚",guilty:true,say:"He borrowed 750,000. I puffed a 35% fall into an 88% loss. Puff!",sayZh:"他借了 75 萬。我把 35% 的下跌吹成 88% 的虧損。噗！"},
    {who:"mouse",name:"Panic Mouse",zh:"恐慌鼠",guilty:true,say:"Margin call! Scary news! I told him to sell everything at 9:01. Run, run!",sayZh:"追繳了！新聞好可怕！我叫他 9:01 全部賣掉。快逃快逃！"},
    {who:"turtle",name:"Steady Turtle",zh:"定期定額龜",guilty:false,say:"He left me in March. His sister kept me all year, and she is up 7.5%. Slow and steady.",sayZh:"他三月就拋棄我了。他妹妹整年都帶著我，現在賺 7.5%。慢慢來，比較快。"}
  ],
  judgment:"本府宣判：股市老牛、定期定額龜，當庭無罪釋放！金狐老師散布明牌、全押母雞孤注一擲、槓桿河豚放大虧損、恐慌鼠殺在最低點——四犯聯手，才讓 50 萬只剩 6 萬。小陳，偷走你錢的不是股市，是這四隻藏在心裡的妖怪。",
  motto:{en:"The market didn't take your money. Your habits did.",zh:"拿走你錢的不是市場，是你的習慣。"}
};

const RANKS = [
  {min:.9,zh:"包青天親傳弟子",en:"Justice Bao's Chosen Disciple"},
  {min:.75,zh:"御前名捕",en:"Imperial Detective"},
  {min:.55,zh:"開封府捕快",en:"Kaifeng Constable"},
  {min:0,zh:"見習捕快",en:"Apprentice Constable"}
];

let app = null;
const KEY = 'bao2-market-detective-v1';
const MAX_SCORE = 5*85 + 30 + 80;
const ZH = ['','一','二','三','四','五'];
const SPK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16 8.5a4.5 4.5 0 0 1 0 7M18.5 6a8 8 0 0 1 0 12" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>';
const STEPS = [{zh:'案情',en:'Brief'},{zh:'搜證',en:'Lab'},{zh:'審問',en:'Interrogate'},{zh:'宣判',en:'Verdict'}];
const FSTEPS = [{zh:'點名',en:'Roll Call'},{zh:'證物',en:'Exhibits'},{zh:'定罪',en:'Judgment'},{zh:'結案令',en:'Certificate'}];
const TERM_RE = /\{\{([^}|]+)(?:\|([^}]+))?\}\}/g;

/* ---------- state ---------- */
function fresh(){ return {name:'', cases:{}, final:{}}; }
function load(){ const s = JB.store.S; if(!s.cf || !s.cf.cases) s.cf = fresh(); if(!s.cf.final) s.cf.final = {}; return s.cf; }
let S = load();
function sync(){ S = load(); }
const UI = {step:{}, zh:false, fstep:null, match:null, lastWrong:null, justSolved:null, lab:{
  c:{p:1000000,m:0,r:7,n:20}, d:{d:30,lev:2.5}, g:{p:5000000,m:0,t:40000000,n:3}, p:{s:10,e:50,r:15,b:25}
}};
function save(){ JB.store.save(); }
function cs(id){
  const c = S.cases[id] || (S.cases[id] = {});
  c.reached = c.reached || 0; c.q = c.q || []; c.lab = c.lab || {}; c.v = c.v || {wrong:[]};
  if(!c.v.wrong) c.v.wrong = [];
  return c;
}
function caseScore(id){
  const c = cs(id); let s = c.lab.pts || 0;
  c.q.forEach(a => { if(a && a.ok) s += 15; });
  if(c.v.solved) s += c.v.pts || 0;
  return s;
}
function totalScore(){ let s = 0; for(let i=1;i<=5;i++) s += caseScore(i); return s + (S.final.rollPts||0) + (S.final.accPts||0); }
function solvedCount(){ return [1,2,3,4,5].filter(i => cs(i).v.solved).length; }
function unlockedTerms(){ return Object.keys(TERMS).filter(k => cs(TERMS[k].c).reached >= 1); }

/* ---------- helpers ---------- */
const fmt = n => Math.round(n).toLocaleString('en-US');
function wan(v){
  const a = Math.abs(v);
  if(a >= 1e8) return (v/1e8).toFixed(a >= 1e9 ? 0 : 1).replace(/\.0$/,'') + ' 億';
  if(a >= 1e4) return Math.round(v/1e4).toLocaleString('en-US') + ' 萬';
  return fmt(v);
}
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const plain = s => s.replace(TERM_RE, (m,k,d) => d || k);
const marked = s => s.replace(TERM_RE, (m,k,d) => `<button type="button" class="term" data-act="term" data-term="${k}">${d || k}</button>`);
function speak(t){ JB.audio.speak(t); return;
  try{
    if(!('speechSynthesis' in window)) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(t.replace(/_{3,}/g,'blank'));
    u.lang = 'en-US'; u.rate = .92; speechSynthesis.speak(u);
  }catch(e){}
}
function avatar(who){
  if(MENTORS[who]) return `<img src="${MENTORS[who].img}" alt="">`;
  return VILLAIN_SVG[who] || '';
}
function hashCase(){ const m = location.hash.match(/^#case-([1-5])$/); return m ? +m[1] : 0; }
function rerender(){ JB.app.rerender(); }
function toSteps(){ const n = document.querySelector('.steps'); if(n) n.scrollIntoView({block:'start'}); }

/* ---------- top bar ---------- */
function renderTopbar(){ return;
  document.getElementById('tb-seals').innerHTML = [1,2,3,4,5].map(i => `<i class="${cs(i).v.solved?'on':''}"></i>`).join('');
  document.getElementById('tb-solved').textContent = solvedCount();
  document.getElementById('tb-score').textContent = totalScore();
  document.getElementById('tb-nb').textContent = unlockedTerms().length;
}

/* ---------- home ---------- */
function mentorCard(k){
  const M = MENTORS[k];
  return `<article class="mentor paper">
    <div class="hexpic"><img src="${M.img}" alt="${M.name}"></div>
    <h3>${M.name}</h3><p class="role">${M.role}</p><p class="role-en">${M.en} · ${M.roleEn}</p>
    <q>${M.q}</q><p class="zh">${M.zh}</p></article>`;
}
function caseCard(C){
  const c = cs(C.id), solved = !!c.v.solved;
  const prog = [c.reached >= 2, !!c.lab.done, c.q.filter(Boolean).length === 3, solved];
  return `<a class="case-card" href="#case-${C.id}">
    <div class="row"><span class="num">Case File ${C.id} · 卷${ZH[C.id]}</span><span class="progress-dots" aria-label="進度">${prog.map(p => `<i class="${p?'on':''}"></i>`).join('')}</span></div>
    <div class="row"><div><h3>${C.pillar}</h3><p class="ask">${C.ask}</p></div><img class="ico" src="${C.icon}" alt=""></div>
    <p class="en">${C.title}</p>
    <div class="wanted ${solved?'':'unknown'}"><span class="vsvg">${VILLAIN_SVG[C.villain]}</span>
      <span class="wtxt"><b>${solved ? C.villainName + '・已緝拿' : '通緝中 · WANTED'}</b>${solved ? C.villainEn : (c.reached ? '辦案中，真兇身分未明' : '點開卷宗，開始辦案')}</span></div>
    ${solved ? '<span class="stamp">結案</span>' : ''}
  </a>`;
}
function finalCard(){
  const open = solvedCount() === 5, done = !!S.final.done;
  const tag = open ? 'a' : 'div';
  return `<${tag} class="case-card final ${open?'':'locked'}" ${open?'href="#grand-trial"':'aria-disabled="true"'}>
    <div class="row"><span class="num">Grand Trial · 終極大審</span></div>
    <div class="row"><div><h3>包大人開堂</h3><p class="ask">${open ? '五案已破，帶嫌犯上堂！' : '集滿 5 枚結案令牌後開啟'}</p></div><span class="brand-seal" style="width:58px;height:58px;font-size:30px">審</span></div>
    <p class="en">${FINAL.title}</p>
    <div class="wanted"><span class="gang">${['fox','hen','puffer','mouse','bull','turtle'].map(k => `<span>${VILLAIN_SVG[k]}</span>`).join('')}</span>
      <span class="wtxt"><b>${done ? '已宣判' : '六名嫌犯候審'}</b>令牌 ${solvedCount()} / 5</span></div>
    ${done ? '<span class="stamp">結案</span>' : ''}
  </${tag}>`;
}
function renderHome(){
  app.innerHTML = `
  <section class="wrap board" id="board">
    <div class="sec-head"><div><p class="eyebrow">Case Board · Five Pillars of Your Life Assets</p><h2>五大卷宗</h2></div><p>每一卷四步：讀英文案情 → 動手搜證 → 審問三題 → 指認真兇。破一案得一枚令牌，五枚到齊，終極大審開庭。</p></div>
    <div class="board-grid">${CASES.map(caseCard).join('')}${finalCard()}</div>
  </section>
  <div class="mentor-grid wrap" style="padding-block:6px 20px">${['gongsun','bao','zhan'].map(mentorCard).join('')}</div>
  <footer class="wrap foot">
    <p class="motto">跟著包青天 2.0，用宋代的智慧，打造<em>現代的人生勝算</em>！</p>
    <p>本頁所有報酬率與情境數字皆為教學示意，不構成投資建議；過去績效不代表未來表現。</p>
    <span style="display:flex;gap:14px;flex-wrap:wrap;justify-content:center"><button type="button" class="linkish" data-act="nb">打開卷宗筆記（30 字）</button><button type="button" class="linkish" data-act="reset">清除卷宗進度</button></span>
  </footer>`;
}

/* ---------- case page ---------- */
function stepBar(steps, cur, reached, doneFn, act){
  return `<nav class="steps" aria-label="辦案步驟">${steps.map((s,i) => {
    const n = i+1, cls = n === cur ? 'cur' : (doneFn(n) ? 'done' : '');
    return `<button type="button" class="${cls}" data-act="${act}" data-step="${n}" ${n > reached ? 'disabled' : ''} ${n===cur?'aria-current="step"':''}><span class="n">${n}</span>${s.zh}<span class="en">${s.en}</span></button>`;
  }).join('')}</nav>`;
}
function caseHead(C){
  const M = MENTORS[C.mentor];
  return `<header class="case-head paper">
    <div class="case-id"><img class="ico" src="${C.icon}" alt=""><div>
      <p class="eyebrow">Case File ${C.id} · 卷${ZH[C.id]} · ${C.pillarEn}</p>
      <h2>${C.titleZh}</h2><p class="en-title">${C.title}</p>
      <p class="ask">${C.pillar}：${C.ask}</p></div></div>
    <div class="mentor-say"><div class="hexpic"><img src="${M.img}" alt="${M.name}"></div>
      <blockquote><p class="q-en">“${C.line.en}”</p><p class="q-zh">${C.line.zh}</p><cite>${M.name} ${M.en} · ${M.role}</cite></blockquote></div>
  </header>`;
}
function renderCase(id){
  const C = CASES[id-1], c = cs(id);
  if(c.reached < 1){ c.reached = 1; save(); }
  let step = UI.step[id] || c.reached;
  if(step > c.reached) step = c.reached;
  UI.step[id] = step;
  const done = n => n < c.reached || (n === 4 && c.v.solved);
  const body = step === 1 ? stageBrief(C) : step === 2 ? stageLab(C) : step === 3 ? stageQuiz(C) : stageVerdict(C);
  app.innerHTML = `<section class="wrap case-page">
    <a class="back" href="#cases">← 回到卷宗大堂</a>
    ${caseHead(C)}
    ${stepBar(STEPS, step, c.reached, done, 'step')}
    <div class="stage paper">${body}</div>
  </section>`;
  if(step === 2) updateLab(C.lab.type);
}
function stageBrief(C){
  return `<div class="stage-title"><h3>案情<small>The Case</small></h3><div class="tools">
      <button type="button" class="icon-btn" data-act="speak-story">${SPK}朗讀英文</button>
      <label class="toggle"><input type="checkbox" id="zh-toggle" ${UI.zh?'checked':''}>中文提示</label></div></div>
    <div class="story">${C.story.map(p => `<p class="en">${marked(p.en)}</p><p class="zh" ${UI.zh?'':'hidden'}>${p.zh}</p>`).join('')}</div>
    <div><p class="box-label">Key Terms · 本案六個關鍵字</p>
      <div class="termlist">${C.terms.map(k => `<button type="button" class="termchip" data-act="term" data-term="${k}"><b>${k}</b><span>${TERMS[k].zh}</span></button>`).join('')}</div></div>
    <div class="nav-row"><span class="hint">點文章中畫底線的字，可看英文解釋並聽發音。</span>
      <button type="button" class="btn btn-seal" data-act="goto" data-step="2">前往搜證 →</button></div>`;
}
function optsHTML(Q, sel, act, extra){
  const answered = sel !== undefined && sel !== null;
  const long = Q.opts.some(o => o.length > 26);
  return `<div class="opts ${long?'long':''}">${Q.opts.map((o,i) => {
      let cls = '';
      if(answered){ if(i === Q.a) cls = 'right'; else if(i === sel) cls = 'wrong'; }
      return `<button type="button" class="opt ${cls}" data-act="${act}" data-i="${i}" ${extra} ${answered?'disabled':''}><span class="L">${'ABCD'[i]}</span><span>${o}</span></button>`;
    }).join('')}</div>
    ${answered ? `<div class="fb ${sel===Q.a?'ok':'no'}"><b>${sel===Q.a ? '答對了！' : '答錯了，正解是 ' + 'ABCD'[Q.a] + '。'}</b>${Q.ex}</div>` : ''}`;
}
function stageLab(C){
  const c = cs(C.id), L = C.lab;
  const widget = LABS[L.type](C);
  const ch = L.ch ? `<div class="qcard"><div class="qhead"><span class="qtag">證物題 · Evidence Question · +10</span>
      <button type="button" class="icon-btn" data-act="speak" data-text="${esc(L.ch.q)}">${SPK}聽</button></div>
      <p class="qtext">${L.ch.q}</p>${optsHTML(L.ch, c.lab.ans, 'ch', '')}</div>` : '';
  return `<div class="stage-title"><h3>搜證・${L.title}<small>${L.titleEn}</small></h3></div>
    <p class="lab-intro">${L.intro}</p>
    ${widget}${ch}
    <div class="nav-row"><span class="hint">${c.lab.done ? '證物到手，可以審問嫌犯了。' : (L.ch ? '答完證物題，才能開始審問。' : '把 8 個習慣全部判對，才能開始審問。')}</span>
      <button type="button" class="btn btn-seal" data-act="goto" data-step="3" ${c.lab.done?'':'disabled'}>開始審問 →</button></div>`;
}
function stageQuiz(C){
  const c = cs(C.id);
  const all = c.q.filter(Boolean).length === 3;
  return `<div class="stage-title"><h3>審問<small>Interrogation · 3 questions</small></h3></div>
    ${C.qs.map((Q,qi) => `<div class="qcard"><div class="qhead"><span class="qtag">Question ${qi+1} / 3 · +15</span>
      <button type="button" class="icon-btn" data-act="speak" data-text="${esc(Q.q)}">${SPK}聽</button></div>
      <p class="qtext">${Q.q}</p>${optsHTML(Q, c.q[qi] ? c.q[qi].sel : undefined, 'q', `data-q="${qi}"`)}</div>`).join('')}
    <div class="nav-row"><span class="hint">${all ? '口供齊全，升堂宣判！' : '三題都作答後，才能升堂宣判。'}</span>
      <button type="button" class="btn btn-seal" data-act="goto" data-step="4" ${all?'':'disabled'}>升堂宣判 →</button></div>`;
}
function suspectCard(C, s){
  const c = cs(C.id), V = C.verdict;
  const wrong = c.v.wrong.includes(s.who);
  const caught = c.v.solved && s.who === V.culprit;
  const cleared = wrong || (c.v.solved && !caught);
  return `<article class="suspect ${caught?'caught':''} ${cleared?'cleared':''}">
    ${caught ? '<span class="mini-stamp in">真兇</span>' : ''}${wrong ? '<span class="mini-stamp out">無罪</span>' : ''}
    <div class="face">${avatar(s.who)}</div>
    <h4>${s.name}<small>${s.zh}</small></h4>
    <p class="say">“${s.say}”</p>
    <p class="say-zh" ${UI.zh?'':'hidden'}>${s.sayZh}</p>
    <div class="acts"><button type="button" class="icon-btn" data-act="speak" data-text="${esc(s.say)}">${SPK}聽供詞</button>
      ${(!c.v.solved && !wrong) ? `<button type="button" class="btn btn-seal" data-act="accuse" data-who="${s.who}">指認此人</button>` : ''}</div>
  </article>`;
}
function judgmentHTML(V, pts, maxPts, anim){
  return `<div class="judgment"><span class="big-stamp ${anim?'stamp-in':''}">結案</span>
      <div class="hexpic"><img src="${JB.face('bao','verdict')}" alt="包青天"></div>
      <div><h4>包大人判詞</h4><p class="verdict-text">${V.judgment}</p>
        <p class="motto">“${V.motto.en}”<small>${V.motto.zh}</small></p>
        ${pts !== null ? `<p class="pts" style="color:var(--gold-soft);margin-top:10px">功績 ${pts} / ${maxPts}</p>` : ''}</div></div>`;
}
function stageVerdict(C){
  const c = cs(C.id), V = C.verdict;
  const anim = UI.justSolved === C.id; UI.justSolved = null;
  let next = '';
  if(c.v.solved){
    next = C.id < 5 ? `<a class="btn btn-seal" href="#case-${C.id+1}">下一卷：${CASES[C.id].pillar} →</a>`
      : (solvedCount() === 5 ? `<a class="btn btn-seal" href="#grand-trial">前往終極大審 →</a>` : `<a class="btn btn-seal" href="#cases">回大堂看還沒破的案 →</a>`);
  }
  return `<div class="stage-title"><h3>宣判<small>The Verdict</small></h3><div class="tools">
      <label class="toggle"><input type="checkbox" id="zh-toggle" ${UI.zh?'checked':''}>中文提示</label></div></div>
    <div class="qcard"><span class="qtag">${c.v.solved ? '本案已結' : '指認真兇 · 一次就對 +30，第二次 +15'}</span>
      <p class="qtext">${V.q}</p><p class="say-zh">${V.qZh}</p></div>
    <div class="suspects">${V.suspects.map(s => suspectCard(C, s)).join('')}</div>
    ${(!c.v.solved && c.v.wrong.length) ? `<div class="fb no"><b>抓錯人了！再讀一次供詞。</b>${V.hint}</div>` : ''}
    ${c.v.solved ? judgmentHTML(V, caseScore(C.id), 85, anim) + `<div class="theory"><h5>本案學說：${V.theory.t}<span>${V.theory.en}</span></h5><p>${V.theory.p}</p></div>` : ''}
    <div class="nav-row"><a class="btn btn-ghost" href="#cases">回卷宗大堂</a>${next}</div>`;
}

/* ---------- labs ---------- */
function rangeCtl(id, label, min, max, step, val){
  return `<div class="ctl"><label for="${id}"><span>${label}</span><output id="${id}-o"></output></label>
    <input type="range" id="${id}" min="${min}" max="${max}" step="${step}" value="${val}" data-lab="1"></div>`;
}
function numCtl(id, label, val, step){
  return `<div class="ctl"><label for="${id}"><span>${label}</span><output id="${id}-o"></output></label><input type="number" id="${id}" min="0" step="${step}" value="${val}" data-lab="1" inputmode="numeric"></div>`;
}
const LABS = {
  compound(){
    const v = UI.lab.c;
    return `<div class="lab"><div class="controls">
        ${rangeCtl('c-p','本金 Principal',0,5000000,100000,v.p)}
        ${rangeCtl('c-m','每月投入 Monthly saving',0,30000,1000,v.m)}
        ${rangeCtl('c-r','平均年報酬 Average return',0,12,.5,v.r)}
        ${rangeCtl('c-n','時間 Years',1,40,1,v.n)}
        <p class="hint" style="font-size:12.5px;color:var(--ink-faint)">以年複利簡化計算；每月投入於年底合計入帳。通膨固定以 2% 示意。</p>
      </div>
      <div class="readout">
        <div><p class="lbl" id="c-lbl">投資價值 Value</p><p class="big" id="c-v"></p></div>
        <div class="kv">
          <div><p class="lbl">總投入 Put in</p><p class="v" id="c-in"></p></div>
          <div><p class="lbl">複利滾出 Growth</p><p class="v good" id="c-g"></p></div>
          <div><p class="lbl">同樣的錢藏床底（實質購買力）</p><p class="v bad" id="c-real"></p></div>
          <div><p class="lbl">72 法則：翻倍約需</p><p class="v" id="c-72"></p></div>
        </div>
        <svg class="chart" id="c-chart" viewBox="0 0 400 190" role="img" aria-label="投資價值隨時間成長的折線圖"></svg>
        <div class="legend"><span><i style="background:var(--gold)"></i>投資價值</span><span><i style="background:var(--mist)"></i>總投入</span><span><i style="background:#ff9d8f"></i>床底現金（扣 2% 通膨）</span></div>
      </div></div>`;
  },
  drawdown(){
    const v = UI.lab.d;
    return `<div class="lab"><div class="controls">
        ${rangeCtl('d-d','股價跌幅 The stock falls',0,90,5,v.d)}
        <div class="ctl"><label><span>槓桿倍數 Leverage</span></label>
          <div class="seg" role="group" aria-label="槓桿倍數">${[1,1.5,2.5].map(l => `<button type="button" data-act="lev" data-l="${l}" class="${v.lev===l?'on':''}">${l}×${l===1?' 不借錢':l===2.5?' 阿虎':''}</button>`).join('')}</div></div>
        <div><p class="box-label" style="margin:6px 0">回本階梯 Recovery Ladder</p>
        <table class="ladder" id="d-ladder"><thead><tr><th>帳戶跌掉 Loss</th><th>回本需上漲 Gain needed</th></tr></thead><tbody>
          ${[10,20,30,50,75,90].map(l => `<tr data-l="${l}"><td>−${l}%</td><td>+${(100/(100-l)*100-100).toFixed(l===10||l===30?1:0)}%</td></tr>`).join('')}
        </tbody></table></div>
      </div>
      <div class="readout">
        <div><p class="lbl">你自己的錢跌了 · Your own money</p><p class="big" id="d-loss"></p></div>
        <div class="kv">
          <div><p class="lbl">40 萬本金剩下</p><p class="v bad" id="d-left"></p></div>
          <div><p class="lbl">回本需要上漲</p><p class="v" id="d-need"></p></div>
          <div><p class="lbl">融資維持率（示意）</p><p class="v" id="d-ratio"></p></div>
          <div><p class="lbl">股價本身跌幅</p><p class="v" id="d-stock"></p></div>
        </div>
        <div id="d-warn"></div>
        <svg class="chart" id="d-chart" viewBox="0 0 400 170" role="img" aria-label="下跌與回本所需漲幅示意圖"></svg>
      </div></div>`;
  },
  goal(){
    const v = UI.lab.g;
    return `<div class="lab"><div class="controls">
        <div class="presets">
          <button type="button" data-act="preset-goal" data-p="5000000,0,40000000,3">三年四千萬</button>
          <button type="button" data-act="preset-goal" data-p="10000000,0,100000000,10">十年一億</button>
          <button type="button" data-act="preset-goal" data-p="1000000,20000,20000000,25">上班族存 2,000 萬</button>
        </div>
        <div class="ctl-grid">
          ${numCtl('g-p','起始資金 Start',v.p,100000)}
          ${numCtl('g-m','每月投入 Monthly',v.m,1000)}
          ${numCtl('g-t','目標金額 Target',v.t,1000000)}
          ${numCtl('g-n','年數 Years',v.n,1)}
        </div>
        <p class="hint" style="font-size:12.5px;color:var(--ink-faint)">以年複利計算，每月投入於年底合計入帳。</p>
      </div>
      <div class="readout">
        <div><p class="lbl">需要的年化報酬率 · Required CAGR</p><p class="big" id="g-r"></p></div>
        <p class="verdict-chip" id="g-chip"></p>
        <div><div class="gauge" id="g-gauge"></div><div class="gauge-scale" style="margin-top:6px"><span>0%</span><span>10%</span><span>20%</span><span>30%</span><span>40%+</span></div></div>
        <p class="lbl">整體股市長期平均年報酬約 7–10%（歷史數據，不保證未來）。</p>
        <div class="kv">
          <div><p class="lbl">自己投入 Put in</p><p class="v" id="g-in"></p></div>
          <div><p class="lbl">要靠報酬滾出 From returns</p><p class="v" id="g-need"></p></div>
        </div>
      </div></div>`;
  },
  portfolio(){
    const v = UI.lab.p;
    return `<div class="lab"><div class="controls">
        <div class="presets">
          <button type="button" data-act="preset-port" data-p="100,0,0,0">大哥：全押個股</button>
          <button type="button" data-act="preset-port" data-p="10,50,15,25">二哥：分散配置</button>
          <button type="button" data-act="preset-port" data-p="0,0,0,100">小弟：全放現金</button>
        </div>
        ${rangeCtl('p-s','個股 Single stock',0,100,5,v.s)}
        ${rangeCtl('p-e','指數 ETF Index ETF',0,100,5,v.e)}
        ${rangeCtl('p-r','房地產 Real estate',0,100,5,v.r)}
        ${rangeCtl('p-b','債券與現金 Bonds & cash',0,100,5,v.b)}
        <p class="hint" id="p-sum" style="font-size:12.5px;color:var(--ink-faint)"></p>
      </div>
      <div class="readout">
        <div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap">
          <svg id="p-donut" viewBox="0 0 120 120" width="120" height="120" role="img" aria-label="資產配置圓環圖" style="flex:none"></svg>
          <div id="p-legend" class="legend" style="flex-direction:column;gap:4px"></div>
        </div>
        <p class="lbl">同一筆 100 萬，遇到三種天氣（教學示意）：</p>
        <div class="scen" id="p-scen"></div>
      </div></div>`;
  },
  balance(C){
    const c = cs(C.id), sorted = c.lab.sorted || {};
    const n = Object.keys(sorted).length;
    return `<div><div class="meter" aria-label="人生平衡度"><span style="width:${n/8*100}%"></span></div>
        <p class="hint" style="font-size:13px;color:var(--ink-faint);margin-top:6px">人生平衡度 ${n} / 8　·　判錯次數 ${c.lab.mistakes||0}</p></div>
      <div class="sort-list">${C.habits.map((h,i) => {
        const placed = sorted[i];
        const wrong = UI.lastWrong === i;
        return `<div class="habit ${placed ? (h.keep?'placed-keep':'placed-out') : ''} ${wrong?'shake':''}">
          <p class="h-en">${h.en}</p><p class="h-zh">${h.zh}</p>
          ${placed ? `<p class="why"><b>${h.keep ? '✓ 留在府中' : '✗ 逐出公堂'}</b>　${h.why}</p>`
            : `${wrong ? `<p class="why" style="color:var(--seal)">再想想：這個習慣${h.keep?'其實是好習慣':'會讓你吃虧'}。</p>` : ''}
              <div class="h-acts"><button type="button" class="keep" data-act="habit" data-h="${i}" data-v="keep">留在府中 Keep</button>
              <button type="button" class="out" data-act="habit" data-h="${i}" data-v="out">逐出公堂 Out</button></div>`}
        </div>`;}).join('')}</div>`;
  }
};
const $ = id => document.getElementById(id);
function niceMax(m){ if(m <= 0) return 1; const p = 10 ** Math.floor(Math.log10(m)); const n = m/p; return (n<=1?1:n<=2?2:n<=2.5?2.5:n<=5?5:10) * p; }
function updateLab(type){
  if(type === 'compound'){
    const v = UI.lab.c;
    v.p = +$('c-p').value; v.m = +$('c-m').value; v.r = +$('c-r').value; v.n = +$('c-n').value;
    $('c-p-o').textContent = fmt(v.p); $('c-m-o').textContent = fmt(v.m); $('c-r-o').textContent = v.r + '%'; $('c-n-o').textContent = v.n + ' 年';
    const r = v.r/100, A = v.m*12; let V = v.p, R = v.p, put = v.p;
    const val = [V], inv = [put], real = [R];
    for(let t=1; t<=v.n; t++){ V = V*(1+r) + A; R = R/1.02 + A; put += A; val.push(V); inv.push(put); real.push(R); }
    $('c-lbl').textContent = `${v.n} 年後的投資價值 · Value after ${v.n} years`;
    $('c-v').textContent = fmt(V);
    $('c-in').textContent = fmt(put); $('c-g').textContent = '+' + fmt(V - put); $('c-real').textContent = fmt(R);
    $('c-72').textContent = r > 0 ? `${(72/v.r).toFixed(1)} 年` : '永遠不會';
    const W=400,H=190,pl=46,pr=10,pt=10,pb=24, max = niceMax(Math.max(...val, ...inv, 1));
    const x = i => pl + i/v.n*(W-pl-pr), y = d => pt + (1-d/max)*(H-pt-pb);
    const line = arr => arr.map((d,i) => `${x(i).toFixed(1)},${y(d).toFixed(1)}`).join(' ');
    let g = '';
    for(let k=0;k<=4;k++){ const d = max*k/4; g += `<line x1="${pl}" x2="${W-pr}" y1="${y(d)}" y2="${y(d)}" stroke="rgba(195,205,234,.14)"/><text x="${pl-6}" y="${y(d)+3}" text-anchor="end">${wan(d)}</text>`; }
    [0, Math.round(v.n/2), v.n].forEach(t => { g += `<text x="${x(t)}" y="${H-6}" text-anchor="middle">${t}年</text>`; });
    g += `<polygon points="${pl},${y(0)} ${line(val)} ${x(v.n)},${y(0)}" fill="rgba(216,164,67,.16)"/>`;
    g += `<polyline points="${line(inv)}" fill="none" stroke="#c3cdea" stroke-width="1.6" stroke-dasharray="4 4"/>`;
    g += `<polyline points="${line(real)}" fill="none" stroke="#ff9d8f" stroke-width="1.8" stroke-dasharray="2 3"/>`;
    g += `<polyline points="${line(val)}" fill="none" stroke="#d8a443" stroke-width="2.6"/>`;
    g += `<circle cx="${x(v.n)}" cy="${y(V)}" r="4" fill="#f2d999"/>`;
    $('c-chart').innerHTML = g;
  }
  if(type === 'drawdown'){
    const v = UI.lab.d; v.d = +$('d-d').value;
    $('d-d-o').textContent = '−' + v.d + '%';
    const d = v.d/100, loss = Math.min(1, d*v.lev);
    const need = loss < 1 ? (1/(1-loss) - 1) : Infinity;
    $('d-loss').textContent = '−' + Math.round(loss*100) + '%';
    $('d-left').textContent = fmt(400000*(1-loss));
    $('d-need').textContent = need === Infinity ? '回不來了' : '+' + Math.round(need*100) + '%';
    $('d-stock').textContent = '−' + v.d + '%';
    let warn = '';
    if(v.lev > 1){
      const ratio = v.lev*(1-d)/(v.lev-1);
      $('d-ratio').textContent = Math.round(ratio*100) + '%';
      if(loss >= 1) warn = '帳戶歸零：股票全部被強制賣出（斷頭）。';
      else if(ratio < 1.3) warn = '維持率低於約 130%：券商發出追繳通知（margin call）！';
    } else $('d-ratio').textContent = '沒借錢，不會被追繳';
    $('d-warn').innerHTML = warn ? `<p class="warn">${warn}</p>` : '';
    document.querySelectorAll('#d-ladder tr[data-l]').forEach(tr => tr.classList.toggle('hot', Math.abs(+tr.dataset.l - loss*100) < 5.01));
    const W=400, top=28, floor = top + Math.min(1,loss)*112, x1=40, x2=200, x3=360;
    let g = `<line x1="20" x2="${W-14}" y1="${top}" y2="${top}" stroke="rgba(195,205,234,.35)" stroke-dasharray="3 4"/><text x="22" y="${top-8}">起點 Start</text>`;
    g += `<line x1="${x1}" y1="${top}" x2="${x2}" y2="${floor}" stroke="#ff8f80" stroke-width="3"/>`;
    g += `<line x1="${x2}" y1="${floor}" x2="${x3}" y2="${top}" stroke="#d8a443" stroke-width="3" stroke-dasharray="6 5"/>`;
    g += `<circle cx="${x2}" cy="${floor}" r="4.5" fill="#ff8f80"/><polygon points="${x3},${top} ${x3-12},${top+4} ${x3-6},${top+12}" fill="#d8a443"/>`;
    g += `<text x="${(x1+x2)/2 - 18}" y="${(top+floor)/2 + 16}" text-anchor="end" style="font-size:13px;fill:#ff8f80">−${Math.round(loss*100)}%</text>`;
    g += `<text x="${(x2+x3)/2 + 18}" y="${(top+floor)/2 + 16}" style="font-size:13px;fill:#f2d999">${need===Infinity?'回不來':'+'+Math.round(need*100)+'%'}</text>`;
    $('d-chart').innerHTML = g;
  }
  if(type === 'goal'){
    const v = UI.lab.g;
    v.p = Math.max(0, +$('g-p').value || 0); v.m = Math.max(0, +$('g-m').value || 0); v.t = Math.max(0, +$('g-t').value || 0); v.n = Math.max(0, Math.round(+$('g-n').value || 0));
    document.querySelectorAll('[data-act="preset-goal"]').forEach(b => b.classList.toggle('on', b.dataset.p === [v.p,v.m,v.t,v.n].join(',')));
    const A = v.m*12, put = v.p + A*v.n;
    const fv = r => { let V = v.p; for(let t=0;t<v.n;t++) V = V*(1+r) + A; return V; };
    let r = null, txt;
    if(v.n < 1 || v.t <= 0){ txt = '—'; }
    else if(put >= v.t){ r = 0; txt = '0%'; }
    else if(v.p === 0 && A === 0){ r = Infinity; txt = '無法達成'; }
    else if(fv(20) < v.t){ r = Infinity; txt = '> 2000%'; }
    else { let lo=0, hi=20; for(let k=0;k<100;k++){ const mid=(lo+hi)/2; if(fv(mid) < v.t) lo = mid; else hi = mid; } r = hi; txt = (r*100 >= 100 ? Math.round(r*100) : (r*100).toFixed(1)) + '%'; }
    $('g-r').textContent = txt;
    $('g-p-o').textContent = wan(v.p); $('g-m-o').textContent = wan(v.m); $('g-t-o').textContent = wan(v.t); $('g-n-o').textContent = v.n + ' 年';
    const Z = [[6,'穩健可行','Realistic','#2c7a57','#8fe0b4'],[10,'靠股市＋耐心，可期','Possible with patience','#6aa86f','#c3e59a'],[15,'非常困難','Very hard','#d8a443','#f2d999'],[30,'傳奇等級','Legendary','#d9773a','#ffb27a'],[Infinity,'荒謬！詐騙警報','Fantasy — red flag','#b5302a','#ff8f80']];
    const chip = $('g-chip');
    if(r === null){ chip.textContent = '請輸入年數與目標'; chip.style.color = 'var(--mist)'; }
    else if(put >= v.t){ chip.innerHTML = '光靠存錢就夠了<small>Saving is enough</small>'; chip.style.color = '#8fe0b4'; }
    else { const z = Z.find(z => r*100 <= z[0]); chip.innerHTML = `${z[1]}<small>${z[2]}</small>`; chip.style.color = z[4]; }
    const segs = [[0,6],[6,10],[10,15],[15,30],[30,40]];
    const mk = r === null ? 0 : Math.min(40, r*100)/40*100;
    $('g-gauge').innerHTML = segs.map((s,i) => `<span style="width:${(s[1]-s[0])/40*100}%;background:${Z[i][3]}"></span>`).join('') + `<span class="mk" style="left:calc(${mk}% - 1.5px)"></span>`;
    $('g-in').textContent = fmt(put);
    $('g-need').textContent = put >= v.t ? '0' : fmt(v.t - put);
  }
  if(type === 'portfolio'){
    const v = UI.lab.p;
    v.s = +$('p-s').value; v.e = +$('p-e').value; v.r = +$('p-r').value; v.b = +$('p-b').value;
    ['s','e','r','b'].forEach(k => { $('p-'+k+'-o').textContent = v[k] + '%'; });
    document.querySelectorAll('[data-act="preset-port"]').forEach(b => b.classList.toggle('on', b.dataset.p === [v.s,v.e,v.r,v.b].join(',')));
    const sum = v.s+v.e+v.r+v.b;
    const w = sum ? [v.s,v.e,v.r,v.b].map(x => x/sum) : [0,0,0,1];
    $('p-sum').textContent = sum === 100 ? '合計 100%' : `目前合計 ${sum}%，計算時自動按比例換算成 100%。`;
    const names = ['個股','指數 ETF','房地產','債券與現金'], cols = ['#ff7a6b','#d8a443','#7cc58a','#9fb2d3'];
    let off = 0, dn = `<circle cx="60" cy="60" r="40" fill="none" stroke="rgba(195,205,234,.12)" stroke-width="20"/>`;
    w.forEach((p,i) => { if(p > 0){ dn += `<circle cx="60" cy="60" r="40" fill="none" stroke="${cols[i]}" stroke-width="20" pathLength="100" stroke-dasharray="${(p*100).toFixed(2)} ${(100-p*100).toFixed(2)}" stroke-dashoffset="${(-off*100).toFixed(2)}" transform="rotate(-90 60 60)"/>`; off += p; } });
    $('p-donut').innerHTML = dn;
    $('p-legend').innerHTML = names.map((n,i) => `<span><i style="background:${cols[i]};height:10px;width:10px"></i>${n} ${Math.round(w[i]*100)}%</span>`).join('');
    const SC = [['個股暴雷',[-70,-3,0,1]],['熊市崩跌',[-45,-30,-10,3]],['牛市大漲',[40,20,6,2]]];
    const lo = -70, hi = 45, span = hi - lo, zero = -lo/span*100;
    $('p-scen').innerHTML = SC.map(([n, rs]) => {
      const pct = rs.reduce((a,x,i) => a + x*w[i], 0);
      const L = pct < 0 ? zero + pct/span*100 : zero, Wd = Math.abs(pct)/span*100;
      return `<div class="scen-row"><span>${n}</span><span class="bar" style="--zero:${zero}%"><span style="left:${L}%;width:${Wd}%;background:${pct<0?'#ff8f80':'#8fe0b4'}"></span></span>
        <span class="pct" style="color:${pct<0?'#ff9d8f':'#9fe0bd'}">${pct>0?'+':''}${pct.toFixed(1)}%</span></div>
        <p class="lbl" style="margin:-6px 0 2px 102px">100 萬 → ${wan(1000000*(1+pct/100))}</p>`;
    }).join('');
  }
}

/* ---------- final trial ---------- */
function exhibitChart(){
  const vals = [100,102,104,103,101,93,96,100,104,107,110,112], W=360, H=150, pl=34, pr=10, pt=12, pb=22, lo=90, hi=115;
  const x = i => pl + i/11*(W-pl-pr), y = d => pt + (1-(d-lo)/(hi-lo))*(H-pt-pb);
  let g = '';
  [90,100,110].forEach(d => { g += `<line x1="${pl}" x2="${W-pr}" y1="${y(d)}" y2="${y(d)}" stroke="#d8c8a6"/><text x="${pl-5}" y="${y(d)+3}" text-anchor="end">${d}</text>`; });
  ['J','F','M','A','M','J','J','A','S','O','N','D'].forEach((m,i) => { g += `<text x="${x(i)}" y="${H-6}" text-anchor="middle">${m}</text>`; });
  g += `<polyline points="${vals.map((d,i) => `${x(i)},${y(d)}`).join(' ')}" fill="none" stroke="#2c7a57" stroke-width="2.4"/>`;
  g += `<circle cx="${x(5)}" cy="${y(93)}" r="4" fill="#b5302a"/><text x="${x(5)+8}" y="${y(93)+12}" style="fill:#b5302a">June dip</text>`;
  g += `<circle cx="${x(11)}" cy="${y(112)}" r="4" fill="#2c7a57"/><text x="${x(11)-6}" y="${y(112)-8}" text-anchor="end" style="fill:#2c7a57;font-weight:600">+12%</text>`;
  return `<svg class="chart light" viewBox="0 0 ${W} ${H}" role="img" aria-label="大盤指數全年走勢：六月下跌後回升，全年上漲 12%" style="font-family:var(--f-mono);font-size:10px;fill:#8c7d6e">${g}</svg>`;
}
function initMatch(){
  const keys = Object.keys(TERMS).sort(() => Math.random() - .5).slice(0,6);
  UI.match = {keys, en:[...keys].sort(() => Math.random() - .5), zh:[...keys].sort(() => Math.random() - .5), done:[], sel:{}, bad:null, wrongs:0};
}
function stageRoll(){
  const f = S.final;
  if(!UI.match) initMatch();
  const M = UI.match, fin = f.rollDone || M.done.length === 6;
  const card = (k, side) => {
    const ok = f.rollDone || M.done.includes(k), sel = M.sel[side] === k, bad = M.bad && M.bad[side] === k;
    return `<button type="button" class="mcard ${side} ${ok?'ok':''} ${sel?'sel':''} ${bad?'bad':''}" data-act="m" data-side="${side}" data-k="${k}" ${ok?'disabled':''}>${side==='en' ? k : TERMS[k].zh}</button>`;
  };
  return `<div class="stage-title"><h3>升堂點名<small>Roll Call · match the terms</small></h3>
      ${!f.rollDone ? '<button type="button" class="icon-btn" data-act="m-new">換一組</button>' : ''}</div>
    <p class="lab-intro">開庭前先點名：把左邊的英文術語和右邊的中文配成對（先點一邊，再點另一邊）。滿分 30，每配錯一次扣 2 分。</p>
    <div class="match"><div class="col">${M.en.map(k => card(k,'en')).join('')}</div><div class="col">${M.zh.map(k => card(k,'zh')).join('')}</div></div>
    ${fin ? `<div class="fb ok"><b>點名完畢！</b>本關得分 ${f.rollPts} / 30。</div>` : ''}
    <div class="nav-row"><span class="hint">配錯 ${f.rollDone ? '' : M.wrongs + ' 次'}</span>
      <button type="button" class="btn btn-seal" data-act="fgoto" data-step="2" ${fin?'':'disabled'}>呈上證物 →</button></div>`;
}
function stageExhibits(){
  return `<div class="stage-title"><h3>案情與證物<small>The Case & Exhibits</small></h3><div class="tools">
      <button type="button" class="icon-btn" data-act="speak-final">${SPK}朗讀英文</button>
      <label class="toggle"><input type="checkbox" id="zh-toggle" ${UI.zh?'checked':''}>中文提示</label></div></div>
    <div class="story">${FINAL.story.map(p => `<p class="en">${p.en}</p><p class="zh" ${UI.zh?'':'hidden'}>${p.zh}</p>`).join('')}</div>
    <div class="exhibits">
      <div class="exhibit"><p class="ex-tag">Exhibit A · Market Index</p>${exhibitChart()}<p class="ex-cap">The market index went up 12% this year.</p><p class="ex-zh">大盤指數全年上漲 12%，六月曾短暫下跌。</p></div>
      <div class="exhibit"><p class="ex-tag">Exhibit B · LINE Message</p>
        <div class="chat"><p class="grp">飆股 VIP 群 · Hot Stock VIP (2,318)</p>
          <p class="bubble"><span class="who">金狐老師 Teacher Golden Fox</span>XYZ will TRIPLE by summer!!! Guaranteed. Zero risk. Only 3 seats left!!!<time>21:47</time></p>
          <p class="bubble me">All in!! 🚀<time>21:49</time></p></div>
        <p class="ex-zh">三月，群組「老師」的明牌與小陳的回覆。</p></div>
      <div class="exhibit"><p class="ex-tag">Exhibit C · Broker Statement · June</p>
        <div class="stmt"><div><span>Own money 自有資金</span><span>500,000</span></div><div><span>Margin loan 融資借款</span><span>750,000</span></div><div><span>Holdings 持股</span><span>XYZ 100%</span></div><div><span>XYZ change 股價變動</span><span>−35%</span></div><div class="alert"><span>Maintenance ratio 維持率</span><span>108% · MARGIN CALL</span></div></div>
        <p class="ex-zh">自有 50 萬＋借 75 萬＝ 125 萬全押一檔。跌 35% 後只剩 81.25 萬，扣掉借款，自己的錢剩 6.25 萬。</p></div>
      <div class="exhibit"><p class="ex-tag">Exhibit D · Trade Record</p>
        <div class="ticket"><span>June 17 · 09:01:03</span><span class="sell">SELL ALL · XYZ · market order</span><span>Price: lowest of the year</span><span class="note">Note: “I can't take it anymore!!”</span></div>
        <p class="ex-zh">追繳後隔天開盤，小陳以市價全部賣出。</p></div>
      <div class="exhibit wide"><p class="ex-tag">Exhibit E · Sister's Account</p>
        <div class="stmt"><div><span>Xiao Mei 小美 · Index ETF</span><span>5,000 every month, Jan–Dec</span></div><div><span>Put in 投入</span><span>60,000</span></div><div><span>Now 現值</span><span>64,500 (+7.5%)</span></div></div>
        <p class="ex-zh">妹妹小美全年定期定額同一檔指數 ETF，沒有停扣。</p></div>
    </div>
    <div class="nav-row"><span class="hint">讀完證物，下一步替六名嫌犯逐一定罪。</span><button type="button" class="btn btn-seal" data-act="fgoto" data-step="3">帶嫌犯上堂 →</button></div>`;
}
function stageAccuse(){
  const f = S.final, marks = f.marks || {}, judged = !!f.judged;
  const all = FINAL.suspects.every(s => marks[s.who]);
  const cards = FINAL.suspects.map(s => {
    const m = marks[s.who], right = judged && ((m === 'g') === s.guilty);
    return `<article class="suspect">
      <div class="face">${avatar(s.who)}</div>
      <h4>${s.name}<small>${s.zh}</small></h4>
      <p class="say">“${s.say}”</p><p class="say-zh" ${UI.zh?'':'hidden'}>${s.sayZh}</p>
      <div class="acts"><button type="button" class="icon-btn" data-act="speak" data-text="${esc(s.say)}">${SPK}聽供詞</button></div>
      ${judged ? `<span class="res-tag ${right?'ok':'no'}">${right ? '判對了' : '判錯了'} · 正解：${s.guilty ? '有罪 Guilty' : '無罪 Innocent'}</span>`
        : `<div class="verdict-toggle" role="group" aria-label="${s.zh}的判決"><button type="button" class="g ${m==='g'?'on':''}" data-act="mark" data-who="${s.who}" data-v="g">有罪 Guilty</button><button type="button" class="i ${m==='i'?'on':''}" data-act="mark" data-who="${s.who}" data-v="i">無罪 Innocent</button></div>`}
    </article>`;
  }).join('');
  return `<div class="stage-title"><h3>當堂定罪<small>Guilty or innocent?</small></h3><div class="tools">
      <label class="toggle"><input type="checkbox" id="zh-toggle" ${UI.zh?'checked':''}>中文提示</label></div></div>
    <div class="qcard"><span class="qtag">${judged ? '本案已宣判' : '每判對一名 +10，六名全對再 +20'}</span>
      <p class="qtext">Xiao Chen says, 'The stock market stole my money!' Is he right? Read every testimony, check the exhibits, and decide: guilty or innocent?</p>
      <p class="say-zh">小陳說「股市偷了我的錢」，他說得對嗎？逐一判定六名嫌犯有罪或無罪。</p></div>
    <div class="f-suspects suspects">${cards}</div>
    ${judged ? judgmentHTML(FINAL, f.accPts, 80, UI.justSolved === 'final') : ''}
    <div class="nav-row"><span class="hint">${judged ? '' : `已判定 ${Object.keys(marks).length} / 6`}</span>
      ${judged ? `<button type="button" class="btn btn-seal" data-act="fgoto" data-step="4">領取結案令 →</button>`
        : `<button type="button" class="btn btn-seal" data-act="judge-final" ${all?'':'disabled'}>拍下驚堂木，宣判！</button>`}</div>`;
}
function stageCert(){
  const sc = totalScore(), pct = sc/MAX_SCORE, R = RANKS.find(r => pct >= r.min);
  const d = new Date(), date = `${d.getFullYear()} 年 ${d.getMonth()+1} 月 ${d.getDate()} 日`;
  return `<div class="cert paper">
      <p class="eyebrow">Kaifeng Court · Certificate of Closure</p>
      <h3>結案令</h3>
      <p class="body">茲證明 捕快<b style="color:var(--seal)">「${esc(JB.store.S.player.name || '無名捕快')}」</b>偵破「人生資產」五大卷宗，緝拿投資五毒，並於終極大審明辨是非，特頒此令。</p>
      <div class="caught">${CASES.map(C => `<span title="${C.villainName}">${VILLAIN_SVG[C.villain]}</span>`).join('')}</div>
      <p class="rank">${R.zh}</p><p class="rank-en">${R.en}</p>
      <p class="score">功績 ${sc} / ${MAX_SCORE}　·　已學 ${unlockedTerms().length} 個股市英文關鍵字</p>
      <div class="sign"><span>${date}</span><span class="brand-seal">包</span><span>開封府尹 包拯</span></div>
    </div>
    <div class="nav-row"><a class="btn btn-ghost" href="#cases">回卷宗大堂</a>
      <span style="display:flex;gap:10px;flex-wrap:wrap"><button type="button" class="btn btn-gold" data-act="nb">複習偵探筆記</button><button type="button" class="btn btn-ink" data-act="reset">重新開始全案</button></span></div>`;
}
function renderFinal(){
  if(solvedCount() < 5){
    app.innerHTML = `<section class="wrap case-page"><a class="back" href="#cases">← 回到卷宗大堂</a>
      <div class="stage paper"><h3 style="font-family:var(--f-display);font-size:24px">終極大審尚未開庭</h3><p>先破完五大卷宗、集滿 5 枚令牌（目前 ${solvedCount()} / 5），包大人才會升堂。</p>
      <div class="nav-row"><a class="btn btn-seal" href="#cases">回大堂辦案</a></div></div></section>`;
    return;
  }
  const f = S.final; f.reached = f.reached || 1;
  let step = UI.fstep || f.reached; if(step > f.reached) step = f.reached; UI.fstep = step;
  const done = n => n < f.reached || (n === 4 && f.done);
  const body = step === 1 ? stageRoll() : step === 2 ? stageExhibits() : step === 3 ? stageAccuse() : stageCert();
  if(UI.justSolved === 'final' && step === 3) UI.justSolved = null;
  app.innerHTML = `<section class="wrap case-page">
    <a class="back" href="#cases">← 回到卷宗大堂</a>
    <header class="case-head paper">
      <div class="case-id"><span class="brand-seal" style="width:64px;height:64px;font-size:34px">審</span><div>
        <p class="eyebrow">Grand Trial · 終極大審</p><h2>${FINAL.titleZh}</h2><p class="en-title">${FINAL.title}</p>
        <p class="ask">包大人開堂！這次審的是——你的「人生資產案」</p></div></div>
      <div class="mentor-say"><div class="hexpic"><img src="${JB.face('bao','verdict')}" alt="包青天"></div>
        <blockquote><p class="q-en">“Bring in the suspects!”</p><p class="q-zh">帶嫌犯上堂！</p><cite>包青天 Justice Bao · 公平・正義・超前部署</cite></blockquote></div>
    </header>
    ${stepBar(FSTEPS, step, f.reached, done, 'fstep')}
    <div class="stage paper">${body}</div>
  </section>`;
}

/* ---------- overlays ---------- */
function openTerm(k){
  const t = TERMS[k]; if(!t) return;
  const el = $('termcard');
  el.innerHTML = `<div class="tc-top"><span class="tc-word">${k}<em>${t.pos}</em></span>
      <span style="display:flex;gap:6px"><button type="button" class="icon-btn" data-act="speak" data-text="${esc(k)}">${SPK}發音</button><button type="button" class="x-btn" data-act="term-close" aria-label="關閉">✕</button></span></div>
    <p class="tc-zh">${t.zh}</p><p class="tc-def">${t.def}</p><p class="tc-ex">${t.ex} <button type="button" class="icon-btn" style="margin-left:4px" data-act="speak" data-text="${esc(t.ex)}">${SPK}</button></p>`;
  el.hidden = false;
}
function openNotebook(){
  const p = $('nb-panel');
  p.innerHTML = `<div class="sheet-head"><h3>偵探筆記 <span style="font-family:var(--f-en);font-weight:400;font-size:15px;color:var(--ink-faint)">Detective's Notebook</span></h3>
      <button type="button" class="x-btn" data-act="nb-close" aria-label="關閉">✕</button></div>
    <p style="font-size:13.5px;color:var(--ink-soft)">已解鎖 ${unlockedTerms().length} / 30 個關鍵字。打開卷宗就會解鎖該案的六個字。</p>
    ${CASES.map(C => {
      const open = cs(C.id).reached >= 1;
      return `<section class="nb-group"><h4><img src="${C.icon}" alt="">卷${ZH[C.id]} · ${C.pillar}</h4>
        ${open ? C.terms.map(k => `<div class="nb-item"><b>${k}<em>${TERMS[k].pos}</em></b>
            <button type="button" class="icon-btn" data-act="speak" data-text="${esc(k)}" aria-label="播放 ${esc(k)} 發音">${SPK}</button>
            <span class="zh">${TERMS[k].zh}</span><span></span><p class="def">${TERMS[k].def}</p></div>`).join('')
          : `<p class="nb-locked">🔒 打開「${C.titleZh}」後解鎖</p>`}</section>`;
    }).join('')}`;
  $('notebook').hidden = false;
}
function confirmReset(){
  $('cf-modal').innerHTML = `<div class="paper" role="dialog" aria-modal="true" aria-labelledby="m-title">
      <h3 id="m-title" style="font-family:var(--f-display);font-size:20px">確定重新開始全案？</h3>
      <p style="color:var(--ink-soft)">所有卷宗進度、功績與結案令都會清除，無法復原。</p>
      <div class="row"><button type="button" class="btn btn-ghost" data-act="modal-close">取消</button><button type="button" class="btn btn-seal" data-act="reset-yes">清除並重來</button></div></div>`;
  $('cf-modal').hidden = false;
}

/* ---------- actions ---------- */
document.addEventListener('click', e => {
  if(!e.target.closest('.cf')) return; sync();
  const t = e.target.closest('[data-act]'); if(!t) return;
  const act = t.dataset.act, id = hashCase();
  const C = id ? CASES[id-1] : null, c = id ? cs(id) : null;
  switch(act){
    case 'term': openTerm(t.dataset.term); break;
    case 'term-close': $('termcard').hidden = true; break;
    case 'speak': speak(t.dataset.text); break;
    case 'speak-story': speak(C.story.map(p => plain(p.en)).join(' ')); break;
    case 'speak-final': speak(FINAL.story.map(p => p.en).join(' ')); break;
    case 'step': UI.step[id] = +t.dataset.step; renderCase(id); toSteps(); break;
    case 'goto': {
      const s = +t.dataset.step;
      if(s === 3 && !c.lab.done) return;
      if(s === 4 && c.q.filter(Boolean).length < 3) return;
      c.reached = Math.max(c.reached, s); UI.step[id] = s; save(); renderCase(id); toSteps(); break;
    }
    case 'ch': {
      if(c.lab.done) return;
      const i = +t.dataset.i; c.lab.ans = i; c.lab.done = true; c.lab.pts = i === C.lab.ch.a ? 10 : 0; save(); rerender(); break;
    }
    case 'q': {
      const qi = +t.dataset.q, i = +t.dataset.i; if(c.q[qi]) return;
      c.q[qi] = {sel:i, ok: i === C.qs[qi].a}; save(); rerender(); break;
    }
    case 'accuse': {
      if(c.v.solved) return;
      const who = t.dataset.who;
      if(who === C.verdict.culprit){ c.v.solved = true; c.v.pts = [30,15,5][Math.min(2, c.v.wrong.length)]; UI.justSolved = id; JB.audio.sfx('gavel'); JB.ui.flash('gold'); JB.store.log('seal', `進階卷宗「${C.titleZh}」結案：${C.villainName}`); }
      else if(!c.v.wrong.includes(who)){ c.v.wrong.push(who); JB.audio.sfx('bad'); }
      save(); rerender(); break;
    }
    case 'habit': {
      const h = +t.dataset.h, keep = t.dataset.v === 'keep';
      c.lab.sorted = c.lab.sorted || {}; c.lab.mistakes = c.lab.mistakes || 0;
      if(C.habits[h].keep === keep){ c.lab.sorted[h] = true; UI.lastWrong = null; }
      else { c.lab.mistakes++; UI.lastWrong = h; }
      if(Object.keys(c.lab.sorted).length === 8 && !c.lab.done){ c.lab.done = true; c.lab.pts = c.lab.mistakes === 0 ? 10 : 5; }
      save(); rerender(); break;
    }
    case 'lev': UI.lab.d.lev = +t.dataset.l; document.querySelectorAll('[data-act="lev"]').forEach(b => b.classList.toggle('on', b === t)); updateLab('drawdown'); break;
    case 'preset-goal': { const [p,m,tt,n] = t.dataset.p.split(',').map(Number); $('g-p').value = p; $('g-m').value = m; $('g-t').value = tt; $('g-n').value = n; updateLab('goal'); break; }
    case 'preset-port': { const [s,e2,r,b] = t.dataset.p.split(',').map(Number); $('p-s').value = s; $('p-e').value = e2; $('p-r').value = r; $('p-b').value = b; updateLab('portfolio'); break; }
    case 'nb': openNotebook(); break;
    case 'nb-close': $('notebook').hidden = true; break;
    case 'reset': confirmReset(); break;
    case 'modal-close': $('cf-modal').hidden = true; break;
    case 'reset-yes': JB.store.S.cf = fresh(); sync(); UI.step = {}; UI.fstep = null; UI.match = null; JB.store.log('refresh','清除進階卷宗進度'); save(); $('cf-modal').hidden = true; JB.app.go('#cases'); JB.app.route(); window.scrollTo(0,0); break;
    case 'fstep': UI.fstep = +t.dataset.step; renderFinal(); toSteps(); break;
    case 'fgoto': { const s = +t.dataset.step; S.final.reached = Math.max(S.final.reached||1, s); if(s === 4) S.final.done = true; UI.fstep = s; save(); renderFinal(); toSteps(); break; }
    case 'm-new': UI.match = null; rerender(); break;
    case 'm': {
      const M = UI.match, side = t.dataset.side, k = t.dataset.k;
      M.bad = null; M.sel[side] = k;
      if(M.sel.en && M.sel.zh){
        if(M.sel.en === M.sel.zh){ M.done.push(k); }
        else { M.wrongs++; M.bad = {en:M.sel.en, zh:M.sel.zh}; }
        M.sel = {};
        if(M.done.length === 6 && !S.final.rollDone){ S.final.rollDone = true; S.final.rollPts = Math.max(10, 30 - 2*M.wrongs); S.final.reached = Math.max(S.final.reached||1, 2); save(); }
      }
      rerender(); break;
    }
    case 'mark': { if(S.final.judged) return; S.final.marks = S.final.marks || {}; S.final.marks[t.dataset.who] = t.dataset.v; save(); rerender(); break; }
    case 'judge-final': {
      const f = S.final; let n = 0;
      FINAL.suspects.forEach(s => { if((f.marks[s.who] === 'g') === s.guilty) n++; });
      f.judged = true; f.accPts = n*10 + (n === 6 ? 20 : 0); f.reached = Math.max(f.reached, 4); UI.justSolved = 'final';
      save(); rerender(); break;
    }
  }
});
document.addEventListener('change', e => {
  if(e.target.id === 'zh-toggle' && e.target.closest('.cf')){ UI.zh = e.target.checked; document.querySelectorAll('.story .zh, .suspect .say-zh').forEach(p => { p.hidden = !UI.zh; }); }
});
document.addEventListener('input', e => { if(e.target.dataset.lab){ const t = {c:'compound',d:'drawdown',g:'goal',p:'portfolio'}[e.target.id[0]]; if(t) updateLab(t); } });
document.addEventListener('keydown', e => { if(e.key === 'Escape'){ $('termcard').hidden = true; $('notebook').hidden = true; $('cf-modal').hidden = true; } });
$('notebook').addEventListener('click', e => { if(e.target.id === 'notebook') $('notebook').hidden = true; });

/* ---------- exports for the integrated game ---------- */
function render(el, p){
  sync(); const box = document.createElement('div'); box.className = 'cf'; el.appendChild(box); app = box;
  const m = p && p.match(/^case-([1-5])$/);
  if(m) renderCase(+m[1]); else if(p === 'grand-trial') renderFinal(); else renderHome();
}
function renderTool(el, type){
  sync(); const i = {compound:0, drawdown:1, goal:2, portfolio:3}[type]; const C = CASES[i];
  el.innerHTML = `<div class="cf"><div class="stage paper"><div class="stage-title"><h3>${C.lab.title}<small>${C.lab.titleEn}</small></h3></div><p class="lab-intro">${C.lab.intro}</p>${LABS[type](C)}
    <p class="lab-intro" style="font-size:13px">這個工具來自進階卷宗「${C.titleZh}」。所有數字皆為教學示意。</p></div></div>`;
  updateLab(type);
}
JB.CF = {
  render, renderTool,
  totalScore(){ sync(); return totalScore(); },
  guardian(){ sync(); const c = S.cases[2]; return !!(c && c.v && c.v.solved && (!c.v.wrong || c.v.wrong.length === 0)); },
  allDone(){ sync(); return solvedCount() === 5 && !!S.final.judged; },
  terms(){ sync(); return unlockedTerms().map(k => ({word:k, kk:'', zh:TERMS[k].zh, def:TERMS[k].def})); },
  avatar(who){ return VILLAIN_SVG[who] || ''; },
  reset(){ JB.store.S.cf = fresh(); sync(); UI.step = {}; UI.fstep = null; UI.match = null; }
};

})();
