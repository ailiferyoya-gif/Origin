const answers = [
  "源泉権と再開発火災",
  "ONS-0303",
  "燃焼圧ログ",
  "源泉権書類",
  "旅館火災事故",
  "旧共同浴場",
  "設備点検ミス",
  "再開発資料",
  "地名の変化",
  "三浦千景",
  "源泉権と再開発火災",
  "火災",
  "源泉権",
  "再開発",
  "三浦千景",
  "燃焼圧ログ",
  "三浦千景",
  "温泉街の地名整理",
  "三浦千景",
  "記録",
  "処理",
  "余韻",
  "調査ノート",
  "火災は事故として処理されたが、背景には源泉権を奪うための再開発工作があった"
];
const finalRequiredParts = [
  "火災",
  "源泉権",
  "再開発",
  "三浦千景",
  "燃焼圧ログ"
];
const storageKey = "ShiranuiOnsenMystery_reorg_unlocked";
const norm = (s) => String(s || "").replace(/[s　]/g, "").replace(/[！-～]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0xFEE0)).replace(/[ー－―]/g, "-").toLowerCase();
let unlocked = Number(localStorage.getItem(storageKey) || "1");
function renderLocks(){document.querySelectorAll("[data-q]").forEach((card)=>{const n=Number(card.dataset.q);const locked=n>unlocked;card.classList.toggle("locked",locked);card.querySelectorAll("input,button").forEach((el)=>{el.disabled=locked;});});}
function isFinalCorrect(value){const v=norm(value);return finalRequiredParts.every((part)=>v.includes(norm(part)));}
function checkAnswer(n){const card=document.querySelector('[data-q="'+n+'"]');const input=card?.querySelector("input");const msg=card?.querySelector(".msg");if(!card||!input||!msg)return;const ok=n===answers.length?isFinalCorrect(input.value):norm(input.value)===norm(answers[n-1]);if(ok){msg.textContent=n===answers.length?"最終報告を受理しました。資料の食い違いが一つの真相としてつながりました。":"照合しました。次の資料を確認できます。";msg.className="msg ok";if(unlocked<n+1){unlocked=n+1;localStorage.setItem(storageKey,String(unlocked));}renderLocks();}else{msg.textContent=n===answers.length?"最終報告には、指定された要素をすべて含めてください。":"一致しません。資料名、処理名、人名、記録の表記をもう一度確認してください。";msg.className="msg ng";}}
function resetNote(){localStorage.removeItem(storageKey);unlocked=1;renderLocks();}
document.addEventListener("DOMContentLoaded", renderLocks);
