import fs from "node:fs";
import path from "node:path";

const root = "C:/Users/kogit/Documents/Codex";
const imgRoot = "C:/Users/kogit/.codex/generated_images/019e3312-788e-7a32-add3-689f06d65101";
const stamp = "20260518_074606";

const latestImages = fs.readdirSync(imgRoot)
  .filter((f) => f.endsWith(".png"))
  .map((f) => path.join(imgRoot, f))
  .sort((a, b) => fs.statSync(a).mtimeMs - fs.statSync(b).mtimeMs)
  .slice(-10);

function mkdir(p) { fs.mkdirSync(p, { recursive: true }); }
function write(file, text) { mkdir(path.dirname(file)); fs.writeFileSync(file, text, "utf8"); }
function copy(src, dest) { mkdir(path.dirname(dest)); fs.copyFileSync(src, dest); }
function esc(s) { return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }

const projects = [
  ["CrimsonClinicMystery","紅坂診療所 カルテ改竄事件","CRIMSON CLINIC","閉鎖された私設診療所","看護師","笠井朋子","1997年10月6日","23:14","第二処置室","CRN-1006","カルテ第八冊","薬品保管庫","地域医療課","予備酸素ボンベ","酸素バルブログ","医師","早瀬修","赤い鍵札","00:02","退職扱い","1997/10/07","紅坂診療所","夜間カード","裏口廊下","紅坂医療設備","欠番","1997/10/08","薬剤棚ログ","HOSP2314",4400,"1997年風の個人日記。テーブル、カウンター、相互リンク、広告風の雑文を混ぜる。"],
  ["NamikazeFerryMystery","波風フェリー 片道航路記録事件","NAMIKAZE FERRY","引退した沿岸フェリー会社","運航管理員","瀬戸真琴","2003年6月21日","01:42","旧第二桟橋","FRY-0621","航海日誌第六冊","無線室","港湾振興課","予備乗船券","潮位ログC","整備主任","倉橋徹","青い封筒","02:18","出向扱い","2003/06/22","波風フェリー","保守キー","機関室側通路","湾岸整備社","欠測","2003/06/23","入港申告ログ","FERRY0142",4401,"2003年の無料レンタル日記。小さな写真、絵文字風記号、リンク切れを混ぜる。"],
  ["KarasunoCableMystery","烏野ケーブル 山頂駅停止事件","KARASUNO CABLE","閉鎖された山岳ケーブルカー","駅務主任","雨宮圭","2001年2月9日","18:37","山頂折返室","CBL-0209","索道日誌第四冊","制動機械室","観光交通課","予備制動ピン","滑車音ログB","保守員","狩谷誠","黒い工具袋","19:06","異動扱い","2001/02/10","烏野ケーブル","制御盤キー","非常階段扉","北峰索道設備","欠測","2001/02/11","制動圧ログ","CABLE1837",4402,"2001年風の山歩き個人サイト。fontタグ、壁紙色、古い掲示板ログを混ぜる。"],
  ["AonagiDataCenterMystery","青凪データセンター バックアップ消失事件","AONAGI DATACENTER","2000年代初期の地域データセンター","夜間オペレータ","水原梓","2005年9月14日","03:26","第三サーバ室","DTC-0914","磁気テープ台帳第九冊","UPS室","情報政策課","予備認証カード","バックアップログE","主任技師","名取啓介","銀色のテープケース","04:11","契約終了扱い","2005/09/15","青凪データセンター","ラックキー","東側搬入口","青凪システム保守","欠番","2005/09/16","UPS切替ログ","DATA0326",4403,"2005年の技術者ブログ。無料ブログ風だが装飾過多、トラックバックと広告を混ぜる。"],
  ["ShiranuiOnsenMystery","不知火温泉 給湯棟記録事件","SHIRANUI ONSEN","休業した山間の温泉旅館","帳場係","三浦千景","1999年3月3日","22:05","給湯棟裏廊下","ONS-0303","宿泊台帳第十二冊","ボイラー室","観光衛生課","予備バルブ","湯温ログD","設備係","梶原亮","白い手ぬぐい","22:49","休職扱い","1999/03/04","不知火温泉","機械室札","露天風呂側通路","湯川設備","欠測","1999/03/05","燃焼圧ログ","ONSEN2205",4404,"1999年の旅館ファンサイト。中央寄せ、キリ番、工事中、手書き風の無意味記事を混ぜる。"],
  ["KurobaraCinemaMystery","黒薔薇シネマ 最終上映フィルム事件","KUROBARA CINEMA","閉館した単館映画館","映写技師","相馬玲奈","2000年12月31日","23:58","第二映写室","CNM-1231","上映記録第十冊","フィルム保管庫","文化振興課","予備フィルム缶","投影音ログA","支配人代理","久我直人","緑の半券束","00:31","退職処理","2001/01/01","黒薔薇シネマ","映写室キー","非常出口側階段","東映写サービス","欠番","2001/01/02","レンズ交換ログ","CINE2358",4405,"2000年の映画感想サイト。黒背景、テーブル、バナー枠、映画レビューと無関係記事を混ぜる。"],
  ["TokiwaBroadcastMystery","常盤放送 中継テープ未放送事件","TOKIWA BROADCAST","地方放送局の中継施設","音声技師","野々村葵","2008年4月12日","02:44","第七中継室","BCS-0412","放送テープ台帳第五冊","副調整室","電波監理課","予備中継テープ","送出ログF","編成担当","藤堂雅人","灰色のMDケース","03:17","外注扱い","2008/04/13","常盤放送","副調キー","屋上送信機側扉","常盤通信工業","欠測","2008/04/14","送信切替ログ","RADIO0244",4406,"2008年の出演者ブログ。無料ブログテンプレ、コメント欄、広告、軽い日記を多めにする。"],
  ["HakurouMuseumMystery","白楼民俗資料館 収蔵箱入替事件","HAKUROU MUSEUM","地方の民俗資料館","学芸員","奥村志乃","1996年8月17日","20:21","収蔵庫三号室","MSM-0817","収蔵目録第十一冊","燻蒸室","文化財課","予備収蔵箱","環境計測ログG","館長補佐","丹羽宗介","藍色の目録札","21:03","出張扱い","1996/08/18","白楼民俗資料館","収蔵庫鍵","搬出用裏扉","白楼保存処理社","欠番","1996/08/19","燻蒸濃度ログ","MUSE2021",4407,"1996年風の郷土史個人ページ。古いHTML、表組み、未整理リンク、来訪者ノートを混ぜる。"],
  ["MizukageDamMystery","水影ダム 放流警報記録事件","MIZUKAGE DAM","山間部のダム管理施設","管理技師","伊庭直美","2004年7月28日","04:09","第二ゲート室","DAM-0728","放流台帳第七冊","警報機械室","河川管理課","予備操作札","水位ログH","副管理長","葛城学","黄色い雨具袋","04:52","休暇扱い","2004/07/29","水影ダム","ゲート鍵","監査廊南扉","水影電機保全","欠測","2004/07/30","警報試験ログ","DAM0409",4408,"2004年の釣り/河川ブログ。無料ブログ風、写真コメント、広告、雑談記事を多めにする。"],
  ["TsukishiroHotelMystery","月白ホテル 夜間監査室事件","TSUKISHIRO HOTEL","閉業した丘陵ホテル","フロント主任","望月紗季","2002年11月2日","01:19","夜間監査室","HTL-1102","宿泊台帳第十五冊","リネン倉庫","観光生活課","予備マスターキー","客室電源ログJ","総務係","成瀬亮","紫の封筒","01:57","退職扱い","2002/11/03","月白ホテル","マスターキー","従業員階段","月白ビル管理","欠番","2002/11/04","金庫開閉ログ","HOTEL0119",4409,"2002年の旅行記サイト。中央寄せ、写真枠、古いアクセス解析風表記、無関係旅行記を混ぜる。"],
].map((x, i) => ({
  id:x[0], title:x[1], kicker:x[2], setting:x[3], role:x[4], victim:x[5], date:x[6], time:x[7], place:x[8], caseId:x[9], book:x[10], room:x[11], cityDept:x[12], object:x[13], missingLog:x[14], culpritRole:x[15], culprit:x[16], token:x[17], restore:x[18], personnel:x[19], followDate:x[20], formal:x[21], key:x[22], blocked:x[23], contractor:x[24], blank:x[25], boardDate:x[26], finalLog:x[27], pass:x[28], port:x[29], blogNote:x[30], image: latestImages[i],
}));

