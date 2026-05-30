# 次チャット引継ぎ 2026-05-30 水守町 防災写真帖

## リポジトリ
- ローカル: `C:\Users\kogit\Documents\GitHub\Origin`
- リモート: `https://github.com/ailiferyoya-gif/Origin.git`
- 公開URL: `https://ailiferyoya-gif.github.io/Origin/`
- Git: `C:\Users\kogit\AppData\Local\GitHubDesktop\app-3.5.8\resources\app\git\cmd\git.exe`

## 最新状態
- 最新コミット: `47785f1 Record Mizumori archive integration`
- push済み: `main -> origin/main`
- 作業ツリーは最後にクリーン。

## 今回作成した作品
- ディレクトリ: `MizumoriBosaiPhotobookMystery`
- 作品名: `水守町 防災写真帖`
- 公開URL: `https://ailiferyoya-gif.github.io/Origin/MizumoriBosaiPhotobookMystery/web/index.html`
- Nazotoki Archive登録: 済み
- Archive URL: `https://ailiferyoya-gif.github.io/Origin/`
- Archiveカード: `水守町 防災写真帖 WTR-1755`
- Archive作品数表示: `現在 42 作品`

## コンセプト
- 一見すると実在する町の防災写真帖、公共アーカイブサイトの体裁。
- 町内の防災写真を閲覧していくと、写真内の小さな違和感から十年前の水害説明にずれが見えてくる。
- 行方不明ものではなく、防災記録と人災隠蔽を扱う。
- 直接的なホラーではなく、不穏さと後味で見せる。

## 現在の体験構造
- 写真24枚。
- 4段階の資料照会。
- 公開資料7点。
- 注記表示ON/OFF。
- 写真内の注記対象を押すと注記一覧へ記録。
- 章ごとの照会入力で後続写真と資料が表示される。
- 最後は情報公開請求用メモとして、G-4、17:55、水門、閉鎖遅延、B2-14の関係を書く。
- 進行は `localStorage` に保存。

## 画像
- 画像はすべてChatGPT生成物。
- 24枚すべて個別JPG、サイズは `1586x992`。
- スプライトシート未使用。
- キャラクター画像なし。

## 主な実装ファイル
- `MizumoriBosaiPhotobookMystery/web/index.html`
- `MizumoriBosaiPhotobookMystery/web/style.css`
- `MizumoriBosaiPhotobookMystery/web/app.js`
- `MizumoriBosaiPhotobookMystery/web/assets/photo-01-...jpg` から `photo-24-...jpg`
- ルート `index.html` にArchiveカード登録済み。

## 直近の重要修正
### 1. 文字化け復旧
- `app.js` 内の日本語が `????` になったため復旧。
- `app.js` はBOMなしUTF-8。
- キャッシュ番号を更新し、GitHub Pagesが新JSを読むように修正。

### 2. 実在サイト風への調整
- 「確認済み」表示を削除。
- `謎`、`手がかり`、`調査`、`正解`、`ゲーム`、`プレイ` などメタ寄りのUI文言を公開アーカイブ風に変更。
- 配色を白、青灰、濃紺、ティール中心の現代風公共サイト寄りへ変更。

### 3. 写真と注記の整合修正
- 画像に写っていない細かな番号や文字を読ませる設計を避けた。
- 注記は写真上で見える要素に寄せた。
- 例: `赤い帯`、`右`、`赤いコーン`、`泥跡`、`黄色`、`長靴`、`赤と緑`、`黄色い札`、`暗い窓`、`濡れた線`、`金属扉`、`赤い灯り`。

### 4. 画像拡大ビュー追加
- 写真詳細に「拡大」ボタンを追加。
- 写真本体クリックでも拡大ビューを開ける。
- 全画面ビューで `縮小 / 等倍 / 拡大 / 閉じる` を操作可能。
- 拡大時は画像幅そのものを変え、上下左右へスクロールして細部確認できる。
- 現在のキャッシュ番号: `20260530-zoom-rework`

### 5. Nazotoki Archive統合
- ルート `index.html` に `MizumoriBosaiPhotobookMystery` のカード登録済み。
- 公開URLでも `MizumoriBosaiPhotobookMystery` と `水守町` が返ることを確認済み。

## 確認済み
- `app.js` 構文チェック成功。
- `web` 配下で `????`、文字化け断片、メタ寄り語の検索結果なし。
- ローカルHTTPで `index.html`、`app.js?v=20260530-zoom-rework`、`style.css?v=20260530-zoom-rework` はHTTP 200。
- GitHub Pagesで `20260530-zoom-rework` 反映確認済み。
- 公開JSに `赤い帯` と `zoomImage` が含まれることを確認済み。

