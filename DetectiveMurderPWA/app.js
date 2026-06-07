const state = {
  tab: "story",
  storyRead: false,
  scene: "study",
  suspect: "secretary",
  opened: new Set(["study"]),
  contradictions: new Set(),
  questioned: new Set(),
  solved: false
};

const evidence = [
  { id: "study", title: "書斎の現場写真", img: "assets/scene-study.png", short: "椅子が倒れ、窓は内側から施錠。", body: "鳴瀬総一郎は雨夜の書斎で倒れていた。遺体の直接描写はないが、机上の乱れと閉じた窓が不自然だ。" },
  { id: "opener", title: "銀のペーパーナイフ", img: "assets/evidence-opener.png", short: "引き出しの奥に戻されていた。", body: "被害者のイニシャル入り。傷はあるが、決定的な凶器とは限らない。" },
  { id: "glass", title: "残留物のあるグラス", img: "assets/evidence-glass.png", short: "片方だけ白い輪染み。", body: "夕食後のワイン。薬品の可能性があり、医師と家政長の証言が割れる。" },
  { id: "letter", title: "脅迫状", img: "assets/evidence-letter.png", short: "署名なし。角が破れている。", body: "印字文書。破れた角は、誰かの手帳に残る紙片と一致するかもしれない。" },
  { id: "watch", title: "止まった懐中時計", img: "assets/evidence-watch.png", short: "10時17分で停止。", body: "書斎の机の下に落ちていた。濡れておらず、雨の侵入とは矛盾する。" },
  { id: "board", title: "邸内見取り図", img: "assets/evidence-board.png", short: "書斎、温室、食堂、玄関の動線。", body: "10時台に書斎へ行けた経路は三つ。玄関ホール、温室側廊下、食堂裏。" },
  { id: "footprint", title: "温室脇の足跡", img: "assets/evidence-footprint.png", short: "泥は温室から書斎側へ向かう。", body: "庭師の長靴とはサイズが違い、医師の革靴にも似ていない。" },
  { id: "ticket", title: "破れた観劇券とカフス", img: "assets/evidence-ticket.png", short: "玄関ホールの卓上に残る。", body: "女優のアリバイと、甥の外出証言の両方に関わる。" }
];

const scenes = [
  { id: "study", name: "書斎", img: "assets/scene-study.png", text: "被害者が発見された部屋。窓、机、引き出し、暖炉を調べられる。", finds: [
    ["机の下を調べる", "watch", "懐中時計を発見した。"],
    ["引き出しを調べる", "opener", "銀のペーパーナイフを発見した。"],
    ["暖炉の灰を見る", "letter", "焼け残った脅迫状を発見した。"]
  ]},
  { id: "dining", name: "食堂", img: "assets/evidence-glass.png", text: "夕食後、全員が一度ここに集まった。グラスの扱いが鍵になる。", finds: [
    ["ワイン台を調べる", "glass", "残留物のあるグラスを発見した。"],
    ["席順を確認する", "board", "邸内見取り図と席順を保存した。"]
  ]},
  { id: "greenhouse", name: "温室", img: "assets/evidence-footprint.png", text: "雨の直後、温室から書斎側へ続く泥の跡が残っていた。", finds: [
    ["温室脇の泥を見る", "footprint", "温室脇の足跡を記録した。"]
  ]},
  { id: "foyer", name: "玄関ホール", img: "assets/evidence-ticket.png", text: "来客の外套と傘が集められていた。ひとつだけ乾いた傘がある。", finds: [
    ["卓上の小物を見る", "ticket", "破れた観劇券とカフスを発見した。"]
  ]}
];

