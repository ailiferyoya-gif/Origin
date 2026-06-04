const SAVE_VERSION = 5;

const assets = {
  hero: "./assets/dark-hero.png",
  allyHeir: "./assets/allies/heir.png",
  allyBloodKnight: "./assets/allies/blood-knight.png",
  allyAshWitch: "./assets/allies/ash-witch.png",
  allyGraveHunter: "./assets/allies/grave-hunter.png",
  allyIronNun: "./assets/allies/iron-nun.png",
  allyCursedPrince: "./assets/allies/cursed-prince.png",
  weak: "./assets/abyss-hound.png",
  ember: "./assets/ember-beast.png",
  frost: "./assets/frost-wraith.png",
  strong: "./assets/grave-lich.png",
  loot: "./assets/cursed-loot.png",
};

const sfxFiles = {
  attack: "./assets/audio/attack.ogg",
  skill: "./assets/audio/skill.ogg",
  guard: "./assets/audio/guard.ogg",
  potion: "./assets/audio/potion.ogg",
  hit: "./assets/audio/hit.ogg",
  victory: "./assets/audio/victory.ogg",
  equip: "./assets/audio/equip.ogg",
  sell: "./assets/audio/sell.ogg",
  death: "./assets/audio/death.ogg",
};

const audioState = {
  enabled: true,
  unlocked: false,
  sounds: {},
};

const playableCharacters = [
  { id: "heir", tier: "梅", name: "黒衣の継承者", cost: 0, image: assets.allyHeir, text: "標準的な探索者。装備の癖を受け止めやすい。", mods: { maxHp: 0, maxMp: 0, atk: 0, def: 0, crit: 0, drain: 0 } },
  { id: "bloodKnight", tier: "梅", name: "血誓の騎士", cost: 45, image: assets.allyBloodKnight, text: "硬く、序盤の事故を抑える梅ランクの守護役。", mods: { maxHp: 38, maxMp: -2, atk: 4, def: 8, crit: -2, drain: 1 } },
  { id: "ashMage", tier: "竹", name: "灰燼の魔女", cost: 120, image: assets.allyAshWitch, text: "魂火の火力が大きく伸びる竹ランクの術師。", mods: { maxHp: -4, maxMp: 28, atk: 12, def: 1, crit: 6, drain: 0 } },
  { id: "graveHunter", tier: "竹", name: "墓荒らしの狩人", cost: 160, image: assets.allyGraveHunter, text: "会心と吸血で装備運を爆発力に変える竹ランク。", mods: { maxHp: 12, maxMp: 8, atk: 10, def: 2, crit: 18, drain: 9 } },
  { id: "ironNun", tier: "松", name: "黒鉄の修道女", cost: 320, image: assets.allyIronNun, text: "防御、MP、吸血を兼ね備えた松ランクの安定枠。", mods: { maxHp: 55, maxMp: 20, atk: 5, def: 14, crit: 0, drain: 8 } },
  { id: "cursedPrince", tier: "松", name: "呪血の王子", cost: 480, image: assets.allyCursedPrince, text: "高攻撃、高会心、高吸血。頑張って解放する松ランクの切り札。", mods: { maxHp: 34, maxMp: 16, atk: 22, def: 4, crit: 20, drain: 15 } },
];

const normalEnemies = [
  { name: "痩せた墓鼠", tier: 1, hp: 18, atk: 4, def: 0, intent: "噛みつく" },
  { name: "煤けた小鬼", tier: 1, hp: 22, atk: 5, def: 0, intent: "石を投げる" },
  { name: "腐肉の蛆塊", tier: 1, hp: 26, atk: 4, def: 1, intent: "まとわりつく" },
  { name: "骨拾いの盗賊", tier: 1, hp: 28, atk: 6, def: 1, intent: "短剣で刺す" },
  { name: "灰羽の蝙蝠", tier: 1, hp: 24, atk: 7, def: 0, intent: "吸血する" },
  { name: "墓場の野犬", tier: 1, hp: 32, atk: 7, def: 1, intent: "喰らいつく" },
  { name: "錆鎧の亡者", tier: 2, hp: 38, atk: 8, def: 2, intent: "斧を振るう" },
  { name: "黒泥の這行者", tier: 2, hp: 42, atk: 7, def: 3, intent: "泥を吐く" },
  { name: "裂け角の獣", tier: 2, hp: 45, atk: 9, def: 2, intent: "角で突く" },
  { name: "呪灯の従者", tier: 2, hp: 40, atk: 10, def: 2, intent: "呪火を飛ばす" },
  { name: "血錆の槍兵", tier: 2, hp: 48, atk: 10, def: 3, intent: "槍を構える" },
  { name: "穴蔵の魔女", tier: 2, hp: 44, atk: 11, def: 2, intent: "毒を煮る" },
  { name: "鉄牙の猟犬", tier: 3, hp: 56, atk: 12, def: 3, intent: "喉を狙う" },
  { name: "棺桶背負い", tier: 3, hp: 64, atk: 11, def: 5, intent: "棺を叩きつける" },
  { name: "硝子眼の司祭", tier: 3, hp: 58, atk: 13, def: 4, intent: "祈りを歪める" },
  { name: "黒翼の処刑人", tier: 3, hp: 62, atk: 14, def: 4, intent: "大鎌を払う" },
  { name: "骸骨騎士", tier: 3, hp: 70, atk: 13, def: 6, intent: "剣を突き出す" },
  { name: "血月の狩人", tier: 3, hp: 66, atk: 15, def: 4, intent: "狙い撃つ" },
  { name: "腐敗した巨兵", tier: 4, hp: 82, atk: 16, def: 7, intent: "踏み潰す" },
  { name: "泣き顔の悪魔", tier: 4, hp: 76, atk: 18, def: 5, intent: "爪を立てる" },
  { name: "霊廟のリッチ", tier: 4, hp: 78, atk: 19, def: 6, intent: "死霊を呼ぶ" },
  { name: "黒鉄の番人", tier: 4, hp: 90, atk: 17, def: 9, intent: "盾で潰す" },
  { name: "飢えた魔剣", tier: 4, hp: 84, atk: 20, def: 6, intent: "刃を踊らせる" },
  { name: "双頭の奈落狼", tier: 4, hp: 88, atk: 21, def: 7, intent: "二つの牙で裂く" },
  { name: "深淵の告死鳥", tier: 5, hp: 104, atk: 23, def: 8, intent: "黒羽を降らす" },
  { name: "王墓の竜骸", tier: 5, hp: 118, atk: 24, def: 10, intent: "骨炎を吐く" },
  { name: "虚無を抱く聖女", tier: 5, hp: 108, atk: 26, def: 9, intent: "祈りを反転する" },
  { name: "呪血の大公", tier: 5, hp: 124, atk: 27, def: 10, intent: "血契を刻む" },
  { name: "星喰らいの影", tier: 5, hp: 132, atk: 29, def: 11, intent: "光を奪う" },
  { name: "奈落の門番", tier: 5, hp: 145, atk: 31, def: 12, intent: "門斧を下ろす" },
  { name: "白骨の司書", tier: 6, hp: 158, atk: 32, def: 13, intent: "禁書を開く" },
  { name: "燭台を抱く巨人", tier: 6, hp: 172, atk: 34, def: 14, intent: "灯火で焼く" },
  { name: "黒水晶の蛆母", tier: 6, hp: 166, atk: 35, def: 13, intent: "結晶毒を吐く" },
  { name: "断頭台の聖騎士", tier: 6, hp: 180, atk: 36, def: 16, intent: "首を狙う" },
  { name: "無貌の嘆願者", tier: 6, hp: 170, atk: 38, def: 14, intent: "名を奪う" },
  { name: "灰冠の獣王", tier: 6, hp: 192, atk: 39, def: 16, intent: "王爪を振るう" },
  { name: "影縫いの暗殺者", tier: 7, hp: 188, atk: 42, def: 15, intent: "影を縫う" },
  { name: "墓鐘の天使", tier: 7, hp: 205, atk: 41, def: 18, intent: "鐘を鳴らす" },
  { name: "血濡れの合成獣", tier: 7, hp: 218, atk: 43, def: 17, intent: "肉を裂く" },
  { name: "黒沼の竜信徒", tier: 7, hp: 210, atk: 45, def: 18, intent: "竜語を唱える" },
  { name: "夜葬の騎兵", tier: 7, hp: 226, atk: 46, def: 19, intent: "突撃する" },
  { name: "虚ろな太陽神官", tier: 7, hp: 214, atk: 48, def: 18, intent: "光を腐らせる" },
  { name: "血晶の魔将", tier: 8, hp: 240, atk: 50, def: 21, intent: "晶剣を砕く" },
  { name: "骨翼の竜騎士", tier: 8, hp: 258, atk: 52, def: 22, intent: "骨翼で薙ぐ" },
  { name: "古王の影武者", tier: 8, hp: 250, atk: 54, def: 23, intent: "王剣を真似る" },
  { name: "棺海の漁師", tier: 8, hp: 246, atk: 55, def: 21, intent: "棺針を投げる" },
  { name: "魂喰いの双生児", tier: 8, hp: 268, atk: 57, def: 22, intent: "魂を分け合う" },
  { name: "終末の黒山羊", tier: 9, hp: 286, atk: 60, def: 25, intent: "角で空を裂く" },
  { name: "深淵を映す鏡", tier: 9, hp: 276, atk: 63, def: 24, intent: "傷を映す" },
  { name: "千年墓の守護者", tier: 9, hp: 310, atk: 66, def: 28, intent: "墓門を閉ざす" },
];

