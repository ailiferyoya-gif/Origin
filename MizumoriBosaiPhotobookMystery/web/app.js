const $ = (id) => document.getElementById(id);

const sourcePhotos = [
  ["river-embankment", "北堤防の水位標", "川沿いの水位標と堤防通路。", "photo-01-river-embankment.jpg", "水位標の中央に赤い帯が残る。校正メモで削除対象になっていた高水位の目印。", ["赤い帯", "赤帯"]],
  ["evacuation-sign", "避難案内板", "用水路沿いに立つ黄色い避難案内。", "photo-02-evacuation-sign.jpg", "黄色い板の黒い矢印は右を向く。改訂差分表で問題視された旧誘導方向。", ["右矢印", "右", "矢印"]],
  ["mizuho-bridge", "水穂橋下", "橋脚下の通路と赤いコーン。", "photo-03-mizuho-bridge.jpg", "橋脚下に赤いコーンが並ぶ。水が引いた後の通行止めではなく、事前に塞いだ跡に見える。", ["赤いコーン", "コーン"]],
  ["townhall-board", "町役場前掲示板", "掲示板と庁舎外壁の時計。", "photo-04-townhall-board.jpg", "掲示板の上に時計が写る。時刻欄を黒塗りした理由になる写り込み。", ["掲示板時計", "時計"]],
  ["school-gym", "避難所体育館", "避難所体育館の入口付近。", "photo-05-school-gym.jpg", "入口から手前の床に泥跡が続く。開設前浸水の削除指示と対応する跡。", ["泥跡", "泥"]],
  ["stockpile-shelf", "備蓄棚", "毛布と箱が並ぶ備蓄棚。", "photo-06-stockpile-shelf.jpg", "棚の一段だけ箱と毛布の向きが乱れている。後日撮影用に整えた棚ではない。", ["乱れた棚", "棚"]],
  ["floodgate-distance", "水門遠景", "川に面した大型水門の遠景。", "photo-07-floodgate-distance.jpg", "水門中央の開口部が暗いまま残る。閉鎖完了欄に添付されていた写真と食い違う部分。", ["水門中央", "中央部"]],
  ["shopping-flags", "商店街の防災旗", "雨の商店街に並ぶ防災週間の旗。", "photo-08-shopping-flags.jpg", "連続する旗のうち、中央の黄色い旗だけが他の色列から外れて目立つ。巡回済み地点の目印。", ["黄色い旗", "黄色", "旗"]],
  ["fire-brigade", "消防団詰所", "消防団詰所内の机と装備。", "photo-09-fire-brigade.jpg", "机の前に長靴と上着が残る。出動前展示ではなく、出動直後の控え写真と対応する。", ["長靴"]],
  ["park-water-pillar", "公園の水位柱", "公園内に立つ色帯付きの水位柱。", "photo-10-park-water-pillar.jpg", "水位柱には赤、黄、青の帯がある。北堤防の赤い帯と同じ高さの扱いを示す。", ["色帯", "赤黄青", "赤"]],
  ["old-drainage", "旧排水路跡", "錆びた柵で閉じられた旧排水路。", "photo-11-old-drainage.jpg", "柵の中央に白い注意札が新しく付いている。古い設備なのに最近触られた跡がある。", ["白い注意札", "白い札"]],
  ["south-bulletin", "南町会掲示板", "雨に濡れた南町会掲示板。", "photo-12-south-bulletin.jpg", "掲示紙の一部が傾き、下の紙が見える。差し替え前掲示の残りとして照合できる。", ["傾いた紙", "貼り替え"]],
  ["control-panel", "管理盤", "水門設備の操作盤。", "photo-13-control-panel.jpg", "操作盤の赤いランプと緑のランプが同時に点いている。管理表の「通常監視」と合わない状態。", ["赤緑ランプ", "赤と緑", "ランプ"]],
  ["key-box", "鍵保管箱", "管理棟内の鍵保管箱。", "photo-14-key-box.jpg", "鍵の列に一つだけ黄色い札が付く。管理表でG-4予備鍵とされる札色。", ["黄色い鍵札", "黄色い札", "鍵札"]],
  ["hill-road", "高台への道", "川沿いから高台へ続く坂道。", "photo-15-hill-road.jpg", "白い手すりが川沿いへ長く続く。避難経路として示すなら分岐説明が必要な道に見える。", ["白い手すり", "手すり"]],
  ["mayor-map", "説明会場の地図", "水害対策本部会議の説明写真。", "photo-16-mayor-map.jpg", "演台の横に町内地図がある。管理区画図のG区画を隠す写真として扱われている。", ["会議地図", "地図"]],
  ["rain-gauge", "雨量観測小屋", "川沿いの観測小屋。", "photo-17-rain-gauge.jpg", "観測小屋の窓は閉じているが、外灯と周辺機器は残っている。観測停止届と照合する対象。", ["観測小屋", "小屋"]],
  ["clinic-sign", "臨時救護所前", "旧診療所前の掲示板と入口。", "photo-18-clinic-sign.jpg", "掲示板は雨で濡れている一方、入口側は明るい。救護所準備の時刻と照合できる。", ["明るい入口", "点灯", "入口"]],
  ["management-hut", "水門管理棟", "水門横の小さな管理棟。", "photo-19-management-hut.jpg", "扉の横の窓が暗い。B2-14の不在メモと対応する確認点。", ["暗い窓", "窓"]],
  ["underpass", "地下道入口", "駅前地下道の防水扉付近。", "photo-20-underpass.jpg", "壁と床に濡れた線が奥まで続く。地下浸水写真の水位跡として扱われている。", ["濡れた線", "水の跡"]],
  ["memorial-plaza", "記念広場", "復旧記念碑のある広場。", "photo-21-memorial-plaza.jpg", "記念碑の周囲だけ新しい植栽で囲われている。古い痕跡を避けて整備したように見える。", ["記念碑", "植栽"]],
  ["flood-drill", "合同防災訓練", "土のうとポンプを使った訓練風景。", "photo-22-flood-drill.jpg", "土のうとポンプが手前に置かれている。水門側ではなく施設側を守る配置になっている。", ["土のう", "ポンプ"]],
  ["basement-archive", "地下書庫入口", "地下資料室前の廊下。", "photo-23-basement-archive.jpg", "奥に重い金属扉がある。B2-14の保管場所を示す目印。", ["金属扉", "扉"]],
  ["closed-floodgate", "閉鎖後の水門", "夜明け前の水門正面。", "photo-24-closed-floodgate.jpg", "水門上部に赤い灯りが残る。閉鎖後も警告状態だったことを示す記録。", ["赤い灯り", "赤灯"]]
];

