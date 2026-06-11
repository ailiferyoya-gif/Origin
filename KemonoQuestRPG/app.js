const tiles = [
  ["森", "forest"], ["森", "forest"], ["草", "grass"], ["草", "grass"], ["水", "water"], ["水", "water"],
  ["森", "forest"], ["道", "road"], ["道", "road"], ["草", "grass"], ["草", "grass"], ["水", "water"],
  ["草", "grass"], ["道", "road"], ["町", "town"], ["道", "road"], ["草", "grass"], ["草", "grass"],
  ["草", "grass"], ["道", "road"], ["草", "grass"], ["道", "road"], ["ほこら", "shrine"], ["森", "forest"],
  ["草", "grass"], ["草", "grass"], ["草", "grass"], ["道", "road"], ["森", "forest"], ["森", "forest"],
  ["水", "water"], ["草", "grass"], ["草", "grass"], ["道", "road"], ["森", "forest"], ["森", "forest"]
];

const state = {
  hero: {
    name: "ルル",
    level: 1,
    hp: 34,
    maxHp: 34,
    mp: 12,
    maxMp: 12,
    attack: 8,
    defense: 4,
    gold: 23
  },
  enemy: {
    name: "かげウルフ",
    hp: 28,
    maxHp: 28,
    attack: 6
  },
  position: 18,
  log: ["ルルは みどりの丘に やってきた。"]
};

const map = document.querySelector("#map");
const log = document.querySelector("#log");
const battleLog = document.querySelector("#battleLog");
const battle = document.querySelector("#battle");
const dialogue = document.querySelector("#dialogue");
const characters = document.querySelector("#characters");

function push(message) {
  state.log.push(message);
  while (state.log.length > 4) state.log.shift();
  renderLog(log);
  renderLog(battleLog);
}

function renderLog(target) {
  target.innerHTML = state.log.map((line) => `<p>${line}</p>`).join("");
}

function render() {
  document.querySelector("#level").textContent = `Lv ${state.hero.level}`;
  document.querySelector("#gold").textContent = `${state.hero.gold} G`;
  document.querySelector("#hpText").textContent = `${state.hero.hp}/${state.hero.maxHp}`;
  document.querySelector("#mpText").textContent = `${state.hero.mp}/${state.hero.maxMp}`;
  document.querySelector("#hpMeter").value = state.hero.hp;
  document.querySelector("#mpMeter").value = state.hero.mp;
  document.querySelector("#enemyName").textContent = state.enemy.name;
  document.querySelector("#enemyHp").textContent = `HP ${state.enemy.hp} / ${state.enemy.maxHp}`;

  map.innerHTML = "";
  tiles.forEach(([glyph, kind], index) => {
    const tile = document.createElement("div");
    tile.className = `tile ${kind}${index === state.position ? " hero" : ""}`;
    tile.textContent = index === state.position ? "ル" : glyph;
    map.append(tile);
  });
  renderLog(log);
  renderLog(battleLog);
}

function move(dx, dy) {
  const x = state.position % 6;
  const y = Math.floor(state.position / 6);
  const nextX = Math.max(0, Math.min(5, x + dx));
  const nextY = Math.max(0, Math.min(5, y + dy));
  const next = nextY * 6 + nextX;
  const [glyph, kind] = tiles[next];

  if (kind === "water") {
    push("水辺はまだ渡れない。");
    return;
  }

  state.position = next;
  if (kind === "town") {
    state.hero.hp = state.hero.maxHp;
    state.hero.mp = state.hero.maxMp;
    push("町で休んだ。HPとMPが回復した。");
  } else if (kind === "shrine") {
    push("ほこらから冷たい気配がする。");
  } else if (kind === "forest" && Math.random() < 0.34) {
    startBattle();
  } else {
    push(`${glyph}を進んだ。`);
  }
  render();
}

function inspect() {
  const [, kind] = tiles[state.position];
  if (kind === "town") {
    showDialogue("会話", "村長「北のほこらに ひかる石がある。気をつけておくれ。」");
  } else if (kind === "shrine") {
    showDialogue("石碑", "石碑「ゆうきある者よ、影をしりぞけよ。」");
  } else {
    push("あたりを調べたが、風が草をゆらすだけだった。");
  }
}

function showDialogue(title, text) {
  document.querySelector("#dialogueTitle").textContent = title;
  document.querySelector("#dialogueText").textContent = text;
  dialogue.showModal();
}

function startBattle() {
  state.enemy = { name: "かげウルフ", hp: 28, maxHp: 28, attack: 6 };
  state.log = ["かげウルフが あらわれた！"];
  render();
  battle.showModal();
}

function attack() {
  const damage = roll(7, 12);
  state.enemy.hp = Math.max(0, state.enemy.hp - damage);
  push(`ルルのこうげき！ ${damage} ダメージ。`);
  if (checkVictory()) return;
  enemyTurn();
}

function spark() {
  if (state.hero.mp < 3) {
    push("MPがたりない。");
    return;
  }
  state.hero.mp -= 3;
  const damage = roll(11, 16);
  state.enemy.hp = Math.max(0, state.enemy.hp - damage);
  push(`ルルは きらめきを はなった！ ${damage} ダメージ。`);
  if (checkVictory()) return;
  enemyTurn();
}

function guardAction() {
  push("ルルは身をまもった。");
  const damage = Math.max(1, state.enemy.attack - state.hero.defense - 2);
  state.hero.hp = Math.max(0, state.hero.hp - damage);
  push(`${state.enemy.name}のこうげき！ ${damage} ダメージ。`);
  render();
}

function enemyTurn() {
  const damage = Math.max(1, state.enemy.attack + roll(0, 3) - state.hero.defense);
  state.hero.hp = Math.max(0, state.hero.hp - damage);
  push(`${state.enemy.name}のこうげき！ ${damage} ダメージ。`);
  if (state.hero.hp === 0) {
    state.hero.hp = state.hero.maxHp;
    state.hero.mp = state.hero.maxMp;
    state.position = 14;
    battle.close();
    showDialogue("宿屋", "目が覚めると、ルルは町の宿屋にいた。");
  }
  render();
}

function checkVictory() {
  if (state.enemy.hp > 0) {
    render();
    return false;
  }
  state.hero.gold += 14;
  push("かげウルフを たおした！ 14Gを手に入れた。");
  render();
  setTimeout(() => battle.close(), 500);
  return true;
}

function roll(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

document.querySelectorAll("[data-move]").forEach((button) => {
  button.addEventListener("click", () => {
    const [dx, dy] = button.dataset.move.split(",").map(Number);
    move(dx, dy);
  });
});

document.querySelector("#inspect").addEventListener("click", inspect);
document.querySelector("#battleStart").addEventListener("click", startBattle);
document.querySelector("#dialogueClose").addEventListener("click", () => dialogue.close());
document.querySelector("#characterList").addEventListener("click", () => characters.showModal());
document.querySelector("#charactersClose").addEventListener("click", () => characters.close());
document.querySelectorAll(".character-tabs .tab").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".character-tabs .tab").forEach((tab) => {
      tab.classList.toggle("active", tab === button);
    });
    const filter = button.dataset.filter;
    document.querySelectorAll(".character-card").forEach((card) => {
      card.hidden = filter !== "all" && card.dataset.kind !== filter;
    });
  });
});
document.querySelector("#attack").addEventListener("click", attack);
document.querySelector("#spark").addEventListener("click", spark);
document.querySelector("#guard").addEventListener("click", guardAction);

render();
