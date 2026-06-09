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
  { id: "ninja-ur-hakuro", rarity: "ur", label: "UR", name: "白露ノ天狐", role: "幻術", skill: "天狐幻灯", skillText: "被ダメージを軽減し、里襲撃の奪取量+12%。", img: rarityArt.ur, shards: 200, basePower: 8950 },
  { id: "ninja-ur-kagutsuchi", rarity: "ur", label: "UR", name: "迦具土ノ焔", role: "火遁", skill: "緋炎万象", skillText: "レイド与ダメージ+25%。火薬報酬を増やす。", img: rarityArt.ur, shards: 200, basePower: 8800 },
  { id: "ninja-ssr-yashamaru", rarity: "ssr", label: "SSR", name: "夜叉丸", role: "強襲", skill: "月牙一閃", skillText: "先制で敵主力へ大ダメージ。里襲撃で奪取量+8%。", img: rarityArt.ssr, shards: 100, basePower: 6100 },
  { id: "ninja-ssr-oboromaru", rarity: "ssr", label: "SSR", name: "朧丸", role: "忍頭", skill: "朧月影縫い", skillText: "戦闘開始時に味方全体の戦力+12%。", img: rarityArt.ssr, shards: 100, basePower: 5900 },
  { id: "ninja-ssr-hotaru", rarity: "ssr", label: "SSR", name: "焔蛍", role: "爆破", skill: "火遁・蛍火乱舞", skillText: "レイドで追加ダメージ。工房の生産時間を短縮。", img: rarityArt.ssr, shards: 100, basePower: 5700 },
  { id: "ninja-ssr-shigure", rarity: "ssr", label: "SSR", name: "時雨", role: "支援", skill: "雨隠れの陣", skillText: "討伐で負傷を抑え、薬草ドロップ+15%。", img: rarityArt.ssr, shards: 100, basePower: 5480 },
  { id: "ninja-ssr-kurohane", rarity: "ssr", label: "SSR", name: "黒羽ノ鴉", role: "暗殺", skill: "闇羽落とし", skillText: "里襲撃で敵防衛を一時低下。", img: rarityArt.ssr, shards: 100, basePower: 5620 },
  { id: "ninja-ssr-mizuchi", rarity: "ssr", label: "SSR", name: "水蛇ミヅチ", role: "水遁", skill: "水鏡返し", skillText: "被ダメージを反射し、討伐素材+10%。", img: rarityArt.ssr, shards: 100, basePower: 5520 },
  { id: "ninja-ssr-raika", rarity: "ssr", label: "SSR", name: "雷火", role: "雷遁", skill: "雷鳴疾駆", skillText: "任務成功率と速度が上昇。", img: rarityArt.ssr, shards: 100, basePower: 5660 },
  { id: "ninja-sr-kirigakure", rarity: "sr", label: "SR", name: "霧隠れの紫苑", role: "攪乱", skill: "霧霞", skillText: "敵命中を下げ、探索報酬を増やす。", img: rarityArt.sr, shards: 30, basePower: 3180 },
  { id: "ninja-sr-hayate", rarity: "sr", label: "SR", name: "疾風の隼人", role: "斥候", skill: "風走り", skillText: "遠征時間を短縮し、先制率を上げる。", img: rarityArt.sr, shards: 30, basePower: 3050 },
  { id: "ninja-sr-amane", rarity: "sr", label: "SR", name: "符術師 天音", role: "術士", skill: "封印符", skillText: "レイドで敵行動を遅らせる。", img: rarityArt.sr, shards: 30, basePower: 2960 },
  { id: "ninja-sr-kogane", rarity: "sr", label: "SR", name: "黄金の小太刀", role: "商隊護衛", skill: "商路見切り", skillText: "遠征の銭報酬+18%。", img: rarityArt.sr, shards: 30, basePower: 2890 },
  { id: "ninja-sr-benizuru", rarity: "sr", label: "SR", name: "紅鶴", role: "回復", skill: "紅羽手当", skillText: "受けた被害による忍び損耗を軽減。", img: rarityArt.sr, shards: 30, basePower: 2860 },
  { id: "ninja-sr-ibuki", rarity: "sr", label: "SR", name: "伊吹", role: "槍術", skill: "山嵐突き", skillText: "討伐の与ダメージ+10%。", img: rarityArt.sr, shards: 30, basePower: 3010 },
  { id: "ninja-sr-ranmaru", rarity: "sr", label: "SR", name: "蘭丸", role: "潜入", skill: "忍び足", skillText: "里襲撃の被ダメージを減らす。", img: rarityArt.sr, shards: 30, basePower: 2920 },
  { id: "ninja-sr-yukari", rarity: "sr", label: "SR", name: "結火里", role: "火薬", skill: "導火線", skillText: "火薬報酬とレイド攻撃力が上昇。", img: rarityArt.sr, shards: 30, basePower: 2990 },
  { id: "ninja-sr-sazanami", rarity: "sr", label: "SR", name: "細波", role: "水遁", skill: "水隠れ", skillText: "被ダメージ-6%。", img: rarityArt.sr, shards: 30, basePower: 2880 },
  { id: "ninja-sr-tobikage", rarity: "sr", label: "SR", name: "飛影", role: "奇襲", skill: "影飛び", skillText: "任務開始時に追加ダメージ。", img: rarityArt.sr, shards: 30, basePower: 3040 },
  { id: "ninja-r-kusano", rarity: "r", label: "R", name: "草野の聞き耳", role: "探索", skill: "聞き込み", skillText: "資源回収時に少量の追加素材。", img: rarityArt.r, shards: 10, basePower: 1380 },
  { id: "ninja-r-azami", rarity: "r", label: "R", name: "毒花の薊", role: "毒術", skill: "痺れ毒", skillText: "討伐で敵を弱体化。", img: rarityArt.r, shards: 10, basePower: 1320 },
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
  { id: "storehouse", name: "蔵", icon: "蔵", background: "village", description: "奪われる資源を減らし、遠征報酬を保管する施設。", statName: "保管力", baseStat: 18, bonus: "里襲撃の被害軽減と資源上限が上昇", cost: { money: 3200, wood: 720 } },
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
  pve: { title: "対妖討伐", text: "妖忍や盗賊の根城を制圧し、素材と装備を狙う。", baseRewards: { money: 1700, iron: 220, herbs: 160, toolParts: 70 }, icon: "討" },
  pvp: { title: "里襲撃", text: "他里を選んで資源を奪う。相手戦力と蔵の厚さを見極める。", baseRewards: { money: 2600, wood: 340, iron: 260 }, icon: "襲" },
  raid: { title: "レイド召喚", text: "他里が召喚した大妖へ即時攻撃。結果はその場で出る。", baseRewards: { money: 2200, toolParts: 140, gems: 160 }, icon: "裂" }
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

const raidBossArt = {
  "raid-centipede": "assets/generated/raids/raid-centipede-cutout.png",
  "raid-oni": "assets/generated/raids/raid-oni-cutout.png",
  "raid-serpent": "assets/generated/raids/raid-serpent-cutout.png",
  "raid-firebird": "assets/generated/raids/raid-firebird-cutout.png",
  "raid-tengu": "assets/generated/raids/raid-tengu-cutout.png"
};

const raidRewardTable = {
  "raid-centipede": { money: 2600, herbs: 260, toolParts: 130, gems: 90 },
  "raid-oni": { money: 3400, iron: 360, toolParts: 180, gems: 120 },
  "raid-serpent": { money: 3000, wood: 260, silk: 160, gems: 105 },
  "raid-firebird": { money: 3200, gunpowder: 180, toolParts: 160, gems: 115 },
  "raid-tengu": { money: 3900, iron: 320, silk: 180, gems: 150 }
};

const raidCompanions = [
  { name: "霧隠レイ", power: 21400, avatar: "霧" },
  { name: "黒羽ソウマ", power: 28600, avatar: "羽" },
  { name: "火鉢アカネ", power: 24300, avatar: "火" },
  { name: "水鏡ナギ", power: 19800, avatar: "水" },
  { name: "山吹コウ", power: 17600, avatar: "山" },
  { name: "月影ミオ", power: 31200, avatar: "月" },
  { name: "雷花ジン", power: 26700, avatar: "雷" },
  { name: "白露シノ", power: 22900, avatar: "白" },
  { name: "朱雀レン", power: 29400, avatar: "朱" },
  { name: "影縫サキ", power: 25100, avatar: "影" }
];

const equipmentSlots = ["武器", "体", "頭", "足", "指輪", "腕輪", "宝石"];
const equipmentRarityTable = [
  { rarity: "UR", rate: 0.01, power: 1540 },
  { rarity: "SSR", rate: 0.07, power: 980 },
  { rarity: "SR", rate: 0.22, power: 620 },
  { rarity: "R", rate: 0.45, power: 340 },
  { rarity: "N", rate: 1, power: 180 }
];
const equipmentNames = {
  "武器": ["月影の忍刀", "黒鉄苦無", "煙裂き鎖鎌", "風切手裏剣"],
  "体": ["黒漆の忍装束", "影縫い胴丸", "山霞の鎖帷子"],
  "頭": ["夜見の面", "霧隠れ鉢金", "天狗羽の頭巾"],
  "足": ["韋駄天脚絆", "水蜘蛛の足袋", "黒縄の草鞋"],
  "指輪": ["煙遁の指輪", "火走りの指輪", "水鏡の指輪"],
  "腕輪": ["雷鳴の腕輪", "隠密の手甲", "百足封じの腕輪"],
  "宝石": ["月光石", "緋毒の勾玉", "蒼蛇の宝珠"]
};

