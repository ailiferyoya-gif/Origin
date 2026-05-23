# 引継ぎ 2026-05-23 HakurouMuseumMystery 公式サイト完成対応

## 対象
- `HakurouMuseumMystery/web/official/`
- `HakurouMuseumMystery_BoothPackage/HakurouMuseumMystery_Booth_v1/web/official/`

## 変更内容
- 公式サイト内のリンクボタンが未実装に見えないよう、主要ページと補助ページを再整理。
- トップ、来館案内、展覧会、イベント、収蔵品検索、調査研究、最新情報を相互リンク化。
- 補助ページとして、資料館について、館内案内、閲覧利用、館内配置図、鍵台帳、限定公開記録を公式サイト調に統一。
- カレンダー、ニュース、収蔵品カテゴリ、研究注記、館内配置図などは実体ページまたは実体アンカーへ必ず遷移する構造に変更。
- `MSM-0817` は `nowrap` 指定で1単語として扱う。
- `site.css` に公式サイト完成用の補助スタイル `HAKUROU_OFFICIAL_COMPLETE_20260523` を追加。
- BoothPackage側へ同内容を同期済み。

## バックアップ
- `C:\Users\kogit\Documents\Codex\backups\HakurouMuseumMystery-official-complete-20260523-153905`
- 追加で、日時展開前のバックアップ名 `HakurouMuseumMystery-official-complete-20260523-$(Get-Date -Format HHmmss)` も作成されているが、実害なし。

## 検証
- 本体・BoothPackageの公式サイトHTMLを対象に、`href` / `action` / `src` とページ内アンカーを全件検証。
- 検証結果: 404件チェック、エラー0。
- ローカルHTTP表示 `http://127.0.0.1:8787/official/index.html` でブラウザ確認。
  - トップ: 33リンク、1フォーム、画像読み込みOK。
  - `館内配置図` リンクをクリックし、`/official/map/index.html` へ遷移確認。
- UTF-8文字化けパターン検索: 検出なし。
- `git diff --check`: エラーなし。

## 次にやること
- 必要であれば、公式サイト以外の検索・メール・掲示板側にも同じレベルの「全リンク実装済み」検証を広げる。
- 今回は画像追加生成なし。既存のChatGPT生成画像のみ使用。
