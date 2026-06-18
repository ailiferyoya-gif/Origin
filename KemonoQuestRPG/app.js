const TICK_MS = 2000;
const OFFLINE_CAP_MS = 6 * 60 * 60 * 1000;
const SAVE_KEY = "kemonoQuestIdleRaid:v1";

const characters = [
  {
    id: "silver",
    name: "Silver Bell",
    role: "回復",
    trait: "月鈴の祈り",
    skill: "10秒ごとに討伐報酬を少し増やす",
    dps: 17,
    image: "candidates/diverse5-silver-bell.png"
  },
  {
    id: "crimson",
    name: "Crimson Paladin",
    role: "盾",
    trait: "紅盾の誓い",
    skill: "全員の継戦DPSを底上げする",
    dps: 21,
    image: "candidates/diverse5-crimson-paladin.png"
  },
  {
    id: "mint",
    name: "Mint Parasol",
    role: "支援",
    trait: "薄荷の結界",
    skill: "味方の攻撃間隔を短くする",
    dps: 19,
    image: "candidates/diverse5-mint-parasol.png"
  },
  {
    id: "blue",
    name: "Blue Tactician",
    role: "妨害",
    trait: "蒼策の号令",
    skill: "ボス防御を崩してDPSを伸ばす",
    dps: 23,
    image: "candidates/diverse5-blue-tactician.png"
  },
  {
    id: "blonde",
    name: "Blonde Carnival",
    role: "攻撃",
    trait: "星彩の連撃",
    skill: "高いクリティカル貢献を出す",
    dps: 29,
    image: "candidates/diverse5-blonde-carnival.png"
  }
];

const allyNames = ["Aoi", "Ren", "Mika", "Towa", "Nagi", "Sora"];

const defaultState = () => ({
  room: getRoomCode(),
  crystals: 260,
  tickets: 3,
  bossLevel: 1,
  bossHp: 150000,
  bossMaxHp: 150000,
  contribution: 0,
  pendingReward: 0,
  formation: ["crimson", "silver", "blonde"],
  owned: {
    silver: { copies: 1, level: 1 },
    crimson: { copies: 1, level: 1 },
    blonde: { copies: 1, level: 1 }
  },
  charge: { silver: 0, crimson: 0, mint: 0, blue: 0, blonde: 0 },
  log: ["レイドルームを作成しました。編成したキャラが自動で攻撃します。"],
  lastSavedAt: Date.now()
});

let state = loadState();
let lastFrame = Date.now();
let toastTimer = 0;

const $ = (selector) => document.querySelector(selector);

function getRoomCode() {
  const fromHash = location.hash.replace("#room=", "").trim();
  if (fromHash) return fromHash.slice(0, 6).toUpperCase();
  const code = Math.random().toString(36).slice(2, 8).toUpperCase();
  history.replaceState(null, "", `#room=${code}`);
  return code;
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(SAVE_KEY));
    if (!saved) return defaultState();
    return {
      ...defaultState(),
      ...saved,
      room: getRoomCode(),
      charge: { ...defaultState().charge, ...saved.charge },
      owned: { ...saved.owned },
      log: Array.isArray(saved.log) ? saved.log.slice(0, 8) : []
    };
  } catch {
    return defaultState();
  }
}

function saveState() {
  state.lastSavedAt = Date.now();
  localStorage.setItem(SAVE_KEY, JSON.stringify(state));
}

function formatNumber(value) {
  return Math.floor(value).toLocaleString("ja-JP");
}

function getCharacter(id) {
  return characters.find((character) => character.id === id);
}

function getOwned(id) {
  return state.owned[id] || null;
}

function characterPower(id) {
  const character = getCharacter(id);
  const owned = getOwned(id);
  if (!character || !owned) return 0;
  return Math.round(character.dps * (1 + (owned.level - 1) * 0.32) * (1 + Math.max(0, owned.copies - 1) * 0.08));
}

function partyDps() {
  const base = state.formation.reduce((total, id) => total + characterPower(id), 0);
  const hasBlue = state.formation.includes("blue") ? 1.16 : 1;
  const hasMint = state.formation.includes("mint") ? 1.1 : 1;
  const hasCrimson = state.formation.includes("crimson") ? 1.06 : 1;
  return Math.max(1, Math.round(base * hasBlue * hasMint * hasCrimson));
}

