const state = {
  tab: "chat",
  chapter: 1,
  read: false,
  opened: new Set(["tunnel"]),
  solvedPuzzles: new Set(),
  selectedPuzzle: "p1",
  hintLevels: {},
  solved: false,
  searched: ""
};

const chapters = [
  { id: 1, title: "第1章 雨の目撃", goal: "ユウタとミカの証言を読み、最初の2つの小謎を解く。", required: [] },
  { id: 2, title: "第2章 掲示板", goal: "掲示板の痕跡と2008年の記録を照合する。", required: ["p1", "p2"] },
  { id: 3, title: "第3章 排水路", goal: "地図とメモから、赤い印が示す地下経路を復元する。", required: ["p3", "p4"] },
  { id: 4, title: "第4章 録音テープ", goal: "深夜の録音と監視写真から、時刻のズレを読む。", required: ["p5", "p6"] },
  { id: 5, title: "第5章 保守扉", goal: "巡回日誌と鍵の記録から、仕掛けを動かした人物に近づく。", required: ["p7", "p8"] },
  { id: 6, title: "第6章 赤い人形", goal: "すべての矛盾を並べ、最後の推理を完成させる。", required: ["p9", "p10"] }
];

const evidence = [
  { id: "tunnel", chapter: 1, title: "トンネル内部の写真", time: "23:15", img: "assets/evidence-tunnel.png", short: "入口の柵に赤い繊維が絡んでいる。", body: "濡れた通路の奥に、赤い布切れのようなものが残されていた。人の足跡は途中で消え、代わりに小さな車輪の跡が続いている。", source: "ユウタから受信" },
  { id: "memo", chapter: 1, title: "古いメモの画像", time: "22:47", img: "assets/evidence-memo.png", short: "赤丸が三つ。雨、掲示板、排水口を示す。", body: "読めない文字の横に、赤い丸が三つ。丸の位置はトンネル、古い掲示板、排水口を示しているように見える。", source: "ミカから受信" },
  { id: "board", chapter: 2, title: "雨ざらしの掲示板", time: "20:18", img: "assets/evidence-board.png", short: "剥がれた告知の下に、七つの画鋲跡。", body: "古い掲示板には、赤い糸で結ばれていたような跡がある。残っている画鋲跡は七つ。告知の端には雨の日だけ貼り替えという管理メモが見える。", source: "検索結果から保存" },
  { id: "map", chapter: 3, title: "排水路の地図", time: "19:04", img: "assets/evidence-map.png", short: "赤線は北口から南西の保守扉へ向かう。", body: "赤い線は北口、掲示板下、排水口、保守扉の順に続く。青いメモは水位が上がる日だけ通れる横穴を指している。", source: "市資料アーカイブ" },
  { id: "tape", chapter: 4, title: "録音テープ", time: "00:12", img: "assets/evidence-tape.png", short: "雨音の後ろで、三回だけ金属音が鳴る。", body: "録音には23:40、23:47、23:54の三回、同じ金属音が残っている。七分間隔。音は保守扉の鍵が揺れる音に似ている。", source: "管理人から共有" },
  { id: "door", chapter: 5, title: "赤い印の保守扉", time: "23:54", img: "assets/evidence-door.png", short: "扉の取っ手に赤い塗料と糸の跡。", body: "保守扉の取っ手には赤い塗料が残り、釣り糸が擦れた跡がある。扉の向こうは排水路ではなく、古い商店街の裏へ出る。", source: "現地確認" },
  { id: "logbook", chapter: 5, title: "巡回日誌と鍵", time: "18:32", img: "assets/evidence-logbook.png", short: "鍵を持てた人物は二人に絞られる。", body: "巡回日誌では、2008年当時の合鍵は町内会長と夜間巡回員が保管。赤いリボン付きの鍵だけ、返却時刻が23:58になっている。", source: "町内会倉庫" },
  { id: "contact", chapter: 4, title: "監視写真のコンタクト", time: "23:40", img: "assets/evidence-contact.png", short: "人影は地面から60cmほどの高さ。", body: "監視写真の赤い影は、毎回ほぼ同じ高さに写っている。人間の少女にしては低く、移動幅も一定だった。", source: "匿名投稿" },
  { id: "doll", chapter: 6, title: "赤い服の人形", time: "22:10", img: "assets/evidence-doll.png", short: "現場付近で見つかった小さな人形。", body: "赤いワンピースの人形。足元には古い釣り糸が結ばれており、遠くから動いて見える仕掛けだった可能性がある。", source: "ミカから受信" }
];