## 主なバックアップ
- `C:\Users\kogit\Documents\Codex\backups\mizumori-highres-photos-20260530`
- `C:\Users\kogit\Documents\Codex\backups\mizumori-real-site-modern-20260530`
- `C:\Users\kogit\Documents\Codex\backups\20260530-mizumori-questionmark-fix`
- `C:\Users\kogit\Documents\Codex\backups\mizumori-cache-bust-20260530`
- `C:\Users\kogit\Documents\Codex\backups\mizumori-zoom-clue-rework-20260530`
- `C:\Users\kogit\Documents\Codex\backups\nazotoki-archive-mizumori-20260530`

## 未完了・注意点
- ブラウザプラグインが利用できなかったため、スクリーンショット確認は未実施。
- iPhone実機相当で、拡大ビューの操作感を確認する必要あり。
- 写真と注記はだいぶ合わせたが、さらに販売品質へ寄せるなら、画像そのものを再生成して注記対象を明確に写すのが次の改善候補。
- 現状は2〜3時間級としてはまだ薄い可能性がある。追加するなら、写真ごとの二段階注記、資料照会なしでは解けない複合問題、章ごとの小さな発見演出を増やす。

## 2026-05-30 写真注記と照会構造の再調整
- ユーザー指摘: 拡大できるようになったが、説明と画像が合っておらず、謎解きになっていない。
- 作業前バックアップ: `C:\Users\kogit\Documents\Codex\backups\mizumori-pre-image-clue-rework-20260530`
- 24枚の確認用コンタクトシートを作成し、写真に実際に写る要素へ注記を寄せ直した。
- 入力値を「画像で見える物」に変更。
  - 第一照会: `赤い帯 / 右矢印 / 掲示板時計 / 泥跡`
  - 第二照会: `水門中央 / 黄色い旗 / 長靴 / 傾いた紙`
  - 第三照会: `赤緑ランプ / 黄色い鍵札 / 会議地図 / 観測小屋`
  - 第四照会: `暗い窓 / 濡れた線 / 金属扉 / 赤い灯り`
- 資料文は、写真の見える物を `G-4`、`17:55`、`B2-14` へつなぐ形に再構成。
- 照会欄に写真番号と対象ラベルを追加し、何を見ればよいかを明確化。
- 入力判定を完全一致から表記ゆれ許容へ変更。
- キャッシュ番号を `20260530-clue-rework` に更新。
- 確認: バンドルNodeで `app.js` 構文チェック成功。ローカルHTTPで `index.html`、新 `app.js`、新 `style.css` はHTTP 200。最小DOMスタブで初期描画と照会欄生成のスモーク確認成功。
- 未確認: ブラウザプラグインは引き続き落ちるため、実ブラウザのスクリーンショット確認は未実施。

## 2026-05-30 証拠比較ロジックの再調整
- ユーザー指摘: 写真1は過去到達線の位置と赤い帯の関係が分からず、写真2も公開図がないため右矢印がなぜ変か分からない。写真説明だけでは謎解きになっていない。
- 作業前バックアップ: `C:\Users\kogit\Documents\Codex\backups\mizumori-pre-evidence-logic-rework-20260530`
- 資料を比較対象として明示する形へ変更。
  - `広報写真 校正メモA`: 写真01/02/04/05で削除対象になった要素を示す。
  - `避難案内 改訂差分`: 公開図の左回り誘導と旧案内板の右矢印の差分を示す。
  - `発表前対応 整理表` と `対応写真 目印欄`: 17:55から18:18までの現場写真と目印を対応させる。
  - `G-4 手動操作系統`: 操作盤、黄色札の予備鍵、会議地図、観測小屋をG-4へ接続。
  - `地下書庫 B2-14 目録`: 管理棟不在、地下浸水、金属扉、閉鎖後警告灯をB2-14へ接続。
- 写真注記も「写真だけで断定」ではなく、資料と照合したときの対象が分かる文へ変更。
- キャッシュ番号を `20260530-evidence-rework` に更新。
- 確認: バンドルNodeで `app.js` 構文チェック成功。不要なメタ寄り語句の検索結果なし。最小DOMスタブで初期描画と資料/照会欄生成のスモーク確認成功。

