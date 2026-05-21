# 引継ぎメモ

## 概要

`HaikoKinenMystery` として、廃校記念サイト風のWeb横断型モキュメンタリー謎解きを制作。
直近修正で、2から3時間プレイ想定に拡張。
サイト全体を2000年代の学校・自治体サイト、古い掲示板、ガラケー時代の簡易ページ風に寄せ、没入用バックグラウンドと遊び方をトップに追加した。

## 画像

ChatGPT生成画像を使用:

- `web/assets/school-hero.png`
- `web/assets/classroom.png`
- `web/assets/library.png`
- `web/assets/gym-ceremony.png`

スプライトシートは未使用。

## 謎構成

表向きは南谷小学校の閉校記念アーカイブ。
アルバム、図書室貸出記録、PTA記録、学校だより、式典展示、留言板を照合すると、写真から消えた児童・相沢澪の真相に到達する。

答え:

- 第1問: 相沢澪
- 第2問: 28
- 第3問: 27 / H18_6-1_27names.jpg
- 第4問: 2006年7月14日
- 第5問: C-0714
- 第6問: 雨量観測ノート
- 第7問: 旧体育館修繕写真
- 第8問: 旧体育館東階段
- 第9問: 橘修司
- 第10問: 鳴瀬建設
- 第11問: 黄色い傘
- 第12問: 19:20
- 第13問: 転出済
- 第14問: 2006/07/15
- 第15問: 橘修司が相沢澪を旧体育館東階段から突き落とした

## 作業前バックアップ

- `C:\Users\kogit\Documents\Codex\_backups\HaikoKinenMystery_precreate_20260516_235948`
- `C:\Users\kogit\Documents\Codex\_backups\HaikoKinenMystery_2000s_expansion_pre_20260517_103955`
- `C:\Users\kogit\Documents\Codex\_backups\HaikoKinenMystery_external_sites_pre_20260517_105858`
- `C:\Users\kogit\Documents\Codex\_backups\HaikoKinenMystery_mobile_blog_password_pre_20260517_113817`
- `C:\Users\kogit\Documents\Codex\_backups\HaikoKinenMystery_more_pages_html_blog_pre_20260517_114804`

## 直近変更点

- `web/index.html`: 豪華なゲーム説明・導入ページへ変更。没入用バックグラウンド、想定時間、遊び方、確認順、巡回サイト一覧を追加。
- `web/school/index.html`: 2000年代学校サイト風トップとして分離。学校サイト側から外部ニュース、卒業生ブログ、携帯ページへリンク。
- `web/news/index.html`: 地方ニュース風の外部サイトを追加。大雨、旧体育館東階段、鳴瀬建設、閉校式典、留言板問い合わせの情報を掲載。
- `web/blog/index.html`: 卒業生ブログ風の外部サイトを追加。黄色い傘、相沢澪、7月15日の学校だより配布日への違和感を掲載。
- `web/mobile/index.html`: 当時ガラケー向けに作成された風の連絡網サイトを追加。7/14から7/15の短文連絡とC-0714メモを掲載。
- `web/album/index.html`: 平成18年度6年1組の名簿登録数28、写真ファイル27人、朱書きメモを追加。
- `web/library/index.html`: 未返却資料、展示ケースC、C-0714の保管箱情報を追加。
- `web/history/index.html`: 2006/07/14と2006/07/15の安全点検・名簿修正メモを追加。
- `web/pta/index.html`: 19:20の帰宅確認、橘修司、鳴瀬建設、旧体育館東階段の工事台帳を追加。
- `web/newsletter/index.html`: 平成18年9月号の不自然な配布日2006/07/15を追加。
- `web/board/index.html`: 古い掲示板風レイアウトへ変更し、黄色い傘、C-0714、相沢澪に関する投稿を追加。
- `web/ceremony/index.html`: 展示ケースCとC-0714の式典展示メモを追加。
- `web/investigate/index.html`: 15問構成へ拡張。未解放カードの詳細非表示を追加。
- `web/site.js`: 15問の回答判定に更新。
- `web/textflow.js`: 日本語の自然な改行候補を追加。
- `web/site.css`: 2000年代サイト風、古い掲示板風、ロック式照合カードのスタイルを追加。
- `web/site.css`: 豪華トップ、ニュース風、ブログ風、ガラケー風サイトのスタイルを追加。

