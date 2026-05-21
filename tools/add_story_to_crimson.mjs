import fs from "node:fs";
import path from "node:path";

const root = "C:/Users/kogit/Documents/Codex/CrimsonClinicMystery";
const booth = "C:/Users/kogit/Documents/Codex/CrimsonClinicMystery_BoothPackage/CrimsonClinicMystery_Booth_v1";

const questions = [
  ["第一章 事故として読む", "新聞と公式資料に共通する看護師の氏名を答えてください。", "新聞では小さな死亡記事、公式資料では勤務表の端。二つの場所に同じ名前が残っている。笠井朋子。まだこの時点では、彼女は事故に巻き込まれた職員でしかない。", "次は、事故日そのものが本当に同じ日として扱われているか確認する。"],
  ["第一章 事故として読む", "自治体資料と新聞日付欄から事件日を答えてください。", "1997年10月6日。新聞は翌朝の記事、自治体資料は発生日として記録している。日付は合う。けれど、合いすぎている。", "日付が整っているなら、次は時刻を見る。整った報告書ほど時刻の端が乱れる。"],
  ["第一章 事故として読む", "ログとメールから最初の異常時刻を答えてください。", "23:14。薬剤棚ではなく酸素バルブ側のログが先に動いている。死亡事故の報告書なら、最初に見るべきは患者ではなく設備だった。", "設備ログと配置図を重ね、異常が起きた部屋を確定する。"],
  ["第一章 事故として読む", "公式サイトの配置図と記録ログに共通する場所を答えてください。", "第二処置室。そこは夜間には使わない部屋として扱われていた。使わないはずの部屋で、使われないはずの酸素が動いた。", "この段階で事故番号を確定する。番号は、誰かが事件を整理した順番でもある。"],
  ["第一章 事故として読む", "自治体で管理番号になっているIDを答えてください。", "CRN-1006。事故番号は日付から機械的につけられたように見える。だが番号が先にあると、後から入る資料は全部その箱に入れられる。", "第一章完了。資料目録に移り、箱の中で一冊だけ扱いが違うものを探す。"],
  ["第二章 記録の箱を開ける", "資料目録で制限扱いになった冊子名を答えてください。", "カルテ第八冊。患者名簿でも診療日誌でもなく、カルテそのものが制限された。事故を設備の問題として処理するには、カルテは邪魔だった。", "冊子ではなく、夜に動いた部屋を追う。業者記録は公式記録より嘘が下手だ。"],
  ["第二章 記録の箱を開ける", "業者記録と鍵台帳から夜間に記録された部屋を答えてください。", "薬品保管庫。事故現場ではない部屋が夜間作業に入っている。薬品保管庫は第二処置室と廊下一本でつながっている。", "自治体側の部署名を確認する。部署名は、誰がこの記録を受け取ったかを示す。"],
  ["第二章 記録の箱を開ける", "検索結果に出る担当部署名を答えてください。", "地域医療課。診療所の内部事故にしては、公開室ではなく地域医療課が資料を持っている。医療事故ではなく、地域施設の閉鎖処理として扱われた可能性が出る。", "物証を探す。ブログの古い日記は、公式記録より余計なものを写している。"],
  ["第二章 記録の箱を開ける", "ブログ写真メモと備品表に共通する物を答えてください。", "予備酸素ボンベ。備品表では倉庫、ブログでは処置室のそば。移動したのはボンベではなく、記録上の置き場所かもしれない。", "欠落ログの名前を確定する。なくなったものは、残ったものよりよくしゃべる。"],
  ["第二章 記録の箱を開ける", "記録台帳で欠落しているログ名を答えてください。", "酸素バルブログ。事故の核になるログだけが抜けている。ここで初めて、事故ではなく改竄の可能性が中心に来る。", "第二章完了。次は人を見る。鍵を扱える人物は少ない。"],
  ["第三章 人の名前を読む", "メールと担当表から夜間対応者名を答えてください。", "早瀬修。担当表では医師、メールでは夜間処理の宛先。彼は事故後に現場へ来た人ではなく、事故前から現場を動かせた人だった。", "持ち出し物の色を確認する。色のある物だけが、古い日記に残りやすい。"],
  ["第三章 人の名前を読む", "古い個人記事と鍵台帳に共通する持ち出し物を答えてください。", "赤い鍵札。鍵ではなく札が記録に残るのは、鍵束から外された痕跡がある時だ。赤い札は夜間カードと別の管理だった。", "復旧時刻を探す。事件は発生時刻だけでなく、復旧時刻で形が決まる。"],
  ["第三章 人の名前を読む", "制限記録で復旧が記録された時刻を答えてください。", "00:02。23:14から48分後。処置室の事故としては長すぎる沈黙で、記録の修正作業としては短すぎる。", "人事処理を見る。亡くなった人をどう扱ったかに、組織の都合が出る。"],
  ["第三章 人の名前を読む", "人事処理で被害者はどの扱いにされたか答えてください。", "退職扱い。死亡ではなく退職。記録上、笠井朋子は診療所を去ったことになっている。去った人なら、夜の処置室にいた理由を説明しなくていい。", "訂正日の差を確認する。訂正はミスを直すためだけにあるのではない。"],
  ["第三章 人の名前を読む", "新聞訂正欄と自治体追記欄で一致する日付を答えてください。", "1997/10/07。事故翌日に訂正と追記が同時に入っている。誰かが新聞と自治体資料の両方に手を伸ばした。", "第三章完了。ここからは制限記録を開き、正式名と鍵の語を確定する。"],
  ["第四章 塞がれた退路", "制限記録の表題に残る正式名称を答えてください。", "紅坂診療所。表題だけは消されていない。施設名が残っているのは、責任を個人ではなく施設に寄せるためだった。", "鍵台帳とメールを重ねる。鍵そのものではなく、運用名が必要になる。"],
  ["第四章 塞がれた退路", "鍵台帳とメール添付の一致語を答えてください。", "夜間カード。鍵ではなくカード。つまり施錠は物理鍵だけでなく、入退室記録として残る。誰かがそこを改竄した。", "塞がれた場所を探す。現場の部屋ではなく、そこから出る道を見る。"],
  ["第四章 塞がれた退路", "業者メモと制限ログで塞がれていた場所を答えてください。", "裏口廊下。第二処置室の正面ではなく、裏口廊下。逃げ道だけを塞ぐなら、事故に見せることができる。", "業者名を確定する。業者記録は、施設内の誰かが外の名前を借りた痕跡になる。"],
  ["第四章 塞がれた退路", "請求書の発行者として残る会社名を答えてください。", "紅坂医療設備。請求書は現場作業の理由を後から作る紙だ。薬品保管庫の作業は、そのための名目になった。", "空白扱いの語を探す。数値よりも、空欄につけた名前が重要になる。"],
  ["第四章 塞がれた退路", "台帳で通常値ではなく空白扱いになっている記録語を答えてください。", "欠番。欠測ではなく欠番。測れなかったのではなく、番号ごと抜かれた。記録は壊れたのではなく、抜かれた。", "第四章完了。残りは、いつ誰が最終的に書き換えたか。掲示板の保存日まで使う。"],
  ["第五章 訂正されなかった夜", "掲示板保存ログと新聞訂正欄で一致する日付を答えてください。", "1997/10/08。公式の訂正より一日遅く、掲示板には別の言い方で噂が残った。消せたのは記録だけで、見た人の順番までは消せなかった。", "管理画面の制限ログ名を答える。最後に必要なのは、現場の記録ではなく薬剤棚の記録だ。"],
  ["第五章 訂正されなかった夜", "管理画面の制限記録で最終照合に必要なログ名を答えてください。", "薬剤棚ログ。酸素バルブログではなく薬剤棚ログ。事故の原因を酸素に見せるには、薬剤棚に触れた理由を隠す必要があった。", "ここまで到達した画面名を確認する。プレイヤーが開いたもの自体が、作中にはない外側の記録になる。"],
  ["第五章 訂正されなかった夜", "この情報群へ到達するためのプレイヤー用画面名を答えてください。", "管理画面。作中サイトには存在しないはずの入口。つまりプレイヤーは、公開された資料ではなく、公開されなかった夜を見ている。", "最後は一文でまとめる。人物、被害者、場所、退路。余計な解釈を足さず、記録だけで閉じる。"],
  ["第五章 訂正されなかった夜", "最終照合として、犯人、被害者、場所、塞がれた退路を一文で答えてください。", "真相が揃った。早瀬修が笠井朋子を第二処置室へ誘導し、夜間カードを使って裏口廊下から退路を塞いだ。事故報告書は、死因ではなく順路を隠していた。", "全章完了。紅坂診療所の記録は、事故を説明するためではなく、笠井朋子がそこにいた理由を消すために作られていた。"]
];

