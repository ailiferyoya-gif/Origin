const answers = [
  "山岳救助の記録改変",
  "CBL-0209",
  "制動ログ",
  "風速計",
  "強風運休",
  "救助要請",
  "制動装置の故障",
  "未対応時間",
  "運休処理",
  "雨宮圭の資料",
  "山岳救助の記録改変",
  "強風運休",
  "救助要請",
  "未対応",
  "記録操作",
  "観光課",
  "雨宮圭の資料",
  "遭難者の通報ミス",
  "記録操作",
  "記録",
  "処理",
  "余韻",
  "調査ノート",
  "強風運休は、救助要請を見落とした未対応時間を隠すための記録操作だった"
];
const finalRequiredParts = [
  "強風運休",
  "救助要請",
  "未対応",
  "記録操作",
  "観光課"
];
const storageKey = "KarasunoCableMystery_reorg_unlocked";
const norm = (s) => String(s || "").replace(/[s　]/g, "").replace(/[！-～]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0xFEE0)).replace(/[ー－―]/g, "-").toLowerCase();
let unlocked = Number(localStorage.getItem(storageKey) || "1");
function renderLocks(){document.querySelectorAll("[data-q]").forEach((card)=>{const n=Number(card.dataset.q);const locked=n>unlocked;card.classList.toggle("locked",locked);card.querySelectorAll("input,button").forEach((el)=>{el.disabled=locked;});});}
function isFinalCorrect(value){const v=norm(value);return finalRequiredParts.every((part)=>v.includes(norm(part)));}
function checkAnswer(n){const card=document.querySelector('[data-q="'+n+'"]');const input=card?.querySelector("input");const msg=card?.querySelector(".msg");if(!card||!input||!msg)return;const ok=n===answers.length?isFinalCorrect(input.value):norm(input.value)===norm(answers[n-1]);if(ok){msg.textContent=n===answers.length?"最終報告を受理しました。資料の食い違いが一つの真相としてつながりました。":"照合しました。次の資料を確認できます。";msg.className="msg ok";if(unlocked<n+1){unlocked=n+1;localStorage.setItem(storageKey,String(unlocked));}renderLocks();}else{msg.textContent=n===answers.length?"最終報告には、指定された要素をすべて含めてください。":"一致しません。資料名、処理名、人名、記録の表記をもう一度確認してください。";msg.className="msg ng";}}
function resetNote(){localStorage.removeItem(storageKey);unlocked=1;renderLocks();}
document.addEventListener("DOMContentLoaded", renderLocks);
