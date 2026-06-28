const GAME = {
  title: "{{WORK_TITLE}}",
  saveKey: "desktopMysteryTemplateStateV1",
  browserUrl: "site/index.html",
  startNotice: "テンプレート端末を起動しました",
  apps: {
    browser: "Browser",
    talk: "Talk",
    files: "Files",
    search: "Search",
    notes: "Notes"
  },
  events: {
    contactSubmitted: "TEMPLATE_CONTACT_REQUEST",
    stageUnlocked: "TEMPLATE_STAGE_UNLOCKED",
    finalSubmitted: "TEMPLATE_FINAL_SUBMITTED"
  }
};

const initialState = {
  openApps: ["notes"],
  activeApp: "notes",
  notice: GAME.startNotice,
  browserPath: "/",
  contactSubmitted: false,
  talkContactAdded: false,
  searchUnlocked: false,
  finalSubmitted: false,
  currentThread: "system",
  currentFolder: "downloads",
  selectedFile: "readme",
  searchQuery: "",
  readFiles: [],
  messageIds: ["system-boot"],
  unlockedFiles: ["readme"],
  workLog: ["端末を起動しました。Notesの作業メモを確認してください。"]
};

const talkMessages = {
  "system-boot": { thread: "system", from: "System", body: "調査端末を起動しました。必要な操作はNotesに記録されています。", time: "now" },
  "request-1": { thread: "desk", from: "資料窓口", body: "資料窓口を追加しました。Downloadsへ調査資料を保存しました。", time: "now" },
  "request-2": { thread: "desk", from: "資料窓口", body: "資料の注記を確認してください。Searchが利用可能になります。", time: "now" },
  "final-1": { thread: "system", from: "System", body: "最終送信を受理しました。Filesに送信控えを保存しました。", time: "now" }
};

const threads = [
  { id: "system", name: "システム通知", avatar: "S" },
  { id: "desk", name: "資料窓口", avatar: "資" }
];

const files = {
  downloads: [
    { id: "readme", name: "readme_first.txt", unlock: () => true, body: "このテンプレートは、ZIPを解凍して start.html を開くだけで動く仮想デスクトップ型Web謎の土台です。\n\nまずBrowserでサンプルサイトを開き、サイト内ボタンからTalk/Files/Searchが連動する流れを確認してください。" },
    { id: "overview", name: "overview_sample.pdf", unlock: s => s.talkContactAdded, body: "PDF風サンプル資料\n\nここに作品固有の資料本文を入れます。\n重要語は一箇所で答えにせず、複数アプリの情報を照合させる設計にしてください。" },
    { id: "receipt", name: "final_receipt.txt", unlock: s => s.finalSubmitted, body: "送信控え\n状態: 送信済み\n\nこのファイルは最終イベント後に表示されるサンプルです。" }
  ],
  recovered: [
    { id: "recovered-note", name: "recovered_note.txt", unlock: s => s.searchUnlocked, body: "Recoveredフォルダのサンプルです。\nSearchやBrowserイベントに応じて、後半資料を追加する場所として使います。" }
  ]
};

const searchDatabase = [
  { id: "official", q: ["テンプレート", "公式"], title: "公式ページ", body: "Browser内のサンプルサイトを開きます。", action: "browser:/" },
  { id: "overview", q: ["資料", "注記"], title: "Downloads / overview_sample.pdf", body: "Talkで資料窓口を追加すると読める資料です。", action: "file:downloads:overview", gated: s => s.talkContactAdded },
  { id: "recovered", q: ["復元", "recovered"], title: "Recovered / recovered_note.txt", body: "Search解放後に表示される後半資料の例です。", action: "file:recovered:recovered-note", gated: s => s.searchUnlocked }
];

let state = loadState();
const layer = document.querySelector("#window-layer");
const notice = document.querySelector("#notice");
const clock = document.querySelector("#clock");

function loadState() {
  const params = new URLSearchParams(location.search);
  if (params.get("reset") === "1") {
    Object.keys(localStorage).filter(key => key.startsWith("desktopMysteryTemplateState")).forEach(key => localStorage.removeItem(key));
  }
  try {
    return { ...structuredClone(initialState), ...JSON.parse(localStorage.getItem(GAME.saveKey) || "{}") };
  } catch {
    return structuredClone(initialState);
  }
}