const chatByChapter = {
  1: [
    ["ユウタ", "23:48", "assets/evidence-tunnel.png", "トンネル近くでまた赤い服の子を見たって話。目撃は雨の日だけらしい。まず雨の記録から追える？"],
    ["ミカ", "22:31", "assets/evidence-memo.png", "古いメモ見つけた。赤丸が三つ。トンネル、掲示板、排水口……たぶん順番がある。"],
    ["管理人", "21:06", "assets/evidence-tape.png", "噂の時刻は毎回23時台後半。防犯灯の赤い反射だけでは説明できない。"]
  ],
  2: [
    ["ミカ", "20:20", "assets/evidence-board.png", "掲示板、画鋲跡が七つある。赤い糸で何かを結んでたっぽい。"],
    ["ユウタ", "20:08", "assets/evidence-tunnel.png", "掲示板から排水口まで、雨の日だけ小さな水の筋ができるって聞いた。"]
  ],
  3: [
    ["管理人", "19:20", "assets/evidence-map.png", "地図の赤線は北口から南西へ落ちる。水位が上がると横穴が使える。"],
    ["ミカ", "19:11", "assets/evidence-memo.png", "古いメモの丸は場所じゃなくて、調べる順番かも。雨、板、水、扉。"]
  ],
  4: [
    ["ユウタ", "00:15", "assets/evidence-tape.png", "録音、金属音が三回。23:40、47、54。間隔がきれいすぎる。"],
    ["匿名", "23:59", "assets/evidence-contact.png", "赤い影は毎回同じ高さ。子どもじゃない。地面から60cmくらい。"]
  ],
  5: [
    ["管理人", "18:35", "assets/evidence-logbook.png", "鍵の返却時刻は23:58。23:54の金属音の直後に戻せる人物は限られる。"],
    ["ミカ", "18:21", "assets/evidence-door.png", "扉の先、商店街裏に出る。昔の夜間巡回ルートと重なる。"]
  ],
  6: [
    ["ユウタ", "22:12", "assets/evidence-doll.png", "見つかった。赤いワンピースの人形。足に糸が結んである。"],
    ["ミカ", "22:09", "assets/evidence-board.png", "失踪事件じゃなく、噂を使った隠蔽だったなら？ 人形は目撃を作る装置。"]
  ]
};

const searchResults = [
  { chapter: 1, keys: ["雨", "目撃", "旧市街"], title: "旧市街 雨天時の目撃まとめ", url: "forum.local/rain-sighting", desc: "赤い影は雨の日、23時台後半に集中。晴天時の目撃はない。", img: "assets/evidence-tunnel.png", unlock: "memo" },
  { chapter: 2, keys: ["掲示板", "画鋲", "告知"], title: "旧掲示板の撤去記録", url: "archive.local/board-2008", desc: "七つの画鋲跡と赤い糸の記録。町内会の夜間巡回と関連。", img: "assets/evidence-board.png", unlock: "board" },
  { chapter: 3, keys: ["排水路", "地図", "北口", "南西"], title: "旧市街排水路 平面図", url: "city.local/drain-map", desc: "北口から南西の保守扉へ抜ける非公開ルート。", img: "assets/evidence-map.png", unlock: "map" },
  { chapter: 4, keys: ["録音", "テープ", "23:40", "金属音"], title: "深夜録音テープの解析", url: "lab.local/tape-074", desc: "三回の金属音は七分間隔。23:54に保守扉付近で最大。", img: "assets/evidence-tape.png", unlock: "tape" },
  { chapter: 4, keys: ["監視", "写真", "60cm", "赤い影"], title: "赤い影の高さ比較", url: "image.local/contact-sheet", desc: "影の中心は地上約60cm。人物よりも小型の物体と推定。", img: "assets/evidence-contact.png", unlock: "contact" },
  { chapter: 5, keys: ["保守扉", "鍵", "巡回", "23:58"], title: "夜間巡回員の鍵返却記録", url: "town.local/patrol-log", desc: "鍵の返却は23:58。返却者欄の筆跡だけが他の日と違う。", img: "assets/evidence-logbook.png", unlock: "logbook" },
  { chapter: 5, keys: ["赤い印", "扉", "商店街"], title: "保守扉の赤い印", url: "field.local/red-door", desc: "取っ手に赤い塗料と糸の擦過痕。扉の先は商店街裏。", img: "assets/evidence-door.png", unlock: "door" },
  { chapter: 6, keys: ["赤いワンピース", "人形", "釣り糸"], title: "現場付近で見つかった人形", url: "field.local/red-doll", desc: "赤い服の人形に釣り糸。目撃を再現する仕掛けの可能性。", img: "assets/evidence-doll.png", unlock: "doll" }
];

