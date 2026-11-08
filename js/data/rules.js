/* Game rules: missions, scoring constants, dimensions, levels, ranks, achievements */
JB.MISSIONS = [
  {id:'m1', n:1, zh:'案件與詞彙', en:'Case & Vocabulary', img:'ui/mission1.webp', host:'bao', desc:'讀懂阿明的案情，學會 12 個股市英文單字', needs:'academy'},
  {id:'m2', n:2, zh:'配對特訓', en:'Matching Challenge', img:'ui/mission2.webp', host:'wang', desc:'英文 × 中文配對，兩回合計時挑戰', needs:'m1'},
  {id:'m3', n:3, zh:'訊問與線索', en:'Clues & Investigation', img:'ui/mission3.webp', host:'zhan', desc:'8 條市場線索，閱讀英文、抽絲剝繭', needs:'m2'},
  {id:'m4', n:4, zh:'斷案宣判', en:'Final Verdict', img:'ui/mission4.webp', host:'bao', desc:'開封府公堂，對人生資產懸案做出判決', needs:'m3'}
];
JB.UNLOCK_NAME = {academy:'金融知識書齋', m1:'任務一：案件與詞彙', m2:'任務二：配對特訓', m3:'任務三：訊問與線索', m4:'任務四：斷案宣判'};
JB.PTS = {academyCard:5, academyQ:15, vocabCard:5, spotQ:10, pair:10, pairStreak:5, pairWrong:2, clue:15, clueStreak:5, trialQ:30, decision:[60,30,10]};
JB.MAX_MAIN = 9*5 + 3*15 + 12*5 + 4*10 + 2*(6*10 + 4*5 + 10) + 8*15 + 6*5 + 4*30 + 60; // 700
JB.DIMS = [
  {k:'FK', zh:'金融知識', en:'Financial Knowledge'},
  {k:'EN', zh:'英文理解', en:'English Comprehension'},
  {k:'LR', zh:'邏輯推理', en:'Logical Reasoning'},
  {k:'RA', zh:'風險意識', en:'Risk Awareness'},
  {k:'DM', zh:'決策判斷', en:'Decision Making'}
];
JB.LEVELS = [
  {min:0, zh:'見習偵探', en:'Rookie Detective'},
  {min:150, zh:'初級偵探', en:'Junior Detective'},
  {min:350, zh:'金融分析師', en:'Financial Analyst'},
  {min:550, zh:'投資策略師', en:'Investment Strategist'},
  {min:680, zh:'資本市場大師', en:'Capital Market Master'}
];
JB.RANKS = [
  {min:85, key:'excellent', zh:'金牌金融偵探', en:'Excellent', face:'victory',
   say:'鐵證如山，推理縝密！你看懂數字、識破明牌、守住風險，本府賜你金牌。'},
  {min:70, key:'good', zh:'優秀見習偵探', en:'Good', face:'explain',
   say:'判斷大致正確，證據也站得住。再把弱項補強，便能獨當一面。'},
  {min:50, key:'average', zh:'繼續修習', en:'Average', face:'thinking',
   say:'方向對了，但仍有漏洞。回書齋溫習，再來大堂見本府。'},
  {min:0, key:'retry', zh:'重新調查', en:'Needs Improvement', face:'strict',
   say:'證據不足，不能結案！重新調查，從名詞與數字一步步來。'}
];
JB.ACHIEVEMENTS = [
  {id:'vocab', zh:'詞彙大師', en:'Vocabulary Master', icon:'book', desc:'學完書齋 9 詞與任務一 12 詞，且王朝抽考答對 3 題以上'},
  {id:'detective', zh:'金融偵探', en:'Financial Detective', icon:'puzzle', desc:'完成配對特訓，兩回合合計錯誤不超過 2 次'},
  {id:'investigator', zh:'調查專家', en:'Investigation Expert', icon:'magnifier', desc:'任務三的 8 條線索中，第一次作答就答對 7 條以上'},
  {id:'guardian', zh:'風險守護者', en:'Risk Guardian', icon:'shield', desc:'在大堂上找出全部風險警訊，或第一次指認就破了「大浪之夜」卷宗'},
  {id:'champion', zh:'正義冠軍', en:'Justice Champion', icon:'gavel', desc:'最終判決獲得「金牌金融偵探」等級'},
  {id:'casemaster', zh:'開封名捕', en:'Case File Master', icon:'seal', desc:'偵破 5 件進階卷宗，並完成終極大審'}
];
