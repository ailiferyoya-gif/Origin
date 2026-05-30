const STORAGE_KEY = "MizumoriReporterChat";

const steps = [
  {
    prompt: [
      "突然すみません。あなたが水守町の記事を追っている記者だと聞いて連絡しています。",
      "町の写真帖は普通の防災広報に見えます。でも、当時の記事と並べると、いくつか説明が合いません。",
      "まず資料ページの「平成26年9月2日 広報みずもり臨時号」を開いてください。記事には北堤防の水位が何色の帯以下だったと書かれていますか？"
    ],
    accepts: ["青帯", "青"],
    success: "はい。記事では青帯以下です。では写真帖の写真01を開いてください。水位標に、記事と違う色の帯が写っています。その色を送ってください。"
  },
  {
    accepts: ["赤い帯", "赤帯", "赤"],
    success: "写真01は赤い帯です。記事の青帯以下という説明と食い違います。次に写真02です。臨時号では南町の避難案内は左回り高台経路へ差し替え済み、とあります。写真02の案内板の矢印はどちらを向いていますか？"
  },
  {
    accepts: ["右", "右矢印", "右向き"],
    success: "右向きです。左回りに差し替え済みという記事と合いません。次は時刻です。写真04には掲示板のそばに時計が写っています。資料では町役場掲示は何時時点で更新完了と書かれていますか？"
  },
  {
    accepts: ["17:30", "1730", "17時30分"],
    success: "17:30更新完了、ですね。では写真04の時計と、写真05の体育館の床を見てください。記事は体育館を「浸水なし」としています。床に残っているものを送ってください。"
  },
  {
    accepts: ["泥跡", "泥", "泥の跡"],
    success: "泥跡。ここまでで、臨時号の説明は写真4枚と食い違います。次は9月3日の地域安全ニュースです。記事ではG-4水門は何時に閉鎖完了とありますか？"
  },
  {
    accepts: ["17:55", "1755", "17時55分"],
    success: "17:55です。写真07を見ると水門中央が暗く、閉鎖完了の広報写真としては弱い。さらに記事では巡回と出動は18:30以降とあります。写真08で巡回済み地点の目印になっている旗の色を送ってください。"
  },
  {
    accepts: ["黄色", "黄色い旗", "黄"],
    success: "黄色い旗です。18:30以降という記事より前に、商店街側で動きがあった可能性があります。写真09の詰所で、出動直後のように残っているものは何ですか？"
  },
  {
    accepts: ["長靴", "ながぐつ"],
    success: "長靴。詰所も記事と合いません。次は町長会見要旨です。会見ではG-4は通常運転、予備鍵の使用なしとあります。写真14で一つだけ目立つ札の色を送ってください。"
  },
  {
    accepts: ["黄色", "黄色い札", "黄色い鍵札", "鍵札"],
    success: "黄色い鍵札。予備鍵の使用なしという説明とぶつかります。写真13の操作盤では、同時に点いているランプの色を二つ送ってください。"
  },
  {
    accepts: ["赤と緑", "赤緑", "赤緑ランプ", "赤 緑"],
    success: "赤と緑です。通常運転だけでは説明しにくい状態です。最後に資料ページの「地下書庫 B2-14 再点検記録」を見てください。そこに束ねられていた保管庫写真、写真23で目印になる扉は何製ですか？"
  },
  {
    accepts: ["金属", "金属扉", "金属製"],
    success: "金属扉。B2-14は通常書庫ではありません。最後に、この件の中心になっている水門番号を送ってください。"
  },
  {
    accepts: ["G-4", "G4", "g-4", "g4"],
    success: "ありがとうございます。G-4水門、17:55、閉鎖完了記事、予備鍵、B2-14。この5点をつなげて記事にしてください。私はもうこの端末では連絡しません。",
    final: true
  }
];

let state = loadState();

function loadState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { step: 0, messages: [] };
  } catch {
    return { step: 0, messages: [] };
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function normalize(value) {
  return String(value || "").replace(/\s|\u3000|-/g, "").toLowerCase();
}

function matchAnswer(value, answers) {
  const text = normalize(value);
  return answers.some((answer) => normalize(answer) === text || text.includes(normalize(answer)));
}

function addMessage(text, who = "them", extraClass = "") {
  state.messages.push({ text, who, extraClass });
  saveState();
  render();
}

function ensureStarted() {
  if (state.messages.length) return;
  state.messages.push({ text: "2026年5月30日 22:14", who: "day" });
  steps[0].prompt.forEach((text) => state.messages.push({ text, who: "them" }));
  saveState();
}

function render() {
  const log = document.getElementById("chatLog");
  log.innerHTML = state.messages.map((msg) => {
    if (msg.who === "day") return `<div class="day">${msg.text}</div>`;
    const cls = msg.who === "me" ? "from-me" : "from-them";
    const name = msg.who === "me" ? "記者" : "匿名提供者";
    return `<div class="msg ${cls} ${msg.extraClass || ""}"><span class="name">${name}</span>${escapeHtml(msg.text)}${linksFor(msg.text)}</div>`;
  }).join("");
  log.scrollTop = log.scrollHeight;
}

function linksFor(text) {
  if (!text.includes("資料ページ") && !text.includes("写真帖")) return "";
  return `<div class="quick"><a href="materials/" target="_blank" rel="noopener">資料を開く</a><a href="./" target="_blank" rel="noopener">写真帖を開く</a></div>`;
}

function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[char]));
}

function handleSubmit(event) {
  event.preventDefault();
  const input = document.getElementById("messageInput");
  const value = input.value.trim();
  if (!value) return;
  addMessage(value, "me");
  input.value = "";

  const step = steps[state.step];
  if (matchAnswer(value, step.accepts)) {
    addMessage(step.success, "them", step.final ? "done" : "");
    if (!step.final) state.step += 1;
    saveState();
    return;
  }

  addMessage("すみません、その語では資料と写真がつながりません。直前のメッセージで指定した記事と写真だけを見比べて、写真か記事にそのまま出ている言葉で返してください。", "them", "hint");
}

function resetChat() {
  localStorage.removeItem(STORAGE_KEY);
  state = { step: 0, messages: [] };
  ensureStarted();
  render();
}

document.body.innerHTML = `
  <div class="phone-shell">
    <header class="chat-header">
      <div>
        <p class="status">匿名提供者からの連絡</p>
        <h1>水守町資料室</h1>
      </div>
      <button id="resetBtn" type="button">履歴消去</button>
    </header>
    <main class="chat-area" id="chatLog" aria-live="polite"></main>
    <aside class="reference">
      <a href="./" target="_blank" rel="noopener">写真帖を開く</a>
      <a href="materials/" target="_blank" rel="noopener">資料を開く</a>
    </aside>
    <form class="composer" id="chatForm">
      <input id="messageInput" type="text" autocomplete="off" placeholder="返信を入力">
      <button type="submit">送信</button>
    </form>
  </div>
`;
document.body.hidden = false;

document.getElementById("chatForm").addEventListener("submit", handleSubmit);
document.getElementById("resetBtn").addEventListener("click", resetChat);
ensureStarted();
render();
