const saveKey = "missingIdolStateV1";
const params = new URLSearchParams(location.search);
const isDebug = params.get("debug") === "1";

if (params.get("reset") === "1") {
  Object.keys(localStorage)
    .filter(key => key.startsWith("missingIdolState"))
    .forEach(key => localStorage.removeItem(key));
  if (!location.hash) history.replaceState(null, "", `${location.pathname}${location.search}#/photobook`);
}

const initialState = {
  introDismissed: false,
  route: "photobook",
  selectedPhoto: "group_chairs",
  viewedPhotos: [],
  observations: [],
  searchUnlocked: false,
  searchQuery: "",
  searchHistory: [],
  archiveUnlocked: [],
  selectedArchive: "",
  readArchives: [],
  nameSolved: false,
  solvedName: "",
  finalPhoto: "",
  finalName: "",
  ending: false,
  extraPhotoSeen: false
};

const state = loadState();
const app = document.querySelector("#app");
const navButtons = [...document.querySelectorAll("[data-route]")];

const photos = [
  { id: "cover", section: "表紙", title: "表紙", file: "cover_photobook.svg", src: "assets/images/cover_photobook.webp", note: "6人のシルエット。写真集タイトル『きらめきのあとで』。" },
  { id: "group_chairs", section: "集合写真", title: "集合写真", file: "group_chairs.svg", src: "assets/images/group_chairs.webp", note: "写っているのは6人。椅子は7脚。" },
  { id: "dressing_room_cups", section: "楽屋", title: "楽屋の紙コップ", file: "dressing_room_cups.svg", src: "assets/images/dressing_room_cups.webp", note: "紙コップが7つ。1つだけテープで名前が隠れている。" },
  { id: "stage_mics", section: "ステージ", title: "ステージ", file: "stage_mics.svg", src: "assets/images/stage_mics.webp", note: "マイクスタンドが7本。立ち位置も7人分に見える。" },
  { id: "mirror_sleeve", section: "オフショット", title: "鏡のあるオフショット", file: "mirror_sleeve.svg", src: "assets/images/mirror_sleeve.webp", note: "鏡の端にだけ、説明できない袖が見える。" },
  { id: "formation_sheet", section: "ステージ", title: "立ち位置表", file: "formation_sheet.svg", src: "assets/images/formation_sheet.webp", note: "1〜7の番号。4番だけ黒塗り。" },
  { id: "interview_page", section: "インタビュー", title: "インタビューページ", file: "interview_page.svg", src: "assets/images/interview_page.webp", note: "質問文には『全員で』。本文では6人だけが答えている。" },
  { id: "colophon_scan", section: "奥付", title: "奥付スキャン", file: "colophon_scan.svg", src: "assets/images/colophon_scan.webp", note: "撮影協力欄に黒塗りが残る。" }
];

const endingPhotos = [
  { id: "new_photo_after_restore", section: "復元後", title: "復元後の集合写真", file: "new_photo_after_restore.svg", src: "assets/images/new_photo_after_restore.webp", note: "椅子は7脚。メンバーも7人。端の人物だけ視線が合う。" },
  { id: "extra_viewer_reflection", section: "復元後", title: "ビューア反射", file: "extra_viewer_reflection.svg", src: "assets/images/extra_viewer_reflection.webp", note: "写真集を見ている画面に、背後の気配が反射している。" }
];

const members = ["朝比奈 玲", "水瀬 こはる", "三澄 奈緒", "叶井 すず", "橘 ゆめ", "星野 ましろ"];

