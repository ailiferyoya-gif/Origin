import fs from "node:fs";
import path from "node:path";

const root = "C:/Users/kogit/Documents/Codex";
const projects = [
  ["CrimsonClinicMystery","紅坂診療所","夜間カード","裏口廊下"],
  ["NamikazeFerryMystery","波風フェリー","保守キー","機関室側通路"],
  ["KarasunoCableMystery","烏野ケーブル","制御盤キー","非常階段扉"],
  ["AonagiDataCenterMystery","青凪データセンター","ラックキー","東側搬入口"],
  ["ShiranuiOnsenMystery","不知火温泉","機械室札","露天風呂側通路"],
  ["KurobaraCinemaMystery","黒薔薇シネマ","映写室キー","非常出口側階段"],
  ["TokiwaBroadcastMystery","常盤放送","副調キー","屋上送信機側扉"],
  ["HakurouMuseumMystery","白楼民俗資料館","収蔵庫鍵","搬出用裏扉"],
  ["MizukageDamMystery","水影ダム","ゲート鍵","監査廊南扉"],
  ["TsukishiroHotelMystery","月白ホテル","マスターキー","従業員階段"],
];

function mkdir(p) { fs.mkdirSync(p, { recursive: true }); }
function write(file, text) { mkdir(path.dirname(file)); fs.writeFileSync(file, text, "utf8"); }
function copyDir(src, dst) { fs.rmSync(dst, { recursive: true, force: true }); fs.cpSync(src, dst, { recursive: true }); }

function html(title, body, cssDepth = 1, cls = "") {
  return `<!doctype html><html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title}</title><link rel="stylesheet" href="${"../".repeat(cssDepth)}site.css"></head><body class="${cls}">${body}<script src="${"../".repeat(cssDepth)}textflow.js"></script></body></html>`;
}

