import fs from "node:fs";
import path from "node:path";

const root = "C:/Users/kogit/Documents/Codex/NamikazeFerryMystery";
const booth = "C:/Users/kogit/Documents/Codex/NamikazeFerryMystery_BoothPackage/NamikazeFerryMystery_Booth_v1";

function write(rel, text) {
  const file = path.join(root, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, text, "utf8");
}

function sync(rel) {
  const src = path.join(root, rel);
  const dst = path.join(booth, rel);
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  fs.copyFileSync(src, dst);
}

const main = `<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>入口 | 波風フェリー 片道航路記録事件</title>
<link rel="stylesheet" href="site.css">
</head>
<body class="premium ferry-premium">
<div class="premium-bg" style="--hero:url('./assets/ferry-terminal.png')"></div>
<header class="wrap topbar"><div class="brand">NAMIKAZE FERRY</div><div class="small">上級編 / 想定3〜5時間</div></header>
<main>
  <section class="wrap hero ferry-hero">
    <div>
      <p class="small">ADVANCED MOCKUMENTARY</p>
      <h1>波風フェリー<wbr>片道航路記録事件</h1>
      <p>引退した沿岸フェリーの航路照会、乗船名簿、潮位記録、入港申告を横断し、2010年6月21日の片道航路に残った不一致を復元します。</p>
      <div class="nav">
        <a href="./route/index.html" target="_blank" rel="noopener"><strong>航路照会</strong><span>便名と桟橋を照合</span></a>
        <a href="./manifest/index.html" target="_blank" rel="noopener"><strong>乗船名簿</strong><span>券番号と不一致</span></a>
        <a href="./tide/index.html" target="_blank" rel="noopener"><strong>潮位照合</strong><span>潮位と入港時刻</span></a>
        <a href="./investigate/index.html"><strong>照合ノート</strong><span>章ごとに回答</span></a>
      </div>
    </div>
  </section>
  <section class="wrap section grid two">
    <div class="panel"><h2>遊び方</h2><p>この作品では、メールや管理画面ではなく、航路照会端末、乗船名簿、潮位照合を行き来して調査を進めます。</p><p>便名、桟橋、潮位、券番号、入港申告をメモし、資料照合ノートに戻って回答してください。</p></div>
    <div class="panel"><h2>Background</h2><p>波風フェリーの最終便には、出港記録だけが整い、入港記録だけが少し遅れて残っています。</p><p>片道航路の違和感は、誰が乗ったかではなく、誰が「乗客なし」にしたかで形を変えます。</p></div>
  </section>
</main>
<script src="textflow.js"></script>
</body>
</html>`;

const route = `<!doctype html>
<html lang="ja">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>航路照会 | 波風フェリー</title><link rel="stylesheet" href="../site.css"></head>
<body class="ferry-terminal">
<header class="ferry-header"><div><span>ROUTE INQUIRY</span><h1>航路照会端末</h1></div><nav><a href="../manifest/index.html">乗船名簿</a><a href="../tide/index.html">潮位照合</a></nav></header>
<main class="ferry-terminal__main">
  <section class="route-hero">
    <div><p class="ferry-kicker">NAMIKAZE LOCAL ROUTE / ARCHIVED</p><h2>便名、<wbr>桟橋、<wbr>入港申告を<wbr>重ねる。</h2><p>旧端末の航路照会です。便名または桟橋名で検索すると、関連する航路記録が表示されます。</p></div>
    <img src="../assets/ferry-terminal.png" alt="">
  </section>
  <section class="route-search">
    <form onsubmit="lookup();return false"><input id="routeQ" aria-label="航路検索" placeholder="便名、桟橋、時刻を入力"><button>照会</button></form>
    <p class="muted small">例: FRY-0621 / 旧第二桟橋 / 01:42</p>
  </section>
  <section id="routeResults" class="route-results"></section>
</main>
<script>
const routes=[
{keys:["FRY-0621","旧第二桟橋","01:42"],title:"FRY-0621 旧第二桟橋発",meta:"2010/06/21 01:42 / 旧第二桟橋",body:"出港側では運航管理員の瀬戸真琴が確認済み。入港申告は02:18にずれている。",href:"../official/index.html"},
{keys:["予備乗船券","青い封筒"],title:"予備乗船券 使用記録",meta:"券番号欄に欠番あり",body:"乗船名簿側で青い封筒と照合してください。",href:"../manifest/index.html"},
{keys:["潮位ログC","02:18"],title:"潮位ログC 入港照合",meta:"潮位と入港申告",body:"機関室側通路の記録は潮位照合端末に残っています。",href:"../tide/index.html"}
];
function lookup(){
 const q=document.getElementById("routeQ").value.trim();
 const hits=routes.filter(r=>!q||r.keys.some(k=>k.includes(q)||q.includes(k)));
 document.getElementById("routeResults").innerHTML=hits.map(r=>'<a class="route-card" href="'+r.href+'" target="_blank" rel="noopener"><span>'+r.meta+'</span><h3>'+r.title+'</h3><p>'+r.body+'</p></a>').join("");
}
lookup();
</script>
<script src="../textflow.js"></script>
</body>
</html>`;