const tags = ["雨", "目撃", "掲示板", "排水路", "地図", "録音", "23:40", "監視", "60cm", "保守扉", "鍵", "人形"];

const puzzles = [
  ["p1", 1, "雨の日だけの目撃", "チャットと検索結果から、赤い影が現れる条件を一語で答える。", ["雨", "雨の日", "雨天"], "memo", ["晴れの日の記録がない。", "ユウタの最初の発言を見る。", "答えは『雨』。"]],
  ["p2", 1, "赤い繊維の正体", "トンネル写真の赤い繊維は、元々何に使われていたものか。", ["進入禁止テープ", "赤いテープ", "禁止テープ", "規制テープ"], "board", ["事故記録に赤い布の用途がある。", "人の服ではなく、現場にある表示物。", "答えは『進入禁止テープ』。"]],
  ["p3", 2, "掲示板の数", "掲示板に残っていた画鋲跡はいくつか。数字で答える。", ["7", "七", "七つ"], "board", ["掲示板の証拠本文を読む。", "赤い糸が結ばれていた跡の数。", "答えは『7』。"]],
  ["p4", 2, "三つの赤丸", "古いメモの赤丸が示す三つ目の場所はどこか。", ["排水口", "排水路", "水路"], "map", ["メモ本文の三つの場所を順に読む。", "トンネル、掲示板、その次。", "答えは『排水口』。"]],
  ["p5", 3, "赤線の終点", "排水路地図の赤線は、北口からどの方角の保守扉へ向かうか。", ["南西", "南西の保守扉"], "map", ["地図の証拠本文に方角が出る。", "北口から反対側へ落ちる。", "答えは『南西』。"]],
  ["p6", 3, "順番の言葉", "ミカの言う『雨、板、水、扉』のうち、三番目に来る言葉は何か。", ["水", "排水", "排水口"], "tape", ["チャット第3章を読む。", "雨、板、水、扉。三番目。", "答えは『水』。"]],
  ["p7", 4, "七分間隔", "録音の金属音は何分間隔で鳴っているか。数字で答える。", ["7", "七", "7分", "七分"], "tape", ["23:40、23:47、23:54。", "差分を計算する。", "答えは『7』。"]],
  ["p8", 4, "影の高さ", "監視写真の赤い影は地面から約何cmの高さか。数字で答える。", ["60", "60cm", "六十", "六十センチ"], "contact", ["匿名のチャットと監視写真の本文を見る。", "人間の少女にしては低い。", "答えは『60』。"]],
  ["p9", 5, "鍵の返却時刻", "赤いリボン付きの鍵が返却された時刻は何時何分か。", ["23:58", "2358", "23時58分"], "logbook", ["巡回日誌の証拠本文。", "23:54の金属音の直後。", "答えは『23:58』。"]],
  ["p10", 5, "扉の向こう", "保守扉の向こうは、どこへ出るか。", ["商店街裏", "古い商店街の裏", "商店街"], "door", ["保守扉の証拠本文を読む。", "排水路ではなく地上へ抜ける。", "答えは『商店街裏』。"]],
  ["p11", 6, "少女の正体", "赤いワンピースの少女として目撃されていた物は何か。", ["人形", "赤い人形", "赤い服の人形", "赤いワンピースの人形"], "doll", ["高さ60cm、釣り糸、赤い服。", "人間ではない。", "答えは『人形』。"]],
  ["p12", 6, "仕掛けの線", "人形を遠くから動かしていたものは何か。", ["釣り糸", "糸", "古い釣り糸"], "doll", ["赤い人形の証拠本文。", "足元に結ばれていたもの。", "答えは『釣り糸』。"]]
].map(([id, chapter, title, prompt, answer, unlock, hints]) => ({ id, chapter, title, prompt, answer, unlock, hints }));

