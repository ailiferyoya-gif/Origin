# 仮想デスクトップ型Web謎テンプレート

`yumemino-desktop` を元に、新作へ流用しやすいよう固定シナリオを抜いたテンプレートです。

公開サンプル:

```txt
https://ailiferyoya-gif.github.io/Origin/desktop-mystery-template/start.html?reset=1
```

## 使い方

1. このフォルダをコピーして作品名へ変更する。
2. `desktop.js` 冒頭の `GAME`, `talkMessages`, `files`, `searchDatabase` を作品内容へ差し替える。
3. Browser内に表示される通常サイトは `site/` を編集する。
4. SNS風サイトは `social/` を編集する。
5. iframe内サイトから `postDesktopEvent(...)` を送ると、親デスクトップ側の状態が変化する。
6. `start.html?reset=1` でlocalStorageを初期化して確認する。

## 含まれるもの

- 現代OS風の下部タスクバーUI
- アプリウィンドウ
- Browser iframe
- Browser内で開く架空SNS風サイト `social/`
- Talk風チャットUI
- Files
- Search
- Notes
- localStorageセーブ
- `postMessage`連動
- セーブ初期化
- オフライン完結

## 主要イベント

`site/site.js` や `social/social.js` から親へ送るイベント:

```js
postDesktopEvent("TEMPLATE_CONTACT_REQUEST");
postDesktopEvent("TEMPLATE_STAGE_UNLOCKED");
postDesktopEvent("TEMPLATE_FINAL_SUBMITTED");
postDesktopEvent("TEMPLATE_SOCIAL_CLUE");
```

`desktop.js` 側では `handleDesktopEvent(type)` に処理を追加してください。

## 制作時の注意

- 答えをTalkやNotesで直接言いすぎない。
- ヒントは段階式にする。
- 重要情報はBrowser、Talk、Files、Search、Socialの2つ以上を照合させる。
- 画像や音声は `assets/` 配下の相対パスで読む。
- 外部API、外部CDN、実在サービス名に依存しない。
- ZIP販売する場合は `start.html` を開くだけで動く状態を維持する。
