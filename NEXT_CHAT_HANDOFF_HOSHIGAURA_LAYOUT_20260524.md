# 引継ぎ 2026-05-24 星ヶ浦鉄道レイアウト統一

## 対象
- `HoshigauraRailMystery`
- ユーザー要望:
  - 謎解きメインページの崩れを確認する。
  - 星ヶ浦鉄道に入り、公式 `index.html` と他ページのレイアウト差を揃える。
  - `railway/index.html` の見た目を正として、公式系ページのリンクと見た目を統一する。

## バックアップ
- `C:\Users\kogit\Documents\Codex\backups\HoshigauraRailMystery-layout-20260524`
- 退避済み:
  - `web/index.html`
  - `web/site.css`
  - `web/official/index.html`

## 変更点
- `web/official/index.html`
  - 汎用資料ページ風の見た目から、星ヶ浦鉄道公式トップ系の `rail-official` レイアウトへ変更。
  - 公式トップ、運行情報、駅・沿線、観光企画、資料室、90周年、資料照合、ギミック調査室への導線を整理。
- `web/timetable/index.html`
  - 旧 `premium-*` レイアウトから `railway/index.html` と同じヘッダー、ナビ、ヒーロー、カード構造へ変更。
  - M-20運休、D-07遅延、K-15回送扱いを表で読めるように整理。
- `web/stations/index.html`
  - 駅・沿線案内を公式サイト調へ統一。
  - 星ヶ浦、汐見浜、月見台、黒松口のページ内アンカーを実装。
  - 月見台駅の北側階段、ホーム、旧信号室の照合情報を追加。
- `web/campaign/index.html`
  - 沿線観光企画を公式サイト調へ統一。
  - スタンプラリー台紙の空白と月見台駅の調査導線を追加。
- `web/archive/index.html`
  - 鉄道資料室を公式サイト調へ統一。
  - 棚番号と列車番号の対応を表で整理。
- `web/event/index.html`
  - 90周年イベントを公式サイト調へ統一。
  - 展示ケースB、記念切符、K-15乗務記録への導線を追加。
- `web/site.css`
  - `rail-table-wrap` を追加し、公式ページ内の表がスマホ幅でも横崩れしないようにした。
- `web/index.html`
  - 添付資料カードの誤表記 `留言板` を `掲示板` に修正。

## 検証
- `git diff --check` 実行済み。
  - エラーなし。
  - LF/CRLF警告のみ。
- 公式系ページの旧レイアウトクラス確認済み。
  - `premium-header`
  - `premium-subpage`
  - `premium-main`
  - `premium-nav`
  - 上記は対象ページから未検出。
- ローカルリンクとページ内アンカー確認済み。
  - 対象ページ内のローカル `href` はすべて実在ファイルまたは実在アンカーへ解決。
- ブラウザ確認済み。
  - PC幅: `railway`, `official`, `timetable`, `stations`, `campaign`, `archive`, `event`, `web/index.html` で横スクロールなし。
  - スマホ幅390px: `official`, `timetable`, `stations`, `campaign`, `archive`, `event`, `web/index.html` で横スクロールなし。

## 次にやること
- 星ヶ浦鉄道の謎解き内容を濃くする場合は、以下を軸にするとよい。
  - 「乗れなかった列車」からアリバイを崩す。
  - M-20運休、K-15回送扱い、D-07遅延証明を別々のギミックにする。
  - 月見台駅北側階段の雨天閉鎖を、徒歩移動証言の破綻に使う。
  - 90周年展示ケースBの記念切符裏面と乗務記録を照合させる。
