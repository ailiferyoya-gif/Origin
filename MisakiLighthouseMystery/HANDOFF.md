# 引継ぎメモ: 潮見岬灯台資料館 消灯記録

## 現状

- 新規プロジェクト `C:\Users\kogit\Documents\Codex\MisakiLighthouseMystery` を作成。
- Booth用フォルダ版:
  `C:\Users\kogit\Documents\Codex\MisakiLighthouseMystery_BoothPackage\MisakiLighthouseMystery_Booth_v1`
- 作業前バックアップ相当のマーカー:
  `C:\Users\kogit\Documents\Codex\_backups\MisakiLighthouseMystery_pre_20260517_194111`
- テーマ: 閉館した灯台資料館、成人研究者の記録改ざん、霧笛室、無線記録、役場処理。
- 被害者は成人の郷土史研究者・綾瀬誠。子供を被害者にしていない。
- 6サイト以上:
  資料館、町役場、新聞、気象台、地域FM、ブログ、留言板。
- 資料照合ノートは18問構成。
- 画像4点はChatGPTで新規生成し `web/assets` に配置。
- 現在の規模:
  HTML 20ページ。
  PNG 4点。
- ローカル確認URL:
  `http://127.0.0.1:4382/web/`
- 確認済み:
  制作元・Booth用フォルダともローカル `href/src` リンク切れなし。
  フォルダリンク形式の `href` と `href="#"` 残りなし。
  主要9ページHTTP 200。

## 主要回答

綾瀬誠 / 2009年10月12日 / 23:17 / 霧笛室 / KIRI-1012 / 白灯日誌 / 第三倉庫 / 港湾気象台 / 南西8m / 無線記録C / 小野寺圭 / 黒い防水ケース / 0:42 / 退職扱い / 2009/10/13 / 潮見岬灯台資料館 / 予備鍵 / 小野寺圭が綾瀬誠を霧笛室に閉じ込めた

## 次にやるとよいこと

- さらに難易度を上げるなら、役場のPDF風資料、港湾組合サイト、古い携帯ページを追加。
- Booth用フォルダ化やZIP化は未実施。
- ブラウザで最終表示確認と18問通過確認を行う。

## 直近追加作業 2026-05-17 20:10以降

- 「ページを豪華にする」ルールへの対応として、メインページと資料照合ノートをプレミアムUIへ作り直し。
- 作業前バックアップ:
  `C:\Users\kogit\Documents\Codex\_backups\MisakiLighthouseMystery_luxury_pre_20260517_201002`
- Boothパッケージ作業前バックアップ:
  `C:\Users\kogit\Documents\Codex\_backups\MisakiLighthouseMystery_BoothPackage_luxury_pre_20260517_201002`
- `web/index.html`:
  大型ヒーロー、証拠ストリップ、CASE FILE、7サイト巡回カード、遊び方パネルを追加。
- `web/investigate/index.html`:
  資料室画像を使ったヒーロー、豪華な導入パネル、18問カードUIへ変更。
- `web/site.css`:
  プレミアム用レイアウト、色、影、レスポンシブを追加。
- Booth用フォルダへ反映済み。
- 確認済み:
  制作元・Booth用フォルダともローカル `href/src` リンク切れなし。
  フォルダリンク形式の `href` と `href="#"` 残りなし。
  HTTP 200: メイン、資料照合ノート、資料館。

## 直近追加作業 2026-05-17 20:16以降

- ユーザー要望「HaikoKinenMysteryのメインページのような作り」に対応。
- 作業前バックアップ:
  `C:\Users\kogit\Documents\Codex\_backups\MisakiLighthouseMystery_haiko_main_style_pre_20260517_201652`
- Boothパッケージ作業前バックアップ:
  `C:\Users\kogit\Documents\Codex\_backups\MisakiLighthouseMystery_BoothPackage_haiko_main_style_pre_20260517_201652`
- `web/index.html` を HaikoKinenMystery のメインページと同型に変更。
  固定ヘッダー、大型ヒーロー、右下の調査対象パネル、2カラムのBACKGROUND/ROUTES/HOW TO PLAY構成。
- `web/haiko-main.css` を追加し、入口ページだけHaiko系プレミアムデザインへ上書き。
- Booth用フォルダへ反映済み。
- 確認済み:
  制作元・Booth用フォルダともローカル `href/src` リンク切れなし。
  フォルダリンク形式の `href` と `href="#"` 残りなし。
  HTTP 200: `web/index.html`, `web/haiko-main.css`。

## 直近追加作業 2026-05-17 20:25以降

- ユーザー要望「サイトによって作りを変える」「照合ノートはメインページと作りをそろえる」に対応。
- 作業前バックアップ:
  `C:\Users\kogit\Documents\Codex\_backups\MisakiLighthouseMystery_site_variety_note_style_pre_20260517_202519`
- Boothパッケージ作業前バックアップ:
  `C:\Users\kogit\Documents\Codex\_backups\MisakiLighthouseMystery_BoothPackage_site_variety_note_style_pre_20260517_202519`
- 共通仕様 `C:\Users\kogit\Documents\Codex\MYSTERY_SITE_SPEC.md` に以下を追記。
  作中サイトは種類ごとにデザインを変える。
  同じ組織内の下層ページは統一してよいが、別組織・別媒体を同じ見た目にしない。
  資料照合ノートは作中サイト風にせず、総合入口と同系統の豪華なプレイヤー用UIにする。
