const SAVE_KEY = "kemonoQuestRaid:fantasyRaid:v2";
const TICK_MS = 1000;
const OFFLINE_CAP_MS = 6 * 60 * 60 * 1000;

const characters = [
  { id: "silver", name: "Silver Bell", role: "回復", trait: "月鐘の祈り", skill: "報酬と薬草の獲得量を上げる", dps: 18, img: "candidates/diverse5-silver-bell.png" },
  { id: "crimson", name: "Crimson Paladin", role: "盾", trait: "紅鋼の誓い", skill: "ボスの反撃を受け止め、放置DPSを安定させる", dps: 22, img: "candidates/diverse5-crimson-paladin.png" },
  { id: "mint", name: "Mint Parasol", role: "支援", trait: "翠風の結界", skill: "全員の行動間隔を短縮する", dps: 20, img: "candidates/diverse5-mint-parasol.png" },
  { id: "blue", name: "Blue Tactician", role: "妨害", trait: "蒼策の号令", skill: "敵防御を崩し、編成DPSを伸ばす", dps: 24, img: "candidates/diverse5-blue-tactician.png" },
  { id: "blonde", name: "Blonde Carnival", role: "攻撃", trait: "星彩の連撃", skill: "高い単体DPSでボスを削る", dps: 30, img: "candidates/diverse5-blonde-carnival.png" },
  { id: "aurora", name: "Aurora Lancer", role: "攻撃", trait: "極光の槍", skill: "バースト時に追加ダメージ", dps: 34, img: "candidates/gacha-aurora-lancer.png" },
  { id: "verdant", name: "Verdant Alchemist", role: "回復", trait: "薬草錬成", skill: "遠征の薬草報酬を増やす", dps: 21, img: "candidates/gacha-verdant-alchemist.png" },
  { id: "obsidian", name: "Obsidian Idol", role: "妨害", trait: "黒曜のステージ", skill: "ボスの防御を下げ、魔核報酬を増やす", dps: 27, img: "candidates/gacha-obsidian-idol.png" },
  { id: "sunlit", name: "Sunlit Ranger", role: "攻撃", trait: "陽矢の狙撃", skill: "放置DPSを大きく伸ばす", dps: 32, img: "candidates/gacha-sunlit-ranger.png" },
  { id: "lilac", name: "Lilac Oracle", role: "支援", trait: "星詠みの予告", skill: "討伐時の輝晶と遺物を増やす", dps: 23, img: "candidates/gacha-lilac-oracle.png" },
  { id: "turquoise", name: "Turquoise Mender", role: "回復", trait: "救護結界", skill: "訓練素材の自然回復を増やす", dps: 20, img: "candidates/gacha-turquoise-mender.png" },
  { id: "ruby", name: "Ruby Berserker", role: "盾", trait: "紅斧の前衛", skill: "盾役ながら高火力で前線を支える", dps: 29, img: "candidates/gacha-ruby-berserker.png" },
  { id: "cobalt", name: "Cobalt Engineer", role: "支援", trait: "魔導工具", skill: "装備強化の効率を上げる", dps: 25, img: "candidates/gacha-cobalt-engineer.png" }
];

const raidBosses = [
  {
    id: "arkwyrm",
    name: "晶翼アークワーム",
    title: "プリズム宝物庫の主",
    subtitle: "結晶翼で空を裂く竜。鉱石と魔核を多く落とします。",
    img: "assets/generated/bosses/boss-arkwyrm-prism.png",
    hp: 180000,
    drops: { crystals: 170, ore: 34, essence: 7, relics: 1 }
  },
  {
    id: "colossus",
    name: "鉄門のコロッサス",
    title: "崩れた城塞の巨人",
    subtitle: "古代城門そのものが動き出した巨像。装備素材向きです。",
    img: "assets/generated/bosses/boss-iron-colossus.png",
    hp: 230000,
    drops: { crystals: 145, ore: 58, essence: 5, relics: 1 }
  },
  {
    id: "matriarch",
    name: "虚殻の女王",
    title: "影巣を統べる母体",
    subtitle: "妨害役が刺さる毒殻の女王。魔核と薬草を落とします。",
    img: "assets/generated/bosses/boss-void-matriarch.png",
    hp: 205000,
    drops: { crystals: 155, herbs: 36, essence: 10, relics: 1 }
  },
  {
    id: "leviathan",
    name: "太陽鱗リヴァイアサン",
    title: "空海を巡る神獣",
    subtitle: "硬い光鱗を持つ長大な竜。輝晶報酬が高めです。",
    img: "assets/generated/bosses/boss-solar-leviathan.png",
    hp: 260000,
    drops: { crystals: 220, ore: 24, essence: 8, relics: 2 }
  },
  {
    id: "stag",
    name: "冥樹ネクロリス",
    title: "石森の亡霊王",
    subtitle: "静かに森を侵す石の獣王。遺物の期待値が高い相手です。",
    img: "assets/generated/bosses/boss-necrolith-stag.png",
    hp: 240000,
    drops: { crystals: 165, herbs: 28, essence: 6, relics: 3 }
  }
];

const materialDefs = {
  training: { label: "訓練素材", short: "訓", use: "キャラ強化", color: "green" },
  ore: { label: "星鉱石", short: "鉱", use: "装備作成", color: "blue" },
  herbs: { label: "霊草", short: "草", use: "回復役育成", color: "green" },
  essence: { label: "魔核", short: "核", use: "装備強化", color: "violet" },
  relics: { label: "古代遺物", short: "遺", use: "高位装備", color: "gold" }
};

