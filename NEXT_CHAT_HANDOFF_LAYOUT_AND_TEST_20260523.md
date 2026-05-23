# 引継ぎ 2026-05-23 メインページ崩れ修正と全謎解きテスト

## 対象
- `CrimsonClinicMystery/web/site.css`
- `CrimsonClinicMystery_BoothPackage/CrimsonClinicMystery_Booth_v1/web/site.css`
- `reports/mystery-clear-time-report-20260523.md`

## 変更内容
- CrimsonClinicMystery の入口HTMLが `entry-hero` / `request-card` / `case-link-card` 構造なのに、対応CSSが不足していたため、`CASE_ENTRY_LAYOUT_FIX_20260523` を追加。
- PCでは2カラム、スマホでは1カラムになる入口レイアウトを復旧。
- BoothPackage側にも同じCSSを同期。
- 全40件の謎解きを静的テストし、クリアまでのおおよその時間を `reports/mystery-clear-time-report-20260523.md` に出力。

## バックアップ
- `C:\Users\kogit\Documents\Codex\backups\layout-and-test-fix-20260523-231802`

## 検証
- 全40件のテスト結果: エラーなし。
- テスト内容:
  - 入口ページにあらすじがあること。
  - 問題カード、段階式フォーム、または20問メモフォームが存在すること。
  - 回答式は `site.js` の回答数と入力段階数が一致すること。
  - 内部リンク、画像、フォーム参照、ページ内アンカーが実在すること。
- CrimsonClinicMystery ブラウザ確認:
  - PC幅: `.entry-hero` と `.case-links` が grid、横スクロールなし、画像OK。
  - スマホ幅390px: 1カラム、横スクロールなし、タイトル28px、リンク6件表示。
- `git diff --check`: エラーなし。

## 補足
- クリア時間は実プレイのストップウォッチではなく、ページ数・問題数・照合作業量から算出した推定値。
- 詳細一覧は `reports/mystery-clear-time-report-20260523.md` を参照。
