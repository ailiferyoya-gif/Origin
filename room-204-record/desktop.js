const GAME = {
  title: "未公開素材 204号室の記録",
  saveKey: "room204RecordStateV1",
  startNotice: "復元端末を起動しました",
  apps: {
    browser: "Browser",
    talk: "LINE",
    files: "Files",
    search: "Google",
    notes: "Notes"
  },
  browserTargets: {
    kct: {
      label: "KCT Archive",
      button: "番組",
      address: "archive.kct.local/204",
      url: "site/index.html"
    },
    housing: {
      label: "団地管理",
      button: "管理",
      address: "kasumino-housing.local",
      url: "housing/index.html"
    },
    vault: {
      label: "素材保管庫",
      button: "保管庫",
      address: "vault.kct.local",
      url: "archive/index.html"
    },
    social: {
      label: "Twitter風タイムライン",
      button: "Twitter",
      address: "twitter.local/kasumino",
      url: "social/index.html"
    }
  },
  events: {
    contactSubmitted: "ROOM204_CONTACT_REQUEST",
    housingUnlocked: "ROOM204_STAGE_UNLOCKED",
    archiveUnlocked: "ROOM204_ARCHIVE_UNLOCKED",
    socialClue: "ROOM204_SOCIAL_CLUE",
    cutOrderSolved: "ROOM204_CUT_ORDER_SOLVED",
    finalSubmitted: "ROOM204_FINAL_SUBMITTED"
  }
};

const initialState = {
  openApps: ["notes"],
  activeApp: "notes",
  notice: GAME.startNotice,
  browserTarget: "kct",
  browserPath: "/",
  contactSubmitted: false,
  researchStarted: false,
  searchUnlocked: false,
  housingUnlocked: false,
  archiveUnlocked: false,
  socialClueRead: false,
  cutOrderSolved: false,
  finalSubmitted: false,
  currentThread: "restore",
  currentFolder: "inbox",
  selectedFile: "readme",
  searchQuery: "",
  readFiles: [],
  messageIds: ["restore-boot"]
};

const talkMessages = {
  "restore-boot": {
    thread: "restore",
    from: "復元ログ",
    body: "端末状態: 起動完了\n最終利用者: KCT制作部 編集室3\n復元対象: 未放送素材 / 仮題「204号室の記録」\n\n最初にBrowserで番組アーカイブを確認してください。",
    time: "08:04"
  },
  "saeki-request": {
    thread: "saeki",
    from: "佐伯 明",
    body: "編集室に残っていた端末です。公開前に止まった番組の素材が散っています。\n\n番組ページ、管理記録、保管庫、住民投稿の順で見れば、おおよその流れは追えるはずです。まずは受信箱の依頼書を読んでください。",
    time: "08:12"
  },
  "saeki-after-start": {
    thread: "saeki",
    from: "佐伯 明",
    body: "Google検索を開けるようにしました。番組ID、日付、部屋番号、人名で引くと関連先に飛べます。\n\n取材時刻はそのまま並べると嘘になります。どの資料が何を隠しているか、時刻と方角を分けて見てください。",
    time: "08:19"
  },
  "manager-log": {
    thread: "manager",
    from: "かすみ野団地 管理室",
    body: "掲示記録の照会を受け付けました。4月17日の巡回票と鍵貸出メモをFilesへ移しました。\n\n一部、番組制作班へ渡した写しとは記載が異なります。",
    time: "08:31"
  },
  "social-cached": {
    thread: "restore",
    from: "復元ログ",
    body: "よりどまりの投稿群を保存しました。\n\n住民の投稿は正確ではありません。ただし、同じ時刻に別の場所から見えていたものをつなぐと、素材番号の並びが浮かびます。",
    time: "08:44"
  },
  "vault-opened": {
    thread: "mizuno",
    from: "水野 咲",
    body: "このメッセージが残っているなら、KCT-0417-204の束は開いたんですね。\n\n私はあの部屋で声を録っていません。録ったのは、北廊下の水音、西階段の蛍光灯、東集会室の反響、南の倉庫前で止まった足音です。",
    time: "09:02"
  },
  "cut-restored": {
    thread: "mizuno",
    from: "水野 咲",
    body: "黒味前の4カットは戻せました。\n\n番組で隠されたのは部屋の中ではありません。鍵の返却メモと、22時40分以降の投稿を合わせてください。最後の場所だけが、どの台本にも残っていません。",
    time: "09:26"
  },
  "final-done": {
    thread: "restore",
    from: "復元ログ",
    body: "復元完了。\n\n未公開素材の保管場所が確定しました。Filesに復元控えを保存しました。",
    time: "09:41"
  }
};

