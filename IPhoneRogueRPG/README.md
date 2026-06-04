# 奈落の継承者

iPhoneのSafariで遊ぶ縦画面ダークファンタジー・ローグライクRPGです。

## 遊び方

`Start-IPhonePreview.ps1` を起動し、表示されたURLをブラウザで開きます。

- 敵を倒すと `EXP`、`G`、ランダム装備が手に入ります。
- 通常敵は50種。弱い敵から強い敵まで、階層が深くなるほど出現帯が進みます。
- 10Fごとにボスが出現します。
- 敵は画像・色味・明るさ・サイズを変えたビジュアル設定を持ちます。
- 準備画面で出発、味方キャラ解放、恒久ステータス強化ができます。
- 味方キャラは専用のChatGPT生成透過PNGを使用します。敵画像との被りはありません。
- 味方キャラは灰で解放でき、梅・竹・松のランクがあります。
- 解放に必要な灰は高めですが、その分キャラごとのHP/MP/攻撃/防御/会心/吸血補正が強力です。
- 恒久強化はキャラごとに独立しています。選択中のキャラだけが強化されます。
- ゲームオーバー時には恒久強化画面を出さず、準備画面に戻って強化します。
- 装備は `武器`、`防具`、`護符` の3部位です。
- 装備ステータスは完全ランダムで、プラス補正もマイナス補正も出ます。
- ドロップ装備には現在装備との差分比較が表示されます。
- レア度が高いほど強い補正が出やすく、売却額も上がります。
- 深い階層ほど高レア装備が出やすくなりますが、敵も強くなります。
- 死亡すると `深淵の灰` を獲得し、恒久強化を購入できます。
- 恒久強化は次回以降の挑戦に引き継がれます。
- 画面切替で `準備`、`戦闘`、`図鑑`、`目標` を確認できます。
- 拠点では最高到達階層、討伐数、ボス討伐数、累計ゴールドなどを確認できます。
- 図鑑では遭遇・討伐した敵が記録されます。
- 目標では達成報酬として灰やゴールドを受け取れます。

## コマンド

- 攻撃: MPを使わない基本攻撃。会心と吸血が乗ります。
- 魂火: MPを6消費して大ダメージ。
- 防御: 次の被ダメージを減らし、MPを5回復。
- 黒薬: HP回復。初期所持は2個。

## 素材ルール

画像素材はChatGPTで生成した元絵を使用し、クロマキー除去で透過PNGにしています。
スプライトシートは使わず、個別画像として配置しています。

- `assets/dark-hero.png`
- `assets/allies/heir.png`
- `assets/allies/blood-knight.png`
- `assets/allies/ash-witch.png`
- `assets/allies/grave-hunter.png`
- `assets/allies/iron-nun.png`
- `assets/allies/cursed-prince.png`
- `assets/abyss-hound.png`
- `assets/ember-beast.png`
- `assets/frost-wraith.png`
- `assets/grave-lich.png`
- `assets/cursed-loot.png`

元絵は `assets/raw/` に残しています。

## 開発確認

`dev-smoke-test.mjs` は簡易確認用です。

- 攻撃で敵HPが減る
- 敵撃破後に戦利品パネルへ切り替わる
- 準備画面が表示され、味方キャラ一覧が描画される
- 味方専用画像6点がRGBA透過PNGとして存在する
- 敵ビジュアル設定が通常敵 + ボスぶん存在する
- 拠点、図鑑、目標画面が描画される

## SE

Webから取得したKenneyのRPG Audioを使用しています。

- 出典: `50 RPG sound effects` by Kenney / Kenney.nl
- 配布ページ: https://opengameart.org/content/50-rpg-sound-effects
- 公式ページ: https://kenney.nl/assets/rpg-audio
- ライセンス: Creative Commons CC0
- ライセンス文: `assets/audio/KENNEY_RPG_AUDIO_LICENSE.txt`

割り当て:

- `attack.ogg`: 攻撃
- `skill.ogg`: 魂火
- `guard.ogg`: 防御
- `potion.ogg`: 黒薬
- `hit.ogg`: 被弾
- `victory.ogg`: 勝利
- `equip.ogg`: 装備
- `sell.ogg`: 売却
- `death.ogg`: 死亡