const siteCss = `*{box-sizing:border-box}body{margin:0;font-family:"Yu Gothic","Meiryo",sans-serif;line-height:1.85;background:#10131a;color:#e9eef7;overflow-wrap:break-word}a{color:inherit}img{max-width:100%;display:block}.wrap{width:min(1120px,calc(100% - 32px));margin:auto}.muted{color:#8d98aa}.small{font-size:.86rem}.grid{display:grid;gap:18px}.two{grid-template-columns:repeat(2,minmax(0,1fr))}.three{grid-template-columns:repeat(3,minmax(0,1fr))}.btn{display:inline-flex;align-items:center;justify-content:center;border:1px solid rgba(255,255,255,.25);background:rgba(255,255,255,.08);padding:.8rem 1rem;text-decoration:none}.premium{background:#05070c;color:#edf4ff}.premium-bg{position:fixed;inset:0;background:linear-gradient(180deg,rgba(2,4,8,.25),#05070c 76%),var(--hero) center/cover no-repeat;z-index:-2}.premium-bg:after{content:"";position:absolute;inset:0;background:radial-gradient(circle at 18% 12%,rgba(180,205,255,.18),transparent 34%),linear-gradient(90deg,rgba(2,4,9,.9),rgba(2,4,9,.42),rgba(2,4,9,.92))}.topbar{display:flex;justify-content:space-between;align-items:center;padding:22px 0}.brand{letter-spacing:.16em;font-size:.82rem}.hero{min-height:72vh;display:grid;align-items:end;padding:72px 0 52px}.hero h1{font-family:Georgia,"Yu Mincho",serif;font-size:clamp(2.25rem,5.8vw,5.8rem);line-height:1.04;margin:.2rem 0}.hero p{max-width:780px;color:#d7e1ef}.nav{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-top:24px}.nav a{border:1px solid rgba(255,255,255,.23);text-decoration:none;padding:16px;min-height:84px;background:rgba(255,255,255,.07)}.nav strong{display:block}.nav span{display:block;color:#adb9c9;font-size:.84rem}.panel{border:1px solid rgba(255,255,255,.16);background:rgba(9,14,23,.76);backdrop-filter:blur(10px);padding:22px}.section{padding:32px 0}.q-card{border:1px solid rgba(255,255,255,.14);background:rgba(9,14,23,.78);padding:18px;margin:14px 0}.q-card.locked{opacity:.48}.q-card.locked .locked-hide{display:none}.answer-row{display:flex;gap:8px;flex-wrap:wrap}.answer-row input{flex:1;min-width:220px;background:#05070c;color:#fff;border:1px solid rgba(255,255,255,.22);padding:.8rem}.answer-row button{background:#d9e6ff;border:0;padding:.8rem 1rem}.ok{color:#bdffd0}.ng{color:#ffb2b2}.official{background:#eef2f6;color:#1d2630}.official header{background:#123a5a;color:#fff}.municipal{background:#f8f4e8;color:#222}.municipal header{border-top:8px solid #527a42;background:#fffdf4}.news{background:#fafafa;color:#111;font-family:"Yu Mincho",serif}.lab{background:#071018;color:#dcefff}.radio{background:#18120a;color:#f4e4c4}.contractor{background:#e9ebef;color:#222}.board{background:#f2eddf;color:#2b241a}.blog2010{background:#f6f6f6;color:#333}.blog2010 .bloggrid{display:grid;grid-template-columns:1fr 250px;gap:18px}.box,article,.thread,aside{border:1px solid rgba(0,0,0,.16);background:rgba(255,255,255,.88);padding:14px;margin:12px 0}.official .box,.municipal .box,.contractor .box{background:#fff}.lab .box{background:#02070c;border-color:#1a405a}.radio .box{background:#fff8e8;color:#2c1b08;border-style:dashed}.board .thread{background:#fff}.site-header{padding:24px 0;border-bottom:1px solid rgba(0,0,0,.15)}nav a{margin-right:12px}table{border-collapse:collapse;width:100%;background:#fff;color:#222}th,td{border:1px solid #c9ced6;padding:8px;text-align:left}@media(max-width:760px){.two,.three,.nav,.blog2010 .bloggrid{grid-template-columns:1fr}.topbar{align-items:flex-start;gap:12px;flex-direction:column}}`;

