const answers = [
  "宿泊台帳の身元差し替え",
  "HTL-1102",
  "夜間監査室控え",
  "宿泊台帳",
  "客室トラブル",
  "空室清掃記録",
  "台帳転記ミス",
  "別名宿泊",
  "マスターキー",
  "望月紗季",
  "宿泊台帳の身元差し替え",
  "客の本名",
  "裏切り",
  "宿泊台帳",
  "望月紗季",
  "成瀬亮",
  "望月紗季",
  "閉館整理の混乱",
  "望月紗季",
  "記録",
  "処理",
  "余韻",
  "調査ノート",
  "月白ホテルが隠したのは殺人ではなく、守るべき客の本名と、その裏切りだった"
];
const finalRequiredParts = [
  "客の本名",
  "裏切り",
  "宿泊台帳",
  "望月紗季",
  "成瀬亮"
];
const storageKey = "TsukishiroHotelMystery_reorg_unlocked";
const norm = (s) => String(s || "").replace(/[s　]/g, "").replace(/[！-～]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0xFEE0)).replace(/[ー－―]/g, "-").toLowerCase();
let unlocked = Number(localStorage.getItem(storageKey) || "1");
function renderLocks(){document.querySelectorAll("[data-q]").forEach((card)=>{const n=Number(card.dataset.q);const locked=n>unlocked;card.classList.toggle("locked",locked);card.querySelectorAll("input,button").forEach((el)=>{el.disabled=locked;});});}
function isFinalCorrect(value){const v=norm(value);return finalRequiredParts.every((part)=>v.includes(norm(part)));}
function checkAnswer(n){const card=document.querySelector('[data-q="'+n+'"]');const input=card?.querySelector("input");const msg=card?.querySelector(".msg");if(!card||!input||!msg)return;const ok=n===answers.length?isFinalCorrect(input.value):norm(input.value)===norm(answers[n-1]);if(ok){msg.textContent=n===answers.length?"最終報告を受理しました。資料の食い違いが一つの真相としてつながりました。":"照合しました。次の資料を確認できます。";msg.className="msg ok";if(unlocked<n+1){unlocked=n+1;localStorage.setItem(storageKey,String(unlocked));}renderLocks();}else{msg.textContent=n===answers.length?"最終報告には、指定された要素をすべて含めてください。":"一致しません。資料名、処理名、人名、記録の表記をもう一度確認してください。";msg.className="msg ng";}}
function resetNote(){localStorage.removeItem(storageKey);unlocked=1;renderLocks();}
document.addEventListener("DOMContentLoaded", renderLocks);