## 直近追加作業 2026-05-17 11:xx

- 作業前バックアップ:
  `C:\Users\kogit\Documents\Codex\_backups\HaikoKinenMystery_mobile_blog_password_pre_20260517_113817`
- `web/blog/index.html` のレイアウト崩れを修正。
  記事群を `.blog-posts` にまとめ、記事は縦並び、サイドバーだけ右側に出る構成へ変更。
- `web/blog/index.html` にパスワード付き記事「夏休み前のメモ」を追加。
  パスワードは `C0714`。解除後、相沢澪の転校扱いと学校だより配布日の違和感が読める。
- `web/mobile/index.html` を、当時の子どもたちが作ったガラケー向けページ風に変更。
  デコ文字、らくがき、意味の薄い日記、隠しリンク、パスワードヒントを追加。
- `web/mobile/index.html` の隠しリンクは `../blog/#secret-diary` へ接続。
- `web/site.css` にブログ縦並び、パスワード記事、デコ携帯ページ、隠しリンク用スタイルを追加。

## 直近追加作業 2026-05-17 11:48以降

- 作業前バックアップ:
  `C:\Users\kogit\Documents\Codex\_backups\HaikoKinenMystery_more_pages_html_blog_pre_20260517_114804`
- `web/blog/index.html` を、2006年当時の個人ブログらしい素朴なHTML表現へ変更。
  `<center>`, `<table>`, `<font>`, `bgcolor`, `border` などを使い、きれいすぎる現代的カードレイアウトを避けた。
- `web/blog/index.html` に、2006/07/08、07/11、07/13、07/16などの日常記事を追加。
  旧体育館東階段、学校だより下書き、修繕写真、連絡網の違和感を薄く混ぜた。
- `web/mobile/index.html` に、7/10から7/14までの短文ログ、キリ番、メール件名メモなどを追加。
- `web/news/index.html` に、2006/07/16、2006/09/02、2008/03/24、2026/04/19の記事を追加。
- サイドメニューの `href="#"` を廃止し、以下のリンク先ページを新規作成。
  `web/album/h16/`, `web/album/h17/`, `web/album/h18/`, `web/album/h19/`,
  `web/library/cards/`, `web/library/local/`, `web/library/case-c/`, `web/library/mobile-log/`,
  `web/newsletter/200607/`, `web/newsletter/200609/`, `web/newsletter/200704/`,
  `web/pta/2006/`, `web/pta/2007/`, `web/pta/2008/`,
  `web/board/memories/`, `web/board/search/`, `web/board/materials/`, `web/board/h18/`。
- 現在のHTMLページ数は31ページ。

## 直近追加作業 2026-05-17 12:20以降

- 作業前バックアップ:
  `C:\Users\kogit\Documents\Codex\_backups\HaikoKinenMystery_booth_mobile_html_pre_20260517_122013`
- `web/mobile/index.html` をCSS不使用の単体HTMLへ変更。
  `link rel="stylesheet"`、class指定、外部CSS依存、`textflow.js` 読み込みを外した。
- 携帯ページは `body bgcolor`、`table`、`font`、`center`、`marquee`、HTML属性中心で2006年頃の児童作成ガラケーサイト風に再構成。
- `BOOTH_README.md` を追加。購入者向けの始め方、内容物、注意事項、ローカルサーバー起動方法を記載。
- Booth販売用フォルダを `C:\Users\kogit\Documents\Codex\HaikoKinenMystery_BoothPackage\HaikoKinenMystery_Booth_v1` に作成済み。
  同梱物は `web/`, `BOOTH_README.md`, `server.mjs`。制作READMEや引継ぎメモなどのネタバレ資料は同梱していない。
  ZIP圧縮はまだ行っていない。

## 直近追加作業 2026-05-17 12:46以降

- 作業前バックアップ:
  `C:\Users\kogit\Documents\Codex\_backups\HaikoKinenMystery_single_main_explicit_links_pre_20260517_124634`
