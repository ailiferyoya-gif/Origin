const answers = [
  "MSM-0817",
  "白楼資料館",
  "由来調査中",
  "1996/08/19",
  "角",
  "B列",
  "B-17",
  "台帳と展示ラベル",
  "持ち出し戻り品",
  "木箱",
  "奥村志乃",
  "承認欄",
  "展示ラベル",
  "第2展示室",
  "21:17",
  "21:23",
  "由来",
  "持ち出し戻り品",
  "奥村志乃",
  "MSM-0817は由来を偽装された持ち出し戻り品"
];
const storageKey = "HakurouMuseumMystery_sales_unlocked";
const norm = (s) => String(s || "").replace(/[\s　。、・「」『』（）()]/g, "").toLowerCase();
let unlocked = Number(localStorage.getItem(storageKey) || "1");
function renderLocks(){document.querySelectorAll("[data-q]").forEach((card)=>{const n=Number(card.dataset.q);const locked=n>unlocked;card.classList.toggle("locked",locked);card.querySelectorAll("input,button").forEach((el)=>{el.disabled=locked;});});}
function checkAnswer(n){const card=document.querySelector('[data-q="'+n+'"]');const input=card?.querySelector("input");const msg=card?.querySelector(".msg");if(!card||!input||!msg)return;const ok=norm(input.value).includes(norm(answers[n-1]))||norm(answers[n-1]).includes(norm(input.value));if(ok&&input.value.trim()){msg.textContent=n===answers.length?"最終報告を受理しました。MSM-0817の由来偽装が一本の線でつながりました。":"照合しました。次の資料へ進めます。";msg.className="msg ok";if(unlocked<n+1){unlocked=n+1;localStorage.setItem(storageKey,String(unlocked));}renderLocks();}else{msg.textContent="一致しません。資料の表記、日付、人物名をもう一度確認してください。";msg.className="msg ng";}}
function resetNote(){localStorage.removeItem(storageKey);unlocked=1;renderLocks();}
document.addEventListener("DOMContentLoaded", renderLocks);
