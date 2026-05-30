const STORAGE_KEY = "yukishima-signal-progress-v1";
const START_MINUTES = 60;

const evidence = {
  public: [
    {
      unlock: 0,
      kicker: "公開記事 A / 雪島日日 2009-03-18",
      title: "旧港避難、定刻どおり完了",
      body: "町港湾課は17日未明の高潮警戒について「全信号は03:00に緑へ復帰し、避難指示は予定どおり解除」と発表した。紙面写真では旧信号塔の窓は暗く、青灯の記録は掲載されていない。"
    },
    {
      unlock: 1,
      kicker: "公開写真キャプション差し替え履歴",
      title: "掲載写真の切り抜き位置",
      body: "初版キャプションには「信号塔上部まで写る」とあったが、翌日の電子版では塔上部が切られた写真へ差し替え。提供写真では同じ塔の上部に<mark>青い灯り</mark>が残る。"
    },
    {
      unlock: 2,
      kicker: "町広報 2009年4月号",
      title: "安全宣言の文面",
      body: "広報は「北防波堤側に通行支障なし」と説明している。ただし港湾資料の通行欄とは表現が一致しない。"
    }
  ],
  records: [
    {
      unlock: 1,
      kicker: "港湾信号 点検日誌",
      title: "3月17日 未明ログ",
      body: "02:58 緑復帰指示。03:12 第4号灯だけ応答なし。<mark>03:17</mark> 目視で青灯継続を確認。03:24 手動消灯。備考欄は後日黒塗り。",
      table: [["時刻", "記録"], ["03:12", "第4号灯 応答なし"], ["03:17", "青灯継続を目視"], ["03:24", "手動消灯"]]
    },
    {
      unlock: 2,
      kicker: "漁協無線聞き取り",
      title: "誘導ルートの食い違い",
      body: "無線係は「東桟橋へ回せ、と聞いた」と証言。公開記事の避難ルート図だけが<mark>北防波堤</mark>を通常通行扱いにしている。"
    },
    {
      unlock: 3,
      kicker: "保守請求書 控",
      title: "交換対象",
      body: "信号ユニット交換費 1基。対象欄には<mark>第4号灯</mark>。請求日は3月19日で、公開された設備点検表にはこの交換が載っていない。"
    }
  ],
  notes: [
    {
      unlock: 0,
      kicker: "匿名依頼メモ",
      title: "依頼の要点",
      body: "あなたは地方紙の記者。匿名提供者は『当時の記事と公開資料を並べれば、消されたものが分かる』とだけ言っている。返信は見つけた語句だけでよい。"
    },
    {
      unlock: 3,
      kicker: "資料室 閲覧票",
      title: "欠番になった付録",
      body: "2009年度 港湾課事故報告の付録一覧は A-01 から C-04 まで連番。ただし差し替え前の閲覧票には<mark>B-17</mark>が存在し、題名は『第4号灯 手動消灯時写真』。"
    },
    {
      unlock: 5,
      kicker: "最終照合",
      title: "隠された処理",
      body: "公開記事は青灯を消し、北防波堤を通行可能に見せ、B-17を付録一覧から外した。結論は『第4号灯が03:17まで青灯のまま残り、北防波堤が使えなかった証拠を撤去した』。"
    }
  ]
};

const stages = [
  {
    prompt: [
      "突然すみません。あなたが雪島の古い港湾記事を追っている記者だと聞きました。",
      "まず公開記事Aと提供写真を見比べてください。公開写真から切られているものを、見えた言葉で返信してください。"
    ],
    answers: ["青い灯り", "青灯", "青い信号", "青信号"],
    success: "そこです。記事では塔上部が消えている。次は、その灯りがいつまで残ったかを点検日誌で確認してください。",
    hint: "公開記事Aの写真説明と、左の提供写真の塔上部を比べます。色の名前を含む短い答えです。"
  },
  {
    prompt: [
      "港湾課は『03:00に緑へ復帰』と発表しています。でも日誌の中に、その説明と合わない時刻があります。",
      "青灯継続を目視した時刻を返信してください。"
    ],
    answers: ["03:17", "3:17", "3時17分", "午前3時17分"],
    success: "03:17。発表より17分遅い。避難ルートにも同じ歪みがあります。",
    hint: "港湾資料タブの点検日誌を開き、青灯継続を目視した行を探します。"
  },
  {
    prompt: [
      "公開記事は通行支障なしと書いています。無線聞き取りと広報の言い方がずれている場所を見てください。",
      "通行可能に見せかけられた場所を返信してください。"
    ],
    answers: ["北防波堤", "北防波堤側", "北の防波堤"],
    success: "北防波堤。そこが通常通行扱いなら、避難遅延は存在しないことになる。",
    hint: "公開記事と町広報は『通れた』側、聞き取りは別ルートへ回された側を示しています。"
  },
  {
    prompt: [
      "では、問題の信号は何番だったのか。保守請求書に残っています。",
      "交換対象の信号灯名を返信してください。"
    ],
    answers: ["第4号灯", "4号灯", "第四号灯"],
    success: "第4号灯。ここまでで、青灯・03:17・北防波堤・第4号灯がつながりました。",
    hint: "港湾資料タブの保守請求書に、交換対象がそのまま残っています。"
  },
  {
    prompt: [
      "最後に、資料室で消された付録番号を確認してください。",
      "差し替え前の閲覧票にだけ残っている付録番号を返信してください。"
    ],
    answers: ["b-17", "B-17"],
    success: "B-17。題名は『第4号灯 手動消灯時写真』。つまり写真そのものが付録一覧から消された。",
    hint: "調査メモの閲覧票に欠番の付録番号があります。番号だけを送ってください。"
  },
  {
    prompt: [
      "ここまでの情報を記事にできる形でまとめます。",
      "最終返信は『第4号灯 / 03:17 / 北防波堤 / B-17 / 何をしたか』が入る一文にしてください。"
    ],
    answers: ["第4号灯", "03:17", "北防波堤", "b-17"],
    final: true,
    success: "届きました。これなら記事にできます。雪島町は第4号灯が03:17まで青灯だったこと、北防波堤が使えなかったこと、その証拠付録B-17を撤去したことを隠していた。",
    hint: "これまで送った4つの答えを一文にし、最後に『撤去』か『差し替え』を含めてください。"
  }
];