const textflow = `(()=>{const rx=/([、。]|て|に|を|は|が|の|で|と|へ|か)(?!<wbr>)/g;document.querySelectorAll("p,li,td,th,h1,h2,h3,a,button,span,strong").forEach(el=>{if(el.children.length||el.dataset.noFlow==="1")return;el.innerHTML=el.textContent.replace(rx,"$1<wbr>")})})();`;

function html(p, file, title, body, bodyClass = "", extra = "") {
  const d = file.split("/").length - 1;
  return `<!doctype html><html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${esc(title)} | ${esc(p.title)}</title><link rel="stylesheet" href="${"../".repeat(d)}site.css">${extra}</head><body class="${bodyClass}">${body}<script src="${"../".repeat(d)}textflow.js"></script></body></html>`;
}

function answerList(p) {
  return [p.victim,p.date,p.time,p.place,p.caseId,p.book,p.room,p.cityDept,p.object,p.missingLog,p.culprit,p.token,p.restore,p.personnel,p.followDate,p.formal,p.key,p.blocked,p.contractor,p.blank,p.boardDate,p.finalLog,"管理画面",`${p.culprit}が${p.victim}を${p.place}へ誘導し、${p.key}を使って${p.blocked}から退路を塞いだ`];
}

function questions(p) {
  return [
    `新聞と公式資料に共通する${p.role}の氏名を答えてください。`,`自治体資料と新聞日付欄から事件日を答えてください。`,`ログとメールから最初の異常時刻を答えてください。`,`公式サイトの配置図と記録ログに共通する場所を答えてください。`,`自治体で管理番号になっているIDを答えてください。`,`資料目録で制限扱いになった冊子名を答えてください。`,`業者記録と鍵台帳から夜間に記録された部屋を答えてください。`,`検索結果に出る担当部署名を答えてください。`,`ブログ写真メモと備品表に共通する物を答えてください。`,`記録台帳で欠落しているログ名を答えてください。`,`メールと担当表から夜間対応者名を答えてください。`,`古い個人記事と鍵台帳に共通する持ち出し物を答えてください。`,`制限記録で復旧が記録された時刻を答えてください。`,`人事処理で被害者はどの扱いにされたか答えてください。`,`新聞訂正欄と自治体追記欄で一致する日付を答えてください。`,`制限記録の表題に残る正式名称を答えてください。`,`鍵台帳とメール添付の一致語を答えてください。`,`業者メモと制限ログで塞がれていた場所を答えてください。`,`請求書の発行者として残る会社名を答えてください。`,`台帳で通常値ではなく空白扱いになっている記録語を答えてください。`,`掲示板保存ログと新聞訂正欄で一致する日付を答えてください。`,`管理画面の制限記録で最終照合に必要なログ名を答えてください。`,`この情報群へ到達するためのプレイヤー用画面名を答えてください。`,`最終照合として、犯人、被害者、場所、塞がれた退路を一文で答えてください。`
  ];
}

