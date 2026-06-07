const stage = document.querySelector("#stage");
const resultsView = document.querySelector("#results");
const grid = document.querySelector(".grid");
const summonButton = document.querySelector("#summon");
const againButton = document.querySelector("#again");
const caption = document.querySelector("#caption");
const flash = document.querySelector("#flash");
const rareCutin = document.querySelector("#rareCutin");
const newGet = document.querySelector("#newGet");
const newGetNext = document.querySelector("#newGetNext");
const ticketCurrency = document.querySelector("#ticketCurrency");
const gemCurrency = document.querySelector("#gemCurrency");
const shardCount = document.querySelector("#shardCount");
const screenTitle = document.querySelector("#screenTitle");
const screenSubtitle = document.querySelector("#screenSubtitle");
const screenBg = document.querySelector("#screenBg");
const phone = document.querySelector(".phone");
const backButton = document.querySelector("#backButton");
const soundToggle = document.querySelector("#soundToggle");
const banner = document.querySelector(".banner");
const tabs = [...document.querySelectorAll(".tab")];
const panels = {
  village: document.querySelector("#villagePanel"),
  ninjas: document.querySelector("#ninjasPanel"),
  formation: document.querySelector("#formationPanel"),
  missions: document.querySelector("#missionsPanel")
};

const modal = document.querySelector("#confirmModal");
const confirmTitle = document.querySelector("#confirmTitle");
const confirmBody = document.querySelector("#confirmBody");
const confirmDetails = document.querySelector("#confirmDetails");
const confirmOk = document.querySelector("#confirmOk");
const confirmCancel = document.querySelector("#confirmCancel");

const sounds = {
  tap: document.querySelector("#seTap"),
  charge: document.querySelector("#seCharge"),
  ssr: document.querySelector("#seSSR"),
  settle: document.querySelector("#seSettle"),
  fan: document.querySelector("#seFan"),
  place: document.querySelector("#sePlace")
};

const backgrounds = {
  village: "assets/generated/village-bg.png",
  ninjas: "assets/generated/dojo-bg.png",
  formation: "assets/generated/dojo-bg.png",
  missions: "assets/generated/mission-bg.png",
  gacha: "../Sources/GachaIOSShowcase/Resources/summon_background.png"
};

const resourceLabels = {
  money: "銭",
  wood: "木材",
  iron: "鉄",
  herbs: "薬草",
  toolParts: "部材",
  silk: "絹",
  gunpowder: "火薬"
};

const rarityArt = {
  ur: "assets/generated/ninjas/ninja-ur.png",
  ssr: "assets/generated/ninjas/ninja-ssr.png",
  sr: "assets/generated/ninjas/ninja-sr.png",
  r: "assets/generated/ninjas/ninja-r.png"
};

const pool = [
  { id: "ninja-ur-tsukuyomi", rarity: "ur", label: "UR", name: "月詠ノ紅蓮", role: "総大将", skill: "月輪神楽", skillText: "全任務の与ダメージ+18%。レイドでは追加追撃。", img: rarityArt.ur, shards: 200, basePower: 9200 },
  { id: "ninja-ur-hakuro", rarity: "ur", label: "UR", name: "白露ノ天狐", role: "幻術", skill: "天狐幻灯", skillText: "被ダメージを軽減し、PvP奪取量+12%。", img: rarityArt.ur, shards: 200, basePower: 8950 },
  { id: "ninja-ur-kagutsuchi", rarity: "ur", label: "UR", name: "迦具土ノ焔", role: "火遁", skill: "緋炎万象", skillText: "レイド与ダメージ+25%。火薬報酬を増やす。", img: rarityArt.ur, shards: 200, basePower: 8800 },
  { id: "ninja-ssr-yashamaru", rarity: "ssr", label: "SSR", name: "夜叉丸", role: "強襲", skill: "月牙一閃", skillText: "先制で敵主力へ大ダメージ。PvPで奪取量+8%。", img: rarityArt.ssr, shards: 100, basePower: 6100 },
  { id: "ninja-ssr-oboromaru", rarity: "ssr", label: "SSR", name: "朧丸", role: "忍頭", skill: "朧月影縫い", skillText: "戦闘開始時に味方全体の戦力+12%。", img: rarityArt.ssr, shards: 100, basePower: 5900 },
  { id: "ninja-ssr-hotaru", rarity: "ssr", label: "SSR", name: "焔蛍", role: "爆破", skill: "火遁・蛍火乱舞", skillText: "レイドで追加ダメージ。工房の生産時間を短縮。", img: rarityArt.ssr, shards: 100, basePower: 5700 },
  { id: "ninja-ssr-shigure", rarity: "ssr", label: "SSR", name: "時雨", role: "支援", skill: "雨隠れの陣", skillText: "PvEで負傷を抑え、薬草ドロップ+15%。", img: rarityArt.ssr, shards: 100, basePower: 5480 },
  { id: "ninja-ssr-kurohane", rarity: "ssr", label: "SSR", name: "黒羽ノ鴉", role: "暗殺", skill: "闇羽落とし", skillText: "PvPで敵防衛を一時低下。", img: rarityArt.ssr, shards: 100, basePower: 5620 },
  { id: "ninja-ssr-mizuchi", rarity: "ssr", label: "SSR", name: "水蛇ミヅチ", role: "水遁", skill: "水鏡返し", skillText: "被ダメージを反射し、PvE素材+10%。", img: rarityArt.ssr, shards: 100, basePower: 5520 },
  { id: "ninja-ssr-raika", rarity: "ssr", label: "SSR", name: "雷火", role: "雷遁", skill: "雷鳴疾駆", skillText: "任務成功率と速度が上昇。", img: rarityArt.ssr, shards: 100, basePower: 5660 },
  { id: "ninja-sr-kirigakure", rarity: "sr", label: "SR", name: "霧隠れの紫苑", role: "攪乱", skill: "霧霞", skillText: "敵命中を下げ、探索報酬を増やす。", img: rarityArt.sr, shards: 30, basePower: 3180 },
  { id: "ninja-sr-hayate", rarity: "sr", label: "SR", name: "疾風の隼人", role: "斥候", skill: "風走り", skillText: "遠征時間を短縮し、先制率を上げる。", img: rarityArt.sr, shards: 30, basePower: 3050 },
  { id: "ninja-sr-amane", rarity: "sr", label: "SR", name: "符術師 天音", role: "術士", skill: "封印符", skillText: "レイドで敵行動を遅らせる。", img: rarityArt.sr, shards: 30, basePower: 2960 },
  { id: "ninja-sr-kogane", rarity: "sr", label: "SR", name: "黄金の小太刀", role: "商隊護衛", skill: "商路見切り", skillText: "遠征の銭報酬+18%。", img: rarityArt.sr, shards: 30, basePower: 2890 },
  { id: "ninja-sr-benizuru", rarity: "sr", label: "SR", name: "紅鶴", role: "回復", skill: "紅羽手当", skillText: "受けた被害による忍び損耗を軽減。", img: rarityArt.sr, shards: 30, basePower: 2860 },
  { id: "ninja-sr-ibuki", rarity: "sr", label: "SR", name: "伊吹", role: "槍術", skill: "山嵐突き", skillText: "PvEの与ダメージ+10%。", img: rarityArt.sr, shards: 30, basePower: 3010 },
  { id: "ninja-sr-ranmaru", rarity: "sr", label: "SR", name: "蘭丸", role: "潜入", skill: "忍び足", skillText: "PvP被ダメージを減らす。", img: rarityArt.sr, shards: 30, basePower: 2920 },
  { id: "ninja-sr-yukari", rarity: "sr", label: "SR", name: "結火里", role: "火薬", skill: "導火線", skillText: "火薬報酬とレイド攻撃力が上昇。", img: rarityArt.sr, shards: 30, basePower: 2990 },
  { id: "ninja-sr-sazanami", rarity: "sr", label: "SR", name: "細波", role: "水遁", skill: "水隠れ", skillText: "被ダメージ-6%。", img: rarityArt.sr, shards: 30, basePower: 2880 },
  { id: "ninja-sr-tobikage", rarity: "sr", label: "SR", name: "飛影", role: "奇襲", skill: "影飛び", skillText: "任務開始時に追加ダメージ。", img: rarityArt.sr, shards: 30, basePower: 3040 },
  { id: "ninja-r-kusano", rarity: "r", label: "R", name: "草野の聞き耳", role: "探索", skill: "聞き込み", skillText: "資源回収時に少量の追加素材。", img: rarityArt.r, shards: 10, basePower: 1380 },
  { id: "ninja-r-azami", rarity: "r", label: "R", name: "毒花の薊", role: "毒術", skill: "痺れ毒", skillText: "PvEで敵を弱体化。", img: rarityArt.r, shards: 10, basePower: 1320 },
  { id: "ninja-r-mokubei", rarity: "r", label: "R", name: "木走りの杢兵衛", role: "工作", skill: "木走り", skillText: "施設強化の木材消費を少し軽減。", img: rarityArt.r, shards: 10, basePower: 1250 },
  { id: "ninja-r-suzu", rarity: "r", label: "R", name: "鈴鳴りの鈴", role: "支援", skill: "鈴結界", skillText: "防衛時に忍びの負傷率を下げる。", img: rarityArt.r, shards: 10, basePower: 1180 },
  { id: "ninja-r-genji", rarity: "r", label: "R", name: "源次", role: "刀術", skill: "抜き胴", skillText: "小ダメージを追加。", img: rarityArt.r, shards: 10, basePower: 1290 },
  { id: "ninja-r-hisame", rarity: "r", label: "R", name: "氷雨", role: "水遁", skill: "霧雨", skillText: "敵速度をわずかに下げる。", img: rarityArt.r, shards: 10, basePower: 1210 },
  { id: "ninja-r-tane", rarity: "r", label: "R", name: "種丸", role: "罠師", skill: "竹罠", skillText: "防衛で追加ダメージ。", img: rarityArt.r, shards: 10, basePower: 1240 },
  { id: "ninja-r-kohaku", rarity: "r", label: "R", name: "琥珀", role: "採集", skill: "鉱脈探し", skillText: "鉄報酬を少し増やす。", img: rarityArt.r, shards: 10, basePower: 1190 },
  { id: "ninja-r-mayu", rarity: "r", label: "R", name: "繭", role: "裁縫", skill: "絹結び", skillText: "絹報酬を少し増やす。", img: rarityArt.r, shards: 10, basePower: 1160 },
  { id: "ninja-r-toraji", rarity: "r", label: "R", name: "虎次", role: "護衛", skill: "身代わり", skillText: "被ダメージを少し軽減。", img: rarityArt.r, shards: 10, basePower: 1270 }
];

