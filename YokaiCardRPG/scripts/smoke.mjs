import fs from "node:fs";
import vm from "node:vm";

const html = fs.readFileSync(new URL("../index.html", import.meta.url), "utf8");
const requiredIds = [
  "setupScreen",
  "gameScreen",
  "collectionText",
  "deckCountText",
  "deckHint",
  "deckList",
  "gachaResult",
  "pullOneButton",
  "pullTenButton",
  "autoDeckButton",
  "startRunButton",
  "floorText",
  "soulText",
  "enemyArt",
  "intentText",
  "enemyName",
  "enemyHpText",
  "enemyHpBar",
  "hpText",
  "hpBar",
  "blockText",
  "burnText",
  "deckText",
  "logText",
  "cards",
  "restButton",
  "advanceButton",
  "restartButton",
  "resultDialog",
  "resultTitle",
  "resultText",
  "dialogRestartButton",
];

for (const id of requiredIds) {
  if (!html.includes(`id="${id}"`)) {
    throw new Error(`Missing element #${id}`);
  }
}

class Element {
  constructor(id = "") {
    this.id = id;
    this.children = [];
    this.listeners = {};
    this.style = {};
    this.disabled = false;
    this.open = false;
    this.textContent = "";
    this.innerHTML = "";
    this.className = "";
    this.classList = {
      add: (...names) => {
        const current = new Set(this.className.split(/\s+/).filter(Boolean));
        names.forEach((name) => current.add(name));
        this.className = [...current].join(" ");
      },
      remove: (...names) => {
        const current = new Set(this.className.split(/\s+/).filter(Boolean));
        names.forEach((name) => current.delete(name));
        this.className = [...current].join(" ");
      },
    };
    this.type = "";
    this.src = "";
    this.hidden = false;
  }

  appendChild(child) {
    this.children.push(child);
    return child;
  }

  addEventListener(type, fn) {
    this.listeners[type] = fn;
  }

  click() {
    if (this.listeners.click) this.listeners.click();
  }

  showModal() {
    this.open = true;
  }

  close() {
    this.open = false;
  }
}

const elements = new Map(requiredIds.map((id) => [id, new Element(id)]));
const document = {
  querySelector(selector) {
    return elements.get(selector.replace("#", ""));
  },
  createElement() {
    return new Element();
  },
};

const context = vm.createContext({
  document,
  localStorage: {
    store: new Map(),
    getItem(key) {
      return this.store.get(key) ?? null;
    },
    setItem(key, value) {
      this.store.set(key, String(value));
    },
  },
  Math,
  console,
});

const code = fs.readFileSync(new URL("../app.js", import.meta.url), "utf8");
vm.runInContext(code, context, { filename: "app.js" });

elements.get("pullTenButton").click();
elements.get("autoDeckButton").click();
if (elements.get("startRunButton").disabled) {
  throw new Error("Expected start button to be enabled after auto deck");
}
elements.get("startRunButton").click();
const cards = elements.get("cards");
if (cards.children.length !== 3) throw new Error("Expected 3 cards after restart");
cards.children[0].click();
if (!elements.get("logText").textContent) throw new Error("Expected log text after playing a card");

console.log("smoke ok");
