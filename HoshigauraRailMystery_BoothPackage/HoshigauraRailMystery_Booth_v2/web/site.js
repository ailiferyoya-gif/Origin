function normalize(value){
  return String(value||"")
    .trim()
    .replace(/\s+/g,"")
    .replace(/[Ａ-Ｚａ-ｚ０-９]/g,s=>String.fromCharCode(s.charCodeAt(0)-0xfee0))
    .replace(/[‐‑‒–—―ー−]/g,"-")
    .toLowerCase();
}

const answers={
  1:["月見台","つきみだい"],
  2:["0503","20080503","2008/05/03","5月3日"],
  3:["k-15","k15","Ｋ-１５","Ｋ１５"],
  4:["七瀬理央","ななせりお"],
  5:["北側階段","月見台駅北側階段"],
  6:["御堂晴彦","みどうはるひこ"],
  7:["d-07","d07","Ｄ-０７","Ｄ０７"],
  8:["照明不点灯","照明1基が不点灯","照明が消えている","灯りが消えている"],
  9:["濡れた手袋","ぬれた手袋","手袋"],
  10:["展示ケースb","展示ケースＢ","ケースb","ケースＢ"],
  11:["安全-2008-0503","安全20080503","安全-２００８-０５０３"],
  12:["20:08","2008","２０:０８","20時08分","20時8分"],
  13:["乗客なし","乗客無し"],
  14:["2008年5月3日","2008/05/03","20080503","平成20年5月3日"],
  15:["御堂晴彦","七瀬理央","月見台駅北側階段","突き落"]
};

const messages={
  1:"照合成功。旧駅舎は月見台駅です。",
  2:"照合成功。事故報告書の閲覧制限番号は0503です。",
  3:"照合成功。事故当夜の回送列車はK-15です。",
  4:"照合成功。消えた乗客は七瀬理央です。",
  5:"照合成功。現場は月見台駅北側階段です。",
  6:"照合成功。当時の助役は御堂晴彦です。",
  7:"照合成功。直前に遅延していた列車はD-07です。",
  8:"照合成功。町の記録では照明不点灯です。",
  9:"照合成功。ブログに残る物証は濡れた手袋です。",
  10:"照合成功。記念切符は展示ケースBにあります。",
  11:"照合成功。町の記録番号は安全-2008-0503です。",
  12:"照合成功。K-15の時刻は20:08です。",
  13:"照合成功。公式記録の矛盾は乗客なしです。",
  14:"照合成功。事故日は2008年5月3日です。",
  15:"結論が成立しました。下に真相が復元されました。"
};

function solvedStage(){return Number(localStorage.getItem("hoshigaura_stage")||"0")}
function setStage(stage){if(stage>solvedStage())localStorage.setItem("hoshigaura_stage",String(stage));renderLocks()}
function renderLocks(){
  const solved=solvedStage();
  document.querySelectorAll("[data-lock]").forEach(section=>{
    const required=Number(section.dataset.lock)-1;
    section.classList.toggle("locked",solved<required);
  });
  if(solved>=15)document.querySelector("[data-truth]")?.removeAttribute("hidden");
}
function isCorrect(stage,value){
  const v=normalize(value);
  if(stage===15)return answers[15].every(part=>v.includes(normalize(part)));
  return answers[stage].some(answer=>v.includes(normalize(answer)));
}
function show(result,ok,text){result.className=`result ${ok?"good":"bad"}`;result.textContent=text}

renderLocks();
document.querySelectorAll("[data-stage]").forEach(form=>{
  form.addEventListener("submit",event=>{
    event.preventDefault();
    const stage=Number(form.dataset.stage);
    const result=form.querySelector(".result");
    if(solvedStage()<stage-1){
      show(result,false,"前の段階を先に解いてください。");
      return;
    }
    const value=new FormData(form).get("answer");
    if(!isCorrect(stage,value)){
      show(result,false,"まだ照合できません。別サイトの記録、日付、列車番号、人物名をもう一度見てください。");
      return;
    }
    setStage(stage);
    show(result,true,messages[stage]);
  });
});