- Boothパッケージ作業前バックアップ:
  `C:\Users\kogit\Documents\Codex\_backups\HaikoKinenMystery_BoothPackage_single_main_explicit_links_pre_20260517_124634`
- 総合入口は豪華トップ `web/index.html` の1種類に整理。
- `web/school/index.html` は、ゲーム説明ページではなく2000年代風の「閉校記念資料室」として文面を変更。
  遊び方、想定時間、依頼背景などの導入要素は豪華トップ側に集約。
- 制作元とBooth用フォルダの全HTMLで、`../album/` や `./school/` のようなフォルダリンクを `../album/index.html` 形式へ変更。
  `file:///` で開いたときにフォルダ選択画面へ行かず、リンク先ページへ直接飛ぶための修正。

## 確認済み

- 旧版: `http://127.0.0.1:4381/web/` でトップ、アルバム、図書室、調査ノートの表示を確認。
- 旧版: 調査ノートで4段階の真相表示まで確認。
- 直近修正後: `http://127.0.0.1:4382/web/` でトップ、調査ノートの表示を確認。
- 直近修正後: 主要9ページでHTTP 200確認。
- 直近修正後: 調査ノート15問の全通過、真相表示、コンソールエラーなしを確認。
- 外部サイト追加後: `http://127.0.0.1:4383/web/` で豪華トップ、`/web/school/` で2000年代学校サイト、`/web/mobile/` でガラケー風サイトの表示を確認。
- 外部サイト追加後: 主要13ページでHTTP 200確認。
- 外部サイト追加後: 調査ノート15問の全通過、真相表示、コンソールエラーなしを確認。
- 外部サイト追加後: ローカル `href/src` リンク先存在確認済み。
- ブログ/携帯ページ修正後: `http://127.0.0.1:4384/web/blog/index.html` でブログ縦並びとパスワード解除を確認。
- ブログ/携帯ページ修正後: `http://127.0.0.1:4384/web/mobile/index.html` でデコ携帯ページと隠しリンクを確認。
- ブログ/携帯ページ修正後: 調査ノート15問の全通過、真相表示、コンソールエラーなしを確認。
- ブログ/携帯ページ修正後: ローカル `href/src` リンク先存在確認済み。
- 追加ページ作成後: ローカル `href/src` リンク先存在確認済み。
- 追加ページ作成後: `href="#"` 残りなし。
- 追加ページ作成後: 主要11ページでHTTP 200確認。
- 追加ページ作成後: ブラウザでブログの素朴HTMLレイアウト、パスワード `C0714` 解除、携帯ページ、展示ケースCページを確認。
- 追加ページ作成後: 調査ノート15問の全通過、真相表示、コンソールエラーなしを確認。
- Booth用フォルダ作成後: パッケージ側のローカル `href/src` リンク先存在確認済み。
- Booth用フォルダ作成後: `web/mobile/index.html` に `stylesheet`, `class`, `style`, `textflow.js` 依存がないことを確認。
- Booth用フォルダ作成後: `file:///` のブラウザ自動表示確認はBrowser Useの安全ポリシーでブロックされたため未実施。
- 単一メイン化後: 制作元・Booth用フォルダともローカル `href/src` リンク先存在確認済み。
- 単一メイン化後: 制作元・Booth用フォルダともフォルダリンク形式の `href` 残りなし。

## 直近追加作業 2026-05-17 13:16以降

- 作業前バックアップ:
  `C:\Users\kogit\Documents\Codex\_backups\HaikoKinenMystery_meta_site_boundary_pre_20260517_131608`
- Boothパッケージ作業前バックアップ:
  `C:\Users\kogit\Documents\Codex\_backups\HaikoKinenMystery_BoothPackage_meta_site_boundary_pre_20260517_131608`
- `web/investigate/index.html` を豪華トップと同系統のレイアウトへ変更。
  調査ノートは作中サイトではなく、プレイヤー用の資料照合UIとして明記。
- `web/index.html` と `web/investigate/index.html` から作中サイトへ出るリンクに `target="_blank" rel="noopener"` を付与。
  メイン/照合ノートを残したまま別ウィンドウ・別タブで調査する想定に変更。
