
const answers = ["宮永梓","1998年12月24日","21:32","地下配送通路","GIN-1224","売上台帳第12冊","南荷捌き室","防災センター","非常放送3系統","監視記録B","真壁亮","赤い鍵束","22:08","退職処理","1998/12/25","銀嶺百貨店","搬入口予備鍵","旧エレベーター5号機","東都設備","欠番","1998/12/26","レジ締めログ","管理画面","真壁亮が宮永梓を地下配送通路に閉じ込め、搬入口予備鍵で旧エレベーター5号機側の扉を塞いだ"];
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
