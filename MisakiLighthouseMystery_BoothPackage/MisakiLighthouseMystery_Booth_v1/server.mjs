import { createServer } from "node:http";
import { createReadStream, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL(".", import.meta.url));
const mime = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".png": "image/png" };
const server = createServer((req, res) => {
  const url = decodeURIComponent(new URL(req.url, "http://127.0.0.1").pathname);
  let file = normalize(join(root, url === "/" ? "/web/index.html" : url));
  if (!file.startsWith(normalize(root))) { res.writeHead(403); res.end("Forbidden"); return; }
  try { if (statSync(file).isDirectory()) file = join(file, "index.html"); } catch {}
  try {
    statSync(file);
    res.writeHead(200, { "Content-Type": mime[extname(file)] || "application/octet-stream" });
    createReadStream(file).pipe(res);
  } catch { res.writeHead(404); res.end("Not found"); }
});
server.listen(4382, "127.0.0.1", () => console.log("http://127.0.0.1:4382/web/"));