- 学校サイト、アルバム、図書室、PTA、学校だより、留言板などの作中サイトから、総合入口・調査ノート・調査入口リンクを削除。
- `web/news/index.html` は新聞記事らしく、ページ内リンクを撤去。キーワード欄もリンクではなく紙面索引のテキストへ変更。
- `web/mobile/index.html` の上部から調査入口・照合リンクを削除。
  内緒リンクは見える文字ではなく、背景色と同色の小さな記号リンクに変更。
- 今後の別作品でも使う共通仕様として、`C:\Users\kogit\Documents\Codex\MYSTERY_SITE_SPEC.md` を作成。
- 修正後、Booth用フォルダへ `web/` 一式を反映済み。
- 確認済み:
  制作元・Booth用フォルダともローカル `href/src` リンク先存在確認済み。
  制作元・Booth用フォルダともフォルダリンク形式の `href` と `href="#"` 残りなし。
  制作元・Booth用フォルダとも作中サイト側に `調査ノート`、`調査入口`、`総合入口` リンク残りなし。
  新聞ページにアンカーリンクなし。
  携帯ページに `stylesheet`, `class`, `style`, `textflow.js` 依存なし。
  照合ノート15問の全通過、真相表示、コンソールエラーなしを確認。

## 直近追加作業 2026-05-17 13:34以降

- 作業前バックアップ:
  `C:\Users\kogit\Documents\Codex\_backups\HaikoKinenMystery_investigate_intro_overlap_pre_20260517_133454`
- Boothパッケージ作業前バックアップ:
  `C:\Users\kogit\Documents\Codex\_backups\HaikoKinenMystery_BoothPackage_investigate_intro_overlap_pre_20260517_133454`
- `web/investigate/index.html` 冒頭の `INVESTIGATION NOTE / 資料照合ノート` と説明文が重なる問題を修正。
- `web/site.css` の `.lux-note-intro` を、見出しカラムと本文カラムが押し合わない `minmax(0, ...)` グリッドに変更。
- `資料照合ノート` 見出しのサイズを少し抑え、必要時に折り返せるよう `overflow-wrap:anywhere` を追加。
- 960px以下では冒頭セクションを縦積みにし、固定ヘッダー下の余白も調整。
- Booth用フォルダへ `web/site.css` を反映済み。
- ブラウザで `http://127.0.0.1:4381/web/investigate/index.html` を開き、冒頭セクション存在とコンソールエラーなしを確認。

## 直近追加作業 2026-05-17 13:39以降

- 作業前バックアップ:
  `C:\Users\kogit\Documents\Codex\_backups\HaikoKinenMystery_investigate_heading_wrap_pre_20260517_133900`
- Boothパッケージ作業前バックアップ:
  `C:\Users\kogit\Documents\Codex\_backups\HaikoKinenMystery_BoothPackage_investigate_heading_wrap_pre_20260517_133900`
- `web/investigate/index.html` の見出しを `<h1 data-no-textflow><span>資料照合</span><span>ノート</span></h1>` に変更。
  `ノート` の途中で `ノー / ト` と割れないよう、改行可能位置を語の区切りだけにした。
- `.lux-note-intro h1` から `overflow-wrap:anywhere` を外し、`word-break:keep-all` と `overflow-wrap:normal` に変更。
- `.lux-note-intro h1 span` に `display:inline-block; white-space:nowrap` を追加。
- Booth用フォルダへ `web/investigate/index.html` と `web/site.css` を反映済み。
- ブラウザで見出しが2つの塊として存在すること、表示テキストが `資料照合ノート` であること、コンソールエラーなしを確認。

## 直近追加作業 2026-05-17 14:06以降

- 作業前バックアップ:
  `C:\Users\kogit\Documents\Codex\_backups\HaikoKinenMystery_mobile_secret_pages_pre_20260517_140638`
- Boothパッケージ作業前バックアップ:
  `C:\Users\kogit\Documents\Codex\_backups\HaikoKinenMystery_BoothPackage_mobile_secret_pages_pre_20260517_140638`
