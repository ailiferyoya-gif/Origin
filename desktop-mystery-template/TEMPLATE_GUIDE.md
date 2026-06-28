# 新作制作ガイド

## 1. 最初に変える場所

`desktop.js`

- `GAME.title`
- `GAME.saveKey`
- `talkMessages`
- `threads`
- `files`
- `searchDatabase`
- `renderNotes()` のチェックリストとヒント
- `handleDesktopEvent(type)` の分岐

`site/`

- `site/index.html`: 作品内WebサイトのHTML骨格
- `site/site.css`: 表向きサイトのデザイン
- `site/site.js`: 作品内Webサイトのルーティングと `postMessage`

## 2. 章構成の作り方

おすすめの分け方:

1. Browserで普通のサイトを見る
2. Talkに通知が来る
3. Filesに資料が増える
4. Searchが解放される
5. Browser内サイトの別ページへ戻る
6. Files/Search/Talkを照合する
7. 最終送信

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

## 4. 販売前チェック

- `start.html?reset=1` で初期化できる
- オフラインで開ける
- Console errorがない
- 画像・音声が404にならない
- 外部URLへ飛ばない
- localStorageに進行が保存される
- ヒントが答えを直接言いすぎない
- スマホ幅でも最低限操作できる
