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

## 2026-05-24 CrimsonClinicMystery メタ文言削除追記

### 作業状況
- ユーザー指摘:
  - 謎解き内に「矛盾が見える」「情報が薄い」など、本来のページには書かれていないメタい文言がある。
  - 作中ページとして不自然な文言はすべて削除する。
- 変更前バックアップ取得済み:
  - `C:\Users\kogit\Documents\Codex\backups\crimson-meta-wording-cleanup-20260524`

### 変更点
- `CrimsonClinicMystery/web/index.html`
  - `見比べてください`、`外部情報と内部情報`、`単体では`、`噛み合わなくなります` などの外側から見た説明を削除。
  - Kの依頼文を「公開ページと院内保管控えの扱い違いを確認する」内容へ変更。
  - 調査リンクの説明を `CRN-1006の記録確認`、`公開案内と院内入口` へ変更。
- `CrimsonClinicMystery/web/investigate/index.html`
  - `検証協力者`、`作中サイトではなく`、`調査UI`、`プレイヤー`、`解放された` などのメタ文言を削除。
  - 調査ノートを、CRN-1006関連記録の確認ページとして自然な文言に変更。
- `CrimsonClinicMystery/web/admin/index.html`
  - `単独では真相を確定できません`、`矛盾が見えます` を削除。
  - `照合メモ` を `確認メモ` に変更。
- `CrimsonClinicMystery/web/archive/index.html`
  - `照合してください` 系の誘導を、保管棚確認の文言へ変更。
- `CrimsonClinicMystery/web/logs/restricted/index.html`
  - `犯行の確定`、`照合してください` を削除。
  - `照合メモ` を `保管メモ` に変更。
- `CrimsonClinicMystery/web/logs/missing/index.html`
  - `照合メモ` を `保管メモ` に変更。
- `CrimsonClinicMystery/web/contractor/index.html`
  - `院内ログと照合してください` を院内ログ側に控えが残る文言へ変更。
- `CrimsonClinicMystery/web/ledger/index.html`
  - `照合できます`、`照合語` を作中資料寄りの表現へ変更。
- `CrimsonClinicMystery/web/medical/index.html`
  - `照合先` を `関連記録` に変更。
- `CrimsonClinicMystery/web/mail/index.html`
  - `院内スタッフ導線` を `院内スタッフ入口` に変更。
- Booth同梱版 `CrimsonClinicMystery_BoothPackage/CrimsonClinicMystery_Booth_v1/web/...` にも同内容を反映済み。

### 確認済み
- 本体/BoothのHTMLで以下のメタ表現が残っていないことを確認:
  - `メタ`
  - `作中サイト`
  - `プレイヤー`
  - `矛盾が見え`
  - `情報が薄い`
  - `単体では真相`
  - `噛み合`
  - `見比べてください`
  - `解放された`
  - `回答入力`
  - `検証協力者`
  - `スタッフ導線`

### 未完了事項
- この追記時点では、最終のブラウザ確認、`git diff --check`、コミット、pushはこれから実施。

### 最終確認追記
- `rg` で本体/BoothのHTMLに指定系メタ表現が残っていないことを再確認。
- `git diff --check` 問題なし。LF/CRLF警告のみ。
- ブラウザで `http://127.0.0.1:4400/web/index.html` と `http://127.0.0.1:4400/web/investigate/index.html` を確認。
  - 入口ページ、調査ノートとも指定系メタ表現なし。
  - PC幅で横スクロールなし。
- この追記後にコミット、push予定。

### 追加確認追記
- 広めの再検索で残った `ギミック`、`GIMMICK`、`見えます`、`わかる` 系の外側表現も削除。
- `CrimsonClinicMystery/web/gimmick/index.html` は `記録整理控え` として作中資料寄りに改名・文言修正。
- `investigate` 内のギミック案内も `CRN-1006 記録整理控え` に変更。
- `medical` のリンク名を `ギミック調査室` から `記録整理控え` に変更。
- 本体/BoothのHTMLで以下もヒットなしを確認:
  - `ギミック`
  - `GIMMICK`
  - `見えます`
  - `わかる`
  - `分かる`
- ブラウザで入口、調査ノート、記録整理控え、医療資料を確認し、指定系メタ表現なし・PC幅横スクロールなし。

## 2026-05-24 CrimsonClinicMystery 管理画面レイアウト・視認性修正追記

### 作業状況
- ユーザー指摘:
  - `閲覧制限記録` の `安全管理` は公式HPにあるため、adminの一覧には不要。
  - `保存メール` 以外は `admin/index.html` とレイアウトを統一したい。
  - 文字色と背景色が近く、見づらい文字がある。
- 変更前バックアップ取得済み:
  - `C:\Users\kogit\Documents\Codex\backups\crimson-admin-layout-visibility-20260524`

### 変更点
- `CrimsonClinicMystery/web/admin/index.html`
  - 閲覧制限記録から `安全管理 / 紅坂診療所 制限記録` リンクを削除。
  - 説明文を、保存メール、カルテ差分控え、薬剤棚ログ、夜間保守記録の閲覧に合わせて調整。
  - 確認メモ内の表現を作中記録寄りに微修正。
- `CrimsonClinicMystery/web/medical/index.html`
  - `case-entry` 系から `clinic-admin` / `admin-console` / `admin-vault` 系レイアウトへ変更。
  - 管理画面内の内部資料として見えるよう、カード・表・ナビを管理画面調に統一。
- `CrimsonClinicMystery/web/logs/restricted/index.html`
  - `record-vault` 系から管理画面レイアウトへ変更。
  - 管理画面へ戻るリンク、酸素バルブログ、夜間保守記録へのリンクを整理。
- `CrimsonClinicMystery/web/contractor/night/index.html`
  - `contractor` 系から管理画面レイアウトへ変更。
  - 管理画面へ戻るリンク、薬剤棚ログ、請求書へのリンクを整理。
- `CrimsonClinicMystery/web/site.css`
  - `clinic-admin .box`、表、記録カード、ログ表、管理画面ナビの配色を追加調整。
  - 白背景に淡色文字が乗っていた低コントラスト状態を修正。
- Booth同梱版 `CrimsonClinicMystery_BoothPackage/CrimsonClinicMystery_Booth_v1/web/...` にも同内容を反映済み。

### 確認済み
- admin本体/Booth版で `official/restricted` への安全管理リンクなし。
- ブラウザで以下を確認:
  - `http://127.0.0.1:4400/web/admin/index.html`
  - `http://127.0.0.1:4400/web/medical/index.html`
  - `http://127.0.0.1:4400/web/logs/restricted/index.html`
  - `http://127.0.0.1:4400/web/contractor/night/index.html`
- 対象ページすべて `clinic-admin` / `admin-console` / `admin-vault` 構成。
- `.box` の色は `rgba(6, 14, 22, 0.72)` 背景、`rgb(232, 241, 247)` 文字で視認性改善。
- PC幅で横スクロールなし。
- `git diff --check` 問題なし。LF/CRLF警告のみ。