const suspects = [
  {
    id: "secretary",
    portrait: "assets/suspect-secretary.png",
    name: "葛城 澪",
    role: "秘書",
    relation: "被害者の執務と遺言管理を一手に任されていた。",
    profile: "冷静で几帳面。鳴瀬家の誰よりも書斎の書類配置に詳しい。",
    motive: "遺言書の差し替えを知っていた",
    alibi: "10時過ぎは書庫で書類整理",
    weak: ["letter", "watch"],
    contradiction: "脅迫状の紙片と秘書の手帳が一致する。10時17分の時計を見たはずなのに時刻を知らないと言った。",
    motiveTalk: [["探偵", "鳴瀬氏に恨みは？"], ["葛城", "恨みなど。私は仕事をしていただけです。"], ["探偵", "遺言書の差し替えを知っていたのでは。"], ["葛城", "……奥様にも、ご子息にも知らせていません。あれは先生の指示でした。"]],
    alibiTalk: [["探偵", "10時17分、あなたはどこに？"], ["葛城", "書庫です。明日の会議資料を揃えていました。"], ["探偵", "時計の音や叫び声は。"], ["葛城", "雨音が強くて、何も。時刻も見ていません。"]]
  },
  {
    id: "housekeeper",
    portrait: "assets/suspect-housekeeper.png",
    name: "馬淵 静江",
    role: "家政長",
    relation: "鳴瀬邸に二十八年勤め、食堂と客間を管理する。",
    profile: "礼儀正しいが、解雇通告後も表情を崩さない。",
    motive: "長年の不当解雇通告",
    alibi: "食堂で片付け",
    weak: ["glass", "board"],
    contradiction: "グラスの位置を入れ替えられるのは家政長だけ。ただし毒を入れた人物とは限らない。",
    motiveTalk: [["探偵", "解雇の話は本当ですか。"], ["馬淵", "ええ。ですが、殺すほどのことではありません。"], ["探偵", "二十八年を一枚の通知で終わらせる相手でも？"], ["馬淵", "……悔しくないと言えば嘘になります。"]],
    alibiTalk: [["探偵", "食堂で何を。"], ["馬淵", "グラスを下げ、銀器を数えていました。"], ["探偵", "グラスの位置は覚えていますか。"], ["馬淵", "旦那様のグラスだけ、奥の盆に置きました。いつもの癖です。"]]
  },
  {
    id: "nephew",
    portrait: "assets/suspect-nephew.png",
    name: "鳴瀬 透",
    role: "甥",
    relation: "被害者の甥。相続候補だったが、近く除外される予定だった。",
    profile: "軽薄に振る舞うが金銭の話になると声が低くなる。",
    motive: "相続から外される予定",
    alibi: "劇場から戻ったばかり",
    weak: ["ticket", "opener"],
    contradiction: "破れた観劇券が玄関にあり、外出アリバイは途中で崩れる。",
    motiveTalk: [["探偵", "相続から外されると聞いていましたか。"], ["透", "噂ですよ。伯父は脅すのが好きだった。"], ["探偵", "資金繰りに困っていた。"], ["透", "誰だって困る時はあります。殺しとは別だ。"]],
    alibiTalk: [["探偵", "劇場から何時に戻りましたか。"], ["透", "10時半過ぎです。開演後の挨拶までいました。"], ["探偵", "半券は？"], ["透", "外套のポケットに……あれ、ないな。"]]
  },
  {
    id: "doctor",
    portrait: "assets/suspect-doctor.png",
    name: "篠宮 怜",
    role: "主治医",
    relation: "被害者の持病と薬を管理していた主治医。",
    profile: "理知的で、医学的な断定を避ける言い回しが多い。",
    motive: "医療記録の隠蔽",
    alibi: "被害者の薬を確認していた",
    weak: ["glass", "footprint"],
    contradiction: "薬品の知識はあるが、温室の足跡と靴が合わない。",
    motiveTalk: [["探偵", "医療記録に隠したいことが？"], ["篠宮", "患者の情報は守秘義務があります。"], ["探偵", "鳴瀬氏に脅されていたのでは。"], ["篠宮", "脅迫ではない。あの人は誰にでも命令口調だった。"]],
    alibiTalk: [["探偵", "事件時は薬を確認していた？"], ["篠宮", "ええ。食後薬の数が合わなかった。"], ["探偵", "誰かが薬棚に触った？"], ["篠宮", "可能性はあります。私以外にも鍵を持つ者がいた。"]]
  },
  {
    id: "gardener",
    portrait: "assets/suspect-gardener.png",
    name: "橘 朔",
    role: "庭師",
    relation: "亡き夫人が愛した温室を守っている庭師。",
    profile: "寡黙。鳴瀬氏が温室売却を決めたことに強く反発していた。",
    motive: "温室売却への反発",
    alibi: "温室の排水対応",
    weak: ["footprint", "board"],
    contradiction: "温室にはいたが、足跡のサイズが違う。誰かに温室経路を使われた。",
    motiveTalk: [["探偵", "温室売却に反対していた。"], ["橘", "奥様の場所でした。金に替える場所じゃない。"], ["探偵", "鳴瀬氏と口論を？"], ["橘", "しました。でも殺していない。"]],
    alibiTalk: [["探偵", "10時台は温室に？"], ["橘", "排水溝が詰まっていました。雨が強かった。"], ["探偵", "書斎側の廊下は通れる？"], ["橘", "鍵があれば。俺の鍵では開かない。"]]
  },
  {
    id: "actress",
    portrait: "assets/suspect-actress.png",
    name: "白鳥 璃子",
    role: "女優",
    relation: "被害者が後援していた劇団の主演女優。",
    profile: "堂々としているが、過去のスキャンダルに触れると早口になる。",
    motive: "過去のスキャンダルを握られていた",
    alibi: "劇場で舞台挨拶",
    weak: ["ticket", "letter"],
    contradiction: "観劇券は彼女の劇場のものだが、本人の入館記録とは時刻が合う。",
    motiveTalk: [["探偵", "鳴瀬氏に弱みを握られていた？"], ["白鳥", "後援者はみな、貸しを作りたがるものです。"], ["探偵", "脅迫状に心当たりは。"], ["白鳥", "文章の趣味が悪い。少なくとも私の言葉ではありません。"]],
    alibiTalk: [["探偵", "舞台挨拶は何時まで？"], ["白鳥", "10時5分まで。記録もあります。"], ["探偵", "邸に来たのは？"], ["白鳥", "10時40分。招待された夕食には遅れました。"]]
  },
  {
    id: "dealer",
    portrait: "assets/suspect-dealer.png",
    name: "鷹野 亮",
    role: "画商",
    relation: "鳴瀬家の美術品売却を仲介していた。",
    profile: "柔らかい物腰だが、贋作の話題だけは即座に否定する。",
    motive: "贋作取引の暴露を恐れた",
    alibi: "ギャラリーで商談",
    weak: ["opener", "watch"],
    contradiction: "ペーパーナイフに触れた説明はつくが、死亡時刻の操作には関われない。",
    motiveTalk: [["探偵", "贋作取引を知られていた？"], ["鷹野", "根も葉もない。鳴瀬氏は鑑定に厳しかっただけです。"], ["探偵", "暴露されれば終わる。"], ["鷹野", "だからといって殺人？ 私は商売人です。"]],
    alibiTalk: [["探偵", "商談は何時まで？"], ["鷹野", "10時20分まで電話を。記録が残っています。"], ["探偵", "邸内には？"], ["鷹野", "夕食前に書斎へ呼ばれました。それ以降は入っていない。"]]
  }
];

