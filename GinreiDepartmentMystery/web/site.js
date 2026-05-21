const answers = [
  "閉店百貨店の架空売場",
  "GIN-1224",
  "存在しない売場写真",
  "閉店後レジ締め",
  "心霊写真",
  "館内放送文字起こし",
  "閉店イベントの演出",
  "地下配送通路",
  "架空催事売場",
  "宮永梓の告発メモ",
  "閉店百貨店の架空売場",
  "架空催事売場",
  "不正会計",
  "売上",
  "宮永梓",
  "帳簿",
  "宮永梓の告発メモ",
  "レジ機器の時刻ズレ",
  "宮永梓",
  "記録",
  "処理",
  "余韻",
  "調査ノート",
  "消された売場は、不正会計のために帳簿上だけ存在した架空催事売場だった"
];
const finalRequiredParts = [
  "架空催事売場",
  "不正会計",
  "売上",
  "宮永梓",
  "帳簿"
];
const storageKey = "GinreiDepartmentMystery_reorg_unlocked";
const norm = (s) => String(s || "").replace(/[s　]/g, "").replace(/[！-～]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0xFEE0)).replace(/[ー－―]/g, "-").toLowerCase();
let unlocked = Number(localStorage.getItem(storageKey) || "1");
function renderLocks(){document.querySelectorAll("[data-q]").forEach((card)=>{const n=Number(card.dataset.q);const locked=n>unlocked;card.classList.toggle("locked",locked);card.querySelectorAll("input,button").forEach((el)=>{el.disabled=locked;});});}
function isFinalCorrect(value){const v=norm(value);return finalRequiredParts.every((part)=>v.includes(norm(part)));}
function checkAnswer(n){const card=document.querySelector('[data-q="'+n+'"]');const input=card?.querySelector("input");const msg=card?.querySelector(".msg");if(!card||!input||!msg)return;const ok=n===answers.length?isFinalCorrect(input.value):norm(input.value)===norm(answers[n-1]);if(ok){msg.textContent=n===answers.length?"最終報告を受理しました。資料の食い違いが一つの真相としてつながりました。":"照合しました。次の資料を確認できます。";msg.className="msg ok";if(unlocked<n+1){unlocked=n+1;localStorage.setItem(storageKey,String(unlocked));}renderLocks();}else{msg.textContent=n===answers.length?"最終報告には、指定された要素をすべて含めてください。":"一致しません。資料名、処理名、人名、記録の表記をもう一度確認してください。";msg.className="msg ng";}}
function resetNote(){localStorage.removeItem(storageKey);unlocked=1;renderLocks();}
document.addEventListener("DOMContentLoaded", renderLocks);
