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

const decoyTitles = [
  "紅坂商店街 秋の抽選会","紅坂駅前 内科 求人情報","地域医療フォーラム開催案内","紅坂町 ごみ収集カレンダー","夜間救急 当番表 1997","紅坂写真館 七五三受付","中古医療棚 オークション控え","地域新聞 広告掲載料金","紅坂公民館 健康体操","診療報酬改定 メモ","紅坂バス 時刻表","旧町名一覧 保存版","医療機器点検講習会","酸素ボンベ 取扱説明 一般向け","紅坂町 住宅地図","看護師募集 終了分","紅坂祭り交通規制","内科口コミ掲示板 保存なし","古い電話帳 医院一覧","地域医療課 広報バックナンバー","紅坂川 清掃活動","診療所 開業祝い広告","薬局だより 1997年秋","休日診療所 案内"
];

for (const [i, title] of decoyTitles.entries()) {
  const no = String(i + 1).padStart(2, "0");
  write(`web/search/cache/${no}/index.html`, `<!doctype html>
<html lang="ja">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title} | Search Archive Cache</title><link rel="stylesheet" href="../../../site.css"></head>
<body class="cache-page">
<main>
<p class="cache-url">cache.local/decoy/${i + 1}</p>
<h1>${title}</h1>
<p>これはSearch Archiveに保存された地域キャッシュです。事件とは直接関係しない情報、広告、古い告知、リンク切れの説明が含まれています。</p>
<p>紅坂周辺の検索結果には、医療、商店街、求人、町内会、古い新聞広告が混ざっています。</p>
<a href="../../index.html">Search Archiveへ戻る</a>
</main>
<script src="../../../textflow.js"></script>
</body>
</html>`);
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
{title:"みかの小部屋 | 赤い鍵札",href:"../blog/index.html",url:"homepage.local/~mika/diary",snippet:"1997年風の個人ページ。日常記事の中に赤い鍵札の記述がある。",keys:["赤い鍵札","夜間カード","個人ブログ"],public:false,type:"個人"},
{title:"紅坂まちBBS 保存ログ",href:"../board/index.html",url:"bbs-cache.local/kosaka",snippet:"保存人が新聞訂正欄の日付だけを控えた古いログ。",keys:["1997/10/08","掲示板","保存人"],public:false,type:"掲示板"},
{title:"資料目録 | カルテ第八冊",href:"../archive/index.html",url:"archive-box.local/catalog",snippet:"移管資料の目録。カルテ第八冊だけ閲覧制限。",keys:["カルテ第八冊","資料目録","欠番"],public:false,type:"資料"}
];
const decoys=${JSON.stringify(decoyTitles)}.map((title,i)=>({title,href:"./cache/"+String(i+1).padStart(2,"0")+"/index.html",url:"cache.local/decoy/"+(i+1),snippet:"地域アーカイブ内の一般検索結果。事件と関係が薄い情報を含みます。",keys:["紅坂","記録"],public:i<14,type:"キャッシュ"}));
const all=data.concat(decoys);
function run(){
  const q=document.getElementById("q").value.trim();
  const hits=all.filter(x=>(!q&&x.public)||x.keys.some(k=>k.includes(q)||q.includes(k)));
  const shown=hits.length?hits:all.filter(x=>x.public);
  document.getElementById("summary").textContent=q? shown.length+" 件の結果": "地域アーカイブの候補を表示中";
  document.getElementById("r").innerHTML=shown.map(x=>'<article class="search-result"><p class="result-url">'+x.url+' <span>'+x.type+'</span></p><a href="'+x.href+'" target="_blank" rel="noopener">'+x.title+'</a><p>'+x.snippet+'</p></article>').join("");
}
run();
</script>
<script src="../textflow.js"></script>
</body>
</html>`;

const mails = [
  ["資料公開範囲の整理","地域医療課","1997.10.07 08:12",["公開側には診療案内を残し、旧記録は安全管理へ移してください。","院内コードは病院区分の四文字を使います。"]],
  ["夜間処理","早瀬修","1997.10.07 00:38",["夜間カードは回収済み。裏口廊下の記録は通常点検扱いにしてください。","笠井朋子の件は退職扱いで処理します。"]],
  ["写真の扱い","総務控え","1997.10.08 10:03",["赤い鍵札が写る画像はブログ側にも残っています。公開展示からは外してください。"]],
  ["旧診療所コード","システム係","1997.10.07 09:21",["旧診療所の施設コードは HOSP です。","時刻は別メールの異常ログに合わせてください。"]],
  ["異常ログ転記","設備担当","1997.10.07 01:02",["最初の異常は23:14。酸素バルブ側の通知です。","この時刻は件名やパス欄に直接書かないでください。"]],
  ["鍵札の件","受付","1997.10.07 12:14",["赤い鍵札だけ返却箱に入っていました。誰が戻したかは未記入です。"]],
  ["薬剤棚ログ","薬品保管庫","1997.10.07 00:11",["棚の開閉履歴が処置記録と一致しません。手書きの控えを残します。"]],
  ["カルテ第八冊","地域医療課","1997.10.07 15:41",["カルテ第八冊は通常公開に入れないでください。閲覧制限へ移します。"]],
  ["新聞対応","総務","1997.10.08 07:30",["記事中の表現は退職扱いに統一してください。死亡確認の語は使いません。"]],
  ["第二処置室","看護記録係","1997.10.06 23:52",["第二処置室の照明だけ消灯時刻がずれています。"]],
  ["裏口廊下","施設管理","1997.10.07 00:24",["裏口廊下は外側から閉鎖された扱いになっています。通常点検では説明がつきません。"]],
  ["予備酸素ボンベ","備品係","1997.10.07 10:20",["予備酸素ボンベの置き場所が写真と備品表で違います。"]],
  ["保守請求","紅坂医療設備","1997.10.09 11:03",["薬品保管庫の夜間作業として請求します。裏口廊下の項目は出しません。"]],
  ["掲示板保存","広報","1997.10.08 21:55",["掲示板に訂正欄の日付が書かれています。削除依頼は間に合いませんでした。"]],
  ["移管箱","資料室","1997.10.10 09:00",["CRN-1006の箱に、カルテ第八冊と薬剤棚ログの写しを入れました。"]],
  ["当直表","事務長","1997.10.06 18:44",["当直表の写しを差し替えます。早瀬先生の欄は夜間対応にしてください。"]],
  ["電話メモ","受付","1997.10.06 22:31",["笠井さんから折り返しの電話あり。第二処置室へ向かうとのこと。"]],
  ["照明点検","施設管理","1997.10.07 09:12",["処置室の照明不具合として処理できます。酸素バルブには触れない方針です。"]],
  ["旧掲示","広報","1997.10.11 13:20",["旧掲示の院内配置図は削除済みです。裏口廊下が残っているものは回収してください。"]],
  ["スタッフログイン","システム係","1997.10.07 09:40",["管理画面は公式サイトの院内スタッフ導線から入れます。","施設コードと異常時刻を続ける運用です。"]],
  ["薬局連絡","薬局","1997.10.07 14:03",["薬剤棚の棚卸し数は合っています。ログだけが合いません。"]],
  ["処置記録の補足","看護記録係","1997.10.07 02:18",["処置記録の時刻を00:02復旧に合わせる指示がありました。"]],
  ["資料名表記","地域医療課","1997.10.08 09:15",["酸素バルブログは公開目録に載せません。薬剤棚ログは制限記録へ。"]],
  ["広報写真","広報","1997.10.09 17:06",["写真保管の未採用カットに赤い鍵札が写っています。"]],
  ["旧電話帳","総務","1997.10.12 10:10",["紅坂診療所の名称は旧電話帳ではまだ残っています。"]],
  ["点検日程","紅坂医療設備","1997.10.05 16:22",["薬品保管庫の点検予定はありませんでした。"]],
  ["自治体提出","事務長","1997.10.07 06:50",["CRN-1006として提出します。発生日は1997年10月6日。"]],
  ["廃棄予定","資料室","1997.10.15 11:19",["廃棄予定の控えは写真保管へ移しました。"]],
  ["検索語メモ","広報","1997.10.16 08:44",["検索に残りやすい語は、CRN-1006、カルテ第八冊、赤い鍵札です。"]],
  ["未送信下書き","差出人不明","1997.10.07 00:57",["退職扱いにすれば、夜に第二処置室へ行った理由を説明しなくて済む。"]]
];

const mailArticles = mails.map(([subject, from, date, body], i) => `<article class="mail-open${i > 7 ? " mail-collapsed" : ""}">
  <div><strong>${subject}</strong><span>${from} / ${date}</span></div>
  ${body.map((p) => `<p>${p}</p>`).join("")}
