import fs from "node:fs";
import path from "node:path";

const root = "C:/Users/kogit/Documents/Codex";
const imageRoot = "C:/Users/kogit/.codex/generated_images/019e3312-788e-7a32-add3-689f06d65101";

function mkdir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function write(file, text) {
  mkdir(path.dirname(file));
  fs.writeFileSync(file, text, "utf8");
}

function copy(src, dest) {
  mkdir(path.dirname(dest));
  fs.copyFileSync(src, dest);
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}

function rel(from, to) {
  let p = path.posix.relative(path.posix.dirname(from), to).replaceAll("\\", "/");
  if (!p.startsWith(".")) p = "./" + p;
  return p;
}

function page(project, file, title, body, extraHead = "", cls = "") {
  const depth = file.split("/").length - 1;
  const css = "../".repeat(depth) + "site.css";
  const flow = "../".repeat(depth) + "textflow.js";
  return `<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)} | ${esc(project.title)}</title>
<link rel="stylesheet" href="${css}">
${extraHead}
</head>
<body class="${cls}">
${body}
<script src="${flow}"></script>
</body>
</html>`;
}

function premiumHead(file) {
  const depth = file.split("/").length - 1;
  return `<link rel="stylesheet" href="${"../".repeat(depth)}premium.css">`;
}

function siteHead(file) {
  const depth = file.split("/").length - 1;
  return `<link rel="stylesheet" href="${"../".repeat(depth)}variants.css">`;
}

const commonCss = `
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;font-family:"Yu Gothic","Meiryo",sans-serif;background:#111;color:#eee;line-height:1.85;overflow-wrap:break-word}a{color:inherit}img{max-width:100%;display:block}.skip{position:absolute;left:-999px}.wrap{width:min(1120px,calc(100% - 32px));margin:auto}.muted{color:#8c95a3}.small{font-size:.88rem}.stamp{display:inline-block;border:1px solid currentColor;padding:.15rem .45rem;font-size:.74rem;letter-spacing:.08em}.grid{display:grid;gap:18px}.two{grid-template-columns:repeat(2,minmax(0,1fr))}.three{grid-template-columns:repeat(3,minmax(0,1fr))}.list{padding-left:1.2em}.list li{margin:.35em 0}.btn{display:inline-flex;align-items:center;justify-content:center;min-height:42px;padding:.75rem 1rem;border:1px solid rgba(255,255,255,.28);text-decoration:none;background:rgba(255,255,255,.08)}.btn.dark{background:#10151d;color:#fff}.note{border-left:4px solid #8a95a8;padding:10px 14px;background:rgba(255,255,255,.05)}.site-header{padding:28px 0;border-bottom:1px solid rgba(0,0,0,.12)}.site-main{padding:28px 0 56px}.paper{background:#fff;color:#202020}.paper a{color:#123b7a}.card{border:1px solid rgba(255,255,255,.16);padding:18px;background:rgba(255,255,255,.06)}.mono{font-family:Consolas,"Courier New",monospace}@media(max-width:760px){.two,.three{grid-template-columns:1fr}.wrap{width:min(100% - 22px,1120px)}}
`;

const premiumCss = `
body.premium{min-height:100vh;background:#06080d;color:#eef4ff}.premium-bg{position:fixed;inset:0;background:linear-gradient(180deg,rgba(3,6,12,.35),#06080d 72%),var(--hero) center/cover no-repeat;z-index:-2}.premium-bg:after{content:"";position:absolute;inset:0;background:radial-gradient(circle at 18% 18%,rgba(131,183,255,.22),transparent 34%),linear-gradient(90deg,rgba(3,6,12,.86),rgba(3,6,12,.4) 52%,rgba(3,6,12,.88));z-index:-1}.topbar{display:flex;align-items:center;justify-content:space-between;padding:22px 0;color:#dfe7f3}.brand{font-size:.84rem;letter-spacing:.16em;text-transform:uppercase}.hero{min-height:72vh;display:grid;align-items:end;padding:72px 0 56px}.hero h1{font-family:Georgia,"Yu Mincho",serif;font-size:clamp(2.4rem,6vw,6rem);line-height:1.02;margin:0 0 18px;letter-spacing:0}.hero p{max-width:760px;font-size:1.05rem;color:#d8e1ee}.panel{border:1px solid rgba(255,255,255,.18);background:rgba(7,12,20,.72);backdrop-filter:blur(12px);padding:22px}.premium-nav{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin:28px 0}.premium-nav a{border:1px solid rgba(255,255,255,.24);text-decoration:none;padding:16px;background:rgba(255,255,255,.06);min-height:84px}.premium-nav strong{display:block;font-size:1.04rem}.premium-nav span{display:block;color:#aeb9c9;font-size:.86rem;margin-top:4px}.section{padding:34px 0}.section h2{font-family:Georgia,"Yu Mincho",serif;font-size:1.8rem}.investigate-shell{padding:34px 0 70px}.q-card{border:1px solid rgba(255,255,255,.14);background:rgba(9,14,23,.78);padding:18px;margin:14px 0}.q-card.locked{opacity:.48}.q-card.locked .locked-hide{display:none}.q-card h3{margin:.1rem 0 .5rem}.answer-row{display:flex;gap:8px;flex-wrap:wrap}.answer-row input{flex:1;min-width:220px;background:#05070c;color:#fff;border:1px solid rgba(255,255,255,.22);padding:.8rem}.answer-row button{border:1px solid rgba(255,255,255,.25);background:#d9e6ff;color:#06101d;padding:.8rem 1rem}.ok{color:#b9ffcd}.ng{color:#ffb4b4}@media(max-width:760px){.premium-nav{grid-template-columns:1fr}.hero{min-height:66vh;padding-top:42px}.topbar{align-items:flex-start;gap:12px;flex-direction:column}}
`;

const variantsCss = `
.official{background:#eef2f7;color:#1d2631}.official .site-header{background:#123558;color:#fff}.official nav a{margin-right:12px;color:#dcecff}.official .box{background:#fff;border:1px solid #c7d3df;padding:16px}.official table{border-collapse:collapse;width:100%;background:#fff}.official th,.official td{border:1px solid #cad4df;padding:8px;text-align:left}.municipal{background:#f6f3e8;color:#222}.municipal .site-header{background:#fdfbf3;border-top:8px solid #47784a}.municipal .notice{background:#fff;border:1px solid #b8b29a;padding:14px}.news{background:#fafafa;color:#151515;font-family:"Yu Mincho","Hiragino Mincho ProN",serif}.news .mast{font-size:2.2rem;border-bottom:4px double #111;text-align:center;padding:18px}.news article{border-bottom:1px solid #222;padding:18px 0}.lab{background:#07111a;color:#dfeeff}.lab .site-header{background:#0b1b29}.lab .log{font-family:Consolas,"Courier New",monospace;background:#02070b;border:1px solid #1e405d;padding:12px;color:#bfe4ff}.radio{background:#15110b;color:#f2e6ce}.radio .site-header{background:#3c2712}.radio .slip{background:#fff7e6;color:#24170a;border:1px dashed #6e4a23;padding:14px}.contractor{background:#e9eaec;color:#20242b}.contractor .site-header{background:#2e333b;color:#fff}.contractor .sheet{background:#fff;border:1px solid #aeb3bb;padding:14px}.blog2014{background:#f6f6f6;color:#333}.blog2014 .blog-wrap{display:grid;grid-template-columns:1fr 260px;gap:20px}.blog2014 .entry,.blog2014 aside{background:#fff;border:1px solid #ddd;padding:14px}.blog2014 h1{font-size:1.7rem}.board{background:#f4f1e7;color:#2a241d}.board .thread{background:#fff;border:1px solid #cfc7b7;padding:12px;margin:12px 0}.dept{background:#fffaf0;color:#261d14}.dept .site-header{background:#4a1d1d;color:#fff;border-bottom:6px solid #d5b15e}.dept .floor{background:#fff;border:2px solid #d5b15e;padding:14px}.security{background:#050505;color:#d8ffd8}.security .site-header{background:#001500;border-bottom:1px solid #116611}.security .cam{font-family:Consolas,"Courier New",monospace;border:1px solid #1a751a;background:#020902;padding:12px}.tenant{background:#f7f1e8;color:#2b2118}.tenant .memo{background:#fff;border:1px solid #b9a892;padding:14px}.union{background:#efece5;color:#1f1b17}.union .leaflet{background:#fff;border:1px solid #222;padding:16px}.oldbbs{background:#ece6ff;color:#241c33}.oldbbs .thread{background:#fff;border:1px solid #9c8ac4;padding:10px;margin:10px 0}@media(max-width:760px){.blog2014 .blog-wrap{grid-template-columns:1fr}}
`;

