(function () {
  const rootMatch = location.pathname.match(/\/([^/]+Mystery)\/web\/official\//);
  if (!rootMatch) return;

  const shared = {
    airport: {
      nav: [['運航情報', 'status'], ['館内案内', 'guide'], ['交通アクセス', 'access'], ['駐車場', 'parking'], ['お知らせ', 'news']],
      words: ['本日の運航', '旅客ターミナル', '保安検査', '搭乗口', '落とし物'],
      sections: ['到着・出発時刻', 'フロアマップ', '保安検査場', '交通アクセス'],
      official: '地方空港公式サイト',
      lead: '霧の多い沿岸部を結ぶ小さな空の玄関口です。運航情報、館内施設、アクセス、駐車場を確認できます。'
    },
    data: {
      nav: [['サービス', 'service'], ['設備仕様', 'facility'], ['セキュリティ', 'security'], ['障害情報', 'status'], ['お知らせ', 'news']],
      words: ['稼働状況', 'ラック管理', '入退館記録', '監視ログ', '保守窓口'],
      sections: ['サービス概要', '電源・空調', '入退館管理', '障害・保守情報'],
      official: 'データセンター公式サイト',
      lead: '法人向けコロケーションと監視運用を行う施設です。設備仕様、保守情報、入退館案内を公開しています。'
    },
    library: {
      nav: [['開館時間', 'hours'], ['蔵書検索', 'catalog'], ['催し物', 'events'], ['利用案内', 'guide'], ['お知らせ', 'news']],
      words: ['本日の開館', '蔵書検索', '閲覧室', '郷土資料', '返却ポスト'],
      sections: ['開館カレンダー', '資料検索', 'イベント案内', '利用登録'],
      official: '図書館公式サイト',
      lead: '地域資料と一般書を所蔵する公共図書館です。開館時間、蔵書、催し物、利用案内を確認できます。'
    },
    clinic: {
      nav: [['診療案内', 'departments'], ['予約', 'reserve'], ['検査案内', 'exam'], ['アクセス', 'access'], ['お知らせ', 'news']],
      words: ['本日の受付', '診療科目', '予約確認', '検査室', 'カルテ窓口'],
      sections: ['外来受付', '診療科目', '検査案内', 'アクセス'],
      official: '診療所公式サイト',
      lead: '地域に根ざした小規模診療所です。診療時間、予約、検査案内、アクセスを掲載しています。'
    },
    museum: {
      nav: [['展覧会', 'exhibitions'], ['所蔵品', 'collection'], ['利用案内', 'guide'], ['アクセス', 'access'], ['お知らせ', 'news']],
      words: ['本日の展示', '常設展', '収蔵庫', '修復記録', '音声ガイド'],
      sections: ['開催中の展示', '所蔵品案内', '観覧券', 'アクセス'],
      official: '文化施設公式サイト',
      lead: '収蔵品と企画展示を通じて地域の記憶を伝える施設です。展示、観覧券、アクセスを確認できます。'
    },
    theater: {
      nav: [['公演情報', 'shows'], ['チケット', 'tickets'], ['座席表', 'seats'], ['アクセス', 'access'], ['お知らせ', 'news']],
      words: ['本日の公演', '上演時間', '座席表', '舞台袖', '予約番号'],
      sections: ['公演スケジュール', 'チケット', '座席案内', 'アクセス'],
      official: '劇場・映画館公式サイト',
      lead: '地域の舞台芸術と上映を支える小劇場です。公演情報、チケット、座席表、アクセスを案内します。'
    },
    transit: {
      nav: [['運行情報', 'service'], ['時刻表', 'timetable'], ['路線案内', 'route'], ['乗り場', 'access'], ['お知らせ', 'news']],
      words: ['運行状況', '時刻表', '乗り場案内', '忘れ物', '臨時便'],
      sections: ['本日の運行', '時刻表', '乗り場案内', '運賃'],
      official: '交通機関公式サイト',
      lead: '地域の移動を支える公共交通機関です。運行状況、時刻表、乗り場、忘れ物案内を確認できます。'
    },
    public: {
      nav: [['手続き', 'services'], ['施設案内', 'facility'], ['広報', 'newsroom'], ['アクセス', 'access'], ['お知らせ', 'news']],
      words: ['窓口案内', '申請書', '会議室', '広報掲示', '受付番号'],
      sections: ['窓口時間', '手続き案内', '施設利用', 'アクセス'],
      official: '公共施設公式サイト',
      lead: '地域の手続きと生活情報を扱う公共施設です。窓口、施設利用、広報、アクセスを掲載しています。'
    },
    resort: {
      nav: [['宿泊', 'stay'], ['温浴', 'bath'], ['食事', 'dining'], ['アクセス', 'access'], ['お知らせ', 'news']],
      words: ['本日の営業', '客室', '予約照会', '館内図', '忘れ物'],
      sections: ['宿泊案内', '館内施設', '食事', 'アクセス'],
      official: '宿泊・観光施設公式サイト',
      lead: '海や山に面した滞在施設です。宿泊、館内施設、食事、アクセス、営業案内を確認できます。'
    },
    industry: {
      nav: [['事業案内', 'service'], ['施設概要', 'facility'], ['見学', 'tour'], ['安全情報', 'safety'], ['お知らせ', 'news']],
      words: ['稼働状況', '施設概要', '見学受付', '安全掲示', '保守記録'],
      sections: ['事業案内', '施設概要', '見学案内', '安全情報'],
      official: '産業施設公式サイト',
      lead: '地域のインフラや生産を担う施設です。事業内容、見学、安全情報、保守のお知らせを掲載しています。'
    }
  };

  const sites = {
    AbyssalObservatoryMystery: ['深淵天文台', 'OBS-0930', 'museum', 'hero-observatory.png', '海霧の向こうで、星は一度だけ記録を失う。', '観測ログ、公開講座、ドーム見学の案内を掲出する天文台公式サイトです。古い観測値と現行ログの差が、静かに残されています。'],
    AkatsukiPlanetariumMystery: ['暁プラネタリウム', 'PLN-0427', 'museum', 'hero.png', '夜明け前の星を、街の真ん中で。', '全天周ドームの投影案内、番組情報、チケット、アクセスを整理した公式サイトです。'],
    AmagiriAirportMystery: ['雨霧地方空港', 'AIR-0716', 'airport', 'official-hero-generated.png', '霧の街と海を結ぶ、小さな空の玄関口。', '本日の運航、館内導線、駐車場、忘れ物案内をまとめた地方空港公式サイトです。'],
    AonagiDataCenterMystery: ['青凪データセンター', 'DTC-0509', 'data', 'hero.png', '止まらない光の中で、ひとつの記録だけが沈黙する。', '設備仕様、入退館、保守障害情報を公開する法人向けデータセンターサイトです。'],
    ArakawaLibraryMystery: ['荒川市立図書館', 'LIB-1124', 'library', 'official-hero-generated.png', '閉架書庫の奥で、返却されない一冊が待っている。', '蔵書検索、開館時間、郷土資料、イベントを掲載する公共図書館サイトです。'],
    BenitsuruTheaterMystery: ['紅鶴劇場', 'THR-0315', 'theater', 'hero.png', '幕が下りたあとも、席番号だけが残っている。', '公演情報、チケット、座席表、アクセスを案内する劇場公式サイトです。'],
    CrimsonClinicMystery: ['紅坂診療所', 'MED-0904', 'clinic', 'official-hero-generated.png', '受付簿の余白に、消された名前がある。', '診療時間、予約、検査案内、アクセスを掲載する地域診療所サイトです。'],
    FuyumoriSanatoriumMystery: ['冬森療養所', 'SAN-0202', 'clinic', 'hero.png', '雪の静けさが、退院記録を覆っている。', '療養棟、面会、外来受付、検査案内を掲載する医療施設サイトです。'],
    GinreiDepartmentMystery: ['銀鈴百貨店', 'DEP-1220', 'public', 'hero-department.png', '閉店後の売場で、売上票だけが鳴る。', 'フロア案内、催事、営業時間、落とし物を掲載する百貨店公式サイトです。'],
    GlassGardenMystery: ['硝子庭園', 'GRD-0611', 'museum', 'hero.png', '温室の光が、割れた記録を反射する。', '展示温室、植物案内、イベント、入園案内を掲載する庭園サイトです。'],
    HaikoKinenMystery: ['廃校記念館', 'SCH-0818', 'museum', 'school-hero.png', '黒板に残った日直名は、卒業名簿にない。', '校舎見学、展示室、資料閲覧、アクセスを掲載する記念館サイトです。'],
    HakurouMuseumMystery: ['白楼美術館', 'ART-1103', 'museum', 'hero.png', '白い展示室で、消えた絵だけが目撃される。', '展覧会、所蔵品、観覧券、アクセスを掲載する美術館サイトです。'],
    HisuiAquariumMystery: ['翡翠水族館', 'AQU-0728', 'museum', 'hero.png', '水槽の底で、光るタグが揺れている。', '展示生物、ショー、チケット、アクセスを案内する水族館サイトです。'],
    HoshigauraRailMystery: ['星が浦鉄道', 'RAIL-0707', 'transit', 'rail-hero.png', '終電のあと、存在しない停車駅が点灯する。', '運行情報、時刻表、駅案内、忘れ物を掲載する鉄道公式サイトです。'],
    IkarugaArchiveMystery: ['斑鳩アーカイブ', 'ARC-0401', 'library', 'hero.png', '保存庫の索引は、誰かの記憶を避けて並ぶ。', '資料検索、閲覧予約、収蔵案内、研究利用を掲載するアーカイブサイトです。'],
    KagetsuMonasteryMystery: ['花月修道院', 'MON-0512', 'museum', 'hero.png', '祈りの時刻表に、一度だけ鳴らない鐘がある。', '拝観案内、資料室、行事予定、アクセスを掲載する修道院サイトです。'],
    KarasunoCableMystery: ['烏野ケーブル', 'CAB-1010', 'transit', 'hero.png', '山頂駅の改札に、戻らない切符が残る。', '運行状況、時刻表、山頂施設、アクセスを掲載するケーブルカーサイトです。'],
    KisaragiPostOfficeMystery: ['如月郵便局', 'POST-0229', 'public', 'hero.png', '配達されない封筒が、消印だけを増やしていく。', '窓口時間、取扱サービス、配達案内、アクセスを掲載する郵便局サイトです。'],
    KohakuFactoryMystery: ['琥珀工場', 'FAC-0919', 'industry', 'hero.png', '停止したラインに、検査印だけが新しい。', '製造工程、見学、安全情報、稼働状況を掲載する工場サイトです。'],
    KomorebiZooMystery: ['木漏日動物園', 'ZOO-0505', 'museum', 'hero.png', '閉園後の園内放送が、いない獣舎を呼ぶ。', '展示動物、イベント、チケット、アクセスを掲載する動物園サイトです。'],
    KurobaraCinemaMystery: ['黒薔薇シネマ', 'CIN-1213', 'theater', 'hero.png', '上映後のスクリーンに、次回予告だけが残る。', '上映スケジュール、座席、チケット、アクセスを掲載する映画館サイトです。'],
    KuroganeMineMystery: ['黒鉄鉱山', 'MIN-0606', 'industry', 'hero.png', '坑道の奥で、閉鎖された番号が呼吸している。', '見学坑道、安全情報、資料室、アクセスを掲載する鉱山施設サイトです。'],
    MadokaMallMystery: ['円香モール', 'MAL-0321', 'public', 'hero.png', '閉店案内のあと、案内板だけが更新される。', 'ショップ、イベント、フロア案内、アクセスを掲載する商業施設サイトです。'],
    MisakiLighthouseMystery: ['岬灯台', 'LGT-0117', 'museum', 'hero-lighthouse.png', '灯りは回る。記録だけが一周遅れる。', '参観案内、灯台資料、周辺案内、アクセスを掲載する灯台サイトです。'],
    MizukageDamMystery: ['水影ダム', 'DAM-0820', 'industry', 'hero.png', '水位計の針が、雨の降らない夜に動いた。', '放流情報、見学、管理所、周辺案内を掲載するダム公式サイトです。'],
    NamikazeFerryMystery: ['波風フェリー', 'FER-0414', 'transit', 'official-hero-generated.png', '霧の桟橋で、乗船名簿がひとり分ずれる。', '運航情報、乗船券、港案内、欠航情報を掲載するフェリー公式サイトです。'],
    NanairoStudioMystery: ['七彩スタジオ', 'STD-0717', 'theater', 'hero.png', '収録ランプは消えたのに、音声だけが残っている。', '番組制作、スタジオ利用、収録案内、アクセスを掲載するスタジオサイトです。'],
    OboroShrineMystery: ['朧神社', 'SHR-0101', 'museum', 'hero.png', '奉納帳の一行が、夜ごと薄くなる。', '参拝案内、祭事、授与所、アクセスを掲載する神社公式サイトです。'],
    RuriIslandMystery: ['瑠璃島観光協会', 'ISL-0808', 'resort', 'hero.png', '島内図に、潮が満ちると現れる道がある。', '観光案内、宿泊、交通、イベントを掲載する島の観光サイトです。'],
    SakurabaUniversityMystery: ['桜庭大学', 'UNI-0404', 'public', 'hero.png', '閉鎖棟の掲示板に、明日の講義が貼られている。', '学部案内、キャンパス、図書館、入試情報を掲載する大学サイトです。'],
    SeiranWindFarmMystery: ['青嵐風力発電所', 'WND-0303', 'industry', 'hero.png', '風が止んだ夜、発電ログだけが回っている。', '発電状況、見学、安全情報、設備概要を掲載する風力発電所サイトです。'],
    ShigureBookstoreMystery: ['時雨書店', 'BKS-1019', 'library', 'hero.png', '棚卸しの日、存在しない初版本が売れた。', '新刊、イベント、在庫検索、店舗案内を掲載する書店サイトです。'],
    ShirahamaResortMystery: ['白浜リゾート', 'RES-0720', 'resort', 'hero.png', '海の見える部屋で、予約履歴だけが消えていく。', '宿泊、レストラン、アクティビティ、アクセスを掲載するリゾートサイトです。'],
    ShiranuiOnsenMystery: ['不知火温泉', 'ONS-1126', 'resort', 'hero.png', '湯けむりの向こうで、鍵札が一枚余る。', '温浴、宿泊、食事、送迎案内を掲載する温泉旅館サイトです。'],
    SuginamiTownHallMystery: ['杉並町役場', 'THL-0330', 'public', 'hero.png', '夜間窓口の受付票が、閉庁後に増えている。', '窓口、手続き、広報、防災情報を掲載する町役場サイトです。'],
    SuzukazeRadioTowerMystery: ['鈴風電波塔', 'RAD-0909', 'industry', 'hero.png', '無音の周波数に、古い呼出符号が混じる。', '施設概要、保守、見学、安全情報を掲載する電波塔サイトです。'],
    TokiwaBroadcastMystery: ['常盤放送', 'BRC-0601', 'theater', 'hero.png', '生放送の沈黙に、録音済みの声が重なる。', '番組表、スタジオ、観覧募集、ニュースを掲載する放送局サイトです。'],
    ToyonamiMarketMystery: ['豊波市場', 'MKT-0420', 'public', 'hero.png', '競り場の番号札が、夜明け前に入れ替わる。', '営業日、店舗、競り見学、アクセスを掲載する市場公式サイトです。'],
    TsukishiroHotelMystery: ['月白ホテル', 'HTL-1224', 'resort', 'hero.png', '空室表に、誰も泊まれない部屋が灯る。', '宿泊、客室、レストラン、アクセスを掲載するホテル公式サイトです。'],
    YomikiriNewspaperMystery: ['読切新聞社', 'NWS-1111', 'public', 'hero.png', '朝刊の片隅に、まだ起きていない事件が載る。', 'ニュース、購読、社内見学、読者窓口を掲載する新聞社サイトです。']
  };

  const data = sites[rootMatch[1]];
  if (!data) return;

  const [name, code, type, hero, headline, lead] = data;
  const base = shared[type] || shared.public;
  const params = new URLSearchParams(location.search);
  const page = params.get('page') || pageFromPath(location.pathname) || 'home';
  const image = `../assets/${hero}`;

  document.title = `${pageTitle(page, base)} | ${name}`;
  document.documentElement.lang = 'ja';
  document.body.className = `official-rebuilt official-${type}`;
  document.body.style.setProperty('--official-accent', accentFor(type));
  document.body.innerHTML = render();

  function pageFromPath(path) {
    const file = path.split('/').pop().replace('.html', '');
    if (!file || file === 'index') return 'home';
    if (['schedule', 'guide', 'access', 'parking', 'news', 'programs', 'tickets'].includes(file)) return file;
    return 'home';
  }
  function href(slug) { return slug === 'home' ? './index.html' : `./index.html?page=${slug}`; }
  function pageTitle(slug, cfg) {
    if (slug === 'home') return '公式サイト';
    const found = cfg.nav.find(([, s]) => s === slug);
    return found ? found[0] : '案内';
  }
  function accentFor(t) {
    return {airport:'#73b7c9',data:'#78d8b2',library:'#d8b75f',clinic:'#d96767',museum:'#d8b75f',theater:'#c97bd8',transit:'#76b7e5',public:'#9bc46a',resort:'#82cfbf',industry:'#e0a65f'}[t] || '#d8b75f';
  }
  function render() {
    const nav = base.nav.map(([label, slug]) => `<a href="${href(slug)}">${label}</a>`).join('');
    return `<header class="rebuilt-header"><a class="rebuilt-logo" href="../index.html"><span>${base.official}</span><strong>${name}</strong></a><nav>${nav}</nav></header><main class="rebuilt-main">${page === 'home' ? home() : detail(page)}</main>`;
  }
  function home() {
    return `<section class="rebuilt-hero"><img src="${image}" onerror="this.style.display='none'" alt="${name}の公式ビジュアル"><div class="rebuilt-copy"><p class="rebuilt-kicker">${base.official} / <span class="case-code">${code}</span></p><h1>${headline}</h1><p>${lead || base.lead}</p><div class="rebuilt-actions"><a class="primary" href="${href(base.nav[0][1])}">${base.nav[0][0]}を見る</a><a href="${href(base.nav[1][1])}">${base.nav[1][0]}へ</a></div></div></section>${status()}<section class="rebuilt-grid">${base.sections.map((s, i) => `<a class="rebuilt-card" href="${href(base.nav[i % base.nav.length][1])}"><span>0${i + 1}</span><h2>${s}</h2><p>${name}の${s}に関する最新情報を掲載しています。古い検索結果と異なる場合はこのページを優先してください。</p></a>`).join('')}</section>${news()}${related()}`;
  }
  function status() {
    return `<section class="rebuilt-status"><span>${base.words[0]}</span><p>${base.words.slice(1, 4).join('、')}を更新しました。最終更新 06:18 05:26。記録の一部は確認中として扱われています。</p></section>`;
  }
  function detail(slug) {
    const title = pageTitle(slug, base);
    const rows = [
      ['01', title, `${name}の${title}に関する公式情報です。受付時間、利用条件、変更履歴を確認できます。`],
      ['02', base.words[2], `${base.words[2]}の記録は当日分を優先して表示します。照合が必要な資料は受付で確認してください。`],
      ['03', base.words[3], `${base.words[3]}に関する古い控えが残る場合があります。更新日時と資料番号を見比べてください。`],
      ['04', base.words[4], `${base.words[4]}の問い合わせは、閉館後の記録と翌朝の記録で表記が異なる場合があります。`]
    ];
    return `<section class="rebuilt-page-head"><div><p class="rebuilt-kicker">${title.toUpperCase()} / <span class="case-code">${code}</span></p><h1>${title}</h1><p>${lead || base.lead}</p></div><img src="${image}" onerror="this.style.display='none'" alt="${name}の公式ビジュアル"></section><section class="rebuilt-list">${rows.map(([n, h, p]) => `<article><span>${n}</span><h2>${h}</h2><p>${p}</p></article>`).join('')}</section>${timeline()}${related()}`;
  }
  function timeline() {
    return `<section class="rebuilt-timeline"><h2>更新履歴</h2><table><tbody><tr><th>06/18 05:26</th><td>${base.words[0]}を更新しました。</td></tr><tr><th>06/18 05:18</th><td>${base.words[2]}の一部表記を修正しました。</td></tr><tr><th>06/17 21:40</th><td>${base.words[3]}に確認中の注記を追加しました。</td></tr></tbody></table></section>`;
  }
  function news() {
    return `<section class="rebuilt-news"><div><p class="rebuilt-kicker">OFFICIAL NOTICE</p><h2>お知らせ</h2></div><ul><li><time>06/18 05:26</time><a href="${href('news')}">${base.words[0]}を更新しました</a></li><li><time>06/18 05:18</time><a href="${href(base.nav[0][1])}">${base.words[2]}の一部表記を修正しました</a></li><li><time>06/17 21:40</time><a href="${href(base.nav[1][1])}">${base.words[3]}に資料を追加しました</a></li></ul></section>`;
  }
  function related() {
    return `<nav class="rebuilt-related"><a href="../index.html">謎解き入口</a><a href="./index.html">公式トップ</a><a href="../investigate/index.html">調査を開始</a></nav>`;
  }

  const css = document.createElement('style');
  css.textContent = `
    :root{color-scheme:dark}.official-rebuilt{margin:0;background:radial-gradient(circle at 12% 0,color-mix(in srgb,var(--official-accent) 20%,transparent),transparent 30%),linear-gradient(135deg,#071018,#05070b 74%);color:#f7f3ec;font-family:"Yu Gothic","Hiragino Sans",Meiryo,sans-serif;line-height:1.75;letter-spacing:0}.official-rebuilt *{box-sizing:border-box}.official-rebuilt a{color:inherit}.rebuilt-header{position:sticky;top:0;z-index:10;width:min(1180px,calc(100% - 32px));margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:18px;padding:15px 0;background:rgba(5,8,12,.82);backdrop-filter:blur(14px);border-bottom:1px solid rgba(255,255,255,.12)}.rebuilt-logo{text-decoration:none;display:grid;line-height:1.16}.rebuilt-logo span,.rebuilt-kicker,.rebuilt-card span,.rebuilt-list span,.rebuilt-news time{color:var(--official-accent);font-size:.76rem;font-weight:900;letter-spacing:.12em}.rebuilt-logo strong{font-size:1.04rem}.rebuilt-header nav,.rebuilt-actions,.rebuilt-related{display:flex;flex-wrap:wrap;gap:10px}.rebuilt-header nav a,.rebuilt-actions a,.rebuilt-related a{border:1px solid rgba(255,255,255,.18);border-radius:8px;padding:8px 12px;text-decoration:none;background:rgba(255,255,255,.045);font-weight:800;font-size:.9rem}.rebuilt-main{width:min(1180px,calc(100% - 32px));margin:0 auto 56px}.rebuilt-hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(320px,.45fr);min-height:520px;border:1px solid rgba(255,255,255,.14);border-radius:8px;overflow:hidden;background:rgba(255,255,255,.045);box-shadow:0 26px 80px rgba(0,0,0,.35)}.rebuilt-hero img,.rebuilt-page-head img{width:100%;height:100%;object-fit:cover}.rebuilt-copy{align-self:end;padding:clamp(22px,5vw,54px);background:linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,.48))}.rebuilt-hero h1{font-size:clamp(2rem,3.4vw,3.5rem);line-height:1.14;margin:.1em 0 .35em;max-width:19ch;letter-spacing:0}.rebuilt-copy p,.rebuilt-page-head p,.rebuilt-card p,.rebuilt-list p{color:#e8dfd1}.rebuilt-actions .primary{background:var(--official-accent);color:#111;border-color:transparent}.rebuilt-status{display:grid;grid-template-columns:170px minmax(0,1fr);gap:16px;align-items:center;margin:18px 0;padding:14px 18px;border:1px solid color-mix(in srgb,var(--official-accent) 45%,transparent);border-radius:8px;background:color-mix(in srgb,var(--official-accent) 12%,transparent)}.rebuilt-status p{margin:0}.rebuilt-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;margin-top:24px}.rebuilt-card,.rebuilt-news,.rebuilt-page-head,.rebuilt-list article,.rebuilt-timeline{border:1px solid rgba(255,255,255,.14);border-radius:8px;background:linear-gradient(180deg,rgba(255,255,255,.065),rgba(255,255,255,.025));padding:18px;text-decoration:none}.rebuilt-card h2,.rebuilt-list h2,.rebuilt-timeline h2{margin:.35em 0;font-size:1.26rem}.rebuilt-news{margin-top:24px;display:grid;grid-template-columns:240px minmax(0,1fr);gap:18px}.rebuilt-news h2{margin:.15em 0;font-size:2rem}.rebuilt-news ul{list-style:none;margin:0;padding:0;display:grid;gap:8px}.rebuilt-news li{display:grid;grid-template-columns:112px minmax(0,1fr);gap:12px;border-top:1px solid rgba(255,255,255,.1);padding-top:8px}.rebuilt-page-head{display:grid;grid-template-columns:minmax(0,1fr) 320px;gap:18px;margin-top:0}.rebuilt-page-head h1{font-size:clamp(1.9rem,3.8vw,3.5rem);line-height:1.1;margin:.1em 0 .25em}.rebuilt-page-head img{min-height:240px;border-radius:8px}.rebuilt-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin-top:18px}.rebuilt-timeline{margin-top:18px}.rebuilt-timeline table{width:100%;border-collapse:collapse}.rebuilt-timeline th,.rebuilt-timeline td{border-top:1px solid rgba(255,255,255,.12);padding:10px;text-align:left;vertical-align:top}.rebuilt-timeline th{width:140px;color:var(--official-accent)}.rebuilt-related{margin-top:24px}@media(max-width:840px){.rebuilt-header{position:static;align-items:flex-start;flex-direction:column}.rebuilt-hero,.rebuilt-status,.rebuilt-grid,.rebuilt-news,.rebuilt-page-head,.rebuilt-list{grid-template-columns:1fr}.rebuilt-hero{min-height:auto}.rebuilt-hero img{min-height:260px}.rebuilt-copy{padding:24px}.rebuilt-hero h1{font-size:clamp(1.8rem,8vw,2.8rem)}.rebuilt-header nav a,.rebuilt-actions a,.rebuilt-related a{width:100%;text-align:center}.rebuilt-news li{grid-template-columns:1fr}.rebuilt-timeline th,.rebuilt-timeline td{display:block;width:auto;padding:8px 0}}`;
  document.head.appendChild(css);
}());
