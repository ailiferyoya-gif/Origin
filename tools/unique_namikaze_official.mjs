import fs from "node:fs";
import path from "node:path";

const roots = [
  "C:/Users/kogit/Documents/Codex/NamikazeFerryMystery",
  "C:/Users/kogit/Documents/Codex/NamikazeFerryMystery_BoothPackage/NamikazeFerryMystery_Booth_v1"
];

function write(root, rel, text) {
  const file = path.join(root, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, text, "utf8");
}

const header = (depth) => {
  const up = "../".repeat(depth);
  const home = depth ? "../index.html" : "./index.html";
  const about = depth ? "../about/index.html" : "./about/index.html";
  const facility = depth ? "../facility/index.html" : "./facility/index.html";
  const safety = depth ? "../safety/index.html" : "./safety/index.html";
  return `<header class="nf-header">
  <a class="nf-logo" href="${home}"><span>波風フェリー</span><small>NAMIKAZE LINE / SEA ROUTE 06</small></a>
  <nav><a href="${about}">航路図</a><a href="${facility}">船内と桟橋</a><a href="${safety}">潮位と安全</a></nav>
</header>`;
};

const page = (title, body, depth = 1) => `<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title} | 波風フェリー</title>
<link rel="stylesheet" href="${"../".repeat(depth)}site.css">
</head>
<body class="nf-site">
${header(depth)}
${body}
<script src="${"../".repeat(depth)}textflow.js"></script>
</body>
</html>`;

const index = page("波風フェリー公式サイト", `<main>
  <section class="nf-hero">
    <div class="nf-maplayer" aria-hidden="true">
      <i></i><i></i><i></i><i></i>
    </div>
    <div class="nf-copy">
      <p class="nf-kicker">COASTAL ROUTE ARCHIVE</p>
      <h1>海図の<wbr>余白に、<wbr>最後の便が<wbr>残っている。</h1>
      <p>波風フェリーは、湾岸の小さな港を結んだ沿岸航路です。現在は運航を終了し、航路図、船内案内、安全運航記録のみを公開しています。</p>
      <div class="nf-actions"><a href="./about/index.html">航路図を見る</a><a href="../route/index.html" target="_blank" rel="noopener">航路照会端末</a></div>
    </div>
    <figure class="nf-visual">
      <img src="../assets/ferry-chart-hero.png" alt="">
      <figcaption><span>FRY-0621</span><b>旧第二桟橋 01:42</b></figcaption>
    </figure>
  </section>

  <section class="nf-ticket-strip">
    <article><span>ROUTE</span><strong>旧第二桟橋</strong><p>最終便だけ深夜帯の記録。</p></article>
    <article><span>ARRIVAL</span><strong>02:18</strong><p>入港申告に追記あり。</p></article>
    <article><span>MANIFEST</span><strong>乗客なし</strong><p>予備乗船券欄は欠番。</p></article>
  </section>

  <section class="nf-chart-section">
    <div>
      <p class="nf-kicker">ROUTE UI</p>
      <h2>航路線と<wbr>潮位線を<wbr>重ねる。</h2>
      <p>表向きは公式サイトの航路案内です。けれど、便名、潮位、入港申告、乗船名簿を重ねると、片道だけが別の形で保存されています。</p>
    </div>
    <img src="../assets/ferry-ui-chart.png" alt="">
  </section>

  <section class="nf-dock-grid">
    <a href="./about/index.html"><span>01</span><h2>航路図</h2><p>便名と桟橋、片道航路の保存記録。</p></a>
    <a href="./facility/index.html"><span>02</span><h2>船内と桟橋</h2><p>機関室側通路、無線室、旧第二桟橋。</p></a>
    <a href="./safety/index.html"><span>03</span><h2>潮位と安全</h2><p>潮位ログC、入港申告、予備乗船券。</p></a>
  </section>
</main>`);

const about = page("航路図", `<main class="nf-sub">
  <section class="nf-subhead"><p class="nf-kicker">ROUTE CHART</p><h1>航路図</h1><p>航路図は公開用に整理されています。FRY-0621だけ、出港と入港の記録線が重なりません。</p></section>
  <section class="nf-route-canvas">
    <div class="nf-sea-line"><span>旧第二桟橋</span><i></i><span>湾岸側</span></div>
    <article><h2>FRY-0621</h2><p>2010/06/21 01:42。旧第二桟橋発。入港申告は02:18。</p></article>
    <article><h2>片道航路</h2><p>公開上は通常航路ですが、乗船名簿と潮位ログでは片道だけが別処理です。</p></article>
  </section>
</main>`, 2);

