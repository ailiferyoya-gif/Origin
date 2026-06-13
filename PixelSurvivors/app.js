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
    startBtn: document.getElementById("startBtn"),
    stick: document.getElementById("stick"),
    knob: document.querySelector("#stick span"),
  };

  const assets = {};
  const loadImage = (name, src) => new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      assets[name] = img;
      resolve();
    };
    img.src = src;
  });

  const characters = [
    { id: "hunter", name: "Hunter", note: "標準型", tint: null, stats: { hp: 0, speed: 0, damage: 0, cooldown: 1, magnet: 0 } },
    { id: "runner", name: "Runner", note: "移動が速い", tint: "#65e7ff", stats: { hp: -1, speed: 34, damage: 0, cooldown: .98, magnet: 8 } },
    { id: "warden", name: "Warden", note: "HPと吸引が強い", tint: "#c7ff7c", stats: { hp: 2, speed: -12, damage: .2, cooldown: 1.04, magnet: 28 } },
    { id: "witch", name: "Witch", note: "火力重視", tint: "#ff8df2", stats: { hp: -1, speed: 4, damage: .75, cooldown: .92, magnet: 0 } },
  ];

  const equipment = [
    { id: "crossbow", name: "Crossbow", icon: ">>", note: "弾の威力 +1", stats: { damage: 1, cooldown: 1, speed: 0, magnet: 0, hp: 0 } },
    { id: "boots", name: "Boots", icon: "[]", note: "移動速度 +38", stats: { damage: 0, cooldown: 1, speed: 38, magnet: 0, hp: 0 } },
    { id: "magnet", name: "Magnet", icon: "U", note: "吸引範囲 +70", stats: { damage: 0, cooldown: 1, speed: 0, magnet: 70, hp: 0 } },
    { id: "charm", name: "Charm", icon: "+", note: "HP +2 / 連射少し低下", stats: { damage: 0, cooldown: 1.08, speed: 0, magnet: 0, hp: 2 } },
    { id: "clock", name: "Clock", icon: "*", note: "攻撃間隔 -18%", stats: { damage: 0, cooldown: .82, speed: 0, magnet: 0, hp: 0 } },
  ];

  const upgrades = [
    ["Rapid Fire", "攻撃間隔が短くなる", () => state.fireCooldown = Math.max(0.16, state.fireCooldown * 0.84)],
    ["Sharp Bolts", "弾のダメージが上がる", () => state.damage += 0.65],
    ["Fleet Boots", "移動速度が上がる", () => state.speed += 24],
    ["Soul Magnet", "ジェム吸引範囲が広がる", () => state.magnet += 34],
    ["Max Heart", "最大HPが増えて全回復", () => { state.maxHp += 1; state.hp = state.maxHp; }],
  ];

  const saveKey = "pixel-survivors-loadout-v1";
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
    level: 1,
    xp: 0,
    xpNeed: 8,
    hp: 6,
    maxHp: 6,
    kills: 0,
    damage: 1,
    speed: 190,
    fireCooldown: 0.55,
    magnet: 86,
    player: { x: 0, y: 0, hit: 0 },
    move: { x: 0, y: 0 },
    enemies: [],
    bolts: [],
    gems: [],
    pops: [],
    touchId: null,
    animTime: 0,
  };

  function loadSave() {
    try {
      const stored = JSON.parse(localStorage.getItem(saveKey) || "null");
      if (stored) return stored;
    } catch {
      localStorage.removeItem(saveKey);
    }
    return {
      coins: 300,
      characters: ["hunter"],
      equipment: ["crossbow"],
      selectedCharacter: "hunter",
      selectedEquipment: "crossbow",
    };
  }

  function persist() {
    localStorage.setItem(saveKey, JSON.stringify(save));
  }

  function character() {
    return characters.find((item) => item.id === save.selectedCharacter) || characters[0];
  }

  function equip() {
    return equipment.find((item) => item.id === save.selectedEquipment) || equipment[0];
  }

  function resize() {
    state.dpr = Math.min(window.devicePixelRatio || 1, 2);
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
    const charStats = character().stats;
    const equipStats = equip().stats;
    state.maxHp = Math.max(3, 6 + charStats.hp + equipStats.hp);
    state.hp = state.maxHp;
    state.damage = 1 + charStats.damage + equipStats.damage;
    state.speed = 190 + charStats.speed + equipStats.speed;
    state.fireCooldown = Math.max(0.2, 0.55 * charStats.cooldown * equipStats.cooldown);
    state.magnet = 86 + charStats.magnet + equipStats.magnet;
  }

  function spawnEnemy() {
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.max(state.w, state.h) * 0.66;
    const bat = Math.random() > 0.46;
    state.enemies.push({
      x: state.player.x + Math.cos(angle) * radius,
      y: state.player.y + Math.sin(angle) * radius,
      hp: bat ? 2 : 3,
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
    state.bolts.push({
      x: state.player.x,
      y: state.player.y,
      vx: n.x * 430,
      vy: n.y * 430,
      life: 1.15,
      angle: Math.atan2(n.y, n.x),
    });
    state.fire = state.fireCooldown;
  }

  function collect(gem) {
    state.gems.splice(state.gems.indexOf(gem), 1);
    state.xp += 1;
    state.pops.push({ x: gem.x, y: gem.y, text: "+XP", life: 0.5 });
    if (state.xp >= state.xpNeed) {
      state.xp -= state.xpNeed;
      state.xpNeed += 5;
      state.level += 1;
      showUpgrade();
    }
  }

  function showUpgrade() {
    state.paused = true;
    const picks = upgrades.slice().sort(() => Math.random() - 0.5).slice(0, 3);
    ui.upgrade.innerHTML = "<h2>LEVEL UP</h2>";
    for (const pick of picks) {
      const button = document.createElement("button");
      button.innerHTML = `<strong>${pick[0]}</strong><small>${pick[1]}</small>`;
      button.addEventListener("pointerup", () => {
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
    });
    state.player.x = 0;
    state.player.y = 0;
    state.move.x = 0;
    state.move.y = 0;
    applyLoadoutStats();
  }

  function startRun() {
    state.mode = "run";
    ui.prep.classList.add("hidden");
    document.body.classList.remove("prep-open");
    resetRun();
  }

  function endRun() {
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
      const count = Math.min(3 + Math.floor(state.time / 24), 16);
      for (let i = 0; i < count; i++) spawnEnemy();
      state.spawn = Math.max(0.35, 1.14 - state.time / 180);
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
        if (state.hp <= 0) endRun();
      }
    }

    for (let i = state.bolts.length - 1; i >= 0; i--) {
      const bolt = state.bolts[i];
      bolt.x += bolt.vx * dt;
      bolt.y += bolt.vy * dt;
      bolt.life -= dt;
      if (bolt.life <= 0) {
        state.bolts.splice(i, 1);
        continue;
      }
      for (let j = state.enemies.length - 1; j >= 0; j--) {
        const enemy = state.enemies[j];
        if (Math.hypot(enemy.x - bolt.x, enemy.y - bolt.y) < 28) {
          enemy.hp -= state.damage;
          state.pops.push({
            x: enemy.x,
            y: enemy.y - enemy.size * 0.62,
            text: formatDamage(state.damage),
            life: 0.62,
            color: "#ffef73",
            size: 14,
          });
          state.bolts.splice(i, 1);
          if (enemy.hp <= 0) {
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
  }

  function screen(point) {
    return {
      x: state.w / 2 + point.x - state.player.x,
      y: state.h / 2 + point.y - state.player.y,
    };
  }

  function draw() {
    ctx.clearRect(0, 0, state.w, state.h);
    ctx.fillStyle = "#080b13";
    ctx.fillRect(0, 0, state.w, state.h);

    const grid = 48;
    const ox = ((-state.player.x % grid) + grid) % grid;
    const oy = ((-state.player.y % grid) + grid) % grid;
    for (let x = ox - grid; x < state.w + grid; x += grid) {
      for (let y = oy - grid; y < state.h + grid; y += grid) {
        const shade = ((Math.floor((x - ox + state.player.x) / grid) + Math.floor((y - oy + state.player.y) / grid)) & 1) ? "#101d22" : "#0c161b";
        ctx.fillStyle = shade;
        ctx.fillRect(Math.floor(x), Math.floor(y), grid - 2, grid - 2);
      }
    }

    for (const gem of state.gems) {
      const p = screen(gem);
      const r = 6 + Math.sin(gem.pulse) * 1.2;
      ctx.fillStyle = "#2ce8ff";
      ctx.strokeStyle = "#f7ffff";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.rect(p.x - r, p.y - r, r * 2, r * 2);
      ctx.fill();
      ctx.stroke();
    }

    for (const bolt of state.bolts) {
      const p = screen(bolt);
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(bolt.angle);
      ctx.fillStyle = "#ffe75c";
      ctx.fillRect(-9, -3, 18, 6);
      ctx.restore();
    }

    for (const enemy of state.enemies) {
      const p = screen(enemy);
      const bob = Math.sin(enemy.wobble) * 4;
      const rate = enemy.kind === "bat" ? 12 : 7;
      const frame = Math.floor((state.animTime + enemy.wobble * 0.08) * rate) % 4;
      drawSpriteFrame(assets[`${enemy.kind}Sheet`] || assets[enemy.kind], p.x, p.y + bob, enemy.size, frame);
    }

    const pulse = state.player.hit > 0 ? 1 + Math.sin(state.player.hit * 60) * 0.06 : 1;
    const moving = Math.hypot(state.move.x, state.move.y) > 0.05;
    const playerFrame = moving ? Math.floor(state.animTime * 10) % 4 : Math.floor(state.animTime * 3) % 4;
    drawAura(state.w / 2, state.h / 2, 35 * pulse, character().tint);
    drawSpriteFrame(assets.playerSheet || assets.player, state.w / 2, state.h / 2, 54 * pulse, playerFrame);

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

  function formatDamage(value) {
    return Number.isInteger(value) ? `${value}` : value.toFixed(1);
  }

  function drawSprite(img, x, y, size) {
    if (!img) return;
    ctx.drawImage(img, Math.round(x - size / 2), Math.round(y - size / 2), Math.round(size), Math.round(size));
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
    const dx = Math.round(x - size / 2);
    const dy = Math.round(y - size / 2);
    ctx.drawImage(img, sourceX, 0, frameWidth, img.height, dx, dy, Math.round(size), Math.round(size));
  }

  function drawAura(x, y, radius, tint) {
    if (tint) {
      ctx.save();
      ctx.globalAlpha = .32 + Math.sin(state.animTime * 7) * .08;
      ctx.fillStyle = tint;
      ctx.beginPath();
      ctx.arc(x, y + 15, radius, 0, Math.PI * 2);
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

  function renderPrep(message = "100 COIN") {
    const ownedCount = save.characters.length + save.equipment.length;
    const totalCount = characters.length + equipment.length;
    ui.coins.textContent = `COIN ${save.coins}`;
    ui.owned.textContent = `${ownedCount}/${totalCount}`;
    ui.selectedCharacter.textContent = character().name;
    ui.selectedEquipment.textContent = equip().name;
    ui.gachaResult.textContent = message;
    ui.gachaBtn.disabled = save.coins < 100;
    ui.characters.innerHTML = characters.map((item) => pickCard(item, "character")).join("");
    ui.equipment.innerHTML = equipment.map((item) => pickCard(item, "equipment")).join("");
  }

  function pickCard(item, type) {
    const owned = type === "character" ? save.characters.includes(item.id) : save.equipment.includes(item.id);
    const selected = type === "character" ? save.selectedCharacter === item.id : save.selectedEquipment === item.id;
    const visual = type === "character"
      ? `<img class="portrait" src="./assets/player-sheet.png?v=20260613-anim" alt="">`
      : `<span class="icon">${item.icon}</span>`;
    return `<button class="pick ${owned ? "" : "locked"} ${selected ? "selected" : ""}" data-type="${type}" data-id="${item.id}" type="button">${visual}<b>${item.name}</b><small>${owned ? item.note : "LOCKED"}</small></button>`;
  }

  function runGacha() {
    if (save.coins < 100) {
      renderPrep("COIN不足");
      return;
    }
    save.coins -= 100;
    const pool = [
      ...characters.slice(1).map((item) => ({ ...item, type: "character" })),
      ...equipment.slice(1).map((item) => ({ ...item, type: "equipment" })),
    ];
    const prize = pool[Math.floor(Math.random() * pool.length)];
    const ownedList = prize.type === "character" ? save.characters : save.equipment;
    let message;
    if (ownedList.includes(prize.id)) {
      save.coins += 35;
      message = `DUP ${prize.name} +35`;
    } else {
      ownedList.push(prize.id);
      if (prize.type === "character") save.selectedCharacter = prize.id;
      if (prize.type === "equipment") save.selectedEquipment = prize.id;
      message = `GET ${prize.name}`;
    }
    persist();
    renderPrep(message);
  }

  function setStick(clientX, clientY) {
    if (state.mode !== "run") return;
    const rect = ui.stick.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = clientX - cx;
    const dy = clientY - cy;
    const len = Math.min(48, Math.hypot(dx, dy));
    const n = norm(dx, dy);
    state.move.x = len < 8 ? 0 : n.x;
    state.move.y = len < 8 ? 0 : n.y;
    ui.knob.style.transform = `translate(${n.x * len}px, ${n.y * len}px)`;
  }

  function releaseStick() {
    state.touchId = null;
    state.move.x = 0;
    state.move.y = 0;
    ui.knob.style.transform = "";
  }

  ui.characters.addEventListener("pointerup", (event) => {
    const button = event.target.closest(".pick");
    if (!button) return;
    const id = button.dataset.id;
    if (!save.characters.includes(id)) {
      renderPrep("ガチャで解放");
      return;
    }
    save.selectedCharacter = id;
    persist();
    renderPrep("SELECTED");
  });

  ui.equipment.addEventListener("pointerup", (event) => {
    const button = event.target.closest(".pick");
    if (!button) return;
    const id = button.dataset.id;
    if (!save.equipment.includes(id)) {
      renderPrep("ガチャで解放");
      return;
    }
    save.selectedEquipment = id;
    persist();
    renderPrep("SELECTED");
  });

  ui.gachaBtn.addEventListener("pointerup", runGacha);
  ui.startBtn.addEventListener("pointerup", startRun);

  ui.stick.addEventListener("pointerdown", (event) => {
    ui.stick.setPointerCapture(event.pointerId);
    state.touchId = event.pointerId;
    setStick(event.clientX, event.clientY);
  });
  ui.stick.addEventListener("pointermove", (event) => {
    if (state.touchId === event.pointerId) setStick(event.clientX, event.clientY);
  });
  ui.stick.addEventListener("pointerup", releaseStick);
  ui.stick.addEventListener("pointercancel", releaseStick);

  window.addEventListener("resize", resize);
  document.addEventListener("gesturestart", (event) => event.preventDefault());
  document.body.classList.add("prep-open");
  renderPrep();

  Promise.all([
    loadImage("player", "./assets/player.png?v=20260613-publish"),
    loadImage("bat", "./assets/bat.png?v=20260613-publish"),
    loadImage("slime", "./assets/slime.png?v=20260613-publish"),
    loadImage("playerSheet", "./assets/player-sheet.png?v=20260613-anim"),
    loadImage("batSheet", "./assets/bat-sheet.png?v=20260613-anim"),
    loadImage("slimeSheet", "./assets/slime-sheet.png?v=20260613-anim"),
  ]).then(() => {
    resize();
    requestAnimationFrame(loop);
  });
})();