const chapters = [
  ["第一章", "事故として読む", "新聞、公式資料、自治体文書を重ね、まずは報告書どおりに事故を読む。ここではまだ疑わない。疑う前に、揃いすぎた情報を覚えておく。", 1, 5],
  ["第二章", "記録の箱を開ける", "資料目録、業者控え、ブログを横断し、事故の中心が処置室から記録の欠落へ移る。何が起きたかではなく、何を抜いたかを見る。", 6, 10],
  ["第三章", "人の名前を読む", "夜間対応者、持ち出し物、人事処理を追い、組織の都合ではなく個人の動線を読む。名前が増えるほど、沈黙は狭くなる。", 11, 15],
  ["第四章", "塞がれた退路", "制限記録、鍵台帳、請求書を重ね、現場の外側を確定する。犯行は部屋の中ではなく、出られない状態を作った場所に残る。", 16, 20],
  ["第五章", "訂正されなかった夜", "訂正欄、掲示板、管理画面を重ね、最後に報告書が隠したものを一文に戻す。怖さは怪異ではなく、正しく整えられた嘘にある。", 21, 24]
];

function cardHtml([chapter, q], i) {
  const n = i + 1;
  return `<article class="q-card" data-q="${n}">
<div class="q-meta"><span>${chapter}</span><span>照合 ${String(n).padStart(2, "0")}</span></div>
<h3>${q}</h3>
<div class="locked-hide">
<div class="answer-row"><input aria-label="回答${n}" autocomplete="off"><button onclick="checkAnswer(${n})">照合</button></div>
<p class="msg muted small"></p>
</div>
<p class="muted small locked-note">前段階を照合すると入力欄が表示されます。</p>
</article>`;
}