function main(p) {
  const links = [["検索","search/index.html","検索語で記録へ"],["メール","mail/index.html","保存箱と添付メモ"],["管理","admin/index.html","制限記録"],["照合ノート","investigate/index.html","回答入力"]].map(([a,b,c])=>`<a href="./${b}" ${a==="照合ノート"?"":'target="_blank" rel="noopener"'}><strong>${a}</strong><span>${c}</span></a>`).join("");
  return html(p,"index.html","入口",`<div class="premium-bg" style="--hero:url('./assets/hero.png')"></div><header class="wrap topbar"><div class="brand">${p.kicker}</div><div class="small">上級編 / 想定3〜5時間</div></header><main><section class="wrap hero"><div><p class="small">ADVANCED MOCKUMENTARY</p><h1>${p.title}</h1><p>${p.setting}の公式資料、新聞、自治体記録、業者控え、個人サイト、掲示板を横断し、${p.date}の記録不一致を復元します。</p><div class="nav">${links}</div></div></section><section class="wrap section grid two"><div class="panel"><h2>遊び方</h2><p>最初から全リンクは揃っていません。検索語、メール、管理パス、隠しリンク、台帳の欠番を使い、作中サイトを別ウィンドウで調べてください。</p><p>照合ノートはプレイヤー用UIです。前段階を解くまで詳細は表示されません。</p></div><div class="panel"><h2>Background</h2><p>${p.setting}では、表向きには小さな業務事故として処理された記録が残っています。</p><p>しかし日付、時刻、鍵、台帳、欠番を重ねると、誰かが隠したのは事件そのものではなく、そこへ至る順路だったことが見えてきます。</p><p>直接的な怪異ではなく、別々のサイトが同じ沈黙を守っている不自然さを追う構成です。</p></div></section></main>`,"premium");
}

function investigate(p) {
  const qs = questions(p);
  const cards = qs.map((q,i)=>`<article class="q-card" data-q="${i+1}"><h3>照合 ${String(i+1).padStart(2,"0")}</h3><div class="locked-hide"><p>${q}</p><div class="answer-row"><input aria-label="回答${i+1}"><button onclick="checkAnswer(${i+1})">照合</button></div><p class="msg muted small"></p></div><p class="muted small">未解放の場合は詳細が表示されません。</p></article>`).join("");
  return html(p,"investigate/index.html","資料照合ノート",`<div class="premium-bg" style="--hero:url('../assets/hero.png')"></div><header class="wrap topbar"><a class="btn" href="../index.html">入口へ</a><div class="brand">INVESTIGATION NOTE</div><button class="btn" onclick="resetNote()">進行リセット</button></header><main class="wrap section"><section class="panel"><h1>資料照合ノート</h1><p>このページは作中サイトではなく、プレイヤーが資料を照合するための調査UIです。作中サイトは別ウィンドウで開いてください。</p></section>${cards}</main><script src="../site.js"></script>`,"premium");
}

