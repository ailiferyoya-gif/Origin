import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));
const port = Number(process.env.PORT || 4381);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".md": "text/markdown; charset=utf-8"
};

createServer((req, res) => {
  const url = new URL(req.url || "/", `http://127.0.0.1:${port}`);
  const requested = url.pathname === "/" ? "/web/" : decodeURIComponent(url.pathname);
  let path = normalize(join(root, requested));
  if (existsSync(path) && statSync(path).isDirectory()) path = normalize(join(path, "index.html"));

  if (!path.startsWith(root) || !existsSync(path) || statSync(path).isDirectory()) {
    res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    res.end("Not found");
    return;
  }

  res.writeHead(200, { "content-type": types[extname(path)] || "application/octet-stream" });
  createReadStream(path).pipe(res);
}).listen(port, "127.0.0.1", () => {
  console.log(`HaikoKinenMystery: http://127.0.0.1:${port}/web/`);
});