const goals = [
  ["c1", "書斎で時計を見つける", "watch"],
  ["c2", "食堂でグラスを見つける", "glass"],
  ["c3", "温室脇の足跡を記録する", "footprint"],
  ["c4", "玄関で観劇券を見つける", "ticket"],
  ["c5", "秘書に脅迫状を提示する", "secretary:letter"],
  ["c6", "秘書に時計を提示する", "secretary:watch"],
  ["c7", "家政長にグラスを提示する", "housekeeper:glass"],
  ["c8", "甥に観劇券を提示する", "nephew:ticket"],
  ["c9", "医師に足跡を提示する", "doctor:footprint"],
  ["c10", "庭師に見取り図を提示する", "gardener:board"],
  ["c11", "女優に脅迫状を提示する", "actress:letter"],
  ["c12", "画商に時計を提示する", "dealer:watch"],
  ["c13", "家政長に見取り図を提示する", "housekeeper:board"],
  ["c14", "甥にペーパーナイフを提示する", "nephew:opener"]
];

function qs(s){return document.querySelector(s)}
function qsa(s){return [...document.querySelectorAll(s)]}
function toast(t){const n=qs("#toast"); n.textContent=t; n.hidden=false; clearTimeout(toast.t); toast.t=setTimeout(()=>n.hidden=true,2600)}
function ev(id){return evidence.find(e=>e.id===id)}
function suspect(id){return suspects.find(s=>s.id===id)}
function progress(){return Math.min(100, Math.round((state.opened.size/evidence.length)*38 + (state.contradictions.size/goals.length)*54 + (state.solved?8:0)))}

function unlockEvidence(id, msg){
  if(!ev(id)) return;
  const before = state.opened.size;
  state.opened.add(id);
  if(state.opened.size > before) toast(msg || `証拠「${ev(id).title}」を保存した。`);
}

function addContradiction(code, msg){
  const before = state.contradictions.size;
  state.contradictions.add(code);
  if(state.contradictions.size > before) toast(msg || "矛盾を記録した。");
}

