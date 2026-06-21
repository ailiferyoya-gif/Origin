const app = document.querySelector("#app");
const nav = document.querySelector("#nav");
const menu = document.querySelector("#menu");
const footerLog = document.querySelector("#footer-log");

const answers = {
  id: ["404"],
  pass: ["秘密録", "ひみつろく", "ヒミツロク"],
  dept: ["監査室", "かんさしつ", "カンサシツ"],
  key: ["疑え", "うたがえ", "ウタガエ"],
  final: ["証言者", "しょうげんしゃ", "ショウゲンシャ", "witness"],
  bad: ["社員", "応募者", "沈黙", "silent"]
};

const pageMeta = {
  "/": { title: "株式会社ユメミノ総合研究所 採用適性検査", footer: "© Yumemino Research Institute" },
  "/about": { title: "企業理念 | ユメミノ総合研究所", footer: "© Yumemino Research Institute" },
  "/recruit": { title: "採用情報 | ユメミノ総合研究所", footer: "© Yumemino Research Institute" },
  "/ir": { title: "IR情報 | ユメミノ総合研究所", footer: "© Yumemino Research Institute / All logs reserved." },
  "/login": { title: "社員専用 | ユメミノ総合研究所", footer: "© Yumemino Research Institute / All logs reserved." },
  "/employee-404": { title: "社員404 | ユメミノ総合研究所", footer: "© Yumemino Research Institute / Your logs reserved." },
  "/audit": { title: "監査室 | ユメミノ総合研究所", footer: "© Yumemino Research Institute / Your logs reserved." },
  "/archive": { title: "監査室アーカイブ | ユメミノ総合研究所", footer: "© Yumemino Research Institute / Your logs reserved." },
  "/final": { title: "最終告発フォーム | ユメミノ総合研究所", footer: "© Yumemino Research Institute / Your logs reserved." }
};

