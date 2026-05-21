
(() => {
  const targets = document.querySelectorAll("p,li,td,th,h1,h2,h3,h4,a,button,span,strong,dt,dd");
  const rx = /([、。]|て|に|を|は|が|の|で|と|へ|か)(?!<wbr>)/g;
  targets.forEach((el) => {
    if (el.children.length || el.dataset.noFlow === "1") return;
    el.innerHTML = el.textContent.replace(rx, "$1<wbr>");
  });
})();
