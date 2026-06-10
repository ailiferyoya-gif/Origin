(function () {
  const input = document.querySelector("#dial-input");
  const result = document.querySelector("#call-result");
  const voicemail = document.querySelector("#voicemail");
  const keys = document.querySelectorAll(".keypad button");

  if (!input || !result || !voicemail || !keys.length) return;

  const normalize = (value) => value.replace(/\D/g, "");

  const unlock = () => {
    voicemail.hidden = false;
    result.textContent = "接続しました。保存メッセージを再生します。";
    localStorage.setItem("mimei.voicemail", "played");
  };

  if (localStorage.getItem("mimei.voicemail") === "played") {
    unlock();
  }

  keys.forEach((key) => {
    key.addEventListener("click", () => {
      const action = key.dataset.action;
      if (action === "clear") {
        input.value = "";
        result.textContent = "";
        return;
      }
      if (action === "call") {
        const value = normalize(input.value);
        if (value === "2300918" || value === "2300" || value.endsWith("0918") && value.includes("2300")) {
          unlock();
        } else {
          result.textContent = "つながりません。時刻と末尾番号をもう一度照合してください。";
        }
        return;
      }
      input.value += key.textContent.trim();
    });
  });
})();