const archives = {
  cache_product_old: {
    title: "cache_product_old.html",
    label: "古い写真集販売ページ",
    body: [
      "KRMK Online / cached 2024.08.16 23:11",
      "『きらめきのあとで』予約受付中。",
      "7人の今を閉じ込めた、最初で最後の写真集。",
      "現在の販売ページでは、この説明文は確認できません。",
      "差分: 7人 → 6人"
    ]
  },
  fan_blog_20240817: {
    title: "fan_blog_20240817.txt",
    label: "ファンブログ / 2024.08.17",
    body: [
      "今日の立ち位置、4番だけ空いてた。",
      "ミオちゃん、最近見ない。でも誰も触れない。",
      "6人で歌ってるのに、フォーメーションだけ7人時代のまま。",
      "コメント欄は翌日ごっそり消えていた。"
    ]
  },
  deleted_interview_partial: {
    title: "deleted_interview_partial.txt",
    label: "削除済みインタビュー",
    body: [
      "掲載前インタビュー断片 / recovered text",
      "参加メンバー: 朝比奈玲、水瀬こはる、三澄奈緒、<redact></redact>、叶井すず、橘ゆめ、星野ましろ",
      "記者メモ: 初瀬■■の回答のみ差し替え指示。",
      "質問: 全員で最初に撮った写真集について。"
    ]
  },
  mirror_crop_cache: {
    title: "mirror_crop_cache.svg",
    label: "鏡袖キャッシュ",
    image: "assets/images/mirror_crop_cache.webp",
    body: [
      "鏡端の拡大キャッシュ。",
      "袖の衣装色は現行6名の衣装表と一致しない。",
      "衣装管理表では4番衣装の記録だけが空欄。"
    ]
  },
  formation_archive: {
    title: "formation_archive.txt",
    label: "古い立ち位置表",
    body: [
      "LIVE 2024.08.17 / opening formation",
      "1 A.R. / 2 M.K. / 3 M.N. / 4 H.M. / 5 K.S. / 6 T.Y. / 7 H.Ms.",
      "現在版では4番のみ欠番として扱われている。",
      "注記: H.M. は初瀬ミオの略記と推定。"
    ]
  }
};

const hintGroups = [
  ["人数の違和感", "集合写真で人物以外の数を数えてください。", "椅子、紙コップ、マイクの数を比べます。", "公式プロフィールの人数と合いません。", "7人"],
  ["名前の復元", "紙コップ、削除済み記事、ファンブログ、立ち位置表を見ます。", "『ミ』、初瀬■■、H.M. を同じ人物として扱えるか確認します。", "ファンブログの呼び名が最後の読みを補います。", "初瀬ミオ"],
  ["復元対象", "候補写真のうち、本人の痕跡が最も直接残るものを選びます。", "人数の多さだけではなく、現在メンバーでは説明できない要素を見ます。", "鏡の端にだけ残る衣装の一部です。", "mirror_sleeve.svg"]
];

function loadState() {
  try {
    return { ...structuredClone(initialState), ...JSON.parse(localStorage.getItem(saveKey) || "{}") };
  } catch {
    return structuredClone(initialState);
  }
}

function saveState() {
  localStorage.setItem(saveKey, JSON.stringify(state));
}

