const blogForm = document.querySelector("#blog-comment-form");
const blogList = document.querySelector("#local-comments");
const blogTitle = document.querySelector("#comments-title");
const blogKey = "mimei-blog-comments-20060917";

function readBlogComments() {
  try {
    return JSON.parse(localStorage.getItem(blogKey) || "[]");
  } catch {
    return [];
  }
}

function saveBlogComments(comments) {
  localStorage.setItem(blogKey, JSON.stringify(comments));
}

function renderBlogComments() {
  const comments = readBlogComments();
  blogList.innerHTML = comments.map((comment) => `
    <div class="comment">
      <strong>${comment.name}</strong>
      <time>${comment.date}</time>
      <p>${comment.body}</p>
    </div>
  `).join("");
  blogTitle.textContent = `コメント ${5 + comments.length}件`;
}

function escapeText(value) {
  return value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  }[char]));
}

blogForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(blogForm);
  const name = escapeText((data.get("name") || "名無しさん").toString().trim() || "名無しさん");
  const body = escapeText((data.get("body") || "").toString().trim());
  if (!body) return;
  const comments = readBlogComments();
  comments.push({
    name,
    body,
    date: new Date().toLocaleString("ja-JP", { dateStyle: "short", timeStyle: "short" })
  });
  saveBlogComments(comments);
  blogForm.reset();
  renderBlogComments();
});

renderBlogComments();