function render(){
  qsa(".tab").forEach(b=>b.classList.toggle("active", b.dataset.tab===state.tab));
  qsa("[data-view]").forEach(v=>v.hidden=v.dataset.view!==state.tab);
  qs("#progressText").textContent = `${progress()}%`;
  qs("#progressBar").style.width = `${progress()}%`;
  qs("#objectiveText").textContent = state.contradictions.size < 10
    ? "現場で証拠を集め、被疑者に提示して矛盾を記録する。"
    : "矛盾は十分に集まった。犯人・方法・決め手を組み合わせて告発する。";
  renderStory();
  renderScene();
  renderSuspects();
  renderEvidence();
  renderDeduction();
}

function renderStory(){
  const people = suspects.map(s => `<article class="profile-card"><div class="profile-top"><img src="${s.portrait}" alt="${s.name}の人物画像"><div><h3>${s.name}</h3><p><strong>${s.role}</strong> / ${s.relation}</p></div></div><p>${s.profile}</p><dl><dt>表向きの動機</dt><dd>${s.motive}</dd><dt>本人のアリバイ</dt><dd>${s.alibi}</dd></dl></article>`).join("");
  qs("#storyView").innerHTML = `<article class="story-block"><h3>午後10時17分、鳴瀬邸の書斎</h3><p>資産家・鳴瀬総一郎が、雨の夜に自邸の書斎で死亡した。部屋は内側から施錠され、食堂には飲み残しのグラス、玄関には破れた観劇券、温室には泥の足跡が残されていた。</p><p>あなたは到着したばかりの探偵として、まず関係者の背景を整理し、それから現場と証言を照合する。被疑者は七人。全員に動機があり、全員のアリバイに穴がある。</p><button class="primary" type="button" data-start-investigation>人物を把握したので調査を始める</button></article><div class="profile-grid">${people}</div>`;
}

function renderScene(){
  qs("#chapterLabel").textContent = `証拠 ${state.opened.size}/${evidence.length}`;
  qs("#sceneTabs").innerHTML = scenes.map(s=>`<button class="pill ${state.scene===s.id?"active":""}" data-scene="${s.id}" type="button">${s.name}</button>`).join("");
  const s = scenes.find(x=>x.id===state.scene);
  qs("#sceneCard").innerHTML = `<img src="${s.img}" alt=""><h3>${s.name}</h3><p>${s.text}</p><div class="inspect-list">${s.finds.map(f=>`<button type="button" data-find="${f[1]}" data-msg="${f[2]}">${f[0]}</button>`).join("")}</div>`;
}

function renderSuspects(){
  qs("#suspectList").innerHTML = suspects.map(s=>`<button type="button" class="suspect-btn ${state.suspect===s.id?"active":""}" data-suspect="${s.id}"><img src="${s.portrait}" alt=""><span>${s.name}</span><small>${s.role}</small></button>`).join("");
  const s = suspect(state.suspect);
  const opened = evidence.filter(e=>state.opened.has(e.id));
  const motiveAsked = state.questioned.has(`${s.id}:motive`);
  const alibiAsked = state.questioned.has(`${s.id}:alibi`);
  const transcript = [
    ...(motiveAsked ? s.motiveTalk : []),
    ...(alibiAsked ? s.alibiTalk : [])
  ].map(line => `<p class="line ${line[0] === "探偵" ? "detective" : "suspect"}"><b>${line[0]}</b><span>${line[1]}</span></p>`).join("");
  qs("#interview").innerHTML = `<div class="interview-head"><img src="${s.portrait}" alt="${s.name}の人物画像"><div><h3>${s.name}</h3><p><strong>${s.role}</strong>。 ${s.relation}</p></div></div><p>${s.profile}</p>
    <div class="dialogue-log">${transcript || '<p class="line system"><span>まずは動機とアリバイを会話で確認する。</span></p>'}</div>
    <div class="question-list">
      <button data-question="${s.id}:motive" type="button">${motiveAsked ? "動機を再確認する" : "動機について聞く"}</button>
      <button data-question="${s.id}:alibi" type="button">${alibiAsked ? "アリバイを再確認する" : "アリバイを詳しく聞く"}</button>
    </div>
    <p>提示する証拠</p>
    <div class="present-list">${opened.map(e=>`<button type="button" data-present="${s.id}:${e.id}">${e.title}を見せる</button>`).join("")}</div>`;
}

