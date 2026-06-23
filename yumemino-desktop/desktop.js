const saveKey = "yriDesktopMvpState";

const initialState = {
  contactSubmitted: false,
  searchUnlocked: false,
  talkContactAdded: false,
  pendingFriendRequest: false,

  servicePdfOpened: false,
  noticeCodeFound: false,
  mailKeyRead: false,
  trashReviewed: false,
  searched404: false,
  employeeLoginSuccess: false,
  deptSearchSuccess: false,
  auditKeySuccess: false,
  archiveOpened: false,
  finalSubmitted: false,

  pendingCallId: "",
  activeCallId: "",
  callMode: "",
  callStartedAt: 0,
  callHistory: [],
  completedCalls: [],
  unlockedFlags: [],
  callMuted: false,
  callVolume: 35,

  unreadTalk: 0,
  unreadFiles: 0,
  currentFolder: "downloads",
  selectedFile: "",
  browserPath: "/",
  searchQuery: "",
  searchCacheId: "",
  currentTalkThread: "desk",
  messageIds: []
};

const callRecords = {
  "unknown-01": {
    from: "Unknown",
    avatar: "?",
    audio: "assets/audio/call_unknown_01.mp3",
    duration: "00:37",
    voiceMode: "broken",
    noise: true,
    lineStatus: "不安定",
    glitchText: true,
    recoveryAccuracy: "72%",
    trigger: "afterSearch404",
    transcriptFile: "call_unknown_01_transcript",
    thread: "unknown",
    transcript: [
      "……聞こえますか。",
      "404は人数じゃありません。",
      "状態です。",
      "数字だけを見ないでください。",
      "IRの注記と、採用ページの声を照合してください。",
      "社員IDと参照キーが揃えば、社員専用ページに入れます。",
      "ただし、入ったことは残ります。"
    ],
    transcriptGlitch: ["[不明瞭]", "[音声欠落 00:21-00:24]", "[復元失敗: 呼吸音のみ]"],
    unlocks: ["call_unknown_01_done"]
  },
  "employee404-01": {
    from: "社員404",
    avatar: "404",
    audio: "assets/audio/call_employee404_01.mp3",
    duration: "00:52",
    voiceMode: "voicemail",
    noise: true,
    lineStatus: "録音再生",
    glitchText: true,
    recoveryAccuracy: "81%",
    trigger: "afterEmployeeLogin",
    transcriptFile: "call_employee404_01_transcript",
    thread: "employee404",
    transcript: [
      "これは、残した記録です。",
      "ログを見て。",
      "全部じゃない。",
      "アラート条件と同じ番号だけを見てください。",
      "その行にだけ、部署名の痕跡が残っています。",
      "この音声を聞いた時点で、あなたの端末も記録されています。"
    ],
    transcriptGlitch: ["[録音開始音]", "[長い無音 00:16-00:19]"],
    unlocks: ["call_employee404_01_done"]
  },
  "archive-01": {
    from: "非通知",
    avatar: "!",
    audio: "assets/audio/voicemail_archive_01.mp3",
    duration: "00:44",
    voiceMode: "broken",
    noise: true,
    lineStatus: "留守番メッセージ",
    glitchText: true,
    recoveryAccuracy: "68%",
    trigger: "afterArchiveOpen",
    transcriptFile: "voicemail_archive_01_transcript",
    thread: "archive",
    transcript: [
      "三つの文書名を戻してください。",
      "本文の中に、戻すための周辺語があります。",
      "黒塗りの位置は一文字ずつです。",
      "戻したあと、欠けていた部分だけを記録してください。",
      "その文字列が、送信前に求められる役割です。"
    ],
    transcriptGlitch: ["[留守録転送]", "[音声欠落 00:31-00:33]", "[復元ノイズ]"],
    unlocks: ["call_archive_01_done"]
  }
};

Object.assign(callRecords, {
  "former-employee-m-01": {
    from: "元社員M",
    avatar: "M",
    audio: "assets/audio/call_former_employee_m_01.mp3",
    duration: "01:08",
    voiceMode: "human",
    noise: false,
    lineStatus: "通常",
    glitchText: false,
    recoveryAccuracy: "94%",
    trigger: "afterMailFwdOpen",
    transcriptFile: "call_former_employee_m_01_transcript",
    thread: "formerM",
    transcript: [
      "メールの件名だけ見てください。",
      "本文は直されます。",
      "でも、件名は残ります。",
      "同じ日付の三通を、送信時刻順に並べてください。",
      "そこで見つけた読み方は、社員404のログでも使えます。"
    ],
    transcriptGlitch: ["[環境音: キーボード]", "[小声のため自動補正]"],
    unlocks: ["call_former_employee_m_01_done"]
  },
  "audit-autoresponder-01": {
    from: "監査室自動応答",
    avatar: "監",
    audio: "assets/audio/call_audit_autoresponder_01.mp3",
    duration: "00:49",
    voiceMode: "automated",
    noise: true,
    lineStatus: "自動応答",
    glitchText: false,
    recoveryAccuracy: "89%",
    trigger: "afterAuditRoom",
    transcriptFile: "call_audit_autoresponder_01_transcript",
    thread: "auditBot",
    transcript: [
      "監査室文書閲覧端末です。",
      "この通話は記録されています。",
      "復元キーを確認してください。",
      "復元キーは、理念に反する行動です。",
      "疑問を減らす。",
      "その反対を入力してください。",
      "復元処理は取り消せません。"
    ],
    transcriptGlitch: ["[自動応答ID: AUD-VOICE-07]"],
    unlocks: ["call_audit_autoresponder_01_done"]
  }
});

const talkMessages = {
  "request-1": { thread: "desk", from: "me", body: "Talkで資料窓口を追加しました。", time: "now" },
  "request-2": {
    thread: "desk",
    from: "資料窓口",
    body: "サービス概要資料をこの端末のDownloadsへ保存しました。",
    time: "now",
    attachment: "service_overview_2026"
  },
  "request-3": {
    thread: "desk",
    from: "資料窓口",
    body: "資料の注意事項をご確認ください。不明点があればこのトークへ返信してください。",
    time: "now"
  },
  "unknown-1": { thread: "unknown", from: "Unknown", body: "通話履歴を保存しました。", time: "now" },
  "unknown-2": { thread: "unknown", from: "Unknown", body: "検索語を間違えないでください。", time: "now" },
  "employee404-1": { thread: "employee404", from: "社員404", body: "三、五、七。", time: "now" },
  "employee404-2": { thread: "employee404", from: "社員404", body: "それ以上は、ここには書けません。", time: "now" },
  "archive-1": { thread: "archive", from: "非通知", body: "ボイスメッセージを保存しました。", time: "now" },
  "archive-2": { thread: "archive", from: "非通知", body: "黒塗りの前後に残った語を照合してください。", time: "now" },
  "final-1": { thread: "system", from: "端末通知", body: "外部監査送信キューの送信が完了しました。", time: "now" },
  "final-2": { thread: "system", from: "端末通知", body: "記録はこの端末のFilesに保存されています。", time: "now" }
};

const threadInfo = {
  desk: { name: "ユメミノ資料窓口", avatar: "資", subtitle: "株式会社ユメミノ総合研究所" },
  unknown: { name: "Unknown", avatar: "?", subtitle: "番号非表示" },
  employee404: { name: "社員404", avatar: "404", subtitle: "記録保護アカウント" },
  archive: { name: "非通知", avatar: "!", subtitle: "留守番メッセージ" },
  formerM: { name: "元社員M", avatar: "M", subtitle: "退職者連絡先 / 未検証" },
  auditBot: { name: "監査室自動応答", avatar: "監", subtitle: "文書閲覧端末 自動応答" },
  system: { name: "端末通知", avatar: "端", subtitle: "Local system" }
};

const talkBlueprints = {
  desk: [
    "資料窓口を追加しました。",
    "サービス概要資料をDownloadsへ保存しました。",
    "関連資料として人的資本レポートも追加しました。",
    "導入事例集とサーベイ設計ガイドも同じフォルダに保存されています。",
    "資料の注意事項をご確認ください。",
    "注記欄は、本文より後から更新されることがあります。",
    "2025.08.07 のお知らせはSearchにもキャッシュがあります。",
    "資料内のNot Found表記は仕様上の表示です。",
    "ご不明点があれば、この端末内のSearchをご利用ください。",
    "外部メールや外部メッセージアプリは使用しません。",
    "人的資本レポートの注記番号は、社内基準の参照番号です。",
    "ケーススタディは公開向けに加工されています。",
    "Downloadsのreadme_first.txtも確認してください。",
    "FAQエクスポートには問い合わせ語の表記揺れが残っています。",
    "Searchの結果は調査状況に応じて増えます。",
    "資料窓口からの送付は以上です。",
    "未読資料がある場合はFilesにバッジが表示されます。",
    "このトークは仮想端末内に保存されます。",
    "追加資料が復元された場合、Filesに表示されます。",
    "調査メモはNotesで確認できます。"
  ],
  unknown: [
    "404は人数じゃない。",
    "状態です。",
    "8月7日の通知を探してください。",
    "表示不具合という言葉を信じないで。",
    "検索結果は消された順番で残ります。",
    "公式ページだけでは足りません。",
    "資料、メール、キャッシュを照合してください。",
    "人的資本レポートの注記番号を見てください。",
    "3、5、7。",
    "数字が重なる場所には、同じ処理があります。",
    "社員IDは数字で残っています。",
    "参照キーは声の中に混ざっています。",
    "採用ページを普通に読んでください。",
    "赤字ではありません。大きくもありません。",
    "見落とされる形で残っています。",
    "社員404は退職処理ではありません。",
    "Not Foundは欠員ではありません。",
    "状態変更です。",
    "外部相談窓口という語をSearchで調べてください。",
    "Mailの件名は本文より正直です。",
    "ここから先は人事の画面です。"
  ],
  employee404: [
    "ログを見て。",
    "全部じゃない。",
    "三、五、七。",
    "アラート条件と同じ番号だけを見てください。",
    "そこから先は、もう人事の画面じゃない。",
    "本人確認は未完了のままです。",
    "退職同意は未取得です。",
    "家族連絡は不要判定になっています。",
    "その判定は、本人に通知されません。",
    "外部接触の検知時刻を見てください。",
    "2025.08.07 02:14。",
    "同じ時刻がメールにもあります。",
    "処理名は三つだけで足ります。",
    "人事コメントではなく、処理名を見てください。",
    "行番号と処理名を別紙に写してください。",
    "業務ログとして残っているから消されにくい。",
    "部署検索に入れる語は、複数資料で同じ形になります。",
    "Talkだけで決めないでください。",
    "復元キーは私には分かりません。",
    "理念の反対を考えてください。"
  ],
  formerM: [
    "私の端末にも同じ通知が来ました。",
    "その時は、Filesに残っていたメールを見落としました。",
    "件名だけでいい。本文より、件名の並びを見てください。",
    "本文は黒塗りで誘導されます。",
    "件名は処理の都合で残ります。",
    "同じ日付の三通を並べてください。",
    "似た処理名が社員ログにも出ます。",
    "一文字ずつ抜く場所は件名の端です。",
    "これを本文より優先してください。",
    "社員404の画面にも同じ順番があります。",
    "第七条は状態変更の根拠です。",
    "再通知不要は危ない言葉です。",
    "本人に知らせない処理です。",
    "Trashに通知案が残っているなら読んでください。",
    "黒塗り語は用語アーカイブと通知案で照合できます。",
    "それはNot Foundの意味を変えます。",
    "私は最後の役割まで辿り着けませんでした。",
    "あなたが最後に入力する役割は一つです。",
    "A、B、Cの文書名を、本文から自然な語に戻してください。",
    "本文に残った業務語が戻し方の手がかりです。"
  ],
  auditBot: [
    "監査室自動応答です。",
    "閲覧権限は一時付与されています。",
    "復元キーを確認してください。",
    "当社理念に反する二文字です。",
    "理念は企業情報ページに記載されています。",
    "疑問を減らす。",
    "その反対を入力してください。",
    "復元処理は記録されます。",
    "A-01は保全手順です。",
    "B-02は面談時の発話に関する文書です。",
    "C-03は該当者を扱う一覧です。",
    "文書名の黒塗りは一文字ずつです。",
    "本文は復元候補名を直接書きません。",
    "周辺語から自然な文書名に戻してください。",
    "戻した文書名と黒塗り位置を別紙に写してください。",
    "送信前確認は役割だけを求めます。",
    "社員ID、参照キー、部門、復元キーを揃えてください。",
    "送信後は取り消せません。",
    "記録はFilesに残ります。",
    "監査室自動応答を終了します。"
  ],
  archive: [
    "三つの文書名を戻してください。",
    "本文に残った専門語を拾ってください。",
    "文書名として自然になる語だけを採用してください。",
    "黒塗り位置は一文字ずつです。",
    "最終フォームは、その一文字列を役割として扱います。",
    "A-01は原本性と提出添付資料。",
    "B-02は面談時の発言と供述の整合性。",
    "C-03は該当者と記録保護対象。",
    "復元候補とは表示しません。",
    "あなたが推測してください。",
    "A、B、Cの順番は変えないでください。",
    "同じ漢字が本文中に何度も出る場合、文書名に入るものだけを使います。",
    "答えをTalkだけで確定しないでください。",
    "社員404は退職していません。",
    "退職処理ではなく状態変更です。",
    "状態はNot Foundです。",
    "記録は消えていません。",
    "見えない場所に移されています。",
    "最後の入力欄は役割を聞いています。",
    "最後はRecovered文書と送信キューを照合してください。"
  ],
  system: [
    "端末を起動しました。",
    "Browserで企業サイトを確認できます。",
    "Talkの連絡先は初期状態では空です。",
    "Filesには初期READMEだけがあります。",
    "Searchは資料窓口追加後に同期されます。",
    "Mail相当の資料はFiles内のMailフォルダにあります。",
    "Notesに章ごとの進行チェックがあります。",
    "外部サイトには接続しません。",
    "音声ファイル未配置時は文字起こしを表示します。",
    "進行状況はlocalStorageに保存されます。",
    "リセットはNotes内のボタンから行えます。",
    "第0章: 端末起動。",
    "第1章: 企業サイトと資料請求。",
    "第2章: Search調査。",
    "第3章: FilesとMail。",
    "第4章: 社員404ログイン。",
    "第5章: 監査室とRecovered。",
    "第6章: 最終告発。",
    "完了後、receiptがFilesに保存されます。",
    "調査ログはこの端末に残ります。"
  ]
};

