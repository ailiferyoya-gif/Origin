const qs = (id) => document.getElementById(id);

let audioCtx = null;
let storyIndex = 0;

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
      { id: "gate", label: "雪の門", x: 42, y: 62, w: 18, h: 14, text: "門は雪で押し固められている。人が通れば崩れた跡が残るはずだが、表面はなめらかなままだ。" },
      { id: "window", label: "二階の明かり", x: 52, y: 31, w: 10, h: 12, text: "二階西側の窓だけ、停電のあとも短く明滅したらしい。発電室につながる非常灯かもしれない。" },
      { id: "snowbank", label: "雪だまり", x: 18, y: 70, w: 13, h: 12, text: "雪だまりには館内から捨てられた灰が混ざっている。暖炉で燃やした紙片が、あとで外へ運ばれた可能性がある。" }
    ]
  },
  lobby: {
    name: "ロビー",
    img: "./assets/game-lobby.png",
    intro: "暖炉の火が弱く揺れている。フロントには封筒、壁には古い掲示物、奥には二階へ続く階段がある。",
    moves: ["exterior", "hallway", "dining", "lounge", "office", "room301"],
    people: ["torii"],
    spots: [
      { id: "envelope", label: "封筒", x: 71, y: 72, w: 10, h: 9, item: "envelope", text: "封筒には仮パスワード SNOW0314 と、307号室の鍵についての走り書きがある。差出人は鳥居真琴。" },
      { id: "fireplace", label: "暖炉", x: 6, y: 53, w: 16, h: 18, item: "menu", text: "灰の中から焦げたメニューカードを拾う。鳥居、午前零時、献立を戻すな、という文字だけが残っている。" },
      { id: "desk", label: "フロント", x: 52, y: 56, w: 14, h: 16, item: "pass", text: "フロントの引き出しに管理室パスが残されている。停電時の非常灯で赤く照らされていたらしい。" },
      { id: "notice", label: "掲示板", x: 28, y: 70, w: 12, h: 10, item: "clipping", text: "古い新聞切り抜き。十年前、改装前の西階段で宿泊客が転落した記事だ。関係者の名前に蓮見岬がある。" },
      { id: "bell", label: "呼び鈴", x: 62, y: 45, w: 8, h: 8, item: "bellCode", text: "呼び鈴は三回、二回、一回の順で打つと音が違う。書斎の棚に同じ三段の金具がある。" }
    ]
  },
  hallway: {
    name: "二階廊下",
    img: "./assets/game-hallway.png",
    intro: "非常灯が赤く滲む廊下。乾燥室、サービスカート、西階段へ続く扉が見える。",
    moves: ["lobby", "westStairs", "room301", "drying", "generator"],
    people: ["clerk"],
    spots: [
      { id: "prints", label: "足跡", x: 36, y: 68, w: 18, h: 14, item: "footprint", text: "濡れた足跡は乾燥室から従業員通路へ向かっている。西階段から外へ出た足跡とは向きが違う。" },
      { id: "cart", label: "サービスカート", x: 56, y: 48, w: 14, h: 24, item: "ticket", text: "伝票束を見つけた。23:54に暖炉へメニューカード、00:12に発電室へランタン、と記録されている。" },
      { id: "dryingDoor", label: "乾燥室扉", x: 77, y: 30, w: 14, h: 34, text: "乾燥室の奥には従業員用の細い通路がある。発電室へ抜けられるが、客用廊下からは見えにくい。" },
      { id: "redLamp", label: "非常灯", x: 47, y: 16, w: 9, h: 9, text: "非常灯は発電室側の系統だけで生きている。停電直後の移動を隠すには十分な暗さだった。" }
    ]
  },
  dining: {
    name: "食堂",
    img: "./assets/game-dining.png",
    intro: "長いテーブルに冷えた皿が残る。壁時計、配膳口、銀皿、破れたラベルが、同じ食事の時間を少しずつ違って語っている。",
    moves: ["lobby", "kitchen", "lounge"],
    people: [],
    spots: [
      { id: "wallClock", label: "壁時計", x: 47, y: 16, w: 10, h: 12, text: "食堂の壁時計は正常に動いている。西階段の時計だけが十二分遅れていたことになる。" },
      { id: "hatch", label: "配膳口", x: 70, y: 38, w: 14, h: 18, text: "配膳口の奥から厨房へ入れそうだ。ルームサービス伝票を見つけていれば、運搬順を追える。" },
      { id: "wine", label: "破れたラベル", x: 30, y: 67, w: 10, h: 9, item: "wineLabel", text: "破れたワインラベルには307の金属札と同じ傷跡がある。鍵束を持った誰かが食堂にいた。" },
      { id: "silver", label: "銀皿", x: 56, y: 70, w: 10, h: 9, item: "dessertPlate", text: "銀皿の縁が欠けている。手すりの傷と高さが合う。落下ではなく、傷を作るために使われた可能性がある。" }
    ]
  },
  kitchen: {
    name: "厨房",
    img: "./assets/game-kitchen.png",
    intro: "厨房は停電後のまま凍りついている。控え伝票、冷凍庫、配膳台の香辛料が、食堂と発電室をつなぐ。",
    moves: ["dining", "drying", "office"],
    people: [],
    spots: [
      { id: "orders", label: "控え伝票", x: 29, y: 49, w: 13, h: 12, item: "orderSlip", text: "控え伝票には、23:54のメニューカードを鳥居が受け取った印がある。暖炉で燃えた紙片と同じ紙質だ。" },
      { id: "freezer", label: "冷凍庫", x: 76, y: 26, w: 15, h: 32, item: "freezerKey", text: "冷凍庫の足元に小さな鍵が落ちている。鍵には旧館資料庫の刻印がある。" },
      { id: "spice", label: "香辛料", x: 52, y: 63, w: 10, h: 10, item: "spiceNote", text: "香辛料の走り書きには、赤、白、黒、白、赤、の順。発電盤の色札と同じ並びだ。" },
      { id: "dumbwaiter", label: "昇降機", x: 10, y: 28, w: 13, h: 24, text: "小型の昇降機は二階サービス通路へつながる。人は通れないが、鍵や伝票なら移動できる。" }
    ]
  },
  office: {
    name: "管理室",
    img: "./assets/game-office.png",
    intro: "狭い管理室。古い端末、鍵棚、館内図、電話。誰かが記録を整え直したあとがある。",
    moves: ["lobby", "kitchen", "archive"],
    people: [],
    spots: [
      { id: "terminal", label: "端末", x: 47, y: 47, w: 16, h: 15, item: "terminalMemo", text: "端末には仮パスワード SNOW0314 の入力履歴が残る。停電の八分前に客室割が更新されている。" },
      { id: "map", label: "館内図", x: 14, y: 28, w: 18, h: 20, item: "staffRoute", text: "館内図には乾燥室から発電室へ抜ける従業員通路が赤鉛筆で囲まれている。" },
      { id: "keys", label: "鍵棚", x: 73, y: 25, w: 12, h: 24, item: "masterKey", text: "鍵棚の奥に旧館マスターキーが残っている。301号室と地下資料庫の扉に使える。" },
      { id: "roomList", label: "客室割", x: 36, y: 67, w: 12, h: 10, item: "roomList", text: "旧館の客室割。鳥居は201、蓮見は301。307は今夜の宿泊客には割り当てられていない。" }
    ]
  },
  lounge: {
    name: "書斎ラウンジ",
    img: "./assets/game-lounge.png",
    intro: "暖炉のない静かなラウンジ。宿泊者名簿、チェス盤、古い日誌が残されている。",
    moves: ["lobby", "dining", "archive"],
    people: ["hasumi"],
    spots: [
      { id: "guestBook", label: "宿泊者名簿", x: 18, y: 62, w: 14, h: 12, item: "guestBook", text: "名簿の十年前の欄に蓮見岬と鳥居真琴の名が並ぶ。二人は初対面ではない。" },
      { id: "chess", label: "チェス盤", x: 49, y: 69, w: 13, h: 10, item: "chessPiece", text: "白いナイトの駒だけが逆さに置かれている。呼び鈴の三、二、一の順で棚を叩くと隠し棚が開いた。" },
      { id: "diary", label: "破られた日誌", x: 70, y: 45, w: 13, h: 14, item: "tornPage", text: "破られた日誌には、西階段の時計は改装後も手動で戻せる、と書かれている。" },
      { id: "portrait", label: "肖像画", x: 38, y: 25, w: 10, h: 18, text: "肖像画の裏に古い金具がある。呼び鈴と同じ三段式だ。" }
    ]
  },
  westStairs: {
    name: "西階段",
    img: "./assets/corridor-key.png",
    intro: "改装後に閉鎖された西階段。壁の時計は針が少しずれており、床の真鍮鍵だけが光っている。",
    moves: ["hallway", "room301"],
    people: [],
    spots: [
      { id: "clock", label: "壁時計", x: 36, y: 17, w: 14, h: 16, item: "clockMemo", text: "時計の裏に、十二分戻す、と書かれた小さなメモが貼られている。誰かが時刻を意図的にずらした。" },
      { id: "key", label: "真鍮鍵", x: 55, y: 65, w: 10, h: 10, item: "brassKey", text: "真鍮鍵には307の札。鍵そのものは古く、いまの客室番号とは合っていない。" },
      { id: "scratch", label: "手すりの傷", x: 69, y: 36, w: 12, h: 18, text: "手すりの傷は新しい。銀皿の欠けた縁と高さが合う。転落の跡に見せるための傷だ。" }
    ]
  },
  room301: {
    name: "301号室",
    img: "./assets/game-room301.png",
    intro: "蓮見岬の旧室。月明かりの机、開いたクローゼット、窓辺の写真が残されている。",
    moves: ["lobby", "hallway", "westStairs", "lounge"],
    people: ["hasumi"],
    spots: [
      { id: "ledger", label: "宿泊台帳", x: 14, y: 61, w: 18, h: 14, item: "ledger", text: "台帳には、鳥居の部屋が201、蓮見の旧室が301とある。手書きで足された時刻だけ筆圧が深い。" },
      { id: "wardrobe", label: "クローゼット", x: 72, y: 22, w: 17, h: 36, item: "coat", text: "黒いコートの繊維が残っている。宿泊者用コートの目印と一致するが、鳥居の襟にも同じ糸がある。" },
      { id: "photo", label: "集合写真", x: 26, y: 59, w: 8, h: 8, item: "photo", text: "十年前の改装前写真。西階段の先には外扉ではなく、従業員通路へ続く扉が写っている。" },
      { id: "mirror", label: "曇った鏡", x: 42, y: 31, w: 11, h: 19, text: "鏡の曇りに、0:12ではなく23:60、と指でなぞった跡がある。時刻をまたぐ言い換えだ。" }
    ]
  },
  drying: {
    name: "乾燥室",
    img: "./assets/game-drying.png",
    intro: "湿った布と機械油の匂いがする。床の水は廊下ではなく奥の通路へ続いている。",
    moves: ["hallway", "kitchen", "generator"],
    people: ["clerk"],
    spots: [
      { id: "towel", label: "濡れたタオル", x: 24, y: 65, w: 13, h: 11, item: "wetTowel", text: "濡れたタオルに暖炉の灰が付いている。紙片を灰ごと運んだあと、ここで拭ったのだ。" },
      { id: "routeDoor", label: "通路扉", x: 72, y: 28, w: 15, h: 34, item: "bootMark", text: "通路扉の下に長靴の泥跡がある。宿泊客用スリッパでは残らない跡だ。" },
      { id: "fuseBox", label: "小配電箱", x: 51, y: 31, w: 10, h: 18, item: "fuse", text: "小配電箱から外されたヒューズレバーを見つける。発電室の配電盤に戻せそうだ。" },
      { id: "linen", label: "リネン棚", x: 8, y: 38, w: 13, h: 22, text: "リネン棚には黒いコートを隠せる空きがある。鳥居のコートから落ちた繊維とつながる。" }
    ]
  },
  archive: {
    name: "地下資料庫",
    img: "./assets/game-archive.png",
    intro: "古い宿帳と箱が積まれた地下資料庫。十年前の事故と今夜の停電が、同じ棚に眠っている。",
    moves: ["office", "lounge", "generator"],
    people: [],
    spots: [
      { id: "register", label: "古い宿帳", x: 21, y: 60, w: 16, h: 13, item: "oldRegister", text: "十年前の宿帳には、蓮見が西階段の事故を隠したのではなく、鳥居をかばった記録がある。" },
      { id: "cabinet", label: "金属棚", x: 69, y: 31, w: 14, h: 28, item: "metalTag", text: "金属棚から307の札が見つかる。いま夜の部屋ではなく、十年前の保管箱番号だった。" },
      { id: "cables", label: "系統図", x: 46, y: 42, w: 14, h: 16, item: "cableMap", text: "発電系統図には、乾燥室と発電室の非常灯だけを残す切替手順が書かれている。" },
      { id: "ski", label: "壊れたスキー板", x: 8, y: 72, w: 14, h: 10, text: "古いスキー板の金具が銀皿と同じ形に曲がっている。手すりの傷は事故の再現に使われた。" }
    ]
  },
  generator: {
    name: "発電室",
    img: "./assets/game-generator.png",
    intro: "発電機と外扉。床にはランタンと雪のかけらが残る。吹き込んだ雪なら、扉の外側にも乱れがあるはずだ。",
    moves: ["hallway", "drying", "archive"],
    people: [],
    spots: [
      { id: "panel", label: "配電盤", x: 44, y: 23, w: 13, h: 22, item: "fuse", text: "外れたヒューズレバーを戻す。赤、白、黒、白、赤の順に札を合わせると非常灯が安定した。" },
      { id: "door", label: "外扉", x: 72, y: 20, w: 18, h: 37, item: "snow", text: "外扉の雪は内側だけ崩れている。蓮見がここから外へ出たという説明は成り立たない。" },
      { id: "lantern", label: "ランタン", x: 79, y: 70, w: 10, h: 12, item: "lantern", text: "煤けたランタン。伝票にある00:12の発電室配送と一致する。ランタンを運んだ人物は停電後にここへ来ている。" },
      { id: "switch", label: "切替スイッチ", x: 30, y: 36, w: 10, h: 16, text: "切替スイッチは館内全体ではなく、乾燥室と発電室だけを残す位置で止まっている。" }
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
  spotHint: false
};

function save() {
  localStorage.setItem("FubukiHotelAdventure", JSON.stringify({
    scene: state.scene,
    items: [...state.items],
    flags: [...state.flags],
    selected: state.selected,
    started: state.started,
    spotHint: state.spotHint
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

function render(keepSpeech = false) {
  const scene = scenes[state.scene];
  qs("sceneImg").src = scene.img;
  if (!keepSpeech) speak(scene.name, scene.intro, null);
  qs("sceneCard").classList.toggle("show-hotspots", state.spotHint);
  qs("spotHintBtn").textContent = state.spotHint ? "調査ヒント ON" : "調査ヒント OFF";
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
  save();
}

function renderInventory() {
  const items = [...state.items];
  qs("inventory").innerHTML = items.length
    ? items.map((id) => `<div class="item"><span>${itemNames[id]}</span><button onclick="selectItem('${id}')">${state.selected === id ? "選択中" : "持つ"}</button></div>`).join("")
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
  if (spot.item && !state.items.has(spot.item)) {
    state.items.add(spot.item);
    addLog(`${itemNames[spot.item]}を入手した。`);
    playSound("item");
  } else {
    playSound("click");
  }
  state.flags.add(`spot:${id}`);
  speak(spot.label, spot.text, null);
  renderInventory();
  render(true);
}

function selectItem(id) {
  state.selected = state.selected === id ? null : id;
  renderInventory();
  save();
  playSound("click");
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
  qs("log").innerHTML = "";
  qs("finalAnswer").value = "";
  qs("finalMsg").textContent = "";
  qs("ending").classList.remove("show");
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
  if (state.started) {
    qs("startModal").classList.add("hidden");
    qs("storyModal").classList.add("hidden");
  }
  render();
});
