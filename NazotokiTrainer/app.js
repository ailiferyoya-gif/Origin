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
questions.push(...buildQuestionBank());

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
  document.querySelector("#categoryPill").textContent = `${skill.name} Lv.${question.level}`;
  document.querySelector("#questionIndex").textContent = questionPosition(question);
  document.querySelector("#questionText").textContent = question.text;
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
