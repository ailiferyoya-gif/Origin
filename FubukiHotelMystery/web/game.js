const qs = (id) => document.getElementById(id);

let audioCtx = null;
let storyIndex = 0;
let pendingZoomSpot = null;

const storySlides = [
  {
    title: "封筒",
    text: "その封筒は、雪で白く濡れていた。差出人の名前は鳥居真琴。中には古い真鍮鍵、焦げたメニューカードの切れ端、そして短い便箋が一枚だけ入っていた。"
  },
  {
    title: "午前零時の客",
    text: "便箋には、かすれた筆跡でこう書かれていた。「午前零時の客を外へ出さないでください」。冗談にしては、紙から立ちのぼる煤の匂いが生々しすぎた。"
  },
  {
    title: "閉ざされたホテル",
    text: "奥白岳の吹雪ホテルは、大雪で送迎道路を失っている。停電の直後、宿泊客の蓮見岬が姿を消した。玄関前の雪は崩れておらず、外へ出た足跡はない。"
  },
  {
    title: "依頼",
    text: "蓮見と古い縁を持つ人物は、あなたに館内で起きたことを確かめてほしいと頼んだ。鍵の行方、時刻のずれ、暖炉の灰。ばらばらの痕跡は、同じ夜へ向いている。"
  },
  {
    title: "入館",
    text: "ホテルの扉は重く、内側から冷気を吐いた。ここから先は、見えるものを調べ、持ち物を集め、人物に話しかけ、必要なら証拠を見せる。閉ざされた夜を、あなたの手でほどいていく。"
  }
];

function ensureAudio() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === "suspended") audioCtx.resume();
}

function playSound(kind = "click") {
  if (!audioCtx) return;
  const now = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  const map = {
    click: [420, 0.035, 0.018],
    page: [280, 0.09, 0.028],
    move: [190, 0.13, 0.035],
    item: [660, 0.16, 0.04],
    talk: [330, 0.08, 0.026],
    lock: [120, 0.12, 0.038],
    solve: [740, 0.22, 0.05],
    bad: [90, 0.18, 0.045]
  };
  const [freq, dur, vol] = map[kind] || map.click;
  osc.type = kind === "bad" || kind === "lock" ? "sawtooth" : "sine";
  osc.frequency.setValueAtTime(freq, now);
  if (kind === "item" || kind === "solve") osc.frequency.exponentialRampToValueAtTime(freq * 1.45, now + dur);
  gain.gain.setValueAtTime(vol, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);
  osc.connect(gain).connect(audioCtx.destination);
  osc.start(now);
  osc.stop(now + dur);
}

function renderStory() {
  const slide = storySlides[storyIndex];
  qs("storyTitle").textContent = slide.title;
  qs("storyText").textContent = slide.text;
  qs("storyCount").textContent = `${storyIndex + 1} / ${storySlides.length}`;
  qs("storyNext").textContent = storyIndex === storySlides.length - 1 ? "ホテルへ入る" : "次へ";
}

function enterGame() {
  qs("storyModal").classList.add("hidden");
  state.started = true;
  save();
  render();
  addLog("吹雪ホテルに入った。");
  playSound("move");
}

const itemNames = {
  envelope: "鳥居からの封筒",
  menu: "焦げたメニューカード",
  pass: "管理室パス",
  clipping: "古い新聞切り抜き",
  ticket: "ルームサービス伝票",
  footprint: "濡れた足跡の写真",
  clockMemo: "西階段の時計メモ",
  brassKey: "307の真鍮鍵",
  ledger: "蓮見の宿泊台帳",
  coat: "黒いコートの繊維",
  photo: "十年前の集合写真",
  fuse: "ヒューズレバー",
  lantern: "煤けたランタン",
  snow: "外扉の雪跡",
  bellCode: "呼び鈴の順番",
  wineLabel: "破れたワインラベル",
  dessertPlate: "欠けた銀皿",
  orderSlip: "厨房の控え伝票",
  freezerKey: "冷凍庫の鍵",
  spiceNote: "香辛料の走り書き",
  terminalMemo: "端末メモ",
  roomList: "旧館の客室割",
  masterKey: "旧館マスターキー",
  guestBook: "書斎の宿泊者名簿",
  chessPiece: "白いナイトの駒",
  tornPage: "破られた日誌",
  wetTowel: "濡れたタオル",
  staffRoute: "従業員通路図",
  bootMark: "長靴の泥跡",
  oldRegister: "十年前の宿帳",
  cableMap: "発電系統図",
  metalTag: "307の金属札"
};

const itemDetails = {
  envelope: "封筒の中には仮パスワード SNOW0314、古い鍵の所在、そして鳥居の筆跡が残る。まず管理室と307の意味を追う必要がある。",
  menu: "焦げ跡の端に、午前零時、献立、戻すな、という語が残る。暖炉は証拠を消す場所として使われた。",
  pass: "管理室パス。ロビーのフロントで赤い非常灯に照らされていた。管理室の端末と鍵棚を調べられる。",
  clipping: "十年前の転落事故の記事。西階段、蓮見岬、改装前、という語がつながる。呼び鈴の順番にも小さな数字が書き込まれている。",
  ticket: "ルームサービス伝票。暖炉へのメニューカード、発電室へのランタン配送が時刻順に並ぶ。厨房側の扉を考える手がかりになる。",
  footprint: "足跡は西階段から外へ向かっていない。乾燥室から従業員通路へ向かう向きだ。夜勤係に見せる価値がある。",
  clockMemo: "西階段の時計裏に貼られていたメモ。十二分戻す、とだけ書かれている。時刻のすり替えを示す中心証拠。",
  brassKey: "307の札が付いた古い真鍮鍵。現在の客室番号とは一致しない。307は部屋ではなく別の番号かもしれない。",
  ledger: "301号室の台帳。鳥居は201、蓮見は301。手書きで足された時刻だけ筆圧が違う。",
  coat: "黒いコートの繊維。301号室のクローゼットと鳥居の襟をつなぐ物証。鳥居に見せると反応が変わる。",
  photo: "十年前の集合写真。西階段の先が外扉ではなく従業員通路だったことを示している。蓮見に見せたい。",
  fuse: "乾燥室の小配電箱に残っていたヒューズレバー。発電室の配電盤で使う。",
  lantern: "煤けたランタン。伝票の00:12配送と一致する。発電室の外扉を詳しく見る明かりになる。",
  snow: "外扉の雪跡。崩れているのは内側だけで、外へ出た跡はない。",
  bellCode: "呼び鈴の三、二、一の音。書斎ラウンジの三段金具に使えそうだ。",
  wineLabel: "破れたワインラベル。307の札と同じ傷跡があり、鍵束が食堂に持ち込まれたことを示す。",
  dessertPlate: "欠けた銀皿。西階段の手すり傷と高さが合う。事故の再現に使われた可能性がある。",
  orderSlip: "厨房の控え伝票。鳥居がメニューカードを受け取った印がある。",
  freezerKey: "冷凍庫下に落ちていた小鍵。地下資料庫の古い棚に使われていたもの。",
  spiceNote: "赤、白、黒、白、赤の順番。発電室の配電盤の色札と対応する。",
  terminalMemo: "管理室端末の履歴。停電八分前に客室割が更新されている。",
  roomList: "旧館の客室割。307は今夜の部屋ではなく、保管箱番号だと分かる。",
  masterKey: "旧館マスターキー。301号室と地下資料庫を開けられる。",
  guestBook: "書斎の宿泊者名簿。蓮見と鳥居が十年前から関係していたことを示す。",
  chessPiece: "白いナイトの駒。逆さに置かれていた。呼び鈴の順番で隠し棚を開けた証拠。",
  tornPage: "破られた日誌。西階段の時計を手動で戻せると書かれている。",
  wetTowel: "濡れたタオル。暖炉の灰が付着しており、灰を乾燥室まで運んだ痕跡になる。",
  staffRoute: "従業員通路図。乾燥室から発電室へ抜けるルートが記されている。",
  bootMark: "長靴の泥跡。宿泊客用スリッパでは残らない。鳥居が借りた長靴とつながる。",
  oldRegister: "十年前の宿帳。蓮見が鳥居をかばった記録があり、今夜の動機に関わる。",
  cableMap: "発電系統図。乾燥室と発電室の非常灯だけを残せる切替手順がある。",
  metalTag: "307の金属札。部屋番号ではなく、十年前の保管箱番号だった。"
};