const bossTemplates = [
  { name: "10F Boss: 腐王グレイヴ", hp: 150, atk: 19, def: 8, intent: "王笏を振り下ろす" },
  { name: "20F Boss: 血月の魔女", hp: 260, atk: 31, def: 13, intent: "血月の呪いを放つ" },
  { name: "30F Boss: 黒冠の竜骸", hp: 420, atk: 46, def: 20, intent: "黒炎を吐く" },
  { name: "40F Boss: 奈落司教オルド", hp: 620, atk: 62, def: 28, intent: "魂を裁く" },
  { name: "50F Boss: 深淵王ノクス", hp: 860, atk: 82, def: 38, intent: "世界を閉じる" },
];

const enemyVisuals = [
  { image: assets.weak, filter: "drop-shadow(0 20px 20px rgba(0,0,0,.52)) hue-rotate(-28deg) saturate(.72) brightness(.82)", scale: 0.74 },
  { image: assets.ember, filter: "drop-shadow(0 20px 20px rgba(0,0,0,.52)) hue-rotate(18deg) saturate(.95) brightness(.72)", scale: 0.7 },
  { image: assets.frost, filter: "drop-shadow(0 20px 20px rgba(0,0,0,.52)) hue-rotate(140deg) saturate(.7) brightness(.85)", scale: 0.68 },
  { image: assets.strong, filter: "drop-shadow(0 20px 20px rgba(0,0,0,.52)) hue-rotate(-55deg) saturate(.6) brightness(.7)", scale: 0.66 },
  { image: assets.frost, filter: "drop-shadow(0 20px 20px rgba(0,0,0,.52)) hue-rotate(210deg) saturate(.8) brightness(.88)", scale: 0.64 },
  { image: assets.weak, filter: "drop-shadow(0 20px 20px rgba(0,0,0,.52)) hue-rotate(8deg) saturate(1.1) brightness(.9)", scale: 0.78 },
  { image: assets.strong, filter: "drop-shadow(0 20px 20px rgba(0,0,0,.55)) hue-rotate(-18deg) saturate(.9) brightness(.78)", scale: 0.74 },
  { image: assets.ember, filter: "drop-shadow(0 20px 20px rgba(0,0,0,.55)) hue-rotate(80deg) saturate(.55) brightness(.65)", scale: 0.82 },
  { image: assets.weak, filter: "drop-shadow(0 20px 20px rgba(0,0,0,.55)) hue-rotate(34deg) saturate(1.35) brightness(.84)", scale: 0.88 },
  { image: assets.frost, filter: "drop-shadow(0 20px 20px rgba(0,0,0,.55)) hue-rotate(260deg) saturate(1.15) brightness(.88)", scale: 0.78 },
  { image: assets.strong, filter: "drop-shadow(0 20px 20px rgba(0,0,0,.55)) hue-rotate(16deg) saturate(.95) brightness(.84)", scale: 0.86 },
  { image: assets.frost, filter: "drop-shadow(0 20px 20px rgba(0,0,0,.55)) hue-rotate(300deg) saturate(.86) brightness(.78)", scale: 0.82 },
  { image: assets.weak, filter: "drop-shadow(0 22px 22px rgba(0,0,0,.58)) hue-rotate(0deg) saturate(1.2) brightness(.95)", scale: 0.94 },
  { image: assets.ember, filter: "drop-shadow(0 22px 22px rgba(0,0,0,.58)) hue-rotate(-44deg) saturate(.8) brightness(.76)", scale: 0.9 },
  { image: assets.strong, filter: "drop-shadow(0 22px 22px rgba(0,0,0,.58)) hue-rotate(205deg) saturate(.82) brightness(.92)", scale: 0.86 },
  { image: assets.strong, filter: "drop-shadow(0 22px 22px rgba(0,0,0,.58)) hue-rotate(-8deg) saturate(1.15) brightness(.82)", scale: 0.94 },
  { image: assets.frost, filter: "drop-shadow(0 22px 22px rgba(0,0,0,.58)) hue-rotate(185deg) saturate(.65) brightness(.8)", scale: 0.92 },
  { image: assets.weak, filter: "drop-shadow(0 22px 22px rgba(0,0,0,.58)) hue-rotate(330deg) saturate(1.25) brightness(.86)", scale: 0.96 },
  { image: assets.ember, filter: "drop-shadow(0 24px 24px rgba(0,0,0,.62)) hue-rotate(8deg) saturate(1.4) brightness(.92)", scale: 1.0 },
  { image: assets.weak, filter: "drop-shadow(0 24px 24px rgba(0,0,0,.62)) hue-rotate(275deg) saturate(1.1) brightness(.78)", scale: 1.0 },
  { image: assets.strong, filter: "drop-shadow(0 24px 24px rgba(0,0,0,.62)) hue-rotate(258deg) saturate(1.15) brightness(.9)", scale: 1.0 },
  { image: assets.ember, filter: "drop-shadow(0 24px 24px rgba(0,0,0,.62)) hue-rotate(150deg) saturate(.55) brightness(.75)", scale: 1.04 },
  { image: assets.frost, filter: "drop-shadow(0 24px 24px rgba(0,0,0,.62)) hue-rotate(318deg) saturate(1.3) brightness(.88)", scale: 1.04 },
  { image: assets.weak, filter: "drop-shadow(0 24px 24px rgba(0,0,0,.62)) hue-rotate(20deg) saturate(1.5) brightness(.9)", scale: 1.06 },
  { image: assets.strong, filter: "drop-shadow(0 26px 26px rgba(0,0,0,.66)) hue-rotate(220deg) saturate(1.2) brightness(.8)", scale: 1.08 },
  { image: assets.ember, filter: "drop-shadow(0 26px 26px rgba(0,0,0,.66)) hue-rotate(40deg) saturate(1.55) brightness(.95)", scale: 1.12 },
  { image: assets.frost, filter: "drop-shadow(0 26px 26px rgba(0,0,0,.66)) hue-rotate(245deg) saturate(.95) brightness(.96)", scale: 1.1 },
  { image: assets.strong, filter: "drop-shadow(0 26px 26px rgba(0,0,0,.66)) hue-rotate(335deg) saturate(1.35) brightness(.9)", scale: 1.14 },
  { image: assets.frost, filter: "drop-shadow(0 26px 26px rgba(0,0,0,.66)) hue-rotate(110deg) saturate(.75) brightness(.82)", scale: 1.16 },
  { image: assets.strong, filter: "drop-shadow(0 28px 28px rgba(0,0,0,.7)) hue-rotate(12deg) saturate(1.4) brightness(.95)", scale: 1.18 },
];

