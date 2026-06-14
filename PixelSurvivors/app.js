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
  const outlineCache = new Map();
  const loadImage = (name, src) => new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      assets[name] = img;
      resolve();
    };
    img.src = src;
  });

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

  const characters = [
    { id: "hunter", name: "Hunter", note: "\u6a19\u6e96\u578b", tint: null, stats: { hp: 0, speed: 0, damage: 0, cooldown: 1, magnet: 0 } },
    { id: "runner", name: "Runner", note: "\u79fb\u52d5\u304c\u901f\u3044", tint: "#65e7ff", stats: { hp: -1, speed: 34, damage: 0, cooldown: .98, magnet: 8 } },
    { id: "warden", name: "Warden", note: "HP\u3068\u5438\u5f15\u304c\u5f37\u3044", tint: "#c7ff7c", stats: { hp: 2, speed: -12, damage: .2, cooldown: 1.04, magnet: 28 } },
    { id: "witch", name: "Witch", note: "\u706b\u529b\u91cd\u8996", tint: "#ff8df2", stats: { hp: -1, speed: 4, damage: .75, cooldown: .92, magnet: 0 } },
  ];

  const equipment = [
    { id: "crossbow", name: "Crossbow", icon: ">>", note: "\u5f3e\u306e\u5a01\u529b +1", stats: { damage: 1, cooldown: 1, speed: 0, magnet: 0, hp: 0 } },
    { id: "boots", name: "Boots", icon: "[]", note: "\u79fb\u52d5\u901f\u5ea6 +38", stats: { damage: 0, cooldown: 1, speed: 38, magnet: 0, hp: 0 } },
    { id: "magnet", name: "Magnet", icon: "U", note: "\u5438\u5f15\u7bc4\u56f2 +70", stats: { damage: 0, cooldown: 1, speed: 0, magnet: 70, hp: 0 } },
    { id: "charm", name: "Charm", icon: "+", note: "HP +2 / \u9023\u5c04\u5c11\u3057\u4f4e\u4e0b", stats: { damage: 0, cooldown: 1.08, speed: 0, magnet: 0, hp: 2 } },
    { id: "clock", name: "Clock", icon: "*", note: "\u653b\u6483\u9593\u9694 -18%", stats: { damage: 0, cooldown: .82, speed: 0, magnet: 0, hp: 0 } },
  ];

  const upgrades = [
    ["Rapid Fire", "\u653b\u6483\u9593\u9694\u304c\u77ed\u304f\u306a\u308b", () => state.fireCooldown = Math.max(0.16, state.fireCooldown * 0.84)],
    ["Sharp Bolts", "\u5f3e\u306e\u30c0\u30e1\u30fc\u30b8\u304c\u4e0a\u304c\u308b", () => state.damage += 0.65],
    ["Split Shot", "\u5f3e\u304c1\u3064\u5897\u3048\u308b", () => state.projectiles = Math.min(6, state.projectiles + 1)],
    ["Fleet Boots", "\u79fb\u52d5\u901f\u5ea6\u304c\u4e0a\u304c\u308b", () => state.speed += 24],
    ["Soul Magnet", "\u30b8\u30a7\u30e0\u5438\u5f15\u7bc4\u56f2\u304c\u5e83\u304c\u308b", () => state.magnet += 34],
    ["Max Heart", "\u6700\u5927HP\u304c\u5897\u3048\u3066\u5168\u56de\u5fa9", () => { state.maxHp += 1; state.hp = state.maxHp; }],
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
    projectiles: 1,
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

  function character() {
    return characters.find((item) => item.id === save.selectedCharacter) || characters[0];
  }

  function equip() {
    return equipment.find((item) => item.id === save.selectedEquipment) || equipment[0];
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
    const baseAngle = Math.atan2(n.y, n.x);
    const count = state.projectiles;
    for (let i = 0; i < count; i++) {
      const spread = (i - (count - 1) / 2) * 0.18;
      const angle = baseAngle + spread;
      state.bolts.push({
        x: state.player.x + Math.cos(angle) * 10,
        y: state.player.y + Math.sin(angle) * 10,
        vx: Math.cos(angle) * 430,
        vy: Math.sin(angle) * 430,
        life: 1.15,
        angle,
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
      projectiles: 1,
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
        if (state.hp <= 0) {
          endRun();
          return;
        }
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
          playSound("hit", 0.28, 0.025);
          spawnHitEffect(enemy.x, enemy.y - enemy.size * 0.35, "#ffef73");
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
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(bolt.angle);
      ctx.fillStyle = "#ffe75c";
      ctx.fillRect(-13, -5, 26, 10);
      ctx.fillStyle = "#8a5a12";
      ctx.fillRect(-13, 5, 26, 3);
      ctx.restore();
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
      drawSpriteFrame(assets[`${enemy.kind}Sheet`] || assets[enemy.kind], p.x, p.y + bob, enemy.size, frame);
    }

    const pulse = state.player.hit > 0 ? 1.06 : 1;
    const moving = Math.hypot(state.move.x, state.move.y) > 0.05;
    const playerFrame = moving ? Math.floor(state.animTime * 10) % 4 : Math.floor(state.animTime * 3) % 4;
    drawAura(state.w / 2, state.h / 2, 42 * pulse, character().tint);
    drawSpriteFrame(assets.playerSheet || assets.player, state.w / 2, state.h / 2, 68 * pulse, playerFrame);

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
    for (let i = 0; i < count; i++) {
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

  function formatDamage(value) {
    return Number.isInteger(value) ? `${value}` : value.toFixed(1);
  }

  function drawSprite(img, x, y, size) {
    if (!img) return;
    const drawSize = Math.max(8, snap(size, 4));
    const dx = snap(x - drawSize / 2, 4);
    const dy = snap(y - drawSize / 2, 4);
    drawOutlinedSource(img, 0, 0, img.width, img.height, dx, dy, drawSize, drawSize);
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

  function drawOutlinedSource(img, sx, sy, sw, sh, dx, dy, dw, dh) {
    const key = `${img.src}|${sx}|${sy}|${sw}|${sh}|${dw}|${dh}`;
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

  function snap(value, unit = 4) {
    return Math.round(value / unit) * unit;
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
      ? `<img class="portrait" src="./assets/player.png?v=20260613-publish" alt="">`
      : `<span class="icon">${item.icon}</span>`;
    return `<button class="pick ${owned ? "" : "locked"} ${selected ? "selected" : ""}" data-type="${type}" data-id="${item.id}" type="button">${visual}<b>${item.name}</b><small>${owned ? item.note : "LOCKED"}</small></button>`;
  }

  function runGacha() {
    unlockAudio();
    if (save.coins < 100) {
      playSound("click", 0.22);
      renderPrep("COIN\u4e0d\u8db3");
      return;
    }
    playSound("gacha", 0.45, 0.2);
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

  ui.characters.addEventListener("pointerup", (event) => {
    const button = event.target.closest(".pick");
    if (!button) return;
    const id = button.dataset.id;
    unlockAudio();
    if (!save.characters.includes(id)) {
      playSound("click", 0.22);
      renderPrep("\u30ac\u30c1\u30e3\u3067\u89e3\u653e");
      return;
    }
    playSound("click", 0.32);
    save.selectedCharacter = id;
    persist();
    renderPrep("SELECTED");
  });

  ui.equipment.addEventListener("pointerup", (event) => {
    const button = event.target.closest(".pick");
    if (!button) return;
    const id = button.dataset.id;
    unlockAudio();
    if (!save.equipment.includes(id)) {
      playSound("click", 0.22);
      renderPrep("\u30ac\u30c1\u30e3\u3067\u89e3\u653e");
      return;
    }
    playSound("click", 0.32);
    save.selectedEquipment = id;
    persist();
    renderPrep("SELECTED");
  });

  ui.gachaBtn.addEventListener("pointerup", runGacha);
  ui.startBtn.addEventListener("pointerup", startRun);

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