const textflow = `
(() => {
  const targets = document.querySelectorAll("p,li,td,th,h1,h2,h3,h4,a,button,span,strong,dt,dd");
  const rx = /([、。]|て|に|を|は|が|の|で|と|へ|か)(?!<wbr>)/g;
  targets.forEach((el) => {
    if (el.children.length || el.dataset.noFlow === "1") return;
    el.innerHTML = el.textContent.replace(rx, "$1<wbr>");
  });
})();
`;

function siteJs(answers) {
  return `
const answers = ${JSON.stringify(answers)};
const norm = (s) => (s || "").replace(/[\\s　]/g, "").replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xFEE0)).toLowerCase();
let unlocked = Number(localStorage.getItem("mystery_unlocked") || "1");
function renderLocks(){
  document.querySelectorAll("[data-q]").forEach(card => {
    const n = Number(card.dataset.q);
    card.classList.toggle("locked", n > unlocked);
    const input = card.querySelector("input");
    const button = card.querySelector("button");
    if (input) input.disabled = n > unlocked;
    if (button) button.disabled = n > unlocked;
  });
}
function checkAnswer(n){
  const card = document.querySelector('[data-q="'+n+'"]');
  const input = card.querySelector("input");
  const msg = card.querySelector(".msg");
  if(norm(input.value) === norm(answers[n-1])){
    msg.textContent = n === answers.length ? "真相が開示されました。" : "照合しました。次の記録を確認できます。";
    msg.className = "msg ok";
    if(unlocked < n + 1){ unlocked = n + 1; localStorage.setItem("mystery_unlocked", String(unlocked)); }
    renderLocks();
  } else {
    msg.textContent = "一致しません。別のサイトの記録と照合してください。";
    msg.className = "msg ng";
  }
}
function resetNote(){
  localStorage.removeItem("mystery_unlocked");
  unlocked = 1;
  renderLocks();
}
document.addEventListener("DOMContentLoaded", renderLocks);
`;
}

function mainPage(project) {
  const p = "index.html";
  const nav = [
    ["検索", "search/index.html", "検索語から記録へ進む"],
    ["メール", "mail/index.html", "職員控えと添付メモ"],
    ["管理", "admin/index.html", "制限記録への入口"],
    ["照合ノート", "investigate/index.html", "回答と進行管理"],
  ].map(([t, h, s]) => `<a href="./${h}" ${t !== "照合ノート" ? 'target="_blank" rel="noopener"' : ""}><strong>${t}</strong><span>${s}</span></a>`).join("");
  return page(project, p, "入口", `<div class="premium-bg" style="--hero:url('./assets/${project.hero}')"></div>
<header class="wrap topbar"><div class="brand">${project.kicker}</div><div class="small">上級編 / 想定2.5〜4時間</div></header>
<main>
  <section class="wrap hero">
    <div>
      <div class="stamp">ADVANCED MOCKUMENTARY</div>
      <h1>${project.title}</h1>
      <p>${project.lead}</p>
      <div class="premium-nav">${nav}</div>
    </div>
  </section>
  <section class="wrap section">
    <div class="grid two">
      <div class="panel"><h2>遊び方</h2><p>この作品は複数のWebサイトを横断して記録を照合する謎解きです。検索、メール、管理画面から調査先を見つけ、資料照合ノートに戻って回答してください。</p><p>リンクは最初から揃っていません。検索語、ID、時刻、欠番、削除済み記事を控え、別サイトの記録と重ねることで次のページにたどり着きます。</p></div>
      <div class="panel"><h2>Background</h2>${project.background.map(x => `<p>${x}</p>`).join("")}</div>
    </div>
  </section>
</main>`, premiumHead(p), "premium");
}

function investigatePage(project) {
  const p = "investigate/index.html";
  const cards = project.questions.map((q, i) => `<article class="q-card" data-q="${i + 1}">
<h3>照合 ${String(i + 1).padStart(2, "0")}</h3>
<div class="locked-hide">
<p>${q}</p>
<div class="answer-row"><input aria-label="回答${i + 1}" autocomplete="off"><button onclick="checkAnswer(${i + 1})">照合</button></div>
<p class="msg muted small"></p>
</div>
<p class="muted small locked-only">前段階を照合すると詳細が表示されます。</p>
</article>`).join("");
  return page(project, p, "資料照合ノート", `<div class="premium-bg" style="--hero:url('../assets/${project.hero}')"></div>
<header class="wrap topbar"><a href="../index.html" class="btn">入口へ</a><div class="brand">INVESTIGATION NOTE</div><button class="btn" onclick="resetNote()">進行リセット</button></header>
<main class="wrap investigate-shell">
<section class="panel"><h1>資料照合ノート</h1><p>このページは作中サイトではなく、プレイヤーが資料を照合するための調査UIです。作中サイトは別ウィンドウで開き、このノートに戻って回答を入力してください。</p><p>未解放のカードは詳細が表示されません。前の段階を解くと、次の照合式と入力欄が開きます。</p></section>
${cards}
</main>
<script src="../site.js"></script>`, premiumHead(p), "premium");
}

function searchPage(project) {
  const p = "search/index.html";
  const all = [...project.results, ...project.decoys].map(r => ({ ...r, label: r.label || "検索結果" }));
  return page(project, p, "検索", `<main class="search-page">
<section class="search-hero">
<h1>${project.searchName}</h1>
<form onsubmit="runSearch();return false"><input id="q" aria-label="検索語" placeholder="検索語を入力"><button>検索</button></form>
<p class="muted small">検索語は記録内の固有名詞や資料番号を一単語で入力してください。</p>
</section>
<section id="results" class="results"></section>
</main>
<script>
const data=${JSON.stringify(all)};
function runSearch(){
  const q=document.getElementById('q').value.trim();
  const box=document.getElementById('results');
  const hits=data.filter(x=>x.keywords.some(k=>k.includes(q)||q.includes(k))||(!q&&x.public));
  box.innerHTML=(hits.length?hits:data.filter(x=>x.public).slice(0,12)).map(x=>'<article><a href="'+x.href+'" target="_blank" rel="noopener">'+x.title+'</a><p>'+x.snippet+'</p><span>'+x.label+'</span></article>').join('');
}
runSearch();
</script>`, `<style>
body{background:#fff;color:#202124;font-family:Arial,"Meiryo",sans-serif}.search-page{min-height:100vh}.search-hero{text-align:center;padding:74px 18px 24px}.search-hero h1{font-size:3rem;color:${project.searchColor};letter-spacing:0;margin:0 0 24px}.search-hero form{display:flex;gap:8px;max-width:650px;margin:auto}.search-hero input{flex:1;border:1px solid #dfe1e5;border-radius:24px;padding:14px 20px;font-size:1rem}.search-hero button{border:1px solid #dadce0;background:#f8f9fa;padding:0 20px;border-radius:4px}.results{max-width:820px;margin:0 auto 70px;padding:0 18px}.results article{padding:14px 0;border-bottom:1px solid #eee}.results a{font-size:1.12rem;color:#1a0dab}.results p{margin:.3rem 0;color:#4d5156}.results span{font-size:.82rem;color:#70757a}@media(max-width:600px){.search-hero form{flex-direction:column}.search-hero h1{font-size:2.2rem}}
</style>`);
}

