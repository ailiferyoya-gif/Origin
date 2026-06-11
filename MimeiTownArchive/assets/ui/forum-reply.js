const replyForm = document.querySelector("#bbs-reply-form");
const replyList = document.querySelector("#bbs-local-replies");
const replyKey = "mimei-bbs-thread-124-replies";

function escapeForumText(value) {
  return value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  }[char]));
}

function readReplies() {
  try {
    return JSON.parse(localStorage.getItem(replyKey) || "[]");
  } catch {
    return [];
  }
}

function renderReplies() {
  const replies = readReplies();
  replyList.innerHTML = replies.map((reply, index) => `
    <div class="res">
      <strong>${String(index + 24).padStart(3, "0")} ${reply.name}</strong>
      <p>${reply.body}</p>
    </div>
  `).join("");
}

replyForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(replyForm);
  const name = escapeForumText((data.get("name") || "名無し").toString().trim() || "名無し");
  const body = escapeForumText((data.get("body") || "").toString().trim());
  if (!body) return;
  const replies = readReplies();
  replies.push({ name, body });
  localStorage.setItem(replyKey, JSON.stringify(replies));
  replyForm.reset();
  renderReplies();
});

renderReplies();
