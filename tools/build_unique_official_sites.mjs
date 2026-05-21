import fs from "node:fs/promises";
import path from "node:path";

const root = "C:/Users/kogit/Documents/Codex";

const projects = [
  {
    dir: "AbyssalObservatoryMystery",
    title: "黒潮海底観測所",
    brand: "KUROSHIO ABYSSAL OBSERVATORY",
    kicker: "DEEP SEA RESEARCH",
    headline: "海の底で、<wbr>まだ動いている<wbr>観測線。",
    lead: "黒潮海底観測所は、沖合の海底ケーブルを用いて水圧、潮流、低周波音を観測する研究施設です。観測概要、施設設備、安全管理、公開データに関するお知らせを掲載しています。",
    sections: ["観測概要", "海底設備", "安全管理"],
    cue: "2014年11月18日の第三区画ログは、潮流記録の再確認後に03:16へ訂正しました。",
    feature: "海底ケーブル、観測室、潮流ログ、低周波音記録",
    image: "assets/hero-observatory.png",
    palette: ["#02151f", "#005a74", "#58d7ff", "#e8fbff"],
    mode: "abyss"
  },
  {
    dir: "AonagiDataCenterMystery",
    title: "青凪データセンター",
    brand: "AONAGI DATA CENTER",
    kicker: "SECURE INFRASTRUCTURE",
    headline: "静かな<wbr>街の奥で、<wbr>記録だけが<wbr>冷えている。",
    lead: "青凪データセンターは、地域企業向けのハウジング、バックアップ、災害対策保管を行う設備拠点です。設備仕様、入館管理、保守体制に関する情報を公開しています。",
    sections: ["設備仕様", "入館管理", "保守体制"],
    cue: "2005年9月14日のバックアップ処理は、B棟地下ラックの照合後に02:44へ修正されました。",
    feature: "ラック列、空調回廊、入館ログ、バックアップ媒体",
    image: "assets/hero.png",
    palette: ["#07111f", "#20507a", "#9de7ff", "#f2f7ff"],
    mode: "data"
  },
  {
    dir: "GinreiDepartmentMystery",
    title: "銀鈴百貨店",
    brand: "GINREI DEPARTMENT STORE",
    kicker: "URBAN RETAIL HERITAGE",
    headline: "街の<wbr>灯りを<wbr>集める、<wbr>閉店後の<wbr>百貨店。",
    lead: "銀鈴百貨店は、地域の暮らしと催事を支えてきた都市型百貨店です。フロア案内、催事、テナント、安全管理に関するお知らせを掲載しています。",
    sections: ["フロア案内", "催事と売場", "安全管理"],
    cue: "閉店後の搬入口記録は、警備日誌の確認後に22:18へ修正されています。",
    feature: "吹き抜け、催事場、搬入口、警備室",
    image: "assets/hero.png",
    palette: ["#2b1625", "#8b2f57", "#f5b7c8", "#fff5f8"],
    mode: "store"
  },
  {
    dir: "HakurouMuseumMystery",
    title: "白楼資料館",
    brand: "HAKUROU MUSEUM",
    kicker: "ARCHIVE AND EXHIBITION",
    headline: "展示室の<wbr>余白に、<wbr>保管番号が<wbr>残る。",
    lead: "白楼資料館は、郷土資料、収蔵品、調査報告を保存公開する地域資料館です。展示、収蔵庫、調査閲覧、安全管理に関する情報を案内します。",
    sections: ["展示案内", "収蔵庫", "閲覧利用"],
    cue: "収蔵箱B-17は、貸出記録の再点検後に非公開区分へ移されています。",
    feature: "展示ケース、収蔵箱、閲覧票、燻蒸室",
    image: "assets/hero.png",
    palette: ["#1b1612", "#87613d", "#e4c898", "#fff8ed"],
    mode: "museum"
  },
  {
    dir: "KarasunoCableMystery",
    title: "烏野ケーブル",
    brand: "KARASUNO CABLE NETWORK",
    kicker: "LOCAL NETWORK SERVICE",
    headline: "山あいの<wbr>町へ、<wbr>細い信号が<wbr>届いている。",
    lead: "烏野ケーブルは、地域向け放送、通信、保守対応を行うケーブルネットワーク事業者です。サービス、設備、保守、緊急告知放送について案内します。",
    sections: ["サービス", "中継設備", "保守情報"],
    cue: "中継局K-04の夜間保守記録は、停波時刻の確認後に00:37へ更新されました。",
    feature: "中継局、保守車両、同軸回線、緊急告知放送",
    image: "assets/hero.png",
    palette: ["#081b15", "#176f5b", "#89e0c6", "#effff9"],
    mode: "cable"
  },
  {
    dir: "KurobaraCinemaMystery",
    title: "黒薔薇シネマ",
    brand: "KUROBARA CINEMA",
    kicker: "INDEPENDENT THEATER",
    headline: "幕が<wbr>下りても、<wbr>映写室は<wbr>まだ明るい。",
    lead: "黒薔薇シネマは、旧市街の単館映画館です。上映案内、館内設備、貸館、安全管理に関する情報を掲載しています。",
    sections: ["上映案内", "館内設備", "映写管理"],
    cue: "第2映写機の稼働記録は、フィルム缶番号の確認後に21:09へ修正されています。",
    feature: "赤い客席、映写窓、フィルム缶、非常灯",
    image: "assets/hero.png",
    palette: ["#160713", "#6d163d", "#ff8ab1", "#fff0f7"],
    mode: "cinema"
  },
  {
    dir: "MisakiLighthouseMystery",
    title: "岬灯台記念館",
    brand: "MISAKI LIGHTHOUSE MUSEUM",
    kicker: "COASTAL LIGHT HERITAGE",
    headline: "霧の<wbr>向こうで、<wbr>灯りの<wbr>間隔が<wbr>ずれる。",
    lead: "岬灯台記念館は、灯台の歴史、航路標識、気象観測資料を紹介する展示施設です。展示、灯室、資料閲覧、安全管理について案内します。",
    sections: ["展示案内", "灯室と資料", "気象観測"],
    cue: "霧笛記録は、気象台の視程表確認後に04:12へ訂正されました。",
    feature: "灯室、霧笛、視程表、海霧観測",
    image: "assets/hero.png",
    palette: ["#081826", "#116d8a", "#ffd76b", "#f1fbff"],
    mode: "lighthouse"
  },
  {
    dir: "MizukageDamMystery",
    title: "水影ダム管理所",
    brand: "MIZUKAGE DAM OFFICE",
    kicker: "WATER CONTROL FACILITY",
    headline: "湖面は<wbr>静かに、<wbr>ゲートだけが<wbr>記録する。",
    lead: "水影ダム管理所は、治水、利水、設備保守を行う管理施設です。放流情報、見学案内、設備点検、安全管理に関する情報を掲載しています。",
    sections: ["放流情報", "設備点検", "安全管理"],
    cue: "取水ゲート3の開度記録は、水位表の確認後に18:26へ更新されています。",
    feature: "堤体、取水ゲート、水位表、監査廊",
    image: "assets/hero.png",
    palette: ["#071b27", "#0d6381", "#9ad7e8", "#edf9ff"],
    mode: "dam"
  },
  {
    dir: "ShiranuiOnsenMystery",
    title: "不知火温泉",
    brand: "SHIRANUI ONSEN",
    kicker: "HOT SPRING RYOKAN",
    headline: "湯けむりの<wbr>奥で、<wbr>宿帳だけが<wbr>湿っている。",
    lead: "不知火温泉は、山あいに佇む源泉かけ流しの温泉旅館です。客室、温泉、食事、館内安全についてご案内します。",
    sections: ["温泉", "客室と食事", "館内安全"],
    cue: "離れ客室の鍵受け渡し時刻は、宿帳確認後に23:41へ修正されています。",
    feature: "露天風呂、離れ客室、宿帳、湯雨戸",
    image: "assets/hero.png",
    palette: ["#1f1712", "#8a4934", "#f2c6a0", "#fff7ef"],
    mode: "onsen"
  },
  {
    dir: "TokiwaBroadcastMystery",
    title: "常盤放送",
    brand: "TOKIWA BROADCASTING",
    kicker: "LOCAL BROADCAST STATION",
    headline: "送出卓の<wbr>赤い灯が、<wbr>一度だけ<wbr>遅れる。",
    lead: "常盤放送は、地域ニュース、生活情報、災害告知を届けるローカル放送局です。番組、スタジオ、送出設備、安全運用について案内します。",
    sections: ["番組案内", "スタジオ", "送出運用"],
    cue: "深夜帯の送出ログは、番組表の確認後に01:05へ訂正されています。",
    feature: "スタジオ、送出卓、番組表、同録テープ",
    image: "assets/hero.png",
    palette: ["#111322", "#303f8d", "#f46c8c", "#f4f6ff"],
    mode: "broadcast"
  },
  {
    dir: "TsukishiroHotelMystery",
    title: "月白ホテル",
    brand: "TSUKISHIRO HOTEL",
    kicker: "BOUTIQUE URBAN HOTEL",
    headline: "夜の<wbr>ロビーに、<wbr>監査票だけが<wbr>残る。",
    lead: "月白ホテルは、旧市街に建つブティックホテルです。客室、レストラン、宴会、館内安全、夜間対応に関する情報を掲載しています。",
    sections: ["客室案内", "館内施設", "安全管理"],
    cue: "夜間監査票の客室番号は、カードキー履歴確認後に00:28へ更新されています。",
    feature: "ロビー、客室階、夜間監査、カードキー",
    image: "assets/hero.png",
    palette: ["#101523", "#6d789d", "#d7b46a", "#f7f4ee"],
    mode: "hotel"
  }
];