const zoomDetails = {
  deskLock: {
    img: "./assets/zoom-desk-lock.png",
    title: "フロント引き出しの鍵穴",
    text: "真鍮の鍵穴の周囲だけ霜が薄い。誰かが停電後に一度ここを開けている。封筒にあった仮パスワードを使えば、奥の引き出しが動きそうだ。",
    prompt: "封筒に書かれていた仮パスワードを入力",
    answers: ["snow0314"],
    success: "小さなラッチが外れ、引き出しの底から管理室パスが出てきた。"
  },
  keyCabinet: {
    img: "./assets/zoom-key-cabinet.png",
    title: "管理室の鍵棚",
    text: "鍵棚の奥に、ほこりの形だけが残っている空きフックがある。客室割と照合すると、蓮見の部屋に関係する番号だけが不自然に触られている。",
    prompt: "客室割から、調べるべき部屋番号を入力",
    answers: ["301"],
    success: "301の列の奥に隠れていた旧館マスターキーを見つけた。"
  },
  chessCompartment: {
    img: "./assets/zoom-chess-compartment.png",
    title: "チェス盤の隠し棚",
    text: "白いナイトだけが逆さに置かれ、盤の下に細い隙間がある。ロビーの呼び鈴で聞いた三つの音を、同じ順で棚に伝えれば開きそうだ。",
    prompt: "呼び鈴の順番を数字で入力",
    answers: ["321", "3-2-1", "３２１"],
    success: "棚板が少し沈み、白いナイトの駒だけが外れた。"
  },
  freezerBase: {
    img: "./assets/zoom-freezer-key.png",
    title: "冷凍庫の足元",
    text: "凍った水滴の下に小鍵が半分だけ埋もれている。控え伝票の時刻と足跡が重なる場所だ。誰かが厨房で鍵を落とし、急いで戻ったらしい。",
    success: "氷を割ると、地下資料庫の棚に使われていた古い小鍵が取れた。"
  },
  archiveBox: {
    img: "./assets/zoom-archive-box.png",
    title: "地下資料庫の保管箱",
    text: "古い宿帳の欄外に、部屋番号ではない保管箱番号が残っている。今夜の客室では空白だった番号だけが、十年前の記録では意味を持っている。",
    prompt: "保管箱に対応する番号を入力",
    answers: ["307"],
    success: "箱の奥から、307と刻まれた金属札が見つかった。"
  },
  generatorPanel: {
    img: "./assets/zoom-generator-panel.png",
    title: "発電室の配電盤",
    text: "五つの色札が外れかけている。厨房の香辛料棚と地下資料庫の系統図を合わせると、左から順に戻す色が分かる。",
    prompt: "左から順に色を入力",
    answers: ["赤白黒白赤", "赤,白,黒,白,赤", "赤 白 黒 白 赤", "redwhiteblackwhitered"],
    success: "色札を戻すと非常灯が安定し、外扉の足元を照らせるようになった。"
  },
  exteriorGateView: {
    img: "./assets/zoom-exterior-gate.png",
    title: "\u96ea\u306e\u9580\u3092\u8abf\u3079\u308b",
    text: "\u8fd1\u3065\u3044\u3066\u72b6\u614b\u3092\u78ba\u304b\u3081\u308b\u3002\u8868\u9762\u306e\u50b7\u3001\u6e7f\u308a\u3001\u7164\u3001\u7d19\u7247\u3001\u91d1\u5177\u306e\u5411\u304d\u304c\u3001\u9928\u5185\u3067\u8d77\u304d\u305f\u79fb\u52d5\u3084\u96a0\u3055\u308c\u305f\u624b\u9806\u3092\u793a\u3057\u3066\u3044\u308b\u3002",
    success: "\u96ea\u306e\u9580\u3092\u78ba\u8a8d\u3057\u305f\u3002\u307b\u304b\u306e\u8a3c\u8a00\u3084\u624b\u5143\u306e\u54c1\u3068\u5408\u308f\u305b\u308c\u3070\u3001\u591c\u306e\u6d41\u308c\u304c\u5c11\u3057\u305a\u3064\u3064\u306a\u304c\u308a\u305d\u3046\u3060\u3002"
  },
  exteriorWindowView: {
    img: "./assets/zoom-exterior-window.png",
    title: "\u4e8c\u968e\u306e\u660e\u304b\u308a\u3092\u8abf\u3079\u308b",
    text: "\u8fd1\u3065\u3044\u3066\u72b6\u614b\u3092\u78ba\u304b\u3081\u308b\u3002\u8868\u9762\u306e\u50b7\u3001\u6e7f\u308a\u3001\u7164\u3001\u7d19\u7247\u3001\u91d1\u5177\u306e\u5411\u304d\u304c\u3001\u9928\u5185\u3067\u8d77\u304d\u305f\u79fb\u52d5\u3084\u96a0\u3055\u308c\u305f\u624b\u9806\u3092\u793a\u3057\u3066\u3044\u308b\u3002",
    success: "\u4e8c\u968e\u306e\u660e\u304b\u308a\u3092\u78ba\u8a8d\u3057\u305f\u3002\u307b\u304b\u306e\u8a3c\u8a00\u3084\u624b\u5143\u306e\u54c1\u3068\u5408\u308f\u305b\u308c\u3070\u3001\u591c\u306e\u6d41\u308c\u304c\u5c11\u3057\u305a\u3064\u3064\u306a\u304c\u308a\u305d\u3046\u3060\u3002"
  },
  exteriorSnowbankView: {
    img: "./assets/zoom-exterior-snowbank.png",
    title: "\u96ea\u3060\u307e\u308a\u3092\u8abf\u3079\u308b",
    text: "\u8fd1\u3065\u3044\u3066\u72b6\u614b\u3092\u78ba\u304b\u3081\u308b\u3002\u8868\u9762\u306e\u50b7\u3001\u6e7f\u308a\u3001\u7164\u3001\u7d19\u7247\u3001\u91d1\u5177\u306e\u5411\u304d\u304c\u3001\u9928\u5185\u3067\u8d77\u304d\u305f\u79fb\u52d5\u3084\u96a0\u3055\u308c\u305f\u624b\u9806\u3092\u793a\u3057\u3066\u3044\u308b\u3002",
    success: "\u96ea\u3060\u307e\u308a\u3092\u78ba\u8a8d\u3057\u305f\u3002\u307b\u304b\u306e\u8a3c\u8a00\u3084\u624b\u5143\u306e\u54c1\u3068\u5408\u308f\u305b\u308c\u3070\u3001\u591c\u306e\u6d41\u308c\u304c\u5c11\u3057\u305a\u3064\u3064\u306a\u304c\u308a\u305d\u3046\u3060\u3002"
  },
  lobbyEnvelopeView: {
    img: "./assets/zoom-lobby-envelope.png",
    title: "\u5c01\u7b52\u3092\u8abf\u3079\u308b",
    text: "\u8fd1\u3065\u3044\u3066\u72b6\u614b\u3092\u78ba\u304b\u3081\u308b\u3002\u8868\u9762\u306e\u50b7\u3001\u6e7f\u308a\u3001\u7164\u3001\u7d19\u7247\u3001\u91d1\u5177\u306e\u5411\u304d\u304c\u3001\u9928\u5185\u3067\u8d77\u304d\u305f\u79fb\u52d5\u3084\u96a0\u3055\u308c\u305f\u624b\u9806\u3092\u793a\u3057\u3066\u3044\u308b\u3002",
    success: "\u5c01\u7b52\u3092\u78ba\u8a8d\u3057\u305f\u3002\u307b\u304b\u306e\u8a3c\u8a00\u3084\u624b\u5143\u306e\u54c1\u3068\u5408\u308f\u305b\u308c\u3070\u3001\u591c\u306e\u6d41\u308c\u304c\u5c11\u3057\u305a\u3064\u3064\u306a\u304c\u308a\u305d\u3046\u3060\u3002"
  },
  lobbyFireplaceView: {
    img: "./assets/zoom-lobby-fireplace.png",
    title: "\u6696\u7089\u3092\u8abf\u3079\u308b",
    text: "\u8fd1\u3065\u3044\u3066\u72b6\u614b\u3092\u78ba\u304b\u3081\u308b\u3002\u8868\u9762\u306e\u50b7\u3001\u6e7f\u308a\u3001\u7164\u3001\u7d19\u7247\u3001\u91d1\u5177\u306e\u5411\u304d\u304c\u3001\u9928\u5185\u3067\u8d77\u304d\u305f\u79fb\u52d5\u3084\u96a0\u3055\u308c\u305f\u624b\u9806\u3092\u793a\u3057\u3066\u3044\u308b\u3002",
    success: "\u6696\u7089\u3092\u78ba\u8a8d\u3057\u305f\u3002\u307b\u304b\u306e\u8a3c\u8a00\u3084\u624b\u5143\u306e\u54c1\u3068\u5408\u308f\u305b\u308c\u3070\u3001\u591c\u306e\u6d41\u308c\u304c\u5c11\u3057\u305a\u3064\u3064\u306a\u304c\u308a\u305d\u3046\u3060\u3002"
  },
  lobbyNoticeView: {
    img: "./assets/zoom-lobby-notice.png",
    title: "\u63b2\u793a\u677f\u3092\u8abf\u3079\u308b",
    text: "\u8fd1\u3065\u3044\u3066\u72b6\u614b\u3092\u78ba\u304b\u3081\u308b\u3002\u8868\u9762\u306e\u50b7\u3001\u6e7f\u308a\u3001\u7164\u3001\u7d19\u7247\u3001\u91d1\u5177\u306e\u5411\u304d\u304c\u3001\u9928\u5185\u3067\u8d77\u304d\u305f\u79fb\u52d5\u3084\u96a0\u3055\u308c\u305f\u624b\u9806\u3092\u793a\u3057\u3066\u3044\u308b\u3002",
    success: "\u63b2\u793a\u677f\u3092\u78ba\u8a8d\u3057\u305f\u3002\u307b\u304b\u306e\u8a3c\u8a00\u3084\u624b\u5143\u306e\u54c1\u3068\u5408\u308f\u305b\u308c\u3070\u3001\u591c\u306e\u6d41\u308c\u304c\u5c11\u3057\u305a\u3064\u3064\u306a\u304c\u308a\u305d\u3046\u3060\u3002"
  },
  lobbyBellView: {
    img: "./assets/zoom-lobby-bell.png",
    title: "\u547c\u3073\u9234\u3092\u8abf\u3079\u308b",
    text: "\u8fd1\u3065\u3044\u3066\u72b6\u614b\u3092\u78ba\u304b\u3081\u308b\u3002\u8868\u9762\u306e\u50b7\u3001\u6e7f\u308a\u3001\u7164\u3001\u7d19\u7247\u3001\u91d1\u5177\u306e\u5411\u304d\u304c\u3001\u9928\u5185\u3067\u8d77\u304d\u305f\u79fb\u52d5\u3084\u96a0\u3055\u308c\u305f\u624b\u9806\u3092\u793a\u3057\u3066\u3044\u308b\u3002",
    success: "\u547c\u3073\u9234\u3092\u78ba\u8a8d\u3057\u305f\u3002\u307b\u304b\u306e\u8a3c\u8a00\u3084\u624b\u5143\u306e\u54c1\u3068\u5408\u308f\u305b\u308c\u3070\u3001\u591c\u306e\u6d41\u308c\u304c\u5c11\u3057\u305a\u3064\u3064\u306a\u304c\u308a\u305d\u3046\u3060\u3002"
  },
  hallwayPrintsView: {
    img: "./assets/zoom-hallway-prints.png",
    title: "\u8db3\u8de1\u3092\u8abf\u3079\u308b",
    text: "\u8fd1\u3065\u3044\u3066\u72b6\u614b\u3092\u78ba\u304b\u3081\u308b\u3002\u8868\u9762\u306e\u50b7\u3001\u6e7f\u308a\u3001\u7164\u3001\u7d19\u7247\u3001\u91d1\u5177\u306e\u5411\u304d\u304c\u3001\u9928\u5185\u3067\u8d77\u304d\u305f\u79fb\u52d5\u3084\u96a0\u3055\u308c\u305f\u624b\u9806\u3092\u793a\u3057\u3066\u3044\u308b\u3002",
    success: "\u8db3\u8de1\u3092\u78ba\u8a8d\u3057\u305f\u3002\u307b\u304b\u306e\u8a3c\u8a00\u3084\u624b\u5143\u306e\u54c1\u3068\u5408\u308f\u305b\u308c\u3070\u3001\u591c\u306e\u6d41\u308c\u304c\u5c11\u3057\u305a\u3064\u3064\u306a\u304c\u308a\u305d\u3046\u3060\u3002"
  },
  hallwayCartView: {
    img: "./assets/zoom-hallway-cart.png",
    title: "\u30b5\u30fc\u30d3\u30b9\u30ab\u30fc\u30c8\u3092\u8abf\u3079\u308b",
    text: "\u8fd1\u3065\u3044\u3066\u72b6\u614b\u3092\u78ba\u304b\u3081\u308b\u3002\u8868\u9762\u306e\u50b7\u3001\u6e7f\u308a\u3001\u7164\u3001\u7d19\u7247\u3001\u91d1\u5177\u306e\u5411\u304d\u304c\u3001\u9928\u5185\u3067\u8d77\u304d\u305f\u79fb\u52d5\u3084\u96a0\u3055\u308c\u305f\u624b\u9806\u3092\u793a\u3057\u3066\u3044\u308b\u3002",
    success: "\u30b5\u30fc\u30d3\u30b9\u30ab\u30fc\u30c8\u3092\u78ba\u8a8d\u3057\u305f\u3002\u307b\u304b\u306e\u8a3c\u8a00\u3084\u624b\u5143\u306e\u54c1\u3068\u5408\u308f\u305b\u308c\u3070\u3001\u591c\u306e\u6d41\u308c\u304c\u5c11\u3057\u305a\u3064\u3064\u306a\u304c\u308a\u305d\u3046\u3060\u3002"
  },
  hallwayDryingDoorView: {
    img: "./assets/zoom-hallway-drying-door.png",
    title: "\u4e7e\u71e5\u5ba4\u6249\u3092\u8abf\u3079\u308b",
    text: "\u8fd1\u3065\u3044\u3066\u72b6\u614b\u3092\u78ba\u304b\u3081\u308b\u3002\u8868\u9762\u306e\u50b7\u3001\u6e7f\u308a\u3001\u7164\u3001\u7d19\u7247\u3001\u91d1\u5177\u306e\u5411\u304d\u304c\u3001\u9928\u5185\u3067\u8d77\u304d\u305f\u79fb\u52d5\u3084\u96a0\u3055\u308c\u305f\u624b\u9806\u3092\u793a\u3057\u3066\u3044\u308b\u3002",
    success: "\u4e7e\u71e5\u5ba4\u6249\u3092\u78ba\u8a8d\u3057\u305f\u3002\u307b\u304b\u306e\u8a3c\u8a00\u3084\u624b\u5143\u306e\u54c1\u3068\u5408\u308f\u305b\u308c\u3070\u3001\u591c\u306e\u6d41\u308c\u304c\u5c11\u3057\u305a\u3064\u3064\u306a\u304c\u308a\u305d\u3046\u3060\u3002"
  },
  hallwayRedLampView: {
    img: "./assets/zoom-hallway-red-lamp.png",
    title: "\u975e\u5e38\u706f\u3092\u8abf\u3079\u308b",
    text: "\u8fd1\u3065\u3044\u3066\u72b6\u614b\u3092\u78ba\u304b\u3081\u308b\u3002\u8868\u9762\u306e\u50b7\u3001\u6e7f\u308a\u3001\u7164\u3001\u7d19\u7247\u3001\u91d1\u5177\u306e\u5411\u304d\u304c\u3001\u9928\u5185\u3067\u8d77\u304d\u305f\u79fb\u52d5\u3084\u96a0\u3055\u308c\u305f\u624b\u9806\u3092\u793a\u3057\u3066\u3044\u308b\u3002",
    success: "\u975e\u5e38\u706f\u3092\u78ba\u8a8d\u3057\u305f\u3002\u307b\u304b\u306e\u8a3c\u8a00\u3084\u624b\u5143\u306e\u54c1\u3068\u5408\u308f\u305b\u308c\u3070\u3001\u591c\u306e\u6d41\u308c\u304c\u5c11\u3057\u305a\u3064\u3064\u306a\u304c\u308a\u305d\u3046\u3060\u3002"
  },
  diningWallClockView: {
    img: "./assets/zoom-dining-wall-clock.png",
    title: "\u58c1\u6642\u8a08\u3092\u8abf\u3079\u308b",
    text: "\u8fd1\u3065\u3044\u3066\u72b6\u614b\u3092\u78ba\u304b\u3081\u308b\u3002\u8868\u9762\u306e\u50b7\u3001\u6e7f\u308a\u3001\u7164\u3001\u7d19\u7247\u3001\u91d1\u5177\u306e\u5411\u304d\u304c\u3001\u9928\u5185\u3067\u8d77\u304d\u305f\u79fb\u52d5\u3084\u96a0\u3055\u308c\u305f\u624b\u9806\u3092\u793a\u3057\u3066\u3044\u308b\u3002",
    success: "\u58c1\u6642\u8a08\u3092\u78ba\u8a8d\u3057\u305f\u3002\u307b\u304b\u306e\u8a3c\u8a00\u3084\u624b\u5143\u306e\u54c1\u3068\u5408\u308f\u305b\u308c\u3070\u3001\u591c\u306e\u6d41\u308c\u304c\u5c11\u3057\u305a\u3064\u3064\u306a\u304c\u308a\u305d\u3046\u3060\u3002"
  },
  diningHatchView: {
    img: "./assets/zoom-dining-hatch.png",
    title: "\u914d\u81b3\u53e3\u3092\u8abf\u3079\u308b",
    text: "\u8fd1\u3065\u3044\u3066\u72b6\u614b\u3092\u78ba\u304b\u3081\u308b\u3002\u8868\u9762\u306e\u50b7\u3001\u6e7f\u308a\u3001\u7164\u3001\u7d19\u7247\u3001\u91d1\u5177\u306e\u5411\u304d\u304c\u3001\u9928\u5185\u3067\u8d77\u304d\u305f\u79fb\u52d5\u3084\u96a0\u3055\u308c\u305f\u624b\u9806\u3092\u793a\u3057\u3066\u3044\u308b\u3002",
    success: "\u914d\u81b3\u53e3\u3092\u78ba\u8a8d\u3057\u305f\u3002\u307b\u304b\u306e\u8a3c\u8a00\u3084\u624b\u5143\u306e\u54c1\u3068\u5408\u308f\u305b\u308c\u3070\u3001\u591c\u306e\u6d41\u308c\u304c\u5c11\u3057\u305a\u3064\u3064\u306a\u304c\u308a\u305d\u3046\u3060\u3002"
  },
  diningWineView: {
    img: "./assets/zoom-dining-wine.png",
    title: "\u7834\u308c\u305f\u30e9\u30d9\u30eb\u3092\u8abf\u3079\u308b",
    text: "\u8fd1\u3065\u3044\u3066\u72b6\u614b\u3092\u78ba\u304b\u3081\u308b\u3002\u8868\u9762\u306e\u50b7\u3001\u6e7f\u308a\u3001\u7164\u3001\u7d19\u7247\u3001\u91d1\u5177\u306e\u5411\u304d\u304c\u3001\u9928\u5185\u3067\u8d77\u304d\u305f\u79fb\u52d5\u3084\u96a0\u3055\u308c\u305f\u624b\u9806\u3092\u793a\u3057\u3066\u3044\u308b\u3002",
    success: "\u7834\u308c\u305f\u30e9\u30d9\u30eb\u3092\u78ba\u8a8d\u3057\u305f\u3002\u307b\u304b\u306e\u8a3c\u8a00\u3084\u624b\u5143\u306e\u54c1\u3068\u5408\u308f\u305b\u308c\u3070\u3001\u591c\u306e\u6d41\u308c\u304c\u5c11\u3057\u305a\u3064\u3064\u306a\u304c\u308a\u305d\u3046\u3060\u3002"
  },
  diningSilverView: {
    img: "./assets/zoom-dining-silver.png",
    title: "\u9280\u76bf\u3092\u8abf\u3079\u308b",
    text: "\u8fd1\u3065\u3044\u3066\u72b6\u614b\u3092\u78ba\u304b\u3081\u308b\u3002\u8868\u9762\u306e\u50b7\u3001\u6e7f\u308a\u3001\u7164\u3001\u7d19\u7247\u3001\u91d1\u5177\u306e\u5411\u304d\u304c\u3001\u9928\u5185\u3067\u8d77\u304d\u305f\u79fb\u52d5\u3084\u96a0\u3055\u308c\u305f\u624b\u9806\u3092\u793a\u3057\u3066\u3044\u308b\u3002",
    success: "\u9280\u76bf\u3092\u78ba\u8a8d\u3057\u305f\u3002\u307b\u304b\u306e\u8a3c\u8a00\u3084\u624b\u5143\u306e\u54c1\u3068\u5408\u308f\u305b\u308c\u3070\u3001\u591c\u306e\u6d41\u308c\u304c\u5c11\u3057\u305a\u3064\u3064\u306a\u304c\u308a\u305d\u3046\u3060\u3002"
  },
  kitchenOrdersView: {
    img: "./assets/zoom-kitchen-orders.png",
    title: "\u63a7\u3048\u4f1d\u7968\u3092\u8abf\u3079\u308b",
    text: "\u8fd1\u3065\u3044\u3066\u72b6\u614b\u3092\u78ba\u304b\u3081\u308b\u3002\u8868\u9762\u306e\u50b7\u3001\u6e7f\u308a\u3001\u7164\u3001\u7d19\u7247\u3001\u91d1\u5177\u306e\u5411\u304d\u304c\u3001\u9928\u5185\u3067\u8d77\u304d\u305f\u79fb\u52d5\u3084\u96a0\u3055\u308c\u305f\u624b\u9806\u3092\u793a\u3057\u3066\u3044\u308b\u3002",
    success: "\u63a7\u3048\u4f1d\u7968\u3092\u78ba\u8a8d\u3057\u305f\u3002\u307b\u304b\u306e\u8a3c\u8a00\u3084\u624b\u5143\u306e\u54c1\u3068\u5408\u308f\u305b\u308c\u3070\u3001\u591c\u306e\u6d41\u308c\u304c\u5c11\u3057\u305a\u3064\u3064\u306a\u304c\u308a\u305d\u3046\u3060\u3002"
  },
  kitchenSpiceView: {
    img: "./assets/zoom-kitchen-spice.png",
    title: "\u9999\u8f9b\u6599\u3092\u8abf\u3079\u308b",
    text: "\u8fd1\u3065\u3044\u3066\u72b6\u614b\u3092\u78ba\u304b\u3081\u308b\u3002\u8868\u9762\u306e\u50b7\u3001\u6e7f\u308a\u3001\u7164\u3001\u7d19\u7247\u3001\u91d1\u5177\u306e\u5411\u304d\u304c\u3001\u9928\u5185\u3067\u8d77\u304d\u305f\u79fb\u52d5\u3084\u96a0\u3055\u308c\u305f\u624b\u9806\u3092\u793a\u3057\u3066\u3044\u308b\u3002",
    success: "\u9999\u8f9b\u6599\u3092\u78ba\u8a8d\u3057\u305f\u3002\u307b\u304b\u306e\u8a3c\u8a00\u3084\u624b\u5143\u306e\u54c1\u3068\u5408\u308f\u305b\u308c\u3070\u3001\u591c\u306e\u6d41\u308c\u304c\u5c11\u3057\u305a\u3064\u3064\u306a\u304c\u308a\u305d\u3046\u3060\u3002"
  },
  kitchenDumbwaiterView: {
    img: "./assets/zoom-kitchen-dumbwaiter.png",
    title: "\u6607\u964d\u6a5f\u3092\u8abf\u3079\u308b",
    text: "\u8fd1\u3065\u3044\u3066\u72b6\u614b\u3092\u78ba\u304b\u3081\u308b\u3002\u8868\u9762\u306e\u50b7\u3001\u6e7f\u308a\u3001\u7164\u3001\u7d19\u7247\u3001\u91d1\u5177\u306e\u5411\u304d\u304c\u3001\u9928\u5185\u3067\u8d77\u304d\u305f\u79fb\u52d5\u3084\u96a0\u3055\u308c\u305f\u624b\u9806\u3092\u793a\u3057\u3066\u3044\u308b\u3002",
    success: "\u6607\u964d\u6a5f\u3092\u78ba\u8a8d\u3057\u305f\u3002\u307b\u304b\u306e\u8a3c\u8a00\u3084\u624b\u5143\u306e\u54c1\u3068\u5408\u308f\u305b\u308c\u3070\u3001\u591c\u306e\u6d41\u308c\u304c\u5c11\u3057\u305a\u3064\u3064\u306a\u304c\u308a\u305d\u3046\u3060\u3002"
  },
  officeTerminalView: {
    img: "./assets/zoom-office-terminal.png",
    title: "\u7aef\u672b\u3092\u8abf\u3079\u308b",
    text: "\u8fd1\u3065\u3044\u3066\u72b6\u614b\u3092\u78ba\u304b\u3081\u308b\u3002\u8868\u9762\u306e\u50b7\u3001\u6e7f\u308a\u3001\u7164\u3001\u7d19\u7247\u3001\u91d1\u5177\u306e\u5411\u304d\u304c\u3001\u9928\u5185\u3067\u8d77\u304d\u305f\u79fb\u52d5\u3084\u96a0\u3055\u308c\u305f\u624b\u9806\u3092\u793a\u3057\u3066\u3044\u308b\u3002",
    success: "\u7aef\u672b\u3092\u78ba\u8a8d\u3057\u305f\u3002\u307b\u304b\u306e\u8a3c\u8a00\u3084\u624b\u5143\u306e\u54c1\u3068\u5408\u308f\u305b\u308c\u3070\u3001\u591c\u306e\u6d41\u308c\u304c\u5c11\u3057\u305a\u3064\u3064\u306a\u304c\u308a\u305d\u3046\u3060\u3002"
  },
  officeMapView: {
    img: "./assets/zoom-office-map.png",
    title: "\u9928\u5185\u56f3\u3092\u8abf\u3079\u308b",
    text: "\u8fd1\u3065\u3044\u3066\u72b6\u614b\u3092\u78ba\u304b\u3081\u308b\u3002\u8868\u9762\u306e\u50b7\u3001\u6e7f\u308a\u3001\u7164\u3001\u7d19\u7247\u3001\u91d1\u5177\u306e\u5411\u304d\u304c\u3001\u9928\u5185\u3067\u8d77\u304d\u305f\u79fb\u52d5\u3084\u96a0\u3055\u308c\u305f\u624b\u9806\u3092\u793a\u3057\u3066\u3044\u308b\u3002",
    success: "\u9928\u5185\u56f3\u3092\u78ba\u8a8d\u3057\u305f\u3002\u307b\u304b\u306e\u8a3c\u8a00\u3084\u624b\u5143\u306e\u54c1\u3068\u5408\u308f\u305b\u308c\u3070\u3001\u591c\u306e\u6d41\u308c\u304c\u5c11\u3057\u305a\u3064\u3064\u306a\u304c\u308a\u305d\u3046\u3060\u3002"
  },
  officeRoomListView: {
    img: "./assets/zoom-office-room-list.png",
    title: "\u5ba2\u5ba4\u5272\u3092\u8abf\u3079\u308b",
    text: "\u8fd1\u3065\u3044\u3066\u72b6\u614b\u3092\u78ba\u304b\u3081\u308b\u3002\u8868\u9762\u306e\u50b7\u3001\u6e7f\u308a\u3001\u7164\u3001\u7d19\u7247\u3001\u91d1\u5177\u306e\u5411\u304d\u304c\u3001\u9928\u5185\u3067\u8d77\u304d\u305f\u79fb\u52d5\u3084\u96a0\u3055\u308c\u305f\u624b\u9806\u3092\u793a\u3057\u3066\u3044\u308b\u3002",
    success: "\u5ba2\u5ba4\u5272\u3092\u78ba\u8a8d\u3057\u305f\u3002\u307b\u304b\u306e\u8a3c\u8a00\u3084\u624b\u5143\u306e\u54c1\u3068\u5408\u308f\u305b\u308c\u3070\u3001\u591c\u306e\u6d41\u308c\u304c\u5c11\u3057\u305a\u3064\u3064\u306a\u304c\u308a\u305d\u3046\u3060\u3002"
  },
  loungeGuestBookView: {
    img: "./assets/zoom-lounge-guest-book.png",
    title: "\u5bbf\u6cca\u8005\u540d\u7c3f\u3092\u8abf\u3079\u308b",
    text: "\u8fd1\u3065\u3044\u3066\u72b6\u614b\u3092\u78ba\u304b\u3081\u308b\u3002\u8868\u9762\u306e\u50b7\u3001\u6e7f\u308a\u3001\u7164\u3001\u7d19\u7247\u3001\u91d1\u5177\u306e\u5411\u304d\u304c\u3001\u9928\u5185\u3067\u8d77\u304d\u305f\u79fb\u52d5\u3084\u96a0\u3055\u308c\u305f\u624b\u9806\u3092\u793a\u3057\u3066\u3044\u308b\u3002",
    success: "\u5bbf\u6cca\u8005\u540d\u7c3f\u3092\u78ba\u8a8d\u3057\u305f\u3002\u307b\u304b\u306e\u8a3c\u8a00\u3084\u624b\u5143\u306e\u54c1\u3068\u5408\u308f\u305b\u308c\u3070\u3001\u591c\u306e\u6d41\u308c\u304c\u5c11\u3057\u305a\u3064\u3064\u306a\u304c\u308a\u305d\u3046\u3060\u3002"
  },
  loungeDiaryView: {
    img: "./assets/zoom-lounge-diary.png",
    title: "\u7834\u3089\u308c\u305f\u65e5\u8a8c\u3092\u8abf\u3079\u308b",
    text: "\u8fd1\u3065\u3044\u3066\u72b6\u614b\u3092\u78ba\u304b\u3081\u308b\u3002\u8868\u9762\u306e\u50b7\u3001\u6e7f\u308a\u3001\u7164\u3001\u7d19\u7247\u3001\u91d1\u5177\u306e\u5411\u304d\u304c\u3001\u9928\u5185\u3067\u8d77\u304d\u305f\u79fb\u52d5\u3084\u96a0\u3055\u308c\u305f\u624b\u9806\u3092\u793a\u3057\u3066\u3044\u308b\u3002",
    success: "\u7834\u3089\u308c\u305f\u65e5\u8a8c\u3092\u78ba\u8a8d\u3057\u305f\u3002\u307b\u304b\u306e\u8a3c\u8a00\u3084\u624b\u5143\u306e\u54c1\u3068\u5408\u308f\u305b\u308c\u3070\u3001\u591c\u306e\u6d41\u308c\u304c\u5c11\u3057\u305a\u3064\u3064\u306a\u304c\u308a\u305d\u3046\u3060\u3002"
  },
  loungePortraitView: {
    img: "./assets/zoom-lounge-portrait.png",
    title: "\u8096\u50cf\u753b\u3092\u8abf\u3079\u308b",
    text: "\u8fd1\u3065\u3044\u3066\u72b6\u614b\u3092\u78ba\u304b\u3081\u308b\u3002\u8868\u9762\u306e\u50b7\u3001\u6e7f\u308a\u3001\u7164\u3001\u7d19\u7247\u3001\u91d1\u5177\u306e\u5411\u304d\u304c\u3001\u9928\u5185\u3067\u8d77\u304d\u305f\u79fb\u52d5\u3084\u96a0\u3055\u308c\u305f\u624b\u9806\u3092\u793a\u3057\u3066\u3044\u308b\u3002",
    success: "\u8096\u50cf\u753b\u3092\u78ba\u8a8d\u3057\u305f\u3002\u307b\u304b\u306e\u8a3c\u8a00\u3084\u624b\u5143\u306e\u54c1\u3068\u5408\u308f\u305b\u308c\u3070\u3001\u591c\u306e\u6d41\u308c\u304c\u5c11\u3057\u305a\u3064\u3064\u306a\u304c\u308a\u305d\u3046\u3060\u3002"
  },
  room301ClockView: {
    img: "./assets/zoom-room301-clock.png",
    title: "\u58c1\u6642\u8a08\u3092\u8abf\u3079\u308b",
    text: "\u8fd1\u3065\u3044\u3066\u72b6\u614b\u3092\u78ba\u304b\u3081\u308b\u3002\u8868\u9762\u306e\u50b7\u3001\u6e7f\u308a\u3001\u7164\u3001\u7d19\u7247\u3001\u91d1\u5177\u306e\u5411\u304d\u304c\u3001\u9928\u5185\u3067\u8d77\u304d\u305f\u79fb\u52d5\u3084\u96a0\u3055\u308c\u305f\u624b\u9806\u3092\u793a\u3057\u3066\u3044\u308b\u3002",
    success: "\u58c1\u6642\u8a08\u3092\u78ba\u8a8d\u3057\u305f\u3002\u307b\u304b\u306e\u8a3c\u8a00\u3084\u624b\u5143\u306e\u54c1\u3068\u5408\u308f\u305b\u308c\u3070\u3001\u591c\u306e\u6d41\u308c\u304c\u5c11\u3057\u305a\u3064\u3064\u306a\u304c\u308a\u305d\u3046\u3060\u3002"
  },
  room301KeyView: {
    img: "./assets/zoom-room301-key.png",
    title: "\u771f\u936e\u9375\u3092\u8abf\u3079\u308b",
    text: "\u8fd1\u3065\u3044\u3066\u72b6\u614b\u3092\u78ba\u304b\u3081\u308b\u3002\u8868\u9762\u306e\u50b7\u3001\u6e7f\u308a\u3001\u7164\u3001\u7d19\u7247\u3001\u91d1\u5177\u306e\u5411\u304d\u304c\u3001\u9928\u5185\u3067\u8d77\u304d\u305f\u79fb\u52d5\u3084\u96a0\u3055\u308c\u305f\u624b\u9806\u3092\u793a\u3057\u3066\u3044\u308b\u3002",
    success: "\u771f\u936e\u9375\u3092\u78ba\u8a8d\u3057\u305f\u3002\u307b\u304b\u306e\u8a3c\u8a00\u3084\u624b\u5143\u306e\u54c1\u3068\u5408\u308f\u305b\u308c\u3070\u3001\u591c\u306e\u6d41\u308c\u304c\u5c11\u3057\u305a\u3064\u3064\u306a\u304c\u308a\u305d\u3046\u3060\u3002"
  },
  room301ScratchView: {
    img: "./assets/zoom-room301-scratch.png",
    title: "\u624b\u3059\u308a\u306e\u50b7\u3092\u8abf\u3079\u308b",
    text: "\u8fd1\u3065\u3044\u3066\u72b6\u614b\u3092\u78ba\u304b\u3081\u308b\u3002\u8868\u9762\u306e\u50b7\u3001\u6e7f\u308a\u3001\u7164\u3001\u7d19\u7247\u3001\u91d1\u5177\u306e\u5411\u304d\u304c\u3001\u9928\u5185\u3067\u8d77\u304d\u305f\u79fb\u52d5\u3084\u96a0\u3055\u308c\u305f\u624b\u9806\u3092\u793a\u3057\u3066\u3044\u308b\u3002",
    success: "\u624b\u3059\u308a\u306e\u50b7\u3092\u78ba\u8a8d\u3057\u305f\u3002\u307b\u304b\u306e\u8a3c\u8a00\u3084\u624b\u5143\u306e\u54c1\u3068\u5408\u308f\u305b\u308c\u3070\u3001\u591c\u306e\u6d41\u308c\u304c\u5c11\u3057\u305a\u3064\u3064\u306a\u304c\u308a\u305d\u3046\u3060\u3002"
  },
  room301LedgerView: {
    img: "./assets/zoom-room301-ledger.png",
    title: "\u5bbf\u6cca\u53f0\u5e33\u3092\u8abf\u3079\u308b",
    text: "\u8fd1\u3065\u3044\u3066\u72b6\u614b\u3092\u78ba\u304b\u3081\u308b\u3002\u8868\u9762\u306e\u50b7\u3001\u6e7f\u308a\u3001\u7164\u3001\u7d19\u7247\u3001\u91d1\u5177\u306e\u5411\u304d\u304c\u3001\u9928\u5185\u3067\u8d77\u304d\u305f\u79fb\u52d5\u3084\u96a0\u3055\u308c\u305f\u624b\u9806\u3092\u793a\u3057\u3066\u3044\u308b\u3002",
    success: "\u5bbf\u6cca\u53f0\u5e33\u3092\u78ba\u8a8d\u3057\u305f\u3002\u307b\u304b\u306e\u8a3c\u8a00\u3084\u624b\u5143\u306e\u54c1\u3068\u5408\u308f\u305b\u308c\u3070\u3001\u591c\u306e\u6d41\u308c\u304c\u5c11\u3057\u305a\u3064\u3064\u306a\u304c\u308a\u305d\u3046\u3060\u3002"
  },
  room301WardrobeView: {
    img: "./assets/zoom-room301-wardrobe.png",
    title: "\u30af\u30ed\u30fc\u30bc\u30c3\u30c8\u3092\u8abf\u3079\u308b",
    text: "\u8fd1\u3065\u3044\u3066\u72b6\u614b\u3092\u78ba\u304b\u3081\u308b\u3002\u8868\u9762\u306e\u50b7\u3001\u6e7f\u308a\u3001\u7164\u3001\u7d19\u7247\u3001\u91d1\u5177\u306e\u5411\u304d\u304c\u3001\u9928\u5185\u3067\u8d77\u304d\u305f\u79fb\u52d5\u3084\u96a0\u3055\u308c\u305f\u624b\u9806\u3092\u793a\u3057\u3066\u3044\u308b\u3002",
    success: "\u30af\u30ed\u30fc\u30bc\u30c3\u30c8\u3092\u78ba\u8a8d\u3057\u305f\u3002\u307b\u304b\u306e\u8a3c\u8a00\u3084\u624b\u5143\u306e\u54c1\u3068\u5408\u308f\u305b\u308c\u3070\u3001\u591c\u306e\u6d41\u308c\u304c\u5c11\u3057\u305a\u3064\u3064\u306a\u304c\u308a\u305d\u3046\u3060\u3002"
  },
  room301PhotoView: {
    img: "./assets/zoom-room301-photo.png",
    title: "\u96c6\u5408\u5199\u771f\u3092\u8abf\u3079\u308b",
    text: "\u8fd1\u3065\u3044\u3066\u72b6\u614b\u3092\u78ba\u304b\u3081\u308b\u3002\u8868\u9762\u306e\u50b7\u3001\u6e7f\u308a\u3001\u7164\u3001\u7d19\u7247\u3001\u91d1\u5177\u306e\u5411\u304d\u304c\u3001\u9928\u5185\u3067\u8d77\u304d\u305f\u79fb\u52d5\u3084\u96a0\u3055\u308c\u305f\u624b\u9806\u3092\u793a\u3057\u3066\u3044\u308b\u3002",
    success: "\u96c6\u5408\u5199\u771f\u3092\u78ba\u8a8d\u3057\u305f\u3002\u307b\u304b\u306e\u8a3c\u8a00\u3084\u624b\u5143\u306e\u54c1\u3068\u5408\u308f\u305b\u308c\u3070\u3001\u591c\u306e\u6d41\u308c\u304c\u5c11\u3057\u305a\u3064\u3064\u306a\u304c\u308a\u305d\u3046\u3060\u3002"
  },
  room301MirrorView: {
    img: "./assets/zoom-room301-mirror.png",
    title: "\u66c7\u3063\u305f\u93e1\u3092\u8abf\u3079\u308b",
    text: "\u8fd1\u3065\u3044\u3066\u72b6\u614b\u3092\u78ba\u304b\u3081\u308b\u3002\u8868\u9762\u306e\u50b7\u3001\u6e7f\u308a\u3001\u7164\u3001\u7d19\u7247\u3001\u91d1\u5177\u306e\u5411\u304d\u304c\u3001\u9928\u5185\u3067\u8d77\u304d\u305f\u79fb\u52d5\u3084\u96a0\u3055\u308c\u305f\u624b\u9806\u3092\u793a\u3057\u3066\u3044\u308b\u3002",
    success: "\u66c7\u3063\u305f\u93e1\u3092\u78ba\u8a8d\u3057\u305f\u3002\u307b\u304b\u306e\u8a3c\u8a00\u3084\u624b\u5143\u306e\u54c1\u3068\u5408\u308f\u305b\u308c\u3070\u3001\u591c\u306e\u6d41\u308c\u304c\u5c11\u3057\u305a\u3064\u3064\u306a\u304c\u308a\u305d\u3046\u3060\u3002"
  },
  dryingTowelView: {
    img: "./assets/zoom-drying-towel.png",
    title: "\u6fe1\u308c\u305f\u30bf\u30aa\u30eb\u3092\u8abf\u3079\u308b",
    text: "\u8fd1\u3065\u3044\u3066\u72b6\u614b\u3092\u78ba\u304b\u3081\u308b\u3002\u8868\u9762\u306e\u50b7\u3001\u6e7f\u308a\u3001\u7164\u3001\u7d19\u7247\u3001\u91d1\u5177\u306e\u5411\u304d\u304c\u3001\u9928\u5185\u3067\u8d77\u304d\u305f\u79fb\u52d5\u3084\u96a0\u3055\u308c\u305f\u624b\u9806\u3092\u793a\u3057\u3066\u3044\u308b\u3002",
    success: "\u6fe1\u308c\u305f\u30bf\u30aa\u30eb\u3092\u78ba\u8a8d\u3057\u305f\u3002\u307b\u304b\u306e\u8a3c\u8a00\u3084\u624b\u5143\u306e\u54c1\u3068\u5408\u308f\u305b\u308c\u3070\u3001\u591c\u306e\u6d41\u308c\u304c\u5c11\u3057\u305a\u3064\u3064\u306a\u304c\u308a\u305d\u3046\u3060\u3002"
  },
  dryingRouteDoorView: {
    img: "./assets/zoom-drying-route-door.png",
    title: "\u901a\u8def\u6249\u3092\u8abf\u3079\u308b",
    text: "\u8fd1\u3065\u3044\u3066\u72b6\u614b\u3092\u78ba\u304b\u3081\u308b\u3002\u8868\u9762\u306e\u50b7\u3001\u6e7f\u308a\u3001\u7164\u3001\u7d19\u7247\u3001\u91d1\u5177\u306e\u5411\u304d\u304c\u3001\u9928\u5185\u3067\u8d77\u304d\u305f\u79fb\u52d5\u3084\u96a0\u3055\u308c\u305f\u624b\u9806\u3092\u793a\u3057\u3066\u3044\u308b\u3002",
    success: "\u901a\u8def\u6249\u3092\u78ba\u8a8d\u3057\u305f\u3002\u307b\u304b\u306e\u8a3c\u8a00\u3084\u624b\u5143\u306e\u54c1\u3068\u5408\u308f\u305b\u308c\u3070\u3001\u591c\u306e\u6d41\u308c\u304c\u5c11\u3057\u305a\u3064\u3064\u306a\u304c\u308a\u305d\u3046\u3060\u3002"
  },
  dryingFuseBoxView: {
    img: "./assets/zoom-drying-fuse-box.png",
    title: "\u5c0f\u914d\u96fb\u7bb1\u3092\u8abf\u3079\u308b",
    text: "\u8fd1\u3065\u3044\u3066\u72b6\u614b\u3092\u78ba\u304b\u3081\u308b\u3002\u8868\u9762\u306e\u50b7\u3001\u6e7f\u308a\u3001\u7164\u3001\u7d19\u7247\u3001\u91d1\u5177\u306e\u5411\u304d\u304c\u3001\u9928\u5185\u3067\u8d77\u304d\u305f\u79fb\u52d5\u3084\u96a0\u3055\u308c\u305f\u624b\u9806\u3092\u793a\u3057\u3066\u3044\u308b\u3002",
    success: "\u5c0f\u914d\u96fb\u7bb1\u3092\u78ba\u8a8d\u3057\u305f\u3002\u307b\u304b\u306e\u8a3c\u8a00\u3084\u624b\u5143\u306e\u54c1\u3068\u5408\u308f\u305b\u308c\u3070\u3001\u591c\u306e\u6d41\u308c\u304c\u5c11\u3057\u305a\u3064\u3064\u306a\u304c\u308a\u305d\u3046\u3060\u3002"
  },
  dryingLinenView: {
    img: "./assets/zoom-drying-linen.png",
    title: "\u30ea\u30cd\u30f3\u68da\u3092\u8abf\u3079\u308b",
    text: "\u8fd1\u3065\u3044\u3066\u72b6\u614b\u3092\u78ba\u304b\u3081\u308b\u3002\u8868\u9762\u306e\u50b7\u3001\u6e7f\u308a\u3001\u7164\u3001\u7d19\u7247\u3001\u91d1\u5177\u306e\u5411\u304d\u304c\u3001\u9928\u5185\u3067\u8d77\u304d\u305f\u79fb\u52d5\u3084\u96a0\u3055\u308c\u305f\u624b\u9806\u3092\u793a\u3057\u3066\u3044\u308b\u3002",
    success: "\u30ea\u30cd\u30f3\u68da\u3092\u78ba\u8a8d\u3057\u305f\u3002\u307b\u304b\u306e\u8a3c\u8a00\u3084\u624b\u5143\u306e\u54c1\u3068\u5408\u308f\u305b\u308c\u3070\u3001\u591c\u306e\u6d41\u308c\u304c\u5c11\u3057\u305a\u3064\u3064\u306a\u304c\u308a\u305d\u3046\u3060\u3002"
  },
  archiveRegisterView: {
    img: "./assets/zoom-archive-register.png",
    title: "\u53e4\u3044\u5bbf\u5e33\u3092\u8abf\u3079\u308b",
    text: "\u8fd1\u3065\u3044\u3066\u72b6\u614b\u3092\u78ba\u304b\u3081\u308b\u3002\u8868\u9762\u306e\u50b7\u3001\u6e7f\u308a\u3001\u7164\u3001\u7d19\u7247\u3001\u91d1\u5177\u306e\u5411\u304d\u304c\u3001\u9928\u5185\u3067\u8d77\u304d\u305f\u79fb\u52d5\u3084\u96a0\u3055\u308c\u305f\u624b\u9806\u3092\u793a\u3057\u3066\u3044\u308b\u3002",
    success: "\u53e4\u3044\u5bbf\u5e33\u3092\u78ba\u8a8d\u3057\u305f\u3002\u307b\u304b\u306e\u8a3c\u8a00\u3084\u624b\u5143\u306e\u54c1\u3068\u5408\u308f\u305b\u308c\u3070\u3001\u591c\u306e\u6d41\u308c\u304c\u5c11\u3057\u305a\u3064\u3064\u306a\u304c\u308a\u305d\u3046\u3060\u3002"
  },
  archiveCablesView: {
    img: "./assets/zoom-archive-cables.png",
    title: "\u7cfb\u7d71\u56f3\u3092\u8abf\u3079\u308b",
    text: "\u8fd1\u3065\u3044\u3066\u72b6\u614b\u3092\u78ba\u304b\u3081\u308b\u3002\u8868\u9762\u306e\u50b7\u3001\u6e7f\u308a\u3001\u7164\u3001\u7d19\u7247\u3001\u91d1\u5177\u306e\u5411\u304d\u304c\u3001\u9928\u5185\u3067\u8d77\u304d\u305f\u79fb\u52d5\u3084\u96a0\u3055\u308c\u305f\u624b\u9806\u3092\u793a\u3057\u3066\u3044\u308b\u3002",
    success: "\u7cfb\u7d71\u56f3\u3092\u78ba\u8a8d\u3057\u305f\u3002\u307b\u304b\u306e\u8a3c\u8a00\u3084\u624b\u5143\u306e\u54c1\u3068\u5408\u308f\u305b\u308c\u3070\u3001\u591c\u306e\u6d41\u308c\u304c\u5c11\u3057\u305a\u3064\u3064\u306a\u304c\u308a\u305d\u3046\u3060\u3002"
  },
  archiveSkiView: {
    img: "./assets/zoom-archive-ski.png",
    title: "\u58ca\u308c\u305f\u30b9\u30ad\u30fc\u677f\u3092\u8abf\u3079\u308b",
    text: "\u8fd1\u3065\u3044\u3066\u72b6\u614b\u3092\u78ba\u304b\u3081\u308b\u3002\u8868\u9762\u306e\u50b7\u3001\u6e7f\u308a\u3001\u7164\u3001\u7d19\u7247\u3001\u91d1\u5177\u306e\u5411\u304d\u304c\u3001\u9928\u5185\u3067\u8d77\u304d\u305f\u79fb\u52d5\u3084\u96a0\u3055\u308c\u305f\u624b\u9806\u3092\u793a\u3057\u3066\u3044\u308b\u3002",
    success: "\u58ca\u308c\u305f\u30b9\u30ad\u30fc\u677f\u3092\u78ba\u8a8d\u3057\u305f\u3002\u307b\u304b\u306e\u8a3c\u8a00\u3084\u624b\u5143\u306e\u54c1\u3068\u5408\u308f\u305b\u308c\u3070\u3001\u591c\u306e\u6d41\u308c\u304c\u5c11\u3057\u305a\u3064\u3064\u306a\u304c\u308a\u305d\u3046\u3060\u3002"
  },
  generatorDoorView: {
    img: "./assets/zoom-generator-door.png",
    title: "\u5916\u6249\u3092\u8abf\u3079\u308b",
    text: "\u8fd1\u3065\u3044\u3066\u72b6\u614b\u3092\u78ba\u304b\u3081\u308b\u3002\u8868\u9762\u306e\u50b7\u3001\u6e7f\u308a\u3001\u7164\u3001\u7d19\u7247\u3001\u91d1\u5177\u306e\u5411\u304d\u304c\u3001\u9928\u5185\u3067\u8d77\u304d\u305f\u79fb\u52d5\u3084\u96a0\u3055\u308c\u305f\u624b\u9806\u3092\u793a\u3057\u3066\u3044\u308b\u3002",
    success: "\u5916\u6249\u3092\u78ba\u8a8d\u3057\u305f\u3002\u307b\u304b\u306e\u8a3c\u8a00\u3084\u624b\u5143\u306e\u54c1\u3068\u5408\u308f\u305b\u308c\u3070\u3001\u591c\u306e\u6d41\u308c\u304c\u5c11\u3057\u305a\u3064\u3064\u306a\u304c\u308a\u305d\u3046\u3060\u3002"
  },
  generatorLanternView: {
    img: "./assets/zoom-generator-lantern.png",
    title: "\u30e9\u30f3\u30bf\u30f3\u3092\u8abf\u3079\u308b",
    text: "\u8fd1\u3065\u3044\u3066\u72b6\u614b\u3092\u78ba\u304b\u3081\u308b\u3002\u8868\u9762\u306e\u50b7\u3001\u6e7f\u308a\u3001\u7164\u3001\u7d19\u7247\u3001\u91d1\u5177\u306e\u5411\u304d\u304c\u3001\u9928\u5185\u3067\u8d77\u304d\u305f\u79fb\u52d5\u3084\u96a0\u3055\u308c\u305f\u624b\u9806\u3092\u793a\u3057\u3066\u3044\u308b\u3002",
    success: "\u30e9\u30f3\u30bf\u30f3\u3092\u78ba\u8a8d\u3057\u305f\u3002\u307b\u304b\u306e\u8a3c\u8a00\u3084\u624b\u5143\u306e\u54c1\u3068\u5408\u308f\u305b\u308c\u3070\u3001\u591c\u306e\u6d41\u308c\u304c\u5c11\u3057\u305a\u3064\u3064\u306a\u304c\u308a\u305d\u3046\u3060\u3002"
  },
  generatorSwitchView: {
    img: "./assets/zoom-generator-switch.png",
    title: "\u5207\u66ff\u30b9\u30a4\u30c3\u30c1\u3092\u8abf\u3079\u308b",
    text: "\u8fd1\u3065\u3044\u3066\u72b6\u614b\u3092\u78ba\u304b\u3081\u308b\u3002\u8868\u9762\u306e\u50b7\u3001\u6e7f\u308a\u3001\u7164\u3001\u7d19\u7247\u3001\u91d1\u5177\u306e\u5411\u304d\u304c\u3001\u9928\u5185\u3067\u8d77\u304d\u305f\u79fb\u52d5\u3084\u96a0\u3055\u308c\u305f\u624b\u9806\u3092\u793a\u3057\u3066\u3044\u308b\u3002",
    success: "\u5207\u66ff\u30b9\u30a4\u30c3\u30c1\u3092\u78ba\u8a8d\u3057\u305f\u3002\u307b\u304b\u306e\u8a3c\u8a00\u3084\u624b\u5143\u306e\u54c1\u3068\u5408\u308f\u305b\u308c\u3070\u3001\u591c\u306e\u6d41\u308c\u304c\u5c11\u3057\u305a\u3064\u3064\u306a\u304c\u308a\u305d\u3046\u3060\u3002"
  }
};

