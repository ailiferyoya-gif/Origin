const answers = [
  "MSM-0817",
  "白楼資料館",
  "由来調査中",
  "1996/08/19",
  "角",
  "第2展示室",
  "21:17",
  "21:23",
  "B-17",
  "台帳と展示ラベル",
  "持ち出し戻り品",
  "木箱",
  "奥村志乃",
  "承認欄",
  "B-17",
  "封緘紙",
  "借用品",
  "由来",
  "赤字",
  "MSM-0817は由来を偽装された持ち出し戻り品"
];
const storageKey = "HakurouMuseumMystery_deep_unlocked";
const norm = (s) => String(s || "").replace(/[\s　。、・「」『』（）()]/g, "").toLowerCase();
let unlocked = Number(localStorage.getItem(storageKey) || "1");
const missHints = {
  6: "収蔵導線資料の展示室導線メモと、夜間警備ログの21:17を重ねてください。",
  8: "第2展示室の後に動く場所を見ます。収蔵庫B列の開閉時刻です。",
  9: "収蔵導線資料では、第2展示室から収蔵庫B列へ進んだ先の箱番号を見ます。",
  10: "保存整理メールと改訂履歴を重ねます。先に合わせたのは台帳と展示ラベルです。",
  11: "キャプション改訂履歴の由来欄で、旧控えに残る語を確認してください。",
  14: "公開時刻は進んでいますが、承認欄は空欄のままです。",
  19: "奥村志乃が残そうとした警告は、個人メモと収蔵導線資料の赤字です。",
  20: "最終報告は真贋ではなく、MSM-0817の由来が偽装された構造を一文にしてください。"
};
function renderLocks() {
  document.querySelectorAll("[data-q]").forEach((card) => {
    const n = Number(card.dataset.q);
    const locked = n > unlocked;
    card.classList.toggle("locked", locked);
    card.querySelectorAll("input,button").forEach((el) => {
      el.disabled = locked;
    });
  });
}
function checkAnswer(n) {
  const card = document.querySelector('[data-q="' + n + '"]');
  const input = card?.querySelector("input");
  const msg = card?.querySelector(".msg");
  if (!card || !input || !msg) return;
  const expected = answers[n - 1];
  const value = input.value.trim();
  const ok = value && (norm(value).includes(norm(expected)) || norm(expected).includes(norm(value)));
  if (ok) {
    msg.textContent = n === answers.length
      ? "最終報告を受理しました。MSM-0817の由来偽装が一本の線でつながりました。"
      : "照合しました。次の資料へ進めます。";
    msg.className = "msg ok";
    if (unlocked < n + 1) {
      unlocked = n + 1;
      localStorage.setItem(storageKey, String(unlocked));
    }
    renderLocks();
  } else {
    msg.textContent = missHints[n] || "一致しません。資料の表記、日付、人物名をもう一度確認してください。";
    msg.className = "msg ng";
  }
}
function resetNote() {
  localStorage.removeItem(storageKey);
  unlocked = 1;
  renderLocks();
}
document.addEventListener("DOMContentLoaded", renderLocks);