- ガラケー風ページを増量。
  `web/mobile/memo/index.html`: 連絡ログ。
  `web/mobile/bbs/index.html`: 6-1ミニ掲示板。
  `web/mobile/rank/index.html`: キリ番ランキング。
  `web/mobile/secret/index.html`: 通常メニューに出ない秘密ページ。
- `web/mobile/index.html` の通常メニューからは `memo`, `bbs`, `rank` のみへリンク。
- 隠しリンクの行き先を、メインから直接開ける卒業生ブログではなく、通常メニュー非掲載の `web/mobile/secret/index.html` へ変更。
- `web/mobile/secret/index.html` に、ブログ鍵付き記事へ進む導線と合言葉 `C0714` の根拠を配置。
- 共通仕様 `C:\Users\kogit\Documents\Codex\MYSTERY_SITE_SPEC.md` に「隠しリンクは通常導線から直接開けるページへ直結させない」ルールを追記。
- Booth用フォルダへ `web/` と `BOOTH_README.md` を反映済み。
- 確認済み:
  制作元・Booth用フォルダともローカル `href/src` リンク先存在確認済み。
  ガラケー配下全HTMLに `stylesheet`, `class`, `style`, `script` 依存なし。
  メイン、携帯通常ページ、通常サブページには `mobile/secret` の露出なし。携帯トップの背景同色ドットのみが秘密ページへリンク。
  HTTP 200: `/mobile/index.html`, `/mobile/memo/index.html`, `/mobile/bbs/index.html`, `/mobile/rank/index.html`, `/mobile/secret/index.html`。

## 直近追加作業 2026-05-17 18:11以降

- 作業前バックアップ:
  `C:\Users\kogit\Documents\Codex\_backups\HaikoKinenMystery_difficulty_raise_pre_20260517_181110`
- Boothパッケージ作業前バックアップ:
  `C:\Users\kogit\Documents\Codex\_backups\HaikoKinenMystery_BoothPackage_difficulty_raise_pre_20260517_181110`
- 15分程度で解けてしまう問題への難易度調整を実施。
- `web/index.html` の調査対象欄から `C-0714 / 27names / 19:20` のような直答に近い語を削除。
- `web/index.html` の巡回説明から、具体的すぎる持ち物名を削除。
- `web/investigate/index.html` の各ステージヒントを、答えそのものや具体資料名を直接示さない表現へ変更。
  例: `H18_6-1_27names.jpg + 名簿28人` のようなほぼ答えの照合式を廃止し、保存名・登録数・資料状態を照合する説明に変更。
- `web/mobile/secret/index.html` から `C-0714`, `C0714`, 具体的な持ち物名を削除。
  図書室目録と式典展示を見比べて箱番号を求め、記号を抜く必要がある形に変更。
- `web/news/index.html` の紙面索引から `C-0714`, `19:20`, `C0714`, `黄色い傘`, `27names` などの直答に近い語を削除。
- `web/mobile/memo/index.html`, `web/mobile/bbs/index.html`, `web/mobile/rank/index.html` の直接的すぎる文言を少しぼかした。
- Booth用フォルダへ `web/` 一式を反映済み。
- 確認済み:
  制作元・Booth用フォルダともローカル `href/src` リンク先存在確認済み。
  調査ノート15問の全通過、真相表示、コンソールエラーなしを確認。

## 直近追加作業 2026-05-17 18:xx以降

- 作業前バックアップ:
  `C:\Users\kogit\Documents\Codex\_backups\HaikoKinenMystery_volume_cross_site_pre_20260517_181110`
- Boothパッケージ作業前バックアップ:
  `C:\Users\kogit\Documents\Codex\_backups\HaikoKinenMystery_BoothPackage_volume_cross_site_pre_20260517_181110`
- ページ数不足により短時間で終わる問題へのボリュームアップを実施。
- 画像資料を4点追加。既存のChatGPT生成画像を元に、資料画像として再構成。
  `web/assets/clue-campus-map.png`: 校舎裏動線メモ。
  `web/assets/clue-classroom-roster.png`: 6年1組台紙裏。
  `web/assets/clue-case-c.png`: 展示ケース控え。
  `web/assets/clue-stair-repair.png`: 旧体育館補修写真控え。
