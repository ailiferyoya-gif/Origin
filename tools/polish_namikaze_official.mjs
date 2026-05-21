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

const header = (depth = 1) => {
  const p = "../".repeat(depth);
  return `<header class="ferry-official-header">
  <a class="ferry-official-logo" href="${depth ? "../index.html" : "./index.html"}">
    <span>波風フェリー</span>
    <small>Namikaze Coastal Line</small>
  </a>
  <nav>
    <a href="${depth ? "../about/index.html" : "./about/index.html"}">航路・時刻</a>
    <a href="${depth ? "../facility/index.html" : "./facility/index.html"}">船内・港</a>
    <a href="${depth ? "../safety/index.html" : "./safety/index.html"}">安全運航</a>
  </nav>
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
<body class="ferry-official">
${header(depth)}
${body}
<script src="${"../".repeat(depth)}textflow.js"></script>
</body>
</html>`;

const index = page("波風フェリー公式サイト", `<main>
  <section class="ferry-official-hero">
    <div class="ferry-official-copy">
      <p class="ferry-official-kicker">COASTAL FERRY SERVICE</p>
      <h1>海辺の町を、<wbr>静かに結ぶ。</h1>
      <p>波風フェリーは、旧第二桟橋と湾岸の小さな港を結ぶ沿岸航路です。現在は通常運航を終了し、公開資料と保存記録のみを掲載しています。</p>
      <div class="ferry-official-actions">
        <a href="./about/index.html">航路・時刻を見る</a>
        <a href="./safety/index.html">安全運航記録</a>
      </div>
    </div>
    <div class="ferry-official-visual">
      <img src="../assets/ferry-terminal.png" alt="">
      <img src="../assets/ferry-records.png" alt="">
    </div>
    <aside class="ferry-operation-card">
      <span>最終更新</span>
      <strong>2010/06/22</strong>
      <p>FRY-0621の入港申告に追記があります。</p>
    </aside>
  </section>

  <section class="ferry-livebar">
    <article><span>STATUS</span><strong>保存運航</strong><p>現在、新規乗船受付はありません。</p></article>
    <article><span>ROUTE</span><strong>旧第二桟橋</strong><p>最終便の照会記録が残っています。</p></article>
    <article><span>NOTICE</span><strong>乗客なし</strong><p>公開名簿上の表記です。</p></article>
  </section>

  <section class="ferry-official-section ferry-route-board">
    <div>
      <p class="ferry-official-kicker">ROUTE GUIDE</p>
      <h2>航路案内</h2>
      <p>日中便、貨客便、臨時便の記録を公開しています。夜間便は通常運航ではありません。</p>
    </div>
    <div class="ferry-route-table">
      <div><span>便名</span><strong>FRY-0621</strong><p>旧第二桟橋 01:42発</p></div>
      <div><span>到着</span><strong>02:18</strong><p>入港申告のみ追記</p></div>
      <div><span>名簿</span><strong>乗客なし</strong><p>予備乗船券欄に欠番</p></div>
    </div>
  </section>

  <section class="ferry-official-section ferry-info-grid">
    <a href="./about/index.html"><span>01</span><h2>航路・時刻</h2><p>便名、桟橋、入港申告を確認できます。</p></a>
    <a href="./facility/index.html"><span>02</span><h2>船内・港</h2><p>機関室側通路と旧第二桟橋の案内。</p></a>
    <a href="./safety/index.html"><span>03</span><h2>安全運航</h2><p>潮位、無線、乗船券の保存記録。</p></a>
  </section>
</main>`);

const about = page("航路・時刻", `<main class="ferry-official-sub">
  <section class="ferry-subhero">
    <p class="ferry-official-kicker">ROUTE AND TIMETABLE</p>
    <h1>航路・時刻</h1>
    <p>公開されている時刻表と保存された入港申告を掲載しています。最終便だけ、出港と入港の記録形式が異なります。</p>
  </section>
  <section class="ferry-doc-grid">
    <article><span>通常便</span><h2>日中航路</h2><p>旅客受付、貨物受付ともに通常処理。</p></article>
    <article><span>保存便</span><h2>FRY-0621</h2><p>旧第二桟橋 01:42発。入港申告は02:18。</p></article>
    <article><span>照合</span><h2>予備乗船券</h2><p>名簿では乗客なし。予備券欄のみ欠番。</p></article>
  </section>
</main>`, 2);

const facility = page("船内・港", `<main class="ferry-official-sub">
  <section class="ferry-subhero">
    <p class="ferry-official-kicker">TERMINAL AND DECK</p>
    <h1>船内・港</h1>
    <p>客室、車両甲板、機関室側通路、旧第二桟橋の公開案内です。通常利用できない通路名が、保存図面に残っています。</p>
  </section>
  <section class="ferry-split">
    <img src="../../assets/ferry-terminal.png" alt="">
    <div>
      <h2>旧第二桟橋</h2>
      <p>通常は日中便のみ使用される桟橋です。FRY-0621の記録では、深夜に出港確認があります。</p>
      <ul><li>乗船口</li><li>機関室側通路</li><li>無線室</li></ul>
    </div>
  </section>
</main>`, 2);

const safety = page("安全運航", `<main class="ferry-official-sub">
  <section class="ferry-subhero ferry-subhero-dark">
    <p class="ferry-official-kicker">SAFETY RECORDS</p>
    <h1>安全運航</h1>
    <p>潮位、無線、入港申告、予備乗船券の保存記録を公開しています。制限資料は別系統で保管されています。</p>
  </section>
  <section class="ferry-safety-list">
    <article><time>01:42</time><h2>出港確認</h2><p>旧第二桟橋。運航管理員の確認あり。</p></article>
    <article><time>02:18</time><h2>入港申告</h2><p>潮位ログCと一致。公開時刻とずれがあります。</p></article>
    <article><time>欠番</time><h2>予備券欄</h2><p>乗客なしの名簿と、予備乗船券の欠番が併記されています。</p></article>
  </section>
</main>`, 2);

const css = `

.ferry-official{background:#f5f8fa;color:#122531;font-family:"Yu Gothic","Meiryo",sans-serif}.ferry-official h1,.ferry-official h2,.ferry-official h3,.ferry-official p,.ferry-official a,.ferry-official li{word-break:keep-all;overflow-wrap:normal}.ferry-official-header{position:sticky;top:0;z-index:30;min-height:76px;display:flex;align-items:center;justify-content:space-between;gap:22px;padding:0 max(18px,calc((100vw - 1180px)/2));background:rgba(255,255,255,.86);backdrop-filter:blur(18px);border-bottom:1px solid rgba(18,37,49,.08)}.ferry-official-logo{text-decoration:none;color:#102b3a;display:grid}.ferry-official-logo span{font-weight:700;font-size:1.08rem}.ferry-official-logo small{font-size:.72rem;color:#607a89;letter-spacing:.13em;text-transform:uppercase}.ferry-official-header nav{display:flex;gap:18px;flex-wrap:wrap}.ferry-official-header nav a{text-decoration:none;color:#243f4e}.ferry-official-hero{position:relative;min-height:760px;display:grid;grid-template-columns:minmax(0,1fr) minmax(360px,48%);gap:34px;align-items:center;width:min(1180px,calc(100% - 32px));margin:auto;padding:64px 0 130px}.ferry-official-kicker{font-size:.76rem;letter-spacing:.18em;color:#4b7b91;font-weight:700}.ferry-official-copy h1,.ferry-subhero h1{font-family:"Yu Mincho","Hiragino Mincho ProN",Georgia,serif;font-weight:500;font-size:clamp(2.4rem,5.4vw,5.6rem);line-height:1.06;margin:.2rem 0 18px;color:#0d2a39}.ferry-official-copy p,.ferry-subhero p{max-width:680px;color:#4b6370}.ferry-official-actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:28px}.ferry-official-actions a{display:inline-flex;align-items:center;justify-content:center;min-height:46px;padding:0 18px;border-radius:999px;background:#0d3a50;color:#fff;text-decoration:none}.ferry-official-actions a+ a{background:#fff;color:#0d3a50;border:1px solid #c1d3dc}.ferry-official-visual{position:relative;min-height:500px;border-radius:30px;overflow:hidden;box-shadow:0 32px 100px rgba(13,42,57,.18)}.ferry-official-visual img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;animation:ferryOfficialSlide 14s infinite}.ferry-official-visual img:nth-child(2){animation-delay:7s}.ferry-operation-card{position:absolute;right:max(18px,calc((100vw - 1180px)/2));bottom:44px;background:rgba(255,255,255,.88);backdrop-filter:blur(14px);border:1px solid rgba(18,37,49,.12);padding:20px;min-width:250px;box-shadow:0 22px 70px rgba(13,42,57,.14)}.ferry-operation-card span{color:#607a89;font-size:.82rem}.ferry-operation-card strong{display:block;font-size:1.6rem;color:#0d2a39}.ferry-livebar{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));background:#0d3a50;color:#edf8fc}.ferry-livebar article{margin:0;border:0;background:rgba(255,255,255,.06);padding:28px;border-left:1px solid rgba(255,255,255,.15)}.ferry-livebar span{color:#91bfd0;font-size:.76rem}.ferry-livebar strong{display:block;font-size:1.5rem;color:#fff;margin:6px 0}.ferry-livebar p{color:#c9e0e8}.ferry-official-section{width:min(1180px,calc(100% - 32px));margin:auto;padding:72px 0}.ferry-route-board{display:grid;grid-template-columns:.8fr 1.2fr;gap:28px}.ferry-route-board h2,.ferry-info-grid h2,.ferry-safety-list h2{font-family:"Yu Mincho","Hiragino Mincho ProN",Georgia,serif;font-weight:500;color:#0d2a39}.ferry-route-table{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1px;background:#d2e0e6;border:1px solid #d2e0e6}.ferry-route-table div{background:#fff;padding:22px}.ferry-route-table span{color:#607a89;font-size:.8rem}.ferry-route-table strong{display:block;font-size:1.35rem;margin:6px 0;color:#0d3a50}.ferry-info-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}.ferry-info-grid a{text-decoration:none;color:#142b38;background:#fff;border:1px solid #d5e1e7;padding:24px}.ferry-info-grid span{color:#607a89;font-family:Georgia,serif}.ferry-official-sub{width:min(1080px,calc(100% - 32px));margin:auto;padding:70px 0}.ferry-subhero{border-bottom:1px solid #d5e1e7;padding-bottom:28px}.ferry-subhero-dark{background:#0d3a50;color:#eef8fc;width:auto;margin:0 calc(50% - 50vw);padding:70px max(16px,calc((100vw - 1080px)/2));border-bottom:0}.ferry-subhero-dark h1,.ferry-subhero-dark p{color:#eef8fc}.ferry-doc-grid,.ferry-safety-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin-top:28px}.ferry-doc-grid article,.ferry-safety-list article{background:#fff;border:1px solid #d5e1e7;padding:24px}.ferry-doc-grid span{color:#607a89;font-size:.82rem}.ferry-split{display:grid;grid-template-columns:minmax(320px,48%) 1fr;gap:28px;margin-top:30px;align-items:center}.ferry-split img{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:24px;box-shadow:0 28px 90px rgba(13,42,57,.16)}.ferry-split ul{padding-left:1.2em}.ferry-safety-list time{font-family:Georgia,serif;font-size:1.35rem;color:#0d3a50}@keyframes ferryOfficialSlide{0%{opacity:0;transform:scale(1.03)}10%{opacity:1}45%{opacity:1}55%{opacity:0;transform:scale(1.08)}100%{opacity:0;transform:scale(1.08)}}@media(max-width:820px){.ferry-official-header,.ferry-official-hero,.ferry-livebar,.ferry-route-board,.ferry-route-table,.ferry-info-grid,.ferry-doc-grid,.ferry-split,.ferry-safety-list{grid-template-columns:1fr}.ferry-official-header{align-items:flex-start;flex-direction:column;padding-top:14px;padding-bottom:14px}.ferry-official-visual{min-height:330px}.ferry-operation-card{left:16px;right:16px}}
`;

for (const root of roots) {
  write(root, "web/official/index.html", index);
  write(root, "web/official/about/index.html", about);
  write(root, "web/official/facility/index.html", facility);
  write(root, "web/official/safety/index.html", safety);
  fs.appendFileSync(path.join(root, "web/site.css"), css, "utf8");
}

fs.appendFileSync(path.join(roots[0], "HANDOFF.md"), `

## 2026-05-19 波風フェリー公式サイト作り込み

- 波風フェリー公式サイトを、実在しそうな沿岸フェリー会社サイト風に刷新。
- トップ、航路・時刻、船内・港、安全運航の複数ページ構成にした。
- 予約/運航状況風の表向きコンテンツに、FRY-0621、旧第二桟橋、乗客なし、入港申告の不穏な情報を自然に混ぜた。
- Booth用フォルダ側にも反映。
`, "utf8");

console.log("polished Namikaze ferry official site");
