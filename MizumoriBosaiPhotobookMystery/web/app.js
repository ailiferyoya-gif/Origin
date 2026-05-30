const $ = (id) => document.getElementById(id);

const sourcePhotos = [
  ["river-embankment", "北堤防の水位標", "川沿いの堤防に立つ水位標。", "photo-01-river-embankment.jpg", "水位標の赤い帯が、過去の到達線より高い位置に残っている。", "赤い帯"],
  ["evacuation-sign", "避難案内板", "用水路沿いに設置された避難案内。", "photo-02-evacuation-sign.jpg", "黄色い案内板の矢印は右を向いている。公開図の矢印とは向きが合わない。", "右"],
  ["mizuho-bridge", "水穂橋下", "橋脚と河川敷の通路。", "photo-03-mizuho-bridge.jpg", "橋脚の下に赤いコーンが置かれ、通行止めの痕跡が残る。", "赤いコーン"],
  ["townhall-board", "町役場前掲示板", "町役場前の掲示板と時計。", "photo-04-townhall-board.jpg", "掲示板の右上に時計が写る。時刻資料と照らす起点になる。", "時計"],
  ["school-gym", "避難所体育館", "避難所に使われる体育館の床面。", "photo-05-school-gym.jpg", "床に泥跡が残り、手前側まで水が入ったことが分かる。", "泥跡"],
  ["stockpile-shelf", "備蓄棚", "毛布や箱が並ぶ備蓄棚。", "photo-06-stockpile-shelf.jpg", "棚の箱と毛布の並びが一列だけ乱れている。後から入れ替えた棚に見える。", "棚"],
  ["floodgate-distance", "水門遠景", "川に面した大型水門。", "photo-07-floodgate-distance.jpg", "水門の中央部は暗く、閉じ切った状態には見えない。", "中央部"],
  ["shopping-flags", "商店街の防災旗", "雨の商店街に並ぶ防災旗。", "photo-08-shopping-flags.jpg", "色の違う旗が連続しており、中央の黄色い旗だけが目立つ。", "黄色"],
  ["fire-brigade", "消防団詰所", "古い詰所内の出動板。", "photo-09-fire-brigade.jpg", "机の上の出動板と長靴が残り、急いで出た後のように見える。", "長靴"],
  ["park-water-pillar", "公園の水位柱", "公園内に立つ水位記録柱。", "photo-10-park-water-pillar.jpg", "水位柱の上部に赤い表示があり、下の色帯とは扱いが違う。", "赤"],
  ["old-drainage", "旧排水路跡", "錆びた柵で囲われた旧排水路。", "photo-11-old-drainage.jpg", "柵の中央に白い注意札があり、古い設備なのに新しい表示が残る。", "白い札"],
  ["south-bulletin", "南町会掲示板", "町会掲示板に貼られた複数の紙。", "photo-12-south-bulletin.jpg", "掲示紙の一部だけが傾き、下に別の紙が残っている。", "傾いた紙"],
  ["control-panel", "管理盤", "水門設備の操作盤。", "photo-13-control-panel.jpg", "操作盤の赤いランプと緑のランプが同時に点いている。", "赤と緑"],
  ["key-box", "鍵保管箱", "管理用の鍵が並ぶ保管箱。", "photo-14-key-box.jpg", "鍵の列に一か所だけ黄色い札があり、他の鍵と区別されている。", "黄色い札"],
  ["hill-road", "高台への道", "住宅地から高台へ向かう坂道。", "photo-15-hill-road.jpg", "坂道の手すりが川側へ続く。避難経路の説明と向きが逆になる。", "手すり"],
  ["mayor-map", "説明会場の地図", "説明会場で示された町内図。", "photo-16-mayor-map.jpg", "地図の前に立つ人物が、水門付近を隠す位置にいる。", "地図"],
  ["rain-gauge", "雨量観測小屋", "川沿いにある観測小屋。", "photo-17-rain-gauge.jpg", "小屋の窓は閉じ、外の水たまりが深い。観測中止とは考えにくい。", "観測小屋"],
  ["clinic-sign", "臨時救護所前", "旧診療所前に置かれた掲示板。", "photo-18-clinic-sign.jpg", "入口前の掲示板は濡れているが、建物の内側は点灯している。", "点灯"],
  ["management-hut", "水門管理棟", "水門横の管理棟。", "photo-19-management-hut.jpg", "扉の小窓が暗く、管理棟に人がいたという説明と合わない。", "暗い窓"],
  ["underpass", "地下道入口", "駅前地下道の防水扉付近。", "photo-20-underpass.jpg", "壁面の濡れた線が高く、写真の右奥まで水が抜けていない。", "濡れた線"],
  ["memorial-plaza", "記念広場", "復旧記念碑のある広場。", "photo-21-memorial-plaza.jpg", "記念碑の周囲だけ新しい木が植えられ、古い痕跡を囲うように見える。", "記念碑"],
  ["flood-drill", "合同防災訓練", "土のうを使った訓練風景。", "photo-22-flood-drill.jpg", "土のうの列が水門側ではなく校庭側を守る向きになっている。", "土のう"],
  ["basement-archive", "地下書庫入口", "地下の資料室前。", "photo-23-basement-archive.jpg", "奥の扉だけ金属製で、保管場所として他の部屋と扱いが違う。", "金属扉"],
  ["closed-floodgate", "閉鎖後の水門", "夜明け前に撮影された水門。", "photo-24-closed-floodgate.jpg", "水門上部に赤い灯りが残り、閉鎖後も警告状態だったことが分かる。", "赤い灯り"]
];

