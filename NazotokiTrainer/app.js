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
  const words = [
    ["CAT", "ねこ"], ["DOG", "いぬ"], ["SUN", "たいよう"], ["MOON", "つき"], ["STAR", "ほし"],
    ["BOOK", "ほん"], ["FISH", "さかな"], ["BIRD", "とり"], ["TREE", "き"], ["RAIN", "あめ"],
    ["FIRE", "ひ"], ["WIND", "かぜ"], ["ROCK", "いし"], ["KEY", "かぎ"], ["DOOR", "とびら"],
    ["MAP", "ちず"], ["TIME", "じかん"], ["WATER", "みず"], ["LIGHT", "ひかり"], ["NIGHT", "よる"],
  ];
  const kanaWords = ["いろは", "なぞ", "ひらめき", "こたえ", "しかく", "すうじ", "ことば", "ちず", "かぎ", "とけい"];
  const kana = "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん";
  const out = [];

  words.forEach(([plain, jp], index) => {
    const shift = (index % 9) + 1;
    const encoded = caesar(plain, shift);
    out.push({
      skill: "cipher",
      level: 1 + (index % 5),
      text: `英字を${shift}文字戻す暗号です。「${encoded}」が表す日本語は？`,
      answers: [jp, plain],
      hint: `Aの${shift}文字前は${caesar("A", -shift)}として、各文字を戻します。`,
      explanation: `${encoded}を${shift}文字戻すと${plain}です。対応する日本語は「${jp}」です。`,
      tags: ["シーザー暗号", "英字変換"],
    });
  });

  words.forEach(([plain, jp], index) => {
    const code = plain.split("").map((char) => char.charCodeAt(0) - 64).join("-");
    out.push({
      skill: "cipher",
      level: 1 + (index % 5),
      text: `A=1, B=2, C=3 の暗号で「${code}」は何を表す？`,
      answers: [plain, jp],
      hint: "数字をアルファベットの順番に戻します。",
      explanation: `${code}をアルファベット順に戻すと${plain}です。日本語なら「${jp}」です。`,
      tags: ["対応表", "英字変換"],
    });
  });

  words.forEach(([plain, jp], index) => {
    const reversed = plain.split("").reverse().join("");
    out.push({
      skill: "cipher",
      level: 1 + (index % 5),
      text: `文字が逆順になっています。「${reversed}」を正しく読むと？`,
      answers: [plain, jp],
      hint: "右から左へ読んでみます。",
      explanation: `${reversed}を逆から読むと${plain}です。日本語なら「${jp}」です。`,
      tags: ["逆読み", "文字順"],
    });
  });

  kanaWords.forEach((word, index) => {
    const shift = (index % 4) + 1;
    const encoded = shiftKana(word, shift, kana);
    out.push({
      skill: "cipher",
      level: 2 + (index % 4),
      text: `かなを${shift}文字戻す暗号です。「${encoded}」の元の言葉は？`,
      answers: [word],
      hint: "かな表の中で、各文字を同じ数だけ前に戻します。",
      explanation: `${encoded}の各文字を${shift}文字戻すと「${word}」になります。`,
      tags: ["かな暗号", "逆算"],
    });
  });

  for (let i = 0; out.length < 100; i += 1) {
    const [plain, jp] = words[i % words.length];
    const encoded = plain.replace(/[A-Z]/g, (char) => String.fromCharCode(155 - char.charCodeAt(0)));
    out.push({
      skill: "cipher",
      level: 3 + (i % 3),
      text: `AとZ、BとYのように反対側へ置き換える暗号です。「${encoded}」は何？`,
      answers: [plain, jp],
      hint: "アルファベットを前後反転した対応表で戻します。",
      explanation: `反転対応で${encoded}を戻すと${plain}です。日本語なら「${jp}」です。`,
      tags: ["反転暗号", "対応表"],
    });
  }

  return out.slice(0, 100);
}

