const app = document.querySelector("#app");
const nav = document.querySelector("#nav");
const menu = document.querySelector("#menu");
const footerLog = document.querySelector("#footer-log");

const answers = {
  id: ["404", "４０４"],
  pass: ["秘密録", "ひみつろく", "ヒミツロク"],
  dept: ["監査室", "かんさしつ", "カンサシツ"],
  key: ["疑え", "うたがえ", "ウタガエ"],
  final: ["証言者", "しょうげんしゃ", "ショウゲンシャ", "witness", "WITNESS"],
  bad: ["社員", "応募者", "沈黙", "silent", "SILENT"]
};

const pageMeta = {
  "/": { title: "株式会社ユメミノ総合研究所 | 採用適性検査", stage: "public", footer: "この作品はフィクションです。実在の企業・団体・人物とは関係ありません。" },
  "/about": { title: "企業理念 | 株式会社ユメミノ総合研究所", stage: "public", footer: "この作品はフィクションです。実在の企業・団体・人物とは関係ありません。" },
  "/recruit": { title: "採用情報 | 株式会社ユメミノ総合研究所", stage: "public", footer: "この作品はフィクションです。実在の企業・団体・人物とは関係ありません。" },
  "/ir": { title: "IR情報 | 株式会社ユメミノ総合研究所", stage: "public", footer: "この作品はフィクションです。実在の企業・団体・人物とは関係ありません。" },
  "/login": { title: "社員専用 | YRI人事ポータル", stage: "hr", footer: "© Yumemino Research Institute, Inc. / All logs reserved." },
  "/employee-404": { title: "社員404 | YRI人事ポータル", stage: "hr", footer: "© Yumemino Research Institute, Inc. / All logs reserved." },
  "/audit": { title: "監査室 | 削除済み文書", stage: "audit", footer: "© Yumemino Research Institute, Inc. / Your logs reserved." },
  "/archive": { title: "監査室アーカイブ | 保護文書一覧", stage: "audit", footer: "© Yumemino Research Institute, Inc. / Your logs reserved." },
  "/final": { title: "外部監査送信キュー | 最終告発フォーム", stage: "audit", footer: "© Yumemino Research Institute, Inc. / Your logs reserved." },
  "/hints": { title: "ヒント | 採用適性検査", stage: "public", footer: "この作品はフィクションです。実在の企業・団体・人物とは関係ありません。" }
};

const hintData = [
  { id: "q1", title: "第1問", hints: ["企業理念ページの見出しを確認します。", "4つの価値観の先頭に注目します。", "ミッション、ギャップレス評価、ウェルビーイング支援、エンゲージメント分析。"], answer: "右上" },
  { id: "q2", title: "第2問", hints: ["合言葉は採用ページの社員インタビューにあります。", "本文中で少しだけ印が付いた文字を拾います。", "秘、密、録の順に読みます。"], answer: "秘密録" },
  { id: "q3", title: "第3問", hints: ["社員IDはIR情報の中にあります。", "人的資本データ表と注釈を見比べます。", "表示制限中のアカウントを含む社員数です。"], answer: "404" },
  { id: "q4", title: "第4問", hints: ["社員404ページのアラート条件を使います。", "3、5、7番目のログを確認します。", "該当行の先頭の文字を順に読みます。"], answer: "監査室" },
  { id: "q5", title: "第5問", hints: ["復元キーは理念の反対です。", "会社は疑問を減らすと書いています。", "減らすの反対は、持ち続けることです。"], answer: "疑え" },
  { id: "q6", title: "第6問", hints: ["黒塗り文書名を自然な社内文書名に戻します。", "本文の単語から、＿拠、発＿、対象＿に入る字を推測します。", "欠けた文字だけを上から読みます。"], answer: "証言者" }
];

function normalizeAnswer(value) {
  return (value || "")
    .trim()
    .replace(/[Ａ-Ｚａ-ｚ０-９]/g, char => String.fromCharCode(char.charCodeAt(0) - 0xFEE0))
    .toLowerCase();
}

function accepts(value, list) {
  const normalized = normalizeAnswer(value);
  return list.some(answer => normalizeAnswer(answer) === normalized);
}

