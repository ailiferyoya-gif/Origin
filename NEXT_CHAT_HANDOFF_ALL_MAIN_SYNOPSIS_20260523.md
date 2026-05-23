# 引継ぎ 2026-05-23 全なぞ解き メインページあらすじ追加

## 対象
- `*Mystery/web/index.html` 全40件
- 各 `web/site.css`
- 既存の `*Mystery_BoothPackage/*/web/index.html` と `site.css` も同期

## 変更内容
- 各なぞ解きの入口メインページに、ネタバレなしの「あらすじ」セクションを追加。
- すべてのあらすじは舞台・調査動機・不穏な違和感を作品ごとに変え、同一文面にならないよう作成。
- `id="synopsis"` を付与し、入口から内容を把握しやすくした。
- `MAIN_SYNOPSIS_20260523` のCSSを各 `site.css` に追加し、既存の `story-panel` 系デザインに合わせて表示。
- 画像生成は今回未使用。既存のChatGPT生成画像のみ継続使用。

## バックアップ
- `C:\Users\kogit\Documents\Codex\backups\all-mystery-main-synopsis-20260523-215523`

## 検証
- 40件すべての `web/index.html` に `id="synopsis"` が1件ずつ存在することを確認。
- 40件すべてに `<h2>あらすじ</h2>` が存在することを確認。
- 文字化けパターン検索: 検出なし。
- `git diff --check`: エラーなし。
- ローカルHTTP表示で代表3件を確認。
  - `CrimsonClinicMystery`: あらすじ表示、画像読み込みOK。
  - `HakurouMuseumMystery`: あらすじ表示、画像読み込みOK。
  - `AkatsukiPlanetariumMystery`: あらすじ表示、画像読み込みOK。

## 次にやること
- 入口ページ以外の各ページにも必要なら「調査状況」や「依頼文」を追加して、ゲーム導線をさらに濃くする。