const bossVisuals = [
  { image: assets.strong, filter: "drop-shadow(0 30px 30px rgba(0,0,0,.72)) hue-rotate(10deg) saturate(1.25) brightness(.96)", scale: 1.14 },
  { image: assets.frost, filter: "drop-shadow(0 30px 30px rgba(0,0,0,.72)) hue-rotate(300deg) saturate(1.4) brightness(.96)", scale: 1.16 },
  { image: assets.ember, filter: "drop-shadow(0 32px 32px rgba(0,0,0,.76)) hue-rotate(28deg) saturate(1.7) brightness(1)", scale: 1.2 },
  { image: assets.strong, filter: "drop-shadow(0 32px 32px rgba(0,0,0,.76)) hue-rotate(245deg) saturate(1.1) brightness(.96)", scale: 1.2 },
  { image: assets.strong, filter: "drop-shadow(0 34px 34px rgba(0,0,0,.8)) hue-rotate(340deg) saturate(1.55) brightness(1.02)", scale: 1.24 },
];

const goals = [
  { id: "first_kill", title: "最初の血", detail: "敵を1体倒す", reward: { ash: 5 }, done: (meta) => meta.kills >= 1 },
  { id: "ten_kills", title: "墓荒らし", detail: "敵を10体倒す", reward: { ash: 18 }, done: (meta) => meta.kills >= 10 },
  { id: "first_boss", title: "王の首", detail: "ボスを1体倒す", reward: { ash: 45 }, done: (meta) => meta.bossKills >= 1 },
  { id: "floor_10", title: "十層踏破", detail: "最高到達階層11以上", reward: { ash: 35, gold: 120 }, done: (meta) => meta.bestFloor >= 11 },
  { id: "gold_500", title: "血塗れの財布", detail: "累計500Gを獲得", reward: { ash: 28 }, done: (meta) => meta.totalGold >= 500 },
  { id: "bestiary_10", title: "影の観察者", detail: "敵図鑑を10種埋める", reward: { ash: 38 }, done: (meta) => Object.keys(meta.seenEnemies).length >= 10 },
  { id: "legendary", title: "伝説の匂い", detail: "伝説装備を1つ発見", reward: { ash: 70 }, done: (meta) => meta.legendaryFound >= 1 },
  { id: "boss_3", title: "王殺し", detail: "ボスを3体倒す", reward: { ash: 120 }, done: (meta) => meta.bossKills >= 3 },
  { id: "floor_30", title: "三十層踏破", detail: "最高到達階層31以上", reward: { ash: 160, gold: 400 }, done: (meta) => meta.bestFloor >= 31 },
];

const rarities = [
  { key: "common", name: "粗悪", color: "#b8b3aa", power: 1, sell: 8 },
  { key: "uncommon", name: "良質", color: "#72d38b", power: 1.35, sell: 18 },
  { key: "rare", name: "希少", color: "#68b7ff", power: 1.85, sell: 36 },
  { key: "epic", name: "呪刻", color: "#b987ff", power: 2.55, sell: 72 },
  { key: "legendary", name: "伝説", color: "#f1c86b", power: 3.45, sell: 140 },
];

const slots = { weapon: "武器", armor: "防具", charm: "護符" };
const statLabels = { maxHp: "HP", maxMp: "MP", atk: "攻撃", def: "防御", crit: "会心", drain: "吸血" };

