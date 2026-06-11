const form = document.querySelector("#search-form");
const query = document.querySelector("#query");
const summary = document.querySelector("#summary");
const cards = [...document.querySelectorAll(".result-card")];

function normalize(value) {
  return value.trim().toLowerCase().replace(/\s+/g, "");
}

function runSearch(term) {
  const key = normalize(term);
  let shown = 0;
  cards.forEach((card) => {
    const haystack = normalize(`${card.dataset.keys} ${card.textContent}`);
    const matched = key.length === 0 || haystack.includes(key);
    card.hidden = key.length > 0 && !matched;
    if (!card.hidden) shown += 1;
  });
  summary.textContent = key.length === 0
    ? "検索語を入力してください。"
    : `${shown}件の保存記録が見つかりました。`;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  runSearch(query.value);
});

query.addEventListener("input", () => runSearch(query.value));
runSearch("");
