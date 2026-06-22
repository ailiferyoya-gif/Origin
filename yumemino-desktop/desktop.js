const saveKey = "yriDesktopMvpState";

const initialState = {
  contactSubmitted: false,
  searchUnlocked: false,
  unreadTalk: 0,
  unreadFiles: 0,
  currentFolder: "downloads",
  selectedFile: "",
  browserPath: "/",
  searchQuery: "",
  messageIds: ["welcome-1"]
};

const talkMessages = {
  "welcome-1": {
    from: "資料窓口",
    body: "ユメミノ総合研究所 資料窓口です。企業サイトの資料請求フォームからお申し込みください。",
    time: "09:12"
  },
  "request-1": {
    from: "me",
    body: "資料請求フォームを送信しました。",
    time: "now"
  },
  "request-2": {
    from: "資料窓口",
    body: "ご請求ありがとうございます。サービス概要資料をこの端末のDownloadsへ保存しました。あわせて、関連情報を確認できるSearchアプリを有効化しています。",
    time: "now",
    attachment: "service_overview_2026.pdf"
  }
};

const fileRecords = {
  downloads: [
    { id: "readme", name: "readme_first.txt", type: "TEXT", updated: "2026-06-23 09:00", available: true },
    { id: "service_overview_2026", name: "service_overview_2026.pdf", type: "PDF", updated: "2026-06-23 09:18", gatedBy: "contactSubmitted" }
  ],
  recovered: [
    { id: "empty-recovered", name: "復元済みファイルはありません", type: "SYSTEM", updated: "-", available: true }
  ]
};

const routeMap = {
  "/": "index.html#/",
  "/about": "index.html#/about",
  "/business": "index.html#/business",
  "/news": "index.html#/news",
  "/ir": "index.html#/ir",
  "/recruit": "index.html#/recruit",
  "/contact": "index.html#/contact",
  "/login": "index.html#/login"
};

const state = loadState();
const layer = document.querySelector("#window-layer");
const notice = document.querySelector("#topbar-notice");

function loadState() {
  try {
    return { ...initialState, ...JSON.parse(localStorage.getItem(saveKey) || "{}") };
  } catch {
    return { ...initialState };
  }
}