const els = {
  floor: document.querySelector("#floorText"),
  bestFloor: document.querySelector("#bestFloorText"),
  gold: document.querySelector("#goldText"),
  ash: document.querySelector("#ashText"),
  enemyName: document.querySelector("#enemyName"),
  enemyIntent: document.querySelector("#enemyIntent"),
  enemyHpBar: document.querySelector("#enemyHpBar"),
  enemyHpText: document.querySelector("#enemyHpText"),
  enemyImage: document.querySelector("#enemyImage"),
  heroHpText: document.querySelector("#heroHpText"),
  heroMpText: document.querySelector("#heroMpText"),
  heroHpBar: document.querySelector("#heroHpBar"),
  heroMpBar: document.querySelector("#heroMpBar"),
  level: document.querySelector("#levelText"),
  expText: document.querySelector("#expText"),
  statsText: document.querySelector("#statsText"),
  equipText: document.querySelector("#equipText"),
  lootPanel: document.querySelector("#lootPanel"),
  lootChoices: document.querySelector("#lootChoices"),
  deathPanel: document.querySelector("#deathPanel"),
  deathText: document.querySelector("#deathText"),
  upgradeChoices: document.querySelector("#upgradeChoices"),
  battlefield: document.querySelector("#battlefield"),
  equipStrip: document.querySelector("#equipStrip"),
  logPanel: document.querySelector("#logPanel"),
  campPanel: document.querySelector("#campPanel"),
  prepPanel: document.querySelector("#prepPanel"),
  prepSummary: document.querySelector("#prepSummary"),
  prepHeroImage: document.querySelector("#prepHeroImage"),
  selectedHeroName: document.querySelector("#selectedHeroName"),
  selectedHeroText: document.querySelector("#selectedHeroText"),
  characterList: document.querySelector("#characterList"),
  prepUpgradeList: document.querySelector("#prepUpgradeList"),
  departButton: document.querySelector("#departButton"),
  newRunPrepButton: document.querySelector("#newRunPrepButton"),
  bestiaryPanel: document.querySelector("#bestiaryPanel"),
  goalsPanel: document.querySelector("#goalsPanel"),
  campSummary: document.querySelector("#campSummary"),
  recordList: document.querySelector("#recordList"),
  bestiarySummary: document.querySelector("#bestiarySummary"),
  bestiaryList: document.querySelector("#bestiaryList"),
  goalsList: document.querySelector("#goalsList"),
  returnBattleButton: document.querySelector("#returnBattleButton"),
  restartRunButton: document.querySelector("#restartRunButton"),
  actionPanel: document.querySelector("#actionPanel"),
  log: document.querySelector("#logText"),
  resetButton: document.querySelector("#resetButton"),
  heroImage: document.querySelector("#heroImage"),
  lootImage: document.querySelector("#lootImage"),
};

const navButtons = Array.from(document.querySelectorAll("[data-screen]"));

let state = loadGame() || newGame(loadMeta());
render();

function baseMeta() {
  return {
    version: SAVE_VERSION,
    ash: 0,
    bestFloor: 1,
    kills: 0,
    bossKills: 0,
    totalGold: 0,
    legendaryFound: 0,
    seenEnemies: {},
    claimedGoals: {},
    unlockedCharacters: { heir: true },
    selectedCharacter: "heir",
    characterUpgrades: {},
  };
}

function loadMeta() {
  try {
    const meta = JSON.parse(localStorage.getItem("abyssMeta") || "{}");
    return {
      ...baseMeta(),
      ...meta,
      seenEnemies: { ...(meta.seenEnemies || {}) },
      claimedGoals: { ...(meta.claimedGoals || {}) },
      unlockedCharacters: { heir: true, ...(meta.unlockedCharacters || {}) },
      selectedCharacter: meta.selectedCharacter || "heir",
      characterUpgrades: { ...(meta.characterUpgrades || {}) },
      version: SAVE_VERSION,
    };
  } catch {
    return baseMeta();
  }
}

function newGame(meta = loadMeta()) {
  const character = playableCharacters.find((entry) => entry.id === meta.selectedCharacter) || playableCharacters[0];
  const ranks = characterRanks(meta, character.id);
  const maxHp = 72 + ranks.hpRank * 10;
  const base = {
    maxHp: Math.max(1, maxHp + character.mods.maxHp),
    maxMp: Math.max(1, 22 + character.mods.maxMp),
    atk: Math.max(1, 14 + ranks.atkRank * 3 + character.mods.atk),
    def: Math.max(0, 3 + character.mods.def),
    crit: Math.max(0, 5 + character.mods.crit),
    drain: Math.max(0, character.mods.drain),
  };
  const hero = {
    level: 1,
    exp: 0,
    nextExp: 24,
    hp: base.maxHp,
    mp: base.maxMp,
    potions: 2,
    guarding: false,
    characterId: character.id,
    base,
    equipment: { weapon: null, armor: null, charm: null },
  };
  return { version: SAVE_VERSION, screen: "prep", mode: "battle", floor: 1, gold: ranks.goldRank * 20, meta, hero, enemy: makeEnemy(1), pendingLoot: null };
}

function characterRanks(meta = state.meta, characterId = meta.selectedCharacter) {
  const ranks = meta.characterUpgrades?.[characterId] || {};
  return {
    hpRank: ranks.hpRank || 0,
    atkRank: ranks.atkRank || 0,
    goldRank: ranks.goldRank || 0,
  };
}

function ensureCharacterRanks(characterId = state.meta.selectedCharacter) {
  if (!state.meta.characterUpgrades) state.meta.characterUpgrades = {};
  if (!state.meta.characterUpgrades[characterId]) {
    state.meta.characterUpgrades[characterId] = { hpRank: 0, atkRank: 0, goldRank: 0 };
  }
  return state.meta.characterUpgrades[characterId];
}

function makeEnemy(floor) {
  if (floor % 10 === 0) {
    const bossIndex = Math.min(Math.floor(floor / 10) - 1, bossTemplates.length - 1);
    const bossBase = bossTemplates[bossIndex];
    const visual = bossVisuals[bossIndex];
    const bossScale = 1 + Math.max(0, floor - 10) * 0.035;
    return {
      ...bossBase,
      id: `boss_${bossIndex}`,
      boss: true,
      image: visual.image,
      visualFilter: visual.filter,
      visualScale: visual.scale,
      maxHp: Math.round(bossBase.hp * bossScale),
      hp: Math.round(bossBase.hp * bossScale),
      atk: Math.round(bossBase.atk * bossScale),
      def: Math.round(bossBase.def * bossScale),
      exp: Math.round(45 * floor * bossScale),
      gold: Math.round(35 * floor * bossScale),
    };
  }

  const depthIndex = Math.min(normalEnemies.length - 1, Math.floor((floor - 1) * normalEnemies.length / 50));
  const spread = normalEnemies
    .map((enemy, index) => ({ enemy, index }))
    .slice(Math.max(0, depthIndex - 2), Math.min(normalEnemies.length, depthIndex + 3));
  const selected = pick(spread);
  const template = selected.enemy;
  const visual = enemyVisuals[selected.index % enemyVisuals.length];
  const scale = 1 + (floor - 1) * 0.18;
  return {
    ...template,
    id: `enemy_${selected.index}`,
    boss: false,
    image: visual.image,
    visualFilter: visual.filter,
    visualScale: visual.scale,
    maxHp: Math.round(template.hp * scale),
    hp: Math.round(template.hp * scale),
    atk: Math.round(template.atk * scale),
    def: Math.round(template.def + floor * 0.38),
    exp: Math.round((8 + template.tier * 4) * scale),
    gold: Math.round((6 + template.tier * 3) * scale),
  };
}

