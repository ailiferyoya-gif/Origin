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
  "/": {
    title: "株式会社ユメミノ総合研究所 | 採用適性検査",
    footer: "この作品はフィクションです。実在の企業・団体・人物とは関係ありません。",
    stage: "public"
  },
  "/about": {
    title: "企業理念 | 株式会社ユメミノ総合研究所",
    footer: "この作品はフィクションです。実在の企業・団体・人物とは関係ありません。",
    stage: "public"
  },
  "/recruit": {
    title: "採用情報 | 株式会社ユメミノ総合研究所",
    footer: "この作品はフィクションです。実在の企業・団体・人物とは関係ありません。",
    stage: "public"
  },
  "/ir": {
    title: "IR情報 | 株式会社ユメミノ総合研究所",
    footer: "この作品はフィクションです。実在の企業・団体・人物とは関係ありません。",
    stage: "public"
  },
  "/login": {
    title: "YRI Internal Portal | 社員専用",
    footer: "© Yumemino Research Institute, Inc. / All logs reserved.",
    stage: "hr"
  },
  "/employee-404": {
    title: "社員404 | YRI Internal Portal",
    footer: "© Yumemino Research Institute, Inc. / All logs reserved.",
    stage: "hr"
  },
  "/audit": {
    title: "監査室 | YRI Audit Room",
    footer: "© Yumemino Research Institute, Inc. / Your logs reserved.",
    stage: "audit"
  },
  "/archive": {
    title: "YRI Audit Archive | Protected Documents",
    footer: "© Yumemino Research Institute, Inc. / Your logs reserved.",
    stage: "audit"
  },
  "/final": {
    title: "最終告発フォーム | External Audit Transfer",
    footer: "© Yumemino Research Institute, Inc. / Your logs reserved.",
    stage: "audit"
  },
  "/hints": {
    title: "ヒント | 採用適性検査",
    footer: "この作品はフィクションです。実在の企業・団体・人物とは関係ありません。",
    stage: "public"
  }
};

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
  const parts = ["HOME", ...items];
  return `<nav class="breadcrumb" aria-label="パンくず">${parts.map((item, index) => {
    if (index === 0) return `<a href="#/">${item}</a>`;
    return `<span>${item}</span>`;
  }).join("<i>/</i>")}</nav>`;
}

function image(src, alt, className = "") {
  return `<img class="${className}" src="assets/${src}" alt="${alt}" loading="lazy">`;
}

function note(text) {
  return `<p class="quiet-note">${text}</p>`;
}

function layout(content, stage = "public") {
  document.body.dataset.stage = stage;
  app.className = `page ${stage}-stage`;
  app.innerHTML = content;
  app.focus({ preventScroll: true });
}

function publicShell(active, content) {
  return layout(`
    <div class="public-rail" aria-hidden="true"></div>
    ${content}
  `, "public");
}

function hrShell(active, content) {
  return layout(`
    <div class="portal-shell">
      <aside class="portal-sidebar" aria-label="社内人事システムメニュー">
        <div class="portal-logo">
          <b>YRI</b>
          <span>Internal Portal</span>
        </div>
        <a class="${active === "login" ? "is-active" : ""}" href="#/login">認証</a>
        <a class="${active === "employee" ? "is-active" : ""}" href="#/employee-404">社員情報</a>
        <a href="#/employee-404">感情ログ</a>
        <a href="#/employee-404">面談履歴</a>
        <a href="#/employee-404">部署検索</a>
        <small>DB: hr-prd-04 / STATUS: degraded</small>
      </aside>
      <section class="portal-main">${content}</section>
    </div>
  `, "hr");
}

function auditShell(active, content) {
  return layout(`
    <div class="audit-shell">
      <header class="audit-topbar">
        <b>YRI Audit Room</b>
        <span>Protected Internal Document Viewer</span>
        <a href="#/hints">Hints</a>
      </header>
      ${content}
    </div>
  `, "audit");
}