function mailPage(project) {
  const p = "mail/index.html";
  const mails = project.mails.map(m => `<article class="mail-item"><h2>${m.subject}</h2><p class="small muted">${m.from} / ${m.date}</p>${m.body.map(x => `<p>${x}</p>`).join("")}</article>`).join("");
  return page(project, p, "メール", `<main class="mail">
<aside><h1>メール</h1><p>保存箱: ${project.mailbox}</p><p class="small muted">一部の添付は本文へ転記されています。</p></aside>
<section>${mails}</section>
</main>`, `<style>
body{background:#e8edf4;color:#202733;font-family:"Meiryo",sans-serif}.mail{display:grid;grid-template-columns:260px 1fr;min-height:100vh}.mail aside{background:#243447;color:#fff;padding:26px}.mail section{padding:26px}.mail-item{background:#fff;border:1px solid #cad3df;padding:16px;margin-bottom:14px}.mail-item h2{font-size:1.15rem;margin:.1rem 0}@media(max-width:720px){.mail{grid-template-columns:1fr}}
</style>`);
}

function adminPage(project) {
  const p = "admin/index.html";
  const links = project.adminLinks.map(l => `<li><a href="${l.href}" target="_blank" rel="noopener">${l.title}</a><span>${l.note}</span></li>`).join("");
  return page(project, p, "管理", `<main class="admin">
<section class="login">
<h1>管理</h1><p>制限記録の閲覧には、メールと公開記録から復元したパスコードが必要です。</p>
<input id="pw" aria-label="パスコード" placeholder="PASSCODE"><button onclick="login()">認証</button>
<p id="msg" class="small muted"></p>
</section>
<section id="vault" class="vault" hidden><h2>閲覧制限記録</h2><ul>${links}</ul></section>
</main>
<script>
function login(){
  const ok=document.getElementById('pw').value.replace(/\\s/g,'').toUpperCase()==='${project.adminPass.toUpperCase()}';
  document.getElementById('msg').textContent=ok?'認証しました。':'認証できません。';
  document.getElementById('vault').hidden=!ok;
}
</script>`, `<style>
body{background:#080b0f;color:#dce7f5;font-family:Consolas,"Meiryo",monospace}.admin{min-height:100vh;display:grid;place-items:center;padding:28px}.login,.vault{width:min(760px,100%);border:1px solid #30445f;background:#101721;padding:24px}.login input{width:100%;background:#05070a;color:#fff;border:1px solid #53677f;padding:14px;margin:10px 0}.login button{background:#d8e6ff;border:0;padding:12px 18px}.vault{margin-top:18px}.vault li{margin:12px 0}.vault a{color:#b9d3ff}.vault span{display:block;color:#8fa0b6;font-size:.86rem}
</style>`);
}

function inWorldPage(project, file, title, kind, body) {
  return page(project, file, title, body, siteHead(file), kind);
}

function officialSite(project, base, siteTitle, kind, pages, image) {
  const nav = pages.map(pg => `<a href="./${pg.slug}/index.html">${pg.short}</a>`).join("");
  const index = `<header class="site-header"><div class="wrap"><h1>${siteTitle}</h1><nav>${nav}</nav></div></header><main class="wrap site-main"><div class="grid two"><div class="box"><h2>お知らせ</h2><ul class="list">${pages.map(pg => `<li>${pg.notice}</li>`).join("")}</ul></div><div><img src="../assets/${image}" alt=""></div></div><section class="box"><h2>公開資料</h2><p>${project.officialIntro}</p><table>${pages.map(pg => `<tr><th>${pg.short}</th><td>${pg.note}</td></tr>`).join("")}</table></section></main>`;
  write(path.join(project.dir, "web", base, "index.html"), inWorldPage(project, `${base}/index.html`, siteTitle, kind, index));
  for (const pg of pages) {
    const rows = pg.rows.map(r => `<tr><th>${r[0]}</th><td>${r[1]}</td></tr>`).join("");
    const body = `<header class="site-header"><div class="wrap"><h1>${siteTitle}</h1><nav><a href="../index.html">一覧</a></nav></div></header><main class="wrap site-main"><section class="box"><h2>${pg.title}</h2><p>${pg.body}</p><table>${rows}</table></section><section class="box"><h2>備考</h2><ul class="list">${pg.extra.map(x => `<li>${x}</li>`).join("")}</ul></section></main>`;
    write(path.join(project.dir, "web", base, pg.slug, "index.html"), inWorldPage(project, `${base}/${pg.slug}/index.html`, pg.title, kind, body));
  }
}

function newsSite(project, base, name, articles, kind = "news") {
  const body = `<div class="mast">${name}</div><main class="wrap site-main">${articles.map(a => `<article><p class="small">${a.date} / ${a.section}</p><h1>${a.title}</h1>${a.body.map(x => `<p>${x}</p>`).join("")}</article>`).join("")}</main>`;
  write(path.join(project.dir, "web", base, "index.html"), inWorldPage(project, `${base}/index.html`, name, kind, body));
}

function boardSite(project, base, name, threads, kind = "board") {
  const body = `<header class="site-header"><div class="wrap"><h1>${name}</h1><p>匿名掲示板の保存ログ。広告と雑談を含む。</p></div></header><main class="wrap site-main">${threads.map((t, i) => `<section class="thread"><h2>${String(i + 1).padStart(3, "0")} ${t.title}</h2>${t.posts.map(p => `<p><b>${p.name}</b> ${p.date}<br>${p.text}</p>`).join("")}</section>`).join("")}</main>`;
  write(path.join(project.dir, "web", base, "index.html"), inWorldPage(project, `${base}/index.html`, name, kind, body));
}

function blog2014(project) {
  const entries = project.blog.entries.map(e => `<article class="entry"><h2>${e.title}</h2><p class="small muted">${e.date} / ${e.cat} / コメント(${e.comments})</p>${e.body.map(x => `<p>${x}</p>`).join("")}</article>`).join("");
  const side = `<aside><h3>プロフィール</h3><p>${project.blog.profile}</p><h3>月別</h3><ul>${project.blog.months.map(x => `<li>${x}</li>`).join("")}</ul><h3>広告</h3><p>無料ブログ版のため広告表示中。</p><h3>リンク</h3><p>潮の写真 / 弁当メモ / 旧テンプレート</p></aside>`;
  const body = `<header class="site-header"><div class="wrap"><h1>${project.blog.title}</h1><p>${project.blog.subtitle}</p></div></header><main class="wrap site-main blog-wrap"><section>${entries}</section>${side}</main>`;
  write(path.join(project.dir, "web", "blog", "index.html"), inWorldPage(project, "blog/index.html", project.blog.title, "blog2014", body));
}

function oldHome(project) {
  const e = project.blog.entries.map(x => `<tr><td bgcolor="#ffffff"><font size="2"><b>${x.date} ${x.title}</b><br>${x.body.join("<br>")}<br><font color="#999999">comment:${x.comments} / category:${x.cat}</font></font></td></tr>`).join("");
  const body = `<!doctype html><html lang="ja"><head><meta charset="utf-8"><title>${project.blog.title}</title></head><body bgcolor="#fff0f5" text="#333333" link="#0000ee" vlink="#551a8b"><center><font size="6" color="#cc3399">★${project.blog.title}★</font><br><marquee width="520">いらっしゃいませ。リンク切れ多いです。荒らし禁止。</marquee><table width="760" border="1" cellpadding="6" cellspacing="0" bgcolor="#ffccff"><tr><td width="170" valign="top"><font size="2">PROFILE<br>${project.blog.profile}<hr>キリ番: 88888<br>相互リンク募集中<br>古い日記<br>買ったもの<br>掲示板休止中</font></td><td valign="top"><table width="100%" border="0" cellpadding="5" cellspacing="8">${e}</table></td></tr></table><font size="1" color="#fff0f5"><a href="../archive/hidden/index.html">.</a></font></center></body></html>`;
  write(path.join(project.dir, "web", "blog", "index.html"), body);
}

