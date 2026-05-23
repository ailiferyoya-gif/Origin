function normalize(value){
  return String(value || "")
    .trim()
    .replace(/\s+/g, "")
    .replace(/[Ａ-Ｚａ-ｚ０-９]/g, char => String.fromCharCode(char.charCodeAt(0) - 0xfee0))
    .replace(/[ーｰ−―‐]/g, "-")
    .replace(/[・･、。，．.]/g, "")
    .toLowerCase();
}

const answers = {
  1: ["月見台", "月見台駅"],
  2: ["0503", "20080503", "2008/05/03", "5月3日"],
  3: ["m-20", "m20"],
  4: ["k-15", "k15"],
  5: ["七瀬理央", "ななせりお"],
  6: ["月見台駅北側階段", "北側階段"],
  7: ["d-07", "d07"],
  8: ["照明不点灯", "照明が不点灯", "灯りが消えている", "不点灯"],
  9: ["濡れた手袋", "ぬれた手袋", "手袋"],
  10: ["展示ケースb", "ケースb", "展示ケースB", "ケースB"],
  11: ["安全-2008-0503", "安全20080503"],
  12: ["20:08", "2008", "20時08分", "20時8分"],
  13: ["乗客なし", "乗客無", "乗客無し"],
  14: ["2番ホーム", "二番ホーム", "下りホーム"],
  15: ["月見台", "月見台駅"],
  16: ["御堂晴彦", "みどうはるひこ"],
  17: ["無許可回送", "安全不備", "隠蔽"],
  18: ["乗れる列車がない", "乗れない", "列車がない", "m-20運休k-15回送", "m20運休k15回送"],
  19: ["2008年5月3日", "2008/05/03", "20080503", "平成20年5月3日"],
  20: ["御堂晴彦", "七瀬理央", "月見台駅北側階段", "突き落とした"]
};

const messages = {
  1: "照合成功。旧駅舎の中心は月見台駅です。",
  2: "照合成功。事故報告書の閲覧制限番号は0503です。",
  3: "照合成功。月見台行きで運休になった列車はM-20です。",
  4: "照合成功。通常客扱いではない回送列車はK-15です。",
  5: "照合成功。事故に遭った人物は七瀬理央です。",
  6: "照合成功。現場は月見台駅北側階段です。",
  7: "照合成功。直前に遅延した列車はD-07です。",
  8: "照合成功。事故当夜、階段下の照明は不点灯でした。",
  9: "照合成功。ブログに残る物証は濡れた手袋です。",
  10: "照合成功。記念切符は展示ケースBにあります。",
  11: "照合成功。町の記録番号は安全-2008-0503です。",
  12: "照合成功。K-15の時刻は20:08です。",
  13: "照合成功。公式記録の矛盾は「乗客なし」です。",
  14: "照合成功。回送記録とつながるのは2番ホームです。",
  15: "照合成功。押印時間が空いているのは月見台です。",
  16: "照合成功。当時の助役は御堂晴彦です。",
  17: "照合成功。隠された理由は無許可回送と安全不備です。",
  18: "照合成功。証言時刻に乗れる列車はありません。",
  19: "照合成功。事故日は2008年5月3日です。",
  20: "結論が成立しました。下に真相が表示されます。"
};

function solvedStage(){
  return Number(localStorage.getItem("hoshigaura_stage") || "0");
}

function setStage(stage){
  if(stage > solvedStage()) localStorage.setItem("hoshigaura_stage", String(stage));
  renderLocks();
}

function renderLocks(){
  const solved = solvedStage();
  document.querySelectorAll("[data-lock]").forEach(section => {
    const required = Number(section.dataset.lock) - 1;
    section.classList.toggle("locked", solved < required);
  });
  if(solved >= 20) document.querySelector("[data-truth]")?.removeAttribute("hidden");
}

function isCorrect(stage, value){
  const v = normalize(value);
  if(stage === 20) return answers[20].every(part => v.includes(normalize(part)));
  return answers[stage].some(answer => v.includes(normalize(answer)));
}

function show(result, ok, text){
  result.className = `result ${ok ? "good" : "bad"}`;
  result.textContent = text;
}

renderLocks();
document.querySelectorAll("[data-stage]").forEach(form => {
  form.addEventListener("submit", event => {
    event.preventDefault();
    const stage = Number(form.dataset.stage);
    const result = form.querySelector(".result");
    if(solvedStage() < stage - 1){
      show(result, false, "前の段階を先に照合してください。");
      return;
    }
    const value = new FormData(form).get("answer");
    if(!isCorrect(stage, value)){
      show(result, false, "まだ照合できません。資料の番号、時刻、駅名、人物名をもう一度確認してください。");
      return;
    }
    setStage(stage);
    show(result, true, messages[stage]);
  });
});