const locks = {
  office: () => state.items.has("pass"),
  kitchen: () => state.items.has("ticket") || state.flags.has("show:clerk:ticket"),
  drying: () => state.flags.has("show:clerk:footprint") || state.items.has("staffRoute"),
  room301: () => state.items.has("brassKey") || state.items.has("masterKey"),
  archive: () => state.items.has("masterKey") && state.items.has("chessPiece"),
  generator: () => state.items.has("fuse") && state.items.has("staffRoute")
};

const lockMessages = {
  office: "管理室はパスがないと開かない。ロビーのフロントを調べよう。",
  kitchen: "厨房側の扉は内側から止められている。食堂や伝票に手がかりがありそうだ。",
  drying: "乾燥室の奥へ進むには、足跡について夜勤係から聞く必要がある。",
  room301: "301号室は古い鍵かマスターキーが必要だ。西階段を調べよう。",
  archive: "地下資料庫の扉には旧館マスターキーと、書斎の隠し棚を開けた証拠が必要だ。",
  generator: "発電室へ行くには、ヒューズレバーと従業員通路図が必要だ。乾燥室と管理室を調べよう。"
};

const scenes = {
  exterior: {
    name: "ホテル外観",
    img: "./assets/hero.png",
    intro: "送迎道路は完全に埋まり、玄関前の雪には新しい足跡がない。外から来た者も、外へ出た者もいないように見える。",
    moves: ["lobby"],
    people: [],
    spots: [
      { id: "gate", label: "雪の門", x: 42, y: 62, w: 18, h: 14, zoom: "exteriorGateView", text: "門は雪で押し固められている。人が通れば崩れた跡が残るはずだが、表面はなめらかなままだ。" },
      { id: "window", label: "二階の明かり", x: 52, y: 31, w: 10, h: 12, zoom: "exteriorWindowView", text: "二階西側の窓だけ、停電のあとも短く明滅したらしい。発電室につながる非常灯かもしれない。" },
      { id: "snowbank", label: "雪だまり", x: 18, y: 70, w: 13, h: 12, zoom: "exteriorSnowbankView", text: "雪だまりには館内から捨てられた灰が混ざっている。暖炉で燃やした紙片が、あとで外へ運ばれた可能性がある。" }
    ]
  },
  lobby: {
    name: "ロビー",
    img: "./assets/game-lobby.png",
    intro: "暖炉の火が弱く揺れている。フロントには封筒、壁には古い掲示物、奥には二階へ続く階段がある。",
    moves: ["exterior", "hallway", "dining", "lounge", "office", "room301"],
    people: ["torii"],
    spots: [
      { id: "envelope", label: "封筒", x: 71, y: 72, w: 10, h: 9, item: "envelope", zoom: "lobbyEnvelopeView", text: "封筒には仮パスワード SNOW0314 と、307号室の鍵についての走り書きがある。差出人は鳥居真琴。" },
      { id: "fireplace", label: "暖炉", zoom: "lobbyFireplaceView", x: 6, y: 53, w: 16, h: 18, item: "menu", requires: { items: ["envelope"] }, lockedText: "暖炉の灰は崩れやすい。先に封筒の内容を確かめ、何を探すべきか絞った方がよさそうだ。", text: "封筒の文面を思い出しながら灰を崩すと、焦げたメニューカードが出てきた。鳥居、午前零時、献立を戻すな、という文字だけが残っている。" },
      { id: "desk", label: "フロント", x: 52, y: 56, w: 14, h: 16, item: "pass", zoom: "deskLock", requires: { items: ["envelope"] }, lockedText: "フロントの引き出しには簡易ロックがある。封筒に書かれた仮パスワードが必要だ。", text: "封筒の仮パスワードで引き出しが開いた。管理室パスが残されている。停電時の非常灯で赤く照らされていたらしい。" },
      { id: "notice", label: "掲示板", x: 28, y: 70, w: 12, h: 10, item: "clipping", zoom: "lobbyNoticeView", text: "古い新聞切り抜き。十年前、改装前の西階段で宿泊客が転落した記事だ。関係者の名前に蓮見岬がある。" },
      { id: "bell", label: "呼び鈴", zoom: "lobbyBellView", x: 62, y: 45, w: 8, h: 8, item: "bellCode", requires: { items: ["clipping"] }, lockedText: "呼び鈴はただ鳴るだけだ。掲示板の古い切り抜きにあった数字を思い出せば、鳴らす順番が分かるかもしれない。", text: "切り抜きの数字どおり、三回、二回、一回の順で打つと音が違う。書斎の棚に同じ三段の金具がある。" }
    ]
  },
  hallway: {
    name: "二階廊下",
    img: "./assets/game-hallway.png",
    intro: "非常灯が赤く滲む廊下。乾燥室、サービスカート、西階段へ続く扉が見える。",
    moves: ["lobby", "westStairs", "room301", "drying", "generator"],
    people: ["clerk"],
    spots: [
      { id: "prints", label: "足跡", x: 36, y: 68, w: 18, h: 14, item: "footprint", zoom: "hallwayPrintsView", text: "濡れた足跡は乾燥室から従業員通路へ向かっている。西階段から外へ出た足跡とは向きが違う。" },
      { id: "cart", label: "サービスカート", x: 56, y: 48, w: 14, h: 24, item: "ticket", zoom: "hallwayCartView", text: "伝票束を見つけた。23:54に暖炉へメニューカード、00:12に発電室へランタン、と記録されている。" },
      { id: "dryingDoor", label: "乾燥室扉", x: 77, y: 30, w: 14, h: 34, zoom: "hallwayDryingDoorView", text: "乾燥室の奥には従業員用の細い通路がある。発電室へ抜けられるが、客用廊下からは見えにくい。" },
      { id: "redLamp", label: "非常灯", x: 47, y: 16, w: 9, h: 9, zoom: "hallwayRedLampView", text: "非常灯は発電室側の系統だけで生きている。停電直後の移動を隠すには十分な暗さだった。" }
    ]
  },
  dining: {
    name: "食堂",
    img: "./assets/game-dining.png",
    intro: "長いテーブルに冷えた皿が残る。壁時計、配膳口、銀皿、破れたラベルが、同じ食事の時間を少しずつ違って語っている。",
    moves: ["lobby", "kitchen", "lounge"],
    people: [],
    spots: [
      { id: "wallClock", label: "壁時計", x: 47, y: 16, w: 10, h: 12, zoom: "diningWallClockView", text: "食堂の壁時計は正常に動いている。西階段の時計だけが十二分遅れていたことになる。" },
      { id: "hatch", label: "配膳口", x: 70, y: 38, w: 14, h: 18, zoom: "diningHatchView", text: "配膳口の奥から厨房へ入れそうだ。ルームサービス伝票を見つけていれば、運搬順を追える。" },
      { id: "wine", label: "破れたラベル", zoom: "diningWineView", x: 30, y: 67, w: 10, h: 9, item: "wineLabel", requires: { items: ["ticket"] }, lockedText: "ラベルの破れ方だけでは意味が読めない。先にルームサービス伝票で食堂に運ばれたものを確認したい。", text: "伝票と照合すると、破れたワインラベルには307の金属札と同じ傷跡がある。鍵束を持った誰かが食堂にいた。" },
      { id: "silver", label: "銀皿", zoom: "diningSilverView", x: 56, y: 70, w: 10, h: 9, item: "dessertPlate", requires: { items: ["wineLabel"] }, lockedText: "銀皿は冷えているだけに見える。食堂に鍵束があった理由を先に追う必要がある。", text: "銀皿の縁が欠けている。手すりの傷と高さが合う。落下ではなく、傷を作るために使われた可能性がある。" }
    ]
  },
  kitchen: {
    name: "厨房",
    img: "./assets/game-kitchen.png",
    intro: "厨房は停電後のまま凍りついている。控え伝票、冷凍庫、配膳台の香辛料が、食堂と発電室をつなぐ。",
    moves: ["dining", "drying", "office"],
    people: [],
    spots: [
      { id: "orders", label: "控え伝票", x: 29, y: 49, w: 13, h: 12, item: "orderSlip", zoom: "kitchenOrdersView", text: "控え伝票には、23:54のメニューカードを鳥居が受け取った印がある。暖炉で燃えた紙片と同じ紙質だ。" },
      { id: "freezer", label: "冷凍庫", x: 76, y: 26, w: 15, h: 32, item: "freezerKey", zoom: "freezerBase", requires: { items: ["orderSlip"] }, lockedText: "冷凍庫の前にはいくつもの足跡が重なっている。先に控え伝票で誰が厨房へ来たか確認したい。", text: "控え伝票の配送時刻と足跡を重ねると、冷凍庫の下に小さな鍵が落ちていることに気づいた。鍵には旧館資料庫の刻印がある。" },
      { id: "spice", label: "香辛料", zoom: "kitchenSpiceView", x: 52, y: 63, w: 10, h: 10, item: "spiceNote", requires: { items: ["freezerKey"] }, lockedText: "香辛料の並びは乱れている。冷凍庫まわりの小鍵が何に使われたか分かれば、順番にも意味が出そうだ。", text: "香辛料の走り書きには、赤、白、黒、白、赤、の順。発電盤の色札と同じ並びだ。" },
      { id: "dumbwaiter", label: "昇降機", x: 10, y: 28, w: 13, h: 24, zoom: "kitchenDumbwaiterView", text: "小型の昇降機は二階サービス通路へつながる。人は通れないが、鍵や伝票なら移動できる。" }
    ]
  },
  office: {
    name: "管理室",
    img: "./assets/game-office.png",
    intro: "狭い管理室。古い端末、鍵棚、館内図、電話。誰かが記録を整え直したあとがある。",
    moves: ["lobby", "kitchen", "archive"],
    people: [],
    spots: [
      { id: "terminal", label: "端末", x: 47, y: 47, w: 16, h: 15, item: "terminalMemo", zoom: "officeTerminalView", text: "端末には仮パスワード SNOW0314 の入力履歴が残る。停電の八分前に客室割が更新されている。" },
      { id: "map", label: "館内図", zoom: "officeMapView", x: 14, y: 28, w: 18, h: 20, item: "staffRoute", requires: { items: ["terminalMemo"] }, lockedText: "館内図は古く、赤い書き込みの意味が分からない。先に端末の更新履歴を確認したい。", text: "端末の更新履歴と照合すると、乾燥室から発電室へ抜ける従業員通路が赤鉛筆で囲まれていることに気づく。" },
      { id: "keys", label: "鍵棚", x: 73, y: 25, w: 12, h: 24, item: "masterKey", zoom: "keyCabinet", requires: { items: ["roomList"] }, lockedText: "鍵棚には番号札が多すぎる。客室割を確認してからでないと、必要な鍵を選べない。", text: "客室割で番号を絞ると、鍵棚の奥に旧館マスターキーが残っていることに気づく。301号室と地下資料庫の扉に使える。" },
      { id: "roomList", label: "客室割", zoom: "officeRoomListView", x: 36, y: 67, w: 12, h: 10, item: "roomList", requires: { items: ["terminalMemo"] }, lockedText: "客室割は何度も上書きされている。端末の履歴を見てから読み直す必要がある。", text: "端末履歴をもとに旧館の客室割を読む。鳥居は201、蓮見は301。307は今夜の宿泊客には割り当てられていない。" }
    ]
  },
  lounge: {
    name: "書斎ラウンジ",
    img: "./assets/game-lounge.png",
    intro: "暖炉のない静かなラウンジ。宿泊者名簿、チェス盤、古い日誌が残されている。",
    moves: ["lobby", "dining", "archive"],
    people: ["hasumi"],
    spots: [
      { id: "guestBook", label: "宿泊者名簿", x: 18, y: 62, w: 14, h: 12, item: "guestBook", zoom: "loungeGuestBookView", text: "名簿の十年前の欄に蓮見岬と鳥居真琴の名が並ぶ。二人は初対面ではない。" },
      { id: "chess", label: "チェス盤", x: 49, y: 69, w: 13, h: 10, item: "chessPiece", zoom: "chessCompartment", requires: { items: ["bellCode"] }, lockedText: "白いナイトの駒だけが逆さだが、どう動かすか分からない。ロビーの呼び鈴の順番が使えそうだ。", text: "呼び鈴の三、二、一の順で棚を叩くと隠し棚が開いた。白いナイトの駒だけが中に残っている。" },
      { id: "diary", label: "破られた日誌", zoom: "loungeDiaryView", x: 70, y: 45, w: 13, h: 14, item: "tornPage", requires: { items: ["chessPiece"] }, lockedText: "日誌の破れ目は棚の奥へ続いている。隠し棚を開ける手がかりが必要だ。", text: "白いナイトの駒を外すと日誌の破れたページが抜けた。西階段の時計は改装後も手動で戻せる、と書かれている。" },
      { id: "portrait", label: "肖像画", x: 38, y: 25, w: 10, h: 18, zoom: "loungePortraitView", text: "肖像画の裏に古い金具がある。呼び鈴と同じ三段式だ。" }
    ]
  },
  westStairs: {
    name: "西階段",
    img: "./assets/corridor-key.png",
    intro: "改装後に閉鎖された西階段。壁の時計は針が少しずれており、床の真鍮鍵だけが光っている。",
    moves: ["hallway", "room301"],
    people: [],
    spots: [
      { id: "clock", label: "壁時計", zoom: "room301ClockView", x: 36, y: 17, w: 14, h: 16, item: "clockMemo", requires: { items: ["tornPage"] }, lockedText: "時計はただ遅れているように見える。書斎の日誌があれば、裏側を疑えるかもしれない。", text: "日誌の記述どおり裏蓋を外すと、十二分戻す、と書かれた小さなメモが貼られている。誰かが時刻を意図的にずらした。" },
      { id: "key", label: "真鍮鍵", zoom: "room301KeyView", x: 55, y: 65, w: 10, h: 10, item: "brassKey", requires: { items: ["clockMemo"] }, lockedText: "真鍮鍵は床にあるが、拾ってよいものか判断できない。先に壁時計の違和感を調べたい。", text: "時計の細工を見たあとで鍵を拾う。真鍮鍵には307の札。鍵そのものは古く、いまの客室番号とは合っていない。" },
      { id: "scratch", label: "手すりの傷", x: 69, y: 36, w: 12, h: 18, zoom: "room301ScratchView", text: "手すりの傷は新しい。銀皿の欠けた縁と高さが合う。転落の跡に見せるための傷だ。" }
    ]
  },
  room301: {
    name: "301号室",
    img: "./assets/game-room301.png",
    intro: "蓮見岬の旧室。月明かりの机、開いたクローゼット、窓辺の写真が残されている。",
    moves: ["lobby", "hallway", "westStairs", "lounge"],
    people: ["hasumi"],
    spots: [
      { id: "ledger", label: "宿泊台帳", zoom: "room301LedgerView", x: 14, y: 61, w: 18, h: 14, item: "ledger", requires: { items: ["roomList"] }, lockedText: "台帳の部屋番号だけでは意味が薄い。管理室の客室割と照合したい。", text: "客室割と照合すると、鳥居の部屋が201、蓮見の旧室が301と分かる。手書きで足された時刻だけ筆圧が深い。" },
      { id: "wardrobe", label: "クローゼット", zoom: "room301WardrobeView", x: 72, y: 22, w: 17, h: 36, item: "coat", requires: { items: ["ledger"] }, lockedText: "クローゼットには複数のコートがある。先にこの部屋が誰のものか確かめたい。", text: "蓮見の旧室だと分かったうえで調べると、黒いコートの繊維が残っている。宿泊者用コートの目印と一致するが、鳥居の襟にも同じ糸がある。" },
      { id: "photo", label: "集合写真", zoom: "room301PhotoView", x: 26, y: 59, w: 8, h: 8, item: "photo", requires: { items: ["oldRegister"] }, lockedText: "写真は古すぎて関係が読めない。地下資料庫で十年前の記録を見つけてから読み直したい。", text: "十年前の宿帳と照合して写真を見る。西階段の先には外扉ではなく、従業員通路へ続く扉が写っている。" },
      { id: "mirror", label: "曇った鏡", x: 42, y: 31, w: 11, h: 19, zoom: "room301MirrorView", text: "鏡の曇りに、0:12ではなく23:60、と指でなぞった跡がある。時刻をまたぐ言い換えだ。" }
    ]
  },
  drying: {
    name: "乾燥室",
    img: "./assets/game-drying.png",
    intro: "湿った布と機械油の匂いがする。床の水は廊下ではなく奥の通路へ続いている。",
    moves: ["hallway", "kitchen", "generator"],
    people: ["clerk"],
    spots: [
      { id: "towel", label: "濡れたタオル", zoom: "dryingTowelView", x: 24, y: 65, w: 13, h: 11, item: "wetTowel", requires: { items: ["menu"] }, lockedText: "タオルはただ濡れている。暖炉で何が燃やされたか分かれば、付着物を疑える。", text: "焦げたメニューカードと同じ灰が付いている。紙片を灰ごと運んだあと、ここで拭ったのだ。" },
      { id: "routeDoor", label: "通路扉", zoom: "dryingRouteDoorView", x: 72, y: 28, w: 15, h: 34, item: "bootMark", requires: { items: ["wetTowel"] }, lockedText: "通路扉の下は暗い。灰の移動先をつかめば、床の跡にも意味が出そうだ。", text: "通路扉の下に長靴の泥跡がある。宿泊客用スリッパでは残らない跡だ。" },
      { id: "fuseBox", label: "小配電箱", zoom: "dryingFuseBoxView", x: 51, y: 31, w: 10, h: 18, item: "fuse", requires: { items: ["staffRoute"] }, lockedText: "小配電箱は触るには危険だ。管理室の館内図で、この系統がどこへ続くか確認したい。", text: "館内図で系統を確認してから開ける。外されたヒューズレバーを見つけた。発電室の配電盤に戻せそうだ。" },
      { id: "linen", label: "リネン棚", x: 8, y: 38, w: 13, h: 22, zoom: "dryingLinenView", text: "リネン棚には黒いコートを隠せる空きがある。鳥居のコートから落ちた繊維とつながる。" }
    ]
  },
  archive: {
    name: "地下資料庫",
    img: "./assets/game-archive.png",
    intro: "古い宿帳と箱が積まれた地下資料庫。十年前の事故と今夜の停電が、同じ棚に眠っている。",
    moves: ["office", "lounge", "generator"],
    people: [],
    spots: [
      { id: "register", label: "古い宿帳", zoom: "archiveRegisterView", x: 21, y: 60, w: 16, h: 13, item: "oldRegister", requires: { items: ["freezerKey"] }, lockedText: "宿帳の棚は錆びた小鍵で閉じられている。厨房で鍵を探す必要がある。", text: "冷凍庫下の小鍵で棚が開く。十年前の宿帳には、蓮見が西階段の事故を隠したのではなく、鳥居をかばった記録がある。" },
      { id: "cabinet", label: "金属棚", x: 69, y: 31, w: 14, h: 28, item: "metalTag", zoom: "archiveBox", requires: { items: ["oldRegister"] }, lockedText: "金属棚には番号だけが並ぶ。十年前の宿帳を読まないと、どれを開けるべきか分からない。", text: "宿帳の保管箱番号を追うと、金属棚から307の札が見つかる。いま夜の部屋ではなく、十年前の保管箱番号だった。" },
      { id: "cables", label: "系統図", zoom: "archiveCablesView", x: 46, y: 42, w: 14, h: 16, item: "cableMap", requires: { items: ["metalTag", "spiceNote"] }, lockedText: "系統図の色札は外されている。307の金属札と厨房の色順がそろえば読めそうだ。", text: "307の札を基準に、厨房の赤、白、黒、白、赤を合わせる。発電系統図には、乾燥室と発電室の非常灯だけを残す切替手順が書かれている。" },
      { id: "ski", label: "壊れたスキー板", x: 8, y: 72, w: 14, h: 10, zoom: "archiveSkiView", text: "古いスキー板の金具が銀皿と同じ形に曲がっている。手すりの傷は事故の再現に使われた。" }
    ]
  },
  generator: {
    name: "発電室",
    img: "./assets/game-generator.png",
    intro: "発電機と外扉。床にはランタンと雪のかけらが残る。吹き込んだ雪なら、扉の外側にも乱れがあるはずだ。",
    moves: ["hallway", "drying", "archive"],
    people: [],
    spots: [
      { id: "panel", label: "配電盤", x: 44, y: 23, w: 13, h: 22, zoom: "generatorPanel", requires: { items: ["fuse", "spiceNote", "cableMap"] }, lockedText: "配電盤は色札が外れている。ヒューズレバー、色の順番、系統図がそろわないと戻せない。", text: "ヒューズレバーを戻し、赤、白、黒、白、赤の順に札を合わせると非常灯が安定した。" },
      { id: "door", label: "外扉", zoom: "generatorDoorView", x: 72, y: 20, w: 18, h: 37, item: "snow", requires: { items: ["lantern"], flags: ["spot:panel"] }, lockedText: "外扉の足元はまだ暗い。ランタンだけでなく、配電盤を復旧して非常灯を安定させたい。", text: "ランタンと非常灯で照らすと、外扉の雪は内側だけ崩れている。蓮見がここから外へ出たという説明は成り立たない。" },
      { id: "lantern", label: "ランタン", x: 79, y: 70, w: 10, h: 12, item: "lantern", zoom: "generatorLanternView", text: "煤けたランタン。伝票にある00:12の発電室配送と一致する。ランタンを運んだ人物は停電後にここへ来ている。" },
      { id: "switch", label: "切替スイッチ", x: 30, y: 36, w: 10, h: 16, zoom: "generatorSwitchView", text: "切替スイッチは館内全体ではなく、乾燥室と発電室だけを残す位置で止まっている。" }
    ]
  }
};

