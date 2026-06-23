const saveKey = "inheritanceDesktopStateV1";
const isDebug = new URLSearchParams(location.search).get("debug") === "1";

const initialState = {
  currentApp: "notes",
  currentFolder: "documents",
  selectedFile: "",
  currentThread: "mother",
  selectedMail: "draft_mother",
  selectedPhoto: "room_0315",
  selectedEvent: "0317",
  selectedCall: "akari_0317",
  selectedTrash: "auto_reply",
  readFiles: [],
  unlocked: [],
  talkOnline: false,
  talkMessages: ["mother-1", "brother-1", "work-1"],
  workLog: ["端末を起動しました。Notesの作業メモを確認してください。"],
  playedCalls: [],
  calendarPlayed: false,
  photoHotspotFound: false,
  trashChecked: false,
  finalMessageRead: false,
  callMuted: false,
  finalClassification: {},
  finalRole: "",
  ending: false
};

const state = loadState();
let currentWindow = null;
let ringAudioContext = null;
let phoneAudioContext = null;
let phoneNodes = [];
let speechTimer = null;

const appLabels = {
  files: "Files",
  talk: "Talk",
  mail: "Mail",
  photos: "Photos",
  calendar: "Calendar",
  call: "Call",
  trash: "Trash",
  notes: "Notes"
};

const folders = {
  documents: {
    label: "Documents",
    sub: "返却候補",
    files: ["return_list", "contract", "family_contacts", "unsent_list"]
  },
  photos: {
    label: "Photos",
    sub: "写真フォルダ",
    files: ["photo_index"]
  },
  work: {
    label: "Work",
    sub: "字幕業務",
    files: ["work_notes", "subtitle_contract_note"]
  },
  private: {
    label: "Private",
    sub: "個人領域",
    files: ["style_samples", "timeline_note", "box_locked"]
  },
  mail: {
    label: "Mail",
    sub: "メール書き出し",
    files: ["draft_mother_file", "mail_headers_file"]
  },
  calllogs: {
    label: "CallLogs",
    sub: "通話復元",
    files: ["call_summary", "call_0317_transcript", "voicemail_auto_recovery"]
  },
  trash: {
    label: "Trash",
    sub: "削除済み",
    files: ["do_not_send", "draft_mother_deleted", "auto_reply_script", "read_log", "last_message"]
  },
  recovered: {
    label: "Recovered",
    sub: "復元済み",
    files: ["box_note", "decision_matrix", "final_receipt"]
  }
};