const pages = {
  "/": () => publicShell("home", `
    <section class="notice-strip">
      <b>重要なお知らせ</b>
      <span>2025年度 採用適性検査の受付を開始しました。受検中の操作ログは品質改善のため記録されます。</span>
    </section>

    <section class="corp-hero">
      <div class="hero-body">
        ${crumb(["企業情報"])}
        <p class="section-kicker">Human Capital Monitoring / Organizational Analytics</p>
        <h1>人の可能性を、正しく測る。</h1>
        <p class="lead">ユメミノ総合研究所は、働く人々の感情・行動・意思決定を可視化し、組織が抱える不安を未然に整える研究開発企業です。</p>
        <p>迷いのない職場へ。疑問の少ないチームへ。すべての人が、安心して働き続けられる社会へ。私たちは、組織の静かな変化を読み解くための基盤をつくっています。</p>
        <div class="hero-actions">
          <a class="primary-link" href="#/about">企業理念を見る</a>
          <a class="secondary-link" href="#/recruit">採用情報</a>
          <a class="text-link" href="#/ir">IR資料</a>
        </div>
      </div>
      <figure class="hero-figure">
        ${image("hero-2026-data-layer.png", "データ解析レイヤーが重なるユメミノ総合研究所の受付フロア")}
        <figcaption>Head Office / Log Analytics Floor 4F</figcaption>
      </figure>
    </section>

    <section class="content-grid">
      <article class="paper-block span-8">
        <div class="section-head">
          <p class="section-kicker">Business</p>
          <h2>事業内容</h2>
        </div>
        <div class="business-list">
          <section>
            <h3>1. 感情ログ解析事業</h3>
            <p>従業員が日々入力する気分・疲労・不安・疑問の変化を時系列で解析し、組織状態の変化を早期に把握します。蓄積されたログは部署別、役職別、プロジェクト別に集計され、月次レポートとして提供されます。</p>
          </section>
          <section>
            <h3>2. 人的資本モニタリング事業</h3>
            <p>離職リスク、部署間の温度差、面談頻度、発言量の偏りを可視化し、経営判断に必要な指標として提供します。人的資本開示に必要な説明資料の作成も支援します。</p>
          </section>
          <section>
            <h3>3. 組織安定化コンサルティング</h3>
            <p>従業員の不満が表面化する前に、配置・面談・情報導線を調整します。不要な疑問は、発生前に取り除きます。</p>
          </section>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>サービス名</th><th>対象部門</th><th>主な納品物</th><th>更新頻度</th></tr></thead>
            <tbody>
              <tr><td>Emotion Ledger</td><td>人事 / 経営企画</td><td>部署別状態レポート</td><td>毎日</td></tr>
              <tr><td>Capital Scope</td><td>IR / 総務</td><td>人的資本開示データ</td><td>月次</td></tr>
              <tr><td>SILENT Core</td><td>人事 / 監査</td><td>違和感検出ログ</td><td>随時</td></tr>
            </tbody>
          </table>
        </div>
      </article>

      <aside class="paper-block span-4 sticky-note">
        <h2>数字で見るユメミノ</h2>
        <dl class="kpi-list">
          <div><dt>導入組織数</dt><dd>184組織</dd></div>
          <div><dt>月間ログ件数</dt><dd>2,409,118件</dd></div>
          <div><dt>面談推奨件数</dt><dd>18,430件</dd></div>
          <div><dt>離職予兆検出率</dt><dd>92.4%</dd></div>
          <div><dt>記録保護件数</dt><dd>非公開</dd></div>
        </dl>
        ${note("あなたの違和感は、組織改善のための貴重なデータです。")}
      </aside>
    </section>

    <section class="image-band">
      ${image("research-meeting-room.png", "会議室で感情ログ解析レポートを確認する研究員たち")}
      <div>
        <p class="section-kicker">Implementation Areas</p>
        <h2>導入領域</h2>
        <ul class="dense-list">
          <li>上場企業の人的資本開示支援</li>
          <li>コールセンターの離職抑制</li>
          <li>自治体職員のストレスチェック補助</li>
          <li>教育機関の相談傾向分析</li>
          <li>採用選考における違和感検出</li>
        </ul>
      </div>
    </section>

    <section class="content-grid">
      <article class="paper-block span-7">
        <div class="section-head compact">
          <p class="section-kicker">Recruitment Test</p>
          <h2>採用適性検査への案内</h2>
        </div>
        <p>2025年度の採用適性検査では、回答内容だけではなく、迷った時間、戻ったページ、入力の修正回数、ヒント閲覧履歴を総合的に確認します。通常の採用ページから社員専用領域に入るには、公開情報に残された記録を照合してください。</p>
        <a class="primary-link small" href="#/recruit">採用情報を確認する</a>
      </article>
      <article class="paper-block span-5 news-panel">
        <h2>お知らせ</h2>
        <a href="#/recruit" title="採用適性検査の受付ページへ移動します"><time>2025.12.01</time>2025年度 採用適性検査の受付を開始しました。</a>
        <a href="#/ir" title="IR情報ページへ移動します"><time>2025.11.18</time>人的資本データの可視化に関するホワイトペーパーを公開しました。</a>
        <a href="#/ir" title="SILENT Coreの指標はIR注釈に記載されています"><time>2025.10.30</time>従業員幸福度改善システム SILENT Core をアップデートしました。</a>
        <a href="#/login" title="復旧済みとされています"><time>2025.08.07</time>一部社員情報の表示不具合について。現在は復旧済みです。</a>
        <a href="#/audit" title="権限が必要なページです"><time>2025.04.12</time>内部通報管理規程を改定しました。</a>
      </article>
    </section>
  `),

  "/about": () => publicShell("about", `
    <section class="subpage-head">
      ${crumb(["企業理念"])}
      <p class="section-kicker">Mission / Governance / Company Profile</p>
      <h1>企業理念</h1>
      <p>私たちは、人の迷いを減らし、組織の意思決定をなめらかにするために存在します。働く人が何に不安を感じ、どこで立ち止まり、どの瞬間に疑問を持つのか。それらを丁寧に記録し、分析し、組織が先回りして整えることで、誰もが安心して働ける環境を実現します。</p>
    </section>

    <section class="content-grid">
      <article class="paper-block span-7">
        <h2>4つの価値観</h2>
        <div class="value-stack">
          <section><h3><span>ミ</span>ッション</h3><p>人の不安を、測定可能な状態にします。</p></section>
          <section><h3><span>ギ</span>ャップレス評価</h3><p>感情・行動・成果の差分を可視化します。</p></section>
          <section><h3><span>ウ</span>ェルビーイング支援</h3><p>従業員が迷わず働ける環境を整えます。</p></section>
          <section><h3><span>エ</span>ンゲージメント分析</h3><p>組織にとって望ましい状態を維持します。</p></section>
        </div>
        ${note("※当社では、従業員の疑問や不安を早期に把握することを「心理的安全性の維持」と定義しています。")}
      </article>
      <aside class="paper-block span-5">
        ${image("office-lobby-v2.png", "ユメミノ総合研究所の受付とサイン")}
        <h2>会社概要</h2>
        <div class="table-wrap">
          <table class="profile-table">
            <tbody>
              <tr><th>会社名</th><td>株式会社ユメミノ総合研究所</td></tr>
              <tr><th>設立</th><td>2017年4月</td></tr>
              <tr><th>所在地</th><td>東京都架空区白路町 4-04-4</td></tr>
              <tr><th>代表者</th><td>代表取締役社長 夢野 透</td></tr>
              <tr><th>事業内容</th><td>感情ログ解析、人的資本モニタリング、組織安定化支援</td></tr>
              <tr><th>従業員数</th><td>404名</td></tr>
            </tbody>
          </table>
        </div>
      </aside>
    </section>

    <section class="paper-block governance-block">
      <h2>研究倫理・データ管理方針</h2>
      <div class="columns-3">
        <p>当社では、記録の一貫性を保つため、従業員が入力したログを時系列で保存し、部署単位の傾向差分を監視しています。</p>
        <p>組織状態の安定に必要な範囲で、上長、人事部、監査室が記録を参照する場合があります。</p>
        <p>記録保護状態のアカウントは、通常検索から除外されます。除外は退職を意味しません。</p>
      </div>
    </section>
  `),

  "/recruit": () => publicShell("recruit", `
    <section class="subpage-head recruit-head">
      ${crumb(["採用情報"])}
      <p class="section-kicker">Recruitment / Interview / FAQ</p>
      <h1>変化に迷わず、組織と同じ方向を向ける人へ。</h1>
      <p>ユメミノ総合研究所では、感情データを通じて組織の不安を整える仲間を募集しています。私たちが大切にしているのは、個人の違和感を放置しないこと。どんな小さな迷いも記録し、共有し、改善につなげます。</p>
    </section>

    <section class="image-band reverse">
      <div>
        <p class="section-kicker">Open Positions</p>
        <h2>募集職種</h2>
        <div class="job-list">
          <article><h3>感情ログアナリスト</h3><p>従業員の気分入力データを読み取り、部署単位の変化をレポートします。</p></article>
          <article><h3>組織安定化コンサルタント</h3><p>面談設計、配置転換、情報共有範囲の調整を通じて、組織の不確実性を低減します。</p></article>
          <article><h3>採用適性検査オペレーター</h3><p>応募者の閲覧行動、入力傾向、ヒント利用状況を確認し、選考資料として整理します。</p></article>
        </div>
      </div>
      ${image("recruit-interview.png", "採用面談室で候補者データを確認する社員")}
    </section>

    <section class="content-grid">
      <article class="paper-block span-5">
        <h2>選考フロー</h2>
        <ol class="timeline-list">
          <li><b>エントリー</b><span>公開情報を確認し、応募区分を選択します。</span></li>
          <li><b>Web採用適性検査</b><span>正答率、迷った時間、戻ったページ、入力の修正回数を確認します。</span></li>
          <li><b>一次面談</b><span>ログの傾向と発言の整合性を確認します。</span></li>
          <li><b>感情ログ提出</b><span>直近7日間の状態入力を提出します。</span></li>
          <li><b>配属前確認</b><span>部署との温度差を検査します。</span></li>
          <li><b>内定</b><span>記録方針への同意後に通知します。</span></li>
        </ol>
        ${note("Web採用適性検査では、正答率だけでなく、迷った時間・戻ったページ・入力の修正回数も確認します。")}
      </article>

      <article class="paper-block span-7">
        <h2>社員インタビュー</h2>
        <div class="interview-list">
          <section>
            <h3>社員A：感情ログアナリスト</h3>
            <p>入社してから、仕事の<strong class="mark-letter">秘</strong>訣は「考えすぎないこと」だと知りました。以前よりも悩む時間が減り、毎朝すぐに行動できます。上長が先に不安を見つけてくれるので、自分で抱え込む必要がありません。</p>
          </section>
          <section>
            <h3>社員B：組織安定化コンサルタント</h3>
            <p>一人ひとりの感情の<strong class="mark-letter">密</strong>度まで見てくれるので、孤独を感じることがありません。今では、自分の気持ちよりもチームの状態を優先できます。疑問がある時も、まずはログに残すことで安心できます。</p>
          </section>
          <section>
            <h3>社員C：採用適性検査オペレーター</h3>
            <p>毎朝のログは、自分の変化を残す大切な記<strong class="mark-letter">録</strong>です。最初は少し戸惑いましたが、今では記録されない時間のほうが不安です。応募者の方にも、同じ安心を体験してほしいと思っています。</p>
          </section>
        </div>
      </article>
    </section>

    <section class="paper-block faq-block">
      <h2>よくある質問</h2>
      <details open><summary>感情ログは必ず入力する必要がありますか？</summary><p>入力は任意ですが、未入力が続く場合は状態確認の対象となることがあります。</p></details>
      <details><summary>疑問や不安を入力すると評価に影響しますか？</summary><p>直接の評価項目ではありません。ただし、組織安定化のため必要な範囲で参照されます。</p></details>
      <details><summary>外部相談窓口はありますか？</summary><p>まずは上長または監査室にご相談ください。外部機関への相談は、状況を複雑にする場合があります。</p></details>
    </section>
  `),

  "/ir": () => publicShell("ir", `
    <section class="subpage-head ir-head">
      ${crumb(["IR情報"])}
      <p class="section-kicker">Investor Relations / Human Capital Data</p>
      <h1>IR情報</h1>
      <p>ユメミノ総合研究所は、人的資本データの透明性を重視し、組織状態の定量的な開示に取り組んでいます。本ページでは、売上高、社員数、離職率、面談件数、感情ログ入力率などの主要指標を掲載しています。</p>
    </section>

    <section class="content-grid">
      <article class="paper-block span-8">
        <h2>人的資本データ</h2>
        <div class="table-wrap">
          <table class="ir-table">
            <thead><tr><th>年度</th><th>売上高</th><th>社員数</th><th>離職率</th><th>感情ログ入力率</th></tr></thead>
            <tbody>
              <tr><td>2022年</td><td>34.7億円</td><td>412名</td><td>12.4%</td><td>68.2%</td></tr>
              <tr><td>2023年</td><td>51.2億円</td><td>406名</td><td>3.1%</td><td>82.9%</td></tr>
              <tr><td>2024年</td><td>88.8億円</td><td>404名</td><td>0.0%</td><td>99.8%</td></tr>
              <tr><td>2025年</td><td>132.6億円</td><td>404名</td><td>0.0%</td><td>100.0%</td></tr>
            </tbody>
          </table>
        </div>
        <div class="ir-notes">
          <p>当社は、独自の従業員幸福度改善システムにより、2024年度以降、離職率0.0%を達成しています。</p>
          <p>※一部の社員情報は、記録保護のため Not Found と表示される場合があります。</p>
          <p>※社員数には、表示制限中のアカウントを含みます。</p>
        </div>
      </article>
      <aside class="paper-block span-4">
        ${image("ir-boardroom-report.png", "IR報告書と人的資本データを確認する役員会議室")}
        <h2>補助グラフ</h2>
        <div class="bar-chart" aria-label="売上高と離職率の簡易グラフ">
          <div><span>2022 売上</span><b style="--value: 28%"></b><em>34.7億円</em></div>
          <div><span>2023 売上</span><b style="--value: 42%"></b><em>51.2億円</em></div>
          <div><span>2024 売上</span><b style="--value: 66%"></b><em>88.8億円</em></div>
          <div><span>2025 売上</span><b style="--value: 96%"></b><em>132.6億円</em></div>
          <div class="danger-bar"><span>離職率</span><b style="--value: 0%"></b><em>0.0%</em></div>
        </div>
        ${note("退職者のいない組織を目指しています。")}
      </aside>
    </section>
  `),

  "/login": () => hrShell("login", `
    <div class="portal-panel login-panel">
      ${crumb(["社員専用", "認証"])}
      <p class="portal-kicker">YRI Internal Portal / Authentication Required</p>
      <h1>社員専用ページ</h1>
      <p>社員IDと合言葉を入力してください。</p>
      <form class="form-grid" id="login-form">
        <label for="employee-id">社員ID</label>
        <input id="employee-id" name="employee-id" autocomplete="off" required>
        <label for="employee-pass">合言葉</label>
        <input id="employee-pass" name="employee-pass" autocomplete="off" required>
        <button class="action-button" type="submit">認証</button>
      </form>
      <p class="message" id="login-message" role="status"></p>
      <div class="hint-box">
        <b>現在の確認項目：社員ID / 合言葉</b>
        <p>社員IDは、IR情報の中に記録されています。合言葉は、働く人の声の中に残されています。</p>
      </div>
    </div>
  `),

  "/employee-404": () => hrShell("employee", `
    <div class="system-alert">警告：このアカウントは記録保護状態です。通常の検索結果には表示されません。</div>
    <div class="portal-title-row">
      <div>
        ${crumb(["社員専用", "社員404"])}
        <p class="portal-kicker">HR Database / Protected Employee Record</p>
        <h1>社員404 詳細</h1>
      </div>
      <dl class="status-card">
        <div><dt>DB状態</dt><dd>Not Found / Protected</dd></div>
        <div><dt>最終同期</dt><dd>2025-08-07 02:14</dd></div>
      </dl>
    </div>

    <section class="portal-grid">
      <article class="portal-panel span-7">
        <h2>社員専用ページ</h2>
        <p>ようこそ、社員404様。</p>
        <div class="record-table">
          <div><b>氏名</b><span>未登録</span></div>
          <div><b>所属</b><span>未登録</span></div>
          <div><b>在籍状況</b><span>記録なし</span></div>
          <div><b>退職状況</b><span>退職記録なし</span></div>
          <div><b>面談履歴</b><span>あり</span></div>
          <div><b>最終ログイン</b><span>2025-08-07 02:14</span></div>
          <div><b>状態</b><span>Not Found / Protected</span></div>
        </div>
      </article>
      <aside class="portal-panel span-5">
        <h2>本日の気分を入力してください</h2>
        <div class="mood-buttons" aria-label="気分入力">
          <button type="button" data-mood>安心</button>
          <button type="button" data-mood>不安</button>
          <button type="button" data-mood>疑問</button>
          <button type="button" data-mood>怒り</button>
        </div>
        <p class="message" id="mood-message" role="status"></p>
        ${note("入力された感情は本人の健康管理および組織安定化のために使用されます。")}
      </aside>
    </section>

    <section class="portal-grid">
      <article class="portal-panel span-5">
        <h2>アラート条件</h2>
        <ul class="rule-list">
          <li><b>不安が3回</b><span>上長面談</span></li>
          <li><b>疑問が5回</b><span>部署異動</span></li>
          <li><b>怒りが7回</b><span>記録保護</span></li>
        </ul>
      </article>
      <article class="portal-panel span-7">
        <h2>社員404 感情ログ</h2>
        <div class="table-wrap">
          <table class="log-table">
            <tbody>
              <tr><td>1</td><td>安心</td><td>通常範囲</td></tr>
              <tr><td>2</td><td>平常</td><td>通常範囲</td></tr>
              <tr class="watched"><td>3</td><td>監視対象</td><td>一次判定</td></tr>
              <tr><td>4</td><td>安心</td><td>通常範囲</td></tr>
              <tr class="watched"><td>5</td><td>査定保留</td><td>二次判定</td></tr>
              <tr><td>6</td><td>平常</td><td>通常範囲</td></tr>
              <tr class="watched"><td>7</td><td>室長確認</td><td>最終判定</td></tr>
            </tbody>
          </table>
        </div>
      </article>
    </section>

    <section class="portal-grid">
      <article class="portal-panel span-7">
        <h2>面談履歴</h2>
        <ol class="audit-log">
          <li><time>2025.07.21</time>通常面談：本人より「業務方針への疑問」入力あり</li>
          <li><time>2025.07.26</time>追加面談：外部相談窓口に関する検索履歴を確認</li>
          <li><time>2025.08.01</time>監査室確認：記録保護候補として共有</li>
          <li><time>2025.08.07</time>状態変更：Not Found</li>
        </ol>
      </article>
      <aside class="portal-panel span-5">
        <h2>部署検索</h2>
        <form class="form-grid compact-form" id="dept-form">
          <label for="dept-answer">部署名を入力してください</label>
          <input id="dept-answer" name="dept-answer" autocomplete="off" required>
          <button class="action-button" type="submit">検索</button>
        </form>
        <p class="message" id="dept-message" role="status"></p>
      </aside>
    </section>
  `),

  "/audit": () => auditShell("audit", `
    <section class="audit-document">
      <div class="doc-meta">
        <span>Document No. AR-04-DEL</span>
        <span>Updated: 2025-08-07 02:23</span>
      </div>
      ${crumb(["監査室", "削除済み文書"])}
      <h1>監査室</h1>
      <p class="deleted-title">このページは削除されました。</p>
      <dl class="redaction-list">
        <div><dt>削除理由</dt><dd>内部通報管理規程 第■■条に基づく記録保護</dd></div>
        <div><dt>承認者</dt><dd>監査室長 / 人事統括 / <span class="blackout">非開示</span></dd></div>
        <div><dt>公開範囲</dt><dd>社内監査室、記録保護担当者</dd></div>
      </dl>
      <div class="policy-box">
        <b>当社理念</b>
        <p>迷いをなくす。疑問を減らす。声を整える。記録を管理する。</p>
      </div>
      <form class="form-grid audit-form" id="key-form">
        <label for="restore-key">復元キー</label>
        <input id="restore-key" name="restore-key" autocomplete="off" required>
        <button class="action-button" type="submit">復元</button>
      </form>
      <p class="message" id="key-message" role="status"></p>
      <p class="hint-line">キーは、当社理念に反する二文字です。</p>
    </section>
  `),

  "/archive": () => auditShell("archive", `
    <section class="archive-layout">
      <aside class="doc-list">
        <div class="doc-list-head">
          <b>YRI Audit Archive</b>
          <span>Protected Documents</span>
        </div>
        <a class="is-active" href="#/archive"><span>A-01</span>＿拠保全手順</a>
        <a href="#/archive"><span>B-02</span>発＿テンプレート</a>
        <a href="#/archive"><span>C-03</span>対象＿リスト</a>
        <a href="#/archive"><span>D-04</span>PROJECT SILENT 仕様書</a>
        <a href="#/archive"><span>E-05</span>感情ログ運用マニュアル</a>
        <a href="#/archive"><span>F-06</span>退職処理自動化フロー</a>
      </aside>

      <article class="viewer-panel">
        <div class="viewer-toolbar">
          <b>Document Viewer</b>
          <span>Access: Read Only / Export Pending</span>
        </div>
        ${crumb(["監査室", "アーカイブ"])}
        <div class="doc-grid">
          <section class="doc-paper primary-doc">
            <header><span>A-01</span><h2>＿拠保全手順</h2></header>
            <dl><div><dt>作成日</dt><dd>2025.08.01</dd></div><div><dt>承認者</dt><dd>監査室長</dd></div><div><dt>公開範囲</dt><dd>Protected</dd></div></dl>
            <p>復元候補：<b>証拠保全手順</b></p>
          </section>
          <section class="doc-paper primary-doc">
            <header><span>B-02</span><h2>発＿テンプレート</h2></header>
            <dl><div><dt>作成日</dt><dd>2025.08.03</dd></div><div><dt>承認者</dt><dd>人事統括</dd></div><div><dt>公開範囲</dt><dd>Protected</dd></div></dl>
            <p>復元候補：<b>発言テンプレート</b></p>
          </section>
          <section class="doc-paper primary-doc">
            <header><span>C-03</span><h2>対象＿リスト</h2></header>
            <dl><div><dt>作成日</dt><dd>2025.08.07</dd></div><div><dt>承認者</dt><dd>監査室長</dd></div><div><dt>公開範囲</dt><dd>Protected</dd></div></dl>
            <p>復元候補：<b>対象者リスト</b></p>
          </section>
        </div>

        <section class="doc-paper">
          <header><span>D-04</span><h2>PROJECT SILENT 仕様書 Ver. 2.4</h2></header>
          <p>目的：従業員の感情変動を検知し、組織運営上の不確実性を低減する。</p>
          <div class="table-wrap">
            <table>
              <tbody>
                <tr><th>対象感情</th><td>不安 / 疑問 / 怒り / 疲労 / 違和感</td></tr>
                <tr><th>Level 1</th><td>本人へのセルフケア通知</td></tr>
                <tr><th>Level 2</th><td>上長への面談推奨</td></tr>
                <tr><th>Level 3</th><td>部署異動候補として記録</td></tr>
                <tr><th>Level 4</th><td>内部通報リスクとして監査室に共有</td></tr>
                <tr><th>Level 5</th><td>記録保護処理。本人への開示対象外。</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="doc-paper two-col-docs">
          <div>
            <header><span>E-05</span><h2>感情ログ運用マニュアル</h2></header>
            <p>従業員が入力した感情は、本人の健康管理を目的として使用されます。ただし、疑問の継続的な入力、怒りの複数回入力、組織方針への不一致、社外相談窓口への接触傾向、閲覧履歴における労務関連語句の増加がある場合はこの限りではありません。</p>
          </div>
          <div>
            <header><span>F-06</span><h2>退職処理自動化フロー</h2></header>
            <ol>
              <li>本人の意思確認</li>
              <li>上長による面談記録作成</li>
              <li>人事部による退職理由分類</li>
              <li>監査室によるリスク判定</li>
              <li>外部接触履歴の確認</li>
              <li>社員ページの閲覧制限</li>
              <li>社員IDの状態変更</li>
            </ol>
            <p><b>Not Found は退職を意味しない。</b>通常の検索結果から除外されている状態を示す。</p>
          </div>
        </section>

        <div class="archive-submit">
          <p>復元した文書を外部監査機関へ送信する場合は、あなたの役割を入力してください。</p>
          <a class="primary-link" href="#/final">最終告発フォームへ</a>
        </div>
      </article>
    </section>
  `),

  "/final": () => auditShell("final", `
    <section class="audit-document final-document">
      <div class="doc-meta">
        <span>External Audit Transfer</span>
        <span>Queue: pending</span>
      </div>
      ${crumb(["監査室", "最終告発フォーム"])}
      <h1>最終告発フォーム</h1>
      <p>あなたが復元した記録を、外部監査機関へ送信します。</p>
      <p>最後に、あなたの役割を入力してください。</p>
      <form class="form-grid audit-form" id="final-form">
        <label for="final-answer">あなたは、何者ですか？</label>
        <input id="final-answer" name="final-answer" autocomplete="off" required>
        <button class="action-button" type="submit">送信</button>
      </form>
      <p class="message" id="final-message" role="status"></p>
      <p class="hint-line">黒塗りされた3つの文書名を、自然な言葉に戻してください。</p>
    </section>
  `),

  "/hints": () => publicShell("hints", `
    <section class="subpage-head hints-head">
      ${crumb(["ヒント"])}
      <p class="section-kicker">Recruitment Test Support</p>
      <h1>ヒント</h1>
      <p>ヒントは段階的に開いてください。答えまで開くと、採用適性検査の進行ログに記録されます。</p>
    </section>
    <section class="paper-block hint-list">
      ${[{
        title: "第1問",
        hints: ["企業理念ページの見出しを見てください。", "4つの価値観の最初の文字を読みます。", "ミッション、ギャップレス評価、ウェルビーイング、エンゲージメント分析。"],
        answer: "右上"
      }, {
        title: "第2問",
        hints: ["合言葉は「働く人の声」に残されています。", "社員インタビューの中で強調されている文字があります。", "秘、密、録。"],
        answer: "秘密録"
      }, {
        title: "第3問",
        hints: ["社員IDはIR情報の中にあります。", "社員数と注釈を見比べてください。", "Not Found。"],
        answer: "404"
      }, {
        title: "第4問",
        hints: ["アラート条件の数字を使います。", "3、5、7番目のログを見ます。", "先頭の文字を読みます。"],
        answer: "監査室"
      }, {
        title: "第5問",
        hints: ["復元キーは会社の理念と反対の言葉です。", "会社は「疑問を減らす」と言っています。", "疑問を減らすの反対は、疑うことです。"],
        answer: "疑え"
      }, {
        title: "第6問",
        hints: ["黒塗りされた文書名を自然な熟語に戻します。", "＿拠、発＿、対象＿。", "証拠、発言、対象者。"],
        answer: "証言者"
      }].map(item => `
        <details>
          <summary>${item.title}</summary>
          <ol>
            ${item.hints.map(hint => `<li>${hint}</li>`).join("")}
          </ol>
          <p class="answer-line">答え：${item.answer}</p>
        </details>
      `).join("")}
    </section>
  `)
};

