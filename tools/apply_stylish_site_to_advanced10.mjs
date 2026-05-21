import fs from "node:fs";
import path from "node:path";

const base = "C:/Users/kogit/Documents/Codex";

const projects = [
  { id:"CrimsonClinicMystery", title:"紅坂診療所 カルテ改竄事件", brand:"紅坂メディカルクリニック", kind:"病院", hero:"clinic-lobby.png", skipOfficial:true },
  { id:"NamikazeFerryMystery", title:"波風フェリー 片道航路記録事件", brand:"波風フェリー", kind:"航路会社", hero:"ferry-terminal.png", image:"ferry-records.png", pages:["航路案内","船内設備","安全運航"] },
  { id:"KarasunoCableMystery", title:"烏野ケーブル 山頂駅停止事件", brand:"烏野ケーブル", kind:"山岳索道", hero:"hero.png", image:"evidence.png", pages:["路線案内","山頂駅","安全運行"] },
  { id:"AonagiDataCenterMystery", title:"青凪データセンター バックアップ消失事件", brand:"青凪データセンター", kind:"データセンター", hero:"hero.png", image:"evidence.png", pages:["施設案内","冗長設備","セキュリティ"] },
  { id:"ShiranuiOnsenMystery", title:"不知火温泉 給湯棟記録事件", brand:"不知火温泉", kind:"温泉旅館", hero:"hero.png", image:"evidence.png", pages:["客室と湯","館内案内","安全管理"] },
  { id:"KurobaraCinemaMystery", title:"黒薔薇シネマ 最終上映フィルム事件", brand:"黒薔薇シネマ", kind:"単館映画館", hero:"hero.png", image:"evidence.png", pages:["上映案内","劇場設備","映写室"] },
  { id:"TokiwaBroadcastMystery", title:"常盤放送 中継テープ未放送事件", brand:"常盤放送", kind:"地域放送局", hero:"hero.png", image:"evidence.png", pages:["番組案内","中継設備","送出管理"] },
  { id:"HakurouMuseumMystery", title:"白楼民俗資料館 収蔵箱入替事件", brand:"白楼民俗資料館", kind:"民俗資料館", hero:"hero.png", image:"evidence.png", pages:["展示案内","収蔵庫","保存処理"] },
  { id:"MizukageDamMystery", title:"水影ダム 放流警報記録事件", brand:"水影ダム管理所", kind:"ダム管理施設", hero:"hero.png", image:"evidence.png", pages:["施設案内","放流情報","警報設備"] },
  { id:"TsukishiroHotelMystery", title:"月白ホテル 夜間監査室事件", brand:"月白ホテル", kind:"丘陵ホテル", hero:"hero.png", image:"evidence.png", pages:["客室案内","館内施設","夜間フロント"] }
];

const fragments = new Map([
  ["CrimsonClinicMystery", ["紅坂診療所","カルテ<wbr>改竄事件"]],
  ["NamikazeFerryMystery", ["波風フェリー","片道航路<wbr>記録事件"]],
  ["KarasunoCableMystery", ["烏野ケーブル","山頂駅<wbr>停止事件"]],
  ["AonagiDataCenterMystery", ["青凪データセンター","バックアップ<wbr>消失事件"]],
  ["ShiranuiOnsenMystery", ["不知火温泉","給湯棟<wbr>記録事件"]],
  ["KurobaraCinemaMystery", ["黒薔薇シネマ","最終上映<wbr>フィルム事件"]],
  ["TokiwaBroadcastMystery", ["常盤放送","中継テープ<wbr>未放送事件"]],
  ["HakurouMuseumMystery", ["白楼民俗資料館","収蔵箱<wbr>入替事件"]],
  ["MizukageDamMystery", ["水影ダム","放流警報<wbr>記録事件"]],
  ["TsukishiroHotelMystery", ["月白ホテル","夜間監査室<wbr>事件"]]
]);

function write(file, text) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, text, "utf8");
}

function syncProject(id, rel) {
  const src = path.join(base, id, rel);
  const dst = path.join(base, `${id}_BoothPackage`, `${id}_Booth_v1`, rel);
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  fs.copyFileSync(src, dst);
}

function linkPrefix(depth) {
  return "../".repeat(depth);
}

function officialPage(p, rel, title, body, depth) {
  const pref = linkPrefix(depth);
  return `<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title} | ${p.brand}</title>
<link rel="stylesheet" href="${pref}site.css">
</head>
<body class="stylish-site ${p.id.toLowerCase()}-theme">
<header class="stylish-header">
  <a class="stylish-logo" href="${depth ? "../index.html" : "./index.html"}"><span>${p.brand}</span><small>${p.kind}</small></a>
  <nav>
    <a href="${depth ? "../about/index.html" : "./about/index.html"}">${p.pages[0]}</a>
    <a href="${depth ? "../facility/index.html" : "./facility/index.html"}">${p.pages[1]}</a>
    <a href="${depth ? "../safety/index.html" : "./safety/index.html"}">${p.pages[2]}</a>
  </nav>
</header>
${body}
<script src="${pref}textflow.js"></script>
</body>
</html>`;
}