function siteJs(p) {
  return `const answers=${JSON.stringify(answerList(p))};const norm=s=>(s||"").replace(/[\\s　]/g,"").replace(/[０-９]/g,c=>String.fromCharCode(c.charCodeAt(0)-0xFEE0)).toLowerCase();let unlocked=Number(localStorage.getItem("mystery_unlocked")||"1");function renderLocks(){document.querySelectorAll("[data-q]").forEach(card=>{const n=Number(card.dataset.q);card.classList.toggle("locked",n>unlocked);card.querySelectorAll("input,button").forEach(x=>x.disabled=n>unlocked)})}function checkAnswer(n){const card=document.querySelector('[data-q="'+n+'"]');const input=card.querySelector("input");const msg=card.querySelector(".msg");if(norm(input.value)===norm(answers[n-1])){msg.textContent=n===answers.length?"真相が開示されました。":"照合しました。次の記録を確認できます。";msg.className="msg ok";if(unlocked<n+1){unlocked=n+1;localStorage.setItem("mystery_unlocked",String(unlocked))}renderLocks()}else{msg.textContent="一致しません。別サイトの記録と重ねてください。";msg.className="msg ng"}}function resetNote(){localStorage.removeItem("mystery_unlocked");unlocked=1;renderLocks()}document.addEventListener("DOMContentLoaded",renderLocks);`;
}

function search(p) {
  const real = [["公式",`../official/index.html`,`${p.formal} 公開資料`,p.formal],["自治体",`../city/case/index.html`,`${p.caseId} 公開文書`,p.caseId],["新聞",`../news/index.html`,`${p.victim} 記事アーカイブ`,p.victim],["記録",`../logs/index.html`,`${p.missingLog} 欠落`,p.missingLog],["業者",`../contractor/index.html`,`${p.contractor} 保守控え`,p.contractor],["ブログ",`../blog/index.html`,`古い個人ブログ`,p.token],["掲示板",`../board/index.html`,`保存掲示板`,p.boardDate],["倉庫",`../archive/index.html`,`資料目録`,p.book]];
  const decoys = Array.from({length:32},(_,i)=>({title:`地域検索結果 ${i+1}`,href:"../news/index.html",snippet:"催事、求人、広告、過去記事など事件と関係が薄い結果。",keys:[p.formal.slice(0,2),"記録"],public:i<12}));
  const data = real.map(([label,href,title,key])=>({title,href,snippet:`${label}サイトの保存記録。検索語「${key}」で見つかる。`,keys:[key,p.caseId,p.formal],public:false})).concat(decoys);
  return html(p,"search/index.html","検索",`<main class="search"><h1>Search Archive</h1><form onsubmit="run();return false"><input id="q" placeholder="検索語"><button>検索</button></form><p class="muted">一単語で検索してください。空欄ではカモフラージュ結果が出ます。</p><section id="r"></section></main><script>const data=${JSON.stringify(data)};function run(){const q=document.getElementById('q').value.trim();const hits=data.filter(x=>(!q&&x.public)||x.keys.some(k=>k.includes(q)||q.includes(k)));document.getElementById('r').innerHTML=(hits.length?hits:data.filter(x=>x.public)).map(x=>'<article><a href="'+x.href+'" target="_blank" rel="noopener">'+x.title+'</a><p>'+x.snippet+'</p></article>').join('')}run();</script>`,``,`<style>body{background:#fff;color:#202124;font-family:Arial,"Meiryo",sans-serif}.search{max-width:860px;margin:0 auto;padding:70px 18px}.search h1{text-align:center;font-size:3rem;color:#2c65d8}.search form{display:flex;gap:8px}.search input{flex:1;border:1px solid #dfe1e5;border-radius:24px;padding:14px 20px}.search button{border:1px solid #ddd;background:#f8f9fa;padding:0 18px}.search article{border-bottom:1px solid #eee;padding:14px 0}.search a{color:#1a0dab;font-size:1.1rem}</style>`);
}

function mail(p) {
  const body = `<main class="mail"><aside><h1>メール</h1><p>保存箱 / ${p.date}</p></aside><section><article><h2>公開範囲とPASS</h2><p>${p.formal}の略号と最初の異常時刻を合わせます。管理パスは ${p.pass} です。</p></article><article><h2>夜間処理</h2><p>${p.key}は回収済み。${p.blocked}の記録は通常点検扱いにしてください。${p.victim}の件は${p.personnel}で処理します。</p></article><article><h2>写真の扱い</h2><p>${p.token}が写る画像はブログ側にも残っています。公開展示からは外してください。</p></article></section></main>`;
  return html(p,"mail/index.html","メール",body,"",`<style>body{background:#e8edf4;color:#202733}.mail{display:grid;grid-template-columns:260px 1fr;min-height:100vh}.mail aside{background:#243447;color:white;padding:26px}.mail section{padding:26px}.mail article{background:white;border:1px solid #cad3df;padding:16px;margin-bottom:14px}@media(max-width:720px){.mail{grid-template-columns:1fr}}</style>`);
}