pool.forEach(card => {
  card.img = `assets/generated/ninjas/individual/${card.id}.png`;
});

const facilityCatalog = [
  { id: "dojo", name: "修練場", icon: "修", background: "ninjas", description: "忍者のレベル上げと基礎戦力を支える中核施設。", statName: "修練効率", baseStat: 12, bonus: "忍者Lv上限と訓練成功率が上昇", cost: { money: 2600, wood: 500 } },
  { id: "forge", name: "工房", icon: "工", background: "ninjas", description: "武器、防具、装飾品の強化と生産を行う施設。", statName: "生産品質", baseStat: 10, bonus: "装備生産のSR以上率が上昇", cost: { money: 2100, iron: 460, toolParts: 120 } },
  { id: "storehouse", name: "蔵", icon: "蔵", background: "village", description: "奪われる資源を減らし、遠征報酬を保管する施設。", statName: "保管力", baseStat: 18, bonus: "PvP被害軽減と資源上限が上昇", cost: { money: 3200, wood: 720 } },
  { id: "watchtower", name: "見張り櫓", icon: "櫓", background: "village", description: "襲撃を察知し、防衛戦で先制行動を取る施設。", statName: "警戒度", baseStat: 16, bonus: "防衛戦力と反撃報酬が上昇", cost: { money: 1800, wood: 420, iron: 220 } },
  { id: "market", name: "市", icon: "市", background: "village", description: "銭と素材の流通を増やし、忍び招集を安定させる施設。", statName: "流通量", baseStat: 14, bonus: "産物回収量と招集効率が上昇", cost: { money: 2400, wood: 360, silk: 80 } }
];

const difficultyCatalog = [
  { id: "easy", name: "初級", multiplier: 0.85, time: 12000, minions: 10, enemy: 6200 },
  { id: "normal", name: "中級", multiplier: 1, time: 15000, minions: 18, enemy: 9800 },
  { id: "hard", name: "上級", multiplier: 1.35, time: 18000, minions: 30, enemy: 15400 },
  { id: "nightmare", name: "影級", multiplier: 1.75, time: 22000, minions: 44, enemy: 22600 }
];

const missionCatalog = {
  expedition: { title: "遠征", text: "交易路や山道を調査し、里の銭を稼ぐ。", baseRewards: { money: 2600, wood: 260 }, icon: "遠" },
  pve: { title: "PvE討伐", text: "妖忍や盗賊の根城を制圧し、素材と装備を狙う。", baseRewards: { money: 1700, iron: 220, herbs: 160, toolParts: 70 }, icon: "討" },
  pvp: { title: "PvP襲撃", text: "NPC里を選んで資源を奪う。相手戦力と蔵の厚さを見極める。", baseRewards: { money: 2600, wood: 340, iron: 260 }, icon: "襲" },
  raid: { title: "レイド召喚", text: "NPCが召喚した大妖へ即時攻撃。結果はその場で出る。", baseRewards: { money: 2200, toolParts: 140, gems: 160 }, icon: "裂" }
};

const npcVillages = [
  { id: "npc-akatsuki", name: "暁霞の里", power: 8600, defense: 7200, loot: { money: 1800, wood: 260, iron: 160 }, mood: "警戒薄い" },
  { id: "npc-kurogane", name: "黒鉄砦", power: 14200, defense: 16800, loot: { money: 3000, iron: 520, toolParts: 120 }, mood: "防衛堅牢" },
  { id: "npc-shiranui", name: "不知火衆", power: 19800, defense: 18400, loot: { money: 4100, gunpowder: 140, herbs: 180 }, mood: "高報酬" },
  { id: "npc-mizukage", name: "水影郷", power: 11600, defense: 10200, loot: { money: 2400, wood: 220, silk: 120 }, mood: "奪取向き" },
  { id: "npc-tengu", name: "天狗岳砦", power: 25200, defense: 28800, loot: { money: 5200, iron: 460, gems: 120 }, mood: "危険" }
];

const raidBosses = [
  { id: "raid-centipede", name: "大百足・緋毒丸", hp: 180000, element: "毒", caller: "暁霞の里" },
  { id: "raid-oni", name: "黒面鬼・羅轟", hp: 240000, element: "鬼", caller: "黒鉄砦" },
  { id: "raid-serpent", name: "水蛇神・濡羽", hp: 210000, element: "水", caller: "水影郷" },
  { id: "raid-firebird", name: "火喰鳥・赤羽", hp: 225000, element: "火", caller: "不知火衆" },
  { id: "raid-tengu", name: "山嶽天狗・黒嶺", hp: 280000, element: "風", caller: "天狗岳砦" }
];

const storageKey = "kagezuki-ninja-village-preview-v3";
let activeTab = "village";
let activeView = { village: "home", ninjas: "list", formation: "home", missions: "board" };
let selectedFacilityId = null;
let selectedNinjaId = null;
let selectedMissionKind = null;
let selectedDifficultyId = "normal";
let selectedNpcId = null;
let selectedAllies = [];
let pendingConfirm = null;
let currentCards = [];

const game = createInitialGame();
loadGame(true);

function createInitialGame() {
  const owned = ["ninja-r-kusano", "ninja-sr-hayate", "ninja-ssr-oboromaru", "ninja-r-suzu"];
  return {
    gems: 12840,
    tickets: 7,
    awakeningShards: 0,
    resources: { money: 15800, wood: 4200, iron: 3100, herbs: 1100, toolParts: 680, silk: 240, gunpowder: 90 },
    minions: { total: 156, available: 124, injured: 18 },
    villageLevel: 5,
    owned,
    facilities: facilityCatalog.map(item => ({ id: item.id, level: item.id === "storehouse" ? 4 : item.id === "dojo" ? 3 : 2 })),
    ninjas: owned.map((id, index) => ninjaFromPool(pool.find(card => card.id === id), [13, 18, 24, 11][index], false)),
    equipment: [
      equipment("eq-blade", "武器", "月影の忍刀", "SSR", 5, 1480),
      equipment("eq-armor", "防具", "黒漆の忍装束", "SR", 4, 920),
      equipment("eq-charm", "装飾品", "煙遁の護符", "SR", 3, 740),
      equipment("eq-kunai", "武器", "黒鉄苦無", "R", 2, 420),
      equipment("eq-mask", "装飾品", "夜見の面", "R", 1, 360)
    ],
    formation: { ninjaIds: owned.slice(0, 3), minions: 36 },
    settings: { soundEnabled: true },
    defense: { ninjaIds: ["ninja-ssr-oboromaru", "ninja-sr-hayate"], minions: 84 },
    activities: [],
    reports: [],
    raidEvents: createInitialRaids(),
    savedAt: null
  };
}