function buildPatternQuestions() {
  const out = [];
  for (let i = 1; i <= 34; i += 1) {
    const start = (i % 7) + 1;
    const step = (i % 6) + 2;
    const seq = [start, start + step, start + step * 2, start + step * 3, start + step * 4];
    const answer = start + step * 5;
    out.push({
      skill: "pattern",
      level: 1 + (i % 5),
      text: `${seq.join(", ")}, ? に入る数字は？`,
      answers: [String(answer), toFullWidthNumber(answer)],
      hint: `毎回${step}ずつ増えています。`,
      explanation: `${start}から${step}ずつ増える等差数列です。次は${answer}です。`,
      tags: ["数列", "等差"],
    });
  }

  for (let i = 1; i <= 33; i += 1) {
    const start = (i % 5) + 1;
    const ratio = (i % 3) + 2;
    const seq = [start, start * ratio, start * ratio ** 2, start * ratio ** 3];
    const answer = start * ratio ** 4;
    out.push({
      skill: "pattern",
      level: 2 + (i % 4),
      text: `${seq.join(", ")}, ? に入る数字は？`,
      answers: [String(answer), toFullWidthNumber(answer)],
      hint: `前の数字に${ratio}をかけます。`,
      explanation: `毎回${ratio}倍になる等比数列です。次は${answer}です。`,
      tags: ["数列", "等比"],
    });
  }

  const cycles = [
    ["赤", "青"], ["上", "右", "下", "左"], ["月", "火", "水", "木", "金", "土", "日"],
    ["春", "夏", "秋", "冬"], ["朝", "昼", "夕", "夜"],
  ];
  for (let i = 0; out.length < 100; i += 1) {
    const cycle = cycles[i % cycles.length];
    const start = i % cycle.length;
    const seq = Array.from({ length: 6 }, (_, offset) => cycle[(start + offset) % cycle.length]);
    const answer = cycle[(start + 6) % cycle.length];
    out.push({
      skill: "pattern",
      level: 1 + (i % 5),
      text: `${seq.join(", ")}, ? に入る言葉は？`,
      answers: [answer],
      hint: "同じ並びがくり返されています。",
      explanation: `${cycle.join("→")}の周期で並んでいます。次は「${answer}」です。`,
      tags: ["周期", "順序"],
    });
  }

  return out.slice(0, 100);
}

function buildWordQuestions() {
  const removeWords = [
    "たぬき", "かきくけこ", "すなば", "なぞとき", "ひらめき", "ことばあそび", "からくり", "まちがい", "しりとり", "あんごう",
    "こたえあわせ", "れんそう", "きりかえ", "よみとり", "なぞなぞ", "はんてい", "ぶんせき", "そうぞう", "きろく", "ふくしゅう",
  ];
  const out = [];

  removeWords.forEach((word, index) => {
    const target = word[Math.min(word.length - 1, index % word.length)];
    const answer = word.replace(target, "");
    out.push({
      skill: "word",
      level: 1 + (index % 5),
      text: `「${word}」から「${target}」を1つ抜くと？`,
      answers: [answer],
      hint: "指定された文字を1文字だけ消します。",
      explanation: `「${word}」から「${target}」を抜くと「${answer}」です。`,
      tags: ["文字操作", "指示読み"],
    });
  });

  const starts = [
    ["朝", "雨", "足", "読みが「あ」で始まる", "あ"],
    ["猫", "ねじ", "ネオン", "読みが「ね」で始まる", "ね"],
    ["空", "そば", "掃除", "読みが「そ」で始まる", "そ"],
    ["鍵", "風", "紙", "読みが「か」で始まる", "か"],
    ["水", "道", "緑", "読みが「み」で始まる", "み"],
  ];
  for (let i = 0; i < 30; i += 1) {
    const set = starts[i % starts.length];
    out.push({
      skill: "word",
      level: 2 + (i % 4),
      text: `「${set[0]}」「${set[1]}」「${set[2]}」に共通する読みの条件は？`,
      answers: [set[3], `${set[4]}で始まる`, `読みが${set[4]}から始まる`],
      hint: "漢字の意味ではなく読み方の先頭に注目します。",
      explanation: `どれも読みが「${set[4]}」から始まります。`,
      tags: ["読み", "共通点"],
    });
  }

  const compounds = [
    ["温度計", "温度"], ["雨量計", "雨量"], ["速度計", "速度"], ["体温計", "体温"], ["歩数計", "歩数"],
    ["方位磁針", "方位"], ["地図帳", "地図"], ["暗号表", "暗号"], ["問題集", "問題"], ["解答欄", "解答"],
  ];
  compounds.forEach(([word, answer], index) => {
    out.push({
      skill: "word",
      level: 2 + (index % 4),
      text: `「${word}」は主に何に関係する言葉？`,
      answers: [answer],
      hint: "言葉を前半と後半に分けて考えます。",
      explanation: `「${word}」は「${answer}」に関係する言葉です。複合語を分解すると見えやすくなります。`,
      tags: ["複合語", "意味分解"],
    });
  });

  const shiritori = ["りんご", "ごりら", "らっぱ", "ぱんだ", "だるま", "まくら", "らくだ", "だいす", "すいか", "かめら"];
  for (let i = 0; out.length < 100; i += 1) {
    const word = shiritori[i % shiritori.length];
    const answer = word[word.length - 1];
    out.push({
      skill: "word",
      level: 1 + (i % 5),
      text: `しりとりで「${word}」の次の言葉は、何の音から始める？`,
      answers: [answer],
      hint: "最後の文字を見ます。",
      explanation: `「${word}」の最後は「${answer}」なので、次は「${answer}」から始めます。`,
      tags: ["しりとり", "末尾"],
    });
  }

  return out.slice(0, 100);
}