function admin(p) {
  return html(p,"admin/index.html","管理",`<main class="admin"><section><h1>管理</h1><p>メールと公開記録から復元したパスコードが必要です。</p><input id="pw" placeholder="PASSCODE"><button onclick="login()">認証</button><p id="msg"></p><div id="vault" hidden><h2>閲覧制限記録</h2><ul><li><a href="../official/restricted/index.html" target="_blank" rel="noopener">${p.formal} 制限記録</a></li><li><a href="../logs/restricted/index.html" target="_blank" rel="noopener">${p.finalLog}</a></li><li><a href="../contractor/night/index.html" target="_blank" rel="noopener">夜間保守記録</a></li></ul></div></section></main><script>function login(){const ok=document.getElementById('pw').value.replace(/\\s/g,'').toUpperCase()==='${p.pass}';document.getElementById('msg').textContent=ok?'認証しました。':'認証できません。';document.getElementById('vault').hidden=!ok}</script>`,"",`<style>body{background:#06090e;color:#dce7f5;font-family:Consolas,"Meiryo",monospace}.admin{min-height:100vh;display:grid;place-items:center;padding:28px}.admin section{width:min(760px,100%);border:1px solid #30445f;background:#101721;padding:24px}.admin input{width:100%;background:#05070a;color:white;border:1px solid #53677f;padding:14px;margin:10px 0}.admin button{background:#d8e6ff;border:0;padding:12px 18px}.admin a{color:#b9d3ff}</style>`);
}

function sitePage(p, base, cls, title, pages) {
  const nav = pages.map(x=>`<a href="./${x.slug}/index.html">${x.short}</a>`).join("");
  write(path.join(p.dir,"web",base,"index.html"), html(p,`${base}/index.html`,title,`<header class="site-header"><div class="wrap"><h1>${title}</h1><nav>${nav}</nav></div></header><main class="wrap section grid two"><section class="box"><h2>公開情報</h2><ul>${pages.map(x=>`<li>${x.note}</li>`).join("")}</ul></section><img src="../assets/hero.png" alt=""></main>`,cls));
  for (const x of pages) {
    write(path.join(p.dir,"web",base,x.slug,"index.html"), html(p,`${base}/${x.slug}/index.html`,x.title,`<header class="site-header"><div class="wrap"><h1>${title}</h1><nav><a href="../index.html">一覧</a></nav></div></header><main class="wrap section"><section class="box"><h2>${x.title}</h2><p>${x.body}</p><table>${x.rows.map(r=>`<tr><th>${r[0]}</th><td>${r[1]}</td></tr>`).join("")}</table><p>${x.extra}</p></section></main>`,cls));
  }
}

