const saveKey = "yriDesktopMvpState";

const initialState = {
  contactSubmitted: false,
  searchUnlocked: false,
  talkContactAdded: false,
  pendingFriendRequest: false,

  servicePdfOpened: false,
  searched404: false,
  employeeLoginSuccess: false,
  deptSearchSuccess: false,
  auditKeySuccess: false,
  archiveOpened: false,
  finalSubmitted: false,

  pendingCallId: "",
  activeCallId: "",
  callMode: "",
  callStartedAt: 0,
  callHistory: [],
  completedCalls: [],
  unlockedFlags: [],

  unreadTalk: 0,
  unreadFiles: 0,
  currentFolder: "downloads",
  selectedFile: "",
  browserPath: "/",
  searchQuery: "",
  searchCacheId: "",
  currentTalkThread: "desk",
  messageIds: []
};

const callRecords = {
  "unknown-01": {
    from: "Unknown",
    avatar: "?",
    audio: "assets/audio/call_unknown_01.mp3",
    duration: "00:37",
    trigger: "afterSearch404",
    transcriptFile: "call_unknown_01_transcript",
    thread: "unknown",
    transcript: [
      "……聞こえますか。",
      "404は人数じゃありません。",
      "状態です。",
      "IRの数字と、採用ページの声をもう一度見てください。",
      "社員IDと参照キーが揃えば、社員専用ページに入れます。"
    ],
    unlocks: ["call_unknown_01_done"]
  },
  "employee404-01": {
    from: "社員404",
    avatar: "404",
    audio: "assets/audio/call_employee404_01.mp3",
    duration: "00:52",
    trigger: "afterEmployeeLogin",
    transcriptFile: "call_employee404_01_transcript",
    thread: "employee404",
    transcript: [
      "ログを見て。",
      "全部じゃない。",
      "三番目、五番目、七番目。",
      "先頭だけ読めば、部門名になる。",
      "そこから先は、もう人事の画面じゃない。"
    ],
    unlocks: ["call_employee404_01_done"]
  },
  "archive-01": {
    from: "非通知",
    avatar: "!",
    audio: "assets/audio/voicemail_archive_01.mp3",
    duration: "00:44",
    trigger: "afterArchiveOpen",
    transcriptFile: "voicemail_archive_01_transcript",
    thread: "archive",
    transcript: [
      "三つの文書名を戻してください。",
      "証拠。",
      "発言。",
      "対象者。",
      "欠けていた文字だけが、あなたの役割です。"
    ],
    unlocks: ["call_archive_01_done"]
  }
};

const talkMessages = {
  "request-1": { thread: "desk", from: "me", body: "資料請求フォームを送信しました。", time: "now" },
  "request-2": {
    thread: "desk",
    from: "資料窓口",
    body: "ご請求ありがとうございます。サービス概要資料をこの端末のDownloadsへ保存しました。",
    time: "now",
    attachment: "service_overview_2026"
  },
  "request-3": {
    thread: "desk",
    from: "資料窓口",
    body: "資料の注意事項をご確認のうえ、不明点があればこのトークへ返信してください。",
    time: "now"
  },
  "unknown-1": { thread: "unknown", from: "Unknown", body: "通話履歴を保存しました。", time: "now" },
  "unknown-2": { thread: "unknown", from: "Unknown", body: "検索語を間違えないでください。", time: "now" },
  "employee404-1": { thread: "employee404", from: "社員404", body: "三、五、七。", time: "now" },
  "employee404-2": { thread: "employee404", from: "社員404", body: "それ以上は、ここには書けません。", time: "now" },
  "archive-1": { thread: "archive", from: "非通知", body: "ボイスメッセージを保存しました。", time: "now" },
  "archive-2": { thread: "archive", from: "非通知", body: "欠けた文字だけを読んでください。", time: "now" },
  "final-1": { thread: "system", from: "端末通知", body: "外部監査送信キューの送信が完了しました。", time: "now" },
  "final-2": { thread: "system", from: "端末通知", body: "記録はこの端末のFilesに保存されています。", time: "now" }
};

const threadInfo = {
  desk: { name: "ユメミノ資料窓口", avatar: "資", subtitle: "株式会社ユメミノ総合研究所" },
  unknown: { name: "Unknown", avatar: "?", subtitle: "番号非表示" },
  employee404: { name: "社員404", avatar: "404", subtitle: "記録保護アカウント" },
  archive: { name: "非通知", avatar: "!", subtitle: "留守番メッセージ" },
  system: { name: "端末通知", avatar: "端", subtitle: "Local system" }
};

