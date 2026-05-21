# 南谷小学校 閉校記念アーカイブ

廃校記念サイト風のWeb横断型モキュメンタリー謎解きです。

## 想定プレイ時間

2から3時間。

## 内容

南谷小学校の閉校記念アーカイブ、記念アルバム、図書室資料、PTA安全委員会記録、学校だより、卒業生留言板を横断し、平成18年度6年1組から消えた児童・相沢澪の記録を復元します。

サイト全体は、2000年代の学校・自治体サイト、古い掲示板、ガラケー時代の移植ページの雰囲気を再現しています。卒業生ブログは、当時の個人サイトらしくテーブル、中央寄せ、フォントタグ中心の素朴なHTML表現に寄せています。

## サイト構成

- `web/index.html`: 豪華なゲーム説明・導入ページ。唯一の総合入口
- `web/school/index.html`: 2000年代風の南谷小学校閉校記念資料室
- `web/school/map/`, `web/school/staff/`, `web/school/night-log/`, `web/school/lost/`: 校内図、職員室控え、夜間巡回控え、落とし物台帳
- `web/news/index.html`: 地方ニュース風の外部サイト
- `web/blog/index.html`: 卒業生ブログ風の外部サイト
- `web/mobile/index.html`: 当時のガラケー向け連絡網風サイト。CSSを使わずHTMLのみで再現
- `web/mobile/memo/`, `web/mobile/bbs/`, `web/mobile/rank/`, `web/mobile/mail/`, `web/mobile/photo/`: ガラケー内の通常サブページ
- `web/mobile/secret/`: 通常メニューに出ない隠しページ
- `web/investigate/index.html`: 15問構成の調査ノート

総合入口と調査ノートだけがプレイヤー用UIです。学校、新聞、ブログ、留言板、携帯ページなどの作中サイトには、調査ノートやゲーム入口へのメタリンクを置かない方針です。

追加資料ページ:

- `web/album/h16/` から `web/album/h19/`: 年度別アルバム資料
- `web/library/cards/`, `web/library/local/`, `web/library/case-c/`, `web/library/withdrawn/`, `web/library/mobile-log/`: 図書室の詳細資料
- `web/newsletter/200607/`, `web/newsletter/200609/`, `web/newsletter/200704/`: 学校だより各号
- `web/pta/2006/`, `web/pta/2007/`, `web/pta/2008/`: PTA年度別記録
- `web/board/memories/`, `web/board/search/`, `web/board/materials/`, `web/board/h18/`, `web/board/night/`: 留言板カテゴリ別ログ

## 追加ギミック

- 卒業生ブログにパスワード付き記事あり。
- パスワードのヒントはガラケー風ページ内に配置。
- ガラケー風ページには、子どもたちが作ったようなデコ文字、らくがき、隠しリンクを配置。
- ガラケー風ページは `link rel="stylesheet"` を使わず、HTML属性、テーブル、fontタグ、marqueeで構成。
- サイドメニューやボタン風リンクは、ローカルHTMLのリンク先を作成済み。
- `file:///` で開いてもフォルダ表示にならないよう、内部リンクは `index.html` を明示。
- 共通仕様は `C:\Users\kogit\Documents\Codex\MYSTERY_SITE_SPEC.md` に整理。
- 画像資料として `photo-rain-corridor.png`, `photo-classroom-roster.png`, `photo-display-case-c.png`, `photo-gym-stairs-rain.png` を追加。いずれもChatGPTで新規生成した画像を使用。
- 怖さは直接的な怪異ではなく、資料を横断すると「記録だけが先に処理されていた」ことが見えてくる構成に調整。

## 起動

```powershell
& "C:\Users\kogit\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" "C:\Users\kogit\Documents\Codex\HaikoKinenMystery\server.mjs"
```

入口:

`http://127.0.0.1:4381/web/`

## 答え

- 第1問: `相沢澪`
- 第2問: `28`
- 第3問: `27` または `H18_6-1_27names.jpg`
- 第4問: `2006年7月14日`
- 第5問: `C-0714`
- 第6問: `雨量観測ノート`
- 第7問: `旧体育館修繕写真`
- 第8問: `旧体育館東階段`
- 第9問: `橘修司`
- 第10問: `鳴瀬建設`
- 第11問: `黄色い傘`
- 第12問: `19:20`
- 第13問: `転出済`
- 第14問: `2006/07/15`
- 第15問: `橘修司が相沢澪を旧体育館東階段から突き落とした`

## 画像

画像素材はChatGPT生成です。スプライトシートは使用していません。
