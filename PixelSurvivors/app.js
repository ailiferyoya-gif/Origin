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

  const upgrades = [
    ["Rapid Fire", "攻撃間隔が短くなる", () => state.fireCooldown = Math.max(0.16, state.fireCooldown * 0.84)],
    ["Sharp Bolts", "弾のダメージが上がる", () => state.damage += 0.65],
    ["Fleet Boots", "移動速度が上がる", () => state.speed += 24],
    ["Soul Magnet", "ジェム吸引範囲が広がる", () => state.magnet += 34],
    ["Max Heart", "最大HPが増えて全回復", () => { state.maxHp += 1; state.hp = state.maxHp; }],
  ];

  const state = {
    w: 0,
    h: 0,
    dpr: 1,
    last: 0,
    time: 0,
    spawn: 0,
    fire: 0,
    paused: false,
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
  };

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
      hp: 6,
      maxHp: 6,
      kills: 0,
      damage: 1,
      speed: 190,
      fireCooldown: 0.55,
      magnet: 86,
      enemies: [],
      bolts: [],
      gems: [],
      pops: [],
    });
    state.player.x = 0;
    state.player.y = 0;
  }

  function update(dt) {
    if (state.paused) return;
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
        if (state.hp <= 0) resetRun();
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
          state.bolts.splice(i, 1);
          if (enemy.hp <= 0) {
            state.gems.push({ x: enemy.x, y: enemy.y, pulse: Math.random() * 6 });
            state.pops.push({ x: enemy.x, y: enemy.y, text: "KO", life: 0.45 });
            state.enemies.splice(j, 1);
            state.kills += 1;
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
      drawSprite(assets[enemy.kind], p.x, p.y + bob, enemy.size);
    }

    const pulse = state.player.hit > 0 ? 1 + Math.sin(state.player.hit * 60) * 0.06 : 1;
    drawSprite(assets.player, state.w / 2, state.h / 2, 54 * pulse);

    ctx.font = "bold 12px Menlo, monospace";
    ctx.textAlign = "center";
    for (const pop of state.pops) {
      const p = screen(pop);
      ctx.globalAlpha = Math.max(0, pop.life / 0.5);
      ctx.fillStyle = pop.text === "KO" ? "#ffe75c" : "#82f3ff";
      ctx.fillText(pop.text, p.x, p.y);
      ctx.globalAlpha = 1;
    }
  }

  function drawSprite(img, x, y, size) {
    if (!img) return;
    ctx.drawImage(img, Math.round(x - size / 2), Math.round(y - size / 2), Math.round(size), Math.round(size));
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

  function setStick(clientX, clientY) {
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
  Promise.all([
    loadImage("player", "./assets/player.png?v=20260613-publish"),
    loadImage("bat", "./assets/bat.png?v=20260613-publish"),
    loadImage("slime", "./assets/slime.png?v=20260613-publish"),
  ]).then(() => {
    resize();
    requestAnimationFrame(loop);
  });
})();
