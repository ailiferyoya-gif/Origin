# 引継ぎ 2026-05-24 HakurouMuseumMystery 手作業ギミック強化

## 今回の作業

- ユーザー要望「ほかの謎解きも1つずつ作業し内容を濃く厚く」に対応。
- `CrimsonClinicMystery` に続き、`HakurouMuseumMystery` を手作業で強化。
- 一括スクリプトは使わず、個別ファイルを読んで `apply_patch` で編集。

## 変更内容

- `HakurouMuseumMystery/web/collection/index.html`
  - 汎用補助ページから、実際に読む「収蔵導線資料」へ変更。
  - 追加内容:
    - 展示室導線メモ
    - キャプション改訂履歴
    - 説明文入れ替わりメモ
    - 夜間警備ログ、監査メモ、写真台帳メモへの導線
- `HakurouMuseumMystery/web/gimmick/index.html`
  - 汎用説明をやめ、白楼資料館専用の解き方に変更。
  - 第2展示室、収蔵庫B列、B-17、展示ラベルを導線として読む構成へ修正。
- `HakurouMuseumMystery/web/investigate/index.html`
  - Q6, Q8, Q9, Q10, Q11, Q14, Q19, Q20を収蔵導線・キャプション改訂履歴に接続。
  - ギミック確認パネルに「収蔵導線資料」へのリンクを追加。
- `HakurouMuseumMystery/web/site.js`
  - 該当問題の不正解時ヒントを具体化。
- `HakurouMuseumMystery/web/index.html`
  - 入口の添付資料に「収蔵導線資料」を追加。

## 確認済み

- バックアップ:
  - `C:\Users\kogit\Documents\Codex\backups\HakurouMuseumMystery-manual-20260524`
- 静的リンク検査:
  - 実リンク切れなし
- `git diff --check`: 問題なし
- ブラウザ確認:
  - `http://127.0.0.1:4408/web/collection/index.html`
  - `http://127.0.0.1:4408/web/investigate/index.html`
  - 横スクロールなし
  - 収蔵導線資料に展示室導線メモ、キャプション改訂履歴、説明文入れ替わりメモあり
  - 調査ノートに収蔵導線資料リンクあり

## 次にやること

1. 次は `HoshigauraRailMystery` を手作業で強化する。
2. 時刻表、ホーム番号、乗れなかった列車によるアリバイ崩しを問題本文と資料ページに接続する。
3. 作業前に同様にバックアップを取る。