const roleClass = { 回復: "heal", 盾: "guard", 支援: "support", 妨害: "support", 攻撃: "attack" };
const worldNames = ["Aoi", "Ren", "Mika", "Towa", "Nagi", "Sora", "Kiri"];
const equipmentSlots = ["武器", "鎧", "頭", "指輪"];
const equipmentRarityTable = [
  { rarity: "UR", rate: 0.02, power: 42 },
  { rarity: "SSR", rate: 0.1, power: 30 },
  { rarity: "SR", rate: 0.32, power: 20 },
  { rarity: "R", rate: 0.62, power: 12 },
  { rarity: "N", rate: 1, power: 7 }
];
const equipmentNames = {
  武器: ["星晶の剣", "蒼刃レイライン", "古竜の短槍"],
  鎧: ["魔晶騎士鎧", "巡礼者の外套", "護光の胸甲"],
  頭: ["星詠みの冠", "迷宮守りの兜", "月灯のサークレット"],
  指輪: ["女神の指輪", "輝晶のリング", "守護紋の指輪"]
};
const equipmentArtBySlot = {
  武器: "assets/generated/equipment/weapon.png",
  鎧: "assets/generated/equipment/body.png",
  頭: "assets/generated/equipment/head.png",
  指輪: "assets/generated/equipment/ring.png"
};
const uiIcons = {
  guild: "assets/generated/ui/guild.png",
  characters: "assets/generated/ui/characters.png",
  party: "assets/generated/ui/party.png",
  equipment: "assets/generated/ui/equipment.png",
  quest: "assets/generated/ui/quest.png",
  summon: "assets/generated/ui/summon.png",
  save: "assets/generated/ui/save.png"
};

const panels = {
  village: document.querySelector("#villagePanel"),
  characters: document.querySelector("#charactersPanel"),
  formation: document.querySelector("#formationPanel"),
  equipment: document.querySelector("#equipmentPanel"),
  missions: document.querySelector("#missionsPanel"),
  save: document.querySelector("#savePanel")
};

const phone = document.querySelector(".phone");
const tabs = [...document.querySelectorAll(".tab")];
const screenTitle = document.querySelector("#screenTitle");
const screenSubtitle = document.querySelector("#screenSubtitle");
const ticketCurrency = document.querySelector("#ticketCurrency");
const crystalCurrency = document.querySelector("#crystalCurrency");
const flash = document.querySelector("#flash");
const gachaStage = document.querySelector("#gachaStage");
const resultsView = document.querySelector("#results");
const resultGrid = document.querySelector(".grid");
const summonButton = document.querySelector("#summon");
const againButton = document.querySelector("#again");
const caption = document.querySelector("#caption");
const newGet = document.querySelector("#newGet");
const newGetNext = document.querySelector("#newGetNext");
const confirmModal = document.querySelector("#confirmModal");
const confirmTitle = document.querySelector("#confirmTitle");
const confirmBody = document.querySelector("#confirmBody");
const confirmDetails = document.querySelector("#confirmDetails");
const confirmOk = document.querySelector("#confirmOk");
const confirmCancel = document.querySelector("#confirmCancel");

let activeTab = "village";
let activeView = { missions: "board" };
let selectedFormationSlot = 0;
let selectedEquipSlot = "武器";
let selectedEquipCharacter = "crimson";
let pendingConfirm = null;
let lastTick = Date.now();
let currentCards = [];

const defaultMaterials = () => ({ training: 120, ore: 80, herbs: 60, essence: 20, relics: 0 });

const defaultGame = () => ({
  tickets: 3,
  crystals: 260,
  materials: defaultMaterials(),
  room: makeRoom(),
  bossIndex: 0,
  bossLevel: 1,
  bossHp: raidBosses[0].hp,
  bossMaxHp: raidBosses[0].hp,
  pendingReward: 0,
  totalDamage: 0,
  lastDamage: 0,
  lastSavedAt: Date.now(),
  formation: ["crimson", "silver", "blonde"],
  owned: {
    silver: { level: 1, copies: 1 },
    crimson: { level: 1, copies: 1 },
    blonde: { level: 1, copies: 1 }
  },
  charge: {},
  equipment: [
    equipment("eq-sword", "武器", "星晶の剣", "SR", 1, 20, "crimson"),
    equipment("eq-armor", "鎧", "魔晶騎士鎧", "R", 1, 12, "silver"),
    equipment("eq-ring", "指輪", "女神の指輪", "R", 1, 12, "blonde")
  ],
  reports: [
    { type: "live", title: "ギルド待機開始", text: "放置中も編成メンバーが自動でレイドへ参加します。", time: Date.now() }
  ],
  activities: [],
  sound: true
});

let game = loadGame();

function makeRoom() {
  const hash = location.hash.replace("#room=", "").trim();
  if (hash) return hash.slice(0, 6).toUpperCase();
  const room = Math.random().toString(36).slice(2, 8).toUpperCase();
  history.replaceState(null, "", `#room=${room}`);
  return room;
}

function normalizeMaterials(value) {
  if (typeof value === "number") return { ...defaultMaterials(), training: value };
  return { ...defaultMaterials(), ...(value || {}) };
}

function loadGame() {
  try {
    const saved = JSON.parse(localStorage.getItem(SAVE_KEY));
    if (!saved) return defaultGame();
    const base = defaultGame();
    const bossIndex = Number.isInteger(saved.bossIndex) ? saved.bossIndex % raidBosses.length : 0;
    return {
      ...base,
      ...saved,
      room: makeRoom(),
      bossIndex,
      materials: normalizeMaterials(saved.materials),
      owned: { ...base.owned, ...(saved.owned || {}) },
      charge: { ...base.charge, ...(saved.charge || {}) },
      equipment: normalizeEquipment(saved.equipment || base.equipment),
      reports: Array.isArray(saved.reports) ? saved.reports.slice(0, 18) : base.reports,
      activities: Array.isArray(saved.activities) ? saved.activities : []
    };
  } catch {
    return defaultGame();
  }
}

function saveGame(silent = true) {
  game.lastSavedAt = Date.now();
  localStorage.setItem(SAVE_KEY, JSON.stringify(game));
  if (!silent) screenSubtitle.textContent = "この端末にローカル保存しました";
}

function yen(value) {
  return Math.floor(value).toLocaleString("ja-JP");
}

function boss() {
  return raidBosses[game.bossIndex % raidBosses.length];
}

function getCharacter(id) {
  return characters.find(character => character.id === id);
}

function owned(id) {
  return game.owned[id] || null;
}

function material(key) {
  return game.materials[key] || 0;
}

function addMaterials(rewards = {}) {
  Object.entries(rewards).forEach(([key, value]) => {
    if (key === "crystals") game.crystals += value;
    else game.materials[key] = material(key) + value;
  });
}

