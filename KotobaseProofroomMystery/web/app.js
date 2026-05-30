const data=[
{t:"一面リード",before:"昨夜、潮見倉庫で保管資料の整理が行われ、<del>市長</del>は安全確認済みと説明した。",after:"昨夜、潮見倉庫で保管資料の整理が行われ、安全確認済みと説明した。",word:"市長"},
{t:"二段目",before:"倉庫の鍵は規定どおり返却されたが、<del>午前二時</del>の入退室だけ記録が欠けている。",after:"倉庫の鍵は規定どおり返却されたが、入退室だけ記録が欠けている。",word:"午前二時"},
{t:"写真説明",before:"北側扉の前には<del>焼却箱</del>が置かれ、撤去後の写真だけが公開された。",after:"北側扉の前には撤去後の写真だけが公開された。",word:"焼却箱"},
{t:"社会面追記",before:"関係者は、資料を運んだ車両が<del>旧港</del>へ向かったと証言している。",after:"関係者は、資料を運んだ車両が向かったと証言している。",word:"旧港"}];
const picked=[];let started=Date.now();const pairs=document.querySelector("#pairs"),pickedEl=document.querySelector("#picked"),res=document.querySelector("#result");
function render(){pairs.innerHTML="";data.forEach((d,i)=>{const a=document.createElement("article");a.className="pair";a.innerHTML=`<h3>${d.t}</h3><div class="cols"><div class="paper"><strong>校了前</strong><br>${d.before}</div><div class="paper"><strong>公開版</strong><br>${d.after}</div></div><div class="choices">${shuffle([d.word,"港湾課","十七時","南門"]).map(w=>`<button data-i="${i}" data-w="${w}" class="${picked[i]===w?"done":""}">${w}</button>`).join("")}</div>`;pairs.appendChild(a)});pickedEl.textContent=picked.filter(Boolean).join(" / ")||"未選択"}function shuffle(a){return [...a].sort(()=>Math.random()-.5)}
pairs.addEventListener("click",e=>{if(!e.target.dataset.w)return;picked[+e.target.dataset.i]=e.target.dataset.w;render()});
document.querySelector("#hint").onclick=()=>res.textContent="公開版から完全に消えた語だけを、上から順に拾います。";
document.querySelector("#reset").onclick=()=>{picked.length=0;res.textContent="";render()};
document.querySelector("#form").onsubmit=e=>{e.preventDefault();const s=document.querySelector("#final").value.replace(/\s/g,"");const ok=["市長","午前二時","焼却箱","旧港"].every(w=>s.includes(w));res.textContent=ok?"復元完了: 市長は午前二時、焼却箱を旧港へ運ばせた。":"まだ復元語が足りません。"};
setInterval(()=>{const r=Math.max(0,2700-Math.floor((Date.now()-started)/1000));document.querySelector("#timer").textContent=`${String(Math.floor(r/60)).padStart(2,"0")}:${String(r%60).padStart(2,"0")}`},1000);render();