const threads = [
  { id: "restore", name: "復元ログ", avatar: "復" },
  { id: "saeki", name: "佐伯 明 / 制作", avatar: "佐" },
  { id: "manager", name: "団地管理室", avatar: "管" },
  { id: "mizuno", name: "水野 咲 / 音声", avatar: "水" }
];

const folders = [
  { id: "inbox", label: "受信箱" },
  { id: "production", label: "制作資料" },
  { id: "housing", label: "団地記録" },
  { id: "recovered", label: "復元素材" }
];

const files = {
  inbox: [
    {
      id: "readme",
      name: "00_復元依頼.txt",
      unlock: () => true,
      body: `KCT制作部 編集室3より回収。

未放送番組「204号室の記録」に関する素材が、複数の場所に分かれて保存されている。

確認先:
・Browser: 番組アーカイブ、団地管理、素材保管庫、よりどまり
・LINE: 関係者から届く復元依頼
・Files: 端末内に残った制作資料
・Google: 人名、日付、部屋番号、素材番号の照会
・Notes: 照合メモ

保存状態は自動で保持される。やり直す場合はNotesの初期化を使う。`
    },
    {
      id: "request",
      name: "01_佐伯からの依頼.txt",
      unlock: s => s.researchStarted,
      body: `宛先: 編集室3 復元担当
差出人: 佐伯 明

番組ページの公開用原稿と、端末内の素材番号が一致しません。

公開原稿では「204号室の室内検証」に見えますが、撮影素材はほとんどが室外です。
4月17日の管理記録と、住民投稿の時刻を見てください。

制作番号: KCT-0417-204
部屋番号: 204
照会日: 04/17

保管庫の束は、制作番号で開くはずです。`
    }
  ],
  production: [
    {
      id: "proposal",
      name: "企画書_204号室の記録.txt",
      unlock: s => s.researchStarted,
      body: `番組名: 未公開素材 204号室の記録
制作: KCTローカルアーカイブ班
初回予定: 4月17日 23:10

取材趣旨:
かすみ野団地2号棟204号室に残る噂を、住民証言と管理記録から検証する。

公開用の筋書き:
1. 古い噂の紹介
2. 204号室の確認
3. 住民証言
4. 未確認音声の検証

編集メモ:
「部屋の中」に寄せすぎると、実際の素材と合わない。
音声班の水野が残したラベルを優先すること。`
    },
    {
      id: "staff",
      name: "スタッフ表_0417.txt",
      unlock: s => s.researchStarted,
      body: `KCT-0417-204 スタッフ表

佐伯 明      構成 / プロデューサー
水野 咲      音声 / 記録
久世 亮      カメラ
堀内 真帆    編集助手
相馬 透      進行

備考:
水野は22:40以降、南倉庫前の音声を確認したあと編集室に戻っていない。
翌朝、北棟倉庫Bの鍵が管理室ポストに返却されていた。`
    },
    {
      id: "call-sheet",
      name: "当日香盤_0417.txt",
      unlock: s => s.researchStarted,
      body: `04/17 取材予定

18:30  管理室で鍵受け取り
19:13  北廊下 / 配管音
20:04  西階段 / 照明交換後の確認
21:31  東集会室 / 反響テスト
22:40  南倉庫前 / 住民証言の再録
23:10  編集室へ戻り素材整理

余白メモ:
番組ページには「204号室」とあるが、カメラ位置は四方の共用部。
方角だけを抜く。`
    },
    {
      id: "caption",
      name: "テロップ案_差し替え前.txt",
      unlock: s => s.archiveUnlocked,
      body: `差し替え前テロップ案

「19:13 北廊下」
「20:04 西階段」
「21:31 東集会室」
「22:40 南倉庫前」

差し替え後テロップ案

「204号室 室内検証」
「住民が聞いた音」
「消えた音声」

編集助手メモ:
後者は画と合わない。
四つの場所を隠すために、全部を一つの部屋に見せている。`
    }
  ],
  housing: [
    {
      id: "notice-log",
      name: "掲示記録_0417.txt",
      unlock: s => s.housingUnlocked,
      body: `かすみ野団地 管理室
掲示記録照会: 04/17

19:13  北廊下の配管点検。水音あり。作業員なし。
20:04  西階段の蛍光灯交換。交換後、10分間のみ点滅。
21:31  東集会室の鍵を開放。反響確認のためKCT班へ貸出。
22:40  南倉庫前で住民聞き取り。KCT班2名立会。

注記:
上記は掲示記録の写し。番組用に渡した資料では、場所名が削られていた。`
    },
    {
      id: "key-log",
      name: "鍵貸出控え_北棟倉庫B.txt",
      unlock: s => s.housingUnlocked,
      body: `鍵貸出控え

04/17 18:28  KCT制作部へ鍵束を貸出
04/17 22:36  南倉庫の鍵のみ返却
04/17 22:48  北棟倉庫Bの鍵が未返却
04/18 06:10  北棟倉庫Bの鍵を管理室ポストで確認

手書き欄:
「北棟倉庫Bの棚、下段奥。ラベルなしの黒ケースあり」

確認者: 管理室 伊田`
    },
    {
      id: "floor-note",
      name: "共用部配置メモ.txt",
      unlock: s => s.housingUnlocked,
      body: `2号棟 共用部配置

北: 北廊下、配管スペース
西: 西階段、照明盤
東: 東集会室、反響の強い壁
南: 南倉庫、外通路

204号室は中央寄り。
四つの録音地点は、204号室を囲むように置かれている。

順番を問う場合は、時刻ではなく素材ラベルの頭文字を見ること。`
    }
  ],
  recovered: [
    {
      id: "social-cache",
      name: "よりどまり投稿保存_0417.txt",
      unlock: s => s.socialClueRead,
      body: `よりどまり / かすみ野団地まわり
保存時刻: 08:44

19:14  北の廊下、また水の音。撮影の人がマイクを向けていた。
20:07  西階段の灯りが点いたり消えたり。下で誰かが待っていた。
21:32  東の集会室から、拍手みたいな反響。会議はない日。
22:44  南の倉庫の前で足音が止まった。女の人が「返した」と言った。

削除済み断片:
「北棟のほう、まだ電気ついてる」
「Bの棚を見に行った人、戻ってきてない」`
    },
    {
      id: "tape-index",
      name: "素材束_KCT-0417-204.txt",
      unlock: s => s.archiveUnlocked,
      body: `素材束: KCT-0417-204

N-1913  北廊下 / 配管音 / 水野ラベル
W-2004  西階段 / 蛍光灯 / 水野ラベル
E-2131  東集会室 / 反響 / 水野ラベル
S-2240  南倉庫前 / 足音 / 水野ラベル

編集室メモ:
黒味前に入る4カットの順は、N W E S。
番組版では4カットとも「204号室」の素材に差し替え済み。`
    },
    {
      id: "cut-order",
      name: "復元順_黒味前.txt",
      unlock: s => s.cutOrderSolved,
      body: `黒味前 4カット復元

1. N-1913 / 北廊下
2. W-2004 / 西階段
3. E-2131 / 東集会室
4. S-2240 / 南倉庫前

黒味後に残る音声:
「部屋じゃない。返した。棚の奥」

場所を示す資料:
・鍵貸出控え
・よりどまり投稿保存
・スタッフ表の備考`
    },
    {
      id: "receipt",
      name: "復元控え_保管場所.txt",
      unlock: s => s.finalSubmitted,
      body: `復元控え

未公開素材の保管場所:
北棟倉庫B

照合根拠:
・04/18 06:10、北棟倉庫Bの鍵が返却されている
・鍵貸出控えに「棚、下段奥。ラベルなしの黒ケース」
・22:44の投稿に「返した」という音声
・水野咲の残した素材束は、204号室ではなく共用部を囲む4カットだった

番組版の「204号室内検証」は、最後の保管場所を隠すための再編集と判断。`
    }
  ]
};

