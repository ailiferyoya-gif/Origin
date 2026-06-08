const canvas = document.querySelector("#arena");
const ctx = canvas.getContext("2d");
const bg = new Image();
bg.src = "./assets/arena-bg.png";

if (!CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function roundRect(x, y, w, h, r) {
    const rr = Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2);
    this.moveTo(x + rr, y);
    this.arcTo(x + w, y, x + w, y + h, rr);
    this.arcTo(x + w, y + h, x, y + h, rr);
    this.arcTo(x, y + h, x, y, rr);
    this.arcTo(x, y, x + w, y, rr);
    return this;
  };
}

const W = 360;
const H = 620;
const towerCards = [
  { id: "bolt", name: "雷塔", cost: 35, range: 108, damage: 16, rate: 0.62, color: "#ffd166" },
  { id: "frost", name: "氷塔", cost: 42, range: 96, damage: 10, rate: 0.48, slow: 0.58, color: "#80d8ff" },
  { id: "thorn", name: "棘塔", cost: 28, range: 82, damage: 8, rate: 0.32, color: "#62d394" },
  { id: "ember", name: "火塔", cost: 48, range: 88, damage: 22, rate: 0.86, splash: 34, color: "#ff7a59" },
  { id: "pulse", name: "脈塔", cost: 58, range: 132, damage: 13, rate: 0.54, color: "#c77dff" }
];
const enemyCards = [
  { id: "runner", name: "疾走兵", cost: 24, hp: 42, speed: 0.62, reward: 5, color: "#f72585" },
  { id: "guard", name: "重装兵", cost: 34, hp: 88, speed: 0.34, reward: 7, color: "#6d597a" },
  { id: "swarm", name: "群影", cost: 30, hp: 28, speed: 0.52, count: 4, reward: 3, color: "#2ec4b6" },
  { id: "breaker", name: "破城槌", cost: 52, hp: 132, speed: 0.28, reward: 10, color: "#e85d04" },
  { id: "wisp", name: "幻火", cost: 38, hp: 58, speed: 0.76, reward: 8, color: "#4cc9f0" }
];

const els = {
  roomCode: document.querySelector("#roomCode"),
  enemyHp: document.querySelector("#enemyHp"),
  selfHp: document.querySelector("#selfHp"),
  gold: document.querySelector("#gold"),
  status: document.querySelector("#status"),
  cards: document.querySelector("#cards"),
  towerTab: document.querySelector("#towerTab"),
  enemyTab: document.querySelector("#enemyTab"),
  rerollBtn: document.querySelector("#rerollBtn"),
  rerollCount: document.querySelector("#rerollCount"),
  shareBtn: document.querySelector("#shareBtn")
};

let roomId = new URL(location.href).searchParams.get("room");
if (!roomId) {
  roomId = Math.random().toString(36).slice(2, 8).toUpperCase();
  const url = new URL(location.href);
  url.searchParams.set("room", roomId);
  history.replaceState(null, "", url);
}
els.roomCode.textContent = roomId;

let role = "A";
let mode = "tower";
let selected = 0;
let peer;
let conn;
let hostReady = false;
let lastTick = performance.now();
const hostId = `dueltd-${roomId.toLowerCase()}-host`;

const state = newGame();

function pick(pool, n) {
  return Array.from({ length: n }, () => ({ ...pool[Math.floor(Math.random() * pool.length)] }));
}

function newPlayer(slot) {
  return { slot, hp: 20, gold: 130, rerolls: 3, towerHand: pick(towerCards, 3), enemyHand: pick(enemyCards, 3), towers: [] };
}

function newGame() {
  return {
    players: { A: newPlayer("A"), B: newPlayer("B") },
    enemies: [],
    projectiles: [],
    nextEnemyId: 1,
    winner: null,
    online: ["A"]
  };
}