</article>`).join("");

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
    <p>1997年10月6日 周辺の保存メール。重要な情報は複数メールに分かれています。</p>
  </aside>
  <section class="mail-main">
    <header>
      <input aria-label="メール検索" value="紅坂 記録 夜間" readonly>
      <span>30件</span>
    </header>
    ${mailArticles}
  </section>
</main>
<script src="../textflow.js"></script>
</body>
</html>`;

const css = `

.search-results .search-result{background:transparent!important;border:0!important;border-bottom:1px solid #e8eaed!important;border-radius:0!important;box-shadow:none!important;margin:0!important;padding:18px 0!important}.search-results .search-result a{display:inline;color:#1a0dab;font-size:1.2rem;line-height:1.35}.search-results .search-result p{max-width:720px}.search-results .search-result .result-url{font-size:.84rem;color:#202124;margin:0 0 2px}.search-results .search-result .result-url span{color:#70757a;background:#f1f3f4;border-radius:999px;padding:2px 8px}.cache-page{background:#fff;color:#202124;font-family:Arial,"Meiryo",sans-serif}.cache-page main{width:min(760px,calc(100% - 32px));margin:72px auto}.cache-page h1{font-weight:400;color:#1a0dab}.cache-url{color:#188038;font-size:.9rem}.cache-page a{color:#1a0dab}.mail-main{max-height:100vh;overflow:auto}.mail-collapsed{background:#fbfcff}.mail-collapsed p{color:#4b5563}.mail-open b{background:#fff3bf;padding:0 .25em}
`;

write("web/search/index.html", search);
write("web/mail/index.html", mail);
fs.appendFileSync(path.join(root, "web/site.css"), css, "utf8");

for (const rel of ["web/search/index.html", "web/mail/index.html", "web/site.css"]) sync(rel);
for (let i = 1; i <= decoyTitles.length; i++) {
  const no = String(i).padStart(2, "0");
  sync(`web/search/cache/${no}/index.html`);
}

fs.appendFileSync(path.join(root, "HANDOFF.md"), `

## 2026-05-18 Search/Mail調整

- Search Archiveの検索結果を四角いカード表示から、Google風のフラットな検索結果表示へ変更。
- Search Archiveのカモフラージュ結果を、それぞれ別のキャッシュページへリンクするよう修正。
- メールを30件に増量。
- 管理パスワードを本文に直書きせず、施設コード HOSP と異常時刻 23:14 を別メールから照合して復元する構造に変更。
- Booth用フォルダ側にも反映。
`, "utf8");

console.log("updated search and mail");
