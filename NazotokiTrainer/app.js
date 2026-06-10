const STORAGE_KEY = "nazotoki-trainer-v2";

const skills = [
  {
    id: "cipher",
    name: "暗号",
    icon: "lock-keyhole",
    color: "var(--teal)",
    desc: "暗号や置き換えの法則を見抜く力",
    drill: "シーザー暗号 Lv.3",
    mastery: 0,
    unlocked: true,
  },
  {
    id: "pattern",
    name: "法則発見",
    icon: "search",
    color: "var(--teal)",
    desc: "数列やパターンから法則を見つける力",
    drill: "数列の規則性 Lv.4",
    mastery: 0,
    unlocked: true,
  },
  {
    id: "word",
    name: "言葉遊び",
    icon: "message-circle",
    color: "var(--amber)",
    desc: "言葉の意味や構造をひらめく力",
    drill: "ダジャレの謎 Lv.2",
    mastery: 0,
    unlocked: true,
  },
  {
    id: "number",
    name: "数字推理",
    icon: "calculator",
    color: "var(--teal)",
    desc: "数字の関係から答えを導く力",
    drill: "魔方陣 Lv.3",
    mastery: 0,
    unlocked: true,
  },
  {
    id: "observe",
    name: "観察力",
    icon: "eye",
    color: "var(--gray)",
    desc: "図や文章から違いを見つける力",
    drill: "間違い探し Lv.2",
    mastery: 0,
    unlocked: true,
  },
  {
    id: "language",
    name: "言語推理",
    icon: "lock",
    color: "var(--gray)",
    desc: "文の構造や関係を読み解く力",
    drill: "準備中",
    mastery: 0,
    unlocked: false,
  },
];

const questions = [
  {
    skill: "cipher",
    level: 3,
    text: "次の暗号「QEB NRFZH YOLTK CLU GRJMP」に対応する日本語は？",
    answers: ["すばやい茶色の狐", "すばやいちゃいろのきつね"],
    hint: "英語の有名な文を、アルファベット3文字ぶん戻す暗号です。",
    explanation: "QEBを3文字戻すとTHEになります。全体は THE QUICK BROWN FOX JUMPS なので、日本語では「すばやい茶色の狐」が近い答えです。",
    tags: ["シーザー暗号", "英字変換"],
  },
  {
    skill: "pattern",
    level: 4,
    text: "2, 3, 5, 8, 13, 21, ? に入る数字は？",
    answers: ["34", "３４"],
    hint: "直前の2つの数字を足すと次の数字になります。",
    explanation: "5=2+3、8=3+5、13=5+8、21=8+13です。次は13+21で34です。",
    tags: ["数列", "フィボナッチ"],
  },
  {
    skill: "word",
    level: 2,
    text: "「朝」はあるのに「夜」はない。「雨」はあるのに「雪」はない。共通点は？",
    answers: ["あで始まる", "読みがあで始まる", "読みがあから始まる"],
    hint: "漢字ではなく、読み方に注目します。",
    explanation: "朝は「あさ」、雨は「あめ」です。読みが「あ」で始まる言葉だけが「ある」側に入っています。",
    tags: ["読み", "言葉"],
  },
  {
    skill: "number",
    level: 3,
    text: "1=5, 2=10, 3=15, 4=20 なら、5=?",
    answers: ["25", "２５"],
    hint: "左の数を5倍しています。",
    explanation: "1×5=5、2×5=10、3×5=15、4×5=20。したがって5×5=25です。",
    tags: ["対応表", "倍率"],
  },
  {
    skill: "observe",
    level: 2,
    text: "「ナゾトキ」「ナゾドキ」「ナゾトキ」違っているものは何番目？",
    answers: ["2", "２", "二番目", "2番目"],
    hint: "中央の語だけ、3文字目の濁点が違います。",
    explanation: "2番目だけ「ト」ではなく「ド」になっています。短い文字列でも濁点差を拾う観察力の練習です。",
    tags: ["文字観察", "違い探し"],
  },
  {
    skill: "cipher",
    level: 2,
    text: "「いろは」の次を1文字ずつ進めた暗号で「うれに」と書かれた。元の言葉は？",
    answers: ["いろは"],
    hint: "暗号文の各文字を1つ前に戻します。",
    explanation: "「い→う」「ろ→れ」「は→に」のように1つ進めたものだと考え、逆に戻すと「いろは」です。",
    tags: ["かな暗号", "逆算"],
  },
  {
    skill: "pattern",
    level: 3,
    text: "月, 火, 水, 木, ? に入る漢字は？",
    answers: ["金", "きん"],
    hint: "曜日の並びです。",
    explanation: "月曜、火曜、水曜、木曜の次は金曜です。",
    tags: ["順序", "曜日"],
  },
  {
    skill: "word",
    level: 3,
    text: "「たぬき」から「た」を抜くと何になる？",
    answers: ["ぬき"],
    hint: "問題文の指示をそのまま処理します。",
    explanation: "「たぬき」から文字の「た」を抜くので「ぬき」です。言葉の表面操作を疑わず実行する練習です。",
    tags: ["文字操作", "指示読み"],
  },
  {
    skill: "number",
    level: 2,
    text: "3, 6, 12, 24, ? に入る数字は？",
    answers: ["48", "４８"],
    hint: "前の数字を2倍しています。",
    explanation: "3から始まり、6、12、24と毎回2倍になっています。次は48です。",
    tags: ["数列", "倍数"],
  },
  {
    skill: "observe",
    level: 3,
    text: "「ABCDE」「ABCDF」「ABCDE」違っているものは何番目？",
    answers: ["2", "２", "二番目", "2番目"],
    hint: "最後の文字だけを比べます。",
    explanation: "2番目だけ末尾がEではなくFです。端の文字を見落とさない観察問題です。",
    tags: ["文字観察", "端の確認"],
  },
  {
    skill: "cipher",
    level: 2,
    text: "A=1, B=2, C=3 の暗号で「3-1-20」は何を表す？",
    answers: ["cat", "CAT", "ねこ", "猫"],
    hint: "数字をアルファベットの順番に戻します。",
    explanation: "3=C、1=A、20=TなのでCATです。日本語なら「猫」です。",
    tags: ["対応表", "英字変換"],
  },
  {
    skill: "pattern",
    level: 2,
    text: "赤, 青, 赤, 青, 赤, ? に入る色は？",
    answers: ["青", "あお"],
    hint: "2つの色が交互に並んでいます。",
    explanation: "赤と青が交互に出ています。赤の次は青です。",
    tags: ["交互", "並び"],
  },
  {
    skill: "word",
    level: 4,
    text: "「時計」は時間を示す。「温度計」は温度を示す。「雨量計」は何を示す？",
    answers: ["雨量", "雨の量", "あめの量"],
    hint: "言葉の後ろにある「計」は、何かを測る道具を表します。",
    explanation: "雨量計は雨の量を測る道具です。複合語を分解すると答えが見えます。",
    tags: ["複合語", "意味分解"],
  },
  {
    skill: "number",
    level: 4,
    text: "□ + 3 = 10、□ × 2 = 14。□に入る数字は？",
    answers: ["7", "７"],
    hint: "2つ目の式だけで決まります。",
    explanation: "□×2=14なので□=7です。1つ目の式でも7+3=10になり、両方の条件を満たします。",
    tags: ["条件整理", "方程式"],
  },
  {
    skill: "observe",
    level: 2,
    text: "「口」「日」「目」のうち、横線が2本ある漢字は？",
    answers: ["目", "め"],
    hint: "中の横線の本数を数えます。",
    explanation: "目は外枠に加えて中の横線が2本あります。形の細部に注目する問題です。",
    tags: ["図形観察", "漢字"],
  },
  {
    skill: "cipher",
    level: 4,
    text: "「右左右左」を R/L で表すと？",
    answers: ["RLRL", "rlrl"],
    hint: "右はRight、左はLeftです。",
    explanation: "右=R、左=Lに置き換えるとRLRLです。",
    tags: ["置き換え", "英字"],
  },
  {
    skill: "pattern",
    level: 5,
    text: "1, 4, 9, 16, 25, ? に入る数字は？",
    answers: ["36", "３６"],
    hint: "1×1、2×2、3×3と考えます。",
    explanation: "平方数の並びです。1, 4, 9, 16, 25の次は6×6で36です。",
    tags: ["平方数", "数列"],
  },
  {
    skill: "word",
    level: 2,
    text: "「かきくけこ」から「き」を抜くと？",
    answers: ["かくけこ"],
    hint: "指定された1文字だけを消します。",
    explanation: "「かきくけこ」から「き」を消すので「かくけこ」です。",
    tags: ["文字操作", "指示読み"],
  },
  {
    skill: "number",
    level: 3,
    text: "10を半分にして、さらに半分にすると？",
    answers: ["2.5", "２.５", "2.5個", "2.5になる"],
    hint: "10 ÷ 2 ÷ 2 です。",
    explanation: "10の半分は5、5の半分は2.5です。段階を分けて処理します。",
    tags: ["割合", "段階処理"],
  },
  {
    skill: "observe",
    level: 4,
    text: "「未」「末」違いはどこ？",
    answers: ["上の横線", "横線の長さ", "上と下の横線の長さ", "上の線"],
    hint: "2本の横線の長さを比べます。",
    explanation: "未は上の横線が短く、末は上の横線が長い漢字です。似た形の差を見る練習です。",
    tags: ["漢字", "細部比較"],
  },
];

questions.length = 0;
try {
  questions.push(...buildVariedQuestionBank());
} catch (error) {
  questions.push(...buildSafeFallbackQuestionBank());
}

function buildVariedQuestionBank() {
  const curated = buildCuratedQuestionSet();
  const generated = [
    ...buildCipherQuestions(),
    ...buildPatternQuestions(),
    ...buildWordQuestions(),
    ...buildNumberQuestions(),
    ...buildObserveQuestions(),
  ];

  const merged = [];
  skills.forEach((skill) => {
    if (!skill.unlocked) return [];
    const seen = new Set();
    const selected = [...curated, ...generated]
      .filter((question) => question.skill === skill.id)
      .filter((question) => {
        if (seen.has(question.text)) return false;
        seen.add(question.text);
        return true;
      })
      .slice(0, 100);
    merged.push(...selected);
  });

  return interleaveByType(merged);
}

