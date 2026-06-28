function postDesktopEvent(type) {
  window.parent.postMessage({ type }, "*");
}

document.querySelector("#request-review")?.addEventListener("click", () => {
  localStorage.setItem("room204KctRequest", "1");
  postDesktopEvent("ROOM204_CONTACT_REQUEST");
  const button = document.querySelector("#request-review");
  button.textContent = "復元依頼を送信済み";
  button.disabled = true;
});

if (localStorage.getItem("room204KctRequest") === "1") {
  const button = document.querySelector("#request-review");
  if (button) {
    button.textContent = "復元依頼を送信済み";
    button.disabled = true;
  }
}