const people = {
  torii: {
    name: "鳥居真琴",
    img: "./assets/char-torii.png",
    talk: "蓮見さんは西階段へ向かった。私はそれを見ただけです。停電でみんな混乱していたでしょう。",
    show: {
      coat: "それは私のコートです。でも停電の夜に着ていたとは限りません。誰にでも触れますから。",
      menu: "暖炉の灰から？ そんなもの、蓮見さんが最後に触っていたのでしょう。私に見せる理由が分かりません。",
      clockMemo: "十二分……。そんな細工、私ならもっと上手く隠します。いえ、変な意味ではありません。",
      oldRegister: "十年前の話を今さら持ち出すのですか。蓮見さんは、私をかばった。だから今度は私が終わらせるつもりでした。",
      metalTag: "307は部屋番号ではない？ そこまで見たなら、もう私の話だけでは止められませんね。"
    }
  },
  clerk: {
    name: "夜勤係 直人",
    img: "./assets/char-clerk.png",
    talk: "玄関は停電中も開きません。館内を抜けるなら乾燥室の奥です。ただ、あの通路を知っている客はほとんどいません。",
    show: {
      ticket: "00:12の発電室配送は僕の字ではありません。ランタンを持って行ったのは別の人です。",
      footprint: "足跡は乾燥室からですね。西階段から外へ、という話とは向きが逆です。",
      envelope: "SNOW0314なら管理室端末が開きます。鳥居さんがあなたを呼んだなら、試してほしかったのでしょう。",
      wetTowel: "このタオルは乾燥室のものです。暖炉の灰が付くなら、灰を運んだ人がここを通ったはずです。",
      bootMark: "これは従業員長靴の跡です。鳥居さんは夕方、雪かき用の長靴を借りていました。"
    }
  },
  hasumi: {
    name: "蓮見岬",
    img: "./assets/char-hasumi.png",
    talk: "私は外へ出ていない。あの夜と同じように、誰かが時刻と道をすり替えた。西階段の先だけを信じてはいけない。",
    show: {
      photo: "そう。十年前の西階段は外へ出る道ではなかった。あの写真を見れば、今夜の嘘も分かる。",
      ledger: "台帳の時刻は後から足されたもの。誰かが私の部屋を、都合のよい物語に変えた。",
      menu: "暖炉で消そうとしたのは、私が触れたものではなく、時刻を戻した証拠。火はいつも遅れて嘘を燃やす。",
      guestBook: "鳥居は私を憎んでいる。けれど十年前、私が隠したのは罪ではなく、彼女が壊れないための名前だった。",
      oldRegister: "宿帳を見つけたなら、今夜の失踪が復讐だけではないことも分かる。鳥居は私を外へ出したかったのではなく、過去を同じ形で閉じたかった。"
    }
  }
};

