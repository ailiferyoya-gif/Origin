function postDesktopEvent(type, payload = {}) {
  window.parent?.postMessage?.({ type, payload }, "*");
}

document.querySelector("[data-social-clue]")?.addEventListener("click", event => {
  event.currentTarget.disabled = true;
  event.currentTarget.textContent = "記録しました";
  postDesktopEvent("TEMPLATE_SOCIAL_CLUE", { source: "night_shift_log" });
});