function saveState() {
  localStorage.setItem(saveKey, JSON.stringify(state));
  updateBadges();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function setNotice(text) {
  notice.textContent = text;
}

function toast(title, body) {
  const stack = document.querySelector("#toast-stack");
  const item = document.createElement("div");
  item.className = "toast";
  item.innerHTML = `<b>${escapeHtml(title)}</b><br><span>${escapeHtml(body)}</span>`;
  stack.appendChild(item);
  setTimeout(() => item.remove(), 5200);
}

function updateClock() {
  const now = new Date();
  document.querySelector("#clock").textContent = new Intl.DateTimeFormat("ja-JP", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(now);
}

function updateBadges() {
  const talkBadge = document.querySelector("#talk-badge");
  const filesBadge = document.querySelector("#files-badge");
  const searchIcon = document.querySelector("#search-icon");

  talkBadge.hidden = state.unreadTalk < 1;
  talkBadge.textContent = state.unreadTalk;
  filesBadge.hidden = state.unreadFiles < 1;
  filesBadge.textContent = state.unreadFiles;
  searchIcon.classList.toggle("is-locked", !state.searchUnlocked);
}

function setHash(app) {
  const next = `#/${app}`;
  if (location.hash !== next) location.hash = next;
}

function currentAppFromHash() {
  return location.hash.replace(/^#\//, "") || "browser";
}

function appLabel(app) {
  return {
    browser: "Browser",
    talk: "Talk",
    files: "Files",
    search: "Search",
    notes: "Notes / Help"
  }[app] || "Window";
}

function openApp(app) {
  if (app === "search" && !state.searchUnlocked) {
    toast("Searchはまだ利用できません", "資料請求後に検索インデックスが同期されます。");
    setNotice("Searchはロックされています");
    return;
  }

  if (app === "talk") state.unreadTalk = 0;
  if (app === "files") state.unreadFiles = 0;
  saveState();

  layer.innerHTML = "";
  layer.appendChild(createWindow(app));
  setHash(app);
}

function createWindow(app) {
  const win = document.createElement("section");
  win.className = "app-window";
  win.dataset.app = app;
  win.setAttribute("role", "dialog");
  win.setAttribute("aria-label", appLabel(app));
  win.innerHTML = `
    <header class="window-titlebar">
      <b>${appLabel(app)}</b>
      <div class="window-actions">
        <button type="button" data-action="home" aria-label="Browserを開く">B</button>
        <button type="button" data-action="close" aria-label="閉じる">x</button>
      </div>
    </header>
    <div class="window-body">${renderApp(app)}</div>
  `;
  bindWindow(win, app);
  return win;
}

function bindWindow(win, app) {
  win.querySelector('[data-action="close"]')?.addEventListener("click", () => {
    win.remove();
    history.replaceState(null, "", "#/");
  });
  win.querySelector('[data-action="home"]')?.addEventListener("click", () => openApp("browser"));

  if (app === "browser") bindBrowser(win);
  if (app === "talk") bindTalk(win);
  if (app === "files") bindFiles(win);
  if (app === "search") bindSearch(win);
}

function renderApp(app) {
  if (app === "browser") return renderBrowser();
  if (app === "talk") return renderTalk();
  if (app === "files") return renderFiles();
  if (app === "search") return renderSearch();
  return renderNotes();
}

function renderBrowser() {
  const src = routeMap[state.browserPath] || routeMap["/"];
  return `
    <div class="browser-body">
      <form class="browser-toolbar" id="browser-form">
        <div class="browser-buttons">
          <button type="button" data-browser-path="/">Home</button>
          <button type="button" data-browser-path="/contact">資料請求</button>
        </div>
        <input class="browser-address" id="browser-address" value="yri://site${state.browserPath}" aria-label="仮想アドレス">
        <button type="submit">移動</button>
      </form>
      <iframe class="browser-frame" id="browser-frame" title="Yumemino Research Institute" src="${src}"></iframe>
      <div class="notice-line" id="browser-notice">外部サイトへは接続しません。このBrowserは端末内の企業サイトだけを表示します。</div>
    </div>
  `;
}

function parseVirtualAddress(value) {
  const normalized = value.trim()
    .replace(/^yri:\/\/site/i, "")
    .replace(/^index\.html#?/i, "")
    .replace(/^#/, "");
  const path = normalized.startsWith("/") ? normalized : `/${normalized}`;
  return routeMap[path] ? path : "";
}

function bindBrowser(win) {
  const frame = win.querySelector("#browser-frame");
  const address = win.querySelector("#browser-address");
  const browserNotice = win.querySelector("#browser-notice");

  win.querySelector("#browser-form")?.addEventListener("submit", event => {
    event.preventDefault();
    const next = parseVirtualAddress(address.value);
    if (!next) {
      browserNotice.textContent = "この端末では外部URLまたは未登録ページを開けません。yri://site/contact のように入力してください。";
      return;
    }
    state.browserPath = next;
    saveState();
    frame.src = routeMap[next];
    address.value = `yri://site${next}`;
  });

  win.querySelectorAll("[data-browser-path]").forEach(button => {
    button.addEventListener("click", () => {
      state.browserPath = button.dataset.browserPath;
      saveState();
      frame.src = routeMap[state.browserPath];
      address.value = `yri://site${state.browserPath}`;
    });
  });
}

function renderTalk() {
  const messages = state.messageIds.map(id => talkMessages[id]).filter(Boolean);
  return `
    <div class="talk-layout">
      <aside class="talk-sidebar">
        <div class="talk-profile"><b>Talk</b><small>Local secure messenger</small></div>
        <div class="thread-list">
          <button class="is-active" type="button"><b>資料窓口</b><small>ユメミノ総合研究所</small></button>
          <button type="button"><b>システム通知</b><small>未読はありません</small></button>
        </div>
      </aside>
      <section class="talk-main">
        <header class="talk-head"><b>資料窓口</b><small>この会話は仮想端末内に保存されます</small></header>
        <div class="messages">${messages.map(renderBubble).join("")}</div>
        <div class="talk-actions">
          <button type="button" data-reply="confirm">資料を確認します</button>
          <button class="secondary" type="button" data-open-files>Filesを開く</button>
        </div>
      </section>
    </div>
  `;
}

function renderBubble(message) {
  const attachment = message.attachment
    ? `<button class="attachment" type="button" data-open-file="${message.attachment}"><b>${escapeHtml(message.attachment)}</b><small>Downloads / PDF</small></button>`
    : "";
  return `
    <div class="bubble ${message.from === "me" ? "me" : ""}">
      <div>${escapeHtml(message.body)}</div>
      ${attachment}
      <small>${escapeHtml(message.from)} / ${escapeHtml(message.time)}</small>
    </div>
  `;
}

function bindTalk(win) {
  win.querySelector("[data-reply='confirm']")?.addEventListener("click", () => {
    toast("Talk", "資料の確認はFilesアプリから行えます。");
  });
  win.querySelector("[data-open-files]")?.addEventListener("click", () => openApp("files"));
  win.querySelector("[data-open-file]")?.addEventListener("click", () => {
    state.currentFolder = "downloads";
    state.selectedFile = "service_overview_2026";
    saveState();
    openApp("files");
  });
}

function renderFiles() {
  const folder = state.currentFolder || "downloads";
  const files = fileRecords[folder].filter(file => file.available || !file.gatedBy || state[file.gatedBy]);
  return `
    <div class="files-layout">
      <aside class="files-sidebar">
        <div class="folder-head"><b>Files</b><small>Local storage</small></div>
        <div class="folder-list">
          <button class="${folder === "downloads" ? "is-active" : ""}" data-folder="downloads" type="button"><b>Downloads</b><small>受信資料</small></button>
          <button class="${folder === "recovered" ? "is-active" : ""}" data-folder="recovered" type="button"><b>Recovered</b><small>復元済み</small></button>
        </div>
      </aside>
      <section class="files-main">
        <div class="files-toolbar"><b>${folder === "downloads" ? "Downloads" : "Recovered"}</b><small>${files.length} item(s)</small></div>
        ${state.selectedFile === "service_overview_2026" ? renderPdf() : renderFileGrid(files)}
      </section>
    </div>
  `;
}

function renderFileGrid(files) {
  if (!files.length) return `<p class="empty-state">このフォルダに表示できるファイルはありません。</p>`;
  return `
    <div class="file-grid">
      ${files.map(file => `
        <button class="file-card" type="button" data-file="${file.id}" ${file.type === "SYSTEM" ? "disabled" : ""}>
          <span>${escapeHtml(file.type)}</span>
          <b>${escapeHtml(file.name)}</b>
          <small>更新: ${escapeHtml(file.updated)}</small>
        </button>
      `).join("")}
    </div>
  `;
}

function renderPdf() {
  return `
    <div class="pdf-viewer">
      <button class="desktop-button secondary" type="button" data-back-files>一覧へ戻る</button>
      <article class="pdf-page" aria-label="service_overview_2026 PDF風資料">
        <header>
          <div>
            <small>YRI-SVC-OVERVIEW-2026 / Client Distribution</small>
            <h2>人的資本データ分析サービス概要</h2>
          </div>
          <small>株式会社ユメミノ総合研究所<br>資料窓口</small>
        </header>
        <section>
          <h3>1. 支援領域</h3>
          <p>従業員サーベイ、面談記録、勤怠傾向、組織診断データを統合し、企業ごとの課題に合わせた改善支援を行います。</p>
        </section>
        <section>
          <h3>2. 主な納品物</h3>
          <table>
            <tr><th>資料名</th><th>用途</th><th>形式</th></tr>
            <tr><td>月次サマリー</td><td>経営会議向け報告</td><td>PDF</td></tr>
            <tr><td>部門別ダッシュボード</td><td>人事部門での傾向確認</td><td>HTML / CSV</td></tr>
            <tr><td>開示支援メモ</td><td>統合報告書・IR資料作成</td><td>PDF</td></tr>
          </table>
        </section>
        <section>
          <h3>3. 注意事項</h3>
          <p class="pdf-note">一部の社員情報は、記録保護のため Not Found と表示される場合があります。</p>
        </section>
      </article>
    </div>
  `;
}

function bindFiles(win) {
  win.querySelectorAll("[data-folder]").forEach(button => {
    button.addEventListener("click", () => {
      state.currentFolder = button.dataset.folder;
      state.selectedFile = "";
      saveState();
      openApp("files");
    });
  });
  win.querySelectorAll("[data-file]").forEach(button => {
    button.addEventListener("click", () => {
      state.selectedFile = button.dataset.file;
      saveState();
      openApp("files");
    });
  });
  win.querySelector("[data-back-files]")?.addEventListener("click", () => {
    state.selectedFile = "";
    saveState();
    openApp("files");
  });
}

function renderSearch() {
  if (!state.searchUnlocked) {
    return `<div class="locked-panel"><h2>Search is locked</h2><p>資料請求後に社内検索インデックスが同期されます。</p></div>`;
  }

  return `
    <div class="search-body">
      <header class="search-head">
        <h2 class="search-brand">Yomogi Search</h2>
        <form class="search-form" id="search-form">
          <input id="search-query" value="${escapeHtml(state.searchQuery)}" placeholder="検索語を入力" aria-label="検索語">
          <button type="submit">検索</button>
        </form>
      </header>
      <section class="search-results" id="search-results">${renderSearchResults(state.searchQuery)}</section>
    </div>
  `;
}

function renderSearchResults(query) {
  const q = query.trim().toLowerCase();
  const base = [
    {
      title: "ユメミノ総合研究所 - 人的資本データ分析",
      url: "yri.local/service/human-capital",
      body: "サーベイ、面談記録、勤怠傾向を統合し、組織状態を可視化します。"
    },
    {
      title: "資料窓口 / service_overview_2026",
      url: "yri.local/files/downloads/service_overview_2026",
      body: "配布済み資料。注意事項に社員情報の表示仕様が記載されています。"
    }
  ];
  const extra = q.includes("not") || q.includes("404") || q.includes("社員")
    ? [{
      title: "IR情報 注記 - 社員情報の表示について",
      url: "yri.local/ir/notes",
      body: "一部の社員情報は、記録保護のため Not Found と表示される場合があります。"
    }]
    : [];
  return (q ? [...extra, ...base] : base).map(item => `
    <article class="result-item">
      <b>${escapeHtml(item.title)}</b>
      <small>${escapeHtml(item.url)}</small>
      <p>${escapeHtml(item.body)}</p>
    </article>
  `).join("");
}

function bindSearch(win) {
  win.querySelector("#search-form")?.addEventListener("submit", event => {
    event.preventDefault();
    state.searchQuery = win.querySelector("#search-query").value;
    saveState();
    win.querySelector("#search-results").innerHTML = renderSearchResults(state.searchQuery);
  });
}

function renderNotes() {
  return `
    <div class="notes-body">
      <div class="hint-block">
        <h3>操作説明</h3>
        <p>Browserで企業サイトを開き、資料請求フォームを送信してください。端末内のTalk、Files、Searchに変化が起きます。</p>
      </div>
      <div class="hint-block">
        <h3>ヒント1</h3>
        <p>まずはBrowserの資料請求ページを確認します。外部サイトには接続しません。</p>
      </div>
      <div class="hint-block">
        <h3>ヒント2</h3>
        <p>資料請求後はTalkの未読とFilesのDownloadsを見てください。</p>
      </div>
      <div class="hint-block">
        <h3>セーブ</h3>
        <p>進行状況はlocalStorageに保存されます。上部バーの「セーブ初期化」でMVPの状態を初期化できます。</p>
      </div>
    </div>
  `;
}

function completeContactRequest() {
  if (state.contactSubmitted) {
    toast("資料請求", "資料はすでにDownloadsへ保存されています。");
    return;
  }
  state.contactSubmitted = true;
  state.searchUnlocked = true;
  state.unreadTalk += 2;
  state.unreadFiles += 1;
  state.messageIds = ["welcome-1", "request-1", "request-2"];
  state.currentFolder = "downloads";
  state.selectedFile = "";
  saveState();
  setNotice("Talkに資料窓口から新着メッセージがあります");
  toast("Talk", "資料窓口からメッセージが届きました。");
  setTimeout(() => toast("Files", "service_overview_2026.pdf をDownloadsに保存しました。"), 800);
}

window.addEventListener("message", event => {
  if (event.data?.type === "YRI_CONTACT_REQUEST_SUBMITTED") completeContactRequest();
});

document.querySelectorAll("[data-app]").forEach(button => {
  button.addEventListener("click", () => openApp(button.dataset.app));
});

document.querySelector("#home-button").addEventListener("click", () => openApp("browser"));
document.querySelector("#reset-button").addEventListener("click", () => {
  if (!confirm("仮想デスクトップのセーブデータを初期化します。よろしいですか？")) return;
  localStorage.removeItem(saveKey);
  Object.assign(state, initialState);
  saveState();
  openApp("browser");
  toast("セーブ初期化", "進行状況を初期化しました。");
});

window.addEventListener("hashchange", () => openApp(currentAppFromHash()));

updateClock();
setInterval(updateClock, 1000 * 20);
updateBadges();
openApp(currentAppFromHash());