let state = loadState();
let activeTab = "public";

const messagesEl = document.querySelector("#messages");
const boardEl = document.querySelector("#evidenceBoard");
const formEl = document.querySelector("#answerForm");
const inputEl = document.querySelector("#answerInput");
const hintButton = document.querySelector("#hintButton");
const resetButton = document.querySelector("#resetButton");
const timerEl = document.querySelector("#timer");
const imageModal = document.querySelector("#imageModal");

document.querySelectorAll("[data-tab]").forEach((button) => {
  button.addEventListener("click", () => {
    activeTab = button.dataset.tab;
    document.querySelectorAll("[data-tab]").forEach((tab) => tab.classList.toggle("active", tab === button));
    renderEvidence();
  });
});

document.querySelector("[data-open-image]").addEventListener("click", () => imageModal.showModal());
document.querySelector("[data-close-image]").addEventListener("click", () => imageModal.close());

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const raw = inputEl.value.trim();
  if (!raw) return;
  inputEl.value = "";
  addMessage(raw, "player");
  checkAnswer(raw);
});

hintButton.addEventListener("click", () => {
  addMessage(stages[state.stage].hint, "system");
});

resetButton.addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEY);
  state = initialState();
  renderAll();
});

function initialState() {
  return {
    stage: 0,
    messages: [],
    startedAt: Date.now(),
    solved: false
  };
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && Number.isInteger(saved.stage) && Array.isArray(saved.messages)) return saved;
  } catch {
    // Ignore broken local storage and start a clean investigation.
  }
  return initialState();
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function renderAll() {
  messagesEl.innerHTML = "";
  if (state.messages.length === 0) {
    state.messages = stages[0].prompt.map((text) => ({ text, kind: "source" }));
  }
  state.messages.forEach((message) => renderMessage(message.text, message.kind));
  renderEvidence();
  renderProgress();
  saveState();
}

function renderEvidence() {
  boardEl.innerHTML = "";
  evidence[activeTab].forEach((doc) => {
    const unlocked = doc.unlock <= state.stage;
    const article = document.createElement("article");
    article.className = `doc ${unlocked ? "" : "locked"}`;
    article.innerHTML = `
      <p class="doc-kicker">${doc.kicker}</p>
      <h2>${unlocked ? doc.title : "未開示資料"}</h2>
      <p>${unlocked ? doc.body : "匿名提供者から次の手がかりが届くと閲覧できます。"}</p>
      ${unlocked && doc.table ? buildTable(doc.table) : ""}
    `;
    boardEl.appendChild(article);
  });
}

function buildTable(rows) {
  const [head, ...body] = rows;
  return `
    <table>
      <thead><tr>${head.map((cell) => `<th>${cell}</th>`).join("")}</tr></thead>
      <tbody>${body.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")}</tbody>
    </table>
  `;
}

function addMessage(text, kind, persist = true) {
  renderMessage(text, kind);
  if (persist) {
    state.messages.push({ text, kind });
    saveState();
  }
}

function renderMessage(text, kind) {
  const bubble = document.createElement("div");
  bubble.className = `bubble ${kind}`;
  bubble.textContent = text;
  messagesEl.appendChild(bubble);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function normalize(text) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[０-９]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 0xfee0))
    .replace(/[：]/g, ":")
    .replace(/\s+/g, "");
}

function checkAnswer(raw) {
  const current = stages[state.stage];
  const normalized = normalize(raw);
  const matched = current.answers.some((answer) => normalized.includes(normalize(answer)));
  const finalReady = current.final
    ? ["第4号灯", "03:17", "北防波堤", "b-17"].every((term) => normalized.includes(normalize(term)))
      && (normalized.includes("撤去") || normalized.includes("差し替え") || normalized.includes("隠"))
    : matched;

  if (!finalReady) {
    addMessage("まだ資料と合っていません。左の資料にある表記をそのまま短く送ってください。", "system");
    return;
  }

  addMessage(current.success, "source");
  if (state.stage < stages.length - 1) {
    state.stage += 1;
    stages[state.stage].prompt.forEach((message) => addMessage(message, "source"));
  } else {
    state.solved = true;
    addMessage("調査完了。記事化するなら見出しは『雪島旧港、青灯17分の空白』でお願いします。", "system");
  }
  renderEvidence();
  renderProgress();
  saveState();
}

function renderProgress() {
  document.querySelectorAll(".progress-dot").forEach((dot, index) => {
    dot.classList.toggle("active", index <= state.stage);
  });
}

function renderTimer() {
  const elapsed = Math.floor((Date.now() - state.startedAt) / 1000);
  const remaining = Math.max(0, START_MINUTES * 60 - elapsed);
  const minutes = String(Math.floor(remaining / 60)).padStart(2, "0");
  const seconds = String(remaining % 60).padStart(2, "0");
  timerEl.textContent = `${minutes}:${seconds}`;
}

renderAll();
renderTimer();
setInterval(renderTimer, 1000);
