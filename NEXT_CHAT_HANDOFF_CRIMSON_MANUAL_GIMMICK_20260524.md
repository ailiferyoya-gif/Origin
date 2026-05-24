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

## 2026-05-24 CrimsonClinicMystery 本格確認追記

### 作業状況

- `CrimsonClinicMystery` を謎解き本体確認の最初の対象として確認。
- 変更前バックアップ取得済み:
  - `C:\Users\kogit\Documents\Codex\backups\crimson-clinic-mystery-review-20260524`
- 公式サイト本体はロック方針に従い変更対象から外した。

### 変更点

- `CrimsonClinicMystery/HINTS.md`
  - 24問構成に合わせて、章別・段階別ヒントへ増補。
  - 最終照合に必要な要素を明記。
- `CrimsonClinicMystery/SOLUTION.md`
  - 実際の調査ノート最終照合と同じ詳細な最終解答へ修正。
  - 24問すべての解答表、資料対応、章別の真相進行、想定所要時間を追加。
- `CrimsonClinicMystery_BoothPackage/CrimsonClinicMystery_Booth_v1`
  - 本体側に存在していた医療資料・ギミック調査室・調査ノート・照合ロジック等をBooth用Webにも反映。
  - Booth用に `HINTS.md` と `SOLUTION.md` を追加。
  - 公式サイトトップに出た差分はロック方針に合わせてバックアップから戻した。

### 確認済み

- 本体Web:
  - HTML 61件、ローカル参照237件、リンク切れ0。
  - `site.js` / `story.js` 構文確認済み。
  - 24問の正答判定と最終解答の柔軟判定が通ることを確認。
  - `http://127.0.0.1:4400/web/investigate/index.html` でブラウザ確認済み。
  - PC幅 1280px、スマホ幅 390px で横スクロールなし。
- Booth用Web:
  - HTML 61件、ローカル参照237件、リンク切れ0。
  - `site.js` / `story.js` 構文確認済み。
  - 24問の正答判定と最終解答の柔軟判定が通ることを確認。
  - 4401番でのブラウザ確認は環境側で `net::ERR_BLOCKED_BY_CLIENT` となったため未実施。
- `git diff --check` 問題なし。

### 未完了事項

- Booth用Webの実ブラウザ表示確認。
- コミット、push はこの追記時点では未実施。

### 次にやること

1. 必要ならBooth用同ページを別手段でブラウザ確認。
2. 問題なければコミット、push。
3. 次の作品へ進む前に、同様にバックアップを取る。

## 2026-05-24 CrimsonClinicMystery 入口導線修正追記

### 作業状況

- ユーザー指摘:
  - 入口ページに調査ノートへのリンクがない。
  - 入口の固有ギミック欄は必要か。
  - メールはスタッフログイン先のリンクではないか。
- 変更前バックアップ取得済み:
  - `C:\Users\kogit\Documents\Codex\backups\crimson-entry-flow-fix-20260524`

### 変更点

- `CrimsonClinicMystery/web/index.html`
  - 入口の主ボタンを `調査ノートを開く` に変更し、`./investigate/index.html` へ直通。
  - 添付資料一覧に `調査ノート` カードを追加。
  - 入口直リンクの `メール` を削除。
  - `管理画面` 表記を `スタッフログイン` に変更。
  - プレイヤー向け入口に出ていた `この謎解きの固有ギミック` 欄を削除。
  - 保存メールはスタッフログイン後に確認できる旨を入口の注意文へ反映。
- `CrimsonClinicMystery/web/admin/index.html`
  - 認証後の閲覧制限記録に `保存メール` リンクを追加。
- `CrimsonClinicMystery/web/investigate/index.html`
  - Q3文言を `ログとメール` から `ログと掲示板` に修正。
- `CrimsonClinicMystery/HINTS.md` / `SOLUTION.md`
  - Q3と管理画面導線の説明を入口変更に合わせて修正。
- Booth用フォルダにも同じ変更を反映。

### 確認済み

- 本体/Boothともローカルリンク切れ0。
- 本体/Boothとも24問の回答判定は維持。
- 本体/Boothとも入口に調査ノートリンクあり、入口メール直リンクなし、入口固有ギミック欄なし、スタッフログイン後の保存メールリンクあり。
- `git diff --check` 問題なし。
- ブラウザで `http://127.0.0.1:4400/web/index.html` から `調査ノートを開く` をクリックし、`/web/investigate/index.html` へ遷移することを確認。
- PC幅1280pxで入口横スクロールなし。

### 未完了事項

- この追記時点でコミット、pushは未実施。

