import fs from "node:fs";
import path from "node:path";

const roots = [
  "C:/Users/kogit/Documents/Codex/CrimsonClinicMystery",
  "C:/Users/kogit/Documents/Codex/CrimsonClinicMystery_BoothPackage/CrimsonClinicMystery_Booth_v1"
];

const replacements = [
  [/1997年10月6日/g, "2010年10月6日"],
  [/1997年10月7日/g, "2010年10月7日"],
  [/1997年10月8日/g, "2010年10月8日"],
  [/1997年10月9日/g, "2010年10月9日"],
  [/1997年/g, "2010年"],
  [/1997\/10\/06/g, "2010/10/06"],
  [/1997\/10\/07/g, "2010/10/07"],
  [/1997\/10\/08/g, "2010/10/08"],
  [/1997\/10\/09/g, "2010/10/09"],
  [/1997\/10\/10/g, "2010/10/10"],
  [/1997\/10\/11/g, "2010/10/11"],
  [/1997\/10\/12/g, "2010/10/12"],
  [/1997\/10\/15/g, "2010/10/15"],
  [/1997\/10\/16/g, "2010/10/16"],
  [/1997\.10\.05/g, "2010.10.05"],
  [/1997\.10\.06/g, "2010.10.06"],
  [/1997\.10\.07/g, "2010.10.07"],
  [/1997\.10\.08/g, "2010.10.08"],
  [/1997\.10\.09/g, "2010.10.09"],
  [/1997\.10\.10/g, "2010.10.10"],
  [/1997\.10\.11/g, "2010.10.11"],
  [/1997\.10\.12/g, "2010.10.12"],
  [/1997\.10\.15/g, "2010.10.15"],
  [/1997\.10\.16/g, "2010.10.16"],
  [/平成九年/g, "2010年"],
  [/1997年風/g, "2010年頃の無料ブログ風"],
  [/1997年前後/g, "2010年前後"]
];

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(p));
    else if (/\.(html|css|js|md)$/.test(entry.name)) out.push(p);
  }
  return out;
}

for (const root of roots) {
  for (const file of walk(root)) {
    let text = fs.readFileSync(file, "utf8");
    const before = text;
    for (const [from, to] of replacements) text = text.replace(from, to);
    text = text.replace(
      /<h2>残された<wbr>記録ではなく、<wbr>抜かれた<wbr>番号を見る。<\/h2>\s*/g,
      ""
    );
    text = text.replace(
      /<p>酸素バルブ、薬剤棚、夜間カードのログを保管する閲覧端末です。公開記録では、欠落と制限が同じ一覧に混在しています。<\/p>/g,
      "<p>酸素バルブ、薬剤棚、夜間カードのログを保管する閲覧端末です。</p>"
    );
    if (text !== before) fs.writeFileSync(file, text, "utf8");
  }
}

const blog = `<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>みかログ | 紅坂診療所 カルテ改竄事件</title>
<link rel="stylesheet" href="../site.css">
</head>
<body class="blog2010-real">
<header class="blog10-header">
  <div>
    <h1>みかログ</h1>
    <p>日々のこと、写真、仕事じゃないメモ。</p>
  </div>
  <aside>since 2010 / free blog template</aside>
</header>
<main class="blog10-wrap">
  <section class="blog10-posts">
    <article><time>2010/10/08</time><h2>赤い鍵札</h2><p>赤い鍵札を見た。夜間カードと一緒に置かれていた気がする。あの廊下、夜は通らない方がいい。</p><p class="blog10-meta">カテゴリ: 日記 / コメント: 0 / トラックバック: 0</p></article>
    <article><time>2010/10/07</time><h2>雨</h2><p>駅前で傘を買った。診療所の裏口が開いていて、すぐ閉まった。</p><p class="blog10-meta">カテゴリ: 近所 / コメント: 2 / トラックバック: 0</p></article>
    <article><time>2010/10/06</time><h2>夜</h2><p>サイレンではなく、何かが倒れた音。気のせいかもしれない。</p><p class="blog10-meta">カテゴリ: メモ / コメント: 1 / トラックバック: 0</p></article>
    <article><time>2010/09/29</time><h2>テンプレ変更</h2><p>無料ブログのテンプレートを変えた。広告が少し大きくなったけど、前より読みやすい。</p><p class="blog10-meta">カテゴリ: サイト / コメント: 4 / トラックバック: 1</p></article>
  </section>
  <aside class="blog10-side">
    <section><h2>プロフィール</h2><p>みか / 紅坂の近く。写真と買い物メモ。</p></section>
    <section><h2>月別アーカイブ</h2><p>2010年10月</p><p>2010年9月</p><p>2010年8月</p></section>
    <section><h2>広告</h2><p>無料ブログ版のため広告表示中。</p></section>
  </aside>
</main>
<script src="../textflow.js"></script>
</body>
</html>`;

for (const root of roots) {
  fs.writeFileSync(path.join(root, "web/blog/index.html"), blog, "utf8");
}

fs.appendFileSync("C:/Users/kogit/Documents/Codex/CrimsonClinicMystery/HANDOFF.md", `

## 2026-05-18 年代変更と記録保管室コピー修正

- 物語年代を2010年頃へ変更。
- 作品内の日付表記を2010年系へ統一。
- 記録保管室の「残された記録ではなく、抜かれた番号を見る。」を削除。
- ブログを1997年風個人ホームページから、2010年頃の無料ブログ風へ変更。
- Booth用フォルダ側にも反映。
`, "utf8");

console.log("updated CrimsonClinicMystery to 2010 era");
