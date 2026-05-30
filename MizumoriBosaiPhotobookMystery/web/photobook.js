const photos = [
  ["北堤防の水位標", "川沿いの水位標と堤防通路。", "photo-01-river-embankment.jpg"],
  ["避難案内板", "用水路沿いに立つ黄色い避難案内。", "photo-02-evacuation-sign.jpg"],
  ["水穂橋下", "橋脚下の通路と赤いコーン。", "photo-03-mizuho-bridge.jpg"],
  ["町役場前掲示板", "掲示板と庁舎外壁の時計。", "photo-04-townhall-board.jpg"],
  ["避難所体育館", "避難所体育館の入口付近。", "photo-05-school-gym.jpg"],
  ["備蓄棚", "毛布と箱が並ぶ備蓄棚。", "photo-06-stockpile-shelf.jpg"],
  ["水門遠景", "川に面した大型水門の遠景。", "photo-07-floodgate-distance.jpg"],
  ["商店街の防災旗", "雨の商店街に並ぶ防災週間の旗。", "photo-08-shopping-flags.jpg"],
  ["消防団詰所", "消防団詰所内の机と装備。", "photo-09-fire-brigade.jpg"],
  ["公園の水位柱", "公園内に立つ色帯付きの水位柱。", "photo-10-park-water-pillar.jpg"],
  ["旧排水路跡", "錆びた柵で閉じられた旧排水路。", "photo-11-old-drainage.jpg"],
  ["南町会掲示板", "雨に濡れた南町会掲示板。", "photo-12-south-bulletin.jpg"],
  ["管理盤", "水門設備の操作盤。", "photo-13-control-panel.jpg"],
  ["鍵保管箱", "管理棟内の鍵保管箱。", "photo-14-key-box.jpg"],
  ["高台への道", "川沿いから高台へ続く坂道。", "photo-15-hill-road.jpg"],
  ["説明会場の地図", "水害対策本部会議の説明写真。", "photo-16-mayor-map.jpg"],
  ["雨量観測小屋", "川沿いの観測小屋。", "photo-17-rain-gauge.jpg"],
  ["臨時救護所前", "旧診療所前の掲示板と入口。", "photo-18-clinic-sign.jpg"],
  ["水門管理棟", "水門横の小さな管理棟。", "photo-19-management-hut.jpg"],
  ["地下道入口", "駅前地下道の防水扉付近。", "photo-20-underpass.jpg"],
  ["記念広場", "復旧記念碑のある広場。", "photo-21-memorial-plaza.jpg"],
  ["合同防災訓練", "土のうとポンプを使った訓練風景。", "photo-22-flood-drill.jpg"],
  ["地下書庫入口", "地下資料室前の廊下。", "photo-23-basement-archive.jpg"],
  ["閉鎖後の水門", "夜明け前の水門正面。", "photo-24-closed-floodgate.jpg"]
].map((row, index) => ({
  title: row[0],
  caption: row[1],
  img: `./assets/${row[2]}`,
  number: String(index + 1).padStart(2, "0")
}));

let selected = 0;
let zoom = 1;

const $ = (id) => document.getElementById(id);

function renderGrid() {
  $("photoCount").textContent = `${photos.length}件`;
  $("photoGrid").innerHTML = photos.map((photo, index) => `
    <button class="photo-card" type="button" onclick="openPhoto(${index})">
      <img src="${photo.img}" alt="${photo.title}">
      <strong>${photo.number}. ${photo.title}</strong>
      <span>${photo.caption}</span>
    </button>
  `).join("");
}

function openPhoto(index) {
  selected = index;
  zoom = 1;
  const photo = photos[selected];
  $("modalTitle").textContent = `${photo.number}. ${photo.title}`;
  $("modalImage").src = photo.img;
  $("modalImage").alt = photo.title;
  $("modalCaption").textContent = photo.caption;
  $("photoModal").classList.add("open");
  $("photoModal").setAttribute("aria-hidden", "false");
  updateZoom();
}

function closePhoto() {
  $("photoModal").classList.remove("open");
  $("photoModal").setAttribute("aria-hidden", "true");
}

function updateZoom() {
  const image = $("modalImage");
  const baseWidth = image.naturalWidth || 1586;
  image.style.width = `${Math.round(baseWidth * zoom)}px`;
}

function changeZoom(delta) {
  zoom = Math.min(4, Math.max(0.7, Math.round((zoom + delta) * 10) / 10));
  updateZoom();
}

$("modalClose").addEventListener("click", closePhoto);
$("zoomIn").addEventListener("click", () => changeZoom(0.3));
$("zoomOut").addEventListener("click", () => changeZoom(-0.3));
$("zoomReset").addEventListener("click", () => { zoom = 1; updateZoom(); });
$("modalImage").addEventListener("load", updateZoom);
$("photoModal").addEventListener("click", (event) => { if (event.target.id === "photoModal") closePhoto(); });
document.addEventListener("keydown", (event) => { if (event.key === "Escape") closePhoto(); });

renderGrid();
