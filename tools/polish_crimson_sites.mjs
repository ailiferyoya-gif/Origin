import fs from "node:fs";
import path from "node:path";

const root = "C:/Users/kogit/Documents/Codex/CrimsonClinicMystery";
const booth = "C:/Users/kogit/Documents/Codex/CrimsonClinicMystery_BoothPackage/CrimsonClinicMystery_Booth_v1";

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

const search = `<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Search Archive | 紅坂診療所 カルテ改竄事件</title>
<link rel="stylesheet" href="../site.css">
</head>
<body class="search-archive">
<header class="search-top">
  <a href="../index.html">入口</a>
  <a href="../investigate/index.html">照合ノート</a>
</header>
<main>
  <section class="search-home">
    <h1><span>S</span><span>e</span><span>a</span><span>r</span><span>c</span><span>h</span> <b>Archive</b></h1>
    <form onsubmit="run();return false" role="search">
      <input id="q" aria-label="検索語" placeholder="検索語を入力">
      <button>検索</button>
    </form>
    <p>一単語で検索してください。空欄では地域ニュースや広告が多く表示されます。</p>
  </section>
  <section class="search-results">
    <div id="summary" class="search-summary"></div>
    <div id="r"></div>
  </section>
</main>
<script>
const data=[
{title:"紅坂メディカルクリニック | 公式サイト",href:"../official/index.html",url:"kosaka-medical.local/official",snippet:"診療案内、院内設備、安全管理、スタッフログイン。旧診療所記録の移管情報を含む。",keys:["紅坂診療所","紅坂メディカルクリニック","CRN-1006"],public:false,type:"公式"},
{title:"CRN-1006 公開文書 | 地域医療課",href:"../city/case/index.html",url:"city-kosaka.local/medical/crn-1006",snippet:"発生日、人事処理、追記日の公開記録。カルテ第八冊の扱いは目録参照。",keys:["CRN-1006","地域医療課","1997年10月6日"],public:false,type:"自治体"},
{title:"笠井朋子 記事アーカイブ | 地方新聞縮刷版",href:"../news/index.html",url:"archive.local/news/199710",snippet:"小さな社会面記事と訂正欄。退職扱いという表現が翌日に残る。",keys:["笠井朋子","退職扱い","1997/10/08"],public:false,type:"新聞"},
{title:"酸素バルブログ 欠落 | 記録保管室",href:"../logs/index.html",url:"record-vault.local/logs/oxygen",snippet:"23:14から00:02までの間に欠落した設備ログ。薬剤棚ログとは別管理。",keys:["酸素バルブログ","薬剤棚ログ","欠番"],public:false,type:"記録"},
{title:"紅坂医療設備 保守控え",href:"../contractor/index.html",url:"kosaka-maint.local/night",snippet:"夜間作業、裏口廊下、薬品保管庫の請求控え。",keys:["紅坂医療設備","裏口廊下","薬品保管庫"],public:false,type:"業者"},
{title:"古い個人ブログ | 赤い鍵札",href:"../blog/index.html",url:"homepage.local/~mika/diary",snippet:"1997年風の個人ページ。日常記事の中に赤い鍵札の記述がある。",keys:["赤い鍵札","夜間カード","個人ブログ"],public:false,type:"個人"},
{title:"掲示板保存ログ | 1997/10/08",href:"../board/index.html",url:"bbs-cache.local/kosaka",snippet:"保存人が新聞訂正欄の日付だけを控えた古いログ。",keys:["1997/10/08","掲示板","保存人"],public:false,type:"掲示板"},
{title:"資料目録 | カルテ第八冊",href:"../archive/index.html",url:"archive-box.local/catalog",snippet:"移管資料の目録。カルテ第八冊だけ閲覧制限。",keys:["カルテ第八冊","資料目録","欠番"],public:false,type:"資料"}
];
const decoys=[
"紅坂商店街 秋の抽選会","紅坂駅前 内科 求人情報","地域医療フォーラム開催案内","紅坂町 ごみ収集カレンダー","夜間救急 当番表 1997","紅坂写真館 七五三受付","中古医療棚 オークション控え","地域新聞 広告掲載料金","紅坂公民館 健康体操","診療報酬改定 メモ","紅坂バス 時刻表","旧町名一覧 保存版","医療機器点検講習会","酸素ボンベ 取扱説明 一般向け","紅坂町 住宅地図","看護師募集 終了分","紅坂祭り交通規制","内科口コミ掲示板 保存なし","古い電話帳 医院一覧","地域医療課 広報バックナンバー","紅坂川 清掃活動","診療所 開業祝い広告","薬局だより 1997年秋","休日診療所 案内"
].map((title,i)=>({title,href:"../news/index.html",url:"cache.local/decoy/"+(i+1),snippet:"地域アーカイブ内の一般検索結果。事件と関係が薄い情報を含みます。",keys:["紅坂","記録"],public:i<14,type:"キャッシュ"}));
const all=data.concat(decoys);
function run(){
  const q=document.getElementById("q").value.trim();
  const hits=all.filter(x=>(!q&&x.public)||x.keys.some(k=>k.includes(q)||q.includes(k)));
  const shown=hits.length?hits:all.filter(x=>x.public);
  document.getElementById("summary").textContent=q? shown.length+" 件の結果": "地域アーカイブの候補を表示中";
  document.getElementById("r").innerHTML=shown.map(x=>'<article><p class="result-url">'+x.url+' <span>'+x.type+'</span></p><a href="'+x.href+'" target="_blank" rel="noopener">'+x.title+'</a><p>'+x.snippet+'</p></article>').join("");
}
run();
</script>
<script src="../textflow.js"></script>
</body>
</html>`;