function contentSites(p) {
  sitePage(p,"official","official",p.formal,[{slug:"map",short:"配置",title:"配置図",note:`${p.place}と${p.blocked}の位置関係。`,body:"公開用の配置図です。",rows:[["場所",p.place],["塞がれた退路",p.blocked],["備品",p.object]],extra:"説明図の一部が黒塗りです。"},{slug:"keys",short:"鍵",title:"鍵台帳",note:`${p.key}と${p.token}の記録。`,body:"鍵と持ち出し品の管理台帳です。",rows:[[p.key,`${p.time} ${p.culprit}`],[p.token,"ブログ側にも記録"],[p.room,"夜間入室"]],extra:"返却欄だけ翌朝の筆跡です。"},{slug:"restricted",short:"制限",title:"閲覧制限記録",note:`${p.finalLog}と${p.restore}。`,body:"内部閲覧用写しです。",rows:[[p.finalLog,`${p.restore} 復旧`],[p.blocked,"外側から閉鎖"],[p.place,"応答なし"]],extra:`処理担当は${p.culprit}。`}]);
  sitePage(p,"city","municipal",`${p.cityDept} 公開室`,[{slug:"case",short:p.caseId,title:`${p.caseId} 公開文書`,note:`発生日は${p.date}。`,body:"公開請求に基づく文書です。",rows:[["管理番号",p.caseId],["発生日",p.date],["人事処理",p.personnel],["追記",p.followDate]],extra:`正式名は${p.formal}。`},{slug:"archive",short:"目録",title:"資料移管一覧",note:`${p.book}が制限扱い。`,body:"移管資料の目録です。",rows:[[p.book,"閲覧制限"],[p.finalLog,"管理画面"],["通常欄",p.blank]],extra:"欠番処理が追記されています。"}]);
  sitePage(p,"logs","lab","記録保管室",[{slug:"missing",short:"欠落",title:p.missingLog,note:`${p.time}付近で欠落。`,body:"計測/業務ログの抜粋です。",rows:[[p.time,"異常"],[p.restore,"復旧"],[p.blank,"通常値ではなく空白扱い"]],extra:"他サイトの時刻と重ねる必要があります。"},{slug:"restricted",short:"制限",title:p.finalLog,note:`最終照合用ログ。`,body:"管理画面から参照された制限ログです。",rows:[[p.key,"使用"],[p.blocked,"閉鎖"],[p.culprit,"処理印"]],extra:"このログ単独では犯行は確定しません。"}]);
  sitePage(p,"contractor","contractor",p.contractor,[{slug:"staff",short:"担当",title:"担当者表",note:`${p.culprit}が夜間対応。`,body:"委託先の担当表です。",rows:[[p.culprit,p.culpritRole],[p.victim,p.role],[p.room,"夜間記録"]],extra:"メール本文と氏名が一致します。"},{slug:"invoice",short:"請求",title:"請求書控え",note:`発行者は${p.contractor}。`,body:"月末請求書の抜粋です。",rows:[[p.room,"夜間作業"],[p.blocked,"項目外"],["発行者",p.contractor]],extra:"項目外の作業が手書きで追記されています。"},{slug:"night",short:"夜間",title:"夜間保守記録",note:`${p.key}と${p.blocked}。`,body:"内部保管された夜間記録です。",rows:[[p.time,p.key],[p.restore,"復旧"],[p.blocked,"閉鎖"]],extra:`対応者は${p.culprit}。`}]);
  write(path.join(p.dir,"web","news","index.html"), html(p,"news/index.html","新聞縮刷版",`<div class="wrap section"><h1>地方新聞 縮刷版</h1><article><p>${p.date} / 社会</p><h2>${p.formal}で${p.role}が死亡</h2><p>${p.victim}さんの死亡が小さく報じられた。管理番号は${p.caseId}。</p></article><article><p>${p.boardDate} / 訂正</p><h2>人事処理の表現について</h2><p>記事中の表現は${p.personnel}に合わせて訂正します。</p></article><article><p>${p.followDate} / 地域</p><h2>資料公開へ</h2><p>${p.book}など一部資料は制限扱いとなる。</p></article></div>`,"news"));
  write(path.join(p.dir,"web","board","index.html"), html(p,"board/index.html","掲示板保存ログ",`<header class="site-header"><div class="wrap"><h1>掲示板保存ログ</h1></div></header><main class="wrap section">${["変な音","人事処理","古い写真","雑談"].map((t,i)=>`<section class="thread"><h2>${String(i+1).padStart(3,"0")} ${t}</h2><p><b>名無し</b> ${p.date} ${p.time}<br>${p.place}の方で音がしたらしい。</p><p><b>保存人</b> ${p.boardDate}<br>新聞訂正欄の日付だけ控えた。</p></section>`).join("")}</main>`,"board"));
  const blogEntries = Array.from({length:10},(_,i)=>`<article><h2>${i===0?p.token:"日記 "+(i+1)}</h2><p class="small">コメント(${i%4}) / 古いカテゴリ</p><p>${i===0?`${p.token}を見た。${p.key}と一緒に置かれていた気がする。`:"天気、買い物、仕事の愚痴、リンク切れのメモ。重要そうに見えない日常記事。"}</p></article>`).join("");
  write(path.join(p.dir,"web","blog","index.html"), html(p,"blog/index.html","個人ブログ",`<header class="site-header"><div class="wrap"><h1>個人ブログ</h1><p>${p.blogNote}</p></div></header><main class="wrap section bloggrid"><section>${blogEntries}</section><aside><h3>プロフィール</h3><p>古いブログ。広告と日記とリンク切れが多い。</p><h3>月別</h3><ul><li>${p.date.slice(0,4)}年</li><li>過去ログ</li><li>相互リンク</li></ul></aside></main>`,"blog2010"));
  write(path.join(p.dir,"web","archive","index.html"), html(p,"archive/index.html","資料目録",`<header class="site-header"><div class="wrap"><h1>資料目録</h1></div></header><main class="wrap section"><section class="box"><h2>移管資料</h2><table><tr><th>${p.book}</th><td>閲覧制限</td></tr><tr><th>${p.finalLog}</th><td>管理画面</td></tr><tr><th>${p.blank}</th><td>通常値ではなく空白扱い</td></tr></table></section></main>`,"municipal"));
}

function server(port) { return `import http from "node:http";import fs from "node:fs";import path from "node:path";import{fileURLToPath}from"node:url";const root=path.dirname(fileURLToPath(import.meta.url));const types={".html":"text/html; charset=utf-8",".css":"text/css; charset=utf-8",".js":"text/javascript; charset=utf-8",".png":"image/png"};http.createServer((req,res)=>{let u=decodeURIComponent(req.url.split("?")[0]);if(u.endsWith("/"))u+="index.html";let f=path.join(root,u);if(!f.startsWith(root)){res.writeHead(403);res.end("forbidden");return}fs.readFile(f,(e,d)=>{if(e){res.writeHead(404);res.end("not found");return}res.writeHead(200,{"Content-Type":types[path.extname(f)]||"application/octet-stream"});res.end(d)})}).listen(${port},"127.0.0.1",()=>console.log("http://127.0.0.1:${port}/web/index.html"));`; }