const photos = sourcePhotos.map((row, index) => ({
  id: row[0], title: row[1], caption: row[2], img: `./assets/${row[3]}`,
  clue: row[4], answer: row[5], chapter: index < 6 ? 1 : index < 12 ? 2 : index < 18 ? 3 : 4,
  marker: markerFor(index)
}));

const docs = [
  { chapter: 1, title: "公開台帳抜粋", text: "北堤防の到達水位は低く記載されているが、写真の水位標ではより高い位置に赤い帯が残る。" },
  { chapter: 1, title: "避難案内改訂", text: "改訂前の案内図では水門側へ向かう経路が残っていた。現地の黄色い案内板は右方向を示している。" },
  { chapter: 2, title: "現場整理表", text: "橋下、商店街、詰所、町会掲示板の写真には、町の発表より前に動きがあった跡が写る。" },
  { chapter: 2, title: "出動時刻控え", text: "消防団の控えには18:12の出動記録がある。広報資料の18:30より早い。" },
  { chapter: 3, title: "水門管理区画", text: "管理盤、鍵保管箱、地図、観測小屋の写真は、G-4水門の手動操作と関係する。" },
  { chapter: 3, title: "観測記録", text: "雨量観測は中止されておらず、17:48以降も現場は観測可能だった。" },
  { chapter: 4, title: "地下書庫目録", text: "B2-14: 水門操作記録、地下浸水写真、閉鎖後写真、旧町会控えを同梱。" }
];

const locks = [
  { id: "lock1", title: "第一照会", chapter: 1, asks: ["赤い帯", "右", "時計", "泥跡"], reveal: "写真の表面だけでも、水位、案内方向、時刻、浸水範囲が公表説明とずれている。" },
  { id: "lock2", title: "第二照会", chapter: 2, asks: ["中央部", "黄色", "長靴", "傾いた紙"], reveal: "水門周辺と町内の複数地点に、発表前の対応痕跡が残っている。" },
  { id: "lock3", title: "第三照会", chapter: 3, asks: ["赤と緑", "黄色い札", "地図", "観測小屋"], reveal: "操作盤、鍵、地図、観測小屋は、G-4水門の手動操作を示す資料群としてつながる。" },
  { id: "lock4", title: "第四照会", chapter: 4, asks: ["暗い窓", "濡れた線", "金属扉", "赤い灯り"], reveal: "管理棟不在、地下浸水、保管記録、閉鎖後の警告灯が同じ説明のずれを示している。" }
];

const state = { selected: 0, clues: new Set(), solved: new Set(), hint: false, activeTab: "photo", zoom: 1 };

function markerFor(index) {
  const points = [
    [38,62,12,22],[53,58,26,22],[78,70,18,14],[72,20,18,14],[36,78,28,16],[52,46,24,18],
    [50,54,30,20],[55,45,18,24],[60,58,26,18],[46,28,22,20],[52,63,18,24],[56,48,26,18],
    [49,30,28,24],[53,45,20,20],[40,45,32,16],[62,42,28,30],[40,42,26,22],[48,56,26,22],
    [47,44,22,24],[58,58,32,18],[42,57,22,24],[44,66,30,18],[54,48,22,28],[62,18,22,16]
  ];
  const [x,y,w,h] = points[index];
  return {x,y,w,h};
}

function save() {
  localStorage.setItem("MizumoriBosaiPhotobook", JSON.stringify({ selected: state.selected, clues: [...state.clues], solved: [...state.solved], hint: state.hint, activeTab: state.activeTab }));
}

function load() {
  try {
    const data = JSON.parse(localStorage.getItem("MizumoriBosaiPhotobook") || "{}");
    if (Number.isInteger(data.selected)) state.selected = data.selected;
    if (Array.isArray(data.clues)) state.clues = new Set(data.clues);
    if (Array.isArray(data.solved)) state.solved = new Set(data.solved);
    if (typeof data.hint === "boolean") state.hint = data.hint;
    if (data.activeTab) state.activeTab = data.activeTab;
  } catch { localStorage.removeItem("MizumoriBosaiPhotobook"); }
}