function buildSafeFallbackQuestionBank() {
  return [
    {
      skill: "cipher",
      level: 4,
      text: "A=1, B=2, C=3。K-A-G-I を数字に直すと最初の数字は？",
      answers: ["11", "１１"],
      hint: "Kがアルファベットの何番目かを見ます。",
      explanation: "Kは11番目です。暗号の対応表を落ち着いて確認する練習です。",
      tags: ["対応表", "英字変換"],
    },
    {
      skill: "pattern",
      level: 4,
      text: "2, 5, 10, 17, 26, ?。増え方は+3,+5,+7,+9。次は？",
      answers: ["37", "３７"],
      hint: "次の増分は+11です。",
      explanation: "26+11=37です。増分に注目すると解けます。",
      tags: ["階差", "数列"],
    },
    {
      skill: "word",
      level: 4,
      text: "「入口」の反対として自然な言葉は？",
      answers: ["出口", "でぐち"],
      hint: "漢字の形ではなく意味の対を考えます。",
      explanation: "入口の反対は出口です。意味関係を読む問題です。",
      tags: ["反対語", "意味"],
    },
    {
      skill: "number",
      level: 4,
      text: "赤=2点、青=3点、黄=5点。赤青黄の合計は？",
      answers: ["10", "１０"],
      hint: "色を点数に置き換えて足します。",
      explanation: "2+3+5=10です。",
      tags: ["対応表", "合計"],
    },
    {
      skill: "observe",
      level: 4,
      text: "1: NORTH / 2: N0RTH / 3: NORTH。数字の0が混ざっているのは何番目？",
      answers: ["2", "２", "2番目"],
      hint: "Oと0の形の違いを見ます。",
      explanation: "2番目だけOではなく数字の0です。",
      tags: ["Oと0", "細部"],
    },
  ];
}

function buildCuratedQuestionSet() {
  return [
    ...buildInsightHardQuestionSet(),
    ...buildNazokenStyleQuestionSet(),
    ...buildPracticalQuestionSet(),
    ...curatedCipherQuestions(),
    ...curatedPatternQuestions(),
    ...curatedWordQuestions(),
    ...curatedNumberQuestions(),
    ...curatedObserveQuestions(),
  ];
}

function buildInsightHardQuestionSet() {
  return [
    {
      skill: "observe",
      level: 6,
      text: "左右で違う1文字だけを、右側から拾え。\n上から順に読むと、開けるために必要なものになる。",
      answers: ["かぎ", "鍵"],
      hint: "1段目は右側の「か」が違います。違う文字だけを拾います。",
      explanation: "右側で違う文字は上から「か」「ぎ」。つなげると「かぎ」です。全部を読むのではなく、差分だけを読むタイプの謎です。",
      tags: ["差分抽出", "ひらめき"],
      visualHtml: `
        <div class="puzzle-board" aria-label="左右差分から文字を拾う問題">
          <div class="puzzle-row"><div class="puzzle-chip">あめ</div><div class="puzzle-arrow">≠</div><div class="puzzle-chip">かめ</div></div>
          <div class="puzzle-row"><div class="puzzle-chip">いぬ</div><div class="puzzle-arrow">≠</div><div class="puzzle-chip">いぎ</div></div>
        </div>
      `,
    },
    {
      skill: "cipher",
      level: 6,
      text: "「読まない」と書かれた列は読まない。\n残った列を左から読むと？",
      answers: ["ひみつ", "秘密"],
      hint: "中央の列は指示通り読まず、左右の列だけを見ます。",
      explanation: "読まない列を除き、残った文字を上段左から読むと「ひ」「み」「つ」。答えは「ひみつ」です。",
      tags: ["指示遵守", "配置"],
      visualHtml: `
        <svg class="puzzle-svg" viewBox="0 0 360 240" role="img" aria-label="読まない列がある文字表">
          <rect width="360" height="240" rx="16" fill="#fffaf0"/>
          <g font-family="sans-serif" font-size="28" font-weight="900" text-anchor="middle" dominant-baseline="middle">
            <rect x="52" y="42" width="72" height="58" rx="8" fill="#fff" stroke="#111827" stroke-width="3"/><text x="88" y="72">ひ</text>
            <rect x="144" y="42" width="72" height="58" rx="8" fill="#e7e2d7" stroke="#111827" stroke-width="3"/><text x="180" y="72">読</text>
            <rect x="236" y="42" width="72" height="58" rx="8" fill="#fff" stroke="#111827" stroke-width="3"/><text x="272" y="72">み</text>
            <rect x="52" y="122" width="72" height="58" rx="8" fill="#fff" stroke="#111827" stroke-width="3"/><text x="88" y="152">つ</text>
            <rect x="144" y="122" width="72" height="58" rx="8" fill="#e7e2d7" stroke="#111827" stroke-width="3"/><text x="180" y="152">な</text>
            <rect x="236" y="122" width="72" height="58" rx="8" fill="#fff" stroke="#111827" stroke-width="3"/><text x="272" y="152">　</text>
            <text x="180" y="212" font-size="20" fill="#555">中央は読まない</text>
          </g>
        </svg>
      `,
    },
    {
      skill: "pattern",
      level: 6,
      text: "線が通らなかった文字だけを、上から読め。",
      answers: ["でぐち", "出口"],
      hint: "線の上にある文字は消します。残った文字だけを読みます。",
      explanation: "赤い線が通る文字を除外すると、残りは上から「で」「ぐ」「ち」。答えは「でぐち」です。",
      tags: ["除外読み", "経路"],
      visualHtml: `
        <svg class="puzzle-svg" viewBox="0 0 360 260" role="img" aria-label="線が通る文字と通らない文字">
          <rect width="360" height="260" rx="16" fill="#fffaf0"/>
          <g font-family="sans-serif" font-size="30" font-weight="900" text-anchor="middle" dominant-baseline="middle">
            <text x="92" y="58">か</text><text x="180" y="58">で</text><text x="268" y="58">み</text>
            <text x="92" y="126">ぐ</text><text x="180" y="126">そ</text><text x="268" y="126">た</text>
            <text x="92" y="194">ぬ</text><text x="180" y="194">ち</text><text x="268" y="194">ら</text>
          </g>
          <path d="M88 58 L180 126 L268 194" fill="none" stroke="#d92727" stroke-width="10" stroke-linecap="round" opacity=".72"/>
          <path d="M268 58 L92 194" fill="none" stroke="#d92727" stroke-width="10" stroke-linecap="round" opacity=".72"/>
          <path d="M244 126 L292 126" fill="none" stroke="#d92727" stroke-width="10" stroke-linecap="round" opacity=".72"/>
        </svg>
      `,
    },
    {
      skill: "word",
      level: 6,
      text: "「ない」の直前だけ読め。\n文字列から出る言葉は？",
      answers: ["かぎ", "鍵"],
      hint: "かない・ぎない のように見ます。",
      explanation: "「かない」「ぎない」の直前の文字は「か」「ぎ」。つなげると「かぎ」です。否定語を合図として使う謎です。",
      tags: ["直前抽出", "言葉"],
      visualHtml: `
        <svg class="puzzle-svg" viewBox="0 0 360 190" role="img" aria-label="ないの直前を読む文字列">
          <rect width="360" height="190" rx="16" fill="#fffaf0"/>
          <g font-family="sans-serif" font-size="36" font-weight="900" text-anchor="middle" dominant-baseline="middle">
            <text x="180" y="76" fill="#111827">かない　ぎない</text>
            <text x="180" y="132" font-size="22" fill="#00838f">直前だけ</text>
          </g>
        </svg>
      `,
    },
    {
      skill: "number",
      level: 6,
      text: "「数」ではなく「数え方」を見ろ。\n下の3つで、角が一番多いものは何番？",
      answers: ["3", "３", "三番", "3番"],
      hint: "数字の大きさではなく、図形の角を数えます。",
      explanation: "1番は丸で角0、2番は三角で角3、3番は四角で角4。角が一番多いのは3番です。",
      tags: ["視点変更", "図形"],
      visualHtml: `
        <svg class="puzzle-svg" viewBox="0 0 360 210" role="img" aria-label="角の数を比べる問題">
          <rect width="360" height="210" rx="16" fill="#fffaf0"/>
          <g font-family="sans-serif" font-weight="900" text-anchor="middle">
            <text x="80" y="48" font-size="22">1</text><circle cx="80" cy="112" r="34" fill="#fff" stroke="#111827" stroke-width="4"/>
            <text x="180" y="48" font-size="22">2</text><path d="M180 76 L216 144 L144 144 Z" fill="#fff" stroke="#111827" stroke-width="4"/>
            <text x="280" y="48" font-size="22">3</text><rect x="246" y="78" width="68" height="68" fill="#fff" stroke="#111827" stroke-width="4"/>
          </g>
        </svg>
      `,
    },
    {
      skill: "cipher",
      level: 6,
      text: "「下から読む」とあるが、文字は横に並んでいる。\n下にある文字だけを左から読むと？",
      answers: ["こたえ", "答え"],
      hint: "上下2段のうち、下段だけを読みます。",
      explanation: "下段の文字だけを左から読むと「こ」「た」「え」。答えは「こたえ」です。指示の言い回しを素直に図へ適用します。",
      tags: ["段抽出", "指示"],
      visualHtml: `
        <svg class="puzzle-svg" viewBox="0 0 360 220" role="img" aria-label="上下段の文字">
          <rect width="360" height="220" rx="16" fill="#fffaf0"/>
          <g font-family="sans-serif" font-size="34" font-weight="900" text-anchor="middle" dominant-baseline="middle">
            <text x="100" y="70" fill="#9a8d76">ま</text><text x="180" y="70" fill="#9a8d76">ど</text><text x="260" y="70" fill="#9a8d76">ろ</text>
            <text x="100" y="148" fill="#111827">こ</text><text x="180" y="148" fill="#111827">た</text><text x="260" y="148" fill="#111827">え</text>
          </g>
        </svg>
      `,
    },
    {
      skill: "pattern",
      level: 6,
      text: "同じ動きで進む。\nA→C、C→F、F→J。次は？",
      answers: ["O", "o"],
      hint: "進む数が+2,+3,+4と1ずつ増えています。",
      explanation: "AからCは+2、CからFは+3、FからJは+4。次は+5なのでOです。",
      tags: ["増加ステップ", "英字"],
    },
    {
      skill: "word",
      level: 6,
      text: "「入口」の中には答えがない。\n入口の反対にあるものを答えよ。",
      answers: ["出口", "でぐち"],
      hint: "文字の中を探す問題ではありません。意味の反対を考えます。",
      explanation: "「中には答えがない」とあるので、文字分解ではなく反対語へ視点を変えます。入口の反対は出口です。",
      tags: ["反対語", "視点変更"],
    },
    {
      skill: "number",
      level: 6,
      text: "A=1ではない。\nAは角0、Bは穴2、Cは穴0。ではDはいくつ？",
      answers: ["1", "１"],
      hint: "アルファベットの順番ではなく、文字の中の穴を数えます。",
      explanation: "Dには囲まれた穴が1つあります。順番ではなく形を見る問題です。",
      tags: ["形数え", "英字"],
    },
    {
      skill: "observe",
      level: 6,
      text: "一番多い色ではなく、一番少ない色を答えよ。",
      answers: ["赤", "あか"],
      hint: "青は3つ、黄は2つ、赤は1つです。",
      explanation: "指示は「一番少ない色」です。赤だけ1つなので答えは赤です。",
      tags: ["指示読み", "色数え"],
      visualHtml: `
        <svg class="puzzle-svg" viewBox="0 0 360 190" role="img" aria-label="色の数を比べる問題">
          <rect width="360" height="190" rx="16" fill="#fffaf0"/>
          <g>
            <circle cx="86" cy="72" r="22" fill="#00838f"/><circle cx="144" cy="72" r="22" fill="#00838f"/><circle cx="202" cy="72" r="22" fill="#00838f"/>
            <circle cx="116" cy="126" r="22" fill="#d49a00"/><circle cx="174" cy="126" r="22" fill="#d49a00"/>
            <circle cx="260" cy="100" r="22" fill="#d92727"/>
          </g>
        </svg>
      `,
    },
    {
      skill: "cipher",
      level: 6,
      text: "矢印の先ではなく、矢印の始まりを読め。",
      answers: ["みち", "道"],
      hint: "矢印が向かう先ではなく、出発点の文字を拾います。",
      explanation: "矢印の始まりにある文字は「み」「ち」。つなげると「みち」です。注意を向ける場所を逆にする謎です。",
      tags: ["始点読み", "図形"],
      visualHtml: `
        <svg class="puzzle-svg" viewBox="0 0 360 230" role="img" aria-label="矢印の始まりを読む問題">
          <rect width="360" height="230" rx="16" fill="#fffaf0"/>
          <defs><marker id="arrowHead" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#00838f"/></marker></defs>
          <g font-family="sans-serif" font-size="34" font-weight="900" text-anchor="middle" dominant-baseline="middle">
            <text x="90" y="80">み</text><text x="260" y="80">そ</text>
            <text x="90" y="160">ち</text><text x="260" y="160">か</text>
          </g>
          <path d="M112 80 L232 80" stroke="#00838f" stroke-width="7" marker-end="url(#arrowHead)" fill="none"/>
          <path d="M112 160 L232 160" stroke="#00838f" stroke-width="7" marker-end="url(#arrowHead)" fill="none"/>
        </svg>
      `,
    },
    {
      skill: "pattern",
      level: 6,
      text: "白、黒、黒、白、黒、黒、?。\n同じまとまりが続く。次は？",
      answers: ["白", "しろ"],
      hint: "白黒黒の3つで1セットです。",
      explanation: "白・黒・黒が繰り返されています。7番目は次のセットの最初なので白です。",
      tags: ["周期", "まとまり"],
    },
    {
      skill: "word",
      level: 6,
      text: "「こたえ」は見えている。\nでは「こたえ」の前に必要なものは？",
      answers: ["問い", "とい", "問題", "もんだい"],
      hint: "答えがあるなら、その前には何があるかを考えます。",
      explanation: "答えの前には問いや問題があります。文字操作ではなく、流れを逆から考える問題です。",
      tags: ["逆算", "意味"],
    },
    {
      skill: "number",
      level: 6,
      text: "8を半分にするな。\n8を左右に切ったとき、右側に見える数字は？",
      answers: ["3", "３"],
      hint: "計算ではなく、形として半分にします。",
      explanation: "8を縦に半分に見ると、右側は3のような形に見えます。数値ではなく見た目で考えるひらめき問題です。",
      tags: ["形変換", "視点変更"],
    },
    {
      skill: "observe",
      level: 6,
      text: "一番目立つ文字ではなく、小さい文字だけ読め。",
      answers: ["ほし", "星"],
      hint: "大きい文字は無視します。",
      explanation: "小さい文字だけを左から読むと「ほ」「し」。答えは「ほし」です。",
      tags: ["大小抽出", "文字観察"],
      visualHtml: `
        <svg class="puzzle-svg" viewBox="0 0 360 190" role="img" aria-label="大きい文字と小さい文字">
          <rect width="360" height="190" rx="16" fill="#fffaf0"/>
          <g font-family="sans-serif" font-weight="900" text-anchor="middle" dominant-baseline="middle">
            <text x="82" y="104" font-size="54" fill="#9a8d76">か</text>
            <text x="142" y="76" font-size="24" fill="#111827">ほ</text>
            <text x="210" y="104" font-size="54" fill="#9a8d76">ぬ</text>
            <text x="274" y="76" font-size="24" fill="#111827">し</text>
          </g>
        </svg>
      `,
    },
    {
      skill: "cipher",
      level: 6,
      text: "同じ文字を2回目以降消せ。\n「ひひみみつつ」から残る言葉は？",
      answers: ["ひみつ", "秘密"],
      hint: "最初に出た文字だけを残します。",
      explanation: "2回目以降の重複を消すと、ひ・み・つ が残ります。答えは「ひみつ」です。",
      tags: ["重複削除", "文字操作"],
    },
  ];
}

