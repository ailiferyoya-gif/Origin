const cards = [
  {
    id: "slash",
    name: "斬札",
    type: "attack",
    cost: "攻撃",
    text: "敵に10ダメージ。結界があるなら+4。",
    play: (s) => damageEnemy(s, 10 + (s.block > 0 ? 4 : 0), "斬札が妖気を裂いた。"),
  },
  {
    id: "ward",
    name: "護符結界",
    type: "defense",
    cost: "防御",
    text: "結界を12得る。次の攻撃を受け止める。",
    play: (s) => {
      s.block += 12;
      s.log = "護符が淡く光り、結界が張られた。";
    },
  },
  {
    id: "bell",
    name: "祓い鈴",
    type: "spirit",
    cost: "回復",
    text: "HPを8回復。火傷と呪いを鎮める。",
    play: (s) => {
      s.hp = Math.min(s.maxHp, s.hp + 8);
      s.burn = 0;
      s.log = "鈴の音が響き、穢れが薄れていく。";
    },
  },
  {
    id: "flame",
    name: "狐火",
    type: "attack",
    cost: "継続",
    text: "敵に6ダメージ。火傷を3付与。",
    play: (s) => {
      damageEnemy(s, 6, "狐火が尾を引き、妖怪に燃え移った。");
      s.enemy.burn += 3;
    },
  },
  {
    id: "shikigami",
    name: "式神呼び",
    type: "spirit",
    cost: "召喚",
    text: "敵に4ダメージ。魂灯を1得る。",
    play: (s) => {
      damageEnemy(s, 4, "小さな式神が敵の懐へ飛び込んだ。");
      s.souls += 1;
    },
  },
  {
    id: "blood",
    name: "血墨の札",
    type: "attack",
    cost: "危険",
    text: "HPを4失い、敵に18ダメージ。",
    play: (s) => {
      s.hp = Math.max(1, s.hp - 4);
      damageEnemy(s, 18, "血墨の札が赤く滲み、大きな傷を刻んだ。");
    },
  },
  {
    id: "read",
    name: "見鬼",
    type: "defense",
    cost: "先読み",
    text: "結界を6得る。次の手札に攻撃札が出やすい。",
    play: (s) => {
      s.block += 6;
      s.focus = true;
      s.log = "敵の妖気の流れが読めた。";
    },
  },
  {
    id: "seal",
    name: "封じ札",
    type: "spirit",
    cost: "妨害",
    text: "敵に5ダメージ。敵の次の攻撃を弱める。",
    play: (s) => {
      damageEnemy(s, 5, "封じ札が敵の影を地面へ縫い止めた。");
      s.enemy.weakened = true;
    },
  },
];

const enemyTemplates = [
  { name: "狐面の灯", hp: 32, art: "yokai", min: 6, max: 10 },
  { name: "濡れ行灯", hp: 38, art: "yokai", min: 5, max: 12 },
  { name: "煤かぶり天狗", hp: 44, art: "yokai", min: 8, max: 13 },
  { name: "朽ち社の鬼", hp: 78, art: "boss", min: 11, max: 18, boss: true },
];

const state = {
  floor: 1,
  maxFloor: 10,
  hp: 42,
  maxHp: 42,
  block: 0,
  burn: 0,
  souls: 0,
  focus: false,
  hand: [],
  enemy: null,
  waiting: false,
  log: "",
};

const els = {
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

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sample(list) {
  return list[Math.floor(Math.random() * list.length)];
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

function drawHand() {
  const pool = state.focus ? cards.filter((card) => card.type === "attack").concat(cards) : cards;
  state.hand = Array.from({ length: 3 }, () => sample(pool));
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
    state.log += ` 呪いの火がまとわりつく。`;
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
  render();
}

function winBattle(message = "妖怪を祓った。") {
  const reward = state.enemy.boss ? 5 : rand(1, 3);
  state.souls += reward;
  state.waiting = true;
  state.log = `${message} 魂灯を${reward}得た。`;
  els.advanceButton.disabled = false;
  render();
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
  render();
}

function rest() {
  if (state.waiting || state.souls < 2) return;
  state.souls -= 2;
  state.hp = Math.min(state.maxHp, state.hp + 14);
  state.burn = 0;
  state.log = "茶屋の湯気で傷と呪いがほどけた。";
  render();
}

function playCard(index) {
  if (state.waiting) return;
  const card = state.hand[index];
  card.play(state);
  applyEnemyTurn();
}

function endGame(won) {
  state.waiting = true;
  render();
  els.resultTitle.textContent = won ? "迷宮踏破" : "探索失敗";
  els.resultText.textContent = won
    ? `夜明けまで生き延び、魂灯を${state.souls}持ち帰った。次はさらに深い怪異へ挑める。`
    : `妖気に呑まれた。魂灯${Math.floor(state.souls / 2)}だけが手元に残った。`;
  if (!els.dialog.open) els.dialog.showModal();
}

function restart() {
  Object.assign(state, {
    floor: 1,
    hp: 42,
    maxHp: 42,
    block: 0,
    burn: 0,
    souls: 0,
    focus: false,
    hand: [],
    waiting: false,
    log: "鳥居の奥から妖気が流れ込む。妖札を選べ。",
  });
  state.enemy = createEnemy();
  drawHand();
  els.advanceButton.disabled = true;
  if (els.dialog.open) els.dialog.close();
  render();
}

function render() {
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
  els.deckText.textContent = `手札 ${state.hand.length}`;
  els.logText.textContent = state.log;
  els.restButton.disabled = state.waiting || state.souls < 2 || state.hp >= state.maxHp;

  els.cards.innerHTML = "";
  state.hand.forEach((card, index) => {
    const button = document.createElement("button");
    button.className = `card ${card.type}`;
    button.type = "button";
    button.disabled = state.waiting;
    button.innerHTML = `
      <img src="./assets/img/card.png" alt="" />
      <strong>${card.name}</strong>
      <p>${card.text}</p>
      <span class="cost">${card.cost}</span>
    `;
    button.addEventListener("click", () => playCard(index));
    els.cards.appendChild(button);
  });
}

els.advanceButton.addEventListener("click", nextFloor);
els.restButton.addEventListener("click", rest);
els.restartButton.addEventListener("click", restart);
els.dialogRestartButton.addEventListener("click", restart);

restart();
