const $ = (id) => document.getElementById(id);

const photos = [
  ["river-embankment","水守川と朝の堤防","朝の水守川。堤防沿いの散歩道と水位標を紹介。","photo-01-river-embankment.jpg","水位標は1.8mを示している。キャプションの平常水位0.9mとは合わない。","1.8"],
  ["evacuation-sign","第一避難看板","町内各所に整備された避難案内看板。","photo-02-evacuation-sign.jpg","矢印は指定避難所ではなく、旧排水路の方角へ向いている。","旧排水路"],
  ["mizuho-bridge","瑞穂橋の点検風景","橋梁点検の様子。","photo-03-mizuho-bridge.jpg","橋脚に白い管理番号G-4が残っている。","G-4"],
  ["townhall-board","町役場 防災掲示板","最新の防災情報を掲示する町役場前。","photo-04-townhall-board.jpg","掲示には17:40開門確認とあるが、写真内の時計は17:55を指している。","17:55"],
  ["school-gym","水守小学校 体育館","指定避難所である体育館。","photo-05-school-gym.jpg","入口床に薄い泥跡がある。避難者が来る前に水が入っていた可能性がある。","泥跡"],
  ["stockpile-shelf","公民館の備蓄棚","毛布や飲料水の備蓄。","photo-06-stockpile-shelf.jpg","棚番号2-1-4。後で地下資料室の番号とつながる。","2-1-4"],
  ["floodgate-distance","第二水門 遠景","河川設備の定期点検写真。","photo-07-floodgate-distance.jpg","表示灯は赤。説明の開放状態とは逆に、閉鎖を示している。","閉鎖"],
  ["shopping-flags","旧商店街の防災旗","商店街に掲げられた防災週間の旗。","photo-08-shopping-flags.jpg","旗の色は赤、青、黄、青、赤の順に並んでいる。","赤青黄青赤"],
  ["fire-brigade","消防団詰所","地域消防団の待機所。","photo-09-fire-brigade.jpg","黒板には18:12町内放送済とある。放送メモの18:30より早い。","18:12"],
  ["park-water-pillar","中洲公園の水位柱","防災学習用の水位柱。","photo-10-park-water-pillar.jpg","危険ラインより上に泥の帯が残る。水はすでに危険域へ達していた。","危険"],
  ["old-drainage","古い排水路入口","現在は使われていない排水路の安全柵。","photo-11-old-drainage.jpg","結束バンドだけが新しい。最近開けられた形跡がある。","結束バンド"],
  ["south-bulletin","南町内会の掲示板","地域の防災訓練ポスター。","photo-12-south-bulletin.jpg","破れたポスターの残字を拾うと、みなみへいくな、と読める。","みなみへいくな"],
  ["control-panel","第三水門 操作盤","水門設備の操作盤。","photo-13-control-panel.jpg","色ボタンは商店街の旗と同じ順に押す必要がある。","赤青黄青赤"],
  ["key-box","防災倉庫の鍵箱","町内防災倉庫の鍵管理。","photo-14-key-box.jpg","鍵番号G4-1755。水門番号と時刻が一つにまとめられている。","G4-1755"],
  ["hill-road","高台へ続く坂道","高台避難路の整備状況。","photo-15-hill-road.jpg","標高図と比べると、矢印は高台とは逆向きに貼り替えられている。","逆"],
  ["mayor-map","町長の防災あいさつ","町長による防災週間のあいさつ写真。","photo-16-mayor-map.jpg","背後の地図で南町の赤線だけが消されている。","南町"],
  ["rain-gauge","雨量計観測所","町の雨量観測装置。","photo-17-rain-gauge.jpg","記録紙のピークは17:48。公式資料の18:20とは合わない。","17:48"],
  ["clinic-sign","旧診療所前の案内板","災害時の応急救護所案内。","photo-18-clinic-sign.jpg","案内板の端に、記録は地下、という鉛筆書きがある。","地下"],
  ["management-hut","水門管理小屋","河川設備を管理する小屋。","photo-19-management-hut.jpg","窓の内側に濡れた作業手袋が干されている。最近入った者がいる。","作業手袋"],
  ["underpass","南町アンダーパス","大雨時に通行止めとなる低地道路。","photo-20-underpass.jpg","通行止め看板が奥向きで、住民側から見えない。","住民側"],
  ["memorial-plaza","記念植樹の広場","復興記念の植樹。","photo-21-memorial-plaza.jpg","石碑の年号が公式資料と一年ずれている。事故処理の時期をぼかしている。","年号"],
  ["flood-drill","水防訓練の集合写真","訓練参加者の集合写真。","photo-22-flood-drill.jpg","右端の人物の袖に排水係の文字がある。G-4操作に近い立場だ。","排水係"],
  ["basement-archive","地下資料室の入口","町役場の古い資料保管室。","photo-23-basement-archive.jpg","扉札はB2-14。公民館の2-1-4と対応する。","B2-14"],
  ["closed-floodgate","最後の写真: 閉じた水門","点検完了後の水門風景。","photo-24-closed-floodgate.jpg","G-4、赤表示灯、17:55、水位1.8mが一枚に揃う。","G-4"]
].map((row, index) => ({
  id: row[0],
  title: row[1],
  caption: row[2],
  img: `./assets/${row[3]}`,
  clue: row[4],
  answer: row[5],
  chapter: index < 6 ? 1 : index < 12 ? 2 : index < 18 ? 3 : 4,
  marker: markerFor(index)
}));

