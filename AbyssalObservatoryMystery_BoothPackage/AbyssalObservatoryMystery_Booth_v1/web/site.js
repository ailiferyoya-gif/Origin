const QUESTION_COUNT=48;
const storageKey="AbyssalObservatoryMystery_deep_unlocked";
const answerHashes=[["829666013","829666013"],["444406745","444406745","444406745"],["801482929","545789031","545789031","395430971"],["362073588","2763639"],["132796536","2804585"],["304068052","304068052"],["305828138","170272324","174905794"],["774560671","774560671","774560671"],["446632331","3885002"],["291096445","828872089","335089674","473869397"],["598803794","401410011"],["746643824","951182873"],["895852860","1017","688379817"],["321507048","147438718","948623531"],["1017","1017"],["974105388","559494364","224687223","971496392"],["3740875","199931675"],["545789032","801483060","545789032"],["482221456","3680892"],["300873636","1764745"],["892580284","174751740"],["633729482","745295471","377549740"],["894827975","174768501"],["817650266","808758941","274436208"],["305828264","170272450","174905920"],["999164472","5172720"],["308076096","170289352","177153752"],["241447087","616295080"],["987579532","773095269"],["404239231","543459620"],["687602506","949211258"],["4764539","3146790"],["545789154","801499042","545789154"],["820374118","2915633"],["208863842","4790266"],["8570379","267240788"],["338784033","2933109","338516091"],["549701226","506934360"],["297051680","4989750"],["826213080","439189937"],["579960294","579960294"],["102972809","102972809"],["662301078","940739467"],["854024581","4097410","818879952"],["806642567","365410169"],["561793636","401708633","685466522"],["786772172","48804526"],["10411408","843001480"]];
const group47Hashes=[["482221456","3680892"],["362073588","2763639"],["746643824","951182873"],["337887631","5171734","334687956"]];
const group48Hashes=[["482221456","3680892"],["362073588","2763639"],["746643824","951182873"],["300873636","1764745"],["817650266","808758941"],["4985646","650068641"],["23539","3243352","5172720"]];
const hintPayload={"11":"5r2u5rWB6Kaz5ris5omA44Gu5LiL5bGk44CM5Zyn5Yqb44CN44Gr44GC44KK44G+44GZ44CC","41":"56ys5LiJ6Kaz5ris5a6k44CB5p2x5YG044Gu6ZaJ6Y6W44CBMDM6MDTlvqnluLDjgpLkuIDliJfjgavjgZfjgb7jgZnjgII=","45":"5qmf5qKw5pWF6Zqc44Gn44Gv44Gq44GP44CB5Lq644Gu5Yem55CG44Gn44GZ44CC","42":"5qaK5Y6f44CB5LiJ5p6d44CB56ys5LiJ6Kaz5ris5a6k44CB44Kr44O844OJ44CB5p2x5YG06ZaJ6Y6W44Gn44GZ44CC","3":"5paw6IGe44Gu5q275Lqh6KiY5LqL44CB5biC44Gu5YWs6ZaL5paH5pu444CB5Yuk5YuZ6KGo44Gu5pel5LuY44KS6YeN44Gt44G+44GZ44CC","20":"5p2x5YG044Gu6ZaJ6Y6W5bGl5q2044Gr44KC6Zai44KP44KL44Kr44O844OJ44Gn44GZ44CC","12":"6Z+z44Gu6Kit572u54K544Go44CB5YaF5YG05b+c562U44Gq44GX44Gu5aC05omA44GM5LiA6Ie044GX44G+44GZ44CC","10":"MDI6MTbjgaDjgZHmgKXjgavlgKTjgYzlpKfjgY3jgY/jgarjgorjgb7jgZnjgII=","17":"MDI6MzDjgIEwMjo0NeOAgTAzOjAw44Gr5Lim44G25Yem55CG5ZCN44Gn44GZ44CC","44":"U09MVVRJT07jgavjgoLmrovjgovjgIHmgJbjgZXjga7jgZ/jgoHjga7oqqzmmI7jgafjgZnjgII=","40":"MDM6MDTjga7oqJjpjLLlkI3jgZ3jga7jgb7jgb7jgafjgZnjgII=","13":"QeOBp+OBr+OBquOBj+OAgTAyOjE244Gu5L+d5a2Y55Wq5Y+344Gn44GZ44CC","27":"5pyA5b6M44Gr6Z+z44GM5oi744KL5pmC5Yi744Gn44GZ44CC","30":"5L+d5a6I5Lya56S+44OI44OD44OX44Gu5ZCN56ew44Gn44GZ44CC","18":"5LqL5pWF57+M5pel44Gu5pel5LuY44Gn44GZ44CC","36":"5LyR6IG35omx44GE44Go44Gu55+b55u+44GM5Ye644KL5qyE44Gn44GZ44CC","29":"6ZaJ44GY6L6844KB44KJ44KM44Gf5Y+v6IO95oCn44KS56S644GZ55+t44GE6KiY6Yyy44Gn44GZ44CC","23":"5L+d5a6I55So44Kr44O844OJ6LK45LiO44Gu44GC44Go44CB5p2x5YG06ZaJ6Y6W44Gu5YmN44Gn44GZ44CC","19":"5L+d5a6I55So44Kr44O844OJ44Gu6LK45LiO6ICF44Gn44KC44GC44KK44G+44GZ44CC","1":"5YWl5Y+j44Gu5aSn6KaL5Ye644GX44Go5YWs5byP6LOH5paZ44Gu5pa96Kit5ZCN44KS5ZCM44GY6KGo6KiY44Gn5o6n44GI44G+44GZ44CC","47":"5omL5q6144Go6YCA6Lev44G+44Gn44Gv5qyh44Gu5pyA57WC5aCx5ZGK44Gn6Laz44GX44G+44GZ44CC","5":"5q275Lqh6KiY5LqL44Gu57+M5pel5Lul6ZmN44CB6KGo54++44Gg44GR44GM5aSJ44KP44Gj44Gm44GE44G+44GZ44CC","4":"44OL44Ol44O844K56KiY5LqL44Gu5rCP5ZCN44Go5Yuk5YuZ6KGo44GuMjA6MDDmrITjgpLnhaflkIjjgZfjgb7jgZnjgII=","8":"5YmNMuWVj+OCkuOCueODmuODvOOCueOBquOBl+OBp+e2muOBkeOBvuOBmeOAgg==","26":"6Ieq5YuV44Gn44Gv44Gq44GP44CB5Lq644Gu5pON5L2c44KS56S644GZ6Kqe44Gn44GZ44CC","39":"6ZW344GE5YGc5q2i44Gn44Gv44Gq44GP55+t44GE5YiH5pat44Gn44GZ44CC","14":"5bGV56S65YCZ6KOc44GL44KJ5aSW44GV44KM44CB5bqV6Z2i44GrROOBruODqeODmeODq+OBjOOBguOCiuOBvuOBmeOAgg==","37":"5pa56KeS44Go6Kaz5ris5YCk44Gu56iu6aGe44KS5ZCI44KP44Gb44Gf6Kqe44Gn44GZ44CC","22":"6aCF55uu5aSW44Gu5L2c5qWt6LK744Gr44KC5Ye644KL6YOo5bGL44Gn44GZ44CC","28":"5Yi26ZmQ6KiY6Yyy44Gu5YWI6aCt6aCF55uu44Gn44GZ44CC","25":"MDI6MTbjga7nn63jgYTlvozjgafjgZnjgII=","9":"TWluYXRvU2VhcmNo44Gn44CM5r2u5rWB44CN44KS5qSc57Si44GX44G+44GZ44CC","33":"5q275Lqh6KiY5LqL44Gu57+M44CF5pel44CB6KGo54++6KiC5q2j44GM6Kmx6aGM44Gr44Gq44Gj44Gm44GE44G+44GZ44CC","15":"44CM6Z+z6Z+/6KiY6YyyROOAjeOBruacq+WwvuOBqOWQjOOBmOOBp+OBmeOAgg==","34":"5YWs6ZaL44Gn44Gv44Gq44GE54q25oWL44Gn44GZ44CC","21":"6ZaJ6Y6W5pmC5Yi744KI44KKMzDliIbku6XkuIrliY3jgafjgZnjgII=","24":"56ys5LiJ6Kaz5ris5a6k44Gr6Zqj5o6l44GZ44KL5p2x5YG044Gu5Zyw54K544Gn44GZ44CC","46":"5q275Lqh5Y6f5Zug44Gd44Gu44KC44Gu44KI44KK44CB6YCD44GS6YGT44Gu5omx44GE44KS6KaL44G+44GZ44CC","16":"56ys5YWt5YaK44Gv5YWs6ZaL44CB56ys5LiD5YaK44Gg44GR5Yi26ZmQ44Gn44GZ44CC","35":"5LqL5pWF5Yem55CG44KS5YWs6KGo44GX44Gf44GP44Gq44GE55CG55Sx44Gu5LiA44Gk44Gn44GZ44CC","32":"5L+d5a6I5Lya56S+44Gu5aSc6ZaT6KiY6Yyy44Go44KC5ZCM44GY6Kqe44Gn44GZ44CC","7":"5rWB6YCf44GM6Lez44Gt44CB6Z+z6Z+/6KiY6YyyROOBjOaui+OBo+OBn+aZguWIu+OBp+OBmeOAgg==","43":"5pys5b2T44Gu5Y6f5Zug44Gn44Gv44Gq44GE44CB6Kit5YKZ5YG044Gu6Kqs5piO44Gn44GZ44CC","48":"5qaK5Y6f5oCc44CB5LiJ5p6d6YCP44CB56ys5LiJ6Kaz5ris5a6k44CB5L+d5a6I55So44Kr44O844OJ44CB5p2x44Kx44O844OW44Or44K344Oj44OV44OI44CB6YCA6Lev44KS5ZCr44KB44G+44GZ44CC","2":"44Ki44Or44OV44Kh44OZ44OD44OIM+aWh+Wtl+OAgeODj+OCpOODleODs+OAgTTmoYHjga7nlarlj7fjgafjgZnjgII=","38":"5o6y56S65p2/44Gu44CM6aKo44GY44KD44Gq44GE44CN44Go44Gk44Gq44GM44KK44G+44GZ44CC","6":"44Oh44O844Or44CM5YWs6ZaL56+E5Zuy44Gu56K66KqN44CN44Gr44GC44KL6Iux5a2XNOaWh+Wtl+OBp+OBmeOAgg==","31":"5q2j5byP44Gq6KuL5rGC6aCF55uu44Gn44Gv44Gq44GE5L2c5qWt44Gn44GZ44CC"};

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

