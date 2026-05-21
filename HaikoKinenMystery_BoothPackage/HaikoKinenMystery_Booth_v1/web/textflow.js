(() => {
  const skipTags = new Set(["SCRIPT", "STYLE", "TEXTAREA", "INPUT", "CODE", "PRE", "KBD", "SAMP"]);
  const japanesePattern = /[\u3040-\u30ff\u3400-\u9fff]/;
  const particlePattern = /(から|まで|より|など|だけ|ほど|くらい|ぐらい|こそ|でも|では|には|へは|とは|ても|ては|て|の|が|を|に|へ|と|で|は|も|や|か)$/;
  const punctuationPattern = /[、。,.!?！？：:；;]/;
  const breakTokenPattern = /(から|まで|より|など|だけ|ほど|くらい|ぐらい|こそ|でも|では|には|へは|とは|ても|ては|て|[、。,.!?！？：:；;]|[のがをにへとではもやか])/g;

  function breakableSegments(text) {
    const segments = [];
    let cursor = 0;
    text.replace(breakTokenPattern, (match, _token, offset) => {
      if (offset > cursor) segments.push(text.slice(cursor, offset));
      segments.push(match);
      cursor = offset + match.length;
      return match;
    });
    if (cursor < text.length) segments.push(text.slice(cursor));
    return segments.filter(Boolean);
  }

  function shouldAddBreak(segment, next) {
    if (!next || /^\s+$/.test(segment) || /^\s+$/.test(next)) return false;
    if (punctuationPattern.test(segment) || particlePattern.test(segment)) return true;
    return japanesePattern.test(segment) && !/^[ぁ-んァ-ンー]$/.test(next);
  }

  function flowTextNode(node) {
    const text = node.nodeValue;
    if (!text || text.length < 6 || !japanesePattern.test(text)) return;
    const parent = node.parentElement;
    if (!parent || skipTags.has(parent.tagName) || parent.closest("[data-no-textflow]")) return;
    const segments = breakableSegments(text);
    if (segments.length < 2) return;
    const fragment = document.createDocumentFragment();
    segments.forEach((segment, index) => {
      fragment.appendChild(document.createTextNode(segment));
      if (shouldAddBreak(segment, segments[index + 1])) fragment.appendChild(document.createElement("wbr"));
    });
    node.replaceWith(fragment);
  }

  function applyTextFlow() {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        const parent = node.parentElement;
        if (!parent || skipTags.has(parent.tagName)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(flowTextNode);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyTextFlow, { once: true });
  } else {
    applyTextFlow();
  }
})();