function buildNazokenStyleQuestionSet() {
  return [
    {
      skill: "observe",
      level: 5,
      text: "左右で1文字だけ違う。\n右側の違う文字を上から読むと、動物の名前になる。",
      answers: ["ねこ", "猫"],
      hint: "1段目は「あめ」と「あね」を比べます。",
      explanation: "右側の違う文字は、上から「ね」「こ」。つなげると「ねこ」です。",
      tags: ["差分抽出", "文字観察"],
      visualHtml: `
        <div class="puzzle-board" aria-label="左右の言葉を比べる問題">
          <div class="puzzle-row"><div class="puzzle-chip">あめ</div><div class="puzzle-arrow">→</div><div class="puzzle-chip">あね</div></div>
          <div class="puzzle-row"><div class="puzzle-chip">いし</div><div class="puzzle-arrow">→</div><div class="puzzle-chip">いこ</div></div>
        </div>
      `,
    },
    {
      skill: "cipher",
      level: 5,
      text: "白いマスだけを、左上から右下へ斜めに読め。",
      answers: ["かぎ", "鍵"],
      hint: "読むのは2つの白いマスだけです。",
      explanation: "白いマスを左上、中央の順に読むと「か」「ぎ」。答えは「かぎ」です。",
      tags: ["配置読み", "抽出"],
      visualHtml: `
        <svg class="puzzle-svg" viewBox="0 0 360 220" role="img" aria-label="3かける3の文字マス">
          <rect width="360" height="220" rx="16" fill="#fffaf0"/>
          <g font-family="sans-serif" font-size="34" font-weight="800" text-anchor="middle" dominant-baseline="middle">
            <rect x="62" y="30" width="62" height="50" rx="8" fill="#ffffff" stroke="#111827" stroke-width="3"/><text x="93" y="56">か</text>
            <rect x="149" y="30" width="62" height="50" rx="8" fill="#e7e2d7" stroke="#111827" stroke-width="3"/><text x="180" y="56">み</text>
            <rect x="236" y="30" width="62" height="50" rx="8" fill="#e7e2d7" stroke="#111827" stroke-width="3"/><text x="267" y="56">た</text>
            <rect x="62" y="86" width="62" height="50" rx="8" fill="#e7e2d7" stroke="#111827" stroke-width="3"/><text x="93" y="112">そ</text>
            <rect x="149" y="86" width="62" height="50" rx="8" fill="#ffffff" stroke="#111827" stroke-width="3"/><text x="180" y="112">ぎ</text>
            <rect x="236" y="86" width="62" height="50" rx="8" fill="#e7e2d7" stroke="#111827" stroke-width="3"/><text x="267" y="112">ぬ</text>
            <rect x="62" y="142" width="62" height="50" rx="8" fill="#e7e2d7" stroke="#111827" stroke-width="3"/><text x="93" y="168">へ</text>
            <rect x="149" y="142" width="62" height="50" rx="8" fill="#e7e2d7" stroke="#111827" stroke-width="3"/><text x="180" y="168">ら</text>
            <rect x="236" y="142" width="62" height="50" rx="8" fill="#e7e2d7" stroke="#111827" stroke-width="3"/><text x="267" y="168">ゆ</text>
          </g>
        </svg>
      `,
    },
    {
      skill: "pattern",
      level: 5,
      text: "矢印は同じルールで進む。\n赤の矢印が「かぎ」なら、青の矢印は何？",
      answers: ["とびら", "扉"],
      hint: "矢印の通ったマスを順に読みます。",
      explanation: "赤は「か→ぎ」。青は「と→び→ら」を通るので「とびら」です。",
      tags: ["経路読み", "図形"],
      visualHtml: `
        <svg class="puzzle-svg" viewBox="0 0 360 240" role="img" aria-label="文字マスと矢印">
          <rect width="360" height="240" rx="16" fill="#fffaf0"/>
          <g font-family="sans-serif" font-size="28" font-weight="900" text-anchor="middle" dominant-baseline="middle">
            <g stroke="#111827" stroke-width="3" fill="#fff">
              <rect x="70" y="38" width="58" height="48" rx="7"/><rect x="151" y="38" width="58" height="48" rx="7"/><rect x="232" y="38" width="58" height="48" rx="7"/>
              <rect x="70" y="104" width="58" height="48" rx="7"/><rect x="151" y="104" width="58" height="48" rx="7"/><rect x="232" y="104" width="58" height="48" rx="7"/>
              <rect x="70" y="170" width="58" height="48" rx="7"/><rect x="151" y="170" width="58" height="48" rx="7"/><rect x="232" y="170" width="58" height="48" rx="7"/>
            </g>
            <text x="99" y="62">か</text><text x="180" y="62">と</text><text x="261" y="62">ら</text>
            <text x="99" y="128">み</text><text x="180" y="128">び</text><text x="261" y="128">ぎ</text>
            <text x="99" y="194">そ</text><text x="180" y="194">ぬ</text><text x="261" y="194">け</text>
          </g>
          <path d="M100 62 L260 128" fill="none" stroke="#d92727" stroke-width="7" stroke-linecap="round"/>
          <path d="M180 62 L180 128 L260 62" fill="none" stroke="#0097a7" stroke-width="7" stroke-linecap="round"/>
        </svg>
      `,
    },
    {
      skill: "word",
      level: 5,
      text: "同じ形の中だけを読む。\n丸の中の文字を上から読むと？",
      answers: ["みち", "道"],
      hint: "四角や三角は読まず、丸だけを拾います。",
      explanation: "丸の中にある文字は上から「み」「ち」。答えは「みち」です。",
      tags: ["形抽出", "文字"],
      visualHtml: `
        <svg class="puzzle-svg" viewBox="0 0 360 220" role="img" aria-label="形の中に文字がある問題">
          <rect width="360" height="220" rx="16" fill="#fffaf0"/>
          <g font-family="sans-serif" font-size="32" font-weight="900" text-anchor="middle" dominant-baseline="middle" stroke="#111827" stroke-width="3">
            <circle cx="100" cy="62" r="34" fill="#fff"/><text x="100" y="62" stroke="none" fill="#111827">み</text>
            <rect x="224" y="28" width="68" height="68" rx="8" fill="#fff"/><text x="258" y="62" stroke="none" fill="#111827">か</text>
            <path d="M80 168 L120 104 L160 168 Z" fill="#fff"/><text x="120" y="148" stroke="none" fill="#111827">や</text>
            <circle cx="246" cy="142" r="34" fill="#fff"/><text x="246" y="142" stroke="none" fill="#111827">ち</text>
          </g>
        </svg>
      `,
    },
    {
      skill: "number",
      level: 5,
      text: "同じ記号は同じ数を表す。\n星＋星＝8、星＋月＝11。月はいくつ？",
      answers: ["7", "７"],
      hint: "まず星の値を求めます。",
      explanation: "星＋星=8なので星=4。星＋月=11だから、月=7です。",
      tags: ["記号計算", "連立"],
      visualHtml: `
        <svg class="puzzle-svg" viewBox="0 0 360 220" role="img" aria-label="記号計算">
          <rect width="360" height="220" rx="16" fill="#fffaf0"/>
          <g font-family="sans-serif" font-size="34" font-weight="900" text-anchor="middle" dominant-baseline="middle">
            <text x="92" y="78" fill="#d49a00">★</text><text x="142" y="78">＋</text><text x="192" y="78" fill="#d49a00">★</text><text x="242" y="78">＝</text><text x="292" y="78">8</text>
            <text x="92" y="148" fill="#d49a00">★</text><text x="142" y="148">＋</text><text x="192" y="148" fill="#00838f">☾</text><text x="242" y="148">＝</text><text x="292" y="148">11</text>
          </g>
        </svg>
      `,
    },
    {
      skill: "observe",
      level: 5,
      text: "1つだけ向きが違う矢印がある。\nその矢印の色は？",
      answers: ["青", "あお", "ブルー"],
      hint: "ほとんどは右上を向いています。",
      explanation: "青い矢印だけ左上を向いています。細かい向きの差を見る問題です。",
      tags: ["向き違い", "図形観察"],
      visualHtml: `
        <svg class="puzzle-svg" viewBox="0 0 360 210" role="img" aria-label="複数の矢印">
          <rect width="360" height="210" rx="16" fill="#fffaf0"/>
          <g font-size="48" font-family="sans-serif" font-weight="900" text-anchor="middle" dominant-baseline="middle">
            <text x="82" y="65" fill="#d92727">↗</text><text x="180" y="65" fill="#d49a00">↗</text><text x="278" y="65" fill="#2ca24d">↗</text>
            <text x="82" y="145" fill="#6b3bbd">↗</text><text x="180" y="145" fill="#00838f">↖</text><text x="278" y="145" fill="#111827">↗</text>
          </g>
        </svg>
      `,
    },
    {
      skill: "cipher",
      level: 5,
      text: "下の式は「前の文字に戻す」という意味。\n表示された文字を1つずつ戻すと？",
      answers: ["MAP", "map", "地図", "ちず"],
      hint: "N→M、B→A、Q→Pです。",
      explanation: "NBQを1文字ずつ戻すとMAP。日本語では地図です。",
      tags: ["変換指示", "英字"],
      visualHtml: `
        <svg class="puzzle-svg" viewBox="0 0 360 190" role="img" aria-label="英字変換問題">
          <rect width="360" height="190" rx="16" fill="#fffaf0"/>
          <g font-family="sans-serif" font-weight="900" text-anchor="middle">
            <text x="180" y="62" font-size="28" fill="#00838f">1つ前へ</text>
            <text x="180" y="132" font-size="54" fill="#111827">N B Q</text>
          </g>
        </svg>
      `,
    },
    {
      skill: "pattern",
      level: 5,
      text: "上から順に、黒いマスの数が1つずつ増えている。\n? の段に入る黒いマスはいくつ？",
      answers: ["4", "４"],
      hint: "1段目は1個、2段目は2個、3段目は3個です。",
      explanation: "黒いマスの数が1,2,3と増えているので、次は4個です。",
      tags: ["増加規則", "マス"],
      visualHtml: `
        <svg class="puzzle-svg" viewBox="0 0 360 230" role="img" aria-label="黒マスの増加">
          <rect width="360" height="230" rx="16" fill="#fffaf0"/>
          <g stroke="#111827" stroke-width="2">
            <rect x="80" y="30" width="42" height="32" fill="#111827"/><rect x="122" y="30" width="42" height="32" fill="#fff"/><rect x="164" y="30" width="42" height="32" fill="#fff"/><rect x="206" y="30" width="42" height="32" fill="#fff"/>
            <rect x="80" y="76" width="42" height="32" fill="#111827"/><rect x="122" y="76" width="42" height="32" fill="#111827"/><rect x="164" y="76" width="42" height="32" fill="#fff"/><rect x="206" y="76" width="42" height="32" fill="#fff"/>
            <rect x="80" y="122" width="42" height="32" fill="#111827"/><rect x="122" y="122" width="42" height="32" fill="#111827"/><rect x="164" y="122" width="42" height="32" fill="#111827"/><rect x="206" y="122" width="42" height="32" fill="#fff"/>
          </g>
          <text x="180" y="198" font-family="sans-serif" font-size="42" font-weight="900" text-anchor="middle" fill="#111827">?</text>
        </svg>
      `,
    },
    {
      skill: "word",
      level: 5,
      text: "外側の文字だけを時計回りに読むと、場所の名前になる。",
      answers: ["へや", "部屋"],
      hint: "中央の文字は読みません。",
      explanation: "外側を指定された順で読むと「へ」「や」。答えは「へや」です。",
      tags: ["外周読み", "配置"],
      visualHtml: `
        <svg class="puzzle-svg" viewBox="0 0 360 210" role="img" aria-label="外側の文字を読む問題">
          <rect width="360" height="210" rx="16" fill="#fffaf0"/>
          <g font-family="sans-serif" font-size="34" font-weight="900" text-anchor="middle" dominant-baseline="middle">
            <rect x="102" y="42" width="58" height="48" rx="8" fill="#fff" stroke="#111827" stroke-width="3"/><text x="131" y="66">へ</text>
            <rect x="200" y="42" width="58" height="48" rx="8" fill="#fff" stroke="#111827" stroke-width="3"/><text x="229" y="66">や</text>
            <rect x="151" y="112" width="58" height="48" rx="8" fill="#e7e2d7" stroke="#111827" stroke-width="3"/><text x="180" y="136">そ</text>
          </g>
        </svg>
      `,
    },
    {
      skill: "number",
      level: 5,
      text: "左から順に、丸の数だけ文字を進める。\nAから始めると最後の文字は？",
      answers: ["F", "f"],
      hint: "Aから+2、さらに+3進みます。",
      explanation: "Aから丸2個でC、次に丸3個でFです。",
      tags: ["移動量", "英字"],
      visualHtml: `
        <svg class="puzzle-svg" viewBox="0 0 360 190" role="img" aria-label="丸の数で進む問題">
          <rect width="360" height="190" rx="16" fill="#fffaf0"/>
          <g fill="#00838f"><circle cx="118" cy="72" r="12"/><circle cx="150" cy="72" r="12"/><circle cx="210" cy="72" r="12"/><circle cx="242" cy="72" r="12"/><circle cx="274" cy="72" r="12"/></g>
          <g font-family="sans-serif" font-weight="900" text-anchor="middle" fill="#111827">
            <text x="80" y="84" font-size="34">A</text>
            <text x="180" y="138" font-size="28">左から順に進む</text>
          </g>
        </svg>
      `,
    },
  ];
}

