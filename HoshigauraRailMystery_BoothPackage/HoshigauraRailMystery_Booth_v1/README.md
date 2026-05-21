# 星ヶ浦鉄道 開業90周年記念サイト

地方鉄道の公式記念サイトを入口に、ニュースサイト、町の安全情報、個人ブログ、留言板を横断して真相を探るWebモキュメンタリー謎解きです。現在は15問構成です。

## 起動

```powershell
& "C:\Users\kogit\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" "C:\Users\kogit\Documents\Codex\HoshigauraRailMystery\server.mjs"
```

入口:

`http://127.0.0.1:4392/web/`

## 主なページ

- `web/` 星ヶ浦鉄道の豪華な公式記念サイト
- `web/railway/` 星ヶ浦鉄道株式会社の公式トップページ
- `web/news/` 新聞紙面風の星ヶ浦タイムス
- `web/city/` 自治体ポータル風の星ヶ浦町安全情報
- `web/blog/` 沿線カフェ日記風の個人ブログ
- `web/board/` 古い掲示板風の留言板
- `web/investigate/` 資料照合ノート
- `web/textflow.js` 日本語の自然な改行候補を挿入する表示補助

公式系ページ:

- `web/timetable/` 運行情報・時刻表
- `web/stations/` 駅・沿線案内
- `web/campaign/` 沿線観光企画
- `web/archive/` 鉄道資料室
- `web/event/` 90周年記念イベント

## 答え

答え一覧は `BOOTH_README.md` と `PRODUCTION_SUMMARY.md` に記載しています。

## Booth向け資料

- `BOOTH_README.md`: 販売物に同梱する説明
- `PRODUCTION_SUMMARY.md`: 制作意図、構成、15問設計のまとめ

## 画像

画像素材はChatGPT生成です。スプライトシートは使用していません。

追加生成素材:

- `web/assets/premium-rail-hero.png`
- `web/assets/news-stairway.png`
- `web/assets/town-hall-counter.png`
