# 引継ぎメモ

## 概要

`HoshigauraRailMystery` として、地方鉄道の開業90周年記念サイト風Web謎解きを作成。
公式サイトだけでなく、ニュース、自治体安全情報、個人ブログ、留言板を別デザインのサイトとして追加済み。
直近の修正で、公式記念サイトは有料ページ風の大型ヒーローと章立てを持つ豪華な入口に変更。ニュースは新聞紙面風、自治体は役所ポータル風に大きくデザインを分離。
さらに、ゲーム入口とは別に `web/railway/` として星ヶ浦鉄道株式会社の公式トップページを追加。`timetable`, `stations`, `campaign`, `archive`, `event` も同じ公式サイトのデザインに統一済み。
`web/railway/` は記念館トップと見分けがつくように、鉄道会社の実用公式サイト風レイアウトへ変更済み。
`timetable`, `stations`, `campaign`, `archive`, `event` も `web/index.html` と同じプレミアム系ヘッダー・大型ヒーロー・カード構成へ変更済み。
`investigate` もプレミアム系ヘッダー・大型ヒーロー・照合カード構成へ変更済み。全体CSSに `word-break: keep-all` と `line-break: strict` を追加し、句読点以外で日本語が不自然に折り返されにくいよう調整済み。
その後、`word-break: keep-all` が強すぎて枠から文字がはみ出したため一度 `auto-phrase` 寄りに調整。
直近修正で `web/textflow.js` を独自分割方式に変更し、全ページで単語、句読点、`か`、`て`、`に`、`を`、`は` などの助詞の後を改行候補にするよう再調整。CSSも `keep-all` と `<wbr>` を優先する設定へ戻し、任意位置で日本語が割れにくい構成にした。
`web/index.html` は調査ファイル風の導入ページへ変更。`web/investigate/index.html` は各問に「照合式」「入力すべき種類」「手がかり」を追加し、ただサイトから答えを探すだけでなく、証拠を組み合わせる謎解き感を強化。

## 画像

ChatGPT生成画像を使用:

- `web/assets/rail-hero.png`
- `web/assets/rain-platform.png`
- `web/assets/archive-room.png`
- `web/assets/event-plaza.png`
- `web/assets/premium-rail-hero.png`
- `web/assets/news-stairway.png`
- `web/assets/town-hall-counter.png`

スプライトシートは未使用。

## 謎構成

表向きは星ヶ浦鉄道の開業90周年記念サイト。
観光企画、臨時時刻表、駅案内、資料室に加えて、星ヶ浦タイムス、星ヶ浦町安全情報、沿線カフェ日記、留言板を照合すると、2008年の月見台駅転落事故が事故ではなかったと分かる。

答え:

- 第1問: 月見台
- 第2問: 0503
- 第3問: K-15
- 第4問: 七瀬理央
- 第5問: 北側階段
- 第6問: 御堂晴彦
- 第7問: D-07
- 第8問: 照明不点灯
- 第9問: 濡れた手袋
- 第10問: 展示ケースB
- 第11問: 安全-2008-0503
- 第12問: 20:08
- 第13問: 乗客なし
- 第14問: 2008年5月3日
- 第15問: 御堂晴彦が七瀬理央を月見台駅北側階段から突き落とした

## 作業前バックアップ

- `C:\Users\kogit\Documents\Codex\_backups\HoshigauraRailMystery_precreate_20260517_005438`
- `C:\Users\kogit\Documents\Codex\_backups\HoshigauraRailMystery_multisite_pre_20260517_014137`
- `C:\Users\kogit\Documents\Codex\_backups\HoshigauraRailMystery_redesign_pre_20260517_020208`
- `C:\Users\kogit\Documents\Codex\_backups\HoshigauraRailMystery_officialsite_pre_20260517_021731`
- `C:\Users\kogit\Documents\Codex\_backups\HoshigauraRailMystery_railway_match_main_pre_20260517_022812`
- `C:\Users\kogit\Documents\Codex\_backups\HoshigauraRailMystery_premium_subpages_pre_20260517_023815`
- `C:\Users\kogit\Documents\Codex\_backups\HoshigauraRailMystery_investigate_premium_pre_20260517_025012`
- `C:\Users\kogit\Documents\Codex\_backups\HoshigauraRailMystery_text_overflow_fix_pre_20260517_025800`
- `C:\Users\kogit\Documents\Codex\_backups\HoshigauraRailMystery_textflow_pre_20260517_030357`
- `C:\Users\kogit\Documents\Codex\_backups\HoshigauraRailMystery_layout_puzzle_pre_20260517_082440`

## 確認済み

