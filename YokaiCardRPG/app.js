const SAVE_KEY = "yokai-card-rpg-v2";
const DECK_MIN = 20;
const DECK_MAX = 30;

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
    sprite: 0,
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
    sprite: 1,
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
    sprite: 2,
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
    sprite: 3,
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
    sprite: 4,
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
    sprite: 5,
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
    sprite: 6,
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
    sprite: 7,
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
    sprite: 8,
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
    sprite: 9,
    play: (s) => {
      s.block += 18;
      damageEnemy(s, 8, "鏡面に妖気が跳ね返り、敵へ突き刺さった。");
    },
  },
  {
    id: "thunder",
    name: "雷鼓",
    rarity: "R",
    type: "attack",
    cost: "連撃",
    text: "敵に9ダメージ。結界があればさらに4。",
    copies: 4,
    sprite: 0,
    sheet: 2,
    play: (s) => damageEnemy(s, 9 + (s.block > 0 ? 4 : 0), "雷鼓が鳴り、妖気を震わせた。"),
  },
  {
    id: "snow",
    name: "雪女の守",
    rarity: "R",
    type: "defense",
    cost: "冷気",
    text: "結界を9得る。敵の攻撃を少し弱める。",
    copies: 4,
    sprite: 1,
    sheet: 2,
    play: (s) => {
      s.block += 9;
      s.enemy.weakened = true;
      s.log = "雪の守りが敵の熱を奪った。";
    },
  },
  {
    id: "fan",
    name: "天狗扇",
    rarity: "SR",
    type: "attack",
    cost: "風",
    text: "敵に15ダメージ。次の手札に攻撃札を呼ぶ。",
    copies: 3,
    sprite: 2,
    sheet: 2,
    play: (s) => {
      damageEnemy(s, 15, "天狗扇の突風が敵を吹き飛ばした。");
      s.focus = true;
    },
  },
  {
    id: "kappa",
    name: "河童甲羅",
    rarity: "N",
    type: "defense",
    cost: "防御",
    text: "結界を8得る。HPを3回復。",
    copies: 8,
    sprite: 3,
    sheet: 2,
    play: (s) => {
      s.block += 8;
      s.hp = Math.min(s.maxHp, s.hp + 3);
      s.log = "河童の甲羅が水音とともに身を守った。";
    },
  },
  {
    id: "thread",
    name: "蜘蛛糸",
    rarity: "R",
    type: "spirit",
    cost: "拘束",
    text: "敵に5ダメージ。次の敵行動を弱める。",
    copies: 4,
    sprite: 4,
    sheet: 2,
    play: (s) => {
      damageEnemy(s, 5, "蜘蛛糸が敵の足元を絡め取った。");
      s.enemy.weakened = true;
    },
  },
  {
    id: "straw",
    name: "藁人形",
    rarity: "SR",
    type: "attack",
    cost: "呪詛",
    text: "敵に13ダメージ。火傷を5付与。",
    copies: 3,
    sprite: 5,
    sheet: 2,
    play: (s) => {
      damageEnemy(s, 13, "藁人形の釘が見えない痛みを走らせた。");
      s.enemy.burn += 5;
    },
  },
  {
    id: "kagura",
    name: "神楽扇",
    rarity: "SR",
    type: "spirit",
    cost: "祝詞",
    text: "HPを12回復。魂灯を1得る。",
    copies: 3,
    sprite: 6,
    sheet: 2,
    play: (s) => {
      s.hp = Math.min(s.maxHp, s.hp + 12);
      s.souls += 1;
      s.log = "神楽の舞が傷を閉じ、魂灯を揺らした。";
    },
  },
  {
    id: "foxmask",
    name: "黒狐面",
    rarity: "SSR",
    type: "attack",
    cost: "幻惑",
    text: "敵に22ダメージ。敵の攻撃を弱める。",
    copies: 2,
    sprite: 7,
    sheet: 2,
    play: (s) => {
      damageEnemy(s, 22, "黒狐面が敵の視界を奪い、刃を通した。");
      s.enemy.weakened = true;
    },
  },
  {
    id: "dragon",
    name: "龍珠",
    rarity: "SSR",
    type: "attack",
    cost: "秘宝",
    text: "敵に18ダメージ。結界を12得る。",
    copies: 2,
    sprite: 8,
    sheet: 2,
    play: (s) => {
      damageEnemy(s, 18, "龍珠が脈打ち、雷光と結界を放った。");
      s.block += 12;
    },
  },
  {
    id: "sunrise",
    name: "朝祓い",
    rarity: "SSR",
    type: "spirit",
    cost: "浄化",
    text: "HPを15回復。呪火を消し、敵に10ダメージ。",
    copies: 2,
    sprite: 9,
    sheet: 2,
    play: (s) => {
      s.hp = Math.min(s.maxHp, s.hp + 15);
      s.burn = 0;
      damageEnemy(s, 10, "朝の光が穢れを焼き払い、敵を退けた。");
    },
  },
];