function buildNumberQuestions() {
  const out = [];
  for (let i = 1; i <= 40; i += 1) {
    const a = (i % 9) + 2;
    const b = (i % 7) + 3;
    const answer = a * b + i;
    out.push({
      skill: "number",
      level: 1 + (i % 5),
      text: `${a} × ${b} + ${i} = ?`,
      answers: [String(answer), toFullWidthNumber(answer)],
      hint: "先に掛け算をしてから足します。",
      explanation: `${a}×${b}=${a * b}、そこに${i}を足して${answer}です。`,
      tags: ["四則演算", "順序"],
    });
  }

  for (let i = 1; i <= 30; i += 1) {
    const answer = (i % 12) + 4;
    const add = (i % 6) + 1;
    const total = answer + add;
    out.push({
      skill: "number",
      level: 2 + (i % 4),
      text: `□ + ${add} = ${total}。□に入る数字は？`,
      answers: [String(answer), toFullWidthNumber(answer)],
      hint: `${total}から${add}を引きます。`,
      explanation: `${total}-${add}=${answer}なので、□は${answer}です。`,
      tags: ["方程式", "逆算"],
    });
  }

  for (let i = 1; out.length < 100; i += 1) {
    const base = (i % 18) + 2;
    const answer = base * 4;
    out.push({
      skill: "number",
      level: 1 + (i % 5),
      text: `${base}を2倍して、さらに2倍すると？`,
      answers: [String(answer), toFullWidthNumber(answer)],
      hint: "2倍を2回するので、全体では4倍です。",
      explanation: `${base}×2×2=${answer}です。段階を分けて処理します。`,
      tags: ["倍率", "段階処理"],
    });
  }

  return out.slice(0, 100);
}

function buildObserveQuestions() {
  const out = [];
  const pairs = [
    ["ナゾトキ", "ナゾドキ", "3文字目の濁点"],
    ["ABCDE", "ABCDF", "最後の文字"],
    ["未", "末", "横線の長さ"],
    ["土", "士", "上と下の横線"],
    ["シ", "ツ", "点の向き"],
    ["ソ", "ン", "はらいの向き"],
    ["日", "目", "中の横線"],
    ["口", "□", "角の形"],
    ["問", "間", "中の部品"],
    ["右", "石", "上の線"],
  ];

  for (let i = 0; i < 50; i += 1) {
    const [normal, different, reason] = pairs[i % pairs.length];
    const position = (i % 3) + 1;
    const items = [normal, normal, normal];
    items[position - 1] = different;
    out.push({
      skill: "observe",
      level: 1 + (i % 5),
      text: `「${items[0]}」「${items[1]}」「${items[2]}」違っているものは何番目？`,
      answers: [String(position), toFullWidthNumber(position), `${position}番目`],
      hint: reason,
      explanation: `${position}番目だけ「${different}」です。違いは${reason}にあります。`,
      tags: ["違い探し", "細部比較"],
    });
  }

  const countTargets = [
    ["目", "横線", "2"], ["田", "四角", "4"], ["森", "木", "3"], ["晶", "日", "3"], ["品", "口", "3"],
    ["川", "縦線", "3"], ["州", "点", "3"], ["問", "口", "1"], ["間", "日", "1"], ["明", "部品", "2"],
  ];
  for (let i = 0; out.length < 100; i += 1) {
    const [char, target, answer] = countTargets[i % countTargets.length];
    out.push({
      skill: "observe",
      level: 1 + (i % 5),
      text: `漢字「${char}」の中に、${target}はいくつ見える？`,
      answers: [answer, toFullWidthNumber(Number(answer))],
      hint: "形を部品に分けて数えます。",
      explanation: `「${char}」の中で${target}として見える部分は${answer}つです。`,
      tags: ["漢字観察", "部品分解"],
    });
  }

  return out.slice(0, 100);
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