for (const [id, title, key, blocked] of projects) {
  const base = path.join(root, id, "web");
  const booth = path.join(root, `${id}_BoothPackage`, `${id}_Booth_v1`, "web");

  write(path.join(base, "mobile", "index.html"), `<!doctype html><html lang="ja"><head><meta charset="utf-8"><title>${title} 携帯版</title></head><body bgcolor="#ffffcc" text="#333333" link="#0000ee" vlink="#551a8b"><center><font size="4">★${title}携帯メモ★</font><br><marquee width="220">古い携帯向けページです</marquee><hr width="240"><table width="240" border="1" cellpadding="3" cellspacing="0" bgcolor="#ffffff"><tr><td><font size="2">[1]<a href="./log/index.html">保存ログ</a><br>[2]<a href="./old/index.html">古い告知</a><br>[3]<a href="./diary/index.html">管理人日記</a><br><br>このページはCSSを使っていません。<br>夜間の控えは小さい記号の先にあります。<br><font color="#ffffcc"><a href="./secret/index.html">.</a></font></font></td></tr></table></center></body></html>`);
  write(path.join(base, "mobile", "log", "index.html"), `<!doctype html><html lang="ja"><head><meta charset="utf-8"><title>保存ログ</title></head><body bgcolor="#eeeeff" text="#222222"><center><table width="240" border="1" cellpadding="3" cellspacing="0" bgcolor="#ffffff"><tr><td><font size="2">保存ログ<br>・掲示板転載<br>・古い写真の説明<br>・${key}という語が一度だけ出る<br><a href="../index.html">戻る</a></font></td></tr></table></center></body></html>`);
  write(path.join(base, "mobile", "old", "index.html"), `<!doctype html><html lang="ja"><head><meta charset="utf-8"><title>古い告知</title></head><body bgcolor="#ccffcc" text="#003300"><center><font size="2">工事中<br>昔の告知を移しています。<br>${blocked}は現在使用できません。<br><a href="../index.html">戻る</a></font></center></body></html>`);
  write(path.join(base, "mobile", "diary", "index.html"), `<!doctype html><html lang="ja"><head><meta charset="utf-8"><title>管理人日記</title></head><body bgcolor="#ffeef8" text="#330022"><center><font size="2">管理人日記<br>今日はリンク整理。<br>読めないページが多いので気にしないでください。<br>でも、点だけは消さない。<br><a href="../index.html">戻る</a></font></center></body></html>`);
  write(path.join(base, "mobile", "secret", "index.html"), `<!doctype html><html lang="ja"><head><meta charset="utf-8"><title>秘密メモ</title></head><body bgcolor="#000000" text="#cccccc"><center><table width="240" border="1" cellpadding="4" cellspacing="0" bgcolor="#111111"><tr><td><font size="2">秘密メモ<br>${key}を持った人は、${blocked}の側から戻ってきた。<br>このページは通常メニューから見えない。<br><a href="../index.html">戻る</a></font></td></tr></table></center></body></html>`);

  write(path.join(base, "photos", "index.html"), html(`${title} 写真保管`, `<header class="site-header"><div class="wrap"><h1>写真保管</h1><nav><a href="./contact/index.html">連絡焼き</a><a href="./memo/index.html">撮影メモ</a></nav></div></header><main class="wrap section grid two"><section class="box"><h2>資料写真</h2><p>公開写真には読める文字を入れず、現場の配置だけを確認できるようにしている。</p><p>${key}と${blocked}は別々の写真に写っているため、単独では意味が確定しない。</p></section><img src="../assets/evidence.png" alt=""></main>`, 1, "official"));
  write(path.join(base, "photos", "contact", "index.html"), html(`${title} 連絡焼き`, `<header class="site-header"><div class="wrap"><h1>連絡焼き</h1><nav><a href="../index.html">写真保管へ</a></nav></div></header><main class="wrap section"><section class="box"><h2>未採用カット</h2><table><tr><th>カットA</th><td>${key}の影が残る。</td></tr><tr><th>カットB</th><td>${blocked}側の床だけ濡れている。</td></tr><tr><th>カットC</th><td>公開資料では削除。</td></tr></table></section></main>`, 2, "official"));
  write(path.join(base, "photos", "memo", "index.html"), html(`${title} 撮影メモ`, `<header class="site-header"><div class="wrap"><h1>撮影メモ</h1><nav><a href="../index.html">写真保管へ</a></nav></div></header><main class="wrap section"><section class="box"><h2>メモ</h2><p>撮影者は「${blocked}を開ける音が二回」とだけ書き残している。新聞ではこの音に触れていない。</p></section></main>`, 2, "official"));

  write(path.join(base, "ledger", "index.html"), html(`${title} 補助台帳`, `<header class="site-header"><div class="wrap"><h1>補助台帳</h1><nav><a href="./daily/index.html">日次</a><a href="./audit/index.html">監査</a><a href="./discard/index.html">廃棄</a></nav></div></header><main class="wrap section"><section class="box"><h2>補助台帳</h2><p>主台帳に載らない小さな控え。検索結果には出にくいが、メールの語と照合できる。</p></section></main>`, 1, "municipal"));
  write(path.join(base, "ledger", "daily", "index.html"), html(`${title} 日次控え`, `<header class="site-header"><div class="wrap"><h1>日次控え</h1><nav><a href="../index.html">補助台帳へ</a></nav></div></header><main class="wrap section"><section class="box"><table><tr><th>朝</th><td>異常なし</td></tr><tr><th>夜</th><td>${key}の返却欄だけ翌日記入。</td></tr></table></section></main>`, 2, "municipal"));
  write(path.join(base, "ledger", "audit", "index.html"), html(`${title} 監査控え`, `<header class="site-header"><div class="wrap"><h1>監査控え</h1><nav><a href="../index.html">補助台帳へ</a></nav></div></header><main class="wrap section"><section class="box"><p>${blocked}の記録は通常点検に分類された。分類者名は黒塗りだが、業者請求書の筆跡と一致する。</p></section></main>`, 2, "municipal"));
  write(path.join(base, "ledger", "discard", "index.html"), html(`${title} 廃棄控え`, `<header class="site-header"><div class="wrap"><h1>廃棄控え</h1><nav><a href="../index.html">補助台帳へ</a></nav></div></header><main class="wrap section"><section class="box"><p>廃棄予定の控え。実際には廃棄されず、写真保管の未採用カットと同じ箱に残っていた。</p></section></main>`, 2, "municipal"));

  copyDir(base, booth);
  fs.appendFileSync(path.join(root, id, "HANDOFF.md"), "\n## 2026-05-18 追加\n\n- 携帯風ページ5ページを追加。CSSなし、隠しリンクあり。\n- 写真保管ページ3ページと補助台帳4ページを追加。\n- 各作品32HTMLページ構成に拡張。\n", "utf8");
}

console.log("expanded advanced 10 projects");
