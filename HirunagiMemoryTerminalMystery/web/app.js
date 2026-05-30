const STORAGE_KEY = "hirunagi-memory-terminal-v1";
const START_SECONDS = 60 * 60;

const files = [
  {
    id: "readme.txt",
    label: "readme.txt",
    unlock: 0,
    content: [
      "復元端末 HIRUNAGI-MEMORY-TERM",
      "この端末は停電直前の最後の警告を自動保存している。",
      "操作は help / scan / open / restore / submit。",
      "まず scan で読み取り可能なファイルを洗い出す。"
    ]
  },
  {
    id: "incident.log",
    label: "incident.log",
    unlock: 1,
    content: [
      "STORM INCIDENT LOG",
      "21:08  観測塔: 無線沈黙",
      "21:26  灯台局: 予備電源へ切替",
      "21:40  端末室: 手動警告を送信",
      "22:03  港事務所: 回線断",
      "",
      "最後に人の手で送信された時刻を抽出せよ。"
    ]
  },
  {
    id: "route.map",
    label: "route.map",
    unlock: 2,
    content: [
      "CABLE ROUTE MAP",
      "",
      "港事務所 -- 東桟橋 -- 灯台局     [断線]",
      "港事務所 -- 北防波堤 -- 端末室     [通電]",
      "",
      "写真の琥珀色CRTは端末室のもの。警告が出た経路上の場所を読む。"
    ]
  },
  {
    id: "mail.tmp",
    label: "mail.tmp",
    unlock: 3,
    locked: true,
    content: [
      "BROKEN TEMP MAIL",
      "restore mail.tmp で復元を試行できる。",
      "復元前の本文は欠落している。"
    ],
    restoredContent: [
      "RESTORED MAIL FRAGMENT",
      "みんなを東へ回すな。",
      "なぜなら灯台局の線は切れている。",
      "せめて北防波堤だけは閉鎖にして。",
      "",
      "各行頭を拾うと、送信者名が残る。",
      "M I N A S E"
    ]
  },
  {
    id: "checksum.dat",
    label: "checksum.dat",
    unlock: 4,
    content: [
      "CHECKSUM RULE",
      "submit 場所 時刻 送信者",
      "",
      "例: submit 西桟橋 20:00 佐伯",
      "場所は route.map、時刻は incident.log、送信者は復元した mail.tmp から確定する。"
    ]
  }
];

const hints = [
  "まずは help と scan。端末が何を読めるかを出すところからです。",
  "incident.log の中で『手動警告を送信』と書かれた行だけを見ます。",
  "route.map と写真を合わせます。灯台ではなく、琥珀色のCRTがある場所へ通電しています。",
  "mail.tmp は open だけでは足りません。restore mail.tmp を試してください。",
  "復元メールは本文よりも行頭が大事です。最後は submit で3要素を送ります。"
];

let state = loadState();

const output = document.querySelector("#output");
const form = document.querySelector("#commandForm");
const input = document.querySelector("#commandInput");
const fileList = document.querySelector("#fileList");
const timer = document.querySelector("#timer");
const objectiveText = document.querySelector("#objectiveText");
const statusText = document.querySelector("#statusText");
const slots = {
  place: document.querySelector("#placeSlot"),
  time: document.querySelector("#timeSlot"),
  sender: document.querySelector("#senderSlot")
};
const imageModal = document.querySelector("#imageModal");

document.querySelector("[data-open-image]").addEventListener("click", () => imageModal.showModal());
document.querySelector("[data-close-image]").addEventListener("click", () => imageModal.close());
document.querySelector("#hintButton").addEventListener("click", () => print(hints[Math.min(state.stage, hints.length - 1)], "success"));
document.querySelector("#resetButton").addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEY);
  state = initialState();
  renderAll();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const command = input.value.trim();
  if (!command) return;
  input.value = "";
  runCommand(command);
});

function initialState() {
  return {
    stage: 0,
    restored: false,
    found: { place: "", time: "", sender: "" },
    history: [
      { text: "HIRUNAGI-MEMORY-TERM booted in read-only mode.", type: "success" },
      { text: "任務: 最後の警告の 場所 / 時刻 / 送信者 を復元せよ。help で操作確認。", type: "" }
    ],
    startedAt: Date.now(),
    solved: false
  };
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && Array.isArray(saved.history) && saved.found) return saved;
  } catch {
    // Broken progress should not block play.
  }
  return initialState();
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function renderAll() {
  output.innerHTML = "";
  state.history.forEach((line) => renderLine(line.text, line.type));
  renderFiles();
  renderNotebook();
  renderObjective();
  renderTimer();
  saveState();
}

function renderFiles() {
  fileList.innerHTML = "";
  files.forEach((file) => {
    const unlocked = file.unlock <= state.stage;
    const button = document.createElement("button");
    button.type = "button";
    button.className = `file-button ${unlocked ? "" : "locked"}`;
    button.textContent = unlocked ? file.label : "locked file";
    button.disabled = !unlocked;
    button.addEventListener("click", () => runCommand(`open ${file.id}`));
    fileList.appendChild(button);
  });
}