function startPeer() {
  if (!window.Peer) {
    setStatus("通信ライブラリを読み込めません");
    return;
  }
  peer = new Peer(hostId, { debug: 0 });
  peer.on("open", () => {
    role = "A";
    hostReady = true;
    setStatus("相手待ち - 共有URLを送ってください");
    peer.on("connection", (connection) => {
      conn = connection;
      connection.on("open", () => {
        state.online = ["A", "B"];
        wireConnection(connection);
        broadcast();
      });
    });
  });
  peer.on("error", () => joinHost());
}

function joinHost() {
  role = "B";
  peer = new Peer(undefined, { debug: 0 });
  peer.on("open", () => {
    conn = peer.connect(hostId, { reliable: true });
    conn.on("open", () => {
      wireConnection(conn);
      conn.send({ type: "join" });
      setStatus("対戦中");
    });
  });
  peer.on("error", () => setStatus("接続に失敗しました。先に1人目がURLを開いてください"));
}

function wireConnection(connection) {
  connection.on("data", (message) => {
    if (role === "A") {
      applyAction("B", message);
      broadcast();
    } else if (message.type === "state") {
      Object.assign(state, message.state);
      renderUi();
      draw();
    }
  });
  connection.on("close", () => {
    if (role === "A") state.online = ["A"];
    setStatus("相手が切断しました");
  });
}

function broadcast() {
  if (role === "A" && conn?.open) conn.send({ type: "state", state });
}

function me() { return state.players[role]; }
function foeSlot() { return role === "A" ? "B" : "A"; }
function foe() { return state.players[foeSlot()]; }

function setStatus(text) {
  els.status.textContent = text;
  els.status.classList.toggle("hidden", !text);
}

function sendAction(action) {
  if (role === "A") {
    applyAction("A", action);
    broadcast();
  } else if (conn?.open) {
    conn.send(action);
  } else {
    setStatus("まだ接続されていません");
  }
}

function applyAction(slot, action) {
  const player = state.players[slot];
  if (!player || state.winner) return;
  if (action.type === "join") {
    state.online = ["A", "B"];
    return;
  }
  if (action.type === "reroll" && player.rerolls > 0) {
    player.rerolls -= 1;
    if (action.kind === "enemy") player.enemyHand = pick(enemyCards, 3);
    else player.towerHand = pick(towerCards, 3);
  }
  if (action.type === "place") {
    const card = player.towerHand[action.cardIndex];
    const x = Number(action.x);
    const y = Number(action.y);
    const legalZone = slot === "A" ? y > 326 && y < 588 : y > 32 && y < 294;
    if (!card || !legalZone || x < 34 || x > 326 || player.gold < card.cost || onPath(x, y)) return;
    if (player.towers.some((t) => Math.hypot(t.x - x, t.y - y) < 38)) return;
    player.gold -= card.cost;
    player.towers.push({ ...card, x, y, cooldown: 0 });
  }
  if (action.type === "send") {
    const card = player.enemyHand[action.cardIndex];
    if (!card || player.gold < card.cost) return;
    player.gold -= card.cost;
    const count = card.count || 1;
    for (let i = 0; i < count; i += 1) {
      state.enemies.push({ ...card, id: state.nextEnemyId++, owner: slot, target: slot === "A" ? "B" : "A", hp: card.hp, maxHp: card.hp, progress: -i * 18, slowUntil: 0 });
    }
  }
  renderUi();
}

function onPath(x, y) {
  return Math.abs(x - (180 + Math.sin(y / 58) * 54)) < 34;
}

function pathPoint(enemy) {
  const dir = enemy.owner === "A" ? -1 : 1;
  const y = (enemy.owner === "A" ? 565 : 55) + dir * enemy.progress;
  return { x: 180 + Math.sin(y / 58) * 54, y };
}