- 学校サイトに新規ページを追加。
  `web/school/map/index.html`: 校内図・雨天時動線。
  `web/school/staff/index.html`: 職員室連絡控え。
  `web/school/lost/index.html`: 落とし物台帳。
- `web/school/index.html` に校内図、職員室、落とし物への導線、公開資料メニュー、更新履歴、確認順を追加。
- `web/album/index.html` と `web/album/h18/index.html` に台紙裏画像資料を追加。
- `web/library/case-c/index.html` と `web/ceremony/index.html` に展示ケース画像資料を追加。
- `web/pta/2006/index.html` に補修写真画像資料を追加し、職員室控えへの導線を追加。
- `web/history/index.html` に資料所在の変化テーブルを追加。
- `web/news/index.html` に記事を増量。2006年から2026年までの追加記事で、学校・PTA・図書室・式典資料を横断する必要を強化。
- `web/blog/index.html` に7/14昼・夜の記事を追加。
- `web/board/h18/index.html` に投稿を追加し、資料名・時刻・人物名は一次資料で照合する必要がある形にした。
- `web/newsletter/index.html` に回覧控えテーブルを追加。
- すべての内部リンクを `index.html` 明示形式へ再正規化。
- Booth用フォルダへ `web/` 一式を反映済み。
- 現在のHTMLページ数: 38。
- 現在のPNG画像数: 8。
- 確認済み:
  制作元・Booth用フォルダともローカル `href/src` リンク先存在確認済み。
  フォルダリンク形式の `href` と `href="#"` 残りなし。
  新規/主要11ページでHTTP 200確認。
  調査ノート15問の全通過、真相表示、コンソールエラーなしを確認。

## 未完了

- 販売キット化するならヒント・解説・起動BAT・ZIP作成。
- 追加で販売用サムネイルや紹介画像を作る場合は、ChatGPT生成画像を使用する。

## 直近追加作業 2026-05-17 18:46以降

- 作業前バックアップ:
  `C:\Users\kogit\Documents\Codex\_backups\HaikoKinenMystery_mockumentary_fear_imagegen_pre_20260517_184649`
- Boothパッケージ作業前バックアップ:
  `C:\Users\kogit\Documents\Codex\_backups\HaikoKinenMystery_BoothPackage_mockumentary_fear_imagegen_pre_20260517_184649`
- 画像素材の扱いを修正。証拠風画像4点をChatGPTで新規生成した画像へ差し替え。
  `web/assets/photo-rain-corridor.png`
  `web/assets/photo-display-case-c.png`
  `web/assets/photo-classroom-roster.png`
  `web/assets/photo-gym-stairs-rain.png`
- 旧加工画像 `clue-campus-map.png`, `clue-classroom-roster.png`, `clue-case-c.png`, `clue-stair-repair.png` は削除。
- モキュメンタリーらしい間接的な怖さを増やすため、以下を追加。
  `web/school/night-log/index.html`: 夜間巡回控え。
  `web/library/withdrawn/index.html`: 閲覧制限資料。
  `web/board/night/index.html`: 夜の記憶カテゴリ。
  `web/mobile/mail/index.html`: 6-1メール控え。
  `web/mobile/photo/index.html`: 写メ日記。
- 新聞、ブログ、H18留言板、校内図、職員室、PTA、式典、H18アルバムに、記録の先回り・資料移動・閲覧制限が横断して見える文脈を追加。
- 共通仕様 `C:\Users\kogit\Documents\Codex\MYSTERY_SITE_SPEC.md` に、証拠写真もChatGPT新規生成画像を使うこと、直接的怪異ではなく横断照合で不自然さを作ることを追記。
- 現在のHTMLページ数: 43。
- 現在のPNG画像数: 8。
- Booth用フォルダへ `web/` 一式と `BOOTH_README.md` を反映済み。
- 確認済み:
  制作元・Booth用フォルダともローカル `href/src` リンク先存在確認済み。
  フォルダリンク形式の `href`、`href="#"`、旧 `clue-*.png` 参照なし。
  HTTP 200: メイン、学校、夜間巡回、閲覧制限資料、夜の記憶、携帯メール、写メ日記、調査ノート。
  `site.js` の15問回答定義は維持。
