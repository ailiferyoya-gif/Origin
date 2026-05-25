const storyStates=[
["まだ公式HPの外へ出ていない","Kの依頼文と公式HPから、院内入口へ進むための材料を探します。","第一章"],
["院内入口の形が見えた","巡回札と異常時刻がそろいました。次は公開資料だけで事故説を組み立てます。","第一章"],
["公開資料の事故説が固まった","新聞、自治体、掲示板では酸素系の事故に見えるよう整理されています。","第二章"],
["内部控えが公開資料と食い違った","保存メールと管理画面では、薬剤棚、夜間カード、裏口廊下が同じ夜に集まります。","第三章"],
["事故説が退路の問題へ反転した","酸素バルブログの欠番より、薬剤棚ログと夜間カードの動線が中心になります。","第四章"],
["訂正されなかった夜に届いた","最後は人物、場所、カード、退路を一文に戻します。","第五章"]
];
function currentSolved(){return Math.max(0, Number(localStorage.getItem("mystery_unlocked")||"1")-1)}
function renderStory(){
  const solved=currentSolved();
  const stage=solved>=36?5:solved>=29?4:solved>=19?3:solved>=8?2:solved>=6?1:0;
  const s=storyStates[stage];
  document.getElementById("storyProgress").textContent=solved+"/36";
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
