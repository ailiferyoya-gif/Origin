function postDesktopEvent(type) {
  window.parent.postMessage({ type }, "*");
}

function normalize(value) {
  return String(value || "")
    .normalize("NFKC")
    .toUpperCase()
    .replace(/[・･\s_\-ー—―/／:：.。、「」『』()（）]/g, "");
}

function revealBundle() {
  document.querySelector("#bundle-panel")?.classList.remove("hidden");
  const message = document.querySelector("#bundle-message");
  if (message) message.textContent = "素材束を開きました。";
}

function revealFinal() {
  document.querySelector("#final-panel")?.classList.remove("hidden");
  const message = document.querySelector("#cut-message");
  if (message) message.textContent = "黒味前4カットを復元しました。";
}

document.querySelector("#bundle-form")?.addEventListener("submit", event => {
  event.preventDefault();
  const code = normalize(new FormData(event.currentTarget).get("bundle"));
  const message = document.querySelector("#bundle-message");
  if (["KCT0417204", "0417204", "K0417204"].includes(code)) {
    localStorage.setItem("room204ArchiveUnlocked", "1");
    revealBundle();
    postDesktopEvent("ROOM204_ARCHIVE_UNLOCKED");
  } else if (message) {
    message.textContent = "該当する素材束は見つかりません。制作番号を確認してください。";
  }
});

document.querySelector("#cut-form")?.addEventListener("submit", event => {
  event.preventDefault();
  const order = normalize(new FormData(event.currentTarget).get("order"));
  const message = document.querySelector("#cut-message");
  if (["NWES", "北西東南", "N1913W2004E2131S2240"].includes(order)) {
    localStorage.setItem("room204CutSolved", "1");
    revealFinal();
    postDesktopEvent("ROOM204_CUT_ORDER_SOLVED");
  } else if (message) {
    message.textContent = "復元順が合いません。素材ラベルの頭文字を確認してください。";
  }
});

document.querySelector("#final-form")?.addEventListener("submit", event => {
  event.preventDefault();
  const place = normalize(new FormData(event.currentTarget).get("place"));
  const message = document.querySelector("#final-message");
  const accepted = [
    "北棟倉庫B",
    "北棟旧倉庫B",
    "北棟倉庫ビー",
    "北棟旧倉庫ビー",
    "北棟B倉庫",
    "北棟ノ倉庫B"
  ].map(normalize);
  if (accepted.includes(place)) {
    localStorage.setItem("room204FinalSubmitted", "1");
    if (message) message.textContent = "保管場所を確定しました。";
    postDesktopEvent("ROOM204_FINAL_SUBMITTED");
  } else if (message) {
    message.textContent = "場所が一致しません。鍵貸出控えと投稿保存を確認してください。";
  }
});

if (localStorage.getItem("room204ArchiveUnlocked") === "1") {
  revealBundle();
}

if (localStorage.getItem("room204CutSolved") === "1") {
  revealBundle();
  revealFinal();
}

if (localStorage.getItem("room204FinalSubmitted") === "1") {
  revealBundle();
  revealFinal();
  const message = document.querySelector("#final-message");
  if (message) message.textContent = "保管場所を確定済みです。";
}
