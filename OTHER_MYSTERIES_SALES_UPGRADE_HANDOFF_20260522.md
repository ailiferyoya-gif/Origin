# 引継ぎ 2026-05-22 他謎解き販売レベル入口更新

## 実施内容
CrimsonClinicMysteryで行った「匿名依頼が届いた導線」「何をすべきか分かる入口」「ネタバレを避ける管理番号型タイトル」の方針を、他の謎解きへ反映しました。

## 更新対象
- AbyssalObservatoryMystery: 黒潮海底観測所 OBS-1118
- AonagiDataCenterMystery: 青凪データセンター DTC-0914
- GinreiDepartmentMystery: 銀嶺百貨店 GIN-1224
- HaikoKinenMystery: 南谷小学校 H18年度記録
- HakurouMuseumMystery: 白楼民俗資料館 MSM-0817
- HoshigauraRailMystery: 星ヶ浦鉄道 90周年資料 HSR-90
- KarasunoCableMystery: 烏野ケーブル CBL-0209
- KurobaraCinemaMystery: 黒薔薇シネマ CNM-1231
- MisakiLighthouseMystery: 潮見岬灯台資料館 KIRI-1012
- MizukageDamMystery: 水影ダム DAM-0728
- NamikazeFerryMystery: 波風フェリー FRY-0621
- ShiranuiOnsenMystery: 不知火温泉 ONS-0303
- TokiwaBroadcastMystery: 常盤放送 BCS-0412
- TsukishiroHotelMystery: 月白ホテル HTL-1102

## 変更点
- 各 `web/index.html` を、未整理アーカイブ受信・届いた依頼・調査方針・添付資料リンクが分かる入口に変更。
- 各作品の題材に合わせて別々の調査導線に調整。
- `README.md`, `BOOTH_README.md`, `HINTS.md`, `SOLUTION.md` を整備。
- 24問型作品は `web/investigate/index.html` と `web/site.js` をUTF-8の日本語へ更新し、最終回答は必要要素を含めば受理されるように変更。
- 特殊構造の HaikoKinenMystery / HoshigauraRailMystery / MisakiLighthouseMystery は既存の深い資料構造を尊重し、入口・販売説明・ヒント・解答資料を中心に更新。

## 未完了事項
- 画像素材の新規生成は今回なし。既存画像を継続利用。
- 各資料ページ本文の全面リライトは未実施。次回は作品ごとに資料本文・謎の密度・ミスリードを増やす。

## 次にやること
1. 1作品ずつ資料ページ本文を販売版の密度に上げる。
2. スマホ実機相当で各リンクと調査ノートを確認する。
3. BOOTHパッケージ側へ必要ファイルを同期する。