## 2026-05-24 CrimsonClinicMystery 依頼起点・公式HP/パスワード導線追記

### 作業状況

- ユーザー指摘:
  - あらすじは「とある人物からの依頼で調査を始める」形にしたい。
  - 資料は公式HPとログイン用パスワードにしたい。
  - そこから内部情報と外部情報の差異を見つける謎解きにしたい。
- 変更前バックアップ取得済み:
  - `C:\Users\kogit\Documents\Codex\backups\crimson-synopsis-expanded-20260524`

### 変更点

- `CrimsonClinicMystery/web/index.html`
  - 入口の前提を `Kからの依頼` に変更。
  - 添付資料を `公式HPのURL` と `ログイン用パスワード HOSP2314` に整理。
  - 公式HPとログイン後の内部情報、地域アーカイブ検索で見つかる外部情報を見比べる謎解きとして説明を再構成。
  - 入口リンクは `調査ノート`、`公式HP`、`地域アーカイブ検索` の3件に整理。
  - 入口から医療資料直リンクを削除。
- `CrimsonClinicMystery/web/admin/index.html`
  - ログイン後の閲覧制限記録に `カルテ差分控え` へのリンクを追加。
  - 医療資料は入口直リンクではなく、内部記録側から辿る形へ変更。
- `CrimsonClinicMystery/web/investigate/index.html`
  - 調査ノート導入を `K` から公式HPとログイン用パスワードを受け取った設定に変更。
  - `外部情報と内部情報の差異` を照合する調査UIとして説明を調整。
- `CrimsonClinicMystery/HINTS.md`
  - 初期資料を `公式HP` と `ログイン用パスワード` として案内。
- Booth用フォルダにも同じ変更を反映。

### 確認済み

- 本体/Boothともローカルリンク切れ0。
- 本体/Boothとも入口リンクは3件。
- 本体/Boothとも入口に `Kからの依頼`、`HOSP2314`、`公式HP`、内外差異の説明あり。
- 本体/Boothとも入口からスタッフログイン/医療資料の直リンクなし。
- 本体/Boothとも管理画面ログイン後に医療資料リンクあり。
- `git diff --check` 問題なし。
- ブラウザで `http://127.0.0.1:4400/web/index.html` を確認。
- PC幅1280px、スマホ幅390pxで横スクロールなし。

### 未完了事項

- この追記時点でコミット、pushは未実施。

## 2026-05-24 CrimsonClinicMystery あらすじ増量追記

### 作業状況

- ユーザー指摘:
  - 入口ページのあらすじをもっと増やして没入感を上げたい。
- 変更前バックアップ取得済み:
  - `C:\Users\kogit\Documents\Codex\backups\crimson-synopsis-expanded-20260524`

### 変更点

- `CrimsonClinicMystery/web/index.html`
  - あらすじを2段落から4段落へ増量。
  - 紅坂診療所の過去、現クリニックへの移転、匿名依頼人から届いた未整理アーカイブ、資料群の内容、`CRN-1006` の位置づけ、調査目的を追加。
  - 単なる事故原因探しではなく、記録整理、公開資料から外されたもの、事故報告書の外側に残った退路を追う体験であることを明確化。
- Booth用フォルダにも同じ変更を反映。

### 確認済み

- 本体/Boothともローカルリンク切れ0。
- 本体/Boothともあらすじ4段落、`CRN-1006` と調査目的の文言あり。
- `git diff --check` 問題なし。
- ブラウザで `http://127.0.0.1:4400/web/index.html` を確認。
- ブラウザ上で増量後のあらすじ本文が読めることを確認。
- PC幅1280px、スマホ幅390pxで横スクロールなし。

### 未完了事項

- この追記時点でコミット、pushは未実施。

## 2026-05-24 CrimsonClinicMystery 入口最小構成リビルド追記

### 作業状況

- ユーザー指摘:
  - スタッフログインは公式HPから飛ぶので入口から削除。
  - その他の項目も作り直し、入口は `あらすじ` `調査の仕方` `リンク` だけにできないか。
- 変更前バックアップ取得済み:
  - `C:\Users\kogit\Documents\Codex\backups\crimson-entry-minimal-rebuild-20260524`

### 変更点

- `CrimsonClinicMystery/web/index.html`
  - 入口ページを全面的に簡素化。
  - 構成を `あらすじ`、`調査の仕方`、`調査リンク` の3ブロックへ整理。
  - 入口からスタッフログインのリンクと文言を削除。
  - 入口リンクは `調査ノート`、`公式HP`、`地域アーカイブ検索`、`医療資料` の4つに整理。
  - 新聞資料、町資料、保存メール、院内記録は各リンク先の導線から辿る説明に変更。