function qs(sel) { return document.querySelector(sel); }
function qsa(sel) { return [...document.querySelectorAll(sel)]; }
function normalize(text) { return String(text).replace(/[\s　]/g, "").toLowerCase(); }
function availableChapters() { return chapters.filter(ch => ch.required.every(id => state.solvedPuzzles.has(id))).map(ch => ch.id); }
function currentChapter() { return chapters.find(ch => ch.id === state.chapter); }
function visibleEvidence() { return evidence.filter(item => item.chapter <= Math.max(...availableChapters())); }
function visiblePuzzles() { return puzzles.filter(p => availableChapters().includes(p.chapter)); }
function isPuzzleSolved(id) { return state.solvedPuzzles.has(id); }

function showNotice(text) {
  const node = qs("#notice");
  node.textContent = text;
  node.hidden = false;
  clearTimeout(showNotice.timer);
  showNotice.timer = setTimeout(() => node.hidden = true, 3200);
}

function unlockEvidence(id, reason) {
  const item = evidence.find(e => e.id === id);
  if (!item) return;
  const before = state.opened.size;
  state.opened.add(id);
  if (state.opened.size > before) showNotice(`${reason} 証拠「${item.title}」を保存した。`);
}

function progress() {
  const puzzlePoints = state.solvedPuzzles.size / puzzles.length * 72;
  const evidencePoints = state.opened.size / evidence.length * 18;
  const chapterPoints = (Math.max(...availableChapters()) - 1) / (chapters.length - 1) * 10;
  return Math.min(100, Math.round(puzzlePoints + evidencePoints + chapterPoints + (state.solved ? 8 : 0)));
}

function ensureChapter() {
  const available = availableChapters();
  if (!available.includes(state.chapter)) state.chapter = Math.max(...available);
  const visible = visiblePuzzles();
  if (!visible.some(p => p.id === state.selectedPuzzle)) state.selectedPuzzle = visible[0]?.id || "p1";
}

function renderHero() {
  const value = progress();
  qs("#progressValue").textContent = `${value}%`;
  qs("#progressBar").style.width = `${value}%`;
  const title = qs(".eyebrow");
  if (title) title.textContent = "長編調査版";
  const summary = qs(".case-card p");
  if (summary) summary.textContent = `${currentChapter().title}。${currentChapter().goal} 想定プレイ時間: 約3時間。`;
}

function renderObjective() {
  let node = qs("#objective");
  if (!node) {
    node = document.createElement("section");
    node.id = "objective";
    node.className = "objective";
    qs("#caseHero").after(node);
  }
  const nextPuzzle = puzzles.find(p => availableChapters().includes(p.chapter) && !isPuzzleSolved(p.id));
  node.innerHTML = `<strong>現在の目標</strong><span>${currentChapter().goal}</span><small>${nextPuzzle ? `次の小謎: ${nextPuzzle.title}` : "すべての小謎を解いた。最終推理へ進める。"}</small>`;
}

function renderTabs() {
  qsa(".tab").forEach(btn => btn.classList.toggle("active", btn.dataset.tab === state.tab));
  qsa("[data-view]").forEach(view => view.hidden = view.dataset.view !== state.tab);
  qs("#chatBadge").hidden = state.read;
  qs("#evidenceBadge").textContent = String(state.opened.size);
  qs("#evidenceBadge").hidden = state.opened.size === 0;
  const unsolved = visiblePuzzles().filter(p => !isPuzzleSolved(p.id)).length;
  let puzzleBadge = qs("#puzzleBadge");
  if (!puzzleBadge) {
    puzzleBadge = document.createElement("b");
    puzzleBadge.id = "puzzleBadge";
    qs('[data-tab="answer"]').appendChild(puzzleBadge);
  }
  puzzleBadge.textContent = String(unsolved);
  puzzleBadge.hidden = unsolved === 0;
  qs('[data-tab="answer"] span').textContent = "推理";
}

function renderChapterStrip() {
  return `<div class="chapter-strip">${chapters.map(ch => {
    const open = availableChapters().includes(ch.id);
    return `<button type="button" data-chapter="${ch.id}" class="chapter-pill ${state.chapter === ch.id ? "active" : ""}" ${open ? "" : "disabled"}>${ch.id}</button>`;
  }).join("")}</div>`;
}

