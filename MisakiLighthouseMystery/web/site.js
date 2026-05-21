function normalize(value) {
  return String(value || "").trim().replace(/\s+/g, "").replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xfee0)).replace(/[‐‑‒–—―ー−]/g, "-").toLowerCase();
}
const answers = {
  1: ["綾瀬誠", "あやせまこと"],
  2: ["2009年10月12日", "2009/10/12", "20091012", "10月12日"],
  3: ["23:17", "2317", "23時17分"],
  4: ["霧笛室", "霧笛機械室"],
  5: ["kiri-1012", "kiri1012", "ＫＩＲＩ-１０１２"],
  6: ["白灯日誌", "白灯日誌第4冊"],
  7: ["第三倉庫", "第3倉庫"],
  8: ["港湾気象台", "岬港湾気象台"],
  9: ["南西8m", "南西8メートル", "南西八メートル"],
  10: ["無線記録c", "無線記録Ｃ", "record-c"],
  11: ["小野寺圭", "おのでらけい"],
  12: ["黒い防水ケース", "防水ケース"],
  13: ["0:42", "0042", "0時42分", "零時42分"],
  14: ["退職扱い", "退職"],
  15: ["2009/10/13", "20091013", "2009年10月13日", "10月13日"],
  16: ["潮見岬灯台資料館", "灯台資料館"],
  17: ["予備鍵", "合鍵"],
  18: ["小野寺圭", "綾瀬誠", "霧笛室", "閉じ込"]
};
const messages = Object.fromEntries(Array.from({ length: 18 }, (_, i) => [i + 1, i + 1 === 18 ? "結論が成立しました。下に真相が復元されました。" : "照合成功。次の資料を確認してください。"]));
function solvedStage() { return Number(localStorage.getItem("shiomizaki_stage") || "0"); }
function setStage(stage) { if (stage > solvedStage()) localStorage.setItem("shiomizaki_stage", String(stage)); renderLocks(); }
function renderLocks() {
  const solved = solvedStage();
  document.querySelectorAll("[data-lock]").forEach((section) => section.classList.toggle("locked", solved < Number(section.dataset.lock) - 1));
  if (solved >= 18) document.querySelector("[data-truth]")?.removeAttribute("hidden");
}
function isCorrect(stage, value) {
  const v = normalize(value);
  if (stage === 18) return answers[18].every((part) => v.includes(normalize(part)));
  return answers[stage].some((answer) => v.includes(normalize(answer)));
}
function show(result, ok, text) { result.className = `result ${ok ? "good" : "bad"}`; result.textContent = text; }
renderLocks();
document.querySelectorAll("[data-stage]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const stage = Number(form.dataset.stage);
    const result = form.querySelector(".result");
    if (solvedStage() < stage - 1) return show(result, false, "前の段階を先に解いてください。");
    if (!isCorrect(stage, new FormData(form).get("answer"))) return show(result, false, "まだ照合できません。日付、時刻、資料番号、場所、人物名を複数サイトで確認してください。");
    setStage(stage);
    show(result, true, messages[stage]);
  });
});