function tick(dt) {
  if (role !== "A" || state.winner) return;
  for (const p of Object.values(state.players)) p.gold = Math.min(999, p.gold + dt * 4.6);
  for (const enemy of state.enemies) {
    const slow = enemy.slowUntil > performance.now() ? 0.5 : 1;
    enemy.progress += enemy.speed * 58 * dt * slow;
    const p = pathPoint(enemy);
    if ((enemy.owner === "A" && p.y <= 44) || (enemy.owner === "B" && p.y >= 576)) {
      state.players[enemy.target].hp -= 1;
      enemy.dead = true;
    }
  }
  for (const owner of ["A", "B"]) {
    const player = state.players[owner];
    for (const tower of player.towers) {
      tower.cooldown = Math.max(0, tower.cooldown - dt);
      if (tower.cooldown > 0) continue;
      const target = state.enemies
        .filter((e) => e.target === owner && !e.dead)
        .map((e) => ({ e, p: pathPoint(e) }))
        .find(({ p }) => Math.hypot(p.x - tower.x, p.y - tower.y) <= tower.range);
      if (!target) continue;
      tower.cooldown = tower.rate;
      if (tower.slow) target.e.slowUntil = performance.now() + 1350;
      if (tower.splash) {
        for (const enemy of state.enemies) {
          const p = pathPoint(enemy);
          if (Math.hypot(p.x - target.p.x, p.y - target.p.y) < tower.splash) enemy.hp -= tower.damage;
        }
      } else {
        target.e.hp -= tower.damage;
      }
      state.projectiles.push({ id: Math.random().toString(36).slice(2), from: { x: tower.x, y: tower.y }, to: target.p, color: tower.color, life: 0.22 });
    }
  }
  for (const enemy of state.enemies) {
    if (enemy.hp <= 0 && !enemy.dead) {
      state.players[enemy.target].gold += enemy.reward;
      enemy.dead = true;
    }
  }
  state.enemies = state.enemies.filter((e) => !e.dead);
  state.projectiles = state.projectiles.map((p) => ({ ...p, life: p.life - dt })).filter((p) => p.life > 0);
  if (state.players.A.hp <= 0 || state.players.B.hp <= 0) state.winner = state.players.A.hp <= 0 ? "B" : "A";
  broadcast();
}

function cardText(card) {
  return mode === "tower"
    ? `費用${card.cost} / 射程${Math.round(card.range)} / 威力${card.damage}`
    : `費用${card.cost} / HP${card.hp} / 速さ${card.speed.toFixed(2)}`;
}

function renderUi() {
  if (!me()) return;
  els.selfHp.textContent = Math.max(0, Math.ceil(me().hp));
  els.enemyHp.textContent = Math.max(0, Math.ceil(foe().hp));
  els.gold.textContent = Math.floor(me().gold);
  els.rerollCount.textContent = `残り ${me().rerolls}`;
  els.towerTab.classList.toggle("active", mode === "tower");
  els.enemyTab.classList.toggle("active", mode === "enemy");
  if (state.winner) setStatus(state.winner === role ? "勝利" : "敗北");
  else if (state.online.length < 2) setStatus("相手待ち - 共有URLを送ってください");
  else setStatus("");
  const hand = mode === "tower" ? me().towerHand : me().enemyHand;
  selected = Math.min(selected, hand.length - 1);
  els.cards.innerHTML = "";
  hand.forEach((card, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `card ${index === selected ? "selected" : ""}`;
    button.innerHTML = `<strong>${card.name}</strong><span>${cardText(card)}</span>`;
    button.addEventListener("click", () => {
      selected = index;
      if (mode === "enemy") sendAction({ type: "send", cardIndex: selected });
      renderUi();
    });
    els.cards.appendChild(button);
  });
}

function viewPoint(world) {
  return role === "A" ? world : { x: W - world.x, y: H - world.y };
}

function worldPoint(clientX, clientY) {
  const rect = canvas.getBoundingClientRect();
  const x = ((clientX - rect.left) / rect.width) * W;
  const y = ((clientY - rect.top) / rect.height) * H;
  return role === "A" ? { x, y } : { x: W - x, y: H - y };
}

function drawPath() {
  ctx.save();
  ctx.lineCap = "round";
  ctx.lineWidth = 48;
  ctx.strokeStyle = "rgba(42, 28, 18, 0.55)";
  ctx.beginPath();
  for (let y = 55; y <= 565; y += 8) {
    const p = viewPoint({ x: 180 + Math.sin(y / 58) * 54, y });
    if (y === 55) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  }
  ctx.stroke();
  ctx.lineWidth = 30;
  ctx.strokeStyle = "rgba(226, 186, 115, 0.28)";
  ctx.stroke();
  ctx.restore();
}