const state = {
  scene: "lobby",
  items: new Set(),
  flags: new Set(),
  selected: null,
  started: false,
  spotHint: false,
  activeTab: "move"
};

function save() {
  localStorage.setItem("FubukiHotelAdventure", JSON.stringify({
    scene: state.scene,
    items: [...state.items],
    flags: [...state.flags],
    selected: state.selected,
    started: state.started,
    spotHint: state.spotHint,
    activeTab: state.activeTab
  }));
}

function load() {
  try {
    const data = JSON.parse(localStorage.getItem("FubukiHotelAdventure") || "{}");
    if (data.scene && scenes[data.scene]) state.scene = data.scene;
    if (Array.isArray(data.items)) state.items = new Set(data.items);
    if (Array.isArray(data.flags)) state.flags = new Set(data.flags);
    if (data.selected) state.selected = data.selected;
    if (data.started) state.started = true;
    if (typeof data.spotHint === "boolean") state.spotHint = data.spotHint;
    if (data.activeTab) state.activeTab = data.activeTab;
  } catch {
    localStorage.removeItem("FubukiHotelAdventure");
  }
}

function addLog(text) {
  qs("log").innerHTML = `<div>${text}</div>` + qs("log").innerHTML;
}

function speak(speaker, text, img) {
  qs("speaker").textContent = speaker;
  qs("dialogText").textContent = text;
  const char = qs("charImg");
  if (img) {
    char.src = img;
    char.classList.add("show");
  } else {
    char.classList.remove("show");
  }
}