function esc(s) {
  return s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

async function exists(file) {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
}

async function pickImage(project, preferred) {
  const web = path.join(root, project.dir, "web");
  if (await exists(path.join(web, preferred))) return preferred;
  const assets = path.join(web, "assets");
  try {
    const files = await fs.readdir(assets);
    const png = files.find((f) => f.endsWith(".png"));
    if (png) return `assets/${png}`;
  } catch {}
  return "assets/hero.png";
}

function relFor(pageDepth, image) {
  return `${"../".repeat(pageDepth)}${image}`;
}

function css(p) {
  const [ink, main, accent, paper] = p.palette;
  const modeClass = `official-${p.mode}`;
  return `.${modeClass}{--ink:${ink};--main:${main};--accent:${accent};--paper:${paper};--line:color-mix(in srgb,var(--main) 24%,white);margin:0;background:var(--paper);color:var(--ink);font-family:"Hiragino Sans","Yu Gothic","Yu Gothic UI","Meiryo",sans-serif;letter-spacing:0}.${modeClass} *{box-sizing:border-box}.${modeClass} h1,.${modeClass} h2,.${modeClass} h3,.${modeClass} p,.${modeClass} a,.${modeClass} li,.${modeClass} span,.${modeClass} strong{word-break:keep-all;overflow-wrap:normal;text-wrap:pretty}.${modeClass} img{display:block;max-width:100%}.of-header{position:sticky;top:0;z-index:20;display:flex;justify-content:space-between;align-items:center;gap:20px;min-height:78px;padding:0 max(18px,calc((100vw - 1280px)/2));background:color-mix(in srgb,var(--paper) 86%,white);backdrop-filter:blur(18px);border-bottom:1px solid color-mix(in srgb,var(--main) 18%,transparent)}.of-logo{text-decoration:none;color:var(--ink);display:grid}.of-logo span{font-weight:800;font-size:1.08rem}.of-logo small{font-size:.68rem;letter-spacing:.18em;color:var(--main)}.of-header nav{display:flex;gap:8px;flex-wrap:wrap}.of-header nav a{text-decoration:none;color:var(--ink);border:1px solid color-mix(in srgb,var(--main) 20%,transparent);background:rgba(255,255,255,.56);border-radius:999px;padding:9px 13px}.of-hero{position:relative;width:min(1280px,calc(100% - 28px));margin:auto;min-height:840px;display:grid;grid-template-columns:minmax(330px,.82fr) minmax(520px,1.18fr);gap:34px;align-items:center;padding:46px 0 132px}.of-hero:before{content:"";position:absolute;inset:24px 0 110px;opacity:.36;background:repeating-linear-gradient(90deg,transparent 0 54px,color-mix(in srgb,var(--main) 13%,transparent) 55px),repeating-linear-gradient(0deg,transparent 0 54px,color-mix(in srgb,var(--main) 13%,transparent) 55px);mask-image:radial-gradient(circle at 62% 48%,#000,transparent 72%)}.of-copy{position:relative;z-index:2}.of-kicker{font-size:.74rem;letter-spacing:.2em;color:var(--main);font-weight:800}.of-copy h1,.of-subhead h1,.of-feature h2{font-family:"Hiragino Sans","Yu Gothic","Yu Gothic UI","BIZ UDPGothic","Meiryo",sans-serif;font-weight:700;font-size:clamp(2.6rem,5.5vw,6.1rem);line-height:1.12;letter-spacing:.02em;margin:.2rem 0 22px;color:var(--ink);text-wrap:balance}.of-copy p,.of-subhead p,.of-feature p{color:color-mix(in srgb,var(--ink) 70%,white);max-width:720px}.of-actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:28px}.of-actions a{display:inline-flex;align-items:center;justify-content:center;min-height:48px;border-radius:999px;padding:0 18px;text-decoration:none;background:var(--ink);color:white}.of-actions a+ a{background:color-mix(in srgb,var(--accent) 72%,white);color:var(--ink);border:1px solid color-mix(in srgb,var(--main) 18%,transparent)}.of-media{position:relative;z-index:2;min-height:680px;border-radius:58px 58px 10px 58px;overflow:hidden;box-shadow:0 44px 120px color-mix(in srgb,var(--ink) 26%,transparent);background:var(--ink)}.of-media img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:saturate(1.05) contrast(1.02)}.of-media:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 45%,color-mix(in srgb,var(--ink) 54%,transparent) 100%)}.of-card{position:absolute;z-index:3;left:22px;right:22px;bottom:22px;background:color-mix(in srgb,var(--paper) 88%,white);backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,.5);border-radius:28px;padding:20px}.of-card span{color:var(--main);font-size:.8rem}.of-card strong{display:block;font-size:1.32rem;margin:4px 0}.of-strip{position:relative;z-index:4;width:min(1280px,calc(100% - 28px));margin:-72px auto 0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));background:linear-gradient(135deg,var(--ink),var(--main));color:white;border-radius:32px;overflow:hidden;box-shadow:0 28px 90px color-mix(in srgb,var(--ink) 18%,transparent)}.of-strip div{padding:28px;border-left:1px dashed rgba(255,255,255,.24)}.of-strip div:first-child{border-left:0}.of-strip span{color:color-mix(in srgb,var(--accent) 70%,white);font-size:.75rem;letter-spacing:.14em}.of-strip strong{display:block;font-size:1.35rem;margin:6px 0}.of-strip p{color:rgba(255,255,255,.78);margin:0}.of-feature{width:min(1280px,calc(100% - 28px));margin:auto;padding:90px 0;display:grid;grid-template-columns:.72fr 1.28fr;gap:38px;align-items:center}.of-feature img{width:100%;min-height:500px;object-fit:cover;border-radius:12px 60px 60px 60px;box-shadow:0 34px 100px color-mix(in srgb,var(--ink) 16%,transparent)}.of-grid{width:min(1280px,calc(100% - 28px));margin:0 auto 90px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}.of-grid a,.of-info article{display:block;text-decoration:none;color:var(--ink);background:rgba(255,255,255,.76);border:1px solid color-mix(in srgb,var(--main) 18%,transparent);border-radius:28px;padding:24px}.of-grid span,.of-info span{font-size:.75rem;letter-spacing:.16em;color:var(--main);font-weight:800}.of-grid h2,.of-info h2{font-family:"Hiragino Sans","Yu Gothic","Yu Gothic UI","BIZ UDPGothic","Meiryo",sans-serif;font-weight:700}.of-sub{width:min(1120px,calc(100% - 32px));margin:auto;padding:74px 0 92px}.of-subhead{border-bottom:1px solid color-mix(in srgb,var(--main) 20%,transparent);padding-bottom:34px}.of-subhead h1{font-size:clamp(2.35rem,4.8vw,5rem)}.of-info{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin-top:30px}.of-photo{display:grid;grid-template-columns:minmax(420px,56%) 1fr;gap:32px;align-items:center;margin-top:30px}.of-photo img{width:100%;aspect-ratio:16/11;object-fit:cover;border-radius:52px 12px 52px 52px;box-shadow:0 34px 100px color-mix(in srgb,var(--ink) 16%,transparent)}.of-note{margin-top:18px;background:rgba(255,255,255,.76);border:1px solid color-mix(in srgb,var(--main) 20%,transparent);border-radius:28px;padding:24px}.official-store .of-hero{grid-template-columns:minmax(420px,1.05fr) minmax(460px,.95fr)}.official-store .of-media{border-radius:18px;min-height:720px}.official-museum .of-hero{grid-template-columns:minmax(0,1fr);padding-top:34px}.official-museum .of-media{min-height:560px;border-radius:12px 80px 12px 80px}.official-cinema{background:#130710;color:#fff}.official-cinema .of-copy p,.official-cinema .of-feature p{color:#ead2de}.official-cinema .of-header{background:rgba(19,7,16,.78)}.official-cinema .of-logo,.official-cinema .of-header nav a{color:#fff}.official-cinema .of-grid a,.official-cinema .of-info article,.official-cinema .of-note{background:rgba(255,255,255,.08);color:#fff}.official-dam .of-media{border-radius:10px 10px 80px 10px}.official-onsen .of-hero{grid-template-columns:minmax(380px,.9fr) minmax(540px,1.1fr)}.official-onsen .of-media{border-radius:80px 16px 80px 16px}.official-broadcast .of-media{border-radius:8px;min-height:650px}.official-data .of-media{border-radius:14px;clip-path:polygon(0 0,100% 0,100% 92%,92% 100%,0 100%)}.official-lighthouse .of-media{border-radius:220px 220px 18px 18px}.official-abyss .of-media{border-radius:50%;min-height:660px}.official-hotel .of-media{border-radius:10px 70px 10px 70px}@media(max-width:820px){.of-header,.of-hero,.of-strip,.of-feature,.of-grid,.of-info,.of-photo,.official-store .of-hero,.official-onsen .of-hero{grid-template-columns:1fr}.of-header{align-items:flex-start;flex-direction:column;padding-top:14px;padding-bottom:14px}.of-hero{min-height:auto;padding:28px 0 112px}.of-copy h1{font-size:clamp(2.2rem,11vw,4rem)}.of-media,.official-abyss .of-media{min-height:470px;border-radius:34px}.of-strip{margin-top:-48px}.of-feature img{min-height:330px}}`;
}

function topHtml(p, image) {
  const cls = `official-${p.mode}`;
  return `<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(p.title)}公式サイト | ${esc(p.title)}</title>
<link rel="stylesheet" href="../site.css">
<link rel="stylesheet" href="./official.css">
</head>
<body class="${cls}">
<header class="of-header">
  <a class="of-logo" href="./index.html"><span>${esc(p.title)}</span><small>${esc(p.brand)}</small></a>
  <nav aria-label="公式サイト内メニュー"><a href="./about/index.html">${esc(p.sections[0])}</a><a href="./facility/index.html">${esc(p.sections[1])}</a><a href="./safety/index.html">${esc(p.sections[2])}</a></nav>
</header>
<main>
  <section class="of-hero">
    <div class="of-copy">
      <p class="of-kicker">${esc(p.kicker)}</p>
      <h1>${p.headline}</h1>
      <p>${esc(p.lead)}</p>
      <div class="of-actions"><a href="./about/index.html">${esc(p.sections[0])}を見る</a><a href="./safety/index.html">${esc(p.sections[2])}のお知らせ</a></div>
    </div>
    <div class="of-media"><img src="../${image}" alt=""><aside class="of-card"><span>IMPORTANT NOTICE</span><strong>${esc(p.title)}からのお知らせ</strong><p>${esc(p.cue)}</p></aside></div>
  </section>
  <section class="of-strip">
    <div><span>PUBLIC</span><strong>${esc(p.sections[0])}</strong><p>利用者向けに公開している通常案内です。</p></div>
    <div><span>FACILITY</span><strong>${esc(p.sections[1])}</strong><p>${esc(p.feature)}を確認できます。</p></div>
    <div><span>SAFETY</span><strong>${esc(p.sections[2])}</strong><p>点検、時刻、受付記録を随時更新しています。</p></div>
  </section>
  <section class="of-feature">
    <div><p class="of-kicker">FEATURE</p><h2>${esc(p.feature.split("、")[0])}を<wbr>中心に<wbr>ご案内します。</h2><p>${esc(p.title)}では、通常の利用案内と設備管理情報を分けて公開しています。古い記録を参照する場合は、日付、番号、担当窓口をご確認ください。</p></div>
    <img src="../${image}" alt="">
  </section>
  <section class="of-grid">
    <a href="./about/index.html"><span>01</span><h2>${esc(p.sections[0])}</h2><p>基本情報、利用方法、公開範囲。</p></a>
    <a href="./facility/index.html"><span>02</span><h2>${esc(p.sections[1])}</h2><p>施設、設備、利用時の注意。</p></a>
    <a href="./safety/index.html"><span>03</span><h2>${esc(p.sections[2])}</h2><p>安全管理、点検、訂正のお知らせ。</p></a>
  </section>
</main>
<script src="../textflow.js"></script>
</body>
</html>`;
}

function subHtml(p, image, kind) {
  const cls = `official-${p.mode}`;
  const idx = kind === "about" ? 0 : kind === "facility" ? 1 : 2;
  const title = p.sections[idx];
  const body = [
    `${p.title}の${title}ページです。利用者向けの基本情報と、公開対象になっている記録を掲載しています。`,
    `${p.feature}に関する設備情報をまとめています。見学、利用、問い合わせの際は、現地掲示と職員の案内に従ってください。`,
    `${p.title}では、安全確保のための点検、受付、時刻記録を保存しています。${p.cue}`
  ][idx];
  return `<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)} | ${esc(p.title)}</title>
<link rel="stylesheet" href="../../site.css">
<link rel="stylesheet" href="../official.css">
</head>
<body class="${cls}">
<header class="of-header">
  <a class="of-logo" href="../index.html"><span>${esc(p.title)}</span><small>${esc(p.brand)}</small></a>
  <nav aria-label="公式サイト内メニュー"><a href="../about/index.html">${esc(p.sections[0])}</a><a href="../facility/index.html">${esc(p.sections[1])}</a><a href="../safety/index.html">${esc(p.sections[2])}</a></nav>
</header>
<main class="of-sub">
  <section class="of-subhead"><p class="of-kicker">${esc(p.kicker)}</p><h1>${esc(title)}</h1><p>${esc(body)}</p></section>
  <section class="${idx === 1 ? "of-photo" : "of-info"}">
    ${idx === 1 ? `<img src="../../${image}" alt=""><div><p class="of-kicker">FACILITY</p><h2>${esc(p.feature.split("、")[0])}</h2><p>${esc(body)}</p><ul><li>${esc(p.feature.split("、")[1] || "管理区画")}を公開情報として整理しています。</li><li>夜間や点検時は一部区画の利用を制限します。</li><li>古い受付記録は日付と担当欄を確認してください。</li></ul></div>` : `<article><span>A</span><h2>通常案内</h2><p>利用者向けに公開している基本情報です。</p></article><article><span>B</span><h2>記録番号</h2><p>${esc(p.cue)}</p></article><article><span>C</span><h2>確認事項</h2><p>${esc(p.feature)}の記録を保存しています。</p></article>`}
  </section>
  <section class="of-note"><h2>お知らせ</h2><p>${esc(p.cue)}</p></section>
</main>
<script src="../../textflow.js"></script>
</body>
</html>`;
}

function addOfficialLink(html) {
  if (html.includes('href="./official/index.html"')) return html;
  const link = '<a href="./official/index.html" target="_blank" rel="noopener"><strong>公式サイト</strong><span>公式案内と設備情報</span></a>';
  return html.replace(/(<div class="(?:premium-nav|nav)">)/, `$1${link}`);
}

async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  for (const entry of await fs.readdir(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) await copyDir(s, d);
    else await fs.copyFile(s, d);
  }
}