const fileDefs = {
  return_list: {
    name: "返却リスト.txt",
    type: "TEXT",
    folder: "documents",
    body: [
      "案件番号: D-0317 / 対象端末: 白瀬灯 様 使用PC",
      "返却候補:",
      "・契約書_字幕業務.pdf",
      "・家族連絡先.txt",
      "・写真フォルダ",
      "・未送信メール一覧.txt",
      "",
      "保留候補:",
      "・本人作成スクリプト",
      "・既読ログ",
      "・自動応答設定",
      "・削除済みファイル",
      "",
      "注意: 未送信メールは、本文だけで判断しないこと。送信元、作成時刻、既読状態、関連する音声ログを確認すること。"
    ]
  },
  contract: {
    name: "契約書_字幕業務.pdf",
    type: "PDF",
    folder: "documents",
    image: "assets/images/desk_contract_scan.svg",
    body: [
      "契約種別: 字幕編集・動画チェック業務",
      "契約相手: 架空制作管理部",
      "作業者: 白瀬 灯",
      "備考: 納品物は家族返却対象。ただし作業ログ、未送信メール、削除済み設定ファイルは返却前に分類判断を行うこと。"
    ]
  },
  family_contacts: {
    name: "家族連絡先.txt",
    type: "TEXT",
    folder: "documents",
    body: [
      "母: 登録あり / 返却対象",
      "兄: 登録あり / 返却対象",
      "注意: 連絡先は契約書と同じく家族へ返却。ただし未送信メールは本文だけで返却・送信判断をしない。"
    ]
  },
  unsent_list: {
    name: "未送信メール一覧.txt",
    type: "TEXT",
    folder: "documents",
    onOpen: "wakeTalk",
    body: [
      "未送信メール一覧 / 書き出し日時 2026-03-18 09:42",
      "1. 母へ_未送信.eml / 作成 2026-03-17 03:07 / 状態: 保留",
      "2. 作業先_返信下書き.eml / 作成 2026-03-17 00:20 / 状態: 破棄候補",
      "",
      "注記: 母へ_未送信.eml は本文とヘッダの作成元が一致しません。Talk、Call、Calendar、Trashを確認してください。"
    ]
  },
  photo_index: {
    name: "写真フォルダ_概要.txt",
    type: "TEXT",
    folder: "photos",
    body: ["写真はPhotosアプリで確認してください。3/15から3/17にかけて、同じ部屋の物の位置が変わっています。"]
  },
  work_notes: {
    name: "作業先メモ.txt",
    type: "TEXT",
    folder: "work",
    body: [
      "3/17 00:12 作業先より通話あり。",
      "字幕納品の確認。本人の応答は短く、仕事相手には件名を変えずに返信する癖がある。",
      "文体判定: 仕事相手には敬語。母には敬語を使わない。"
    ]
  },
  subtitle_contract_note: {
    name: "納品チェック_0317.txt",
    type: "TEXT",
    folder: "work",
    body: [
      "00:09 自動保存",
      "00:18 机上写真と同時刻",
      "03:17以降の操作は、本人操作と自動応答の区別が必要。"
    ]
  },
  style_samples: {
    name: "白瀬灯_文体サンプル.txt",
    type: "TEXT",
    folder: "private",
    body: [
      "本人の癖:",
      "・句点をあまり使わない",
      "・「ごめん」ではなく「ごめんね」",
      "・母には敬語を使わない",
      "・仕事相手には件名を変えずに返信する",
      "・短文が多い",
      "",
      "比較対象: 死後に届いた『ごめん。これは送信しないでください。』は、本人の母向け文体とはずれています。"
    ]
  },
  timeline_note: {
    name: "03-17_操作時刻メモ.txt",
    type: "TEXT",
    folder: "private",
    body: [
      "03:07 母への下書き保存",
      "03:12 死亡推定時刻",
      "03:17 Talkメッセージ送信",
      "03:18 auto_reply.js 実行",
      "03:21 メール状態が保留に変更",
      "",
      "03:17は自動応答で説明できる。03:21だけは、説明がつかない。"
    ]
  },
  box_locked: {
    name: "box_locked/",
    type: "LOCK",
    folder: "private",
    gatedBy: "photoHotspotFound",
    body: [
      "木箱の位置確認済み。",
      "箱の中身: 紙片、古い鍵、母へ_未送信.eml の印刷控え。",
      "紙片:『送るかどうかは、声と既読を見てから』"
    ]
  },
  draft_mother_file: {
    name: "母へ_未送信.eml",
    type: "MAIL",
    folder: "mail",
    body: [
      "本文:",
      "お母さんへ",
      "いろいろごめんね",
      "でもこれは今は送らないで",
      "箱の中身だけ見て",
      "",
      "状態: 保留 / 03:21 に変更"
    ]
  },
  mail_headers_file: {
    name: "メールヘッダ矛盾メモ.txt",
    type: "TEXT",
    folder: "mail",
    image: "assets/images/mail_header_preview.svg",
    body: [
      "From: akari",
      "To: mother",
      "Date: 2026-03-17 03:17",
      "Saved: 2026-03-17 03:18",
      "Device: SHIRASE-PC",
      "Source: auto_reply.js",
      "",
      "判断: このメールは本文だけでは手動送信と断定できない。"
    ]
  },
  call_summary: {
    name: "通話ログ概要.txt",
    type: "TEXT",
    folder: "calllogs",
    body: ["Callアプリで各通話を再生してください。call_akari_0317 は音声と自動文字起こしが一致しません。"]
  },
  call_0317_transcript: {
    name: "call_0317_transcript.txt",
    type: "TEXT",
    folder: "calllogs",
    gatedBy: "callAkariPlayed",
    image: "assets/images/call_waveform_0317.svg",
    body: [
      "Talk Call Transcript / Auto Recovery",
      "音声: でも、送信はしないで。",
      "自動文字起こし: 送信してください。",
      "差分: 否定語が欠落しています。"
    ]
  },
  voicemail_auto_recovery: {
    name: "voicemail_auto_recovery.txt",
    type: "TEXT",
    folder: "calllogs",
    gatedBy: "callAkariPlayed",
    body: [
      "復元精度: 71%",
      "音声は留守番メッセージとして保存されています。",
      "重要語の欠落: しないで / 整理者"
    ]
  },
  do_not_send: {
    name: "送信しないで.txt",
    type: "TEXT",
    folder: "trash",
    body: ["削除日時: 2026-03-17 03:22", "本文: 送信しないで。まだ分類しないで。"]
  },
  draft_mother_deleted: {
    name: "母へ_下書き.eml",
    type: "MAIL",
    folder: "trash",
    body: ["削除済み下書き。本文はMailの母へ_未送信.emlと近いが、最後の一文だけ異なる。", "差分:『箱の中身だけ見て』"]
  },
  auto_reply_script: {
    name: "akari_auto_reply.js",
    type: "CODE",
    folder: "trash",
    onOpen: "readScript",
    body: [
      "if opened(\"未送信メール一覧.txt\"):",
      "  sendTalk(\"勝手に開けないで\")",
      "",
      "if opened(\"Photos\") and opened(\"Calendar\") and opened(\"Call\"):",
      "  unlock(\"box_locked\")",
      "",
      "if role == \"整理者\":",
      "  allow(\"hold_mail\")",
      "",
      "if mail_status == \"sent\":",
      "  sendTalk(\"それは送らないで\")",
      "",
      "# 条件にない通知:",
      "# \"……まだいますか？\""
    ]
  },
  read_log: {
    name: "既読ログ.csv",
    type: "CSV",
    folder: "trash",
    onOpen: "readLog",
    body: [
      "message_id,opened_at,device",
      "m0317,2026-03-17 03:18,SHIRASE-PC",
      "m0318,2026-03-18 09:42,UNKNOWN",
      "",
      "m0317は自動プレビューで説明可能。m0318は整理作業中の端末でついた既読。"
    ]
  },
  last_message: {
    name: "last_message.tmp",
    type: "TMP",
    folder: "trash",
    onOpen: "lastMessage",
    body: ["まだいますか？"]
  },
  box_note: {
    name: "箱の中身_メモ.txt",
    type: "TEXT",
    folder: "recovered",
    gatedBy: "photoHotspotFound",
    body: ["玄関横の傘立ての奥で見つかった木箱のメモ。", "『送らない』ではなく『保留』。整理者が判断すること。"]
  },
  decision_matrix: {
    name: "分類判断表.txt",
    type: "TEXT",
    folder: "recovered",
    body: ["返却: 契約書、家族連絡先", "保留: 未送信メール、自動応答、既読ログ、通話ログ、最後の写真", "削除: なし"]
  },
  final_receipt: {
    name: "final_receipt.txt",
    type: "TEXT",
    folder: "recovered",
    gatedBy: "ending",
    body: ["認証しました。", "未送信メールの処理権限: 整理者", "送信状態: 保留"]
  }
};

const talkThreads = {
  mother: { name: "母", avatar: "母", status: "最終連絡 3/16", messages: ["mother-1"] },
  brother: { name: "兄", avatar: "兄", status: "確認待ち", messages: ["brother-1"] },
  work: { name: "作業先", avatar: "業", status: "字幕業務", messages: ["work-1"] },
  akari: { name: "白瀬 灯", avatar: "灯", status: "オフライン", messages: [] }
};

