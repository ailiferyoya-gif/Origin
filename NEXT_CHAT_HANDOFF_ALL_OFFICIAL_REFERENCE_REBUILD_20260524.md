# 引継ぎ 2026-05-24 全謎解き公式サイト再構成

## 対象
- `*Mystery/web/official/*.html` 全171ファイル
- `official-rebuild.js`
- 生成画像4点
  - `AmagiriAirportMystery/web/assets/official-hero-generated.png`
  - `ArakawaLibraryMystery/web/assets/official-hero-generated.png`
  - `CrimsonClinicMystery/web/assets/official-hero-generated.png`
  - `NamikazeFerryMystery/web/assets/official-hero-generated.png`

## バックアップ
- `C:\Users\kogit\Documents\Codex\backups\all-official-reference-20260524`

## 参考にした実在サイトの要素
- 空港: 運航情報、館内案内、アクセス、案内所、ターミナル導線
- 図書館: 開館時間、蔵書検索、イベント、利用案内、アクセス
- データセンター: サービス、設備仕様、セキュリティ、保守・障害情報
- フェリー: 運航状況、予約、空席照会、港・ターミナル案内、安全情報

参考URL:
- https://www.fukuoka-airport.jp/en/service/m-information-office.html
- https://www.fullertonlibrary.org/
- https://www.volico.com/
- https://www.seikan-ferry.co.jp/cat-status/status-normal/

## 変更点
- 文字化けや壊れた`title`が残っていた公式HTMLを、全て最小の正常HTMLシェルへ統一。
- `official-rebuild.js`を追加し、公式ページ表示時に各謎解きの施設種別に合わせた公式サイトへ再構成。
- 40件すべてに、業種別のナビ、トップ、下層相当ページ、更新履歴、不穏な調査導線を付与。
- 公式サイトのリンクは存在確認済みのページへ限定。
- 画像生成を使い、空港・図書館・診療所・フェリー向けのヒーロー画像を追加。
- スマホでも横はみ出ししないレスポンシブCSSを`official-rebuild.js`内で注入。

## 確認済み
- `git diff --check`
- 全40件の公式トップ表示確認
- 全40件の`?page=news`表示確認
- 計80ページで以下を確認
  - 再構成レイヤーが起動している
  - H1が表示されている
  - 文字化けなし
  - 画像読み込みエラーなし
  - 横はみ出しなし
- 関連リンク先として使う `web/index.html`、`web/investigate/index.html`、`web/official/index.html` は全件存在確認済み。

## 未完了・次にやること
- 最後のまとめチェックで、ユーザー視点で各公式サイトの印象を確認する。
- さらに販売レベルへ寄せる場合は、今回の共通再構成を土台に、1件ずつ専用下層ページと追加生成画像を増やす。
- 現状は「全件を壊れず見られる公式サイト品質に底上げ」した段階。
