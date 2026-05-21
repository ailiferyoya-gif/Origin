const answers = [
  "水原梓",
  "2000年代の記録",
  "未確認時刻",
  "第三サーバ室",
  "DTC-0914",
  "UPS切替ログ",
  "管理区域",
  "情報政策課",
  "封鎖区画",
  "UPS切替ログ",
  "名取啓介",
  "銀色のテープケース",
  "復旧直後",
  "事故扱い",
  "翌日追記",
  "青凪データセンター",
  "ラックキー",
  "東側搬入口",
  "関連会社",
  "欠番",
  "追記翌日",
  "UPS切替ログ",
  "調査画面",
  "名取啓介が水原梓を第三サーバ室へ誘導し、ラックキーを使って東側搬入口から退路を塞いだ"
];
const finalRequiredParts = [
  "名取啓介",
  "水原梓",
  "第三サーバ室",
  "ラックキー",
  "東側搬入口"
];
const storageKey = "AonagiDataCenterMystery_unlocked";
const norm = (s) => String(s || "").replace(/[\s　]/g, "").replace(/[！-～]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0xFEE0)).replace(/[ー－―]/g, "-").toLowerCase();
let unlocked = Number(localStorage.getItem(storageKey) || "1");
function renderLocks(){document.querySelectorAll("[data-q]").forEach((card)=>{const n=Number(card.dataset.q);const locked=n>unlocked;card.classList.toggle("locked",locked);card.querySelectorAll("input,button").forEach((el)=>{el.disabled=locked;});});}
function isFinalCorrect(value){const v=norm(value);return finalRequiredParts.every((part)=>v.includes(norm(part)));}
function checkAnswer(n){const card=document.querySelector('[data-q="'+n+'"]');const input=card?.querySelector("input");const msg=card?.querySelector(".msg");if(!card||!input||!msg)return;const ok=n===answers.length?isFinalCorrect(input.value):norm(input.value)===norm(answers[n-1]);if(ok){msg.textContent=n===answers.length?"最終報告を受理しました。資料の矛盾が一つの経路としてつながりました。":"照合しました。次の資料を確認できます。";msg.className="msg ok";if(unlocked<n+1){unlocked=n+1;localStorage.setItem(storageKey,String(unlocked));}renderLocks();}else{msg.textContent=n===answers.length?"最終報告には、人物・被害者・場所・鍵・退路をすべて含めてください。":"一致しません。資料名、時刻、場所、人名の表記をもう一度確認してください。";msg.className="msg ng";}}
function resetNote(){localStorage.removeItem(storageKey);unlocked=1;renderLocks();}
document.addEventListener("DOMContentLoaded", renderLocks);
