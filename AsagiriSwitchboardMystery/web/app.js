const calls=[["A","海鳴りが強い。灯台の予備線へ回して。","灯台"],["B","薬品庫の鍵、展示室じゃなくて標本室に戻して。","標本室"],["C","印刷所へ送るな。校正室に差し戻し。","校正室"],["D","汽笛が三回、旧港の倉庫前に集合。","旧港"]];
const targets=["灯台","標本室","校正室","旧港"];let selected=null,wires={},started=Date.now();const callsEl=document.querySelector("#calls"),targetsEl=document.querySelector("#targets"),log=document.querySelector("#log");
function render(){callsEl.innerHTML=calls.map(c=>`<div class="call ${selected===c[0]?"active":""}" data-id="${c[0]}"><strong>${c[0]}回線</strong><br>${c[1]}<br><small>接続: ${wires[c[0]]||"未接続"}</small></div>`).join("");targetsEl.innerHTML=targets.map((t,i)=>`<div class="target" data-t="${t}"><span class="jack">${String(i+1).padStart(2,"0")}</span><span>${t}</span></div>`).join("")}
callsEl.onclick=e=>{const c=e.target.closest(".call");if(!c)return;selected=c.dataset.id;render()};
targetsEl.onclick=e=>{const t=e.target.closest(".target");if(!t||!selected)return;wires[selected]=t.dataset.t;log.textContent=`${selected}回線を ${t.dataset.t} へ接続。`;selected=null;render()};
document.querySelector("#check").onclick=()=>{const ok=calls.every(c=>wires[c[0]]===c[2]);log.textContent=ok?"全回線復旧。最後の内線は 04-26、記録名は『朝霧』。":"どこかの会話と宛先が合っていません。"};
document.querySelector("#hint").onclick=()=>log.textContent="会話に出る場所名をそのまま宛先にします。比喩ではなく、業務連絡の行き先です。";
document.querySelector("#reset").onclick=()=>{wires={};selected=null;log.textContent="札を選び、宛先を押してください。";render()};
setInterval(()=>{const r=Math.max(0,2400-Math.floor((Date.now()-started)/1000));document.querySelector("#timer").textContent=`${String(Math.floor(r/60)).padStart(2,"0")}:${String(r%60).padStart(2,"0")}`},1000);render();
