# 引継ぎ 2026-05-26 FubukiHotelMystery 新規作成

## 対象

- 新規作品: `FubukiHotelMystery`
- 入口: `FubukiHotelMystery/web/index.html`
- 想定プレイ時間: 約 3 時間
- ジャンル: 脱出ゲーム × 推理ゲーム
- 公開URL想定: `https://ailiferyoya-gif.github.io/Origin/FubukiHotelMystery/web/index.html`

## 実施内容

- 雪山ホテルを舞台にした新規Web謎解きを作成。
- 入口ページは、あらすじ、調査の仕方、必要最低限のリンクのみ。
- 公式資料、保存メール、検索画面、管理画面、調査ノートを主導線にした。
- 調査ノートは 25 段階のロック式。
- 回答文字列は `site.js` に平文で置かず、正規化後の SHA-256 ハッシュで照合。
- 管理画面は保存メール内の仮パスワードから開く。
- iPhone想定で、縦長レイアウト、横スクロール抑制、入力欄幅、カード幅を調整。

## 画像

- ChatGPT生成画像を使用。
- `FubukiHotelMystery/web/assets/hero.png`
  - 吹雪の山岳ホテル外観。
- `FubukiHotelMystery/web/assets/corridor-key.png`
  - 停電した廊下と真鍮鍵。
- 生成元は `C:\Users\kogit\.codex\generated_images\019e5978-9772-7a82-8acb-df7af7452ae9`。

## バックアップ

- `C:\Users\kogit\Documents\Codex\backups\new-snow-hotel-mystery-20260526`
- 作業前の `main` を git bundle として保存。

## 構成

- `web/index.html`: 入口ページ。
- `web/official/`: 公開案内。
- `web/official/map/`: 館内図。
- `web/official/rooms/`: 客室案内。
- `web/official/safety/`: 非常時案内。
- `web/mail/`: 依頼メールと管理画面パスワード。
- `web/search/`: 外部資料検索。
- `web/news/`: 地方紙縮刷版。
- `web/weather/`: 気象台記録。
- `web/guestbook/`: 宿泊者掲示板保存。
- `web/service/`: ルームサービス伝票。
- `web/admin/`: 管理画面。
- `web/logs/`: 客室ログ。
- `web/staff/`: 従業員控え。
- `web/generator/`: 発電機室記録。
- `web/camera/`: 監視カメラ静止画。
- `web/investigate/`: 調査ノート。

## 真相設計

- 失踪した前オーナーは蓮見岳。
- 鳥居真琴は西階段の時刻を十二分ずらし、蓮見が外へ出たように見せようとした。
- 実際には外扉は開いておらず、失踪は館内で起きた。
- 暖炉の灰と焦げたメニューカードが、時刻改ざんと証拠隠しの接点になる。
- 脱出経路は、西階段ではなく乾燥室から従業員通路、発電機室へ向かう経路。

## 次にやること

- 実機相当のスマホ幅で追加の目視QA。
- 25問すべてを実プレイで通し、所要時間と詰まりどころを確認。
- 検索画面の語句ヒット範囲を必要に応じて調整。
- Booth版が必要ならパッケージ化する。

## 検証済み

- `FubukiHotelMystery/web` 内の HTML 17 件で相対リンク切れなし。
- メタ表現検索で該当なし。
- 調査ノート 25 問分の回答ハッシュと想定回答が一致。
- 管理画面パスワード `SNOW0314` のハッシュ照合一致。
- ブラウザで入口、公式資料、検索画面、管理画面、調査ノートを確認し、横スクロールなし。
