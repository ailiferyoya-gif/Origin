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