const mail = `<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>メール | 紅坂診療所 カルテ改竄事件</title>
<link rel="stylesheet" href="../site.css">
</head>
<body class="mailbox-ui">
<main class="mail-shell">
  <aside class="mail-side">
    <h1>メール</h1>
    <button>作成</button>
    <nav>
      <a class="is-active">保存箱</a>
      <a>院内連絡</a>
      <a>添付控え</a>
      <a>削除済み</a>
    </nav>
    <p>1997年10月6日 周辺の保存メール。</p>
  </aside>
  <section class="mail-main">
    <header>
      <input aria-label="メール検索" value="紅坂 記録 夜間" readonly>
      <span>3件</span>
    </header>
    <article class="mail-open">
      <div><strong>資料公開範囲とPASS</strong><span>地域医療課 / 1997.10.07 08:12</span></div>
      <p>紅坂診療所の略号と最初の異常時刻を合わせます。管理パスは <b>HOSP2314</b> です。</p>
      <p>公開側には診療案内を残し、旧記録は安全管理へ移してください。</p>
    </article>
    <article class="mail-open">
      <div><strong>夜間処理</strong><span>早瀬修 / 1997.10.07 00:38</span></div>
      <p>夜間カードは回収済み。裏口廊下の記録は通常点検扱いにしてください。</p>
      <p>笠井朋子の件は退職扱いで処理します。第二処置室という語は出さないでください。</p>
    </article>
    <article class="mail-open">
      <div><strong>写真の扱い</strong><span>総務控え / 1997.10.08 10:03</span></div>
      <p>赤い鍵札が写る画像はブログ側にも残っています。公開展示からは外してください。</p>
    </article>
  </section>
</main>
<script src="../textflow.js"></script>
</body>
</html>`;

const admin = `<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>院内管理 | 紅坂診療所 カルテ改竄事件</title>
<link rel="stylesheet" href="../site.css">
</head>
<body class="clinic-admin">
<main class="admin-console">
  <section class="admin-login">
    <p class="clinic-kicker">INTERNAL ACCESS</p>
    <h1>院内安全管理システム</h1>
    <p>夜間カード履歴、薬剤棚ログ、旧診療所の移管資料を閲覧します。</p>
    <label>PASSCODE<input id="pw" placeholder="HOSP0000" autocomplete="off"></label>
    <button onclick="login()">認証</button>
    <p id="msg" class="admin-msg"></p>
  </section>
  <section id="vault" class="admin-vault" hidden>
    <h2>閲覧制限記録</h2>
    <div class="vault-grid">
      <a href="../official/restricted/index.html" target="_blank" rel="noopener"><span>安全管理</span><strong>紅坂診療所 制限記録</strong></a>
      <a href="../logs/restricted/index.html" target="_blank" rel="noopener"><span>ログ</span><strong>薬剤棚ログ</strong></a>
      <a href="../contractor/night/index.html" target="_blank" rel="noopener"><span>保守</span><strong>夜間保守記録</strong></a>
    </div>
  </section>
</main>
<script>
function login(){
  const ok=document.getElementById("pw").value.replace(/\\s/g,"").toUpperCase()==="HOSP2314";
  document.getElementById("msg").textContent=ok?"認証しました。":"認証できません。";
  document.getElementById("vault").hidden=!ok;
}
</script>
<script src="../textflow.js"></script>
</body>
</html>`;

