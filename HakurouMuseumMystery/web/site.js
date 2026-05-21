const answers = [
  "奥村志乃",
  "2000年代の記録",
  "未確認時刻",
  "収蔵庫三号室",
  "MSM-0817",
  "燻蒸濃度ログ",
  "管理区域",
  "文化財課",
  "封鎖区画",
  "燻蒸濃度ログ",
  "丹羽宗介",
  "藍色の目録札",
  "復旧直後",
  "事故扱い",
  "翌日追記",
  "白楼民俗資料館",
  "収蔵庫鍵",
  "搬出用裏扉",
  "関連会社",
  "欠番",
  "追記翌日",
  "燻蒸濃度ログ",
  "調査画面",
  "丹羽宗介が奥村志乃を収蔵庫三号室へ誘導し、収蔵庫鍵を使って搬出用裏扉から退路を塞いだ"
];
const finalRequiredParts = [
  "丹羽宗介",
  "奥村志乃",
  "収蔵庫三号室",
  "収蔵庫鍵",
  "搬出用裏扉"
];
const storageKey = "HakurouMuseumMystery_unlocked";
const norm = (s) => String(s || "").replace(/[\s　]/g, "").replace(/[！-～]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0xFEE0)).replace(/[ー－―]/g, "-").toLowerCase();
let unlocked = Number(localStorage.getItem(storageKey) || "1");
function renderLocks(){document.querySelectorAll("[data-q]").forEach((card)=>{const n=Number(card.dataset.q);const locked=n>unlocked;card.classList.toggle("locked",locked);card.querySelectorAll("input,button").forEach((el)=>{el.disabled=locked;});});}
function isFinalCorrect(value){const v=norm(value);return finalRequiredParts.every((part)=>v.includes(norm(part)));}
function checkAnswer(n){const card=document.querySelector('[data-q="'+n+'"]');const input=card?.querySelector("input");const msg=card?.querySelector(".msg");if(!card||!input||!msg)return;const ok=n===answers.length?isFinalCorrect(input.value):norm(input.value)===norm(answers[n-1]);if(ok){msg.textContent=n===answers.length?"最終報告を受理しました。資料の矛盾が一つの経路としてつながりました。":"照合しました。次の資料を確認できます。";msg.className="msg ok";if(unlocked<n+1){unlocked=n+1;localStorage.setItem(storageKey,String(unlocked));}renderLocks();}else{msg.textContent=n===answers.length?"最終報告には、人物・被害者・場所・鍵・退路をすべて含めてください。":"一致しません。資料名、時刻、場所、人名の表記をもう一度確認してください。";msg.className="msg ng";}}
function resetNote(){localStorage.removeItem(storageKey);unlocked=1;renderLocks();}
document.addEventListener("DOMContentLoaded", renderLocks);
