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

const hrAuthKey = "yriHrAuthenticated";
const hrAuthNoticeKey = "yriHrAuthNotice";
const protectedHrRoutes = new Set(["/employee-404"]);

const siteTitle = "株式会社ユメミノ総合研究所 | Yumemino Research Institute";
const publicFooter = "人的資本データ分析、組織改善コンサルティング、IR・開示資料支援";

const pageMeta = {
  "/": { title: siteTitle, stage: "public", footer: publicFooter },
  "/about": { title: `企業情報 | ${siteTitle}`, stage: "public", footer: publicFooter },
  "/business": { title: `事業内容 | ${siteTitle}`, stage: "public", footer: publicFooter },
  "/news": { title: `ニュース | ${siteTitle}`, stage: "public", footer: publicFooter },
  "/ir": { title: `IR情報 | ${siteTitle}`, stage: "public", footer: publicFooter },
  "/recruit": { title: `採用情報 | ${siteTitle}`, stage: "public", footer: publicFooter },
  "/contact": { title: `資料請求 | ${siteTitle}`, stage: "public", footer: publicFooter },
  "/login": { title: "社員専用 | YRI人事ポータル", stage: "hr", footer: "YRI HR Portal / Access log enabled" },
  "/employee-404": { title: "社員404 | YRI人事ポータル", stage: "hr", footer: "YRI HR Portal / Access log enabled" },
  "/audit": { title: "監査室 | 削除済み文書", stage: "audit", footer: "Audit document terminal / View only" },
  "/archive": { title: "監査室アーカイブ | 保護文書一覧", stage: "audit", footer: "Audit document terminal / View only" },
  "/final": { title: "外部監査送信キュー | 最終告発フォーム", stage: "audit", footer: "External audit queue / Evidence locked" },
  "/hints": { title: `補助資料 | ${siteTitle}`, stage: "public", footer: "補助資料は通常ナビゲーションには表示されません。" }
};

