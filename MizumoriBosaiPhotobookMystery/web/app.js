const $ = (id) => document.getElementById(id);

const sourcePhotos = [
  ["river-embankment", "北堤防の水位標", "令和六年六月、北堤防の点検時に撮影。", "photo-01-river-embankment.jpg", "赤い水位線は1.8mを示す。旧台帳の数値0.9mとは一致しない。", "1.8"],
  ["evacuation-sign", "避難案内板", "水守町中央通りの避難案内。", "photo-02-evacuation-sign.jpg", "案内板の避難方向は、町の掲示資料と一部だけ逆向きになっている。", "逆向き"],
  ["mizuho-bridge", "水穂橋たもと", "橋脚付近の現況。", "photo-03-mizuho-bridge.jpg", "橋の下の古い番号板にG-4と読める刻印がある。", "G-4"],
  ["townhall-board", "町役場 通知欄", "防災月間の掲示物が残る一角。", "photo-04-townhall-board.jpg", "掲示予定は17:40だが、付箋の最終時刻は17:55になっている。", "17:55"],
  ["school-gym", "水守小 体育館", "避難所備品の配置記録。", "photo-05-school-gym.jpg", "入口近くの箱だけ未開封で、搬入日が本誌の公開日より前になっている。", "未開封"],
  ["stockpile-shelf", "備蓄棚の札", "南倉庫の保管棚。", "photo-06-stockpile-shelf.jpg", "棚札の2-1-4だけ、印字ではなく後から貼られている。", "2-1-4"],
  ["floodgate-distance", "水門 遠景", "河川敷側から見た水門。", "photo-07-floodgate-distance.jpg", "閉門ランプは消えているが、説明文では閉門完了とされている。", "消灯"],
  ["shopping-flags", "商店街ののぼり", "防災協力店の掲示風景。", "photo-08-shopping-flags.jpg", "一枚だけ標語の語順が異なり、先頭文字が水門側を指している。", "標語違い"],
  ["fire-brigade", "消防団詰所", "出動板のある詰所前。", "photo-09-fire-brigade.jpg", "出動板は18:12を示すが、公開資料では18:30出動とある。", "18:12"],
  ["park-water-pillar", "公園の水位柱", "新町公園の記録柱。", "photo-10-park-water-pillar.jpg", "平成十六年の線だけ塗り直され、下から別の線が透けている。", "塗装"],
  ["old-drainage", "旧排水路跡", "東側住宅地に残る旧水路の入口。", "photo-11-old-drainage.jpg", "格子の鍵穴は新しいが、銘板は撤去済みの旧型を示している。", "鍵穴違い"],
  ["south-bulletin", "南町会掲示板", "避難訓練後の掲示板。", "photo-12-south-bulletin.jpg", "雨天中止の紙の下に、実施済みの押印が見えている。", "実施済み"],
  ["control-panel", "管理盤 表示部", "水門管理棟内の表示部。", "photo-13-control-panel.jpg", "操作履歴の端が写り、手動閉鎖の文字だけ残っている。", "手動閉鎖"],
  ["key-box", "鍵保管箱", "管理棟の壁面にある保管箱。", "photo-14-key-box.jpg", "小さな札にG4-1755とあり、掲示欄の時刻と対応している。", "G4-1755"],
  ["hill-road", "高台への道", "避難路として掲載された坂道。", "photo-15-hill-road.jpg", "案内矢印の影が、撮影時刻にしては逆へ伸びている。", "影"],
  ["mayor-map", "町長室の地図", "式典写真の背景に写る古い地図。", "photo-16-mayor-map.jpg", "地図のG区画だけ赤いピンが外されている。", "地図"],
  ["rain-gauge", "雨量計記録板", "観測所横の手書き記録。", "photo-17-rain-gauge.jpg", "雨量上昇の始点は17:48。公表値の18:20より早い。", "17:48"],
  ["clinic-sign", "臨時救護所の看板", "旧診療所前に置かれた看板。", "photo-18-clinic-sign.jpg", "看板の搬入印は、避難所開設より先の日付になっている。", "診療"],
  ["management-hut", "水門管理棟", "河川敷側の管理棟外観。", "photo-19-management-hut.jpg", "扉の施錠札は外側にあり、内部不在の説明と合わない。", "施錠"],
  ["underpass", "地下道入口", "駅前地下道の防水扉。", "photo-20-underpass.jpg", "浸水跡の高さは、町発表の到達水位より上に残っている。", "地下"],
  ["memorial-plaza", "記念広場", "復旧記念碑の周辺。", "photo-21-memorial-plaza.jpg", "碑文の年度だけ新しい石片で差し替えられている。", "碑文"],
  ["flood-drill", "合同防災訓練", "広報誌に掲載された訓練写真。", "photo-22-flood-drill.jpg", "腕章の班名は当時存在しないはずのG-4班になっている。", "訓練"],
  ["basement-archive", "地下書庫入口", "庁舎地下の資料室扉。", "photo-23-basement-archive.jpg", "扉番号B2-14は、棚札2-1-4と同じ数字列で構成されている。", "B2-14"],
  ["closed-floodgate", "水門閉鎖後の写真", "翌朝に撮影された水門正面。", "photo-24-closed-floodgate.jpg", "G-4、17:55、1.8mが同じ場所に重なる。", "G-4"]
];