- `http://127.0.0.1:4392/web/` でトップ、時刻表、資料室、調査ノートの表示を確認済み。
- 調査ノートで `月見台` -> `0503` -> `七瀬理央` -> `御堂晴彦が七瀬理央を月見台駅北側階段から突き落とした` の順に入力し、真相表示まで確認済み。
- 再デザイン後、`/web/`, `/web/news/`, `/web/city/`, `/web/blog/`, `/web/board/`, `/web/investigate/` がHTTP 200で表示されることを確認済み。
- 再デザイン後も調査ノートの全段階クリアとコンソールエラーなしを確認済み。
- 公式サイト追加後、`/web/railway/`, `/web/timetable/`, `/web/stations/`, `/web/campaign/`, `/web/archive/`, `/web/event/` がHTTP 200で表示され、公式共通ヘッダーが出ることを確認済み。
- 公式サイト追加後も調査ノートの全段階クリアとコンソールエラーなしを確認済み。
- `web/railway/` レイアウト変更後、プレミアムヒーロー表示、HTTP 200、調査ノート全段階クリア、コンソールエラーなしを確認済み。
- 公式配下ページのプレミアム化後、`/web/timetable/`, `/web/stations/`, `/web/campaign/`, `/web/archive/`, `/web/event/` がHTTP 200で、全ページ `premium-home` 系になっていることを確認済み。
- 資料照合ページのプレミアム化後、`/web/investigate/` がHTTP 200で、全段階クリアとコンソールエラーなしを確認済み。
- `textflow.js` 追加後、主要ページのHTTP 200、表示、調査ノート全段階クリア、コンソールエラーなしを確認済み。
- 直近修正で、本体プロジェクトとBooth展開版 `HoshigauraRailMystery_Booth_v1` の `web/index.html`, `web/railway/index.html`, `web/investigate/index.html`, `web/site.css`, `web/textflow.js` を同期済み。
- 直近修正後、主要10ページのHTTP 200、ブラウザでトップ・公式・資料照合の表示、資料照合15問通過、コンソールエラーなしを確認済み。

## 未完了

- 必要に応じて、ニュース・自治体・ブログ専用の追加画像をChatGPTで生成して差し替え可能。
- Booth商品ページ用のスクリーンショット、商品説明画像、表紙画像を作るとさらに販売しやすい。
- ZIP更新後、実際に展開し直して `file:///.../web/index.html` 起点の最終リンク確認。

## 直近追加作業 2026-05-17 09:xx

- 作業前バックアップ:
  `C:\Users\kogit\Documents\Codex\_backups\HoshigauraRailMystery_booth_index_ominous_pre_20260517_091829`
- Booth展開版の `web/index.html` のみ、不穏な入口ページへ変更。
  雨のホーム画像を背景にし、閲覧制限記録、K-15 / D-07、0503、照明不点灯を前面に出す構成。
- Booth展開版の `web/railway/index.html` は、前バージョンのプレミアム鉄道公式レイアウトへ復元。
- Booth展開版の `web/site.css` に `ominous-home` 系スタイルを追加。
- `http://127.0.0.1:4393/web/index.html` と `http://127.0.0.1:4393/web/railway/index.html` で表示確認済み。

## 直近追加作業 2026-05-17 10:xx

- 作業前バックアップ:
  `C:\Users\kogit\Documents\Codex\_backups\HoshigauraRailMystery_booth_playguide_investigate_pre_20260517_095924`
- Booth展開版の `web/index.html` のヒーロー見出しを2行固定に変更。
  `祝賀ページの奥に、` と `削除されなかった夜がある。` の途中で不自然に割れないよう、見出しに `data-no-textflow` と専用spanを追加。
- Booth展開版の `web/index.html` に遊び方セクションを追加。
  想定時間45分から90分、1人から2人向け、必要なもの、進め方、詰まった時の見方を記載。
- Booth展開版の `web/investigate/index.html` は星ヶ浦鉄道公式サイトではなく、メインページ側の「開業90周年記念記録」配下として見えるヘッダーへ変更。
- 未解放の照合カードは、ヒント、照合式、入力欄、ボタンを非表示にし、前問クリア案内だけ見えるように変更。解放後は詳細と入力欄が表示される。
- `http://127.0.0.1:4394/web/index.html` で見出し・遊び方表示確認済み。
- `http://127.0.0.1:4394/web/investigate/index.html` で未解放カードの詳細非表示、解放後表示、15問通過、コンソールエラーなしを確認済み。

## 直近追加作業 2026-05-17 10:2x

- 作業前バックアップ:
  `C:\Users\kogit\Documents\Codex\_backups\HoshigauraRailMystery_booth_background_pre_20260517_102147`
- Booth展開版の `web/index.html` ヒーローで、見出しと右側の「閲覧制限記録」が被らないよう調整。
  左側コピーの最大幅と文字サイズを抑え、閲覧制限記録カードを下げた。
- Booth展開版の `web/index.html` に没入用バックグラウンドセクションを追加。
  プレイヤーに「古い同級生掲示板の投稿をきっかけに、消される前の記録を確認している」という導入を提示。
- `http://127.0.0.1:4395/web/index.html` でヒーロー被り解消とバックグラウンド表示を確認済み。

## 直近追加作業 2026-05-17 10:3x

- 作業前バックアップ:
  `C:\Users\kogit\Documents\Codex\_backups\HoshigauraRailMystery_booth_dot_background_pre_20260517_102837`
- Booth展開版の `web/index.html` ヒーローで、見出し末尾の句点だけが「閲覧制限記録」に重なる問題を修正。
  左側コピー幅をさらに抑え、見出し最大サイズを少し下げ、閲覧制限記録カードとの余白を確保。
- Background見出しの改行ルールを修正。
  `あなたに届いた、` と `ひとつの確認依頼。` の2行に固定し、単語途中や意図しない位置で割れないよう `data-no-textflow` と専用spanを追加。
- `http://127.0.0.1:4396/web/index.html` で句点の被り解消とBackground見出しの改行を確認済み。

## 直近追加作業

- `PRODUCTION_SUMMARY.md` を追加。
- `BOOTH_README.md` を追加。
- 資料照合を15問構成へ拡張。
- ブログを10記事構成へ拡張。
- ニュース、自治体、留言板に謎と無関係な記事・投稿を追加して実在感を増加。
- 15問のフル通過確認済み。
