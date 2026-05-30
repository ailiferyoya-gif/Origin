const items=[["霜柱石","鉱物","シモ"],["藍脈石","鉱物","アイ"],["月白鉱","鉱物","ツキ"],["押し花ノート","植物","ハナ"],["冬芽枝","植物","メ"],["海草片","植物","ウミ"],["真鍮秤","器具","ハカリ"],["古いピンセット","器具","ピン"],["封蝋印","器具","イン"]];
const cats=["鉱物","植物","器具"];let selected=null,placed={},started=Date.now();const cards=document.querySelector("#cards"),bins=document.querySelector("#bins"),code=document.querySelector("#code");
function render(){cards.innerHTML=items.filter(i=>!placed[i[0]]).map(i=>`<div class="card ${selected===i[0]?"active":""}" data-name="${i[0]}">${i[0]}</div>`).join("");bins.innerHTML=cats.map(c=>`<div class="bin" data-cat="${c}"><h3>${c}</h3>${items.filter(i=>placed[i[0]]===c).map(i=>`<div class="card" data-name="${i[0]}">${i[0]}</div>`).join("")}</div>`).join("")}
cards.onclick=e=>{const card=e.target.closest(".card");if(!card)return;selected=card.dataset.name;render()};
bins.onclick=e=>{const bin=e.target.closest(".bin");if(!bin)return;if(selected){placed[selected]=bin.dataset.cat;selected=null;render()}};
document.querySelector("#check").onclick=()=>{const ok=items.every(i=>placed[i[0]]===i[1]);code.textContent=ok?"三語鍵: シモアイツキ / ハナメウミ / ハカリピンイン。封印箱は『月下の海』を示す。":"分類が違います。名前から材質や用途を見直してください。"};
document.querySelector("#hint").onclick=()=>code.textContent="鉱物は石、植物は生き物の部位、器具は人が使う道具です。";
document.querySelector("#reset").onclick=()=>{placed={};selected=null;code.textContent="未解読";render()};
setInterval(()=>{const r=Math.max(0,2100-Math.floor((Date.now()-started)/1000));document.querySelector("#timer").textContent=`${String(Math.floor(r/60)).padStart(2,"0")}:${String(r%60).padStart(2,"0")}`},1000);render();
