const answers = [
  "科学データ隠蔽",
  "OBS-1118",
  "欠測パッケージ",
  "音響データ",
  "研究員の単独失踪",
  "海底地殻変動",
  "機器故障",
  "外部送信ログ",
  "旧サーバ",
  "第三観測室",
  "科学データ隠蔽",
  "欠測",
  "海底変動",
  "隠す",
  "人為的",
  "三枝透",
  "第三観測室",
  "深海生物の異音",
  "人為的",
  "記録",
  "処理",
  "余韻",
  "調査ノート",
  "欠測は機器故障ではなく、予測可能だった海底変動を隠すための人為的処理だった"
];
const finalRequiredParts = [
  "欠測",
  "海底変動",
  "隠す",
  "人為的",
  "三枝透"
];
const storageKey = "AbyssalObservatoryMystery_reorg_unlocked";
const norm = (s) => String(s || "").replace(/[s　]/g, "").replace(/[！-～]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0xFEE0)).replace(/[ー－―]/g, "-").toLowerCase();
let unlocked = Number(localStorage.getItem(storageKey) || "1");
function renderLocks(){document.querySelectorAll("[data-q]").forEach((card)=>{const n=Number(card.dataset.q);const locked=n>unlocked;card.classList.toggle("locked",locked);card.querySelectorAll("input,button").forEach((el)=>{el.disabled=locked;});});}
function isFinalCorrect(value){const v=norm(value);return finalRequiredParts.every((part)=>v.includes(norm(part)));}
function checkAnswer(n){const card=document.querySelector('[data-q="'+n+'"]');const input=card?.querySelector("input");const msg=card?.querySelector(".msg");if(!card||!input||!msg)return;const ok=n===answers.length?isFinalCorrect(input.value):norm(input.value)===norm(answers[n-1]);if(ok){msg.textContent=n===answers.length?"最終報告を受理しました。資料の食い違いが一つの真相としてつながりました。":"照合しました。次の資料を確認できます。";msg.className="msg ok";if(unlocked<n+1){unlocked=n+1;localStorage.setItem(storageKey,String(unlocked));}renderLocks();}else{msg.textContent=n===answers.length?"最終報告には、指定された要素をすべて含めてください。":"一致しません。資料名、処理名、人名、記録の表記をもう一度確認してください。";msg.className="msg ng";}}
function resetNote(){localStorage.removeItem(storageKey);unlocked=1;renderLocks();}
document.addEventListener("DOMContentLoaded", renderLocks);
