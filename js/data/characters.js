/* Character System — 4 main characters, 8 expressions each, mapped to the official sprite sheets */
JB.CHARACTERS = {
  bao: {
    id:'bao', name:'包青天', en:'Justice Bao', title:'主審大人', titleEn:'Chief Judge',
    role:'主審大人・任務發布者・最終裁決者', personality:['威嚴','公正','睿智'],
    duties:['發布案件','說明遊戲規則','提出關鍵問題','評估玩家表現','最終判決'],
    story:'開封府尹，鐵面無私。這一回，他把驚堂木拍向現代市場：投資新手阿明的資產離奇縮水，是市場的錯，還是判斷的錯？包大人要每位見習偵探拿出證據，而不是傳言。',
    quote:{en:'Bring me evidence, not rumors.', zh:'本府要的是證據，不是傳言。'},
    color:'#1b1f2a', default:'neutral',
    expressions:[
      {key:'neutral',zh:'標準',en:'Neutral'},{key:'explain',zh:'講解',en:'Explain'},
      {key:'thinking',zh:'思考',en:'Thinking'},{key:'surprised',zh:'驚訝',en:'Surprised'},
      {key:'scold',zh:'責備',en:'Scold'},{key:'strict',zh:'嚴厲',en:'Strict'},
      {key:'verdict',zh:'判決',en:'Verdict'},{key:'victory',zh:'勝利',en:'Victory'}]
  },
  gongsun: {
    id:'gongsun', name:'公孫策', en:'Gongsun Ce', title:'金融顧問', titleEn:'Financial Adviser',
    role:'金融顧問・知識解說者・策略分析師', personality:['冷靜','聰明','善於分析'],
    duties:['英文單字教學','金融知識解說','投資策略分析','學習提示','提供解題建議'],
    story:'開封府主簿，讀遍古籍也讀遍財報。他相信每個數字背後都有一個故事。在金融知識書齋裡，他會一張卡一張卡地帶你讀懂市場的語言。',
    quote:{en:'Numbers don\'t lie. Feelings often do.', zh:'數字不會說謊，情緒常常會。'},
    color:'#2b3f7a', default:'neutral',
    expressions:[
      {key:'neutral',zh:'標準',en:'Neutral'},{key:'explain',zh:'講解',en:'Explain'},
      {key:'reading',zh:'閱讀',en:'Reading'},{key:'thinking',zh:'思考',en:'Thinking'},
      {key:'smile',zh:'微笑',en:'Smile'},{key:'surprised',zh:'驚訝',en:'Surprised'},
      {key:'analyze',zh:'分析',en:'Analyze'},{key:'approve',zh:'肯定',en:'Approve'}]
  },
  zhan: {
    id:'zhan', name:'展昭', en:'Zhan Zhao', title:'市場調查員', titleEn:'Market Investigator',
    role:'市場調查員・風險守護者・線索追查者', personality:['敏捷','勇敢','細心'],
    duties:['搜尋市場線索','分析圖表','發現風險','提醒玩家注意陷阱','協助解決調查任務'],
    story:'御前帶刀護衛，身手矯捷。如今他巡的不是屋頂，而是 K 線與新聞。哪裡藏著陷阱、哪則消息不對勁，他總是第一個察覺。',
    quote:{en:'Decide your exit before you enter.', zh:'進場之前，先想好怎麼出場。'},
    color:'#24356e', default:'neutral',
    expressions:[
      {key:'neutral',zh:'標準',en:'Neutral'},{key:'scout',zh:'巡查',en:'Scout'},
      {key:'observe',zh:'觀察',en:'Observe'},{key:'alert',zh:'警戒',en:'Alert'},
      {key:'smile',zh:'微笑',en:'Smile'},{key:'surprised',zh:'驚訝',en:'Surprised'},
      {key:'attack',zh:'出擊',en:'Attack'},{key:'victory',zh:'勝利',en:'Victory'}]
  },
  wang: {
    id:'wang', name:'王朝', en:'Wang Chao', title:'執行調查', titleEn:'Field Coordinator',
    role:'執行調查・資料蒐集者・任務協調者', personality:['熱情','忠誠','活潑'],
    duties:['提供任務說明','整理玩家資料','回報任務進度','提供遊戲提示','慶祝玩家完成任務'],
    story:'開封府校尉，背著卷宗跑遍全城。他把每條線索整理成冊、回報每一關的進度。你每破一關，他總是第一個跳起來歡呼。',
    quote:{en:'Leave it to me! I\'ll file every clue.', zh:'交給我！每條線索我都會歸檔。'},
    color:'#2a3a78', default:'neutral',
    expressions:[
      {key:'neutral',zh:'標準',en:'Neutral'},{key:'report',zh:'報告',en:'Report'},
      {key:'organize',zh:'整理',en:'Organize'},{key:'think',zh:'思考',en:'Think'},
      {key:'happy',zh:'開心',en:'Happy'},{key:'surprised',zh:'驚訝',en:'Surprised'},
      {key:'cheer',zh:'加油',en:'Cheer'},{key:'completed',zh:'完成',en:'Completed'}]
  }
};
JB.CHAR_ORDER = ['gongsun','bao','zhan','wang'];
JB.face = function(id, expr){
  const c = JB.ASSETS.characters[id];
  return JB.asset(c.expressions[expr] || c.expressions.neutral);
};
JB.body = function(id){ return JB.asset(JB.ASSETS.characters[id].full); };