const facility = page("船内と桟橋", `<main class="nf-sub">
  <section class="nf-subhead"><p class="nf-kicker">DECK AND TERMINAL</p><h1>船内と桟橋</h1><p>船内設備と港の案内です。通常利用者向けのページに、機関室側通路という語が残っています。</p></section>
  <section class="nf-photo-split"><img src="../../assets/ferry-terminal.png" alt=""><div><h2>旧第二桟橋</h2><p>夜間便では通常使用しない桟橋です。FRY-0621の記録では、運航管理員の確認印だけが残ります。</p><ul><li>乗船口</li><li>無線室</li><li>機関室側通路</li></ul></div></section>
</main>`, 2);

const safety = page("潮位と安全", `<main class="nf-sub">
  <section class="nf-subhead nf-subhead-dark"><p class="nf-kicker">TIDE AND SAFETY</p><h1>潮位と安全</h1><p>安全運航のための潮位、無線、入港申告を公開しています。欠番欄は通常の欠測とは別処理です。</p></section>
  <section class="nf-tide-board">
    <article><time>01:42</time><h2>出港確認</h2><p>旧第二桟橋。出港側だけ整っています。</p></article>
    <article><time>02:18</time><h2>入港申告</h2><p>潮位ログCと一致します。</p></article>
    <article><time>欠番</time><h2>予備乗船券</h2><p>乗客なしの名簿と同じ便に残っています。</p></article>
  </section>
</main>`, 2);