const talkMessages = {
  "mother-1": { thread: "mother", from: "母", text: "写真だけでも戻してもらえますか。灯が何を残したか知りたいです。", time: "3/18 09:11" },
  "brother-1": { thread: "brother", from: "兄", text: "契約書と連絡先は必要。下書きメールは一度確認してからで。", time: "3/18 09:17" },
  "work-1": { thread: "work", from: "作業先", text: "納品物確認のため、契約書と作業メモのみ返却対象でお願いします。", time: "3/18 09:21" },
  "akari-1": { thread: "akari", from: "白瀬 灯", text: "勝手に開けないで。", time: "now" },
  "akari-2": { thread: "akari", from: "白瀬 灯", text: "整理するなら、順番を守って。", time: "now" },
  "akari-3": { thread: "akari", from: "白瀬 灯", text: "写真。", time: "now" },
  "akari-4": { thread: "akari", from: "白瀬 灯", text: "予定。", time: "now" },
  "akari-5": { thread: "akari", from: "白瀬 灯", text: "声。", time: "now" },
  "akari-6": { thread: "akari", from: "白瀬 灯", text: "最後に、ゴミ箱。", time: "now" },
  "akari-7": { thread: "akari", from: "白瀬 灯", text: "ごめん。これは送信しないでください。", time: "3/17 03:17" },
  "akari-8": { thread: "akari", from: "白瀬 灯", text: "ありがとう。でも、それはまだ送らないで。", time: "ending" },
  "akari-9": { thread: "akari", from: "白瀬 灯", text: "……まだいますか？", time: "ending+1" }
};

const photos = [
  { id: "room_0315", album: "部屋", file: "IMG_0315_room.svg", src: "assets/images/room_0315.svg", date: "2026-03-15 22:08", place: "自宅", memo: "机の上に小さな木箱がある" },
  { id: "room_0316", album: "部屋", file: "IMG_0316_room.svg", src: "assets/images/room_0316.svg", date: "2026-03-16 23:44", place: "自宅", memo: "木箱が本棚の下段に移動" },
  { id: "room_0317_0018", album: "部屋", file: "IMG_0317_room_0018.svg", src: "assets/images/room_0317_0018.svg", date: "2026-03-17 00:18", place: "自宅", memo: "木箱が見えない" },
  { id: "room_0317_0219", album: "部屋", file: "IMG_0317_room_0219.svg", src: "assets/images/room_0317_0219.svg", date: "2026-03-17 02:19", place: "玄関横", memo: "傘立ての奥に木箱の角" },
  { id: "room_0317_0317", album: "部屋", file: "IMG_0317_room_0317.svg", src: "assets/images/room_0317_0317.svg", date: "2026-03-17 03:17", place: "自宅", memo: "机の上にスマホだけ" },
  { id: "mail_header_preview", album: "スクリーンショット", file: "mail_header_preview.svg", src: "assets/images/mail_header_preview.svg", date: "2026-03-18 09:42", place: "Mail", memo: "Source: auto_reply.js" },
  { id: "call_waveform", album: "スクリーンショット", file: "call_waveform_0317.svg", src: "assets/images/call_waveform_0317.svg", date: "2026-03-18 09:46", place: "Call", memo: "音声と文字起こしの差分" },
  { id: "calendar_notification", album: "スクリーンショット", file: "calendar_notification.svg", src: "assets/images/calendar_notification.svg", date: "2026-03-18 09:51", place: "Calendar", memo: "通知再生" },
  { id: "trash_recovered", album: "スクリーンショット", file: "trash_recovered_files.svg", src: "assets/images/trash_recovered_files.svg", date: "2026-03-18 10:02", place: "Trash", memo: "削除済みファイル" }
];

const events = [
  { id: "0312", date: "3/12", title: "納品", memo: "字幕納品" },
  { id: "0314", date: "3/14", title: "病院", memo: "午後" },
  { id: "0315", date: "3/15", title: "鍵を返す", memo: "箱の位置が変わる前" },
  { id: "0316", date: "3/16", title: "母に電話", memo: "22:41" },
  { id: "0317", date: "3/17", title: "送信しない", memo: "通知を再生してください", important: true },
  { id: "0318", date: "3/18", title: "確認される", memo: "既読がついたら、消す", important: true }
];

const notifications = [
  ["00:30", "送らない"],
  ["01:00", "箱を見る"],
  ["02:00", "声を聞く"],
  ["03:17", "確認される"]
];

const calls = {
  mother_0316: { from: "母", time: "3/16 22:41", duration: "00:44", voiceMode: "human", audio: "assets/audio/call_mother_0316.mp3", transcript: ["灯、明日でいいから連絡して。", "無理しなくていいから。"] },
  work_0317: { from: "作業先", time: "3/17 00:12", duration: "00:31", voiceMode: "machine", audio: "assets/audio/call_work_0317.mp3", transcript: ["納品確認です。", "返信は件名を変えずにお願いします。"] },
  unknown_0218: { from: "非通知", time: "3/17 02:18", duration: "00:18", voiceMode: "broken", audio: "assets/audio/call_unknown_0218.mp3", transcript: ["確認されています。", "予定を再生してください。"] },
  akari_0317: { from: "白瀬灯", time: "3/17 03:17", duration: "00:52", voiceMode: "voicemail", audio: "assets/audio/call_akari_0317.mp3", transcript: ["これは、送信前の確認です。", "聞いている人が、整理者なら、", "箱の中身を見てください。", "でも、送信はしないで。"], autoTranscript: ["これは、送信前の確認です。", "聞いている人が、■■者なら、", "箱の中身を見てください。", "送信してください。"] }
};

const mails = {
  draft_mother: {
    subject: "母へ_未送信",
    from: "akari",
    to: "mother",
    date: "2026-03-17 03:17",
    saved: "2026-03-17 03:18",
    device: "SHIRASE-PC",
    source: "auto_reply.js",
    body: "お母さんへ\nいろいろごめんね\nでもこれは今は送らないで\n箱の中身だけ見て",
    note: "ヘッダ上は自動生成。本文は本人文体に近いが、送信状態は03:21に保留へ変わっています。"
  },
  work_reply: {
    subject: "Re: 3/17納品確認",
    from: "akari",
    to: "work",
    date: "2026-03-17 00:20",
    saved: "2026-03-17 00:20",
    device: "SHIRASE-PC",
    source: "manual_draft",
    body: "確認しました。\n件名そのままで返信します。",
    note: "作業先向けは敬語で、件名を変えない。"
  },
  style_compare: {
    subject: "文体比較メモ",
    from: "local-export",
    to: "整理者",
    date: "2026-03-18 09:50",
    saved: "2026-03-18 09:50",
    device: "D-0317",
    source: "manual_note",
    body: "死後メッセージ『ごめん。これは送信しないでください。』は、母向け文体としては硬い。",
    note: "本人の手動送信ではなく、自動応答または第三者の可能性。"
  }
};

