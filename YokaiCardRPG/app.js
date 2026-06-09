const SAVE_KEY = "yokai-card-rpg-v2";
const DECK_SIZE = 20;

const rarityRank = { N: 1, R: 2, SR: 3, SSR: 4 };
const rarityLabel = { N: "N", R: "R", SR: "SR", SSR: "SSR" };

const cardCatalog = [
  {
    id: "slash",
    name: "斬札",
    rarity: "N",
    type: "attack",
    cost: "攻撃",
    text: "敵に8ダメージ。",
    copies: 8,
    play: (s) => damageEnemy(s, 8, "斬札が妖気を裂いた。"),
  },
  {
    id: "ward",
    name: "護符結界",
    rarity: "N",
    type: "defense",
    cost: "防御",
    text: "結界を10得る。",
    copies: 8,
    play: (s) => {
      s.block += 10;
      s.log = "護符が淡く光り、結界が張られた。";
    },
  },
  {
    id: "bell",
    name: "祓い鈴",
    rarity: "N",
    type: "spirit",
    cost: "回復",
    text: "HPを7回復。呪火を鎮める。",
    copies: 8,
    play: (s) => {
      s.hp = Math.min(s.maxHp, s.hp + 7);
      s.burn = 0;
      s.log = "鈴の音が響き、穢れが薄れていく。";
    },
  },
  {
    id: "flame",
    name: "狐火",
    rarity: "R",
    type: "attack",
    cost: "継続",
    text: "敵に7ダメージ。火傷を3付与。",
    copies: 3,
    play: (s) => {
      damageEnemy(s, 7, "狐火が尾を引き、妖怪に燃え移った。");
      s.enemy.burn += 3;
    },
  },
  {
    id: "seal",
    name: "封じ札",
    rarity: "R",
    type: "spirit",
    cost: "妨害",
    text: "敵に6ダメージ。次の攻撃を弱める。",
    copies: 3,
    play: (s) => {
      damageEnemy(s, 6, "封じ札が敵の影を地面へ縫い止めた。");
      s.enemy.weakened = true;
    },
  },
  {
    id: "read",
    name: "見鬼",
    rarity: "R",
    type: "defense",
    cost: "先読み",
    text: "結界を7得る。攻撃札を引きやすくする。",
    copies: 3,
    play: (s) => {
      s.block += 7;
      s.focus = true;
      s.log = "敵の妖気の流れが読めた。";
    },
  },
  {
    id: "shikigami",
    name: "式神呼び",
    rarity: "SR",
    type: "spirit",
    cost: "召喚",
    text: "敵に10ダメージ。魂灯を1得る。",
    copies: 2,
    play: (s) => {
      damageEnemy(s, 10, "小さな式神が敵の懐へ飛び込んだ。");
      s.souls += 1;
    },
  },
  {
    id: "blood",
    name: "血墨の札",
    rarity: "SR",
    type: "attack",
    cost: "危険",
    text: "HPを4失い、敵に20ダメージ。",
    copies: 2,
    play: (s) => {
      s.hp = Math.max(1, s.hp - 4);
      damageEnemy(s, 20, "血墨の札が赤く滲み、大きな傷を刻んだ。");
    },
  },
  {
    id: "moon",
    name: "月読の札",
    rarity: "SSR",
    type: "attack",
    cost: "奥義",
    text: "敵に26ダメージ。結界を8得る。",
    copies: 1,
    play: (s) => {
      damageEnemy(s, 26, "月光が札に宿り、夜そのものが敵を断った。");
      s.block += 8;
    },
  },
  {
    id: "mirror",
    name: "八咫鏡",
    rarity: "SSR",
    type: "defense",
    cost: "反射",
    text: "結界を18得る。敵に8ダメージ。",
    copies: 1,
    play: (s) => {
      s.block += 18;
      damageEnemy(s, 8, "鏡面に妖気が跳ね返り、敵へ突き刺さった。");
    },
  },
];

const enemyTemplates = [
  { name: "狐面の灯", hp: 32, art: "yokai", min: 6, max: 10 },
  { name: "濡れ行灯", hp: 38, art: "yokai", min: 5, max: 12 },
  { name: "煤かぶり天狗", hp: 44, art: "yokai", min: 8, max: 13 },
  { name: "朽ち社の鬼", hp: 86, art: "boss", min: 12, max: 19, boss: true },
];

const player = normalizeSave(loadSave());

const state = {
  floor: 1,
  maxFloor: 10,
  hp: 42,
  maxHp: 42,
  block: 0,
  burn: 0,
  souls: 0,
  focus: false,
  drawPile: [],
  discardPile: [],
  hand: [],
  enemy: null,
  waiting: false,
  inRun: false,
  log: "",
};