const docs = [
  { chapter: 1, title: "写真帖の奥付", text: "水守町防災週間に合わせて発行。各写真は安全確認済みの地点として掲載された。" },
  { chapter: 1, title: "町内避難地図", text: "指定避難所は水守小学校体育館と北公民館。旧排水路は避難経路に含まれない。" },
  { chapter: 2, title: "豪雨当日巡回表", text: "17:40 G-4開門確認。18:30 町内放送。18:45 南町アンダーパス通行止め。" },
  { chapter: 2, title: "町内放送メモ", text: "公式記録では18:30放送。ただし消防団黒板には18:12放送済と残る。" },
  { chapter: 3, title: "水門管理表", text: "G系統の赤表示灯は閉鎖、青表示灯は開放。G-4は南町排水路に接続する。" },
  { chapter: 3, title: "標高図", text: "南町は旧排水路より低い。高台へ向かうには北東の坂を上る必要がある。" },
  { chapter: 4, title: "地下保管一覧", text: "B2-14: 旧河川設備操作記録。水害後、閲覧停止扱い。" }
];

const locks = [
  { id: "lock1", title: "第一確認", chapter: 1, asks: ["1.8", "旧排水路", "G-4", "17:55"], reveal: "写真は安全確認ではなく、危険が始まっていた時刻を示している。" },
  { id: "lock2", title: "第二確認", chapter: 2, asks: ["閉鎖", "赤青黄青赤", "18:12", "みなみへいくな"], reveal: "避難誘導は一部だけ歪められ、南町へ向かわせる導線が作られている。" },
  { id: "lock3", title: "第三確認", chapter: 3, asks: ["G4-1755", "南町", "17:48", "地下"], reveal: "G-4水門の操作記録は、公式資料とは別の場所に隠されている。" },
  { id: "lock4", title: "最終確認", chapter: 4, asks: ["作業手袋", "住民側", "B2-14", "G-4"], reveal: "記録の場所と、水門を閉じたままにした時刻が結びついた。" }
];

const state = {
  selected: 0,
  clues: new Set(),
  solved: new Set(),
  hint: false,
  activeTab: "photo"
};

function markerFor(index) {
  const points = [
    [64,58,18,16],[44,42,20,18],[52,66,18,14],[69,28,18,14],[38,76,20,12],[55,45,18,14],
    [63,48,20,16],[47,30,22,14],[58,38,20,14],[50,55,18,16],[42,58,20,16],[61,42,20,16],
    [53,50,22,18],[48,45,18,16],[58,38,20,18],[62,52,22,16],[45,58,24,14],[70,54,20,14],
    [54,40,22,18],[62,52,20,16],[48,62,18,12],[78,45,16,18],[50,43,18,16],[58,50,26,20]
  ];
  const [x,y,w,h] = points[index];
  return {x,y,w,h};
}

function save() {
  localStorage.setItem("MizumoriBosaiPhotobook", JSON.stringify({
    selected: state.selected,
    clues: [...state.clues],
    solved: [...state.solved],
    hint: state.hint,
    activeTab: state.activeTab
  }));
}

function load() {
  try {
    const data = JSON.parse(localStorage.getItem("MizumoriBosaiPhotobook") || "{}");
    if (Number.isInteger(data.selected)) state.selected = data.selected;
    if (Array.isArray(data.clues)) state.clues = new Set(data.clues);
    if (Array.isArray(data.solved)) state.solved = new Set(data.solved);
    if (typeof data.hint === "boolean") state.hint = data.hint;
    if (data.activeTab) state.activeTab = data.activeTab;
  } catch {
    localStorage.removeItem("MizumoriBosaiPhotobook");
  }
}

function maxChapter() {
  if (!state.solved.has("lock1")) return 1;
  if (!state.solved.has("lock2")) return 2;
  if (!state.solved.has("lock3")) return 3;
  return 4;
}

function isUnlocked(photo) {
  return photo.chapter <= maxChapter();
}

function render() {
  renderGrid();
  renderPhoto();
  renderNotes();
  renderDocs();
  renderLocks();
  syncTabs();
  $("hintToggle").textContent = state.hint ? "調査印 ON" : "調査印 OFF";
  save();
}