const equipmentArt = Array.from({ length: 30 }, (_, index) => `assets/generated/equipment/items/equip-${String(index).padStart(2, "0")}.png`);
const equipmentArtBySlot = {
  "武器": [0, 1, 2, 3, 4, 5, 6].map(index => equipmentArt[index]),
  "体": [7, 8, 9].map(index => equipmentArt[index]),
  "頭": [10, 11, 12, 13, 14].map(index => equipmentArt[index]),
  "足": [15, 16].map(index => equipmentArt[index]),
  "指輪": [17, 18, 19, 20].map(index => equipmentArt[index]),
  "腕輪": [21, 22].map(index => equipmentArt[index]),
  "宝石": [23, 24, 25, 26, 27, 28, 29].map(index => equipmentArt[index])
};
const forgeArt = "assets/generated/equipment/forge-bg.png";
const resourceArt = {
  money: "assets/generated/equipment/resources/money.png",
  wood: "assets/generated/equipment/resources/wood.png",
  iron: "assets/generated/equipment/resources/iron.png",
  herbs: "assets/generated/equipment/resources/herbs.png",
  toolParts: "assets/generated/equipment/resources/toolParts.png",
  silk: "assets/generated/equipment/resources/silk.png",
  gunpowder: "assets/generated/equipment/resources/gunpowder.png"
};

const storageKey = "kagezuki-ninja-village-preview-v3";
const firebaseConfigStorageKey = `${storageKey}-firebase-config`;
const saveSlotCount = 3;
let activeTab = "village";
let activeView = { village: "home", ninjas: "list", formation: "home", missions: "board" };
let selectedFacilityId = null;
let selectedNinjaId = null;
let selectedMissionKind = null;
let selectedDifficultyId = "normal";
let selectedNpcId = null;
let selectedAllies = [];
let selectedFormationSlot = 0;
let selectedEquipSlot = "武器";
let ninjaPage = 0;
let pendingConfirm = null;
let currentCards = [];
let cloudAuth = { ready: false, enabled: false, user: null, status: "Firebase未設定" };

const game = createInitialGame();
loadGame(true);

