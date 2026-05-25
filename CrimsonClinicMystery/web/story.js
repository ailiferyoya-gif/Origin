const storyStates=[
["まだ公式HPの外へ出ていない","Kの依頼文と公式HPから、院内入口へ進むための材料を探します。","第一章"],
["院内入口の形が見えた","巡回札と異常時刻がそろいました。次は検索語を作り、外部資料へ移ります。","第一章"],
["検索語が資料への道になった","管理番号、氏名、物証、ログ名を使って、公開側の資料を順に開きます。","第二章"],
["公開資料の事故説が固まった","新聞、自治体、掲示板では酸素系の事故に見えるよう整理されています。","第三章"],
["内部控えが公開資料と食い違った","保存メールと管理画面では、薬剤棚、夜間カード、裏口廊下が同じ夜に集まります。","第四章"],
["事故説が退路の問題へ反転した","時系列と未訂正欄を復元し、報告書が隠した順路を一文に戻します。","第五章"]
];
function currentSolved(){return Math.max(0, Number(localStorage.getItem("mystery_unlocked")||"1")-1)}
function renderStory(){
  const solved=currentSolved();
  const stage=solved>=47?5:solved>=37?5:solved>=25?4:solved>=12?3:solved>=8?2:solved>=6?1:0;
  const s=storyStates[stage];
  document.getElementById("storyProgress").textContent=solved+"/48";
  document.getElementById("storyChapter").textContent=s[2];
  document.getElementById("storyHeadline").textContent=s[0];
  document.getElementById("storyLead").textContent=s[1];
  document.querySelectorAll(".story-chapter").forEach(el=>{
    const start=Number(el.dataset.start);
    el.classList.toggle("is-open", solved+1>=start);
  });
  document.querySelectorAll(".story-fragment").forEach(el=>{
    const n=Number(el.dataset.fragment);
    el.classList.toggle("is-open", n<=solved);
  });
  document.body.dataset.storyStage=String(stage);
}
const baseCheckAnswer=window.checkAnswer;
window.checkAnswer=function(n){
  baseCheckAnswer(n);
  renderStory();
};
const baseResetNote=window.resetNote;
window.resetNote=function(){
  baseResetNote();
  renderStory();
};
document.addEventListener("DOMContentLoaded", renderStory);
