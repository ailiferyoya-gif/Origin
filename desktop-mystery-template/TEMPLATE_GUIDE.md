# 新作制作ガイド

## 1. 最初に変える場所

`desktop.js`

- `GAME.title`
- `GAME.saveKey`
- `GAME.browserTargets`
- `talkMessages`
- `threads`
- `files`
- `searchDatabase`
- `renderNotes()` のチェックリストとヒント
- `handleDesktopEvent(type)` の分岐

`site/`

- `site/index.html`: 作品内WebサイトのHTML骨格
- `site/site.css`: 作品サイトのデザイン
- `site/site.js`: 作品サイトのルーティングと `postMessage`

`social/`

- `social/index.html`: 架空SNS、掲示板、削除済み投稿アーカイブなどのHTML骨格
- `social/social.css`: SNS風サイトのデザイン
- `social/social.js`: 投稿確認やキャッシュ閲覧の `postMessage`

## 2. 章構成の作り方

おすすめの分け方:

1. Browserで普通のサイトを見る
2. Talkに通知が来る
3. Filesに資料が増える
4. Searchが解放される
5. Socialで投稿や削除済みログを確認する
6. Browser内サイトの別ページへ戻る
7. Files / Search / Talk / Socialを照合する
8. 最終送信

## 3. データ追加例

Filesにファイルを追加:

```js
files.downloads.push({
  id: "sample",
  name: "sample.txt",
  unlock: state => state.searchUnlocked,
  body: "本文"
});
```

Search結果を追加:

```js
searchDatabase.push({
  id: "sample-result",
  q: ["検索語"],
  title: "結果タイトル",
  body: "概要",
  action: "file:downloads:sample",
  gated: state => state.searchUnlocked
});
```

Talkメッセージを追加:

```js
talkMessages["sample-1"] = {
  thread: "system",
  from: "System",
  body: "メッセージ本文",
  time: "now"
};
addUnique("messageIds", "sample-1");
```

BrowserでSNS風サイトを開く:

```js
openBrowser("social", "/");
```

## 4. 販売前チェック

- `start.html?reset=1` で初期化できる
- オフラインで開ける
- Console errorがない
- 画像や音声が404にならない
- 外部URLへ飛ばない
- localStorageに進行が保存される
- Browserウィンドウを右上の×で閉じられる
- ヒントが答えを直接言いすぎない
- スマホ幅でも最低限操作できる
