# 引継ぎ 2026-05-22 謎解き再編成

## 実施内容

真相設計書案を採用し、各謎解きを同型の「誘導して退路を塞ぐ事件」から外した。入口、README、BOOTH_README、HINTS、SOLUTIONを新しいジャンルと真相に合わせて再編成。

## 更新方針

- 後味の悪さ案は保留。
- プレイヤー巻き込みや巨大アーカイブ構造は入れていない。
- 怖さは「資料の不気味さ」「記録の食い違い」「人間の隠蔽」「少し残る余韻」で表現。
- 各作品の真相ジャンルを分離。

## 更新対象

- CrimsonClinicMystery: 医療記録改竄
- AbyssalObservatoryMystery: 科学データ隠蔽
- AonagiDataCenterMystery: 内部告発ログ抹消
- GinreiDepartmentMystery: 閉店百貨店の架空売場
- HaikoKinenMystery: 閉校記念から消えた児童
- HakurouMuseumMystery: 民俗資料の由来偽装
- HoshigauraRailMystery: 記念史から外された駅
- KarasunoCableMystery: 山岳救助の記録改変
- KurobaraCinemaMystery: 封印された記録映像
- MisakiLighthouseMystery: 握り潰された救難信号
- MizukageDamMystery: 警報時刻の偽装
- NamikazeFerryMystery: 非公式寄港と消えた乗客
- ShiranuiOnsenMystery: 源泉権と再開発火災
- TokiwaBroadcastMystery: 放送事故にされた告発音声
- TsukishiroHotelMystery: 宿泊台帳の身元差し替え

## 未完了

- 各資料ページ本文の全面リライトは未実施。
- BOOTHパッケージ側への同期は未実施。
- 次は1作品ずつ、証拠20〜30個、ミスリード、段階ヒントを深掘りする。

## 追記 2026-05-22 タイトル改行ルール修正

- 各謎解き入口ページのタイトル末尾コード（例 `OBS-1118`, `CRN-1006`）を `<span class="case-code">` で包み、1単語として扱うように修正。
- 各 `web/site.css` に `TITLE_CODE_NOWRAP_20260522` を追加し、`.case-title .case-code { white-space: nowrap; display: inline-block; }` を指定。
- 代表ページでブラウザ確認済み。管理番号は `nowrap` として解釈されている。
- バックアップ: `C:\Users\kogit\Documents\Codex\backups\Origin-title-nowrap-20260522-012301`

## 追記 2026-05-22 公開入口ページのネタバレ削除

- 各謎解きの `web/index.html` から、真相・反転・ジャンル名・強いネタバレ語を削除。
- ヘッダーは `調査資料 / 管理番号` に統一。
- 添付資料リストは `公開資料`, `保存ログ`, `写真・掲示資料`, `関係者メモ`, `管理番号つき記録`, `調査ノート` に汎用化。
- 代表ページをブラウザ確認済み。強いネタバレ語が表示されないことを確認。
- バックアップ: `C:\Users\kogit\Documents\Codex\backups\Origin-remove-page-spoilers-20260522-014427`