## 2026-05-30 当時公開記事との差分比較化
- ユーザー指摘: 当時の公開資料との差分比較とするため、当時の記事などを作成し、見えるようにする必要がある。
- 作業前バックアップ: `C:\Users\kogit\Documents\Codex\backups\mizumori-pre-public-article-rework-20260530`
- 資料タブに、比較対象として読める当時公開記事を追加。
  - `平成26年9月2日 広報みずもり臨時号`
  - `平成26年9月3日 地域安全ニュース`
  - `平成26年9月5日 町長会見要旨`
  - `平成27年3月11日 復旧記念記事`
- 各章に令和6年再掲写真側の差分メモも併記し、写真と記事を比較して矛盾点を入力する形式へ変更。
- 第一照会は、臨時号本文の `青帯以下 / 左回り経路 / 17:30更新完了 / 浸水なし` と写真側の `赤い帯 / 右矢印 / 掲示板時計 / 泥跡` を比較する構造。
- 第二以降も、当時記事の説明と再掲写真の目印欄を比較して、G-4、17:55、B2-14へつなぐ構造。
- キャッシュ番号を `20260530-public-articles` に更新。
- 確認: バンドルNodeで `app.js` 構文チェック成功。不要なメタ寄り語句の検索結果なし。最小DOMスタブで当時記事と比較プロンプトの描画を確認。

## 2026-05-30 写真帖・調査ノート・資料サイト分離
- ユーザー指示: 写真帖は表向きには通常のサイトにし、別サイトとして調査ノートを作成。資料はまた資料で別作成。
- 作業前バックアップ: `C:\Users\kogit\Documents\Codex\backups\mizumori-pre-separate-sites-20260530`
- `web/index.html` を通常の自治体風写真帖へ変更。
  - 注記、資料照会、情報公開請求用メモなどの謎解きUIを撤去。
  - 通常の写真一覧と拡大表示だけに整理。
  - 通常サイトからは `公開資料` のみリンク。
- 新規作成: `web/photobook.js`
  - 表向き写真帖専用の写真一覧・拡大表示スクリプト。
- 新規作成: `web/materials/index.html` / `web/materials/materials.css`
  - 当時公開資料と令和6年再掲時整理資料を独立ページとして表示。
- 新規作成: `web/note/index.html` / `web/note/note.css`
  - 既存の写真照合・資料照会・最終メモ機能を調査ノートとして分離。
  - `web/app.js` は調査ノート側で継続利用。
- キャッシュ番号を `20260530-separated-sites` に更新。
- 確認: バンドルNodeで `photobook.js` と `app.js` の構文チェック成功。写真帖本体で調査/照会/G-4/B2-14等の文言検索ヒットなし。ローカルHTTPで写真帖、資料、調査ノート、各CSS/JSがHTTP 200。

## 2026-05-30 調査ノートのメッセージ型UI化
- ユーザー要望: ページを開いても何をしていいか分からないため、匿名人物から記者へ届く調査依頼として、特定文言を送ると次へ進むメッセージ式にする。
- 作業前バックアップ: `C:\Users\kogit\Documents\Codex\backups\mizumori-pre-chat-note-20260530`
- `web/note/index.html` は `chat.css` / `chat.js` を読む入口へ変更。旧UIのちらつき防止のため初期 `body hidden`、JS構築後に表示。
- 新規作成: `web/note/chat.css`
  - スマホのメッセージアプリ風UI。
- 新規作成: `web/note/chat.js`
  - 匿名提供者から記者への連絡ログとして進行。
  - 最初に「何をしてほしいか」が届き、資料ページ/写真帖へのリンクを出す。
  - `青帯`、`赤い帯`、`右矢印`、`17:30`、`泥跡`、`17:55`、`黄色い旗`、`長靴`、`黄色い鍵札`、`赤と緑`、`金属扉`、`G-4` などを送ると進行。
  - 誤答時は直前の資料と写真だけを見比べるよう促す。
  - 進行は `localStorage` 保存。
- 確認: バンドルNodeで `chat.js` 構文チェック成功。ローカルHTTPで `note/index.html`、`note/chat.js`、`note/chat.css` はHTTP 200。

## 次チャットの推奨開始手順
1. `git status --short` でクリーン確認。
2. 公開URLで水守町ページを開く。
3. 1枚目の写真で注記表示ON、注記対象押下、注記一覧への記録を確認。
4. 写真クリックまたは「拡大」で全画面ビューを開き、拡大/縮小/等倍/閉じるを確認。
5. 資料の `平成26年9月2日 広報みずもり臨時号` と `令和6年 再掲写真 校正メモA` を読み、第一照会に `赤い帯 / 右矢印 / 掲示板時計 / 泥跡` を入力し、第2章が表示されるか確認。
6. iPhone幅で写真一覧、写真詳細、資料、照会欄、拡大ビューが崩れないか確認。
