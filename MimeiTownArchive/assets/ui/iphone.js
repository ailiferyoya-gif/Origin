(function () {
  const setAppHeight = () => {
    document.documentElement.style.setProperty("--app-height", `${window.innerHeight}px`);
  };

  setAppHeight();
  window.addEventListener("resize", setAppHeight, { passive: true });
  window.addEventListener("orientationchange", () => setTimeout(setAppHeight, 250), { passive: true });

  document.documentElement.classList.add("iphone-ready");
})();

