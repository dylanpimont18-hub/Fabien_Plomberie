/**
 * Audit Lighthouse local (mobile, 4G simulée) sur les pages clés du site construit.
 * Usage : npm run build && npm run lighthouse
 * Prérequis : npx lighthouse (téléchargé à la volée) et Chrome/Chromium.
 */
import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, extname } from "node:path";

const root = new URL("../_site/", import.meta.url).pathname;
const port = 8787;
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".png": "image/png", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".xml": "application/xml", ".webmanifest": "application/manifest+json", ".txt": "text/plain" };

const server = createServer(async (req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  if (p.endsWith("/")) p += "index.html";
  const file = join(root, p);
  try {
    await stat(file);
    res.writeHead(200, { "content-type": types[extname(file)] || "application/octet-stream", "cache-control": "public, max-age=3600" });
    res.end(await readFile(file));
  } catch {
    res.writeHead(404, { "content-type": "text/html" });
    res.end(await readFile(join(root, "404.html")));
  }
}).listen(port);

const pages = ["/", "/services/depannage-plomberie/", "/zones/plombier-vierzon/", "/conseils/fuite-d-eau-les-bons-reflexes/", "/contact/"];
const chrome = process.env.CHROME_PATH || "/opt/pw-browsers/chromium";

for (const page of pages) {
  await new Promise((resolve) => {
    const out = `lighthouse${page.replace(/\//g, "_") || "_home"}.json`;
    const lh = spawn("npx", ["--yes", "lighthouse", `http://localhost:${port}${page}`, "--quiet", "--output=json", `--output-path=${out}`, "--chrome-flags=--headless=new --no-sandbox", "--only-categories=performance,accessibility,best-practices,seo", "--form-factor=mobile"], { stdio: "inherit", env: { ...process.env, CHROME_PATH: chrome } });
    lh.on("close", async () => {
      try {
        const r = JSON.parse(await readFile(out, "utf8"));
        const c = r.categories;
        console.log(`${page.padEnd(44)} perf ${Math.round(c.performance.score * 100)}  a11y ${Math.round(c.accessibility.score * 100)}  bp ${Math.round(c["best-practices"].score * 100)}  seo ${Math.round(c.seo.score * 100)}  LCP ${Math.round(r.audits["largest-contentful-paint"].numericValue)} ms`);
      } catch (e) { console.log(page, "échec", e.message); }
      resolve();
    });
  });
}
server.close();