function drawBase(y, color, label) {
  const p = viewPoint({ x: 180, y });
  ctx.save();
  ctx.fillStyle = color;
  ctx.strokeStyle = "rgba(255,255,255,.75)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(p.x - 78, p.y - 18, 156, 36, 8);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#fff";
  ctx.font = "900 14px system-ui";
  ctx.textAlign = "center";
  ctx.fillText(label, p.x, p.y + 5);
  ctx.restore();
}

function drawTower(tower) {
  const p = viewPoint(tower);
  ctx.save();
  ctx.globalAlpha = 0.18;
  ctx.fillStyle = tower.color;
  ctx.beginPath();
  ctx.arc(p.x, p.y, tower.range, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.fillStyle = tower.color;
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(p.x - 15, p.y - 15, 30, 30, 6);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#111827";
  ctx.font = "900 12px system-ui";
  ctx.textAlign = "center";
  ctx.fillText(tower.name.slice(0, 1), p.x, p.y + 4);
  ctx.restore();
}

function drawEnemy(enemy) {
  const p = viewPoint(pathPoint(enemy));
  const hp = Math.max(0, enemy.hp / enemy.maxHp);
  ctx.save();
  ctx.fillStyle = enemy.color;
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(p.x, p.y, 12, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "rgba(0,0,0,.65)";
  ctx.fillRect(p.x - 16, p.y - 22, 32, 5);
  ctx.fillStyle = hp > 0.45 ? "#7ee787" : "#ff6b6b";
  ctx.fillRect(p.x - 16, p.y - 22, 32 * hp, 5);
  ctx.restore();
}

function drawProjectile(projectile) {
  const from = viewPoint(projectile.from);
  const to = viewPoint(projectile.to);
  ctx.save();
  ctx.strokeStyle = projectile.color;
  ctx.lineWidth = 4;
  ctx.globalAlpha = Math.max(0.15, projectile.life / 0.22);
  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x, to.y);
  ctx.stroke();
  ctx.restore();
}

function draw() {
  ctx.clearRect(0, 0, W, H);
  if (bg.complete) ctx.drawImage(bg, 0, 0, W, H);
  else {
    ctx.fillStyle = "#13251f";
    ctx.fillRect(0, 0, W, H);
  }
  drawPath();
  drawBase(55, "rgba(255, 93, 93, .72)", role === "A" ? "相手拠点" : "自分拠点");
  drawBase(565, "rgba(75, 156, 255, .72)", role === "A" ? "自分拠点" : "相手拠点");
  for (const tower of Object.values(state.players).flatMap((p) => p.towers)) drawTower(tower);
  for (const enemy of state.enemies) drawEnemy(enemy);
  for (const projectile of state.projectiles) drawProjectile(projectile);
}

function loop(now) {
  const dt = Math.min(0.12, (now - lastTick) / 1000);
  lastTick = now;
  tick(dt);
  renderUi();
  draw();
  requestAnimationFrame(loop);
}

canvas.addEventListener("pointerdown", (event) => {
  if (mode !== "tower") return;
  const p = worldPoint(event.clientX, event.clientY);
  sendAction({ type: "place", cardIndex: selected, x: p.x, y: p.y });
});

els.towerTab.addEventListener("click", () => {
  mode = "tower";
  selected = 0;
  renderUi();
});

els.enemyTab.addEventListener("click", () => {
  mode = "enemy";
  selected = 0;
  renderUi();
});

els.rerollBtn.addEventListener("click", () => sendAction({ type: "reroll", kind: mode }));

els.shareBtn.addEventListener("click", async () => {
  try {
    await navigator.share({ title: "Instant Duel TD", url: location.href });
  } catch {
    await navigator.clipboard.writeText(location.href);
    setStatus("共有URLをコピーしました");
    setTimeout(renderUi, 1200);
  }
});

bg.addEventListener("load", draw);
renderUi();
draw();
startPeer();
requestAnimationFrame(loop);
