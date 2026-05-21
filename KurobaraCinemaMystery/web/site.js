const answers = [
  "封印された記録映像",
  "CNM-1231",
  "存在しない短編",
  "半券番号",
  "失われた名作映画",
  "映写ログ",
  "閉館イベントの隠し上映",
  "レビュー本文",
  "告発映像",
  "相馬玲奈",
  "封印された記録映像",
  "短編",
  "封印映像",
  "不正",
  "映写技師",
  "相馬玲奈",
  "相馬玲奈",
  "半券印刷ミス",
  "映写技師",
  "記録",
  "処理",
  "余韻",
  "調査ノート",
  "存在しない短編は、劇場オーナーの不正を記録した封印映像だった"
];
const finalRequiredParts = [
  "短編",
  "封印映像",
  "不正",
  "映写技師",
  "相馬玲奈"
];
const storageKey = "KurobaraCinemaMystery_reorg_unlocked";
const norm = (s) => String(s || "").replace(/[s　]/g, "").replace(/[！-～]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0xFEE0)).replace(/[ー－―]/g, "-").toLowerCase();
let unlocked = Number(localStorage.getItem(storageKey) || "1");
function renderLocks(){document.querySelectorAll("[data-q]").forEach((card)=>{const n=Number(card.dataset.q);const locked=n>unlocked;card.classList.toggle("locked",locked);card.querySelectorAll("input,button").forEach((el)=>{el.disabled=locked;});});}
function isFinalCorrect(value){const v=norm(value);return finalRequiredParts.every((part)=>v.includes(norm(part)));}
function checkAnswer(n){const card=document.querySelector('[data-q="'+n+'"]');const input=card?.querySelector("input");const msg=card?.querySelector(".msg");if(!card||!input||!msg)return;const ok=n===answers.length?isFinalCorrect(input.value):norm(input.value)===norm(answers[n-1]);if(ok){msg.textContent=n===answers.length?"最終報告を受理しました。資料の食い違いが一つの真相としてつながりました。":"照合しました。次の資料を確認できます。";msg.className="msg ok";if(unlocked<n+1){unlocked=n+1;localStorage.setItem(storageKey,String(unlocked));}renderLocks();}else{msg.textContent=n===answers.length?"最終報告には、指定された要素をすべて含めてください。":"一致しません。資料名、処理名、人名、記録の表記をもう一度確認してください。";msg.className="msg ng";}}
function resetNote(){localStorage.removeItem(storageKey);unlocked=1;renderLocks();}
document.addEventListener("DOMContentLoaded", renderLocks);
