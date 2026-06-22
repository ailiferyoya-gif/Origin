const saveKey = "yriDesktopMvpState";

const initialState = {
  contactSubmitted: false,
  searchUnlocked: false,
  talkContactAdded: false,
  pendingFriendRequest: false,
  unreadTalk: 0,
  unreadFiles: 0,
  currentFolder: "downloads",
  selectedFile: "",
  browserPath: "/",
  searchQuery: "",
  messageIds: []
};

const talkMessages = {
  "request-1": {
    from: "me",
    body: "資料請求フォームを送信しました。",
    time: "now"
  },
  "request-2": {
    from: "資料窓口",
    body: "ご請求ありがとうございます。サービス概要資料をこの端末のDownloadsへ保存しました。",
    time: "now",
    attachment: "service_overview_2026.pdf"
  },
  "request-3": {
    from: "資料窓口",
    body: "資料の注意事項をご確認のうえ、不明点があればこのトークへ返信してください。",
    time: "now"
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
let currentApp = "";

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(saveKey) || "{}");
    const merged = { ...initialState, ...saved };
    if (!merged.talkContactAdded && merged.messageIds?.includes("welcome-1")) {
      merged.messageIds = [];
      merged.pendingFriendRequest = Boolean(merged.contactSubmitted);
      merged.searchUnlocked = false;
    }
    return merged;
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
  const taskbarSearch = document.querySelector("#taskbar-search");

  talkBadge.hidden = state.unreadTalk < 1;
  talkBadge.textContent = state.unreadTalk;
  filesBadge.hidden = state.unreadFiles < 1;
  filesBadge.textContent = state.unreadFiles;
  searchIcon.classList.toggle("is-locked", !state.searchUnlocked);
  taskbarSearch?.classList.toggle("is-locked", !state.searchUnlocked);
}

function updateTaskbarActive(app) {
  document.querySelectorAll(".taskbar-app").forEach(button => {
    button.classList.toggle("is-active", button.dataset.app === app);
  });
}

function setHash(app) {
  const next = `#/${app}`;
  if (location.hash !== next) location.hash = next;
}

function currentAppFromHash() {
  const route = location.hash.replace(/^#\//, "");
  return ["browser", "talk", "files", "search", "notes"].includes(route) ? route : "";
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
    toast("Searchはまだ利用できません", "資料窓口を追加すると検索インデックスが同期されます。");
    setNotice("Searchはロックされています");
    return;
  }

  if (app === "talk") state.unreadTalk = 0;
  if (app === "files") state.unreadFiles = 0;
  currentApp = app;
  saveState();
  updateTaskbarActive(app);

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
        <button type="button" data-action="minimize" aria-label="最小化">−</button>
        <button type="button" data-action="maximize" aria-label="最大化">□</button>
        <button type="button" data-action="close" aria-label="閉じる">×</button>
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
    currentApp = "";
    updateTaskbarActive("");
    history.replaceState(null, "", "#/");
  });
  win.querySelector('[data-action="minimize"]')?.addEventListener("click", () => {
    win.remove();
    currentApp = "";
    updateTaskbarActive("");
    history.replaceState(null, "", "#/");
  });
  win.querySelector('[data-action="maximize"]')?.addEventListener("click", () => {
    win.classList.toggle("is-maximized");
  });

  if (app === "browser") bindBrowser(win);
  if (app === "talk") bindTalk(win);
  if (app === "files") bindFiles(win);
  if (app === "search") bindSearch(win);
  if (app === "notes") bindNotes(win);
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
  const sidebar = renderTalkSidebar();
  let main;
  if (state.talkContactAdded) {
    main = renderTalkConversation(messages);
  } else if (state.pendingFriendRequest) {
    main = renderFriendRequest();
  } else {
    main = renderTalkEmpty();
  }

  return `<div class="talk-layout">${sidebar}${main}</div>`;
}

function renderTalkSidebar() {
  const latest = state.talkContactAdded
    ? "サービス概要資料を送付しました。"
    : state.pendingFriendRequest
      ? "友だち追加リクエスト"
      : "友だちはまだ追加されていません";
  return `
    <aside class="talk-sidebar">
      <div class="talk-profile"><b>Talk</b><small>Local messenger</small></div>
      <div class="thread-list">
        ${state.contactSubmitted ? `
          <button class="${state.talkContactAdded || state.pendingFriendRequest ? "is-active" : ""}" type="button">
            <span class="talk-avatar">資</span>
            <span class="thread-copy"><b>ユメミノ資料窓口</b><small>${latest}</small></span>
            <span class="thread-time">now</span>
            ${state.unreadTalk > 0 ? `<span class="talk-unread">${state.unreadTalk}</span>` : ""}
          </button>
        ` : `
          <button class="is-active" type="button">
            <span class="talk-avatar">?</span>
            <span class="thread-copy"><b>友だち追加待ち</b><small>資料請求後に通知されます</small></span>
            <span class="thread-time">--:--</span>
          </button>
        `}
        <button type="button">
          <span class="talk-avatar">端</span>
          <span class="thread-copy"><b>端末通知</b><small>未読はありません</small></span>
          <span class="thread-time"></span>
        </button>
      </div>
    </aside>
  `;
}