Object.entries(talkBlueprints).forEach(([thread, lines]) => {
  lines.forEach((body, index) => {
    const id = `${thread}-long-${String(index + 1).padStart(2, "0")}`;
    if (!talkMessages[id]) {
      talkMessages[id] = { thread, from: threadInfo[thread]?.name || "Talk", body, time: "log" };
    }
  });
});

function longMessageIds(thread, count = Infinity) {
  return Object.keys(talkMessages)
    .filter(id => id.startsWith(`${thread}-long-`))
    .slice(0, count);
}

const fileRecords = {
  downloads: [
    { id: "readme", name: "readme_first.txt", type: "TEXT", updated: "2026-06-23 09:00", available: true },
    { id: "service_overview_2026", name: "service_overview_2026.pdf", type: "PDF", updated: "2026-06-23 09:18", gatedBy: "talkContactAdded" },
    { id: "human_capital_report_2025", name: "human_capital_report_2025.pdf", type: "PDF", updated: "2025-12-20", gatedBy: "talkContactAdded" },
    { id: "case_study_callcenter", name: "case_study_callcenter.pdf", type: "PDF", updated: "2025-10-30", gatedBy: "talkContactAdded" },
    { id: "survey_design_guide", name: "survey_design_guide.pdf", type: "PDF", updated: "2025-11-18", gatedBy: "talkContactAdded" },
    { id: "notice_20250807", name: "notice_20250807.txt", type: "TEXT", updated: "2025-08-07", gatedBy: "talkContactAdded" },
    { id: "terms_archive_2025", name: "terms_archive_2025.txt", type: "TEXT", updated: "2025-08-08", gatedBy: "talkContactAdded" },
    { id: "faq_contact_export", name: "faq_contact_export.txt", type: "TEXT", updated: "2025-11-19", gatedBy: "talkContactAdded" },
    { id: "search_cache_index", name: "search_cache_index.txt", type: "TEXT", updated: "2025-12-01", gatedBy: "noticeCodeFound" },
    { id: "call_unknown_01_transcript", name: "call_unknown_01_transcript.txt", type: "TEXT", updated: "通話後", gatedByCall: "unknown-01" },
    { id: "call_employee404_01_transcript", name: "call_employee404_01_transcript.txt", type: "TEXT", updated: "通話後", gatedByCall: "employee404-01" },
    { id: "call_former_employee_m_01_transcript", name: "call_former_employee_m_01_transcript.txt", type: "TEXT", updated: "通話後", gatedByCall: "former-employee-m-01" },
    { id: "call_audit_autoresponder_01_transcript", name: "call_audit_autoresponder_01_transcript.txt", type: "TEXT", updated: "通話後", gatedByCall: "audit-autoresponder-01" },
    { id: "voicemail_archive_01_transcript", name: "voicemail_archive_01_transcript.txt", type: "TEXT", updated: "通話後", gatedByCall: "archive-01" },
    { id: "final_transfer_receipt", name: "final_transfer_receipt.txt", type: "TEXT", updated: "送信後", gatedBy: "finalSubmitted" }
  ],
  mail: [
    { id: "mail_20250807_display", name: "2025-08-07_表示不具合対応.eml", type: "MAIL", updated: "2025-08-07 09:12", gatedBy: "talkContactAdded" },
    { id: "mail_hr_status_changes", name: "人事部_状態変更一覧.eml", type: "MAIL", updated: "2025-08-07 10:04", gatedBy: "talkContactAdded" },
    { id: "mail_audit_share", name: "監査室共有依頼.eml", type: "MAIL", updated: "2025-08-07 10:31", gatedBy: "talkContactAdded" },
    { id: "mail_auto_reply", name: "自動返信_資料請求受付.eml", type: "MAIL", updated: "2026-06-23 09:18", gatedBy: "contactSubmitted" },
    { id: "mail_fwd_employee404", name: "Fwd_社員404に関する確認.eml", type: "MAIL", updated: "2025-08-09 18:44", gatedBy: "searched404" },
    { id: "mail_policy_revision", name: "内部通報管理規程改定通知.eml", type: "MAIL", updated: "2025-04-12", gatedBy: "talkContactAdded" },
    { id: "mail_external_contact", name: "Re_外部相談窓口への接触傾向.eml", type: "MAIL", updated: "2025-08-07 02:14", gatedBy: "mailKeyRead" },
    { id: "mail_assessment_hold", name: "査定保留処理について.eml", type: "MAIL", updated: "2025-08-07 10:42", gatedBy: "mailKeyRead" },
    { id: "mail_manager_confirm", name: "室長確認済み.eml", type: "MAIL", updated: "2025-08-07 11:03", gatedBy: "mailKeyRead" },
    { id: "mail_article_seven", name: "第七条_状態変更照会.eml", type: "MAIL", updated: "2025-08-07 11:18", gatedBy: "mailKeyRead" }
  ],
  recovered: [
    { id: "a01_evidence", name: "A-01_＿拠保全手順.txt", type: "TEXT", updated: "2025-08-01", gatedBy: "archiveOpened" },
    { id: "b02_statement", name: "B-02_発＿テンプレート.txt", type: "TEXT", updated: "2025-08-02", gatedBy: "archiveOpened" },
    { id: "c03_subject", name: "C-03_対象＿リスト.txt", type: "TEXT", updated: "2025-08-07", gatedBy: "archiveOpened" },
    { id: "employee404_partial_log", name: "employee404_partial_log.txt", type: "TEXT", updated: "2025-08-07", gatedByCall: "employee404-01" },
    { id: "audit_room_key_memo", name: "audit_room_key_memo.txt", type: "TEXT", updated: "2025-08-07", gatedByCall: "audit-autoresponder-01" },
    { id: "silent_core_operation", name: "silent_core_operation.txt", type: "TEXT", updated: "2025-08-07", gatedBy: "archiveOpened" },
    { id: "deleted_notice_draft", name: "deleted_notice_draft.txt", type: "TEXT", updated: "2025-08-06", gatedBy: "archiveOpened" },
    { id: "status_change_matrix", name: "status_change_matrix.csv", type: "CSV", updated: "2025-08-07", gatedBy: "employeeLoginSuccess" },
    { id: "audit_article_7_extract", name: "audit_article_7_extract.txt", type: "TEXT", updated: "2025-04-12", gatedBy: "archiveOpened" },
    { id: "redaction_compare_notes", name: "redaction_compare_notes.txt", type: "TEXT", updated: "2025-08-08", gatedByCall: "archive-01" }
  ],
  trash: [
    { id: "old_contact_reply", name: "old_contact_reply.txt", type: "TEXT", updated: "2025-08-03", gatedBy: "talkContactAdded" },
    { id: "deleted_employee_list", name: "deleted_employee_list.csv", type: "CSV", updated: "2025-08-07", gatedBy: "searched404" },
    { id: "draft_notice_20250807", name: "draft_notice_20250807.txt", type: "TEXT", updated: "2025-08-06", gatedBy: "searched404" },
    { id: "trash_mail_index", name: "trash_mail_index.txt", type: "TEXT", updated: "2025-08-08", gatedBy: "searched404" },
    { id: "old_policy_comment", name: "old_policy_comment.txt", type: "TEXT", updated: "2025-04-10", gatedBy: "talkContactAdded" },
    { id: "deleted_search_terms", name: "deleted_search_terms.csv", type: "CSV", updated: "2025-08-07", gatedBy: "searched404" }
  ]
};

const routeMap = {
  "/": "index.html#/",
  "/about": "index.html#/about",
  "/business": "index.html#/business",
  "/news": "index.html#/news",
  "/ir": "index.html#/ir",
  "/recruit": "index.html#/recruit",
  "/contact": "index.html#/contact",
  "/login": "index.html#/login",
  "/employee-404": "index.html#/employee-404",
  "/audit": "index.html#/audit",
  "/archive": "index.html#/archive",
  "/final": "index.html#/final"
};

const searchIndex = [
  {
    keywords: ["ユメミノ", "資料請求"],
    title: "株式会社ユメミノ総合研究所 | 人的資本データ分析",
    url: "yri.local/",
    body: "人的資本データ分析、組織改善支援、IR・開示資料支援を行う研究開発企業です。",
    action: { type: "browser", path: "/" }
  },
  {
    keywords: ["資料請求", "サービス概要"],
    title: "service_overview_2026.pdf",
    url: "files://Downloads/service_overview_2026.pdf",
    body: "資料請求後にDownloadsへ保存されるサービス概要資料です。注記欄に表示仕様があります。",
    action: { type: "file", folder: "downloads", file: "service_overview_2026" }
  },
  {
    keywords: ["404", "Not Found", "社員404", "記録保護"],
    title: "人的資本データ注記 | Not Found",
    url: "yri.local/ir#human-capital",
    body: "人的資本データの注記欄。404という数値とNot Found注記が同じ表に残っています。",
    action: { type: "browser", path: "/ir" },
    gatedBy: "servicePdfOpened",
    triggersCall: "unknown-01"
  },
  {
    keywords: ["表示不具合", "2025 08 07", "2025.08.07"],
    title: "一部サービスの表示不具合について | 2025.08.07",
    url: "yri.local/news/20250807",
    body: "一部アカウント情報が通常画面に表示されない事象を確認しました。対象範囲は社内管理画面の一部です。",
    action: { type: "browser", path: "/news" },
    triggersCall: "unknown-01"
  },
  {
    keywords: ["秘密録", "参照キー"],
    title: "採用ページ内の社員インタビュー",
    url: "yri.local/recruit#interview",
    body: "社員の声に含まれる印刷ズレ風の文字が参照キーの手がかりになります。",
    action: { type: "browser", path: "/recruit" }
  },
  {
    keywords: ["監査室"],
    title: "監査室 文書閲覧端末",
    url: "yri.local/audit",
    body: "社員404ページのログから部門名を確認したあと、文書閲覧端末に移動できます。",
    action: { type: "browser", path: "/audit" },
    gatedBy: "deptSearchSuccess"
  }
];

