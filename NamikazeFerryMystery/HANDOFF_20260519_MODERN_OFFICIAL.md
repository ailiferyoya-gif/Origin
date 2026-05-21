# 波風フェリー公式サイト再刷新 引継ぎ

## 作業日
2026-05-19

## バックアップ
- `C:\Users\kogit\Documents\Codex\_backups\NamikazeFerryMystery_modern_official_pre_20260519_072428`
- `C:\Users\kogit\Documents\Codex\_backups\NamikazeFerryMystery_BoothPackage_modern_official_pre_20260519_072428`

## 変更点
- `web/official/index.html` を、実在するフェリー会社公式サイトのトップとして成立する内容へ再構成。
- `web/official/about/index.html`、`facility/index.html`、`safety/index.html` の文字化けを解消し、航路案内、船内設備、安全運航の下層ページとして作り直した。
- 「表向きは公式サイト」「作中」「謎解き説明」に見える文言を削除。
- 謎に必要な情報は、FRY-0621、旧第二桟橋、01:42、02:18、予備乗船券、潮位ログCなどを、公式の運航訂正・安全案内・設備案内として自然に混ぜた。
- `web/official/official.css` を追加し、波風フェリー専用の現代的なデザインにした。
- 海図グリッド、画像スライド、運航状況カード、航路ライン、チケット風情報帯を使用。
- 開始ページから公式サイトへ入る導線は維持。
- Booth版にも同じ変更を反映済み。

## 今後の注意
- 波風フェリー公式サイトでは、メタな言い回しを使わない。
- 公式サイトはあくまで会社の通常案内として読める文章にし、手がかりは運航情報、訂正情報、設備注意、時刻表の中へ混ぜる。
- 追加ページを作る場合も、`official.css` を読み込み、同じ公式サイト内のトーンを保つ。

## 2026-05-19 ヒーロー画像と海色の調整
- 作業前バックアップ:
  - `C:\Users\kogit\Documents\Codex\_backups\NamikazeFerryMystery_ocean_hero_pre_20260519_073554`
  - `C:\Users\kogit\Documents\Codex\_backups\NamikazeFerryMystery_BoothPackage_ocean_hero_pre_20260519_073554`
- 公式サイト専用CSSを調整し、ヒーロー画像をより大きく表示。
- サイト全体の色を砂色寄りから海っぽい青緑、淡い水色、泡色へ変更。
- 「港から港へ。海の時間でつながる。」の見出しフォントを、日本語で読みやすい太めのゴシック系へ変更。
- 中段画像、船内設備ページの写真も大きく見えるように調整。
- Booth版にも同じCSSを反映済み。