function canEnter(id) {
  return !locks[id] || locks[id]();
}

function meetsRequirement(requirement) {
  if (!requirement) return true;
  const itemsOk = !requirement.items || requirement.items.every((id) => state.items.has(id));
  const flagsOk = !requirement.flags || requirement.flags.every((id) => state.flags.has(id));
  return itemsOk && flagsOk;
}

function evidenceCount() {
  const required = ["menu", "footprint", "clockMemo", "ledger", "coat", "photo", "snow", "oldRegister", "cableMap", "staffRoute", "ticket", "metalTag"];
  return required.filter((id) => state.items.has(id)).length;
}

function objectiveText() {
  if (!state.items.has("envelope")) return "フロント周辺を調べ、依頼人が残した封筒を見つける。";
  if (!state.items.has("pass")) return "封筒の内容を手がかりに、フロントと管理室への入り方を確かめる。";
  if (!state.items.has("ticket")) return "二階廊下と食堂を調べ、暖炉に残された時刻の手がかりを追う。";
  if (!state.items.has("staffRoute")) return "管理室の端末と館内図から、客用ではない移動経路を探す。";
  if (!state.items.has("masterKey")) return "旧館の客室割と鍵棚を照合し、閉ざされた部屋へ入る手段を得る。";
  if (!state.items.has("oldRegister")) return "書斎ラウンジと地下資料庫をつなぎ、十年前の宿帳を探す。";
  if (!state.items.has("cableMap")) return "乾燥室と資料庫で、停電後に残った発電系統の痕跡を集める。";
  if (!state.flags.has("spot:panel")) return "発電室の配電盤を復旧し、外扉の足元を照らせる状態にする。";
  if (!state.items.has("snow")) return "安定した非常灯とランタンで、外へ出たように見せた雪跡の正体を確かめる。";
  return `証拠はかなり揃った。推理タブで、人物・経路・時刻・隠した証拠を一文にまとめる。重要証拠 ${evidenceCount()} / 12`;
}