const photos = sourcePhotos.map((row, index) => ({
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
  { chapter: 1, title: "公開台帳抜粋", text: "北堤防の旧台帳は水位0.9mを基準としていたが、現地写真の標識は1.8mを基準にしている。" },
  { chapter: 1, title: "避難案内改訂", text: "避難案内の矢印は改訂時に差し替えられた。旧図面では水門G-4側への誘導が残っている。" },
  { chapter: 2, title: "時系列整理", text: "17:40 G-4点検予定、17:55 最終操作、18:12 消防団出動、18:30 町発表、18:45 避難所開設。" },
  { chapter: 2, title: "町会掲示控え", text: "南町会の控えには18:12出動とあり、町の広報資料より早い時刻が記録されている。" },
  { chapter: 3, title: "管理区画図", text: "G区画の管理番号は水門設備に使われる。G-4は北堤防側の手動水門を示す。" },
  { chapter: 3, title: "雨量記録", text: "雨量上昇は17:48から始まっており、公表時刻より前に危険水位へ近づいていた。" },
  { chapter: 4, title: "地下書庫目録", text: "B2-14: 水門操作記録、棚2-1-4、旧南町会控えを同梱。" }
];

const locks = [
  { id: "lock1", title: "第一照会", chapter: 1, asks: ["1.8", "逆向き", "G-4", "17:55"], reveal: "北堤防、水門G-4、17:55の三点が同じ資料群に集まる。" },
  { id: "lock2", title: "第二照会", chapter: 2, asks: ["未開封", "標語違い", "18:12", "実施済み"], reveal: "町の広報時刻より前に、現場側では避難準備と出動が始まっていた。" },
  { id: "lock3", title: "第三照会", chapter: 3, asks: ["G4-1755", "地図", "17:48", "影"], reveal: "G-4は公表より前に危険を示していたが、発表資料では時刻が遅らされている。" },
  { id: "lock4", title: "第四照会", chapter: 4, asks: ["施錠", "地下", "B2-14", "G-4"], reveal: "地下書庫B2-14に、G-4の手動閉鎖遅延を示す記録が残されている。" }
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
  $("hintToggle").textContent = state.hint ? "注記表示 ON" : "注記表示 OFF";
  save();
}

function renderGrid() {
  $("progressText").textContent = `${state.clues.size} / ${photos.length}`;
  $("photoGrid").innerHTML = photos.map((photo, index) => {
    const unlocked = isUnlocked(photo);
    return `<button class="photo-card ${unlocked ? "" : "locked"} ${state.clues.has(photo.id) ? "done" : ""}" type="button" ${unlocked ? "" : "disabled"} onclick="selectPhoto(${index})">
      <img src="${photo.img}" alt="">
      <strong>${String(index + 1).padStart(2, "0")}. ${photo.title}</strong>
      <span>${unlocked ? photo.caption : "関連資料の照会後に表示"}</span>
    </button>`;
  }).join("");
}

function renderPhoto() {
  const photo = photos[state.selected];
  $("photoTitle").textContent = `${String(state.selected + 1).padStart(2, "0")}. ${photo.title}`;
  $("photoCaption").textContent = photo.caption;
  $("mainPhoto").src = photo.img;
  $("inspectText").textContent = state.clues.has(photo.id) ? photo.clue : "写真内の注記対象を表示できます。";
  const m = photo.marker;
  $("markers").innerHTML = `<div class="marker" style="left:${m.x}%;top:${m.y}%;width:${m.w}%;height:${m.h}%"><button type="button" onclick="inspectCurrent()" aria-label="${photo.title} 注記"></button></div>`;
  document.querySelector(".photo-frame").classList.toggle("show-markers", state.hint);
}

function renderNotes() {
  const found = photos.filter((photo) => state.clues.has(photo.id));
  $("notes").innerHTML = found.length ? found.map((photo) => `<div class="note"><strong>${photo.title}</strong><span>${photo.clue}</span></div>`).join("") : "<p class='small'>注記はまだありません。</p>";
}

function renderDocs() {
  const available = maxChapter();
  $("docs").innerHTML = docs.map((doc) => `<div class="doc ${doc.chapter <= available ? "" : "locked"}"><strong>${doc.title}</strong><span>${doc.chapter <= available ? doc.text : "関連資料の照会後に表示"}</span></div>`).join("");
}

function renderLocks() {
  $("locks").innerHTML = locks.map((lock) => {
    const available = lock.chapter <= maxChapter();
    const solved = state.solved.has(lock.id);
    const inputs = lock.asks.map((_, index) => `<input data-lock="${lock.id}" data-index="${index}" placeholder="参照値 ${index + 1}" ${available && !solved ? "" : "disabled"}> `).join("");
    return `<div class="lock-box"><strong>${lock.title}</strong><p class="small">${solved ? lock.reveal : "写真注記から参照値を入力してください。"}</p>${solved ? "" : inputs + `<button type="button" ${available ? "" : "disabled"} onclick="submitLock('${lock.id}')">照会する</button><p id="${lock.id}Msg"></p>`}</div>`;
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
    msg.textContent = "照会内容を整理できませんでした。写真注記と公開資料を見直してください。";
    msg.className = "ng";
    return;
  }
  state.solved.add(id);
  msg.textContent = lock.reveal;
  msg.className = "ok";
  render();
}

function normalize(value) {
  return String(value || "").replace(/\s|\u3000|-/g, "").toLowerCase();
}

function submitFinal() {
  const answer = normalize($("finalAnswer").value);
  const ok = ["g4", "1755", "遅延", "b214"].every((word) => answer.includes(word)) && (answer.includes("水門") || answer.includes("g4")) && answer.includes("改ざん");
  $("finalMsg").textContent = ok
    ? "照合しました。G-4水門は17:55の時点で閉鎖遅延が発生し、後年の広報資料で時刻と水位が改ざんされています。地下書庫B2-14の記録と一致します。"
    : "整理内容を照合できませんでした。G-4、17:55、閉鎖遅延、改ざん、B2-14の関係を記入してください。";
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