function createInitialGame() {
  const owned = ["ninja-r-kusano", "ninja-sr-hayate", "ninja-ssr-oboromaru", "ninja-r-suzu"];
  return {
    gems: 12840,
    tickets: 7,
    awakeningShards: 0,
    resources: { money: 15800, wood: 4200, iron: 3100, herbs: 1100, toolParts: 680, silk: 240, gunpowder: 90 },
    minions: { total: 0, available: 0, injured: 0 },
    villageLevel: 5,
    owned,
    facilities: facilityCatalog.map(item => ({ id: item.id, level: item.id === "storehouse" ? 4 : item.id === "dojo" ? 3 : 2 })),
    ninjas: owned.map((id, index) => ninjaFromPool(pool.find(card => card.id === id), [13, 18, 24, 11][index], false)),
    equipment: [
      equipment("eq-blade", "武器", "月影の忍刀", "SSR", 5, 1480),
      equipment("eq-armor", "体", "黒漆の忍装束", "SR", 4, 920),
      equipment("eq-charm", "指輪", "煙遁の指輪", "SR", 3, 740),
      equipment("eq-kunai", "武器", "黒鉄苦無", "R", 2, 420),
      equipment("eq-mask", "頭", "夜見の面", "R", 1, 360),
      equipment("eq-tabi", "足", "水蜘蛛の足袋", "N", 1, 190),
      equipment("eq-bracelet", "腕輪", "隠密の手甲", "R", 1, 310),
      equipment("eq-gem", "宝石", "月光石", "SR", 2, 690)
    ],
    formation: { ninjaIds: owned.slice(0, 3) },
    settings: { soundEnabled: true },
    defense: { ninjaIds: ["ninja-ssr-oboromaru", "ninja-sr-hayate"] },
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
  const members = createRaidMembers(caller, playerSummoned);
  const baseId = boss.baseId || boss.id;
  return {
    ...boss,
    id: `${boss.id}-${Date.now()}-${Math.floor(Math.random() * 9999)}`,
    baseId,
    img: raidBossArt[baseId] || raidBossArt["raid-oni"],
    caller: playerSummoned ? "影月の里" : caller.name,
    difficulty,
    difficultyName: diff.name,
    hp,
    hpLeft: Math.max(1, hp - seedDamage),
    participants: playerSummoned ? 22 + Math.floor(Math.random() * 18) : 18 + Math.floor(caller.power / 1450) + Math.floor(Math.random() * 12),
    progress: Math.round(seedDamage / hp * 100),
    playerSummoned,
    playerJoined: playerSummoned,
    members,
    logs: seedRaidLogs(members, seedDamage),
    lastNpcStrikeAt: Date.now()
  };
}

function createRaidMembers(caller = npcVillages[0], playerSummoned = false) {
  const shuffled = [...raidCompanions].sort(() => Math.random() - 0.5).slice(0, 7);
  return [
    { name: playerSummoned ? "影月の里" : caller.name, power: caller.power || teamPower(), avatar: playerSummoned ? "主" : "里" },
    ...shuffled
  ];
}

function seedRaidLogs(members, seedDamage = 0) {
  const starters = members.slice(0, 3);
  return starters.map((member, index) => ({
    id: `raid-log-${Date.now()}-${index}-${Math.random()}`,
    actor: member.name,
    damage: Math.max(1200, Math.round((member.power || 12000) * (0.12 + Math.random() * 0.16))),
    taken: Math.round(500 + Math.random() * 1100),
    text: index === 0 ? "開幕連携" : "追撃",
    type: "npc",
    at: Date.now() - (starters.length - index) * 1400
  })).concat(seedDamage ? [{
    id: `raid-log-seed-${Date.now()}-${Math.random()}`,
    actor: "共闘隊",
    damage: seedDamage,
    taken: Math.round(seedDamage * 0.04),
    text: "戦闘進行",
    type: "npc",
    at: Date.now()
  }] : []);
}

function normalizeRaidState(raid) {
  const baseId = raid.baseId || raidBosses.find(boss => raid.id?.startsWith(boss.id))?.id || "raid-oni";
  const boss = raidBosses.find(item => item.id === baseId) || raidBosses[1];
  const diff = getDifficulty(raid.difficulty || "normal");
  const hp = Number(raid.hp || Math.round(boss.hp * diff.multiplier));
  const normalized = {
    ...boss,
    ...raid,
    baseId,
    img: raid.img || raidBossArt[baseId] || raidBossArt["raid-oni"],
    difficulty: raid.difficulty || diff.id,
    difficultyName: raid.difficultyName || diff.name,
    hp,
    hpLeft: Math.max(0, Math.min(hp, Number(raid.hpLeft ?? hp))),
    participants: Number(raid.participants || 18),
    members: Array.isArray(raid.members) && raid.members.length ? raid.members : createRaidMembers({ name: raid.caller || boss.caller, power: diff.enemy }, raid.playerSummoned),
    logs: Array.isArray(raid.logs) ? raid.logs.slice(0, 30) : [],
    lastNpcStrikeAt: Number(raid.lastNpcStrikeAt || Date.now()),
    playerJoined: Boolean(raid.playerJoined || raid.playerSummoned)
  };
  if (!normalized.logs.length) normalized.logs = seedRaidLogs(normalized.members, Math.round((hp - normalized.hpLeft) * 0.45));
  normalized.progress = Math.min(100, Math.round((1 - normalized.hpLeft / normalized.hp) * 100));
  return normalized;
}

function maintainWorldRaids() {
  game.raidEvents = game.raidEvents.filter(raid => raid.hpLeft > 0 || raid.playerSummoned || raid.playerJoined);
  const npcActive = game.raidEvents.filter(raid => !raid.playerSummoned && raid.hpLeft > 0).length;
  for (let index = npcActive; index < 3; index += 1) {
    game.raidEvents.push(createWorldRaid(randomFrom(raidBosses), randomFrom(npcVillages)));
  }
}

function equipment(id, slot, name, rarity, level, power, img = null) {
  return { id, slot, name, rarity, level, power, equippedBy: null, img: img || equipmentImageFor(slot, name) };
}

function equipmentImagesForSlot(slot) {
  return equipmentArtBySlot[slot] || equipmentArt;
}

function equipmentImageFor(slot, name = "") {
  const slotImages = equipmentImagesForSlot(slot);
  const slotNames = equipmentNames[slot] || [];
  const nameIndex = slotNames.indexOf(name);
  if (nameIndex >= 0) return slotImages[nameIndex % slotImages.length];
  const slotIndex = Math.max(0, equipmentSlots.indexOf(slot));
  const seed = Array.from(String(name || slot)).reduce((sum, char) => sum + char.charCodeAt(0), slotIndex * 4);
  return slotImages[seed % slotImages.length];
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
  game.ninjas.forEach(ninja => {
    const maxHp = Math.max(1, Number(ninja.hp || ninja.maxHp || 1));
    ninja.hp = maxHp;
    ninja.hpCurrent = Math.max(0, Math.min(maxHp, Number(ninja.hpCurrent ?? maxHp)));
    delete ninja.assignedMinions;
    delete ninja.maxMinions;
  });
  game.equipment = Array.isArray(game.equipment) ? game.equipment : [...fresh.equipment];
  game.equipment.forEach(item => {
    if (item.slot === "防具") item.slot = "体";
    if (item.slot === "装飾品") item.slot = item.name?.includes("面") ? "頭" : "指輪";
    if (!equipmentSlots.includes(item.slot)) item.slot = "武器";
    if (!item.rarity) item.rarity = "N";
    item.img = equipmentImageFor(item.slot, item.name);
  });
  game.defense = { ...fresh.defense, ...(game.defense || {}) };
  game.activities = Array.isArray(game.activities) ? game.activities : [];
  game.reports = Array.isArray(game.reports) ? game.reports : [];
  game.raidEvents = Array.isArray(game.raidEvents) ? game.raidEvents.map(normalizeRaidState) : createInitialRaids();
  game.settings = { ...fresh.settings, ...(game.settings || {}) };
  const ownedIds = new Set(game.ninjas.map(ninja => ninja.id));
  const savedFormation = game.formation || {};
  const ninjaIds = Array.isArray(savedFormation.ninjaIds) ? savedFormation.ninjaIds.filter(id => ownedIds.has(id)) : [];
  const fallbackIds = game.ninjas.slice(0, 3).map(ninja => ninja.id);
  game.formation = {
    ninjaIds: (ninjaIds.length ? ninjaIds : fallbackIds).slice(0, 3),
    minions: 0
  };
  game.savedAt = game.savedAt || null;
}

function saveSlotKey(slot) {
  return `${storageKey}-slot-${slot}`;
}

function saveStamp(value = game.savedAt) {
  if (!value) return "未保存";
  return new Date(value).toLocaleString("ja-JP", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function applyLoadedGame(loaded) {
  Object.assign(game, createInitialGame(), loaded);
  normalizeGameState();
  maintainWorldRaids();
}

function makeSavePayload() {
  normalizeGameState();
  game.savedAt = Date.now();
  return JSON.stringify(game);
}

function readSaveMeta(slot) {
  try {
    const raw = localStorage.getItem(saveSlotKey(slot));
    if (!raw) return null;
    const data = JSON.parse(raw);
    return {
      savedAt: data.savedAt || null,
      villageLevel: data.villageLevel || 1,
      ninjas: Array.isArray(data.ninjas) ? data.ninjas.length : 0,
      gems: data.gems || 0
    };
  } catch {
    return { broken: true };
  }
}

function encodeSaveText(text) {
  return btoa(unescape(encodeURIComponent(text)));
}

function decodeSaveText(text) {
  return decodeURIComponent(escape(atob(text.trim())));
}

function getStoredFirebaseConfig() {
  try {
    return JSON.parse(localStorage.getItem(firebaseConfigStorageKey) || "{}");
  } catch {
    return {};
  }
}

function getFirebaseConfig() {
  return { ...(window.NINJA_FIREBASE_CONFIG || {}), ...getStoredFirebaseConfig() };
}

function hasFirebaseConfig() {
  const config = getFirebaseConfig();
  return Boolean(config.apiKey && config.authDomain && config.projectId && config.appId);
}

function parseFirebaseConfigText(text) {
  const objectText = text.trim().match(/\{[\s\S]*\}/)?.[0] || text.trim();
  try {
    return JSON.parse(objectText);
  } catch {
    return Function(`"use strict"; return (${objectText});`)();
  }
}

function promptFirebaseConfig() {
  const input = window.prompt("Firebase Web設定を貼り付けてください");
  if (!input) return false;
  try {
    const config = parseFirebaseConfigText(input);
    if (!config.apiKey || !config.authDomain || !config.projectId || !config.appId) {
      screenSubtitle.textContent = "Firebase設定の項目が不足しています";
      return false;
    }
    localStorage.setItem(firebaseConfigStorageKey, JSON.stringify({
      apiKey: config.apiKey,
      authDomain: config.authDomain,
      projectId: config.projectId,
      appId: config.appId
    }));
    screenSubtitle.textContent = "Firebase設定を保存しました。再読み込みしてください";
    window.setTimeout(() => window.location.reload(), 900);
    return true;
  } catch (error) {
    console.error(error);
    screenSubtitle.textContent = "Firebase設定を読み取れません";
    return false;
  }
}

function cloudUserLabel() {
  if (!cloudAuth.enabled) return "Firebase設定待ち";
  if (!cloudAuth.user) return "未ログイン";
  return cloudAuth.user.displayName || cloudAuth.user.email || "Googleユーザー";
}

function initCloudAuth() {
  if (!window.firebase || !hasFirebaseConfig()) {
    cloudAuth = { ready: true, enabled: false, user: null, status: "Firebase設定待ち" };
    return;
  }
  try {
    if (!window.firebase.apps.length) {
      window.firebase.initializeApp(getFirebaseConfig());
    }
    cloudAuth = { ready: true, enabled: true, user: null, status: "未ログイン" };
    window.firebase.auth().onAuthStateChanged(user => {
      cloudAuth.user = user;
      cloudAuth.status = user ? "ログイン中" : "未ログイン";
      render();
    });
    window.firebase.auth().getRedirectResult().catch(error => {
      console.error(error);
      cloudAuth.status = "Googleログインに失敗しました";
      render();
    });
  } catch (error) {
    console.error(error);
    cloudAuth = { ready: true, enabled: false, user: null, status: "Firebase初期化失敗" };
  }
}

async function signInWithGoogle() {
  if (!cloudAuth.enabled || !window.firebase) {
    screenSubtitle.textContent = "Firebase設定を入力してください";
    return false;
  }
  const provider = new window.firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  try {
    await window.firebase.auth().signInWithPopup(provider);
    screenSubtitle.textContent = "Googleログインしました";
    return true;
  } catch (error) {
    if (error?.code === "auth/popup-blocked" || error?.code === "auth/popup-closed-by-user") {
      await window.firebase.auth().signInWithRedirect(provider);
      return true;
    }
    console.error(error);
    screenSubtitle.textContent = "Googleログインに失敗しました";
    return false;
  }
}

async function signOutGoogle() {
  if (!cloudAuth.enabled || !window.firebase) return false;
  await window.firebase.auth().signOut();
  screenSubtitle.textContent = "ログアウトしました";
  return true;
}

function cloudSaveRef() {
  if (!cloudAuth.user || !window.firebase) return null;
  return window.firebase.firestore()
    .collection("users")
    .doc(cloudAuth.user.uid)
    .collection("saves")
    .doc("main");
}

async function saveGameCloud() {
  const ref = cloudSaveRef();
  if (!ref) {
    screenSubtitle.textContent = "Googleログインが必要です";
    return false;
  }
  try {
    const payload = makeSavePayload();
    await ref.set({
      payload,
      savedAt: game.savedAt,
      updatedAt: window.firebase.firestore.FieldValue.serverTimestamp(),
      version: 1
    });
    localStorage.setItem(storageKey, payload);
    screenSubtitle.textContent = "クラウド保存しました";
    return true;
  } catch (error) {
    console.error(error);
    screenSubtitle.textContent = "クラウド保存に失敗しました";
    return false;
  }
}

async function loadGameCloud() {
  const ref = cloudSaveRef();
  if (!ref) {
    screenSubtitle.textContent = "Googleログインが必要です";
    return false;
  }
  try {
    const snap = await ref.get();
    if (!snap.exists) {
      screenSubtitle.textContent = "クラウド保存がありません";
      return false;
    }
    const data = snap.data();
    const loaded = JSON.parse(data.payload);
    applyLoadedGame(loaded);
    localStorage.setItem(storageKey, JSON.stringify(game));
    screenSubtitle.textContent = "クラウド読込しました";
    render();
    return true;
  } catch (error) {
    console.error(error);
    screenSubtitle.textContent = "クラウド読込に失敗しました";
    return false;
  }
}

function formationNinjas() {
  const ids = game.formation?.ninjaIds || [];
  const chosen = ids.map(id => getNinja(id)).filter(Boolean);
  if (chosen.length > 0) return chosen;
  return game.ninjas.slice(0, 3);
}

function ninjaPageItems(size = 9) {
  const maxPage = Math.max(0, Math.ceil(game.ninjas.length / size) - 1);
  ninjaPage = Math.min(maxPage, Math.max(0, ninjaPage));
  return {
    items: game.ninjas.slice(ninjaPage * size, ninjaPage * size + size),
    page: ninjaPage,
    maxPage
  };
}

function aliveFormationNinjas() {
  return formationNinjas().filter(ninja => (ninja.hpCurrent ?? ninja.hp) > 0);
}

function ninjaHp(ninja) {
  const max = Math.max(1, Number(ninja.hp || ninja.maxHp || 1));
  const current = Math.max(0, Math.min(max, Number(ninja.hpCurrent ?? max)));
  return { current, max, rate: current / max };
}

function damageFormationNinjas(totalDamage) {
  const targets = aliveFormationNinjas();
  if (!targets.length) return [];
  const per = Math.max(1, Math.ceil(totalDamage / targets.length));
  return targets.map(ninja => {
    const hp = ninjaHp(ninja);
    const taken = Math.min(hp.current, Math.max(1, Math.round(per * (0.82 + Math.random() * 0.36))));
    ninja.hpCurrent = Math.max(0, hp.current - taken);
    return `${ninja.name} HP -${yen(taken)} (${yen(ninja.hpCurrent)}/${yen(hp.max)})`;
  });
}

function restoreNinjaHp(ninja, amount = null) {
  const hp = ninjaHp(ninja);
  const heal = amount ?? Math.ceil(hp.max * 0.35);
  ninja.hpCurrent = Math.min(hp.max, hp.current + heal);
}

function formationPower() {
  return aliveFormationNinjas().reduce((sum, ninja) => sum + ninja.power + equippedPower(ninja.id), 0);
}

function getDifficulty(id = selectedDifficultyId) {
  return difficultyCatalog.find(item => item.id === id) || difficultyCatalog[1];
}

function totalPower() {
  const ninjaPower = game.ninjas.reduce((sum, ninja) => sum + ninja.power + equippedPower(ninja.id), 0);
  return Math.round(ninjaPower);
}

function equippedPower(ninjaId) {
  return game.equipment.filter(item => item.equippedBy === ninjaId).reduce((sum, item) => sum + item.power, 0);
}

function defensePower() {
  const defenders = game.ninjas.filter(ninja => game.defense.ninjaIds.includes(ninja.id));
  return defenders.reduce((sum, ninja) => sum + ninja.power + equippedPower(ninja.id), 0);
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
    screenSubtitle.textContent = "忍者招集 開催中";
    return;
  }
  const titles = {
    village: activeView.village === "facility" ? getFacility(selectedFacilityId).name : "影月の里",
    ninjas: activeView.ninjas === "detail" ? getNinja(selectedNinjaId).name : "忍者名簿",
    formation: "出撃編成",
    missions: activeView.missions === "raid" ? "レイド戦場" : activeView.missions === "select" ? missionCatalog[selectedMissionKind].title : "任務板"
  };
  screenTitle.textContent = titles[activeTab];
  screenSubtitle.textContent = `里Lv.${game.villageLevel} / 防衛 ${yen(defensePower())}`;
}

function renderCurrentPanel() {
  if (activeTab === "village") renderVillage();
  if (activeTab === "ninjas") renderNinjas();
  if (activeTab === "formation") panels.formation.innerHTML = renderFormation();
  if (activeTab === "missions") renderMissions();
}

function renderVillage() {
  if (activeView.village === "facility") {
    panels.village.innerHTML = renderFacilityDetail(selectedFacilityId);
    return;
  }
  const injured = game.ninjas.filter(ninja => ninjaHp(ninja).current <= 0).length;
  panels.village.innerHTML = `
    <div class="panel-card hero-panel village-home compact-screen">
      <span class="scene-kicker">忍びの里</span>
      <h1>影月の里</h1>
      <div class="village-metrics compact-metrics">
        <div><b>${yen(totalPower())}</b><span>総戦力</span></div>
        <div><b>${yen(defensePower())}</b><span>防衛</span></div>
        <div><b>${injured}</b><span>戦闘不能</span></div>
      </div>
      <div class="resource-grid">${renderResourceTiles()}</div>
      <div class="formation-mini formation-link-only">
        <button data-tab="formation">編成</button>
      </div>
      <div class="action-grid">
        <button data-action="collect">産物回収</button>
        <button data-action="heal-party">療養</button>
        <button data-action="save-game">保存</button>
        <button data-action="load-game">読込</button>
      </div>
    </div>
    <div class="panel-card compact-section">
      <span class="scene-kicker">施設</span>
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
    <div class="panel-card compact-section">
      <h2>防衛</h2>
      <div class="defense-chip-grid">${game.ninjas.slice(0, 6).map(ninja => {
        const hp = ninjaHp(ninja);
        return `
          <label class="defense-chip ${game.defense.ninjaIds.includes(ninja.id) ? "selected" : ""}">
            <input type="checkbox" data-defense="${ninja.id}" ${game.defense.ninjaIds.includes(ninja.id) ? "checked" : ""}>
            <img src="${ninja.img}" alt="">
            <span>${ninja.name}</span>
            <small>HP ${yen(hp.current)}</small>
          </label>
        `;
      }).join("")}</div>
    </div>
  `;
}

function renderFacilityDetail(id) {
  const facility = getFacility(id);
  const cost = scaledCost(facility.cost, facility.level);
  const stat = facility.baseStat + facility.level * 7;
  return `
    <div class="panel-card hero-panel">
      <span class="scene-kicker">施設詳細</span>
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
    <div class="panel-card workshop-panel">
      <span class="scene-kicker">兵装工房</span>
      <h2>兵装工房</h2>
      <p>武器・体・頭・足・指輪・腕輪・宝石を生産できます。レア度はNからURまで抽選されます。</p>
      <div class="workshop-visual">
        <img src="${forgeArt}" alt="">
      </div>
      <div class="equipment-gallery">
        ${renderEquipmentGallery()}
      </div>
      <div class="action-grid craft-grid">
        ${equipmentSlots.map(slot => `<button data-action="craft-equipment" data-slot="${slot}">${slot}を生産</button>`).join("")}
        <button data-action="enhance-all">一括強化</button>
      </div>
      <div class="rarity-strip">
        ${equipmentRarityTable.map(item => `<span class="equip-rarity ${item.rarity.toLowerCase()}">${item.rarity}</span>`).join("")}
      </div>
    </div>
    <div class="panel-card workshop-storage">
      <h2>装備倉庫</h2>
      <div class="list-stack">${game.equipment.map(renderEquipmentRow).join("")}</div>
    </div>
  `;
}

function renderEquipmentGallery() {
  return equipmentSlots.map(slot => `
    <div class="equipment-gallery-group">
      <b>${slot}</b>
      <div>${equipmentImagesForSlot(slot).map((img, index) => `<img src="${img}" alt="${slot}${index + 1}">`).join("")}</div>
    </div>
  `).join("");
}

function renderNinjas() {
  if (activeView.ninjas === "detail") {
    panels.ninjas.innerHTML = renderNinjaDetail(selectedNinjaId);
    return;
  }
  const page = ninjaPageItems(9);
  panels.ninjas.innerHTML = `
    <div class="panel-card compact-screen">
      <span class="scene-kicker">忍者名鑑</span>
      <h1>所持忍者</h1>
      <div class="ninja-pick-grid roster-grid">${page.items.map(ninja => {
        const hp = ninjaHp(ninja);
        return `
          <button class="ninja-pick ${ninja.rarityKey}" data-ninja="${ninja.id}">
            <img src="${ninja.img}" alt="">
            <strong>${ninja.name}</strong>
            <span>${ninja.rarity} Lv.${ninja.level}</span>
            <small>HP ${yen(hp.current)}/${yen(hp.max)}</small>
          </button>
        `;
      }).join("")}</div>
      <div class="pager-row">
        <button data-action="ninja-page-prev" ${page.page <= 0 ? "disabled" : ""}>前</button>
        <span>${page.page + 1}/${page.maxPage + 1}</span>
        <button data-action="ninja-page-next" ${page.page >= page.maxPage ? "disabled" : ""}>次</button>
      </div>
    </div>
  `;
}

function renderNinjaRow(ninja, index) {
  const hp = ninjaHp(ninja);
  return `
    <button class="row-card ninja-row ${ninja.rarityKey} ${index === 0 ? "featured-ninja" : ""}" data-ninja="${ninja.id}">
      <img src="${ninja.img}" alt="">
      <div><strong>${ninja.rarity} ${ninja.name}${ninja.isNew ? " 新" : ""}</strong><span>${ninja.role} / Lv.${ninja.level} / 戦力 ${yen(ninja.power + equippedPower(ninja.id))}</span><small>HP ${yen(hp.current)} / ${yen(hp.max)}</small><div class="hpbar"><i style="width:${hp.rate * 100}%"></i></div></div>
      <em>詳細</em>
    </button>
  `;
}

function renderFormation() {
  if (!game.formation) normalizeGameState();
  const ids = (game.formation.ninjaIds || []).slice(0, 3);
  while (ids.length < 3) ids.push(null);
  game.formation.ninjaIds = ids.filter(Boolean);
  selectedFormationSlot = Math.min(2, Math.max(0, selectedFormationSlot || 0));
  const selectedIds = new Set(game.formation.ninjaIds);
  const page = ninjaPageItems(9);
  return `
    <div class="panel-card hero-panel formation-hero compact-screen">
      <span class="scene-kicker">出撃編成</span>
      <h1>出撃編成</h1>
      <div class="village-metrics compact-metrics">
        <div><b>${yen(formationPower())}</b><span>編成戦力</span></div>
        <div><b>${game.formation.ninjaIds.length}/3</b><span>忍者</span></div>
        <div><b>${aliveFormationNinjas().length}</b><span>出撃可能</span></div>
      </div>
      <div class="formation-lineup formation-slot-grid">
        ${ids.map((id, index) => {
          const ninja = id ? getNinja(id) : null;
          const hp = ninja ? ninjaHp(ninja) : null;
          return `
            <button class="formation-slot ${ninja?.rarityKey || "empty"} ${selectedFormationSlot === index ? "active" : ""}" data-formation-slot="${index}">
              ${ninja ? `<img src="${ninja.img}" alt=""><strong>${ninja.rarity} ${ninja.name}</strong><span>Lv.${ninja.level} / HP ${yen(hp.current)}/${yen(hp.max)}</span><div class="hpbar"><i style="width:${hp.rate * 100}%"></i></div>` : `<b>+</b><strong>空き枠</strong><span>枠を選択</span>`}
            </button>
          `;
        }).join("")}
      </div>
      <div class="action-grid">
        <button data-action="heal-party">療養</button>
        <button data-action="load-game">読込</button>
        <button data-tab="missions">任務へ</button>
      </div>
    </div>
    <div class="panel-card compact-section">
      <h2>忍者を配置</h2>
      <div class="ninja-pick-grid">${page.items.map(ninja => {
        const hp = ninjaHp(ninja);
        return `
          <button class="ninja-pick ${ninja.rarityKey} ${selectedIds.has(ninja.id) ? "selected" : ""}" data-formation-ninja="${ninja.id}">
            <img src="${ninja.img}" alt="">
            <strong>${ninja.name}</strong>
            <span>${ninja.rarity} Lv.${ninja.level}</span>
            <small>HP ${yen(hp.current)}/${yen(hp.max)}</small>
          </button>
        `;
      }).join("")}</div>
      <div class="pager-row">
        <button data-action="ninja-page-prev" ${page.page <= 0 ? "disabled" : ""}>前</button>
        <span>${page.page + 1}/${page.maxPage + 1}</span>
        <button data-action="ninja-page-next" ${page.page >= page.maxPage ? "disabled" : ""}>次</button>
      </div>
    </div>
  `;
}

function renderNinjaDetail(id) {
  const ninja = getNinja(id);
  const hp = ninjaHp(ninja);
  const trainCost = { money: 900 + ninja.level * 80, herbs: 40 + ninja.level * 4 };
  const equipped = game.equipment.filter(item => item.equippedBy === id);
  const availableBySlot = slot => game.equipment.filter(item => item.slot === slot);
  const activeSlot = equipmentSlots.includes(selectedEquipSlot) ? selectedEquipSlot : equipmentSlots[0];
  const current = slot => equipped.find(item => item.slot === slot);
  return `
    <div class="panel-card hero-panel ninja-detail ninja-loadout-detail">
      <div class="ninja-loadout-stage">
        <div class="ninja-art-wrap"><img src="${ninja.img}" alt=""></div>
        <div class="loadout-ring">
          ${equipmentSlots.map((slot, index) => {
            const item = current(slot);
            return `<button class="loadout-slot slot-${index} ${activeSlot === slot ? "active" : ""}" data-equip-slot="${slot}" data-ninja-id="${id}">
              ${item ? `<img src="${item.img}" alt="">` : `<i>${slot.slice(0, 1)}</i>`}
              <b>${slot}</b><span>${item ? `${item.rarity} ${item.name}` : "未装備"}</span>
            </button>`;
          }).join("")}
        </div>
      </div>
      <div class="ninja-loadout-info">
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
        <div><span>HP</span><b>${yen(hp.current)}/${yen(hp.max)}</b></div>
        <div><span>ATK</span><b>${yen(ninja.attack)}</b></div>
        <div><span>DEF</span><b>${yen(ninja.defense)}</b></div>
        <div><span>SPD</span><b>${yen(ninja.speed)}</b></div>
      </div>
      <div class="action-grid">
        <button data-action="confirm-train" data-id="${id}" ${canPay(trainCost) ? "" : "disabled"}>レベル上げ</button>
        <button data-action="heal-ninja" data-id="${id}">療養</button>
        <button data-action="clear-equips" data-id="${id}">装備解除</button>
      </div>
      <p>必要素材: ${resourceText(trainCost)}</p>
    </div>
    <div class="panel-card">
      <h2>${activeSlot}を選択</h2>
      <div class="list-stack equip-pick-list">
        ${availableBySlot(activeSlot).map(item => `
          <button class="row-card equipment-pick ${item.equippedBy === id ? "selected" : ""}" data-action="equip-item" data-ninja-id="${id}" data-equip-id="${item.id}">
            <img class="equipment-icon" src="${item.img}" alt="">
            <div><strong>${item.name}</strong><span>${item.slot} Lv.${item.level} / 戦力 +${yen(item.power)}</span><small>${item.equippedBy ? `${getNinja(item.equippedBy)?.name || "不明"}が装備中` : "装備可能"}</small></div>
          </button>
        `).join("") || `<article class="row-card empty-row"><div><strong>${activeSlot}の装備がありません</strong><span>兵装工房で生産できます。</span></div></article>`}
      </div>
    </div>
  `;
}

function renderEquipmentRow(item) {
  return `
    <article class="row-card equipment-row">
      <img class="equipment-icon" src="${item.img}" alt="">
      <div><strong>${item.rarity} ${item.name}</strong><span>${item.slot} Lv.${item.level} / 戦力 +${yen(item.power)}</span><small>${item.equippedBy ? `${getNinja(item.equippedBy)?.name || "不明"}が装備中` : "未装備"}</small></div>
      <button data-action="confirm-enhance-equip" data-id="${item.id}">強化</button>
    </article>
  `;
}

function renderMissions() {
  if (activeView.missions === "raid") {
    panels.missions.innerHTML = renderRaidBattle(selectedNpcId);
    return;
  }
  if (activeView.missions === "select") {
    panels.missions.innerHTML = renderMissionSelect(selectedMissionKind);
    return;
  }
  panels.missions.innerHTML = `
    <div class="panel-card hero-panel compact-screen">
      <span class="scene-kicker">任務板</span>
      <h1>任務板</h1>
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
    <div class="mission-summary-grid">
      <div class="panel-card compact-section">
        <h2>進行中</h2>
        <div class="list-stack">${renderActivities()}</div>
      </div>
      <div class="panel-card compact-section">
        <h2>レイド</h2>
        <div class="list-stack">${game.raidEvents.slice(0, 3).map(renderRaidRow).join("")}</div>
      </div>
    </div>
    <div class="panel-card compact-section">
      <h2>戦果ログ</h2>
      <div class="list-stack compact-log">${game.reports.filter(item => item.type === "combat").slice(0, 3).map(renderReport).join("") || `<article class="row-card empty-row"><div><strong>戦闘ログなし</strong><span>任務やレイドで戦闘すると、与ダメージと被ダメージが表示されます。</span></div></article>`}</div>
    </div>
  `;
}

function renderMissionSelect(kind) {
  const mission = missionCatalog[kind];
  const selectedRaid = game.raidEvents.find(item => item.id === selectedNpcId) || game.raidEvents[0];
  const difficulty = kind === "raid" ? getDifficulty(selectedRaid?.difficulty || "normal") : getDifficulty();
  const npc = npcVillages.find(item => item.id === selectedNpcId) || npcVillages[0];
  const rewards = scaleRewards(kind === "pvp" ? npc.loot : mission.baseRewards, difficulty.multiplier);
  const canDeploy = aliveFormationNinjas().length > 0;
  return `
    <div class="panel-card hero-panel">
      <span class="scene-kicker">任務準備</span>
      <h1>${mission.title}</h1>
      <p>${mission.text}</p>
      <div class="village-metrics">
        <div><b>${difficulty.name}</b><span>難易度</span></div>
        <div><b>${yen(Math.round(difficulty.enemy * difficulty.multiplier))}</b><span>予想敵戦力</span></div>
        <div><b>${aliveFormationNinjas().length}/3</b><span>出撃可能</span></div>
      </div>
    </div>
    <div class="panel-card">
      <h2>難易度</h2>
      <div class="chip-row">${difficultyCatalog.map(item => `<button class="${item.id === difficulty.id ? "selected" : ""}" data-difficulty="${item.id}" ${kind === "raid" ? "disabled" : ""}>${item.name}</button>`).join("")}</div>
      ${kind === "raid" ? `<p>レイド難易度は召喚した勢力の戦闘力で固定されます。</p>` : ""}
    </div>
    ${kind === "pvp" ? renderPvpSelect(npc, rewards) : ""}
    ${kind === "pve" ? renderPveRecruit() : ""}
    ${kind === "raid" ? renderRaidSelect() : ""}
    <div class="panel-card primary-action-card">
      <h2>出発確認</h2>
      <div class="stat-grid">
        <div><span>味方戦力</span><b>${yen(teamPower())}</b></div>
        <div><span>予想報酬</span><b>${resourceText(rewards)}</b></div>
      </div>
      <div class="formation-mini formation-link-only">
        <button data-tab="formation">編成変更</button>
      </div>
      <div class="action-grid">
        <button data-action="confirm-mission" data-kind="${kind}" ${canDeploy ? "" : "disabled"}>${kind === "raid" ? "参加して攻撃" : "出発する"}</button>
        <button data-action="mission-board">戻る</button>
      </div>
    </div>
  `;
}

function renderPvpSelect(selected, rewards) {
  return `
    <div class="panel-card">
      <h2>襲撃する他里</h2>
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
      <h2>募集する共闘勢力</h2>
      <div class="chip-row">${npcVillages.slice(0, 4).map(npc => `<button class="${selectedAllies.includes(npc.id) ? "selected" : ""}" data-ally="${npc.id}">${npc.name}</button>`).join("")}</div>
      <p>共闘勢力は戦力を加算しますが、報酬を少し分配します。</p>
    </div>
  `;
}

function renderRaidSelect() {
  return `
    <div class="panel-card">
      <h2>他里召喚レイド</h2>
      <div class="list-stack">${game.raidEvents.map(raid => `
        <button class="row-card npc-row ${raid.id === selectedNpcId ? "selected" : ""}" data-raid="${raid.id}">
          <div><strong>${raid.name}</strong><span>${raid.caller}が召喚 / 参加勢力 ${raid.participants}</span><small>HP ${yen(Math.max(0, raid.hpLeft))} / ${yen(raid.hp)}</small></div>
        </button>
      `).join("")}</div>
      <p>レイドのみ出発後すぐに結果が出ます。</p>
    </div>
    <div class="panel-card">
      <h2>自分で召喚</h2>
      <div class="chip-row">${difficultyCatalog.map(item => `<button data-action="summon-player-raid" data-difficulty-id="${item.id}">${item.name}召喚</button>`).join("")}</div>
      <p>自里召喚レイドは通常出現3体とは別枠です。召喚すると周辺勢力が参加してきます。</p>
    </div>
  `;
}

function renderRaidRow(raid) {
  const rate = Math.max(0, raid.hpLeft / raid.hp);
  return `
    <button class="row-card raid-row" data-raid-progress="${raid.id}">
      <div><strong>${raid.name}</strong><span>${raid.caller}召喚 / ${raid.difficultyName} / 参加勢力 ${raid.participants}</span><small>残HP ${yen(Math.max(0, raid.hpLeft))}</small><div class="hpbar"><i style="width:${rate * 100}%"></i></div></div>
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

function renderRaidBattle(raidId) {
  const raid = game.raidEvents.find(item => item.id === raidId) || game.raidEvents[0];
  if (!raid) return `<div class="panel-card"><h1>レイドなし</h1><button data-action="mission-board">任務へ</button></div>`;
  const difficulty = getDifficulty(raid.difficulty);
  const rewards = raidRewards(raid);
  const resultRewards = raidResultRewards(raid);
  const rate = Math.max(0, raid.hpLeft / raid.hp);
  const joined = raid.playerJoined || raid.playerSummoned;
  const defeated = raid.hpLeft <= 0;
  const canDeploy = aliveFormationNinjas().length > 0;
  const logs = [...(raid.logs || [])].sort((a, b) => b.at - a.at).slice(0, 12);
  const ranking = raidDamageRanking(raid);
  return `
    <div class="raid-battle-panel raid-live-panel">
      <div class="raid-hud">
        <button class="raid-back" data-action="mission-board">任務</button>
        <div class="raid-boss-chip"><b>${raidElementLabel(raid)}</b><span>${raid.name}</span></div>
        <div class="raid-hp-read">${Math.round(rate * 100)}%</div>
      </div>
      <div class="raid-boss-bar"><i style="width:${rate * 100}%"></i></div>
      <div class="raid-simple-stage raid-live-stage">
        <img src="${raid.img}" alt="${raid.name}">
        <strong>HP ${yen(Math.max(0, raid.hpLeft))} / ${yen(raid.hp)}</strong>
        <span>${raid.difficultyName} / ${raid.caller}</span>
      </div>
      <div class="raid-action-row">
        <button class="raid-attack-button" data-action="${joined ? "raid-attack" : "join-raid"}" ${defeated || !canDeploy ? "disabled" : ""}>${defeated ? "討伐成功" : joined ? "攻撃" : "参戦"}</button>
        <div><strong>出撃忍者 ${aliveFormationNinjas().length}/3</strong><span>基本報酬 ${resourceText(rewards)}</span></div>
      </div>
    </div>
    <div class="panel-card raid-log-panel">
      <h2>攻撃ログ</h2>
      <div class="raid-log-list">
        ${logs.map(log => `<article class="raid-log-entry ${log.type}"><b>${log.actor}</b><span>${log.text} / 与ダメージ ${yen(log.damage || 0)} / 被ダメージ ${yen(log.taken || 0)}</span></article>`).join("") || `<article class="raid-log-entry"><b>待機中</b><span>参戦すると戦闘が開始されます。</span></article>`}
      </div>
    </div>
    ${defeated ? `<div class="panel-card raid-result-panel"><span class="scene-kicker">討伐結果</span><h2>討伐リザルト</h2><div class="raid-ranking-list">${ranking.map((row, index) => `<article class="raid-rank-row ${index === 0 ? "top" : ""}"><b>${index + 1}</b><div><strong>${row.actor}</strong><span>与ダメージ ${yen(row.damage)}</span></div></article>`).join("")}</div><div class="raid-result-reward"><strong>獲得見込み</strong><span>${resourceText(resultRewards) || "報酬なし"}</span></div><button class="raid-claim-button" data-action="claim-raid-result" data-raid-id="${raid.id}">リザルト確認</button></div>` : ""}
  `;
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
    <div class="resource-tile">
      ${resourceArt[key] ? `<img class="resource-icon" src="${resourceArt[key]}" alt="">` : ""}
      <span>${resourceLabels[key] || key}</span><b>${yen(value)}</b>
    </div>
  `).join("");
}

function renderSavePanel() {
  return `
    <div class="panel-card save-panel">
      <span class="scene-kicker">保存データ</span>
      <h2>セーブ管理</h2>
      <p>端末内に保存します。別端末へ移す場合はセーブコードを使ってください。</p>
      <div class="cloud-auth-card">
        <div>
          <strong>Googleアカウント</strong>
          <span>${cloudUserLabel()} / ${cloudAuth.status}</span>
        </div>
        <div class="cloud-actions">
          ${cloudAuth.user
            ? `<button data-action="cloud-save">クラウド保存</button><button data-action="cloud-load">クラウド読込</button><button data-action="google-logout">ログアウト</button>`
            : `<button data-action="google-login" ${cloudAuth.enabled ? "" : "disabled"}>Googleログイン</button><button data-action="firebase-config">Firebase設定</button>`}
        </div>
      </div>
      <div class="save-status">
        <div><span>現在データ</span><b>${saveStamp()}</b></div>
        <div><span>忍者</span><b>${game.ninjas.length}名</b></div>
        <div><span>勾玉</span><b>${yen(game.gems)}</b></div>
      </div>
      <div class="save-slot-list">
        ${Array.from({ length: saveSlotCount }, (_, index) => renderSaveSlot(index + 1)).join("")}
      </div>
      <div class="action-grid">
        <button data-action="export-save">セーブコード出力</button>
        <button data-action="import-save">セーブコード入力</button>
      </div>
    </div>
  `;
}

function renderSaveSlot(slot) {
  const meta = readSaveMeta(slot);
  const label = meta?.broken ? "破損データ" : meta ? `${saveStamp(meta.savedAt)} / 里Lv.${meta.villageLevel} / 忍者${meta.ninjas}名` : "空きスロット";
  return `
    <article class="save-slot">
      <div>
        <strong>スロット${slot}</strong>
        <span>${label}</span>
      </div>
      <button data-action="save-slot" data-slot="${slot}">保存</button>
      <button data-action="load-slot" data-slot="${slot}" ${meta && !meta.broken ? "" : "disabled"}>読込</button>
    </article>
  `;
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
  healParty();
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
      ninja.hpCurrent = ninja.hp;
      ninja.attack += 18;
      ninja.defense += 14;
      ninja.speed += 5;
      ninja.isNew = false;
      game.reports.unshift(report(`${ninja.name}がLv.${ninja.level}になりました。`, [`戦力 +130`, `${ninja.skill}の熟練度が上昇`]));
      saveGame(true);
      render();
    }
  });
}

