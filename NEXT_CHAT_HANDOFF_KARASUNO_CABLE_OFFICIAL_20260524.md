# 引継ぎ 2026-05-24 KarasunoCableMystery 公式サイト完成作業

## 対象
- `KarasunoCableMystery/web/official/index.html`
- `KarasunoCableMystery/web/official/about/index.html`
- `KarasunoCableMystery/web/official/facility/index.html`
- `KarasunoCableMystery/web/official/map/index.html`
- `KarasunoCableMystery/web/official/safety/index.html`
- `KarasunoCableMystery/web/official/keys/index.html`
- `KarasunoCableMystery/web/official/restricted/index.html`
- `KarasunoCableMystery/web/official/official.css`
- `KarasunoCableMystery/web/assets/official-hero-generated.png`

## 参考にした実在サイトの方向性
- 高尾登山電鉄: https://www.takaotozan.co.jp/sp/cable/
- 坂本ケーブル: https://sakamoto-cable.jp/
- 大山ケーブルカー: https://www.ooyama-cable.co.jp/
- 筑波山ケーブルカー&ロープウェイ: https://mt-tsukuba.com/cablecar-fare/

## 変更点
- 公式トップを実在ケーブルカー公式サイト風に再構成。
- 本日の運行、待ち時間、夜間保守、時刻表、運賃、駅・アクセス、安全点検、お忘れ物、お知らせを整備。
- 既存の `about / facility / map / safety / keys / restricted` を下層ページとして活かし、古いリンクでも読めるようにした。
- ChatGPT生成画像 `official-hero-generated.png` を追加し、山霧のケーブルカー駅ビジュアルとして使用。
- 不穏な要素として、山上駅到着チャイム、夜間放送設備点検、欠番の点検番号、鍵札などを公式告知の中に薄く配置。
- 文字サイズを抑え、実在の交通系公式サイトに近い情報密度へ調整。
- 2026-05-24追記: 他サイトとデザインが被らないよう、黒緑の駅運行表示盤風デザインへ変更。
- 公式トップに `KC-01 烏野山麓` から `KC-02 烏野山上` へ登る路線図ボードを追加し、カード型汎用公式サイトから離した。
- ヒーロー画像を斜めカットし、運行情報盤・信号色・鋼索鉄道路線図を主役にした独自レイアウトへ調整。

## バックアップ
- `C:\Users\kogit\Documents\Codex\backups\karasuno-cable-official-20260524`

## 確認済み
- 公式サイト内リンク解決確認
- `official-rebuild.js` の残存なし
- 文字化け検出なし
- `git diff --check`
- ブラウザで7ページ確認
  - `official/index.html`
  - `official/about/index.html`
  - `official/facility/index.html`
  - `official/map/index.html`
  - `official/safety/index.html`
  - `official/keys/index.html`
  - `official/restricted/index.html`
- 7ページすべてでH1表示、画像エラーなし、横はみ出しなし。
- 独自化後も7ページ再確認済み。トップで路線図ボード表示、文字化けなし、画像エラーなし、横はみ出しなし。

## 次にやること
- ユーザー確認後、必要なら周辺サイト側（市資料、業者、ログ、台帳）もケーブルカー運行・保守記録に合わせてさらに濃くする。