function buildPracticalQuestionSet() {
  const clueImage = "assets/clue-tabletop.png";
  const imageAlt = "木の机に、封蝋つき封筒、鍵、方位磁針、時計、星印のある地図が置かれている。";
  return [
    {
      skill: "cipher",
      level: 5,
      text: "封筒の裏に「1つ前へ戻せ」とある。\n暗号文：IJOU\nアルファベットを1文字ずつ戻すと出る英単語は？",
      answers: ["HINT", "hint", "ヒント"],
      hint: "I→H、J→I のように戻します。",
      explanation: "IJOUを1文字ずつ戻すとHINTです。謎解きでは、指示文を暗号処理のルールとして読むことがよくあります。",
      tags: ["指示暗号", "シーザー"],
    },
    {
      skill: "cipher",
      level: 5,
      text: "メモ「奇数だけ先、偶数だけ後」。\n文字列：K A G I\n奇数番目→偶数番目の順に読むと？",
      answers: ["KGAI", "kgai"],
      hint: "1,3番目を先に読み、次に2,4番目を読みます。",
      explanation: "奇数番目はK,G。偶数番目はA,I。合わせてKGAIです。位置指定に従うタイプの実戦的な並べ替え問題です。",
      tags: ["位置並替", "偶奇"],
    },
    {
      skill: "cipher",
      level: 5,
      text: "画像の机上の手がかりを、英語の頭文字で読む。\n鍵・封筒・地図・時計の順に並べると、頭文字は？",
      answers: ["KEMC", "kemc"],
      hint: "鍵=Key、封筒=Envelope、地図=Map、時計=Clockです。",
      explanation: "Key, Envelope, Map, Clock の頭文字を取るとKEMCです。現場アイテムを英語化して頭文字を拾う練習です。",
      tags: ["頭文字", "画像変換"],
      image: clueImage,
      imageAlt,
    },
    {
      skill: "cipher",
      level: 4,
      text: "A1Z26で、11-5-25 は何を表す？",
      answers: ["KEY", "key", "かぎ", "鍵"],
      hint: "A=1, B=2 ... Z=26 に戻します。",
      explanation: "11=K、5=E、25=YなのでKEY。日本語なら鍵です。",
      tags: ["A1Z26", "対応表"],
    },
    {
      skill: "pattern",
      level: 5,
      text: "展示室の床に 1, 3, 6, 10, 15, ? と刻まれている。\n増え方を読むと次は？",
      answers: ["21", "２１"],
      hint: "差は+2,+3,+4,+5です。",
      explanation: "次の差は+6なので15+6=21です。階段状に増える三角数の定番です。",
      tags: ["階差", "三角数"],
    },
    {
      skill: "pattern",
      level: 5,
      text: "赤い印は「封蝋→地図の星→封蝋→地図の星」と交互に示している。\n次に見るべきものは？",
      answers: ["封蝋", "ふうろう", "封ろう"],
      hint: "2つの赤い手がかりが交互に出ています。",
      explanation: "封蝋、星、封蝋、星の次は封蝋です。見た目の共通点を系列として扱う問題です。",
      tags: ["交互", "画像観察"],
      image: clueImage,
      imageAlt,
    },
    {
      skill: "pattern",
      level: 5,
      text: "N, E, S, W, N, E, ?。\n方角が時計回りに並んでいる。次は？",
      answers: ["S", "s", "南", "みなみ"],
      hint: "北→東→南→西の周期です。",
      explanation: "N,E,S,Wの4周期なので、N,Eの次はSです。",
      tags: ["周期", "方角"],
    },
    {
      skill: "pattern",
      level: 4,
      text: "KEY, MAP, CLOCK, KEY, MAP, ?。\n3つの手がかりが繰り返される。次は？",
      answers: ["CLOCK", "clock", "時計", "とけい"],
      hint: "3語のまとまりを探します。",
      explanation: "KEY→MAP→CLOCK の繰り返しなので、次はCLOCKです。",
      tags: ["周期", "語列"],
    },
    {
      skill: "word",
      level: 5,
      text: "謎解き現場で「かぎ」は物、「鍵」は漢字、「KEY」は英語。\nこの3つに共通する意味は？",
      answers: ["鍵", "かぎ", "キー", "key"],
      hint: "表記は違っても同じものを指します。",
      explanation: "かな、漢字、英語の表記違いを同じ意味へ統合する問題です。実戦では表記ゆれがヒントになります。",
      tags: ["表記変換", "意味"],
    },
    {
      skill: "word",
      level: 5,
      text: "「封筒」「封印」「封鎖」。共通する漢字「封」が表すニュアンスに近いものは？",
      answers: ["閉じる", "とじる", "閉じ込める", "ふさぐ"],
      hint: "どれも何かを閉じたり塞いだりします。",
      explanation: "封は閉じる、ふさぐ、開けられないようにする意味を持ちます。漢字の意味を横断して読む問題です。",
      tags: ["漢字意味", "語彙"],
    },
    {
      skill: "word",
      level: 5,
      text: "「地図に星、封筒に赤、鍵に穴」。\nこの文で、場所を示している語は？",
      answers: ["地図", "ちず"],
      hint: "物の名前ではなく、探索先を探すための道具です。",
      explanation: "地図は場所を示すための手がかりです。文章中の役割を読む練習です。",
      tags: ["役割分類", "文章読解"],
      image: clueImage,
      imageAlt,
    },
    {
      skill: "word",
      level: 4,
      text: "「開けるもの」は鍵。「示すもの」は地図。\nでは「時を示すもの」は？",
      answers: ["時計", "とけい"],
      hint: "役割の対応をそろえます。",
      explanation: "鍵は開ける、地図は場所を示す、時計は時を示します。対応関係を読む問題です。",
      tags: ["関係類推", "道具"],
    },
    {
      skill: "number",
      level: 5,
      text: "A=1, Z=26。KEY の合計値は？",
      answers: ["41", "４１"],
      hint: "K=11, E=5, Y=25です。",
      explanation: "11+5+25=41です。文字を数字へ変換して集計する実戦的な処理です。",
      tags: ["A1Z26", "合計"],
    },
    {
      skill: "number",
      level: 5,
      text: "画像の机上で、赤い手がかりは封蝋と地図の星の2つ。\n青い手がかりは方位磁針1つ。赤の数から青の数を引くと？",
      answers: ["1", "１"],
      hint: "赤は2、青は1です。",
      explanation: "赤い封蝋と赤い星で2。青い方位磁針で1。2-1=1です。",
      tags: ["色カウント", "画像"],
      image: clueImage,
      imageAlt,
    },
    {
      skill: "number",
      level: 5,
      text: "KEYをA1Z26で数値化し、最大の文字値から最小の文字値を引く。\n答えは？",
      answers: ["20", "２０"],
      hint: "K=11, E=5, Y=25です。",
      explanation: "最大はY=25、最小はE=5。25-5=20です。",
      tags: ["最大最小", "英字数値化"],
    },
    {
      skill: "number",
      level: 4,
      text: "鍵=1、封筒=2、方位磁針=3、時計=4、地図=5。\n地図から鍵を引くと？",
      answers: ["4", "４"],
      hint: "指定された対応表だけを使います。",
      explanation: "地図=5、鍵=1なので5-1=4です。対応表を読み間違えない練習です。",
      tags: ["対応表", "演算"],
      image: clueImage,
      imageAlt,
    },
    {
      skill: "observe",
      level: 5,
      text: "画像を見て、机の上で一番右上にある手がかりは？",
      answers: ["鍵", "かぎ", "キー", "key"],
      hint: "右上の金色の物を見ます。",
      explanation: "右上には金色の鍵があります。謎解きでは、位置の指定がそのまま抽出順になることがあります。",
      tags: ["位置観察", "画像"],
      image: clueImage,
      imageAlt,
    },
    {
      skill: "observe",
      level: 5,
      text: "画像を見て、赤い星が描かれている手がかりは？",
      answers: ["地図", "ちず", "マップ", "map"],
      hint: "右側の紙を見ます。",
      explanation: "赤い星は地図の上にあります。色と対象を結びつける観察問題です。",
      tags: ["色観察", "画像"],
      image: clueImage,
      imageAlt,
    },
    {
      skill: "observe",
      level: 4,
      text: "画像を見て、丸い形の手がかりを2つ挙げるなら、方位磁針と何？",
      answers: ["時計", "とけい"],
      hint: "緑色の丸い道具を探します。",
      explanation: "方位磁針のほかに、丸い時計があります。形で分類する観察問題です。",
      tags: ["形分類", "画像"],
      image: clueImage,
      imageAlt,
    },
    {
      skill: "observe",
      level: 5,
      text: "画像を見て、封筒の上に重なっている赤いものは？",
      answers: ["封蝋", "ふうろう", "封ろう", "シール"],
      hint: "封筒の中央付近にあります。",
      explanation: "封筒の上には赤い封蝋があります。重なりと位置を読む問題です。",
      tags: ["重なり", "画像"],
      image: clueImage,
      imageAlt,
    },
  ];
}

