const QUESTION_COUNT=48;

const answerHashes=[["986647684"],["355437890"],["286413107"],["740773952","331051703","367772060","740773952"],["897076069"],["297220945","297220945","297220945"],["322610769","322610769","322610769"],["286413107"],["270034118"],["650413550"],["140315876"],["270034118"],["796577618"],["502812970"],["235073891"],["885980359"],["140315876"],["3742729","3742729","298057009"],["17407726","17407726","17407726","17407726","17407726"],["470795291"],["650413550"],["168121273"],["367772062"],["5030599","5030599","659040464","460354217"],["725017212"],["426664156"],["467232224"],["894828237"],["796577618"],["975508731"],["301331821"],["722675585"],["3707430"],["168121273"],["912849887"],["168121273"],["16657343","16657343","416306292","126995"],["212660809","212660809","212660809","212660809"],["3707430"],["168121273"],["140315876"],["722675585"],["270034118"],["467232224"],["499250586","499250586","101854596"],["561793636","561793636","401708633","685466522"],["876280907","876280907","876280907"],["478452731"]];

const finalExactHashes=["478452731"];
const fiveExactHashes=["876280907","876280907","876280907"];
const finalGroupHashes=[["467232224","3566502","230155275","498848876"],["270034118","4269364","229531299","787968151"],["796577618","704368655","630207414","379831105"],["3707430","1764745","829104313"],["168121273","4729615","3318952"],["4791573","388540524","2974381","656467791","616150181"],["23539","5172720","3243352","5147314","155791422"]];
const fiveGroupHashes=[["467232224","3566502"],["270034118","4269364"],["796577618","704368655","379831105"],["3707430","1764745"],["168121273","4729615"]];

const missHints=decodeHintMap({"7":"5YmN5ZWP44Gu5Zub5paH5a2X44Gr44CB5pyA5Yid44Gu55Ww5bi45pmC5Yi744KS5pWw5a2X5Zub5qGB44Gn57aa44GR44G+44GZ44CC","38":"5pel5qyh5o6n44GI44Gu5aSc6ZaT54Wn5ZCI6aCG44KS44CB5pmC5Yi744Gu5pep44GE6aCG44Gr5Zub6Kqe44Gn5Lim44G544G+44GZ44CC","19":"6YW457Sg44OQ44Or44OW44Ot44Kw44Gu5qyg55Wq54Wn5ZCI56Wo44Gn44CBQS0xNOOBqEEtMTbjga7plpPjgavjgYLjgovmnqDjgpLopovjgabjgY/jgaDjgZXjgYTjgII=","46":"6YW457Sg44Gd44Gu44KC44Gu44Gn44Gv44Gq44GP44CB56ys5LqM5Yem572u5a6k44GL44KJ5Ye644KL6YGT44GM44Gp44GG5omx44KP44KM44Gf44GL44KS5Zub5a2X44Gn44G+44Go44KB44G+44GZ44CC","48":"54qv5Lq644CB6KKr5a6z6ICF44CB6KqY5bCO5YWI44CB5aSc6ZaT44Kr44O844OJ44CB5aGe44GM44KM44Gf6YCA6Lev44KS5LiA5paH44Gr5ZCr44KB44Gm44GP44Gg44GV44GE44CC","47":"5Lq654mp44CB6KKr5a6z6ICF44CB6KqY5bCO5YWI44CB44Kr44O844OJ44CB6YCA6Lev44Gu5LqU44Gk44KS6aCG44Gr5ZCr44KB44Gm44GP44Gg44GV44GE44CC","6":"5YWs5byPSFDjga7jgYrnn6XjgonjgZvmrITjgavjgYLjgosyMDEwLjEwLjA444Gu5aSc6ZaT5beh5Zue6KGo44KS6KaL44Gm44GP44Gg44GV44GE44CC55Wq5Y+36aCG44Gr6Iux5a2X44Gg44GR44KS5ou+44GE44G+44GZ44CC"});

function decodeHintMap(map){
  const out={};
  Object.keys(map).forEach(key=>{
    const bin=atob(map[key]);
    const bytes=Uint8Array.from(bin,c=>c.charCodeAt(0));
    out[key]=new TextDecoder().decode(bytes);
  });
  return out;
}

const norm=s=>(s||"")
  .replace(/[\s　。．.・「」『』（）()［］\[\]/／\-ー―–—,，、]/g,"")
  .replace(/[Ａ-Ｚａ-ｚ０-９]/g,c=>String.fromCharCode(c.charCodeAt(0)-0xFEE0))
  .toLowerCase();

function hashText(value){
  let h=7;
  for(const ch of norm(value)){
    h=(h*131+ch.charCodeAt(0))%1000000007;
  }
  return String(h);
}

function substringHashSet(value){
  const input=norm(value);
  const set=new Set([hashText(input)]);
  for(let start=0;start<input.length;start++){
    for(let end=start+1;end<=input.length&&end<=start+12;end++){
      set.add(hashText(input.slice(start,end)));
    }
  }
  return set;
}

function matchesGroups(value,groups,exactHashes){
  const exact=hashText(value);
  if(exactHashes.includes(exact)) return true;
  const parts=substringHashSet(value);
  return groups.every(group=>group.some(hash=>parts.has(hash)));
}

function matchesFinalAnswer(value){
  return matchesGroups(value,finalGroupHashes,finalExactHashes);
}

function matchesFiveElements(value){
  return matchesGroups(value,fiveGroupHashes,fiveExactHashes);
}

function matchesAnswer(n,value){
  if(n===48) return matchesFinalAnswer(value);
  if(n===47) return matchesFiveElements(value);
  return (answerHashes[n-1]||[]).includes(hashText(value));
}

let unlocked=Number(localStorage.getItem("mystery_unlocked")||"1");

function renderLocks(){
  document.querySelectorAll("[data-q]").forEach(card=>{
    const n=Number(card.dataset.q);
    card.classList.toggle("locked",n>unlocked);
    card.querySelectorAll("input,button").forEach(x=>x.disabled=n>unlocked);
  });
}

function checkAnswer(n){
  const card=document.querySelector('[data-q="'+n+'"]');
  const input=card.querySelector("input");
  const msg=card.querySelector(".msg");
  if(matchesAnswer(n,input.value)){
    msg.textContent=n===QUESTION_COUNT
      ?"真相が開示されました。"
      :"照合しました。次の記録を確認できます。";
    msg.className="msg ok";
    if(unlocked<n+1){
      unlocked=n+1;
      localStorage.setItem("mystery_unlocked",String(unlocked));
    }
    renderLocks();
  }else{
    msg.textContent=missHints[n]||"一致しません。別サイトの記録と重ねてください。";
    msg.className="msg ng";
  }
}

function resetNote(){
  localStorage.removeItem("mystery_unlocked");
  unlocked=1;
  renderLocks();
}

document.addEventListener("DOMContentLoaded",renderLocks);