function normalize(value) {
  return String(value || "")
    .trim()
    .replace(/\s+/g, "")
    .replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xfee0))
    .replace(/[‐‑‒–—―ー−]/g, "-")
    .toLowerCase();
}

const answers = {
  1: ["相沢澪", "相澤澪", "あいざわみお"],
  2: ["28", "28人", "二十八"],
  3: ["27", "27人", "h18_6-1_27names.jpg", "27names"],
  4: ["2006年7月14日", "2006/07/14", "20060714", "0714", "7月14日"],
  5: ["c-0714", "c0714", "Ｃ-０７１４", "展示ケースc", "ケースc"],
  6: ["雨量観測ノート"],
  7: ["旧体育館修繕写真", "修繕写真"],
  8: ["旧体育館東階段", "体育館東階段", "東階段"],
  9: ["橘修司", "たちばなしゅうじ"],
  10: ["鳴瀬建設", "なるせ建設"],
  11: ["黄色い傘", "黄色の傘", "黄いろい傘"],
  12: ["19:20", "1920", "19時20分", "午後7時20分"],
  13: ["転出済", "転出扱い", "転校"],
  14: ["2006/07/15", "20060715", "2006年7月15日", "7月15日"],
  15: ["橘修司", "相沢澪", "旧体育館東階段", "突き落"]
};

const messages = {
  1: "照合成功。写真から消えている児童は相沢澪です。",
  2: "照合成功。名簿登録数は28人です。",
  3: "照合成功。集合写真ファイルは27人分として保存されています。",
  4: "照合成功。記録が閉じられた日は2006年7月14日です。",
  5: "照合成功。保管箱はC-0714です。",
  6: "照合成功。未返却資料のひとつは雨量観測ノートです。",
  7: "照合成功。もうひとつの未返却資料は旧体育館修繕写真です。",
  8: "照合成功。場所は旧体育館東階段です。",
  9: "照合成功。現地確認者は橘修司です。",
  10: "照合成功。工事業者は鳴瀬建設です。",
  11: "照合成功。留言板に残る持ち物は黄色い傘です。",
  12: "照合成功。相沢澪の確認欄が空白だった時刻は19:20です。",
  13: "照合成功。翌日に修正された言葉は転出済です。",
  14: "照合成功。9月号の台帳上の配布日は2006/07/15です。",
  15: "結論が成立しました。下に真相が復元されました。"
};

function solvedStage() {
  return Number(localStorage.getItem("minamidani_stage") || "0");
}

function setStage(stage) {
  if (stage > solvedStage()) localStorage.setItem("minamidani_stage", String(stage));
  renderLocks();
}

function renderLocks() {
  const solved = solvedStage();
  document.querySelectorAll("[data-lock]").forEach((section) => {
    const required = Number(section.dataset.lock) - 1;
    section.classList.toggle("locked", solved < required);
  });
  if (solved >= 15) document.querySelector("[data-truth]")?.removeAttribute("hidden");
}

function isCorrect(stage, value) {
  const v = normalize(value);
  if (stage === 15) return answers[15].every((part) => v.includes(normalize(part)));
  return answers[stage].some((answer) => v.includes(normalize(answer)));
}

function show(result, ok, text) {
  result.className = `result ${ok ? "good" : "bad"}`;
  result.textContent = text;
}

renderLocks();
document.querySelectorAll("[data-stage]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const stage = Number(form.dataset.stage);
    const result = form.querySelector(".result");
    if (solvedStage() < stage - 1) {
      show(result, false, "前の段階を先に解いてください。");
      return;
    }
    const value = new FormData(form).get("answer");
    if (!isCorrect(stage, value)) {
      show(result, false, "まだ照合できません。年度、人数、日付、資料番号、場所、人物名をもう一度見てください。");
      return;
    }
    setStage(stage);
    show(result, true, messages[stage]);
  });
});