function readmes(p) {
  write(path.join(p.dir,"README.md"),`# ${p.title}\n\n上級編Web横断型モキュメンタリー謎解き。\n\n- 想定時間: 3〜5時間\n- 入口: web/index.html\n- 作中サイト: 8系統\n- Booth用フォルダ: ${p.boothDir}\n\n## 回答\n${answerList(p).map((a,i)=>`${i+1}. ${a}`).join("\n")}\n`);
  write(path.join(p.dir,"BOOTH_README.md"),`# ${p.title}\n\nweb/index.html から開始してください。\n\n想定時間は3〜5時間です。検索、メール、管理画面、資料照合ノートを使い、複数の作中サイトを調査します。\n\nZIP圧縮はまだ行っていません。\n`);
  write(path.join(p.dir,"HANDOFF.md"),`# ${p.title} 引継ぎ\n\n2026-05-18 作成。\n\n## 完了\n\n- 上級編として8系統の作中サイトを作成。\n- メインページと照合ノートは豪華レイアウトで統一。\n- 検索、メール、管理画面で段階的にページへ到達する構造。\n- ブログは作中年代に合わせたデザイン説明と日常記事を追加。\n- ChatGPT生成画像をassetsへ配置。\n- Booth用フォルダを作成。ZIPは未作成。\n\n## 未完了\n\n- 実プレイで難易度と所要時間を確認。\n- 必要ならヒントPDF、解答PDF、導入PDFを作成。\n`);
}

for (const p of projects) {
  p.dir = path.join(root, p.id);
  p.boothDir = path.join(root, `${p.id}_BoothPackage`, `${p.id}_Booth_v1`);
  const backup = path.join(root, "_backups", `${p.id}_pre_${stamp}`);
  if (fs.existsSync(p.dir) && fs.readdirSync(backup).length === 0) fs.cpSync(p.dir, path.join(backup, "project"), { recursive: true });
  if (fs.existsSync(p.boothDir) && fs.readdirSync(backup).length < 2) fs.cpSync(p.boothDir, path.join(backup, "booth"), { recursive: true });
  fs.rmSync(p.dir, { recursive: true, force: true });
  fs.rmSync(path.dirname(p.boothDir), { recursive: true, force: true });
  mkdir(path.join(p.dir,"web","assets"));
  copy(p.image, path.join(p.dir,"web","assets","hero.png"));
  copy(p.image, path.join(p.dir,"web","assets","evidence.png"));
  write(path.join(p.dir,"web","site.css"), siteCss);
  write(path.join(p.dir,"web","textflow.js"), textflow);
  write(path.join(p.dir,"web","site.js"), siteJs(p));
  write(path.join(p.dir,"web","index.html"), main(p));
  write(path.join(p.dir,"web","investigate","index.html"), investigate(p));
  write(path.join(p.dir,"web","search","index.html"), search(p));
  write(path.join(p.dir,"web","mail","index.html"), mail(p));
  write(path.join(p.dir,"web","admin","index.html"), admin(p));
  contentSites(p);
  write(path.join(p.dir,"server.mjs"), server(p.port));
  readmes(p);
  mkdir(p.boothDir);
  fs.cpSync(path.join(p.dir,"web"), path.join(p.boothDir,"web"), { recursive: true });
  copy(path.join(p.dir,"BOOTH_README.md"), path.join(p.boothDir,"BOOTH_README.md"));
  copy(path.join(p.dir,"server.mjs"), path.join(p.boothDir,"server.mjs"));
}

write(path.join(root,"ADVANCED_10_MYSTERIES_SUMMARY.md"),`# 上級編10種 制作メモ\n\n2026-05-18 作成。\n\n${projects.map((p,i)=>`${i+1}. ${p.title} / ${p.id} / port ${p.port}`).join("\n")}\n\n## 共通仕様\n\n- 入口と照合ノートは豪華レイアウト。\n- 作中サイトは8系統以上、サイトごとに見た目を分ける。\n- 初期リンクを揃えず、検索、メール、管理画面で段階到達させる。\n- ブログは作中年代に合わせ、日常記事、広告風文言、リンク切れ感を混ぜる。\n- 画像はChatGPT生成画像のみ使用。\n- Booth用フォルダは購入者向けファイルのみ。ZIP未作成。\n`);

console.log(projects.map(p=>`${p.id}:${p.port}`).join("\\n"));
