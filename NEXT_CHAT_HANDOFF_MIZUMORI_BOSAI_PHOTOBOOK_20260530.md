# 2026-05-30 水守町 防災写真帖 引継ぎ

## 対象
- 新規作品: `MizumoriBosaiPhotobookMystery`
- 公開想定URL: `https://ailiferyoya-gif.github.io/Origin/MizumoriBosaiPhotobookMystery/web/index.html`
- ローカル確認URL: `http://127.0.0.1:4530/MizumoriBosaiPhotobookMystery/web/index.html`

## コンセプト
- 一見すると町の防災啓発写真帖。
- 写真内の水位、矢印、水門番号、時刻、資料文を照合すると、十年前の水害が自然災害だけではなく、G-4水門の閉鎖と避難誘導の歪みによって拡大したことが分かる。
- 行方不明事件ではなく、町の防災記録と人災隠蔽を扱う。
- 直接的なホラー表現は避け、不穏さと後味で見せる。

## 実装済み
- `MizumoriBosaiPhotobookMystery/web/index.html`
- `MizumoriBosaiPhotobookMystery/web/style.css`
- `MizumoriBosaiPhotobookMystery/web/app.js`
- `MizumoriBosaiPhotobookMystery/web/assets/photo-01-...jpg` から `photo-24-...jpg`
- ルート `index.html` にカード追加、作品数を42へ更新。

## 画像
- ChatGPT生成の写真帖用コンタクトシートを元に24枚へ個別切り出し。
- 最終的にプロジェクト内で使うのは個別写真24枚のみ。
- スプライトシートは使用していない。
- 生成元は `C:\Users\kogit\.codex\generated_images\019e5978-9772-7a82-8acb-df7af7452ae9\ig_02cc66ef49690653016a19b38e0a488191a8370362b217b11a.png`

## ゲーム構成
- 写真24枚。
- 章ロック4段階。
- 資料7点。
- 調査印ON/OFF。
- 写真内の調査点を押すと手がかりノートへ記録。
- 章ごとの確認語入力で後半写真と資料が解放される。
- 最終推理は文章入力。`G-4`、`17:55`、`閉鎖`、`南町`、`B2-14`、`操作記録` を含むと正解。
- 進行は `localStorage` に保存。

## 確認済み
- `node --check MizumoriBosaiPhotobookMystery/web/app.js` 成功。
- ローカルHTTPで `index.html`、`style.css`、`app.js`、写真24枚すべてHTTP 200。
- `contact-sheet`、`sprite`、`行方不明`、`???` の検索結果なし。

## 残課題
- ブラウザプラグインが途中で落ちたため、視覚スクリーンショット確認は未完了。
- 初期実装は写真手がかりがやや直接的。2〜3時間級にするには、各写真の観察文を段階化し、資料照合なしでは答えが出ない問題を増やす。
- 重要写真は今後、専用プロンプトで1枚ずつ描き下ろすと説得力が上がる。
- iPhone実機相当の表示確認が必要。

## 再開時の推奨手順
1. `git status --short`
2. ローカルまたは公開URLで表示確認。
3. 写真1枚目を開き、調査印ON、調査点クリック、手がかりノート記録を確認。
4. 第一確認に `1.8 / 旧排水路 / G-4 / 17:55` を入れて第2章が開くか確認。
5. スマホ幅で写真一覧、写真詳細、資料、確認欄が崩れないか見る。