function renderChat() {
  const rows = chatByChapter[state.chapter] || [];
  qs("#chatList").innerHTML = renderChapterStrip() + rows.map(chat => `<article class="chat-item">
    <img class="avatar" src="${chat[2]}" alt="">
    <div><div class="chat-name">${chat[0]}</div><p class="chat-text">${chat[3]}</p></div>
    <time class="chat-time">${chat[1]}</time>
  </article>`).join("");
  qs("#choiceRow").innerHTML = puzzles.filter(p => p.chapter === state.chapter).map(p => `<button type="button" class="${isPuzzleSolved(p.id) ? "secondary" : ""}" data-select-puzzle="${p.id}">${isPuzzleSolved(p.id) ? "解決済み" : "小謎へ"}: ${p.title}</button>`).join("");
}

function renderSearch() {
  const maxChapter = Math.max(...availableChapters());
  qs("#quickTags").innerHTML = tags.slice(0, Math.min(tags.length, maxChapter * 2 + 2)).map(tag => `<button type="button" data-search-tag="${tag}">${tag}</button>`).join("");
  const terms = normalize(state.searched);
  const matches = searchResults.filter(result => result.chapter <= maxChapter).filter(result => {
    if (!terms) return result.chapter === state.chapter || result.chapter === 1;
    return result.keys.some(key => terms.includes(normalize(key)) || normalize(key).includes(terms));
  });
  qs("#resultList").innerHTML = matches.map(result => `<article class="result">
    <div><h3>${result.title}</h3><p>${result.url}</p><p>${result.desc}</p></div>
    <img src="${result.img}" alt="">
    <button type="button" data-unlock="${result.unlock}">資料を保存</button>
  </article>`).join("") || `<p class="empty">検索語を変えてみよう。章が進むと新しい結果が増える。</p>`;
}

function renderEvidence() {
  const items = visibleEvidence();
  qs("#evidenceCount").textContent = `${state.opened.size}/${evidence.length}`;
  qs("#evidenceGrid").innerHTML = items.map(item => {
    const open = state.opened.has(item.id);
    return `<button class="evidence-card ${open ? "" : "locked"}" type="button" data-evidence="${item.id}" ${open ? "" : "disabled"}>
      <img src="${item.img}" alt="">
      <strong>${open ? item.title : `第${item.chapter}章の未発見証拠`}</strong>
      <span>${open ? item.short : "検索、小謎、チャットから解放する。"}</span>
    </button>`;
  }).join("");
}

function renderAnswer() {
  const host = qs('[data-view="answer"]');
  host.innerHTML = `<div class="panel-head"><h2>推理ノート</h2><span>${state.solved ? "解決" : `${state.solvedPuzzles.size}/${puzzles.length}`}</span></div>
    <div class="puzzle-list">${visiblePuzzles().map(p => `<button type="button" data-select-puzzle="${p.id}" class="puzzle-chip ${state.selectedPuzzle === p.id ? "active" : ""} ${isPuzzleSolved(p.id) ? "solved" : ""}">${p.id.toUpperCase()} ${p.title}</button>`).join("")}</div>
    <article class="puzzle-box" id="puzzleBox"></article>
    <article class="final-box" id="finalBox"></article>`;
  const puzzle = puzzles.find(p => p.id === state.selectedPuzzle) || visiblePuzzles()[0];
  const hintLevel = state.hintLevels[puzzle.id] || 0;
  qs("#puzzleBox").innerHTML = `<h3>${puzzle.title}</h3><p>${puzzle.prompt}</p>
    <label class="answer-box"><span>小謎の答え</span><input id="puzzleInput" type="text" autocomplete="off" placeholder="答えを入力"></label>
    <div class="puzzle-actions"><button class="primary compact" type="button" data-submit-puzzle="${puzzle.id}">判定する</button><button class="ghost" type="button" data-hint="${puzzle.id}">ヒント ${Math.min(hintLevel + 1, 3)}/3</button></div>
    <div class="hint-box" ${hintLevel ? "" : "hidden"}>${puzzle.hints.slice(0, hintLevel).map(h => `<p>${h}</p>`).join("")}</div>`;
  const allSolved = puzzles.every(p => isPuzzleSolved(p.id));
  qs("#finalBox").innerHTML = `<h3>最終推理</h3><p>12個の小謎をすべて解くと、事件全体の回答欄が開く。</p>
    <label class="answer-box"><span>真相</span><input id="finalInput" type="text" autocomplete="off" placeholder="誰が何で目撃を作ったか"></label>
    <button class="primary" type="button" data-final ${allSolved ? "" : "disabled"}>最終回答を送信</button>
    <div class="ending" id="ending" ${state.solved ? "" : "hidden"}>正解。赤いワンピースの少女は、釣り糸で動かされた赤い服の人形だった。雨、掲示板、排水路、保守扉、鍵の時刻が一本につながり、都市伝説は目撃を偽装するための装置だった。</div>`;
}