function writeReadmes(project) {
  write(path.join(project.dir, "README.md"), `# ${project.title}\n\n上級編Web横断型モキュメンタリー謎解きです。\n\n- 想定時間: 2.5〜4時間\n- 入口: web/index.html\n- 照合ノート: web/investigate/index.html\n- 作中サイト数: ${project.siteCount}系統\n- Booth用フォルダ: ${project.boothDir}\n\n## 制作ルール\n\n画像はChatGPT生成画像のみ使用。キャラクター画像は未使用。スプライトシート未使用。\n\n## 回答\n\n${project.answers.map((a, i) => `${i + 1}. ${a}`).join("\n")}\n`);
  write(path.join(project.dir, "BOOTH_README.md"), `# ${project.title}\n\n` +
    `このフォルダの web/index.html から開始してください。\n\n` +
    `想定時間は2.5〜4時間です。検索、メール、管理画面、資料照合ノートを開きながら、複数の作中サイトを調査します。\n\n` +
    `ZIP圧縮はまだ行っていません。\n`);
  write(path.join(project.dir, "HANDOFF.md"), `# ${project.title} 引継ぎ\n\n` +
    `2026-05-17 作成。\n\n` +
    `## 完了\n\n- 上級編として${project.siteCount}系統の作中サイトを作成。\n- メインページと照合ノートは豪華レイアウトで統一。\n- 検索、メール、管理画面を追加し、リンクが初期状態で揃わない構造にした。\n- ブログは作中年代に合わせたデザインにした。\n- ChatGPT生成画像をassetsへ配置。\n- Booth用フォルダを作成。ZIPは未作成。\n\n` +
    `## 未完了\n\n- 実プレイで難易度と所要時間を確認。\n- 必要ならヒントPDFと解答PDFを作成。\n`);
}

function server(port) {
  return `import http from "node:http";\nimport fs from "node:fs";\nimport path from "node:path";\nimport { fileURLToPath } from "node:url";\nconst root=path.dirname(fileURLToPath(import.meta.url));\nconst types={".html":"text/html; charset=utf-8",".css":"text/css; charset=utf-8",".js":"text/javascript; charset=utf-8",".png":"image/png"};\nhttp.createServer((req,res)=>{let u=decodeURIComponent(req.url.split("?")[0]);if(u.endsWith("/"))u+="index.html";let f=path.join(root,u);if(!f.startsWith(root)){res.writeHead(403);res.end("forbidden");return}fs.readFile(f,(e,d)=>{if(e){res.writeHead(404);res.end("not found");return}res.writeHead(200,{"Content-Type":types[path.extname(f)]||"application/octet-stream"});res.end(d)})}).listen(${port},"127.0.0.1",()=>console.log("http://127.0.0.1:${port}/web/index.html"));\n`;
}

const imageFiles = fs.readdirSync(imageRoot).filter(f => f.endsWith(".png")).map(f => path.join(imageRoot, f)).sort((a, b) => fs.statSync(a).mtimeMs - fs.statSync(b).mtimeMs).slice(-4);

