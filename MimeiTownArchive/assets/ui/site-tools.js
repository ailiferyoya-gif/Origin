function normalizeSiteQuery(value) {
  return value.trim().toLowerCase().replace(/\s+/g, "");
}

function queryTokens(value) {
  return value.trim().toLowerCase().split(/\s+/).filter(Boolean).map(normalizeSiteQuery);
}

function escapeSiteText(value) {
  return value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  }[char]));
}

function setupTableFilter(inputSelector, rowSelector, countSelector, unit) {
  const input = document.querySelector(inputSelector);
  const rows = [...document.querySelectorAll(rowSelector)];
  const count = document.querySelector(countSelector);
  const update = () => {
    const tokens = queryTokens(input?.value || "");
    let shown = 0;
    rows.forEach((row) => {
      const text = normalizeSiteQuery(`${row.dataset.opac || row.dataset.paper || ""} ${row.textContent}`);
      const matched = tokens.length === 0 || tokens.every((token) => text.includes(token));
      row.hidden = !matched;
      if (matched) shown += 1;
    });
    if (count) count.textContent = `${shown}件の${unit}が見つかりました。`;
  };
  input?.addEventListener("input", update);
  input?.closest("div")?.querySelector("button")?.addEventListener("click", update);
  update();
}

setupTableFilter("#opac-query", "[data-opac]", "#opac-count", "資料");
setupTableFilter("#paper-query", "[data-paper]", "#paper-count", "記事");

const busForm = document.querySelector("#bus-route-form");
const busResult = document.querySelector("#bus-result");
busForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const from = document.querySelector("#bus-from").value;
  const to = document.querySelector("#bus-to").value;
  const time = document.querySelector("#bus-time").value;
  if (from === "図書館前" && to === "旧資料館坂" && time === "19:03") {
    busResult.textContent = "図書館前 19:03 発、旧資料館坂方面の臨時降車記録があります。運転日誌には白い封筒の忘れ物あり。";
  } else if (to === "第二倉庫前") {
    busResult.textContent = "第二倉庫前は式典準備のため休止です。港湾広場前も18時以降は通過扱いです。";
  } else {
    busResult.textContent = `${from} ${time} 発の便は、港湾広場前を通過する可能性があります。迂回情報を確認してください。`;
  }
});

const weatherButtons = [...document.querySelectorAll("[data-filter]")];
const weatherRows = [...document.querySelectorAll("[data-weather]")];
const weatherCount = document.querySelector("#weather-count");
weatherButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter || "";
    let shown = 0;
    weatherButtons.forEach((item) => item.classList.toggle("active", item === button));
    weatherRows.forEach((row) => {
      const matched = !filter || row.dataset.weather.includes(filter);
      row.hidden = !matched;
      if (matched) shown += 1;
    });
    if (weatherCount) weatherCount.textContent = `${shown}件の観測を表示しています。`;
  });
});

const radioForm = document.querySelector("#radio-letter-form");
const radioList = document.querySelector("#radio-local-letters");
radioForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(radioForm);
  const name = (data.get("name") || "名無し").toString().trim() || "名無し";
  const subject = (data.get("subject") || "無題").toString().trim() || "無題";
  const body = (data.get("body") || "").toString().trim();
  if (!body) return;
  const saved = JSON.parse(localStorage.getItem("mimei-radio-letters") || "[]");
  saved.push({ name, subject, body });
  localStorage.setItem("mimei-radio-letters", JSON.stringify(saved));
  radioForm.reset();
  renderRadioLetters();
});

function renderRadioLetters() {
  if (!radioList) return;
  let saved = [];
  try {
    saved = JSON.parse(localStorage.getItem("mimei-radio-letters") || "[]");
  } catch {
    saved = [];
  }
  radioList.innerHTML = saved.map((letter) => `
    <article>
      <p class="stamp">RN: ${escapeSiteText(letter.name)}</p>
      <h2>${escapeSiteText(letter.subject)}</h2>
      <p>${escapeSiteText(letter.body)}</p>
    </article>
  `).join("");
}

renderRadioLetters();

const townForm = document.querySelector("#town-request-form");
const townResult = document.querySelector("#town-request-result");
townForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(townForm);
  const type = data.get("type");
  const name = (data.get("name") || "未記入").toString().trim() || "未記入";
  const code = `MIM-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9000) + 1000)}`;
  localStorage.setItem("mimei-town-request", JSON.stringify({ code, type, name }));
  if (townResult) {
    townResult.textContent = `受付控え ${code}: ${name} / ${type}。港湾関連資料の場合、欠番資料は教育委員会照会扱いです。`;
  }
});