function route() {
  const raw = location.hash.replace(/^#/, "") || "/";
  return pageMeta[raw] ? raw : "/";
}

function go(path) {
  location.hash = path;
}

function setMessage(selector, text, type = "error") {
  const el = document.querySelector(selector);
  if (!el) return;
  el.textContent = text;
  el.className = `message ${type}`;
}

function crumb(items) {
  return `<nav class="breadcrumb" aria-label="パンくず"><a href="#/">HOME</a>${items.map(item => `<i>/</i><span>${item}</span>`).join("")}</nav>`;
}

function image(src, alt, className = "") {
  return `<img class="${className}" src="assets/${src}" alt="${alt}" loading="lazy">`;
}

function layout(content, stage) {
  document.body.dataset.stage = stage;
  app.className = `page ${stage}-stage`;
  app.innerHTML = content;
  app.focus({ preventScroll: true });
}

function publicShell(content, modifier = "") {
  layout(`<div class="public-document ${modifier}">${content}</div>`, "public");
}

function hrShell(active, content) {
  layout(`
    <div class="hr-app">
      <aside class="hr-menu" aria-label="社内人事ポータルメニュー">
        <div class="hr-menu-title">
          <b>YRI人事ポータル</b>
          <span>社員管理 / 感情ログ / 監査連携</span>
        </div>
        <a class="${active === "login" ? "is-active" : ""}" href="#/login">認証</a>
        <a class="${active === "employee" ? "is-active" : ""}" href="#/employee-404">社員マスタ</a>
        <a href="#/employee-404">面談履歴</a>
        <a href="#/employee-404">感情ログ</a>
        <a href="#/employee-404">権限情報</a>
        <a href="#/employee-404">操作ログ</a>
        <small>接続先: hr-master-prd-04 / 同期状態: 遅延あり</small>
      </aside>
      <section class="hr-workarea">${content}</section>
    </div>
  `, "hr");
}

function auditShell(content) {
  layout(`
    <div class="audit-frame">
      <header class="audit-bar">
        <b>監査室 文書閲覧端末</b>
        <span>閲覧権限: 一時付与 / 出力制限: 有効</span>
        <a href="#/hints">ヒント</a>
      </header>
      ${content}
    </div>
  `, "audit");
}

const pages = {
  "/": () => publicShell(`
    <div class="notice-strip">
      <b>重要なお知らせ</b>
      <span>2025年度 採用適性検査の受付を開始しました。受検中の操作ログは品質改善のため記録されます。</span>
    </div>

    <section class="top-ledger">
      <div class="top-copy">
        ${crumb(["企業情報"])}
        <p class="doc-label">株式会社ユメミノ総合研究所 企業情報</p>
        <h1>人の可能性を、正しく測る。</h1>
        <p>ユメミノ総合研究所は、働く人々の感情・行動・意思決定を可視化し、組織が抱える不安を未然に整える研究開発企業です。迷いのない職場へ。疑問の少ないチームへ。すべての人が、安心して働き続けられる社会へ。</p>
        <dl class="definition-strip">
          <div><dt>設立</dt><dd>2017年4月</dd></div>
          <div><dt>本社</dt><dd>東京都架空区白路町</dd></div>
          <div><dt>事業領域</dt><dd>感情ログ解析 / 人的資本モニタリング</dd></div>
        </dl>
      </div>
      <aside class="top-photo-box">
        ${image("hero-2026-data-layer.png", "ユメミノ総合研究所の受付と業務フロア")}
        <p>本社4階 解析業務フロア。写真は採用広報用に撮影されたものです。</p>
      </aside>
    </section>

    <section class="newspaper-grid">
      <article class="company-column">
        <h2>会社概要</h2>
        <table class="compact-table">
          <tbody>
            <tr><th>会社名</th><td>株式会社ユメミノ総合研究所</td></tr>
            <tr><th>代表者</th><td>代表取締役社長 夢野 透</td></tr>
            <tr><th>所在地</th><td>東京都架空区白路町 4-04-4</td></tr>
            <tr><th>事業内容</th><td>感情ログ解析、人的資本モニタリング、組織安定化支援</td></tr>
            <tr><th>届出区分</th><td>架空情報処理事業者 登録第YRI-1704号</td></tr>
          </tbody>
        </table>
      </article>
      <article class="business-column">
        <h2>事業内容</h2>
        <section>
          <h3>感情ログ解析事業</h3>
          <p>従業員が日々入力する気分・疲労・不安・疑問の変化を時系列で解析し、部署単位の状態変化を月次資料として整理します。</p>
        </section>
        <section>
          <h3>人的資本モニタリング事業</h3>
          <p>離職予兆、面談頻度、発言量の偏りを指標化し、経営企画・人事・IR担当者向けに補足資料を作成します。</p>
        </section>
        <section>
          <h3>組織安定化支援</h3>
          <p>従業員の不安が表面化する前に、情報導線、面談設計、配置確認の手順を整備します。</p>
        </section>
      </article>
      <aside class="kpi-column">
        <h2>主要指標</h2>
        <dl class="small-kpi">
          <div><dt>導入組織数</dt><dd>184組織</dd></div>
          <div><dt>月間ログ件数</dt><dd>2,409,118件</dd></div>
          <div><dt>面談推奨件数</dt><dd>18,430件</dd></div>
          <div><dt>離職予兆検出率</dt><dd>92.4%</dd></div>
          <div><dt>記録保護件数</dt><dd>非公開</dd></div>
        </dl>
        <p class="micro-note">※記録保護件数は個人情報保護および内部統制上の理由により非開示です。</p>
      </aside>
    </section>

    <section class="top-lower-grid">
      <article class="field-list">
        <h2>導入領域</h2>
        <ul>
          <li>上場企業の人的資本開示支援</li>
          <li>コールセンターの離職抑制</li>
          <li>自治体職員のストレスチェック補助</li>
          <li>教育機関の相談傾向分析</li>
          <li>採用選考における違和感検出</li>
        </ul>
      </article>
      <article class="news-ledger">
        <h2>お知らせ</h2>
        <a href="#/recruit"><time>2025.12.01</time><span>2025年度 採用適性検査の受付を開始しました。</span></a>
        <a href="#/ir"><time>2025.11.18</time><span>人的資本データの可視化に関する補足資料を公開しました。</span></a>
        <a href="#/ir"><time>2025.10.30</time><span>従業員幸福度改善システムの運用手順を更新しました。</span></a>
        <a href="#/login"><time>2025.08.07</time><span>一部社員情報の表示不具合について。現在は復旧済みです。</span></a>
        <a href="#/about"><time>2025.04.12</time><span>内部通報管理規程を改定しました。</span></a>
      </article>
      <article class="test-guide">
        <h2>採用適性検査への案内</h2>
        <p>本検査では、回答だけでなく、確認したページ、入力修正、ヒント利用状況を選考資料として扱います。公開情報の中に残された記録を順に照合してください。</p>
        <a class="plain-button" href="#/recruit">採用情報を確認する</a>
      </article>
    </section>
  `, "home-layout"),

  "/about": () => publicShell(`
    <section class="pamphlet-head">
      ${crumb(["企業理念"])}
      <div>
        <p class="doc-label">企業理念・データ管理方針</p>
        <h1>企業理念</h1>
        <p>私たちは、人の迷いを減らし、組織の意思決定をなめらかにするために存在します。働く人が何に不安を感じ、どこで立ち止まり、どの瞬間に疑問を持つのか。それらを丁寧に記録し、分析し、組織が先回りして整えることで、誰もが安心して働ける環境を実現します。</p>
      </div>
    </section>

    <section class="about-layout">
      <article class="philosophy-table-wrap">
        <h2>4つの価値観</h2>
        <table class="philosophy-table">
          <tbody>
            <tr><th><span>ミ</span>ッション</th><td>人の不安を、測定可能な状態にします。</td></tr>
            <tr><th><span>ギ</span>ャップレス評価</th><td>感情・行動・成果の差分を可視化します。</td></tr>
            <tr><th><span>ウ</span>ェルビーイング支援</th><td>従業員が迷わず働ける環境を整えます。</td></tr>
            <tr><th><span>エ</span>ンゲージメント分析</th><td>組織にとって望ましい状態を維持します。</td></tr>
          </tbody>
        </table>
        <p class="micro-note">※当社では、従業員の疑問や不安を早期に把握することを「心理的安全性の維持」と定義しています。</p>
      </article>

      <aside class="president-note">
        <h2>代表メッセージ</h2>
        <p>組織の問題は、声が大きくなってからでは遅い場合があります。ユメミノ総合研究所は、声になる前の揺らぎを記録し、働く人と組織の間にある温度差を丁寧に整えます。</p>
        <p class="signature">代表取締役社長　夢野 透</p>
      </aside>

      <article class="policy-note">
        <h2>データ管理方針</h2>
        <ol>
          <li>ログは本人の健康管理および組織安定化の目的で保管します。</li>
          <li>監査上必要な場合、人事部および監査室が記録を参照します。</li>
          <li>記録保護状態のアカウントは、通常検索結果から除外されることがあります。</li>
        </ol>
      </article>

      <article class="company-profile-box">
        <h2>会社概要</h2>
        <table class="compact-table">
          <tbody>
            <tr><th>会社名</th><td>株式会社ユメミノ総合研究所</td></tr>
            <tr><th>設立</th><td>2017年4月</td></tr>
            <tr><th>所在地</th><td>東京都架空区白路町 4-04-4</td></tr>
            <tr><th>代表者</th><td>代表取締役社長 夢野 透</td></tr>
            <tr><th>事業内容</th><td>感情ログ解析、人的資本モニタリング、組織安定化支援</td></tr>
            <tr><th>従業員数</th><td>404名</td></tr>
          </tbody>
        </table>
      </article>
    </section>
  `, "about-layout-page"),

  "/recruit": () => publicShell(`
    <section class="recruit-header">
      ${crumb(["採用情報"])}
      <h1>採用情報</h1>
      <p>変化に迷わず、組織と同じ方向を向ける人へ。ユメミノ総合研究所では、感情データを通じて組織の不安を整える仲間を募集しています。</p>
    </section>

    <section class="recruit-layout">
      <article class="requirements-sheet">
        <h2>募集要項</h2>
        <table class="dense-table">
          <tbody>
            <tr><th>募集職種</th><td>感情ログアナリスト / 組織安定化コンサルタント / 採用適性検査オペレーター</td></tr>
            <tr><th>勤務地</th><td>東京都架空区白路町 本社、または提携先執務室</td></tr>
            <tr><th>業務内容</th><td>ログ確認、面談設計、部署別レポート作成、選考時の閲覧傾向確認</td></tr>
            <tr><th>勤務時間</th><td>9:00-18:00。ログ確認当番日は別途シフト表による。</td></tr>
            <tr><th>提出書類</th><td>履歴書、職務経歴書、感情ログ利用同意書</td></tr>
          </tbody>
        </table>
      </article>

      <aside class="selection-flow">
        <h2>選考フロー</h2>
        <ol>
          <li><span>01</span>エントリー</li>
          <li><span>02</span>Web採用適性検査</li>
          <li><span>03</span>一次面談</li>
          <li><span>04</span>感情ログ提出</li>
          <li><span>05</span>配属前確認</li>
          <li><span>06</span>内定</li>
        </ol>
        <p class="micro-note">※正答率だけでなく、迷った時間・戻ったページ・入力の修正回数も確認します。</p>
      </aside>

      <article class="interview-paper">
        <h2>社員インタビュー</h2>
        <section>
          <h3>社員A　感情ログアナリスト</h3>
          <p>入社してから、仕事の<span class="print-mark">秘</span>訣は「考えすぎないこと」だと知りました。以前よりも悩む時間が減り、毎朝すぐに行動できます。上長が先に不安を見つけてくれるので、自分で抱え込む必要がありません。</p>
        </section>
        <section>
          <h3>社員B　組織安定化コンサルタント</h3>
          <p>一人ひとりの感情の<span class="print-mark">密</span>度まで見てくれるので、孤独を感じることがありません。今では、自分の気持ちよりもチームの状態を優先できます。疑問がある時も、まずはログに残すことで安心できます。</p>
        </section>
        <section>
          <h3>社員C　採用適性検査オペレーター</h3>
          <p>毎朝のログは、自分の変化を残す大切な記<span class="print-mark">録</span>です。最初は少し戸惑いましたが、今では記録されない時間のほうが不安です。応募者の方にも、同じ安心を体験してほしいと思っています。</p>
        </section>
      </article>

      <aside class="training-and-faq">
        <h2>研修制度</h2>
        <ul>
          <li>入社時ログ取扱研修</li>
          <li>面談同席研修</li>
          <li>個人情報保護・監査連携研修</li>
        </ul>
        <h2>よくある質問</h2>
        <details open><summary>感情ログは必ず入力する必要がありますか？</summary><p>入力は任意ですが、未入力が続く場合は状態確認の対象となることがあります。</p></details>
        <details><summary>疑問や不安を入力すると評価に影響しますか？</summary><p>直接の評価項目ではありません。ただし、組織安定化のため必要な範囲で参照されます。</p></details>
        <details><summary>外部相談窓口はありますか？</summary><p>まずは上長または監査室にご相談ください。外部機関への相談は、状況を複雑にする場合があります。</p></details>
      </aside>
    </section>
  `, "recruit-layout-page"),

  "/ir": () => publicShell(`
    <section class="ir-header-block">
      ${crumb(["IR情報"])}
      <h1>IR情報</h1>
      <p>ユメミノ総合研究所は、人的資本データの透明性を重視し、組織状態の定量的な開示に取り組んでいます。本ページでは、売上高、社員数、離職率、面談件数、感情ログ入力率などの主要指標を掲載しています。</p>
      <p class="micro-note">資料番号: IR-YRI-2025-Q4 / 最終更新: 2025.12.01 / 担当部署: 経営企画部</p>
    </section>

    <section class="ir-ledger-layout">
      <article class="ir-main-table">
        <h2>人的資本データ</h2>
        <table class="ir-ledger-table">
          <thead><tr><th>年度</th><th>売上高</th><th>社員数</th><th>離職率</th><th>面談件数</th><th>感情ログ入力率</th></tr></thead>
          <tbody>
            <tr><td>2022年</td><td>34.7億円</td><td>412名</td><td>12.4%</td><td>3,104件</td><td>68.2%</td></tr>
            <tr><td>2023年</td><td>51.2億円</td><td>406名</td><td>3.1%</td><td>8,902件</td><td>82.9%</td></tr>
            <tr><td>2024年</td><td>88.8億円</td><td>404名</td><td>0.0%</td><td>14,420件</td><td>99.8%</td></tr>
            <tr><td>2025年</td><td>132.6億円</td><td>404名</td><td>0.0%</td><td>18,430件</td><td>100.0%</td></tr>
          </tbody>
        </table>
        <ol class="ir-footnotes">
          <li>社員数には、表示制限中のアカウントを含みます。</li>
          <li>一部の社員情報は、記録保護のため Not Found と表示される場合があります。</li>
          <li>離職率は当社定義による状態変更処理後の集計値です。</li>
        </ol>
      </article>

      <aside class="ir-side-docs">
        <h2>PDF資料一覧</h2>
        <a href="#/ir"><span>PDF</span> 2025年度 人的資本データ補足資料</a>
        <a href="#/ir"><span>PDF</span> 組織安定化支援サービス説明資料</a>
        <a href="#/ir"><span>PDF</span> 内部統制に関する運用報告</a>
        <h2>用語定義</h2>
        <dl>
          <div><dt>記録保護</dt><dd>通常検索結果から一時的に除外する状態区分。</dd></div>
          <div><dt>状態変更</dt><dd>雇用状態とは別に、表示範囲を変更する処理。</dd></div>
        </dl>
      </aside>

      <article class="excel-chart">
        <h2>売上高推移</h2>
        <div class="excel-bars" aria-label="売上高推移の簡易グラフ">
          <div><span>2022</span><b style="--value: 26%"></b><em>34.7</em></div>
          <div><span>2023</span><b style="--value: 39%"></b><em>51.2</em></div>
          <div><span>2024</span><b style="--value: 67%"></b><em>88.8</em></div>
          <div><span>2025</span><b style="--value: 100%"></b><em>132.6</em></div>
        </div>
      </article>

      <article class="ir-history">
        <h2>更新履歴</h2>
        <table class="compact-table">
          <tbody>
            <tr><th>2025.12.01</th><td>2025年度採用適性検査に関する注記を追加。</td></tr>
            <tr><th>2025.11.18</th><td>人的資本データ補足資料を公開。</td></tr>
            <tr><th>2025.08.07</th><td>一部社員情報の表示不具合について復旧済みと記載。</td></tr>
          </tbody>
        </table>
      </article>
    </section>
  `, "ir-layout-page"),

  "/login": () => hrShell("login", `
    <div class="login-console">
      ${crumb(["社員専用", "認証"])}
      <div class="system-window-title">YRI Internal Portal / Authentication</div>
      <h1>社員専用ページ</h1>
      <p>社員IDと合言葉を入力してください。入力内容は認証ログに記録されます。</p>
      <form class="system-form" id="login-form">
        <label for="employee-id">社員ID</label>
        <input id="employee-id" name="employee-id" autocomplete="off" required>
        <label for="employee-pass">合言葉</label>
        <input id="employee-pass" name="employee-pass" autocomplete="off" required>
        <button class="system-button" type="submit">認証</button>
      </form>
      <p class="message" id="login-message" role="status"></p>
      <table class="compact-table login-hints">
        <tbody>
          <tr><th>確認項目</th><td>社員ID / 合言葉</td></tr>
          <tr><th>社員ID</th><td>IR情報の中に記録されています。</td></tr>
          <tr><th>合言葉</th><td>働く人の声の中に残されています。</td></tr>
        </tbody>
      </table>
    </div>
  `),

  "/employee-404": () => hrShell("employee", `
    <div class="hr-alert">警告: このアカウントは記録保護状態です。通常の検索結果には表示されません。</div>
    <div class="hr-title-row">
      <div>
        ${crumb(["社員専用", "社員404"])}
        <h1>社員404 詳細</h1>
      </div>
      <table class="mini-status-table">
        <tbody>
          <tr><th>表示区分</th><td>Not Found</td></tr>
          <tr><th>最終状態変更</th><td>2025-08-07 02:14</td></tr>
        </tbody>
      </table>
    </div>

    <section class="employee-system-grid">
      <article class="master-pane">
        <h2>社員マスタ</h2>
        <table class="hr-dense-table">
          <tbody>
            <tr><th>社員ID</th><td>404</td><th>氏名</th><td>未登録</td></tr>
            <tr><th>所属</th><td>未登録</td><th>在籍状況</th><td>記録なし</td></tr>
            <tr><th>本人確認</th><td>未完了</td><th>退職同意</th><td>未取得</td></tr>
            <tr><th>外部接触</th><td>検知あり</td><th>閲覧制限</th><td>実施済み</td></tr>
            <tr><th>家族連絡</th><td>不要判定</td><th>監査室共有</th><td>済</td></tr>
            <tr><th>状態変更理由</th><td colspan="3">記録保護。本人への再通知は不要と判断されました。</td></tr>
          </tbody>
        </table>
      </article>

      <aside class="mood-pane">
        <h2>本日の気分入力</h2>
        <div class="mood-buttons" aria-label="気分入力">
          <button type="button" data-mood>安心</button>
          <button type="button" data-mood>不安</button>
          <button type="button" data-mood>疑問</button>
          <button type="button" data-mood>怒り</button>
        </div>
        <p class="message" id="mood-message" role="status"></p>
        <p class="micro-note">入力された感情は本人の健康管理および組織安定化のために使用されます。</p>
      </aside>

      <article class="rule-pane">
        <h2>アラート条件</h2>
        <table class="compact-table">
          <tbody>
            <tr><th>不安が3回</th><td>上長面談</td></tr>
            <tr><th>疑問が5回</th><td>部署異動</td></tr>
            <tr><th>怒りが7回</th><td>記録保護</td></tr>
          </tbody>
        </table>
      </article>

      <article class="log-pane">
        <h2>社員404 感情ログ</h2>
        <table class="hr-dense-table">
          <thead><tr><th>No.</th><th>状態</th><th>判定</th><th>記録時刻</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>安心</td><td>通常範囲</td><td>2025.07.18 09:02</td></tr>
            <tr><td>2</td><td>平常</td><td>通常範囲</td><td>2025.07.19 09:00</td></tr>
            <tr><td>3</td><td>監視対象</td><td>一次判定</td><td>2025.07.21 22:41</td></tr>
            <tr><td>4</td><td>安心</td><td>通常範囲</td><td>2025.07.22 08:55</td></tr>
            <tr><td>5</td><td>査定保留</td><td>二次判定</td><td>2025.07.26 01:13</td></tr>
            <tr><td>6</td><td>平常</td><td>通常範囲</td><td>2025.07.28 08:59</td></tr>
            <tr><td>7</td><td>室長確認</td><td>最終判定</td><td>2025.08.01 23:48</td></tr>
          </tbody>
        </table>
      </article>

      <article class="interview-log-pane">
        <h2>面談履歴</h2>
        <table class="compact-table">
          <tbody>
            <tr><th>2025.07.21</th><td>通常面談: 本人より「業務方針への疑問」入力あり。</td></tr>
            <tr><th>2025.07.26</th><td>追加面談: 外部相談窓口に関する検索履歴を確認。</td></tr>
            <tr><th>2025.08.01</th><td>監査室確認: 記録保護候補として共有。</td></tr>
            <tr><th>2025.08.07</th><td>状態変更: Not Found。</td></tr>
          </tbody>
        </table>
      </article>

      <aside class="dept-search-pane">
        <h2>部署検索</h2>
        <form class="system-form compact-system-form" id="dept-form">
          <label for="dept-answer">部署名を入力してください</label>
          <input id="dept-answer" name="dept-answer" autocomplete="off" required>
          <button class="system-button" type="submit">検索</button>
        </form>
        <p class="message" id="dept-message" role="status"></p>
      </aside>
    </section>
  `),

  "/audit": () => auditShell(`
    <section class="deleted-document">
      <div class="doc-stamp-row">
        <span>文書番号: AR-04-DEL</span>
        <span>更新日時: 2025-08-07 02:23</span>
      </div>
      ${crumb(["監査室", "削除済み文書"])}
      <h1>監査室</h1>
      <p class="document-status">このページは削除されました。</p>
      <table class="audit-meta-table">
        <tbody>
          <tr><th>削除理由</th><td>内部通報管理規程 第■■条に基づく記録保護</td></tr>
          <tr><th>承認者</th><td>監査室長 / 人事統括 / <span class="blackout">非開示</span></td></tr>
          <tr><th>公開範囲</th><td>社内監査室、記録保護担当者</td></tr>
          <tr><th>備考</th><td>当該社員への再通知は不要と判断されました。</td></tr>
        </tbody>
      </table>
      <div class="principle-excerpt">
        <b>当社理念 抜粋</b>
        <p>迷いをなくす。疑問を減らす。声を整える。記録を管理する。</p>
      </div>
      <form class="audit-form" id="key-form">
        <label for="restore-key">復元キー</label>
        <input id="restore-key" name="restore-key" autocomplete="off" required>
        <button class="audit-button" type="submit">復元</button>
      </form>
      <p class="message" id="key-message" role="status"></p>
      <p class="micro-note">キーは、当社理念に反する二文字です。</p>
    </section>
  `),

  "/archive": () => auditShell(`
    <section class="archive-system">
      <aside class="archive-tree">
        <div class="archive-title">保護文書一覧</div>
        <a class="is-active" href="#/archive"><span>A-01</span>＿拠保全手順</a>
        <a href="#/archive"><span>B-02</span>発＿テンプレート</a>
        <a href="#/archive"><span>C-03</span>対象＿リスト</a>
        <a href="#/archive"><span>D-04</span>PROJECT SILENT 仕様書</a>
        <a href="#/archive"><span>E-05</span>感情ログ運用マニュアル</a>
        <a href="#/archive"><span>F-06</span>退職処理自動化フロー</a>
      </aside>

      <article class="document-viewer">
        <div class="viewer-tabs">
          <button type="button" class="is-active">本文</button>
          <button type="button">注釈</button>
          <button type="button">証跡</button>
        </div>
        ${crumb(["監査室", "アーカイブ"])}
        <h1>監査室アーカイブ</h1>
        <p class="micro-note">閲覧範囲: Protected / 印刷: 不可 / 外部送信: 申請制</p>

        <section class="redacted-doc-row">
          <article class="redacted-doc">
            <header><span>A-01</span><h2>＿拠保全手順</h2></header>
            <table class="audit-mini-table"><tbody><tr><th>分類</th><td>外部監査提出資料</td></tr><tr><th>最終更新</th><td>2025.08.01</td></tr><tr><th>承認者</th><td>監査室長</td></tr></tbody></table>
            <p>記録媒体の保全、原本性の確認、提出時の添付資料一覧を定める。面談記録、操作ログ、閲覧履歴は改変防止のため原本と写しを分けて保管する。</p>
            <p class="redacted-line">外部監査提出時、<span class="blackout">■■</span>として扱う資料を別紙にまとめること。</p>
          </article>
          <article class="redacted-doc">
            <header><span>B-02</span><h2>発＿テンプレート</h2></header>
            <table class="audit-mini-table"><tbody><tr><th>分類</th><td>面談記録様式</td></tr><tr><th>最終更新</th><td>2025.08.03</td></tr><tr><th>承認者</th><td>人事統括</td></tr></tbody></table>
            <p>通報者が発した内容、面談時の発言、供述の整合性を確認するための記入様式。本人の表現を損なわない範囲で、記録用語を統一する。</p>
            <p class="redacted-line">本人が口頭で述べた内容は、<span class="blackout">■■</span>欄に時系列で記入する。</p>
          </article>
          <article class="redacted-doc">
            <header><span>C-03</span><h2>対象＿リスト</h2></header>
            <table class="audit-mini-table"><tbody><tr><th>分類</th><td>記録保護対象</td></tr><tr><th>最終更新</th><td>2025.08.07</td></tr><tr><th>承認者</th><td>監査室長</td></tr></tbody></table>
            <p>該当者、対象となる従業員、記録保護処理済みアカウントを一覧化する。表示区分が Not Found の場合も退職処理とは区別して扱う。</p>
            <p class="redacted-line">一覧の第三列には、対象となる<span class="blackout">■</span>の状態変更理由を記載する。</p>
          </article>
        </section>

        <section class="internal-doc-body">
          <h2>D-04 PROJECT SILENT 仕様書 Ver. 2.4</h2>
          <p>目的: 従業員の感情変動を検知し、組織運営上の不確実性を低減する。Level 5以降の処理内容は、本人への開示対象外とする。</p>
          <table class="audit-mini-table">
            <tbody>
              <tr><th>Level 1</th><td>本人へのセルフケア通知</td></tr>
              <tr><th>Level 2</th><td>上長への面談推奨</td></tr>
              <tr><th>Level 3</th><td>部署異動候補として記録</td></tr>
              <tr><th>Level 4</th><td>内部通報リスクとして監査室に共有</td></tr>
              <tr><th>Level 5</th><td>記録保護処理</td></tr>
            </tbody>
          </table>
        </section>

        <section class="internal-doc-columns">
          <article>
            <h2>E-05 感情ログ運用マニュアル</h2>
            <p>疑問の継続的な入力、怒りの複数回入力、組織方針への不一致、社外相談窓口への接触傾向が確認された場合、本人の安全確保のため監査室による確認対象とします。</p>
          </article>
          <article>
            <h2>F-06 退職処理自動化フロー</h2>
            <p>状態変更後の表示は、在籍中 Active、退職済 Closed、記録保護 Not Found とする。Not Found は退職を意味しない。通常検索結果から除外されている状態を示す。</p>
          </article>
        </section>

        <div class="archive-submit">
          <p>復元した文書を外部監査機関へ送信する場合は、あなたの役割を入力してください。</p>
          <a class="audit-button link-button" href="#/final">最終告発フォームへ</a>
        </div>
      </article>
    </section>
  `),

  "/final": () => auditShell(`
    <section class="final-queue">
      <div class="doc-stamp-row">
        <span>送信キュー: EXT-AUDIT-404</span>
        <span>状態: 入力待ち</span>
      </div>
      ${crumb(["監査室", "外部監査送信"])}
      <h1>最終告発フォーム</h1>
      <table class="audit-meta-table">
        <tbody>
          <tr><th>送信先</th><td>外部監査機関 受付キュー</td></tr>
          <tr><th>復元済み文書</th><td>A-01 / B-02 / C-03</td></tr>
          <tr><th>証跡ログ</th><td>社員404、記録保護処理、監査室閲覧履歴</td></tr>
        </tbody>
      </table>
      <p>最後に、あなたの役割を入力してください。</p>
      <form class="audit-form" id="final-form">
        <label for="final-answer">あなたは、何者ですか？</label>
        <input id="final-answer" name="final-answer" autocomplete="off" required>
        <button class="audit-button" type="submit">送信</button>
      </form>
      <p class="message" id="final-message" role="status"></p>
      <p class="micro-note">入力内容が復元された文書名と一致しない場合、送信キューは保留されます。</p>
    </section>
  `),

  "/hints": () => publicShell(`
    <section class="hint-page">
      ${crumb(["ヒント"])}
      <h1>ヒント</h1>
      <p>ヒントは段階的に開いてください。答えを表示すると、ヒント閲覧ログに記録されます。</p>
      <div class="hint-accordion">
        ${hintData.map(item => `
          <article class="hint-record" data-hint-record="${item.id}">
            <h2>${item.title}</h2>
            <details><summary>ヒント1</summary><p>${item.hints[0]}</p></details>
            <details><summary>ヒント2</summary><p>${item.hints[1]}</p></details>
            <details><summary>ヒント3</summary><p>${item.hints[2]}</p></details>
            <button class="plain-button reveal-answer" type="button" data-hint-id="${item.id}">答えを見る</button>
            <p class="hint-answer-slot" aria-live="polite"></p>
          </article>
        `).join("")}
      </div>
    </section>
  `, "hint-layout-page")
};

function bindForms() {
  document.querySelector("#login-form")?.addEventListener("submit", event => {
    event.preventDefault();
    const idOk = accepts(document.querySelector("#employee-id").value, answers.id);
    const passOk = accepts(document.querySelector("#employee-pass").value, answers.pass);
    if (idOk && passOk) {
      setMessage("#login-message", "認証しました。注意: この社員情報は、通常の人事データベースには存在しません。", "success");
      setTimeout(() => go("/employee-404"), 850);
    } else {
      setMessage("#login-message", "認証できませんでした。入力内容、または記録の存在状態を確認してください。", "error");
    }
  });

  document.querySelectorAll("[data-mood]").forEach(button => {
    button.addEventListener("click", () => setMessage("#mood-message", "このアカウントでは新規ログを追加できません。", "error"));
  });

  document.querySelector("#dept-form")?.addEventListener("submit", event => {
    event.preventDefault();
    if (accepts(document.querySelector("#dept-answer").value, answers.dept)) {
      setMessage("#dept-message", "部署を確認しました。監査室ページを開きます。", "success");
      setTimeout(() => go("/audit"), 800);
    } else {
      setMessage("#dept-message", "該当する部署は見つかりませんでした。", "error");
    }
  });

  document.querySelector("#key-form")?.addEventListener("submit", event => {
    event.preventDefault();
    if (accepts(document.querySelector("#restore-key").value, answers.key)) {
      setMessage("#key-message", "復元キーを確認しました。監査室アーカイブを表示します。", "success");
      setTimeout(() => go("/archive"), 900);
    } else {
      setMessage("#key-message", "復元キーが一致しません。", "error");
    }
  });

  document.querySelector("#final-form")?.addEventListener("submit", event => {
    event.preventDefault();
    const value = document.querySelector("#final-answer").value;
    if (accepts(value, answers.final)) {
      renderClear();
    } else if (accepts(value, answers.bad)) {
      renderBadEnd();
    } else {
      setMessage("#final-message", "送信できませんでした。入力内容が、復元された文書と一致しません。", "error");
    }
  });

  document.querySelectorAll(".reveal-answer").forEach(button => {
    button.addEventListener("click", () => {
      const item = hintData.find(entry => entry.id === button.dataset.hintId);
      const record = button.closest(".hint-record");
      const slot = record?.querySelector(".hint-answer-slot");
      if (!item || !slot) return;
      const ok = window.confirm("答えを表示すると、ヒント閲覧ログに記録されます。表示しますか？");
      if (!ok) return;
      slot.textContent = `答え: ${item.answer}`;
      button.disabled = true;
    });
  });
}

function renderBadEnd() {
  auditShell(`
    <section class="final-queue bad-end">
      <div class="doc-stamp-row"><span>送信キュー: CANCELED</span><span>状態: 記録済み</span></div>
      <h1>送信は取り消されました。</h1>
      <p>入力された役割は、復元文書と一致しませんでした。採用適性検査の結果は、組織安定化資料として保存されます。</p>
      <a class="audit-button link-button" href="#/final">戻る</a>
    </section>
  `);
}

function renderClear() {
  auditShell(`
    <section class="final-queue clear-document">
      <div class="doc-stamp-row"><span>送信キュー: COMPLETED</span><span>状態: 外部送信済み</span></div>
      <h1>送信が完了しました。</h1>
      <table class="audit-meta-table">
        <tbody>
          <tr><th>A-01</th><td>復元済み</td></tr>
          <tr><th>B-02</th><td>復元済み</td></tr>
          <tr><th>C-03</th><td>復元済み</td></tr>
          <tr><th>PROJECT SILENT</th><td>一部記録を外部監査機関へ送信済み</td></tr>
        </tbody>
      </table>
      <p>おめでとうございます。あなたは、ユメミノ総合研究所の採用適性検査を完了しました。</p>
      <div class="cold-result">
        <b>判定結果</b>
        <table class="audit-mini-table">
          <tbody>
            <tr><th>疑問を持つ能力</th><td>検出</td></tr>
            <tr><th>違和感に気づく能力</th><td>検出</td></tr>
            <tr><th>記録をたどる能力</th><td>検出</td></tr>
            <tr><th>指示に従わない能力</th><td>検出</td></tr>
            <tr><th>総合判定</th><td>重大な組織リスク</td></tr>
          </tbody>
        </table>
      </div>
      <p>まもなく担当者よりご連絡いたします。</p>
      <p class="last-line">画面を閉じても、記録は残ります。</p>
      <h2 class="true-title">社員404は退職していない</h2>
    </section>
  `);
}

function updateChrome(path) {
  const meta = pageMeta[path];
  document.title = meta.title;
  footerLog.textContent = meta.footer;
  nav.querySelectorAll("a").forEach(link => {
    const href = link.getAttribute("href").replace(/^#/, "");
    link.toggleAttribute("aria-current", href === path);
  });
}

function render() {
  const current = route();
  updateChrome(current);
  pages[current]();
  bindForms();
  menu.setAttribute("aria-expanded", "false");
  nav.classList.remove("is-open");
}

menu.addEventListener("click", () => {
  const open = menu.getAttribute("aria-expanded") === "true";
  menu.setAttribute("aria-expanded", String(!open));
  nav.classList.toggle("is-open", !open);
});

window.addEventListener("hashchange", render);
render();
