const answers = [
  "瀬戸真琴",
  "2000年代の記録",
  "未確認時刻",
  "旧第二桟橋",
  "FRY-0621",
  "入港申告ログ",
  "管理区域",
  "港湾振興課",
  "封鎖区画",
  "入港申告ログ",
  "倉橋徹",
  "青い封筒",
  "復旧直後",
  "事故扱い",
  "翌日追記",
  "波風フェリー",
  "保守キー",
  "機関室側通路",
  "関連会社",
  "欠番",
  "追記翌日",
  "入港申告ログ",
  "調査画面",
  "倉橋徹が瀬戸真琴を旧第二桟橋へ誘導し、保守キーを使って機関室側通路から退路を塞いだ"
];
const finalRequiredParts = [
  "倉橋徹",
  "瀬戸真琴",
  "旧第二桟橋",
  "保守キー",
  "機関室側通路"
];
const storageKey = "NamikazeFerryMystery_unlocked";
const norm = (s) => String(s || "").replace(/[\s　]/g, "").replace(/[！-～]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0xFEE0)).replace(/[ー－―]/g, "-").toLowerCase();
let unlocked = Number(localStorage.getItem(storageKey) || "1");
function renderLocks(){document.querySelectorAll("[data-q]").forEach((card)=>{const n=Number(card.dataset.q);const locked=n>unlocked;card.classList.toggle("locked",locked);card.querySelectorAll("input,button").forEach((el)=>{el.disabled=locked;});});}
function isFinalCorrect(value){const v=norm(value);return finalRequiredParts.every((part)=>v.includes(norm(part)));}
function checkAnswer(n){const card=document.querySelector('[data-q="'+n+'"]');const input=card?.querySelector("input");const msg=card?.querySelector(".msg");if(!card||!input||!msg)return;const ok=n===answers.length?isFinalCorrect(input.value):norm(input.value)===norm(answers[n-1]);if(ok){msg.textContent=n===answers.length?"最終報告を受理しました。資料の矛盾が一つの経路としてつながりました。":"照合しました。次の資料を確認できます。";msg.className="msg ok";if(unlocked<n+1){unlocked=n+1;localStorage.setItem(storageKey,String(unlocked));}renderLocks();}else{msg.textContent=n===answers.length?"最終報告には、人物・被害者・場所・鍵・退路をすべて含めてください。":"一致しません。資料名、時刻、場所、人名の表記をもう一度確認してください。";msg.className="msg ng";}}
function resetNote(){localStorage.removeItem(storageKey);unlocked=1;renderLocks();}
document.addEventListener("DOMContentLoaded", renderLocks);