const chapterHtml = chapters.map(([label, title, body, start, end], i) => `<article class="story-chapter" data-chapter="${i + 1}" data-start="${start}">
<p class="story-label">${label}</p>
<h2>${title}</h2>
<p>${body}</p>
<p class="small muted">照合 ${String(start).padStart(2, "0")}〜${String(end).padStart(2, "0")}</p>
</article>`).join("");

const fragmentHtml = questions.map(([, , body, hint], i) => `<article class="story-fragment" data-fragment="${i + 1}">
<p class="story-label">記録断片 ${String(i + 1).padStart(2, "0")}</p>
<p>${body}</p>
<p class="story-next">${hint}</p>
</article>`).join("");

const investigate = `<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>資料照合ノート | 紅坂診療所 カルテ改竄事件</title>
<link rel="stylesheet" href="../site.css">
</head>
<body class="premium story-mode">
<div class="premium-bg" style="--hero:url('../assets/hero.png')"></div>
<header class="wrap topbar">
<a class="btn" href="../index.html">入口へ</a>
<div class="brand">INVESTIGATION NOTE</div>
<button class="btn" onclick="resetNote()">進行リセット</button>
</header>
<main class="wrap section story-layout">
<section class="panel story-intro">
<p class="story-label">STORY TEMPLATE</p>
<h1>資料照合ノート</h1>
<p>このページは作中サイトではなく、プレイヤーが資料を照合するための調査UIです。答えを照合するたびに、調査記録の断片と次の視点が解放されます。</p>
<p>このテンプレでは、単に答えを集めるのではなく、事故として読んだ記録が、改竄、人物、退路、真相へ段階的に変わっていきます。</p>
</section>
<section class="story-board panel">
<div class="story-progress"><span id="storyProgress">0/24</span><span id="storyChapter">第一章</span></div>
<h2 id="storyHeadline">まだ事故報告書の外へ出ていない</h2>
<p id="storyLead">最初の照合を終えると、調査記録がここに積み重なります。</p>
<div class="chapter-grid">${chapterHtml}</div>
</section>
<section class="story-stream panel">
<h2>解放された記録断片</h2>
<div id="storyFragments">${fragmentHtml}</div>
</section>
<section class="question-list">
${questions.map(cardHtml).join("\n")}
</section>
</main>
<script src="../site.js"></script>
<script src="../story.js"></script>
<script src="../textflow.js"></script>
</body>
</html>`;