const abyss = {
  id: "AbyssalObservatoryMystery",
  title: "黒潮海底観測所 記録消失事件",
  kicker: "ABYSSAL OBSERVATORY",
  dir: path.join(root, "AbyssalObservatoryMystery"),
  boothDir: path.join(root, "AbyssalObservatoryMystery_BoothPackage", "AbyssalObservatoryMystery_Booth_v1"),
  hero: "hero-observatory.png",
  second: "control-room.png",
  port: 4383,
  searchName: "MinatoSearch",
  searchColor: "#2a6ad7",
  mailbox: "海洋資料課 / 2014年度保存箱",
  adminPass: "KURO0216",
  siteCount: 8,
  lead: "閉鎖された海底観測施設の公開記録、自治体資料、潮流ログ、無線記録、個人ブログを照合し、2014年11月18日の記録消失と死亡事故の真相を復元する上級編です。",
  officialIntro: "黒潮海底観測所は2014年に閉鎖され、現在は公開資料と一部の制限記録だけが残っています。",
  background: [
    "黒潮海底観測所は、港から八キロ沖合の海底ケーブルを使って水圧、潮流、音響を測っていた施設です。観測所そのものは海底にあり、地上の管制棟から遠隔で操作されていました。",
    "2014年11月18日深夜、第三観測室の環境ログが途切れ、翌朝に研究員の三枝透が死亡したと記録されました。公式発表は設備故障でしたが、潮流、鍵、電源、勤務表がわずかに食い違っています。",
    "怖さは記録の外側にあります。誰かが嘘を書いたというより、複数の部署がそれぞれ都合のいい欠落を作り、その隙間に同じ名前が残っています。"
  ],
  questions: [
    "ニュース記事の死亡者名と施設の勤務表を照合してください。",
    "自治体の閉鎖議事録と新聞の日付欄を照合し、事故日を答えてください。",
    "潮流観測所の欠測ログとメール本文から、最初の異常時刻を答えてください。",
    "施設サイトの巡回表と音響記録に共通する場所を答えてください。",
    "市の公開文書で事故番号として扱われた管理IDを答えてください。",
    "資料室の欠番表で、閲覧制限へ移された冊子名を答えてください。",
    "保守会社の請求書と施設の鍵台帳から、立入記録のあった部屋を答えてください。",
    "検索結果に出る外部記録のうち、北東流速を記録したサイト名を答えてください。",
    "潮流観測所の表とラジオログを照合し、02時台の流速を答えてください。",
    "無線局の録音台帳で欠落している記録名を答えてください。",
    "メールと保守会社の担当表から、夜間対応者名を答えてください。",
    "ブログ写真メモと施設備品表に共通する持ち出し物を答えてください。",
    "管理画面の制限記録で、電源復帰が記録された時刻を答えてください。",
    "自治体の人事処理で、三枝透はどの扱いにされたか答えてください。",
    "新聞の続報と議事録添付の公開日を照合し、追記日を答えてください。",
    "管理画面の表題に残る正式施設名を答えてください。",
    "施設鍵台帳とメール添付の一致語を答えてください。",
    "保守会社の巡回メモと制限ログで塞がれていた場所を答えてください。",
    "請求書の発行者として残る会社名を答えてください。",
    "潮流観測所で通常値ではなく空白扱いになっている記録語を答えてください。",
    "掲示板の保存ログと新聞訂正欄で一致する日付を答えてください。",
    "管理画面の制限記録で、最終照合に必要なログ名を答えてください。",
    "この情報群へ到達するためのプレイヤー用画面名を答えてください。",
    "最終照合として、犯人、被害者、場所、塞がれた退路を一文で答えてください。"
  ],
  answers: ["三枝透","2014年11月18日","02:16","第三観測室","OBS-1118","深度ログ第七冊","B棟冷却室","潮流観測所","北東1.8ノット","音響記録D","榊原怜","銀色の耐圧ケース","03:04","休職扱い","2014/11/19","黒潮海底観測所","保守用カード","東ケーブルシャフト","海洋計測株式会社","欠測","2014/11/20","予備電源ログ","管理画面","榊原怜が三枝透を第三観測室に閉じ込め、保守用カードを使って東ケーブルシャフト側から退路を塞いだ"],
};
abyss.results = [
  { keywords:["黒潮","観測所"], href:"../facility/index.html", title:"黒潮海底観測所 施設公開ページ", snippet:"閉鎖施設の公開資料。巡回表、鍵台帳、展示準備資料。", public:true },
  { keywords:["OBS-1118"], href:"../municipal/case/index.html", title:"湊浦市 公開文書 OBS-1118", snippet:"安全審議会の事故番号。添付資料は一部黒塗り。" },
  { keywords:["潮流"], href:"../tide/index.html", title:"潮流観測所 2014年11月ログ", snippet:"北東流速、欠測、圧力差の記録。" },
  { keywords:["音響記録D"], href:"../radio/acoustic/index.html", title:"港湾無線局 音響記録D 欠落", snippet:"02時台の雑音と第三観測室付近の記録。" },
  { keywords:["海洋計測"], href:"../contractor/index.html", title:"海洋計測株式会社 保守報告", snippet:"夜間保守、請求書、担当者控え。" },
  { keywords:["三枝透"], href:"../news/index.html", title:"港湾日報 アーカイブ", snippet:"死亡記事、訂正欄、休職扱いの表現差。" },
  { keywords:["銀色"], href:"../blog/index.html", title:"潮待ちメモ", snippet:"2014年の無料ブログ。写真メモと日常記事。" },
  { keywords:["掲示板"], href:"../board/index.html", title:"港の古い掲示板 保存ログ", snippet:"噂、釣果、訂正欄への言及。" }
];
abyss.decoys = Array.from({length:24}, (_,i)=>({keywords:["黒潮","港","観測","海"],href:"../news/index.html",title:`黒潮周辺ニュース断片 ${i+1}`,snippet:"祭り、釣果、工事、求人など事件と無関係な検索結果。",public:i<10,label:"キャッシュ"}));
abyss.mails = [
  {subject:"Re: 公開範囲の確認",from:"資料課",date:"2014/12/02",body:["公開側には施設名をKUROと略して残します。時刻は潮流ログの最初の異常、02:16と合わせてください。","管理画面のパスは施設略号と時刻を続けたものです。"]},
  {subject:"添付: 夜間保守の扱い",from:"榊原怜",date:"2014/11/19",body:["保守用カードは回収済みです。東ケーブルシャフト側の開閉履歴は、通常の巡回に見えるようにしてください。","三枝さんの件は休職扱いで先に処理します。"]},
  {subject:"古い広報写真",from:"広報",date:"2015/01/08",body:["銀色の耐圧ケースが写った写真はブログ側にも出ているようです。展示ケースからは外してください。"]}
];
abyss.adminLinks = [
  {href:"../facility/restricted/index.html",title:"黒潮海底観測所 制限記録",note:"予備電源ログ、東ケーブルシャフト、第三観測室。"},
  {href:"../municipal/case/index.html",title:"湊浦市 OBS-1118 黒塗り解除控え",note:"人事処理と事故番号。"},
  {href:"../contractor/night/index.html",title:"海洋計測 夜間保守記録",note:"榊原怜の入退室処理。"}
];
abyss.blog = {
  title:"潮待ちメモ",
  subtitle:"港の写真と弁当と、たまに仕事の話。",
  profile:"minato_s / 海沿いの仕事。写真は古いコンデジ。",
  months:["2014年11月","2014年10月","2014年9月","2013年12月"],
  entries:[
    {date:"2014-11-21",cat:"写真",comments:2,title:"銀色の箱",body:["資料整理で銀色の耐圧ケースを見た。展示に回すには傷が多いけど、妙に新しかった。","ケースの底にDのシール。Dって音響かな。"],comments:2},
    {date:"2014-11-18",cat:"日常",comments:0,title:"深夜の通知",body:["02:16の通知で起きた。海の仕事は寝ていても音だけ残る。","翌朝、誰もその通知の話をしなかった。"],comments:0},
    {date:"2014-11-07",cat:"昼食",comments:5,title:"港のコロッケ",body:["駅前の惣菜屋。揚げたて。仕事の話はなし。"],comments:5},
    {date:"2014-10-29",cat:"メモ",comments:1,title:"写真の整理",body:["第三観測室の古いパネル写真を縮小。東側だけ妙に暗い。"],comments:1},
    {date:"2014-09-15",cat:"広告",comments:0,title:"無料ブログの広告が重い",body:["テンプレートを変えたら横幅が崩れた。"],comments:0}
  ]
};