function curatedCipherQuestions() {
  return [
    {
      skill: "cipher",
      level: 4,
      text: "メモには「上だけ読め」とある。\nA K N / S A G / T E I\n上段だけを左から読むと出る言葉は？",
      answers: ["AKN", "あかね"],
      hint: "3行ではなく、上にある文字だけを拾います。",
      explanation: "上段は A K N。母音を補うと「あかね」と読ませるタイプの抽出問題です。",
      tags: ["段抽出", "配置"],
    },
    {
      skill: "cipher",
      level: 5,
      text: "「3-1-20」はCATではなく、さらに1文字戻して読めとある。答えの英単語は？",
      answers: ["BZS"],
      hint: "A=1でCATに戻したあと、各文字を1つ戻します。",
      explanation: "3-1-20はCAT。C→B、A→Z、T→SなのでBZSです。",
      tags: ["二段変換", "対応表"],
    },
    {
      skill: "cipher",
      level: 4,
      text: "矢印メモ「右・右・左・右」。Aから始め、右=次の文字、左=前の文字として動く。最後の文字は？",
      answers: ["C", "c"],
      hint: "A→B→C→B→C と1手ずつ動きます。",
      explanation: "Aから右でB、右でC、左でB、右でC。答えはCです。",
      tags: ["手順暗号", "移動"],
    },
    {
      skill: "cipher",
      level: 5,
      text: "「K O A T E」を、偶数番目→奇数番目の順に並べ替える。できる英字列は？",
      answers: ["OTKAE"],
      hint: "2,4番目を先に読み、その後1,3,5番目を読みます。",
      explanation: "偶数番目はO,T。奇数番目はK,A,E。合わせてOTKAEです。",
      tags: ["位置並替", "偶奇"],
    },
    {
      skill: "cipher",
      level: 4,
      text: "「N=北, E=東, S=南, W=西」。NEESW を方角の日本語に直すと、最初に出る方角は？",
      answers: ["北", "きた"],
      hint: "1文字ずつ方角に置き換えます。",
      explanation: "Nは北です。先頭の方角だけを問う問題です。",
      tags: ["記号変換", "方角"],
    },
  ];
}

function curatedPatternQuestions() {
  return [
    {
      skill: "pattern",
      level: 5,
      text: "1, 2, 4, 7, 11, 16, ?。増え方そのものが1ずつ増える。次は？",
      answers: ["22", "２２"],
      hint: "+1,+2,+3,+4,+5 と増えています。",
      explanation: "16の次は+6なので22です。",
      tags: ["階差", "数列"],
    },
    {
      skill: "pattern",
      level: 4,
      text: "A, C, F, J, O, ?。アルファベット位置の増え方を見る。次は？",
      answers: ["U", "u"],
      hint: "増分は+2,+3,+4,+5です。",
      explanation: "Oから+6進むとUです。",
      tags: ["英字階差", "数列"],
    },
    {
      skill: "pattern",
      level: 4,
      text: "黒白白 / 黒黒白 / 黒黒黒。次に白が0個になるなら、直前の段の白はいくつ？",
      answers: ["1", "１"],
      hint: "白の数が2,1,0と減る流れを見ます。",
      explanation: "0個になる直前は白が1個です。",
      tags: ["図形推移", "減少"],
    },
    {
      skill: "pattern",
      level: 5,
      text: "月→水→土→水→?。曜日を+2,+3,+4,+5日ずつ進める。次は？",
      answers: ["月"],
      hint: "土から+4で水。次は水から+5です。",
      explanation: "水から5日進むと月です。",
      tags: ["周期変化", "曜日"],
    },
    {
      skill: "pattern",
      level: 4,
      text: "「北東南西」を1つ飛ばしで読むと「北南」。次に開始位置を1つずらして読むと？",
      answers: ["東西"],
      hint: "2文字目から1つ飛ばしで読みます。",
      explanation: "東から始めて1つ飛ばしで読むと東、西です。",
      tags: ["飛ばし読み", "方角"],
    },
  ];
}

