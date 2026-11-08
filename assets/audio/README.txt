背景音樂 BGM
- bgm-bianjing-moonlight.mp3：〈汴京月夜清輝〉，由使用者提供的原始音檔轉成網頁循環版
  （去除頭尾靜音、1.5 秒淡入、6 秒淡出、響度標準化至 −19 LUFS、MP3 112 kbps、44.1 kHz）。
  路徑登記在 js/data/assets.js 的 JB.ASSETS.audio，播放邏輯在 js/core/audio.js。

音效 SFX
- 點擊、翻卡、答對、答錯、得分、解鎖、成就、驚堂木，皆由 Web Audio API 即時合成，不需音檔。
- 英文發音使用瀏覽器內建語音（speechSynthesis），朗讀時背景音樂會自動降低音量。
