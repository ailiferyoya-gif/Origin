# 2026-05-30 水守町 防災写真帖 引継ぎ

## 対象
- 作品: `MizumoriBosaiPhotobookMystery`
- 公開URL: `https://ailiferyoya-gif.github.io/Origin/MizumoriBosaiPhotobookMystery/web/index.html`
- ローカル: `C:\Users\kogit\Documents\GitHub\Origin\MizumoriBosaiPhotobookMystery\web\index.html`

## コンセプト
- 一見すると実在する町の防災写真帖、公共アーカイブサイトの体裁。
- 写真内の違和感、掲示、台帳、時刻、水位、番号を照会していくと、十年前の水害が自然災害だけではなく、G-4水門の閉鎖遅延と資料改ざんによって拡大した可能性が見えてくる。
- 行方不明事件ではなく、防災記録と人災隠蔽を扱う。
- 直接的なホラーではなく、不穏さと後味で見せる。

## 実装済み
- `MizumoriBosaiPhotobookMystery/web/index.html`
- `MizumoriBosaiPhotobookMystery/web/style.css`
- `MizumoriBosaiPhotobookMystery/web/app.js`
- `MizumoriBosaiPhotobookMystery/web/assets/photo-01-...jpg` から `photo-24-...jpg`
- ルート `index.html` に作品カード追加、作品数を42へ更新。

## 画像
- 画像はChatGPT生成物を使用。
- 最終的に24枚すべてを個別の高解像度JPGへ差し替え済み。
- 各画像は `1586x992`。
- プロジェクト内には個別画像のみ配置。スプライトシート未使用。
- 直近の画像差し替えバックアップ: `C:\Users\kogit\Documents\Codex\backups\mizumori-highres-photos-20260530`

## 体験構造
- 写真24枚。
- 4段階の資料照会。
- 公開資料7点。
- 注記表示ON/OFF。
- 写真内の注記対象を押すと注記一覧へ記録。
- 章ごとの照会入力で後続写真と資料が表示される。
- 最後は情報公開請求用メモとして、G-4、17:55、閉鎖遅延、改ざん、B2-14の関係を書く。
- 進行は `localStorage` に保存。

## 2026-05-30 実在サイト風への調整
### 対応内容
- 写真カードの「確認済み」バッジを削除。
- `謎`、`手がかり`、`調査`、`正解`、`ゲーム`、`プレイ` など、メタ寄りに見える語を削除。
- 表記を `注記`、`資料照会`、`情報公開請求用メモ`、`内容を整理` など公共アーカイブ寄りに変更。
- 配色を白、青灰、濃紺、ティール中心の現代風公共サイト寄りへ変更。
- キャッシュ更新用クエリを `20260530-modern-public` に変更。
- バックアップ: `C:\Users\kogit\Documents\Codex\backups\mizumori-real-site-modern-20260530`

## 2026-05-30 文字化け復旧
### 対応内容
- `app.js` 内の日本語が `????` に置き換わっていたため、写真24枚、資料、照会、最終整理文をUTF-8で復旧。
- `app.js` をBOMなしUTF-8へ再保存。
- 引継ぎMDも文字化けしていたため、このファイルを読みやすい日本語で再作成。
- バックアップ: `C:\Users\kogit\Documents\Codex\backups\20260530-mizumori-questionmark-fix`

## 確認済み
- `app.js` の構文チェック成功。
- `????` 検索結果なし。
- `確認済`、`謎`、`手がかり`、`調査`、`正解`、`ゲーム`、`プレイ`、`ホットスポット`、`クリック`、`確認語`、`提出`、`最初から`、`調査印` は `web` 配下で検索結果なし。
- `app.js` 先頭バイトは `63 6F 6E` でBOMなし。

## 残課題
- ブラウザプラグインが不安定だったため、スクリーンショット確認は未完了。
- iPhone実機相当の表示確認が必要。
- 初期実装は写真注記の導線がやや直接的。2〜3時間級にするには、写真ごとの観察文を段階化し、資料照会なしでは答えが出ない問題を増やす余地がある。

## 再開時の推奨手順
1. `git status --short`
2. 公開URLで表示確認。
3. 写真1枚目を開き、注記表示ON、注記対象の押下、注記一覧への記録を確認。
4. 第一照会に `1.8 / 逆向き / G-4 / 17:55` を入れて第2章が表示されるか確認。
5. スマホ幅で写真一覧、写真詳細、資料、照会欄が崩れないか確認。