const css = `

.nf-site{--ink:#06252a;--sea:#0b5b62;--foam:#d9fff4;--paper:#f6efe3;--coral:#ff6f61;background:linear-gradient(180deg,#effaf8,#f6efe3 70%);color:var(--ink);font-family:"Yu Gothic","Meiryo",sans-serif}.nf-site h1,.nf-site h2,.nf-site h3,.nf-site p,.nf-site a,.nf-site li,.nf-site span,.nf-site time{word-break:keep-all;overflow-wrap:normal}.nf-header{position:sticky;top:0;z-index:30;min-height:78px;display:flex;align-items:center;justify-content:space-between;gap:20px;padding:0 max(18px,calc((100vw - 1220px)/2));background:rgba(246,239,227,.78);backdrop-filter:blur(18px);border-bottom:1px solid rgba(6,37,42,.12)}.nf-logo{text-decoration:none;color:var(--ink);display:grid}.nf-logo span{font-weight:800;font-size:1.12rem}.nf-logo small{font-size:.68rem;letter-spacing:.16em;color:#457076}.nf-header nav{display:flex;gap:8px;flex-wrap:wrap}.nf-header nav a{text-decoration:none;color:var(--ink);border:1px solid rgba(6,37,42,.15);border-radius:999px;padding:9px 13px;background:rgba(255,255,255,.36)}.nf-hero{position:relative;min-height:780px;width:min(1220px,calc(100% - 32px));margin:auto;display:grid;grid-template-columns:minmax(0,1fr) minmax(380px,46%);gap:34px;align-items:center;padding:54px 0 120px}.nf-maplayer{position:absolute;inset:40px 0;pointer-events:none;opacity:.42;background:linear-gradient(90deg,transparent 49%,rgba(11,91,98,.2) 50%,transparent 51%),repeating-linear-gradient(0deg,transparent 0 55px,rgba(11,91,98,.12) 56px),repeating-linear-gradient(90deg,transparent 0 55px,rgba(11,91,98,.12) 56px);mask-image:radial-gradient(circle at 52% 50%,#000,transparent 68%)}.nf-maplayer i{position:absolute;width:34%;height:2px;background:var(--coral);transform-origin:left center}.nf-maplayer i:nth-child(1){left:18%;top:36%;transform:rotate(18deg)}.nf-maplayer i:nth-child(2){left:34%;top:47%;transform:rotate(-9deg);background:var(--sea)}.nf-maplayer i:nth-child(3){left:46%;top:55%;transform:rotate(22deg);opacity:.35}.nf-maplayer i:nth-child(4){left:56%;top:64%;transform:rotate(-18deg);background:#111;opacity:.28}.nf-copy{position:relative;z-index:2}.nf-kicker{font-size:.75rem;letter-spacing:.18em;color:var(--sea);font-weight:800}.nf-copy h1,.nf-subhead h1,.nf-chart-section h2{font-family:"Yu Mincho","Hiragino Mincho ProN",Georgia,serif;font-weight:500;font-size:clamp(2.7rem,6vw,6.4rem);line-height:1.02;margin:.18rem 0 18px;color:var(--ink);text-wrap:balance}.nf-copy p,.nf-subhead p,.nf-chart-section p{max-width:680px;color:#48666a}.nf-actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:28px}.nf-actions a{display:inline-flex;align-items:center;justify-content:center;min-height:48px;border-radius:999px;background:var(--ink);color:#fff;text-decoration:none;padding:0 18px}.nf-actions a+ a{background:var(--foam);color:var(--ink);border:1px solid rgba(6,37,42,.14)}.nf-visual{position:relative;z-index:2;margin:0;border-radius:42px 42px 8px 42px;overflow:hidden;box-shadow:0 32px 90px rgba(6,37,42,.2);background:#123}.nf-visual img{width:100%;height:560px;object-fit:cover}.nf-visual figcaption{position:absolute;left:18px;right:18px;bottom:18px;background:rgba(246,239,227,.84);backdrop-filter:blur(12px);border-radius:22px;padding:14px 16px;display:flex;justify-content:space-between;gap:12px}.nf-visual span{color:var(--sea);font-size:.82rem}.nf-ticket-strip{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));width:min(1220px,calc(100% - 32px));margin:-58px auto 0;position:relative;z-index:3;background:var(--ink);color:#fff;border-radius:28px;overflow:hidden}.nf-ticket-strip article{margin:0;border:0;background:transparent;padding:26px;border-left:1px dashed rgba(217,255,244,.3)}.nf-ticket-strip article:first-child{border-left:0}.nf-ticket-strip span{color:#99d5ca;font-size:.76rem}.nf-ticket-strip strong{display:block;font-size:1.45rem;margin:4px 0}.nf-ticket-strip p{color:#cde8e2}.nf-chart-section{width:min(1220px,calc(100% - 32px));margin:auto;padding:82px 0;display:grid;grid-template-columns:.85fr 1.15fr;gap:32px;align-items:center}.nf-chart-section img{width:100%;border-radius:10px 44px 44px 44px;box-shadow:0 28px 90px rgba(6,37,42,.14)}.nf-dock-grid{width:min(1220px,calc(100% - 32px));margin:0 auto 84px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}.nf-dock-grid a{text-decoration:none;color:var(--ink);background:rgba(255,255,255,.66);border:1px solid rgba(6,37,42,.12);border-radius:28px;padding:24px}.nf-dock-grid span{font-family:Georgia,serif;color:var(--coral)}.nf-dock-grid h2{font-family:"Yu Mincho","Hiragino Mincho ProN",Georgia,serif;font-weight:500}.nf-sub{width:min(1100px,calc(100% - 32px));margin:auto;padding:70px 0 90px}.nf-subhead{padding-bottom:30px;border-bottom:1px solid rgba(6,37,42,.16)}.nf-subhead h1{font-size:clamp(2.3rem,5vw,5.2rem)}.nf-subhead-dark{background:var(--ink);color:#fff;margin:0 calc(50% - 50vw) 28px;padding:70px max(16px,calc((100vw - 1100px)/2));border-bottom:0}.nf-subhead-dark h1,.nf-subhead-dark p{color:#fff}.nf-route-canvas,.nf-tide-board{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin-top:28px}.nf-route-canvas article,.nf-tide-board article{background:#fff;border:1px solid rgba(6,37,42,.12);border-radius:24px;padding:22px}.nf-sea-line{grid-column:1/-1;display:grid;grid-template-columns:auto 1fr auto;gap:14px;align-items:center;background:var(--foam);border-radius:999px;padding:12px 18px}.nf-sea-line i{height:3px;background:linear-gradient(90deg,var(--sea),var(--coral),#111)}.nf-photo-split{display:grid;grid-template-columns:minmax(320px,48%) 1fr;gap:28px;align-items:center;margin-top:28px}.nf-photo-split img{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:38px 8px 38px 38px}.nf-photo-split ul{padding-left:1.2em}.nf-tide-board time{font-family:Georgia,serif;color:var(--sea);font-size:1.4rem}@media(max-width:820px){.nf-header,.nf-hero,.nf-ticket-strip,.nf-chart-section,.nf-dock-grid,.nf-route-canvas,.nf-photo-split,.nf-tide-board{grid-template-columns:1fr}.nf-header{align-items:flex-start;flex-direction:column;padding-top:14px;padding-bottom:14px}.nf-visual img{height:360px}.nf-ticket-strip{margin-top:-32px}}
`;

for (const root of roots) {
  write(root, "web/official/index.html", index);
  write(root, "web/official/about/index.html", about);
  write(root, "web/official/facility/index.html", facility);
  write(root, "web/official/safety/index.html", safety);
  fs.appendFileSync(path.join(root, "web/site.css"), css, "utf8");
}

fs.appendFileSync(path.join(roots[0], "HANDOFF.md"), `

## 2026-05-19 波風フェリー公式サイト唯一性強化

- 最新Webデザイン傾向を参考に、汎用カード型から海図、航路線、チケット、潮汐UIを組み合わせた独自デザインへ刷新。
- ChatGPT生成画像 ferry-chart-hero.png と ferry-ui-chart.png を追加。
- 開始ページから公式サイトへ入れる導線を追加。
- Booth用フォルダ側にも反映。
`, "utf8");

console.log("unique Namikaze official applied");
