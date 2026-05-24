# 不知火温泉 給湯棟記録事件 引継ぎ

2026-05-18 作成。

## 完了

- 上級編として8系統の作中サイトを作成。
- メインページと照合ノートは豪華レイアウトで統一。
- 検索、メール、管理画面で段階的にページへ到達する構造。
- ブログは作中年代に合わせたデザイン説明と日常記事を追加。
- ChatGPT生成画像をassetsへ配置。
- Booth用フォルダを作成。ZIPは未作成。

## 未完了

- 実プレイで難易度と所要時間を確認。
- 必要ならヒントPDF、解答PDF、導入PDFを作成。

## 2026-05-18 追加

- 携帯風ページ5ページを追加。CSSなし、隠しリンクあり。
- 写真保管ページ3ページと補助台帳4ページを追加。
- 各作品32HTMLページ構成に拡張。


## 2026-05-19 凝った作中サイト最低1つルール反映

- 開始ページの作品タイトルに wbr を追加し、改行ルールを強化。
- 開始ページに start-page クラスを付与し、タイトル/導入/ボタンの word-break を keep-all にした。
- 公式系サイトを複数ページ構成のスタイリッシュな作中サイトへ刷新。

- Booth用フォルダ側にも反映。
# 2026-05-24 公式サイト再構成

- ユーザー指示: `KarasunoCableMystery` をロックして「すべて」の対象から外し、`ShiranuiOnsenMystery` の公式サイト完成に取り掛かる。
- 除外対応: `COMPLETED_SITE_EXCLUSIONS_20260524.md` に `KarasunoCableMystery` を追加。
- バックアップ: `C:\Users\kogit\Documents\Codex\backups\shiranui-onsen-official-20260524`
- 参考方向: 高級温泉旅館/温泉公式サイトの、写真主体・余白・温泉/客室/料理/館内/安全/お知らせ導線。
- 新規生成画像:
  - `web/assets/shiranui-hero-onsen-20260524.png`
  - `web/assets/shiranui-bath-20260524.png`
  - `web/assets/shiranui-room-dining-20260524.png`
  - `web/assets/shiranui-lobby-20260524.png`
  - `web/assets/shiranui-access-20260524.png`
  - `web/assets/shiranui-safety-20260524.png`
  - `web/assets/shiranui-keys-20260524.png`
  - `web/assets/shiranui-notice-20260524.png`
  - `web/assets/shiranui-yuamado-20260524.png`
- 変更内容: `web/official/index.html` と下層6ページを `official-rebuild.js` 依存や旧簡易レイアウトから静的HTMLへ再構成。`official.css` をShiranui専用の温泉旅館デザインへ全面差し替え。

## 2026-05-24 公式サイト 独自性・改行ルール修正

- ユーザー指摘: 大文字ラベル＋大きな画像の構成が他サイトと被りやすく、改行ルールも甘い。
- バックアップ: `C:\Users\kogit\Documents\Codex\backups\shiranui-onsen-uniqueness-linebreak-20260524`
- 変更内容:
  - 公式サイト全ページの英字大文字ラベルを日本語の湯宿・掲示・帳場系ラベルへ変更。
  - トップページの見せ方を「大画像＋巨大コピー」から、湯札・宿帳・館内掲示を思わせる余白中心の構成へ調整。
  - 見出しサイズを一段抑え、PC表示でも文字が強くなりすぎないよう調整。
  - `ONS-0417` などのコードは `.case-code` で nowrap を維持し、日本語見出しは自然に折り返すようCSSルールを分離。
  - 枠で囲うカード感を減らし、罫線・余白・縦ラベル中心の温泉旅館風レイアウトへ変更。
- 確認:
  - 公式7ページで画像切れなし。
  - 公式7ページで横スクロールなし。
  - 公式7ページで英字大文字ラベルパターンなし。
  - `ONS-0417` の改行禁止を確認。
  - トップページ内リンク7件がすべてHTTP 200。
- 未完了事項:
  - 実機スマホでの最終目視確認は未実施。
- 次にやること:
  - ユーザー確認後、必要なら温泉サイト内の謎解き導線や不穏な記録要素をさらに濃くする。
