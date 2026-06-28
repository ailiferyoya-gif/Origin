# 仮想デスクトップ型Web謎テンプレート

`yumemino-desktop` を元に、新作へ流用しやすいよう固有シナリオを抜いたテンプレートです。

## 使い方

1. このフォルダをコピーして作品名に変更します。
2. `desktop.js` 冒頭の `GAME`、`talkMessages`、`files`、`searchDatabase` を作品内容へ差し替えます。
3. Browser内に表示する通常サイトは `site/` を編集します。
4. `site/site.js` から `postDesktopEvent(...)` を送ると、親デスクトップの状態が変わります。
5. `start.html?reset=1` でlocalStorageを初期化して確認できます。

## 含まれるもの

- 現代OS風の下部タスクバーUI
- アプリウィンドウ
- Browser iframe
- Talk風チャットUI
- Files
- Search
- Notes
- localStorageセーブ
- `postMessage` 連動
- セーブ初期化
- オフライン完結

## 主要イベント

`site/site.js` から親へ送るイベント:

```js
postDesktopEvent("TEMPLATE_CONTACT_REQUEST");
postDesktopEvent("TEMPLATE_STAGE_UNLOCKED");
postDesktopEvent("TEMPLATE_FINAL_SUBMITTED");
```

`desktop.js` 側では `handleDesktopEvent(type)` に処理を追加してください。

## 制作時の注意

- 答えをTalkやNotesで直接言いすぎない
- ヒントは段階式にする
- 重要情報はBrowser、Talk、Files、Searchの2つ以上を照合させる
- 画像や音声は `assets/` 配下の相対パスで読む
- 外部API、外部CDN、実在サービス名に依存しない
- ZIP販売する場合は `start.html` を開くだけで動く状態を維持する

## 公開確認

GitHub Pagesへ置く場合は、以下のようなURLになります。

```txt
https://ailiferyoya-gif.github.io/Origin/desktop-mystery-template/start.html?reset=1
```