const manifest = `<!doctype html>
<html lang="ja">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>乗船名簿 | 波風フェリー</title><link rel="stylesheet" href="../site.css"></head>
<body class="ferry-manifest">
<header class="manifest-header"><span>PASSENGER MANIFEST</span><h1>乗船名簿照合</h1><p>公開名簿、予備乗船券、欠番券を照合するための端末写し。</p></header>
<main class="manifest-main">
  <section class="manifest-board">
    <article><span>便名</span><strong>FRY-0621</strong><p>2010/06/21 01:42 旧第二桟橋発</p></article>
    <article><span>公開乗客数</span><strong>乗客なし</strong><p>新聞発表と一致。ただし予備券欄は欠番。</p></article>
    <article><span>照合物</span><strong>青い封筒</strong><p>古いブログと鍵台帳に同じ色が残る。</p></article>
  </section>
  <section class="manifest-table">
    <div class="manifest-row head"><span>券区分</span><span>記録</span><span>照合先</span></div>
    <div class="manifest-row"><span>通常券</span><span>乗客なし</span><span>新聞縮刷版</span></div>
    <div class="manifest-row"><span>予備乗船券</span><span>欠番</span><span>航路照会</span></div>
    <div class="manifest-row"><span>封筒控え</span><span>青い封筒</span><span>ブログ / 鍵台帳</span></div>
  </section>
  <section class="manifest-note"><h2>名簿メモ</h2><p>乗客なしという語は、乗っていないことではなく、名簿から外されたことを示している可能性があります。</p></section>
</main>
<script src="../textflow.js"></script>
</body>
</html>`;

const tide = `<!doctype html>
<html lang="ja">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>潮位照合 | 波風フェリー</title><link rel="stylesheet" href="../site.css"></head>
<body class="tide-console">
<header class="tide-header"><div><span>TIDE / ARRIVAL CHECK</span><h1>潮位照合端末</h1></div><nav><a href="../route/index.html">航路照会</a><a href="../manifest/index.html">乗船名簿</a></nav></header>
<main class="tide-main">
  <section class="tide-visual"><img src="../assets/ferry-records.png" alt=""><div><p class="ferry-kicker">LOG C</p><h2>潮位と<wbr>入港申告の<wbr>ずれ。</h2><p>潮位ログC、入港申告、機関室側通路の記録を照合します。</p></div></section>
  <section class="tide-grid">
    <article><time>01:42</time><h3>出港</h3><p>旧第二桟橋。運航管理員の確認あり。</p></article>
    <article><time>02:18</time><h3>入港申告</h3><p>潮位ログCと一致。公開時刻より遅い。</p></article>
    <article><time>欠測</time><h3>潮位欄</h3><p>通常値ではなく空白扱い。資料目録では欠測。</p></article>
  </section>
  <section class="tide-note"><h2>照合メモ</h2><p>入港申告が遅れた時間帯に、機関室側通路の記録が残っています。航路照会、乗船名簿、潮位照合を往復してください。</p></section>
</main>
<script src="../textflow.js"></script>
</body>
</html>`;