for (const p of projects) {
  const web = path.join(root, p.dir, "web");
  const official = path.join(web, "official");
  const image = await pickImage(p, p.image);
  await fs.mkdir(path.join(official, "about"), { recursive: true });
  await fs.mkdir(path.join(official, "facility"), { recursive: true });
  await fs.mkdir(path.join(official, "safety"), { recursive: true });
  await fs.writeFile(path.join(official, "official.css"), css(p), "utf8");
  await fs.writeFile(path.join(official, "index.html"), topHtml(p, image), "utf8");
  await fs.writeFile(path.join(official, "about", "index.html"), subHtml(p, image, "about"), "utf8");
  await fs.writeFile(path.join(official, "facility", "index.html"), subHtml(p, image, "facility"), "utf8");
  await fs.writeFile(path.join(official, "safety", "index.html"), subHtml(p, image, "safety"), "utf8");
  const indexPath = path.join(web, "index.html");
  if (await exists(indexPath)) {
    const html = await fs.readFile(indexPath, "utf8");
    await fs.writeFile(indexPath, addOfficialLink(html), "utf8");
  }
  const boothRoot = path.join(root, `${p.dir}_BoothPackage`, `${p.dir}_Booth_v1`);
  if (await exists(boothRoot)) {
    const boothWeb = path.join(boothRoot, "web");
    await copyDir(official, path.join(boothWeb, "official"));
    const boothIndex = path.join(boothWeb, "index.html");
    if (await exists(boothIndex)) {
      const html = await fs.readFile(boothIndex, "utf8");
      await fs.writeFile(boothIndex, addOfficialLink(html), "utf8");
    }
  }
  console.log(`${p.dir}: official site rebuilt with ${image}`);
}