function normalizeAnswer(value) {
  return (value || "")
    .trim()
    .replace(/[Ａ-Ｚａ-ｚ０-９]/g, s => String.fromCharCode(s.charCodeAt(0) - 0xFEE0))
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

function setMessage(id, text, type = "error") {
  const el = document.querySelector(id);
  if (!el) return;
  el.textContent = text;
  el.className = `message ${type}`;
}

function layout(content, className = "") {
  app.className = `page ${className}`;
  app.innerHTML = content;
  app.focus({ preventScroll: true });
}

const pages = {
  "/": () => layout(`
    <section class="hero">
      <div class="hero-copy">
        <p class="label">Human analytics company</p>
        <h1>人の可能性を、正しく測る。</h1>
        <p class="lead">ユメミノ総合研究所は、働く人々の感情・行動・意思決定を可視化し、組織が抱える不安を未然に整える研究開発企業です。</p>
        <p class="lead">迷いのない職場へ。疑問の少ないチームへ。すべての人が、安心して働き続けられる社会へ。私たちは、組織の静かな変化を読み解くための基盤をつくっています。</p>
        <div class="hero-actions">
          <a class="primary-link" href="#/about">企業理念を見る</a>
          <a class="ghost-link" href="#/recruit">採用情報</a>
          <a class="ghost-link" href="#/ir">IR情報</a>
        </div>
        <dl class="hero-meta">
          <div><dt>Research area</dt><dd>感情解析 / 行動ログ / 組織評価</dd></div>
          <div><dt>Established</dt><dd>2019</dd></div>
        </dl>
      </div>
      <aside class="hero-panel">
        <p class="label">Yumemino Research Institute</p>
        <h2>人の迷いを、組織の安心へ。</h2>
        <p>あなたの違和感は、組織改善のための貴重なデータです。</p>
        <div class="panel-status">
          <span>Assessment mode</span>
          <b>Active</b>
        </div>
      </aside>
    </section>
    <section class="ticker" aria-label="重要なお知らせ">
      <span>News</span>
      <a href="#/ir">2026.06.18 人的資本データの統合評価モデルを更新しました</a>
      <a href="#/recruit">2026.06.02 採用適性検査の受付を開始しました</a>
      <a href="#/about">2026.05.27 組織の意思決定支援に関する研究方針を公開しました</a>
    </section>
    <section class="visual-strip" aria-label="研究所の様子">
      <a class="visual-card visual-research" href="#/about"><span>Research</span><b>意思決定支援研究</b></a>
      <a class="visual-card visual-ops" href="#/ir"><span>Analytics</span><b>人的資本データ運用</b></a>
      <a class="visual-card visual-recruit" href="#/recruit"><span>Recruit</span><b>採用適性面談</b></a>
      <a class="visual-card visual-ir" href="#/ir"><span>IR</span><b>統合評価レポート</b></a>
    </section>
    <section class="section">
      <div class="section-head">
        <p class="label">Business</p>
        <h2>人の状態を、組織が扱える情報へ。</h2>
      </div>
      <div class="service-grid">
        <article class="service-card"><div class="service-thumb thumb-ops"></div><span>01</span><h3>感情ログ解析</h3><p>日々の入力、面談記録、業務上の反応から、組織内に蓄積する小さな変化を定量化します。</p></article>
        <article class="service-card"><div class="service-thumb thumb-research"></div><span>02</span><h3>適性評価設計</h3><p>採用、配置、異動、研修に必要な判断軸を設計し、迷いの少ない人事運用を支援します。</p></article>
        <article class="service-card"><div class="service-thumb thumb-recruit"></div><span>03</span><h3>ウェルビーイング運用</h3><p>相談前の兆候を読み取り、従業員が安心して働き続けられる状態を保ちます。</p></article>
      </div>
    </section>
    <section class="section split-section">
      <div class="image-feature" aria-hidden="true"></div>
      <div class="text-block">
        <p class="label">Recruitment aptitude test</p>
        <h2>採用適性検査は、サイトの閲覧から始まっています。</h2>
        <p>本検査では、企業情報の読み取り、資料間の照合、入力フォームへの回答を通じて、応募者の観察力を確認します。実際の外部送信や閲覧行動の収集は行いません。</p>
        <div class="metric-row">
          <div><b>404</b><span>Protected records</span></div>
          <div><b>0.0%</b><span>Reported turnover</span></div>
          <div><b>24h</b><span>Log retention</span></div>
        </div>
      </div>
    </section>
    <section class="section case-band">
      <div>
        <p class="label">Case study</p>
        <h2>迷いを減らすことで、組織は静かになる。</h2>
      </div>
      <p>導入企業では、面談前の不安傾向、会議後の違和感、退職意思の兆候を一元的に把握し、早期の配置調整と記録保護を実現しています。</p>
      <a class="primary-link" href="#/ir">人的資本データを見る</a>
    </section>
    <section class="section narrow">
      <p class="hint-note">この作品はフィクションです。実在の企業・団体・人物とは関係ありません。</p>
    </section>
  `),

  "/about": () => layout(`
    <section class="page-hero">
      <p class="label">Philosophy</p>
      <h1>企業理念</h1>
      <p>私たちは、人の迷いを減らし、組織の意思決定をなめらかにするために存在します。</p>
    </section>
    <section class="page-photo photo-research">
      <div><p class="label">Research environment</p><h2>記録された迷いから、組織の未来を読む。</h2></div>
    </section>
    <section class="section">
      <div class="section-head">
        <p class="label">Four values</p>
        <h2>4つの価値観</h2>
      </div>
      <div class="value-grid">
        <article class="value-card"><h3><span class="value-initial">ミ</span>ッション</h3><p>人の不安を、測定可能な状態にします。</p></article>
        <article class="value-card"><h3><span class="value-initial">ギ</span>ャップレス評価</h3><p>感情・行動・成果の差分を可視化します。</p></article>
        <article class="value-card"><h3><span class="value-initial">ウ</span>ェルビーイング支援</h3><p>従業員が迷わず働ける環境を整えます。</p></article>
        <article class="value-card"><h3><span class="value-initial">エ</span>ンゲージメント分析</h3><p>組織にとって望ましい状態を維持します。</p></article>
      </div>
      <p class="hint-note">価値観は、上から順番に確認してください。次に見るべき場所は、画面の中にあります。</p>
    </section>
  `),

  "/recruit": () => layout(`
    <section class="page-hero">
      <p class="label">Recruit</p>
      <h1>採用情報</h1>
      <p>ユメミノ総合研究所では、疑問を持ちすぎず、変化を楽しめる仲間を募集しています。</p>
    </section>
    <section class="page-photo photo-recruit">
      <div><p class="label">Interview scene</p><h2>あなたの反応も、選考の一部です。</h2></div>
    </section>
    <section class="section">
      <div class="section-head">
        <p class="label">Interview</p>
        <h2>社員インタビュー</h2>
      </div>
      <div class="interview-list">
        <article class="interview-card"><h3>社員A</h3><p>入社してから、仕事の<span class="mark">秘</span>訣は「考えすぎないこと」だと知りました。以前よりも悩む時間が減り、毎朝すぐに行動できます。</p></article>
        <article class="interview-card"><h3>社員B</h3><p>一人ひとりの感情の<span class="mark">密</span>度まで見てくれるので、孤独を感じることがありません。今では、自分の気持ちよりもチームの状態を優先できます。</p></article>
        <article class="interview-card"><h3>社員C</h3><p>毎朝のログは、自分の変化を残す大切な記<span class="mark">録</span>です。最初は少し戸惑いましたが、今では記録されない時間のほうが不安です。</p></article>
        <article class="interview-card"><h3>募集職種</h3><p>感情解析コンサルタント、評価データアナリスト、ウェルビーイング運用担当を募集しています。</p></article>
      </div>
    </section>
  `),

  "/ir": () => layout(`
    <section class="page-hero">
      <p class="label">Investor relations</p>
      <h1>IR情報</h1>
      <p>人的資本データを中心に、当社の成長指標を公開しています。</p>
    </section>
    <section class="page-photo photo-ir">
      <div><p class="label">Human capital report</p><h2>すべての数値は、安定を示しています。</h2></div>
    </section>
    <section class="section narrow">
      <h2>人的資本データ</h2>
      <table class="ir-table" aria-label="人的資本データ">
        <thead><tr><th>年度</th><th>売上高</th><th>社員数</th><th>離職率</th></tr></thead>
        <tbody>
          <tr><td>2022年</td><td>34.7億円</td><td>412名</td><td>12.4%</td></tr>
          <tr><td>2023年</td><td>51.2億円</td><td>406名</td><td>3.1%</td></tr>
          <tr><td>2024年</td><td>88.8億円</td><td class="flag">404名</td><td>0.0%</td></tr>
          <tr><td>2025年</td><td>132.6億円</td><td class="flag">404名</td><td>0.0%</td></tr>
        </tbody>
      </table>
      <p class="hint-note">当社は、独自の従業員幸福度改善システムにより、2024年度以降、離職率0.0%を達成しています。※一部の社員情報は、記録保護のため Not Found と表示される場合があります。</p>
    </section>
  `),

  "/login": () => layout(`
    <section class="section">
      <div class="auth-shell">
        <p class="label">Employee only</p>
        <h1>社員専用ページ</h1>
        <p class="lead">社員IDと合言葉を入力してください。</p>
        <form class="form-grid" id="login-form">
          <label>社員ID<input id="employee-id" autocomplete="off" required></label>
          <label>合言葉<input id="employee-pass" autocomplete="off" required></label>
          <button class="action-button" type="submit">認証</button>
        </form>
        <p class="hint-note">ヒント: 社員IDはIR情報の中に記録されています。合言葉は、働く人の声の中に残されています。</p>
        <p class="message" id="login-message" role="status"></p>
      </div>
    </section>
  `),

  "/employee-404": () => layout(`
    <section class="page-hero">
      <p class="label">Employee database</p>
      <h1>ようこそ、社員404様。</h1>
      <p>この社員情報は、通常の人事データベースには存在しません。</p>
    </section>
    <section class="section">
      <div class="console-shell">
        <dl class="meta-list">
          <div><dt>氏名</dt><dd>未登録</dd></div>
          <div><dt>所属</dt><dd>未登録</dd></div>
          <div><dt>在籍状況</dt><dd>記録なし</dd></div>
          <div><dt>退職状況</dt><dd>退職記録なし</dd></div>
          <div><dt>面談履歴</dt><dd>あり</dd></div>
        </dl>
        <h2>本日の気分を入力してください。</h2>
        <div class="button-row"><button>安心</button><button>不安</button><button>疑問</button><button>怒り</button></div>
        <p class="hint-note">アラート条件: 不安が3回記録された場合、上長面談。疑問が5回記録された場合、部署異動。怒りが7回記録された場合、記録保護。</p>
        <h2>社員404 感情ログ</h2>
        <ol class="log-list">
          <li>安心：通常範囲</li><li>平常：通常範囲</li><li>監視対象：一次判定</li><li>安心：通常範囲</li><li>査定保留：二次判定</li><li>平常：通常範囲</li><li>室長確認：最終判定</li>
        </ol>
        <form class="form-grid" id="dept-form">
          <label>部署名を入力してください<input id="dept-answer" autocomplete="off" required></label>
          <button class="action-button" type="submit">検索</button>
        </form>
        <p class="message" id="dept-message" role="status"></p>
      </div>
    </section>
  `, "employee-page"),

  "/audit": () => layout(`
    <section class="page-hero">
      <p class="label">Audit room</p>
      <h1>監査室</h1>
      <p>このページは削除されました。</p>
    </section>
    <section class="section">
      <div class="console-shell">
        <p>削除理由: 内部通報管理規程 第<span class="redacted"></span>条に基づく記録保護</p>
        <p class="hint-note">ヒント: キーは、当社理念に反する二文字です。</p>
        <div class="content-card site-card">
          <h3>当社理念</h3>
          <p>迷いをなくす。疑問を減らす。声を整える。記録を管理する。</p>
        </div>
        <form class="form-grid" id="key-form">
          <label>復元キー<input id="restore-key" autocomplete="off" required></label>
          <button class="action-button" type="submit">復元</button>
        </form>
        <p class="message" id="key-message" role="status"></p>
      </div>
    </section>
  `, "audit-page"),

  "/archive": () => layout(`
    <section class="page-hero">
      <p class="label">Internal archive</p>
      <h1>監査室アーカイブ</h1>
      <p>以下の文書は、社内監査室により一時保全されています。</p>
    </section>
    <section class="section">
      <div class="console-shell">
        <div class="doc-list">
          <div class="doc-item">A-01　<span class="redacted"></span>拠保全手順</div>
          <div class="doc-item">B-02　発<span class="redacted"></span>テンプレート</div>
          <div class="doc-item">C-03　対象<span class="redacted"></span>リスト</div>
          <div class="doc-item">D-04　PROJECT SILENT 仕様書</div>
          <div class="doc-item">E-05　感情ログ運用マニュアル</div>
          <div class="doc-item">F-06　退職処理自動化フロー</div>
        </div>
        <details><summary>PROJECT SILENT 仕様書</summary><pre>目的: 従業員の感情変動を検知し、組織運営上の不確実性を低減する。
対象感情: 不安 / 疑問 / 怒り / 疲労 / 違和感
Level 5: 記録保護処理</pre></details>
        <details><summary>感情ログ運用マニュアル</summary><pre>疑問の継続的な入力、怒りの複数回入力、社外相談窓口への接触傾向は、監査室による確認対象とします。</pre></details>
        <details><summary>退職処理自動化フロー</summary><pre>状態変更後の表示:
在籍中 Active
退職済 Closed
記録保護 Not Found

社員404 = 記録保護された社員</pre></details>
        <div class="button-row"><a class="primary-link" href="#/final">外部監査機関への送信フォームを開く</a></div>
      </div>
    </section>
  `, "archive-page"),

  "/final": () => layout(`
    <section class="page-hero">
      <p class="label">External audit form</p>
      <h1>最終告発フォーム</h1>
      <p>あなたが復元した記録を、外部監査機関へ送信します。</p>
    </section>
    <section class="section">
      <div class="console-shell">
        <h2>最後に、あなたの役割を入力してください。</h2>
        <p>あなたは、何者ですか？</p>
        <form class="form-grid" id="final-form">
          <label>回答<input id="final-answer" autocomplete="off" required></label>
          <button class="action-button" type="submit">送信</button>
        </form>
        <p class="message" id="final-message" role="status"></p>
      </div>
    </section>
  `, "final-page")
};

function bindForms() {
  document.querySelector("#login-form")?.addEventListener("submit", event => {
    event.preventDefault();
    const idOk = accepts(document.querySelector("#employee-id").value, answers.id);
    const passOk = accepts(document.querySelector("#employee-pass").value, answers.pass);
    if (idOk && passOk) {
      setMessage("#login-message", "認証しました。注意: この社員情報は、通常の人事データベースには存在しません。", "ok");
      setTimeout(() => go("/employee-404"), 850);
    } else {
      setMessage("#login-message", "認証に失敗しました。社員IDまたは合言葉を確認してください。", "error");
    }
  });

  document.querySelector("#dept-form")?.addEventListener("submit", event => {
    event.preventDefault();
    if (accepts(document.querySelector("#dept-answer").value, answers.dept)) {
      setMessage("#dept-message", "該当部署を確認しました。監査室ページへ移動します。", "ok");
      setTimeout(() => go("/audit"), 800);
    } else {
      setMessage("#dept-message", "該当する部署は見つかりませんでした。", "error");
    }
  });

  document.querySelector("#key-form")?.addEventListener("submit", event => {
    event.preventDefault();
    if (accepts(document.querySelector("#restore-key").value, answers.key)) {
      setMessage("#key-message", "復元キーを確認しました。監査室アーカイブを表示します。", "ok");
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
      setMessage("#final-message", "送信できませんでした。あなたの役割が一致しません。", "error");
    }
  });
}

function renderClear() {
  document.title = "社員404は退職していない";
  app.className = "clear-screen";
  app.innerHTML = `
    <section class="clear-panel">
      <p class="label">Transmission complete</p>
      <h1>送信が完了しました。</h1>
      <p>証拠保全手順: 復元済み<br>発言テンプレート: 復元済み<br>対象者リスト: 復元済み</p>
      <p>PROJECT SILENT の一部記録が外部監査機関へ送信されました。</p>
      <p>おめでとうございます。あなたは、ユメミノ総合研究所の採用適性検査を完了しました。</p>
      <div class="judgement">
        <span>疑問を持つ能力　　　検出</span>
        <span>違和感に気づく能力　検出</span>
        <span>記録をたどる能力　　検出</span>
        <span>指示に従わない能力　検出</span>
      </div>
      <h2>総合判定: 重大な組織リスク</h2>
      <p>まもなく担当者よりご連絡いたします。</p>
      <p>画面を閉じても、記録は残ります。</p>
      <div class="true-title">社員404は退職していない</div>
    </section>
  `;
  footerLog.textContent = "© Yumemino Research Institute / Your logs reserved.";
}

function renderBadEnd() {
  app.className = "clear-screen bad-end";
  app.innerHTML = `
    <section class="clear-panel">
      <p class="label">Recommended action selected</p>
      <h1>送信は取り消されました。</h1>
      <p>あなたは、当社の推奨行動を選択しました。</p>
      <p>疑問を持たないこと。記録を外に出さないこと。組織の判断を信頼すること。</p>
      <h2>採用適性: 高</h2>
      <p>次の面談へお進みください。</p>
    </section>
  `;
}

function render() {
  const current = route();
  document.title = pageMeta[current].title;
  footerLog.textContent = `${pageMeta[current].footer} / この作品はフィクションです。実在の企業・団体・人物とは関係ありません。`;
  pages[current]();
  bindForms();
  nav.querySelectorAll("a").forEach(link => {
    const href = link.getAttribute("href")?.replace(/^#/, "");
    link.toggleAttribute("aria-current", href === current);
  });
  nav.classList.remove("open");
  menu.setAttribute("aria-expanded", "false");
  window.scrollTo(0, 0);
}

menu.addEventListener("click", () => {
  const open = !nav.classList.contains("open");
  nav.classList.toggle("open", open);
  menu.setAttribute("aria-expanded", String(open));
});

nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menu.setAttribute("aria-expanded", "false");
}));

window.addEventListener("hashchange", render);
render();