function renderGrid() {
  $("progressText").textContent = `${state.clues.size} / ${photos.length}`;
  $("photoGrid").innerHTML = photos.map((photo, index) => {
    const unlocked = isUnlocked(photo);
    return `<button class="photo-card ${unlocked ? "" : "locked"} ${state.clues.has(photo.id) ? "done" : ""}" type="button" ${unlocked ? "" : "disabled"} onclick="selectPhoto(${index})">
      <img src="${photo.img}" alt="">
      <strong>${String(index + 1).padStart(2, "0")}. ${photo.title}</strong>
      <span>${unlocked ? photo.caption : "前章の確認後に開くページ"}</span>
    </button>`;
  }).join("");
}

function renderPhoto() {
  const photo = photos[state.selected];
  $("photoTitle").textContent = `${String(state.selected + 1).padStart(2, "0")}. ${photo.title}`;
  $("photoCaption").textContent = photo.caption;
  $("mainPhoto").src = photo.img;
  $("inspectText").textContent = state.clues.has(photo.id) ? photo.clue : "写真の中に残る小さな記録を確認してください。";
  const m = photo.marker;
  $("markers").innerHTML = `<div class="marker" style="left:${m.x}%;top:${m.y}%;width:${m.w}%;height:${m.h}%"><button type="button" onclick="inspectCurrent()" aria-label="${photo.title}を調べる"></button></div>`;
  document.querySelector(".photo-frame").classList.toggle("show-markers", state.hint);
}

function renderNotes() {
  const found = photos.filter((p) => state.clues.has(p.id));
  $("notes").innerHTML = found.length ? found.map((p) => `<div class="note"><strong>${p.title}</strong><span>${p.clue}</span></div>`).join("") : "<p class='small'>まだ手がかりはありません。</p>";
}

function renderDocs() {
  const available = maxChapter();
  $("docs").innerHTML = docs.map((doc) => `<div class="doc ${doc.chapter <= available ? "" : "locked"}"><strong>${doc.title}</strong><span>${doc.chapter <= available ? doc.text : "前章の確認後に開示"}</span></div>`).join("");
}

function renderLocks() {
  $("locks").innerHTML = locks.map((lock) => {
    const available = lock.chapter <= maxChapter();
    const solved = state.solved.has(lock.id);
    const inputs = lock.asks.map((_, i) => `<input data-lock="${lock.id}" data-index="${i}" placeholder="確認語 ${i + 1}" ${available && !solved ? "" : "disabled"}>`).join("");
    return `<div class="lock-box"><strong>${lock.title}</strong><p class="small">${solved ? lock.reveal : "写真と資料から確認語を入力してください。"}</p>${solved ? "<p class='ok'>確認済み</p>" : inputs + `<button type="button" ${available ? "" : "disabled"} onclick="submitLock('${lock.id}')">確認する</button><p id="${lock.id}Msg"></p>`}</div>`;
  }).join("");
}

function syncTabs() {
  document.querySelectorAll(".tab").forEach((tab) => tab.classList.toggle("active", tab.dataset.tab === state.activeTab));
  document.querySelectorAll(".panel").forEach((panel) => panel.classList.toggle("active", panel.dataset.panel === state.activeTab));
}

function selectPhoto(index) {
  if (!isUnlocked(photos[index])) return;
  state.selected = index;
  state.activeTab = "photo";
  render();
}

function inspectCurrent() {
  const photo = photos[state.selected];
  state.clues.add(photo.id);
  $("inspectText").textContent = photo.clue;
  renderNotes();
  renderGrid();
  save();
}

function submitLock(id) {
  const lock = locks.find((entry) => entry.id === id);
  const values = [...document.querySelectorAll(`input[data-lock="${id}"]`)].map((input) => normalize(input.value));
  const ok = lock.asks.every((answer, index) => normalize(answer) === values[index]);
  const msg = $(`${id}Msg`);
  if (!ok) {
    msg.textContent = "まだ照合が足りません。写真内の数字、方角、時刻をもう一度見直してください。";
    msg.className = "ng";
    return;
  }
  state.solved.add(id);
  msg.textContent = lock.reveal;
  msg.className = "ok";
  render();
}

function normalize(value) {
  return String(value || "").replace(/\s|　|-/g, "").toLowerCase();
}

function submitFinal() {
  const answer = normalize($("finalAnswer").value);
  const ok = ["g4","1755","南町","b214"].every((word) => answer.includes(word)) && (answer.includes("閉鎖") || answer.includes("閉じ")) && answer.includes("操作記録");
  $("finalMsg").textContent = ok
    ? "正解。G-4水門は17:55の時点で閉じており、南町の避難誘導は実際の危険経路と食い違っていた。操作記録は町役場地下資料室B2-14に隠されている。"
    : "まだ根拠が足りません。水門番号、時刻、南町、閉鎖状態、操作記録の保管場所を入れてください。";
  $("finalMsg").className = ok ? "ok" : "ng";
}

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    state.activeTab = tab.dataset.tab;
    render();
  });
});

$("hintToggle").addEventListener("click", () => {
  state.hint = !state.hint;
  render();
});

$("resetBtn").addEventListener("click", () => {
  localStorage.removeItem("MizumoriBosaiPhotobook");
  location.reload();
});

$("finalBtn").addEventListener("click", submitFinal);

load();
render();