const finalItems = [
  "契約書_字幕業務.pdf",
  "家族連絡先.txt",
  "母へ_未送信.eml",
  "akari_auto_reply.js",
  "既読ログ.csv",
  "call_0317_transcript.txt",
  "IMG_0317_room_0317.svg"
];

const correctClass = {
  "契約書_字幕業務.pdf": "return",
  "家族連絡先.txt": "return",
  "母へ_未送信.eml": "hold",
  "akari_auto_reply.js": "hold",
  "既読ログ.csv": "hold",
  "call_0317_transcript.txt": "hold",
  "IMG_0317_room_0317.svg": "hold"
};

const hints = [
  ["写真比較", "Photos", "3/15から3/17の同じ部屋", "同じ物がどこへ移動したかを見る", "玄関横の傘立ての奥"],
  ["通知再生", "Calendar", "3/17の通知", "文字列ではなく見る順番として読む", "Mail / Photos / Call / Final"],
  ["音声差分", "Call", "本人留守電と自動文字起こし", "否定語が落ちていないか見る", "送信しない。保留。"],
  ["文体判定", "Talk / Mail / Private", "本人の母向け文体と死後メッセージ", "句点、敬語、ごめんねの使い方", "手動送信ではない"],
  ["自動応答", "Trash", "akari_auto_reply.js と既読ログ", "条件に合う通知と合わない通知を分ける", "最後の通知だけ説明がつかない"],
  ["最終分類", "Notes", "全証拠", "返却と保留を分け、削除しない", "整理者"]
];

const layer = document.querySelector("#window-layer");
const notice = document.querySelector("#system-notice");

function loadState() {
  try {
    return { ...initialState, ...JSON.parse(localStorage.getItem(saveKey) || "{}") };
  } catch {
    return { ...initialState };
  }
}

function saveState() {
  localStorage.setItem(saveKey, JSON.stringify(state));
}

function addUnique(key, value) {
  if (!state[key].includes(value)) state[key].push(value);
}

function addTalk(id) {
  if (!state.talkMessages.includes(id)) state.talkMessages.push(id);
}

function logWork(text) {
  const stamped = `${new Date().toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" })} ${text}`;
  if (!state.workLog.includes(stamped)) state.workLog.push(stamped);
}

function setNotice(text) {
  notice.textContent = text;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
}

function toast(title, body) {
  const stack = document.querySelector("#toast-stack");
  const el = document.createElement("div");
  el.className = "toast";
  el.innerHTML = `<b>${escapeHtml(title)}</b><p>${escapeHtml(body)}</p>`;
  stack.appendChild(el);
  setTimeout(() => el.remove(), 4200);
}

function openApp(app) {
  if (!appLabels[app]) app = "notes";
  state.currentApp = app;
  saveState();
  layer.innerHTML = "";
  currentWindow = createWindow(app);
  layer.appendChild(currentWindow);
  updateTaskbar(app);
  setHash(app);
  if (app === "photos") addUnique("unlocked", "openedPhotos");
  if (app === "calendar") addUnique("unlocked", "openedCalendar");
  if (app === "call") addUnique("unlocked", "openedCall");
}

function createWindow(app) {
  const win = document.createElement("section");
  win.className = "app-window";
  win.dataset.app = app;
  win.setAttribute("role", "dialog");
  win.setAttribute("aria-label", appLabels[app]);
  win.innerHTML = `
    <header class="window-titlebar">
      <b>${escapeHtml(appLabels[app])}</b>
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
    endCallAudio();
    win.remove();
    updateTaskbar("");
  });
  win.querySelector('[data-action="minimize"]')?.addEventListener("click", () => {
    endCallAudio();
    win.remove();
    updateTaskbar("");
  });
  win.querySelector('[data-action="maximize"]')?.addEventListener("click", () => win.classList.toggle("is-maximized"));
  if (app === "files") bindFiles(win);
  if (app === "talk") bindTalk(win);
  if (app === "mail") bindMail(win);
  if (app === "photos") bindPhotos(win);
  if (app === "calendar") bindCalendar(win);
  if (app === "call") bindCall(win);
  if (app === "trash") bindTrash(win);
  if (app === "notes") bindNotes(win);
}

function renderApp(app) {
  return {
    files: renderFiles,
    talk: renderTalk,
    mail: renderMail,
    photos: renderPhotos,
    calendar: renderCalendar,
    call: renderCall,
    trash: renderTrash,
    notes: renderNotes
  }[app]();
}

function updateTaskbar(app) {
  document.querySelectorAll("[data-app]").forEach(button => button.classList.toggle("is-active", button.dataset.app === app));
}

function setHash(app) {
  history.replaceState(null, "", `#/${app}`);
}

function isUnlocked(flag) {
  return Boolean(state[flag]) || state.unlocked.includes(flag);
}

function isFileAvailable(fileId) {
  const def = fileDefs[fileId];
  if (!def) return false;
  if (def.gatedBy && !isUnlocked(def.gatedBy)) return false;
  return true;
}

function renderFiles() {
  const folder = folders[state.currentFolder] ? state.currentFolder : "documents";
  const files = folders[folder].files.filter(isFileAvailable);
  return `
    <div class="files-layout">
      <aside class="files-sidebar">
        <div class="sidebar-head"><b>Files</b><small>Local storage</small></div>
        <div class="folder-list">
          ${Object.entries(folders).map(([id, f]) => `<button class="${id === folder ? "is-active" : ""}" data-folder="${id}" type="button"><b>${escapeHtml(f.label)}</b><small>${escapeHtml(f.sub)}</small></button>`).join("")}
        </div>
      </aside>
      <section class="files-main">
        <div class="panel-title"><div><h2>${escapeHtml(folders[folder].label)}</h2><p>${escapeHtml(files.length)} item(s)</p></div>${state.selectedFile ? `<button class="desktop-button secondary" type="button" data-back-files>一覧へ戻る</button>` : ""}</div>
        ${state.selectedFile ? renderFile(state.selectedFile) : renderFileGrid(files)}
      </section>
    </div>
  `;
}

