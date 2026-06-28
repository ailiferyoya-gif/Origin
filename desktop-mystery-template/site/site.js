const DESKTOP_EVENTS = {
  contactSubmitted: "TEMPLATE_CONTACT_REQUEST",
  stageUnlocked: "TEMPLATE_STAGE_UNLOCKED",
  finalSubmitted: "TEMPLATE_FINAL_SUBMITTED"
};

const site = document.querySelector("#site");

function postDesktopEvent(type, payload = {}) {
  window.parent?.postMessage?.({ type, ...payload }, "*");
}

function route() {
  return location.hash.replace("#/", "") || "";
}

function render() {
  const current = route();
  if (current === "docs") return renderDocs();
  if (current === "final") return renderFinal();
  return renderTop();
}

function renderTop() {
  site.innerHTML = `
    <section class="hero">
      <div>
        <h1>{{WORK_TITLE}}</h1>
        <p>これは仮想デスクトップ内のBrowserに表示される、作品内Webサイトのサンプルです。</p>
        <button class="button" data-contact type="button">Talkで資料を受け取る</button>
      </div>
    </section>
    <section class="section">
      <p class="notice">このサイトは外部通信を行いません。ボタン操作は親デスクトップへpostMessageを送ります。</p>
      <div class="grid">
        <article class="card"><h2>公開ページ</h2><p>序盤の普通に見える情報を置きます。</p></article>
        <article class="card"><h2>違和感</h2><p>直接説明せず、後から意味が変わる文言を置きます。</p></article>
        <article class="card"><h2>連動</h2><p>イベントでTalk、Files、Searchを解放します。</p></article>
      </div>
    </section>
  `;
  site.querySelector("[data-contact]").addEventListener("click", () => {
    postDesktopEvent(DESKTOP_EVENTS.contactSubmitted);
    site.querySelector("[data-contact]").textContent = "Talkへ送信済み";
  });
}

function renderDocs() {
  site.innerHTML = `
    <section class="section">
      <h1>Docs</h1>
      <p>ここに作品内資料ページを作ります。特定の入力成功時には、次のように親へ通知できます。</p>
      <button class="button" data-stage type="button">調査段階を更新する</button>
    </section>
  `;
  site.querySelector("[data-stage]").addEventListener("click", () => postDesktopEvent(DESKTOP_EVENTS.stageUnlocked));
}

function renderFinal() {
  site.innerHTML = `
    <section class="section">
      <h1>Final</h1>
      <p>最終送信のサンプルです。実作品では入力判定や分類UIへ置き換えてください。</p>
      <button class="button" data-final type="button">最終イベントを送信</button>
    </section>
  `;
  site.querySelector("[data-final]").addEventListener("click", () => postDesktopEvent(DESKTOP_EVENTS.finalSubmitted));
}

window.addEventListener("hashchange", render);
render();
