# 引継ぎ 2026-05-24 謎解き入口ページ統一

## 対象
- 全 `*Mystery/web/index.html`
- 全 `*Mystery/web/site.css`

## ユーザー要望
- `HoshigauraRailMystery/web/index.html` が修正されていない。
- ほかの謎解きの入口ページもレイアウトをすべて揃える。

## バックアップ
- `C:\Users\kogit\Documents\Codex\backups\entry-layout-unify-20260524`
- 全40件の `web/index.html` と `web/site.css` を退避済み。

## 変更点
- 全40件の `site.css` に `ENTRY_LAYOUT_UNIFY_20260524` を追加。
  - 入口ページの幅、ヘッダー、ヒーロー、カード、ボタン、資料リンク、スマホ1カラム化を共通ルール化。
  - `XXX-0000` などの `case-code` は `white-space: nowrap` で改行しない。
  - スマホ幅でボタン・リンクカードが1列に揃うよう補正。
- 入口ページの背景画像参照切れを修正。
  - `AbyssalObservatoryMystery`: `hero-observatory.png`
  - `GinreiDepartmentMystery`: `hero-department.png`
  - `HaikoKinenMystery`: `school-hero.png`
  - `HoshigauraRailMystery`: `rail-hero.png`
  - `MisakiLighthouseMystery`: `hero-lighthouse.png`
- 余計なHTML差分が出ないよう、実際に必要な5件以外の入口HTMLはバックアップから戻した。

## 検証
- 全40件の入口ページをブラウザでスマホ幅390px確認。
  - 横スクロールなし。
  - `h1` 検出あり。
  - ヒーロー表示あり。
  - 星ヶ浦は `url('./assets/rail-hero.png')` を確認。
- 全入口ページのローカルリンク・ページ内アンカー確認済み。
- 全入口ページの画像参照切れ確認済み。
- `git diff --check` エラーなし。
  - LF/CRLF警告のみ。

## 次にやること
- 入口ページの見た目は共通化済み。
- 次は各謎解きごとの中身強化に戻れる。
- 星ヶ浦鉄道をさらに進めるなら、K-15乗務記録、スタンプ台紙、展示ケースB、雨の北側階段の個別画像追加が候補。
