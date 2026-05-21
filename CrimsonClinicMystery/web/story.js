const storyStates=[
["まだ事故報告書の外へ出ていない","最初の照合を終えると、調査記録がここに積み重なります。","第一章"],
["事故の輪郭が揃った","日付、時刻、場所が整いすぎている。次は、整った箱の中で扱いが違う資料を探します。","第一章"],
["記録の欠落が中心になった","事故現場より先に、消されたログと移された冊子が見え始めています。","第二章"],
["人の動線が残り始めた","早瀬修、赤い鍵札、00:02。記録の主語が設備から人へ移りました。","第三章"],
["退路が事件の形を決めた","第二処置室ではなく裏口廊下。閉じた場所ではなく、出られない状態を作った場所を見る段階です。","第四章"],
["訂正されなかった夜に届いた","最後は管理画面と薬剤棚ログで、報告書が何を隠したかを一文に戻します。","第五章"]
];
function currentSolved(){return Math.max(0, Number(localStorage.getItem("mystery_unlocked")||"1")-1)}
function renderStory(){
  const solved=currentSolved();
  const stage=solved>=21?5:solved>=16?4:solved>=11?3:solved>=6?2:solved>=1?1:0;
  const s=storyStates[stage];
  document.getElementById("storyProgress").textContent=solved+"/24";
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