function updateStartPage(p) {
  const file = path.join(base, p.id, "web/index.html");
  let text = fs.readFileSync(file, "utf8");
  const [a,b] = fragments.get(p.id);
  text = text.replace(/<h1>.*?<\/h1>/, `<h1>${a}<wbr>${b}</h1>`);
  text = text.replace(/<body class="premium(.*?)">/, `<body class="premium$1 start-page">`);
  fs.writeFileSync(file, text, "utf8");
  syncProject(p.id, "web/index.html");
}

function createStylishOfficial(p) {
  if (p.skipOfficial) return;
  const root = path.join(base, p.id, "web/official");
  const hero = `../assets/${p.hero}`;
  const image = `../assets/${p.image || p.hero}`;
  const indexBody = `<main>
  <section class="stylish-hero">
    <div>
      <p class="stylish-kicker">${p.kind.toUpperCase()} / OFFICIAL SITE</p>
      <h1>${p.brand}<wbr>公式サイト</h1>
      <p>${p.kind}としての通常案内を掲載しています。公開向けの説明の端に、閉鎖前後の記録が少しだけ残っています。</p>
      <div class="stylish-actions"><a href="./about/index.html">${p.pages[0]}</a><a href="./safety/index.html">${p.pages[2]}</a></div>
    </div>
    <div class="stylish-slider"><img src="${hero}" alt=""><img src="${image}" alt=""></div>
  </section>
  <section class="stylish-band">
    <article><span>01</span><h2>${p.pages[0]}</h2><p>表向きの利用案内。通常の説明に、事件時刻周辺の小さな注記が残る。</p></article>
    <article><span>02</span><h2>${p.pages[1]}</h2><p>設備や館内の説明。移動経路や閉鎖区画の語が自然に混ざる。</p></article>
    <article><span>03</span><h2>${p.pages[2]}</h2><p>安全管理と記録保全。制限資料へつながる言葉だけが残っている。</p></article>
  </section>
</main>`;
  write(path.join(root, "index.html"), officialPage(p, "official/index.html", `${p.brand} 公式サイト`, indexBody, 1));

  const pages = [
    ["about", p.pages[0], "通常案内", "利用者向けに整えられた説明です。けれど、閉鎖直前の記録だけ、通常より細かい時刻が残っています。"],
    ["facility", p.pages[1], "設備案内", "施設や設備の説明です。案内文の中に、後から塞がれた区画や通常使わない導線が混じっています。"],
    ["safety", p.pages[2], "安全管理", "安全管理の公開ページです。表向きは事故防止の説明ですが、記録保全と閲覧制限の語が残っています。"]
  ];
  for (const [slug, label, subtitle, desc] of pages) {
    const body = `<main class="stylish-sub">
  <section class="stylish-subhero">
    <p class="stylish-kicker">${subtitle}</p>
    <h1>${label}</h1>
    <p>${desc}</p>
  </section>
  <section class="stylish-detail">
    <div><h2>公開情報</h2><p>このページは作中の公式サイトとして公開されています。通常案内の体裁を保ちつつ、照合に必要な語を少しだけ残しています。</p></div>
    <dl>
      <div><dt>記録欄</dt><dd>閉鎖前後の時刻に追記があります。</dd></div>
      <div><dt>制限欄</dt><dd>一部資料は別サイトでの照合が必要です。</dd></div>
      <div><dt>備考</dt><dd>公開向けの文面と内部記録の表現が一致しません。</dd></div>
    </dl>
  </section>
</main>`;
    write(path.join(root, slug, "index.html"), officialPage(p, `official/${slug}/index.html`, `${label} | ${p.brand}`, body, 2));
  }
  for (const rel of ["web/official/index.html","web/official/about/index.html","web/official/facility/index.html","web/official/safety/index.html"]) syncProject(p.id, rel);
}