const photos = sourcePhotos.map((row, index) => ({
  id: row[0], title: row[1], caption: row[2], img: `./assets/${row[3]}`,
  clue: row[4], answer: row[5], chapter: index < 6 ? 1 : index < 12 ? 2 : index < 18 ? 3 : 4,
  marker: markerFor(index)
}));

const docs = [
  { chapter: 1, title: "平成26年9月2日 広報みずもり臨時号", text: "北堤防の水位は青帯上端以下で推移。南町の避難案内板は左回り高台経路へ差し替え済み。町役場掲示は17:30時点で更新完了。水守小体育館は18:45の開設まで浸水なし。" },
  { chapter: 1, title: "令和6年 再掲写真 校正メモA", text: "臨時号本文との差分確認: 写真01は赤い帯が写る。写真02は右向き矢印が残る。写真04は掲示板時計が写る。写真05は体育館床面に泥跡がある。" },
  { chapter: 2, title: "平成26年9月3日 地域安全ニュース", text: "G-4水門は17:55に閉鎖完了。商店街巡回と消防団出動は町発表後の18:30以降。南町会掲示板の差し替えは翌朝実施。" },
  { chapter: 2, title: "令和6年 再掲写真 目印欄", text: "安全ニュースとの差分確認: 写真07は水門中央が暗い。写真08は黄色い防災旗が巡回済み地点を示す。写真09は長靴が残る。写真12は傾いた紙の下に旧掲示が見える。" },
  { chapter: 3, title: "平成26年9月5日 町長会見要旨", text: "G-4は自動監視の通常運転。予備鍵の使用なし。会議ではG区画を個別に扱っていない。雨量観測は17:40に停止済み。" },
  { chapter: 3, title: "令和6年 再掲写真 操作系統メモ", text: "会見要旨との差分確認: 写真13は赤緑ランプが同時点灯。写真14は黄色い鍵札。写真16は会議地図。写真17は観測小屋が写る。四点ともG-4の手動操作系統に属する。" },
  { chapter: 4, title: "平成27年3月11日 復旧記念記事", text: "管理棟には当時職員が常駐。駅前地下道の浸水は膝下以下。関係資料は通常書庫へ移管。水門は閉鎖後に警告灯を消灯。" },
  { chapter: 4, title: "地下書庫 B2-14 再点検記録", text: "復旧記念記事との差分確認: 写真19は暗い窓、写真20は高い濡れた線、写真23は金属扉の保管庫、写真24は赤い灯り。B2-14にG-4閉鎖遅延の説明資料として束ねられていた。" }
];