function createInitialRaids() {
  return raidBosses.slice(0, 3).map((boss, index) => createWorldRaid(boss, npcVillages[index + 1] || npcVillages[0]));
}

function createWorldRaid(boss = randomFrom(raidBosses), caller = randomFrom(npcVillages), forcedDifficulty = null, playerSummoned = false) {
  const difficulty = forcedDifficulty || (caller.power > 22000 ? "nightmare" : caller.power > 16000 ? "hard" : caller.power > 10000 ? "normal" : "easy");
  const diff = difficultyCatalog.find(item => item.id === difficulty) || difficultyCatalog[1];
  const hp = Math.round(boss.hp * diff.multiplier);
  const seedDamage = Math.round(hp * (0.08 + Math.random() * 0.14));
  return {
    ...boss,
    id: `${boss.id}-${Date.now()}-${Math.floor(Math.random() * 9999)}`,
    baseId: boss.id,
    caller: playerSummoned ? "影月の里" : caller.name,
    difficulty,
    difficultyName: diff.name,
    hp,
    hpLeft: Math.max(1, hp - seedDamage),
    participants: playerSummoned ? 22 + Math.floor(Math.random() * 18) : 18 + Math.floor(caller.power / 1450) + Math.floor(Math.random() * 12),
    progress: Math.round(seedDamage / hp * 100),
    playerSummoned
  };
}

function maintainWorldRaids() {
  game.raidEvents = game.raidEvents.filter(raid => raid.hpLeft > 0 || raid.playerSummoned);
  const npcActive = game.raidEvents.filter(raid => !raid.playerSummoned && raid.hpLeft > 0).length;
  for (let index = npcActive; index < 3; index += 1) {
    game.raidEvents.push(createWorldRaid(randomFrom(raidBosses), randomFrom(npcVillages)));
  }
}

function equipment(id, slot, name, rarity, level, power) {
  return { id, slot, name, rarity, level, power, equippedBy: null };
}

function ninjaFromPool(card, level = 1, isNew = true) {
  const rankBonus = card.rarity === "ur" ? 4 : card.rarity === "ssr" ? 3 : card.rarity === "sr" ? 2 : 1;
  return {
    id: card.id,
    name: card.name,
    rarity: card.label,
    rarityKey: card.rarity,
    role: card.role,
    skill: card.skill,
    skillText: card.skillText,
    level,
    img: card.img,
    isNew,
    maxMinions: 18 + rankBonus * 12 + Math.floor(level / 5),
    assignedMinions: 10 + rankBonus * 8,
    power: card.basePower + level * 86,
    hp: 820 + level * 42 + rankBonus * 210,
    attack: 220 + level * 18 + rankBonus * 90,
    defense: 160 + level * 14 + rankBonus * 70,
    speed: 90 + level * 5 + rankBonus * 28
  };
}

function report(text, details = [], type = "system") {
  return { id: `${Date.now()}-${Math.random()}`, text, details, type, at: Date.now() };
}

