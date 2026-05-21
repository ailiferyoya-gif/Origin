const answers = [
  "非公式寄港と消えた乗客",
  "FRY-0621",
  "旧第二桟橋",
  "写真時刻",
  "フェリー遅延",
  "入港申告",
  "写真の撮影時刻ミス",
  "非公式寄港",
  "青い封筒",
  "乗客名簿",
  "非公式寄港と消えた乗客",
  "旧第二桟橋",
  "非公式寄港",
  "航路記録",
  "青い封筒",
  "瀬戸真琴",
  "乗客名簿",
  "港湾イベントの臨時便",
  "青い封筒",
  "記録",
  "処理",
  "余韻",
  "調査ノート",
  "旧第二桟橋は、航路記録から消された非公式寄港地だった"
];
const finalRequiredParts = [
  "旧第二桟橋",
  "非公式寄港",
  "航路記録",
  "青い封筒",
  "瀬戸真琴"
];
const storageKey = "NamikazeFerryMystery_reorg_unlocked";
const norm = (s) => String(s || "").replace(/[s　]/g, "").replace(/[！-～]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0xFEE0)).replace(/[ー－―]/g, "-").toLowerCase();
let unlocked = Number(localStorage.getItem(storageKey) || "1");
function renderLocks(){document.querySelectorAll("[data-q]").forEach((card)=>{const n=Number(card.dataset.q);const locked=n>unlocked;card.classList.toggle("locked",locked);card.querySelectorAll("input,button").forEach((el)=>{el.disabled=locked;});});}
function isFinalCorrect(value){const v=norm(value);return finalRequiredParts.every((part)=>v.includes(norm(part)));}
function checkAnswer(n){const card=document.querySelector('[data-q="'+n+'"]');const input=card?.querySelector("input");const msg=card?.querySelector(".msg");if(!card||!input||!msg)return;const ok=n===answers.length?isFinalCorrect(input.value):norm(input.value)===norm(answers[n-1]);if(ok){msg.textContent=n===answers.length?"最終報告を受理しました。資料の食い違いが一つの真相としてつながりました。":"照合しました。次の資料を確認できます。";msg.className="msg ok";if(unlocked<n+1){unlocked=n+1;localStorage.setItem(storageKey,String(unlocked));}renderLocks();}else{msg.textContent=n===answers.length?"最終報告には、指定された要素をすべて含めてください。":"一致しません。資料名、処理名、人名、記録の表記をもう一度確認してください。";msg.className="msg ng";}}
function resetNote(){localStorage.removeItem(storageKey);unlocked=1;renderLocks();}
document.addEventListener("DOMContentLoaded", renderLocks);
