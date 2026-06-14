(() => {
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;

  const ui = {
    hp: document.getElementById("hp"),
    time: document.getElementById("time"),
    level: document.getElementById("level"),
    kills: document.getElementById("kills"),
    xp: document.getElementById("xp"),
    upgrade: document.getElementById("upgrade"),
    prep: document.getElementById("prep"),
    coins: document.getElementById("coins"),
    owned: document.getElementById("owned"),
    characters: document.getElementById("characters"),
    equipment: document.getElementById("equipment"),
    selectedCharacter: document.getElementById("selectedCharacter"),
    selectedEquipment: document.getElementById("selectedEquipment"),
    gachaBtn: document.getElementById("gachaBtn"),
    gachaResult: document.getElementById("gachaResult"),
    gachaPool: document.getElementById("gachaPool"),
    loadoutView: document.getElementById("loadoutView"),
    gachaView: document.getElementById("gachaView"),
    tabLoadout: document.getElementById("tabLoadout"),
    tabGacha: document.getElementById("tabGacha"),
    startBtn: document.getElementById("startBtn"),
    stick: document.getElementById("stick"),
    knob: document.querySelector("#stick span"),
  };

  const assets = {};
  const outlineCache = new Map();
  const lowPowerDevice = matchMedia("(pointer: coarse)").matches || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const perf = {
    maxEnemies: lowPowerDevice ? 64 : 110,
    maxBolts: lowPowerDevice ? 44 : 90,
    maxEffects: lowPowerDevice ? 90 : 190,
    maxPops: lowPowerDevice ? 34 : 70,
    maxGems: lowPowerDevice ? 90 : 150,
    trailChance: lowPowerDevice ? 0.18 : 0.42,
    hitFxScale: lowPowerDevice ? 0.48 : 0.82,
    showAura: !lowPowerDevice,
    enemyFrameStride: lowPowerDevice ? 2 : 1,
  };
  const loadImage = (name, src) => new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      assets[name] = img;
      resolve();
    };
    img.src = src;
  });

  const rarity = {
    common: { label: "C", color: "#9aa9b5", weight: 54, cost: 45, power: 1 },
    rare: { label: "R", color: "#4bd8ff", weight: 28, cost: 70, power: 1.16 },
    epic: { label: "SR", color: "#c783ff", weight: 14, cost: 105, power: 1.34 },
    legend: { label: "SSR", color: "#ffe879", weight: 4, cost: 155, power: 1.58 },
  };

  const characters = [
    { id: "hunter", name: "Hunter", rarity: "common", cell: 0, note: "\u6a19\u6e96\u578b", stats: { hp: 0, speed: 0, damage: 0, cooldown: 1, magnet: 0 } },
    { id: "pyromancer", name: "Pyromancer", rarity: "rare", cell: 1, note: "\u706b\u529b\u91cd\u8996", stats: { hp: -1, speed: 2, damage: .55, cooldown: .96, magnet: 0 } },
    { id: "paladin", name: "Paladin", rarity: "epic", cell: 2, note: "HP\u3068\u5b88\u308a", stats: { hp: 3, speed: -12, damage: .25, cooldown: 1.03, magnet: 16 } },
    { id: "shinobi", name: "Shinobi", rarity: "rare", cell: 3, note: "\u9ad8\u901f\u56de\u907f", stats: { hp: -1, speed: 38, damage: .1, cooldown: .92, magnet: 8 } },
    { id: "ranger", name: "Ranger", rarity: "common", cell: 4, note: "\u5438\u5f15\u3068\u901f\u5ea6", stats: { hp: 0, speed: 18, damage: 0, cooldown: .98, magnet: 30 } },
    { id: "cleric", name: "Cleric", rarity: "rare", cell: 5, note: "HP\u304c\u9ad8\u3044", stats: { hp: 2, speed: -4, damage: .1, cooldown: 1, magnet: 24 } },
    { id: "gunner", name: "Gunner", rarity: "epic", cell: 6, note: "\u9023\u5c04\u306b\u5f37\u3044", stats: { hp: 0, speed: 6, damage: .25, cooldown: .84, magnet: 0 } },
    { id: "lancer", name: "Lancer", rarity: "rare", cell: 7, note: "\u30d0\u30e9\u30f3\u30b9", stats: { hp: 1, speed: 10, damage: .2, cooldown: .96, magnet: 12 } },
    { id: "alchemist", name: "Alchemist", rarity: "epic", cell: 8, note: "\u7d4c\u9a13\u5024\u56de\u53ce", stats: { hp: 0, speed: 0, damage: .4, cooldown: .98, magnet: 54 } },
    { id: "reaper", name: "Reaper", rarity: "legend", cell: 9, note: "\u6700\u9ad8\u706b\u529b", stats: { hp: -1, speed: 14, damage: .95, cooldown: .9, magnet: 22 } },
  ];

  const weapons = [
    { id: "crossbow", name: "Crossbow", rarity: "common", cell: 0, note: "\u76f4\u7dda\u5f3e", stats: { damage: 1, cooldown: 1, projectiles: 1, speed: 0, magnet: 0, hp: 0 }, shot: { color: "#ffe75c", size: 10, speed: 430, life: 1.15 } },
    { id: "firewand", name: "Fire Wand", rarity: "rare", cell: 1, note: "\u708e\u5f3e", stats: { damage: 1.3, cooldown: 1.04, projectiles: 1, speed: 0, magnet: 0, hp: 0 }, shot: { color: "#ff6a25", size: 14, speed: 405, life: 1.1 } },
    { id: "steelsword", name: "Steel Sword", rarity: "common", cell: 2, note: "\u91cd\u3044\u5f3e", stats: { damage: 1.55, cooldown: 1.12, projectiles: 1, speed: 0, magnet: 0, hp: 1 }, shot: { color: "#dfe9ff", size: 13, speed: 390, life: 1 } },
    { id: "daggers", name: "Twin Daggers", rarity: "rare", cell: 3, note: "2\u9023\u5c04", stats: { damage: .65, cooldown: .78, projectiles: 2, speed: 18, magnet: 0, hp: 0 }, shot: { color: "#c9d2e6", size: 8, speed: 500, life: .9 } },
    { id: "longbow", name: "Longbow", rarity: "common", cell: 4, note: "\u9ad8\u901f\u5f3e", stats: { damage: .95, cooldown: .96, projectiles: 1, speed: 12, magnet: 0, hp: 0 }, shot: { color: "#b4ff75", size: 9, speed: 545, life: 1.05 } },
    { id: "holystaff", name: "Holy Staff", rarity: "epic", cell: 5, note: "\u5438\u5f15\u5f37\u5316", stats: { damage: 1.2, cooldown: 1, projectiles: 1, speed: 0, magnet: 62, hp: 1 }, shot: { color: "#fff7ac", size: 14, speed: 420, life: 1.2 } },
    { id: "handcannon", name: "Hand Cannon", rarity: "rare", cell: 6, note: "\u5927\u706b\u529b", stats: { damage: 2.15, cooldown: 1.38, projectiles: 1, speed: -4, magnet: 0, hp: 0 }, shot: { color: "#ffb357", size: 18, speed: 360, life: 1.15 } },
    { id: "spear", name: "Spear", rarity: "common", cell: 7, note: "\u5b89\u5b9a\u578b", stats: { damage: 1.05, cooldown: .95, projectiles: 1, speed: 10, magnet: 8, hp: 0 }, shot: { color: "#a7d7ff", size: 11, speed: 455, life: 1.12 } },
    { id: "flask", name: "Toxic Flask", rarity: "rare", cell: 8, note: "\u6bd2\u8272\u306e\u5f3e", stats: { damage: 1.25, cooldown: 1.02, projectiles: 1, speed: 0, magnet: 22, hp: 0 }, shot: { color: "#7dff4f", size: 16, speed: 380, life: 1.25 } },
    { id: "scythe", name: "Scythe", rarity: "epic", cell: 9, note: "\u5927\u304d\u3044\u5f3e", stats: { damage: 1.85, cooldown: 1.18, projectiles: 1, speed: 0, magnet: 18, hp: 0 }, shot: { color: "#c7b7ff", size: 20, speed: 365, life: 1.3 } },
    { id: "hammer", name: "Storm Hammer", rarity: "epic", cell: 10, note: "\u96f7\u6483", stats: { damage: 2.35, cooldown: 1.42, projectiles: 1, speed: -8, magnet: 0, hp: 1 }, shot: { color: "#63e8ff", size: 19, speed: 345, life: 1.2 } },
    { id: "icetome", name: "Ice Tome", rarity: "rare", cell: 11, note: "\u9023\u5c04\u5f37\u5316", stats: { damage: .85, cooldown: .78, projectiles: 1, speed: 0, magnet: 18, hp: 0 }, shot: { color: "#8ee8ff", size: 13, speed: 420, life: 1.3 } },
    { id: "needle", name: "Venom Needle", rarity: "common", cell: 12, note: "\u5c0f\u3055\u304f\u901f\u3044", stats: { damage: .72, cooldown: .74, projectiles: 1, speed: 14, magnet: 0, hp: 0 }, shot: { color: "#70ff70", size: 7, speed: 575, life: .8 } },
    { id: "boomerang", name: "Boomerang", rarity: "rare", cell: 13, note: "\u5e83\u3044\u62e1\u6563", stats: { damage: .95, cooldown: .94, projectiles: 2, speed: 8, magnet: 0, hp: 0 }, shot: { color: "#ffc36b", size: 12, speed: 410, life: 1.35 } },
    { id: "orb", name: "Magic Orb", rarity: "epic", cell: 14, note: "\u9b54\u529b\u5f3e", stats: { damage: 1.45, cooldown: .98, projectiles: 2, speed: 0, magnet: 32, hp: 0 }, shot: { color: "#d35cff", size: 15, speed: 395, life: 1.18 } },
    { id: "chakram", name: "Chakram", rarity: "rare", cell: 15, note: "3\u65b9\u5411", stats: { damage: .72, cooldown: 1.08, projectiles: 3, speed: 0, magnet: 0, hp: 0 }, shot: { color: "#dbe5ff", size: 10, speed: 430, life: 1 } },
    { id: "axe", name: "Battle Axe", rarity: "common", cell: 16, note: "\u706b\u529b\u578b", stats: { damage: 1.65, cooldown: 1.22, projectiles: 1, speed: -6, magnet: 0, hp: 1 }, shot: { color: "#f0f2ff", size: 16, speed: 370, life: 1.1 } },
    { id: "rifle", name: "Crystal Rifle", rarity: "legend", cell: 17, note: "\u6700\u9ad8\u9023\u5c04", stats: { damage: 1.5, cooldown: .68, projectiles: 2, speed: 18, magnet: 18, hp: 0 }, shot: { color: "#49dfff", size: 12, speed: 610, life: 1 } },
    { id: "sunblade", name: "Sun Blade", rarity: "legend", cell: 18, note: "\u6700\u9ad8\u706b\u529b", stats: { damage: 2.25, cooldown: .92, projectiles: 2, speed: 10, magnet: 20, hp: 1 }, shot: { color: "#ffe879", size: 18, speed: 470, life: 1.2 } },
    { id: "moonsickle", name: "Moon Sickle", rarity: "epic", cell: 19, note: "\u5e83\u57df\u5f3e", stats: { damage: 1.25, cooldown: 1.04, projectiles: 3, speed: 4, magnet: 24, hp: 0 }, shot: { color: "#a6c7ff", size: 14, speed: 400, life: 1.25 } },
  ];

  const weaponStyles = {
    crossbow: { shape: "bolt", trail: "#ffe75c", spread: 0.12, pierce: 0, hitCount: 7 },
    firewand: { shape: "fire", trail: "#ff3d24", spread: 0.1, splash: 42, hitCount: 14 },
    steelsword: { shape: "blade", trail: "#dfe9ff", spread: 0.06, pierce: 2, hitCount: 8 },
    daggers: { shape: "dagger", trail: "#c9d2e6", spread: 0.26, pierce: 0, hitCount: 4 },
    longbow: { shape: "arrow", trail: "#b4ff75", spread: 0.04, pierce: 1, hitCount: 5 },
    holystaff: { shape: "holy", trail: "#fff7ac", spread: 0.12, splash: 34, hitCount: 13 },
    handcannon: { shape: "cannon", trail: "#ff9d35", spread: 0.04, splash: 58, knock: 10, hitCount: 18 },
    spear: { shape: "spear", trail: "#a7d7ff", spread: 0.02, pierce: 3, hitCount: 6 },
    flask: { shape: "flask", trail: "#7dff4f", spread: 0.18, splash: 50, wobble: 3, hitCount: 16 },
    scythe: { shape: "scythe", trail: "#c7b7ff", spread: 0.2, pierce: 2, hitCount: 12 },
    hammer: { shape: "hammer", trail: "#63e8ff", spread: 0.03, splash: 64, knock: 18, hitCount: 20 },
    icetome: { shape: "ice", trail: "#8ee8ff", spread: 0.12, pierce: 1, hitCount: 10 },
    needle: { shape: "needle", trail: "#70ff70", spread: 0.02, pierce: 0, hitCount: 3 },
    boomerang: { shape: "boomerang", trail: "#ffc36b", spread: 0.42, wobble: 8, pierce: 1, hitCount: 7 },
    orb: { shape: "orb", trail: "#d35cff", spread: 0.2, splash: 46, wobble: 4, hitCount: 15 },
    chakram: { shape: "ring", trail: "#dbe5ff", spread: 0.34, pierce: 2, spin: 12, hitCount: 7 },
    axe: { shape: "axe", trail: "#f0f2ff", spread: 0.08, pierce: 1, spin: 9, hitCount: 9 },
    rifle: { shape: "beam", trail: "#49dfff", spread: 0.03, pierce: 2, hitCount: 8 },
    sunblade: { shape: "sun", trail: "#ffe879", spread: 0.16, splash: 52, pierce: 1, hitCount: 18 },
    moonsickle: { shape: "moon", trail: "#a6c7ff", spread: 0.32, pierce: 2, wobble: 5, hitCount: 12 },
  };
  for (const item of weapons) Object.assign(item.shot, weaponStyles[item.id]);

  const upgrades = [
    ["Rapid Fire", "\u653b\u6483\u9593\u9694\u304c\u77ed\u304f\u306a\u308b", () => state.fireCooldown = Math.max(0.14, state.fireCooldown * 0.84)],
    ["Sharp Bolts", "\u5f3e\u306e\u30c0\u30e1\u30fc\u30b8\u304c\u4e0a\u304c\u308b", () => state.damage += 0.65],
    ["Split Shot", "\u5f3e\u304c1\u3064\u5897\u3048\u308b", () => state.projectiles = Math.min(8, state.projectiles + 1)],
    ["Fleet Boots", "\u79fb\u52d5\u901f\u5ea6\u304c\u4e0a\u304c\u308b", () => state.speed += 24],
    ["Soul Magnet", "\u30b8\u30a7\u30e0\u5438\u5f15\u7bc4\u56f2\u304c\u5e83\u304c\u308b", () => state.magnet += 34],
    ["Max Heart", "\u6700\u5927HP+5\u3067\u5168\u56de\u5fa9", () => { state.maxHp += 5; state.hp = state.maxHp; }],
  ];

  const audio = {
    unlocked: false,
    bgmIndex: 0,
    bgmTracks: [
      "./assets/audio/bgm-action-1.ogg?v=20260613-bgm2",
      "./assets/audio/bgm-action-2.ogg?v=20260613-bgm2",
      "./assets/audio/bgm-action-3.ogg?v=20260613-bgm2",
    ],
    bgm: new Audio("./assets/audio/bgm-action-1.ogg?v=20260613-bgm2"),
    sounds: {
      click: "./assets/audio/ui-click.ogg?v=20260613-audiofx",
      confirm: "./assets/audio/ui-confirm.ogg?v=20260613-audiofx",
      gacha: "./assets/audio/ui-gacha.ogg?v=20260613-audiofx",
      hit: "./assets/audio/hit.ogg?v=20260613-audiofx",
      ko: "./assets/audio/ko.ogg?v=20260613-audiofx",
      xp: "./assets/audio/xp.ogg?v=20260613-audiofx",
      level: "./assets/audio/level.ogg?v=20260613-audiofx",
    },
    last: {},
  };
  audio.bgm.loop = true;
  audio.bgm.volume = 0.18;

  const saveKey = "pixel-survivors-roster-v2";
  const save = loadSave();

  const state = {
    w: 0,
    h: 0,
    dpr: 1,
    last: 0,
    time: 0,
    spawn: 0,
    fire: 0,
    paused: false,
    mode: "prep",
    prepTab: "loadout",
    level: 1,
    xp: 0,
    xpNeed: 8,
    hp: 30,
    maxHp: 30,
    kills: 0,
    damage: 1,
    projectiles: 1,
    shot: weapons[0].shot,
    speed: 190,
    fireCooldown: 0.55,
    magnet: 86,
    player: { x: 0, y: 0, hit: 0 },
    move: { x: 0, y: 0 },
    enemies: [],
    bolts: [],
    gems: [],
    pops: [],
    effects: [],
    touchId: null,
    stickBase: { x: 0, y: 0 },
    animTime: 0,
  };

  function loadSave() {
    const base = {
      coins: 900,
      characters: { hunter: { level: 1 } },
      weapons: { crossbow: { level: 1 } },
      selectedCharacter: "hunter",
      selectedWeapon: "crossbow",
    };
    try {
      const stored = JSON.parse(localStorage.getItem(saveKey) || "null");
      if (stored) return normalizeSave(stored);
      const old = JSON.parse(localStorage.getItem("pixel-survivors-loadout-v1") || "null");
      if (old) {
        for (const id of old.characters || []) base.characters[id] = { level: 1 };
        for (const id of old.equipment || []) base.weapons[id] = { level: 1 };
        base.selectedCharacter = old.selectedCharacter || "hunter";
        base.selectedWeapon = old.selectedEquipment || "crossbow";
        base.coins = Math.max(base.coins, old.coins || 0);
      }
    } catch {
      localStorage.removeItem(saveKey);
    }
    return normalizeSave(base);
  }

  function normalizeSave(data) {
    data.characters = data.characters && !Array.isArray(data.characters) ? data.characters : { hunter: { level: 1 } };
    data.weapons = data.weapons && !Array.isArray(data.weapons) ? data.weapons : { crossbow: { level: 1 } };
    data.characters.hunter ||= { level: 1 };
    data.weapons.crossbow ||= { level: 1 };
    data.selectedCharacter = characters.some((item) => item.id === data.selectedCharacter && data.characters[item.id]) ? data.selectedCharacter : "hunter";
    data.selectedWeapon = weapons.some((item) => item.id === data.selectedWeapon && data.weapons[item.id]) ? data.selectedWeapon : "crossbow";
    data.coins = Number.isFinite(data.coins) ? data.coins : 900;
    for (const item of [...characters, ...weapons]) {
      const bucket = characters.includes(item) ? data.characters : data.weapons;
      if (bucket[item.id]) bucket[item.id].level = clamp(Math.floor(bucket[item.id].level || 1), 1, 12);
    }
    return data;
  }

  function persist() {
    localStorage.setItem(saveKey, JSON.stringify(save));
  }

  function character() {
    return characters.find((item) => item.id === save.selectedCharacter) || characters[0];
  }

  function weapon() {
    return weapons.find((item) => item.id === save.selectedWeapon) || weapons[0];
  }

  function charLevel(id = save.selectedCharacter) {
    return save.characters[id]?.level || 1;
  }

  function weaponLevel(id = save.selectedWeapon) {
    return save.weapons[id]?.level || 1;
  }

  function itemPower(item, level) {
    return rarity[item.rarity].power * (1 + (level - 1) * 0.095);
  }

  function upgradeCost(item, level) {
    return Math.floor(rarity[item.rarity].cost * Math.pow(1.42, level - 1));
  }

  function unlockAudio() {
    audio.unlocked = true;
  }

  function playSound(name, volume = 0.45, throttle = 0.035) {
    if (!audio.unlocked) return;
    const now = performance.now() / 1000;
    if (audio.last[name] && now - audio.last[name] < throttle) return;
    audio.last[name] = now;
    const src = audio.sounds[name];
    if (!src) return;
    const sound = new Audio(src);
    sound.volume = volume;
    sound.play().catch(() => {});
  }

  function playBgm() {
    if (!audio.unlocked) return;
    audio.bgm.play().catch(() => {});
  }

  function stopBgm() {
    audio.bgm.pause();
    audio.bgm.currentTime = 0;
  }

  function changeBgm() {
    audio.bgmIndex = Math.floor(Math.random() * audio.bgmTracks.length);
    audio.bgm.pause();
    audio.bgm = new Audio(audio.bgmTracks[audio.bgmIndex]);
    audio.bgm.loop = true;
    audio.bgm.volume = 0.18;
  }

  function resize() {
    state.dpr = 1;
    state.w = Math.floor(window.innerWidth);
    state.h = Math.floor(window.innerHeight);
    canvas.width = Math.floor(state.w * state.dpr);
    canvas.height = Math.floor(state.h * state.dpr);
    ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
    ctx.imageSmoothingEnabled = false;
  }

  function dist(a, b) {
    return Math.hypot(a.x - b.x, a.y - b.y);
  }

  function norm(x, y) {
    const len = Math.hypot(x, y) || 1;
    return { x: x / len, y: y / len };
  }

  function applyLoadoutStats() {
    const char = character();
    const wep = weapon();
    const cp = itemPower(char, charLevel());
    const wp = itemPower(wep, weaponLevel());
    state.maxHp = Math.max(10, Math.round(30 + char.stats.hp * cp * 3 + wep.stats.hp * wp * 3));
    state.hp = state.maxHp;
    state.damage = Math.max(.4, 1 + char.stats.damage * cp + wep.stats.damage * wp);
    state.projectiles = clamp(wep.stats.projectiles + Math.floor((weaponLevel() - 1) / 4), 1, 8);
    state.speed = Math.max(100, 190 + char.stats.speed * cp + wep.stats.speed * wp);
    state.fireCooldown = Math.max(0.13, 0.55 * char.stats.cooldown / Math.sqrt(cp) * wep.stats.cooldown / Math.sqrt(wp));
    state.magnet = 86 + char.stats.magnet * cp + wep.stats.magnet * wp;
    state.shot = wep.shot;
  }

  function spawnEnemy() {
    if (state.enemies.length >= perf.maxEnemies) return;
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.max(state.w, state.h) * 0.66;
    const bat = Math.random() > 0.46;
    state.enemies.push({
      x: state.player.x + Math.cos(angle) * radius,
      y: state.player.y + Math.sin(angle) * radius,
      hp: bat ? 2 + state.time / 80 : 3 + state.time / 70,
      kind: bat ? "bat" : "slime",
      size: bat ? 42 : 48,
      wobble: Math.random() * 10,
    });
  }

  function fire() {
    if (!state.enemies.length) return;
    let target = state.enemies[0];
    let best = dist(target, state.player);
    for (const enemy of state.enemies) {
      const d = dist(enemy, state.player);
      if (d < best) {
        best = d;
        target = enemy;
      }
    }
    const n = norm(target.x - state.player.x, target.y - state.player.y);
    const baseAngle = Math.atan2(n.y, n.x);
    for (let i = 0; i < state.projectiles; i++) {
      if (state.bolts.length >= perf.maxBolts) break;
      const spread = (i - (state.projectiles - 1) / 2) * (state.shot.spread ?? 0.18);
      const angle = baseAngle + spread;
      state.bolts.push({
        x: state.player.x + Math.cos(angle) * 10,
        y: state.player.y + Math.sin(angle) * 10,
        vx: Math.cos(angle) * state.shot.speed,
        vy: Math.sin(angle) * state.shot.speed,
        life: state.shot.life,
        angle,
        size: state.shot.size,
        color: state.shot.color,
        trail: state.shot.trail || state.shot.color,
        shape: state.shot.shape || "bolt",
        pierce: state.shot.pierce || 0,
        splash: state.shot.splash || 0,
        knock: state.shot.knock || 0,
        wobble: state.shot.wobble || 0,
        spin: state.shot.spin || 0,
        hitCount: state.shot.hitCount || 7,
        age: 0,
      });
    }
    state.fire = state.fireCooldown;
  }

  function collect(gem) {
    state.gems.splice(state.gems.indexOf(gem), 1);
    state.xp += 1;
    state.pops.push({ x: gem.x, y: gem.y, text: "+XP", life: 0.5 });
    playSound("xp", 0.25, 0.04);
    spawnHitEffect(gem.x, gem.y, "#2ce8ff", 5);
    if (state.xp >= state.xpNeed) {
      state.xp -= state.xpNeed;
      state.xpNeed += 5;
      state.level += 1;
      showUpgrade();
    }
  }

  function showUpgrade() {
    state.paused = true;
    playSound("level", 0.42, 0.4);
    const picks = upgrades.slice().sort(() => Math.random() - 0.5).slice(0, 3);
    ui.upgrade.innerHTML = "<h2>LEVEL UP</h2>";
    for (const pick of picks) {
      const button = document.createElement("button");
      button.innerHTML = `<strong>${pick[0]}</strong><small>${pick[1]}</small>`;
      button.addEventListener("pointerup", () => {
        unlockAudio();
        playSound("confirm", 0.38);
        pick[2]();
        state.paused = false;
        ui.upgrade.classList.add("hidden");
      }, { once: true });
      ui.upgrade.appendChild(button);
    }
    ui.upgrade.classList.remove("hidden");
  }

  function resetRun() {
    Object.assign(state, {
      time: 0,
      spawn: 0,
      fire: 0,
      paused: false,
      level: 1,
      xp: 0,
      xpNeed: 8,
      kills: 0,
      enemies: [],
      bolts: [],
      gems: [],
      pops: [],
      effects: [],
    });
    state.player.x = 0;
    state.player.y = 0;
    state.move.x = 0;
    state.move.y = 0;
    applyLoadoutStats();
  }

  function startRun() {
    unlockAudio();
    changeBgm();
    playSound("confirm", 0.42);
    playBgm();
    state.mode = "run";
    ui.prep.classList.add("hidden");
    document.body.classList.remove("prep-open");
    resetRun();
  }

  function endRun() {
    stopBgm();
    save.coins += 35 + Math.min(165, state.kills * 3);
    persist();
    state.mode = "prep";
    ui.prep.classList.remove("hidden");
    document.body.classList.add("prep-open");
    renderPrep(`RUN REWARD +${35 + Math.min(165, state.kills * 3)} COIN`);
  }

  function update(dt) {
    state.animTime += dt;
    if (state.mode !== "run" || state.paused) return;
    state.time += dt;
    state.spawn -= dt;
    state.fire -= dt;
    state.player.x += state.move.x * state.speed * dt;
    state.player.y += state.move.y * state.speed * dt;
    state.player.hit = Math.max(0, state.player.hit - dt);

    if (state.spawn <= 0) {
      const spawnCap = lowPowerDevice ? 9 : 16;
      const count = Math.min(3 + Math.floor(state.time / 24), spawnCap, perf.maxEnemies - state.enemies.length);
      for (let i = 0; i < count; i++) spawnEnemy();
      state.spawn = Math.max(lowPowerDevice ? 0.55 : 0.35, 1.14 - state.time / 180);
    }
    if (state.fire <= 0) fire();

    for (let i = state.enemies.length - 1; i >= 0; i--) {
      const enemy = state.enemies[i];
      const n = norm(state.player.x - enemy.x, state.player.y - enemy.y);
      enemy.x += n.x * 74 * dt;
      enemy.y += n.y * 74 * dt;
      enemy.wobble += dt * 6;
      if (dist(enemy, state.player) < 34) {
        state.enemies.splice(i, 1);
        state.hp -= 1;
        state.player.hit = 0.18;
        if (state.hp <= 0) {
          endRun();
          return;
        }
      }
    }

    for (let i = state.bolts.length - 1; i >= 0; i--) {
      const bolt = state.bolts[i];
      bolt.age += dt;
      const side = bolt.wobble ? Math.sin(bolt.age * bolt.wobble * 5) * bolt.wobble * 18 : 0;
      bolt.x += (bolt.vx + Math.cos(bolt.angle + Math.PI / 2) * side) * dt;
      bolt.y += (bolt.vy + Math.sin(bolt.angle + Math.PI / 2) * side) * dt;
      bolt.life -= dt;
      if (state.effects.length < perf.maxEffects && Math.random() < perf.trailChance) spawnTrailEffect(bolt.x, bolt.y, bolt.trail, bolt.shape);
      if (bolt.life <= 0) {
        state.bolts.splice(i, 1);
        continue;
      }
      for (let j = state.enemies.length - 1; j >= 0; j--) {
        const enemy = state.enemies[j];
        if (Math.hypot(enemy.x - bolt.x, enemy.y - bolt.y) < Math.max(24, bolt.size + 16)) {
          enemy.hp -= state.damage;
          if (bolt.knock) {
            enemy.x += Math.cos(bolt.angle) * bolt.knock;
            enemy.y += Math.sin(bolt.angle) * bolt.knock;
          }
          playSound("hit", 0.28, 0.025);
          spawnHitEffect(enemy.x, enemy.y - enemy.size * 0.35, bolt.color, bolt.hitCount);
          if (bolt.splash) splashDamage(enemy, bolt);
          state.pops.push({
            x: enemy.x,
            y: enemy.y - enemy.size * 0.62,
            text: formatDamage(state.damage),
            life: 0.62,
            color: bolt.color,
            size: 14,
          });
          if (bolt.pierce > 0) {
            bolt.pierce -= 1;
            bolt.life *= 0.82;
          } else {
            state.bolts.splice(i, 1);
          }
          if (enemy.hp <= 0) {
            spawnHitEffect(enemy.x, enemy.y, "#ff5c8a", 12);
            playSound("ko", 0.38, 0.08);
            state.gems.push({ x: enemy.x, y: enemy.y, pulse: Math.random() * 6 });
            state.pops.push({ x: enemy.x, y: enemy.y, text: "KO", life: 0.45 });
            state.enemies.splice(j, 1);
            state.kills += 1;
            if (state.kills % 10 === 0) {
              save.coins += 10;
              persist();
            }
          }
          break;
        }
      }
    }

    for (let i = state.enemies.length - 1; i >= 0; i--) {
      const enemy = state.enemies[i];
      if (enemy.hp > 0) continue;
      spawnHitEffect(enemy.x, enemy.y, "#ff5c8a", 12);
      playSound("ko", 0.38, 0.08);
      state.gems.push({ x: enemy.x, y: enemy.y, pulse: Math.random() * 6 });
      state.pops.push({ x: enemy.x, y: enemy.y, text: "KO", life: 0.45 });
      state.enemies.splice(i, 1);
      state.kills += 1;
      if (state.kills % 10 === 0) {
        save.coins += 10;
        persist();
      }
    }

    for (let i = state.gems.length - 1; i >= 0; i--) {
      const gem = state.gems[i];
      gem.pulse += dt * 5;
      const d = dist(gem, state.player);
      if (d < 24) {
        collect(gem);
      } else if (d < state.magnet) {
        const n = norm(state.player.x - gem.x, state.player.y - gem.y);
        gem.x += n.x * 240 * dt;
        gem.y += n.y * 240 * dt;
      }
    }

    for (let i = state.pops.length - 1; i >= 0; i--) {
      state.pops[i].y -= 28 * dt;
      state.pops[i].life -= dt;
      if (state.pops[i].life <= 0) state.pops.splice(i, 1);
    }

    for (let i = state.effects.length - 1; i >= 0; i--) {
      const fx = state.effects[i];
      fx.x += fx.vx * dt;
      fx.y += fx.vy * dt;
      fx.life -= dt;
      if (fx.life <= 0) state.effects.splice(i, 1);
    }
    trimTransientLists();
  }

  function trimTransientLists() {
    if (state.effects.length > perf.maxEffects) state.effects.splice(0, state.effects.length - perf.maxEffects);
    if (state.pops.length > perf.maxPops) state.pops.splice(0, state.pops.length - perf.maxPops);
    if (state.gems.length > perf.maxGems) state.gems.splice(0, state.gems.length - perf.maxGems);
    if (state.bolts.length > perf.maxBolts) state.bolts.splice(0, state.bolts.length - perf.maxBolts);
  }

  function screen(point) {
    return {
      x: state.w / 2 + point.x - state.player.x,
      y: state.h / 2 + point.y - state.player.y,
    };
  }

  function draw() {
    ctx.clearRect(0, 0, state.w, state.h);
    ctx.fillStyle = "#07080d";
    ctx.fillRect(0, 0, state.w, state.h);

    const grid = 24;
    const ox = ((-state.player.x % grid) + grid) % grid;
    const oy = ((-state.player.y % grid) + grid) % grid;
    for (let x = ox - grid; x < state.w + grid; x += grid) {
      for (let y = oy - grid; y < state.h + grid; y += grid) {
        const shade = ((Math.floor((x - ox + state.player.x) / grid) + Math.floor((y - oy + state.player.y) / grid)) & 1) ? "#10161c" : "#0b1016";
        ctx.fillStyle = shade;
        ctx.fillRect(Math.floor(x), Math.floor(y), grid - 2, grid - 2);
        if ((((x + y) / grid) & 3) === 0) {
          ctx.fillStyle = "rgba(255, 255, 255, .025)";
          ctx.fillRect(Math.floor(x + 4), Math.floor(y + 4), 4, 4);
        }
      }
    }

    for (const gem of state.gems) {
      const p = screen(gem);
      const r = 6 + Math.sin(gem.pulse) * 1.2;
      ctx.fillStyle = "#2ce8ff";
      ctx.strokeStyle = "#f7ffff";
      ctx.lineWidth = 1;
      const px = Math.round(p.x / 2) * 2;
      const py = Math.round(p.y / 2) * 2;
      ctx.fillRect(px - r, py - r, r * 2, r * 2);
      ctx.strokeRect(px - r, py - r, r * 2, r * 2);
    }

    for (const bolt of state.bolts) {
      const p = screen(bolt);
      drawProjectile(bolt, p.x, p.y);
    }

    for (const fx of state.effects) {
      const p = screen(fx);
      ctx.globalAlpha = Math.max(0, fx.life / fx.maxLife);
      ctx.fillStyle = fx.color;
      ctx.fillRect(Math.round(p.x), Math.round(p.y), fx.size, fx.size);
      ctx.globalAlpha = 1;
    }

    for (const enemy of state.enemies) {
      const p = screen(enemy);
      const bob = Math.sin(enemy.wobble) * 4;
      const rate = enemy.kind === "bat" ? 12 : 7;
      const frame = Math.floor((state.animTime + enemy.wobble * 0.08) * rate) % 4;
      drawSpriteFrame(assets[`${enemy.kind}Sheet`] || assets[enemy.kind], p.x, p.y + bob, enemy.size, frame - (frame % perf.enemyFrameStride));
    }

    const pulse = state.player.hit > 0 ? 1.06 : 1;
    if (perf.showAura) drawAura(state.w / 2, state.h / 2, 42 * pulse, rarity[character().rarity].color);
    drawPlayerSprite(assets[`char-${character().cell}`], state.w / 2, state.h / 2, lowPowerDevice ? 74 * pulse : 82 * pulse);

    ctx.textAlign = "center";
    for (const pop of state.pops) {
      const p = screen(pop);
      ctx.globalAlpha = Math.max(0, Math.min(1, pop.life / 0.5));
      ctx.font = `bold ${pop.size || 12}px Menlo, monospace`;
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#10131a";
      ctx.fillStyle = pop.color || (pop.text === "KO" ? "#ffe75c" : "#82f3ff");
      ctx.strokeText(pop.text, p.x, p.y);
      ctx.fillText(pop.text, p.x, p.y);
      ctx.globalAlpha = 1;
    }
  }

  function spawnHitEffect(x, y, color, count = 7) {
    if (state.effects.length >= perf.maxEffects) return;
    const cappedCount = Math.max(1, Math.floor(count * perf.hitFxScale));
    for (let i = 0; i < cappedCount && state.effects.length < perf.maxEffects; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 34 + Math.random() * 86;
      const life = 0.22 + Math.random() * 0.18;
      state.effects.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color,
        size: 3 + Math.floor(Math.random() * 4),
        life,
        maxLife: life,
      });
    }
  }

  function spawnTrailEffect(x, y, color, shape) {
    if (state.effects.length >= perf.maxEffects) return;
    const size = shape === "beam" || shape === "needle" ? 2 : shape === "cannon" || shape === "hammer" ? 5 : 3;
    const life = shape === "fire" || shape === "orb" || shape === "sun" ? 0.26 : 0.16;
    state.effects.push({
      x: x + (Math.random() - 0.5) * 8,
      y: y + (Math.random() - 0.5) * 8,
      vx: (Math.random() - 0.5) * 26,
      vy: (Math.random() - 0.5) * 26,
      color,
      size,
      life,
      maxLife: life,
    });
  }

  function splashDamage(source, bolt) {
    spawnHitEffect(source.x, source.y, bolt.trail, Math.max(8, Math.floor(bolt.splash / 4)));
    for (const enemy of state.enemies) {
      if (enemy === source) continue;
      const d = Math.hypot(enemy.x - source.x, enemy.y - source.y);
      if (d <= bolt.splash) {
        enemy.hp -= state.damage * 0.42;
        enemy.x += Math.cos(bolt.angle) * (bolt.knock || 4);
        enemy.y += Math.sin(bolt.angle) * (bolt.knock || 4);
        state.pops.push({
          x: enemy.x,
          y: enemy.y - enemy.size * 0.55,
          text: formatDamage(state.damage * 0.42),
          life: 0.48,
          color: bolt.trail,
          size: 11,
        });
      }
    }
  }

  function drawProjectile(bolt, x, y) {
    const s = bolt.size;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(bolt.angle + (bolt.spin ? bolt.age * bolt.spin : 0));
    ctx.fillStyle = "#171015";
    switch (bolt.shape) {
      case "fire":
        drawDiamond(s + 5, "#ffda63");
        drawDiamond(s, bolt.color);
        break;
      case "blade":
      case "spear":
      case "arrow":
        ctx.fillRect(-s - 5, -3, s * 2 + 10, 6);
        ctx.fillStyle = bolt.color;
        ctx.fillRect(-s - 2, -2, s * 2 + 4, 4);
        ctx.fillRect(s - 2, -6, 8, 12);
        break;
      case "dagger":
      case "needle":
        ctx.fillRect(-s - 2, -2, s * 2 + 4, 4);
        ctx.fillStyle = bolt.color;
        ctx.fillRect(-s, -1, s * 2, 2);
        break;
      case "cannon":
      case "hammer":
        drawBlock(s + 5, "#171015");
        drawBlock(s, bolt.color);
        break;
      case "flask":
      case "orb":
      case "holy":
      case "ice":
      case "sun":
        drawOrb(s + 4, "#171015");
        drawOrb(s, bolt.color);
        if (bolt.shape === "sun") drawCross(s + 6, "#fff5a8");
        break;
      case "scythe":
      case "moon":
        ctx.fillRect(-s, -4, s * 2, 8);
        ctx.fillStyle = bolt.color;
        ctx.fillRect(-s + 3, -7, s * 2 - 6, 14);
        ctx.clearRect(-3, -7, 7, 14);
        break;
      case "ring":
      case "boomerang":
        ctx.fillRect(-s, -s, s * 2, 5);
        ctx.fillRect(s - 4, -s, 5, s * 2);
        ctx.fillStyle = bolt.color;
        ctx.fillRect(-s + 3, -s + 3, s * 2 - 6, 4);
        ctx.fillRect(s - 7, -s + 3, 4, s * 2 - 6);
        break;
      case "beam":
        ctx.fillRect(-s * 2, -3, s * 4, 6);
        ctx.fillStyle = bolt.color;
        ctx.fillRect(-s * 2, -1, s * 4, 2);
        break;
      default:
        ctx.fillRect(-s, -Math.max(4, s / 2), s * 2, s);
        ctx.fillStyle = bolt.color;
        ctx.fillRect(-s + 2, -Math.max(2, s / 2 - 2), s * 2 - 4, Math.max(4, s - 4));
    }
    ctx.restore();
  }

  function drawBlock(size, color) {
    ctx.fillStyle = color;
    ctx.fillRect(-size / 2, -size / 2, size, size);
  }

  function drawDiamond(size, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, -size);
    ctx.lineTo(size, 0);
    ctx.lineTo(0, size);
    ctx.lineTo(-size, 0);
    ctx.closePath();
    ctx.fill();
  }

  function drawOrb(size, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(0, 0, size, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawCross(size, color) {
    ctx.fillStyle = color;
    ctx.fillRect(-2, -size, 4, size * 2);
    ctx.fillRect(-size, -2, size * 2, 4);
  }

  function drawSprite(img, x, y, size) {
    if (!img) return;
    const drawSize = Math.max(8, snap(size, 4));
    const dx = snap(x - drawSize / 2, 4);
    const dy = snap(y - drawSize / 2, 4);
    drawOutlinedSource(img, 0, 0, img.width, img.height, dx, dy, drawSize, drawSize);
  }

  function drawPlayerSprite(img, x, y, size) {
    if (!img) return;
    const drawSize = Math.max(8, snap(size, 4));
    const dx = snap(x - drawSize / 2, 4);
    const dy = snap(y - drawSize / 2, 4);
    if (lowPowerDevice) {
      ctx.drawImage(img, dx, dy, drawSize, drawSize);
    } else {
      drawOutlinedSource(img, 0, 0, img.width, img.height, dx, dy, drawSize, drawSize, "player");
    }
  }

  function drawSpriteFrame(img, x, y, size, frame) {
    if (!img) return;
    if (img.width <= img.height * 1.5) {
      drawSprite(img, x, y, size);
      return;
    }
    const frameCount = 4;
    const frameWidth = Math.floor(img.width / frameCount);
    const sourceX = (frame % frameCount) * frameWidth;
    const drawSize = Math.max(8, snap(size, 4));
    const dx = snap(x - drawSize / 2, 4);
    const dy = snap(y - drawSize / 2, 4);
    drawOutlinedSource(img, sourceX, 0, frameWidth, img.height, dx, dy, drawSize, drawSize);
  }

  function drawSheetSprite(img, cell, cols, rows, x, y, size, type = "sheet") {
    if (!img) return;
    const sw = Math.floor(img.width / cols);
    const sh = Math.floor(img.height / rows);
    const sx = (cell % cols) * sw;
    const sy = Math.floor(cell / cols) * sh;
    const drawSize = Math.max(8, snap(size, 4));
    const dx = snap(x - drawSize / 2, 4);
    const dy = snap(y - drawSize / 2, 4);
    drawOutlinedSource(img, sx, sy, sw, sh, dx, dy, drawSize, drawSize, type);
  }

  function drawOutlinedSource(img, sx, sy, sw, sh, dx, dy, dw, dh, type = "sprite") {
    const key = `${type}|${img.src}|${sx}|${sy}|${sw}|${sh}|${dw}|${dh}`;
    let cached = outlineCache.get(key);
    if (!cached) {
      const pad = 4;
      cached = document.createElement("canvas");
      cached.width = dw + pad * 2;
      cached.height = dh + pad * 2;
      const c = cached.getContext("2d");
      c.imageSmoothingEnabled = false;
      c.filter = "brightness(0) saturate(100%)";
      for (const [ox, oy] of [[-4, 0], [4, 0], [0, -4], [0, 4], [-4, -4], [4, -4], [-4, 4], [4, 4]]) {
        c.drawImage(img, sx, sy, sw, sh, pad + ox, pad + oy, dw, dh);
      }
      c.filter = "none";
      c.drawImage(img, sx, sy, sw, sh, pad, pad, dw, dh);
      outlineCache.set(key, cached);
    }
    ctx.drawImage(cached, dx - 4, dy - 4);
  }

  function drawAura(x, y, radius, tint) {
    if (tint) {
      ctx.save();
      ctx.globalAlpha = .24 + Math.sin(state.animTime * 7) * .06;
      ctx.fillStyle = tint;
      ctx.beginPath();
      ctx.arc(x, y + 18, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  function updateHud() {
    const m = Math.floor(state.time / 60).toString().padStart(2, "0");
    const s = Math.floor(state.time % 60).toString().padStart(2, "0");
    ui.hp.textContent = `HP ${state.hp}/${state.maxHp}`;
    ui.time.textContent = `${m}:${s}`;
    ui.level.textContent = `LV ${state.level}`;
    ui.kills.textContent = `KILLS ${state.kills}`;
    ui.xp.style.width = `${Math.max(2, Math.min(100, state.xp / state.xpNeed * 100))}%`;
  }

  function loop(t) {
    const now = t / 1000;
    const dt = Math.min(0.05, now - (state.last || now));
    state.last = now;
    update(dt);
    draw();
    updateHud();
    requestAnimationFrame(loop);
  }

  function setPrepTab(tab) {
    state.prepTab = tab;
    ui.loadoutView.hidden = tab !== "loadout";
    ui.gachaView.hidden = tab !== "gacha";
    ui.tabLoadout.classList.toggle("active", tab === "loadout");
    ui.tabGacha.classList.toggle("active", tab === "gacha");
    renderPrep();
  }

  function renderPrep(message = "100 COIN") {
    const ownedCount = Object.keys(save.characters).length + Object.keys(save.weapons).length;
    const totalCount = characters.length + weapons.length;
    ui.coins.textContent = `COIN ${save.coins}`;
    ui.owned.textContent = `${ownedCount}/${totalCount}`;
    ui.selectedCharacter.textContent = `${character().name} LV ${charLevel()}`;
    ui.selectedEquipment.textContent = `${weapon().name} LV ${weaponLevel()}`;
    ui.gachaResult.textContent = message;
    ui.gachaBtn.disabled = save.coins < 100 || ownedCount >= totalCount;
    ui.characters.innerHTML = characters.map((item) => itemCard(item, "character")).join("");
    ui.equipment.innerHTML = weapons.map((item) => itemCard(item, "weapon")).join("");
    ui.gachaPool.innerHTML = [...characters, ...weapons].map((item) => prizeCard(item, characters.includes(item) ? "character" : "weapon")).join("");
  }

  function itemCard(item, type) {
    const bucket = type === "character" ? save.characters : save.weapons;
    const owned = Boolean(bucket[item.id]);
    const selected = type === "character" ? save.selectedCharacter === item.id : save.selectedWeapon === item.id;
    const level = owned ? bucket[item.id].level : 0;
    const cost = owned ? upgradeCost(item, level) : 0;
    const disabled = !owned || save.coins < cost || level >= 12;
    return `<article class="pick ${owned ? "" : "locked"} ${selected ? "selected" : ""}" style="--rarity:${rarity[item.rarity].color}">
      <button class="pick-main" data-action="select" data-type="${type}" data-id="${item.id}" type="button">
        ${sheetIcon(item, type)}
        <span class="rarity">${rarity[item.rarity].label}</span>
        <b>${item.name}</b>
        <small>${owned ? `${item.note} / LV ${level}` : "LOCKED"}</small>
      </button>
      <button class="upgrade-mini" data-action="upgrade" data-type="${type}" data-id="${item.id}" type="button" ${disabled ? "disabled" : ""}>${owned && level < 12 ? `UP ${cost}` : owned ? "MAX" : "GET"}</button>
    </article>`;
  }

  function prizeCard(item, type) {
    const owned = type === "character" ? save.characters[item.id] : save.weapons[item.id];
    return `<div class="prize ${owned ? "owned" : ""}" style="--rarity:${rarity[item.rarity].color}">
      ${sheetIcon(item, type)}
      <b>${item.name}</b>
      <small>${rarity[item.rarity].label}${owned ? " OWNED" : ""}</small>
    </div>`;
  }

  function sheetIcon(item, type) {
    const prefix = type === "character" ? "char" : "weapon";
    return `<img class="sheet-icon ${type}" src="./assets/roster/${prefix}-${item.cell.toString().padStart(2, "0")}.png?v=20260614-roster" alt="">`;
  }

  function runGacha() {
    unlockAudio();
    const locked = [
      ...characters.filter((item) => !save.characters[item.id]).map((item) => ({ ...item, type: "character" })),
      ...weapons.filter((item) => !save.weapons[item.id]).map((item) => ({ ...item, type: "weapon" })),
    ];
    if (save.coins < 100) {
      playSound("click", 0.22);
      renderPrep("COIN\u4e0d\u8db3");
      return;
    }
    if (!locked.length) {
      playSound("click", 0.22);
      renderPrep("ALL OWNED");
      return;
    }
    playSound("gacha", 0.45, 0.2);
    save.coins -= 100;
    const prize = weightedPick(locked);
    if (prize.type === "character") {
      save.characters[prize.id] = { level: 1 };
      save.selectedCharacter = prize.id;
    } else {
      save.weapons[prize.id] = { level: 1 };
      save.selectedWeapon = prize.id;
    }
    persist();
    renderPrep(`GET ${rarity[prize.rarity].label} ${prize.name}`);
  }

  function weightedPick(pool) {
    const total = pool.reduce((sum, item) => sum + rarity[item.rarity].weight, 0);
    let roll = Math.random() * total;
    for (const item of pool) {
      roll -= rarity[item.rarity].weight;
      if (roll <= 0) return item;
    }
    return pool[pool.length - 1];
  }

  function handleCollectionClick(event) {
    const button = event.target.closest("[data-action]");
    if (!button) return;
    unlockAudio();
    const { action, type, id } = button.dataset;
    const list = type === "character" ? characters : weapons;
    const bucket = type === "character" ? save.characters : save.weapons;
    const item = list.find((entry) => entry.id === id);
    if (!item) return;
    if (!bucket[id]) {
      playSound("click", 0.22);
      setPrepTab("gacha");
      renderPrep("\u30ac\u30c1\u30e3\u3067\u89e3\u653e");
      return;
    }
    if (action === "select") {
      playSound("click", 0.32);
      if (type === "character") save.selectedCharacter = id;
      if (type === "weapon") save.selectedWeapon = id;
      persist();
      renderPrep("SELECTED");
      return;
    }
    if (action === "upgrade") {
      const level = bucket[id].level;
      const cost = upgradeCost(item, level);
      if (level >= 12) {
        renderPrep("MAX LEVEL");
      } else if (save.coins < cost) {
        playSound("click", 0.22);
        renderPrep("COIN\u4e0d\u8db3");
      } else {
        playSound("confirm", 0.38);
        save.coins -= cost;
        bucket[id].level += 1;
        persist();
        renderPrep(`UP ${item.name} LV ${bucket[id].level}`);
      }
    }
  }

  function setStick(clientX, clientY) {
    if (state.mode !== "run") return;
    const cx = state.stickBase.x;
    const cy = state.stickBase.y;
    const dx = clientX - cx;
    const dy = clientY - cy;
    const len = Math.min(48, Math.hypot(dx, dy));
    const n = norm(dx, dy);
    state.move.x = len < 8 ? 0 : n.x;
    state.move.y = len < 8 ? 0 : n.y;
    ui.knob.style.transform = `translate(${n.x * len}px, ${n.y * len}px)`;
  }

  function beginStick(event) {
    if (state.mode !== "run" || state.paused || event.button > 0) return;
    if (event.target.closest("#prep, #upgrade, button")) return;
    state.touchId = event.pointerId;
    state.stickBase.x = event.clientX;
    state.stickBase.y = event.clientY;
    ui.stick.classList.add("active");
    ui.stick.style.left = `${event.clientX - 58}px`;
    ui.stick.style.top = `${event.clientY - 58}px`;
    ui.stick.style.right = "auto";
    ui.stick.style.bottom = "auto";
    setStick(event.clientX, event.clientY);
  }

  function releaseStick() {
    state.touchId = null;
    state.move.x = 0;
    state.move.y = 0;
    ui.knob.style.transform = "";
    ui.stick.classList.remove("active");
    ui.stick.removeAttribute("style");
  }

  function formatDamage(value) {
    return Number.isInteger(value) ? `${value}` : value.toFixed(1);
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function snap(value, unit = 4) {
    return Math.round(value / unit) * unit;
  }

  ui.characters.addEventListener("pointerup", handleCollectionClick);
  ui.equipment.addEventListener("pointerup", handleCollectionClick);
  ui.gachaBtn.addEventListener("pointerup", runGacha);
  ui.startBtn.addEventListener("pointerup", startRun);
  ui.tabLoadout.addEventListener("pointerup", () => setPrepTab("loadout"));
  ui.tabGacha.addEventListener("pointerup", () => setPrepTab("gacha"));

  document.addEventListener("pointerdown", beginStick);
  document.addEventListener("pointermove", (event) => {
    if (state.touchId === event.pointerId) setStick(event.clientX, event.clientY);
  });
  document.addEventListener("pointerup", (event) => {
    if (state.touchId === event.pointerId) releaseStick();
  });
  document.addEventListener("pointercancel", (event) => {
    if (state.touchId === event.pointerId) releaseStick();
  });

  window.addEventListener("resize", resize);
  document.addEventListener("gesturestart", (event) => event.preventDefault());
  document.body.classList.add("prep-open");
  renderPrep();

  Promise.all([
    ...characters.map((item) => loadImage(`char-${item.cell}`, `./assets/roster/char-${item.cell.toString().padStart(2, "0")}.png?v=20260614-roster`)),
    loadImage("bat", "./assets/bat.png?v=20260613-publish"),
    loadImage("slime", "./assets/slime.png?v=20260613-publish"),
    loadImage("batSheet", "./assets/bat-sheet.png?v=20260613-anim"),
    loadImage("slimeSheet", "./assets/slime-sheet.png?v=20260613-anim"),
  ]).then(() => {
    resize();
    requestAnimationFrame(loop);
  });
})();