function curatedWordQuestions() {
  return [
    {
      skill: "word",
      level: 4,
      text: "「かぎ」「とびら」「へや」「でぐち」。この4語を謎解きの流れに並べると、最初に必要なものは？",
      answers: ["かぎ"],
      hint: "扉を開ける前に必要なものを考えます。",
      explanation: "流れは、かぎ→とびら→へや→でぐち。最初はかぎです。",
      tags: ["手順語", "並べ替え"],
    },
    {
      skill: "word",
      level: 5,
      text: "「あかいかさ」から、同じ文字を2回目以降消すと残る文字列は？",
      answers: ["あかいさ"],
      hint: "最初に出た文字だけを残します。",
      explanation: "あ、か、い、か、さ の2回目の「か」を消し、あかいさです。",
      tags: ["重複削除", "文字操作"],
    },
    {
      skill: "word",
      level: 4,
      text: "「問い」は「答え」に変わる。「暗号」は何に変わる？",
      answers: ["解読", "かいどく"],
      hint: "問題を解いた後の状態にします。",
      explanation: "問いを解くと答え。暗号を解くと解読です。",
      tags: ["関係類推", "語彙"],
    },
    {
      skill: "word",
      level: 5,
      text: "「ひみつのちず」の2,5,6文字目を読むと？",
      answers: ["みのち"],
      hint: "小さい単位で1文字ずつ数えます。",
      explanation: "2文字目=み、5文字目=の、6文字目=ち。答えはみのちです。",
      tags: ["位置抽出", "文字"],
    },
    {
      skill: "word",
      level: 4,
      text: "「上」を消すと「下」が残る言葉ではない。反対語の組として自然なのは「入口」と何？",
      answers: ["出口", "でぐち"],
      hint: "漢字の操作ではなく意味の対を考えます。",
      explanation: "入口の反対は出口です。",
      tags: ["反対語", "意味"],
    },
  ];
}

function curatedNumberQuestions() {
  return [
    {
      skill: "number",
      level: 5,
      text: "A=1, B=2。CAB の数字合計は？",
      answers: ["6", "６"],
      hint: "C=3, A=1, B=2です。",
      explanation: "3+1+2=6です。",
      tags: ["英字数値化", "合計"],
    },
    {
      skill: "number",
      level: 4,
      text: "3つの箱がある。左は右より2大きく、中央は左より1小さい。右が5なら中央は？",
      answers: ["6", "６"],
      hint: "右→左→中央の順に求めます。",
      explanation: "右5、左7、中央6です。",
      tags: ["条件整理", "順序"],
    },
    {
      skill: "number",
      level: 5,
      text: "時計で9時から右回りに5時間、左回りに2時間進む。何時？",
      answers: ["12", "１２", "12時"],
      hint: "9→14時相当、そこから2戻ります。",
      explanation: "9+5-2=12。答えは12時です。",
      tags: ["時計算", "移動"],
    },
    {
      skill: "number",
      level: 4,
      text: "カード 2, 4, 7 を一度ずつ使って、2桁+1桁の最大値を作る。答えは？",
      answers: ["76", "７６"],
      hint: "十の位を最大にします。",
      explanation: "74+2=76が最大です。",
      tags: ["最大化", "桁"],
    },
    {
      skill: "number",
      level: 5,
      text: "赤=2点、青=3点、黄=5点。赤青黄青の合計点は？",
      answers: ["13", "１３"],
      hint: "色を点数へ置き換えて足します。",
      explanation: "2+3+5+3=13です。",
      tags: ["対応表", "合計"],
    },
  ];
}

function curatedObserveQuestions() {
  return [
    {
      skill: "observe",
      level: 4,
      text: "次の中で1つだけ数字の0が混ざっているものは何番目？\n1: NORTH / 2: N0RTH / 3: NORTH",
      answers: ["2", "２", "2番目"],
      hint: "Oと0の形の違いを見ます。",
      explanation: "2番目だけOではなく数字の0です。",
      tags: ["Oと0", "細部"],
    },
    {
      skill: "observe",
      level: 5,
      text: "「未」「末」「未」。違うものは何番目？",
      answers: ["2", "２", "2番目"],
      hint: "上の横線の長さを見ます。",
      explanation: "2番目だけ「末」です。",
      tags: ["似漢字", "横線"],
    },
    {
      skill: "observe",
      level: 4,
      text: "メモ「赤青赤黄赤」。赤は何個？",
      answers: ["3", "３"],
      hint: "同じ文字だけを数えます。",
      explanation: "赤は1,3,5文字目にあり、3個です。",
      tags: ["色数え", "抽出"],
    },
    {
      skill: "observe",
      level: 5,
      text: "「問 間 問」。中に日が入っているものは何番目？",
      answers: ["2", "２", "2番目"],
      hint: "門の中にある部品を見ます。",
      explanation: "間の中は日です。2番目です。",
      tags: ["部品観察", "漢字"],
    },
    {
      skill: "observe",
      level: 4,
      text: "「右 左 右 石 右」。仲間外れは何番目？",
      answers: ["4", "４", "4番目"],
      hint: "方向を表す文字ではないものを探します。",
      explanation: "石だけ方角・方向ではありません。4番目です。",
      tags: ["分類観察", "仲間外れ"],
    },
  ];
}

function interleaveByType(bank) {
  const groupedBySkill = new Map();
  bank.forEach((question) => {
    if (!groupedBySkill.has(question.skill)) groupedBySkill.set(question.skill, []);
    groupedBySkill.get(question.skill).push(question);
  });

  const mixedBank = [];
  groupedBySkill.forEach((skillQuestions) => {
    const typeBuckets = new Map();
    skillQuestions.forEach((question) => {
      const key = question.tags[0] || "misc";
      if (!typeBuckets.has(key)) typeBuckets.set(key, []);
      typeBuckets.get(key).push(question);
    });

    const buckets = [...typeBuckets.values()];
    const mixed = [];
    while (mixed.length < skillQuestions.length) {
      buckets.forEach((bucket) => {
        if (bucket.length) mixed.push(bucket.shift());
      });
    }
    mixedBank.push(...mixed);
  });
  return mixedBank;
}

function buildQuestionBank() {
  return [
    ...buildCipherQuestions(),
    ...buildPatternQuestions(),
    ...buildWordQuestions(),
    ...buildNumberQuestions(),
    ...buildObserveQuestions(),
  ];
}

function buildCipherQuestions() {
  const keywords = [
    ["HINT", "ヒント"], ["KEY", "かぎ"], ["DOOR", "とびら"], ["MAP", "ちず"], ["TIME", "じかん"],
    ["LIGHT", "ひかり"], ["NORTH", "きた"], ["SOUTH", "みなみ"], ["EAST", "ひがし"], ["WEST", "にし"],
    ["START", "はじめ"], ["GOAL", "ゴール"], ["ANSWER", "こたえ"], ["SECRET", "ひみつ"], ["CLOCK", "とけい"],
    ["TRAIN", "でんしゃ"], ["RIVER", "かわ"], ["BRIDGE", "はし"], ["STONE", "いし"], ["STAR", "ほし"],
  ];
  const kanaWords = ["かぎ", "とびら", "ひかり", "ほし", "ちず", "きた", "みなみ", "こたえ", "ひみつ", "とけい"];
  const kana = "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん";
  const out = [];

  keywords.forEach(([plain, jp], index) => {
    const shift = (index % 12) + 2;
    const encoded = caesar(plain, shift);
    out.push({
      skill: "cipher",
      level: 3 + (index % 3),
      text: `展示パネルに「${encoded}」とある。メモには「時計を${shift}時間戻せ」とだけ書かれている。導けるキーワードは？`,
      answers: [jp, plain],
      hint: `アルファベットを円形の時計と見なし、各文字を${shift}文字戻します。`,
      explanation: `${encoded}を${shift}文字戻すと${plain}。対応する日本語の答えは「${jp}」です。`,
      tags: ["シーザー暗号", "変換"],
    });
  });

  keywords.forEach(([plain, jp], index) => {
    const correction = index % 3;
    const code = plain.split("").map((char, position) => char.charCodeAt(0) - 64 + (position % 2 === 0 ? correction : 0)).join("-");
    out.push({
      skill: "cipher",
      level: 4 + (index % 2),
      text: `A=1の表で読む。ただし奇数番目の数字だけ${correction}を引いてから読む。「${code}」が示す言葉は？`,
      answers: [plain, jp],
      hint: "1文字目、3文字目、5文字目だけ補正してからA=1表に戻します。",
      explanation: `奇数番目だけ${correction}を引くと、数字列は${plain.split("").map((char) => char.charCodeAt(0) - 64).join("-")}になり、${plain}と読めます。`,
      tags: ["対応表", "位置補正"],
    });
  });

  keywords.forEach(([plain, jp]) => {
    const rails = railFence(plain);
    out.push({
      skill: "cipher",
      level: 4,
      text: `2段に交互配置した文字を、上段→下段の順で写したら「${rails.encoded}」になった。元の単語は？`,
      answers: [plain, jp],
      hint: "1,3,5文字目が上段、2,4,6文字目が下段です。",
      explanation: `上段「${rails.top}」と下段「${rails.bottom}」を交互に戻すと${plain}です。`,
      tags: ["転置暗号", "交互読み"],
    });
  });

  kanaWords.forEach((word, index) => {
    const shift = (index % 5) + 2;
    const encoded = shiftKana(word, shift, kana);
    out.push({
      skill: "cipher",
      level: 3 + (index % 3),
      text: `五十音メモに「${encoded}」とある。横に「${shift}歩戻る」と書かれている。元の言葉は？`,
      answers: [word],
      hint: "かな表の中で、各文字を同じ数だけ前に戻します。濁点や小文字は出ません。",
      explanation: `${encoded}の各文字を${shift}文字戻すと「${word}」になります。`,
      tags: ["かな暗号", "逆算"],
    });
  });

  for (let i = 0; out.length < 100; i += 1) {
    const [plain, jp] = keywords[i % keywords.length];
    const encoded = plain.replace(/[A-Z]/g, (char) => String.fromCharCode(155 - char.charCodeAt(0)));
    out.push({
      skill: "cipher",
      level: 5,
      text: `古いノートに「A⇔Z, B⇔Y」とある。同じ規則で「${encoded}」を戻すと何？`,
      answers: [plain, jp],
      hint: "アルファベット列を鏡に映した対応表で読みます。",
      explanation: `反転対応で${encoded}を戻すと${plain}です。`,
      tags: ["反転暗号", "対応表"],
    });
  }

  return out.slice(0, 100);
}