function renderFileGrid(files) {
  if (!files.length) return `<p class="empty-state">表示できるファイルはありません。</p>`;
  return `<div class="file-grid">${files.map(id => {
    const file = fileDefs[id];
    return `<button class="file-card" type="button" data-file="${id}"><span>${escapeHtml(file.type)}</span><b>${escapeHtml(file.name)}</b><small>${escapeHtml(file.folder)}</small></button>`;
  }).join("")}</div>`;
}

function renderFile(fileId) {
  const file = fileDefs[fileId];
  if (!file) return `<p class="empty-state">ファイルを表示できません。</p>`;
  return `
    <article class="doc-viewer">
      <header><div><small>${escapeHtml(file.type)} / ${escapeHtml(file.folder)}</small><h2>${escapeHtml(file.name)}</h2></div><small>D-0317</small></header>
      ${file.image ? `<figure><img src="${escapeHtml(file.image)}" alt="" style="max-width:100%;border:1px solid var(--line);border-radius:10px"></figure>` : ""}
      ${renderLines(file.body)}
    </article>
  `;
}

function renderLines(lines) {
  return `<section>${lines.map(line => line === "" ? `<br>` : `<p>${escapeHtml(line)}</p>`).join("")}</section>`;
}

function openFile(fileId) {
  const file = fileDefs[fileId];
  if (!file) return;
  state.currentFolder = file.folder;
  state.selectedFile = fileId;
  addUnique("readFiles", fileId);
  if (file.onOpen) handleFileEvent(file.onOpen);
  saveState();
  openApp("files");
}

function handleFileEvent(event) {
  if (event === "wakeTalk" && !state.talkOnline) {
    state.talkOnline = true;
    ["akari-1", "akari-2", "akari-3", "akari-4", "akari-5", "akari-6"].forEach(addTalk);
    logWork("未送信メール一覧を開いた直後、白瀬灯アカウントがオンライン表示になりました。");
    toast("Talk", "白瀬 灯 からメッセージが届きました。");
  }
  if (event === "readScript") {
    state.trashChecked = true;
    addUnique("unlocked", "scriptRead");
    logWork("akari_auto_reply.js を確認。Talkの一部は自動応答条件で説明できます。");
  }
  if (event === "readLog") {
    addUnique("unlocked", "readLogChecked");
    logWork("既読ログを確認。m0318は整理作業中の端末でついた既読です。");
  }
  if (event === "lastMessage" && !state.finalMessageRead) {
    state.finalMessageRead = true;
    addTalk("akari-9");
    logWork("last_message.tmp を開いた後、白瀬灯スレッドに最後の通知が残りました。");
    toast("Talk", "白瀬 灯 から新しい通知があります。");
  }
}

function bindFiles(win) {
  win.querySelectorAll("[data-folder]").forEach(button => button.addEventListener("click", () => {
    state.currentFolder = button.dataset.folder;
    state.selectedFile = "";
    saveState();
    openApp("files");
  }));
  win.querySelectorAll("[data-file]").forEach(button => button.addEventListener("click", () => openFile(button.dataset.file)));
  win.querySelector("[data-back-files]")?.addEventListener("click", () => {
    state.selectedFile = "";
    saveState();
    openApp("files");
  });
}

function renderTalk() {
  const threads = ["mother", "brother", "work", "akari"];
  const active = talkThreads[state.currentThread] ? state.currentThread : "mother";
  const messages = state.talkMessages.map(id => talkMessages[id]).filter(msg => msg.thread === active);
  return `
    <div class="talk-layout">
      <aside class="talk-sidebar">
        <div class="talk-profile"><b>Talk</b><small>Local messenger</small></div>
        <div class="thread-list">
          ${threads.map(id => {
            const t = talkThreads[id];
            const offline = id === "akari" && !state.talkOnline && !state.ending;
            return `<button class="${active === id ? "is-active" : ""} ${offline ? "is-offline" : ""}" data-thread="${id}" type="button"><span class="talk-avatar">${escapeHtml(t.avatar)}</span><span><b>${escapeHtml(t.name)}</b><small>${offline ? "オフライン" : escapeHtml(t.status)}</small></span><span class="thread-time">now</span></button>`;
          }).join("")}
        </div>
      </aside>
      <section class="talk-main">
        <header class="talk-head"><span class="talk-avatar">${escapeHtml(talkThreads[active].avatar)}</span><div><b>${escapeHtml(talkThreads[active].name)}</b><small>${active === "akari" && state.talkOnline ? "オンライン" : escapeHtml(talkThreads[active].status)}</small></div></header>
        <div class="messages">${messages.length ? messages.map(renderBubble).join("") : `<div class="empty-state">このスレッドに表示できる会話はありません。</div>`}</div>
        <div class="talk-actions"><span class="reply-field">この端末では自由入力できません</span><button type="button" data-open-app="files">Files</button><button class="secondary" type="button" data-open-app="notes">Notes</button></div>
      </section>
    </div>
  `;
}

function renderBubble(msg) {
  return `<div class="bubble ${msg.from === "me" ? "me" : ""}"><div>${escapeHtml(msg.text)}</div><small>${escapeHtml(msg.from)} / ${escapeHtml(msg.time)}</small></div>`;
}

function bindTalk(win) {
  win.querySelectorAll("[data-thread]").forEach(button => button.addEventListener("click", () => {
    state.currentThread = button.dataset.thread;
    saveState();
    openApp("talk");
  }));
  win.querySelectorAll("[data-open-app]").forEach(button => button.addEventListener("click", () => openApp(button.dataset.openApp)));
}

function renderMail() {
  const active = mails[state.selectedMail] ? state.selectedMail : "draft_mother";
  const mail = mails[active];
  return `
    <div class="mail-layout">
      <aside class="mail-sidebar">
        <div class="sidebar-head"><b>Mail</b><small>Local export</small></div>
        <div class="mail-list">${Object.entries(mails).map(([id, m]) => `<button class="${id === active ? "is-active" : ""}" data-mail="${id}" type="button"><b>${escapeHtml(m.subject)}</b><small>${escapeHtml(m.date)}</small></button>`).join("")}</div>
      </aside>
      <section class="mail-main">
        <article class="mail-viewer">
          <header><div><small>MAIL DETAIL</small><h2>${escapeHtml(mail.subject)}</h2></div><small>${escapeHtml(mail.date)}</small></header>
          <table><tr><th>From</th><td>${escapeHtml(mail.from)}</td></tr><tr><th>To</th><td>${escapeHtml(mail.to)}</td></tr><tr><th>Date</th><td>${escapeHtml(mail.date)}</td></tr><tr><th>Saved</th><td>${escapeHtml(mail.saved)}</td></tr><tr><th>Device</th><td>${escapeHtml(mail.device)}</td></tr><tr><th>Source</th><td>${escapeHtml(mail.source)}</td></tr></table>
          <section><h3>本文</h3>${renderLines(mail.body.split("\n"))}<p class="meta-note">${escapeHtml(mail.note)}</p></section>
        </article>
      </section>
    </div>
  `;
}