const ginrei = {
  id: "GinreiDepartmentMystery",
  title: "銀嶺百貨店 地下通路閉鎖事件",
  kicker: "GINREI DEPARTMENT",
  dir: path.join(root, "GinreiDepartmentMystery"),
  boothDir: path.join(root, "GinreiDepartmentMystery_BoothPackage", "GinreiDepartmentMystery_Booth_v1"),
  hero: "hero-department.png",
  second: "records-room.png",
  port: 4384,
  searchName: "Search98",
  searchColor: "#d7372f",
  mailbox: "閉店準備室 / 1998年保存箱",
  adminPass: "GIN2132",
  siteCount: 8,
  lead: "閉店した地方百貨店の公式サイト、新聞縮刷、警備記録、テナント会報、古い個人日記を横断し、1998年12月24日の地下配送通路閉鎖事件を追う上級編です。",
  officialIntro: "銀嶺百貨店は1999年に閉店し、現在は閉店記念サイトと複数の保存ログだけが残っています。",
  background: [
    "銀嶺百貨店は駅前再開発で姿を消した古い百貨店です。閉店前の数か月、地下配送通路と旧エレベーター5号機では、記録だけが残る小さなトラブルが続いていました。",
    "1998年12月24日、売場主任の宮永梓が勤務後に行方不明となり、翌日の新聞は退職処理と小さく報じました。けれど警備記録、売上台帳、テナント日誌では、21:32以降の扉の扱いが食い違います。",
    "この作品では派手な怪異は起きません。閉店セールの明るさ、古いホームページの軽さ、年末の雑談の奥に、誰も訂正しなかった一行が残っています。"
  ],
  questions: [
    "新聞とテナント会報に共通する失踪者名を答えてください。",
    "新聞紙面と閉店準備室の保存箱から、事件日を答えてください。",
    "警備ログとメール本文から、最初に地下扉が閉じた時刻を答えてください。",
    "公式サイトの館内図と警備記録に共通する場所を答えてください。",
    "市の保存資料で管理番号になっているIDを答えてください。",
    "台帳サイトで欠番扱いになった冊子名を答えてください。",
    "設備会社の点検表と鍵束一覧から、夜間に記録された部屋を答えてください。",
    "検索結果に出る監視担当部署名を答えてください。",
    "警備記録で非常放送に接続された系統名を答えてください。",
    "監視台帳で欠落している記録名を答えてください。",
    "メールと設備担当表から、夜間対応者名を答えてください。",
    "古い個人日記と鍵台帳に共通する持ち出し物を答えてください。",
    "管理画面の制限記録で、扉復旧が記録された時刻を答えてください。",
    "人事処理で宮永梓はどの扱いにされたか答えてください。",
    "新聞訂正欄と労組メモで一致する追記日を答えてください。",
    "制限記録の表題に残る正式店名を答えてください。",
    "鍵台帳とメール添付の一致語を答えてください。",
    "警備メモと制限ログで塞がれていた場所を答えてください。",
    "請求書の発行者として残る会社名を答えてください。",
    "売上台帳で通常番号ではなく空白扱いになっている記録語を答えてください。",
    "掲示板保存ログと新聞訂正欄で一致する日付を答えてください。",
    "管理画面の制限記録で、最終照合に必要なログ名を答えてください。",
    "この情報群へ到達するためのプレイヤー用画面名を答えてください。",
    "最終照合として、犯人、被害者、場所、塞がれた退路を一文で答えてください。"
  ],
  answers: ["宮永梓","1998年12月24日","21:32","地下配送通路","GIN-1224","売上台帳第12冊","南荷捌き室","防災センター","非常放送3系統","監視記録B","真壁亮","赤い鍵束","22:08","退職処理","1998/12/25","銀嶺百貨店","搬入口予備鍵","旧エレベーター5号機","東都設備","欠番","1998/12/26","レジ締めログ","管理画面","真壁亮が宮永梓を地下配送通路に閉じ込め、搬入口予備鍵で旧エレベーター5号機側の扉を塞いだ"],
};
ginrei.results = [
  { keywords:["銀嶺"], href:"../store/index.html", title:"銀嶺百貨店 閉店記念サイト", snippet:"フロア案内、館内図、閉店セール告知。", public:true },
  { keywords:["GIN-1224"], href:"../city/case/index.html", title:"市立資料室 GIN-1224", snippet:"閉店関連資料の一部公開。" },
  { keywords:["防災"], href:"../security/index.html", title:"防災センター 監視記録", snippet:"地下配送通路、非常放送3系統、監視記録B。" },
  { keywords:["売上台帳"], href:"../store/ledger/index.html", title:"銀嶺百貨店 売上台帳第12冊", snippet:"12月分台帳。欠番とレジ締めの差異。" },
  { keywords:["東都設備"], href:"../tenant/index.html", title:"東都設備 点検控え", snippet:"旧エレベーター5号機と南荷捌き室。" },
  { keywords:["宮永梓"], href:"../news/index.html", title:"北峰日日新聞 縮刷版", snippet:"退職処理として扱われた記事と訂正欄。" },
  { keywords:["赤い鍵束"], href:"../blog/index.html", title:"ありすのへや", snippet:"1998年風個人ホームページの日記。" },
  { keywords:["労組"], href:"../union/index.html", title:"銀嶺労組かわら版", snippet:"閉店前の申し入れと追記日。" }
];
ginrei.decoys = Array.from({length:28}, (_,i)=>({keywords:["銀嶺","百貨店","閉店"],href:"../store/index.html",title:`銀嶺百貨店 思い出ページ ${i+1}`,snippet:"福袋、屋上遊園、物産展、求人、写真募集などの検索結果。",public:i<10,label:"古い検索結果"}));
ginrei.mails = [
  {subject:"閉店記念サイト公開範囲",from:"閉店準備室",date:"1999/01/06",body:["管理IDはGIN、時刻は防災センターの最初の異常21:32を続けます。","パスコードを知っている人だけが地下記録を見られるようにしてください。"]},
  {subject:"鍵束の回収",from:"真壁亮",date:"1998/12/25",body:["赤い鍵束は南荷捌き室の棚へ戻しました。搬入口予備鍵の記録は通常点検扱いでお願いします。","宮永さんの処理は退職処理で進めます。"]},
  {subject:"訂正欄について",from:"北峰日日",date:"1998/12/26",body:["1998/12/25付の小記事は表現を調整しました。地下配送通路という語は出しません。"]}
];
ginrei.adminLinks = [
  {href:"../security/restricted/index.html",title:"防災センター 制限記録",note:"レジ締めログ、監視記録B、地下配送通路。"},
  {href:"../city/case/index.html",title:"市立資料室 GIN-1224 黒塗り解除控え",note:"退職処理と管理番号。"},
  {href:"../tenant/night/index.html",title:"東都設備 夜間点検記録",note:"真壁亮の入退室処理。"}
];
ginrei.blog = {
  title:"ありすのへや",
  subtitle:"古い個人ホームページ",
  profile:"ありす / 銀嶺の近くで働いてます。日記と買い物メモ。",
  months:["1998年12月","1998年11月","1998年10月"],
  entries:[
    {date:"1998/12/25",cat:"日記",comments:3,title:"イブのあと",body:["昨日は21:32に裏のベルが鳴った。赤い鍵束を持った人が走っていた。","地下の通路は寒いので行きたくない。"],comments:3},
    {date:"1998/12/24",cat:"買い物",comments:1,title:"閉店セール",body:["包装紙がかわいかった。南の荷捌きのほうが騒がしかった。"],comments:1},
    {date:"1998/12/10",cat:"独り言",comments:0,title:"カウンターが回った",body:["88888を踏んだ方、掲示板に書いてください。"],comments:0},
    {date:"1998/11/29",cat:"リンク",comments:4,title:"相互リンク",body:["素材屋さんと相互リンクしました。バナーは直リンク禁止です。"],comments:4}
  ]
};

function makeProject(project, imageA, imageB) {
  fs.rmSync(project.dir, { recursive: true, force: true });
  fs.rmSync(project.boothDir, { recursive: true, force: true });
  mkdir(path.join(project.dir, "web", "assets"));
  copy(imageA, path.join(project.dir, "web", "assets", project.hero));
  copy(imageB, path.join(project.dir, "web", "assets", project.second));
  write(path.join(project.dir, "web", "site.css"), commonCss);
  write(path.join(project.dir, "web", "premium.css"), premiumCss);
  write(path.join(project.dir, "web", "variants.css"), variantsCss);
  write(path.join(project.dir, "web", "textflow.js"), textflow);
  write(path.join(project.dir, "web", "site.js"), siteJs(project.answers));
  write(path.join(project.dir, "web", "index.html"), mainPage(project));
  write(path.join(project.dir, "web", "investigate", "index.html"), investigatePage(project));
  write(path.join(project.dir, "web", "search", "index.html"), searchPage(project));
  write(path.join(project.dir, "web", "mail", "index.html"), mailPage(project));
  write(path.join(project.dir, "web", "admin", "index.html"), adminPage(project));
  write(path.join(project.dir, "server.mjs"), server(project.port));
  writeReadmes(project);
}