function renderNotebook() {
  slots.place.textContent = state.found.place || "未確定";
  slots.time.textContent = state.found.time || "未確定";
  slots.sender.textContent = state.found.sender || "未確定";
}

function renderObjective() {
  const objectives = [
    "端末に help と入力して操作を確認してください。",
    "scan 後、incident.log を開いて最後の手動警告時刻を見つけてください。",
    "route.map を開き、警告が出た経路上の場所を確定してください。",
    "mail.tmp を restore し、送信者名を復元してください。",
    "checksum.dat を確認し、submit 場所 時刻 送信者 で結論を送ってください。",
    "解析完了。復元した結論を記録済みです。"
  ];
  objectiveText.innerHTML = objectives[Math.min(state.solved ? 5 : state.stage, objectives.length - 1)].replace(/help|scan|incident.log|route.map|mail.tmp|restore|checksum.dat|submit/g, "<code>$&</code>");
  statusText.textContent = state.solved ? "REPORT SAVED" : state.restored ? "RESTORED" : "READ ONLY";
}

function runCommand(raw) {
  const command = raw.trim();
  const normalized = command.toLowerCase();
  print(`> ${command}`, "command");

  if (normalized === "help") {
    print(["COMMANDS", "scan                 読み取り可能ファイルを検出", "open <file>          ファイルを開く", "restore <file>       破損ファイルを復元", "submit 場所 時刻 送信者  結論を送信"].join("\n"));
  } else if (normalized === "scan") {
    if (state.stage < 1) state.stage = 1;
    print("scan complete: readme.txt / incident.log detected.", "success");
  } else if (normalized.startsWith("open ")) {
    openFile(command.slice(5).trim());
  } else if (normalized.startsWith("restore ")) {
    restoreFile(command.slice(8).trim());
  } else if (normalized.startsWith("submit ")) {
    submitAnswer(command.slice(7).trim());
  } else if (["21:40", "2140"].includes(normalized)) {
    state.found.time = "21:40";
    if (state.stage < 2) state.stage = 2;
    print("time confirmed: 21:40", "success");
  } else if (normalized.includes("北防波堤")) {
    state.found.place = "北防波堤";
    if (state.stage < 3) state.stage = 3;
    print("place confirmed: 北防波堤", "success");
  } else if (normalized.includes("水瀬") || normalized.includes("minase")) {
    state.found.sender = "水瀬";
    if (state.stage < 4) state.stage = 4;
    print("sender confirmed: 水瀬", "success");
  } else {
    print("unknown command. help で操作一覧を表示。", "error");
  }

  renderFiles();
  renderNotebook();
  renderObjective();
  saveState();
}

function openFile(name) {
  const file = findFile(name);
  if (!file || file.unlock > state.stage) {
    print("file not found or locked. scan と前段の解析を確認。", "error");
    return;
  }
  const content = file.locked && state.restored ? file.restoredContent : file.content;
  print(`[${file.label}]\n${content.join("\n")}`);
}

function restoreFile(name) {
  const file = findFile(name);
  if (!file || file.id !== "mail.tmp" || file.unlock > state.stage) {
    print("restore failed. 復元対象は現在のディスク内にありません。", "error");
    return;
  }
  state.restored = true;
  print("restore complete: mail.tmp body recovered. open mail.tmp", "success");
}

function submitAnswer(raw) {
  const normalized = normalize(raw);
  const ok = normalized.includes("北防波堤") && normalized.includes("21:40") && (normalized.includes("水瀬") || normalized.includes("minase"));
  if (!ok) {
    print("checksum mismatch. 場所 / 時刻 / 送信者 の3要素をもう一度確認。", "error");
    return;
  }
  state.found.place = "北防波堤";
  state.found.time = "21:40";
  state.found.sender = "水瀬";
  state.stage = 5;
  state.solved = true;
  print("REPORT SAVED", "success");
  print("結論: 停電直前の警告は、灯台局ではなく通電していた北防波堤経路の端末室から、21:40に水瀬が送信した。");
}

function findFile(name) {
  const normalized = name.toLowerCase();
  return files.find((file) => file.id.toLowerCase() === normalized || file.label.toLowerCase() === normalized);
}

function normalize(text) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[０-９]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 0xfee0))
    .replace(/[：]/g, ":")
    .replace(/\s+/g, "");
}

function print(text, type = "") {
  state.history.push({ text, type });
  renderLine(text, type);
  saveState();
}

function renderLine(text, type = "") {
  const line = document.createElement("p");
  line.className = `line ${type}`;
  line.textContent = text;
  output.appendChild(line);
  output.scrollTop = output.scrollHeight;
}

function renderTimer() {
  const elapsed = Math.floor((Date.now() - state.startedAt) / 1000);
  const remaining = Math.max(0, START_SECONDS - elapsed);
  const minutes = String(Math.floor(remaining / 60)).padStart(2, "0");
  const seconds = String(remaining % 60).padStart(2, "0");
  timer.textContent = `${minutes}:${seconds}`;
}

renderAll();
setInterval(renderTimer, 1000);