function play(sound) {
  if (game.settings?.soundEnabled === false) return;
  const audio = sounds[sound];
  if (!audio) return;
  audio.currentTime = 0;
  audio.volume = sound === "ssr" ? 0.92 : 0.74;
  audio.play().catch(() => {});
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function fireFlash() {
  flash.classList.remove("fire");
  void flash.offsetWidth;
  flash.classList.add("fire");
}

function yen(value) {
  return value.toLocaleString("ja-JP");
}

function resourceText(values) {
  return Object.entries(values).map(([key, value]) => `${resourceLabels[key] || key} ${yen(value)}`).join(" / ");
}

function getFacility(id) {
  const state = game.facilities.find(item => item.id === id);
  const base = facilityCatalog.find(item => item.id === id);
  return { ...base, ...state };
}

function getNinja(id) {
  return game.ninjas.find(item => item.id === id);
}

function normalizeGameState() {
  const fresh = createInitialGame();
  game.resources = { ...fresh.resources, ...(game.resources || {}) };
  game.minions = { ...fresh.minions, ...(game.minions || {}) };
  game.owned = Array.isArray(game.owned) ? game.owned : [...fresh.owned];
  game.facilities = Array.isArray(game.facilities) ? game.facilities : [...fresh.facilities];
  game.ninjas = Array.isArray(game.ninjas) ? game.ninjas : [...fresh.ninjas];
  game.equipment = Array.isArray(game.equipment) ? game.equipment : [...fresh.equipment];
  game.defense = { ...fresh.defense, ...(game.defense || {}) };
  game.activities = Array.isArray(game.activities) ? game.activities : [];
  game.reports = Array.isArray(game.reports) ? game.reports : [];
  game.raidEvents = Array.isArray(game.raidEvents) ? game.raidEvents : createInitialRaids();
  game.settings = { ...fresh.settings, ...(game.settings || {}) };
  const ownedIds = new Set(game.ninjas.map(ninja => ninja.id));
  const savedFormation = game.formation || {};
  const ninjaIds = Array.isArray(savedFormation.ninjaIds) ? savedFormation.ninjaIds.filter(id => ownedIds.has(id)) : [];
  const fallbackIds = game.ninjas.slice(0, 3).map(ninja => ninja.id);
  game.formation = {
    ninjaIds: (ninjaIds.length ? ninjaIds : fallbackIds).slice(0, 3),
    minions: Math.min(game.minions.available, Math.max(0, Number(savedFormation.minions ?? fresh.formation.minions)))
  };
  game.savedAt = game.savedAt || null;
}

function formationNinjas() {
  const ids = game.formation?.ninjaIds || [];
  const chosen = ids.map(id => getNinja(id)).filter(Boolean);
  if (chosen.length > 0) return chosen;
  return game.ninjas.slice(0, 3);
}

function formationPower() {
  const main = formationNinjas().reduce((sum, ninja) => sum + ninja.power + equippedPower(ninja.id), 0);
  const minions = Math.min(game.formation?.minions ?? 0, game.minions.available);
  return main + minions * 34;
}

function getDifficulty(id = selectedDifficultyId) {
  return difficultyCatalog.find(item => item.id === id) || difficultyCatalog[1];
}

function totalPower() {
  const ninjaPower = game.ninjas.reduce((sum, ninja) => sum + ninja.power + ninja.assignedMinions * 38 + equippedPower(ninja.id), 0);
  return Math.round(ninjaPower);
}

function equippedPower(ninjaId) {
  return game.equipment.filter(item => item.equippedBy === ninjaId).reduce((sum, item) => sum + item.power, 0);
}

function defensePower() {
  const defenders = game.ninjas.filter(ninja => game.defense.ninjaIds.includes(ninja.id));
  return defenders.reduce((sum, ninja) => sum + ninja.power + equippedPower(ninja.id), 0) + game.defense.minions * 42;
}

function teamPower() {
  return formationPower();
}

function canPay(cost) {
  return Object.entries(cost).every(([key, value]) => (game.resources[key] || 0) >= value);
}

function pay(cost) {
  Object.entries(cost).forEach(([key, value]) => {
    game.resources[key] = (game.resources[key] || 0) - value;
  });
}

function scaledCost(cost, level) {
  return Object.fromEntries(Object.entries(cost).map(([key, value]) => [key, Math.round(value * (1 + level * 0.34))]));
}

function showConfirm({ title, body, details = [], ok = "実行", onOk }) {
  confirmTitle.textContent = title;
  confirmBody.textContent = body;
  confirmOk.textContent = ok;
  confirmDetails.innerHTML = details.map(line => `<div>${line}</div>`).join("");
  pendingConfirm = onOk;
  modal.hidden = false;
  play("tap");
}

function closeConfirm() {
  modal.hidden = true;
  pendingConfirm = null;
}

function render() {
  renderCurrencies();
  renderSoundToggle();
  renderHeader();
  renderCurrentPanel();
}

function renderSoundToggle() {
  if (!soundToggle) return;
  const enabled = game.settings?.soundEnabled !== false;
  soundToggle.textContent = enabled ? "♪" : "×";
  soundToggle.classList.toggle("sound-on", enabled);
  soundToggle.classList.toggle("sound-off", !enabled);
  soundToggle.setAttribute("aria-label", enabled ? "Sound on" : "Sound off");
}

function renderCurrencies() {
  ticketCurrency.textContent = `札 ${game.tickets}`;
  gemCurrency.textContent = `勾玉 ${yen(game.gems)}`;
  shardCount.textContent = yen(game.awakeningShards);
}

function renderHeader() {
  if (activeTab === "gacha") {
    screenTitle.textContent = "影月忍伝";
    screenSubtitle.textContent = "SSR忍頭 出現率アップ中";
    return;
  }
  const titles = {
    village: activeView.village === "facility" ? getFacility(selectedFacilityId).name : "影月の里",
    ninjas: activeView.ninjas === "detail" ? getNinja(selectedNinjaId).name : "忍者名簿",
    formation: "出撃編成",
    missions: activeView.missions === "select" ? missionCatalog[selectedMissionKind].title : "任務板"
  };
  screenTitle.textContent = titles[activeTab];
  screenSubtitle.textContent = `里Lv.${game.villageLevel} / 防衛 ${yen(defensePower())}`;
}

function renderCurrentPanel() {
  if (activeTab === "village") renderVillage();
  if (activeTab === "ninjas") renderNinjas();
  if (activeTab === "formation") renderFormation();
  if (activeTab === "missions") renderMissions();
}

function renderVillage() {
  if (activeView.village === "facility") {
    panels.village.innerHTML = renderFacilityDetail(selectedFacilityId);
    return;
  }
  panels.village.innerHTML = `
    <div class="panel-card hero-panel">
      <span class="scene-kicker">NINJA VILLAGE</span>
      <h1>影月の里</h1>
      <p>施設を選んで詳細へ入り、強化・生産・防衛を管理します。</p>
      <div class="village-metrics">
        <div><b>${yen(totalPower())}</b><span>総戦力</span></div>
        <div><b>${yen(defensePower())}</b><span>防衛</span></div>
        <div><b>${game.minions.available}/${game.minions.total}</b><span>待機忍び</span></div>
      </div>
      <div class="resource-grid">${renderResourceTiles()}</div>
      <div class="formation-mini">
        ${formationNinjas().map(ninja => `<span>${ninja.rarity} ${ninja.name}</span>`).join("")}
        <button data-tab="formation">編成変更</button>
      </div>
      <div class="action-grid">
        <button data-action="collect">産物回収</button>
        <button data-action="recruit">忍び招集</button>
        <button data-action="save-game">保存</button>
        <button data-action="load-game">読込</button>
      </div>
    </div>
    <div class="panel-card">
      <span class="scene-kicker">FACILITIES</span>
      <h2>施設画面</h2>
      <div class="facility-grid">
        ${facilityCatalog.map(base => {
          const facility = getFacility(base.id);
          return `
            <button class="facility-tile" data-facility="${facility.id}">
              <b>${facility.icon}</b>
              <strong>${facility.name}</strong>
              <span>Lv.${facility.level} / ${facility.statName} ${facility.baseStat + facility.level * 7}</span>
            </button>
          `;
        }).join("")}
      </div>
    </div>
    <div class="panel-card">
      <h2>防衛編成</h2>
      <div class="list-stack">${game.ninjas.slice(0, 6).map(ninja => `
        <label class="row-card check-row">
          <input type="checkbox" data-defense="${ninja.id}" ${game.defense.ninjaIds.includes(ninja.id) ? "checked" : ""}>
          <div><strong>${ninja.name}</strong><span>${ninja.rarity} / 防衛 ${yen(ninja.power + equippedPower(ninja.id))}</span></div>
        </label>
      `).join("")}</div>
      <label class="range-row">配置する忍び <input id="defenseMinions" type="range" min="0" max="${game.minions.available}" value="${Math.min(game.defense.minions, game.minions.available)}"><b>${game.defense.minions}</b></label>
    </div>
  `;
}

function renderFacilityDetail(id) {
  const facility = getFacility(id);
  const cost = scaledCost(facility.cost, facility.level);
  const stat = facility.baseStat + facility.level * 7;
  return `
    <div class="panel-card hero-panel">
      <span class="scene-kicker">FACILITY DETAIL</span>
      <h1>${facility.name} Lv.${facility.level}</h1>
      <p>${facility.description}</p>
      <div class="village-metrics">
        <div><b>${stat}</b><span>${facility.statName}</span></div>
        <div><b>${stat + 7}</b><span>強化後</span></div>
        <div><b>${facility.icon}</b><span>施設</span></div>
      </div>
      <div class="detail-note">${facility.bonus}</div>
      <div class="action-grid">
        <button data-action="confirm-upgrade" data-id="${facility.id}" ${canPay(cost) ? "" : "disabled"}>強化する</button>
        ${facility.id === "forge" ? `<button data-action="craft-menu">装備生産</button>` : `<button data-action="collect">産物回収</button>`}
      </div>
      <p>必要素材: ${resourceText(cost)}</p>
    </div>
    ${facility.id === "forge" ? renderWorkshop() : renderFacilityStatus(facility)}
  `;
}

function renderFacilityStatus(facility) {
  return `
    <div class="panel-card">
      <h2>詳細ステータス</h2>
      <div class="stat-grid">
        <div><span>維持費</span><b>${yen(120 + facility.level * 35)}</b></div>
        <div><span>発展度</span><b>${facility.level * 18}%</b></div>
        <div><span>次効果</span><b>+${facility.level + 3}%</b></div>
      </div>
    </div>
  `;
}

function renderWorkshop() {
  return `
    <div class="panel-card">
      <span class="scene-kicker">WORKSHOP</span>
      <h2>工房メニュー</h2>
      <div class="action-grid">
        <button data-action="craft-equipment" data-slot="武器">武器を生産</button>
        <button data-action="craft-equipment" data-slot="防具">防具を生産</button>
        <button data-action="craft-equipment" data-slot="装飾品">装飾品を生産</button>
        <button data-action="enhance-all">一括強化</button>
      </div>
    </div>
    <div class="panel-card">
      <h2>装備倉庫</h2>
      <div class="list-stack">${game.equipment.map(renderEquipmentRow).join("")}</div>
    </div>
  `;
}

function renderNinjas() {
  if (activeView.ninjas === "detail") {
    panels.ninjas.innerHTML = renderNinjaDetail(selectedNinjaId);
    return;
  }
  panels.ninjas.innerHTML = `
    <div class="panel-card">
      <span class="scene-kicker">SHINOBI ROSTER</span>
      <h1>所持忍者</h1>
      <p>忍者をタップすると詳細、スキル、装備、レベル上げを確認できます。</p>
      <div class="list-stack">${game.ninjas.map((ninja, index) => renderNinjaRow(ninja, index)).join("")}</div>
    </div>
  `;
}

function renderNinjaRow(ninja, index) {
  return `
    <button class="row-card ninja-row ${ninja.rarityKey} ${index === 0 ? "featured-ninja" : ""}" data-ninja="${ninja.id}">
      <img src="${ninja.img}" alt="">
      <div><strong>${ninja.rarity} ${ninja.name}${ninja.isNew ? " NEW" : ""}</strong><span>${ninja.role} / Lv.${ninja.level} / 戦力 ${yen(ninja.power + equippedPower(ninja.id))}</span><small>${ninja.skill}: ${ninja.skillText}</small></div>
      <em>詳細</em>
    </button>
  `;
}

function renderFormation() {
  const selected = formationNinjas();
  const selectedIds = new Set(selected.map(ninja => ninja.id));
  const maxMinions = Math.max(0, game.minions.available);
  game.formation.minions = Math.min(game.formation.minions, maxMinions);
  return `
    <div class="panel-card hero-panel formation-hero">
      <span class="scene-kicker">SORTIE FORMATION</span>
      <h1>出撃編成</h1>
      <p>任務・PvP・PvE・レイドに出撃する忍者を最大3名まで選びます。ここで選んだ編成が戦力計算に反映されます。</p>
      <div class="village-metrics">
        <div><b>${yen(formationPower())}</b><span>編成戦力</span></div>
        <div><b>${selected.length}/3</b><span>出撃忍者</span></div>
        <div><b>${game.formation.minions}</b><span>随伴忍び</span></div>
      </div>
      <div class="formation-lineup">
        ${selected.map(ninja => `
          <article class="formation-slot ${ninja.rarityKey}">
            <img src="${ninja.img}" alt="">
            <strong>${ninja.rarity} ${ninja.name}</strong>
            <span>Lv.${ninja.level} / ${yen(ninja.power + equippedPower(ninja.id))}</span>
          </article>
        `).join("")}
      </div>
      <label class="range-row">随伴忍び <input id="formationMinions" type="range" min="0" max="${maxMinions}" value="${game.formation.minions}"><b>${game.formation.minions}</b></label>
      <div class="action-grid">
        <button data-action="save-game">編成を保存</button>
        <button data-tab="missions">任務へ</button>
      </div>
    </div>
    <div class="panel-card">
      <h2>忍者選択</h2>
      <div class="list-stack">${game.ninjas.map(ninja => `
        <button class="row-card ninja-row formation-card ${ninja.rarityKey} ${selectedIds.has(ninja.id) ? "selected" : ""}" data-formation-ninja="${ninja.id}">
          <img src="${ninja.img}" alt="">
          <div><strong>${selectedIds.has(ninja.id) ? "出撃中 " : ""}${ninja.rarity} ${ninja.name}</strong><span>${ninja.role} / Lv.${ninja.level} / 戦力 ${yen(ninja.power + equippedPower(ninja.id))}</span><small>${ninja.skill}: ${ninja.skillText}</small></div>
          <em>${selectedIds.has(ninja.id) ? "選択済" : "選択"}</em>
        </button>
      `).join("")}</div>
    </div>
  `;
}

function renderNinjaDetail(id) {
  const ninja = getNinja(id);
  const trainCost = { money: 900 + ninja.level * 80, herbs: 40 + ninja.level * 4 };
  const equipped = game.equipment.filter(item => item.equippedBy === id);
  const availableBySlot = slot => game.equipment.filter(item => item.slot === slot);
  return `
    <div class="panel-card hero-panel ninja-detail">
      <img src="${ninja.img}" alt="">
      <div>
        <span class="scene-kicker">${ninja.rarity} ${ninja.role}</span>
        <h1>${ninja.name}</h1>
        <p>${ninja.skill}: ${ninja.skillText}</p>
      </div>
    </div>
    <div class="panel-card">
      <h2>ステータス</h2>
      <div class="stat-grid">
        <div><span>Lv</span><b>${ninja.level}</b></div>
        <div><span>戦力</span><b>${yen(ninja.power + equippedPower(id))}</b></div>
        <div><span>HP</span><b>${yen(ninja.hp)}</b></div>
        <div><span>攻撃</span><b>${yen(ninja.attack)}</b></div>
        <div><span>防御</span><b>${yen(ninja.defense)}</b></div>
        <div><span>速度</span><b>${yen(ninja.speed)}</b></div>
      </div>
      <div class="action-grid">
        <button data-action="confirm-train" data-id="${id}" ${canPay(trainCost) ? "" : "disabled"}>レベル上げ</button>
        <button data-action="clear-equips" data-id="${id}">装備解除</button>
      </div>
      <p>必要素材: ${resourceText(trainCost)}</p>
    </div>
    <div class="panel-card">
      <h2>装備</h2>
      <div class="equip-slots">
        ${["武器", "防具", "装飾品"].map(slot => `
          <div class="equip-slot">
            <strong>${slot}</strong>
            <span>${equipped.find(item => item.slot === slot)?.name || "未装備"}</span>
            <div class="chip-row">${availableBySlot(slot).map(item => `<button data-action="equip-item" data-ninja-id="${id}" data-equip-id="${item.id}">${item.name} +${yen(item.power)}</button>`).join("")}</div>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

function renderEquipmentRow(item) {
  return `
    <article class="row-card equipment-row">
      <b class="row-emblem">${item.slot.slice(0, 1)}</b>
      <div><strong>${item.rarity} ${item.name}</strong><span>${item.slot} Lv.${item.level} / 戦力 +${yen(item.power)}</span><small>${item.equippedBy ? `${getNinja(item.equippedBy)?.name || "不明"}が装備中` : "未装備"}</small></div>
      <button data-action="confirm-enhance-equip" data-id="${item.id}">強化</button>
    </article>
  `;
}

function renderMissions() {
  if (activeView.missions === "select") {
    panels.missions.innerHTML = renderMissionSelect(selectedMissionKind);
    return;
  }
  panels.missions.innerHTML = `
    <div class="panel-card">
      <span class="scene-kicker">MISSION BOARD</span>
      <h1>任務板</h1>
      <p>難易度、NPC、共闘相手を選び、確認画面を通して出発します。</p>
      <div class="mission-grid">
        ${Object.entries(missionCatalog).map(([kind, mission]) => `
          <button class="mission-tile" data-mission-kind="${kind}">
            <b>${mission.icon}</b>
            <strong>${mission.title}</strong>
            <span>${mission.text}</span>
          </button>
        `).join("")}
      </div>
    </div>
    <div class="panel-card">
      <h2>進行中 / 帰還</h2>
      <div class="list-stack">${renderActivities()}</div>
    </div>
    <div class="panel-card">
      <h2>レイド進行</h2>
      <div class="list-stack">${game.raidEvents.map(renderRaidRow).join("")}</div>
    </div>
    <div class="panel-card">
      <h2>戦果ログ</h2>
      <div class="list-stack">${game.reports.filter(item => item.type === "combat").slice(0, 8).map(renderReport).join("") || `<article class="row-card empty-row"><div><strong>戦闘ログなし</strong><span>任務やレイドで戦闘すると、与ダメージと被ダメージが表示されます。</span></div></article>`}</div>
    </div>
  `;
}

function renderMissionSelect(kind) {
  const mission = missionCatalog[kind];
  const selectedRaid = game.raidEvents.find(item => item.id === selectedNpcId) || game.raidEvents[0];
  const difficulty = kind === "raid" ? getDifficulty(selectedRaid?.difficulty || "normal") : getDifficulty();
  const npc = npcVillages.find(item => item.id === selectedNpcId) || npcVillages[0];
  const rewards = scaleRewards(kind === "pvp" ? npc.loot : mission.baseRewards, difficulty.multiplier);
  const required = difficulty.minions;
  return `
    <div class="panel-card hero-panel">
      <span class="scene-kicker">MISSION SETUP</span>
      <h1>${mission.title}</h1>
      <p>${mission.text}</p>
      <div class="village-metrics">
        <div><b>${difficulty.name}</b><span>難易度</span></div>
        <div><b>${yen(Math.round(difficulty.enemy * difficulty.multiplier))}</b><span>予想敵戦力</span></div>
        <div><b>${required}</b><span>必要忍び</span></div>
      </div>
    </div>
    <div class="panel-card">
      <h2>難易度</h2>
      <div class="chip-row">${difficultyCatalog.map(item => `<button class="${item.id === difficulty.id ? "selected" : ""}" data-difficulty="${item.id}" ${kind === "raid" ? "disabled" : ""}>${item.name}</button>`).join("")}</div>
      ${kind === "raid" ? `<p>レイド難易度は召喚したNPCの戦闘力で固定されます。</p>` : ""}
    </div>
    ${kind === "pvp" ? renderPvpSelect(npc, rewards) : ""}
    ${kind === "pve" ? renderPveRecruit() : ""}
    ${kind === "raid" ? renderRaidSelect() : ""}
    <div class="panel-card">
      <h2>出発確認</h2>
      <div class="stat-grid">
        <div><span>味方戦力</span><b>${yen(teamPower())}</b></div>
        <div><span>予想報酬</span><b>${resourceText(rewards)}</b></div>
      </div>
      <div class="formation-mini">
        ${formationNinjas().map(ninja => `<span>${ninja.rarity} ${ninja.name}</span>`).join("")}
        <button data-tab="formation">編成変更</button>
      </div>
      <div class="action-grid">
        <button data-action="confirm-mission" data-kind="${kind}" ${game.minions.available >= required ? "" : "disabled"}>${kind === "raid" ? "参加して攻撃" : "出発する"}</button>
        <button data-action="mission-board">戻る</button>
      </div>
    </div>
  `;
}

function renderPvpSelect(selected, rewards) {
  return `
    <div class="panel-card">
      <h2>襲撃するNPC里</h2>
      <div class="list-stack">${npcVillages.map(npc => `
        <button class="row-card npc-row ${npc.id === selected.id ? "selected" : ""}" data-npc="${npc.id}">
          <div><strong>${npc.name}</strong><span>予想戦力 ${yen(npc.power)} / 防衛 ${yen(npc.defense)} / ${npc.mood}</span><small>奪取見込み: ${resourceText(npc.loot)}</small></div>
        </button>
      `).join("")}</div>
      <p>選択中: ${selected.name} / 奪取見込み ${resourceText(rewards)}</p>
    </div>
  `;
}

function renderPveRecruit() {
  return `
    <div class="panel-card">
      <h2>募集するNPC共闘</h2>
      <div class="chip-row">${npcVillages.slice(0, 4).map(npc => `<button class="${selectedAllies.includes(npc.id) ? "selected" : ""}" data-ally="${npc.id}">${npc.name}</button>`).join("")}</div>
      <p>共闘NPCは戦力を加算しますが、報酬を少し分配します。</p>
    </div>
  `;
}

function renderRaidSelect() {
  return `
    <div class="panel-card">
      <h2>NPC召喚レイド</h2>
      <div class="list-stack">${game.raidEvents.map(raid => `
        <button class="row-card npc-row ${raid.id === selectedNpcId ? "selected" : ""}" data-raid="${raid.id}">
          <div><strong>${raid.name}</strong><span>${raid.caller}が召喚 / 参加NPC ${raid.participants}</span><small>HP ${yen(Math.max(0, raid.hpLeft))} / ${yen(raid.hp)}</small></div>
        </button>
      `).join("")}</div>
      <p>レイドのみ出発後すぐに結果が出ます。</p>
    </div>
    <div class="panel-card">
      <h2>自分で召喚</h2>
      <div class="chip-row">${difficultyCatalog.map(item => `<button data-action="summon-player-raid" data-difficulty-id="${item.id}">${item.name}召喚</button>`).join("")}</div>
      <p>プレイヤー召喚レイドはワールド3体制限とは別枠です。召喚するとNPC勢力が参加してきます。</p>
    </div>
  `;
}

function renderRaidRow(raid) {
  const rate = Math.max(0, raid.hpLeft / raid.hp);
  return `
    <button class="row-card raid-row" data-raid-progress="${raid.id}">
      <div><strong>${raid.name}</strong><span>${raid.caller}召喚 / ${raid.difficultyName} / 参加NPC ${raid.participants}勢力</span><small>残HP ${yen(Math.max(0, raid.hpLeft))}</small><div class="hpbar"><i style="width:${rate * 100}%"></i></div></div>
      <em>参加</em>
    </button>
  `;
}

function renderActivities() {
  const now = Date.now();
  if (game.activities.length === 0) {
    return `<article class="row-card empty-row"><div><strong>待機中</strong><span>任務を開始するとここに表示されます。</span></div></article>`;
  }
  return game.activities.map(activity => {
    const left = Math.max(0, activity.finishAt - now);
    const ready = left === 0;
    return `
      <article class="row-card">
        <div><strong>${activity.title} ${activity.difficulty}</strong><span>${ready ? "帰還済み" : `残り ${Math.ceil(left / 1000)}秒`}</span><small>${activity.target || "任務中"} / 忍び ${activity.minions}</small></div>
        <button data-action="claim-activity" data-id="${activity.id}" ${ready ? "" : "disabled"}>${ready ? "結果" : "進行中"}</button>
      </article>
    `;
  }).join("");
}

function renderReport(item) {
  return `
    <article class="row-card report-row">
      <div><strong>${new Date(item.at).toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" })} ${item.text}</strong>${item.details.map(detail => `<span>・${detail}</span>`).join("")}</div>
    </article>
  `;
}

function renderResourceTiles() {
  return Object.entries(game.resources).map(([key, value]) => `
    <div class="resource-tile"><span>${resourceLabels[key] || key}</span><b>${yen(value)}</b></div>
  `).join("");
}

function scaleRewards(rewards, multiplier) {
  return Object.fromEntries(Object.entries(rewards).map(([key, value]) => [key, Math.round(value * multiplier)]));
}

function addRewards(rewards) {
  Object.entries(rewards).forEach(([key, value]) => {
    if (key === "gems") game.gems += value;
    else game.resources[key] = (game.resources[key] || 0) + value;
  });
}

function collectResources() {
  const gain = { money: 900 + game.villageLevel * 120, wood: 180, iron: 130, herbs: 80 };
  addRewards(gain);
  game.reports.unshift(report("里の産物を回収しました。", [`獲得: ${resourceText(gain)}`, "蔵の保管力により襲撃リスクを軽減"]));
  saveGame(true);
  render();
}

function recruitMinions() {
  const cost = { money: 1200, herbs: 80 };
  showConfirm({
    title: "忍びを招集しますか？",
    body: "12名の忍びを里へ迎えます。",
    details: [`必要素材: ${resourceText(cost)}`, `現在: ${game.minions.available}/${game.minions.total}`],
    ok: "招集",
    onOk: () => {
      if (!canPay(cost)) return;
      pay(cost);
      game.minions.total += 12;
      game.minions.available += 12;
      game.reports.unshift(report("新たな忍び12名が里に加わりました。", ["市の流通で招集成功", "防衛と任務に投入可能"]));
      saveGame(true);
      render();
    }
  });
}

function confirmUpgradeFacility(id) {
  const facility = getFacility(id);
  const cost = scaledCost(facility.cost, facility.level);
  showConfirm({
    title: `${facility.name}を強化しますか？`,
    body: `Lv.${facility.level}からLv.${facility.level + 1}へ強化します。`,
    details: [`必要素材: ${resourceText(cost)}`, `${facility.statName}: ${facility.baseStat + facility.level * 7} → ${facility.baseStat + (facility.level + 1) * 7}`, facility.bonus],
    ok: "強化",
    onOk: () => {
      if (!canPay(cost)) return;
      pay(cost);
      game.facilities.find(item => item.id === id).level += 1;
      game.villageLevel = Math.max(game.villageLevel, 1 + Math.floor(game.facilities.reduce((sum, item) => sum + item.level, 0) / 3));
      game.reports.unshift(report(`${facility.name}を強化しました。`, [`Lv.${facility.level} → Lv.${facility.level + 1}`, `消費: ${resourceText(cost)}`]));
      saveGame(true);
      render();
    }
  });
}

function confirmTrainNinja(id) {
  const ninja = getNinja(id);
  const cost = { money: 900 + ninja.level * 80, herbs: 40 + ninja.level * 4 };
  showConfirm({
    title: `${ninja.name}を鍛えますか？`,
    body: "レベル上げで戦力、HP、攻撃、防御、速度が上昇します。",
    details: [`必要素材: ${resourceText(cost)}`, `Lv.${ninja.level} → Lv.${ninja.level + 1}`, `戦力 ${yen(ninja.power)} → ${yen(ninja.power + 130)}`],
    ok: "修練",
    onOk: () => {
      if (!canPay(cost)) return;
      pay(cost);
      ninja.level += 1;
      ninja.power += 130;
      ninja.hp += 42;
      ninja.attack += 18;
      ninja.defense += 14;
      ninja.speed += 5;
      ninja.maxMinions += ninja.level % 5 === 0 ? 1 : 0;
      ninja.isNew = false;
      game.reports.unshift(report(`${ninja.name}がLv.${ninja.level}になりました。`, [`戦力 +130`, `${ninja.skill}の熟練度が上昇`]));
      saveGame(true);
      render();
    }
  });
}

function craftEquipment(slot) {
  const cost = { money: 1800, iron: slot === "防具" ? 420 : 300, toolParts: 180 };
  if (slot === "装飾品") cost.silk = 120;
  showConfirm({
    title: `${slot}を生産しますか？`,
    body: "工房Lvに応じて品質が変わります。",
    details: [`必要素材: ${resourceText(cost)}`, "RからSSRまで抽選", "完成品は装備倉庫に追加"],
    ok: "生産",
    onOk: () => {
      if (!canPay(cost)) return;
      pay(cost);
      const rarityRoll = Math.random();
      const rarity = rarityRoll < 0.08 ? "SSR" : rarityRoll < 0.34 ? "SR" : "R";
      const names = { 武器: ["影縫い苦無", "朱月の忍刀", "霧裂き小太刀"], 防具: ["黒羽の忍装束", "鎖帷子・影", "火除け羽織"], 装飾品: ["煙遁の護符", "夜見の面", "鈴守り"] };
      const item = equipment(`eq-${Date.now()}`, slot, randomFrom(names[slot]), rarity, 1, (rarity === "SSR" ? 980 : rarity === "SR" ? 620 : 340) + Math.floor(Math.random() * 180));
      game.equipment.unshift(item);
      game.reports.unshift(report(`${rarity} ${item.name}を生産しました。`, [`種別: ${slot}`, `戦力 +${yen(item.power)}`]));
      saveGame(true);
      render();
    }
  });
}

function confirmEnhanceEquip(id) {
  const item = game.equipment.find(equip => equip.id === id);
  const cost = { money: 650 + item.level * 120, iron: 160, toolParts: 60 };
  showConfirm({
    title: `${item.name}を強化しますか？`,
    body: `Lv.${item.level}からLv.${item.level + 1}へ強化します。`,
    details: [`必要素材: ${resourceText(cost)}`, `戦力 +${yen(item.power)} → +${yen(item.power + 140)}`],
    ok: "強化",
    onOk: () => {
      if (!canPay(cost)) return;
      pay(cost);
      item.level += 1;
      item.power += 140;
      game.reports.unshift(report(`${item.name}をLv.${item.level}へ強化しました。`, [`装備戦力 +140`]));
      saveGame(true);
      render();
    }
  });
}

function equipItem(ninjaId, equipId) {
  const item = game.equipment.find(equip => equip.id === equipId);
  game.equipment.filter(equip => equip.slot === item.slot && equip.equippedBy === ninjaId).forEach(equip => { equip.equippedBy = null; });
  item.equippedBy = ninjaId;
  game.reports.unshift(report(`${getNinja(ninjaId).name}が${item.name}を装備しました。`, [`${item.slot} / 戦力 +${yen(item.power)}`]));
  saveGame(true);
  render();
}

function confirmMission(kind) {
  const mission = missionCatalog[kind];
  const npc = npcVillages.find(item => item.id === selectedNpcId) || npcVillages[0];
  const targetRaid = game.raidEvents.find(item => item.id === selectedNpcId) || game.raidEvents[0];
  const difficulty = kind === "raid" ? getDifficulty(targetRaid?.difficulty || "normal") : getDifficulty();
  const rewards = scaleRewards(kind === "pvp" ? npc.loot : mission.baseRewards, difficulty.multiplier);
  const targetName = kind === "pvp" ? npc.name : kind === "raid" ? targetRaid.name : selectedAllies.length ? `${selectedAllies.length}NPC共闘` : "単独任務";
  showConfirm({
    title: `${mission.title}へ${kind === "raid" ? "即時攻撃" : "出発"}しますか？`,
    body: `${difficulty.name} / ${targetName}`,
    details: [`味方戦力: ${yen(teamPower())}`, `予想敵戦力: ${yen(Math.round(difficulty.enemy * difficulty.multiplier))}`, `見込み報酬: ${resourceText(rewards)}`, `必要忍び: ${difficulty.minions}`],
    ok: kind === "raid" ? "攻撃" : "出発",
    onOk: () => kind === "raid" ? resolveRaid(targetRaid, rewards, difficulty) : startMission(kind, rewards, difficulty, targetName)
  });
}

function startMission(kind, rewards, difficulty, targetName) {
  if (game.minions.available < difficulty.minions) return;
  game.minions.available -= difficulty.minions;
  game.activities.unshift({
    id: `${kind}-${Date.now()}`,
    kind,
    title: missionCatalog[kind].title,
    difficulty: difficulty.name,
    rewards,
    minions: difficulty.minions,
    target: targetName,
    allies: [...selectedAllies],
    finishAt: Date.now() + difficulty.time,
    enemyPower: Math.round(difficulty.enemy * difficulty.multiplier)
  });
  activeView.missions = "board";
  saveGame(true);
  render();
}

function claimActivity(id) {
  const activity = game.activities.find(item => item.id === id);
  if (!activity || activity.finishAt > Date.now()) return;
  const ourPower = teamPower();
  const successRate = Math.min(96, Math.max(42, Math.round((ourPower / Math.max(1, activity.enemyPower)) * 62)));
  const success = Math.random() * 100 < successRate;
  const rewards = success ? activity.rewards : scaleRewards(activity.rewards, 0.34);
  const damageDealt = Math.round((success ? activity.enemyPower * 1.12 : activity.enemyPower * 0.46) + Math.random() * 1800);
  const damageTaken = Math.round((success ? activity.enemyPower * 0.28 : activity.enemyPower * 0.72) + Math.random() * 1200);
  const lost = Math.min(activity.minions, Math.max(1, Math.floor(damageTaken / 1850)));
  addRewards(rewards);
  game.minions.total = Math.max(0, game.minions.total - lost);
  game.minions.available += Math.max(0, activity.minions - lost);
  const injured = success ? Math.floor(activity.minions * 0.06) : Math.floor(activity.minions * 0.16);
  game.minions.injured += injured;
  game.reports.unshift(report(`${activity.title} ${activity.difficulty}の戦果`, [
    success ? "結果: 勝利。敵主力を制圧。" : "結果: 撤退。目標の一部のみ確保。",
    `戦闘: 味方戦力 ${yen(ourPower)} / 敵戦力 ${yen(activity.enemyPower)} / 成功率 ${successRate}%`,
    `与ダメージ: ${yen(damageDealt)} / 被ダメージ: ${yen(damageTaken)}`,
    `失った忍び: ${lost} / 負傷した忍び: ${injured}`,
    `報酬: ${resourceText(rewards)}`,
  ], "combat"));
  game.activities = game.activities.filter(item => item.id !== id);
  saveGame(true);
  render();
}

function resolveRaid(raid, rewards, difficulty) {
  if (game.minions.available < difficulty.minions) return;
  game.minions.available -= difficulty.minions;
  const damage = Math.min(raid.hpLeft, Math.round(teamPower() * (0.42 + difficulty.multiplier * 0.22)));
  const damageTaken = Math.round(difficulty.enemy * (0.18 + difficulty.multiplier * 0.16) + Math.random() * 900);
  const lost = Math.min(difficulty.minions, Math.max(1, Math.floor(damageTaken / 2100)));
  raid.hpLeft = Math.max(0, raid.hpLeft - damage);
  raid.progress = Math.min(100, raid.progress + Math.round(damage / raid.hp * 100));
  game.minions.total = Math.max(0, game.minions.total - lost);
  game.minions.available += Math.max(0, difficulty.minions - lost);
  addRewards(rewards);
  game.reports.unshift(report(`${raid.name}へ即時攻撃`, [
    `${raid.caller}、NPC${raid.participants}勢力と共闘`,
    `与ダメージ: ${yen(damage)} / 被ダメージ: ${yen(damageTaken)}`,
    `失った忍び: ${lost}`,
    `残HP: ${yen(raid.hpLeft)} / ${yen(raid.hp)}`,
    `獲得: ${resourceText(rewards)}`
  ], "combat"));
  activeView.missions = "board";
  saveGame(true);
  render();
  fireFlash();
  play("ssr");
}

function randomFrom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function rarityRank(rarity) {
  return rarity === "ur" ? 4 : rarity === "ssr" ? 3 : rarity === "sr" ? 2 : 1;
}

function draw() {
  const roll = Math.random();
  const rarity = roll < 0.001 ? "ur" : roll < 0.035 ? "ssr" : roll < 0.22 ? "sr" : "r";
  return randomFrom(pool.filter(card => card.rarity === rarity));
}

function pullTen() {
  const drawResults = [];
  for (let index = 0; index < 10; index += 1) {
    const base = draw();
    const duplicate = game.owned.includes(base.id);
    if (duplicate) {
      game.awakeningShards += base.shards;
    } else {
      game.owned.push(base.id);
      game.ninjas.unshift(ninjaFromPool(base, base.rarity === "ur" ? 30 : base.rarity === "ssr" ? 22 : 12, true));
    }
    drawResults.push({ ...base, duplicate });
  }
  game.gems = Math.max(0, game.gems - 3000);
  saveGame(true);
  render();
  return drawResults.sort((a, b) => rarityRank(b.rarity) - rarityRank(a.rarity));
}

function createCard(cardData) {
  const card = document.createElement("div");
  card.className = `card ${cardData.rarity}`;
  card.innerHTML = `
    <img src="${cardData.img}" alt="">
    <b>${cardData.label}</b>
    <i class="${cardData.duplicate ? "dupe" : "new"}">${cardData.duplicate ? `+${cardData.shards}` : "NEW"}</i>
    <span>${cardData.name}</span>
  `;
  return card;
}

function resetGacha() {
  stage.hidden = activeTab !== "gacha";
  resultsView.hidden = true;
  rareCutin.hidden = true;
  newGet.hidden = true;
  rareCutin.classList.remove("show");
  newGet.classList.remove("show");
  stage.classList.remove("charging", "rainbow");
  caption.textContent = "煙遁・影結びの術";
  summonButton.disabled = false;
  summonButton.innerHTML = "十連招集 <b>3000</b> 勾玉";
  grid.innerHTML = "";
  renderCurrencies();
}

async function summon() {
  if (activeTab !== "gacha") return;
  currentCards = pullTen();
  const featured = currentCards[0];
  summonButton.disabled = true;
  summonButton.textContent = "忍魂を結んでいます...";
  caption.textContent = "煙が濃く集まり、札が震える";
  stage.classList.add("charging");
  play("tap");
  await wait(360);
  play("charge");
  caption.textContent = "高レアの気配... SR以上確定";
  await wait(850);
  stage.classList.add("rainbow");
  caption.textContent = "月光の煙、忍頭出現";
  fireFlash();
  await wait(520);
  rareCutin.hidden = false;
  rareCutin.classList.add("show");
  play("ssr");
  await wait(1180);
  rareCutin.hidden = true;
  rareCutin.classList.remove("show");
  stage.hidden = true;
  newGet.hidden = false;
  newGet.classList.add("show");
  newGet.querySelector(".new-get-copy span").textContent = featured.duplicate ? "覚醒片" : "NEW";
  newGet.querySelector(".new-get-copy strong").textContent = featured.name;
  newGet.querySelector(".new-get-copy em").textContent = featured.duplicate ? `${featured.label} 重複 +${featured.shards}` : `${featured.label} ${featured.skill}`;
  newGet.querySelector(".new-get-hero").src = featured.img;
  play("ssr");
  await new Promise(resolve => {
    const timer = setTimeout(resolve, 1700);
    newGetNext.onclick = () => {
      clearTimeout(timer);
      resolve();
    };
  });
  newGet.hidden = true;
  newGet.classList.remove("show");
  resultsView.hidden = false;
  play("fan");
  grid.innerHTML = "";
  currentCards.forEach(card => grid.append(createCard(card)));
  const renderedCards = [...grid.children];
  for (let index = 0; index < renderedCards.length; index += 1) {
    await wait(index === 0 ? 260 : 92);
    if (index === 0) {
      fireFlash();
      play("ssr");
    } else if (index % 3 === 0) {
      play("place");
    }
    renderedCards[index].classList.add("show");
  }
  await wait(300);
  play("settle");
}

function showTab(tabName) {
  activeTab = tabName;
  screenBg.src = backgrounds[tabName] || backgrounds.village;
  phone.dataset.screen = tabName;
  tabs.forEach(tab => tab.classList.toggle("active", tab.dataset.tab === tabName));
  Object.entries(panels).forEach(([name, panel]) => { panel.hidden = name !== tabName; });
  const isGacha = tabName === "gacha";
  banner.hidden = !isGacha;
  stage.hidden = !isGacha;
  resultsView.hidden = true;
  rareCutin.hidden = true;
  newGet.hidden = true;
  if (isGacha) resetGacha();
  render();
}

function goBack() {
  if (activeTab === "village" && activeView.village === "facility") activeView.village = "home";
  else if (activeTab === "ninjas" && activeView.ninjas === "detail") activeView.ninjas = "list";
  else if (activeTab === "missions" && activeView.missions === "select") activeView.missions = "board";
  else return;
  render();
}

function saveGame(silent = false) {
  normalizeGameState();
  game.savedAt = Date.now();
  localStorage.setItem(storageKey, JSON.stringify(game));
  if (!silent) {
    screenSubtitle.textContent = "保存しました";
    window.setTimeout(renderHeader, 900);
  }
}

function loadGame(silent = true) {
  const raw = localStorage.getItem(storageKey);
  if (!raw) {
    normalizeGameState();
    return false;
  }
  try {
    Object.assign(game, createInitialGame(), JSON.parse(raw));
    normalizeGameState();
    maintainWorldRaids();
    if (!silent) {
      screenSubtitle.textContent = "読み込みました";
      window.setTimeout(renderHeader, 900);
    }
  } catch {
    localStorage.removeItem(storageKey);
  }
}

document.addEventListener("click", event => {
  const target = event.target.closest("button");
  if (!target) return;
  if (target === soundToggle) {
    game.settings.soundEnabled = game.settings.soundEnabled === false;
    saveGame(true);
    renderSoundToggle();
    if (game.settings.soundEnabled) play("tap");
    return;
  }
  if (target.dataset.tab) showTab(target.dataset.tab);
  if (target.dataset.facility) {
    selectedFacilityId = target.dataset.facility;
    activeView.village = "facility";
    render();
  }
  if (target.dataset.ninja) {
    selectedNinjaId = target.dataset.ninja;
    activeView.ninjas = "detail";
    render();
  }
  if (target.dataset.formationNinja) {
    const id = target.dataset.formationNinja;
    const current = game.formation.ninjaIds.filter(ninjaId => getNinja(ninjaId));
    const exists = current.includes(id);
    if (exists && current.length > 1) {
      game.formation.ninjaIds = current.filter(ninjaId => ninjaId !== id);
    } else if (!exists) {
      game.formation.ninjaIds = [...current, id].slice(-3);
    }
    saveGame(true);
    render();
  }
  if (target.dataset.missionKind) {
    selectedMissionKind = target.dataset.missionKind;
    selectedNpcId = target.dataset.missionKind === "raid" ? game.raidEvents[0].id : npcVillages[0].id;
    selectedAllies = [];
    activeView.missions = "select";
    render();
  }
  if (target.dataset.difficulty) {
    selectedDifficultyId = target.dataset.difficulty;
    render();
  }
  if (target.dataset.npc) {
    selectedNpcId = target.dataset.npc;
    render();
  }
  if (target.dataset.raid) {
    selectedNpcId = target.dataset.raid;
    render();
  }
  if (target.dataset.raidProgress) {
    selectedMissionKind = "raid";
    selectedNpcId = target.dataset.raidProgress;
    selectedDifficultyId = selectedDifficultyId || "normal";
    activeView.missions = "select";
    render();
  }
  if (target.dataset.ally) {
    selectedAllies = selectedAllies.includes(target.dataset.ally)
      ? selectedAllies.filter(id => id !== target.dataset.ally)
      : [...selectedAllies, target.dataset.ally].slice(0, 2);
    render();
  }
  const action = target.dataset.action;
  if (action === "collect") collectResources();
  if (action === "recruit") recruitMinions();
  if (action === "save-game") saveGame(false);
  if (action === "load-game") {
    loadGame(false);
    render();
  }
  if (action === "confirm-upgrade") confirmUpgradeFacility(target.dataset.id);
  if (action === "confirm-train") confirmTrainNinja(target.dataset.id);
  if (action === "craft-equipment") craftEquipment(target.dataset.slot);
  if (action === "confirm-enhance-equip") confirmEnhanceEquip(target.dataset.id);
  if (action === "equip-item") equipItem(target.dataset.ninjaId, target.dataset.equipId);
  if (action === "clear-equips") {
    game.equipment.forEach(item => { if (item.equippedBy === target.dataset.id) item.equippedBy = null; });
    saveGame(true);
    render();
  }
  if (action === "confirm-mission") confirmMission(target.dataset.kind);
  if (action === "summon-player-raid") {
    const raid = createWorldRaid(randomFrom(raidBosses), { name: "影月の里", power: teamPower() }, target.dataset.difficultyId, true);
    game.raidEvents.unshift(raid);
    selectedNpcId = raid.id;
    selectedMissionKind = "raid";
    render();
  }
  if (action === "mission-board") {
    activeView.missions = "board";
    render();
  }
  if (action === "claim-activity") claimActivity(target.dataset.id);
  if (action === "enhance-all") {
    game.equipment.slice(0, 3).forEach(item => { item.level += 1; item.power += 80; });
    game.reports.unshift(report("工房で主要装備を一括整備しました。", ["上位3装備の戦力を底上げ"]));
    saveGame(true);
    render();
  }
});

document.addEventListener("change", event => {
  const checkbox = event.target.closest("[data-defense]");
  if (checkbox) {
    const next = new Set(game.defense.ninjaIds);
    if (checkbox.checked) next.add(checkbox.dataset.defense);
    else next.delete(checkbox.dataset.defense);
    game.defense.ninjaIds = [...next].slice(0, 3);
    saveGame(true);
    render();
  }
  if (event.target.id === "defenseMinions") {
    game.defense.minions = Number(event.target.value);
    saveGame(true);
    render();
  }
  if (event.target.id === "formationMinions") {
    game.formation.minions = Number(event.target.value);
    saveGame(true);
    render();
  }
});

confirmCancel.addEventListener("click", closeConfirm);
confirmOk.addEventListener("click", () => {
  const action = pendingConfirm;
  closeConfirm();
  if (action) action();
});
backButton.addEventListener("click", goBack);
summonButton.addEventListener("click", summon);
againButton.addEventListener("click", async () => {
  resetGacha();
  await wait(160);
  summon();
});

setInterval(() => {
  game.raidEvents.forEach(raid => {
    if (raid.hpLeft > 0) {
      raid.hpLeft = Math.max(0, raid.hpLeft - (120 + raid.participants * 35));
      raid.progress = Math.min(100, Math.round((1 - raid.hpLeft / raid.hp) * 100));
    }
  });
  maintainWorldRaids();
  if (activeTab === "missions") render();
}, 1000);

showTab("village");