function abyssSites() {
  const p = abyss;
  officialSite(p, "facility", "黒潮海底観測所", "official", [
    {slug:"shift",short:"勤務表",title:"2014年11月勤務表",notice:"11月分の勤務表を公開しました。",note:"三枝透、榊原怜の夜間当番が記載されています。",body:"当直表は閉鎖後に公開された写しです。",rows:[["2014/11/18 20:00","三枝透 施設内確認"],["2014/11/18 22:00","榊原怜 保守連絡"],["2014/11/19 03:04","予備電源復帰"]],extra:["第三観測室は02時台に手動確認扱い。","B棟冷却室は通常施錠。"]},
    {slug:"keys",short:"鍵台帳",title:"保守用カード管理台帳",notice:"鍵台帳の一部を公開しました。",note:"保守用カード、銀色の耐圧ケース、B棟冷却室。",body:"カード貸与の記録には追記があります。",rows:[["保守用カード","2014/11/18 21:48 榊原怜"],["銀色の耐圧ケース","展示準備から除外"],["B棟冷却室","22:11 入室"]],extra:["返却欄は2014/11/19朝にまとめ書き。","東ケーブルシャフトの欄だけ筆跡が薄い。"]},
    {slug:"map",short:"施設図",title:"施設図と観測室配置",notice:"旧施設図を掲載しました。",note:"第三観測室と東ケーブルシャフトの位置関係。",body:"図面は説明用のため細部を省略しています。",rows:[["第三観測室","東ケーブルシャフトに隣接"],["B棟冷却室","地上管制棟側"],["非常退避路","東側から外部解放"]],extra:["退避路は遠隔開放できない。","音響記録Dの設置点は第三観測室側。"]},
    {slug:"restricted",short:"制限",title:"閲覧制限記録",notice:"管理画面経由で閲覧してください。",note:"予備電源ログと東ケーブルシャフト。",body:"この写しは内部閲覧用として残されました。",rows:[["予備電源ログ","03:04 復帰"],["東ケーブルシャフト","02:21 手動閉鎖"],["第三観測室","内側応答なし"]],extra:["処理担当は榊原怜。","制限理由は訴訟対応。"]},
    {slug:"exhibit",short:"展示",title:"展示準備資料",notice:"閉鎖記念展示の候補品。",note:"銀色の耐圧ケースが候補から外れました。",body:"展示ケースに収める資料候補の一覧です。",rows:[["ケースA","センサー模型"],["ケースB","深度ログ第七冊"],["除外","銀色の耐圧ケース"]],extra:["除外理由は状態不良。","底面にDのラベル。"]}
  ], p.second);
  officialSite(p, "municipal", "湊浦市 安全公開室", "municipal", [
    {slug:"case",short:"OBS-1118",title:"OBS-1118 公開文書",notice:"事故番号OBS-1118の公開範囲を更新。",note:"2014年11月18日発生。",body:"公開請求に基づく文書です。",rows:[["事故番号","OBS-1118"],["発生日","2014年11月18日"],["人事処理","休職扱い"],["追記","2014/11/19"]],extra:["死亡確認欄は別紙扱い。","施設正式名は黒潮海底観測所。"]},
    {slug:"meeting",short:"議事録",title:"安全審議会 議事録",notice:"閉鎖判断に関する議事録。",note:"欠測と記録保存の扱い。",body:"議事録の一部です。",rows:[["欠測","通常値ではなく空白扱い"],["深度ログ第七冊","資料室へ移管"],["公開日","2014/11/19"]],extra:["委員の一人が音響記録Dに触れている。","榊原怜の氏名は伏せられていない。"]},
    {slug:"archive",short:"資料室",title:"資料移管一覧",notice:"資料室に移した冊子一覧。",note:"深度ログ第七冊が閲覧制限。",body:"閉鎖後の移管リストです。",rows:[["深度ログ第六冊","公開"],["深度ログ第七冊","閲覧制限"],["潮流表","公開"]],extra:["第七冊だけ管理画面照合が必要。","貸出日が2014/11/20に訂正。"]}
  ], p.second);
  officialSite(p, "tide", "潮流観測所", "lab", [
    {slug:"current",short:"流速",title:"2014年11月18日 流速表",notice:"北東1.8ノットを記録。",note:"02時台に急な変化。",body:"観測ブイの集計値です。",rows:[["02:00","北東0.4ノット"],["02:16","北東1.8ノット"],["02:30","欠測"]],extra:["02:16以降は圧力差が拡大。","メールの時刻と一致。"]},
    {slug:"pressure",short:"圧力",title:"圧力差ログ",notice:"第三観測室付近で圧力差。",note:"音響記録Dと同時刻。",body:"圧力センサーの抜粋です。",rows:[["第三観測室","02:16 異常"],["東側","02:21 閉鎖"],["復帰","03:04"]],extra:["数値は検証中として公開。"]},
    {slug:"missing",short:"欠測",title:"欠測処理一覧",notice:"欠測欄の扱い。",note:"通常値ではなく欠測。",body:"空白処理の一覧です。",rows:[["02:30","欠測"],["02:45","欠測"],["03:00","欠測"]],extra:["審議会で問題視された。"]}
  ], p.second);
  officialSite(p, "radio", "港湾無線局", "radio", [
    {slug:"acoustic",short:"音響",title:"音響記録D",notice:"D記録の欠落。",note:"第三観測室付近の雑音。",body:"港湾無線局の録音台帳です。",rows:[["音響記録A","通常"],["音響記録D","欠落"],["02:16","第三観測室付近"]],extra:["Dだけ銀色ケースにコピー。"]},
    {slug:"relay",short:"中継",title:"中継局メモ",notice:"中継局の点検メモ。",note:"北東1.8ノットに言及。",body:"無線中継の保存メモです。",rows:[["02:16","風ではなく潮の音"],["02:21","短い遮断"],["03:04","電源復帰音"]],extra:["榊原の声らしいものは記録外。"]},
    {slug:"schedule",short:"時刻表",title:"録音時刻表",notice:"録音台帳の整理。",note:"Dのみ飛び番。",body:"時刻ごとの保存番号です。",rows:[["02:00","C"],["02:16","D"],["02:30","E"]],extra:["Dは管理画面側へ移管。"]}
  ], p.second);
  officialSite(p, "contractor", "海洋計測株式会社", "contractor", [
    {slug:"staff",short:"担当",title:"夜間保守担当表",notice:"夜間担当表の写し。",note:"榊原怜、三枝透。",body:"契約先向け資料です。",rows:[["榊原怜","夜間対応"],["三枝透","施設確認"],["連絡先","資料課へ転送"]],extra:["担当表の時刻は後日修正。"]},
    {slug:"invoice",short:"請求",title:"請求書控え",notice:"B棟冷却室の作業費。",note:"海洋計測株式会社名義。",body:"月末請求の抜粋です。",rows:[["B棟冷却室","夜間保守"],["東ケーブルシャフト","項目外"],["発行者","海洋計測株式会社"]],extra:["項目外の作業が手書きで追記。"]},
    {slug:"night",short:"夜間",title:"夜間保守記録",notice:"管理画面経由の参照推奨。",note:"保守用カード、東ケーブルシャフト。",body:"内部保管された夜間記録です。",rows:[["21:48","保守用カード貸与"],["22:11","B棟冷却室"],["02:21","東ケーブルシャフト側から閉鎖"]],extra:["対応者は榊原怜。"]}
  ], p.second);
  newsSite(p, "news", "港湾日報 縮刷版", [
    {date:"2014/11/19",section:"社会",title:"海底観測施設で研究員死亡",body:["湊浦市は18日深夜、黒潮海底観測所で三枝透さんが死亡したと発表した。市は設備故障の可能性があるとしている。","関係者によると、事故番号はOBS-1118として処理された。"]},
    {date:"2014/11/20",section:"訂正",title:"休職扱いの表現について",body:["19日付記事の人事処理に関する表現は、市の公開資料に合わせ休職扱いとします。"]},
    {date:"2014/12/01",section:"地域",title:"閉鎖施設の資料公開へ",body:["深度ログ第七冊など一部資料は閲覧制限となる。"]}
  ]);
  boardSite(p, "board", "港の掲示板 保存ログ", [
    {title:"海底観測所の音",posts:[{name:"名無し",date:"2014/11/18 02:18",text:"沖の方で低い音。風じゃない。"},{name:"古参",date:"2014/11/20",text:"新聞の訂正欄、2014/11/20だった。"}]},
    {title:"釣果と潮",posts:[{name:"船宿",date:"2014/11/18",text:"北東に流される。1.8くらいありそう。"},{name:"見物人",date:"2014/11/19",text:"銀色の箱を車に積んでいた。"}]},
    {title:"港祭り",posts:[{name:"祭り係",date:"2014/10/02",text:"ポスター募集。"},{name:"通行人",date:"2014/11/21",text:"観測所の人、休職扱いって変じゃないか。"}]}
  ]);
  blog2014(p);
}