const locks = [
  {
    id: "lock1",
    title: "第一照会",
    chapter: 1,
    prompt: "平成26年の臨時号と令和6年の再掲写真メモを比較し、臨時号本文と食い違う写真側の要素を順に入力してください。",
    fields: ["写真01 水位標 / 臨時号: 青帯以下", "写真02 案内板 / 臨時号: 左回り経路", "写真04 掲示板 / 臨時号: 17:30更新完了", "写真05 体育館 / 臨時号: 浸水なし"],
    asks: [["赤い帯", "赤帯"], ["右矢印", "右", "矢印"], ["掲示板時計", "時計"], ["泥跡", "泥"]],
    reveal: "当時の臨時号は、赤い帯、右向き矢印、掲示板時計、泥跡と食い違う。公開本文の平静な説明が、写真で崩れ始める。"
  },
  {
    id: "lock2",
    title: "第二照会",
    chapter: 2,
    prompt: "平成26年の地域安全ニュースと再掲写真の目印欄を比較し、18:30以前の動きを示す写真側の要素を入力してください。",
    fields: ["写真07 水門 / 記事: 17:55閉鎖完了", "写真08 商店街 / 記事: 巡回は18:30以降", "写真09 詰所 / 記事: 出動は18:30以降", "写真12 掲示板 / 記事: 翌朝差し替え"],
    asks: [["水門中央", "中央部"], ["黄色い旗", "黄色", "旗"], ["長靴"], ["傾いた紙", "貼り替え"]],
    reveal: "安全ニュースの時刻説明に対し、水門中央、黄色い旗、長靴、傾いた紙が発表前の動きを示す。G-4側の対応は記事より早く始まっていた。"
  },
  {
    id: "lock3",
    title: "第三照会",
    chapter: 3,
    prompt: "平成26年の町長会見要旨と再掲写真の操作系統メモを比較し、通常運転説明と食い違う要素を入力してください。",
    fields: ["写真13 操作盤 / 会見: 通常運転", "写真14 鍵箱 / 会見: 予備鍵使用なし", "写真16 会議 / 会見: G区画扱いなし", "写真17 観測 / 会見: 17:40停止済み"],
    asks: [["赤緑ランプ", "赤と緑", "ランプ"], ["黄色い鍵札", "黄色い札", "鍵札"], ["会議地図", "地図"], ["観測小屋", "小屋"]],
    reveal: "会見要旨に対し、赤緑ランプ、黄色い鍵札、会議地図、観測小屋がG-4の手動操作を示す。17:55の判断は通常運転では説明できない。"
  },
  {
    id: "lock4",
    title: "第四照会",
    chapter: 4,
    prompt: "平成27年の復旧記念記事とB2-14再点検記録を比較し、記事の説明と食い違う写真側の要素を入力してください。",
    fields: ["写真19 管理棟 / 記事: 職員常駐", "写真20 地下道 / 記事: 膝下以下", "写真23 書庫 / 記事: 通常書庫", "写真24 水門 / 記事: 警告灯消灯"],
    asks: [["暗い窓", "窓"], ["濡れた線", "水の跡"], ["金属扉", "扉"], ["赤い灯り", "赤灯"]],
    reveal: "復旧記念記事に対し、暗い窓、濡れた線、金属扉、赤い灯りがB2-14の再点検記録と一致する。G-4閉鎖遅延は公開記事から外された資料束として残っていた。"
  }
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
    const inputs = lock.asks.map((_, index) => `<label class="field-label">${lock.fields[index]}<input data-lock="${lock.id}" data-index="${index}" placeholder="写真で見える物" ${available && !solved ? "" : "disabled"}></label>`).join("");
    const prompt = lock.prompt || "写真注記から参照値を入力してください。";
    return `<div class="lock-box"><strong>${lock.title}</strong><p class="small">${solved ? lock.reveal : prompt}</p>${solved ? "" : inputs + `<button type="button" ${available ? "" : "disabled"} onclick="submitLock('${lock.id}')">照会する</button><p id="${lock.id}Msg"></p>`}</div>`;
  }).join("");
}