const storyJs = `const storyStates=[
["まだ事故報告書の外へ出ていない","最初の照合を終えると、調査記録がここに積み重なります。","第一章"],
["事故の輪郭が揃った","日付、時刻、場所が整いすぎている。次は、整った箱の中で扱いが違う資料を探します。","第一章"],
["記録の欠落が中心になった","事故現場より先に、消されたログと移された冊子が見え始めています。","第二章"],
["人の動線が残り始めた","早瀬修、赤い鍵札、00:02。記録の主語が設備から人へ移りました。","第三章"],
["退路が事件の形を決めた","第二処置室ではなく裏口廊下。閉じた場所ではなく、出られない状態を作った場所を見る段階です。","第四章"],
["訂正されなかった夜に届いた","最後は管理画面と薬剤棚ログで、報告書が何を隠したかを一文に戻します。","第五章"]
];
function currentSolved(){return Math.max(0, Number(localStorage.getItem("mystery_unlocked")||"1")-1)}
function renderStory(){
  const solved=currentSolved();
  const stage=solved>=21?5:solved>=16?4:solved>=11?3:solved>=6?2:solved>=1?1:0;
  const s=storyStates[stage];
  document.getElementById("storyProgress").textContent=solved+"/24";
  document.getElementById("storyChapter").textContent=s[2];
  document.getElementById("storyHeadline").textContent=s[0];
  document.getElementById("storyLead").textContent=s[1];
  document.querySelectorAll(".story-chapter").forEach(el=>{
    const start=Number(el.dataset.start);
    el.classList.toggle("is-open", solved+1>=start);
  });
  document.querySelectorAll(".story-fragment").forEach(el=>{
    const n=Number(el.dataset.fragment);
    el.classList.toggle("is-open", n<=solved);
  });
  document.body.dataset.storyStage=String(stage);
}
const baseCheckAnswer=window.checkAnswer;
window.checkAnswer=function(n){
  baseCheckAnswer(n);
  renderStory();
};
const baseResetNote=window.resetNote;
window.resetNote=function(){
  baseResetNote();
  renderStory();
};
document.addEventListener("DOMContentLoaded", renderStory);
`;

const cssAppend = `

.story-mode .story-layout{display:grid;gap:18px}.story-intro h1{font-family:Georgia,"Yu Mincho",serif;font-size:2.2rem}.story-label{font-size:.76rem;letter-spacing:.16em;color:#9fb1ca;text-transform:uppercase}.story-board,.story-stream{position:relative;overflow:hidden}.story-progress{display:flex;justify-content:space-between;gap:12px;border-bottom:1px solid rgba(255,255,255,.14);padding-bottom:10px;margin-bottom:14px;color:#c9d6e8}.chapter-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:10px;margin-top:18px}.story-chapter{border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.04);padding:12px;opacity:.38}.story-chapter.is-open{opacity:1;background:rgba(180,205,255,.08)}.story-chapter h2{font-size:1rem;margin:.2rem 0}.story-fragment{display:none;border-left:3px solid #9fb7d9;background:rgba(255,255,255,.05);padding:14px;margin:12px 0}.story-fragment.is-open{display:block}.story-next{color:#d4e2f7;border-top:1px solid rgba(255,255,255,.12);padding-top:10px}.q-meta{display:flex;justify-content:space-between;gap:10px;color:#9fb1ca;font-size:.78rem;letter-spacing:.06em}.story-mode .q-card h3{margin:.45rem 0 1rem}.story-mode .q-card.locked h3{color:#9aa4b4}.story-mode[data-story-stage="3"] .premium-bg:after{background:radial-gradient(circle at 18% 12%,rgba(255,180,160,.2),transparent 34%),linear-gradient(90deg,rgba(2,4,9,.92),rgba(2,4,9,.48),rgba(2,4,9,.94))}.story-mode[data-story-stage="5"] .premium-bg:after{background:radial-gradient(circle at 20% 15%,rgba(255,90,90,.18),transparent 34%),linear-gradient(90deg,rgba(1,2,5,.95),rgba(10,4,4,.56),rgba(1,2,5,.96))}@media(max-width:900px){.chapter-grid{grid-template-columns:1fr}.story-progress{flex-direction:column}}
`;

function copyToBooth(rel) {
  const src = path.join(root, rel);
  const dst = path.join(booth, rel);
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  fs.copyFileSync(src, dst);
}

writeFile("web/investigate/index.html", investigate);
writeFile("web/story.js", storyJs);
fs.appendFileSync(path.join(root, "web", "site.css"), cssAppend, "utf8");
copyToBooth("web/investigate/index.html");
copyToBooth("web/story.js");
copyToBooth("web/site.css");

fs.appendFileSync(path.join(root, "HANDOFF.md"), `

## 2026-05-18 ストーリー進行テンプレ化

- 資料照合ノートをストーリー進行型に変更。
- 5章構成を追加。照合の進行に応じて章説明、記録断片、次の視点が解放される。
- 各問の正解後に、単なる正誤ではなく物語上の意味が開くようにした。
- 章ごとに事故、欠落、人、退路、真相へ焦点が移る構成に変更。
- Booth用フォルダ側にも同じ変更を反映。
`, "utf8");

function writeFile(rel, text) {
  const file = path.join(root, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, text, "utf8");
}

console.log("story template added to CrimsonClinicMystery");
