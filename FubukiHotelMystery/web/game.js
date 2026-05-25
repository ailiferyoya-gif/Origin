const qs = (id) => document.getElementById(id);

const itemNames = {
  envelope: "鳥居からの封筒",
  menu: "焦げたメニューカード",
  pass: "管理室パス",
  clipping: "古い新聞切り抜き",
  ticket: "ルームサービス伝票",
  footprint: "濡れた足跡の写真",
  clockMemo: "西階段の時計メモ",
  ledger: "蓮見の宿泊台帳",
  coat: "黒いコートの繊維",
  photo: "十年前の集合写真",
  fuse: "ヒューズレバー",
  lantern: "煤けたランタン",
  snow: "外扉の雪跡"
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
      { id: "window", label: "二階の明かり", x: 52, y: 31, w: 10, h: 12, text: "二階西側の窓だけ、停電のあとも短く明滅したらしい。発電室につながる非常灯かもしれない。" }
    ]
  },
  lobby: {
    name: "ロビー",
    img: "./assets/game-lobby.png",
    intro: "暖炉の火が弱く揺れている。フロントには封筒、壁には古い掲示物、奥には二階へ続く階段がある。",
    moves: ["exterior", "hallway", "room301", "generator"],
    people: ["torii"],
    spots: [
      { id: "envelope", label: "封筒", x: 71, y: 72, w: 10, h: 9, item: "envelope", text: "封筒には仮パスワード SNOW0314 と、307号室の鍵についての走り書きがある。差出人は鳥居真琴。" },
      { id: "fireplace", label: "暖炉", x: 6, y: 53, w: 16, h: 18, item: "menu", text: "灰の中から焦げたメニューカードを拾う。鳥居、午前零時、献立を戻すな、という文字だけが残っている。" },
      { id: "desk", label: "フロント", x: 52, y: 56, w: 14, h: 16, item: "pass", text: "フロントの引き出しに管理室パスが残されている。停電時の非常灯で赤く照らされていたらしい。" },
      { id: "notice", label: "掲示板", x: 28, y: 70, w: 12, h: 10, item: "clipping", text: "古い新聞切り抜き。十年前、改装前の西階段で宿泊客が転落した記事だ。関係者の名前に蓮見岬がある。" }
    ]
  },
  hallway: {
    name: "二階廊下",
    img: "./assets/game-hallway.png",
    intro: "非常灯が赤く滲む廊下。乾燥室、サービスカート、西階段へ続く扉が見える。",
    moves: ["lobby", "westStairs", "room301", "generator"],
    people: ["clerk"],
    spots: [
      { id: "prints", label: "足跡", x: 36, y: 68, w: 18, h: 14, item: "footprint", text: "濡れた足跡は乾燥室から従業員通路へ向かっている。西階段から外へ出た足跡とは向きが違う。" },
      { id: "cart", label: "サービスカート", x: 56, y: 48, w: 14, h: 24, item: "ticket", text: "伝票束を見つけた。23:54に暖炉へメニューカード、00:12に発電室へランタン、と記録されている。" },
      { id: "drying", label: "乾燥室", x: 77, y: 30, w: 14, h: 34, text: "乾燥室の奥には従業員用の細い通路がある。発電室へ抜けられるが、客用廊下からは見えにくい。" }
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
      { id: "key", label: "真鍮鍵", x: 55, y: 65, w: 10, h: 10, text: "真鍮鍵には307の札。鍵そのものは古く、いまの客室番号とは合っていない。" },
      { id: "scratch", label: "手すりの傷", x: 69, y: 36, w: 12, h: 18, text: "手すりの傷は新しい。ここで何かを落としたか、落としたように見せたのだろう。" }
    ]
  },
  room301: {
    name: "301号室",
    img: "./assets/game-room301.png",
    intro: "蓮見岬の旧室。月明かりの机、開いたクローゼット、窓辺の写真が残されている。",
    moves: ["lobby", "hallway", "westStairs"],
    people: ["hasumi"],
    spots: [
      { id: "ledger", label: "宿泊台帳", x: 14, y: 61, w: 18, h: 14, item: "ledger", text: "台帳には、鳥居の部屋が201、蓮見の旧室が301とある。手書きで足された時刻だけ筆圧が深い。" },
      { id: "wardrobe", label: "クローゼット", x: 72, y: 22, w: 17, h: 36, item: "coat", text: "黒いコートの繊維が残っている。宿泊者用コートの目印と一致するが、鳥居の襟にも同じ糸がある。" },
      { id: "photo", label: "集合写真", x: 26, y: 59, w: 8, h: 8, item: "photo", text: "十年前の改装前写真。西階段の先には外扉ではなく、従業員通路へ続く扉が写っている。" }
    ]
  },
  generator: {
    name: "発電室",
    img: "./assets/game-generator.png",
    intro: "発電機と外扉。床にはランタンと雪のかけらが残る。吹き込んだ雪なら、扉の外側にも乱れがあるはずだ。",
    moves: ["lobby", "hallway"],
    people: [],
    spots: [
      { id: "panel", label: "配電盤", x: 44, y: 23, w: 13, h: 22, item: "fuse", text: "外れたヒューズレバーを戻せば非常灯が安定する。停電は偶然ではなく、短時間だけ作られたものだ。" },
      { id: "door", label: "外扉", x: 72, y: 20, w: 18, h: 37, item: "snow", text: "外扉の雪は内側だけ崩れている。蓮見がここから外へ出たという説明は成り立たない。" },
      { id: "lantern", label: "ランタン", x: 79, y: 70, w: 10, h: 12, item: "lantern", text: "煤けたランタン。伝票にある00:12の発電室配送と一致する。ランタンを運んだ人物は停電後にここへ来ている。" }
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
      clockMemo: "十二分……。そんな細工、私ならもっと上手く隠します。いえ、変な意味ではありません。"
    }
  },
  clerk: {
    name: "夜勤係 直人",
    img: "./assets/char-clerk.png",
    talk: "玄関は停電中も開きません。館内を抜けるなら乾燥室の奥です。ただ、あの通路を知っている客はほとんどいません。",
    show: {
      ticket: "00:12の発電室配送は僕の字ではありません。ランタンを持って行ったのは別の人です。",
      footprint: "足跡は乾燥室からですね。西階段から外へ、という話とは向きが逆です。",
      envelope: "SNOW0314なら管理室端末が開きます。鳥居さんがあなたを呼んだなら、試してほしかったのでしょう。"
    }
  },
  hasumi: {
    name: "蓮見岬",
    img: "./assets/char-hasumi.png",
    talk: "私は外へ出ていない。あの夜と同じように、誰かが時刻と道をすり替えた。西階段の先だけを信じてはいけない。",
    show: {
      photo: "そう。十年前の西階段は外へ出る道ではなかった。あの写真を見れば、今夜の嘘も分かる。",
      ledger: "台帳の時刻は後から足されたもの。誰かが私の部屋を、都合のよい物語に変えた。",
      menu: "暖炉で消そうとしたのは、私が触れたものではなく、時刻を戻した証拠。火はいつも遅れて嘘を燃やす。"
    }
  }
};