function decodeText(value){
  const bin=atob(value);
  const bytes=Uint8Array.from(bin,c=>c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

const missHints=Object.fromEntries(Object.entries(hintPayload).map(([key,value])=>[key,decodeText(value)]));

function substringHashSet(value){
  const input=norm(value);
  const set=new Set([hashText(input)]);
  for(let start=0;start<input.length;start++){
    for(let end=start+1;end<=input.length&&end<=start+16;end++){
      set.add(hashText(input.slice(start,end)));
    }
  }
  return set;
}

function matchesGroups(value,groups,exactHashes){
  const exact=hashText(value);
  if((exactHashes||[]).includes(exact)) return true;
  const parts=substringHashSet(value);
  return groups.every(group=>group.some(hash=>parts.has(hash)));
}

function matchesAnswer(n,value){
  if(n===47) return matchesGroups(value,group47Hashes,answerHashes[n-1]);
  if(n===48) return matchesGroups(value,group48Hashes,answerHashes[n-1]);
  return (answerHashes[n-1]||[]).includes(hashText(value));
}

let unlocked=Number(localStorage.getItem(storageKey)||"1");

function renderLocks(){
  document.querySelectorAll("[data-q]").forEach(card=>{
    const n=Number(card.dataset.q);
    const locked=n>unlocked;
    card.classList.toggle("locked",locked);
    card.querySelectorAll("input,button").forEach(el=>{el.disabled=locked;});
  });
  const progress=document.getElementById("progressCount");
  if(progress) progress.textContent=(Math.max(0,unlocked-1))+"/48";
}

function checkAnswer(n){
  const card=document.querySelector('[data-q="'+n+'"]');
  const input=card?.querySelector("input");
  const msg=card?.querySelector(".msg");
  if(!card||!input||!msg) return;
  if(matchesAnswer(n,input.value)){
    msg.textContent=n===QUESTION_COUNT
      ?"最終報告を受理しました。OBS-1118の処理線がつながりました。"
      :"照合しました。次の記録を確認できます。";
    msg.className="msg ok";
    if(unlocked<n+1){
      unlocked=n+1;
      localStorage.setItem(storageKey,String(unlocked));
    }
    renderLocks();
  }else{
    msg.textContent=missHints[n]||"一致しません。別の資料と照合してください。";
    msg.className="msg ng";
  }
}

function resetNote(){
  localStorage.removeItem(storageKey);
  unlocked=1;
  renderLocks();
}

document.addEventListener("DOMContentLoaded",renderLocks);