function applyProgress(elapsedMs, options = {}) {
  const seconds = Math.floor(elapsedMs / 1000);
  if (seconds <= 0) return;

  const dps = partyDps();
  const damage = dps * seconds;
  state.bossHp = Math.max(0, state.bossHp - damage);
  state.contribution += damage;

  const silverBonus = state.formation.includes("silver") ? Math.floor(seconds / 10) : 0;
  state.pendingReward += Math.floor(damage / 420) + silverBonus;

  state.formation.forEach((id) => {
    state.charge[id] = (state.charge[id] + seconds * 22) % 100;
  });

  if (options.offline) {
    pushLog(`オフライン進行で ${formatNumber(damage)} ダメージ。報酬 ${formatNumber(Math.floor(damage / 420) + silverBonus)} 輝晶。`);
  }

  if (state.bossHp === 0) {
    defeatBoss();
  }
}

function defeatBoss() {
  const reward = 90 + state.bossLevel * 25;
  state.pendingReward += reward;
  pushLog(`プリズマロア Lv${state.bossLevel} を討伐。討伐報酬 ${reward} 輝晶が保留中です。`);
  state.bossLevel += 1;
  state.bossMaxHp = Math.round(150000 * Math.pow(1.42, state.bossLevel - 1));
  state.bossHp = state.bossMaxHp;
}

function pushLog(message) {
  state.log.unshift(message);
  state.log = state.log.slice(0, 8);
}

function render() {
  $("#roomCode").textContent = `ROOM ${state.room}`;
  $("#crystals").textContent = formatNumber(state.crystals);
  $("#bossLevel").textContent = `Lv ${state.bossLevel}`;
  $("#bossHpText").textContent = `HP ${formatNumber(state.bossHp)} / ${formatNumber(state.bossMaxHp)}`;
  $("#bossHpBar").style.width = `${Math.max(2, (state.bossHp / state.bossMaxHp) * 100)}%`;
  $("#partyDps").textContent = formatNumber(partyDps());
  $("#contribution").textContent = formatNumber(state.contribution);
  $("#eta").textContent = formatEta();
  $("#idleState").textContent = state.pendingReward > 0 ? `報酬 ${formatNumber(state.pendingReward)}` : "放置中";

  renderParty();
  renderLog();
  renderFormationList();
  renderUpgradeList();
}

function renderParty() {
  $("#partySlots").innerHTML = state.formation.map((id) => {
    const character = getCharacter(id);
    const owned = getOwned(id);
    const charge = Math.round(state.charge[id] || 0);
    return `
      <article class="party-card">
        <img src="${character.image}" alt="${character.name}">
        <strong>${character.name}</strong>
        <span class="member-role">Lv ${owned.level} / ${character.role}</span>
        <div class="charge-track"><span style="width:${charge}%"></span></div>
      </article>
    `;
  }).join("");
}

function renderLog() {
  $("#raidLog").innerHTML = state.log.map((line) => `<p>${line}</p>`).join("");
}

function renderFormationList() {
  $("#formationList").innerHTML = characters.map((character) => {
    const owned = getOwned(character.id);
    const selected = state.formation.includes(character.id);
    return `
      <article class="member-card ${owned ? "" : "locked"}">
        <img src="${character.image}" alt="${character.name}">
        <div>
          <strong>${character.name}</strong>
          <span class="member-role">${character.role} / ${owned ? `Lv ${owned.level}` : "未入手"}</span>
          <span class="member-skill">${character.skill}</span>
        </div>
        <button data-form="${character.id}" ${owned ? "" : "disabled"}>${selected ? "出撃中" : "選択"}</button>
      </article>
    `;
  }).join("");
}

function renderUpgradeList() {
  $("#upgradeList").innerHTML = characters.map((character) => {
    const owned = getOwned(character.id);
    const cost = owned ? upgradeCost(owned.level) : 0;
    return `
      <article class="member-card ${owned ? "" : "locked"}">
        <img src="${character.image}" alt="${character.name}">
        <div>
          <strong>${character.name}</strong>
          <span class="member-role">${character.role} / ${owned ? `Lv ${owned.level} / ${characterPower(character.id)} DPS` : "未入手"}</span>
          <span class="member-skill">${character.trait}</span>
        </div>
        <button data-upgrade="${character.id}" ${owned ? "" : "disabled"}>${owned ? `${cost} 輝晶` : "未入手"}</button>
      </article>
    `;
  }).join("");
}