const els = {
  setupScreen: document.querySelector("#setupScreen"),
  gameScreen: document.querySelector("#gameScreen"),
  collectionText: document.querySelector("#collectionText"),
  deckCountText: document.querySelector("#deckCountText"),
  deckHint: document.querySelector("#deckHint"),
  deckList: document.querySelector("#deckList"),
  gachaResult: document.querySelector("#gachaResult"),
  pullOneButton: document.querySelector("#pullOneButton"),
  pullTenButton: document.querySelector("#pullTenButton"),
  autoDeckButton: document.querySelector("#autoDeckButton"),
  startRunButton: document.querySelector("#startRunButton"),
  floorText: document.querySelector("#floorText"),
  soulText: document.querySelector("#soulText"),
  enemyArt: document.querySelector("#enemyArt"),
  intentText: document.querySelector("#intentText"),
  enemyName: document.querySelector("#enemyName"),
  enemyHpText: document.querySelector("#enemyHpText"),
  enemyHpBar: document.querySelector("#enemyHpBar"),
  hpText: document.querySelector("#hpText"),
  hpBar: document.querySelector("#hpBar"),
  blockText: document.querySelector("#blockText"),
  burnText: document.querySelector("#burnText"),
  deckText: document.querySelector("#deckText"),
  logText: document.querySelector("#logText"),
  cards: document.querySelector("#cards"),
  restButton: document.querySelector("#restButton"),
  advanceButton: document.querySelector("#advanceButton"),
  restartButton: document.querySelector("#restartButton"),
  dialog: document.querySelector("#resultDialog"),
  resultTitle: document.querySelector("#resultTitle"),
  resultText: document.querySelector("#resultText"),
  dialogRestartButton: document.querySelector("#dialogRestartButton"),
};

function loadSave() {
  try {
    return JSON.parse(localStorage.getItem(SAVE_KEY) || "{}");
  } catch {
    return {};
  }
}

function normalizeSave(raw) {
  const fallback = {};
  cardCatalog.forEach((card) => {
    fallback[card.id] = card.rarity === "N" ? 6 : 0;
  });
  const collection = { ...fallback, ...(raw.collection || {}) };
  const deck = Array.isArray(raw.deck) ? raw.deck.filter((id) => collection[id] > 0) : [];
  return {
    collection,
    deck: deck.slice(0, DECK_SIZE),
  };
}

function save() {
  localStorage.setItem(SAVE_KEY, JSON.stringify(player));
}

