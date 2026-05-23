# 謎解きギミック設計表
作成日: 2026-05-24

## 目的

現在の謎解き群は「資料を読み、矛盾を探し、時系列を整理し、真相を答える」方向に寄りやすい。販売レベルへ近づけるため、各作品に以下の3層を割り当てる。

- 主役ギミック: その作品の記憶に残る中心体験。
- 補助ギミック: 中盤の調査に変化を出す仕掛け。
- 最終問ギミック: 最後に「集めた情報の使い方」が変わる仕掛け。

同じ形式の問題が続かないよう、入力、検索、画像、音、図面、SNS、ログ、暗号、物理資料風の操作を分散させる。

## 全体ルール

- 各作品に最低1つ、その作品固有の操作を入れる。
- 公式サイト、検索画面、メール、掲示板、管理画面、ニュースなどの既存ページを横断させる。
- 正解入力だけに頼らず、URL、画像、音声、表、地図、フォーム、更新履歴、404ページ、alt風情報を使う。
- 最終問は単なる単語入力ではなく、証拠の組み合わせ方を変える。
- スマホでも操作できるよう、ドラッグ必須や細かすぎる文字読みは避ける。

## ギミック配分表

| 謎解き | 主役ギミック | 補助ギミック | 最終問ギミック | 実装時の追加先 |
|---|---|---|---|---|
| AbyssalObservatoryMystery | 観測ログの異常値を星図に重ねる | 深海センサー値の周期から欠測時刻を読む | 星座名ではなく、欠けた観測点を線で結ぶと隠し語になる | official / admin / search |
| AkatsukiPlanetariumMystery | 投影スケジュールを星座盤として読む | チケット座席番号を星座の位置に変換 | 上映順を逆に並べると、犯人が見ていた空が分かる | official / ticket / news |
| AmagiriAirportMystery | 搭乗ゲート変更履歴を動線パズルにする | 手荷物タグの3文字コードを空港コードとして検索 | 到着便ではなく、未搭乗者の荷物だけを追う | official / search / mail |
| AonagiDataCenterMystery | サーバーラック図と障害ログを照合する | IP末尾をラック位置に変換 | 停電ではなく、人為的に抜かれた1本の経路を特定 | admin / logs / board |
| ArakawaLibraryMystery | 請求記号で本棚を移動する | 返却日スタンプを時系列キーにする | 本文ではなく、借りられなかった本の並びで真相を読む | official / catalog / search |
| BenitsuruTheaterMystery | 座席表と舞台袖の出入りを重ねる | 台本のト書きと実際の上演時刻を比較 | 客席から見えない位置にいた人物だけが残る | official / ticket / backstage |
| CrimsonClinicMystery | カルテ番号と改訂履歴を差分比較する | 処方コードを薬剤名ではなく診療室番号に戻す | 改竄された語ではなく、改竄されなかった欄を読む | official / medical / admin |
| FuyumoriSanatoriumMystery | 病室配置図と夜間巡回表を照合する | ナースコールの鳴動間隔を暗号キーにする | 退院記録の空白から存在しない患者を割り出す | official / mail / ward |
| GinreiDepartmentMystery | フロア案内とレシート時刻で移動経路を作る | 商品JAN風番号を売場番号へ変換 | 購入者ではなく、返品処理をした人物を追う | official / search / admin |
| GlassGardenMystery | 温室の開花時刻を時計盤として読む | 植物ラベルの学名頭文字で順番を作る | 咲いていない花の位置だけを読む | official / gallery / board |
| HaikoKinenMystery | 工場動線図と古い注意看板を重ねる | 錆びた番号札を工程順に並べる | 稼働していない機械音の出所を突き止める | official / photos / archive |
| HakurouMuseumMystery | 展示番号と館内導線を使う展示室パズル | キャプション改訂履歴から消えた説明を拾う | 本物の展示物ではなく、説明文だけが入れ替わった展示を特定 | official / collection / news |
| HisuiAquariumMystery | 水槽配置と給餌時刻を回遊ルートにする | 飼育日誌の魚名を水槽番号へ変換 | 映像に映らない水槽の反射から人物を特定 | official / diary / camera |
| HoshigauraRailMystery | 時刻表とホーム番号を使った乗継パズル | 遅延証明の分数を停車駅に変換 | 乗った列車ではなく、乗れなかった列車でアリバイを崩す | official / timetable / search |
| IkarugaArchiveMystery | 資料番号を古文書の綴じ順に戻す | 欠番資料を検索結果の空白として扱う | 読む資料ではなく、抜かれたページの位置で真相が出る | official / archive / search |
| KagetsuMonasteryMystery | 鐘の鳴る回数を一日の祈祷順に変換 | 修道院の窓配置を文字盤にする | 懺悔録の伏字を、祈祷順ではなく沈黙の時間で読む | official / diary / chapel |
| KarasunoCableMystery | ケーブル局の番組表を周波数表として読む | 途切れた字幕の文字数でチャンネルを指定 | 放送内容ではなく、放送されなかった枠を答える | official / broadcast / admin |
| KisaragiPostOfficeMystery | 消印時刻と配達区分で郵便ルートを復元 | 郵便番号を地図上の区画に戻す | 届いた手紙ではなく、差し戻された封筒が真相になる | official / mail / search |
| KohakuFactoryMystery | 生産ラインの工程表を分岐迷路にする | ロット番号を材料棚の位置に変換 | 不良品ではなく、検査を通過した異物を探す | official / factory / logs |
| KomorebiZooMystery | 飼育エリア図と足跡写真を照合する | 動物名の分類順を檻番号に変える | 逃げた動物ではなく、檻に戻された順番を読む | official / map / photos |
| KurobaraCinemaMystery | 上映フィルムのコマ番号を暗号キーにする | ポスターの上映時間と実際の本編尺を比較 | エンドロールの欠落した名前で犯行役割を特定 | official / poster / archive |
| KuroganeMineMystery | 坑道図を高低差付き迷路として解く | ガス濃度ログの警告色を順番キーにする | 崩落地点ではなく、音が届く坑道だけを残す | official / map / logs |
| MadokaMallMystery | テナント配置とクーポン利用順で巡回する | レシート末尾番号を店舗カテゴリに変換 | 閉店後も点灯していた店舗だけを読む | official / floor / search |
| MisakiLighthouseMystery | 灯台の点滅間隔をモールス風に読む | 航路図と霧笛の回数を重ねる | 見えた光ではなく、見えなかった方向を答える | official / weather / board |
| MizukageDamMystery | 水位グラフを時系列ではなく断面図として読む | 放流ゲート番号を管理棟の部屋番号に変換 | 放流記録の余白で、手動操作された瞬間を特定 | official / admin / logs |
| NamikazeFerryMystery | 船内図と乗船券番号で客室移動を追う | 潮位表を出航可能時間のフィルタにする | 船に乗った人物ではなく、降りなかった人物を残す | official / ticket / weather |
| NanairoStudioMystery | 撮影カット番号を編集タイムラインに並べる | カラーチャートを文字変換表にする | 完成映像ではなく、削除カットの順番で真相を読む | official / gallery / edit |
| OboroShrineMystery | 絵馬の配置を方角盤として読む | 祝詞の繰り返し語を参道の段数に変換 | 願い事ではなく、裏返された絵馬だけを読む | official / shrine / board |
| RuriIslandMystery | 島内地図と潮の満ち引きで移動可能範囲を変える | 民宿の宿帳を船便時刻と照合 | 島に来た人ではなく、島から出られなかった人を答える | official / map / ferry |
| SakurabaUniversityMystery | 教室割と講義履修表で居場所を絞る | 学籍番号を学部棟と席番号に分解 | 出席者ではなく、代返できた人物を特定 | official / campus / mail |
| SeiranWindFarmMystery | 風車の回転方向を方角暗号にする | 発電量グラフの谷を点検順に読む | 止まった風車ではなく、止められなかった風車が鍵 | official / logs / map |
| ShigureBookstoreMystery | 棚番号と帯コメントを使った本探し | レシートの購入順をページ番号に変換 | 売れた本ではなく、取り置き棚に残った本を読む | official / catalog / receipt |
| ShirahamaResortMystery | 客室カードキー履歴と施設利用時刻を照合 | プールロッカー番号を館内図に戻す | チェックアウト記録ではなく、未返却キーが真相になる | official / reservation / admin |
| ShiranuiOnsenMystery | 湯屋の男女入替時刻で入れる場所が変わる | 下足札番号を脱衣所ロッカーに変換 | 見た証言ではなく、見られなかった視界で絞る | official / guest / board |
| SuginamiTownHallMystery | 役所の窓口番号を申請ルートとして読む | 受付票の呼出番号を部署順に変換 | 公開文書ではなく、差し替え前の決裁欄を読む | official / forms / archive |
| SuzukazeRadioTowerMystery | 周波数と時報のズレを音声パズルにする | 番組表の空白枠を座標に変換 | 聞こえた声ではなく、混線した局を特定 | official / program / audio |
| TokiwaBroadcastMystery | 生放送台本と実際のテロップを差分比較 | CMコードをスポンサー順に並べる | 誤報ではなく、訂正されなかった一文を読む | official / news / archive |
| ToyonamiMarketMystery | 市場の競り順と伝票番号で品物を追う | 店舗印のかすれを売場配置に対応させる | 盗まれた品ではなく、相場を操作した品を答える | official / market / board |
| TsukishiroHotelMystery | 客室階とエレベーターログを立体動線にする | ルームサービス伝票を部屋番号ではなく階層順に読む | 宿泊客ではなく、客室に入れたスタッフ権限を特定 | official / reservation / admin |
| YomikiriNewspaperMystery | 紙面レイアウトの段組みを暗号表にする | 訂正文と初版記事の差分を拾う | 書かれた記事ではなく、掲載されなかった見出しを復元 | official / archive / search |