- `CrimsonClinicMystery/web/site.css`
  - 入口最小構成用の `entry-minimal` レイアウトを追加。
  - あらすじ、調査の仕方、リンク枠の横端を1000px幅で揃える。
- Booth用フォルダにも同じ変更を反映。

### 確認済み

- 本体/Boothともローカルリンク切れ0。
- 本体/Boothとも入口リンクは4件。
- 本体/Boothとも入口にスタッフログイン直リンクなし、スタッフログイン文言なし。
- 本体/Boothとも入口に新聞/町資料直リンクなし。
- `git diff --check` 問題なし。
- ブラウザで `http://127.0.0.1:4400/web/index.html` を確認。
- PC幅1280pxで主要枠幅がすべて1000pxに揃うことを確認。
- PC幅1280px、スマホ幅390pxで横スクロールなし。

### 未完了事項

- この追記時点でコミット、pushは未実施。

## 2026-05-24 CrimsonClinicMystery 入口資料名・枠幅修正追記

### 作業状況

- ユーザー指摘:
  - `紅坂診療所 CRN-1006` の入口枠の横端を揃えたい。
  - 新聞資料や町資料は入口直リンクではなく検索画面から辿るべき。
  - `公式資料` は `公式HP` に変更。
  - `検索` はよりふさわしい名前に変更。
- 変更前バックアップ取得済み:
  - `C:\Users\kogit\Documents\Codex\backups\crimson-entry-source-labels-20260524`

### 変更点

- `CrimsonClinicMystery/web/index.html`
  - `公式資料` を `公式HP` に変更。
  - `検索` を `地域アーカイブ検索` に変更。
  - 入口直リンクから `新聞` と `町資料` を削除。
  - 新聞資料・町資料は `地域アーカイブ検索` から辿る旨を入口説明、調査手順、注意文へ反映。
  - 調査の見方も `公式HPと検索で見つかる私的記録` へ文言調整。
- `CrimsonClinicMystery/web/site.css`
  - 入口の主要枠幅を `1000px` に統一。
  - 依頼カード、調査手順、資料カード、あらすじ、調査の見方、注意文の横端が揃うよう調整。
- Booth用フォルダにも同じ変更を反映。

### 確認済み

- 本体/Boothともローカルリンク切れ0。
- 本体/Boothとも入口に `公式HP` と `地域アーカイブ検索` 表記あり。
- 本体/Boothとも入口から `新聞` / `町資料` 直リンクなし。
- `git diff --check` 問題なし。
- ブラウザで `http://127.0.0.1:4400/web/index.html` を確認。
- PC幅1280pxで主要枠幅がすべて1000pxに揃うことを確認。
- PC幅1280px、スマホ幅390pxで横スクロールなし。

### 未完了事項

- この追記時点でコミット、pushは未実施。

## 2026-05-24 CrimsonClinicMystery 入口縦長レイアウト修正追記

### 作業状況

- ユーザー指摘:
  - 入口ページが左右に枠分割され、全体を把握しづらい。
  - 縦長になってもよいので修正したい。
- 変更前バックアップ取得済み:
  - `C:\Users\kogit\Documents\Codex\backups\crimson-entry-vertical-layout-20260524`

### 変更点

- `CrimsonClinicMystery/web/index.html`
  - 入口の左右分割を廃止。
  - `依頼文 -> 調査手順 -> 添付資料 -> あらすじ -> 調査の見方 -> 注意文` の縦読み構成に変更。
  - 旧 `届いた依頼` の横並び枠を削除し、依頼文を上部カードへ統合。
  - 調査手順を `1. 資料を見る / 2. 違和感を控える / 3. ノートで照合` の縦並びに変更。
- `CrimsonClinicMystery/web/site.css`
  - 入口ページ専用に `entry-stack` / `entry-steps` の縦レイアウトを追加。
  - 添付資料カード、あらすじ、調査方針、注意文の最大幅を揃え、PCでも縦に読みやすい幅へ調整。
- Booth用フォルダにも同じ変更を反映。

### 確認済み

- 本体/Boothともローカルリンク切れ0。
- 本体/Boothとも入口は縦型構成へ変更済み。
- 本体/Boothとも入口メール直リンクなし、調査ノートリンクあり。
- `git diff --check` 問題なし。
- ブラウザで `http://127.0.0.1:4400/web/index.html` を確認。
- PC幅1280px、スマホ幅390pxで横スクロールなし。

### 未完了事項

- この追記時点でコミット、pushは未実施。
