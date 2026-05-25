# 引継ぎ 2026-05-26 FubukiHotelMystery 新規作成

## 対象

- 新規作品: `FubukiHotelMystery`
- 入口: `FubukiHotelMystery/web/index.html`
- 公開URL想定: `https://ailiferyoya-gif.github.io/Origin/FubukiHotelMystery/web/index.html`
- ジャンル: 脱出ゲーム × 推理ゲーム
- 想定プレイ時間: 約3時間を目標

## 方針

- この作品は他作品のようなWeb横断調査ではなく、吹雪ホテル内で完結するストーリー型ゲーム。
- 入口であらすじを表示し、「ゲーム開始」で本編へ入る。
- ホテル内の各場所を移動し、画像内の気になる場所を調べ、アイテムを集める。
- 登場人物に話しかけたり、持ち物を見せたりすることで証言が変わり、事件の真相へ進む。
- 検索画面や外部資料は、必要な場合以外は使わない。

## 2026-05-26 探索型ADV再構成

- `web/index.html` を探索ゲーム用の入口と本編UIへ変更。
- `web/game.css` を追加し、iPhoneでも遊べる縦積みレイアウトに対応。
- `web/game.js` を追加し、以下を実装。
  - あらすじ表示とゲーム開始
  - ホテル内移動
  - 画像内ホットスポット調査
  - 持ち物入手
  - 人物との会話
  - 持ち物を人物に見せる
  - 記録ログ
  - 状況整理
  - 最終推理提出

## 2026-05-26 PC全画面化・3時間規模への増量

- ユーザー指摘: PCでは縦にスクロールせず、全画面ゲームのように遊びたい。部屋数が少なく10分ほどで終わるため、3時間ほどになるように増量が必要。
- 作業前バックアップ:
  - `C:\Users\kogit\Documents\Codex\backups\fubuki-hotel-expanded-game-20260526`
- `web/game.css` をPCでは `100dvh` のゲーム画面に変更。
  - ページ全体は縦スクロールさせない。
  - 右側の情報パネルだけ内部スクロール。
  - iPhone幅では従来どおり縦積みで遊べる。
- `web/index.html` の `game.css` / `game.js` にキャッシュ回避クエリを追加。
- `web/game.js` を増築。
  - 食堂、厨房、管理室、書斎ラウンジ、乾燥室、地下資料庫を追加。
  - 管理室、厨房、乾燥室、301号室、地下資料庫、発電室に入室条件を追加。
  - 証拠品を約30点まで増量。
  - 調査ホットスポットを約40件以上へ増量。
  - 人物への「見せる」反応を追加。
  - 最終推理は、鳥居、西階段、乾燥室/従業員通路、時刻操作、暖炉の証拠隠し、十年前の関係を必要要素にした。
- 発電室のロック条件を修正。
  - ランタンは発電室内で拾うため、入室条件から外した。
  - 入室条件は `ヒューズレバー + 従業員通路図`。

## 使用画像

すべてChatGPT生成画像を使用。

- `FubukiHotelMystery/web/assets/hero.png`
  - 吹雪ホテル外観
- `FubukiHotelMystery/web/assets/corridor-key.png`
  - 西階段、真鍮鍵
- `FubukiHotelMystery/web/assets/game-lobby.png`
  - ロビー
- `FubukiHotelMystery/web/assets/game-hallway.png`
  - 二階廊下
- `FubukiHotelMystery/web/assets/game-room301.png`
  - 301号室
- `FubukiHotelMystery/web/assets/game-generator.png`
  - 発電室
- `FubukiHotelMystery/web/assets/game-dining.png`
  - 食堂
- `FubukiHotelMystery/web/assets/game-kitchen.png`
  - 厨房
- `FubukiHotelMystery/web/assets/game-office.png`
  - 管理室
- `FubukiHotelMystery/web/assets/game-lounge.png`
  - 書斎ラウンジ
- `FubukiHotelMystery/web/assets/game-drying.png`
  - 乾燥室
- `FubukiHotelMystery/web/assets/game-archive.png`
  - 地下資料庫
- `FubukiHotelMystery/web/assets/char-torii.png`
  - 鳥居真琴、背景透過済み
- `FubukiHotelMystery/web/assets/char-hasumi.png`
  - 蓮見岬、背景透過済み
- `FubukiHotelMystery/web/assets/char-clerk.png`
  - 夜勤係 直人、背景透過済み

生成元:

- `C:\Users\kogit\.codex\generated_images\019e5978-9772-7a82-8acb-df7af7452ae9`

## バックアップ

- `C:\Users\kogit\Documents\Codex\backups\fubuki-hotel-adventure-rebuild-20260526`

## 真相設計

- 失踪した蓮見岬は外へ出ていない。
- 鳥居真琴が西階段と時刻を利用し、蓮見が外へ出たように見せた。
- 西階段は十年前の構造では外へ通じておらず、従業員通路と発電室につながっていた。
- 暖炉で焦げたメニューカードは、時刻操作と証拠隠しの接点。
- 外扉の雪跡、濡れた足跡、伝票、台帳、集合写真を組み合わせて推理する。

## 未完了・次にやること

- 実機に近いiPhone幅で、ホットスポットの押しやすさを追加確認する。
- 画像枚数は増やしたが、3時間規模にするには客室、厨房、管理室、従業員通路などの追加シーン画像をさらに作る余地がある。
- 会話分岐とアイテム提示の反応を増やすと、より長時間の体験になる。
- 可能なら最終推理を選択式と自由入力の併用にして、スマホ入力の負担を下げる。

## 検証済み

- 文字化けしていた `index.html`、`game.js`、引継ぎMDをUTF-8の日本語で作り直し。
- キャラクター画像は背景透過済み。
- スプライトシート不使用。
- ローカルサーバーで `FubukiHotelMystery/web/index.html` がHTTP 200。
- ブラウザでゲーム開始、ロビー調査、持ち物入手、人物会話、二階廊下への移動、足跡調査まで確認。
- ブラウザ上の本文に文字化けなし、コンソールエラーなし、横スクロールなし。
- 増量後、ブラウザで主要ルートを通し確認。
  - ゲーム開始から、ロビー、食堂、書斎ラウンジ、二階廊下、管理室、厨房、乾燥室、発電室、地下資料庫、301号室まで到達確認。
  - 30個の持ち物取得を確認。
  - PC幅で `scrollHeight == clientHeight`、ページ全体の縦スクロールなし。
  - コンソールエラーなし。
  - 本文文字化けなし。
- 最終回答欄の自動入力は、ブラウザ操作側の仮想クリップボード制限で自動QA不可。提出条件のコード確認は済み。
