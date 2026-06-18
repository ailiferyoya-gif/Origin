const SAVE_KEY = "kemonoQuestRaid:wafuSplit:v1";
const TICK_MS = 1000;
const OFFLINE_CAP_MS = 6 * 60 * 60 * 1000;

const characters = [
  { id: "silver", name: "Silver Bell", role: "回復", trait: "月鈴の祈り", skill: "放置報酬を増やす", dps: 18, img: "candidates/diverse5-silver-bell.png" },
  { id: "crimson", name: "Crimson Paladin", role: "盾", trait: "紅盾の誓い", skill: "被害を抑えて継戦する", dps: 22, img: "candidates/diverse5-crimson-paladin.png" },
  { id: "mint", name: "Mint Parasol", role: "支援", trait: "薄荷の結界", skill: "攻撃間隔を短縮する", dps: 20, img: "candidates/diverse5-mint-parasol.png" },
  { id: "blue", name: "Blue Tactician", role: "妨害", trait: "蒼策の号令", skill: "敵防御を崩す", dps: 24, img: "candidates/diverse5-blue-tactician.png" },
  { id: "blonde", name: "Blonde Carnival", role: "攻撃", trait: "星彩の連撃", skill: "高DPSで削る", dps: 30, img: "candidates/diverse5-blonde-carnival.png" }
];

const roleClass = { 回復: "heal", 盾: "guard", 支援: "support", 妨害: "support", 攻撃: "attack" };
const worldNames = ["Aoi", "Ren", "Mika", "Towa", "Nagi", "Sora", "Kiri"];
const boss = {
  name: "封印核獣ロア",
  subtitle: "静かな結晶体。派手さより圧で押してくる。",
  img: "assets/boss-raid-muted.png"
};