function syncTabs() { document.querySelectorAll(".tab").forEach((tab) => tab.classList.toggle("active", tab.dataset.tab === state.activeTab)); document.querySelectorAll(".panel").forEach((panel) => panel.classList.toggle("active", panel.dataset.panel === state.activeTab)); }
function selectPhoto(index) { if (!isUnlocked(photos[index])) return; state.selected = index; state.activeTab = "photo"; render(); }
function inspectCurrent() { const photo = photos[state.selected]; state.clues.add(photo.id); $("inspectText").textContent = photo.clue; renderNotes(); renderGrid(); save(); }

function submitLock(id) {
  const lock = locks.find((entry) => entry.id === id);
  const values = [...document.querySelectorAll(`input[data-lock="${id}"]`)].map((input) => normalize(input.value));
  const ok = lock.asks.every((answer, index) => answerMatches(answer, values[index]));
  const msg = $(`${id}Msg`);
  if (!ok) { msg.textContent = "照会内容を整理できませんでした。写真注記と公開資料を見直してください。"; msg.className = "ng"; return; }
  state.solved.add(id); msg.textContent = lock.reveal; msg.className = "ok"; render();
}

function normalize(value) { return String(value || "").replace(/\s|\u3000|-/g, "").toLowerCase(); }

function answerMatches(expected, value) {
  if (!value) return false;
  const options = Array.isArray(expected) ? expected : [expected];
  return options.some((entry) => {
    const answer = normalize(entry);
    return answer === value || answer.includes(value) || value.includes(answer);
  });
}

function submitFinal() {
  const answer = normalize($("finalAnswer").value);
  const ok = ["g4", "1755", "水門", "b214"].every((word) => answer.includes(word)) && (answer.includes("遅延") || answer.includes("閉鎖")) && (answer.includes("改ざん") || answer.includes("ずれ"));
  $("finalMsg").textContent = ok ? "照合しました。G-4水門の閉鎖遅延と、後年の説明資料のずれが地下書庫B2-14の記録と一致します。" : "整理内容を照合できませんでした。G-4、17:55、水門、閉鎖遅延、B2-14、説明資料のずれを結び付けてください。";
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
