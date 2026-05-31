const START_SECONDS = 50 * 60;
const ORDER = ["月", "火", "水", "木", "金", "土", "日"];
const ANSWER = "屋上庭園";

const cards = [
  { day: "月", text: "赤おはよう、青◇、黄まくら、白い月。", key: "お" },
  { day: "火", text: "紫△、桃の鈴、青くるみ、黄ひかり。", key: "く" },
  { day: "水", text: "桃じぐざぐ、青☆、黄いかづち、白い輪。", key: "じょ" },
  { day: "木", text: "黄うたう、白ねむり、緑の針、桃いろ波。", key: "う" },
  { day: "金", text: "緑てのひら、桃の砂糖、青かすみ、白い窓。", key: "て" },
  { day: "土", text: "白いろの糸、赤い鍵、青い雨、緑の円。", key: "い" },
  { day: "日", text: "橙えんばん、紫の箱、桃の灯、黄の階段。", key: "えん" }
];

let started = Date.now();
let current = [...cards].sort(() => Math.random() - 0.5);

const cardsEl = document.querySelector("#cards");
const extractedEl = document.querySelector("#extracted");
const statusEl = document.querySelector("#status");
const resultEl = document.querySelector("#result");
const imageModal = document.querySelector("#imageModal");

document.querySelector("[data-open-image]").addEventListener("click", () => imageModal.showModal());
document.querySelector("[data-close-image]").addEventListener("click", () => imageModal.close());

document.querySelector("#hint").addEventListener("click", () => {
  resultEl.textContent = "まず曜日を月火水木金に並べます。各行の色名の直後にある記号が母音表、直後の文字が子音側の手がかりです。";
});

document.querySelector("#reset").addEventListener("click", () => {
  current = [...cards].sort(() => Math.random() - 0.5);
  resultEl.textContent = "";
  render();
});

document.querySelector("#answerForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const value = document.querySelector("#answer").value.replace(/\s/g, "");
  if (value.includes(ANSWER) || value.includes("おくじょうていえん")) {
    resultEl.textContent = "受信完了。日記の待ち合わせ場所は屋上庭園。意味不明な文ではなく、本人だけの規則で書いた避難メモでした。";
  } else {
    resultEl.textContent = "まだ合言葉が合いません。曜日順と復号盤をもう一度確認してください。";
  }
});

function render() {
  cardsEl.innerHTML = "";
  current.forEach((card, index) => {
    const article = document.createElement("article");
    article.className = "card";
    article.innerHTML = `
      <header>
        <strong>${card.day}曜日</strong>
        <span>
          <button type="button" data-move="${index}" data-dir="-1">上へ</button>
          <button type="button" data-move="${index}" data-dir="1">下へ</button>
        </span>
      </header>
      <p>${card.text}</p>
    `;
    cardsEl.appendChild(article);
  });
  updateExtracted();
}

cardsEl.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  const index = Number(button.dataset.move);
  const dir = Number(button.dataset.dir);
  const next = index + dir;
  if (next < 0 || next >= current.length) return;
  [current[index], current[next]] = [current[next], current[index]];
  render();
});

function updateExtracted() {
  const ordered = current.every((card, index) => card.day === ORDER[index]);
  const text = current.map((card) => card.key).join("");
  extractedEl.textContent = ordered ? `${text} → 屋上庭園` : text;
  statusEl.textContent = ordered
    ? "曜日順に整いました。抽出文字から場所を復号してください。"
    : "曜日順にカードを並べ替えてください。";
}

function renderTimer() {
  const elapsed = Math.floor((Date.now() - started) / 1000);
  const remaining = Math.max(0, START_SECONDS - elapsed);
  const minutes = String(Math.floor(remaining / 60)).padStart(2, "0");
  const seconds = String(remaining % 60).padStart(2, "0");
  document.querySelector("#timer").textContent = `${minutes}:${seconds}`;
}

render();
renderTimer();
setInterval(renderTimer, 1000);