const searchDatabase = [
  {
    id: "kct",
    q: ["番組", "kct", "204", "未公開", "佐伯", "0417"],
    title: "KCT Archive / 未公開素材 204号室の記録",
    body: "番組アーカイブ。制作番号と取材予定が確認できます。",
    action: "browser:kct:/"
  },
  {
    id: "housing",
    q: ["団地", "管理", "掲示", "0417", "鍵", "倉庫", "北棟"],
    title: "かすみ野団地 管理室",
    body: "掲示記録と鍵貸出控えの照会ページ。",
    action: "browser:housing:/"
  },
  {
    id: "vault",
    q: ["保管庫", "素材", "kct-0417-204", "テープ", "水野", "nwes"],
    title: "KCT 素材保管庫",
    body: "素材束を開き、黒味前の4カットを復元します。",
    action: "browser:vault:/"
  },
  {
    id: "social",
    q: ["よりどまり", "投稿", "sns", "北廊下", "西階段", "東集会室", "南倉庫"],
    title: "よりどまり / かすみ野団地まわり",
    body: "架空SNS上の住民投稿。時刻と場所の断片が残っています。",
    action: "browser:social:/"
  },
  {
    id: "request",
    q: ["依頼", "制作番号", "kct-0417-204"],
    title: "受信箱 / 01_佐伯からの依頼.txt",
    body: "制作番号、部屋番号、照会日を確認できます。",
    action: "file:inbox:request",
    gated: s => s.researchStarted
  },
  {
    id: "call-sheet",
    q: ["香盤", "0417", "北", "西", "東", "南", "方角"],
    title: "制作資料 / 当日香盤_0417.txt",
    body: "取材時刻と方角の並びが残っています。",
    action: "file:production:call-sheet",
    gated: s => s.researchStarted
  },
  {
    id: "key-log",
    q: ["鍵", "北棟倉庫b", "棚", "黒ケース", "返却"],
    title: "団地記録 / 鍵貸出控え_北棟倉庫B.txt",
    body: "最終保管場所に関わる記録です。",
    action: "file:housing:key-log",
    gated: s => s.housingUnlocked
  },
  {
    id: "social-cache",
    q: ["返した", "22:44", "よりどまり", "bの棚", "戻ってきてない"],
    title: "復元素材 / よりどまり投稿保存_0417.txt",
    body: "削除済み投稿と保存済み投稿の断片です。",
    action: "file:recovered:social-cache",
    gated: s => s.socialClueRead
  },
  {
    id: "tape-index",
    q: ["nwes", "n-1913", "w-2004", "e-2131", "s-2240", "黒味"],
    title: "復元素材 / 素材束_KCT-0417-204.txt",
    body: "黒味前4カットの素材ラベルが確認できます。",
    action: "file:recovered:tape-index",
    gated: s => s.archiveUnlocked
  }
];