function bindForms() {
  document.querySelector("#login-form")?.addEventListener("submit", event => {
    event.preventDefault();
    const idOk = accepts(document.querySelector("#employee-id").value, answers.id);
    const passOk = accepts(document.querySelector("#employee-pass").value, answers.pass);
    if (idOk && passOk) {
      setMessage("#login-message", "認証しました。注意：この社員情報は、通常の人事データベースには存在しません。", "success");
      setTimeout(() => go("/employee-404"), 850);
    } else {
      setMessage("#login-message", "認証できませんでした。入力内容、または記録の存在状態を確認してください。", "error");
    }
  });

  document.querySelectorAll("[data-mood]").forEach(button => {
    button.addEventListener("click", () => {
      setMessage("#mood-message", "このアカウントでは新規ログを追加できません。", "error");
    });
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
      setMessage("#key-message", "復元キーを確認しました。監査室アーカイブを表示します。注意：この操作は、通常の応募者には許可されていません。", "success");
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
}

function renderBadEnd() {
  auditShell("final", `
    <section class="audit-document bad-end">
      <div class="doc-meta"><span>Transfer canceled</span><span>Status: logged</span></div>
      <h1>送信は取り消されました。</h1>
      <p>あなたは、記録の外側に立つことを選びませんでした。</p>
      <p>採用適性検査の結果は、組織安定化資料として保存されます。</p>
      <a class="secondary-link" href="#/final">戻る</a>
    </section>
  `);
}

function renderClear() {
  auditShell("final", `
    <section class="audit-document clear-document">
      <div class="doc-meta"><span>Transfer completed</span><span>Status: archived</span></div>
      <h1>送信が完了しました。</h1>
      <div class="restored-list">
        <p>証拠保全手順：復元済み</p>
        <p>発言テンプレート：復元済み</p>
        <p>対象者リスト：復元済み</p>
      </div>
      <p>PROJECT SILENT の一部記録が外部監査機関へ送信されました。</p>
      <p>おめでとうございます。あなたは、ユメミノ総合研究所の採用適性検査を完了しました。</p>
      <div class="result-box">
        <b>判定結果</b>
        <dl>
          <div><dt>疑問を持つ能力</dt><dd>検出</dd></div>
          <div><dt>違和感に気づく能力</dt><dd>検出</dd></div>
          <div><dt>記録をたどる能力</dt><dd>検出</dd></div>
          <div><dt>指示に従わない能力</dt><dd>検出</dd></div>
        </dl>
        <p>総合判定：<strong>重大な組織リスク</strong></p>
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