const panels = {
  village: document.querySelector("#villagePanel"),
  characters: document.querySelector("#charactersPanel"),
  formation: document.querySelector("#formationPanel"),
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
let pendingConfirm = null;
let lastTick = Date.now();
let currentCards = [];

const defaultGame = () => ({
  tickets: 3,
  crystals: 260,
  materials: 120,
  room: makeRoom(),
  bossLevel: 1,
  bossHp: 160000,
  bossMaxHp: 160000,
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
  reports: [
    { type: "live", title: "レイドルーム作成", text: "放置中も編成メンバーが自動で攻撃します。", time: Date.now() }
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

function loadGame() {
  try {
    const saved = JSON.parse(localStorage.getItem(SAVE_KEY));
    if (!saved) return defaultGame();
    const base = defaultGame();
    return {
      ...base,
      ...saved,
      room: makeRoom(),
      owned: { ...saved.owned },
      charge: { ...base.charge, ...saved.charge },
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
  if (!silent) {
    screenSubtitle.textContent = "この端末にローカル保存しました";
  }
}

function yen(value) {
  return Math.floor(value).toLocaleString("ja-JP");
}

function getCharacter(id) {
  return characters.find(character => character.id === id);
}

function owned(id) {
  return game.owned[id] || null;
}

function power(id) {
  const character = getCharacter(id);
  const data = owned(id);
  if (!character || !data) return 0;
  return Math.round(character.dps * (1 + (data.level - 1) * .34) * (1 + Math.max(0, data.copies - 1) * .09));
}

function teamDps() {
  const base = game.formation.reduce((sum, id) => sum + power(id), 0);
  const blue = game.formation.includes("blue") ? 1.16 : 1;
  const mint = game.formation.includes("mint") ? 1.1 : 1;
  const crimson = game.formation.includes("crimson") ? 1.06 : 1;
  return Math.max(1, Math.round(base * blue * mint * crimson));
}

function applyProgress(ms, offline = false) {
  const seconds = Math.floor(ms / 1000);
  if (seconds <= 0) return;
  const damage = teamDps() * seconds;
  game.bossHp = Math.max(0, game.bossHp - damage);
  game.totalDamage += damage;
  game.lastDamage = damage;
  game.pendingReward += Math.floor(damage / 430) + (game.formation.includes("silver") ? Math.floor(seconds / 12) : 0);
  game.materials += Math.floor(seconds / 90);
  game.formation.forEach(id => {
    game.charge[id] = ((game.charge[id] || 0) + seconds * 20) % 100;
  });
  if (offline) addReport("live", "オフライン進行", `${yen(damage)} ダメージ / 報酬 ${yen(Math.floor(damage / 430))} 輝晶`);
  if (game.bossHp <= 0) defeatBoss();
}

function defeatBoss() {
  const reward = 120 + game.bossLevel * 28;
  game.pendingReward += reward;
  addReport("raid", `ロア Lv${game.bossLevel} 討伐`, `討伐報酬 ${yen(reward)} 輝晶が保留中です。`);
  game.bossLevel += 1;
  game.bossMaxHp = Math.round(160000 * Math.pow(1.38, game.bossLevel - 1));
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

function addActivity(title, text, reward = 20) {
  game.activities.unshift({
    id: `act-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    title,
    text,
    reward,
    finishAt: Date.now() + 45000
  });
  game.activities = game.activities.slice(0, 5);
}

function renderHeader() {
  const titles = {
    village: ["ケモノレイド", `ROOM ${game.room} / Lv${game.bossLevel}`],
    characters: ["キャラ一覧", `${Object.keys(game.owned).length} / ${characters.length} 入手`],
    formation: ["出撃編成", `${yen(teamDps())} DPS / 3人編成`],
    missions: ["任務", "レイドとワールド活動"],
    gacha: ["召喚", `札 ${game.tickets} / 輝晶 ${yen(game.crystals)}`],
    save: ["保存", "ローカル保存 / コード出力"]
  };
  const [title, subtitle] = titles[activeTab];
  screenTitle.textContent = title;
  screenSubtitle.textContent = subtitle;
  ticketCurrency.textContent = `札 ${game.tickets}`;
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
  renderMissions();
  renderSave();
}

function renderVillage() {
  panels.village.innerHTML = `
    <article class="panel-card hero-panel">
      <span class="scene-kicker">放置レイド拠点</span>
      <h1>封印核獣を見張る里</h1>
      <p>戦闘は自動進行。画面を閉じていても最大6時間分をローカル保存から計算します。</p>
      <div class="metric-grid">
        <div><b>${yen(teamDps())}</b><span>DPS</span></div>
        <div><b>${eta()}</b><span>討伐予測</span></div>
        <div><b>${yen(game.pendingReward)}</b><span>未受取</span></div>
      </div>
      <div class="action-row">
        <button data-tab="missions">任務へ</button>
        <button class="secondary" data-action="claim">報酬受取</button>
        <button class="secondary" data-action="copy-room">部屋URL</button>
      </div>
    </article>
    <article class="panel-card">
      <h2>資源</h2>
      <div class="metric-grid">
        <div><b>${yen(game.crystals)}</b><span>輝晶</span></div>
        <div><b>${yen(game.materials)}</b><span>訓練素材</span></div>
        <div><b>${yen(game.totalDamage)}</b><span>累計貢献</span></div>
      </div>
    </article>
    <article class="panel-card">
      <h2>ワールドフィード</h2>
      <div class="npc-activity-list">${activityHtml(game.reports.slice(0, 5))}</div>
    </article>
  `;
}

function renderCharacters() {
  panels.characters.innerHTML = `
    <article class="panel-card">
      <span class="scene-kicker">Diverse 5</span>
      <h1>キャラ一覧</h1>
      <p>入手済みキャラは強化と編成に使用できます。</p>
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
        <small>${data ? `Lv ${data.level} / ${power(character.id)} DPS / 重なり ${data.copies}` : "未入手"}</small>
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
      <span class="scene-kicker">出撃設定</span>
      <h1>3人編成</h1>
      <p>スロットを選んで、下のキャラから入れ替えます。</p>
      <div class="stat-grid">
        <div><b>${yen(teamDps())}</b><span>現在DPS</span></div>
        <div><b>${game.formation.includes("silver") ? "あり" : "なし"}</b><span>報酬補正</span></div>
        <div><b>${game.formation.includes("blue") ? "有効" : "通常"}</b><span>防御崩し</span></div>
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

function renderMissions() {
  panels.missions.innerHTML = activeView.missions === "raid" ? raidBattleHtml() : missionBoardHtml();
}

function missionBoardHtml() {
  return `
    <article class="panel-card hero-panel">
      <span class="scene-kicker">任務板</span>
      <h1>レイド任務</h1>
      <p>WafuNinja風に、任務画面からレイドへ入る構成です。</p>
      <div class="metric-grid">
        <div><b>Lv ${game.bossLevel}</b><span>敵Lv</span></div>
        <div><b>${yen(game.bossHp)}</b><span>残HP</span></div>
        <div><b>${yen(game.pendingReward)}</b><span>未受取</span></div>
      </div>
      <div class="action-row">
        <button data-action="enter-raid">レイドへ入る</button>
        <button class="secondary" data-action="spawn-activity">巡回任務</button>
      </div>
    </article>
    <article class="panel-card">
      <h2>進行中任務</h2>
      <div class="row-list">${game.activities.length ? game.activities.map(activityRow).join("") : `<article class="row-card no-art"><div><strong>任務なし</strong><span>巡回任務を開始できます。</span></div><em>待機</em></article>`}</div>
    </article>
    <article class="panel-card">
      <h2>ワールド活動</h2>
      <div class="npc-activity-list">${activityHtml(game.reports.slice(0, 8))}</div>
    </article>
  `;
}

function activityRow(activity) {
  const done = activity.finishAt <= Date.now();
  return `
    <article class="row-card no-art">
      <div>
        <strong>${activity.title}</strong>
        <span>${activity.text}</span>
        <small>${done ? "完了" : `${Math.ceil((activity.finishAt - Date.now()) / 1000)}秒`}</small>
      </div>
      <button ${done ? "" : "disabled"} data-claim-activity="${activity.id}">${done ? "受取" : "進行"}</button>
    </article>
  `;
}

function raidBattleHtml() {
  const hpPercent = Math.max(1, Math.round((game.bossHp / game.bossMaxHp) * 100));
  return `
    <article class="raid-battle-panel">
      <div class="raid-hud">
        <div class="raid-boss-chip"><b>封</b><span>${boss.name} Lv${game.bossLevel}</span></div>
        <div class="raid-hp-read">${hpPercent}%</div>
      </div>
      <div class="raid-boss-bar"><i style="width:${hpPercent}%"></i></div>
      <div class="raid-mode"><span>放置</span><i style="width:${Math.min(100, Math.round((teamDps() / 120) * 100))}%"></i></div>
      <div class="raid-stage">
        <div class="raid-enemy-side">
          <div class="raid-aura"></div>
          <img src="${boss.img}" alt="${boss.name}">
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
        <div><strong>${yen(teamDps())} DPS</strong><span>${boss.subtitle} 自動戦闘は継続中です。</span></div>
      </div>
    </article>
    <article class="panel-card">
      <h2>レイドログ</h2>
      <div class="raid-log-list">${activityHtml(game.reports.slice(0, 6), true)}</div>
      <div class="action-row"><button class="secondary" data-action="mission-board">任務板へ</button><button data-action="claim">報酬受取</button></div>
    </article>
  `;
}

function renderSave() {
  panels.save.innerHTML = `
    <article class="panel-card hero-panel">
      <span class="scene-kicker">Local Save</span>
      <h1>ローカル保存</h1>
      <p>このブラウザ/端末に保存します。共有URLは部屋IDだけを共有します。</p>
      <div class="save-status">
        <div><b>${new Date(game.lastSavedAt).toLocaleTimeString("ja-JP")}</b><span>最終保存</span></div>
        <div><b>${game.room}</b><span>部屋ID</span></div>
        <div><b>${Object.keys(game.owned).length}</b><span>所持</span></div>
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
  const cost = 45 + data.level * 35;
  if (game.materials < cost) {
    screenSubtitle.textContent = "訓練素材が足りません";
    return;
  }
  game.materials -= cost;
  data.level += 1;
  addReport("live", "強化完了", `${getCharacter(id).name} が Lv${data.level} になりました。`);
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
      game.materials += 18;
      addReport("market", "重なり変換", `${character.name} が訓練素材18に変換されました。`);
    }
    results.push(character);
  }
  saveGame(true);
  return results;
}

function resetGacha() {
  caption.textContent = "Diverse 5 の縁を結ぶ";
  summonButton.disabled = false;
  resultGrid.innerHTML = "";
  currentCards = [];
}

async function summon() {
  currentCards = pullFive();
  if (!currentCards.length) return;
  summonButton.disabled = true;
  caption.textContent = "召喚の煙が集まっています";
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
  if (target.dataset.pick) {
    const next = [...game.formation];
    next[selectedFormationSlot] = target.dataset.pick;
    game.formation = [...new Set(next)].slice(0, 3);
    saveGame(true);
    render();
  }
  if (target.dataset.upgrade) {
    const character = getCharacter(target.dataset.upgrade);
    showConfirm("強化しますか", `${character.name} を強化します。`, [`消費素材: ${45 + owned(character.id).level * 35}`, `現在DPS: ${power(character.id)}`], () => upgrade(character.id));
  }
  if (target.dataset.claimActivity) {
    const activity = game.activities.find(item => item.id === target.dataset.claimActivity);
    if (activity && activity.finishAt <= Date.now()) {
      game.materials += activity.reward;
      addReport("market", "巡回完了", `${activity.title} で訓練素材${activity.reward}を獲得。`);
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
    const damage = teamDps() * 12;
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
    addActivity("里の巡回", "周辺の素材を回収しています。", 28);
    saveGame(true);
    render();
  }
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
    if (Math.random() < .05) addActivity("臨時巡回", "里の協力者が素材を拾っています。", 16);
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