function maxChapter() { if (!state.solved.has("lock1")) return 1; if (!state.solved.has("lock2")) return 2; if (!state.solved.has("lock3")) return 3; return 4; }
function isUnlocked(photo) { return photo.chapter <= maxChapter(); }

function render() {
  renderGrid(); renderPhoto(); renderNotes(); renderDocs(); renderLocks(); syncTabs();
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
    const available = lock.chapter <= maxChapter(); const solved = state.solved.has(lock.id);
    const inputs = lock.asks.map((_, index) => `<input data-lock="${lock.id}" data-index="${index}" placeholder="参照値 ${index + 1}" ${available && !solved ? "" : "disabled"}> `).join("");
    return `<div class="lock-box"><strong>${lock.title}</strong><p class="small">${solved ? lock.reveal : "写真注記から参照値を入力してください。"}</p>${solved ? "" : inputs + `<button type="button" ${available ? "" : "disabled"} onclick="submitLock('${lock.id}')">照会する</button><p id="${lock.id}Msg"></p>`}</div>`;
  }).join("");
}

function syncTabs() { document.querySelectorAll(".tab").forEach((tab) => tab.classList.toggle("active", tab.dataset.tab === state.activeTab)); document.querySelectorAll(".panel").forEach((panel) => panel.classList.toggle("active", panel.dataset.panel === state.activeTab)); }
function selectPhoto(index) { if (!isUnlocked(photos[index])) return; state.selected = index; state.activeTab = "photo"; render(); }
function inspectCurrent() { const photo = photos[state.selected]; state.clues.add(photo.id); $("inspectText").textContent = photo.clue; renderNotes(); renderGrid(); save(); }

function submitLock(id) {
  const lock = locks.find((entry) => entry.id === id);
  const values = [...document.querySelectorAll(`input[data-lock="${id}"]`)].map((input) => normalize(input.value));
  const ok = lock.asks.every((answer, index) => normalize(answer) === values[index]);
  const msg = $(`${id}Msg`);
  if (!ok) { msg.textContent = "照会内容を整理できませんでした。写真注記と公開資料を見直してください。"; msg.className = "ng"; return; }
  state.solved.add(id); msg.textContent = lock.reveal; msg.className = "ok"; render();
}

function normalize(value) { return String(value || "").replace(/\s|\u3000|-/g, "").toLowerCase(); }

function submitFinal() {
  const answer = normalize($("finalAnswer").value);
  const ok = ["g4", "1755", "水門", "b214"].every((word) => answer.includes(word)) && (answer.includes("遅延") || answer.includes("閉鎖"));
  $("finalMsg").textContent = ok ? "照合しました。G-4水門の閉鎖遅延と、後年の説明資料のずれが地下書庫B2-14の記録と一致します。" : "整理内容を照合できませんでした。G-4、17:55、水門、閉鎖遅延、B2-14の関係を記入してください。";
  $("finalMsg").className = ok ? "ok" : "ng";
}

function openZoom() {
  const photo = photos[state.selected];
  state.zoom = 1;
  $("zoomTitle").textContent = `${String(state.selected + 1).padStart(2, "0")}. ${photo.title}`;
  $("zoomImage").src = photo.img;
  $("zoomModal").classList.add("open");
  $("zoomModal").setAttribute("aria-hidden", "false");
  updateZoom();
}

function closeZoom() { $("zoomModal").classList.remove("open"); $("zoomModal").setAttribute("aria-hidden", "true"); }
function updateZoom() {
  const image = $("zoomImage");
  const baseWidth = image.naturalWidth || 1586;
  image.style.width = `${Math.round(baseWidth * state.zoom)}px`;
  image.style.height = "auto";
}
function changeZoom(delta) { state.zoom = Math.min(4, Math.max(0.7, Math.round((state.zoom + delta) * 10) / 10)); updateZoom(); }

document.querySelectorAll(".tab").forEach((tab) => { tab.addEventListener("click", () => { state.activeTab = tab.dataset.tab; render(); }); });
$("hintToggle").addEventListener("click", () => { state.hint = !state.hint; render(); });
$("resetBtn").addEventListener("click", () => { localStorage.removeItem("MizumoriBosaiPhotobook"); location.reload(); });
$("finalBtn").addEventListener("click", submitFinal);
$("zoomOpen").addEventListener("click", openZoom);
$("mainPhoto").addEventListener("click", openZoom);
$("zoomImage").addEventListener("load", updateZoom);
$("zoomClose").addEventListener("click", closeZoom);
$("zoomIn").addEventListener("click", () => changeZoom(0.3));
$("zoomOut").addEventListener("click", () => changeZoom(-0.3));
$("zoomReset").addEventListener("click", () => { state.zoom = 1; updateZoom(); });
$("zoomModal").addEventListener("click", (event) => { if (event.target.id === "zoomModal") closeZoom(); });
document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeZoom(); });

load();
render();