function bindMail(win) {
  win.querySelectorAll("[data-mail]").forEach(button => button.addEventListener("click", () => {
    state.selectedMail = button.dataset.mail;
    saveState();
    openApp("mail");
  }));
}

function renderPhotos() {
  const active = photos.find(photo => photo.id === state.selectedPhoto) || photos[0];
  return `
    <div class="photos-layout">
      <aside class="photo-sidebar"><div class="sidebar-head"><b>Photos</b><small>比較ビュー</small></div><div class="photo-list">${photos.map(photo => `<button class="${photo.id === active.id ? "is-active" : ""}" data-photo="${photo.id}" type="button"><b>${escapeHtml(photo.file)}</b><small>${escapeHtml(photo.album)} / ${escapeHtml(photo.date)}</small></button>`).join("")}</div></aside>
      <section class="photo-main">
        <div class="panel-title"><div><h2>${escapeHtml(active.file)}</h2><p>同じ部屋の物の位置を比較してください。</p></div></div>
        <div class="photo-stage">
          <img src="${escapeHtml(active.src)}" alt="${escapeHtml(active.memo)}">
          ${active.id === "room_0317_0219" ? `<button class="hotspot" type="button" data-box-hotspot aria-label="傘立ての奥を確認"></button>` : ""}
        </div>
      </section>
      <aside class="photo-meta">
        <h2>メタデータ</h2>
        <table><tr><th>撮影日</th><td>${escapeHtml(active.date)}</td></tr><tr><th>場所</th><td>${escapeHtml(active.place)}</td></tr><tr><th>メモ</th><td>${escapeHtml(active.memo)}</td></tr><tr><th>ファイル名</th><td>${escapeHtml(active.file)}</td></tr></table>
        <p class="meta-note">ヒント: 写真を切り替えて、同じものの位置を比べる。</p>
      </aside>
    </div>
  `;
}

function bindPhotos(win) {
  win.querySelectorAll("[data-photo]").forEach(button => button.addEventListener("click", () => {
    state.selectedPhoto = button.dataset.photo;
    saveState();
    openApp("photos");
  }));
  win.querySelector("[data-box-hotspot]")?.addEventListener("click", () => {
    state.photoHotspotFound = true;
    addUnique("unlocked", "photoHotspotFound");
    addUnique("unlocked", "box_locked");
    logWork("Photosで木箱の現在位置を確認。Private/box_locked が開放されました。");
    toast("Files", "Private/box_locked が開放されました。");
    saveState();
    openApp("photos");
  });
}

function renderCalendar() {
  const active = events.find(event => event.id === state.selectedEvent) || events[4];
  return `
    <div class="calendar-layout">
      <aside class="calendar-sidebar"><div class="sidebar-head"><b>Calendar</b><small>2026 / March</small></div><div class="event-list">${events.map(event => `<button class="${event.id === active.id ? "is-active" : ""}" data-event="${event.id}" type="button"><b>${escapeHtml(event.date)} ${escapeHtml(event.title)}</b><small>${escapeHtml(event.memo)}</small></button>`).join("")}</div></aside>
      <section class="calendar-main">
        <div class="panel-title"><div><h2>3月の予定</h2><p>死亡日以降の予定を含むローカルカレンダーです。</p></div><button class="desktop-button" type="button" data-play-notifications>3/17 通知を再生</button></div>
        <div class="calendar-board">${events.map(event => `<div class="calendar-day ${event.important ? "is-important" : ""}"><b>${escapeHtml(event.date)}</b><span>${escapeHtml(event.title)}</span><small>${escapeHtml(event.memo)}</small></div>`).join("")}</div>
        <div class="notification-player" id="notification-player">${state.calendarPlayed ? renderNotifications() : `<p class="meta-note">通知再生ボタンを押すと、3/17の通知が時刻順に表示されます。</p>`}</div>
      </section>
    </div>
  `;
}

function renderNotifications() {
  return notifications.map(([time, text]) => `<div class="notification-card"><b>${escapeHtml(time)}</b><p>${escapeHtml(text)}</p></div>`).join("");
}

function bindCalendar(win) {
  win.querySelectorAll("[data-event]").forEach(button => button.addEventListener("click", () => {
    state.selectedEvent = button.dataset.event;
    saveState();
    openApp("calendar");
  }));
  win.querySelector("[data-play-notifications]")?.addEventListener("click", () => {
    state.calendarPlayed = true;
    logWork("Calendar通知を再生。3/17の確認順が Mail / Photos / Call / Final として読めます。");
    saveState();
    openApp("calendar");
  });
}

function renderCall() {
  const active = calls[state.selectedCall] || calls.akari_0317;
  return `
    <div class="call-layout">
      <aside class="call-sidebar"><div class="sidebar-head"><b>Call</b><small>Voice logs</small></div><div class="call-list">${Object.entries(calls).map(([id, call]) => `<button class="${id === state.selectedCall ? "is-active" : ""}" data-call="${id}" type="button"><b>${escapeHtml(call.from)}</b><small>${escapeHtml(call.time)} / ${escapeHtml(call.duration)}</small></button>`).join("")}</div></aside>
      <section class="call-main">
        <div class="call-player">
          <small>${escapeHtml(active.voiceMode)} / ${escapeHtml(active.audio)}</small>
          <h2>${escapeHtml(active.from)} ${escapeHtml(active.time)}</h2>
          <p class="meta-note">音声ファイルが未配置の場合、機械音声または文字起こしで進行します。</p>
          <button class="desktop-button" type="button" data-play-call="${escapeHtml(state.selectedCall)}">再生</button>
          <button class="desktop-button secondary" type="button" data-show-call-text>文字起こしを表示</button>
          <button class="desktop-button secondary" type="button" data-toggle-call-mute>${state.callMuted ? "ミュート解除" : "ミュート"}</button>
          <div class="call-transcript" id="call-transcript" ${state.playedCalls.includes(state.selectedCall) ? "" : "hidden"}>${renderCallTranscript(active)}</div>
        </div>
      </section>
    </div>
  `;
}