## 実装優先度

| 優先 | 対象 | 理由 |
|---:|---|---|
| 1 | CrimsonClinicMystery / HakurouMuseumMystery / HoshigauraRailMystery | 既に作り込み済み、世界観が明確でギミック差別化しやすい |
| 2 | AkatsukiPlanetariumMystery / AmagiriAirportMystery / KurobaraCinemaMystery / TsukishiroHotelMystery | 公式サイト以外の画面と相性がよく、販売ページ映えしやすい |
| 3 | AonagiDataCenterMystery / MizukageDamMystery / SuzukazeRadioTowerMystery / TokiwaBroadcastMystery | ログ、音声、管理画面などWebならではの仕掛けを入れやすい |
| 4 | 残り全作品 | 主役ギミックを1つずつ実装し、補助と最終問は段階的に追加 |

## 次の作業案

1. まず `CrimsonClinicMystery` にカルテ差分、処方コード、未改竄欄読みの3層を実装する。
2. 次に `HakurouMuseumMystery` に展示導線、キャプション改訂履歴、説明文入れ替わりを追加する。
3. 以降はこの設計表をもとに、1作品ずつ公式サイト、検索、メール、掲示板、管理画面へ専用ギミックを実装する。
4. 各作品の実装後に、問題文、ヒント、正解入力、解説を更新する。