let state = loadState();
const layer = document.querySelector("#window-layer");
const notice = document.querySelector("#notice");
const clock = document.querySelector("#clock");

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function loadState() {
  const params = new URLSearchParams(location.search);
  if (params.get("reset") === "1") {
    Object.keys(localStorage)
      .filter(key => key.startsWith("room204"))
      .forEach(key => localStorage.removeItem(key));
  }
  try {
    return { ...clone(initialState), ...JSON.parse(localStorage.getItem(GAME.saveKey) || "{}") };
  } catch {
    return clone(initialState);
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

function addMessage(id) {
  addUnique("messageIds", id);
}

function toast(title, body) {
  const el = document.createElement("div");
  el.className = "toast";
  el.innerHTML = `<b>${esc(title)}</b><p>${esc(body)}</p>`;
  document.querySelector("#toast-stack").appendChild(el);
  setTimeout(() => el.remove(), 4600);
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

function openBrowser(target = "kct", path = "/") {
  state.browserTarget = GAME.browserTargets[target] ? target : "kct";
  state.browserPath = path || "/";
  openApp("browser");
}

function closeApp(app) {
  state.openApps = state.openApps.filter(item => item !== app);
  if (state.activeApp === app) state.activeApp = state.openApps[state.openApps.length - 1] || "";
  saveState();
  render();
}

function render() {
  notice.textContent = state.notice;
  document.querySelectorAll("[data-open-app]").forEach(button => {
    const app = button.dataset.openApp;
    button.classList.toggle("is-active", state.activeApp === app);
  });
  document.querySelectorAll("[data-open-browser]").forEach(button => {
    const target = button.dataset.openBrowser;
    button.classList.toggle("is-active", state.activeApp === "browser" && state.browserTarget === target);
  });
  layer.innerHTML = state.openApps.map(renderWindow).join("");
  bind();
}

function renderWindow(app) {
  const title = app === "browser" ? `${GAME.apps.browser} - ${GAME.browserTargets[state.browserTarget]?.label || "Site"}` : (GAME.apps[app] || app);
  return `
    <section class="app-window ${state.activeApp === app ? "is-active" : ""}" data-app="${esc(app)}" aria-label="${esc(title)}">
      <header class="window-titlebar" data-focus-app="${esc(app)}">
        <b>${esc(title)}</b>
        <div class="window-controls">
          <button data-action="minimize" data-app="${esc(app)}" type="button" aria-label="最小化">−</button>
          <button data-action="maximize" data-app="${esc(app)}" type="button" aria-label="最大化">□</button>
          <button data-action="close" data-app="${esc(app)}" type="button" aria-label="閉じる">×</button>
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
  const target = GAME.browserTargets[state.browserTarget] || GAME.browserTargets.kct;
  const hash = state.browserPath === "/" ? "" : `#${esc(state.browserPath)}`;
  return `
    <div class="browser-body">
      <div class="browser-toolbar">
        <button class="button secondary" data-browser-home type="button">Home</button>
        ${Object.entries(GAME.browserTargets).map(([id, item]) => `<button class="button secondary" data-browser-target="${esc(id)}" type="button">${esc(item.button)}</button>`).join("")}
        <div class="browser-address">${esc(target.address)}${esc(state.browserPath)}</div>
      </div>
      <iframe class="browser-frame" title="${esc(target.label)}" src="${esc(target.url)}${hash}"></iframe>
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
        ${threads.map(thread => {
          const last = threadMessages(thread.id).slice(-1)[0];
          return `
            <button class="${thread.id === current.id ? "is-active" : ""}" data-thread="${esc(thread.id)}" type="button">
              <span class="talk-avatar">${esc(thread.avatar)}</span>
              <span><b>${esc(thread.name)}</b><small>${esc(last?.body || "記録なし")}</small></span>
              <small>${threadMessages(thread.id).length || ""}</small>
            </button>
          `;
        }).join("")}
      </aside>
      <section class="chat-pane">
        <header class="chat-head"><b>${esc(current.name)}</b><p class="muted">端末内に残った連絡記録。外部へは接続していません。</p></header>
        <div class="messages">
          ${messages.map(message => `<p class="bubble ${message.from === "me" ? "me" : ""}"><b>${esc(message.from)}</b><br>${esc(message.body)}</p>`).join("") || `<p class="bubble">この相手との記録はまだありません。</p>`}
        </div>
        <div class="quick-replies">
          ${state.contactSubmitted && !state.researchStarted ? `<button class="button" data-start-research type="button">復元作業を開始</button>` : `<span class="muted">必要な連絡は、Browser内の照会や復元結果に応じて追加されます。</span>`}
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

function selectFile(folderId, fileId) {
  state.currentFolder = folderId;
  state.selectedFile = fileId;
  addUnique("readFiles", fileId);
  saveState();
  render();
}

function renderFiles() {
  const current = currentFile();
  return `
    <div class="app-grid">
      <aside class="sidebar">
        <h3>Folders</h3>
        ${folders.map(folder => `<button class="list-button ${folder.id === state.currentFolder ? "is-active" : ""}" data-folder="${esc(folder.id)}" type="button">${esc(folder.label)}</button>`).join("")}
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
    return `
      <section class="google-search-shell">
        <div class="google-logo" aria-label="Google">
          <span class="g-blue">G</span><span class="g-red">o</span><span class="g-yellow">o</span><span class="g-blue">g</span><span class="g-green">l</span><span class="g-red">e</span>
        </div>
        <article class="search-card google-locked">
          <h2>検索はまだ利用できません</h2>
          <p>番組アーカイブから復元依頼を受け、LINEで作業を開始すると検索できます。</p>
        </article>
      </section>`;
  }
  const query = state.searchQuery.trim().toLowerCase();
  const results = searchDatabase.filter(item => {
    if (item.gated && !item.gated(state)) return false;
    if (!query) return true;
    return item.q.some(word => word.toLowerCase().includes(query) || query.includes(word.toLowerCase()));
  });
  return `
    <section class="google-search-shell">
      <form class="google-search-box" data-search-form>
        <div class="google-logo" aria-label="Google">
          <span class="g-blue">G</span><span class="g-red">o</span><span class="g-yellow">o</span><span class="g-blue">g</span><span class="g-green">l</span><span class="g-red">e</span>
        </div>
        <div class="google-input-wrap">
          <span>⌕</span>
          <input name="q" value="${esc(state.searchQuery)}" placeholder="0417 204 北棟倉庫B NWES">
        </div>
        <button class="google-submit" type="submit">Google 検索</button>
      </form>
      <div class="google-results">
        ${results.map(item => `
          <article class="google-result">
            <small>${esc(item.action.replaceAll(":", " / "))}</small>
            <h2>${esc(item.title)}</h2>
            <p>${esc(item.body)}</p>
            <button class="result-link" data-search-action="${esc(item.action)}" type="button">開く</button>
          </article>
        `).join("") || `<p class="google-empty">一致する記録はありません。</p>`}
      </div>
    </section>
  `;
}
function renderNotes() {
  const checks = [
    ["番組アーカイブで復元依頼を受けた", state.contactSubmitted],
    ["LINEで復元作業を開始した", state.researchStarted],
    ["管理室の掲示記録を開いた", state.housingUnlocked],
    ["よりどまりの投稿群を保存した", state.socialClueRead],
    ["素材保管庫で KCT-0417-204 を開いた", state.archiveUnlocked],
    ["黒味前の4カットを復元した", state.cutOrderSolved],
    ["未公開素材の保管場所を提出した", state.finalSubmitted]
  ];
  return `
    <section class="content">
      <article class="note-card">
        <h2>復元ノート</h2>
        <p>この端末には、未放送番組「204号室の記録」の素材が分散して残っています。公開原稿と実素材が食い違う箇所を、複数の記録から照合してください。</p>
        <p class="muted">状態: 自動保存中 / リセットは最下部</p>
      </article>
      <article class="note-card">
        <h2>進行</h2>
        <ul class="check-list">${checks.map(([label, done]) => `<li class="${done ? "done" : ""}">${done ? "■" : "□"} ${esc(label)}</li>`).join("")}</ul>
      </article>
      <article class="note-card">
        <h2>照合メモ</h2>
        <details open><summary>序盤</summary><p>番組アーカイブに残る制作番号は、保管庫とGoogle検索の手がかりになります。</p></details>
        <details><summary>掲示記録</summary><p>管理室の照会番号は、番組が予定されていた日付に近い表記です。</p></details>
        <details><summary>素材束</summary><p>黒味前の4カットは、時刻よりもラベルの頭文字を優先してください。</p></details>
        <details><summary>終盤</summary><p>最後の場所は台本には残っていません。鍵の記録、投稿の断片、音声担当の言葉を合わせる必要があります。</p></details>
      </article>
      <article class="note-card">
        <h2>復元状態</h2>
        <p>この端末内の進行だけを初期化します。サイト内で開いた照会もあわせて戻ります。</p>
        <button class="button danger" data-reset type="button">復元状態を初期化</button>
      </article>
    </section>
  `;
}

function completeContactRequest() {
  if (state.contactSubmitted) return;
  state.contactSubmitted = true;
  state.currentThread = "saeki";
  addMessage("saeki-request");
  setNotice("LINEに復元依頼が届きました");
  toast("LINE", "佐伯から復元依頼が届きました。");
  saveState();
  openApp("talk");
}

function startResearch() {
  state.researchStarted = true;
  state.searchUnlocked = true;
  state.currentFolder = "inbox";
  state.selectedFile = "request";
  addMessage("saeki-after-start");
  addUnique("readFiles", "request");
  setNotice("Google検索と制作資料を開けるようになりました");
  toast("Files", "制作資料と検索機能を復元しました。");
  saveState();
  render();
}

function unlockHousing() {
  if (state.housingUnlocked) return;
  state.housingUnlocked = true;
  state.currentThread = "manager";
  state.currentFolder = "housing";
  state.selectedFile = "notice-log";
  addMessage("manager-log");
  setNotice("管理室の掲示記録を復元しました");
  toast("Files", "団地記録に掲示記録と鍵貸出控えを追加しました。");
  saveState();
  render();
}

function unlockSocialClue() {
  if (state.socialClueRead) return;
  state.socialClueRead = true;
  state.currentThread = "restore";
  addMessage("social-cached");
  setNotice("よりどまり投稿群を保存しました");
  toast("よりどまり", "投稿保存を復元素材に追加しました。");
  saveState();
  render();
}

function unlockArchive() {
  if (state.archiveUnlocked) return;
  state.archiveUnlocked = true;
  state.currentThread = "mizuno";
  state.currentFolder = "recovered";
  state.selectedFile = "tape-index";
  addMessage("vault-opened");
  setNotice("素材束 KCT-0417-204 を開きました");
  toast("素材保管庫", "素材束と水野の記録を復元しました。");
  saveState();
  render();
}

function solveCutOrder() {
  if (state.cutOrderSolved) return;
  state.cutOrderSolved = true;
  state.currentThread = "mizuno";
  state.currentFolder = "recovered";
  state.selectedFile = "cut-order";
  addMessage("cut-restored");
  setNotice("黒味前の4カットを復元しました");
  toast("素材保管庫", "復元順をFilesへ保存しました。");
  saveState();
  render();
}

function completeFinal() {
  if (state.finalSubmitted) return;
  state.finalSubmitted = true;
  state.currentThread = "restore";
  state.currentFolder = "recovered";
  state.selectedFile = "receipt";
  addMessage("final-done");
  setNotice("未公開素材の保管場所を確定しました");
  toast("復元完了", "復元控えをFilesへ保存しました。");
  saveState();
  render();
}

function handleDesktopEvent(type) {
  if (type === GAME.events.contactSubmitted) completeContactRequest();
  if (type === GAME.events.housingUnlocked) unlockHousing();
  if (type === GAME.events.socialClue) unlockSocialClue();
  if (type === GAME.events.archiveUnlocked) unlockArchive();
  if (type === GAME.events.cutOrderSolved) solveCutOrder();
  if (type === GAME.events.finalSubmitted) completeFinal();
}

function runSearchAction(action) {
  const [kind, a, b] = action.split(":");
  if (kind === "browser") openBrowser(a || "kct", b || "/");
  if (kind === "file") {
    selectFile(a, b);
    openApp("files");
  }
}

function bind() {
  document.querySelectorAll("[data-open-app]").forEach(button => button.addEventListener("click", () => openApp(button.dataset.openApp)));
  document.querySelectorAll("[data-open-browser]").forEach(button => button.addEventListener("click", () => openBrowser(button.dataset.openBrowser)));
  document.querySelectorAll("[data-focus-app]").forEach(bar => bar.addEventListener("pointerdown", () => { state.activeApp = bar.dataset.focusApp; saveState(); render(); }));
  document.querySelectorAll("[data-action='close'], [data-action='minimize']").forEach(button => button.addEventListener("click", () => closeApp(button.dataset.app)));
  document.querySelectorAll("[data-action='maximize']").forEach(button => button.addEventListener("click", event => event.currentTarget.closest(".app-window").classList.toggle("is-maximized")));
  document.querySelectorAll("[data-browser-home]").forEach(button => button.addEventListener("click", () => { state.browserPath = "/"; saveState(); render(); }));
  document.querySelectorAll("[data-browser-target]").forEach(button => button.addEventListener("click", () => openBrowser(button.dataset.browserTarget, "/")));
  document.querySelectorAll("[data-thread]").forEach(button => button.addEventListener("click", () => { state.currentThread = button.dataset.thread; saveState(); render(); }));
  document.querySelector("[data-start-research]")?.addEventListener("click", startResearch);
  document.querySelectorAll("[data-folder]").forEach(button => button.addEventListener("click", () => { state.currentFolder = button.dataset.folder; state.selectedFile = ""; saveState(); render(); }));
  document.querySelectorAll("[data-file]").forEach(button => button.addEventListener("click", () => selectFile(state.currentFolder, button.dataset.file)));
  document.querySelector("[data-search-form]")?.addEventListener("submit", event => {
    event.preventDefault();
    state.searchQuery = new FormData(event.currentTarget).get("q").toString();
    saveState();
    render();
  });
  document.querySelectorAll("[data-search-action]").forEach(button => button.addEventListener("click", () => runSearchAction(button.dataset.searchAction)));
  document.querySelector("[data-reset]")?.addEventListener("click", () => {
    if (!confirm("復元状態を初期化しますか。")) return;
    Object.keys(localStorage).filter(key => key.startsWith("room204")).forEach(key => localStorage.removeItem(key));
    state = clone(initialState);
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
