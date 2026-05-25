const answers=[
  "紅坂メディカルクリニック",
  "紅坂診療所",
  "CRN-1006",
  "2010年10月6日",
  "23:14",
  "HOSP",
  "HOSP2314",
  "笠井朋子",
  "第二処置室",
  "退職扱い",
  "地域医療課",
  "カルテ第八冊",
  "酸素バルブログ",
  "欠番",
  "予備酸素ボンベ",
  "赤い鍵札",
  "2010/10/08",
  "酸素",
  "管理画面",
  "早瀬修",
  "薬品保管庫",
  "00:02",
  "薬剤棚ログ",
  "夜間カード",
  "裏口廊下",
  "紅坂医療設備",
  "裏口廊下",
  "第二処置室",
  "48分",
  "酸素バルブログ",
  "薬剤棚ログ",
  "笠井朋子",
  "早瀬修",
  "小規模な業務事故",
  "退路封鎖",
  "早瀬修が笠井朋子を第二処置室へ誘導し、夜間カードを使って裏口廊下から退路を塞いだ"
];

const answerAliases={
  4:["2010/10/6","2010/10/06","2010年10月6日"],
  6:["HOSP","hosp"],
  7:["HOSP2314","hosp2314"],
  14:["欠番","欠落番号"],
  18:["酸素","酸素系","酸素バルブ"],
  29:["48分","四十八分","48"],
  34:["小規模な業務事故","業務事故"],
  35:["退路封鎖","退路の封鎖","退路を塞いだ"]
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

const missHints={
  6:"公式HPのお知らせ欄にある2010.10.08の夜間巡回表を見てください。番号順に英字だけを拾います。",
  7:"前問の四文字に、最初の異常時刻を数字四桁で続けます。",
  13:"資料目録では、薬剤棚ログとは別に欠落扱いの設備ログがあります。",
  23:"RX-08は薬品保管庫に対応します。管理画面の制限ログ名と重ねてください。",
  35:"酸素そのものではなく、第二処置室から出る道がどう扱われたかを四字でまとめます。",
  36:"犯人、被害者、誘導先、夜間カード、塞がれた退路を一文に含めてください。"
};

const norm=s=>(s||"")
  .replace(/[\s　。．.・「」『』（）()［］\[\]/／\-ー―–—,，、]/g,"")
  .replace(/[Ａ-Ｚａ-ｚ０-９]/g,c=>String.fromCharCode(c.charCodeAt(0)-0xFEE0))
  .toLowerCase();

function matchesFinalAnswer(value){
  const input=norm(value);
  if(input===norm(answers[35])) return true;
  return finalAnswerGroups.every(group=>group.some(word=>input.includes(norm(word))));
}

function matchesAnswer(n,value){
  if(n===36) return matchesFinalAnswer(value);
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