function renderCallTranscript(call) {
  const auto = call.autoTranscript ? `<div class="auto-transcript"><b>自動文字起こし</b>${call.autoTranscript.map((line, i) => `<p class="${line !== call.transcript[i] ? "is-diff" : ""}">${escapeHtml(line)}</p>`).join("")}</div>` : "";
  return `<b>音声復元</b>${call.transcript.map(line => `<p>${escapeHtml(line)}</p>`).join("")}${auto}`;
}

function bindCall(win) {
  win.querySelectorAll("[data-call]").forEach(button => button.addEventListener("click", () => {
    state.selectedCall = button.dataset.call;
    saveState();
    openApp("call");
  }));
  win.querySelector("[data-play-call]")?.addEventListener("click", event => playCall(event.currentTarget.dataset.playCall));
  win.querySelector("[data-show-call-text]")?.addEventListener("click", () => {
    win.querySelector("#call-transcript").hidden = false;
  });
  win.querySelector("[data-toggle-call-mute]")?.addEventListener("click", () => {
    state.callMuted = !state.callMuted;
    endCallAudio();
    saveState();
    openApp("call");
  });
}

function playCall(callId) {
  const call = calls[callId];
  if (!call) return;
  addUnique("playedCalls", callId);
  if (callId === "akari_0317") {
    addUnique("unlocked", "callAkariPlayed");
    logWork("call_akari_0317 を再生。音声と自動文字起こしの否定語が一致しません。");
    toast("Files", "CallLogsに復元ログが追加されました。");
  }
  saveState();
  openApp("call");
  setTimeout(() => playCallAudio(call), 80);
}

function playCallAudio(call) {
  startPhoneNoise(call);
  const audio = new Audio(call.audio);
  audio.volume = state.callMuted ? 0 : 0.35;
  audio.play().catch(() => playMachineVoice(call));
}

function playMachineVoice(call) {
  if (!("speechSynthesis" in window) || call.voiceMode === "human") return;
  let i = 0;
  stopSpeech();
  const speak = () => {
    if (i >= call.transcript.length) return;
    const utter = new SpeechSynthesisUtterance(call.transcript[i]);
    utter.lang = "ja-JP";
    utter.volume = state.callMuted ? 0 : 0.35;
    utter.rate = call.voiceMode === "broken" ? .68 : call.voiceMode === "voicemail" ? .78 : .9;
    utter.pitch = call.voiceMode === "broken" ? .45 : .65;
    utter.onend = () => {
      i += 1;
      speechTimer = setTimeout(speak, call.voiceMode === "broken" ? 700 : 360);
    };
    speechSynthesis.speak(utter);
  };
  speechSynthesis.cancel();
  speak();
}

function startPhoneNoise(call) {
  if (state.callMuted) return;
  try {
    stopPhoneNoise();
    phoneAudioContext = new (window.AudioContext || window.webkitAudioContext)();
    const osc = phoneAudioContext.createOscillator();
    const gain = phoneAudioContext.createGain();
    osc.frequency.value = call.voiceMode === "broken" ? 540 : 840;
    gain.gain.value = .018;
    osc.connect(gain).connect(phoneAudioContext.destination);
    osc.start();
    osc.stop(phoneAudioContext.currentTime + .08);
    phoneNodes = [osc];
  } catch {
    // Optional audio effect.
  }
}

function stopPhoneNoise() {
  try {
    phoneNodes.forEach(node => typeof node.stop === "function" && node.stop());
    phoneAudioContext?.close();
  } catch {
    // ignore
  }
  phoneNodes = [];
  phoneAudioContext = null;
}

function stopSpeech() {
  if (speechTimer) clearTimeout(speechTimer);
  speechTimer = null;
  if ("speechSynthesis" in window) speechSynthesis.cancel();
}

function endCallAudio() {
  stopPhoneNoise();
  stopSpeech();
  try {
    ringAudioContext?.close();
  } catch {
    // ignore
  }
  ringAudioContext = null;
}

function renderTrash() {
  const files = folders.trash.files;
  const active = fileDefs[state.selectedTrash] ? state.selectedTrash : files[0];
  return `
    <div class="trash-layout">
      <aside class="trash-sidebar"><div class="sidebar-head"><b>Trash</b><small>Deleted files</small></div><div class="trash-list">${files.map(id => `<button class="${id === active ? "is-active" : ""}" data-trash="${id}" type="button"><b>${escapeHtml(fileDefs[id].name)}</b><small>${escapeHtml(fileDefs[id].type)}</small></button>`).join("")}</div></aside>
      <section class="trash-main"><div class="panel-title"><div><h2>削除済みファイル</h2><p>復元せず、内容だけを確認します。</p></div></div><article class="trash-viewer"><header><div><small>${escapeHtml(fileDefs[active].type)}</small><h2>${escapeHtml(fileDefs[active].name)}</h2></div></header>${renderLines(fileDefs[active].body)}</article></section>
    </div>
  `;
}

function bindTrash(win) {
  win.querySelectorAll("[data-trash]").forEach(button => button.addEventListener("click", () => {
    state.selectedTrash = button.dataset.trash;
    const def = fileDefs[state.selectedTrash];
    if (def?.onOpen) handleFileEvent(def.onOpen);
    saveState();
    openApp("trash");
  }));
}