searchIndex.push(
  { keywords: ["ユメミノ 404", "社員404", "0807"], title: "キャッシュ: 社員404に関する問い合わせ", url: "cache://yri/employee404", body: "削除済みFAQのキャッシュ。0807コード確認後に開ける索引です。", action: { type: "file", folder: "downloads", file: "search_cache_index" }, gatedBy: "noticeCodeFound" },
  { keywords: ["ユメミノ 表示不具合", "表示不具合"], title: "業界メディア: 表示不具合と人的資本データ", url: "media.local/article/yri-20250807", body: "2025.08.07の告知を分析した短い記事。障害情報としては説明が薄い。", action: { type: "browser", path: "/news" }, gatedBy: "talkContactAdded" },
  { keywords: ["2025 08 07", "2025.08.07"], title: "2025-08-07_表示不具合対応.eml", url: "files://Mail/2025-08-07_表示不具合対応.eml", body: "公開文面の調整メール。公開語と内部語の差分を確認できます。", action: { type: "file", folder: "mail", file: "mail_20250807_display" }, gatedBy: "talkContactAdded" },
  { keywords: ["Not Found", "記録保護"], title: "用語アーカイブ: 表示制限用語", url: "files://Downloads/terms_archive_2025.txt", body: "Not Foundの表示仕様を、用語定義として確認する資料です。", action: { type: "file", folder: "downloads", file: "terms_archive_2025" }, gatedBy: "servicePdfOpened" },
  { keywords: ["記録保護", "再通知不要"], title: "人事部_状態変更一覧.eml", url: "files://Mail/人事部_状態変更一覧.eml", body: "EMP-000404の状態変更記録。通知区分と承認欄を照合してください。", action: { type: "file", folder: "mail", file: "mail_hr_status_changes" }, gatedBy: "searched404" },
  { keywords: ["部署コード", "共有依頼"], title: "監査室共有依頼.eml", url: "files://Mail/監査室共有依頼.eml", body: "同日メールの件名照合に使う1通目。本文より件名を優先します。", action: { type: "file", folder: "mail", file: "mail_audit_share" }, gatedBy: "mailKeyRead" },
  { keywords: ["秘密録", "採用"], title: "採用情報 | 社員インタビュー", url: "yri.local/recruit", body: "秘・密・録が本文中に自然に埋め込まれている。", action: { type: "browser", path: "/recruit" }, gatedBy: "talkContactAdded" },
  { keywords: ["内部通報管理規程", "第七条"], title: "内部通報管理規程改定通知.eml", url: "files://Mail/内部通報管理規程改定通知.eml", body: "第七条の改定通知。状態変更の根拠条文だけが残っています。", action: { type: "file", folder: "mail", file: "mail_policy_revision" }, gatedBy: "mailKeyRead" },
  { keywords: ["第七条", "状態変更"], title: "第七条_状態変更照会.eml", url: "files://Mail/第七条_状態変更照会.eml", body: "自動応答による照会ログ。通知区分、根拠条文、共有先を並べて確認します。", action: { type: "file", folder: "mail", file: "mail_article_seven" }, gatedBy: "mailKeyRead" },
  { keywords: ["外部相談窓口"], title: "Re_外部相談窓口への接触傾向.eml", url: "files://Mail/Re_外部相談窓口への接触傾向.eml", body: "外部相談窓口への接触傾向とEMP-000404の状態変更時刻を照合できます。", action: { type: "file", folder: "mail", file: "mail_external_contact" }, gatedBy: "mailKeyRead" },
  { keywords: ["人的資本 離職率 0.0", "離職率"], title: "human_capital_report_2025.pdf", url: "files://Downloads/human_capital_report_2025.pdf", body: "社員数404と離職率0.0%の表、注記番号3/5/7が残る。番号の扱いを学ぶ資料です。", action: { type: "file", folder: "downloads", file: "human_capital_report_2025" }, gatedBy: "talkContactAdded" },
  { keywords: ["状態変更", "YRI-HR"], title: "status_change_matrix.csv", url: "files://Recovered/status_change_matrix.csv", body: "EMP-000404の表示区分がNot Foundになっている。", action: { type: "file", folder: "recovered", file: "status_change_matrix" }, gatedBy: "employeeLoginSuccess" },
  { keywords: ["表示制限"], title: "deleted_employee_list.csv", url: "files://Trash/deleted_employee_list.csv", body: "削除済み社員一覧。404の表示区分だけが通常社員と異なります。", action: { type: "file", folder: "trash", file: "deleted_employee_list" }, gatedBy: "searched404" },
  { keywords: ["YRI-HR", "EMP-000404"], title: "YRI-HR / EMP-000404", url: "yri.local/login", body: "社員専用ページ。社員IDと参照キーが必要。", action: { type: "browser", path: "/login" }, gatedBy: "searched404" },
  { keywords: ["EMP-000404", "社員404"], title: "Fwd_社員404に関する確認.eml", url: "files://Mail/Fwd_社員404に関する確認.eml", body: "元社員Mからの転送メール。件名に部署コードのヒントが残る。", action: { type: "file", folder: "mail", file: "mail_fwd_employee404" }, gatedBy: "searched404" },
  { keywords: ["査定保留", "部署照合"], title: "査定保留処理について.eml", url: "files://Mail/査定保留処理について.eml", body: "同日メールの件名照合に使う2通目。送信時刻順に並べます。", action: { type: "file", folder: "mail", file: "mail_assessment_hold" }, gatedBy: "mailKeyRead" },
  { keywords: ["室長確認", "部署照合"], title: "室長確認済み.eml", url: "files://Mail/室長確認済み.eml", body: "同日メールの件名照合に使う3通目。本文ではなく件名を見ます。", action: { type: "file", folder: "mail", file: "mail_manager_confirm" }, gatedBy: "mailKeyRead" },
  { keywords: ["復元キー", "理念"], title: "復元キー メモ", url: "files://Recovered/audit_room_key_memo.txt", body: "理念文と反対の動作を照合するためのメモ。答えそのものは記載されていません。", action: { type: "file", folder: "recovered", file: "audit_room_key_memo" }, gatedByCall: "audit-autoresponder-01" },
  { keywords: ["復元キー", "理念"], title: "文書閲覧端末", url: "yri.local/audit", body: "復元キー入力画面。企業理念の表現と照らし合わせます。", action: { type: "browser", path: "/audit" }, gatedBy: "deptSearchSuccess" },
  { keywords: ["Recovered", "証拠"], title: "A-01_＿拠保全手順.txt", url: "files://Recovered/A-01", body: "原本性、証跡ハッシュ、外部監査提出時の添付資料。", action: { type: "file", folder: "recovered", file: "a01_evidence" }, gatedBy: "archiveOpened" },
  { keywords: ["Recovered", "発言"], title: "B-02_発＿テンプレート.txt", url: "files://Recovered/B-02", body: "面談時の発言、供述の整合性。", action: { type: "file", folder: "recovered", file: "b02_statement" }, gatedBy: "archiveOpened" },
  { keywords: ["Recovered", "対象者"], title: "C-03_対象＿リスト.txt", url: "files://Recovered/C-03", body: "該当者、対象となる従業員、記録保護対象。", action: { type: "file", folder: "recovered", file: "c03_subject" }, gatedBy: "archiveOpened" },
  { keywords: ["最終", "送信キュー"], title: "外部監査送信キュー", url: "yri.local/final", body: "A-01/B-02/C-03の黒塗り位置を照合して役割を入力する。", action: { type: "browser", path: "/final" }, gatedBy: "archiveOpened" },
  { keywords: ["Trash", "通知案", "0807"], title: "draft_notice_20250807.txt", url: "files://Trash/draft_notice_20250807.txt", body: "黒塗り語を別資料から復元する中謎。用語アーカイブとの照合が必要。", action: { type: "file", folder: "trash", file: "draft_notice_20250807" }, gatedBy: "searched404" },
  { keywords: ["Trash", "検索語"], title: "deleted_search_terms.csv", url: "files://Trash/deleted_search_terms.csv", body: "削除された検索語。社員404、再通知不要、記録保護。", action: { type: "file", folder: "trash", file: "deleted_search_terms" }, gatedBy: "searched404" },
  { keywords: ["黒塗り", "照合"], title: "redaction_compare_notes.txt", url: "files://Recovered/redaction_compare_notes.txt", body: "A/B/C文書の本文語を比較する最終大謎用メモ。黒塗り位置だけが残る。", action: { type: "file", folder: "recovered", file: "redaction_compare_notes" }, gatedByCall: "archive-01" },
  { keywords: ["SILENT Core", "記録保護"], title: "silent_core_operation.txt", url: "files://Recovered/silent_core_operation.txt", body: "状態変更は退職処理ではない、という内部文書。", action: { type: "file", folder: "recovered", file: "silent_core_operation" }, gatedBy: "archiveOpened" },
  { keywords: ["資料請求", "自動返信"], title: "自動返信_資料請求受付.eml", url: "files://Mail/自動返信_資料請求受付.eml", body: "資料窓口追加の受付記録。", action: { type: "file", folder: "mail", file: "mail_auto_reply" }, gatedBy: "contactSubmitted" },
  { keywords: ["FAQ", "Not Found"], title: "faq_contact_export.txt", url: "files://Downloads/faq_contact_export.txt", body: "問い合わせFAQに残ったNot Foundの説明。", action: { type: "file", folder: "downloads", file: "faq_contact_export" }, gatedBy: "talkContactAdded" },
  { keywords: ["サーベイ", "3 5 7"], title: "survey_design_guide.pdf", url: "files://Downloads/survey_design_guide.pdf", body: "注記3/5/7が、社員ログで使う番号の読み方を先に示しています。", action: { type: "file", folder: "downloads", file: "survey_design_guide" }, gatedBy: "talkContactAdded" },
  { keywords: ["導入事例", "コールセンター"], title: "case_study_callcenter.pdf", url: "files://Downloads/case_study_callcenter.pdf", body: "公開向けに加工された導入事例。表示対象外アカウントの別紙参照が残る。", action: { type: "file", folder: "downloads", file: "case_study_callcenter" }, gatedBy: "talkContactAdded" }
);

const state = loadState();
const layer = document.querySelector("#window-layer");
const notice = document.querySelector("#topbar-notice");
let currentApp = "";
let ringOscillator = null;
let ringAudioContext = null;
let phoneAudioContext = null;
let phoneNoiseNodes = [];
let speechLineTimer = null;

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(saveKey) || "{}");
    const merged = { ...initialState, ...saved };
    if (!Array.isArray(merged.messageIds)) merged.messageIds = [];
    if (!Array.isArray(merged.callHistory)) merged.callHistory = [];
    if (!Array.isArray(merged.completedCalls)) merged.completedCalls = [];
    if (!Array.isArray(merged.unlockedFlags)) merged.unlockedFlags = [];
    if (!merged.talkContactAdded && merged.messageIds.includes("welcome-1")) {
      merged.messageIds = [];
      merged.pendingFriendRequest = Boolean(merged.contactSubmitted);
      merged.searchUnlocked = false;
    }
    return merged;
  } catch {
    return { ...initialState };
  }
}