const characterCatalog = [
  { id: "exorcist", name: "祓い師", art: "hero.png", hp: 42, trait: "均衡", bonus: "初期結界+4。攻防の基準型。" },
  { id: "miko", name: "神楽巫女", art: "char-miko.png", hp: 46, trait: "神楽", bonus: "回復札の回復量+4。呪火に強い。" },
  { id: "hunter", name: "狐面狩人", art: "char-hunter.png", hp: 40, trait: "狩猟", bonus: "攻撃札のダメージ+15%。高火力型。" },
  { id: "onmyoji", name: "式神陰陽師", art: "char-onmyoji.png", hp: 44, trait: "式占", bonus: "召喚/妨害札が追加で敵を削る。" },
  { id: "crystal", name: "晶刃くノ一", art: "char-crystal.png", hp: 38, trait: "疾駆", bonus: "手札4枚。HPは低いが選択肢が多い。" },
];

const enemyTemplates = [
  { name: "狐面の灯", hp: 32, art: "yokai", min: 6, max: 10 },
  { name: "濡れ行灯", hp: 38, art: "yokai", min: 5, max: 12 },
  { name: "煤かぶり天狗", hp: 44, art: "yokai", min: 8, max: 13 },
  { name: "傘目入道", hp: 42, art: "enemy-umbrella", min: 7, max: 12 },
  { name: "骨法師", hp: 48, art: "enemy-monk", min: 8, max: 14 },
  { name: "槍河童", hp: 45, art: "enemy-kappa", min: 7, max: 13 },
];

const bossTemplates = [
  { name: "朽ち社の鬼", hp: 86, art: "boss", min: 12, max: 19, boss: true },
  { name: "九尾の社后", hp: 96, art: "boss-kitsune", min: 11, max: 20, boss: true },
  { name: "嵐天狗大将", hp: 104, art: "boss-tengu", min: 13, max: 21, boss: true },
];

const player = normalizeSave(loadSave());

const state = {
  setupView: "gacha",
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
  showGachaButton: document.querySelector("#showGachaButton"),
  showDeckButton: document.querySelector("#showDeckButton"),
  gachaPanel: document.querySelector("#gachaPanel"),
  deckPanel: document.querySelector("#deckPanel"),
  collectionText: document.querySelector("#collectionText"),
  deckCountText: document.querySelector("#deckCountText"),
  characterList: document.querySelector("#characterList"),
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
  heroArt: document.querySelector("#heroArt"),
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
    deck: deck.slice(0, DECK_MAX),
    characterId: characterCatalog.some((item) => item.id === raw.characterId) ? raw.characterId : "exorcist",
  };
}

function save() {
  localStorage.setItem(SAVE_KEY, JSON.stringify(player));
}

function cardById(id) {
  return cardCatalog.find((card) => card.id === id);
}

function spriteStyle(card) {
  const index = card.sprite || 0;
  const x = index % 5;
  const y = Math.floor(index / 5);
  return `--sx:${x};--sy:${y}`;
}

