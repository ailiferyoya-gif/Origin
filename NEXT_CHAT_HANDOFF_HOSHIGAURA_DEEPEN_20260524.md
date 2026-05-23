# 引継ぎ 2026-05-24 星ヶ浦鉄道 謎解き内容強化

## 対象
- `HoshigauraRailMystery`
- ユーザー要望:
  - 前回整理した星ヶ浦鉄道について、提案した内容をすべて実施する。
  - 謎本体、調査導線、外部風ページ、解法資料を販売レベルに近づける。

## バックアップ
- `C:\Users\kogit\Documents\Codex\backups\HoshigauraRailMystery-deepen-20260524`
- 退避済み:
  - `web/index.html`
  - `web/site.js`
  - `web/investigate/index.html`
  - `web/gimmick/index.html`
  - `web/search/index.html`
  - `web/news/index.html`
  - `web/city/index.html`
  - `web/board/index.html`
  - `web/blog/index.html`
  - `SOLUTION.md`
  - `HINTS.md`

## 変更点
- 調査ノートを15問から20問へ拡張。
- 壊れていた `site.js` の文字化け判定文を、日本語の正答判定・成功メッセージへ刷新。
- 解き方の主軸を「乗った列車」ではなく「乗れなかった列車」へ明確化。
- 追加した照合要素:
  - M-20運休
  - K-15回送扱い
  - D-07遅延
  - 2番ホーム
  - 月見台の押印時間空白
  - 無許可回送と安全不備
- `gimmick/index.html` と `search/index.html` の文字化けを修正し、補助ページとして再構成。
- `board/index.html` を `沿線掲示板` として整備し、M-20、D-07、K-15、御堂、七瀬理央の断片証言を追加。
- `blog/index.html` を整形し、20:08、濡れた手袋、乗客なしの矛盾が追いやすい構成へ変更。
- `news/index.html` と `city/index.html` の `留言板` 表記を `掲示板` に統一。
- `SOLUTION.md` と `HINTS.md` を20問構成に合わせて全面更新。

## 検証
- `git diff --check` 実行済み。
  - エラーなし。
  - LF/CRLF警告のみ。
- 文字化け・旧表記確認済み。
  - `留言板`, `譏`, `繧`, `縺`, `蜈`, `蜷`, `螟`, `驩`, `豬`, `窶` は対象内で未検出。
- ローカルリンクとページ内アンカー確認済み。
  - 変更対象ページのローカル `href` はすべて実在ファイルまたは実在アンカーへ解決。
- ブラウザで20問通し確認済み。
  - 第1問から第20問まで全問正答。
  - `goodCount: 20`
  - `badCount: 0`
  - 真相表示あり。
- スマホ幅390pxで確認済み。
  - `web/index.html`
  - `web/investigate/index.html`
  - `web/gimmick/index.html`
  - `web/search/index.html`
  - `web/blog/index.html`
  - `web/board/index.html`
  - `web/news/index.html`
  - `web/city/index.html`
  - すべて横スクロールなし。

## 次にやること
- 星ヶ浦鉄道の次の改善候補:
  - 問題文を少し難しくし、直接的な語を減らす。
  - 画像を追加生成して、K-15乗務記録、スタンプ台紙、展示ケースB、雨の北側階段を個別ビジュアル化する。
  - `railway`, `timetable`, `archive` にPDF風・掲示物風のサブページを追加する。