function equipment(id, slot, name, rarity, level, powerValue, equippedBy = null) {
  return { id, slot, name, rarity, level, power: powerValue, equippedBy, img: equipmentImageFor(slot) };
}

function normalizeEquipment(items) {
  return (Array.isArray(items) ? items : []).map(item => {
    const slot = equipmentSlots.includes(item.slot) ? item.slot : "武器";
    return {
      ...item,
      slot,
      rarity: item.rarity || "N",
      level: item.level || 1,
      power: item.power || 7,
      equippedBy: item.equippedBy || null,
      img: equipmentImageFor(slot)
    };
  });
}

function equipmentImageFor(slot) {
  return equipmentArtBySlot[slot] || equipmentArtBySlot.武器;
}

function equippedPower(characterId) {
  return game.equipment
    .filter(item => item.equippedBy === characterId)
    .reduce((sum, item) => sum + item.power, 0);
}

function power(id) {
  const character = getCharacter(id);
  const data = owned(id);
  if (!character || !data) return 0;
  const base = character.dps * (1 + (data.level - 1) * .34) * (1 + Math.max(0, data.copies - 1) * .09);
  return Math.round(base + equippedPower(id));
}

function roleBonus(role) {
  return game.formation.some(id => getCharacter(id)?.role === role);
}

function teamDps() {
  const base = game.formation.reduce((sum, id) => sum + power(id), 0);
  const support = game.formation.filter(id => ["支援", "妨害"].includes(getCharacter(id)?.role)).length;
  const guard = roleBonus("盾") ? 1.06 : 1;
  const healer = roleBonus("回復") ? 1.05 : 1;
  return Math.max(1, Math.round(base * (1 + support * .08) * guard * healer));
}

function applyProgress(ms, offline = false) {
  const seconds = Math.floor(ms / 1000);
  if (seconds <= 0) return;
  const damage = teamDps() * seconds;
  game.bossHp = Math.max(0, game.bossHp - damage);
  game.totalDamage += damage;
  game.lastDamage = damage;
  game.pendingReward += Math.floor(damage / 430) + (roleBonus("回復") ? Math.floor(seconds / 14) : 0);
  game.materials.training += Math.floor(seconds / (roleBonus("回復") ? 70 : 90));
  game.formation.forEach(id => {
    game.charge[id] = ((game.charge[id] || 0) + seconds * 20) % 100;
  });
  if (offline) addReport("live", "オフライン進行", `${yen(damage)} ダメージ / 報酬 ${yen(Math.floor(damage / 430))} 輝晶`);
  if (game.bossHp <= 0) defeatBoss();
}

function defeatBoss() {
  const current = boss();
  const levelBonus = 1 + (game.bossLevel - 1) * .08;
  const rewards = {
    crystals: Math.round(current.drops.crystals * levelBonus + game.bossLevel * 24),
    ore: Math.round((current.drops.ore || 0) * levelBonus),
    herbs: Math.round((current.drops.herbs || 0) * levelBonus),
    essence: Math.round(current.drops.essence * levelBonus),
    relics: current.drops.relics + (roleBonus("支援") && Math.random() < .35 ? 1 : 0)
  };
  game.pendingReward += rewards.crystals;
  addMaterials({ ore: rewards.ore, herbs: rewards.herbs, essence: rewards.essence, relics: rewards.relics });
  addReport("raid", `${current.name} Lv${game.bossLevel} 討伐`, `輝晶${yen(rewards.crystals)} / 鉱石${rewards.ore} / 魔核${rewards.essence} / 遺物${rewards.relics}`);
  game.bossLevel += 1;
  game.bossIndex = (game.bossIndex + 1) % raidBosses.length;
  const next = boss();
  game.bossMaxHp = Math.round(next.hp * Math.pow(1.22, game.bossLevel - 1));
  game.bossHp = game.bossMaxHp;
  fireFlash();
}

function npcHit() {
  const name = worldNames[Math.floor(Math.random() * worldNames.length)];
  const damage = Math.round(teamDps() * (.55 + Math.random() * 1.6));
  game.bossHp = Math.max(0, game.bossHp - damage);
  game.lastDamage = damage;
  addReport("ally", `${name} が共闘`, `${yen(damage)} ダメージ。ROOM ${game.room} に参加中。`);
  if (game.bossHp <= 0) defeatBoss();
}

function addReport(type, title, text) {
  game.reports.unshift({ type, title, text, time: Date.now() });
  game.reports = game.reports.slice(0, 18);
}