function craftEquipment(slot) {
  const normalizedSlot = equipmentSlots.includes(slot) ? slot : equipmentSlots[0];
  const slotIndex = Math.max(0, equipmentSlots.indexOf(normalizedSlot));
  const cost = {
    money: 1800,
    iron: slotIndex <= 3 ? 420 : 220,
    toolParts: 180
  };
  if (slotIndex >= 4) cost.silk = 120;
  showConfirm({
    title: `${normalizedSlot}を生産しますか？`,
    body: "兵装工房で部位ごとの装備を生産します。レア度はNからURまで抽選されます。",
    details: [`必要素材: ${resourceText(cost)}`, "レア度: N / R / SR / SSR / UR", "完成品は装備倉庫に追加"],
    ok: "生産",
    onOk: () => {
      if (!canPay(cost)) return;
      pay(cost);
      const rarityRoll = Math.random();
      const rarityData = equipmentRarityTable.find(item => rarityRoll < item.rate) || equipmentRarityTable[equipmentRarityTable.length - 1];
      const name = randomFrom(equipmentNames[normalizedSlot]);
      const item = equipment(`eq-${Date.now()}`, normalizedSlot, name, rarityData.rarity, 1, rarityData.power + Math.floor(Math.random() * 180), equipmentImageFor(normalizedSlot, name));
      game.equipment.unshift(item);
      game.reports.unshift(report(`${item.rarity} ${item.name}を生産しました。`, [`部位: ${normalizedSlot}`, `戦力 +${yen(item.power)}`]));
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

function raidRewards(raid) {
  const base = raidRewardTable[raid?.baseId] || missionCatalog.raid.baseRewards;
  return scaleRewards(base, getDifficulty(raid?.difficulty || "normal").multiplier);
}

function pushRaidLog(raid, entry) {
  raid.logs = [
    { id: `raid-log-${Date.now()}-${Math.random()}`, at: Date.now(), ...entry },
    ...(Array.isArray(raid.logs) ? raid.logs : [])
  ].slice(0, 32);
}

function raidElementLabel(raid) {
  return ({
    "raid-centipede": "毒",
    "raid-oni": "鬼",
    "raid-serpent": "水",
    "raid-firebird": "火",
    "raid-tengu": "風"
  })[raid?.baseId] || "敵";
}

function raidDamageRanking(raid) {
  const totals = {};
  (raid?.logs || []).forEach(log => {
    if (!log.damage || log.damage <= 0) return;
    totals[log.actor] = (totals[log.actor] || 0) + log.damage;
  });
  return Object.entries(totals)
    .map(([actor, damage]) => ({ actor, damage }))
    .sort((a, b) => b.damage - a.damage);
}

function raidPlayerDamage(raid) {
  return raidDamageRanking(raid).find(row => row.actor === "影月の里")?.damage || 0;
}

function raidResultRewards(raid) {
  const base = raidRewards(raid);
  const ranking = raidDamageRanking(raid);
  const total = ranking.reduce((sum, row) => sum + row.damage, 0);
  const playerDamage = raidPlayerDamage(raid);
  if (!playerDamage || !total) return {};
  const contribution = Math.max(0.12, Math.min(1, playerDamage / total));
  return Object.fromEntries(Object.entries(base).map(([key, value]) => [key, Math.max(1, Math.round(value * contribution))]));
}

function claimRaidResult(raidId) {
  const raid = game.raidEvents.find(item => item.id === raidId);
  if (!raid || raid.hpLeft > 0) return;
  if (!raid.rewarded) {
    const rewards = raidResultRewards(raid);
    addRewards(rewards);
    raid.rewarded = true;
    game.reports.unshift(report(`${raid.name} 討伐報酬`, [
      `与ダメージ: ${yen(raidPlayerDamage(raid))}`,
      `獲得: ${resourceText(rewards)}`
    ], "combat"));
  }
  game.raidEvents = game.raidEvents.filter(item => item.id !== raidId);
  selectedNpcId = game.raidEvents[0]?.id || null;
  activeView.missions = "board";
  maintainWorldRaids();
  saveGame(true);
  render();
}

function enterRaidBattle(raid) {
  if (!raid) return;
  raid.playerJoined = true;
  raid.participants = Math.max(raid.participants || 0, (raid.members?.length || 0) + 1);
  if (!raid.members?.some(member => member.name === "影月の里")) {
    raid.members = [{ name: "影月の里", power: teamPower(), avatar: "主" }, ...(raid.members || [])].slice(0, 10);
  }
  pushRaidLog(raid, { actor: "影月の里", damage: 0, taken: 0, text: "参戦", type: "player" });
  selectedNpcId = raid.id;
  selectedMissionKind = "raid";
  activeView.missions = "raid";
  saveGame(true);
  render();
  play("charge");
}

function playerRaidAttack() {
  const raid = game.raidEvents.find(item => item.id === selectedNpcId);
  if (!raid || raid.hpLeft <= 0) return;
  const difficulty = getDifficulty(raid.difficulty);
  if (!aliveFormationNinjas().length) {
    screenSubtitle.textContent = "出撃可能な忍者がいません";
    return;
  }
  raid.playerJoined = true;
  const damage = Math.min(raid.hpLeft, Math.round(teamPower() * (0.32 + difficulty.multiplier * 0.18) + Math.random() * 2600));
  const damageTaken = Math.round(difficulty.enemy * (0.16 + difficulty.multiplier * 0.12) + Math.random() * 1200);
  const hpDetails = damageFormationNinjas(damageTaken);
  raid.hpLeft = Math.max(0, raid.hpLeft - damage);
  raid.progress = Math.min(100, Math.round((1 - raid.hpLeft / raid.hp) * 100));
  pushRaidLog(raid, { actor: "影月の里", damage, taken: damageTaken, text: raid.hpLeft <= 0 ? "最後の一撃" : "攻撃", type: "player" });
  if (raid.hpLeft <= 0) {
    game.reports.unshift(report(`${raid.name} 討伐成功`, [`与ダメージ: ${yen(damage)} / 被ダメージ: ${yen(damageTaken)}`, ...(hpDetails.length ? hpDetails : ["HP損耗なし"]), "報酬はリザルト確認時に付与"] , "combat"));
    play("ssr");
  } else {
    play("place");
  }
  saveGame(true);
  render();
  fireFlash();
}

function tickRaidNpcCombat(raid, now = Date.now()) {
  if (!raid || raid.hpLeft <= 0 || !(raid.playerJoined || raid.playerSummoned)) return false;
  const interval = 1700 + Math.random() * 1400;
  if (now - (raid.lastNpcStrikeAt || 0) < interval) return false;
  const member = randomFrom((raid.members || raidCompanions).filter(item => item.name !== "影月の里")) || randomFrom(raidCompanions);
  const difficulty = getDifficulty(raid.difficulty);
  const damage = Math.min(raid.hpLeft, Math.round((member.power || 16000) * (0.08 + difficulty.multiplier * 0.035) + Math.random() * 1800));
  const taken = Math.round(400 + difficulty.enemy * 0.06 + Math.random() * 900);
  raid.hpLeft = Math.max(0, raid.hpLeft - damage);
  raid.progress = Math.min(100, Math.round((1 - raid.hpLeft / raid.hp) * 100));
  raid.lastNpcStrikeAt = now;
  pushRaidLog(raid, { actor: member.name, damage, taken, text: raid.hpLeft <= 0 ? "最後の一撃" : randomFrom(["忍具連撃", "背面奇襲", "術式援護", "追撃"]), type: "npc" });
  return true;
}

function confirmMission(kind) {
  const mission = missionCatalog[kind];
  const npc = npcVillages.find(item => item.id === selectedNpcId) || npcVillages[0];
  const targetRaid = game.raidEvents.find(item => item.id === selectedNpcId) || game.raidEvents[0];
  const difficulty = kind === "raid" ? getDifficulty(targetRaid?.difficulty || "normal") : getDifficulty();
  const rewards = scaleRewards(kind === "pvp" ? npc.loot : mission.baseRewards, difficulty.multiplier);
  const targetName = kind === "pvp" ? npc.name : kind === "raid" ? targetRaid.name : selectedAllies.length ? `${selectedAllies.length}勢力共闘` : "単独任務";
  showConfirm({
    title: `${mission.title}へ${kind === "raid" ? "即時攻撃" : "出発"}しますか？`,
    body: `${difficulty.name} / ${targetName}`,
    details: [`味方戦力: ${yen(teamPower())}`, `予想敵戦力: ${yen(Math.round(difficulty.enemy * difficulty.multiplier))}`, `見込み報酬: ${resourceText(rewards)}`, `出撃忍者: ${aliveFormationNinjas().length}/3`],
    ok: kind === "raid" ? "攻撃" : "出発",
    onOk: () => kind === "raid" ? enterRaidBattle(targetRaid) : startMission(kind, rewards, difficulty, targetName)
  });
}

function startMission(kind, rewards, difficulty, targetName) {
  if (!aliveFormationNinjas().length) return;
  game.activities.unshift({
    id: `${kind}-${Date.now()}`,
    kind,
    title: missionCatalog[kind].title,
    difficulty: difficulty.name,
    rewards,
    ninjaIds: formationNinjas().map(ninja => ninja.id),
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
  const hpDetails = damageFormationNinjas(damageTaken);
  addRewards(rewards);
  game.reports.unshift(report(`${activity.title} ${activity.difficulty}の戦果`, [
    success ? "結果: 勝利。敵主力を制圧。" : "結果: 撤退。目標の一部のみ確保。",
    `戦闘: 味方戦力 ${yen(ourPower)} / 敵戦力 ${yen(activity.enemyPower)} / 成功率 ${successRate}%`,
    `与ダメージ: ${yen(damageDealt)} / 被ダメージ: ${yen(damageTaken)}`,
    ...(hpDetails.length ? hpDetails : ["HP損耗なし"]),
    `報酬: ${resourceText(rewards)}`,
  ], "combat"));
  game.activities = game.activities.filter(item => item.id !== id);
  saveGame(true);
  render();
}

function healParty(targetId = null) {
  const cost = targetId ? { money: 520, herbs: 28 } : { money: 1200, herbs: 80 };
  if (!canPay(cost)) {
    screenSubtitle.textContent = "療養に必要な素材が足りません";
    return;
  }
  pay(cost);
  const targets = targetId ? [getNinja(targetId)].filter(Boolean) : game.ninjas;
  targets.forEach(ninja => restoreNinjaHp(ninja, targetId ? null : Math.ceil(ninjaHp(ninja).max * 0.5)));
  game.reports.unshift(report(targetId ? `${targets[0]?.name || "忍者"}を療養しました。` : "里の忍者を療養しました。", [`消費: ${resourceText(cost)}`]));
  saveGame(true);
  render();
}

function resolveRaid(raid, rewards, difficulty) {
  if (!aliveFormationNinjas().length) return;
  const damage = Math.min(raid.hpLeft, Math.round(teamPower() * (0.42 + difficulty.multiplier * 0.22)));
  const damageTaken = Math.round(difficulty.enemy * (0.18 + difficulty.multiplier * 0.16) + Math.random() * 900);
  const hpDetails = damageFormationNinjas(damageTaken);
  raid.hpLeft = Math.max(0, raid.hpLeft - damage);
  raid.progress = Math.min(100, raid.progress + Math.round(damage / raid.hp * 100));
  addRewards(rewards);
  game.reports.unshift(report(`${raid.name}へ即時攻撃`, [
    `${raid.caller}、${raid.participants}勢力と共闘`,
    `与ダメージ: ${yen(damage)} / 被ダメージ: ${yen(damageTaken)}`,
    ...(hpDetails.length ? hpDetails : ["HP損耗なし"]),
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
    <i class="${cardData.duplicate ? "dupe" : "new"}">${cardData.duplicate ? `+${cardData.shards}` : "新"}</i>
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
  const featuredRank = rarityRank(featured.rarity);
  const hasPremium = featuredRank >= 3;
  const showSpotlight = hasPremium || !featured.duplicate;
  summonButton.disabled = true;
  summonButton.textContent = "忍魂を結んでいます...";
  caption.textContent = "煙が濃く集まり、札が震える";
  stage.classList.add("charging");
  play("tap");
  await wait(360);
  play("charge");
  caption.textContent = "煙の奥で札がほどける";
  await wait(850);
  if (hasPremium) {
    stage.classList.add("rainbow");
    caption.textContent = `${featured.label}の気配、月影が走る`;
    fireFlash();
    await wait(520);
    rareCutin.querySelector("strong").textContent = `${featured.label} 忍者出現`;
    rareCutin.hidden = false;
    rareCutin.classList.add("show");
    play("ssr");
    await wait(1180);
    rareCutin.hidden = true;
    rareCutin.classList.remove("show");
  } else {
    caption.textContent = "煙が晴れ、忍影が姿を現す";
    await wait(420);
  }
  stage.hidden = true;
  if (showSpotlight) {
    newGet.hidden = false;
    newGet.classList.add("show");
    newGet.querySelector(".new-get-copy span").textContent = featured.duplicate ? "覚醒片" : "新加入";
    newGet.querySelector(".new-get-copy strong").textContent = featured.name;
    newGet.querySelector(".new-get-copy em").textContent = featured.duplicate ? `${featured.label} 重複 +${featured.shards}` : `${featured.label} ${featured.skill}`;
    newGet.querySelector(".new-get-hero").src = featured.img;
    play(hasPremium ? "ssr" : "place");
    await new Promise(resolve => {
      const timer = setTimeout(resolve, hasPremium ? 1700 : 1200);
      newGetNext.onclick = () => {
        clearTimeout(timer);
        resolve();
      };
    });
    newGet.hidden = true;
    newGet.classList.remove("show");
  }
  resultsView.hidden = false;
  play("fan");
  grid.innerHTML = "";
  currentCards.forEach(card => grid.append(createCard(card)));
  const renderedCards = [...grid.children];
  for (let index = 0; index < renderedCards.length; index += 1) {
    await wait(index === 0 ? 260 : 92);
    if (index === 0) {
      fireFlash();
      play(hasPremium ? "ssr" : "place");
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
  else if (activeTab === "missions" && (activeView.missions === "select" || activeView.missions === "raid")) activeView.missions = "board";
  else return;
  render();
}

function saveGame(silent = false) {
  try {
    const payload = makeSavePayload();
    localStorage.setItem(storageKey, payload);
    if (!silent) {
      screenSubtitle.textContent = "保存しました";
      window.setTimeout(renderHeader, 900);
    }
    return true;
  } catch (error) {
    console.error(error);
    if (!silent) screenSubtitle.textContent = "保存に失敗しました";
    return false;
  }
}

function saveGameSlot(slot) {
  try {
    const payload = makeSavePayload();
    localStorage.setItem(storageKey, payload);
    localStorage.setItem(saveSlotKey(slot), payload);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

function loadGame(silent = true, slot = null) {
  const key = slot ? saveSlotKey(slot) : storageKey;
  const raw = localStorage.getItem(key);
  if (!raw) {
    normalizeGameState();
    if (!silent) screenSubtitle.textContent = "保存データがありません";
    return false;
  }
  try {
    applyLoadedGame(JSON.parse(raw));
    localStorage.setItem(storageKey, JSON.stringify(game));
    if (!silent) {
      screenSubtitle.textContent = "読み込みました";
    }
    return true;
  } catch {
    localStorage.removeItem(key);
    normalizeGameState();
    if (!silent) screenSubtitle.textContent = "保存データを修復しました";
    return false;
  }
}

function exportSaveCode() {
  try {
    const code = encodeSaveText(makeSavePayload());
    window.prompt("このセーブコードをコピーしてください", code);
    localStorage.setItem(storageKey, JSON.stringify(game));
    screenSubtitle.textContent = "セーブコードを出力しました";
    return true;
  } catch (error) {
    console.error(error);
    screenSubtitle.textContent = "セーブコード出力に失敗しました";
    return false;
  }
}

function importSaveCode() {
  const code = window.prompt("セーブコードを貼り付けてください");
  if (!code) return false;
  try {
    const raw = decodeSaveText(code);
    const loaded = JSON.parse(raw);
    applyLoadedGame(loaded);
    const payload = JSON.stringify(game);
    localStorage.setItem(storageKey, payload);
    screenSubtitle.textContent = "セーブコードを読み込みました";
    return true;
  } catch (error) {
    console.error(error);
    screenSubtitle.textContent = "セーブコードが読み込めません";
    return false;
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
    selectedEquipSlot = "武器";
    activeView.ninjas = "detail";
    render();
  }
  if (target.dataset.formationSlot) {
    selectedFormationSlot = Number(target.dataset.formationSlot);
    render();
  }
  if (target.dataset.formationNinja) {
    const id = target.dataset.formationNinja;
    const slots = (game.formation.ninjaIds || []).slice(0, 3);
    while (slots.length < 3) slots.push(null);
    const existingIndex = slots.indexOf(id);
    if (existingIndex >= 0 && existingIndex !== selectedFormationSlot) slots[existingIndex] = slots[selectedFormationSlot] || null;
    slots[selectedFormationSlot] = id;
    game.formation.ninjaIds = slots.filter(Boolean).slice(0, 3);
    saveGame(true);
    render();
  }
  if (target.dataset.missionKind) {
    selectedMissionKind = target.dataset.missionKind;
    selectedNpcId = target.dataset.missionKind === "raid" ? game.raidEvents[0].id : npcVillages[0].id;
    selectedAllies = [];
    activeView.missions = target.dataset.missionKind === "raid" ? "select" : "select";
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
    activeView.missions = "raid";
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
    const loaded = loadGame(true);
    render();
    screenSubtitle.textContent = loaded ? "読み込みました" : "保存データがありません";
  }
  if (action === "ninja-page-prev") {
    ninjaPage = Math.max(0, ninjaPage - 1);
    render();
  }
  if (action === "ninja-page-next") {
    ninjaPage += 1;
    render();
  }
  if (action === "save-slot") {
    const ok = saveGameSlot(target.dataset.slot);
    render();
    screenSubtitle.textContent = ok ? `スロット${target.dataset.slot}に保存しました` : "保存に失敗しました";
  }
  if (action === "load-slot") {
    const loaded = loadGame(true, target.dataset.slot);
    render();
    screenSubtitle.textContent = loaded ? `スロット${target.dataset.slot}を読み込みました` : "保存データがありません";
  }
  if (action === "export-save") {
    const exported = exportSaveCode();
    render();
    if (exported) screenSubtitle.textContent = "セーブコードを出力しました";
  }
  if (action === "import-save") {
    const loaded = importSaveCode();
    render();
    if (loaded) screenSubtitle.textContent = "セーブコードを読み込みました";
  }
  if (action === "firebase-config") {
    promptFirebaseConfig();
  }
  if (action === "google-login") {
    signInWithGoogle().then(() => render());
  }
  if (action === "google-logout") {
    signOutGoogle().then(() => render());
  }
  if (action === "cloud-save") {
    saveGameCloud().then(() => render());
  }
  if (action === "cloud-load") {
    loadGameCloud();
  }
  if (action === "confirm-upgrade") confirmUpgradeFacility(target.dataset.id);
  if (action === "confirm-train") confirmTrainNinja(target.dataset.id);
  if (action === "heal-party") healParty();
  if (action === "heal-ninja") healParty(target.dataset.id);
  if (action === "craft-equipment") craftEquipment(target.dataset.slot);
  if (action === "confirm-enhance-equip") confirmEnhanceEquip(target.dataset.id);
  if (target.dataset.equipSlot) {
    selectedEquipSlot = target.dataset.equipSlot;
    render();
  }
  if (action === "equip-item") equipItem(target.dataset.ninjaId, target.dataset.equipId);
  if (action === "clear-equips") {
    game.equipment.forEach(item => { if (item.equippedBy === target.dataset.id) item.equippedBy = null; });
    saveGame(true);
    render();
  }
  if (action === "confirm-mission") confirmMission(target.dataset.kind);
  if (action === "join-raid") {
    const raid = game.raidEvents.find(item => item.id === selectedNpcId);
    enterRaidBattle(raid);
  }
  if (action === "raid-attack") playerRaidAttack();
  if (action === "claim-raid-result") claimRaidResult(target.dataset.raidId);
  if (action === "summon-player-raid") {
    const raid = createWorldRaid(randomFrom(raidBosses), { name: "影月の里", power: teamPower() }, target.dataset.difficultyId, true);
    game.raidEvents.unshift(raid);
    selectedNpcId = raid.id;
    selectedMissionKind = "raid";
    activeView.missions = "raid";
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
  const now = Date.now();
  let changed = false;
  game.raidEvents.forEach(raid => {
    changed = tickRaidNpcCombat(raid, now) || changed;
  });
  maintainWorldRaids();
  if (changed) saveGame(true);
  if (activeTab === "missions") render();
}, 1000);

initCloudAuth();
showTab("village");