- `web/investigate/index.html` を `lux-home` 系の入口と同じ作りへ変更。
- `web/haiko-main.css` に照合ノート用の `lux-note` スタイルを追加。
- `web/site-variants.css` を追加し、資料館、役場、気象台、無線局で見た目が分かれるように調整。
- Booth用フォルダへ反映済み。
- 確認済み:
  制作元・Booth用フォルダともローカル `href/src` リンク切れなし。
  フォルダリンク形式の `href`、`href="#"`、空hrefなし。
  HTTP 200: メイン、照合ノート、役場、気象台、無線局、`site-variants.css`。

## 直近追加作業 2026-05-17 20:57以降

- ユーザー指摘「30分ほどで終わる。リンクが初めからすべてそろっている」に対応。
- 作業前バックアップ:
  `C:\Users\kogit\Documents\Codex\_backups\MisakiLighthouseMystery_discovery_gates_pre_20260517_205741`
- Boothパッケージ作業前バックアップ:
  `C:\Users\kogit\Documents\Codex\_backups\MisakiLighthouseMystery_BoothPackage_discovery_gates_pre_20260517_205741`
- 入口と照合ノートから、資料館・役場・気象台・無線局などへの直リンクを削減。
- 最初に使える導線を以下へ変更。
  `web/search/index.html`: 調査検索。検索語で作中サイトを発見する。
  `web/mail/index.html`: 閉館事業メール控え。検索語と管理画面合言葉のヒント。
  `web/admin/index.html`: 管理画面。合言葉 `SHIO2317` で閲覧制限記録を表示。
- `web/site-variants.css` に検索、メール、管理画面用の見た目を追加。
- 共通仕様 `MYSTERY_SITE_SPEC.md` に「中級以上では全作中サイトへの直リンクを最初から並べない」「ページ到達を謎の一部にする」ルールを追記。
- 現在の規模:
  HTML 23ページ。
  CSS 3点。
  PNG 4点。
- Booth用フォルダへ反映済み。
- 確認済み:
  制作元・Booth用フォルダともローカル `href/src` リンク切れなし。
  フォルダリンク形式の `href`、`href="#"`、空hrefなし。
  HTTP 200: メイン、調査検索、メール控え、管理画面、照合ノート。

## 直近追加作業 2026-05-17 21:09以降

- ユーザー要望「メールや検索画面は1単語」「検索画面はYahooやGoogleのような検索画面レイアウト」に対応。
- 作業前バックアップ:
  `C:\Users\kogit\Documents\Codex\_backups\MisakiLighthouseMystery_search_mail_word_pre_20260517_210956`
- Boothパッケージ作業前バックアップ:
  `C:\Users\kogit\Documents\Codex\_backups\MisakiLighthouseMystery_BoothPackage_search_mail_word_pre_20260517_210956`
- 入口、照合ノート、README、BOOTH_READMEの表記を `検索` / `メール` に短縮。
- `web/search/index.html` を検索エンジン風レイアウトへ作り替え。
  大きなロゴ、中央検索窓、検索例ボタン、検索結果リストの構成。
- `web/mail/index.html` の見出しを `メール` に変更。
- `web/site-variants.css` に検索エンジン風スタイルを追加。
- Booth用フォルダへ反映済み。
- 確認済み:
  制作元・Booth用フォルダともローカル `href/src` リンク切れなし。
  フォルダリンク形式の `href`、`href="#"`、空hrefなし。
  HTTP 200: メイン、検索、メール。

## 直近追加作業 2026-05-17 21:55以降

- ユーザー要望「サイトごとのレイアウトはそれぞれ独立」「サイトから別サイトへのリンクは基本なし」「検索結果をもっと増やしてカモフラージュ」に対応。
- 作業前バックアップ:
  `C:\Users\kogit\Documents\Codex\_backups\MisakiLighthouseMystery_isolated_sites_search_noise_pre_20260517_215521`
- Boothパッケージ作業前バックアップ:
  `C:\Users\kogit\Documents\Codex\_backups\MisakiLighthouseMystery_BoothPackage_isolated_sites_search_noise_pre_20260517_215521`
- 資料館、役場、気象台、無線局、ブログ、留言板から、別サイトへの直接リンクを削除。
- 同一サイト内の下層リンクは維持。
- 検索結果データに観光パンフ、灯台まつり、欠航情報、寄贈品、時報ログ、棚卸しなどのノイズ結果を追加。
- 検索結果表示件数を最大12件に増加。
- 共通仕様 `MYSTERY_SITE_SPEC.md` に、作中サイトから別作中サイトへのリンクは基本的に置かず、検索・メール・管理画面を経由させるルールを追記。
- Booth用フォルダへ反映済み。
- 確認済み:
  制作元・Booth用フォルダともローカル `href/src` リンク切れなし。
  フォルダリンク形式の `href`、`href="#"`、空hrefなし。
  資料館、役場、気象台、無線局、ブログ、留言板から別作中サイトへの直接リンクなし。
  HTTP 200: 検索、資料館、役場、気象台、無線局、ブログ、留言板。