function renderTalkEmpty() {
  return `
    <section class="talk-main">
      <header class="talk-head"><span class="talk-avatar">?</span><div><b>Talk</b><small>友だち追加待ち</small></div></header>
      <div class="messages">
        <div class="talk-empty">
          <h2>友だちはまだ追加されていません。</h2>
          <p>企業サイトの資料請求フォームを送信すると、資料窓口から連絡が届きます。</p>
        </div>
      </div>
      <div class="talk-actions"><span class="reply-field">メッセージを送信できる相手がいません</span></div>
    </section>
  `;
}

function renderFriendRequest() {
  return `
    <section class="talk-main">
      <header class="talk-head"><span class="talk-avatar">資</span><div><b>友だち追加リクエスト</b><small>資料請求フォームからの連絡</small></div></header>
      <div class="messages">
        <div class="friend-request">
          <small>新しい連絡先</small>
          <div class="friend-request-card">
            <span class="talk-avatar">資</span>
            <div><b>ユメミノ資料窓口</b><p>株式会社ユメミノ総合研究所</p></div>
          </div>
          <div class="friend-request-actions">
            <button class="desktop-button" type="button" data-add-contact>追加</button>
            <button class="desktop-button secondary" type="button" data-hold-contact>保留</button>
          </div>
        </div>
      </div>
      <div class="talk-actions"><span class="reply-field">友だち追加後にトークを開始できます</span></div>
    </section>
  `;
}

function renderTalkConversation(messages) {
  return `
    <section class="talk-main">
      <header class="talk-head"><span class="talk-avatar">資</span><div><b>ユメミノ資料窓口</b><small>この会話は仮想端末内に保存されます</small></div></header>
      <div class="messages">${messages.map(renderBubble).join("")}</div>
      <div class="talk-actions">
        <span class="reply-field">選択肢から返信</span>
        <button type="button" data-reply="confirm">資料を確認します</button>
        <button class="secondary" type="button" data-open-files>Filesを開く</button>
      </div>
    </section>
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

function addTalkContact() {
  state.talkContactAdded = true;
  state.pendingFriendRequest = false;
  state.messageIds = ["request-1", "request-2", "request-3"];
  state.searchUnlocked = true;
  state.unreadTalk = 0;
  saveState();
  setNotice("Searchを利用できるようになりました");
  toast("Files", "service_overview_2026.pdf をDownloadsに保存しました。");
  openApp("talk");
}

function bindTalk(win) {
  win.querySelector("[data-add-contact]")?.addEventListener("click", addTalkContact);
  win.querySelector("[data-hold-contact]")?.addEventListener("click", () => {
    toast("Talk", "このリクエストは保留されました。追加すると資料窓口とのトークを開始できます。");
  });
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
    return `<div class="locked-panel"><h2>Search is locked</h2><p>資料窓口を追加すると社内検索インデックスが同期されます。</p></div>`;
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
        <p>資料請求後はTalkの友だち追加リクエストを確認してください。追加後にSearchが利用できます。</p>
      </div>
      <div class="hint-block">
        <h3>進行状況</h3>
        <p>この端末の進行状況はブラウザ内に保存されています。</p>
        <button class="desktop-button secondary" type="button" data-reset-progress>進行状況を初期化する</button>
      </div>
    </div>
  `;
}

function bindNotes(win) {
  win.querySelector("[data-reset-progress]")?.addEventListener("click", () => {
    if (!confirm("進行状況を初期化します。")) return;
    if (!confirm("この操作は取り消せません。本当に初期化しますか？")) return;
    localStorage.removeItem(saveKey);
    Object.keys(state).forEach(key => delete state[key]);
    Object.assign(state, { ...initialState });
    saveState();
    setNotice("進行状況を初期化しました");
    toast("Notes", "進行状況を初期化しました。");
    openApp("browser");
  });
}

function completeContactRequest() {
  if (state.contactSubmitted) {
    toast("資料請求", state.talkContactAdded ? "資料はすでにDownloadsへ保存されています。" : "資料窓口からの友だち追加リクエストを確認してください。");
    return;
  }
  state.contactSubmitted = true;
  state.pendingFriendRequest = true;
  state.talkContactAdded = false;
  state.searchUnlocked = false;
  state.unreadTalk += 1;
  state.unreadFiles += 1;
  state.messageIds = [];
  state.currentFolder = "downloads";
  state.selectedFile = "";
  saveState();
  setNotice("Talkに友だち追加リクエストがあります");
  toast("Talk", "ユメミノ資料窓口から友だち追加リクエストが届きました。");
  setTimeout(() => toast("Files", "service_overview_2026.pdf をDownloadsに保存しました。"), 800);
}

window.addEventListener("message", event => {
  if (event.data?.type === "YRI_CONTACT_REQUEST_SUBMITTED") completeContactRequest();
});

document.querySelectorAll("[data-app]").forEach(button => {
  button.addEventListener("click", () => openApp(button.dataset.app));
});

document.querySelector("#home-button").addEventListener("click", () => openApp("browser"));
window.addEventListener("hashchange", () => {
  const next = currentAppFromHash();
  if (next && next !== currentApp) openApp(next);
});

updateClock();
setInterval(updateClock, 1000 * 20);
updateBadges();
openApp(currentAppFromHash() || "browser");