function addActivity(title, text, reward = { training: 20 }, seconds = 45) {
  game.activities.unshift({
    id: `act-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    title,
    text,
    reward,
    finishAt: Date.now() + seconds * 1000
  });
  game.activities = game.activities.slice(0, 5);
}

function renderHeader() {
  const titles = {
    village: ["冒険者ギルド", `ROOM ${game.room} / ${boss().name} Lv${game.bossLevel}`],
    characters: ["仲間名簿", `${Object.keys(game.owned).length} / ${characters.length} 所持`],
    formation: ["出撃編成", `${yen(teamDps())} DPS / 3人編成`],
    equipment: ["装備工房", `${game.equipment.length} 所持 / ${selectedEquipSlot}`],
    missions: ["クエストボード", "放置レイドと素材遠征"],
    gacha: ["契約召喚", `契約 ${game.tickets} / 輝晶 ${yen(game.crystals)}`],
    save: ["冒険の記録", "ローカル保存 / コード入出力"]
  };
  const [title, subtitle] = titles[activeTab];
  screenTitle.textContent = title;
  screenSubtitle.textContent = subtitle;
  ticketCurrency.textContent = `契約 ${game.tickets}`;
  crystalCurrency.textContent = `輝晶 ${yen(game.crystals)}`;
}

function showTab(tab) {
  activeTab = tab;
  phone.dataset.screen = tab;
  tabs.forEach(button => button.classList.toggle("active", button.dataset.tab === tab));
  Object.entries(panels).forEach(([name, panel]) => { panel.hidden = name !== tab; });
  const isGacha = tab === "gacha";
  gachaStage.hidden = !isGacha;
  resultsView.hidden = true;
  newGet.hidden = true;
  if (isGacha) resetGacha();
  render();
}

function render() {
  renderHeader();
  renderVillage();
  renderCharacters();
  renderFormation();
  renderEquipment();
  renderMissions();
  renderSave();
}

function resourceGrid() {
  return `
    <div class="material-grid">
      ${Object.entries(materialDefs).map(([key, def]) => `
        <div class="material-chip ${def.color}">
          <b>${def.short}</b>
          <span>${def.label}</span>
          <strong>${yen(material(key))}</strong>
          <small>${def.use}</small>
        </div>
      `).join("")}
    </div>
  `;
}

function renderVillage() {
  panels.village.innerHTML = `
    <article class="panel-card hero-panel">
      <span class="scene-kicker">Guild Hall</span>
      <h1>冒険者ギルドの作戦室</h1>
      <p>放置で進む協力レイド。仲間・装備・素材を増やして次のボスへ進みます。</p>
      <div class="metric-grid">
        <div><b>${yen(teamDps())}</b><span>DPS</span></div>
        <div><b>${eta()}</b><span>討伐予測</span></div>
        <div><b>${yen(game.pendingReward)}</b><span>未受取</span></div>
      </div>
      <div class="command-grid home-command-grid">
        ${commandCard({ tab: "missions", icon: uiIcons.quest, kicker: "RAID", title: "クエスト", text: `${boss().name}へ`, cta: "挑戦" })}
        ${commandCard({ tab: "equipment", icon: uiIcons.equipment, kicker: "FORGE", title: "装備工房", text: "鉱石と魔核を使用", cta: "鍛造" })}
        ${commandCard({ tab: "gacha", icon: uiIcons.summon, kicker: "SUMMON", title: "契約召喚", text: "仲間を獲得", cta: "召喚" })}
      </div>
      <div class="action-row compact-actions">
        <button data-action="claim">報酬受取</button>
        <button class="secondary" data-action="copy-room">部屋URL</button>
      </div>
    </article>
    <article class="panel-card">
      <h2>素材庫</h2>
      ${resourceGrid()}
    </article>
    <article class="panel-card">
      <h2>ギルド掲示板</h2>
      <div class="npc-activity-list">${activityHtml(game.reports.slice(0, 5))}</div>
    </article>
  `;
}

function commandCard({ action = "", tab = "", icon, kicker, title, text, cta, tone = "" }) {
  const attrs = `${action ? ` data-action="${action}"` : ""}${tab ? ` data-tab="${tab}"` : ""}`;
  return `
    <button class="command-card ${tone}"${attrs}>
      <img src="${icon}" alt="">
      <div>
        <small>${kicker}</small>
        <strong>${title}</strong>
        <span>${text}</span>
      </div>
      <b>${cta}</b>
    </button>
  `;
}

function renderCharacters() {
  panels.characters.innerHTML = `
    <article class="panel-card">
      <span class="scene-kicker">Adventurers</span>
      <h1>仲間名簿</h1>
      <p>追加された8人を含む全13人がガチャ排出対象です。</p>
      <div class="rarity-strip">
        <span class="role-chip guard">盾</span>
        <span class="role-chip heal">回復</span>
        <span class="role-chip support">支援</span>
        <span class="role-chip support">妨害</span>
        <span class="role-chip attack">攻撃</span>
      </div>
    </article>
    <div class="row-list">${characters.map(characterRow).join("")}</div>
  `;
}

function characterRow(character) {
  const data = owned(character.id);
  const cost = data ? 45 + data.level * 35 : 0;
  return `
    <article class="row-card ${data ? "" : "selected"}">
      <img src="${character.img}" alt="${character.name}">
      <div>
        <strong>${character.name}</strong>
        <span>${character.role} / ${character.trait}</span>
        <small>${data ? `Lv ${data.level} / ${power(character.id)} DPS / 装備+${equippedPower(character.id)} / 重なり${data.copies}` : "未入手"}</small>
      </div>
      ${data ? `<button data-upgrade="${character.id}">${cost}素材</button>` : `<em>未</em>`}
    </article>
  `;
}

function renderFormation() {
  const slots = [...game.formation];
  while (slots.length < 3) slots.push(null);
  panels.formation.innerHTML = `
    <article class="panel-card">
      <span class="scene-kicker">Party</span>
      <h1>3人編成</h1>
      <p>役目を混ぜるほど放置DPSと報酬効率が安定します。</p>
      <div class="stat-grid">
        <div><b>${yen(teamDps())}</b><span>現在DPS</span></div>
        <div><b>${roleBonus("回復") ? "有効" : "なし"}</b><span>回復補正</span></div>
        <div><b>${roleBonus("妨害") ? "有効" : "通常"}</b><span>防御崩し</span></div>
      </div>
    </article>
    <article class="panel-card">
      <h2>スロット</h2>
      <div class="row-list">${slots.map((id, index) => slotRow(id, index)).join("")}</div>
    </article>
    <article class="panel-card">
      <h2>入れ替え候補</h2>
      <div class="row-list">${characters.filter(c => owned(c.id)).map(c => pickRow(c)).join("")}</div>
    </article>
  `;
}

function slotRow(id, index) {
  const character = id ? getCharacter(id) : null;
  return `
    <article class="row-card ${selectedFormationSlot === index ? "selected" : ""}">
      ${character ? `<img src="${character.img}" alt="${character.name}">` : `<img src="assets/hero.png" alt="">`}
      <div>
        <strong>Slot ${index + 1}: ${character ? character.name : "空き"}</strong>
        <span>${character ? `${character.role} / ${character.skill}` : "キャラを選択してください"}</span>
        <small>${character ? `チャージ ${Math.round(game.charge[character.id] || 0)}%` : ""}</small>
      </div>
      <button class="secondary" data-slot="${index}">選択</button>
    </article>
  `;
}

function pickRow(character) {
  return `
    <article class="row-card">
      <img src="${character.img}" alt="${character.name}">
      <div>
        <strong>${character.name}</strong>
        <span>${character.role} / ${character.skill}</span>
        <small>${power(character.id)} DPS</small>
      </div>
      <button data-pick="${character.id}">配置</button>
    </article>
  `;
}

function renderEquipment() {
  const selected = getCharacter(selectedEquipCharacter) && owned(selectedEquipCharacter)
    ? getCharacter(selectedEquipCharacter)
    : characters.find(character => owned(character.id));
  if (selected) selectedEquipCharacter = selected.id;
  const equipped = selected ? game.equipment.filter(item => item.equippedBy === selected.id) : [];
  const current = slot => equipped.find(item => item.slot === slot);
  const available = game.equipment.filter(item => item.slot === selectedEquipSlot);
  panels.equipment.innerHTML = `
    <article class="panel-card hero-panel equipment-hero">
      <span class="scene-kicker">Loadout</span>
      <h1>装備欄</h1>
      <p>武器・鎧・頭・指輪を装備し、鉱石と魔核で強化します。</p>
      ${selected ? `
        <div class="loadout-stage">
          <div class="loadout-character"><img src="${selected.img}" alt="${selected.name}"><strong>${selected.name}</strong><span>${selected.role} / ${power(selected.id)} DPS</span></div>
          <div class="loadout-ring">
            ${equipmentSlots.map((slot, index) => {
              const item = current(slot);
              return `<button class="loadout-slot slot-${index} ${selectedEquipSlot === slot ? "active" : ""}" data-equip-slot="${slot}">
                ${item ? `<img src="${item.img}" alt="">` : `<i>${slot.slice(0, 1)}</i>`}
                <b>${slot}</b><span>${item ? `${item.rarity} ${item.name}` : "未装備"}</span>
              </button>`;
            }).join("")}
          </div>
        </div>` : `<p>装備できる仲間がいません。</p>`}
    </article>
    <article class="panel-card compact-visual">
      <h2>装備する仲間</h2>
      <div class="character-chip-row">${characters.filter(c => owned(c.id)).map(character => `
        <button class="character-chip ${selectedEquipCharacter === character.id ? "active" : ""}" data-equip-character="${character.id}">
          <img src="${character.img}" alt=""><span>${character.name}</span>
        </button>
      `).join("")}</div>
    </article>
    <article class="panel-card compact-visual">
      <h2>${selectedEquipSlot}を選択</h2>
      <div class="equip-slot-menu">
        ${equipmentSlots.map(slot => `<button class="equip-slot-button ${selectedEquipSlot === slot ? "active" : ""}" data-equip-slot="${slot}">
          <img src="${equipmentImageFor(slot)}" alt=""><span>${slot}</span>
        </button>`).join("")}
      </div>
      <button class="forge-command-card" data-action="craft-equipment" data-slot-name="${selectedEquipSlot}">
        <img src="${uiIcons.equipment}" alt="">
        <div><small>FORGE</small><strong>${selectedEquipSlot}を鍛造</strong><span>鉱石${selectedEquipSlot === "指輪" ? 55 : 45} / 魔核${selectedEquipSlot === "指輪" ? 8 : 5}</span></div>
        <b>作成</b>
      </button>
      <div class="row-list">${available.map(equipmentPickRow).join("") || `<article class="row-card no-art"><div><strong>${selectedEquipSlot}の装備なし</strong><span>鍛造で追加できます。</span></div><em>空</em></article>`}</div>
    </article>
    <article class="panel-card compact-visual">
      <h2>装備倉庫</h2>
      <div class="equipment-gallery">${equipmentSlots.map(slot => `
        <div class="equipment-gallery-group"><b>${slot}</b><div>${game.equipment.filter(item => item.slot === slot).map(item => `<img src="${item.img}" alt="${item.name}" title="${item.name}">`).join("") || "<span>空</span>"}</div></div>
      `).join("")}</div>
    </article>
  `;
}

function equipmentPickRow(item) {
  const owner = item.equippedBy ? getCharacter(item.equippedBy) : null;
  return `
    <article class="row-card equipment-row ${item.equippedBy === selectedEquipCharacter ? "selected" : ""}">
      <img class="equipment-icon" src="${item.img}" alt="">
      <div>
        <strong><span class="equip-rarity ${item.rarity.toLowerCase()}">${item.rarity}</span> ${item.name}</strong>
        <span>${item.slot} Lv.${item.level} / DPS +${yen(item.power)}</span>
        <small>${owner ? `${owner.name} が装備中` : "装備可能"}</small>
      </div>
      <button data-action="equip-item" data-equip-id="${item.id}">装備</button>
      <button class="secondary" data-action="enhance-equip" data-equip-id="${item.id}">強化</button>
    </article>
  `;
}

function renderMissions() {
  panels.missions.innerHTML = activeView.missions === "raid" ? raidBattleHtml() : missionBoardHtml();
}

function missionBoardHtml() {
  const current = boss();
  return `
    <article class="panel-card hero-panel">
      <span class="scene-kicker">Quest Board</span>
      <h1>ギルドクエスト</h1>
      <p>5種のレイドボスを順番に討伐し、素材を集めます。</p>
      <div class="metric-grid">
        <div><b>Lv ${game.bossLevel}</b><span>敵Lv</span></div>
        <div><b>${yen(game.bossHp)}</b><span>残HP</span></div>
        <div><b>${yen(game.pendingReward)}</b><span>未受取</span></div>
      </div>
      <div class="command-grid quest-command-grid">
        ${commandCard({ action: "enter-raid", icon: uiIcons.quest, kicker: "BOSS", title: current.name, text: current.title, cta: "出撃", tone: "raid-command" })}
        ${commandCard({ action: "spawn-activity", icon: uiIcons.guild, kicker: "IDLE", title: "素材遠征", text: "45秒で素材回収", cta: "派遣", tone: "expedition-command" })}
      </div>
    </article>
    <article class="panel-card boss-roster-panel">
      <h2>レイドボス一覧</h2>
      <div class="boss-roster">${raidBosses.map((item, index) => `
        <div class="boss-thumb ${index === game.bossIndex ? "active" : ""}">
          <img src="${item.img}" alt="${item.name}">
          <span>${item.name}</span>
        </div>
      `).join("")}</div>
    </article>
    <article class="panel-card">
      <h2>進行中クエスト</h2>
      <div class="row-list">${game.activities.length ? game.activities.map(activityRow).join("") : `<article class="row-card no-art"><div><strong>クエストなし</strong><span>素材遠征を開始できます。</span></div><em>待機</em></article>`}</div>
    </article>
    <article class="panel-card">
      <h2>ギルド活動</h2>
      <div class="npc-activity-list">${activityHtml(game.reports.slice(0, 8))}</div>
    </article>
  `;
}

function activityRewardText(reward) {
  return Object.entries(reward || {})
    .map(([key, value]) => `${materialDefs[key]?.label || key}+${value}`)
    .join(" / ");
}

function activityRow(activity) {
  const done = activity.finishAt <= Date.now();
  return `
    <article class="row-card no-art">
      <div>
        <strong>${activity.title}</strong>
        <span>${activity.text}</span>
        <small>${done ? "完了" : `${Math.ceil((activity.finishAt - Date.now()) / 1000)}秒`} / ${activityRewardText(activity.reward)}</small>
      </div>
      <button ${done ? "" : "disabled"} data-claim-activity="${activity.id}">${done ? "受取" : "進行"}</button>
    </article>
  `;
}

function raidBattleHtml() {
  const current = boss();
  const hpPercent = Math.max(1, Math.round((game.bossHp / game.bossMaxHp) * 100));
  return `
    <article class="raid-battle-panel">
      <div class="raid-hud">
        <div class="raid-boss-chip"><b>魔</b><span>${current.name} Lv${game.bossLevel}</span></div>
        <div class="raid-hp-read">${hpPercent}%</div>
      </div>
      <div class="raid-boss-bar"><i style="width:${hpPercent}%"></i></div>
      <div class="raid-mode"><span>放置戦闘</span><i style="width:${Math.min(100, Math.round((teamDps() / 220) * 100))}%"></i></div>
      <div class="raid-stage">
        <div class="raid-enemy-side">
          <div class="raid-aura"></div>
          <img src="${current.img}" alt="${current.name}">
        </div>
        <div id="damageCall" class="raid-damage-call">
          <small>DAMAGE</small>
          <b>${yen(game.lastDamage || teamDps())}</b>
        </div>
        <div class="raid-ally-side">
          ${game.formation.map(id => {
            const character = getCharacter(id);
            return `<div class="raid-ally-card"><img src="${character.img}" alt="${character.name}"><span>${Math.round(game.charge[id] || 0)}%</span></div>`;
          }).join("")}
        </div>
      </div>
      <div class="raid-action-row">
        <button class="raid-attack-button" data-action="burst">号令</button>
        <div><strong>${yen(teamDps())} DPS</strong><span>${current.subtitle} 自動戦闘は継続中です。</span></div>
      </div>
    </article>
    <article class="panel-card">
      <h2>レイドログ</h2>
      <div class="raid-log-list">${activityHtml(game.reports.slice(0, 6), true)}</div>
      <div class="action-row"><button class="secondary" data-action="mission-board">ボードへ</button><button data-action="claim">報酬受取</button></div>
    </article>
  `;
}

function renderSave() {
  panels.save.innerHTML = `
    <article class="panel-card hero-panel">
      <span class="scene-kicker">Chronicle</span>
      <h1>冒険の記録</h1>
      <p>進行状況は端末にローカル保存されます。</p>
      <div class="save-status">
        <div><b>${new Date(game.lastSavedAt).toLocaleTimeString("ja-JP")}</b><span>最終保存</span></div>
        <div><b>${game.room}</b><span>部屋ID</span></div>
        <div><b>${Object.keys(game.owned).length}</b><span>所持仲間</span></div>
      </div>
      <div class="action-row">
        <button data-action="save">保存</button>
        <button class="secondary" data-action="export">コード出力</button>
        <button class="secondary" data-action="import">コード読込</button>
      </div>
    </article>
    <article class="panel-card">
      <h2>セーブスロット</h2>
      <div class="save-slot-list">${[1, 2, 3].map(saveSlotRow).join("")}</div>
    </article>
  `;
}

function saveSlotRow(slot) {
  const raw = localStorage.getItem(`${SAVE_KEY}:slot:${slot}`);
  let label = "空き";
  if (raw) {
    try {
      label = new Date(JSON.parse(raw).lastSavedAt).toLocaleString("ja-JP");
    } catch {
      label = "読込不可";
    }
  }
  return `
    <article class="save-slot">
      <div><strong>Slot ${slot}</strong><span>${label}</span></div>
      <button data-save-slot="${slot}">保存</button>
      <button class="secondary" data-load-slot="${slot}">読込</button>
    </article>
  `;
}

function activityHtml(items, combat = false) {
  if (!items.length) return `<article class="npc-activity"><b>ログなし</b><span>放置進行を待っています。</span><small>--</small></article>`;
  return items.map(item => `
    <article class="${combat ? "raid-log-entry" : "npc-activity"} ${item.type || ""}">
      <b>${item.title}</b>
      <span>${item.text}</span>
      <small>${new Date(item.time).toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" })}</small>
    </article>
  `).join("");
}

function eta() {
  const seconds = Math.ceil(game.bossHp / teamDps());
  if (seconds > 3600) return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`;
  return `${Math.floor(seconds / 60).toString().padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;
}

function claimReward() {
  if (game.pendingReward <= 0) {
    screenSubtitle.textContent = "受け取れる報酬はまだありません";
    return;
  }
  game.crystals += game.pendingReward;
  addReport("live", "報酬受取", `${yen(game.pendingReward)} 輝晶を受け取りました。`);
  game.pendingReward = 0;
  saveGame(true);
  render();
}

function upgrade(id) {
  const data = owned(id);
  if (!data) return;
  const character = getCharacter(id);
  const trainingCost = 45 + data.level * 35;
  const herbCost = character.role === "回復" ? Math.ceil(trainingCost * .25) : 0;
  if (material("training") < trainingCost || material("herbs") < herbCost) {
    screenSubtitle.textContent = "強化素材が足りません";
    return;
  }
  game.materials.training -= trainingCost;
  game.materials.herbs -= herbCost;
  data.level += 1;
  addReport("live", "強化完了", `${character.name} が Lv${data.level} になりました。`);
  saveGame(true);
  render();
}

function randomFrom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function craftEquipment(slot) {
  const normalizedSlot = equipmentSlots.includes(slot) ? slot : "武器";
  const oreCost = normalizedSlot === "指輪" ? 55 : 45;
  const essenceCost = normalizedSlot === "指輪" ? 8 : 5;
  showConfirm(
    `${normalizedSlot}を鍛造しますか`,
    "鉱石と魔核を使って装備を1つ作成します。レア度はNからURまで抽選されます。",
    [`星鉱石: ${oreCost}`, `魔核: ${essenceCost}`, "完成品は装備倉庫に追加"],
    () => {
      if (material("ore") < oreCost || material("essence") < essenceCost) {
        screenSubtitle.textContent = "鍛造素材が足りません";
        return;
      }
      game.materials.ore -= oreCost;
      game.materials.essence -= essenceCost;
      const roll = Math.random();
      const rarityData = equipmentRarityTable.find(item => roll < item.rate) || equipmentRarityTable[equipmentRarityTable.length - 1];
      const item = equipment(
        `eq-${Date.now()}-${Math.random().toString(16).slice(2)}`,
        normalizedSlot,
        randomFrom(equipmentNames[normalizedSlot]),
        rarityData.rarity,
        1,
        rarityData.power + Math.floor(Math.random() * 6)
      );
      game.equipment.unshift(item);
      selectedEquipSlot = normalizedSlot;
      addReport("market", "装備鍛造", `${item.rarity} ${item.name} を入手しました。`);
      saveGame(true);
      render();
    }
  );
}

function enhanceEquipment(id) {
  const item = game.equipment.find(equip => equip.id === id);
  if (!item) return;
  const oreCost = 25 + item.level * 15;
  const essenceCost = 2 + item.level;
  showConfirm(
    `${item.name}を強化しますか`,
    `Lv.${item.level} から Lv.${item.level + 1} へ強化します。`,
    [`星鉱石: ${oreCost}`, `魔核: ${essenceCost}`, `DPS +${yen(item.power)} -> +${yen(item.power + 7)}`],
    () => {
      if (material("ore") < oreCost || material("essence") < essenceCost) {
        screenSubtitle.textContent = "強化素材が足りません";
        return;
      }
      game.materials.ore -= oreCost;
      game.materials.essence -= essenceCost;
      item.level += 1;
      item.power += 7;
      addReport("market", "装備強化", `${item.name} が Lv.${item.level} になりました。`);
      saveGame(true);
      render();
    }
  );
}

function equipItem(equipId) {
  const item = game.equipment.find(equip => equip.id === equipId);
  if (!item || !owned(selectedEquipCharacter)) return;
  game.equipment
    .filter(equip => equip.slot === item.slot && equip.equippedBy === selectedEquipCharacter)
    .forEach(equip => { equip.equippedBy = null; });
  item.equippedBy = selectedEquipCharacter;
  addReport("live", "装備変更", `${getCharacter(selectedEquipCharacter).name} が ${item.name} を装備しました。`);
  saveGame(true);
  render();
}

function pullFive() {
  const cost = game.tickets > 0 ? 0 : 400;
  if (cost && game.crystals < cost) {
    screenSubtitle.textContent = "輝晶が足りません";
    return [];
  }
  if (game.tickets > 0) game.tickets -= 1;
  else game.crystals -= cost;
  const results = [];
  for (let i = 0; i < 5; i += 1) {
    const missing = characters.filter(c => !owned(c.id));
    const pool = missing.length && Math.random() < .45 ? missing : characters;
    const character = pool[Math.floor(Math.random() * pool.length)];
    if (!owned(character.id)) {
      game.owned[character.id] = { level: 1, copies: 1 };
      addReport("live", "仲間加入", `${character.name} が加入しました。`);
    } else {
      game.owned[character.id].copies += 1;
      game.materials.training += 18;
      addReport("market", "重なり変換", `${character.name} が訓練素材18に変換されました。`);
    }
    results.push(character);
  }
  saveGame(true);
  return results;
}

function resetGacha() {
  caption.textContent = "契約陣に魔晶光を集める";
  summonButton.disabled = false;
  resultGrid.innerHTML = "";
  currentCards = [];
}

async function summon() {
  currentCards = pullFive();
  if (!currentCards.length) return;
  summonButton.disabled = true;
  caption.textContent = "魔法陣に輝晶の光が集まっています";
  await wait(520);
  fireFlash();
  gachaStage.hidden = true;
  const featured = currentCards[0];
  newGet.querySelector(".new-get-copy strong").textContent = featured.name;
  newGet.querySelector(".new-get-copy em").textContent = `${featured.role} / ${featured.trait}`;
  newGet.querySelector(".new-get-hero").src = featured.img;
  newGet.hidden = false;
  await new Promise(resolve => {
    const timer = setTimeout(resolve, 1000);
    newGetNext.onclick = () => {
      clearTimeout(timer);
      resolve();
    };
  });
  newGet.hidden = true;
  resultsView.hidden = false;
  resultGrid.innerHTML = "";
  currentCards.forEach(card => resultGrid.append(createResultCard(card)));
  [...resultGrid.children].forEach((card, index) => setTimeout(() => card.classList.add("show"), index * 80));
  renderHeader();
}

function createResultCard(character) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `<img src="${character.img}" alt=""><b>${character.role}</b><span>${character.name}</span>`;
  return card;
}

function fireFlash() {
  flash.classList.remove("fire");
  void flash.offsetWidth;
  flash.classList.add("fire");
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function exportSave() {
  const code = btoa(unescape(encodeURIComponent(JSON.stringify(game))));
  window.prompt("セーブコードをコピーしてください", code);
}

function importSave() {
  const code = window.prompt("セーブコードを貼り付けてください");
  if (!code) return;
  try {
    game = JSON.parse(decodeURIComponent(escape(atob(code))));
    game.materials = normalizeMaterials(game.materials);
    saveGame(true);
    render();
    screenSubtitle.textContent = "セーブコードを読み込みました";
  } catch {
    screenSubtitle.textContent = "セーブコードを読み込めませんでした";
  }
}

function copyRoom() {
  const url = `${location.origin}${location.pathname}#room=${game.room}`;
  if (navigator.clipboard) navigator.clipboard.writeText(url);
  screenSubtitle.textContent = `部屋URL: ${game.room}`;
}

function showConfirm(title, body, details, action) {
  confirmTitle.textContent = title;
  confirmBody.textContent = body;
  confirmDetails.innerHTML = details.map(item => `<div>${item}</div>`).join("");
  pendingConfirm = action;
  confirmModal.hidden = false;
}

function closeConfirm() {
  confirmModal.hidden = true;
  pendingConfirm = null;
}

function handleClick(event) {
  const target = event.target.closest("button");
  if (!target) return;
  if (target.dataset.tab) showTab(target.dataset.tab);
  if (target.dataset.slot) {
    selectedFormationSlot = Number(target.dataset.slot);
    render();
  }
  if (target.dataset.equipCharacter) {
    selectedEquipCharacter = target.dataset.equipCharacter;
    render();
  }
  if (target.dataset.equipSlot) {
    selectedEquipSlot = target.dataset.equipSlot;
    render();
  }
  if (target.dataset.pick) {
    const next = [...game.formation];
    next[selectedFormationSlot] = target.dataset.pick;
    game.formation = [...new Set(next)].slice(0, 3);
    saveGame(true);
    render();
  }
  if (target.dataset.upgrade) {
    const character = getCharacter(target.dataset.upgrade);
    const trainingCost = 45 + owned(character.id).level * 35;
    const herbCost = character.role === "回復" ? Math.ceil(trainingCost * .25) : 0;
    const details = [`訓練素材: ${trainingCost}`, `現在DPS: ${power(character.id)}`];
    if (herbCost) details.push(`霊草: ${herbCost}`);
    showConfirm("強化しますか", `${character.name} を強化します。`, details, () => upgrade(character.id));
  }
  if (target.dataset.claimActivity) {
    const activity = game.activities.find(item => item.id === target.dataset.claimActivity);
    if (activity && activity.finishAt <= Date.now()) {
      addMaterials(activity.reward);
      addReport("market", "遠征完了", `${activity.title} で ${activityRewardText(activity.reward)} を獲得。`);
      game.activities = game.activities.filter(item => item.id !== activity.id);
      saveGame(true);
      render();
    }
  }
  const action = target.dataset.action;
  if (action === "claim") claimReward();
  if (action === "copy-room") copyRoom();
  if (action === "enter-raid") {
    activeView.missions = "raid";
    render();
  }
  if (action === "mission-board") {
    activeView.missions = "board";
    render();
  }
  if (action === "burst") {
    const damage = teamDps() * (roleBonus("攻撃") ? 15 : 12);
    game.bossHp = Math.max(0, game.bossHp - damage);
    game.totalDamage += damage;
    game.lastDamage = damage;
    game.pendingReward += Math.floor(damage / 380);
    addReport("player", "号令攻撃", `${yen(damage)} ダメージ。`);
    if (game.bossHp <= 0) defeatBoss();
    saveGame(true);
    fireFlash();
    render();
  }
  if (action === "spawn-activity") {
    const options = [
      { title: "訓練場支援", text: "ギルド教官が訓練素材をまとめています。", reward: { training: 32 } },
      { title: "星鉱脈探索", text: "鉱山跡で装備用の星鉱石を採掘します。", reward: { ore: 24 } },
      { title: "霊草採集", text: "森の泉で回復役用の霊草を集めます。", reward: { herbs: 22 } },
      { title: "魔核回収", text: "レイド痕から魔核片を回収します。", reward: { essence: 6 } }
    ];
    const picked = randomFrom(options);
    addActivity(picked.title, picked.text, picked.reward);
    saveGame(true);
    render();
  }
  if (action === "craft-equipment") craftEquipment(target.dataset.slotName);
  if (action === "equip-item") equipItem(target.dataset.equipId);
  if (action === "enhance-equip") enhanceEquipment(target.dataset.equipId);
  if (action === "save") saveGame(false);
  if (action === "export") exportSave();
  if (action === "import") importSave();
  if (target.dataset.saveSlot) {
    localStorage.setItem(`${SAVE_KEY}:slot:${target.dataset.saveSlot}`, JSON.stringify({ ...game, lastSavedAt: Date.now() }));
    render();
  }
  if (target.dataset.loadSlot) {
    const raw = localStorage.getItem(`${SAVE_KEY}:slot:${target.dataset.loadSlot}`);
    if (raw) {
      game = JSON.parse(raw);
      game.materials = normalizeMaterials(game.materials);
      saveGame(true);
      render();
    }
  }
}

function goBack() {
  if (activeTab === "missions" && activeView.missions === "raid") {
    activeView.missions = "board";
    render();
  }
}

function boot() {
  const offline = Math.min(Date.now() - (game.lastSavedAt || Date.now()), OFFLINE_CAP_MS);
  if (offline > 2000) applyProgress(offline, true);
  showTab("village");
  saveGame(true);
  setInterval(() => {
    const now = Date.now();
    applyProgress(now - lastTick);
    lastTick = now;
    if (Math.random() < .18) npcHit();
    if (Math.random() < .05) addActivity("臨時遠征", "ギルドの冒険者が素材を持ち帰っています。", { training: 12, ore: 4 });
    saveGame(true);
    render();
  }, TICK_MS);
}

document.addEventListener("click", handleClick);
document.querySelector("#backButton").addEventListener("click", goBack);
document.querySelector("#soundToggle").addEventListener("click", () => {
  game.sound = !game.sound;
  document.querySelector("#soundToggle").classList.toggle("sound-on", game.sound);
  saveGame(true);
});
summonButton.addEventListener("click", summon);
againButton.addEventListener("click", async () => {
  resultsView.hidden = true;
  gachaStage.hidden = false;
  resetGacha();
  await wait(120);
  summon();
});
confirmCancel.addEventListener("click", closeConfirm);
confirmOk.addEventListener("click", () => {
  const action = pendingConfirm;
  closeConfirm();
  if (action) action();
});

boot();
