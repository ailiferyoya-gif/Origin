function postDesktopEvent(type) {
  window.parent.postMessage({ type }, "*");
}

const button = document.querySelector("#save-feed");

function markSaved() {
  if (!button) return;
  button.textContent = "保存済み";
  button.disabled = true;
}

button?.addEventListener("click", () => {
  localStorage.setItem("room204SocialSaved", "1");
  markSaved();
  postDesktopEvent("ROOM204_SOCIAL_CLUE");
});

if (localStorage.getItem("room204SocialSaved") === "1") {
  markSaved();
}