const hintData = [
  { id: "q1", title: "第1問", hints: ["企業情報ページの価値観を確認します。", "4つの項目名の先頭に注目します。", "ミッション、ギャップレス評価、ウェルビーイング支援、エンゲージメント分析です。"], answer: "右上" },
  { id: "q2", title: "第2問", hints: ["言葉は採用情報ページの社員インタビューにあります。", "本文中で少しだけ印刷の癖がある文字を拾います。", "秘、密、録の順に読みます。"], answer: "秘密録" },
  { id: "q3", title: "第3問", hints: ["社員IDはIR情報の人的資本データにあります。", "社員数と注記を見比べます。", "表示制限の対象になっている数字です。"], answer: "404" },
  { id: "q4", title: "第4問", hints: ["社員404ページのアラート条件を使います。", "3、5、7番目のログを確認します。", "該当行の先頭の文字を順に読みます。"], answer: "監査室" },
  { id: "q5", title: "第5問", hints: ["復元キーは理念に反する二文字です。", "企業情報ページでは、疑問を減らすと書かれています。", "減らすことの反対です。"], answer: "疑え" },
  { id: "q6", title: "第6問", hints: ["黒塗り文書名を自然な社内文書名に戻します。", "本文の単語から、証拠、発言、対象者に入る字を推測します。", "欠けた文字だけを上から読みます。"], answer: "証言者" }
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

function isHrAuthenticated() {
  return sessionStorage.getItem(hrAuthKey) === "1";
}

function route() {
  const raw = location.hash.replace(/^#/, "") || "/";
  const current = pageMeta[raw] ? raw : "/";
  if (protectedHrRoutes.has(current) && !isHrAuthenticated()) {
    sessionStorage.setItem(hrAuthNoticeKey, "1");
    if (location.hash !== "#/login") {
      history.replaceState(null, "", "#/login");
    }
    return "/login";
  }
  return current;
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

function postDesktopEvent(type) {
  window.parent?.postMessage?.({ type }, "*");
}

function crumb(items) {
  return `<nav class="breadcrumb" aria-label="パンくず"><a href="#/">HOME</a>${items.map(item => `<i>/</i><span>${item}</span>`).join("")}</nav>`;
}

function photo(file, alt, className = "") {
  return `<figure class="photo-frame ${className}" data-missing="assets/${file}">
    <img src="assets/${file}" alt="${alt}" loading="lazy" onerror="this.closest('.photo-frame').classList.add('is-missing'); this.remove();">
  </figure>`;
}

function layout(content, stage) {
  document.body.dataset.stage = stage;
  app.className = `page ${stage}-stage`;
  app.innerHTML = content;
  app.focus({ preventScroll: true });
  requestAnimationFrame(prepareReveal);
}

function publicShell(content, modifier = "") {
  layout(`<div class="public-site ${modifier}">${content}</div>`, "public");
}

function hrShell(active, content) {
  layout(`
    <div class="hr-app">
      <aside class="hr-menu" aria-label="社内人事ポータルメニュー">
        <div class="hr-menu-title">
          <b>YRI人事ポータル</b>
          <span>社員マスタ / 面談履歴 / 感情ログ / 権限情報</span>
        </div>
        <a class="${active === "login" ? "is-active" : ""}" href="#/login">認証</a>
        <a class="${active === "employee" ? "is-active" : ""}" href="#/employee-404">社員マスタ</a>
        <a href="#/employee-404">面談履歴</a>
        <a href="#/employee-404">感情ログ</a>
        <a href="#/employee-404">権限情報</a>
        <a href="#/employee-404">操作ログ</a>
        <small>接続先: hr-master-prd-04 / 最終同期: 2025-08-07 02:14</small>
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
        <span>閲覧権限: 一時付与 / 出力制限: 有効 / 操作記録: 保存</span>
      </header>
      ${content}
    </div>
  `, "audit");
}

const pages = {
  "/": () => publicShell(`
    <section class="brand-hero reveal-block">
      ${photo("hero-office.jpg", "都市の中にあるガラス張りのオフィスフロア", "hero-photo")}
      <div class="hero-copy">
        <p class="eyebrow">Human Capital Data & Organizational Insight</p>
        <h1><span>人と組織の状態を、</span><span>見えるかたちへ。</span></h1>
        <p>ユメミノ総合研究所は、人的資本データの分析と組織改善支援を通じて、働く人と企業の持続的な成長を支援します。</p>
      </div>
      <aside class="hero-news">
        <b>Latest</b>
        <a href="#/news"><time>2025.12.01</time><span>年末年始休業のお知らせ</span></a>
        <a href="#/news"><time>2025.11.18</time><span>人的資本開示支援サービスに関する資料を公開しました</span></a>
        <a href="#/news"><time>2025.10.30</time><span>導入事例「コールセンター運営企業様」を公開しました</span></a>
      </aside>
    </section>

    <section class="split-feature wide reveal-block">
      ${photo("people-meeting.jpg", "会議室で資料とダッシュボードを確認するコンサルティングチーム", "landscape")}
      <div>
        <p class="section-kicker">About</p>
        <h2>人的資本を、数字だけで終わらせない。</h2>
        <p>従業員サーベイ、面談記録、勤怠傾向、組織診断データを統合し、企業ごとの課題に合わせた改善支援を行います。私たちは、データの背後にある人と組織の関係を丁寧に読み解きます。</p>
        <a class="text-link" href="#/about">企業情報を見る</a>
      </div>
    </section>

    <section class="services-editorial reveal-block">
      <div class="section-heading">
        <p class="section-kicker">Services</p>
        <h2>組織の状態を、経営判断に接続する。</h2>
      </div>
      <article class="service-large">
        <span>01</span>
        <div>
          <h3>人的資本データ分析</h3>
          <p>従業員サーベイ、面談記録、勤怠傾向などを統合し、組織状態を可視化します。</p>
        </div>
        ${photo("data-room.jpg", "複数のモニターでデータを確認する静かな分析室", "service-image")}
      </article>
      <div class="service-pair">
        <article>
          <span>02</span>
          <h3>組織改善コンサルティング</h3>
          <p>部署ごとの課題を整理し、面談設計、配置、コミュニケーション改善を支援します。</p>
        </article>
        <article>
          <span>03</span>
          <h3>開示資料・IR支援</h3>
          <p>人的資本開示、統合報告書、サステナビリティ関連資料の作成を支援します。</p>
        </article>
      </div>
    </section>

    <section class="case-band reveal-block">
      <div>
        <p class="section-kicker">Case Study</p>
        <h2>現場の変化を、経営が読める粒度に。</h2>
      </div>
      <div class="case-list">
        <article><b>コールセンター運営企業</b><span>離職要因の見える化と面談設計の再構築</span></article>
        <article><b>医療法人グループ</b><span>複数拠点の組織診断と管理職向けレポート整備</span></article>
        <article><b>地方自治体</b><span>職員サーベイ結果の分析と開示資料への反映</span></article>
        <article><b>教育機関</b><span>相談窓口データと勤怠傾向の統合分析</span></article>
      </div>
      ${photo("news-visual.jpg", "資料を広げて導入事例を検討するデスク", "case-thumb")}
    </section>

    <section class="home-ir-recruit reveal-block">
      <article>
        ${photo("report-preview.jpg", "統合報告書と分析資料の紙面プレビュー", "paper-preview")}
        <div>
          <p class="section-kicker">IR Support</p>
          <h2>人的資本開示を、読み手に届く資料へ。</h2>
          <p>分析結果をそのまま掲載するのではなく、経営方針、現場課題、改善施策がつながる資料構成を設計します。</p>
          <a class="text-link" href="#/ir">IR情報を見る</a>
        </div>
      </article>
      <article>
        ${photo("recruit-hero.jpg", "落ち着いたオフィスの廊下と働く人の気配", "portrait-wide")}
        <div>
          <p class="section-kicker">Careers</p>
          <h2>データと現場の間で考える人へ。</h2>
          <p>調査設計、データ分析、開示資料支援、クライアント伴走を横断して担うメンバーを募集しています。</p>
          <a class="text-link" href="#/recruit">採用情報を見る</a>
        </div>
      </article>
    </section>
  `, "home"),

  "/about": () => publicShell(`
    <section class="page-hero compact reveal-block">
      ${crumb(["企業情報"])}
      <div>
        <p class="section-kicker">Company</p>
        <h1>人の状態と、組織の意思決定をつなぐ。</h1>
      </div>
      ${photo("people-meeting.jpg", "代表メッセージ用の会議風景", "page-hero-photo")}
    </section>

    <section class="message-layout reveal-block">
      <article>
        <p class="section-kicker">Message</p>
        <h2>代表メッセージ</h2>
        <p>組織の課題は、声が大きくなってからでは遅い場合があります。ユメミノ総合研究所は、声になる前の揺らぎを記録し、人と組織の間にある温度差を丁寧に整えます。</p>
        <p>私たちは、人的資本を単なる数値ではなく、働く人の実感と経営の判断をつなぐ基盤として扱います。</p>
        <p class="signature">代表取締役　夢野 総</p>
      </article>
      <aside class="company-fact">
        <b>Founded in 2017</b>
        <span>Human Capital Data / Organizational Insight / IR Support</span>
      </aside>
    </section>

    <section class="philosophy-section reveal-block">
      <div class="section-heading">
        <p class="section-kicker">Philosophy</p>
        <h2>企業理念</h2>
      </div>
      <div class="value-list">
        <article><h3><span>ミ</span>ッション</h3><p>人の不安を、測定可能な状態にします。</p></article>
        <article><h3><span>ギ</span>ャップレス評価</h3><p>感情、行動、成果の差分を見えるかたちに整えます。</p></article>
        <article><h3><span>ウ</span>ェルビーイング支援</h3><p>働く人が迷わず動ける環境を、継続的に支援します。</p></article>
        <article><h3><span>エ</span>ンゲージメント分析</h3><p>組織にとって望ましい状態を、定点で読み解きます。</p></article>
      </div>
    </section>

    <section class="company-grid reveal-block">
      <article class="profile-table-wrap">
        <h2>会社概要</h2>
        <table class="corporate-table">
          <tbody>
            <tr><th>会社名</th><td>株式会社ユメミノ総合研究所</td></tr>
            <tr><th>設立</th><td>2017年4月</td></tr>
            <tr><th>所在地</th><td>東京都架空区白路町 4-04-4</td></tr>
            <tr><th>代表者</th><td>代表取締役　夢野 総</td></tr>
            <tr><th>事業内容</th><td>人的資本データ分析、組織改善コンサルティング、IR・開示資料支援</td></tr>
          </tbody>
        </table>
      </article>
      <article class="timeline">
        <h2>沿革</h2>
        <dl>
          <div><dt>2017</dt><dd>組織状態の可視化を目的に創業</dd></div>
          <div><dt>2020</dt><dd>従業員サーベイ分析サービスを提供開始</dd></div>
          <div><dt>2023</dt><dd>人的資本開示支援チームを設置</dd></div>
          <div><dt>2025</dt><dd>統合報告書支援領域を拡張</dd></div>
        </dl>
      </article>
      <article class="policy-panel">
        <h2>データ管理方針</h2>
        <p>取得したデータは、利用目的、アクセス権限、保存期間を明確にしたうえで管理します。個人が特定される情報は必要最小限の範囲で扱い、分析結果は組織改善のための指標として提供します。</p>
      </article>
    </section>
  `, "company"),

  "/business": () => publicShell(`
    <section class="page-hero business-hero reveal-block">
      ${crumb(["事業内容"])}
      <div>
        <p class="section-kicker">Business</p>
        <h1>データの収集から、開示資料の言葉づくりまで。</h1>
        <p>調査、分析、改善提案、人的資本開示をひとつながりで支援します。</p>
      </div>
      ${photo("data-room.jpg", "分析室とデータ可視化モニター", "page-hero-photo")}
    </section>

    <section class="business-stories reveal-block">
      <article>
        ${photo("people-meeting.jpg", "会議室でサーベイ結果を確認する人々", "story-photo")}
        <div><span>01</span><h2>人的資本データ分析</h2><p>従業員サーベイ、面談記録、勤怠傾向、相談窓口データなどを統合し、部門別の状態変化を読み解きます。</p></div>
      </article>
      <article>
        <div><span>02</span><h2>組織改善コンサルティング</h2><p>分析結果をもとに、面談設計、配置、管理職向けフィードバック、コミュニケーション設計を支援します。</p></div>
        ${photo("news-visual.jpg", "資料を整理する手元と会議資料", "story-photo")}
      </article>
      <article>
        ${photo("report-preview.jpg", "報告書とPDF資料のプレビュー", "story-photo")}
        <div><span>03</span><h2>開示資料・IR支援</h2><p>人的資本開示、統合報告書、サステナビリティ関連資料の作成を、定量・定性の両面から支援します。</p></div>
      </article>
    </section>

    <section class="process-grid reveal-block">
      <h2>導入プロセス</h2>
      <ol>
        <li><b>現状整理</b><span>既存データ、調査設計、開示方針を確認</span></li>
        <li><b>分析設計</b><span>部門、職種、期間ごとの比較軸を設計</span></li>
        <li><b>レポーティング</b><span>経営会議・IR資料向けに要約</span></li>
        <li><b>改善伴走</b><span>施策の実行と次回測定の設計を支援</span></li>
      </ol>
    </section>

    <section class="deliverables reveal-block">
      <article><h2>提供資料</h2><p>組織診断レポート、人的資本開示ドラフト、経営会議用サマリー、面談設計テンプレート、施策進捗ダッシュボード。</p></article>
      <article><h2>よくある相談</h2><p>サーベイ結果の読み方が分からない、離職率の説明に困っている、統合報告書の人的資本パートを強化したい、部門ごとの状態差を経営に伝えたい。</p></article>
    </section>
  `, "business"),

  "/news": () => publicShell(`
    <section class="news-page-head reveal-block">
      ${crumb(["ニュース"])}
      <div>
        <p class="section-kicker">News</p>
        <h1>お知らせ</h1>
      </div>
      ${photo("news-visual.jpg", "ニュース資料のサムネイル", "news-visual")}
    </section>
    <section class="news-index reveal-block">
      ${[
        ["2025.12.01", "お知らせ", "年末年始休業のお知らせ", "年末年始期間中の営業日および各種窓口の対応についてご案内します。"],
        ["2025.11.18", "資料公開", "人的資本開示支援サービスに関する資料を公開しました", "開示項目の整理、定量指標の扱い、定性情報の編集方針をまとめた資料を公開しました。"],
        ["2025.10.30", "導入事例", "導入事例「コールセンター運営企業様」を公開しました", "相談履歴と勤怠傾向をもとに、部門別の改善施策へつなげた事例です。"],
        ["2025.08.07", "障害情報", "一部サービスの表示不具合について", "一部アカウント情報が通常画面に表示されない事象を確認し、現在は復旧済みです。"],
        ["2025.04.12", "規程改定", "内部通報管理規程の改定に伴うお知らせ", "法令改正と運用整理に伴い、規程の一部表現を更新しました。"]
      ].map(item => `
        <article class="news-row">
          <time>${item[0]}</time>
          <span>${item[1]}</span>
          <div><h2>${item[2]}</h2><p>${item[3]}</p></div>
        </article>
      `).join("")}
    </section>
  `, "news"),

  "/recruit": () => publicShell(`
    <section class="recruit-visual reveal-block">
      ${crumb(["採用情報"])}
      ${photo("recruit-hero.jpg", "採用ページのオフィス風景", "recruit-main-photo")}
      <div>
        <p class="section-kicker">Careers</p>
        <h1>データと現場の間で、組織を読み解く。</h1>
        <p>分析だけで終わらせず、現場の言葉と経営の判断をつなぐ仕事です。</p>
      </div>
    </section>

    <section class="recruit-layout reveal-block">
      <article class="workplace">
        <h2>働く環境</h2>
        <p>プロジェクトごとに、分析担当、リサーチャー、編集担当、コンサルタントが小さなチームを組みます。資料の精度だけでなく、現場でどのように読まれるかを重視します。</p>
      </article>
      <article class="job-table">
        <h2>募集職種</h2>
        <table class="corporate-table">
          <tbody>
            <tr><th>リサーチャー</th><td>調査設計、サーベイ分析、インタビュー設計</td></tr>
            <tr><th>データアナリスト</th><td>人的資本データの統合、可視化、レポート作成</td></tr>
            <tr><th>開示資料ディレクター</th><td>統合報告書、人的資本開示、IR資料の構成設計</td></tr>
          </tbody>
        </table>
      </article>
    </section>

    <section class="interview-editorial reveal-block">
      <div class="section-heading">
        <p class="section-kicker">Interview</p>
        <h2>社員インタビュー</h2>
      </div>
      <article>
        ${photo("interview-01.jpg", "社員インタビュー用の横顔と資料", "interview-photo")}
        <div><h3>調査設計チーム / A</h3><p>調査票の設計では、回答者が本音に近い温度で答えられるかを大切にしています。数値に出る前の小さな<span class="print-mark">秘</span>訣は、質問の順番にも表れます。</p></div>
      </article>
      <article>
        ${photo("interview-02.jpg", "採用広報風の会議風景", "interview-photo tall")}
        <div><h3>分析チーム / B</h3><p>部署ごとの状態差を読むときは、単純な平均値ではなく、背景にある業務量や関係性まで見ます。数字の奥にある<span class="print-mark">密</span>度を読む仕事です。</p></div>
      </article>
      <article>
        ${photo("interview-03.jpg", "ノートPCと社員証のあるデスク", "interview-photo")}
        <div><h3>資料編集チーム / C</h3><p>経営層に渡す資料は、事実を並べるだけでは届きません。現場で起きた変化を、後からたどれる<span class="print-mark">録</span>として残します。</p></div>
      </article>
    </section>

    <section class="recruit-bottom reveal-block">
      <article>
        <h2>数字で見るユメミノ</h2>
        <dl class="metric-list">
          <div><dt>平均年齢</dt><dd>36.8歳</dd></div>
          <div><dt>リモート併用率</dt><dd>72%</dd></div>
          <div><dt>職種横断PJ比率</dt><dd>81%</dd></div>
        </dl>
      </article>
      <article>
        <h2>選考フロー</h2>
        <ol class="flow-list">
          <li>書類確認</li><li>一次面談</li><li>課題提出</li><li>最終面談</li><li>条件面談</li>
        </ol>
      </article>
      <article>
        <h2>FAQ</h2>
        <details><summary>未経験でも応募できますか</summary><p>調査、分析、編集、コンサルティングのいずれかの経験があれば歓迎します。</p></details>
        <details><summary>働き方は固定ですか</summary><p>担当プロジェクトとクライアント状況に応じて、出社とリモートを組み合わせます。</p></details>
      </article>
    </section>
  `, "recruit"),

  "/ir": () => publicShell(`
    <section class="ir-hero reveal-block">
      ${crumb(["IR情報"])}
      <div>
        <p class="section-kicker">Investor Relations</p>
        <h1>人的資本の変化を、資料として読み解く。</h1>
      </div>
      ${photo("report-preview.jpg", "統合報告書のプレビュー画像", "report-photo")}
    </section>

    <section class="ir-layout reveal-block">
      <article class="highlight-sheet">
        <h2>業績ハイライト</h2>
        <table class="ir-table">
          <thead><tr><th>年度</th><th>売上高</th><th>社員数</th><th>離職率</th></tr></thead>
          <tbody>
            <tr><td>2022年</td><td>34.7億円</td><td>412名</td><td>12.4%</td></tr>
            <tr><td>2023年</td><td>51.2億円</td><td>406名</td><td>3.1%</td></tr>
            <tr><td>2024年</td><td>88.8億円</td><td>404名</td><td>0.0%</td></tr>
            <tr><td>2025年</td><td>132.6億円</td><td>404名</td><td>0.0%</td></tr>
          </tbody>
        </table>
        <p class="micro-note">注記: 一部の社員情報は、記録保護のため Not Found と表示される場合があります。</p>
      </article>
      <aside class="pdf-list">
        <h2>PDF資料一覧</h2>
        <a href="#/ir"><span>PDF</span>2025年度 人的資本開示補足資料</a>
        <a href="#/ir"><span>PDF</span>統合報告書 2025</a>
        <a href="#/ir"><span>PDF</span>サステナビリティデータブック</a>
      </aside>
      <article class="ir-notes">
        <h2>更新履歴・注記</h2>
        <dl>
          <div><dt>2025.11.18</dt><dd>人的資本開示支援サービス資料を公開</dd></div>
          <div><dt>2025.08.07</dt><dd>一部指標の表示形式を修正</dd></div>
          <div><dt>2025.04.01</dt><dd>用語定義を更新</dd></div>
        </dl>
        <p>人的資本関連指標は、社内管理基準と外部開示基準の差異により、資料ごとに集計範囲が異なる場合があります。</p>
      </article>
    </section>
  `, "ir"),

  "/contact": () => publicShell(`
    <section class="contact-head reveal-block">
      ${crumb(["資料請求"])}
      <div>
        <p class="section-kicker">Contact</p>
        <h1>資料請求</h1>
        <p>サービス概要資料、人的資本開示チェックリスト、導入事例集は、この端末のTalkアプリに送付されます。</p>
      </div>
    </section>
    <section class="contact-layout reveal-block">
      <article class="contact-form contact-talk-card" id="contact-talk-card">
        <h2>Talkで資料窓口を追加</h2>
        <p>資料を受け取るには、ユメミノ資料窓口をTalkに追加してください。外部のメッセージアプリやメールアドレスは使用しません。</p>
        <ul class="contact-material-list">
          <li>サービス概要資料</li>
          <li>人的資本開示チェックリスト</li>
          <li>導入事例集</li>
        </ul>
        <button class="brand-button" id="contact-talk-button" type="button">Talkで資料窓口を追加</button>
        <p class="message" id="contact-message" role="status"></p>
      </article>
      <aside class="contact-side">
        <h2>資料の受け取り方法</h2>
        <p>この仮想端末内のTalkに追加リクエストが届きます。追加後、Downloadsに資料が保存されます。</p>
        ${photo("people-meeting.jpg", "問い合わせページ用の会議写真", "contact-photo")}
      </aside>
    </section>
  `, "contact"),

  "/login": () => hrShell("login", `
    <section class="login-console">
      <div class="system-window-title">YRI-HR / AUTH / v4.08</div>
      <h1>社員専用ログイン</h1>
      <p>社員マスタ、面談履歴、権限情報を参照します。認証ログは保存されます。</p>
      <form class="system-form" id="login-form">
        <label for="employee-id">社員ID</label>
        <input id="employee-id" name="employee-id" autocomplete="off" required>
        <label for="employee-pass">参照キー</label>
        <input id="employee-pass" name="employee-pass" autocomplete="off" required>
        <button class="system-button" type="submit">認証</button>
      </form>
      <p class="message" id="login-message" role="status"></p>
    </section>
  `),

  "/employee-404": () => hrShell("employee", `
    <div class="hr-title-row">
      <div>
        <p class="system-label">社員マスタ / EMP-000404</p>
        <h1>社員404 詳細</h1>
      </div>
      <table class="mini-status-table">
        <tbody><tr><th>表示区分</th><td>Not Found</td></tr><tr><th>最終状態変更</th><td>2025-08-07 02:14</td></tr></tbody>
      </table>
    </div>
    <div class="hr-alert">本人確認: 未完了 / 退職同意: 未取得 / 外部接触: 検知あり / 監査室共有: 済</div>
    <section class="employee-system-grid">
      <article class="master-pane">
        <h2>社員基本情報</h2>
        <table class="hr-dense-table">
          <tbody>
            <tr><th>社員ID</th><td>404</td><th>所属</th><td>人材データ分析部</td></tr>
            <tr><th>氏名</th><td>表示制限中</td><th>検索区分</th><td>通常検索から除外</td></tr>
            <tr><th>状態変更理由</th><td>記録保護</td><th>家族連絡</th><td>不要判定</td></tr>
            <tr><th>人事コメント</th><td colspan="3">本人への再通知は不要。退職処理ではなく、状態変更として扱います。</td></tr>
          </tbody>
        </table>
      </article>
      <aside class="rule-pane">
        <h2>アラート条件</h2>
        <p>外部相談窓口への接触傾向が確認された場合、監査室へ共有されます。対象者の閲覧範囲は自動で制限されます。</p>
      </aside>
      <article class="log-pane">
        <h2>操作ログ</h2>
        <table class="hr-dense-table log-table">
          <tbody>
            <tr><td>1</td><td>本</td><td>通常検索から除外</td><td>2025.07.18 09:21</td></tr>
            <tr><td>2</td><td>人</td><td>面談記録の参照制限</td><td>2025.07.19 18:06</td></tr>
            <tr><td>3</td><td>監</td><td>外部接触フラグを検知</td><td>2025.07.21 22:41</td></tr>
            <tr><td>4</td><td>理</td><td>通知対象から除外</td><td>2025.07.22 08:55</td></tr>
            <tr><td>5</td><td>査</td><td>記録保護へ状態変更</td><td>2025.07.26 01:13</td></tr>
            <tr><td>6</td><td>部</td><td>家族連絡不要判定</td><td>2025.07.28 08:59</td></tr>
            <tr><td>7</td><td>室</td><td>部門長確認済み</td><td>2025.08.01 23:48</td></tr>
          </tbody>
        </table>
      </article>
      <article class="interview-log-pane">
        <h2>面談履歴</h2>
        <table class="hr-dense-table">
          <tbody>
            <tr><th>2025.07.21</th><td>通常面談: 業務方針への疑問あり</td></tr>
            <tr><th>2025.07.26</th><td>追加面談: 外部相談窓口に関する検索履歴を確認</td></tr>
            <tr><th>2025.08.01</th><td>権限確認: 記録保護候補として共有</td></tr>
            <tr><th>2025.08.07</th><td>状態変更: Not Found</td></tr>
          </tbody>
        </table>
      </article>
      <aside class="dept-search-pane">
        <h2>部門検索</h2>
        <form class="system-form compact-system-form" id="dept-form">
          <label for="dept-answer">部門名を入力してください</label>
          <input id="dept-answer" name="dept-answer" autocomplete="off" required>
          <button class="system-button" type="submit">検索</button>
        </form>
        <p class="message" id="dept-message" role="status"></p>
      </aside>
    </section>
  `),

  "/audit": () => auditShell(`
    <section class="deleted-document paper-texture">
      <div class="doc-stamp-row"><span>文書番号: AR-04-DEL</span><span>更新日時: 2025-08-07 02:23</span></div>
      ${crumb(["監査室", "削除済み文書"])}
      <h1>削除済み文書</h1>
      <p class="document-status">この文書は削除されました。</p>
      <table class="audit-meta-table">
        <tbody>
          <tr><th>削除理由</th><td>内部通報管理規程 第七条に基づく記録保護</td></tr>
          <tr><th>承認者</th><td>監査室長 / 人事統括 / <span class="blackout">非表示</span></td></tr>
          <tr><th>公開範囲</th><td>社内調査室、記録保護担当者</td></tr>
          <tr><th>備考</th><td>当該社員への再通知は不要と判断されました。</td></tr>
        </tbody>
      </table>
      <div class="principle-excerpt">
        <b>当社理念 抜粋</b>
        <p>疑問を減らす。声を整える。記録を管理する。</p>
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
        <a href="#/archive"><span>D-04</span>内部施策仕様書</a>
        <a href="#/archive"><span>E-05</span>感情ログ運用マニュアル</a>
        <a href="#/archive"><span>F-06</span>状態変更フロー</a>
      </aside>
      <article class="document-viewer paper-texture">
        <div class="viewer-tabs"><button type="button" class="is-active">本文</button><button type="button">注記</button><button type="button">証跡</button></div>
        ${crumb(["監査室", "アーカイブ"])}
        <h1>監査室アーカイブ</h1>
        <p class="micro-note">閲覧範囲: Protected / 印刷: 不可 / 外部送信: 申請制</p>
        <section class="redacted-doc-row">
          <article class="redacted-doc">
            <header><span>A-01</span><h2>＿拠保全手順</h2></header>
            <table class="audit-mini-table"><tbody><tr><th>分類</th><td>外部監査提出資料</td></tr><tr><th>最終更新</th><td>2025.08.01</td></tr><tr><th>承認者</th><td>監査室長</td></tr></tbody></table>
            <p>記録媒体の保全、原本性の確認、外部監査提出時の添付資料一覧を定める。面談記録、操作ログ、閲覧履歴は改変防止のため原本と写しを分けて保管する。</p>
            <p class="redacted-line">提出時は<span class="blackout">■■■■</span>として扱う資料を時系列にまとめる。</p>
          </article>
          <article class="redacted-doc">
            <header><span>B-02</span><h2>発＿テンプレート</h2></header>
            <table class="audit-mini-table"><tbody><tr><th>分類</th><td>面談記録様式</td></tr><tr><th>最終更新</th><td>2025.08.03</td></tr><tr><th>承認者</th><td>人事統括</td></tr></tbody></table>
            <p>通報者が発した内容、面談時の発言、供述の整合性を確認するための記入様式。本人の表現を損なわない範囲で、記録用語を統一する。</p>
            <p class="redacted-line">口頭で述べられた内容は、<span class="blackout">■■</span>欄に時系列で記入する。</p>
          </article>
          <article class="redacted-doc">
            <header><span>C-03</span><h2>対象＿リスト</h2></header>
            <table class="audit-mini-table"><tbody><tr><th>分類</th><td>記録保護対象</td></tr><tr><th>最終更新</th><td>2025.08.07</td></tr><tr><th>承認者</th><td>監査室長</td></tr></tbody></table>
            <p>該当者、対象となる従業員、記録保護対象アカウントを一覧化する。表示区分が Not Found の場合も退職処理とは区別して扱う。</p>
            <p class="redacted-line">一覧の第三列には、対象となる<span class="blackout">■</span>の状態変更理由を記載する。</p>
          </article>
        </section>
        <section class="internal-doc-columns">
          <article><h2>D-04 内部施策仕様書 Ver. 2.4</h2><p>従業員の状態変化を検知し、組織運営上の不確実性を低下させる。Level 4以上の処理は本人への開示対象外とする。</p></article>
          <article><h2>E-05 感情ログ運用マニュアル</h2><p>疑問の継続的な入力、怒りの複数回入力、外部相談窓口への接触傾向が確認された場合、本人の安全確保のため監査室による確認対象とします。</p></article>
        </section>
        <div class="archive-submit">
          <p>復元した文書を外部監査機関へ送信する場合は、あなたの役割を入力してください。</p>
          <a class="audit-button link-button" href="#/final">外部監査送信キューへ</a>
        </div>
      </article>
    </section>
  `),

  "/final": () => auditShell(`
    <section class="final-queue paper-texture">
      <div class="doc-stamp-row"><span>送信キュー: EXT-AUDIT-404</span><span>状態: 入力待ち</span></div>
      ${crumb(["監査室", "外部監査送信"])}
      <h1>外部監査送信キュー</h1>
      <table class="audit-meta-table">
        <tbody>
          <tr><th>送信先</th><td>外部監査機関 受付キュー</td></tr>
          <tr><th>復元済み文書</th><td>A-01 / B-02 / C-03</td></tr>
          <tr><th>証跡ログ</th><td>社員404、記録保護処理、監査室閲覧履歴</td></tr>
        </tbody>
      </table>
      <p>最後に、あなたの役割を入力してください。</p>
      <form class="audit-form" id="final-form">
        <label for="final-answer">あなたは、何者ですか。</label>
        <input id="final-answer" name="final-answer" autocomplete="off" required>
        <button class="audit-button" type="submit">送信</button>
      </form>
      <p class="message" id="final-message" role="status"></p>
    </section>
  `),

  "/hints": () => publicShell(`
    <section class="hint-page reveal-block">
      ${crumb(["補助資料"])}
      <h1>補助資料</h1>
      <p>段階的に開いてください。答えを表示すると、ヒント閲覧ログに記録されます。</p>
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
  `, "hint")
};

function bindForms() {
  document.querySelector("#login-form")?.addEventListener("submit", event => {
    event.preventDefault();
    const idOk = accepts(document.querySelector("#employee-id").value, answers.id);
    const passOk = accepts(document.querySelector("#employee-pass").value, answers.pass);
    if (idOk && passOk) {
      sessionStorage.setItem(hrAuthKey, "1");
      postDesktopEvent("YRI_EMPLOYEE_LOGIN_SUCCESS");
      setMessage("#login-message", "認証しました。通常の人事データベースには存在しない社員情報を表示します。", "success");
      setTimeout(() => go("/employee-404"), 650);
    } else {
      sessionStorage.removeItem(hrAuthKey);
      setMessage("#login-message", "認証できませんでした。入力内容、または記録の存在状態を確認してください。", "error");
    }
  });

  document.querySelector("#dept-form")?.addEventListener("submit", event => {
    event.preventDefault();
    if (accepts(document.querySelector("#dept-answer").value, answers.dept)) {
      postDesktopEvent("YRI_DEPT_SEARCH_SUCCESS");
      setMessage("#dept-message", "部門を確認しました。監査室ページを開きます。", "success");
      setTimeout(() => go("/audit"), 650);
    } else {
      setMessage("#dept-message", "該当する部門は見つかりませんでした。", "error");
    }
  });

  document.querySelector("#key-form")?.addEventListener("submit", event => {
    event.preventDefault();
    if (accepts(document.querySelector("#restore-key").value, answers.key)) {
      postDesktopEvent("YRI_AUDIT_KEY_SUCCESS");
      setMessage("#key-message", "復元キーを確認しました。監査室アーカイブを表示します。", "success");
      setTimeout(() => go("/archive"), 700);
    } else {
      setMessage("#key-message", "復元キーが一致しません。", "error");
    }
  });

  document.querySelector("#final-form")?.addEventListener("submit", event => {
    event.preventDefault();
    const value = document.querySelector("#final-answer").value;
    if (accepts(value, answers.final)) {
      postDesktopEvent("YRI_FINAL_SUBMITTED");
      renderClear();
    } else if (accepts(value, answers.bad)) {
      renderBadEnd();
    } else {
      setMessage("#final-message", "送信できませんでした。入力内容が復元済み文書と一致しません。", "error");
    }
  });

  document.querySelector("#contact-talk-button")?.addEventListener("click", event => {
    const button = event.currentTarget;
    if (button.dataset.sent === "1") {
      setMessage("#contact-message", "資料窓口への追加リクエストは送信済みです。Talkアプリをご確認ください。", "success");
      return;
    }
    button.dataset.sent = "1";
    button.textContent = "追加リクエスト送信済み";
    button.disabled = true;
    postDesktopEvent("YRI_CONTACT_REQUEST_SUBMITTED");
    setMessage("#contact-message", "資料窓口からTalkに追加リクエストを送信しました。デスクトップのTalkアプリをご確認ください。", "success");
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
      <p>入力された役割は、復元文書と一致しませんでした。送信内容は組織安定化資料として保存されます。</p>
      <a class="audit-button link-button" href="#/final">戻る</a>
    </section>
  `);
}

function renderClear() {
  auditShell(`
    <section class="final-queue clear-document paper-texture">
      <div class="doc-stamp-row"><span>送信キュー: COMPLETED</span><span>状態: 外部送信済み</span></div>
      <h1>送信が完了しました。</h1>
      <table class="audit-meta-table">
        <tbody>
          <tr><th>A-01</th><td>復元済み</td></tr>
          <tr><th>B-02</th><td>復元済み</td></tr>
          <tr><th>C-03</th><td>復元済み</td></tr>
          <tr><th>証跡ログ</th><td>外部監査機関へ送信済み</td></tr>
        </tbody>
      </table>
      <p>受理番号は表示されません。送信元端末の操作記録は保全されました。</p>
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

function prepareReveal() {
  const blocks = document.querySelectorAll(".reveal-block");
  if (!blocks.length) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
    blocks.forEach(block => block.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  blocks.forEach(block => observer.observe(block));
}

function enrichOperationalContent(path) {
  if (path === "/") {
    const heroNews = document.querySelector(".hero-news");
    if (heroNews) {
      heroNews.innerHTML = `
        <b>Latest</b>
        <a href="#/news"><time>2025.12.01</time><em>お知らせ</em><span>年末年始休業のお知らせ</span></a>
        <a href="#/news"><time>2025.11.18</time><em>資料公開</em><span>人的資本開示支援サービスに関する資料を公開しました</span></a>
        <a href="#/news"><time>2025.10.30</time><em>導入事例</em><span>コールセンター運営企業様の事例を公開しました</span></a>
        <a href="#/news"><time>2025.09.26</time><em>セミナー</em><span>管理職面談設計ウェビナーを開催します</span></a>
        <a href="#/news"><time>2025.08.07</time><em>障害情報</em><span>一部サービスの表示不具合について</span></a>
        <a href="#/news"><time>2025.04.12</time><em>規程改定</em><span>内部通報管理規程の改定に伴うお知らせ</span></a>
      `;
    }

    document.querySelector(".services-editorial")?.insertAdjacentHTML("beforeend", `
      <div class="service-directory">
        ${[
          ["人的資本データ分析", "サーベイ、勤怠、面談記録、相談窓口データを統合します。"],
          ["組織改善コンサルティング", "部門別課題の整理から改善施策の定着まで伴走します。"],
          ["開示資料・IR支援", "人的資本開示と統合報告書の構成・編集を支援します。"],
          ["従業員サーベイ設計", "設問設計、集計軸、回答率向上の運用を整えます。"],
          ["面談記録分析", "面談メモを定性データとして整理し、傾向を抽出します。"],
          ["統合報告書編集支援", "経営方針と現場データを読み手に伝わる資料へ編集します。"]
        ].map(([title, text]) => `<article><h3>${title}</h3><p>${text}</p><a href="#/business">詳細を見る</a></article>`).join("")}
      </div>
    `);

    const caseList = document.querySelector(".case-list");
    if (caseList) {
      caseList.innerHTML = `
        <article><b>コールセンター運営企業</b><dl><div><dt>従業員規模</dt><dd>約1,200名</dd></div><div><dt>支援領域</dt><dd>離職要因分析、面談設計</dd></div><div><dt>課題</dt><dd>拠点ごとの離職傾向を説明できない</dd></div><div><dt>実施内容</dt><dd>勤怠傾向と相談履歴を統合し、管理職向け月次資料を整備</dd></div></dl><a href="#/business">詳細を見る</a></article>
        <article><b>医療法人グループ</b><dl><div><dt>従業員規模</dt><dd>約900名</dd></div><div><dt>支援領域</dt><dd>職員サーベイ、組織診断</dd></div><div><dt>課題</dt><dd>複数拠点の回答結果を横断比較できない</dd></div><div><dt>実施内容</dt><dd>部門属性を再整理し、経営会議用サマリーを作成</dd></div></dl><a href="#/business">詳細を見る</a></article>
        <article><b>地方自治体</b><dl><div><dt>従業員規模</dt><dd>約2,400名</dd></div><div><dt>支援領域</dt><dd>人的資本データ整理、開示資料補助</dd></div><div><dt>課題</dt><dd>職員意識調査の活用範囲が限定的</dd></div><div><dt>実施内容</dt><dd>年次推移と部門別傾向を整理し、公開資料向けに要約</dd></div></dl><a href="#/business">詳細を見る</a></article>
      `;
    }

    document.querySelector(".case-band")?.insertAdjacentHTML("afterend", `
      <section class="resources-section reveal-block">
        <div class="section-heading compact-heading"><p class="section-kicker">Documents / Seminar</p><h2>資料・セミナー</h2></div>
        <div class="resource-list">
          <a href="#/contact"><span>PDF</span><b>人的資本開示チェックリスト</b><small>開示項目の棚卸しに使える実務資料です。</small></a>
          <a href="#/contact"><span>PDF</span><b>組織サーベイ設計ガイド</b><small>設問設計と集計軸の基本をまとめています。</small></a>
          <a href="#/news"><span>WEBINAR</span><b>管理職面談設計ウェビナー</b><small>2026.01.22 開催予定 / オンライン</small></a>
          <a href="#/news"><span>SEMINAR</span><b>統合報告書 人的資本パート作成講座</b><small>IR・サステナビリティ部門向け。</small></a>
        </div>
        <div class="more-links"><a href="#/news">お知らせ一覧へ</a><a href="#/business">導入事例一覧へ</a><a href="#/contact">Talkで資料請求</a></div>
      </section>
    `);
  }

  if (path === "/business") {
    document.querySelector(".business-hero, .page-hero")?.insertAdjacentHTML("afterend", `
      <nav class="local-nav" aria-label="事業内容内ナビ">
        <a href="#service-scope">支援範囲</a><a href="#deliverables">納品物</a><a href="#departments">対応部門</a><a href="#materials">関連資料</a><a href="#/contact">Talkで資料請求</a>
      </nav>
    `);
    document.querySelector(".business-stories")?.insertAdjacentHTML("afterend", `
      <section class="service-detail-block reveal-block" id="service-scope">
        <h2>サービスごとの支援範囲</h2>
        <div class="detail-tables">
          <article><h3>人的資本データ分析</h3><table><tbody><tr><th>対象データ</th><td>従業員サーベイ、勤怠傾向、面談記録、相談窓口利用状況、部門属性</td></tr><tr><th>主な納品物</th><td>月次レポート、経営会議用サマリー、部門別ダッシュボード、改善提案書</td></tr><tr><th>対応部門</th><td>人事部、経営企画部、IR部門、サステナビリティ推進室</td></tr></tbody></table></article>
          <article><h3>組織改善コンサルティング</h3><table><tbody><tr><th>支援内容</th><td>面談設計、管理職向けフィードバック、配置検討、コミュニケーション改善</td></tr><tr><th>よくある課題</th><td>部署ごとの温度差、離職兆候、サーベイ結果の活用不足</td></tr><tr><th>期間目安</th><td>初期診断 4週間 / 改善伴走 3か月から</td></tr></tbody></table></article>
          <article><h3>開示資料・IR支援</h3><table><tbody><tr><th>対応資料</th><td>統合報告書、有価証券報告書補足資料、人的資本開示資料</td></tr><tr><th>納品物</th><td>構成案、本文ドラフト、図表原稿、注記整理表</td></tr><tr><th>関連資料</th><td><span class="label-pdf">PDF</span> 人的資本開示チェックリスト</td></tr></tbody></table></article>
        </div>
      </section>
      <section class="operation-cta reveal-block" id="materials">
        <div><h2>関連資料</h2><p>サービス詳細、導入プロセス、料金目安はTalkの資料窓口から受け取れます。</p></div>
        <a class="brand-button" href="#/contact">Talkで資料請求</a>
      </section>
    `);
  }

  if (path === "/news") {
    const newsIndex = document.querySelector(".news-index");
    if (newsIndex) {
      newsIndex.outerHTML = `
        <section class="news-operations reveal-block">
          <aside class="news-sidebar"><h2>年別アーカイブ</h2><a href="#/news">2025年</a><a href="#/news">2024年</a><h2>カテゴリ</h2><button>お知らせ</button><button>導入事例</button><button>セミナー</button><button>資料公開</button><button>障害情報</button></aside>
          <div class="news-index">
            ${[
              ["2025.12.01", "お知らせ", "年末年始休業のお知らせ", "年末年始期間中の営業日および各種窓口の対応についてご案内します。"],
              ["2025.11.18", "資料公開", "人的資本開示支援サービスに関する資料を公開しました", "開示項目の整理、定量指標の扱い、定性情報の編集方針をまとめた資料です。"],
              ["2025.10.30", "導入事例", "導入事例「コールセンター運営企業様」を公開しました", "相談履歴と勤怠傾向をもとに、部門別の改善施策へつなげた事例です。"],
              ["2025.09.26", "セミナー", "管理職面談設計ウェビナー開催のお知らせ", "人事部門と管理職が共有できる面談設計の基本を解説します。"],
              ["2025.08.07", "障害情報", "一部サービスの表示不具合について", "一部アカウント情報が通常画面に表示されない事象を確認し、現在は復旧済みです。"],
              ["2025.07.10", "お知らせ", "夏季休業期間中のサポート対応について", "サポート窓口の受付時間を一部変更します。"],
              ["2025.06.19", "資料公開", "組織サーベイ設計ガイドを公開しました", "設問設計、回答率向上、部門別分析のポイントをまとめています。"],
              ["2025.05.22", "導入事例", "医療法人グループ様の導入事例を公開しました", "複数拠点の職員サーベイを横断分析した事例です。"],
              ["2025.04.12", "規程改定", "内部通報管理規程の改定に伴うお知らせ", "法令改正と運用整理に伴い、規程の一部表現を更新しました。"],
              ["2025.03.03", "お知らせ", "役員人事に関するお知らせ", "2025年4月1日付の執行体制についてお知らせします。"]
            ].map(item => `<article class="news-row rich"><figure class="news-thumb"></figure><time>${item[0]}</time><span>${item[1]}</span><div><h2>${item[2]}</h2><p>${item[3]}</p><a href="#/news">一覧へ戻る</a></div></article>`).join("")}
            <nav class="pager" aria-label="ページネーション"><span>1</span><a href="#/news">2</a><a href="#/news">次へ</a></nav>
          </div>
        </section>
      `;
    }
  }

  if (path === "/ir") {
    document.querySelector(".ir-layout")?.insertAdjacentHTML("beforeend", `
      <article class="ir-ops"><h2>IRニュース</h2><ul><li>2025.11.18 人的資本開示支援サービス資料を公開</li><li>2025.08.07 一部指標の表示形式を修正</li><li>2025.04.01 用語定義を更新</li></ul></article>
      <article class="ir-ops"><h2>IRカレンダー</h2><table><tbody><tr><th>2026.02</th><td>第3四半期補足資料 公開予定</td></tr><tr><th>2026.05</th><td>通期レポート 公開予定</td></tr><tr><th>2026.06</th><td>人的資本データ説明会</td></tr></tbody></table></article>
      <article class="ir-ops"><h2>よくある質問</h2><details><summary>人的資本データの集計範囲はどこですか</summary><p>原則として正社員、契約社員、常勤委託を含みます。資料により注記で範囲を示します。</p></details><details><summary>PDF資料の更新頻度はどの程度ですか</summary><p>四半期ごとの補足更新と、年次の統合資料更新を行います。</p></details></article>
      <article class="ir-ops disclaimer"><h2>免責事項</h2><p>掲載情報は資料作成時点の判断に基づくものであり、将来の実績を保証するものではありません。人的資本関連指標は、社内管理基準と外部開示基準の差異により集計範囲が異なる場合があります。</p></article>
    `);
  }

  if (path === "/recruit") {
    document.querySelector(".recruit-layout")?.insertAdjacentHTML("afterend", `
      <section class="recruit-detail-grid reveal-block">
        <article><h2>募集要項詳細</h2><table><tbody><tr><th>雇用形態</th><td>正社員 / 契約社員</td></tr><tr><th>勤務地</th><td>東京本社、リモート併用</td></tr><tr><th>勤務時間</th><td>フレックスタイム制</td></tr></tbody></table></article>
        <article><h2>職種別仕事内容</h2><ul><li>調査設計とサーベイ運用</li><li>人的資本データ分析</li><li>経営会議向けレポート作成</li><li>統合報告書の編集支援</li></ul></article>
        <article><h2>福利厚生</h2><ul><li>書籍購入補助</li><li>資格取得支援</li><li>在宅勤務手当</li><li>プロジェクト休暇制度</li></ul></article>
        <article><h2>エントリー</h2><p>募集職種ごとの応募条件をご確認のうえ、資料窓口から採用関連資料もご確認ください。</p><a class="brand-button" href="#/contact">資料を受け取る</a></article>
      </section>
    `);
  }

  if (path === "/employee-404") {
    const logBody = document.querySelector(".log-table tbody");
    if (logBody) {
      logBody.innerHTML = `
        <tr><td>1</td><td>本人情報表示制限</td><td>通常検索から除外</td><td>2025.07.18 09:21</td></tr>
        <tr><td>2</td><td>人事面談記録制限</td><td>面談記録の参照制限</td><td>2025.07.19 18:06</td></tr>
        <tr><td>3</td><td>監視対象判定</td><td>外部接触フラグを検知</td><td>2025.07.21 22:41</td></tr>
        <tr><td>4</td><td>理事通知除外</td><td>通知対象から除外</td><td>2025.07.22 08:55</td></tr>
        <tr><td>5</td><td>査定保留処理</td><td>記録保護へ状態変更</td><td>2025.07.26 01:13</td></tr>
        <tr><td>6</td><td>部署外共有制限</td><td>家族連絡不要判定</td><td>2025.07.28 08:59</td></tr>
        <tr><td>7</td><td>室長確認済</td><td>部門長確認済み</td><td>2025.08.01 23:48</td></tr>
      `;
    }
  }
}

function updateScrolledState() {
  document.body.classList.toggle("is-scrolled", window.scrollY > 20);
}

function render() {
  const current = route();
  updateChrome(current);
  pages[current]();
  if (current === "/archive") postDesktopEvent("YRI_ARCHIVE_OPENED");
  enrichOperationalContent(current);
  bindForms();
  if (current === "/login" && sessionStorage.getItem(hrAuthNoticeKey) === "1") {
    sessionStorage.removeItem(hrAuthNoticeKey);
    setMessage("#login-message", "認証後に社員マスタを表示します。社員IDと記録名を入力してください。", "error");
  }
  menu.setAttribute("aria-expanded", "false");
  nav.classList.remove("is-open");
  window.scrollTo({ top: 0, behavior: "instant" });
}

menu.addEventListener("click", () => {
  const open = menu.getAttribute("aria-expanded") === "true";
  menu.setAttribute("aria-expanded", String(!open));
  nav.classList.toggle("is-open", !open);
});

window.addEventListener("scroll", updateScrolledState, { passive: true });
window.addEventListener("hashchange", render);
updateScrolledState();
render();