const news = `<!doctype html>
<html lang="ja">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>地方新聞 縮刷版 | 紅坂診療所 カルテ改竄事件</title><link rel="stylesheet" href="../site.css"></head>
<body class="news-paper">
<main class="paper-wrap">
  <header class="paper-mast"><p>平成九年十月縮刷版</p><h1>紅坂日日新聞</h1><p>地域面 / 社会面 / 訂正欄</p></header>
  <section class="paper-grid">
    <article class="paper-lead"><p>1997年10月6日 / 社会</p><h2>紅坂診療所で看護師が死亡</h2><p>紅坂診療所の関係者によると、笠井朋子さんの死亡が確認された。管理番号はCRN-1006として処理される。</p><p>夜間の処置記録について、診療所側は「設備確認中」として詳細を明らかにしていない。</p></article>
    <article><p>1997/10/07 / 地域</p><h2>資料公開へ</h2><p>カルテ第八冊など一部資料は制限扱いとなる。</p></article>
    <article class="paper-correction"><p>1997/10/08 / 訂正</p><h2>人事処理の表現について</h2><p>記事中の表現は退職扱いに合わせて訂正します。</p></article>
  </section>
</main>
<script src="../textflow.js"></script>
</body>
</html>`;

const city = `<!doctype html>
<html lang="ja">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>地域医療課 公開室 | 紅坂診療所 カルテ改竄事件</title><link rel="stylesheet" href="../site.css"></head>
<body class="city-office">
<header class="city-header"><div><p>紅坂町</p><h1>地域医療課 公開室</h1></div><nav><a href="./case/index.html">CRN-1006</a><a href="./archive/index.html">資料目録</a></nav></header>
<main class="city-main">
  <section class="city-notice"><h2>公開情報</h2><p>地域医療施設に関する公開資料を掲載しています。個人情報および医療記録の一部は閲覧制限となります。</p></section>
  <section class="city-cards">
    <a href="./case/index.html"><span>公開文書</span><strong>CRN-1006</strong><p>発生日、追記日、人事処理の記録。</p></a>
    <a href="./archive/index.html"><span>資料目録</span><strong>カルテ第八冊</strong><p>移管資料と制限扱いの一覧。</p></a>
  </section>
</main>
<script src="../textflow.js"></script>
</body>
</html>`;

const blog = `<!doctype html>
<html lang="ja">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>みかの小部屋 | 紅坂診療所 カルテ改竄事件</title></head>
<body bgcolor="#fff5fb" text="#4a2440" link="#0000ee" vlink="#660099">
<center>
<font size="6" color="#cc3399">＊みかの小部屋＊</font><br>
<font size="2">since 1997 / キリ番 12345 / 直リンク禁止</font><br>
<marquee width="620">日記と買い物メモ。掲示板は荒らしが多いので休止中です。</marquee>
<table width="860" border="1" cellpadding="6" cellspacing="0" bgcolor="#ffd9ef">
<tr>
<td width="190" valign="top" bgcolor="#fff0f8"><font size="2">
PROFILE<br>みか / 紅坂の近くで働いてます<br><hr>
MENU<br>日記<br>写真<br>相互リンク<br>素材屋さん<br>工事中<br><hr>
広告<br>かわいい壁紙配布中<br>アクセス解析あり
</font></td>
<td valign="top" bgcolor="#ffffff">
<table width="100%" border="0" cellpadding="7" cellspacing="8">
<tr><td bgcolor="#fff7fb"><font size="2"><b>1997/10/08 赤い鍵札</b><br>赤い鍵札を見た。夜間カードと一緒に置かれていた気がする。あの廊下、夜は通らない方がいい。<br><font color="#999999">comment:0 / category:仕事じゃない話</font></font></td></tr>
<tr><td bgcolor="#fff7fb"><font size="2"><b>1997/10/07 雨</b><br>駅前で傘を買った。診療所の裏口が開いていて、すぐ閉まった。<br><font color="#999999">comment:2 / category:日常</font></font></td></tr>
<tr><td bgcolor="#fff7fb"><font size="2"><b>1997/10/06 夜</b><br>サイレンではなく、何かが倒れた音。気のせいかもしれない。<br><font color="#999999">comment:1 / category:メモ</font></font></td></tr>
<tr><td bgcolor="#fff7fb"><font size="2"><b>1997/09/29 リンク整理</b><br>相互リンクを少し整理しました。消えているページが多いです。<br><font color="#999999">comment:4 / category:サイト</font></font></td></tr>
</table>
</td>
</tr>
</table>
</center>
</body>
</html>`;