function syncTabs() {
  document.querySelectorAll(".side-tab").forEach((button) => {
    button.classList.toggle("active", button.dataset.tab === state.activeTab);
  });
  document.querySelectorAll(".tab-panel").forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.panel === state.activeTab);
  });
}

function render(keepSpeech = false) {
  const scene = scenes[state.scene];
  qs("sceneImg").src = scene.img;
  if (!keepSpeech) speak(scene.name, scene.intro, null);
  qs("sceneCard").classList.toggle("show-hotspots", state.spotHint);
  qs("spotHintBtn").textContent = state.spotHint ? "調査ヒント ON" : "調査ヒント OFF";
  qs("objectiveText").textContent = objectiveText();
  qs("hotspots").innerHTML = scene.spots.map((spot) => (
    `<button class="hotspot" title="${spot.label}" aria-label="${spot.label}" style="left:${spot.x}%;top:${spot.y}%;width:${spot.w}%;height:${spot.h}%" onclick="inspectSpot('${spot.id}')"></button>`
  )).join("");
  qs("moves").innerHTML = Object.entries(scenes).map(([id, target]) => {
    const linked = id === state.scene || scene.moves.includes(id);
    const open = linked && canEnter(id);
    return `<button class="nav-btn ${id === state.scene ? "active" : ""}" onclick="moveTo('${id}')" ${open ? "" : "disabled"}>${target.name}</button>`;
  }).join("");
  renderInventory();
  renderPeople();
  syncTabs();
  save();
}