const state = {
  scene: "lobby",
  items: new Set(),
  flags: new Set(),
  selected: null,
  started: false
};

function save() {
  localStorage.setItem("FubukiHotelAdventure", JSON.stringify({
    scene: state.scene,
    items: [...state.items],
    flags: [...state.flags],
    selected: state.selected,
    started: state.started
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

function render() {
  const scene = scenes[state.scene];
  qs("sceneImg").src = scene.img;
  speak(scene.name, scene.intro, null);
  qs("hotspots").innerHTML = scene.spots.map((spot) => (
    `<button class="hotspot" title="${spot.label}" aria-label="${spot.label}" style="left:${spot.x}%;top:${spot.y}%;width:${spot.w}%;height:${spot.h}%" onclick="inspectSpot('${spot.id}')"></button>`
  )).join("");
  qs("moves").innerHTML = Object.entries(scenes).map(([id, target]) => {
    const canMove = id === state.scene || scene.moves.includes(id);
    return `<button class="nav-btn ${id === state.scene ? "active" : ""}" onclick="moveTo('${id}')" ${canMove ? "" : "disabled"}>${target.name}</button>`;
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
  state.scene = id;
  render();
  addLog(`${scenes[id].name}へ移動した。`);
}

function inspectSpot(id) {
  const spot = scenes[state.scene].spots.find((entry) => entry.id === id);
  if (!spot) return;
  if (spot.item && !state.items.has(spot.item)) {
    state.items.add(spot.item);
    addLog(`${itemNames[spot.item]}を入手した。`);
  }
  state.flags.add(`spot:${id}`);
  speak(spot.label, spot.text, null);
  renderInventory();
  save();
}

function selectItem(id) {
  state.selected = state.selected === id ? null : id;
  renderInventory();
  save();
}

function talk(id) {
  const person = people[id];
  speak(person.name, person.talk, person.img);
  state.flags.add(`talk:${id}`);
  addLog(`${person.name}と話した。`);
  save();
}

function showItem(id) {
  const person = people[id];
  if (!state.selected) {
    speak(person.name, "見せるものを持ち物から選んでください。", person.img);
    return;
  }
  const line = person.show[state.selected] || "それについて、今は答えられることがありません。";
  speak(person.name, line, person.img);
  state.flags.add(`show:${id}:${state.selected}`);
  addLog(`${person.name}に${itemNames[state.selected]}を見せた。`);
  save();
}

function hint() {
  if (state.items.size < 5) {
    speak("状況整理", "ロビー、二階廊下、西階段、301号室、発電室を順に調べよう。光っている場所だけでなく、人物に持ち物を見せることも大切だ。", null);
  } else if (!state.flags.has("show:torii:coat") || !state.flags.has("show:clerk:ticket")) {
    speak("状況整理", "黒いコート、伝票、足跡は人物の証言を変える。鳥居と夜勤係に見せると、通路と時刻の違いが見えてくる。", null);
  } else if (!state.flags.has("show:hasumi:photo")) {
    speak("状況整理", "十年前の集合写真は蓮見の言葉とつながる。西階段が本当に外へ出る道だったのか、もう一度確かめよう。", null);
  } else {
    speak("状況整理", "鍵は西階段、時刻は十二分、証拠隠しは暖炉。外扉の雪は、蓮見が外へ出ていないことを示している。", null);
  }
}

function normalize(text) {
  return String(text || "").replace(/\s/g, "").toLowerCase();
}

function submitFinal() {
  const answer = normalize(qs("finalAnswer").value);
  const enoughEvidence = ["menu", "footprint", "clockMemo", "ledger", "coat", "photo", "snow"].every((id) => state.items.has(id));
  const namedCulprit = answer.includes("鳥居");
  const usedRoute = answer.includes("西階段") || answer.includes("乾燥室") || answer.includes("従業員通路");
  const timeTrick = answer.includes("十二分") || answer.includes("12分") || answer.includes("時刻") || answer.includes("時計");
  const burnedEvidence = answer.includes("暖炉") || answer.includes("メニュー");
  const ok = enoughEvidence && namedCulprit && usedRoute && timeTrick && burnedEvidence;
  qs("finalMsg").textContent = ok
    ? "正解。鳥居は西階段と時刻を使って蓮見が外へ出たように見せ、暖炉で時刻の証拠を消そうとした。"
    : "まだ証拠か説明が足りない。人物、通路、時刻、消された証拠を一文に入れてください。";
  qs("finalMsg").className = ok ? "ok" : "ng";
  qs("ending").classList.toggle("show", ok);
}

function resetGame() {
  localStorage.removeItem("FubukiHotelAdventure");
  state.scene = "lobby";
  state.items = new Set();
  state.flags = new Set();
  state.selected = null;
  state.started = false;
  qs("log").innerHTML = "";
  qs("finalAnswer").value = "";
  qs("finalMsg").textContent = "";
  qs("ending").classList.remove("show");
  qs("startModal").classList.remove("hidden");
  render();
}

document.addEventListener("DOMContentLoaded", () => {
  load();
  qs("startGame").addEventListener("click", () => {
    qs("startModal").classList.add("hidden");
    state.started = true;
    save();
    render();
    addLog("吹雪ホテルに入った。");
  });
  qs("hintBtn").addEventListener("click", hint);
  qs("resetGame").addEventListener("click", resetGame);
  qs("submitFinal").addEventListener("click", submitFinal);
  if (state.started) qs("startModal").classList.add("hidden");
  render();
});