const css = `

.ferry-premium .premium-bg:after{background:radial-gradient(circle at 20% 12%,rgba(130,205,255,.22),transparent 34%),linear-gradient(90deg,rgba(3,9,15,.92),rgba(3,9,15,.46),rgba(3,9,15,.9))}.ferry-hero h1{font-family:"Yu Mincho","Hiragino Mincho ProN",Georgia,serif;font-weight:500;text-wrap:balance}.ferry-terminal,.ferry-manifest,.tide-console{background:#061017;color:#dfeff7;min-height:100vh}.ferry-header,.manifest-header,.tide-header{padding:24px max(16px,calc((100vw - 1180px)/2));border-bottom:1px solid rgba(140,190,215,.22);background:rgba(6,16,23,.9);display:flex;justify-content:space-between;gap:20px;align-items:center}.manifest-header{display:block}.ferry-header span,.manifest-header span,.tide-header span,.ferry-kicker{color:#85b7c8;font-size:.76rem;letter-spacing:.16em}.ferry-header h1,.manifest-header h1,.tide-header h1{margin:.2rem 0;color:#f2fbff}.ferry-header a,.tide-header a{text-decoration:none;color:#e8f8ff;border:1px solid rgba(140,190,215,.28);padding:9px 12px}.ferry-terminal__main,.manifest-main,.tide-main{width:min(1180px,calc(100% - 32px));margin:auto;padding:44px 0 78px}.route-hero,.tide-visual{display:grid;grid-template-columns:minmax(0,1fr) minmax(320px,44%);gap:28px;align-items:end}.route-hero h2,.tide-visual h2{font-family:"Yu Mincho","Hiragino Mincho ProN",Georgia,serif;font-weight:500;font-size:clamp(2rem,4.7vw,4.5rem);line-height:1.08;margin:.2rem 0 16px;color:#f4fbff}.route-hero p,.tide-visual p{color:#9fb7c3}.route-hero img,.tide-visual img{width:100%;aspect-ratio:4/3;object-fit:cover;border:1px solid rgba(140,190,215,.2);box-shadow:0 28px 90px rgba(0,0,0,.35)}.route-search{margin:26px 0}.route-search form{display:flex;gap:10px;background:rgba(255,255,255,.06);border:1px solid rgba(140,190,215,.22);padding:10px}.route-search input{flex:1;background:#02070b;color:#fff;border:1px solid rgba(140,190,215,.22);padding:13px}.route-search button{background:#dcecf4;color:#061017;border:0;padding:0 18px}.route-results{display:grid;gap:12px}.route-card{display:block;text-decoration:none;color:#e9f8ff;border:1px solid rgba(140,190,215,.22);background:rgba(255,255,255,.04);padding:18px}.route-card span{color:#85b7c8}.route-card h3{margin:.3rem 0}.route-card p{color:#9fb7c3}.manifest-board,.tide-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1px;background:rgba(140,190,215,.2);border:1px solid rgba(140,190,215,.22);margin-bottom:24px}.manifest-board article,.tide-grid article{margin:0;border:0;background:#0a1821;padding:20px}.manifest-board span{color:#85b7c8}.manifest-board strong,.tide-grid time{display:block;color:#fff;font-size:1.45rem;margin:6px 0}.manifest-table{border:1px solid rgba(140,190,215,.22);margin-bottom:18px}.manifest-row{display:grid;grid-template-columns:180px 1fr 1fr;border-top:1px solid rgba(140,190,215,.16)}.manifest-row:first-child{border-top:0}.manifest-row span{padding:14px}.manifest-row.head{background:#102938;color:#a8cddb}.manifest-note,.tide-note{border:1px solid rgba(140,190,215,.22);background:rgba(255,255,255,.04);padding:20px}.ferry-terminal h1,.ferry-terminal h2,.ferry-terminal h3,.ferry-terminal p,.ferry-terminal a,.ferry-manifest h1,.ferry-manifest h2,.ferry-manifest h3,.ferry-manifest p,.tide-console h1,.tide-console h2,.tide-console h3,.tide-console p{word-break:keep-all;overflow-wrap:normal}@media(max-width:820px){.ferry-header,.tide-header,.route-hero,.tide-visual,.manifest-board,.tide-grid,.manifest-row{grid-template-columns:1fr}.ferry-header,.tide-header{align-items:flex-start;flex-direction:column}.route-search form{flex-direction:column}}
`;

write("web/index.html", main);
write("web/route/index.html", route);
write("web/manifest/index.html", manifest);
write("web/tide/index.html", tide);
fs.appendFileSync(path.join(root, "web/site.css"), css, "utf8");

for (const rel of ["web/index.html", "web/route/index.html", "web/manifest/index.html", "web/tide/index.html", "web/site.css"]) sync(rel);

fs.appendFileSync(path.join(root, "HANDOFF.md"), `

## 2026-05-19 航路照会型テンプレ反映

- CrimsonClinicMysteryで固めた「媒体ごとの凝ったレイアウト」「豪華な入口」「題材固有の進行ギミック」を反映。
- NamikazeFerryMysteryでは、メール/管理画面ではなく、航路照会、乗船名簿、潮位照合を主導線に変更。
- ChatGPT生成画像を2枚追加し、フェリー桟橋と運航記録室の画像として使用。
- 入口の主導線を、航路照会、乗船名簿、潮位照合、照合ノートに変更。
- Booth用フォルダ側にも反映。
`, "utf8");

console.log("applied ferry route template");
