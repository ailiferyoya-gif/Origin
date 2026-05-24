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
- 2026-05-24再追記: 「まだ他サイトと被る」と指摘があったため、トップHTML構造を丸ごと再設計。
- 汎用の「ヒーロー＋カード＋ニュース」構成をやめ、写真＋リアルタイム運行ボード、4連ステータス、斜面ルート図、6分割駅掲示、発車案内ウォールの山岳交通サイト型に変更。
- CSSキャッシュ対策として `official.css?v=karasuno-slope-20260524` を指定。

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
- 再設計後も7ページ再確認済み。トップで `kc-slope-hero`、`kc-incline-map`、`kc-time-wall` 表示、CSS適用、文字化けなし、画像エラーなし、横はみ出しなし。

## 次にやること
- ユーザー確認後、必要なら周辺サイト側（市資料、業者、ログ、台帳）もケーブルカー運行・保守記録に合わせてさらに濃くする。

## 2026-05-24 追加修正: KarasunoCable 2024+風モーション調整
- ユーザー指摘: 枠が硬く、フォントも既存感があるため、2024年以降のサイトを参考によりおしゃれにする。
- 対応: 公式トップのCSSバージョンを official.css?v=karasuno-fluid-20260524 に更新。
- 対応: Google Fonts（Noto Sans JP / BIZ UDPMincho）、半透明・ぼかし・曖昧な境界、ホバーの微動、スクロール reveal アニメーションを追加。
- バックアップ: C:\Users\kogit\Documents\Codex\backups\karasuno-cable-modern-motion-20260524

## 2026-05-24 追加修正: 公式全ページを静的・非カード型へ調整
- ユーザー指摘: 動きが重い。画像だけで見せたい。四角い枠で囲うと安っぽい。対象は公式サイトの全ページ。
- 対応: トップページの reveal 用 JavaScript と data-reveal 属性を削除。公式全ページで official.css?v=karasuno-static-premium-20260524 を読み込むよう更新。
- 対応: 共通CSSでアニメーション/transitionを無効化。トップ・下層のカード/表/ステータス/リストの明確な枠線を消し、画像・余白・淡い面・細い区切りだけで構成する静的な見た目に変更。
- バックアップ: C:\Users\kogit\Documents\Codex\backups\karasuno-cable-static-premium-all-official-20260524

## 2026-05-24 追加修正: 御在所ロープウエイ参考・画像使い回し禁止
- ユーザー指摘: 公式サイトがまだ微妙。https://www.gozaisho.co.jp/ を参考にする。画像の使い回しが発生しているため、新規生成画像を使用する。
- 重要ルール: KarasunoCableMystery公式サイトでは、公式トップ・下層ページのメイン画像を使い回さない。ページごとにChatGPT生成の新規画像を割り当てる。
- 新規生成画像: karasuno-official-hero-20260524.png / karasuno-operation-20260524.png / karasuno-fares-20260524.png / karasuno-access-20260524.png / karasuno-maintenance-20260524.png / karasuno-lostfound-20260524.png / karasuno-news-20260524.png
- 対応: 公式全ページのCSSを official.css?v=karasuno-gozaisho-photo-20260524 に更新。御在所ロープウエイのような明るい観光公式サイト寄りに、白基調・緑アクセント・大きな写真・情報カード導線へ変更。
- バックアップ: C:\Users\kogit\Documents\Codex\backups\karasuno-cable-gozaisho-reference-20260524

- 追加対応: 駅・アクセスページ内の補助画像にも新規生成画像 karasuno-night-access-20260524.png を割り当て、公式サイト内の主要写真の使い回しを解消。