function buildPatternQuestions() {
  const out = [];
  for (let i = 1; i <= 34; i += 1) {
    const a = (i % 5) + 2;
    const b = (i % 4) + 3;
    const seq = [a, a + b, (a + b) * 2, (a + b) * 2 + b, ((a + b) * 2 + b) * 2];
    const answer = seq[4] + b;
    out.push({
      skill: "pattern",
      level: 3 + (i % 3),
      text: `操作が「+${b}, ×2, +${b}, ×2...」の順に続く。${seq.join(", ")}, ? に入る数字は？`,
      answers: [String(answer), toFullWidthNumber(answer)],
      hint: "同じ処理を毎回するのではなく、2つの処理が交互に出ます。",
      explanation: `${seq[3]}の次は×2で${seq[4]}、その次は+${b}なので${answer}です。`,
      tags: ["交互操作", "数列"],
    });
  }

  for (let i = 1; i <= 33; i += 1) {
    const base = (i % 6) + 2;
    const seq = [base ** 2 - 1, base ** 2, base ** 2 + 1, (base + 1) ** 2 - 1, (base + 1) ** 2, (base + 1) ** 2 + 1];
    const answer = (base + 2) ** 2 - 1;
    out.push({
      skill: "pattern",
      level: 4,
      text: `平方数の前後を拾う列。${seq.join(", ")}, ? に入る数字は？`,
      answers: [String(answer), toFullWidthNumber(answer)],
      hint: "4,9,16,25のような平方数と、その前後に注目します。",
      explanation: `${base ** 2 - 1}, ${base ** 2}, ${base ** 2 + 1}の次は${(base + 1) ** 2 - 1}, ${(base + 1) ** 2}, ${(base + 1) ** 2 + 1}。次は${answer}です。`,
      tags: ["平方数", "近傍"],
    });
  }

  const systems = [
    { name: "方角", cycle: ["北", "東", "南", "西"], step: 1 },
    { name: "曜日", cycle: ["月", "火", "水", "木", "金", "土", "日"], step: 2 },
    { name: "季節", cycle: ["春", "夏", "秋", "冬"], step: 1 },
    { name: "干支", cycle: ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"], step: 3 },
    { name: "音階", cycle: ["ド", "レ", "ミ", "ファ", "ソ", "ラ", "シ"], step: 2 },
  ];
  for (let i = 0; out.length < 100; i += 1) {
    const system = systems[i % systems.length];
    const start = i % system.cycle.length;
    const seq = Array.from({ length: 5 }, (_, offset) => system.cycle[(start + offset * system.step) % system.cycle.length]);
    const answer = system.cycle[(start + 5 * system.step) % system.cycle.length];
    out.push({
      skill: "pattern",
      level: 3 + (i % 3),
      text: `${system.name}の並びを${system.step}つずつ進める。${seq.join(" → ")} → ?`,
      answers: [answer],
      hint: "元の順番を思い出し、毎回同じ数だけ飛ばします。",
      explanation: `${system.cycle.join("→")}を${system.step}つずつ進むので、次は「${answer}」です。`,
      tags: ["周期", "飛ばし読み"],
    });
  }

  return out.slice(0, 100);
}

function buildWordQuestions() {
  const chains = [
    ["雨", "あめ", "飴"], ["橋", "はし", "箸"], ["雲", "くも", "蜘蛛"], ["花", "はな", "鼻"],
    ["紙", "かみ", "神"], ["海", "うみ", "膿"], ["城", "しろ", "白"], ["柿", "かき", "牡蠣"],
    ["松", "まつ", "待つ"], ["帰る", "かえる", "蛙"],
  ];
  const hiddenSentences = [
    ["あさひが のぼる かげに ぎんの かぎ", "かぎ"],
    ["ほしを たどれば ひみつの とびら", "とびら"],
    ["みぎへ すすみ きたの ちずを ひらく", "ちず"],
    ["こたえは まだ いわず ひかりを さがす", "ひかり"],
    ["ふるい とけいの うらに きたと ある", "きた"],
  ];
  const out = [];

  chains.forEach(([left, reading, right]) => {
    out.push({
      skill: "word",
      level: 3,
      text: `「${left}」と「${right}」は意味が違うが読みは同じ。この読みをひらがなで答えよ。`,
      answers: [reading],
      hint: "同音異義語です。漢字の意味ではなく音を見ます。",
      explanation: `「${left}」も「${right}」も読みは「${reading}」です。`,
      tags: ["同音異義語", "読み"],
    });
  });

  hiddenSentences.forEach(([sentence, answer]) => {
    out.push({
      skill: "word",
      level: 4,
      text: `文章から、謎解きで使うキーワードを1つ探せ。\n${sentence}`,
      answers: [answer],
      hint: "文全体の意味より、手がかりになりそうな名詞を拾います。",
      explanation: `文中に「${answer}」が隠れています。探索対象を限定すると拾いやすくなります。`,
      tags: ["隠し言葉", "抽出"],
    });
  });

  const transforms = [
    ["なぞとき", "1,3,5文字目", "なとき"], ["ひらめき", "2,4文字目", "らめ"], ["からくり", "奇数番目", "かくり"],
    ["こたえあわせ", "偶数番目", "たあせ"], ["あんごうひょう", "1,4,7文字目", "あうょ"],
    ["てがかり", "最後から2文字", "かり"], ["しめきり", "先頭2文字", "しめ"], ["ほうそく", "2文字目から3文字", "うそ"],
  ];
  transforms.forEach(([word, rule, answer], index) => {
    out.push({
      skill: "word",
      level: 4 + (index % 2),
      text: `「${word}」から${rule}だけを読むと？`,
      answers: [answer],
      hint: "文字数を数え、指定された位置だけを抜き出します。",
      explanation: `指定位置だけを抽出すると「${answer}」になります。`,
      tags: ["文字抽出", "位置"],
    });
  });

  const analogies = [
    ["朝", "昼", "夕", "夜"], ["入口", "出口", "開始", "終了"], ["上", "下", "右", "左"], ["表", "裏", "明", "暗"],
    ["北", "南", "東", "西"], ["過去", "未来", "原因", "結果"], ["問題", "解答", "鍵", "扉"], ["問い", "答え", "暗号", "解読"],
  ];
  for (let i = 0; out.length < 100; i += 1) {
    const [a, b, c, d] = analogies[i % analogies.length];
    out.push({
      skill: "word",
      level: 3 + (i % 3),
      text: `関係をそろえる問題。${a} : ${b} = ${c} : ?`,
      answers: [d],
      hint: "左の2語の関係を、右の語にも当てはめます。",
      explanation: `${a}と${b}の関係に対応するように、${c}の相手は「${d}」です。`,
      tags: ["類推", "関係"],
    });
  }

  return out.slice(0, 100);
}

function buildNumberQuestions() {
  const out = [];
  for (let i = 1; i <= 34; i += 1) {
    const a = (i % 7) + 2;
    const b = (i % 5) + 3;
    const c = a + b;
    const answer = b * c + b + c;
    out.push({
      skill: "number",
      level: 3 + (i % 3),
      text: `暗号式では「${a}◇${b}=${a * b + a + b}」。規則は「左×右+左+右」。では ${b}◇${c} は？`,
      answers: [String(answer), toFullWidthNumber(answer)],
      hint: "◇は普通の演算記号ではなく、決められた処理です。",
      explanation: `${b}◇${c}=${b}×${c}+${b}+${c}=${answer}です。`,
      tags: ["独自演算", "規則適用"],
    });
  }

  for (let i = 1; i <= 33; i += 1) {
    const top = (i % 8) + 3;
    const left = (i % 6) + 2;
    const right = top + left;
    const bottom = top * left - right;
    const answer = right + bottom - left;
    out.push({
      skill: "number",
      level: 4,
      text: `四つの数の関係は「右+下-左=中央」。上=${top}, 左=${left}, 右=${right}, 下=${bottom} の中央は？`,
      answers: [String(answer), toFullWidthNumber(answer)],
      hint: "全部を使うとは限りません。指定された式だけを使います。",
      explanation: `中央=右+下-左なので、${right}+${bottom}-${left}=${answer}です。`,
      tags: ["条件式", "図形数"],
    });
  }

  for (let i = 1; out.length < 100; i += 1) {
    const start = (i % 9) + 10;
    const route = [start, start - 3, (start - 3) * 2, (start - 3) * 2 + 5];
    const answer = route[3] - route[0];
    out.push({
      skill: "number",
      level: 3 + (i % 3),
      text: `数字迷路。${start}から「-3 → ×2 → +5」と進む。最終値は開始値よりいくつ大きい？`,
      answers: [String(answer), toFullWidthNumber(answer)],
      hint: "最終値を出してから、開始値との差を取ります。",
      explanation: `${start}→${route[1]}→${route[2]}→${route[3]}。差は${route[3]}-${start}=${answer}です。`,
      tags: ["手順処理", "差分"],
    });
  }

  return out.slice(0, 100);
}

function buildObserveQuestions() {
  const out = [];
  const pairs = [
    ["未完成", "末完成", "1文字目の横線"],
    ["日時計", "目時計", "1文字目の中線"],
    ["土曜日", "士曜日", "1文字目の横線"],
    ["シグナル", "ツグナル", "点の向き"],
    ["ソケット", "ンケット", "はらいの向き"],
    ["開門時刻", "開問時刻", "中の部品"],
    ["記録番号A7", "記録番号A1", "末尾の数字"],
    ["NORTH-12", "N0RTH-12", "Oと0"],
    ["暗号表B", "暗号裏B", "表と裏"],
    ["右回り", "石回り", "上の線"],
  ];

  for (let i = 0; i < 50; i += 1) {
    const [normal, different, reason] = pairs[i % pairs.length];
    const position = (i % 3) + 1;
    const items = [normal, normal, normal];
    items[position - 1] = different;
    out.push({
      skill: "observe",
      level: 3 + (i % 3),
      text: `「${items[0]}」「${items[1]}」「${items[2]}」違っているものは何番目？`,
      answers: [String(position), toFullWidthNumber(position), `${position}番目`],
      hint: reason,
      explanation: `${position}番目だけ「${different}」です。違いは${reason}にあります。`,
      tags: ["違い探し", "細部比較"],
    });
  }

  const countTargets = [
    ["明日、門前で時計を見る", "日", "2"],
    ["森の奥で木札を三つ拾う", "木", "4"],
    ["品番口口-17を記録", "口", "5"],
    ["州州という記号が残る", "点", "6"],
    ["間に日、問に口がある", "口", "1"],
    ["暗号表の裏を見ろ", "表", "1"],
    ["北東南西の地図を開く", "方角", "4"],
    ["A1 B2 C3 D4", "数字", "4"],
    ["赤青赤黄赤", "赤", "3"],
    ["右左右左上", "左", "2"],
  ];
  for (let i = 0; out.length < 100; i += 1) {
    const [line, target, answer] = countTargets[i % countTargets.length];
    out.push({
      skill: "observe",
      level: 3 + (i % 3),
      text: `次のメモから「${target}」に当たるものはいくつ見える？\n${line}`,
      answers: [answer, toFullWidthNumber(Number(answer))],
      hint: "文字そのもの、部品、記号の両方を数える問題です。",
      explanation: `メモ内で「${target}」として数えられるものは${answer}つです。`,
      tags: ["観察", "数え上げ"],
    });
  }

  return out.slice(0, 100);
}

function railFence(text) {
  const top = [...text].filter((_, index) => index % 2 === 0).join("");
  const bottom = [...text].filter((_, index) => index % 2 === 1).join("");
  return { top, bottom, encoded: top + bottom };
}

function caesar(text, shift) {
  return text.replace(/[A-Z]/g, (char) => {
    const code = char.charCodeAt(0) - 65;
    return String.fromCharCode(((code + shift + 26) % 26) + 65);
  });
}

function shiftKana(text, shift, kana) {
  return [...text].map((char) => {
    const index = kana.indexOf(char);
    if (index < 0) return char;
    return kana[(index + shift) % kana.length];
  }).join("");
}

function toFullWidthNumber(value) {
  return String(value).replace(/[0-9]/g, (digit) => String.fromCharCode(digit.charCodeAt(0) + 0xfee0));
}

let state = loadState();
let selectedSkill = state.selectedSkill || "cipher";
let currentQuestion = 0;
let activeScreen = "skills";

const skillMap = document.querySelector("#skillMap");
const answerForm = document.querySelector("#answerForm");
const answerInput = document.querySelector("#answerInput");
const feedback = document.querySelector("#feedback");
const explanation = document.querySelector("#explanation");
const screenEls = [...document.querySelectorAll(".screen")];
const tabButtons = [...document.querySelectorAll(".bottom-nav button[data-target-screen]")];

function loadState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return {
      total: 0,
      correct: 0,
      combo: 0,
      hints: 3,
      reviews: [],
      masteryBoost: {},
      selectedSkill: "cipher",
      ...parsed,
    };
  } catch {
    return { total: 0, correct: 0, combo: 0, hints: 3, reviews: [], masteryBoost: {}, selectedSkill: "cipher" };
  }
}