function saveState() {
  localStorage.setItem(GAME.saveKey, JSON.stringify(state));
}

function esc(value) {
  return String(value).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function addUnique(key, value) {
  if (!state[key].includes(value)) state[key].push(value);
}

function toast(title, body) {
  const el = document.createElement("div");
  el.className = "toast";
  el.innerHTML = `<b>${esc(title)}</b><p>${esc(body)}</p>`;
  document.querySelector("#toast-stack").appendChild(el);
  setTimeout(() => el.remove(), 4200);
}

function setNotice(text) {
  state.notice = text;
  notice.textContent = text;
}

function openApp(app) {
  addUnique("openApps", app);
  state.activeApp = app;
  saveState();
  render();
}

function closeApp(app) {
  state.openApps = state.openApps.filter(item => item !== app);
  if (state.activeApp === app) state.activeApp = state.openApps.at(-1) || "";
  saveState();
  render();
}

function render() {
  notice.textContent = state.notice;
  document.querySelectorAll("[data-open-app]").forEach(button => {
    const app = button.dataset.openApp;
    button.classList.toggle("is-active", state.activeApp === app);
  });
  layer.innerHTML = state.openApps.map(renderWindow).join("");
  bind();
}

function renderWindow(app) {
  const title = GAME.apps[app] || app;
  return `
    <section class="app-window ${state.activeApp === app ? "is-active" : ""}" data-app="${esc(app)}" aria-label="${esc(title)}">
      <header class="window-titlebar" data-focus-app="${esc(app)}">
        <b>${esc(title)}</b>
        <div class="window-controls">
          <button data-action="minimize" data-app="${esc(app)}" type="button">−</button>
          <button data-action="maximize" data-app="${esc(app)}" type="button">□</button>
          <button data-action="close" data-app="${esc(app)}" type="button">×</button>
        </div>
      </header>
      <div class="window-body">${renderApp(app)}</div>
    </section>
  `;
}

function renderApp(app) {
  const map = { browser: renderBrowser, talk: renderTalk, files: renderFiles, search: renderSearch, notes: renderNotes };
  return (map[app] || renderNotes)();
}

function renderBrowser() {
  return `
    <div class="browser-body">
      <div class="browser-toolbar">
        <button class="button secondary" data-browser-home type="button">Home</button>
        <div class="browser-address">template.local${esc(state.browserPath)}</div>
      </div>
      <iframe class="browser-frame" title="作品内サイト" src="${esc(GAME.browserUrl)}${state.browserPath === "/" ? "" : `#${esc(state.browserPath)}`}"></iframe>
    </div>
  `;
}

function threadMessages(threadId) {
  return state.messageIds.map(id => talkMessages[id]).filter(message => message && message.thread === threadId);
}

function renderTalk() {
  const current = threads.find(thread => thread.id === state.currentThread) || threads[0];
  const messages = threadMessages(current.id);
  return `
    <div class="talk-shell">
      <aside class="thread-list">
        ${threads.map(thread => `
          <button class="${thread.id === current.id ? "is-active" : ""}" data-thread="${esc(thread.id)}" type="button">
            <span class="talk-avatar">${esc(thread.avatar)}</span>
            <span><b>${esc(thread.name)}</b><small>${esc(threadMessages(thread.id).at(-1)?.body || "メッセージなし")}</small></span>
            <small>${threadMessages(thread.id).length || ""}</small>
          </button>
        `).join("")}
      </aside>
      <section class="chat-pane">
        <header class="chat-head"><b>${esc(current.name)}</b><p class="muted">架空チャットアプリです。実在サービスには接続しません。</p></header>
        <div class="messages">
          ${messages.map(message => `<p class="bubble ${message.from === "me" ? "me" : ""}"><b>${esc(message.from)}</b><br>${esc(message.body)}</p>`).join("") || `<p class="bubble">まだメッセージはありません。</p>`}
        </div>
        <div class="quick-replies">
          ${state.contactSubmitted && !state.talkContactAdded ? `<button class="button" data-add-contact type="button">資料窓口を追加</button>` : `<span class="muted">返信候補は作品データに合わせて追加してください。</span>`}
        </div>
      </section>
    </div>
  `;
}

function visibleFiles(folderId) {
  return (files[folderId] || []).filter(file => file.unlock(state));
}

function currentFile() {
  const all = visibleFiles(state.currentFolder);
  return all.find(file => file.id === state.selectedFile) || all[0];
}

function renderFiles() {
  const folders = Object.keys(files);
  const current = currentFile();
  if (current) addUnique("readFiles", current.id);
  return `
    <div class="app-grid">
      <aside class="sidebar">
        <h3>Folders</h3>
        ${folders.map(folder => `<button class="list-button ${folder === state.currentFolder ? "is-active" : ""}" data-folder="${esc(folder)}" type="button">${esc(folder)}</button>`).join("")}
        <h3>Files</h3>
        ${visibleFiles(state.currentFolder).map(file => `<button class="list-button ${file.id === current?.id ? "is-active" : ""}" data-file="${esc(file.id)}" type="button">${esc(file.name)}</button>`).join("") || `<p class="muted">表示できるファイルはありません。</p>`}
      </aside>
      <section class="content">
        <article class="file-viewer">
          ${current ? `<h2>${esc(current.name)}</h2><pre>${esc(current.body)}</pre>` : `<h2>ファイル未選択</h2>`}
        </article>
      </section>
    </div>
  `;
}

function renderSearch() {
  if (!state.searchUnlocked) {
    return `<section class="content"><article class="search-card"><h2>Search locked</h2><p>Browser内サイトから資料請求イベントを発生させ、Talkで資料窓口を追加すると解放されます。</p></article></section>`;
  }
  const query = state.searchQuery.trim().toLowerCase();
  const results = searchDatabase.filter(item => (!item.gated || item.gated(state)) && (!query || item.q.some(word => word.toLowerCase().includes(query) || query.includes(word.toLowerCase()))));
  return `
    <section class="content">
      <form class="search-box" data-search-form>
        <input name="q" value="${esc(state.searchQuery)}" placeholder="検索語を入力">
        <button class="button" type="submit">Search</button>
      </form>
      ${results.map(item => `<article class="search-card"><h2>${esc(item.title)}</h2><p>${esc(item.body)}</p><button class="button secondary" data-search-action="${esc(item.action)}" type="button">開く</button></article>`).join("") || `<p>該当結果はありません。</p>`}
    </section>
  `;
}

function renderNotes() {
  const checks = [
    ["Browserでサンプルサイトを開く", state.contactSubmitted],
    ["Talkで資料窓口を追加する", state.talkContactAdded],
    ["Filesで資料を読む", state.readFiles.includes("overview")],
    ["Searchで追加情報を調べる", state.searchUnlocked && state.searchQuery],
    ["最終イベントを確認する", state.finalSubmitted]
  ];
  return `
    <section class="content">
      <article class="note-card">
        <h2>制作メモ</h2>
        <p>このテンプレートは、仮想デスクトップ内で Browser / Talk / Files / Search / Notes を連動させるための最小構成です。</p>
        <ul>
          <li>作品本文は <code>desktop.js</code> 冒頭のデータを編集します。</li>
          <li>Browser内サイトは <code>site/</code> を編集します。</li>
          <li>iframeから親へ <code>postMessage</code> すると、デスクトップ側の状態が変化します。</li>
        </ul>
      </article>
      <article class="note-card">
        <h2>進行チェック</h2>
        <ul class="check-list">${checks.map(([label, done]) => `<li class="${done ? "done" : ""}">${done ? "☑" : "☐"} ${esc(label)}</li>`).join("")}</ul>
      </article>
      <article class="note-card">
        <h2>段階ヒントの置き場</h2>
        <details><summary>第1章</summary><p>ヒント1: 見るアプリ</p><p>ヒント2: 比較する資料</p><p>ヒント3: 読み方</p></details>
      </article>
      <article class="note-card">
        <h2>セーブ</h2>
        <p>進行状況はlocalStorageに保存されます。初期化は二重確認つきです。</p>
        <button class="button danger" data-reset type="button">進行状況を初期化</button>
      </article>
    </section>
  `;
}

function completeContactRequest() {
  if (state.contactSubmitted) return;
  state.contactSubmitted = true;
  state.currentThread = "desk";
  setNotice("Talkに追加リクエストが届きました");
  toast("Talk", "資料窓口から追加リクエストが届きました。");
  addUnique("workLog", "Browser内サイトから資料請求イベントを受信しました。");
  saveState();
  openApp("talk");
}

function addTalkContact() {
  state.talkContactAdded = true;
  state.searchUnlocked = true;
  addUnique("messageIds", "request-1");
  addUnique("messageIds", "request-2");
  addUnique("unlockedFiles", "overview");
  setNotice("Searchが利用可能になりました");
  toast("Files", "overview_sample.pdf をDownloadsへ保存しました。");
  saveState();
  render();
}

function handleDesktopEvent(type) {
  if (type === GAME.events.contactSubmitted) completeContactRequest();
  if (type === GAME.events.stageUnlocked) {
    state.searchUnlocked = true;
    toast("Search", "検索条件が更新されました。");
    saveState();
    render();
  }
  if (type === GAME.events.finalSubmitted) {
    state.finalSubmitted = true;
    addUnique("messageIds", "final-1");
    addUnique("unlockedFiles", "receipt");
    toast("System", "最終イベントを受信しました。");
    saveState();
    render();
  }
}

function runSearchAction(action) {
  const [kind, a, b] = action.split(":");
  if (kind === "browser") {
    state.browserPath = a || "/";
    openApp("browser");
  }
  if (kind === "file") {
    state.currentFolder = a;
    state.selectedFile = b;
    openApp("files");
  }
}

function bind() {
  document.querySelectorAll("[data-open-app]").forEach(button => button.addEventListener("click", () => openApp(button.dataset.openApp)));
  document.querySelectorAll("[data-focus-app]").forEach(bar => bar.addEventListener("pointerdown", () => { state.activeApp = bar.dataset.focusApp; saveState(); render(); }));
  document.querySelectorAll("[data-action='close']").forEach(button => button.addEventListener("click", () => closeApp(button.dataset.app)));
  document.querySelectorAll("[data-action='maximize']").forEach(button => button.addEventListener("click", event => event.currentTarget.closest(".app-window").classList.toggle("is-maximized")));
  document.querySelectorAll("[data-browser-home]").forEach(button => button.addEventListener("click", () => { state.browserPath = "/"; saveState(); render(); }));
  document.querySelectorAll("[data-thread]").forEach(button => button.addEventListener("click", () => { state.currentThread = button.dataset.thread; saveState(); render(); }));
  document.querySelector("[data-add-contact]")?.addEventListener("click", addTalkContact);
  document.querySelectorAll("[data-folder]").forEach(button => button.addEventListener("click", () => { state.currentFolder = button.dataset.folder; state.selectedFile = ""; saveState(); render(); }));
  document.querySelectorAll("[data-file]").forEach(button => button.addEventListener("click", () => { state.selectedFile = button.dataset.file; saveState(); render(); }));
  document.querySelector("[data-search-form]")?.addEventListener("submit", event => {
    event.preventDefault();
    state.searchQuery = new FormData(event.currentTarget).get("q").toString();
    saveState();
    render();
  });
  document.querySelectorAll("[data-search-action]").forEach(button => button.addEventListener("click", () => runSearchAction(button.dataset.searchAction)));
  document.querySelector("[data-reset]")?.addEventListener("click", () => {
    if (!confirm("進行状況を初期化します。")) return;
    if (!confirm("この操作は取り消せません。本当に初期化しますか？")) return;
    localStorage.removeItem(GAME.saveKey);
    state = structuredClone(initialState);
    render();
  });
}

window.addEventListener("message", event => {
  if (!event.data || typeof event.data.type !== "string") return;
  handleDesktopEvent(event.data.type);
});

setInterval(() => {
  clock.textContent = new Intl.DateTimeFormat("ja-JP", { hour: "2-digit", minute: "2-digit" }).format(new Date());
}, 1000);

render();