function cardArt(card, className = "card-art") {
  const sheetClass = card.sheet === 2 ? " sheet2" : "";
  return `<span class="${className}${sheetClass}" style="${spriteStyle(card)}"></span>`;
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
  els.gachaResult.classList.add("result-grid");
  els.gachaResult.innerHTML = results
    .map(
      (card) => `
        <article class="result-card ${card.rarity}">
          ${cardArt(card)}
          <span class="rarity ${card.rarity}">${rarityLabel[card.rarity]}</span>
          <strong>${card.name}</strong>
        </article>
      `,
    )
    .join("");
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
  const maxCopies = Math.min(owned, cardById(id).copies);
  if (player.deck.length < DECK_MAX && inDeck < maxCopies) {
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
  player.deck = candidates.slice(0, Math.min(DECK_MAX, Math.max(DECK_MIN, candidates.length)));
  save();
  renderSetup();
}

function createEnemy() {
  const template = state.floor % 5 === 0 ? sample(bossTemplates) : sample(enemyTemplates);
  const scale = 1 + state.floor * 0.08;
  const bossBoost = state.floor === 10 && template.boss ? 1.18 : 1;
  const maxHp = Math.round(template.hp * scale * bossBoost);
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
  for (let i = 0; i < handSize(); i += 1) {
    const card = drawOne(state.focus);
    if (card) state.hand.push(card);
  }
  state.focus = false;
}

function damageEnemy(s, amount, message) {
  const finalAmount = Math.max(1, Math.round(amount * (s.damageMultiplier || 1)));
  s.enemy.hp = Math.max(0, s.enemy.hp - finalAmount);
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
    const curseValue = selectedCharacter().id === "miko" ? Math.max(1, intent.value - 1) : intent.value;
    state.burn += curseValue;
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
  const character = selectedCharacter();
  const beforeHp = state.hp;
  state.discardPile.push(card.id);
  state.damageMultiplier = character.id === "hunter" && card.type === "attack" ? 1.15 : 1;
  card.play(state);
  state.damageMultiplier = 1;
  applyCharacterCardTrait(character, card, beforeHp);
  applyEnemyTurn();
}

function startRun() {
  if (!canStartRun()) return;
  const character = selectedCharacter();
  Object.assign(state, {
    floor: 1,
    hp: character.hp,
    maxHp: character.hp,
    block: 0,
    burn: 0,
    souls: 0,
    focus: false,
    drawPile: shuffle(player.deck),
    discardPile: [],
    hand: [],
    damageMultiplier: 1,
    waiting: false,
    inRun: true,
    log: "鳥居の奥から妖気が流れ込む。妖札を選べ。",
  });
  applyCharacterStartTrait(character);
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
  setSetupView(state.setupView);
  els.collectionText.textContent = `所持 ${collectionTotal()}`;
  els.deckCountText.textContent = `札組 ${player.deck.length}/${DECK_MIN}-${DECK_MAX}`;
  els.startRunButton.disabled = !canStartRun();
  els.deckHint.textContent =
    canStartRun()
      ? "出撃できます。20〜30枚の範囲で、カードを押すと追加、満杯時は減らせます。"
      : "20枚以上で出撃できます。カードを押すとデッキに追加、満杯時は同カードを減らします。";

  renderCharacters();
  els.deckList.innerHTML = "";
  cardCatalog.forEach((card) => {
    const owned = player.collection[card.id] || 0;
    const inDeck = countInDeck(card.id);
    const button = document.createElement("button");
    button.type = "button";
    button.disabled = owned === 0;
    button.className = `deck-card ${card.type} ${card.rarity}`;
    button.innerHTML = `
      ${cardArt(card, "deck-art")}
      <span class="rarity ${card.rarity}">${rarityLabel[card.rarity]}</span>
      <strong>${card.name}</strong>
      <small>${card.text}</small>
      <em>所持 ${owned} / 編成 ${inDeck} / 上限 ${Math.min(owned, card.copies)}</em>
    `;
    button.addEventListener("click", () => toggleDeckCard(card.id));
    els.deckList.appendChild(button);
  });
}

function setSetupView(view) {
  state.setupView = view;
  els.gachaPanel.hidden = view !== "gacha";
  els.deckPanel.hidden = view !== "deck";
  els.showGachaButton.classList.toggle("active", view === "gacha");
  els.showDeckButton.classList.toggle("active", view === "deck");
}

function renderGame() {
  const enemy = state.enemy;
  const character = selectedCharacter();
  els.floorText.textContent = `${state.floor} / ${state.maxFloor}`;
  els.soulText.textContent = state.souls;
  els.enemyArt.src = `./assets/img/${enemy.art}.png`;
  els.heroArt.src = `./assets/img/${character.art}`;
  els.heroArt.alt = character.name;
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
      ${cardArt(card)}
      <span class="rarity ${card.rarity}">${rarityLabel[card.rarity]}</span>
      <strong>${card.name}</strong>
      <p>${card.text}</p>
      <span class="cost">${card.cost}</span>
    `;
    button.addEventListener("click", () => playCard(index));
    els.cards.appendChild(button);
  });
}

function selectedCharacter() {
  return characterCatalog.find((item) => item.id === player.characterId) || characterCatalog[0];
}

function canStartRun() {
  return player.deck.length >= DECK_MIN && player.deck.length <= DECK_MAX;
}

function handSize() {
  return selectedCharacter().id === "crystal" ? 4 : 3;
}

function applyCharacterStartTrait(character) {
  if (character.id === "exorcist") {
    state.block += 4;
    state.log = "祓い師の均衡で結界を4張った。妖札を選べ。";
  }
}

function applyCharacterCardTrait(character, card, beforeHp) {
  if (character.id === "miko" && state.hp > beforeHp) {
    state.hp = Math.min(state.maxHp, state.hp + 4);
    state.log += " 神楽でさらに4回復。";
  }

  if (character.id === "onmyoji" && card.type === "spirit" && state.enemy.hp > 0) {
    state.enemy.hp = Math.max(0, state.enemy.hp - 4);
    state.log += " 式占の追撃が4削った。";
  }
}

function renderCharacters() {
  els.characterList.innerHTML = "";
  characterCatalog.forEach((character) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `character-card ${character.id === player.characterId ? "selected" : ""}`;
    button.innerHTML = `
      <img src="./assets/img/${character.art}" alt="" />
      <strong>${character.name}</strong>
      <em>${character.trait}</em>
      <span>HP ${character.hp} / ${character.bonus}</span>
    `;
    button.addEventListener("click", () => {
      player.characterId = character.id;
      save();
      renderSetup();
    });
    els.characterList.appendChild(button);
  });
}

els.showGachaButton.addEventListener("click", () => setSetupView("gacha"));
els.showDeckButton.addEventListener("click", () => setSetupView("deck"));
els.pullOneButton.addEventListener("click", () => pull(1));
els.pullTenButton.addEventListener("click", () => pull(10));
els.autoDeckButton.addEventListener("click", autoDeck);
els.startRunButton.addEventListener("click", startRun);
els.advanceButton.addEventListener("click", nextFloor);
els.restButton.addEventListener("click", rest);
els.restartButton.addEventListener("click", backToSetup);
els.dialogRestartButton.addEventListener("click", backToSetup);

if (player.deck.length < DECK_MIN) autoDeck();
renderSetup();
