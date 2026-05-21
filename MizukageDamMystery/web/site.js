const answers = [
  "警報時刻の偽装",
  "DAM-0728",
  "警報試験ログ",
  "手書き訂正",
  "想定外豪雨",
  "防災無線ログ",
  "警報設備の故障",
  "放流判断",
  "住民メモ",
  "時刻ずらし",
  "警報時刻の偽装",
  "警報試験ログ",
  "遅れ",
  "警報",
  "時刻偽装",
  "管理側",
  "時刻ずらし",
  "住民側の記憶違い",
  "時刻偽装",
  "記録",
  "処理",
  "余韻",
  "調査ノート",
  "訂正された警報試験ログは、遅れた警報発令を隠すための時刻偽装だった"
];
const finalRequiredParts = [
  "警報試験ログ",
  "遅れ",
  "警報",
  "時刻偽装",
  "管理側"
];
const storageKey = "MizukageDamMystery_reorg_unlocked";
const norm = (s) => String(s || "").replace(/[s　]/g, "").replace(/[！-～]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0xFEE0)).replace(/[ー－―]/g, "-").toLowerCase();
let unlocked = Number(localStorage.getItem(storageKey) || "1");
function renderLocks(){document.querySelectorAll("[data-q]").forEach((card)=>{const n=Number(card.dataset.q);const locked=n>unlocked;card.classList.toggle("locked",locked);card.querySelectorAll("input,button").forEach((el)=>{el.disabled=locked;});});}
function isFinalCorrect(value){const v=norm(value);return finalRequiredParts.every((part)=>v.includes(norm(part)));}
function checkAnswer(n){const card=document.querySelector('[data-q="'+n+'"]');const input=card?.querySelector("input");const msg=card?.querySelector(".msg");if(!card||!input||!msg)return;const ok=n===answers.length?isFinalCorrect(input.value):norm(input.value)===norm(answers[n-1]);if(ok){msg.textContent=n===answers.length?"最終報告を受理しました。資料の食い違いが一つの真相としてつながりました。":"照合しました。次の資料を確認できます。";msg.className="msg ok";if(unlocked<n+1){unlocked=n+1;localStorage.setItem(storageKey,String(unlocked));}renderLocks();}else{msg.textContent=n===answers.length?"最終報告には、指定された要素をすべて含めてください。":"一致しません。資料名、処理名、人名、記録の表記をもう一度確認してください。";msg.className="msg ng";}}
function resetNote(){localStorage.removeItem(storageKey);unlocked=1;renderLocks();}
document.addEventListener("DOMContentLoaded", renderLocks);