function esc(value) {
  return String(value).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function addUnique(key, value) {
  if (!state[key].includes(value)) state[key].push(value);
}

function has(id) {
  return state.observations.includes(id);
}

function toast(title, body) {
  const el = document.createElement("div");
  el.className = "toast";
  el.innerHTML = `<b>${esc(title)}</b><p>${esc(body)}</p>`;
  document.querySelector("#toast-stack").appendChild(el);
  setTimeout(() => el.remove(), 4200);
}

function allPhotos() {
  return state.ending ? [...photos, ...endingPhotos] : photos;
}

function currentPhoto() {
  return allPhotos().find(photo => photo.id === state.selectedPhoto) || photos[1];
}

function route() {
  return (location.hash.replace("#/", "") || state.route || "photobook").split("?")[0];
}

function setRoute(next) {
  state.route = next;
  saveState();
  location.hash = `#/${next}`;
}

function unlockSearch(reason) {
  if (!state.searchUnlocked) {
    state.searchUnlocked = true;
    toast("Search", "架空検索が利用可能になりました。");
  }
  if (reason) toast("Notes", reason);
}

function unlockArchive(id) {
  if (!state.archiveUnlocked.includes(id)) {
    state.archiveUnlocked.push(id);
    toast("Archive", `${archives[id]?.label || id} が追加されました。`);
  }
}

function recordObservation(id, label) {
  if (!has(id)) {
    state.observations.push(id);
    toast("違和感を記録", label);
  }
}

function renderIntro() {
  if (state.introDismissed) return "";
  return `
    <section class="intro-modal" role="dialog" aria-modal="true" aria-labelledby="intro-title">
      <article>
        <p class="kicker">Photo Archive</p>
        <h1 id="intro-title">写真集アーカイブ</h1>
        <p>このページでは、アイドルグループ「夜明け前、まだ名前はない。」の写真集『きらめきのあとで』を閲覧できます。</p>
        <p>まずは写真集を確認してください。違和感があれば、Searchで調べることができます。</p>
        <p class="intro-next">最初に見るべきもの: PhotoBook の「集合写真」セクション</p>
        <button class="button" data-dismiss-intro type="button">写真集を見る</button>
      </article>
    </section>
  `;
}

function renderLayout(content) {
  return `${content}${renderIntro()}`;
}

function renderPhotobook() {
  const photo = currentPhoto();
  addUnique("viewedPhotos", photo.id);
  return renderLayout(`
    <section class="screen">
      <div class="screen-head">
        <div><p class="kicker">PhotoBook</p><h1>きらめきのあとで</h1><p>古いWeb写真集ビューアです。最初は普通の写真集として、写っているものの数と配置を確認してください。</p></div>
        <button class="ghost-button" data-route-jump="notes" type="button">調査メモ</button>
      </div>
      <div class="photobook-layout">
        <aside class="book-nav panel">
          <div class="thumb-list">
            ${allPhotos().map(item => `
              <button class="${item.id === photo.id ? "is-active" : ""}" data-photo="${item.id}" type="button">
                <span class="thumb-mini"><img src="${esc(item.src)}" alt=""></span>
                <span><b>${esc(item.title)}</b><small>${esc(item.section)} / ${esc(item.file)}</small></span>
              </button>
            `).join("")}
          </div>
        </aside>
        <section class="viewer">
          <figure class="photo-page image-frame">
            <img src="${esc(photo.src)}" alt="${esc(photo.title)}" onerror="this.closest('.image-frame').classList.add('is-missing');this.remove();">
            ${photo.id === "mirror_sleeve" ? `<button class="hotspot mirror" data-mirror-hotspot type="button" aria-label="鏡の端を拡大する"></button>` : ""}
          </figure>
        </section>
        <aside class="meta-pane panel">
          <h2>${esc(photo.title)}</h2>
          <table class="meta-table"><tr><th>セクション</th><td>${esc(photo.section)}</td></tr><tr><th>ファイル</th><td>${esc(photo.file)}</td></tr><tr><th>メモ</th><td>${esc(photo.note)}</td></tr></table>
          ${renderPhotoActions(photo)}
          <h2>記録済み</h2>
          <p>${state.observations.length ? state.observations.map(obsLabel).map(label => `<span class="observation-tag">${esc(label)}</span>`).join("") : "まだ違和感は記録されていません。"}</p>
        </aside>
      </div>
    </section>
  `);
}

function renderPhotoActions(photo) {
  if (photo.id === "group_chairs") {
    return `<div class="choices"><h2>違和感を記録する</h2>${["椅子が多い", "照明が暗い", "衣装の色が違う", "背景がぼやけている"].map(choice => `<button data-chair-choice="${esc(choice)}" type="button">${esc(choice)}</button>`).join("")}</div>`;
  }
  if (photo.id === "dressing_room_cups") {
    return `<div class="choices"><h2>拡大確認</h2><p>紙コップの数と、隠された名前の下を確認します。</p><button data-record="cups" type="button">紙コップを拡大して記録する</button></div>`;
  }
  if (photo.id === "stage_mics") {
    return `<div class="choices"><h2>何が多いか</h2>${["照明", "マイクスタンド", "靴", "背景幕"].map(choice => `<button data-mic-choice="${esc(choice)}" type="button">${esc(choice)}</button>`).join("")}</div>`;
  }
  if (photo.id === "formation_sheet") {
    return `<div class="choices"><h2>立ち位置表</h2><p>番号1〜7のうち、4番だけが黒塗りです。</p><button data-record="formation" type="button">4番欠番を記録する</button></div>`;
  }
  if (photo.id === "interview_page") {
    return `<div class="choices"><h2>本文確認</h2><p>質問文と回答者数が合っていません。</p><button data-record="interview" type="button">インタビューの矛盾を記録する</button></div>`;
  }
  if (photo.id === "colophon_scan") {
    return `<div class="choices"><h2>奥付</h2><p>撮影協力欄の黒塗りを記録します。</p><button data-record="colophon" type="button">黒塗りを記録する</button></div>`;
  }
  return `<p class="meta-note">写真を切り替え、写っている人数以外の数を見てください。</p>`;
}

function obsLabel(id) {
  return ({
    chairs: "椅子7脚",
    cups: "紙コップ7つ / ミの一部",
    mics: "マイクスタンド7本",
    mirror: "鏡の袖",
    formation: "4番欠番",
    interview: "全員で / 6回答",
    colophon: "奥付黒塗り"
  })[id] || id;
}

function availableSuggestions() {
  const base = ["夜明け前 まだ名前はない", "よあなま 写真集"];
  if (has("chairs")) base.push("よあなま 7人", "きらめきのあとで 椅子");
  if (has("cups")) base.push("よあなま 初期メンバー", "初瀬 ミ");
  if (has("formation")) base.push("よあなま 4番", "2024 8 17 ライブ");
  if (state.readArchives.includes("deleted_interview_partial") || state.readArchives.includes("formation_archive")) base.push("初瀬 ミオ");
  return base;
}

function renderSearch() {
  if (!state.searchUnlocked) {
    return renderLayout(`
      <section class="screen search-screen">
        <div class="screen-head"><div><p class="kicker">Search</p><h1>架空検索</h1><p>まだ検索できません。PhotoBookの集合写真で人数の違和感を記録してください。</p></div></div>
        <article class="panel pad"><h2>公式情報</h2><p>現在の公式プロフィールでは「夜明け前、まだ名前はない。」は6人組として掲載されています。</p></article>
      </section>
    `);
  }
  const results = searchResults(state.searchQuery);
  return renderLayout(`
    <section class="screen search-screen">
      <div class="screen-head"><div><p class="kicker">Search</p><h1>YumeSearch Cache</h1><p>実在検索には接続しない、端末内の架空検索です。検索語によってキャッシュ結果が変化します。</p></div></div>
      <form class="panel search-box" data-search-form>
        <input name="q" value="${esc(state.searchQuery)}" placeholder="よあなま 7人">
        <button class="button" type="submit">検索</button>
      </form>
      <div class="suggestions">${availableSuggestions().map(q => `<button data-suggest="${esc(q)}" type="button">${esc(q)}</button>`).join("")}</div>
      <div class="result-list">${results.map(renderResult).join("")}</div>
    </section>
  `);
}

function searchResults(query) {
  const q = query.trim().toLowerCase();
  const results = [
    ["official", "公式プロフィール｜夜明け前、まだ名前はない。", "公式 / profile.yoanama.local", "現在は6人組として掲載されています。", "profile"],
    ["sale", "写真集『きらめきのあとで』販売ページ", "store-cache.local", has("chairs") ? "現在版は6人表記。古いキャッシュでは7人表記が残っています。" : "6人の魅力を収録した写真集。", "archive:cache_product_old"]
  ];
  if (!q) return results;
  if (q.includes("7") || q.includes("椅子")) {
    results.push(["blog", "よあなま 7人時代について", "fan-note.local/old/817", "4番の子、最近見ない。立ち位置だけ空いていたという投稿。", "archive:fan_blog_20240817"]);
  }
  if (q.includes("初瀬") || q.includes("初期") || q.includes("ミ")) {
    results.push(["interview", "削除済みインタビュー断片", "deleted-cache.local/interview", "メンバー名一覧に『初瀬■■』が残っています。", "archive:deleted_interview_partial"]);
  }
  if (q.includes("4") || q.includes("ライブ") || q.includes("欠番")) {
    results.push(["formation", "2024.08.17 ライブ立ち位置表", "event-cache.local/20240817", "1〜7の立ち位置。4番にH.M.と記録。", "archive:formation_archive"]);
  }
  if (q.includes("初瀬") && q.includes("ミオ")) {
    results.push(["name", "初瀬ミオ 関連キャッシュ", "deep-cache.local/name", "検索結果は断片的です。公式プロフィールには表示されません。", "final"]);
  }
  return results;
}

function renderResult(result) {
  const [id, title, url, body, action] = result;
  return `<article class="result"><small>${esc(url)}</small><h2>${esc(title)}</h2><p>${esc(body)}</p>${renderAction(action, id)}</article>`;
}

function renderAction(action, id) {
  if (action === "profile") return `<button class="ghost-button" data-route-jump="profile" type="button">開く</button>`;
  if (action === "final") return `<button class="ghost-button" data-route-jump="final" type="button">復元確認へ</button>`;
  if (action?.startsWith("archive:")) return `<button class="ghost-button" data-unlock-archive="${esc(action.split(":")[1])}" type="button">キャッシュを開く</button>`;
  return "";
}

function renderArchive() {
  const available = Object.entries(archives).filter(([id, item]) => item.unlock || state.archiveUnlocked.includes(id));
  const activeId = state.selectedArchive && archives[state.selectedArchive] && available.some(([id]) => id === state.selectedArchive) ? state.selectedArchive : available[0]?.[0];
  const active = archives[activeId];
  return renderLayout(`
    <section class="screen">
      <div class="screen-head"><div><p class="kicker">Archive</p><h1>削除済みキャッシュ</h1><p>検索結果や写真のhotspotから、削除済み記事・古いページの断片が追加されます。</p></div></div>
      <div class="archive-grid">
        <aside class="archive-list panel">${available.map(([id, item]) => `<button class="${id === activeId ? "is-active" : ""}" data-archive="${id}" type="button"><b>${esc(item.title)}</b><small>${esc(item.label)}</small></button>`).join("")}</aside>
        <article class="cache-doc">${active ? renderArchiveDoc(activeId, active) : `<h2>キャッシュはまだありません</h2>`}</article>
      </div>
    </section>
  `);
}

function renderArchiveDoc(id, item) {
  addUnique("readArchives", id);
  return `
    <small>Recovered cache / ${esc(item.title)}</small>
    <h2>${esc(item.label)}</h2>
    ${item.image ? `<figure class="image-frame"><img src="${esc(item.image)}" alt="${esc(item.label)}" onerror="this.closest('.image-frame').classList.add('is-missing');this.remove();"></figure>` : ""}
    ${item.body.map(line => `<p>${line.replaceAll("<redact></redact>", `<span class="redact"></span>`)}</p>`).join("")}
  `;
}

function renderProfile() {
  const showHistory = state.searchHistory.length > 0 || state.readArchives.length > 0;
  return renderLayout(`
    <section class="screen">
      <div class="screen-head"><div><p class="kicker">Profile</p><h1>公式プロフィール</h1><p>現在公開されている情報では、最初から6人組だったように見えます。</p></div></div>
      <div class="profile-grid">
        <section class="panel pad"><h2>夜明け前、まだ名前はない。</h2><p>略称: よあなま / 現在の掲載人数: 6人</p><div class="member-grid">${members.map(name => `<article class="member-card"><div class="member-avatar"></div><b>${esc(name)}</b><p>Profile available</p></article>`).join("")}</div></section>
        <aside class="panel pad"><h2>更新履歴</h2>${showHistory ? `<ul class="timeline"><li><b>2024.08.18</b><br>メンバー表記を修正しました。</li><li><b>2024.08.19</b><br>写真集掲載情報を更新しました。</li><li><b>2024.08.20</b><br>一部画像の表示不具合を修正しました。</li></ul>` : `<p>更新履歴はありません。</p>`}</aside>
      </div>
    </section>
  `);
}

function renderNotes() {
  const checks = [
    ["PhotoBookの集合写真を見る", state.viewedPhotos.includes("group_chairs")],
    ["椅子の違和感を記録する", has("chairs")],
    ["Searchで7人に関する情報を調べる", state.searchHistory.some(q => q.includes("7"))],
    ["紙コップとマイクの違和感を記録する", has("cups") && has("mics")],
    ["鏡の袖を拡大する", has("mirror")],
    ["削除記事と立ち位置表を読む", state.readArchives.includes("deleted_interview_partial") && state.readArchives.includes("formation_archive")],
    ["消された名前を復元する", state.nameSolved],
    ["復元対象写真を選び、Finalを完了する", state.ending]
  ];
  return renderLayout(`
    <section class="screen">
      <div class="screen-head"><div><p class="kicker">Notes</p><h1>調査メモ</h1><p>見つけた違和感、検索メモ、段階ヒントを確認できます。</p></div></div>
      <div class="notes-grid">
        <section class="panel pad note-list">
          <article><h2>初期メモ</h2><p>写真集アーカイブを確認してください。最初は PhotoBook の「集合写真」を見てください。人数、椅子、マイク、紙コップなど、写っているものの数に注意してください。</p></article>
          <article><h2>見つけた違和感</h2><p>${state.observations.length ? state.observations.map(obsLabel).map(label => `<span class="observation-tag">${esc(label)}</span>`).join("") : "正解した違和感だけがここに記録されます。"}</p></article>
          <article><h2>検索メモ</h2><p>${state.searchHistory.length ? state.searchHistory.map(q => `<span class="observation-tag">${esc(q)}</span>`).join("") : "まだ検索履歴はありません。"}</p></article>
        </section>
        <aside class="panel pad">
          <h2>進行チェック</h2>
          <ul class="check-list">${checks.map(([label, done]) => `<li class="${done ? "done" : ""}">${done ? "✓" : "□"} ${esc(label)}</li>`).join("")}</ul>
          <h2>段階ヒント</h2>
          ${hintGroups.map(([title, h1, h2, h3, answer]) => `<details><summary>${esc(title)}</summary><p>第1段階: ${esc(h1)}</p><p>第2段階: ${esc(h2)}</p><p>第3段階: ${esc(h3)}</p>${isDebug ? `<p class="debug-answer">答え: ${esc(answer)}</p>` : ""}</details>`).join("")}
          <h2>Reset</h2>
          <p>初期状態で確認する場合は <code>start.html?reset=1</code> を使用できます。</p>
          <button class="button danger" data-reset type="button">進行状況を初期化</button>
        </aside>
      </div>
    </section>
  `);
}

function renderFinal() {
  return renderLayout(`
    <section class="screen">
      <div class="screen-head"><div><p class="kicker">Final</p><h1>復元確認</h1><p>どの写真を復元対象にするか選び、消されたメンバー名を入力してください。</p></div></div>
      <div class="final-grid">
        <section class="panel pad">
          ${state.ending ? renderEnding() : renderFinalForm()}
        </section>
        <aside class="panel pad"><h2>復元判断メモ</h2><p>人数の痕跡だけではなく、現在メンバーでは説明できない衣装の一部が残る写真を選びます。</p><p>入力許容: 初瀬ミオ / 初瀬 みお / はつせみお / ミオ</p></aside>
      </div>
    </section>
  `);
}

function renderFinalForm() {
  return `
    <form class="final-form" data-final-form>
      <h2>復元対象を選択</h2>
      ${["group_chairs.svg", "dressing_room_cups.svg", "stage_mics.svg", "mirror_sleeve.svg", "formation_sheet.svg"].map(name => `<label class="final-choice"><input type="radio" name="photo" value="${name}" ${state.finalPhoto === name ? "checked" : ""}><span>${name}</span></label>`).join("")}
      <label><b>消されたメンバーの名前</b><input type="text" name="name" value="${esc(state.finalName)}" placeholder="初瀬ミオ"></label>
      <button class="button" type="submit">復元処理を開始</button>
    </form>
  `;
}

function normalizeName(value) {
  return value.replace(/\s+/g, "").replace(/[　]/g, "").toLowerCase();
}

function isNameCorrect(value) {
  const normalized = normalizeName(value);
  return ["初瀬ミオ", "初瀬みお", "はつせみお", "ミオ"].some(answer => normalizeName(answer) === normalized);
}

function renderEnding() {
  return `
    <div class="ending">
      <h2>復元処理を開始しました。</h2>
      <p>写真集: <strong>きらめきのあとで</strong></p>
      <p>掲載人数: <strong>6 → 7</strong></p>
      <p>復元対象: <strong>初瀬ミオ</strong></p>
      <p>Notes: 記録を更新しました。</p>
      <p>あなたが確認した写真: 8枚<br>写真集の掲載写真: 9枚</p>
      <button class="ghost-button" data-photo-after type="button">PhotoBookへ戻る</button>
    </div>
  `;
}

function renderApp() {
  const current = route();
  state.route = current;
  navButtons.forEach(button => {
    const locked = button.dataset.route === "search" && !state.searchUnlocked;
    button.classList.toggle("is-locked", locked);
    button.setAttribute("aria-current", button.dataset.route === current ? "page" : "false");
  });
  const renderers = { photobook: renderPhotobook, search: renderSearch, archive: renderArchive, profile: renderProfile, notes: renderNotes, final: renderFinal };
  app.innerHTML = (renderers[current] || renderPhotobook)();
  bindEvents();
  saveState();
}

function bindEvents() {
  document.querySelector("[data-dismiss-intro]")?.addEventListener("click", () => {
    state.introDismissed = true;
    saveState();
    renderApp();
  });
  document.querySelectorAll("[data-route-jump]").forEach(button => button.addEventListener("click", () => {
    const next = button.dataset.routeJump;
    if (next === "search" && !state.searchUnlocked) {
      toast("Search", "集合写真の違和感を記録すると利用できます。");
      return;
    }
    setRoute(next);
  }));
  document.querySelectorAll("[data-photo]").forEach(button => button.addEventListener("click", () => {
    state.selectedPhoto = button.dataset.photo;
    saveState();
    renderApp();
  }));
  document.querySelectorAll("[data-chair-choice]").forEach(button => button.addEventListener("click", () => {
    if (button.dataset.chairChoice === "椅子が多い") {
      recordObservation("chairs", "集合写真: 椅子が7脚あります。");
      unlockSearch("人数の違和感をNotesに記録しました。Searchで調べられます。");
    } else {
      toast("違和感ではありません", "写真の構図より、人数に関係する物の数を見てください。");
    }
    saveState();
    renderApp();
  }));
  document.querySelectorAll("[data-mic-choice]").forEach(button => button.addEventListener("click", () => {
    if (button.dataset.micChoice === "マイクスタンド") {
      recordObservation("mics", "ステージ: マイクスタンドが7本あります。");
    } else {
      toast("違和感ではありません", "ステージで人数分用意されるものを見てください。");
    }
    saveState();
    renderApp();
  }));
  document.querySelectorAll("[data-record]").forEach(button => button.addEventListener("click", () => {
    const id = button.dataset.record;
    if (id === "cups") recordObservation("cups", "楽屋: 隠れた紙コップに『ミ』の一部が見えます。");
    if (id === "formation") {
      recordObservation("formation", "立ち位置表: 4番だけが欠番です。");
      unlockArchive("formation_archive");
    }
    if (id === "interview") recordObservation("interview", "インタビュー: 全員で、という質問に6人だけが答えています。");
    if (id === "colophon") unlockArchive("deleted_interview_partial");
    saveState();
    renderApp();
  }));
  document.querySelector("[data-mirror-hotspot]")?.addEventListener("click", () => {
    recordObservation("mirror", "鏡の端: 現在メンバーでは説明できない袖が写っています。");
    unlockArchive("mirror_crop_cache");
    saveState();
    renderApp();
  });
  document.querySelector("[data-search-form]")?.addEventListener("submit", event => {
    event.preventDefault();
    const q = new FormData(event.currentTarget).get("q").toString();
    state.searchQuery = q;
    if (q.trim()) addUnique("searchHistory", q.trim());
    saveState();
    renderApp();
  });
  document.querySelectorAll("[data-suggest]").forEach(button => button.addEventListener("click", () => {
    state.searchQuery = button.dataset.suggest;
    addUnique("searchHistory", state.searchQuery);
    saveState();
    renderApp();
  }));
  document.querySelectorAll("[data-unlock-archive]").forEach(button => button.addEventListener("click", () => {
    const id = button.dataset.unlockArchive;
    unlockArchive(id);
    state.selectedArchive = id;
    setRoute("archive");
  }));
  document.querySelectorAll("[data-archive]").forEach(button => button.addEventListener("click", () => {
    state.selectedArchive = button.dataset.archive;
    saveState();
    renderApp();
  }));
  document.querySelector("[data-final-form]")?.addEventListener("submit", event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    state.finalPhoto = data.get("photo")?.toString() || "";
    state.finalName = data.get("name")?.toString() || "";
    if (state.finalPhoto !== "mirror_sleeve.svg") {
      toast("復元対象が違います", "人数の痕跡ではなく、本人の痕跡が残る写真を選んでください。");
      saveState();
      renderApp();
      return;
    }
    if (!isNameCorrect(state.finalName)) {
      toast("名前が一致しません", "紙コップ、削除記事、立ち位置表、ファンブログを照合してください。");
      saveState();
      renderApp();
      return;
    }
    state.nameSolved = true;
    state.solvedName = "初瀬ミオ";
    state.ending = true;
    state.selectedPhoto = "new_photo_after_restore";
    saveState();
    toast("復元処理", "写真集の掲載情報が更新されました。");
    renderApp();
  });
  document.querySelector("[data-photo-after]")?.addEventListener("click", () => {
    state.selectedPhoto = state.extraPhotoSeen ? "extra_viewer_reflection" : "new_photo_after_restore";
    state.extraPhotoSeen = true;
    saveState();
    setRoute("photobook");
  });
  document.querySelector("[data-reset]")?.addEventListener("click", () => {
    if (!confirm("進行状況を初期化します。")) return;
    Object.keys(localStorage)
      .filter(key => key.startsWith("missingIdolState"))
      .forEach(key => localStorage.removeItem(key));
    Object.assign(state, structuredClone(initialState));
    location.hash = "#/photobook";
    renderApp();
  });
}

window.addEventListener("hashchange", renderApp);
navButtons.forEach(button => button.addEventListener("click", () => {
  if (button.dataset.route === "search" && !state.searchUnlocked) {
    toast("Search", "集合写真の違和感を記録すると利用できます。");
    return;
  }
  setRoute(button.dataset.route);
}));
if (!location.hash) location.hash = "#/photobook";
renderApp();