function renderEvidence(){
  qs("#evidenceCount").textContent = `${state.opened.size}/${evidence.length}`;
  qs("#evidenceGrid").innerHTML = evidence.map(e=>{
    const open = state.opened.has(e.id);
    return `<button class="evidence-card ${open?"":"locked"}" type="button" data-evidence="${e.id}" ${open?"":"disabled"}><img src="${e.img}" alt=""><strong>${open?e.title:"未発見の証拠"}</strong><span>${open?e.short:"現場調査や尋問で入手する。"}</span></button>`;
  }).join("");
}

function renderDeduction(){
  qs("#contradictionCount").textContent = `${state.contradictions.size}/${goals.length}`;
  qs("#contradictionList").innerHTML = goals.map(g=>`<div class="contradiction ${state.contradictions.has(g[0])?"done":""}">${state.contradictions.has(g[0])?"記録済み":"未解決"}: ${g[1]}</div>`).join("");
  const ready = state.contradictions.size >= 14;
  qs("#accuseBox").innerHTML = `<h3>最終告発</h3><p>14個すべての矛盾を集めると告発できる。犯人、方法、決め手を選べ。</p>
    <div class="accuse-row">
      <select id="culprit"><option value="">犯人を選択</option>${suspects.map(s=>`<option value="${s.id}">${s.name}</option>`).join("")}</select>
      <select id="method"><option value="">方法を選択</option><option value="poison">ワインの薬物</option><option value="opener">ペーパーナイフ</option><option value="window">窓からの侵入</option></select>
      <select id="proof"><option value="">決め手を選択</option><option value="watch-letter">時計と脅迫状</option><option value="ticket">観劇券</option><option value="footprint">足跡</option></select>
      <button class="primary" type="button" data-accuse ${ready?"":"disabled"}>告発する</button>
    </div>
    <div class="ending" id="ending" ${state.solved?"":"hidden"}>葛城澪を追い詰めた。彼女は毒で死亡時刻を作り、懐中時計と脅迫状で時刻と動機を偽装した。ペーパーナイフは甥へ疑いを向けるための罠だった。</div>`;
}

document.addEventListener("click", e=>{
  const tab=e.target.closest("[data-tab]"); if(tab){state.tab=tab.dataset.tab; render()}
  const start=e.target.closest("[data-start-investigation]"); if(start){state.storyRead=true; state.tab="scene"; toast("調査を開始した。まず現場を調べよう。"); render()}
  const scene=e.target.closest("[data-scene]"); if(scene){state.scene=scene.dataset.scene; render()}
  const find=e.target.closest("[data-find]"); if(find){unlockEvidence(find.dataset.find, find.dataset.msg); const goal=goals.find(g=>g[2]===find.dataset.find); if(goal) addContradiction(goal[0]); render()}
  const sus=e.target.closest("[data-suspect]"); if(sus){state.suspect=sus.dataset.suspect; render()}
  const q=e.target.closest("[data-question]"); if(q){state.questioned.add(q.dataset.question); toast("会話を記録した。"); render()}
  const present=e.target.closest("[data-present]"); if(present){const [sid,eid]=present.dataset.present.split(":"); const s=suspect(sid); const code=`${sid}:${eid}`; if(s.weak.includes(eid) && state.questioned.has(`${sid}:motive`) && state.questioned.has(`${sid}:alibi`)){const goal=goals.find(g=>g[2]===code); if(goal) addContradiction(goal[0], `${s.name}の証言に矛盾を記録した。`); else toast(s.contradiction)} else if(s.weak.includes(eid)) toast("先に動機とアリバイを聞き切る必要がある。"); else toast("反応は薄い。この証拠は別の相手に効きそうだ。"); render()}
  const card=e.target.closest("[data-evidence]"); if(card && !card.disabled){const item=ev(card.dataset.evidence); qs("#modalImage").src=item.img; qs("#modalTitle").textContent=item.title; qs("#modalBody").textContent=item.body; qs("#evidenceModal").showModal()}
  const close=e.target.closest("#modalClose"); if(close) qs("#evidenceModal").close();
  const accuse=e.target.closest("[data-accuse]"); if(accuse && !accuse.disabled){const ok=qs("#culprit").value==="secretary" && qs("#method").value==="poison" && qs("#proof").value==="watch-letter"; if(ok){state.solved=true; toast("告発成功。犯人を追い詰めた。")} else toast("まだ組み合わせが違う。動機と時刻工作の決め手を見直そう。"); render()}
});

if ("serviceWorker" in navigator && location.protocol !== "file:") navigator.serviceWorker.register("service-worker.js");
render();
