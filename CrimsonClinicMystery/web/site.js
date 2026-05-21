const answers=[
  "笠井朋子",
  "2010年10月6日",
  "23:14",
  "第二処置室",
  "CRN-1006",
  "カルテ第八冊",
  "薬品保管庫",
  "地域医療課",
  "予備酸素ボンベ",
  "酸素バルブログ",
  "早瀬修",
  "赤い鍵札",
  "00:02",
  "退職扱い",
  "2010/10/07",
  "紅坂診療所",
  "夜間カード",
  "裏口廊下",
  "紅坂医療設備",
  "欠番",
  "2010/10/08",
  "薬剤棚ログ",
  "管理画面",
  "早瀬修が笠井朋子を第二処置室へ誘導し、夜間カードを使って裏口廊下から退路を塞いだ"
];

const finalAnswerGroups=[
  ["早瀬修","早瀬","はやせ","hayase"],
  ["笠井朋子","笠井","かさい","kasai"],
  ["第二処置室","第2処置室","二処置室","処置室"],
  ["夜間カード","カード","入退室カード"],
  ["裏口廊下","裏口","廊下"],
  ["誘導","呼び出","呼出","向かわせ","行かせ"],
  ["塞","閉鎖","封鎖","閉じ","逃げられ"]
];

const norm=s=>(s||"")
  .replace(/[\s　。、，,.・「」『』（）()【】\[\]\/／\\\-ー―‐]/g,"")
  .replace(/[Ａ-Ｚａ-ｚ０-９]/g,c=>String.fromCharCode(c.charCodeAt(0)-0xFEE0))
  .toLowerCase();

function matchesFinalAnswer(value){
  const input=norm(value);
  if(input===norm(answers[23])) return true;
  return finalAnswerGroups.every(group=>group.some(word=>input.includes(norm(word))));
}

function matchesAnswer(n,value){
  if(n===24) return matchesFinalAnswer(value);
  return norm(value)===norm(answers[n-1]);
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
    msg.textContent=n===24
      ?"一致しません。犯人、被害者、場所、夜間カード、塞がれた退路を一文に含めてください。"
      :"一致しません。別サイトの記録と重ねてください。";
    msg.className="msg ng";
  }
}

function resetNote(){
  localStorage.removeItem("mystery_unlocked");
  unlocked=1;
  renderLocks();
}

document.addEventListener("DOMContentLoaded",renderLocks);