function saveState() {
  state.selectedSkill = selectedSkill;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function normalize(value) {
  return value.trim().toLowerCase().replace(/\s+/g, "").replace(/[！-～]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 0xfee0));
}

function renderSkills() {
  skillMap.innerHTML = "";
  skills.forEach((skill) => {
    const mastery = Math.min(100, skill.mastery + (state.masteryBoost[skill.id] || 0));
    const row = document.createElement("button");
    row.type = "button";
    row.className = `skill-row ${skill.id === selectedSkill ? "active" : ""} ${skill.unlocked ? "" : "locked"}`;
    row.setAttribute("role", "listitem");
    row.disabled = !skill.unlocked;
    row.innerHTML = `
      <div class="ring" style="--p:${mastery}%;--ring-color:${skill.color}">
        <div class="ring-inner">${mastery}<span>%</span><small>習得度</small></div>
      </div>
      <div class="skill-icon"><i data-lucide="${skill.icon}"></i></div>
      <div class="skill-info">
        <h3>${skill.name}</h3>
        <p>${skill.desc}</p>
        <span class="recommend">おすすめドリル</span>
        <p>${skill.drill}</p>
      </div>
      <div class="arrow"><i data-lucide="chevron-right"></i></div>
    `;
    row.addEventListener("click", () => {
      selectedSkill = skill.id;
      currentQuestion = findNextQuestionIndex();
      state.hints = Math.max(1, state.hints);
      hideResult();
      render();
      showScreen("drill");
      requestAnimationFrame(() => answerInput.focus());
    });
    skillMap.append(row);
  });
}

function skillQuestions() {
  return questions.filter((question) => question.skill === selectedSkill);
}

function findNextQuestionIndex() {
  const first = questions.findIndex((question) => question.skill === selectedSkill);
  return first >= 0 ? first : 0;
}

function current() {
  const list = skillQuestions();
  const question = list.find((item) => item === questions[currentQuestion]);
  return question || list[0] || questions[0];
}

function questionPosition(question) {
  const list = skillQuestions();
  return `${list.indexOf(question) + 1} / ${list.length}`;
}

function renderQuestion() {
  const question = current();
  const skill = skills.find((item) => item.id === question.skill);
  const visual = document.querySelector("#questionVisual");
  const image = document.querySelector("#questionImage");
  const graphic = document.querySelector("#questionGraphic");
  document.querySelector("#categoryPill").textContent = `${skill.name} Lv.${question.level}`;
  document.querySelector("#questionIndex").textContent = questionPosition(question);
  document.querySelector("#questionText").textContent = question.text;
  graphic.innerHTML = question.visualHtml || "";
  if (question.visualHtml) {
    image.removeAttribute("src");
    image.alt = "";
    image.hidden = true;
    visual.hidden = false;
  } else if (question.image) {
    image.src = question.image;
    image.alt = question.imageAlt || "謎解き問題の画像";
    image.hidden = false;
    visual.hidden = false;
  } else {
    image.removeAttribute("src");
    image.alt = "";
    image.hidden = true;
    visual.hidden = true;
  }
  document.querySelector("#hintCount").textContent = state.hints;
  document.querySelector("#challengeHeading").textContent = skill.drill;
}

function renderStats() {
  const level = 1 + Math.floor(state.correct / 25);
  document.querySelector("#levelNumber").textContent = level;
  document.querySelector("#badgeLevel").textContent = level;
  document.querySelector("#totalAnswers").textContent = state.total;
  document.querySelector("#streakDays").textContent = state.total > 0 ? 2 : 1;
  document.querySelector("#unlockedSkills").textContent = skills.filter((skill) => skill.unlocked).length;
  document.querySelector("#accuracyRate").textContent = state.total ? `${Math.round((state.correct / state.total) * 100)}%` : "0%";
  document.querySelector("#currentCombo").textContent = state.combo;
  document.querySelector("#reviewCount").textContent = state.reviews.length;
  renderWeakTags();
}

function renderWeakTags() {
  const tagCounts = {};
  state.reviews.forEach((tag) => {
    tagCounts[tag] = (tagCounts[tag] || 0) + 1;
  });
  const tags = Object.keys(tagCounts).sort((a, b) => tagCounts[b] - tagCounts[a]).slice(0, 6);
  document.querySelector("#weakTags").innerHTML = tags.length
    ? tags.map((tag) => `<span>${tag} ${tagCounts[tag]}</span>`).join("")
    : "<span>まだ弱点はありません</span>";
}

function render() {
  renderSkills();
  renderQuestion();
  renderStats();
  updateScreenVisibility();
  if (window.lucide) lucide.createIcons();
  saveState();
}

function checkAnswer(event) {
  event.preventDefault();
  const question = current();
  const answer = normalize(answerInput.value);
  if (!answer) {
    setFeedback("答えを入力してから判定します。", "bad");
    return;
  }

  const correct = question.answers.some((item) => normalize(item) === answer);
  state.total += 1;

  if (correct) {
    state.correct += 1;
    state.combo += 1;
    state.masteryBoost[question.skill] = (state.masteryBoost[question.skill] || 0) + 2;
    setFeedback(`正解です。${state.combo}問連続で解けています。`, "good");
  } else {
    state.combo = 0;
    state.reviews.push(...question.tags);
    setFeedback("惜しいです。ヒントか解説を見て、考え方を復習しましょう。", "bad");
  }

  showExplanation();
  renderStats();
  renderSkills();
}

function setFeedback(message, type) {
  feedback.textContent = message;
  feedback.className = `feedback ${type}`;
}

function showHint() {
  const question = current();
  if (state.hints <= 0) {
    setFeedback("今日のヒントは使い切りました。答えを見るか、別の分野で練習しましょう。", "bad");
    return;
  }
  state.hints -= 1;
  setFeedback(question.hint, "");
  document.querySelector("#hintCount").textContent = state.hints;
  saveState();
}

function showAnswer() {
  const question = current();
  state.reviews.push(...question.tags);
  setFeedback(`答え: ${question.answers[0]}`, "bad");
  showExplanation();
  renderStats();
  saveState();
}

function showExplanation() {
  const question = current();
  document.querySelector("#explanationText").textContent = question.explanation;
  explanation.hidden = false;
}

function hideResult() {
  feedback.textContent = "";
  feedback.className = "feedback";
  explanation.hidden = true;
  answerInput.value = "";
}

function nextQuestion() {
  const list = skillQuestions();
  const currentInList = list.findIndex((item) => item === current());
  const next = list[(currentInList + 1) % list.length];
  currentQuestion = questions.indexOf(next);
  hideResult();
  render();
}

function showScreen(screenName) {
  activeScreen = screenName;
  updateScreenVisibility();
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (window.lucide) lucide.createIcons();
}

function updateScreenVisibility() {
  screenEls.forEach((screen) => {
    screen.hidden = screen.dataset.screen !== activeScreen;
  });
  tabButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.targetScreen === activeScreen);
  });
}

answerForm.addEventListener("submit", checkAnswer);
document.querySelector("#hintButton").addEventListener("click", showHint);
document.querySelector("#showAnswerButton").addEventListener("click", showAnswer);
document.querySelector("#nextButton").addEventListener("click", nextQuestion);
document.querySelector("#recordsButton").addEventListener("click", () => showScreen("records"));

function resetLearningData() {
  if (!confirm("学習データをリセットしますか？")) return;
  localStorage.removeItem(STORAGE_KEY);
  state = loadState();
  selectedSkill = "cipher";
  currentQuestion = 0;
  activeScreen = "skills";
  hideResult();
  render();
}

document.querySelector("#resetButton").addEventListener("click", resetLearningData);
document.querySelector("#profileResetButton").addEventListener("click", resetLearningData);
document.querySelector("#startDailyButton").addEventListener("click", () => {
  selectedSkill = skills.find((skill) => skill.unlocked && (skill.mastery + (state.masteryBoost[skill.id] || 0)) < 100)?.id || "cipher";
  currentQuestion = findNextQuestionIndex();
  hideResult();
  render();
  showScreen("drill");
});

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    showScreen(button.dataset.targetScreen);
  });
});

currentQuestion = findNextQuestionIndex();
render();
