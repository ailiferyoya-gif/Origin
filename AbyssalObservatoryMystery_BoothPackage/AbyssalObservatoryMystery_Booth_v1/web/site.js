
const answers = ["三枝透","2014年11月18日","02:16","第三観測室","OBS-1118","深度ログ第七冊","B棟冷却室","潮流観測所","北東1.8ノット","音響記録D","榊原怜","銀色の耐圧ケース","03:04","休職扱い","2014/11/19","黒潮海底観測所","保守用カード","東ケーブルシャフト","海洋計測株式会社","欠測","2014/11/20","予備電源ログ","管理画面","榊原怜が三枝透を第三観測室に閉じ込め、保守用カードを使って東ケーブルシャフト側から退路を塞いだ"];
const norm = (s) => (s || "").replace(/[\s　]/g, "").replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xFEE0)).toLowerCase();
let unlocked = Number(localStorage.getItem("mystery_unlocked") || "1");
function renderLocks(){
  document.querySelectorAll("[data-q]").forEach(card => {
    const n = Number(card.dataset.q);
    card.classList.toggle("locked", n > unlocked);
    const input = card.querySelector("input");
    const button = card.querySelector("button");
    if (input) input.disabled = n > unlocked;
    if (button) button.disabled = n > unlocked;
  });
}
function checkAnswer(n){
  const card = document.querySelector('[data-q="'+n+'"]');
  const input = card.querySelector("input");
  const msg = card.querySelector(".msg");
  if(norm(input.value) === norm(answers[n-1])){
    msg.textContent = n === answers.length ? "真相が開示されました。" : "照合しました。次の記録を確認できます。";
    msg.className = "msg ok";
    if(unlocked < n + 1){ unlocked = n + 1; localStorage.setItem("mystery_unlocked", String(unlocked)); }
    renderLocks();
  } else {
    msg.textContent = "一致しません。別のサイトの記録と照合してください。";
    msg.className = "msg ng";
  }
}
function resetNote(){
  localStorage.removeItem("mystery_unlocked");
  unlocked = 1;
  renderLocks();
}
document.addEventListener("DOMContentLoaded", renderLocks);