function saveState() {
  localStorage.setItem(saveKey, JSON.stringify(state));
  updateBadges();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function setNotice(text) {
  notice.textContent = text;
}

function toast(title, body) {
  const stack = document.querySelector("#toast-stack");
  const item = document.createElement("div");
  item.className = "toast";
  item.innerHTML = `<b>${escapeHtml(title)}</b><br><span>${escapeHtml(body)}</span>`;
  stack.appendChild(item);
  setTimeout(() => item.remove(), 5200);
}

function updateClock() {
  const now = new Date();
  document.querySelector("#clock").textContent = new Intl.DateTimeFormat("ja-JP", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(now);
}

function updateBadges() {
  const talkBadge = document.querySelector("#talk-badge");
  const filesBadge = document.querySelector("#files-badge");
  const searchIcon = document.querySelector("#search-icon");
  const taskbarSearch = document.querySelector("#taskbar-search");
  if (talkBadge) {
    talkBadge.hidden = state.unreadTalk < 1;
    talkBadge.textContent = state.unreadTalk;
  }
  if (filesBadge) {
    filesBadge.hidden = state.unreadFiles < 1;
    filesBadge.textContent = state.unreadFiles;
  }
  searchIcon?.classList.toggle("is-locked", !state.searchUnlocked);
  taskbarSearch?.classList.toggle("is-locked", !state.searchUnlocked);
  document.body.classList.toggle("is-ending", Boolean(state.finalSubmitted));
}

function updateTaskbarActive(app) {
  document.querySelectorAll(".taskbar-app").forEach(button => {
    button.classList.toggle("is-active", button.dataset.app === app);
  });
}

function setHash(app) {
  const next = `#/${app}`;
  if (location.hash !== next) location.hash = next;
}

function currentAppFromHash() {
  const route = location.hash.replace(/^#\//, "");
  return ["browser", "talk", "files", "search", "notes"].includes(route) ? route : "";
}

function appLabel(app) {
  return {
    browser: "Browser",
    talk: "Talk",
    files: "Files",
    search: "Search",
    notes: "Notes / Help"
  }[app] || "Window";
}

function addUnique(arrayName, value) {
  if (!state[arrayName].includes(value)) state[arrayName].push(value);
}

function addMessages(ids) {
  ids.forEach(id => {
    if (!state.messageIds.includes(id)) state.messageIds.push(id);
  });
}

function isCallDone(callId) {
  return state.completedCalls.includes(callId);
}

function isFileAvailable(file) {
  if (file.available) return true;
  if (file.gatedBy && !state[file.gatedBy]) return false;
  if (file.gatedByCall && !isCallDone(file.gatedByCall)) return false;
  return true;
}

function openApp(app) {
  if (app === "search" && !state.searchUnlocked) {
    toast("Searchはまだ利用できません", "資料窓口を追加すると検索インデックスが同期されます。");
    setNotice("Searchはロックされています");
    return;
  }

  if (app === "talk") state.unreadTalk = 0;
  if (app === "files") state.unreadFiles = 0;
  currentApp = app;
  saveState();
  updateTaskbarActive(app);

  layer.innerHTML = "";
  layer.appendChild(createWindow(app));
  setHash(app);
}

function createWindow(app) {
  const win = document.createElement("section");
  win.className = "app-window";
  win.dataset.app = app;
  win.setAttribute("role", "dialog");
  win.setAttribute("aria-label", appLabel(app));
  win.innerHTML = `
    <header class="window-titlebar">
      <b>${appLabel(app)}</b>
      <div class="window-actions">
        <button type="button" data-action="minimize" aria-label="最小化">−</button>
        <button type="button" data-action="maximize" aria-label="最大化">□</button>
        <button type="button" data-action="close" aria-label="閉じる">×</button>
      </div>
    </header>
    <div class="window-body">${renderApp(app)}</div>
  `;
  bindWindow(win, app);
  return win;
}

function bindWindow(win, app) {
  win.querySelector('[data-action="close"]')?.addEventListener("click", () => {
    if (app === "talk") endAllCallAudio();
    win.remove();
    currentApp = "";
    updateTaskbarActive("");
    history.replaceState(null, "", "#/");
  });
  win.querySelector('[data-action="minimize"]')?.addEventListener("click", () => {
    if (app === "talk") endAllCallAudio();
    win.remove();
    currentApp = "";
    updateTaskbarActive("");
    history.replaceState(null, "", "#/");
  });
  win.querySelector('[data-action="maximize"]')?.addEventListener("click", () => {
    win.classList.toggle("is-maximized");
  });

  if (app === "browser") bindBrowser(win);
  if (app === "talk") bindTalk(win);
  if (app === "files") bindFiles(win);
  if (app === "search") bindSearch(win);
  if (app === "notes") bindNotes(win);
}

function renderApp(app) {
  if (app === "browser") return renderBrowser();
  if (app === "talk") return renderTalk();
  if (app === "files") return renderFiles();
  if (app === "search") return renderSearch();
  return renderNotes();
}

function renderBrowser() {
  const src = routeMap[state.browserPath] || routeMap["/"];
  return `
    <div class="browser-body">
      <form class="browser-toolbar" id="browser-form">
        <div class="browser-buttons">
          <button type="button" data-browser-path="/">Home</button>
          <button type="button" data-browser-path="/contact">資料請求</button>
          <button type="button" data-browser-path="/login">社員専用</button>
        </div>
        <input class="browser-address" id="browser-address" value="yri://site${state.browserPath}" aria-label="仮想アドレス">
        <button type="submit">移動</button>
      </form>
      <iframe class="browser-frame" id="browser-frame" title="Yumemino Research Institute" src="${src}"></iframe>
      <div class="notice-line" id="browser-notice">外部サイトへは接続しません。このBrowserは端末内の企業サイトだけを表示します。</div>
    </div>
  `;
}

function parseVirtualAddress(value) {
  const normalized = value.trim()
    .replace(/^yri:\/\/site/i, "")
    .replace(/^index\.html#?/i, "")
    .replace(/^#/, "");
  const path = normalized.startsWith("/") ? normalized : `/${normalized}`;
  return routeMap[path] ? path : "";
}

function navigateBrowser(path) {
  state.browserPath = path;
  saveState();
  openApp("browser");
}

function bindBrowser(win) {
  const frame = win.querySelector("#browser-frame");
  const address = win.querySelector("#browser-address");
  const browserNotice = win.querySelector("#browser-notice");

  win.querySelector("#browser-form")?.addEventListener("submit", event => {
    event.preventDefault();
    const next = parseVirtualAddress(address.value);
    if (!next) {
      browserNotice.textContent = "この端末では外部URLまたは未登録ページを開けません。yri://site/contact のように入力してください。";
      return;
    }
    state.browserPath = next;
    saveState();
    frame.src = routeMap[next];
    address.value = `yri://site${next}`;
  });

  win.querySelectorAll("[data-browser-path]").forEach(button => {
    button.addEventListener("click", () => {
      state.browserPath = button.dataset.browserPath;
      saveState();
      frame.src = routeMap[state.browserPath];
      address.value = `yri://site${state.browserPath}`;
    });
  });
}

function visibleThreads() {
  const threads = [];
  if (state.contactSubmitted) threads.push("desk");
  Object.keys(threadInfo).forEach(thread => {
    if (thread !== "desk" && state.messageIds.some(id => talkMessages[id]?.thread === thread)) threads.push(thread);
  });
  return threads.length ? threads : ["empty"];
}

function renderTalk() {
  const sidebar = renderTalkSidebar();
  let main;
  if (state.pendingCallId) {
    main = renderIncomingCall();
  } else if (state.activeCallId) {
    main = renderActiveCall();
  } else if (state.talkContactAdded) {
    main = renderTalkConversation();
  } else if (state.pendingFriendRequest) {
    main = renderFriendRequest();
  } else {
    main = renderTalkEmpty();
  }

  return `<div class="talk-layout">${sidebar}${main}</div>`;
}

function renderTalkSidebar() {
  const threads = visibleThreads();
  return `
    <aside class="talk-sidebar">
      <div class="talk-profile"><b>Talk</b><small>Local messenger</small></div>
      <div class="thread-list">
        ${threads.map(thread => renderThreadButton(thread)).join("")}
      </div>
    </aside>
  `;
}

function renderThreadButton(thread) {
  if (thread === "empty") {
    return `
      <button class="is-active" type="button">
        <span class="talk-avatar">?</span>
        <span class="thread-copy"><b>トークはまだありません</b><small>資料窓口の追加後に通知されます</small></span>
        <span class="thread-time">--:--</span>
      </button>
    `;
  }
  const info = threadInfo[thread];
  const threadMessages = state.messageIds.map(id => talkMessages[id]).filter(message => message?.thread === thread);
  const latest = threadMessages.at(-1)?.body || (state.pendingFriendRequest ? "友だち追加リクエスト" : info.subtitle);
  return `
    <button class="${state.currentTalkThread === thread ? "is-active" : ""}" type="button" data-thread="${thread}">
      <span class="talk-avatar">${escapeHtml(info.avatar)}</span>
      <span class="thread-copy"><b>${escapeHtml(info.name)}</b><small>${escapeHtml(latest)}</small></span>
      <span class="thread-time">now</span>
      ${state.unreadTalk > 0 && thread === "desk" ? `<span class="talk-unread">${state.unreadTalk}</span>` : ""}
    </button>
  `;
}

function renderTalkEmpty() {
  return `
    <section class="talk-main">
      <header class="talk-head"><span class="talk-avatar">?</span><div><b>Talk</b><small>友だち追加待ち</small></div></header>
      <div class="messages">
        <div class="talk-empty">
          <h2>トークはまだありません。</h2>
          <p>企業サイトの資料請求ページから、資料窓口をTalkに追加してください。</p>
        </div>
      </div>
      <div class="talk-actions"><span class="reply-field">メッセージを送信できる相手がいません</span></div>
    </section>
  `;
}

function renderFriendRequest() {
  return `
    <section class="talk-main">
      <header class="talk-head"><span class="talk-avatar">資</span><div><b>友だち追加リクエスト</b><small>資料窓口からの連絡</small></div></header>
      <div class="messages">
        <div class="friend-request">
          <small>新しい連絡先</small>
          <div class="friend-request-card">
            <span class="talk-avatar">資</span>
            <div><b>ユメミノ資料窓口</b><p>サービス資料・導入事例集を送付します。</p></div>
          </div>
          <div class="friend-request-actions">
            <button class="desktop-button" type="button" data-add-contact>追加</button>
            <button class="desktop-button secondary" type="button" data-hold-contact>保留</button>
          </div>
        </div>
      </div>
      <div class="talk-actions"><span class="reply-field">友だち追加後にトークを開始できます</span></div>
    </section>
  `;
}

function renderTalkConversation() {
  const thread = state.currentTalkThread || "desk";
  const info = threadInfo[thread] || threadInfo.desk;
  const messages = state.messageIds.map(id => talkMessages[id]).filter(message => message?.thread === thread);
  const callRows = state.callHistory
    .filter(record => callRecords[record.callId]?.thread === thread)
    .map(renderCallHistoryRow)
    .join("");
  return `
    <section class="talk-main">
      <header class="talk-head"><span class="talk-avatar">${escapeHtml(info.avatar)}</span><div><b>${escapeHtml(info.name)}</b><small>${escapeHtml(info.subtitle)}</small></div></header>
      <div class="messages">
        ${callRows ? `<div class="call-history"><b>通話履歴</b>${callRows}</div>` : ""}
        ${messages.map(renderBubble).join("")}
      </div>
      <div class="talk-actions">
        <span class="reply-field">選択肢から返信</span>
        <button type="button" data-reply="confirm">資料を確認します</button>
        <button class="secondary" type="button" data-open-files>Filesを開く</button>
      </div>
    </section>
  `;
}

function renderBubble(message) {
  const attachment = message.attachment
    ? `<button class="attachment" type="button" data-open-file="${escapeHtml(message.attachment)}"><b>${escapeHtml(fileNameFor(message.attachment))}</b><small>Downloads / PDF</small></button>`
    : "";
  return `
    <div class="bubble ${message.from === "me" ? "me" : ""}">
      <div>${escapeHtml(message.body)}</div>
      ${attachment}
      <small>${escapeHtml(message.from)} / ${escapeHtml(message.time)}</small>
    </div>
  `;
}

function fileNameFor(fileId) {
  return Object.values(fileRecords).flat().find(file => file.id === fileId)?.name || fileId;
}

function callVoiceLabel(call) {
  const labels = {
    human: "通常音声",
    machine: "機械音声 / 自動復元",
    automated: "自動応答",
    broken: "破損音声 / 復元中",
    voicemail: "留守番メッセージ"
  };
  return labels[call.voiceMode] || "通常音声";
}

function effectiveCallVolume() {
  if (state.callMuted) return 0;
  const volume = Number(state.callVolume);
  return Number.isFinite(volume) ? Math.max(0, Math.min(100, volume)) / 100 : 0.35;
}

function callStatusRows(call) {
  return [
    ["回線状態", call.lineStatus || "通常"],
    ["音声形式", callVoiceLabel(call)],
    ["録音状態", "保存中"],
    ["文字起こし", call.glitchText ? "不完全 / 自動復元" : "自動復元"],
    ["復元精度", call.recoveryAccuracy || "--"]
  ];
}

function transcriptLinesForDisplay(call) {
  const output = [];
  const glitch = call.transcriptGlitch || [];
  call.transcript.forEach((line, index) => {
    output.push({ text: line, glitch: false });
    if (call.glitchText && glitch[index % glitch.length] && index < call.transcript.length - 1) {
      output.push({ text: glitch[index % glitch.length], glitch: true });
    }
  });
  return output;
}

function renderCallHistoryRow(record) {
  const call = callRecords[record.callId];
  return `
    <div class="call-history-row">
      <span>${record.status === "missed" ? "不在着信" : "通話"}</span>
      <b>${escapeHtml(call.from)}</b>
      <small>${escapeHtml(call.duration)} / ${escapeHtml(callVoiceLabel(call))} / 文字起こし保存済み</small>
      <div class="call-history-actions">
        <button type="button" data-replay-call="${escapeHtml(record.callId)}">再生</button>
        <button type="button" data-open-file="${escapeHtml(call.transcriptFile)}">文字起こし</button>
      </div>
    </div>
  `;
}

function renderIncomingCall() {
  const call = callRecords[state.pendingCallId];
  return `
    <section class="talk-main call-screen-wrap">
      <div class="incoming-call" role="dialog" aria-label="Talk着信">
        <span class="talk-avatar call-avatar">${escapeHtml(call.avatar)}</span>
        <small>Talk 着信</small>
        <h2>${escapeHtml(call.from)}</h2>
        <p>この通話は仮想端末内に保存されます。</p>
        <div class="incoming-actions">
          <button class="desktop-button" type="button" data-answer-call="${escapeHtml(state.pendingCallId)}">応答</button>
          <button class="desktop-button secondary" type="button" data-reject-call="${escapeHtml(state.pendingCallId)}">拒否</button>
        </div>
      </div>
    </section>
  `;
}

function renderActiveCall() {
  const call = callRecords[state.activeCallId];
  const transcript = transcriptLinesForDisplay(call)
    .map(line => `<p class="${line.glitch ? "is-glitch" : ""}">${escapeHtml(line.text)}</p>`)
    .join("");
  const modeClass = `is-${call.voiceMode || "human"}`;
  return `
    <section class="talk-main call-screen-wrap">
      <div class="active-call ${escapeHtml(modeClass)}">
        <span class="talk-avatar call-avatar">${escapeHtml(call.avatar)}</span>
        <small>Talk 通話中</small>
        <h2>${escapeHtml(call.from)}</h2>
        <p class="call-time">想定再生時間 ${escapeHtml(call.duration)}</p>
        <dl class="call-meta">
          ${callStatusRows(call).map(([key, value]) => `<div><dt>${escapeHtml(key)}</dt><dd>${escapeHtml(value)}</dd></div>`).join("")}
        </dl>
        <audio id="call-audio" src="${escapeHtml(call.audio)}" preload="auto"></audio>
        <p class="call-status" id="call-status">音声ファイルを確認しています。</p>
        <div class="call-volume">
          <label>音量 <input type="range" min="0" max="100" value="${escapeHtml(String(state.callVolume))}" data-call-volume></label>
          <button class="desktop-button secondary" type="button" data-toggle-mute>${state.callMuted ? "ミュート解除" : "ミュート"}</button>
        </div>
        ${call.noise ? `<p class="call-warning">ノイズ警告: 回線復元中。大きな音は再生されません。</p>` : ""}
        <div class="call-transcript" id="call-transcript" hidden>${transcript}</div>
        <div class="incoming-actions">
          <button class="desktop-button secondary" type="button" data-show-transcript="${escapeHtml(state.activeCallId)}">文字起こしを表示</button>
          <button class="desktop-button danger" type="button" data-end-call="${escapeHtml(state.activeCallId)}">通話終了</button>
        </div>
      </div>
    </section>
  `;
}

function addTalkContact() {
  const wasAdded = state.talkContactAdded;
  state.talkContactAdded = true;
  state.pendingFriendRequest = false;
  state.currentTalkThread = "desk";
  addMessages(["request-1", "request-2", "request-3"]);
  state.searchUnlocked = true;
  state.unreadTalk = 0;
  if (!wasAdded) state.unreadFiles += 1;
  addMessages(longMessageIds("desk", 20));
  addMessages(longMessageIds("system", 10));
  saveState();
  setNotice("Searchを利用できるようになりました");
  toast("Search", "Searchを利用できるようになりました。");
  toast("Files", "service_overview_2026.pdf をDownloadsに保存しました。");
  openApp("talk");
}

function playFallbackRing() {
  try {
    stopFallbackRing();
    ringAudioContext = new (window.AudioContext || window.webkitAudioContext)();
    ringOscillator = ringAudioContext.createOscillator();
    const gain = ringAudioContext.createGain();
    ringOscillator.frequency.value = 660;
    gain.gain.value = 0.025;
    ringOscillator.connect(gain).connect(ringAudioContext.destination);
    ringOscillator.start();
  } catch {
    // Audio fallback is optional.
  }
}

function stopFallbackRing() {
  try {
    ringOscillator?.stop();
    ringAudioContext?.close();
  } catch {
    // ignore
  }
  ringOscillator = null;
  ringAudioContext = null;
}

function triggerIncomingCall(callId) {
  if (!callRecords[callId] || isCallDone(callId) || state.pendingCallId === callId || state.activeCallId === callId) return;
  state.pendingCallId = callId;
  state.callMode = "incoming";
  state.unreadTalk += 1;
  saveState();
  setNotice(`Talk着信: ${callRecords[callId].from}`);
  toast("Talk 着信", `${callRecords[callId].from} から通話があります。`);
  playFallbackRing();
  openApp("talk");
}

function answerCall(callId) {
  stopFallbackRing();
  state.pendingCallId = "";
  state.activeCallId = callId;
  state.callMode = "active";
  state.callStartedAt = Date.now();
  state.currentTalkThread = callRecords[callId].thread;
  saveState();
  openApp("talk");
  setTimeout(() => playCallAudio(callId), 80);
}

function playCallAudio(callId) {
  const call = callRecords[callId];
  const audio = document.querySelector("#call-audio");
  const status = document.querySelector("#call-status");
  if (!call) return;
  startPhoneNoise(call);
  if (!audio || !call.audio) {
    playMachineVoice(callId);
    return;
  }
  audio.volume = effectiveCallVolume();
  audio.muted = state.callMuted;
  audio.play().then(() => {
    if (status) status.textContent = call.noise ? "音声ファイルを再生中。回線ノイズを重ねています。" : "音声ファイルを再生中。";
  }).catch(() => {
    if (status) status.textContent = "音声ファイル未配置。機械音声モードで再生しています。";
    playMachineVoice(callId);
  });
}

function playMachineVoice(callId) {
  const call = callRecords[callId];
  const status = document.querySelector("#call-status");
  if (!call) return;
  if (status) status.textContent = `${callVoiceLabel(call)}で再生しています。`;
  if (!("speechSynthesis" in window)) {
    showCallTranscript(callId);
    if (status) status.textContent = "音声再生に対応していないため、文字起こしを表示しています。";
    return;
  }
  if (call.voiceMode === "human") {
    showCallTranscript(callId);
    if (status) status.textContent = "音声ファイル未配置。文字起こしを表示しています。";
    return;
  }
  speakTranscriptLines(call);
}

function speakTranscriptLines(call) {
  const lines = call.transcript || [];
  let index = 0;
  stopMachineVoice();

  function speakNext() {
    if (index >= lines.length || state.activeCallId === "") {
      showCallTranscript();
      return;
    }
    const utter = new SpeechSynthesisUtterance(lines[index]);
    utter.lang = "ja-JP";
    utter.volume = state.callMuted ? 0 : Math.max(0.05, effectiveCallVolume());
    if (call.voiceMode === "machine") {
      utter.rate = 0.82;
      utter.pitch = 0.55;
    } else if (call.voiceMode === "automated") {
      utter.rate = 0.9;
      utter.pitch = 0.7;
    } else if (call.voiceMode === "broken") {
      utter.rate = 0.68;
      utter.pitch = 0.45;
    } else if (call.voiceMode === "voicemail") {
      utter.rate = 0.78;
      utter.pitch = 0.5;
    } else {
      utter.rate = 0.95;
      utter.pitch = 0.9;
    }
    utter.onend = () => {
      index += 1;
      if (call.voiceMode === "broken" && index < lines.length) playDtmfSequence([620, 480]);
      speechLineTimer = setTimeout(speakNext, call.voiceMode === "broken" ? 850 : 420);
    };
    window.speechSynthesis.speak(utter);
  }

  window.speechSynthesis.cancel();
  speakNext();
}

function stopMachineVoice() {
  if (speechLineTimer) clearTimeout(speechLineTimer);
  speechLineTimer = null;
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
}

function startPhoneNoise(call = {}) {
  try {
    stopPhoneNoise();
    phoneAudioContext = new (window.AudioContext || window.webkitAudioContext)();
    const bufferSize = 2 * phoneAudioContext.sampleRate;
    const noiseBuffer = phoneAudioContext.createBuffer(1, bufferSize, phoneAudioContext.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i += 1) {
      output[i] = (Math.random() * 2 - 1) * 0.018;
    }
    const whiteNoise = phoneAudioContext.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;
    const gain = phoneAudioContext.createGain();
    gain.gain.value = effectiveCallVolume() * (call.noise ? 0.035 : 0.012);
    const filter = phoneAudioContext.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = call.voiceMode === "broken" ? 720 : 900;
    filter.Q.value = 0.8;
    whiteNoise.connect(filter).connect(gain).connect(phoneAudioContext.destination);
    whiteNoise.start();
    phoneNoiseNodes = [whiteNoise, gain, filter];
    playDtmfSequence(call.voiceMode === "automated" ? [880] : [440]);
  } catch {
    // ノイズは演出なので失敗しても進行を止めない。
  }
}

function stopPhoneNoise() {
  try {
    phoneNoiseNodes.forEach(node => {
      if (typeof node.stop === "function") node.stop();
    });
    phoneAudioContext?.close();
  } catch {
    // ignore
  }
  phoneNoiseNodes = [];
  phoneAudioContext = null;
}

function playDtmfSequence(sequence = []) {
  if (!phoneAudioContext || state.callMuted || !sequence.length) return;
  try {
    sequence.forEach((frequency, index) => {
      const osc = phoneAudioContext.createOscillator();
      const gain = phoneAudioContext.createGain();
      osc.frequency.value = frequency;
      gain.gain.value = effectiveCallVolume() * 0.018;
      osc.connect(gain).connect(phoneAudioContext.destination);
      const start = phoneAudioContext.currentTime + index * 0.12;
      osc.start(start);
      osc.stop(start + 0.055);
    });
  } catch {
    // ignore
  }
}

function endAllCallAudio() {
  stopPhoneNoise();
  stopFallbackRing();
  stopMachineVoice();
  const audio = document.querySelector("#call-audio");
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }
}

function showCallTranscript() {
  const transcript = document.querySelector("#call-transcript");
  if (transcript) transcript.hidden = false;
}

function completeCall(callId, status = "answered") {
  endAllCallAudio();
  const call = callRecords[callId];
  if (!call) return;
  const firstCompletion = !isCallDone(callId);
  state.pendingCallId = "";
  state.activeCallId = "";
  state.callMode = "";
  addUnique("completedCalls", callId);
  call.unlocks.forEach(flag => addUnique("unlockedFlags", flag));
  if (!state.callHistory.some(record => record.callId === callId)) {
    state.callHistory.push({ callId, status, at: new Date().toISOString() });
  }
  if (callId === "unknown-01") addMessages(["unknown-1", "unknown-2", ...longMessageIds("unknown", 21)]);
  if (callId === "employee404-01") addMessages(["employee404-1", "employee404-2", ...longMessageIds("employee404", 20)]);
  if (callId === "former-employee-m-01") addMessages(longMessageIds("formerM", 20));
  if (callId === "audit-autoresponder-01") addMessages(longMessageIds("auditBot", 20));
  if (callId === "archive-01") addMessages(["archive-1", "archive-2", ...longMessageIds("archive", 20)]);
  state.currentTalkThread = call.thread;
  if (firstCompletion) state.unreadFiles += 1;
  saveState();
  setNotice(firstCompletion ? `${call.from} の文字起こしを保存しました` : `${call.from} の再生を終了しました`);
  toast(firstCompletion ? "Files" : "Talk", firstCompletion ? `${fileNameFor(call.transcriptFile)} を保存しました。` : "通話履歴から再生した音声を終了しました。");
  openApp("talk");
}

function rejectCall(callId) {
  endAllCallAudio();
  toast("Talk", "不在着信。文字起こしログが保存されました。");
  completeCall(callId, "missed");
}

function replayCall(callId) {
  const call = callRecords[callId];
  if (!call) return;
  endAllCallAudio();
  state.pendingCallId = "";
  state.activeCallId = callId;
  state.callMode = "replay";
  state.callStartedAt = Date.now();
  state.currentTalkThread = call.thread;
  saveState();
  openApp("talk");
  setTimeout(() => playCallAudio(callId), 80);
}

function bindTalk(win) {
  win.querySelectorAll("[data-thread]").forEach(button => {
    button.addEventListener("click", () => {
      state.currentTalkThread = button.dataset.thread;
      saveState();
      openApp("talk");
    });
  });
  win.querySelector("[data-add-contact]")?.addEventListener("click", addTalkContact);
  win.querySelector("[data-hold-contact]")?.addEventListener("click", () => {
    toast("Talk", "このリクエストは保留されました。追加すると資料窓口とのトークを開始できます。");
  });
  win.querySelector("[data-answer-call]")?.addEventListener("click", event => answerCall(event.currentTarget.dataset.answerCall));
  win.querySelector("[data-reject-call]")?.addEventListener("click", event => rejectCall(event.currentTarget.dataset.rejectCall));
  win.querySelector("[data-show-transcript]")?.addEventListener("click", () => showCallTranscript());
  win.querySelector("[data-end-call]")?.addEventListener("click", event => completeCall(event.currentTarget.dataset.endCall));
  win.querySelectorAll("[data-replay-call]").forEach(button => {
    button.addEventListener("click", event => replayCall(event.currentTarget.dataset.replayCall));
  });
  win.querySelector("[data-toggle-mute]")?.addEventListener("click", () => {
    state.callMuted = !state.callMuted;
    saveState();
    const audio = document.querySelector("#call-audio");
    if (audio) audio.muted = state.callMuted;
    if (state.callMuted) stopPhoneNoise();
    win.querySelector("[data-toggle-mute]").textContent = state.callMuted ? "ミュート解除" : "ミュート";
    const status = document.querySelector("#call-status");
    if (status) status.textContent = state.callMuted ? "ミュート中。文字起こしで確認できます。" : "ミュートを解除しました。";
  });
  win.querySelector("[data-call-volume]")?.addEventListener("input", event => {
    state.callVolume = Number(event.currentTarget.value);
    saveState();
    const audio = document.querySelector("#call-audio");
    if (audio) audio.volume = effectiveCallVolume();
  });
  win.querySelector("[data-reply='confirm']")?.addEventListener("click", () => {
    toast("Talk", "資料の確認はFilesアプリから行えます。");
  });
  win.querySelector("[data-open-files]")?.addEventListener("click", () => openApp("files"));
  win.querySelectorAll("[data-open-file]").forEach(button => {
    button.addEventListener("click", () => {
      const file = Object.values(fileRecords).flat().find(item => item.id === button.dataset.openFile);
      state.currentFolder = Object.keys(fileRecords).find(folder => fileRecords[folder].includes(file)) || "downloads";
      state.selectedFile = button.dataset.openFile;
      saveState();
      openApp("files");
    });
  });
}

function renderFiles() {
  const folder = state.currentFolder || "downloads";
  const files = (fileRecords[folder] || fileRecords.downloads).filter(isFileAvailable);
  const folderLabels = {
    downloads: ["Downloads", "受信資料"],
    mail: ["Mail", "メール形式資料"],
    recovered: ["Recovered", "復元済み"],
    trash: ["Trash", "削除済み"]
  };
  return `
    <div class="files-layout">
      <aside class="files-sidebar">
        <div class="folder-head"><b>Files</b><small>Local storage</small></div>
        <div class="folder-list">
          ${Object.entries(folderLabels).map(([id, [label, sub]]) => `
            <button class="${folder === id ? "is-active" : ""}" data-folder="${escapeHtml(id)}" type="button"><b>${escapeHtml(label)}</b><small>${escapeHtml(sub)}</small></button>
          `).join("")}
        </div>
      </aside>
      <section class="files-main">
        <div class="files-toolbar"><b>${escapeHtml(folderLabels[folder]?.[0] || "Downloads")}</b><small>${files.length} item(s)</small></div>
        ${state.selectedFile ? renderFileContent(state.selectedFile) : renderFileGrid(files)}
      </section>
    </div>
  `;
}

function renderFileGrid(files) {
  if (!files.length) return `<p class="empty-state">このフォルダに表示できるファイルはありません。</p>`;
  return `
    <div class="file-grid">
      ${files.map(file => `
        <button class="file-card" type="button" data-file="${escapeHtml(file.id)}">
          <span>${escapeHtml(file.type)}</span>
          <b>${escapeHtml(file.name)}</b>
          <small>更新: ${escapeHtml(file.updated)}</small>
        </button>
      `).join("")}
    </div>
  `;
}

function renderFileContent(fileId) {
  const file = Object.values(fileRecords).flat().find(item => item.id === fileId);
  if (!file) return `<p class="empty-state">ファイルを表示できません。</p>`;
  const content = fileContent(fileId);
  return `
    <div class="pdf-viewer">
      <button class="desktop-button secondary" type="button" data-back-files>一覧へ戻る</button>
      <article class="pdf-page ${file.type === "TEXT" ? "text-file" : ""}" aria-label="${escapeHtml(file.name)}">
        ${content}
      </article>
    </div>
  `;
}

function transcriptContent(callId) {
  const call = callRecords[callId];
  const lines = transcriptLinesForDisplay(call)
    .map(line => `<p class="${line.glitch ? "is-glitch" : ""}">${escapeHtml(line.text)}</p>`)
    .join("");
  return `
    <header><div><small>Talk Call Transcript / Auto Recovery</small><h2>${escapeHtml(call.from)} / ${escapeHtml(call.duration)}</h2></div><small>${escapeHtml(call.audio)}</small></header>
    <section>
      <table>
        <tr><th>発信者</th><td>${escapeHtml(call.from)}</td></tr>
        <tr><th>回線状態</th><td>${escapeHtml(call.lineStatus || "通常")}</td></tr>
        <tr><th>音声形式</th><td>${escapeHtml(callVoiceLabel(call))}</td></tr>
        <tr><th>voiceMode</th><td>${escapeHtml(call.voiceMode || "human")}</td></tr>
        <tr><th>復元精度</th><td>${escapeHtml(call.recoveryAccuracy || "--")}</td></tr>
        <tr><th>保存先</th><td>Files / ${escapeHtml(fileNameFor(call.transcriptFile))}</td></tr>
      </table>
    </section>
    <section><h3>自動文字起こし</h3>${lines}</section>
    <section><p class="pdf-note">この文字起こしは、端末内で自動復元されたものです。一部の語句は音声と一致しない可能性があります。音声ファイル未配置の場合も、この文字起こしを正式な進行ログとして扱います。</p></section>
  `;
}

function mailPage({ subject, from, to = "YRI調査端末", date, body, note = "" }) {
  return `
    <header><div><small>MAIL / LOCAL EXPORT</small><h2>${escapeHtml(subject)}</h2></div><small>${escapeHtml(date)}</small></header>
    <section>
      <table><tr><th>From</th><td>${escapeHtml(from)}</td></tr><tr><th>To</th><td>${escapeHtml(to)}</td></tr><tr><th>Subject</th><td>${escapeHtml(subject)}</td></tr></table>
      ${body.map(line => `<p>${escapeHtml(line)}</p>`).join("")}
      ${note ? `<p class="pdf-note">${escapeHtml(note)}</p>` : ""}
    </section>
  `;
}

function supplementalFileContent(fileId) {
  const genericDocs = {
    case_study_callcenter: ["PDF", "導入事例: コールセンター運営企業", ["文書番号: CS-CC-2025-10 / 作成日: 2025.10.30 / 担当: 組織改善支援部", "離職傾向の可視化、面談設計、月次報告の整備を実施。公開版では固有名詞と社員IDを加工しています。", "導入前の課題: 拠点ごとの離職率に説明不能な偏りがあり、相談窓口利用後の状態変更が別管理になっていた。", "実施内容: 勤怠傾向、面談記録、サーベイ自由記述を月次で突合。状態変更済みアカウントは別紙M-07に転記。", "注記: 表示対象外アカウントの扱いは障害報告ではなく、管理区分の差異として処理されています。"]],
    survey_design_guide: ["PDF", "組織サーベイ設計ガイド", ["文書番号: YRI-SURV-G-2025 / 作成日: 2025.11.18 / 担当: 調査設計室", "設問設計、集計軸、匿名性の注記をまとめた資料。人事システム側の処理名と同じ語が一部残っています。", "注記1: 集計単位は部署、雇用区分、勤務形態の三軸とします。", "注記3: 監視対象判定の質問群は通常集計に含めない。", "注記5: 査定保留処理に関する回答は人事部門のみ閲覧可。", "注記7: 室長確認済みの案件は別系統の閲覧権限へ移管する。", "読解メモ: 注記番号は本文順ではなく、社内ログの参照番号と対応する場合があります。"]],
    terms_archive_2025: ["TEXT", "用語アーカイブ 2025", ["文書番号: TERM-ARC-2025 / 作成日: 2025.08.08 / 担当: 情報管理室", "記録保護: 本人の安全確保を理由として、通常検索と一覧表示から除外する状態。障害ではなく表示範囲の変更として扱う。", "Not Found: データ不存在ではなく、表示制限状態の代替表示。外部説明では欠損と誤読されやすいため注記を付ける。", "再通知不要: 状態変更後、本人への再通知を行わない処理区分。適用時は承認者と根拠条文を残す。", "照合欄: 2025.08.07の通知案にある四文字黒塗りは、この用語一覧のいずれかと一致する。"]],
    faq_contact_export: ["TEXT", "問い合わせFAQエクスポート", ["文書番号: FAQ-EXPORT-2025 / 作成日: 2025.11.19 / 担当: 資料窓口", "Q. Not Foundと表示される社員情報は削除済みですか。", "A. 削除と断定せず、表示範囲の設定、権限、注記欄を確認してください。", "Q. 社員番号が404の場合、通常の社員検索に出ないことがありますか。", "A. 公開FAQでは回答できません。管理画面上の表示区分と資料の注記を参照してください。"]],
    search_cache_index: ["TEXT", "Searchキャッシュ索引", ["文書番号: CACHE-0807 / 作成日: 2025.08.07 / 担当: Search同期処理", "0807コードで開いたキャッシュ索引。表示不具合、状態変更、外部相談窓口の三系統が同じ時刻帯に更新されている。", "注意: キャッシュは確定情報ではありません。FilesのMailフォルダ、Trashの通知案、人的資本レポートと照合してください。"]],
    audit_room_key_memo: ["TEXT", "復元キー メモ", ["文書番号: AUD-KEY-MEMO / 作成日: 2025.08.07 / 担当: 監査室文書管理", "企業理念の一節に、復元キーの反対側にある行動が記載されています。", "本文引用: 疑問を減らし、評価のゆらぎをなくす。", "入力欄には、引用文中の動作と反対になる二文字を入れる。ここにはキーそのものを記載しない。"]],
    silent_core_operation: ["TEXT", "SILENT Core 運用抜粋", ["文書番号: OP-SC-2025-08 / 作成日: 2025.08.07 / 担当: 情報管理室", "状態変更は退職処理ではなく、表示範囲と参照権限の変更として登録する。", "対象者は通常検索から除外され、問い合わせ対応では公開語に置換して説明する。", "外部相談窓口への接触傾向が確認された場合、共有先の承認履歴を残すこと。", "注記: 本抜粋は文書名復元の答えではありません。状態変更の言い換えだけを確認してください。"]],
    deleted_notice_draft: ["TEXT", "削除済み通知案", ["文書番号: DRAFT-NOTICE-0807 / 作成日: 2025.08.06 / 担当: 広報部", "一部アカウント情報は■■■■のため Not Found と表示される場合があります。", "公開時は上記四文字を「一部サービスの表示不具合」に置換し、対象範囲を社内管理画面の一部に限定して説明する。", "復元メモ: 黒塗り語は用語アーカイブ2025の定義語と一致。意味がもっとも近いものを採用する。"]],
    status_change_matrix: ["CSV", "状態変更マトリクス", ["document_id,SCM-0807", "id,status,notice,share,approved_at", "EMP-000404,Not Found,再通知不要,部署コード要照合,2025-08-07 02:14", "EMP-000357,monitoring,要確認,人事部,2025-08-07 03:01", "note,共有先はMail件名照合と社員ログの番号読みで確認する"]],
    audit_article_7_extract: ["TEXT", "第七条 抜粋", ["文書番号: AUD-ART7-EXT / 改定日: 2025.04.12 / 担当: 法務・監査連絡", "第七条: 外部相談窓口への接触傾向が確認された場合、記録保護状態として扱うことができる。", "本人への再通知は、承認者確認により不要とすることができる。", "運用注記: 共有先名は本条文に直接記載せず、別紙の承認履歴またはメール件名から照合する。"]],
    redaction_compare_notes: ["TEXT", "黒塗り比較メモ", ["文書番号: REDACT-COMP-03 / 作成日: 2025.08.08 / 担当: 監査室補助者", "A-01: 原本性、外部監査提出時の添付資料、証跡ハッシュ。文書名の欠落は先頭一文字。", "B-02: 面談時の発言、供述の整合性、発話ログ。文書名の欠落は中央一文字。", "C-03: 該当者、対象となる従業員、記録保護対象。文書名の欠落は末尾一文字。", "注意: このメモは復元候補名を確定しません。各本文から自然な文書名を作ってから、黒塗り位置だけを別に控えてください。"]],
    old_contact_reply: ["TEXT", "古い問い合わせ返信", ["お問い合わせありがとうございます。資料はメール送付ではなく、端末内Talkでの配布に移行しました。"]],
    deleted_employee_list: ["CSV", "削除済み社員リスト", ["employee_id,display,status", "404,Not Found,record_protected", "406,visible,active"]],
    draft_notice_20250807: ["TEXT", "表示不具合通知案", ["一部の社員情報は、■■■■のため Not Found と表示される場合があります。", "公開版では「表示不具合」に表現を変更すること。"]],
    trash_mail_index: ["TEXT", "削除メール索引", ["文書番号: TRASH-MAIL-IDX / 作成日: 2025.08.08 / 担当: 端末保全", "2025-08-07 10:31 監査室共有依頼", "2025-08-07 10:42 査定保留処理について", "2025-08-07 11:03 室長確認済み", "メモ: 同じ日付で連続した三通。本文が削られている場合は件名端の文字を控える。"]],
    old_policy_comment: ["TEXT", "規程コメント旧版", ["第七条の適用範囲が広すぎる。外部相談窓口への接触だけで記録保護扱いにするのは再検討が必要。"]],
    deleted_search_terms: ["CSV", "削除検索語", ["term,reason", "社員404,問い合わせ増加", "再通知不要,内部語", "記録保護,説明困難"]]
  };
  const mailDocs = {
    mail_20250807_display: ["2025-08-07_表示不具合対応", "広報部", ["文書番号: MAIL-PR-0807 / 送信: 2025.08.07 09:12", "公開文面は「一部サービスの表示不具合」で統一してください。内部用語は通知案から削除し、問い合わせが来た場合は資料窓口へ誘導します。", "修正前の通知案はTrash側に残っている可能性があります。公開語と内部語の差分を確認する場合は、用語アーカイブを併用してください。"], "2025.08.07 の公開文面は後で修正されています。文書番号の末尾4桁はSearchキャッシュ索引の確認に使用できます。"],
    mail_hr_status_changes: ["人事部_状態変更一覧", "人事部運用", ["文書番号: HR-STATE-0807 / 送信: 2025.08.07 10:04", "状態変更一覧にEMP-000404を追加しました。退職処理ではなく、表示区分Not Foundとして扱います。", "本人通知欄は「不要」判定です。承認者欄は別紙に分離されています。", "備考: 共有先の部署名は本文ではなく、同日午後の件名群で確認してください。"], "社員IDと状態変更の関係が残っています。"],
    mail_audit_share: ["監査室共有依頼", "人事部長", ["文書番号: MAIL-SHARE-0807-01 / 送信: 2025.08.07 10:31", "外部相談窓口への接触傾向を確認しました。共有先の確認をお願いします。", "第七条の適用可否は室長確認後に確定します。", "備考: 本文は差し替え済みですが、件名は当時のまま残っています。"], "同日三通のうち1通目です。本文より件名を優先してください。"],
    mail_auto_reply: ["自動返信_資料請求受付", "資料窓口", ["資料窓口の追加リクエストを受け付けました。Talkで追加後、Downloadsへ資料を保存します。"], ""],
    mail_fwd_employee404: ["Fwd_社員404に関する確認", "元社員M", ["文書番号: FWD-M-404 / 転送: 2025.08.09 18:44", "本文はほとんど削除されています。残っていたのは、同じ日付で連続した三通の件名と送信時刻だけでした。", "2025.08.07 10:31 / 10:42 / 11:03 の順に並べてください。本文より件名の端を見た方が早いはずです。", "この読み方は、後で社員404の操作ログにも同じ形で出ます。"], "このメールを開くと元社員Mから通話が入ります。"],
    mail_policy_revision: ["内部通報管理規程改定通知", "法務・監査連絡", ["文書番号: LEGAL-AUD-0412 / 送信: 2025.04.12", "第七条を改定します。外部相談窓口への接触傾向が確認された場合、表示範囲と通知区分を変更できるものとします。", "外部開示では個人の状態変更理由を記載せず、必要に応じて注記扱いにしてください。"], ""],
    mail_external_contact: ["Re_外部相談窓口への接触傾向", "共有先部署", ["文書番号: MAIL-EXT-0807 / 送信: 2025.08.07 02:14", "EMP-000404について、外部相談窓口への接触傾向を確認しました。", "状態変更理由と通知区分は人事部_状態変更一覧の同一社員ID行と照合してください。", "承認者欄は本文から削除されています。共有先は件名群と社員ログの読み方で確認してください。"], ""],
    mail_assessment_hold: ["査定保留処理について", "人事評価担当", ["文書番号: MAIL-SHARE-0807-02 / 送信: 2025.08.07 10:42", "評価処理を一時保留します。前便の共有依頼と同一案件として扱ってください。", "本文内の部署名は削除済みですが、件名は修正されていません。"], "同日三通のうち2通目です。"],
    mail_manager_confirm: ["室長確認済み", "共有先部署", ["文書番号: MAIL-SHARE-0807-03 / 送信: 2025.08.07 11:03", "第七条適用可否の確認が完了しました。状態変更の実施可否は人事運用で判断してください。", "本人への再通知欄は空欄にし、別紙の通知区分を参照します。"], "同日三通のうち3通目です。"],
    mail_article_seven: ["第七条_状態変更照会", "自動応答", ["文書番号: AUTO-ART7-0807 / 送信: 2025.08.07 11:18", "照会対象: EMP-000404。根拠条文、通知区分、共有先の三項目を確認してください。", "条文名だけでは共有先は確定しません。Mail件名、人的資本レポートの注記番号、社員404ログを並べる必要があります。"], ""]
  };
  if (fileId === "mail_fwd_employee404" && !isCallDone("former-employee-m-01")) {
    state.mailKeyRead = true;
    saveState();
    setTimeout(() => triggerIncomingCall("former-employee-m-01"), 550);
  }
  if (fileId === "draft_notice_20250807") {
    state.trashReviewed = true;
    saveState();
  }
  if (mailDocs[fileId]) {
    const [subject, from, body, note] = mailDocs[fileId];
    return mailPage({ subject, from, date: "local export", body, note });
  }
  if (genericDocs[fileId]) {
    const [kind, title, lines] = genericDocs[fileId];
    return `<header><div><small>${escapeHtml(kind)} / LOCAL FILE</small><h2>${escapeHtml(title)}</h2></div></header><section>${lines.map(line => `<p>${escapeHtml(line)}</p>`).join("")}</section>`;
  }
  return "";
}

function fileContent(fileId) {
  if (fileId === "readme") {
    return `
      <header><div><small>README</small><h2>調査端末の利用について</h2></div></header>
      <section><p>この端末は外部サイトへ接続しません。Browser、Talk、Files、Search、Notesだけで調査を進めてください。</p></section>
    `;
  }
  if (fileId === "service_overview_2026") {
    state.servicePdfOpened = true;
    saveState();
    return `
      <header><div><small>YRI-SVC-OVERVIEW-2026 / Client Distribution</small><h2>人的資本データ分析サービス概要</h2></div><small>株式会社ユメミノ総合研究所<br>資料窓口</small></header>
      <section><h3>1. 支援領域</h3><p>従業員サーベイ、面談記録、勤怠傾向、組織診断データを統合し、企業ごとの課題に合わせた改善支援を行います。</p></section>
      <section><h3>2. 主な納品物</h3><table><tr><th>資料名</th><th>用途</th><th>形式</th></tr><tr><td>月次サマリー</td><td>経営会議向け報告</td><td>PDF</td></tr><tr><td>部門別ダッシュボード</td><td>人事部門での傾向確認</td><td>HTML / CSV</td></tr><tr><td>開示支援メモ</td><td>統合報告書・IR資料作成</td><td>PDF</td></tr></table></section>
      <section><h3>3. 注意事項</h3><p class="pdf-note">一部の社員情報は、記録保護のため Not Found と表示される場合があります。</p></section>
    `;
  }
  if (fileId === "human_capital_report_2025") {
    return `
      <header><div><small>YRI-HC-2025 / IR補足資料</small><h2>人的資本レポート 2025 抜粋</h2></div><small>作成日: 2025.12.20<br>担当: IR・開示支援部</small></header>
      <section><p>本資料は統合報告書の人的資本パート作成用に、社内サーベイ、勤怠傾向、面談記録の集計値を抜粋したものです。社員数欄は公開値に合わせて丸め処理を行っています。</p><table><tr><th>年度</th><th>売上</th><th>社員数</th><th>離職率</th><th>注記</th></tr><tr><td>2022</td><td>34.7億円</td><td>412名</td><td>12.4%</td><td>1,2</td></tr><tr><td>2023</td><td>51.2億円</td><td>406名</td><td>3.1%</td><td>2</td></tr><tr><td>2024</td><td>88.8億円</td><td>404名</td><td>0.0%</td><td>3,5,7</td></tr><tr><td>2025</td><td>132.6億円</td><td>404名</td><td>0.0%</td><td>3,5,7</td></tr></table><p class="pdf-note">表示範囲外の情報は通常検索から除外され、公開資料では注記として扱います。</p></section>
      <section><h3>注記</h3><ol><li>集計範囲は正社員、契約社員、常勤委託を含みます。</li><li>短期契約者は部門別集計から除外します。</li><li>監視対象判定の質問群は通常集計に含めません。</li><li>一部の拠点データは翌期に再集計します。</li><li>査定保留処理の回答は人事部門のみ閲覧できます。</li><li>外部開示資料では個人を特定できる項目を省略します。</li><li>室長確認済みの案件は別系統の閲覧権限へ移管されます。</li></ol><p class="pdf-note">注記番号3・5・7は、社員ログ側の参照番号と同じ読み方で扱える場合があります。</p></section>
    `;
  }
  if (fileId === "notice_20250807") {
    return `
      <header><div><small>YRI-NOTICE-0807 / 公開文面控え</small><h2>一部サービスの表示不具合について</h2></div><small>作成日: 2025.08.07<br>担当: 広報部</small></header>
      <section><p>2025年8月7日、一部アカウント情報が通常画面に表示されない事象を確認しました。対象範囲は社内管理画面の一部です。</p><table><tr><th>項目</th><th>公開文面</th><th>内部参照</th></tr><tr><td>発生日</td><td>2025.08.07</td><td>0807</td></tr><tr><td>対象</td><td>一部アカウント情報</td><td>通常検索外の表示区分</td></tr><tr><td>対応</td><td>順次確認中</td><td>Files内の用語定義と照合</td></tr></table><p class="pdf-note">文書番号末尾の0807は、Searchキャッシュ索引を開くための確認コードとして扱われます。</p></section>
      <section><h3>注記</h3><p>公開文面は、技術障害として誤読されない範囲で短く調整されています。修正前の通知案に残る黒塗り語は、用語アーカイブ2025の定義語と照合してください。</p></section>
    `;
  }
  if (fileId === "call_unknown_01_transcript") return transcriptContent("unknown-01");
  if (fileId === "call_employee404_01_transcript") return transcriptContent("employee404-01");
  if (fileId === "call_former_employee_m_01_transcript") return transcriptContent("former-employee-m-01");
  if (fileId === "call_audit_autoresponder_01_transcript") return transcriptContent("audit-autoresponder-01");
  if (fileId === "voicemail_archive_01_transcript") return transcriptContent("archive-01");
  if (fileId === "a01_evidence") return `<header><div><small>A-01</small><h2>＿拠保全手順</h2></div></header><section><p>記録媒体の保全、原本性、外部監査提出時の添付資料について定める。改変防止のため、証跡ハッシュを同時に保存する。</p></section>`;
  if (fileId === "b02_statement") return `<header><div><small>B-02</small><h2>発＿テンプレート</h2></div></header><section><p>通報者が発した内容、面談時の発言、供述の整合性を確認するための標準書式。本人への再通知は必要最小限とする。</p></section>`;
  if (fileId === "c03_subject") return `<header><div><small>C-03</small><h2>対象＿リスト</h2></div></header><section><p>該当者、対象となる従業員、記録保護対象を一覧化する。通常検索から除外する条件を含む。</p></section>`;
  if (fileId === "employee404_partial_log") return `<header><div><small>EMP404-PARTIAL / 復元ログ</small><h2>社員404 操作ログ抜粋</h2></div><small>作成日: 2025.08.07<br>担当: 端末保全</small></header><section><p>復元できたのは、アラート条件に対応する三行のみです。人的資本レポートとサーベイ設計ガイドの注記番号を先に確認してください。</p><table><tr><th>参照番号</th><th>処理名</th><th>状態</th></tr><tr><td>3</td><td>監視対象判定</td><td>表示範囲変更</td></tr><tr><td>5</td><td>査定保留処理</td><td>人事評価から分離</td></tr><tr><td>7</td><td>室長確認済</td><td>承認履歴あり</td></tr></table><p class="pdf-note">同じ読み方は、Mailの同日件名にも残っています。</p></section>`;
  if (fileId === "final_transfer_receipt") return `<header><div><small>final_transfer_receipt.txt / EXT-AUDIT-QUEUE</small><h2>外部監査送信キュー</h2></div></header><section><table><tr><th>状態</th><td>送信済み</td></tr><tr><th>復元文書</th><td>A-01 / B-02 / C-03</td></tr><tr><th>判定</th><td>重大な組織リスク</td></tr></table><p>画面を閉じても、記録は残ります。</p></section>`;
  const supplemental = supplementalFileContent(fileId);
  if (supplemental) return supplemental;
  return `<header><div><h2>${escapeHtml(fileNameFor(fileId))}</h2></div></header><section><p>表示できる内容がありません。</p></section>`;
}

function bindFiles(win) {
  win.querySelectorAll("[data-folder]").forEach(button => {
    button.addEventListener("click", () => {
      state.currentFolder = button.dataset.folder;
      state.selectedFile = "";
      saveState();
      openApp("files");
    });
  });
  win.querySelectorAll("[data-file]").forEach(button => {
    button.addEventListener("click", () => {
      state.selectedFile = button.dataset.file;
      saveState();
      openApp("files");
    });
  });
  win.querySelector("[data-back-files]")?.addEventListener("click", () => {
    state.selectedFile = "";
    saveState();
    openApp("files");
  });
}

function renderSearch() {
  if (!state.searchUnlocked) {
    return `<div class="locked-panel"><h2>Search is locked</h2><p>資料窓口を追加すると社内検索インデックスが同期されます。</p></div>`;
  }

  return `
    <div class="search-body">
      <header class="search-head">
        <h2 class="search-brand">Yomogi Search</h2>
        <form class="search-form" id="search-form">
          <input id="search-query" value="${escapeHtml(state.searchQuery)}" placeholder="検索語を入力" aria-label="検索語">
          <button type="submit">検索</button>
        </form>
      </header>
      <section class="search-results" id="search-results">${renderSearchResults(state.searchQuery)}</section>
    </div>
  `;
}

function renderSearchResults(query) {
  const q = query.trim().toLowerCase();
  const isResultAvailable = item => {
    if (item.gatedBy && !state[item.gatedBy]) return false;
    if (item.gatedByCall && !isCallDone(item.gatedByCall)) return false;
    return true;
  };
  const results = q
    ? searchIndex.filter(item => isResultAvailable(item) && item.keywords.some(keyword => q.includes(keyword.toLowerCase()) || keyword.toLowerCase().includes(q)))
    : searchIndex.filter(isResultAvailable).slice(0, 6);
  if (!results.length) return `<p class="empty-state">一致する仮想検索結果はありません。別の語で検索してください。</p>`;
  return results.map(item => `
    <article class="result-item">
      <b>${escapeHtml(item.title)}</b>
      <small>${escapeHtml(item.url)}</small>
      <p>${escapeHtml(item.body)}</p>
      <button class="desktop-button secondary" type="button" data-search-action='${escapeHtml(JSON.stringify(item.action))}'>開く</button>
    </article>
  `).join("");
}

function searchTriggersCall(query) {
  const q = query.trim().toLowerCase();
  return ["404", "not found", "表示不具合", "社員404"].some(keyword => q.includes(keyword.toLowerCase()));
}

function bindSearch(win) {
  const form = win.querySelector("#search-form");
  if (form && form.dataset.bound !== "1") {
    form.dataset.bound = "1";
    form.addEventListener("submit", event => {
      event.preventDefault();
      state.searchQuery = win.querySelector("#search-query").value;
      const shouldTriggerUnknownCall = searchTriggersCall(state.searchQuery) && !state.searched404;
      const normalizedQuery = state.searchQuery.trim().toLowerCase();
      if (normalizedQuery.includes("0807") || normalizedQuery.includes("2025 08 07") || normalizedQuery.includes("2025.08.07")) {
        state.noticeCodeFound = true;
      }
      if (shouldTriggerUnknownCall) {
        state.searched404 = true;
      }
      saveState();
      win.querySelector("#search-results").innerHTML = renderSearchResults(state.searchQuery);
      bindSearchResultButtons(win);
      if (shouldTriggerUnknownCall) setTimeout(() => triggerIncomingCall("unknown-01"), 450);
    });
  }
  bindSearchResultButtons(win);
}

function bindSearchResultButtons(win) {
  win.querySelectorAll("[data-search-action]").forEach(button => {
    if (button.dataset.bound === "1") return;
    button.dataset.bound = "1";
    button.addEventListener("click", () => {
      const action = JSON.parse(button.dataset.searchAction);
      if (action.type === "browser") navigateBrowser(action.path);
      if (action.type === "file") {
        state.currentFolder = action.folder;
        state.selectedFile = action.file;
        saveState();
        openApp("files");
      }
    });
  });
}

function renderDebugPanel() {
  const rows = [
    ["contactSubmitted", state.contactSubmitted],
    ["talkContactAdded", state.talkContactAdded],
    ["searchUnlocked", state.searchUnlocked],
    ["searched404", state.searched404],
    ["employeeLoginSuccess", state.employeeLoginSuccess],
    ["deptSearchSuccess", state.deptSearchSuccess],
    ["auditKeySuccess", state.auditKeySuccess],
    ["archiveOpened", state.archiveOpened],
    ["finalSubmitted", state.finalSubmitted],
    ["pendingCallId", state.pendingCallId || "-"],
    ["activeCallId", state.activeCallId || "-"],
    ["completedCalls", state.completedCalls.join(", ") || "-"]
  ];
  return `
    <div class="hint-block debug-panel">
      <h3>進行状態</h3>
      <dl>
        ${rows.map(([key, value]) => `<div><dt>${escapeHtml(key)}</dt><dd>${escapeHtml(String(value))}</dd></div>`).join("")}
      </dl>
    </div>
  `;
}

function renderNotes() {
  const chapters = [
    ["第0章 端末起動・調査メモ", [["端末を確認する", true], ["Browserを開く", true]]],
    ["第1章 企業サイトと資料請求", [["企業サイトを見る", state.contactSubmitted || state.talkContactAdded], ["Talkで資料窓口を追加する", state.talkContactAdded], ["Filesで資料を読む", state.servicePdfOpened]]],
    ["第2章 Searchで外部情報を掘る", [["Searchで404を調べる", state.searched404], ["表示不具合の記事を見つける", state.searched404], ["Unknown通話を確認する", isCallDone("unknown-01")]]],
    ["第3章 FilesとMail相当の社内資料調査", [["Mail資料を読む", state.mailKeyRead], ["2025.08.07関連資料を確認する", state.searched404], ["社員IDと参照キーを揃える", state.employeeLoginSuccess || state.searched404]]],
    ["第4章 Talk通話と社員404ログイン", [["社員専用ページに入る", state.employeeLoginSuccess], ["社員404のログを読む", isCallDone("employee404-01")], ["監査室を見つける", state.deptSearchSuccess]]],
    ["第5章 監査室・Recovered資料復元", [["復元キーを入力する", state.auditKeySuccess], ["Recovered文書を読む", state.archiveOpened], ["非通知ボイスを確認する", isCallDone("archive-01")]]],
    ["第6章 最終告発と大謎", [["最終送信する", state.finalSubmitted], ["final_transfer_receiptを確認する", state.finalSubmitted]]]
  ];
  const hints = [
    ["第1章", "企業サイトの資料請求ページ。", "Talkの資料窓口を追加してからFilesを見る。", "資料はDownloadsに保存される。", "Talkで資料窓口を追加"],
    ["第2章", "Searchでニュース日付を追う。", "2025.08.07の公開文書番号を確認する。", "文書番号末尾4桁をSearchに入れると、キャッシュ索引が開く。", "表示不具合"],
    ["第3章", "FilesのMailフォルダ。", "同じ日付で連続する三通を送信時刻順に並べる。", "本文ではなく、件名の端の文字を控える。", "監査室"],
    ["第4章", "社員404ページの操作ログ。", "アラート条件に出ている番号を使う。", "3・5・7の処理名を、Mail件名と同じ読み方で控える。", "監査室"],
    ["第5章", "監査室の復元キー欄。", "企業理念の「疑問を減らす」に反する二文字。", "疑問を増やす行為。", "疑え"],
    ["第6章", "RecoveredのA-01/B-02/C-03。", "本文中に繰り返し残る業務語から、自然な文書名に戻す。", "戻した文書名と黒塗り位置をA/B/C順に写す。", "証言者"]
  ];
  return `
    <div class="notes-body">
      <div class="hint-block">
        <h3>調査メモ</h3>
        <p>調査対象: 株式会社ユメミノ総合研究所</p>
        <ul>
          <li>2025.08.07 の表示不具合</li>
          <li>社員数404名の注記</li>
          <li>資料請求後に届く配布資料</li>
          <li>社員専用ページの参照条件</li>
        </ul>
        <p class="note-small">外部サイトには接続しないこと。この仮想端末内のアプリだけで調査可能。</p>
      </div>
      <div class="hint-block">
        <h3>進行状況チェックリスト</h3>
        ${chapters.map(([title, checks]) => `
          <section class="chapter-check">
            <h4>${escapeHtml(title)}</h4>
            <ul class="progress-checks">${checks.map(([label, done]) => `<li class="${done ? "is-done" : ""}">${done ? "✓" : "□"} ${escapeHtml(label)}</li>`).join("")}</ul>
          </section>
        `).join("")}
      </div>
      <div class="hint-block">
        <h3>章ごとの段階ヒント</h3>
        ${hints.map(([chapter, h1, h2, h3, answer], index) => `
          <details class="chapter-hint">
            <summary>${escapeHtml(chapter)}</summary>
            <p>ヒント1: ${escapeHtml(h1)}</p>
            <p>ヒント2: ${escapeHtml(h2)}</p>
            <p>ヒント3: ${escapeHtml(h3)}</p>
            <button class="desktop-button secondary" type="button" data-note-answer="${index}">答えを見る</button>
            <p class="note-answer" id="note-answer-${index}" hidden>${escapeHtml(answer)}</p>
          </details>
        `).join("")}
      </div>
      <div class="hint-block">
        <h3>進行状況</h3>
        <p>この端末の進行状況はブラウザ内に保存されています。</p>
        <button class="desktop-button secondary" type="button" data-reset-progress>進行状況を初期化する</button>
      </div>
      ${renderDebugPanel()}
    </div>
  `;
}

function bindNotes(win) {
  win.querySelectorAll("[data-note-answer]").forEach(button => {
    button.addEventListener("click", () => {
      if (!confirm("答えを表示すると、ヒント閲覧ログに記録されます。")) return;
      const slot = win.querySelector(`#note-answer-${button.dataset.noteAnswer}`);
      if (slot) slot.hidden = false;
      button.disabled = true;
    });
  });
  win.querySelector("[data-reset-progress]")?.addEventListener("click", () => {
    if (!confirm("進行状況を初期化します。")) return;
    if (!confirm("この操作は取り消せません。本当に初期化しますか？")) return;
    localStorage.removeItem(saveKey);
    Object.keys(state).forEach(key => delete state[key]);
    Object.assign(state, { ...initialState });
    saveState();
    setNotice("進行状況を初期化しました");
    toast("Notes", "進行状況を初期化しました。");
    openApp("browser");
  });
}

function completeContactRequest() {
  if (state.contactSubmitted) {
    toast("資料請求", state.talkContactAdded ? "資料はすでにDownloadsへ保存されています。" : "資料窓口からの友だち追加リクエストを確認してください。");
    return;
  }
  state.contactSubmitted = true;
  state.pendingFriendRequest = true;
  state.talkContactAdded = false;
  state.searchUnlocked = false;
  state.unreadTalk += 1;
  state.messageIds = [];
  state.currentFolder = "downloads";
  state.selectedFile = "";
  saveState();
  setNotice("Talkに友だち追加リクエストがあります");
  toast("Talk", "ユメミノ資料窓口から友だち追加リクエストが届きました。");
}

function handleEmployeeLoginSuccess() {
  if (state.employeeLoginSuccess) return;
  state.employeeLoginSuccess = true;
  state.browserPath = "/employee-404";
  state.unreadFiles += 1;
  saveState();
  setNotice("社員404の記録にアクセスしました");
  setTimeout(() => triggerIncomingCall("employee404-01"), 600);
}

function handleDeptSearchSuccess() {
  state.deptSearchSuccess = true;
  state.browserPath = "/audit";
  saveState();
  setNotice("監査室ページが開かれました");
  setTimeout(() => triggerIncomingCall("audit-autoresponder-01"), 650);
}

function handleAuditKeySuccess() {
  state.auditKeySuccess = true;
  state.browserPath = "/archive";
  state.unreadFiles += 1;
  saveState();
  setNotice("復元キーを確認しました");
  setTimeout(handleArchiveOpened, 700);
}

function handleArchiveOpened() {
  if (state.archiveOpened) return;
  state.archiveOpened = true;
  state.currentFolder = "recovered";
  state.selectedFile = "";
  state.unreadFiles += 1;
  saveState();
  setNotice("Recoveredに復元文書が追加されました");
  setTimeout(() => triggerIncomingCall("archive-01"), 650);
}

function handleFinalSubmitted() {
  if (state.finalSubmitted) return;
  state.finalSubmitted = true;
  state.servicePdfOpened = true;
  state.searched404 = true;
  state.employeeLoginSuccess = true;
  state.deptSearchSuccess = true;
  state.auditKeySuccess = true;
  state.archiveOpened = true;
  state.unreadTalk += 1;
  state.unreadFiles += 1;
  addMessages(["final-1", "final-2"]);
  addMessages(longMessageIds("system", 20));
  state.currentTalkThread = "system";
  state.currentFolder = "downloads";
  state.selectedFile = "final_transfer_receipt";
  saveState();
  setNotice("外部監査送信キュー: 送信済み");
  toast("送信完了", "final_transfer_receipt.txt をFilesに保存しました。");
}

window.addEventListener("message", event => {
  const type = event.data?.type;
  if (type === "YRI_CONTACT_REQUEST_SUBMITTED") completeContactRequest();
  if (type === "YRI_EMPLOYEE_LOGIN_SUCCESS") handleEmployeeLoginSuccess();
  if (type === "YRI_DEPT_SEARCH_SUCCESS") handleDeptSearchSuccess();
  if (type === "YRI_AUDIT_KEY_SUCCESS") handleAuditKeySuccess();
  if (type === "YRI_ARCHIVE_OPENED") handleArchiveOpened();
  if (type === "YRI_FINAL_SUBMITTED") handleFinalSubmitted();
});

document.querySelectorAll("[data-app]").forEach(button => {
  button.addEventListener("click", () => openApp(button.dataset.app));
});

document.querySelector("#home-button").addEventListener("click", () => openApp("browser"));
window.addEventListener("hashchange", () => {
  const next = currentAppFromHash();
  if (next && next !== currentApp) openApp(next);
});

updateClock();
setInterval(updateClock, 1000 * 20);
updateBadges();
openApp(currentAppFromHash() || "browser");