const css = `

.start-page .hero h1{word-break:keep-all;overflow-wrap:normal;text-wrap:balance}.start-page .hero p,.start-page .nav a{word-break:keep-all;overflow-wrap:normal}.stylish-site{background:#f6f8f8;color:#14232b;font-family:"Yu Gothic","Meiryo",sans-serif}.stylish-site h1,.stylish-site h2,.stylish-site h3,.stylish-site p,.stylish-site a,.stylish-site dt,.stylish-site dd{word-break:keep-all;overflow-wrap:normal}.stylish-header{position:sticky;top:0;z-index:20;min-height:76px;display:flex;align-items:center;justify-content:space-between;gap:24px;padding:0 max(18px,calc((100vw - 1180px)/2));background:rgba(255,255,255,.86);backdrop-filter:blur(18px);border-bottom:1px solid rgba(20,35,43,.08)}.stylish-logo{text-decoration:none;color:#132936;display:grid}.stylish-logo span{font-weight:700}.stylish-logo small{color:#687c86;font-size:.74rem;letter-spacing:.12em;text-transform:uppercase}.stylish-header nav{display:flex;gap:16px;flex-wrap:wrap}.stylish-header nav a{text-decoration:none;color:#263d49}.stylish-hero{min-height:720px;display:grid;grid-template-columns:minmax(0,1fr) minmax(360px,46%);gap:36px;align-items:center;width:min(1180px,calc(100% - 32px));margin:auto;padding:64px 0}.stylish-kicker{font-size:.76rem;letter-spacing:.18em;color:#5d7c8c;font-weight:700}.stylish-hero h1,.stylish-subhero h1{font-family:"Yu Mincho","Hiragino Mincho ProN",Georgia,serif;font-weight:500;font-size:clamp(2.3rem,5vw,5.2rem);line-height:1.06;margin:.2rem 0 18px;color:#102733}.stylish-hero p,.stylish-subhero p{max-width:680px;color:#4e6570}.stylish-actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:26px}.stylish-actions a{display:inline-flex;align-items:center;justify-content:center;min-height:46px;padding:0 18px;border-radius:999px;background:#123647;color:#fff;text-decoration:none}.stylish-actions a+ a{background:#fff;color:#123647;border:1px solid #c9d7dd}.stylish-slider{position:relative;min-height:480px;overflow:hidden;border-radius:28px;box-shadow:0 28px 90px rgba(15,35,45,.18)}.stylish-slider img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;animation:stylishSlide 12s infinite}.stylish-slider img:nth-child(2){animation-delay:6s}.stylish-band{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1px;background:#123647;color:#eef8fb}.stylish-band article{margin:0;border:0;background:rgba(255,255,255,.06);padding:32px}.stylish-band span{display:block;width:42px;height:2px;background:#9ec4d0;margin-bottom:22px}.stylish-band h2{font-family:"Yu Mincho","Hiragino Mincho ProN",Georgia,serif;font-weight:500;color:#fff}.stylish-band p{color:#c8dce3}.stylish-sub{width:min(1080px,calc(100% - 32px));margin:auto;padding:70px 0}.stylish-subhero{border-bottom:1px solid #d8e3e7;padding-bottom:28px}.stylish-detail{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:28px}.stylish-detail>div,.stylish-detail dl{background:#fff;border:1px solid #d8e3e7;padding:24px}.stylish-detail dl{margin:0}.stylish-detail dl div{border-top:1px solid #e3ecef;padding:14px 0}.stylish-detail dl div:first-child{border-top:0}.stylish-detail dt{font-weight:700;color:#123647}.stylish-detail dd{margin:0;color:#4e6570}@keyframes stylishSlide{0%{opacity:0;transform:scale(1.03)}10%{opacity:1}45%{opacity:1}55%{opacity:0;transform:scale(1.08)}100%{opacity:0;transform:scale(1.08)}}@media(max-width:820px){.stylish-header,.stylish-hero,.stylish-band,.stylish-detail{grid-template-columns:1fr}.stylish-header{align-items:flex-start;flex-direction:column;padding-top:14px;padding-bottom:14px}.stylish-slider{min-height:320px}}
`;

for (const p of projects) {
  updateStartPage(p);
  createStylishOfficial(p);
  const cssPath = path.join(base, p.id, "web/site.css");
  fs.appendFileSync(cssPath, css, "utf8");
  syncProject(p.id, "web/site.css");
  fs.appendFileSync(path.join(base, p.id, "HANDOFF.md"), `

## 2026-05-19 凝った作中サイト最低1つルール反映

- 開始ページの作品タイトルに wbr を追加し、改行ルールを強化。
- 開始ページに start-page クラスを付与し、タイトル/導入/ボタンの word-break を keep-all にした。
${p.skipOfficial ? "- 既存の現代医療機関風公式サイトを、この作品の凝った作中サイトとして維持。\n" : "- 公式系サイトを複数ページ構成のスタイリッシュな作中サイトへ刷新。\n"}
- Booth用フォルダ側にも反映。
`, "utf8");
}

console.log("applied stylish official site rule to advanced 10");