const fileRecords = {
  downloads: [
    { id: "readme", name: "readme_first.txt", type: "TEXT", updated: "2026-06-23 09:00", available: true },
    { id: "service_overview_2026", name: "service_overview_2026.pdf", type: "PDF", updated: "2026-06-23 09:18", gatedBy: "contactSubmitted" },
    { id: "human_capital_report_2025", name: "human_capital_report_2025.pdf", type: "PDF", updated: "2025-12-20", gatedBy: "contactSubmitted" },
    { id: "notice_20250807", name: "notice_20250807.txt", type: "TEXT", updated: "2025-08-07", gatedBy: "contactSubmitted" },
    { id: "call_unknown_01_transcript", name: "call_unknown_01_transcript.txt", type: "TEXT", updated: "通話後", gatedByCall: "unknown-01" },
    { id: "call_employee404_01_transcript", name: "call_employee404_01_transcript.txt", type: "TEXT", updated: "通話後", gatedByCall: "employee404-01" },
    { id: "voicemail_archive_01_transcript", name: "voicemail_archive_01_transcript.txt", type: "TEXT", updated: "通話後", gatedByCall: "archive-01" },
    { id: "final_transfer_receipt", name: "final_transfer_receipt.txt", type: "TEXT", updated: "送信後", gatedBy: "finalSubmitted" }
  ],
  recovered: [
    { id: "a01_evidence", name: "A-01_＿拠保全手順.txt", type: "TEXT", updated: "2025-08-01", gatedBy: "archiveOpened" },
    { id: "b02_statement", name: "B-02_発＿テンプレート.txt", type: "TEXT", updated: "2025-08-02", gatedBy: "archiveOpened" },
    { id: "c03_subject", name: "C-03_対象＿リスト.txt", type: "TEXT", updated: "2025-08-07", gatedBy: "archiveOpened" },
    { id: "employee404_partial_log", name: "employee404_partial_log.txt", type: "TEXT", updated: "2025-08-07", gatedBy: "employeeLoginSuccess" }
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
  "/login": "index.html#/login",
  "/employee-404": "index.html#/employee-404",
  "/audit": "index.html#/audit",
  "/archive": "index.html#/archive",
  "/final": "index.html#/final"
};

const searchIndex = [
  {
    keywords: ["ユメミノ", "資料請求"],
    title: "株式会社ユメミノ総合研究所 | 人的資本データ分析",
    url: "yri.local/",
    body: "人的資本データ分析、組織改善支援、IR・開示資料支援を行う研究開発企業です。",
    action: { type: "browser", path: "/" }
  },
  {
    keywords: ["資料請求", "サービス概要"],
    title: "service_overview_2026.pdf",
    url: "files://Downloads/service_overview_2026.pdf",
    body: "資料請求後にDownloadsへ保存されるサービス概要資料です。注記欄に表示仕様があります。",
    action: { type: "file", folder: "downloads", file: "service_overview_2026" }
  },
  {
    keywords: ["404", "Not Found", "社員404", "記録保護"],
    title: "人的資本データ注記 | Not Found",
    url: "yri.local/ir#human-capital",
    body: "一部の社員情報は、記録保護のため Not Found と表示される場合があります。",
    action: { type: "browser", path: "/ir" },
    triggersCall: "unknown-01"
  },
  {
    keywords: ["表示不具合", "2025 08 07", "2025.08.07"],
    title: "一部サービスの表示不具合について | 2025.08.07",
    url: "yri.local/news/20250807",
    body: "一部アカウント情報が通常画面に表示されない事象を確認しました。対象範囲は社内管理画面の一部です。",
    action: { type: "browser", path: "/news" },
    triggersCall: "unknown-01"
  },
  {
    keywords: ["秘密録", "参照キー"],
    title: "採用ページ内の社員インタビュー",
    url: "yri.local/recruit#interview",
    body: "社員の声に含まれる印刷ズレ風の文字が参照キーの手がかりになります。",
    action: { type: "browser", path: "/recruit" }
  },
  {
    keywords: ["監査室"],
    title: "監査室 文書閲覧端末",
    url: "yri.local/audit",
    body: "社員404ページのログから部門名を確認したあと、文書閲覧端末に移動できます。",
    action: { type: "browser", path: "/audit" }
  }
];

const state = loadState();
const layer = document.querySelector("#window-layer");
const notice = document.querySelector("#topbar-notice");
let currentApp = "";
let ringOscillator = null;
let ringAudioContext = null;

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(saveKey) || "{}");
    const merged = { ...initialState, ...saved };
    if (!Array.isArray(merged.messageIds)) merged.messageIds = [];
    if (!Array.isArray(merged.callHistory)) merged.callHistory = [];
    if (!Array.isArray(merged.completedCalls)) merged.completedCalls = [];
    if (!Array.isArray(merged.unlockedFlags)) merged.unlockedFlags = [];
    if (!merged.talkContactAdded && merged.messageIds.includes("welcome-1")) {
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
  if (talkBadge) {
    talkBadge.hidden = state.unreadTalk < 1;
    talkBadge.textContent = state.unreadTalk;
  }
  if (filesBadge) {
    filesBadge.hidden = state.unreadFiles < 1;
    filesBadge.textContent = state.unreadFiles;
  }
  searchIcon?.classList.toggle("is-locked", !state.searchUnlocked);
  taskbarSearch?.classList.toggle("is-locked", !state.searchUnlocked);
  document.body.classList.toggle("is-ending", Boolean(state.finalSubmitted));
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

function addUnique(arrayName, value) {
  if (!state[arrayName].includes(value)) state[arrayName].push(value);
}

function addMessages(ids) {
  ids.forEach(id => {
    if (!state.messageIds.includes(id)) state.messageIds.push(id);
  });
}

function isCallDone(callId) {
  return state.completedCalls.includes(callId);
}

function isFileAvailable(file) {
  if (file.available) return true;
  if (file.gatedBy && !state[file.gatedBy]) return false;
  if (file.gatedByCall && !isCallDone(file.gatedByCall)) return false;
  return true;
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
          <button type="button" data-browser-path="/login">社員専用</button>
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

function navigateBrowser(path) {
  state.browserPath = path;
  saveState();
  openApp("browser");
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

function visibleThreads() {
  const threads = [];
  if (state.contactSubmitted) threads.push("desk");
  if (state.messageIds.some(id => talkMessages[id]?.thread === "unknown")) threads.push("unknown");
  if (state.messageIds.some(id => talkMessages[id]?.thread === "employee404")) threads.push("employee404");
  if (state.messageIds.some(id => talkMessages[id]?.thread === "archive")) threads.push("archive");
  if (state.messageIds.some(id => talkMessages[id]?.thread === "system")) threads.push("system");
  return threads.length ? threads : ["empty"];
}

function renderTalk() {
  const sidebar = renderTalkSidebar();
  let main;
  if (state.pendingCallId) {
    main = renderIncomingCall();
  } else if (state.activeCallId) {
    main = renderActiveCall();
  } else if (state.talkContactAdded) {
    main = renderTalkConversation();
  } else if (state.pendingFriendRequest) {
    main = renderFriendRequest();
  } else {
    main = renderTalkEmpty();
  }

  return `<div class="talk-layout">${sidebar}${main}</div>`;
}

function renderTalkSidebar() {
  const threads = visibleThreads();
  return `
    <aside class="talk-sidebar">
      <div class="talk-profile"><b>Talk</b><small>Local messenger</small></div>
      <div class="thread-list">
        ${threads.map(thread => renderThreadButton(thread)).join("")}
      </div>
    </aside>
  `;
}

function renderThreadButton(thread) {
  if (thread === "empty") {
    return `
      <button class="is-active" type="button">
        <span class="talk-avatar">?</span>
        <span class="thread-copy"><b>トークはまだありません</b><small>資料請求後に通知されます</small></span>
        <span class="thread-time">--:--</span>
      </button>
    `;
  }
  const info = threadInfo[thread];
  const threadMessages = state.messageIds.map(id => talkMessages[id]).filter(message => message?.thread === thread);
  const latest = threadMessages.at(-1)?.body || (state.pendingFriendRequest ? "友だち追加リクエスト" : info.subtitle);
  return `
    <button class="${state.currentTalkThread === thread ? "is-active" : ""}" type="button" data-thread="${thread}">
      <span class="talk-avatar">${escapeHtml(info.avatar)}</span>
      <span class="thread-copy"><b>${escapeHtml(info.name)}</b><small>${escapeHtml(latest)}</small></span>
      <span class="thread-time">now</span>
      ${state.unreadTalk > 0 && thread === "desk" ? `<span class="talk-unread">${state.unreadTalk}</span>` : ""}
    </button>
  `;
}

function renderTalkEmpty() {
  return `
    <section class="talk-main">
      <header class="talk-head"><span class="talk-avatar">?</span><div><b>Talk</b><small>友だち追加待ち</small></div></header>
      <div class="messages">
        <div class="talk-empty">
          <h2>トークはまだありません。</h2>
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

function renderTalkConversation() {
  const thread = state.currentTalkThread || "desk";
  const info = threadInfo[thread] || threadInfo.desk;
  const messages = state.messageIds.map(id => talkMessages[id]).filter(message => message?.thread === thread);
  const callRows = state.callHistory
    .filter(record => callRecords[record.callId]?.thread === thread)
    .map(renderCallHistoryRow)
    .join("");
  return `
    <section class="talk-main">
      <header class="talk-head"><span class="talk-avatar">${escapeHtml(info.avatar)}</span><div><b>${escapeHtml(info.name)}</b><small>${escapeHtml(info.subtitle)}</small></div></header>
      <div class="messages">
        ${callRows ? `<div class="call-history"><b>通話履歴</b>${callRows}</div>` : ""}
        ${messages.map(renderBubble).join("")}
      </div>
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
    ? `<button class="attachment" type="button" data-open-file="${escapeHtml(message.attachment)}"><b>${escapeHtml(fileNameFor(message.attachment))}</b><small>Downloads / PDF</small></button>`
    : "";
  return `
    <div class="bubble ${message.from === "me" ? "me" : ""}">
      <div>${escapeHtml(message.body)}</div>
      ${attachment}
      <small>${escapeHtml(message.from)} / ${escapeHtml(message.time)}</small>
    </div>
  `;
}

function fileNameFor(fileId) {
  return Object.values(fileRecords).flat().find(file => file.id === fileId)?.name || fileId;
}

function renderCallHistoryRow(record) {
  const call = callRecords[record.callId];
  return `
    <button class="call-history-row" type="button" data-open-file="${escapeHtml(call.transcriptFile)}">
      <span>${record.status === "missed" ? "不在着信" : "通話"}</span>
      <b>${escapeHtml(call.from)}</b>
      <small>${escapeHtml(call.duration)} / 文字起こし保存済み</small>
    </button>
  `;
}

function renderIncomingCall() {
  const call = callRecords[state.pendingCallId];
  return `
    <section class="talk-main call-screen-wrap">
      <div class="incoming-call" role="dialog" aria-label="Talk着信">
        <span class="talk-avatar call-avatar">${escapeHtml(call.avatar)}</span>
        <small>Talk 着信</small>
        <h2>${escapeHtml(call.from)}</h2>
        <p>この通話は仮想端末内に保存されます。</p>
        <div class="incoming-actions">
          <button class="desktop-button" type="button" data-answer-call="${escapeHtml(state.pendingCallId)}">応答</button>
          <button class="desktop-button secondary" type="button" data-reject-call="${escapeHtml(state.pendingCallId)}">拒否</button>
        </div>
      </div>
    </section>
  `;
}

function renderActiveCall() {
  const call = callRecords[state.activeCallId];
  const transcript = call.transcript.map(line => `<p>${escapeHtml(line)}</p>`).join("");
  return `
    <section class="talk-main call-screen-wrap">
      <div class="active-call">
        <span class="talk-avatar call-avatar">${escapeHtml(call.avatar)}</span>
        <small>Talk 通話中</small>
        <h2>${escapeHtml(call.from)}</h2>
        <p class="call-time">想定再生時間 ${escapeHtml(call.duration)}</p>
        <audio id="call-audio" src="${escapeHtml(call.audio)}" preload="auto"></audio>
        <p class="call-status" id="call-status">音声を再生しています。音声ファイルが未配置の場合は文字起こしを表示します。</p>
        <div class="call-transcript" id="call-transcript" hidden>${transcript}</div>
        <div class="incoming-actions">
          <button class="desktop-button secondary" type="button" data-show-transcript="${escapeHtml(state.activeCallId)}">文字起こしを表示</button>
          <button class="desktop-button danger" type="button" data-end-call="${escapeHtml(state.activeCallId)}">通話終了</button>
        </div>
      </div>
    </section>
  `;
}

function addTalkContact() {
  state.talkContactAdded = true;
  state.pendingFriendRequest = false;
  state.currentTalkThread = "desk";
  addMessages(["request-1", "request-2", "request-3"]);
  state.searchUnlocked = true;
  state.unreadTalk = 0;
  saveState();
  setNotice("Searchを利用できるようになりました");
  toast("Files", "service_overview_2026.pdf をDownloadsに保存しました。");
  openApp("talk");
}

function playFallbackRing() {
  try {
    stopFallbackRing();
    ringAudioContext = new (window.AudioContext || window.webkitAudioContext)();
    ringOscillator = ringAudioContext.createOscillator();
    const gain = ringAudioContext.createGain();
    ringOscillator.frequency.value = 660;
    gain.gain.value = 0.025;
    ringOscillator.connect(gain).connect(ringAudioContext.destination);
    ringOscillator.start();
  } catch {
    // Audio fallback is optional.
  }
}

function stopFallbackRing() {
  try {
    ringOscillator?.stop();
    ringAudioContext?.close();
  } catch {
    // ignore
  }
  ringOscillator = null;
  ringAudioContext = null;
}

function triggerIncomingCall(callId) {
  if (!callRecords[callId] || isCallDone(callId) || state.pendingCallId === callId || state.activeCallId === callId) return;
  state.pendingCallId = callId;
  state.callMode = "incoming";
  state.unreadTalk += 1;
  saveState();
  setNotice(`Talk着信: ${callRecords[callId].from}`);
  toast("Talk 着信", `${callRecords[callId].from} から通話があります。`);
  playFallbackRing();
  openApp("talk");
}

function answerCall(callId) {
  stopFallbackRing();
  state.pendingCallId = "";
  state.activeCallId = callId;
  state.callMode = "active";
  state.callStartedAt = Date.now();
  state.currentTalkThread = callRecords[callId].thread;
  saveState();
  openApp("talk");
  setTimeout(() => playCallAudio(callId), 80);
}

function playCallAudio(callId) {
  const audio = document.querySelector("#call-audio");
  const status = document.querySelector("#call-status");
  if (!audio) return;
  audio.play().catch(() => {
    showCallTranscript(callId);
    if (status) status.textContent = "音声ファイル未配置。文字起こしを表示しています。";
  });
}

function showCallTranscript() {
  const transcript = document.querySelector("#call-transcript");
  if (transcript) transcript.hidden = false;
}

function completeCall(callId, status = "answered") {
  stopFallbackRing();
  const call = callRecords[callId];
  if (!call) return;
  state.pendingCallId = "";
  state.activeCallId = "";
  state.callMode = "";
  addUnique("completedCalls", callId);
  call.unlocks.forEach(flag => addUnique("unlockedFlags", flag));
  if (!state.callHistory.some(record => record.callId === callId)) {
    state.callHistory.push({ callId, status, at: new Date().toISOString() });
  }
  if (callId === "unknown-01") addMessages(["unknown-1", "unknown-2"]);
  if (callId === "employee404-01") addMessages(["employee404-1", "employee404-2"]);
  if (callId === "archive-01") addMessages(["archive-1", "archive-2"]);
  state.currentTalkThread = call.thread;
  state.unreadFiles += 1;
  saveState();
  setNotice(`${call.from} の文字起こしを保存しました`);
  toast("Files", `${fileNameFor(call.transcriptFile)} を保存しました。`);
  openApp("talk");
}

function rejectCall(callId) {
  stopFallbackRing();
  toast("Talk", "不在着信。文字起こしログが保存されました。");
  completeCall(callId, "missed");
}

function bindTalk(win) {
  win.querySelectorAll("[data-thread]").forEach(button => {
    button.addEventListener("click", () => {
      state.currentTalkThread = button.dataset.thread;
      saveState();
      openApp("talk");
    });
  });
  win.querySelector("[data-add-contact]")?.addEventListener("click", addTalkContact);
  win.querySelector("[data-hold-contact]")?.addEventListener("click", () => {
    toast("Talk", "このリクエストは保留されました。追加すると資料窓口とのトークを開始できます。");
  });
  win.querySelector("[data-answer-call]")?.addEventListener("click", event => answerCall(event.currentTarget.dataset.answerCall));
  win.querySelector("[data-reject-call]")?.addEventListener("click", event => rejectCall(event.currentTarget.dataset.rejectCall));
  win.querySelector("[data-show-transcript]")?.addEventListener("click", () => showCallTranscript());
  win.querySelector("[data-end-call]")?.addEventListener("click", event => completeCall(event.currentTarget.dataset.endCall));
  win.querySelector("[data-reply='confirm']")?.addEventListener("click", () => {
    toast("Talk", "資料の確認はFilesアプリから行えます。");
  });
  win.querySelector("[data-open-files]")?.addEventListener("click", () => openApp("files"));
  win.querySelectorAll("[data-open-file]").forEach(button => {
    button.addEventListener("click", () => {
      const file = Object.values(fileRecords).flat().find(item => item.id === button.dataset.openFile);
      state.currentFolder = fileRecords.recovered.includes(file) ? "recovered" : "downloads";
      state.selectedFile = button.dataset.openFile;
      saveState();
      openApp("files");
    });
  });
}

function renderFiles() {
  const folder = state.currentFolder || "downloads";
  const files = fileRecords[folder].filter(isFileAvailable);
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
        ${state.selectedFile ? renderFileContent(state.selectedFile) : renderFileGrid(files)}
      </section>
    </div>
  `;
}

function renderFileGrid(files) {
  if (!files.length) return `<p class="empty-state">このフォルダに表示できるファイルはありません。</p>`;
  return `
    <div class="file-grid">
      ${files.map(file => `
        <button class="file-card" type="button" data-file="${escapeHtml(file.id)}">
          <span>${escapeHtml(file.type)}</span>
          <b>${escapeHtml(file.name)}</b>
          <small>更新: ${escapeHtml(file.updated)}</small>
        </button>
      `).join("")}
    </div>
  `;
}

function renderFileContent(fileId) {
  const file = Object.values(fileRecords).flat().find(item => item.id === fileId);
  if (!file) return `<p class="empty-state">ファイルを表示できません。</p>`;
  const content = fileContent(fileId);
  return `
    <div class="pdf-viewer">
      <button class="desktop-button secondary" type="button" data-back-files>一覧へ戻る</button>
      <article class="pdf-page ${file.type === "TEXT" ? "text-file" : ""}" aria-label="${escapeHtml(file.name)}">
        ${content}
      </article>
    </div>
  `;
}

function transcriptContent(callId) {
  const call = callRecords[callId];
  return `
    <header><div><small>Talk Call Transcript</small><h2>${escapeHtml(call.from)} / ${escapeHtml(call.duration)}</h2></div><small>${escapeHtml(call.audio)}</small></header>
    <section>${call.transcript.map(line => `<p>${escapeHtml(line)}</p>`).join("")}</section>
    <section><p class="pdf-note">音声ファイル未配置の場合も、この文字起こしを正式な進行ログとして扱います。</p></section>
  `;
}

function fileContent(fileId) {
  if (fileId === "readme") {
    return `
      <header><div><small>README</small><h2>調査端末の利用について</h2></div></header>
      <section><p>この端末は外部サイトへ接続しません。Browser、Talk、Files、Search、Notesだけで調査を進めてください。</p></section>
    `;
  }
  if (fileId === "service_overview_2026") {
    state.servicePdfOpened = true;
    saveState();
    return `
      <header><div><small>YRI-SVC-OVERVIEW-2026 / Client Distribution</small><h2>人的資本データ分析サービス概要</h2></div><small>株式会社ユメミノ総合研究所<br>資料窓口</small></header>
      <section><h3>1. 支援領域</h3><p>従業員サーベイ、面談記録、勤怠傾向、組織診断データを統合し、企業ごとの課題に合わせた改善支援を行います。</p></section>
      <section><h3>2. 主な納品物</h3><table><tr><th>資料名</th><th>用途</th><th>形式</th></tr><tr><td>月次サマリー</td><td>経営会議向け報告</td><td>PDF</td></tr><tr><td>部門別ダッシュボード</td><td>人事部門での傾向確認</td><td>HTML / CSV</td></tr><tr><td>開示支援メモ</td><td>統合報告書・IR資料作成</td><td>PDF</td></tr></table></section>
      <section><h3>3. 注意事項</h3><p class="pdf-note">一部の社員情報は、記録保護のため Not Found と表示される場合があります。</p></section>
    `;
  }
  if (fileId === "human_capital_report_2025") {
    return `
      <header><div><small>YRI-HC-2025</small><h2>人的資本レポート 2025 抜粋</h2></div></header>
      <section><table><tr><th>年度</th><th>売上</th><th>社員数</th><th>離職率</th></tr><tr><td>2024</td><td>88.8億円</td><td>404名</td><td>0.0%</td></tr><tr><td>2025</td><td>132.6億円</td><td>404名</td><td>0.0%</td></tr></table><p class="pdf-note">記録保護対象の情報は通常検索から除外されます。</p></section>
    `;
  }
  if (fileId === "notice_20250807") {
    return `
      <header><div><small>NOTICE-20250807</small><h2>一部サービスの表示不具合について</h2></div></header>
      <section><p>2025年8月7日、一部アカウント情報が通常画面に表示されない事象を確認しました。対象範囲は社内管理画面の一部です。</p><p>該当データは欠損ではなく、記録保護状態として扱われます。</p></section>
    `;
  }
  if (fileId === "call_unknown_01_transcript") return transcriptContent("unknown-01");
  if (fileId === "call_employee404_01_transcript") return transcriptContent("employee404-01");
  if (fileId === "voicemail_archive_01_transcript") return transcriptContent("archive-01");
  if (fileId === "a01_evidence") return `<header><div><small>A-01</small><h2>＿拠保全手順</h2></div></header><section><p>記録媒体の保全、原本性、外部監査提出時の添付資料について定める。改変防止のため、証跡ハッシュを同時に保存する。</p></section>`;
  if (fileId === "b02_statement") return `<header><div><small>B-02</small><h2>発＿テンプレート</h2></div></header><section><p>通報者が発した内容、面談時の発言、供述の整合性を確認するための標準書式。本人への再通知は必要最小限とする。</p></section>`;
  if (fileId === "c03_subject") return `<header><div><small>C-03</small><h2>対象＿リスト</h2></div></header><section><p>該当者、対象となる従業員、記録保護対象を一覧化する。通常検索から除外する条件を含む。</p></section>`;
  if (fileId === "employee404_partial_log") return `<header><div><small>EMP404-PARTIAL</small><h2>社員404 操作ログ抜粋</h2></div></header><section><p>3. 監視対象判定 / 5. 査定保留処理 / 7. 室長確認済</p><p class="pdf-note">先頭文字だけが部門名として残されています。</p></section>`;
  if (fileId === "final_transfer_receipt") return `<header><div><small>final_transfer_receipt.txt / EXT-AUDIT-QUEUE</small><h2>外部監査送信キュー</h2></div></header><section><table><tr><th>状態</th><td>送信済み</td></tr><tr><th>復元文書</th><td>A-01 / B-02 / C-03</td></tr><tr><th>判定</th><td>重大な組織リスク</td></tr></table><p>画面を閉じても、記録は残ります。</p></section>`;
  return `<header><div><h2>${escapeHtml(fileNameFor(fileId))}</h2></div></header><section><p>表示できる内容がありません。</p></section>`;
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
  const results = q
    ? searchIndex.filter(item => item.keywords.some(keyword => q.includes(keyword.toLowerCase()) || keyword.toLowerCase().includes(q)))
    : searchIndex.slice(0, 2);
  if (!results.length) return `<p class="empty-state">一致する仮想検索結果はありません。別の語で検索してください。</p>`;
  return results.map(item => `
    <article class="result-item">
      <b>${escapeHtml(item.title)}</b>
      <small>${escapeHtml(item.url)}</small>
      <p>${escapeHtml(item.body)}</p>
      <button class="desktop-button secondary" type="button" data-search-action='${escapeHtml(JSON.stringify(item.action))}'>開く</button>
    </article>
  `).join("");
}

function searchTriggersCall(query) {
  const q = query.trim().toLowerCase();
  return ["404", "not found", "表示不具合", "社員404"].some(keyword => q.includes(keyword.toLowerCase()));
}

function bindSearch(win) {
  win.querySelector("#search-form")?.addEventListener("submit", event => {
    event.preventDefault();
    state.searchQuery = win.querySelector("#search-query").value;
    const shouldTriggerUnknownCall = searchTriggersCall(state.searchQuery) && !state.searched404;
    if (shouldTriggerUnknownCall) {
      state.searched404 = true;
    }
    saveState();
    win.querySelector("#search-results").innerHTML = renderSearchResults(state.searchQuery);
    bindSearchResultButtons(win);
    if (shouldTriggerUnknownCall) setTimeout(() => triggerIncomingCall("unknown-01"), 450);
  }, { once: true });
  bindSearchResultButtons(win);
}

function bindSearchResultButtons(win) {
  win.querySelectorAll("[data-search-action]").forEach(button => {
    if (button.dataset.bound === "1") return;
    button.dataset.bound = "1";
    button.addEventListener("click", () => {
      const action = JSON.parse(button.dataset.searchAction);
      if (action.type === "browser") navigateBrowser(action.path);
      if (action.type === "file") {
        state.currentFolder = action.folder;
        state.selectedFile = action.file;
        saveState();
        openApp("files");
      }
    });
  });
}

function renderDebugPanel() {
  const rows = [
    ["contactSubmitted", state.contactSubmitted],
    ["talkContactAdded", state.talkContactAdded],
    ["searchUnlocked", state.searchUnlocked],
    ["searched404", state.searched404],
    ["employeeLoginSuccess", state.employeeLoginSuccess],
    ["deptSearchSuccess", state.deptSearchSuccess],
    ["auditKeySuccess", state.auditKeySuccess],
    ["archiveOpened", state.archiveOpened],
    ["finalSubmitted", state.finalSubmitted],
    ["pendingCallId", state.pendingCallId || "-"],
    ["activeCallId", state.activeCallId || "-"],
    ["completedCalls", state.completedCalls.join(", ") || "-"]
  ];
  return `
    <div class="hint-block debug-panel">
      <h3>進行状態</h3>
      <dl>
        ${rows.map(([key, value]) => `<div><dt>${escapeHtml(key)}</dt><dd>${escapeHtml(String(value))}</dd></div>`).join("")}
      </dl>
    </div>
  `;
}

function renderNotes() {
  const checks = [
    ["資料請求フォームを送信する", state.contactSubmitted],
    ["Talkで資料窓口を追加する", state.talkContactAdded],
    ["Filesでサービス概要資料を読む", state.servicePdfOpened],
    ["Searchで404を調べる", state.searched404],
    ["社員専用ページに入る", state.employeeLoginSuccess],
    ["監査室を見つける", state.deptSearchSuccess],
    ["アーカイブを復元する", state.archiveOpened],
    ["最終送信する", state.finalSubmitted]
  ];
  return `
    <div class="notes-body">
      <div class="hint-block">
        <h3>調査メモ</h3>
        <p>調査対象: 株式会社ユメミノ総合研究所</p>
        <ul>
          <li>2025.08.07 の表示不具合</li>
          <li>社員数404名の注記</li>
          <li>資料請求後に届く配布資料</li>
          <li>社員専用ページの参照条件</li>
        </ul>
        <p class="note-small">外部サイトには接続しないこと。この仮想端末内のアプリだけで調査可能。</p>
      </div>
      <div class="hint-block">
        <h3>進行状況チェックリスト</h3>
        <ul class="progress-checks">${checks.map(([label, done]) => `<li class="${done ? "is-done" : ""}">${done ? "✓" : "□"} ${escapeHtml(label)}</li>`).join("")}</ul>
      </div>
      <div class="hint-block">
        <h3>段階ヒント</h3>
        <p>404系の語をSearchで調べると、企業サイトだけでは見えない連絡が入ります。</p>
        <p>社員専用ページでは、社員IDと参照キーが必要です。企業情報、採用、IRを見直してください。</p>
        <p>最終段階では、復元文書名の欠けた文字だけを読みます。</p>
      </div>
      <div class="hint-block">
        <h3>進行状況</h3>
        <p>この端末の進行状況はブラウザ内に保存されています。</p>
        <button class="desktop-button secondary" type="button" data-reset-progress>進行状況を初期化する</button>
      </div>
      ${renderDebugPanel()}
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

function handleEmployeeLoginSuccess() {
  if (state.employeeLoginSuccess) return;
  state.employeeLoginSuccess = true;
  state.browserPath = "/employee-404";
  state.unreadFiles += 1;
  saveState();
  setNotice("社員404の記録にアクセスしました");
  setTimeout(() => triggerIncomingCall("employee404-01"), 600);
}

function handleDeptSearchSuccess() {
  state.deptSearchSuccess = true;
  state.browserPath = "/audit";
  saveState();
  setNotice("監査室ページが開かれました");
}

function handleAuditKeySuccess() {
  state.auditKeySuccess = true;
  state.browserPath = "/archive";
  state.unreadFiles += 1;
  saveState();
  setNotice("復元キーを確認しました");
  setTimeout(handleArchiveOpened, 700);
}

function handleArchiveOpened() {
  if (state.archiveOpened) return;
  state.archiveOpened = true;
  state.currentFolder = "recovered";
  state.selectedFile = "";
  state.unreadFiles += 1;
  saveState();
  setNotice("Recoveredに復元文書が追加されました");
  setTimeout(() => triggerIncomingCall("archive-01"), 650);
}

function handleFinalSubmitted() {
  if (state.finalSubmitted) return;
  state.finalSubmitted = true;
  state.servicePdfOpened = true;
  state.searched404 = true;
  state.employeeLoginSuccess = true;
  state.deptSearchSuccess = true;
  state.auditKeySuccess = true;
  state.archiveOpened = true;
  state.unreadTalk += 1;
  state.unreadFiles += 1;
  addMessages(["final-1", "final-2"]);
  state.currentTalkThread = "system";
  state.currentFolder = "downloads";
  state.selectedFile = "final_transfer_receipt";
  saveState();
  setNotice("外部監査送信キュー: 送信済み");
  toast("送信完了", "final_transfer_receipt.txt をFilesに保存しました。");
}

window.addEventListener("message", event => {
  const type = event.data?.type;
  if (type === "YRI_CONTACT_REQUEST_SUBMITTED") completeContactRequest();
  if (type === "YRI_EMPLOYEE_LOGIN_SUCCESS") handleEmployeeLoginSuccess();
  if (type === "YRI_DEPT_SEARCH_SUCCESS") handleDeptSearchSuccess();
  if (type === "YRI_AUDIT_KEY_SUCCESS") handleAuditKeySuccess();
  if (type === "YRI_ARCHIVE_OPENED") handleArchiveOpened();
  if (type === "YRI_FINAL_SUBMITTED") handleFinalSubmitted();
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
