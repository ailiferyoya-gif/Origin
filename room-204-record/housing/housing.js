function postDesktopEvent(type) {
  window.parent.postMessage({ type }, "*");
}

function normalize(value) {
  return String(value || "")
    .normalize("NFKC")
    .replace(/[^\d]/g, "");
}

function revealRecord() {
  document.querySelector("#record")?.classList.remove("hidden");
  const message = document.querySelector("#form-message");
  if (message) message.textContent = "照会済み。管理室控えを表示しました。";
}

document.querySelector("#unlock-form")?.addEventListener("submit", event => {
  event.preventDefault();
  const code = normalize(new FormData(event.currentTarget).get("code"));
  const message = document.querySelector("#form-message");
  if (code === "0417" || code === "417") {
    localStorage.setItem("room204HousingUnlocked", "1");
    revealRecord();
    postDesktopEvent("ROOM204_STAGE_UNLOCKED");
  } else if (message) {
    message.textContent = "該当する掲示記録は見つかりません。記録日の表記を確認してください。";
  }
});

if (localStorage.getItem("room204HousingUnlocked") === "1") {
  revealRecord();
}