function formatEta() {
  const seconds = Math.ceil(state.bossHp / partyDps());
  if (seconds >= 3600) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  }
  const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
  const rest = (seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${rest}`;
}

function upgradeCost(level) {
  return 60 + level * 35;
}

function selectFormation(id) {
  if (!getOwned(id)) return;
  if (state.formation.includes(id)) {
    if (state.formation.length > 1) {
      state.formation = state.formation.filter((memberId) => memberId !== id);
    }
  } else {
    state.formation = [id, ...state.formation].slice(0, 3);
  }
  pushLog(`${getCharacter(id).name} の出撃設定を更新しました。`);
  saveState();
  render();
}

function upgradeCharacter(id) {
  const owned = getOwned(id);
  if (!owned) return;
  const cost = upgradeCost(owned.level);
  if (state.crystals < cost) {
    showToast("輝晶が足りません。");
    return;
  }
  state.crystals -= cost;
  owned.level += 1;
  pushLog(`${getCharacter(id).name} が Lv${owned.level} に上がりました。`);
  saveState();
  render();
}

function pullGacha(count) {
  const ticketUse = Math.min(state.tickets, count);
  const paidPulls = count - ticketUse;
  const cost = paidPulls * 80;
  if (state.crystals < cost) {
    showToast("召喚に必要な輝晶が足りません。");
    return;
  }

  state.tickets -= ticketUse;
  state.crystals -= cost;
  const results = [];
  for (let i = 0; i < count; i += 1) {
    const character = characters[Math.floor(Math.random() * characters.length)];
    if (!state.owned[character.id]) {
      state.owned[character.id] = { copies: 1, level: 1 };
      pushLog(`${character.name} が仲間になりました。`);
    } else {
      state.owned[character.id].copies += 1;
      const bonus = 18;
      state.crystals += bonus;
      pushLog(`${character.name} が重なり、輝晶 ${bonus} を獲得。`);
    }
    results.push(character);
  }

  const first = results[0];
  $("#gachaResult").innerHTML = `
    <img src="${first.image}" alt="${first.name}">
    <strong>${count}回召喚</strong>
    <p>${results.map((character) => character.name).join(" / ")}</p>
    <span class="member-role">チケット残り ${state.tickets}</span>
  `;
  saveState();
  render();
}

function claimReward() {
  if (state.pendingReward <= 0) {
    showToast("受け取れる報酬はまだありません。");
    return;
  }
  state.crystals += state.pendingReward;
  pushLog(`放置レイド報酬 ${formatNumber(state.pendingReward)} 輝晶を受け取りました。`);
  state.pendingReward = 0;
  saveState();
  render();
}

function simulateAllyHit() {
  const name = allyNames[Math.floor(Math.random() * allyNames.length)];
  const damage = Math.floor(partyDps() * (0.8 + Math.random() * 1.8));
  state.bossHp = Math.max(0, state.bossHp - damage);
  pushLog(`${name} が協力攻撃で ${formatNumber(damage)} ダメージ。`);
  if (state.bossHp === 0) defeatBoss();
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 1800);
}

function copyRoomUrl() {
  const url = `${location.origin}${location.pathname}#room=${state.room}`;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(url).then(() => showToast("部屋URLをコピーしました。"));
  } else {
    showToast(`ROOM ${state.room}`);
  }
}

function openModal(id) {
  const modal = document.getElementById(id);
  if (modal && !modal.open) modal.showModal();
}

function boot() {
  const offlineMs = Math.min(Date.now() - (state.lastSavedAt || Date.now()), OFFLINE_CAP_MS);
  if (offlineMs > TICK_MS) {
    applyProgress(offlineMs, { offline: true });
  }
  render();
  saveState();

  setInterval(() => {
    const now = Date.now();
    applyProgress(now - lastFrame);
    lastFrame = now;
    if (Math.random() < 0.28) simulateAllyHit();
    saveState();
    render();
  }, TICK_MS);
}

$("#openFormation").addEventListener("click", () => openModal("formationModal"));
$("#openGacha").addEventListener("click", () => openModal("gachaModal"));
$("#openUpgrade").addEventListener("click", () => openModal("upgradeModal"));
$("#claimReward").addEventListener("click", claimReward);
$("#copyRoom").addEventListener("click", copyRoomUrl);
$("#pullOnce").addEventListener("click", () => pullGacha(1));
$("#pullTen").addEventListener("click", () => pullGacha(5));

document.addEventListener("click", (event) => {
  const closeTarget = event.target.closest("[data-close]");
  if (closeTarget) {
    document.getElementById(closeTarget.dataset.close)?.close();
  }

  const formButton = event.target.closest("[data-form]");
  if (formButton) {
    selectFormation(formButton.dataset.form);
  }

  const upgradeButton = event.target.closest("[data-upgrade]");
  if (upgradeButton) {
    upgradeCharacter(upgradeButton.dataset.upgrade);
  }
});

boot();