function renderInventory() {
  const items = [...state.items];
  qs("inventory").innerHTML = items.length
    ? items.map((id) => `<div class="item"><span>${itemNames[id]}</span><button onclick="inspectItem('${id}')">調べる</button><button onclick="selectItem('${id}')">${state.selected === id ? "選択中" : "見せる"}</button></div>`).join("")
    : "<p class='small'>まだ何も持っていない。</p>";
}

function renderPeople() {
  const scene = scenes[state.scene];
  qs("people").innerHTML = scene.people.length
    ? scene.people.map((id) => {
      const person = people[id];
      return `<div class="suspect"><img src="${person.img}" alt=""><div><strong>${person.name}</strong><button onclick="talk('${id}')">話す</button><button onclick="showItem('${id}')">見せる</button></div></div>`;
    }).join("")
    : "<p class='small'>近くに話せる人物はいない。</p>";
}

function moveTo(id) {
  if (!scenes[state.scene].moves.includes(id) && id !== state.scene) return;
  if (!canEnter(id)) {
    speak("扉", lockMessages[id] || "まだ進めない。", null);
    playSound("lock");
    return;
  }
  state.scene = id;
  render();
  addLog(`${scenes[id].name}へ移動した。`);
  playSound("move");
}

function inspectSpot(id) {
  const spot = scenes[state.scene].spots.find((entry) => entry.id === id);
  if (!spot) return;
  if (!meetsRequirement(spot.requires)) {
    speak(spot.label, spot.lockedText || "今はまだ詳しく調べられない。別の手がかりを集めてから戻ろう。", null);
    state.flags.add(`locked:${id}`);
    playSound("lock");
    save();
    return;
  }
  if (spot.zoom && !state.flags.has(`zoom:${spot.id}`)) {
    openZoom(spot);
    return;
  }
  collectSpot(spot);
}

function collectSpot(spot, detailText = null) {
  if (spot.item && !state.items.has(spot.item)) {
    state.items.add(spot.item);
    addLog(`${itemNames[spot.item]}を入手した。`);
    playSound("item");
  } else {
    playSound("click");
  }
  state.flags.add(`spot:${spot.id}`);
  speak(spot.label, detailText || spot.text, null);
  renderInventory();
  render(true);
}

function openZoom(spot) {
  const zoom = zoomDetails[spot.zoom];
  if (!zoom) {
    collectSpot(spot);
    return;
  }
  pendingZoomSpot = spot;
  qs("zoomImg").src = zoom.img;
  qs("zoomTitle").textContent = zoom.title;
  qs("zoomText").textContent = zoom.text;
  qs("zoomMsg").textContent = "";
  qs("zoomAnswer").value = "";
  const hasPuzzle = Array.isArray(zoom.answers) && zoom.answers.length > 0;
  qs("zoomPuzzle").classList.toggle("hidden", !hasPuzzle);
  qs("zoomPrompt").textContent = zoom.prompt || "";
  qs("zoomModal").classList.remove("hidden");
  qs("zoomModal").setAttribute("aria-hidden", "false");
  state.flags.add(`inspect:${spot.id}`);
  playSound("page");
  if (!hasPuzzle) {
    state.flags.add(`zoom:${spot.id}`);
    collectSpot(spot, zoom.success || spot.text);
  } else {
    setTimeout(() => qs("zoomAnswer").focus(), 0);
  }
  save();
}

function closeZoom() {
  qs("zoomModal").classList.add("hidden");
  qs("zoomModal").setAttribute("aria-hidden", "true");
  pendingZoomSpot = null;
}

function submitZoomAnswer() {
  if (!pendingZoomSpot) return;
  const zoom = zoomDetails[pendingZoomSpot.zoom];
  const answer = normalize(qs("zoomAnswer").value);
  const ok = zoom.answers.some((entry) => normalize(entry) === answer);
  if (!ok) {
    qs("zoomMsg").textContent = "まだ違う。アップ画像と手元の資料をもう一度照合しよう。";
    playSound("bad");
    return;
  }
  state.flags.add(`zoom:${pendingZoomSpot.id}`);
  qs("zoomMsg").textContent = "合っている。仕掛けが動いた。";
  collectSpot(pendingZoomSpot, zoom.success || pendingZoomSpot.text);
  playSound("solve");
  setTimeout(closeZoom, 450);
}

function selectItem(id) {
  state.selected = state.selected === id ? null : id;
  renderInventory();
  save();
  playSound("click");
}

function inspectItem(id) {
  state.selected = id;
  state.flags.add(`inspect:${id}`);
  speak(itemNames[id], itemDetails[id] || "手に入れた品を詳しく見た。別の場所や人物に見せると意味が変わるかもしれない。", null);
  addLog(`${itemNames[id]}を調べた。`);
  renderInventory();
  save();
  playSound("page");
}

function talk(id) {
  const person = people[id];
  speak(person.name, person.talk, person.img);
  state.flags.add(`talk:${id}`);
  addLog(`${person.name}と話した。`);
  save();
  playSound("talk");
}

function showItem(id) {
  const person = people[id];
  if (!state.selected) {
    speak(person.name, "見せるものを持ち物から選んでください。", person.img);
    playSound("lock");
    return;
  }
  const line = person.show[state.selected] || "それについて、今は答えられることがありません。";
  speak(person.name, line, person.img);
  state.flags.add(`show:${id}:${state.selected}`);
  addLog(`${person.name}に${itemNames[state.selected]}を見せた。`);
  render(true);
  playSound("talk");
}

function hint() {
  playSound("page");
  if (state.items.size < 8) {
    speak("状況整理", "まずはロビー、食堂、二階廊下、書斎ラウンジを回り、封筒、伝票、名簿、暖炉の灰を集めよう。管理室パスで行ける場所が増える。", null);
  } else if (!state.items.has("masterKey")) {
    speak("状況整理", "管理室の端末、鍵棚、館内図を調べよう。客室割と従業員通路が、部屋と移動の嘘を分けてくれる。", null);
  } else if (!state.items.has("staffRoute") || !state.flags.has("show:clerk:footprint")) {
    speak("状況整理", "濡れた足跡を夜勤係に見せると、乾燥室と従業員通路の意味が変わる。", null);
  } else if (!state.items.has("oldRegister")) {
    speak("状況整理", "書斎の呼び鈴の順番、チェス盤、管理室のマスターキーをつなげると地下資料庫へ進める。", null);
  } else {
    speak("状況整理", "西階段の十二分、暖炉のメニューカード、乾燥室の灰、外扉の雪跡、十年前の宿帳をまとめる。鳥居が作ったのは脱出経路ではなく、外へ出たように見える物語だ。", null);
  }
}

function toggleSpotHint() {
  state.spotHint = !state.spotHint;
  render(true);
  save();
  playSound("page");
}

function normalize(text) {
  return String(text || "").replace(/\s/g, "").toLowerCase();
}

function submitFinal() {
  const answer = normalize(qs("finalAnswer").value);
  const required = ["menu", "footprint", "clockMemo", "ledger", "coat", "photo", "snow", "oldRegister", "cableMap", "staffRoute", "ticket", "metalTag"];
  const enoughEvidence = required.every((id) => state.items.has(id));
  const namedCulprit = answer.includes("鳥居");
  const usedRoute = answer.includes("西階段") && (answer.includes("乾燥室") || answer.includes("従業員通路"));
  const timeTrick = answer.includes("十二分") || answer.includes("12分") || answer.includes("時刻") || answer.includes("時計");
  const burnedEvidence = answer.includes("暖炉") || answer.includes("メニュー");
  const motive = answer.includes("十年前") || answer.includes("宿帳") || answer.includes("過去");
  const ok = enoughEvidence && namedCulprit && usedRoute && timeTrick && burnedEvidence && motive;
  qs("finalMsg").textContent = ok
    ? "正解。鳥居は西階段と時刻を使って蓮見が外へ出たように見せ、乾燥室と従業員通路で移動し、暖炉で時刻の証拠を消そうとした。十年前の宿帳が、動機と二人の関係を示している。"
    : "まだ証拠か説明が足りない。人物、移動経路、西階段の時刻、暖炉で消された証拠、十年前の関係を入れてください。";
  qs("finalMsg").className = ok ? "ok" : "ng";
  qs("ending").classList.toggle("show", ok);
  playSound(ok ? "solve" : "bad");
}

function resetGame() {
  localStorage.removeItem("FubukiHotelAdventure");
  state.scene = "lobby";
  state.items = new Set();
  state.flags = new Set();
  state.selected = null;
  state.started = false;
  state.spotHint = false;
  state.activeTab = "move";
  qs("log").innerHTML = "";
  qs("finalAnswer").value = "";
  qs("finalMsg").textContent = "";
  qs("ending").classList.remove("show");
  qs("zoomModal").classList.add("hidden");
  qs("zoomModal").setAttribute("aria-hidden", "true");
  pendingZoomSpot = null;
  qs("startModal").classList.remove("hidden");
  qs("storyModal").classList.add("hidden");
  render();
  playSound("page");
}

document.addEventListener("DOMContentLoaded", () => {
  load();
  qs("startStory").addEventListener("click", () => {
    ensureAudio();
    qs("startModal").classList.add("hidden");
    qs("storyModal").classList.remove("hidden");
    storyIndex = 0;
    renderStory();
    playSound("page");
  });
  qs("storyNext").addEventListener("click", () => {
    ensureAudio();
    if (storyIndex < storySlides.length - 1) {
      storyIndex += 1;
      renderStory();
      playSound("page");
    } else {
      enterGame();
    }
  });
  qs("hintBtn").addEventListener("click", hint);
  qs("spotHintBtn").addEventListener("click", toggleSpotHint);
  qs("resetGame").addEventListener("click", resetGame);
  qs("submitFinal").addEventListener("click", submitFinal);
  qs("zoomClose").addEventListener("click", closeZoom);
  qs("zoomSubmit").addEventListener("click", submitZoomAnswer);
  qs("zoomAnswer").addEventListener("keydown", (event) => {
    if (event.key === "Enter") submitZoomAnswer();
  });
  document.querySelectorAll(".side-tab").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeTab = button.dataset.tab;
      syncTabs();
      save();
      playSound("page");
    });
  });
  if (state.started) {
    qs("startModal").classList.add("hidden");
    qs("storyModal").classList.add("hidden");
  }
  render();
});