const board = `<!doctype html>
<html lang="ja">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>紅坂まちBBS 保存ログ | 紅坂診療所 カルテ改竄事件</title><link rel="stylesheet" href="../site.css"></head>
<body class="old-board">
<header><h1>紅坂まちBBS 保存ログ</h1><p>1997年10月分の一部キャッシュ。広告、雑談、噂が混ざっています。</p></header>
<main>
  <section><h2>001 変な音</h2><p><b>1 名前：名無し</b> 1997年10月6日 23:14<br>第二処置室の方で音がしたらしい。</p><p><b>8 名前：保存人</b> 1997/10/08<br>新聞訂正欄の日付だけ控えた。</p></section>
  <section><h2>002 人事処理</h2><p><b>3 名前：近所</b> 1997年10月7日<br>退職扱いって何。昨日の夜の話じゃないの。</p></section>
  <section><h2>003 古い写真</h2><p><b>12 名前：通行人</b> 1997年10月8日<br>赤い札がついた鍵を見た。裏口の方。</p></section>
  <section><h2>004 雑談</h2><p><b>20 名前：広告</b> 1997年10月9日<br>紅坂商店街ポイント二倍デー。</p></section>
</main>
<script src="../textflow.js"></script>
</body>
</html>`;

const css = `

.search-archive{background:#fff;color:#202124;font-family:Arial,"Meiryo",sans-serif}.search-top{height:54px;display:flex;justify-content:flex-end;align-items:center;gap:18px;padding:0 24px;font-size:.9rem}.search-top a{text-decoration:none;color:#3c4043}.search-home{max-width:760px;margin:0 auto;padding:82px 18px 32px;text-align:center}.search-home h1{font-size:clamp(2.6rem,8vw,5.2rem);font-weight:400;letter-spacing:0;margin:0 0 24px}.search-home h1 span:nth-child(1){color:#4285f4}.search-home h1 span:nth-child(2){color:#db4437}.search-home h1 span:nth-child(3){color:#f4b400}.search-home h1 span:nth-child(4){color:#4285f4}.search-home h1 span:nth-child(5){color:#0f9d58}.search-home h1 span:nth-child(6){color:#db4437}.search-home h1 b{font-weight:400;color:#5f6368}.search-home form{display:flex;gap:10px;border:1px solid #dfe1e5;border-radius:28px;box-shadow:0 2px 8px rgba(60,64,67,.12);padding:6px 8px 6px 18px}.search-home input{flex:1;border:0;outline:0;font-size:1rem;min-height:42px}.search-home button{border:0;background:#f8f9fa;border-radius:20px;padding:0 18px}.search-home p{color:#5f6368}.search-results{max-width:900px;margin:0 auto 80px;padding:0 18px}.search-summary{color:#70757a;border-bottom:1px solid #ebebeb;padding:10px 0}.search-results article{padding:18px 0;border-bottom:1px solid #f1f3f4}.search-results a{color:#1a0dab;font-size:1.22rem;text-decoration:none}.search-results a:hover{text-decoration:underline}.search-results p{margin:.35rem 0;color:#4d5156}.result-url{font-size:.84rem;color:#202124}.result-url span{color:#70757a;margin-left:8px}.mailbox-ui{background:#f6f8fc;color:#1f1f1f}.mail-shell{display:grid;grid-template-columns:280px 1fr;min-height:100vh}.mail-side{background:#eef3fb;padding:22px}.mail-side h1{font-size:1.6rem}.mail-side button{border:0;background:#c2e7ff;border-radius:18px;padding:14px 26px;margin:14px 0}.mail-side nav{display:grid;gap:6px}.mail-side a{padding:10px 12px;border-radius:999px}.mail-side .is-active{background:#d3e3fd;font-weight:700}.mail-side p{color:#5f6b7a;font-size:.88rem}.mail-main{padding:20px}.mail-main header{display:flex;gap:14px;align-items:center;margin-bottom:16px}.mail-main header input{flex:1;border:0;background:#edf2fa;border-radius:24px;padding:14px 18px}.mail-open{background:#fff;border:1px solid #e1e6ef;border-radius:14px;margin:0 0 12px;padding:18px;box-shadow:0 1px 2px rgba(0,0,0,.04)}.mail-open div{display:flex;justify-content:space-between;gap:16px;border-bottom:1px solid #edf0f5;padding-bottom:10px}.mail-open span{color:#6b7280;font-size:.86rem}.clinic-admin{min-height:100vh;background:radial-gradient(circle at 20% 15%,rgba(90,150,180,.16),transparent 34%),#081018;color:#e8f1f7}.admin-console{width:min(1040px,calc(100% - 32px));margin:auto;min-height:100vh;display:grid;align-content:center;gap:18px}.admin-login,.admin-vault{border:1px solid rgba(180,210,230,.22);background:rgba(15,28,38,.82);backdrop-filter:blur(14px);padding:28px}.admin-login h1{font-family:"Yu Mincho",serif;font-weight:500;font-size:2.3rem}.admin-login label{display:grid;gap:8px;color:#a9bdc9}.admin-login input{background:#05090d;color:#fff;border:1px solid rgba(190,220,238,.28);padding:14px}.admin-login button{margin-top:12px;background:#d9e8f2;color:#071018;border:0;padding:12px 18px}.admin-msg{color:#c7ddea}.vault-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}.vault-grid a{display:grid;gap:6px;text-decoration:none;color:#eaf5fb;border:1px solid rgba(255,255,255,.16);padding:16px}.vault-grid span{color:#94adba;font-size:.8rem}.news-paper{background:#ede9dc;color:#111;font-family:"Yu Mincho","Hiragino Mincho ProN",serif}.paper-wrap{width:min(1120px,calc(100% - 28px));margin:28px auto;background:#fbfaf4;padding:28px;box-shadow:0 18px 60px rgba(0,0,0,.18)}.paper-mast{text-align:center;border-top:4px double #111;border-bottom:4px double #111;padding:16px 0}.paper-mast h1{font-size:3rem;letter-spacing:.12em;margin:.2rem 0}.paper-grid{display:grid;grid-template-columns:1.4fr .8fr;gap:20px;margin-top:20px}.paper-grid article{margin:0;background:transparent;border:0;border-bottom:1px solid #222;padding:12px}.paper-lead{grid-row:span 2}.paper-grid h2{font-size:1.6rem}.paper-correction{border:2px solid #111!important}.city-office{background:#f5f6f2;color:#1e2a25}.city-header{background:#fff;border-top:8px solid #2f6f55;border-bottom:1px solid #d8ded7;padding:24px max(16px,calc((100vw - 1120px)/2));display:flex;justify-content:space-between;gap:20px}.city-header p{color:#567367;margin:0}.city-header h1{margin:0}.city-header nav{display:flex;align-items:center;gap:12px}.city-header a,.city-cards a{text-decoration:none;color:#1e4f3d}.city-main{width:min(1120px,calc(100% - 32px));margin:auto;padding:40px 0}.city-notice{background:#fff;border-left:6px solid #2f6f55;padding:20px}.city-cards{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;margin-top:18px}.city-cards a{background:#fff;border:1px solid #d8ded7;padding:20px}.city-cards span{font-size:.82rem;color:#6b7d74}.city-cards strong{display:block;font-size:1.5rem}.old-board{background:#e9e3cf;color:#2b241a;font-family:"MS PGothic","Meiryo",sans-serif}.old-board header,.old-board main{width:min(900px,calc(100% - 24px));margin:18px auto}.old-board header{background:#fff;border:1px solid #b7ad91;padding:14px}.old-board section{background:#fff;border:1px solid #b7ad91;margin:10px 0;padding:12px}.old-board h2{font-size:1.05rem;background:#d8cfb6;margin:-12px -12px 10px;padding:8px}@media(max-width:760px){.mail-shell,.paper-grid,.city-header,.city-cards,.vault-grid{grid-template-columns:1fr;display:grid}.mail-open div,.mail-main header{flex-direction:column;align-items:stretch}.search-home{padding-top:40px}}
`;

write("web/search/index.html", search);
write("web/mail/index.html", mail);
write("web/admin/index.html", admin);
write("web/news/index.html", news);
write("web/city/index.html", city);
write("web/blog/index.html", blog);
write("web/board/index.html", board);
fs.appendFileSync(path.join(root, "web/site.css"), css, "utf8");

for (const rel of [
  "web/search/index.html","web/mail/index.html","web/admin/index.html","web/news/index.html","web/city/index.html","web/blog/index.html","web/board/index.html","web/site.css"
]) sync(rel);

fs.appendFileSync(path.join(root, "HANDOFF.md"), `

## 2026-05-18 主要サイト品質向上

- Search ArchiveをGoogle風検索画面に刷新。
- メールをWebメール風UIに刷新。
- 管理画面を院内安全管理システム風に刷新。
- 新聞を縮刷版紙面風に刷新。
- 地域医療課を自治体公開室らしいレイアウトに刷新。
- ブログを1997年風の個人ホームページに刷新。
- 掲示板を古いBBS保存ログ風に刷新。
- Booth用フォルダ側にも反映。
`, "utf8");

console.log("polished crimson sites");