function totals() {
  const total = { ...state.hero.base };
  for (const item of Object.values(state.hero.equipment)) {
    if (!item) continue;
    for (const [stat, value] of Object.entries(item.mods)) total[stat] = (total[stat] || 0) + value;
  }
  total.maxHp = Math.max(1, total.maxHp);
  total.maxMp = Math.max(1, total.maxMp);
  total.atk = Math.max(1, total.atk);
  total.def = Math.max(0, total.def);
  total.crit = Math.max(0, total.crit);
  total.drain = Math.max(0, total.drain);
  return total;
}

function roll(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function getSound(name) {
  if (typeof Audio === "undefined" || !audioState.enabled) return null;
  if (!audioState.sounds[name]) {
    const sound = new Audio(sfxFiles[name]);
    sound.preload = "auto";
    sound.volume = name === "victory" ? 0.45 : 0.62;
    audioState.sounds[name] = sound;
  }
  return audioState.sounds[name];
}

function unlockAudio() {
  if (audioState.unlocked || typeof Audio === "undefined") return;
  audioState.unlocked = true;
  for (const name of Object.keys(sfxFiles)) {
    const sound = getSound(name);
    if (!sound) continue;
    sound.load();
  }
}

function playSfx(name) {
  const source = getSound(name);
  if (!source) return;
  const sound = source.cloneNode();
  sound.volume = source.volume;
  sound.play().catch(() => {});
}

function rarityForFloor(floor) {
  const luck = Math.random() + floor * 0.018;
  if (luck > 1.12) return rarities[4];
  if (luck > 0.91) return rarities[3];
  if (luck > 0.68) return rarities[2];
  if (luck > 0.38) return rarities[1];
  return rarities[0];
}

function makeLoot(floor, boss = false) {
  const rarity = boss ? rarities[Math.min(4, 2 + Math.floor(floor / 20))] : rarityForFloor(floor);
  const slot = pick(Object.keys(slots));
  const names = {
    weapon: ["断罪の刃", "黒鉄の斧", "血錆の槍", "霊火の剣", "奈落の大鎌"],
    armor: ["葬送の鎧", "墓守の外套", "灰被りの盾", "黒祈祷の甲冑", "王墓の鎖帷子"],
    charm: ["呪骨の護符", "月蝕の指輪", "血晶の首飾り", "囁く聖印", "深淵の眼"],
  };
  const mainBySlot = { weapon: ["atk", "crit", "drain"], armor: ["maxHp", "def", "maxMp"], charm: ["maxMp", "crit", "drain", "atk"] };
  const item = {
    id: `${Date.now()}-${Math.random()}`,
    slot,
    rarity: rarity.key,
    rarityName: rarity.name,
    color: rarity.color,
    name: `${rarity.name} ${pick(names[slot])}`,
    sell: Math.round((rarity.sell + floor * 5) * (boss ? 1.8 : 1) * (0.85 + Math.random() * 0.35)),
    mods: {},
  };
  const statCount = Math.min(4, 1 + rarities.indexOf(rarity) + (Math.random() > 0.62 ? 1 : 0));
  const candidates = [...new Set([...mainBySlot[slot], "maxHp", "maxMp", "atk", "def", "crit", "drain"])];
  for (let i = 0; i < statCount; i += 1) {
    const stat = pick(candidates);
    const base = Math.ceil((floor + 3) * rarity.power * (stat === "maxHp" || stat === "maxMp" ? 1.8 : 0.45));
    const negativeChance = boss ? 0.05 : rarity.key === "common" ? 0.34 : rarity.key === "uncommon" ? 0.24 : 0.14;
    const sign = Math.random() < negativeChance ? -1 : 1;
    const value = sign * Math.max(1, roll(Math.ceil(base * 0.45), Math.ceil(base * 1.2)));
    item.mods[stat] = (item.mods[stat] || 0) + value;
  }
  return item;
}

function rewardText(reward) {
  const parts = [];
  if (reward.ash) parts.push(`灰 +${reward.ash}`);
  if (reward.gold) parts.push(`${reward.gold}G`);
  return parts.join(" / ");
}

function recordEnemyKill(enemy) {
  state.meta.kills += 1;
  if (enemy.boss) state.meta.bossKills += 1;
  state.meta.seenEnemies[enemy.id] = (state.meta.seenEnemies[enemy.id] || 0) + 1;
}

function grantGoal(goal) {
  if (state.meta.claimedGoals[goal.id] || !goal.done(state.meta)) return;
  state.meta.claimedGoals[goal.id] = true;
  if (goal.reward.ash) state.meta.ash += goal.reward.ash;
  if (goal.reward.gold) state.gold += goal.reward.gold;
  saveMeta();
  saveGame();
  render();
}

function playerTurn(action) {
  if (state.mode !== "battle" || state.hero.hp <= 0) return;
  unlockAudio();
  const hero = state.hero;
  const stats = totals();
  const enemy = state.enemy;
  let text = "";

  if (action === "attack") {
    let amount = Math.max(1, stats.atk + roll(-2, 3) - enemy.def);
    const critical = Math.random() * 100 < stats.crit;
    if (critical) amount = Math.round(amount * 1.75);
    enemy.hp = clamp(enemy.hp - amount, 0, enemy.maxHp);
    if (stats.drain > 0) hero.hp = clamp(hero.hp + Math.ceil(amount * stats.drain / 100), 0, stats.maxHp);
    text = critical ? `会心。${enemy.name}に${amount}ダメージ。` : `${enemy.name}に${amount}ダメージ。`;
    playSfx("attack");
    bumpEnemy();
  }

  if (action === "skill") {
    if (hero.mp < 6) {
      setLog("MPが足りない。防御でMPを取り戻そう。");
      return;
    }
    hero.mp -= 6;
    const amount = Math.max(2, Math.round(stats.atk * 1.85) + roll(0, 4) - Math.floor(enemy.def / 2));
    enemy.hp = clamp(enemy.hp - amount, 0, enemy.maxHp);
    text = `魂火の斬撃で${amount}ダメージ。`;
    playSfx("skill");
    bumpEnemy();
  }

  if (action === "guard") {
    hero.guarding = true;
    hero.mp = clamp(hero.mp + 5, 0, stats.maxMp);
    playSfx("guard");
    text = "盾を構え、MPを5回復。";
  }

  if (action === "potion") {
    if (hero.potions <= 0) {
      setLog("黒薬は尽きている。");
      return;
    }
    hero.potions -= 1;
    const heal = Math.round(stats.maxHp * 0.42);
    hero.hp = clamp(hero.hp + heal, 0, stats.maxHp);
    playSfx("potion");
    text = `黒薬でHPを${heal}回復。`;
  }

  if (enemy.hp <= 0) {
    winBattle(text);
  } else {
    enemyTurn(text);
  }
}

function enemyTurn(prefix) {
  const hero = state.hero;
  const stats = totals();
  const enemy = state.enemy;
  let incoming = Math.max(1, enemy.atk + roll(-1, 3) - stats.def);
  if (hero.guarding) incoming = Math.max(1, Math.floor(incoming * 0.45));
  hero.guarding = false;
  hero.hp = clamp(hero.hp - incoming, 0, stats.maxHp);
  playSfx("hit");

  if (hero.hp <= 0) {
    die(`${prefix} ${enemy.name}の${enemy.intent}。${incoming}ダメージを受け、探索は途切れた。`);
  } else {
    setLog(`${prefix} ${enemy.name}の反撃で${incoming}ダメージ。`);
    saveGame();
    render();
  }
}

function winBattle(prefix) {
  const enemy = state.enemy;
  const gainedGold = enemy.gold + roll(0, state.floor * 2);
  const loot = makeLoot(state.floor, enemy.boss);
  recordEnemyKill(enemy);
  state.gold += gainedGold;
  state.meta.totalGold += gainedGold;
  if (loot.rarity === "legendary") state.meta.legendaryFound += 1;
  gainExp(enemy.exp);
  state.pendingLoot = { item: loot, gold: gainedGold, exp: enemy.exp };
  state.floor += 1;
  state.meta.bestFloor = Math.max(state.meta.bestFloor, state.floor);
  state.mode = "loot";
  state.screen = "battle";
  playSfx("victory");
  setLog(`${prefix} 勝利。${gainedGold}G、${enemy.exp}EXP、装備を獲得。`);
  saveGame();
  saveMeta();
  render();
}

function gainExp(amount) {
  const hero = state.hero;
  hero.exp += amount;
  while (hero.exp >= hero.nextExp) {
    hero.exp -= hero.nextExp;
    hero.level += 1;
    hero.nextExp = Math.round(hero.nextExp * 1.24 + 8);
    hero.base.maxHp += 7;
    hero.base.maxMp += 2;
    hero.base.atk += 2;
    hero.base.def += 1;
    hero.hp = totals().maxHp;
    hero.mp = totals().maxMp;
  }
}

function equipPending() {
  unlockAudio();
  playSfx("equip");
  const item = state.pendingLoot.item;
  const before = totals();
  state.hero.equipment[item.slot] = item;
  const after = totals();
  state.hero.hp = clamp(state.hero.hp + (after.maxHp - before.maxHp), 1, after.maxHp);
  state.hero.mp = clamp(state.hero.mp + (after.maxMp - before.maxMp), 0, after.maxMp);
  nextBattle(`${item.name}を装備した。`);
}

function sellPending() {
  unlockAudio();
  playSfx("sell");
  const item = state.pendingLoot.item;
  state.gold += item.sell;
  nextBattle(`${item.name}を売却し、${item.sell}Gを得た。`);
}

function nextBattle(prefix) {
  state.pendingLoot = null;
  state.enemy = makeEnemy(state.floor);
  state.mode = "battle";
  state.screen = "battle";
  setLog(`${prefix} 第${state.floor}階層へ降りる。`);
  saveGame();
  render();
}

function die(message) {
  const ashGain = Math.max(1, Math.floor((state.floor - 1) * 1.4 + state.gold / 55));
  state.meta.ash += ashGain;
  state.meta.bestFloor = Math.max(state.meta.bestFloor, state.floor);
  state.mode = "death";
  state.screen = "battle";
  playSfx("death");
  setLog(message);
  els.deathText.textContent = `到達階層 ${state.floor}。深淵の灰を${ashGain}個得た。灰は次の挑戦に残る。`;
  saveMeta();
  saveGame();
  render();
}

function restartRun() {
  state = newGame(loadMeta());
  state.screen = "prep";
  setLog("灰を握りしめ、もう一度奈落へ降りる。");
  saveGame();
  render();
}

function itemModsText(item) {
  return Object.entries(item.mods).map(([stat, value]) => `${statLabels[stat]} ${value >= 0 ? "+" : ""}${value}`).join(" / ");
}

function itemCompareText(nextItem, currentItem) {
  const stats = ["maxHp", "maxMp", "atk", "def", "crit", "drain"];
  return stats
    .map((stat) => {
      const next = nextItem.mods[stat] || 0;
      const current = currentItem?.mods?.[stat] || 0;
      const diff = next - current;
      if (diff === 0) return null;
      return `${statLabels[stat]} ${diff > 0 ? "+" : ""}${diff}`;
    })
    .filter(Boolean)
    .join(" / ") || "差分なし";
}

function equipmentSummary() {
  return Object.entries(state.hero.equipment).map(([slot, item]) => `${slots[slot]}: ${item ? item.name : "なし"}`).join("  ");
}

function renderLoot() {
  els.lootChoices.innerHTML = "";
  if (state.mode !== "loot" || !state.pendingLoot) return;
  const item = state.pendingLoot.item;
  const current = state.hero.equipment[item.slot];
  const currentText = current ? itemModsText(current) : "なし";

  const card = document.createElement("div");
  card.className = "loot-card";
  card.innerHTML = `<strong style="color:${item.color}">${item.name}</strong><span>${slots[item.slot]} / ${item.rarityName}</span><p>${itemModsText(item)}</p><small>現在: ${currentText}</small><small>現在との差: ${itemCompareText(item, current)}</small>`;
  els.lootChoices.appendChild(card);

  const equip = document.createElement("button");
  equip.type = "button";
  equip.className = "reward-button";
  equip.innerHTML = "装備する<span>能力が下がる補正も含めて受け入れる</span>";
  equip.addEventListener("click", equipPending);
  els.lootChoices.appendChild(equip);

  const sell = document.createElement("button");
  sell.type = "button";
  sell.className = "reward-button";
  sell.innerHTML = `売却 ${item.sell}G<span>今の装備を維持して金に変える</span>`;
  sell.addEventListener("click", sellPending);
  els.lootChoices.appendChild(sell);
}

function renderGameOverActions() {
  els.upgradeChoices.innerHTML = "";
  const prep = document.createElement("button");
  prep.type = "button";
  prep.className = "reward-button primary";
  prep.innerHTML = "準備へ戻る<span>キャラ別の恒久強化は準備画面で行う</span>";
  prep.addEventListener("click", restartRun);
  els.upgradeChoices.appendChild(prep);
  const retry = document.createElement("button");
  retry.type = "button";
  retry.className = "reward-button";
  retry.innerHTML = "再挑戦<span>恒久強化を引き継いで第1階層から始める</span>";
  retry.addEventListener("click", restartRun);
  els.upgradeChoices.appendChild(retry);
}

function upgradeDefinitions() {
  const ranks = characterRanks();
  return [
    { key: "hpRank", title: "血の記憶", detail: `選択キャラの最大HP +10 / 現在${ranks.hpRank}`, cost: 4 + ranks.hpRank * 3 },
    { key: "atkRank", title: "刃の記憶", detail: `選択キャラの攻撃 +3 / 現在${ranks.atkRank}`, cost: 5 + ranks.atkRank * 4 },
    { key: "goldRank", title: "金貨の記憶", detail: `選択キャラの開始所持金 +20G / 現在${ranks.goldRank}`, cost: 6 + ranks.goldRank * 4 },
  ];
}

function refreshPreparedRun() {
  const meta = loadMeta();
  state = newGame(meta);
  state.screen = "prep";
  saveGame();
  render();
}

function buyPrepUpgrade(type) {
  const option = upgradeDefinitions().find((entry) => entry.key === type);
  if (!option || state.meta.ash < option.cost) return;
  const ranks = ensureCharacterRanks();
  state.meta.ash -= option.cost;
  ranks[type] += 1;
  saveMeta();
  refreshPreparedRun();
}

function unlockCharacter(characterId) {
  const character = playableCharacters.find((entry) => entry.id === characterId);
  if (!character || state.meta.unlockedCharacters[character.id] || state.meta.ash < character.cost) return;
  state.meta.ash -= character.cost;
  state.meta.unlockedCharacters[character.id] = true;
  state.meta.selectedCharacter = character.id;
  saveMeta();
  refreshPreparedRun();
}

function selectCharacter(characterId) {
  if (!state.meta.unlockedCharacters[characterId]) return;
  state.meta.selectedCharacter = characterId;
  saveMeta();
  refreshPreparedRun();
}

function departRun() {
  state.screen = "battle";
  setLog("準備を終え、奈落へ降りる。");
  saveGame();
  render();
}

function renderPrep() {
  const character = playableCharacters.find((entry) => entry.id === state.meta.selectedCharacter) || playableCharacters[0];
  const stats = totals();
  els.prepSummary.textContent = `灰 ${state.meta.ash} / 最高 ${state.meta.bestFloor}F / 討伐 ${state.meta.kills}`;
  els.prepHeroImage.src = character.image;
  els.prepHeroImage.style.filter = "drop-shadow(0 12px 12px rgba(0,0,0,.45))";
  els.selectedHeroName.textContent = character.name;
  els.selectedHeroText.textContent = `${character.text} HP ${stats.maxHp} / MP ${stats.maxMp} / 攻撃 ${stats.atk} / 防御 ${stats.def}`;

  els.characterList.innerHTML = "";
  for (const entry of playableCharacters) {
    const unlocked = !!state.meta.unlockedCharacters[entry.id];
    const selected = state.meta.selectedCharacter === entry.id;
    const card = document.createElement("div");
    card.className = `character-card ${selected ? "selected" : ""}`;
    card.innerHTML = `<img src="${entry.image}" alt="${entry.name}"><div><strong>${entry.tier} ${entry.name}</strong><span>${entry.text}</span><span>補正: HP ${entry.mods.maxHp >= 0 ? "+" : ""}${entry.mods.maxHp} / MP ${entry.mods.maxMp >= 0 ? "+" : ""}${entry.mods.maxMp} / 攻撃 ${entry.mods.atk >= 0 ? "+" : ""}${entry.mods.atk} / 防御 ${entry.mods.def >= 0 ? "+" : ""}${entry.mods.def} / 会心 ${entry.mods.crit >= 0 ? "+" : ""}${entry.mods.crit} / 吸血 ${entry.mods.drain >= 0 ? "+" : ""}${entry.mods.drain}</span></div>`;
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = unlocked ? (selected ? "選択中" : "選択") : `解放 灰${entry.cost}`;
    button.disabled = selected || (!unlocked && state.meta.ash < entry.cost);
    button.addEventListener("click", () => (unlocked ? selectCharacter(entry.id) : unlockCharacter(entry.id)));
    card.appendChild(button);
    els.characterList.appendChild(card);
  }

  els.prepUpgradeList.innerHTML = "";
  for (const option of upgradeDefinitions()) {
    const card = document.createElement("div");
    card.className = "goal-entry";
    card.innerHTML = `<strong>${option.title}</strong><span>${option.detail}</span><span>必要: 灰${option.cost}</span>`;
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "強化";
    button.disabled = state.meta.ash < option.cost;
    button.addEventListener("click", () => buyPrepUpgrade(option.key));
    card.appendChild(button);
    els.prepUpgradeList.appendChild(card);
  }
}

function renderCamp() {
  const discovered = Object.keys(state.meta.seenEnemies).length;
  const claimable = goals.filter((goal) => goal.done(state.meta) && !state.meta.claimedGoals[goal.id]).length;
  els.campSummary.textContent = `最高${state.meta.bestFloor}F / 討伐${state.meta.kills} / 図鑑${discovered}/35 / 受取可能な目標${claimable}`;
  const records = [
    ["現在階層", `${state.floor}F`],
    ["最高到達", `${state.meta.bestFloor}F`],
    ["総討伐", `${state.meta.kills}体`],
    ["ボス討伐", `${state.meta.bossKills}体`],
    ["累計獲得G", `${state.meta.totalGold}G`],
    ["伝説発見", `${state.meta.legendaryFound}個`],
  ];
  els.recordList.innerHTML = "";
  for (const [label, value] of records) {
    const card = document.createElement("div");
    card.className = "panel-stat";
    card.innerHTML = `<span>${label}</span><strong>${value}</strong>`;
    els.recordList.appendChild(card);
  }
}

function renderBestiary() {
  const entries = [
    ...normalEnemies.map((enemy, index) => ({ id: `enemy_${index}`, label: enemy.name, tier: `危険度 ${enemy.tier}` })),
    ...bossTemplates.map((enemy, index) => ({ id: `boss_${index}`, label: enemy.name, tier: "BOSS" })),
  ];
  const discovered = entries.filter((entry) => state.meta.seenEnemies[entry.id]).length;
  els.bestiarySummary.textContent = `発見 ${discovered} / ${entries.length}`;
  els.bestiaryList.innerHTML = "";
  for (const entry of entries) {
    const count = state.meta.seenEnemies[entry.id] || 0;
    const card = document.createElement("div");
    card.className = "bestiary-entry";
    card.innerHTML = count
      ? `<strong>${entry.label}</strong><span>${entry.tier} / 討伐 ${count}</span>`
      : `<strong>????</strong><span>未遭遇</span>`;
    els.bestiaryList.appendChild(card);
  }
}

function renderGoals() {
  els.goalsList.innerHTML = "";
  for (const goal of goals) {
    const done = goal.done(state.meta);
    const claimed = state.meta.claimedGoals[goal.id];
    const card = document.createElement("div");
    card.className = `goal-entry ${done && !claimed ? "claimable" : ""}`;
    const buttonLabel = claimed ? "受取済み" : done ? "受け取る" : "未達成";
    card.innerHTML = `<strong>${goal.title}</strong><span>${goal.detail}</span><span>報酬: ${rewardText(goal.reward)}</span>`;
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = buttonLabel;
    button.disabled = !done || claimed;
    button.addEventListener("click", () => grantGoal(goal));
    card.appendChild(button);
    els.goalsList.appendChild(card);
  }
}

function setScreen(screen) {
  state.screen = screen;
  saveGame();
  render();
}

function render() {
  const hero = state.hero;
  const stats = totals();
  const enemy = state.enemy;
  hero.hp = clamp(hero.hp, 0, stats.maxHp);
  hero.mp = clamp(hero.mp, 0, stats.maxMp);

  els.floor.textContent = state.floor;
  els.bestFloor.textContent = state.meta.bestFloor;
  els.gold.textContent = state.gold;
  els.ash.textContent = state.meta.ash;
  els.level.textContent = hero.level;
  els.expText.textContent = `${hero.exp} / ${hero.nextExp}`;
  els.statsText.textContent = `攻撃 ${stats.atk} / 防御 ${stats.def} / 会心 ${stats.crit}% / 吸血 ${stats.drain}%`;
  els.equipText.textContent = equipmentSummary();
  els.heroImage.src = assets.hero;
  els.lootImage.src = assets.loot;

  els.enemyName.textContent = enemy.boss ? `BOSS ${enemy.name}` : enemy.name;
  els.enemyIntent.textContent = enemy.intent;
  els.enemyImage.src = enemy.image;
  els.enemyImage.style.filter = enemy.visualFilter || "";
  els.enemyImage.style.maxWidth = `${Math.round(82 * (enemy.visualScale || 1))}%`;
  els.enemyHpText.textContent = `HP ${enemy.hp} / ${enemy.maxHp}`;
  els.enemyHpBar.style.width = `${(enemy.hp / enemy.maxHp) * 100}%`;
  els.heroHpText.textContent = `${hero.hp} / ${stats.maxHp}`;
  els.heroMpText.textContent = `${hero.mp} / ${stats.maxMp}`;
  els.heroHpBar.style.width = `${(hero.hp / stats.maxHp) * 100}%`;
  els.heroMpBar.style.width = `${(hero.mp / stats.maxMp) * 100}%`;

  els.lootPanel.classList.toggle("hidden", state.mode !== "loot");
  els.deathPanel.classList.toggle("hidden", state.mode !== "death");
  const inBattleScreen = state.screen === "battle";
  els.battlefield.classList.toggle("hidden", !inBattleScreen);
  els.equipStrip.classList.toggle("hidden", !inBattleScreen);
  els.logPanel.classList.toggle("hidden", !inBattleScreen);
  els.campPanel.classList.toggle("hidden", state.screen !== "camp");
  els.prepPanel.classList.toggle("hidden", state.screen !== "prep");
  els.bestiaryPanel.classList.toggle("hidden", state.screen !== "bestiary");
  els.goalsPanel.classList.toggle("hidden", state.screen !== "goals");
  els.lootPanel.classList.toggle("hidden", !inBattleScreen || state.mode !== "loot");
  els.deathPanel.classList.toggle("hidden", !inBattleScreen || state.mode !== "death");
  els.actionPanel.classList.toggle("hidden", !inBattleScreen || state.mode !== "battle");
  for (const button of navButtons) button.classList.toggle("active", button.dataset.screen === state.screen);
  els.actionPanel.querySelector('[data-action="skill"]').disabled = hero.mp < 6 || hero.hp <= 0;
  els.actionPanel.querySelector('[data-action="potion"]').textContent = `黒薬 ${hero.potions}`;

  renderLoot();
  if (state.mode === "death") renderGameOverActions();
  renderPrep();
  renderCamp();
  renderBestiary();
  renderGoals();
}

function setLog(message) {
  els.log.textContent = message;
}

function bumpEnemy() {
  els.enemyImage.classList.add("enemy-hit");
  window.setTimeout(() => els.enemyImage.classList.remove("enemy-hit"), 180);
}

function saveGame() {
  state.version = SAVE_VERSION;
  localStorage.setItem("abyssRun", JSON.stringify(state));
}

function saveMeta() {
  state.meta.version = SAVE_VERSION;
  localStorage.setItem("abyssMeta", JSON.stringify(state.meta));
}

function loadGame() {
  try {
    const saved = JSON.parse(localStorage.getItem("abyssRun") || "null");
    if (!saved || saved.version !== SAVE_VERSION || !saved.hero || !saved.enemy) return null;
    saved.screen = saved.screen || "battle";
    saved.meta = {
      ...baseMeta(),
      ...(saved.meta || {}),
      seenEnemies: { ...(saved.meta?.seenEnemies || {}) },
      claimedGoals: { ...(saved.meta?.claimedGoals || {}) },
      unlockedCharacters: { heir: true, ...(saved.meta?.unlockedCharacters || {}) },
      characterUpgrades: { ...(saved.meta?.characterUpgrades || {}) },
    };
    return saved;
  } catch {
    return null;
  }
}

els.actionPanel.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (button) playerTurn(button.dataset.action);
});

for (const button of navButtons) {
  button.addEventListener("click", () => setScreen(button.dataset.screen));
}

els.returnBattleButton.addEventListener("click", () => setScreen("battle"));

els.departButton.addEventListener("click", departRun);

els.newRunPrepButton.addEventListener("click", () => {
  localStorage.removeItem("abyssRun");
  state = newGame(loadMeta());
  state.screen = "prep";
  setLog("新しい挑戦を準備した。");
  saveGame();
  render();
});

els.restartRunButton.addEventListener("click", () => {
  localStorage.removeItem("abyssRun");
  state = newGame(loadMeta());
  setLog("新しい挑戦を開始した。");
  saveGame();
  render();
});

els.resetButton.addEventListener("click", () => {
  localStorage.removeItem("abyssRun");
  state = newGame(loadMeta());
  setLog("現在の挑戦を捨て、奈落の入口へ戻った。恒久強化は残る。");
  saveGame();
  render();
});
