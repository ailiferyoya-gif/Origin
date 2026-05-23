# 引継ぎ 2026-05-24 暁プラネタリウム公式サイト実在サイト寄せ

## 対象
- `AkatsukiPlanetariumMystery/web/official/index.html`
- `AkatsukiPlanetariumMystery/web/official/schedule.html`
- `AkatsukiPlanetariumMystery/web/official/programs.html`
- `AkatsukiPlanetariumMystery/web/official/tickets.html`
- `AkatsukiPlanetariumMystery/web/official/access.html`
- `AkatsukiPlanetariumMystery/web/official/news.html`
- `AkatsukiPlanetariumMystery/web/site.css`

## 参考にした実在サイトの方向性
- かわさき宙と緑の科学館: https://www.nature-kawasaki.jp/planetarium.html
- さいたま市宇宙劇場: https://www.ucyugekijo.jp/
- 山梨県立科学館プラネタリウム: https://www.kagakukan.pref.yamanashi.jp/theater/
- こむこむ館プラネタリウム: https://www.f-shinkoukousha.or.jp/comcom/planetarium/

## 変更点
- 文字化けしていた公式サイト下層ページを、すべて読みやすい日本語に再構成。
- 実在プラネタリウムサイトに多い「本日の投影」「番組案内」「チケット」「アクセス」「お知らせ」の構成へ整理。
- 公式トップに、本日の投影状況、ドーム情報、夜間投影の不穏な確認事項を追加。
- 下層ページに、投影タイムテーブル、番組説明、料金表、交通案内、お知らせ履歴を追加。
- 謎解き導線として、録音案内、座席番号、星図番号、夜間通用口などを自然に配置。
- `AKATSUKI_OFFICIAL_REFERENCE_20260524` CSSを追加し、プラネタリウムらしい暗色・星明かり系の公式サイトに調整。
- スマホ幅で表が崩れないよう、料金表と投影表をカード状表示に切り替えるCSSを追加。

## バックアップ
- `C:\Users\kogit\Documents\Codex\backups\akatsuki-official-reference-20260524`

## 確認済み
- `git diff --check`
- 公式5ページ内のローカルリンク解決確認
- ブラウザで以下を確認
  - `official/index.html`
  - `official/schedule.html`
  - `official/programs.html`
  - `official/tickets.html`
  - `official/access.html`
  - `official/news.html`
- 6ページすべてで文字化けなし、画像読み込みOK、デスクトップ幅の横はみ出しなし。

## 未完了・次にやること
- この方針で次の謎解き公式サイトへ進む。
- 候補: `AmagiriAirportMystery` は空港公式サイトを参考に、運航情報・フロア案内・落とし物・保安検査導線を作ると差別化しやすい。
- 以降も1件ずつ、実在サイトをWeb検索して種類に合わせた公式サイトと周辺ページを作り込む。
