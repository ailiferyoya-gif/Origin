import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root=path.dirname(fileURLToPath(import.meta.url));
const types={".html":"text/html; charset=utf-8",".css":"text/css; charset=utf-8",".js":"text/javascript; charset=utf-8",".png":"image/png"};
http.createServer((req,res)=>{let u=decodeURIComponent(req.url.split("?")[0]);if(u.endsWith("/"))u+="index.html";let f=path.join(root,u);if(!f.startsWith(root)){res.writeHead(403);res.end("forbidden");return}fs.readFile(f,(e,d)=>{if(e){res.writeHead(404);res.end("not found");return}res.writeHead(200,{"Content-Type":types[path.extname(f)]||"application/octet-stream"});res.end(d)})}).listen(4384,"127.0.0.1",()=>console.log("http://127.0.0.1:4384/web/index.html"));