function ginreiSites() {
  const p = ginrei;
  officialSite(p, "store", "銀嶺百貨店 閉店記念サイト", "dept", [
    {slug:"floor",short:"フロア",title:"閉店時フロア案内",notice:"地下配送通路の図を掲載。",note:"地下配送通路と旧エレベーター5号機。",body:"閉店記念として残された館内図です。",rows:[["地下配送通路","搬入口と南荷捌き室を接続"],["旧エレベーター5号機","地下から屋上倉庫"],["防災センター","地下1階奥"]],extra:["地下図は閉店後に一部削除。"]},
    {slug:"ledger",short:"台帳",title:"売上台帳第12冊",notice:"台帳欠番の説明。",note:"第12冊は欠番扱い。",body:"閉店準備室の台帳目録です。",rows:[["売上台帳第11冊","公開"],["売上台帳第12冊","欠番"],["レジ締めログ","管理画面へ移管"]],extra:["欠番欄に12/24の追記。"]},
    {slug:"keys",short:"鍵束",title:"搬入口鍵束一覧",notice:"赤い鍵束の写真説明。",note:"搬入口予備鍵。",body:"閉店前の鍵束管理表です。",rows:[["赤い鍵束","搬入口予備鍵を含む"],["南荷捌き室","21:32 記録"],["返却","22:08後に記入"]],extra:["真壁亮の印が薄い。"]},
    {slug:"sale",short:"閉店",title:"閉店セール告知",notice:"年末催事情報。",note:"一般客向けページ。",body:"事件とは無関係に見える告知です。",rows:[["屋上","最終営業"],["地下食品","20時閉店"],["搬入口","作業員のみ"]],extra:["明るい告知の端に地下の導線が残る。"]},
    {slug:"archive",short:"写真",title:"店内写真募集",notice:"思い出写真募集。",note:"赤い鍵束と地下扉の目撃。",body:"読者投稿写真の案内です。",rows:[["応募","郵送のみ"],["掲載不可","地下通路写真"],["備考","防災センター確認"]],extra:["掲載不可写真は制限記録へ。"]}
  ], p.second);
  officialSite(p, "city", "北峰市立資料室", "municipal", [
    {slug:"case",short:"GIN-1224",title:"GIN-1224 保存資料",notice:"管理番号GIN-1224。",note:"1998年12月24日発生。",body:"再開発関連資料の公開写しです。",rows:[["管理番号","GIN-1224"],["日付","1998年12月24日"],["人事処理","退職処理"],["追記","1998/12/25"]],extra:["宮永梓の氏名は別紙。"]},
    {slug:"meeting",short:"議事録",title:"再開発会議議事録",notice:"閉店後の管理。",note:"地下配送通路の閉鎖。",body:"市の会議記録です。",rows:[["地下配送通路","閉鎖対象"],["旧エレベーター5号機","封鎖確認"],["防災センター","記録移管"]],extra:["GIN-1224の添付あり。"]},
    {slug:"archive",short:"目録",title:"閉店資料目録",notice:"売上台帳第12冊が欠番。",note:"欠番とレジ締めログ。",body:"資料目録の抜粋です。",rows:[["第11冊","公開"],["第12冊","欠番"],["レジ締めログ","制限"]],extra:["1998/12/26に訂正。"]}
  ], p.second);
  officialSite(p, "security", "防災センター", "security", [
    {slug:"doors",short:"扉",title:"地下扉開閉ログ",notice:"21:32に閉鎖。",note:"地下配送通路。",body:"警備端末の抜粋です。",rows:[["21:32","地下配送通路 閉鎖"],["21:45","非常放送3系統 接続"],["22:08","扉復旧"]],extra:["復旧後の監視記録Bが欠落。"]},
    {slug:"camera",short:"監視",title:"監視記録B",notice:"B記録の欠落。",note:"旧エレベーター5号機。",body:"監視台帳です。",rows:[["監視記録A","公開"],["監視記録B","欠落"],["監視記録C","公開"]],extra:["Bは管理画面へ移管。"]},
    {slug:"restricted",short:"制限",title:"閲覧制限記録",notice:"管理画面経由で閲覧してください。",note:"レジ締めログと監視記録B。",body:"内部閲覧用記録です。",rows:[["レジ締めログ","21:32以降手入力"],["旧エレベーター5号機","搬入口予備鍵で塞止"],["扉復旧","22:08"]],extra:["真壁亮の処理印。"]}
  ], p.second);
  officialSite(p, "tenant", "東都設備 点検控え", "tenant", [
    {slug:"staff",short:"担当",title:"設備担当者表",notice:"夜間担当の控え。",note:"真壁亮。",body:"委託先の担当表です。",rows:[["真壁亮","夜間対応"],["宮永梓","売場主任"],["連絡","閉店準備室"]],extra:["氏名欄がメールと一致。"]},
    {slug:"invoice",short:"請求",title:"請求書控え",notice:"南荷捌き室の作業費。",note:"東都設備名義。",body:"請求書の抜粋です。",rows:[["南荷捌き室","点検"],["旧エレベーター5号機","項目外"],["発行者","東都設備"]],extra:["項目外の追記あり。"]},
    {slug:"night",short:"夜間",title:"夜間点検記録",notice:"管理画面経由の参照推奨。",note:"搬入口予備鍵、旧エレベーター5号機。",body:"内部保管された点検記録です。",rows:[["21:12","搬入口予備鍵"],["21:32","地下配送通路"],["21:46","旧エレベーター5号機側を塞止"]],extra:["対応者は真壁亮。"]}
  ], p.second);
  officialSite(p, "union", "銀嶺労組かわら版", "union", [
    {slug:"memo",short:"申し入れ",title:"閉店時の申し入れ",notice:"12月の安全申し入れ。",note:"追記日1998/12/25。",body:"組合配布資料です。",rows:[["1998/12/24","夜間作業中止を要望"],["1998/12/25","追記"],["1998/12/26","新聞訂正欄に言及"]],extra:["宮永梓の名前は伏せずに残る。"]},
    {slug:"notice",short:"配布物",title:"配布物一覧",notice:"閉店前の紙片。",note:"非常放送3系統。",body:"配布物の一覧です。",rows:[["警備申し入れ","地下配送通路"],["放送点検","非常放送3系統"],["鍵管理","赤い鍵束"]],extra:["複数サイトの語が重なる。"]}
  ], p.second);
  newsSite(p, "news", "北峰日日新聞 縮刷版", [
    {date:"1998/12/25",section:"地域",title:"銀嶺百貨店の社員退職",body:["銀嶺百貨店は24日、売場主任の宮永梓さんを退職処理としたと発表した。閉店準備の混乱によるものとしている。"]},
    {date:"1998/12/26",section:"訂正",title:"24日付記事の補足",body:["地下設備の不具合について、防災センターの記録確認中とします。"]},
    {date:"1999/01/08",section:"経済",title:"閉店記念サイト公開",body:["館内写真や売上台帳の一部が公開された。第12冊は欠番扱い。"]}
  ]);
  boardSite(p, "board", "駅前再開発掲示板 保存ログ", [
    {title:"閉店セール",posts:[{name:"通行人",date:"1998/12/24 21:40",text:"地下搬入口でベルみたいな音。"},{name:"元店員",date:"1998/12/26",text:"新聞の訂正欄、1998/12/26に出てた。"}]},
    {title:"屋上遊園",posts:[{name:"親子連れ",date:"1998/12/20",text:"屋上のメリーゴーランド最後らしい。"},{name:"匿名",date:"1998/12/25",text:"赤い鍵束を持った男を見た。"}]},
    {title:"再開発",posts:[{name:"市民",date:"1999/01/09",text:"資料室のGIN-1224って何？"},{name:"名無し",date:"1999/01/10",text:"防災センターのBだけ抜けてる。"}]}
  ], "oldbbs");
  oldHome(p);
}

makeProject(abyss, imageFiles[0], imageFiles[1]);
abyssSites();
makeProject(ginrei, imageFiles[2], imageFiles[3]);
ginreiSites();

for (const project of [abyss, ginrei]) {
  mkdir(project.boothDir);
  fs.cpSync(path.join(project.dir, "web"), path.join(project.boothDir, "web"), { recursive: true });
  copy(path.join(project.dir, "BOOTH_README.md"), path.join(project.boothDir, "BOOTH_README.md"));
  copy(path.join(project.dir, "server.mjs"), path.join(project.boothDir, "server.mjs"));
}

console.log("created", abyss.dir, ginrei.dir);
