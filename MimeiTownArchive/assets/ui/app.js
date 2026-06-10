(function () {
  const form = document.querySelector("#answer-form");
  if (!form) return;

  const input = document.querySelector("#answer");
  const result = document.querySelector("#result");
  const unlock = document.querySelector("#unlock");

  const normalize = (value) => value
    .trim()
    .replace(/\s+/g, "")
    .replace(/[Ａ-Ｚａ-ｚ０-９]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 0xFEE0))
    .toLowerCase();

  const accepted = new Set([
    "港湾整備記念式典",
    "記念式典",
    "港湾整備",
    "港",
    "式典"
  ].map(normalize));

  const showUnlocked = () => {
    unlock.hidden = false;
    result.textContent = "照合できました。伊都のノートに次の保存ページが表示されました。";
    localStorage.setItem("mimei.chapter01", "unlocked");
  };

  if (localStorage.getItem("mimei.chapter01") === "unlocked") {
    showUnlocked();
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const answer = normalize(input.value);

    if (accepted.has(answer)) {
      showUnlocked();
      return;
    }

    if (answer.includes("雨宮") || answer.includes("澪")) {
      result.textContent = "人物名ではありません。三つの記録が同じ夜に何を指しているかを見てください。";
      return;
    }

    if (answer.includes("休校") || answer.includes("失踪")) {
      result.textContent = "近い記録です。ただ、町が隠した中心は役場側の出来事です。";
      return;
    }

    result.textContent = "まだ照合できません。日付と見出しをもう一度並べてください。";
  });
})();