function cardById(id) {
  return cardCatalog.find((card) => card.id === id);
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sample(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pullRarity() {
  const roll = Math.random();
  if (roll < 0.04) return "SSR";
  if (roll < 0.18) return "SR";
  if (roll < 0.55) return "R";
  return "N";
}

function pullCard() {
  const rarity = pullRarity();
  const pool = cardCatalog.filter((card) => card.rarity === rarity);
  const card = sample(pool);
  player.collection[card.id] = (player.collection[card.id] || 0) + 1;
  return card;
}

function pull(count) {
  const results = Array.from({ length: count }, pullCard);
  save();
  els.gachaResult.innerHTML = results
    .map((card) => `<span class="rarity ${card.rarity}">${rarityLabel[card.rarity]}</span>${card.name}`)
    .join(" / ");
  renderSetup();
}

function countInDeck(id) {
  return player.deck.filter((cardId) => cardId === id).length;
}

function collectionTotal() {
  return Object.values(player.collection).reduce((sum, count) => sum + count, 0);
}

function toggleDeckCard(id) {
  const owned = player.collection[id] || 0;
  const inDeck = countInDeck(id);
  if (inDeck > 0 && (player.deck.length >= DECK_SIZE || inDeck === owned)) {
    player.deck.splice(player.deck.indexOf(id), 1);
  } else if (player.deck.length < DECK_SIZE && inDeck < owned) {
    player.deck.push(id);
  } else if (inDeck > 0) {
    player.deck.splice(player.deck.indexOf(id), 1);
  }
  save();
  renderSetup();
}

function autoDeck() {
  const candidates = [];
  cardCatalog
    .slice()
    .sort((a, b) => rarityRank[b.rarity] - rarityRank[a.rarity])
    .forEach((card) => {
      const owned = player.collection[card.id] || 0;
      const maxCopies = Math.min(owned, card.copies);
      for (let i = 0; i < maxCopies; i += 1) candidates.push(card.id);
    });
  player.deck = candidates.slice(0, DECK_SIZE);
  save();
  renderSetup();
}

function createEnemy() {
  const template = state.floor === 10 ? enemyTemplates[3] : sample(enemyTemplates.slice(0, 3));
  const scale = 1 + state.floor * 0.08;
  const maxHp = Math.round(template.hp * scale);
  const enemy = {
    ...template,
    maxHp,
    hp: maxHp,
    burn: 0,
    intent: null,
    weakened: false,
  };
  enemy.intent = nextIntent(enemy);
  return enemy;
}

function nextIntent(enemy) {
  const roll = Math.random();
  if (enemy.boss && roll < 0.25) return { type: "curse", text: "呪いを練っている", value: 5 };
  if (roll < 0.22) return { type: "guard", text: "身を固める", value: 8 };
  if (roll < 0.36) return { type: "curse", text: "呪詛を吐く", value: 3 };
  const value = rand(enemy.min, enemy.max) + Math.floor(state.floor / 3);
  return { type: "attack", text: `${value}の攻撃を構える`, value };
}

function reshuffleIfNeeded() {
  if (state.drawPile.length === 0) {
    state.drawPile = shuffle(state.discardPile);
    state.discardPile = [];
  }
}

function drawOne(preferAttack = false) {
  reshuffleIfNeeded();
  if (state.drawPile.length === 0) return null;
  if (preferAttack) {
    const index = state.drawPile.findIndex((id) => cardById(id).type === "attack");
    if (index >= 0) return cardById(state.drawPile.splice(index, 1)[0]);
  }
  return cardById(state.drawPile.shift());
}

function drawHand() {
  state.discardPile.push(...state.hand.map((card) => card.id));
  state.hand = [];
  for (let i = 0; i < 3; i += 1) {
    const card = drawOne(state.focus);
    if (card) state.hand.push(card);
  }
  state.focus = false;
}

function damageEnemy(s, amount, message) {
  s.enemy.hp = Math.max(0, s.enemy.hp - amount);
  s.log = message;
}

function applyEnemyTurn() {
  const enemy = state.enemy;
  if (enemy.hp <= 0) return winBattle();

  if (enemy.burn > 0) {
    enemy.hp = Math.max(0, enemy.hp - enemy.burn);
    enemy.burn -= 1;
    if (enemy.hp <= 0) return winBattle("火傷が妖怪を焼き尽くした。");
  }

  const intent = enemy.intent;
  if (intent.type === "attack") {
    const raw = enemy.weakened ? Math.max(1, intent.value - 5) : intent.value;
    const blocked = Math.min(state.block, raw);
    state.block -= blocked;
    const taken = raw - blocked;
    state.hp -= taken;
    state.log += taken > 0 ? ` 敵の一撃で${taken}受けた。` : " 結界が攻撃を防いだ。";
  }

  if (intent.type === "guard") {
    enemy.hp = Math.min(enemy.maxHp, enemy.hp + intent.value);
    state.log += " 妖怪は傷を塞いだ。";
  }

  if (intent.type === "curse") {
    state.burn += intent.value;
    state.log += " 呪いの火がまとわりつく。";
  }

  enemy.weakened = false;
  state.block = Math.max(0, state.block - 3);

  if (state.burn > 0) {
    state.hp -= state.burn;
    state.burn = Math.max(0, state.burn - 1);
  }

  if (state.hp <= 0) return endGame(false);

  enemy.intent = nextIntent(enemy);
  drawHand();
  renderGame();
}

function winBattle(message = "妖怪を祓った。") {
  const reward = state.enemy.boss ? 5 : rand(1, 3);
  state.souls += reward;
  state.waiting = true;
  state.log = `${message} 魂灯を${reward}得た。`;
  els.advanceButton.disabled = false;
  renderGame();
}

function nextFloor() {
  if (state.floor >= state.maxFloor) return endGame(true);
  state.floor += 1;
  state.block = 0;
  state.enemy = createEnemy();
  state.waiting = false;
  els.advanceButton.disabled = true;
  drawHand();
  state.log = state.floor === 10 ? "大鳥居の奥で、朽ち社の鬼が待つ。" : "次の夜へ踏み込んだ。";
  renderGame();
}

function rest() {
  if (state.waiting || state.souls < 2) return;
  state.souls -= 2;
  state.hp = Math.min(state.maxHp, state.hp + 14);
  state.burn = 0;
  state.log = "茶屋の湯気で傷と呪いがほどけた。";
  renderGame();
}

function playCard(index) {
  if (state.waiting) return;
  const card = state.hand.splice(index, 1)[0];
  state.discardPile.push(card.id);
  card.play(state);
  applyEnemyTurn();
}

function startRun() {
  if (player.deck.length !== DECK_SIZE) return;
  Object.assign(state, {
    floor: 1,
    hp: 42,
    maxHp: 42,
    block: 0,
    burn: 0,
    souls: 0,
    focus: false,
    drawPile: shuffle(player.deck),
    discardPile: [],
    hand: [],
    waiting: false,
    inRun: true,
    log: "鳥居の奥から妖気が流れ込む。妖札を選べ。",
  });
  state.enemy = createEnemy();
  drawHand();
  els.setupScreen.hidden = true;
  els.gameScreen.hidden = false;
  els.advanceButton.disabled = true;
  renderGame();
}

function backToSetup() {
  state.inRun = false;
  els.gameScreen.hidden = true;
  els.setupScreen.hidden = false;
  if (els.dialog.open) els.dialog.close();
  renderSetup();
}

function endGame(won) {
  state.waiting = true;
  renderGame();
  els.resultTitle.textContent = won ? "迷宮踏破" : "探索失敗";
  els.resultText.textContent = won
    ? `夜明けまで生き延び、魂灯を${state.souls}持ち帰った。デッキを磨けばさらに深く潜れる。`
    : `妖気に呑まれた。魂灯${Math.floor(state.souls / 2)}だけが手元に残った。`;
  if (!els.dialog.open) els.dialog.showModal();
}

function renderSetup() {
  els.collectionText.textContent = `所持 ${collectionTotal()}`;
  els.deckCountText.textContent = `デッキ ${player.deck.length} / ${DECK_SIZE}`;
  els.startRunButton.disabled = player.deck.length !== DECK_SIZE;
  els.deckHint.textContent =
    player.deck.length === DECK_SIZE
      ? "出撃できます。高レア札ほど強力ですが、攻撃/防御/回復のバランスも大切です。"
      : "20枚ちょうどで出撃できます。カードを押すとデッキに出し入れできます。";

  els.deckList.innerHTML = "";
  cardCatalog.forEach((card) => {
    const owned = player.collection[card.id] || 0;
    const inDeck = countInDeck(card.id);
    const button = document.createElement("button");
    button.type = "button";
    button.disabled = owned === 0;
    button.className = `deck-card ${card.type} ${card.rarity}`;
    button.innerHTML = `
      <span class="rarity ${card.rarity}">${rarityLabel[card.rarity]}</span>
      <strong>${card.name}</strong>
      <small>${card.text}</small>
      <em>所持 ${owned} / 編成 ${inDeck}</em>
    `;
    button.addEventListener("click", () => toggleDeckCard(card.id));
    els.deckList.appendChild(button);
  });
}

function renderGame() {
  const enemy = state.enemy;
  els.floorText.textContent = `${state.floor} / ${state.maxFloor}`;
  els.soulText.textContent = state.souls;
  els.enemyArt.src = `./assets/img/${enemy.art}.png`;
  els.enemyName.textContent = enemy.name;
  els.enemyHpText.textContent = `HP ${enemy.hp}/${enemy.maxHp}`;
  els.enemyHpBar.style.width = `${Math.max(0, (enemy.hp / enemy.maxHp) * 100)}%`;
  els.intentText.textContent = enemy.hp <= 0 ? "祓い済み" : enemy.intent.text;
  els.hpText.textContent = `HP ${Math.max(0, state.hp)}/${state.maxHp}`;
  els.hpBar.style.width = `${Math.max(0, (state.hp / state.maxHp) * 100)}%`;
  els.blockText.textContent = `結界 ${state.block}`;
  els.burnText.textContent = `呪火 ${state.burn}`;
  els.deckText.textContent = `山札 ${state.drawPile.length}`;
  els.logText.textContent = state.log;
  els.restButton.disabled = state.waiting || state.souls < 2 || state.hp >= state.maxHp;

  els.cards.innerHTML = "";
  state.hand.forEach((card, index) => {
    const button = document.createElement("button");
    button.className = `card ${card.type} ${card.rarity}`;
    button.type = "button";
    button.disabled = state.waiting;
    button.innerHTML = `
      <img src="./assets/img/card.png" alt="" />
      <span class="rarity ${card.rarity}">${rarityLabel[card.rarity]}</span>
      <strong>${card.name}</strong>
      <p>${card.text}</p>
      <span class="cost">${card.cost}</span>
    `;
    button.addEventListener("click", () => playCard(index));
    els.cards.appendChild(button);
  });
}

els.pullOneButton.addEventListener("click", () => pull(1));
els.pullTenButton.addEventListener("click", () => pull(10));
els.autoDeckButton.addEventListener("click", autoDeck);
els.startRunButton.addEventListener("click", startRun);
els.advanceButton.addEventListener("click", nextFloor);
els.restButton.addEventListener("click", rest);
els.restartButton.addEventListener("click", backToSetup);
els.dialogRestartButton.addEventListener("click", backToSetup);

if (player.deck.length < DECK_SIZE) autoDeck();
renderSetup();