function render() {
  ensureChapter();
  renderHero();
  renderObjective();
  renderTabs();
  renderChat();
  renderSearch();
  renderEvidence();
  renderAnswer();
}

function openEvidence(id) {
  const item = evidence.find(e => e.id === id);
  qs("#modalImage").src = item.img;
  qs("#modalImage").alt = item.title;
  qs("#modalTitle").textContent = item.title;
  qs("#modalBody").textContent = item.body;
  qs("#modalMeta").innerHTML = `<dt>章</dt><dd>第${item.chapter}章</dd><dt>記録時刻</dt><dd>${item.time}</dd><dt>入手元</dt><dd>${item.source}</dd>`;
  qs("#evidenceModal").showModal();
}

function solvePuzzle(id, input) {
  const puzzle = puzzles.find(p => p.id === id);
  const ok = puzzle.answer.some(ans => normalize(ans) === normalize(input));
  if (!ok) { showNotice("まだ違う。証拠本文とチャットをもう一度照合しよう。"); return; }
  const beforeChapter = Math.max(...availableChapters());
  state.solvedPuzzles.add(id);
  if (puzzle.unlock) unlockEvidence(puzzle.unlock, "小謎を解いて");
  const afterChapter = Math.max(...availableChapters());
  if (afterChapter > beforeChapter) {
    state.chapter = afterChapter;
    showNotice(`第${afterChapter}章が開いた。`);
  } else {
    showNotice(`小謎「${puzzle.title}」を解決した。`);
  }
  const next = visiblePuzzles().find(p => !isPuzzleSolved(p.id));
  if (next) state.selectedPuzzle = next.id;
  render();
}

qsa(".tab").forEach(btn => btn.addEventListener("click", () => { state.tab = btn.dataset.tab; render(); }));
qs("#closeModal").addEventListener("click", () => qs("#evidenceModal").close());
qs("#searchInput").addEventListener("input", event => { state.searched = event.target.value; renderSearch(); renderHero(); });

document.addEventListener("click", event => {
  const chapter = event.target.closest("[data-chapter]");
  if (chapter && !chapter.disabled) { state.chapter = Number(chapter.dataset.chapter); render(); }
  const tag = event.target.closest("[data-search-tag]");
  if (tag) { state.searched = tag.dataset.searchTag; qs("#searchInput").value = state.searched; renderSearch(); renderHero(); }
  const unlock = event.target.closest("[data-unlock]");
  if (unlock) { unlockEvidence(unlock.dataset.unlock, "検索結果から"); render(); }
  const card = event.target.closest("[data-evidence]");
  if (card && !card.disabled) openEvidence(card.dataset.evidence);
  const select = event.target.closest("[data-select-puzzle]");
  if (select) { state.selectedPuzzle = select.dataset.selectPuzzle; state.tab = "answer"; render(); }
  const submit = event.target.closest("[data-submit-puzzle]");
  if (submit) solvePuzzle(submit.dataset.submitPuzzle, qs("#puzzleInput")?.value || "");
  const hint = event.target.closest("[data-hint]");
  if (hint) { const id = hint.dataset.hint; state.hintLevels[id] = Math.min((state.hintLevels[id] || 0) + 1, 3); renderAnswer(); }
  const final = event.target.closest("[data-final]");
  if (final && !final.disabled) {
    const value = normalize(qs("#finalInput")?.value || "");
    if (value.includes("人形") && (value.includes("釣り糸") || value.includes("糸"))) { state.solved = true; showNotice("事件解決。最終記録を保存した。"); } else { showNotice("真相の要素が足りない。人形と仕掛けを含めて答えよう。"); }
    render();
  }
  const markRead = event.target.closest("[data-action='mark-read']");
  if (markRead) { state.read = true; showNotice("チャットを既読にした。"); render(); }
});

if ("serviceWorker" in navigator && location.protocol !== "file:") {
  navigator.serviceWorker.register("service-worker.js");
}

render();
