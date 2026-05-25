const answers=[
  "紅坂メディカルクリニック",
  "紅坂診療所",
  "CRN-1006",
  "2010年10月6日",
  "23:14",
  "HOSP",
  "HOSP2314",
  "CRN-1006",
  "笠井朋子",
  "赤い鍵札",
  "酸素バルブログ",
  "笠井朋子",
  "第二処置室",
  "退職扱い",
  "地域医療課",
  "カルテ第八冊",
  "酸素バルブログ",
  "欠番",
  "A-15",
  "予備酸素ボンベ",
  "赤い鍵札",
  "裏口廊下",
  "2010/10/08",
  "酸素",
  "管理画面",
  "保存メール",
  "早瀬修",
  "22:31",
  "第二処置室",
  "薬品保管庫",
  "00:02",
  "薬剤棚ログ",
  "夜間カード",
  "裏口廊下",
  "紅坂医療設備",
  "裏口廊下",
  "48分",
  "警告 開錠 閉鎖 復旧",
  "夜間カード",
  "裏口廊下",
  "酸素バルブログ",
  "薬剤棚ログ",
  "笠井朋子",
  "早瀬修",
  "小規模な業務事故",
  "退路封鎖",
  "早瀬修 笠井朋子 第二処置室 夜間カード 裏口廊下",
  "早瀬修が笠井朋子を第二処置室へ誘導し、夜間カードを使って裏口廊下から退路を塞いだ"
];

const answerAliases={
  4:["2010/10/6","2010/10/06","2010年10月6日"],
  6:["HOSP","hosp"],
  7:["HOSP2314","hosp2314"],
  18:["欠番","欠落番号"],
  19:["A15","A-15","a15","a-15"],
  24:["酸素","酸素系","酸素バルブ"],
  37:["48分","四十八分","48"],
  38:["警告開錠閉鎖復旧","警告 開錠 閉鎖 復旧","警告、開錠、閉鎖、復旧"],
  45:["小規模な業務事故","業務事故"],
  46:["退路封鎖","退路の封鎖","退路を塞いだ"],
  47:["早瀬修 笠井朋子 第二処置室 夜間カード 裏口廊下","早瀬修笠井朋子第二処置室夜間カード裏口廊下"]
};

const finalAnswerGroups=[
  ["早瀬修","早瀬","はやせ","hayase"],
  ["笠井朋子","笠井","かさい","kasai"],
  ["第二処置室","第2処置室","二処置室","処置室"],
  ["夜間カード","カード","入退室カード"],
  ["裏口廊下","裏口","廊下"],
  ["誘導","呼び出","呼出","向かわせ","行かせ"],
  ["塞","閉鎖","封鎖","閉じ","逃げられ"]
];

const fiveElementGroups=[
  ["早瀬修","早瀬"],
  ["笠井朋子","笠井"],
  ["第二処置室","第2処置室","処置室"],
  ["夜間カード","カード"],
  ["裏口廊下","裏口"]
];

const missHints={
  6:"公式HPのお知らせ欄にある2010.10.08の夜間巡回表を見てください。番号順に英字だけを拾います。",
  7:"前問の四文字に、最初の異常時刻を数字四桁で続けます。",
  19:"酸素バルブログの欠番照合票で、A-14とA-16の間にある枠を見てください。",
  38:"日次控えの夜間照合順を、時刻の早い順に四語で並べます。",
  46:"酸素そのものではなく、第二処置室から出る道がどう扱われたかを四字でまとめます。",
  47:"人物、被害者、誘導先、カード、退路の五つを順に含めてください。",
  48:"犯人、被害者、誘導先、夜間カード、塞がれた退路を一文に含めてください。"
};

const norm=s=>(s||"")
  .replace(/[\s　。．.・「」『』（）()［］\[\]/／\-ー―–—,，、]/g,"")
  .replace(/[Ａ-Ｚａ-ｚ０-９]/g,c=>String.fromCharCode(c.charCodeAt(0)-0xFEE0))
  .toLowerCase();

function matchesFinalAnswer(value){
  const input=norm(value);
  if(input===norm(answers[47])) return true;
  return finalAnswerGroups.every(group=>group.some(word=>input.includes(norm(word))));
}

function matchesFiveElements(value){
  const input=norm(value);
  if(input===norm(answers[46])) return true;
  return fiveElementGroups.every(group=>group.some(word=>input.includes(norm(word))));
}

function matchesAnswer(n,value){
  if(n===48) return matchesFinalAnswer(value);
  if(n===47) return matchesFiveElements(value);
  const candidates=[answers[n-1]].concat(answerAliases[n]||[]);
  const input=norm(value);
  return candidates.some(x=>input===norm(x));
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
    msg.textContent=n===answers.length
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
