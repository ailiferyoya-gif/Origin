# 引継ぎ 2026-05-24 CrimsonClinicMystery 手作業ギミック強化

## 今回の作業

- ユーザー要望「1個ずつスクリプトを使用せず実施」に従い、`CrimsonClinicMystery` を手作業で強化。
- 一括スクリプトは使用せず、対象ファイルを個別に確認して `apply_patch` で編集。

## 変更内容

- `CrimsonClinicMystery/web/medical/index.html`
  - 単なる補助資料ページから、実際に読む資料ページへ変更。
  - 追加内容:
    - カルテ差分表
    - 処方コード対照
    - 未改竄欄メモ
    - 薬剤棚ログ、院内配置図への導線
- `CrimsonClinicMystery/web/gimmick/index.html`
  - 汎用説明をやめ、紅坂診療所専用の解き方に変更。
  - 改訂前後の欄、処方コード、未改竄欄を使う流れに修正。
- `CrimsonClinicMystery/web/investigate/index.html`
  - Q6, Q17, Q20, Q22, Q24を医療資料ギミックと接続。
  - ギミック確認パネルに医療資料へのリンクを追加。
- `CrimsonClinicMystery/web/site.js`
  - Q6, Q17, Q20, Q22, Q24の不正解時ヒントを具体化。
- `CrimsonClinicMystery/web/index.html`
  - 入口の添付資料に「医療資料」を追加。

## 確認済み

- バックアップ:
  - `C:\Users\kogit\Documents\Codex\backups\CrimsonClinicMystery-manual-20260524`
- 静的リンク検査:
  - 実リンク切れなし
  - `./index.html#packet` は同一ページアンカーのため問題なし
- `git diff --check`: 問題なし
- ブラウザ確認:
  - `http://127.0.0.1:4400/web/medical/index.html`
  - `http://127.0.0.1:4400/web/investigate/index.html`
  - 横スクロールなし
  - 医療資料ページにカルテ差分表、処方コード対照、未改竄欄メモあり
  - 調査ノートに医療資料リンクあり

## 次にやること

1. 次は `HakurouMuseumMystery` を手作業で強化する。
2. 展示番号、館内導線、キャプション改訂履歴を実際の問題文と資料ページに接続する。
3. 作業前に同様にバックアップを取る。