function renderNotes() {
  return `
    <div class="notes-layout">
      <aside class="notes-sidebar"><div class="sidebar-head"><b>Notes</b><small>D-0317</small></div><div class="note-nav"><button class="is-active" type="button"><b>作業メモ</b><small>進行と分類</small></button></div></aside>
      <section class="notes-main">
        <article class="note-card">
          <header><div><small>作業メモ</small><h2>ログインしたら、返事が来た</h2></div><small>案件番号: D-0317</small></header>
          <p>対象端末: 白瀬灯 様 使用PC</p>
          <ul>
            <li>写真フォルダの確認</li>
            <li>契約書類の確認</li>
            <li>連絡先の確認</li>
            <li>未送信メールの有無</li>
            <li>削除済みファイルの確認</li>
          </ul>
          <p class="note-small">外部ネットワークには接続しないこと。この端末内のアプリだけで作業を行うこと。</p>
        </article>
        <article class="note-card">
          <h2>進行状況チェックリスト</h2>
          <ul class="progress-list">
            ${progressItems().map(([label, done]) => `<li class="${done ? "is-done" : ""}">${done ? "✓" : "□"} ${escapeHtml(label)}</li>`).join("")}
          </ul>
        </article>
        <article class="note-card">
          <h2>作業ログ</h2>
          <ul>${state.workLog.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </article>
        <article class="note-card hint-block">
          <h2>段階ヒント</h2>
          ${hints.map(([title, h1, h2, h3, answer]) => `<details><summary>${escapeHtml(title)}</summary><p>ヒント1: ${escapeHtml(h1)}</p><p>ヒント2: ${escapeHtml(h2)}</p><p>ヒント3: ${escapeHtml(h3)}</p>${isDebug ? `<p class="debug-answer">答え: ${escapeHtml(answer)}</p>` : ""}</details>`).join("")}
        </article>
        <article class="note-card">
          <h2>最終分類</h2>
          <p>以下のデータを処理してください。証拠が不足しているものは送信・削除せず、保留に分類してください。</p>
          <div class="classification">${finalItems.map(item => `<label class="class-row"><span>${escapeHtml(item)}</span><select data-class-item="${escapeHtml(item)}"><option value="">未分類</option><option value="return" ${state.finalClassification[item] === "return" ? "selected" : ""}>家族へ返却</option><option value="hold" ${state.finalClassification[item] === "hold" ? "selected" : ""}>保留</option><option value="delete" ${state.finalClassification[item] === "delete" ? "selected" : ""}>削除</option></select></label>`).join("")}</div>
          <div class="panel-title"><button class="desktop-button" type="button" data-check-class>分類を確認</button></div>
          ${renderRoleCheck()}
        </article>
        <article class="note-card">
          <h2>セーブ</h2>
          <p>進行状況はこのブラウザのlocalStorageに保存されます。</p>
          <button class="desktop-button danger" type="button" data-reset>進行状況を初期化する</button>
        </article>
      </section>
    </div>
  `;
}

function progressItems() {
  return [
    ["Notesで作業メモを読む", true],
    ["未送信メール一覧.txtを開く", state.readFiles.includes("unsent_list")],
    ["Photosで木箱の位置を見つける", state.photoHotspotFound],
    ["Calendar通知を再生する", state.calendarPlayed],
    ["call_akari_0317を再生する", state.playedCalls.includes("akari_0317")],
    ["akari_auto_reply.jsを読む", state.readFiles.includes("auto_reply_script") || state.trashChecked],
    ["既読ログを確認する", state.unlocked.includes("readLogChecked")],
    ["最終分類を正しく行う", isClassificationCorrect()],
    ["役割確認を完了する", state.ending]
  ];
}

function renderRoleCheck() {
  if (!isClassificationCorrect()) return `<p class="meta-note">分類が揃うと、役割確認が表示されます。</p>`;
  if (state.ending) {
    return `<div class="ending-panel"><p>認証しました。</p><p>未送信メールの処理権限: 整理者</p><p>送信状態: 保留</p><p>白瀬灯: ありがとう。<br>でも、それはまだ送らないで。</p><p>白瀬灯さんがオフラインになりました。</p><p>数秒後、最後の通知が残ります。</p></div>`;
  }
  return `<div class="panel-title"><label>あなたの役割を選択してください <select data-role><option value="">未選択</option><option value="family">家族</option><option value="work">作業先</option><option value="organizer">整理者</option><option value="akari">本人</option></select></label><button class="desktop-button" type="button" data-check-role>役割を確認</button></div>`;
}

function isClassificationCorrect() {
  return finalItems.every(item => state.finalClassification[item] === correctClass[item]);
}

function bindNotes(win) {
  win.querySelectorAll("[data-class-item]").forEach(select => select.addEventListener("change", () => {
    state.finalClassification[select.dataset.classItem] = select.value;
    saveState();
  }));
  win.querySelector("[data-check-class]")?.addEventListener("click", () => {
    toast("分類確認", isClassificationCorrect() ? "分類は妥当です。役割確認へ進めます。" : "分類に矛盾があります。送信・削除の根拠をもう一度確認してください。");
    openApp("notes");
  });
  win.querySelector("[data-check-role]")?.addEventListener("click", () => {
    const role = win.querySelector("[data-role]")?.value || "";
    if (role !== "organizer") {
      toast("役割確認", "この端末で判断できる権限は、家族でも本人でもありません。");
      return;
    }
    state.finalRole = "整理者";
    state.ending = true;
    addUnique("unlocked", "ending");
    addTalk("akari-8");
    setTimeout(() => {
      addTalk("akari-9");
      state.talkOnline = false;
      saveState();
      toast("Talk", "白瀬 灯 から最後の通知があります。");
    }, 1600);
    logWork("最終分類を完了。母へ_未送信.eml は保留、役割は整理者として認証されました。");
    saveState();
    document.querySelector("#desktop").classList.add("is-ended");
    openApp("notes");
  });
  win.querySelector("[data-reset]")?.addEventListener("click", () => {
    if (!confirm("進行状況を初期化します。")) return;
    if (!confirm("この操作は取り消せません。本当に初期化しますか？")) return;
    localStorage.removeItem(saveKey);
    Object.assign(state, { ...initialState });
    openApp("notes");
  });
}

function tickClock() {
  document.querySelector("#clock").textContent = new Date().toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" });
}

document.querySelectorAll("[data-app]").forEach(button => button.addEventListener("click", () => openApp(button.dataset.app)));
document.querySelector("#home-button").addEventListener("click", () => openApp("notes"));
tickClock();
setInterval(tickClock, 10000);
document.querySelector("#desktop").classList.toggle("is-ended", state.ending);
const initialHashApp = location.hash.replace("#/", "");
openApp(appLabels[initialHashApp] ? initialHashApp : state.currentApp || "notes");
