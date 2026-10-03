const path = require("node:path");
const fs = require("node:fs");
const { minify: minifyHtml } = require("html-minifier-terser");
const { transform: transformCss } = require("lightningcss");
const { minify: minifyJs } = require("terser");
const Image = require("@11ty/eleventy-img");

const SITE_MODE = (process.env.SITE_MODE || "demo").toLowerCase();
const PATH_PREFIX = process.env.PATH_PREFIX || "/";
const LINK_MODE = process.env.LINK_MODE || "absolute"; // "relative" pour une prévisualisation hors serveur (file://, artefact)
const IS_PROD_BUILD = process.env.ELEVENTY_RUN_MODE !== "serve";

/* ---------- CSS : concaténation, minification, inline dans <head> ---------- */
const CSS_ORDER = ["tokens.css", "base.css", "components.css", "pages.css"];
function buildCss() {
  const dir = path.join(__dirname, "src/assets/css");
  const raw = CSS_ORDER.map((f) => fs.readFileSync(path.join(dir, f), "utf8")).join("\n");
  const { code } = transformCss({
    filename: "site.css",
    code: Buffer.from(raw),
    minify: IS_PROD_BUILD,
    targets: { chrome: 100 << 16, firefox: 100 << 16, safari: (15 << 16) | (4 << 8) },
  });
  let css = code.toString();
  if (PATH_PREFIX !== "/") css = css.replace(/url\("\/assets\//g, `url("${PATH_PREFIX}assets/`);
  return css;
}

/* ---------- JS : minification, fichier différé ---------- */
async function buildJs() {
  const src = fs.readFileSync(path.join(__dirname, "src/assets/js/main.js"), "utf8");
  if (!IS_PROD_BUILD) return src;
  const out = await minifyJs(src, { ecma: 2020, compress: { passes: 2 }, format: { comments: false } });
  return out.code;
}

/* ---------- Liens relatifs (prévisualisation) ---------- */
function toRelative(fromUrl, target) {
  // fromUrl : "/services/chauffe-eau/" ; target : "/zones/plombier-vierzon/" ou "/assets/x.css"
  const [pathPart, hash] = target.split("#");
  let t = pathPart;
  if (t.endsWith("/")) t += "index.html";
  const fromDir = path.posix.dirname(fromUrl.endsWith("/") ? fromUrl + "index.html" : fromUrl);
  let rel = path.posix.relative(fromDir, t);
  if (!rel.startsWith(".")) rel = "./" + rel;
  return hash ? `${rel}#${hash}` : rel;
}

module.exports = function (eleventyConfig) {
  /* Données globales */
  eleventyConfig.addGlobalData("siteMode", SITE_MODE);
  eleventyConfig.addGlobalData("buildDate", new Date().toISOString());
  eleventyConfig.addGlobalData("year", new Date().getFullYear());

  /* Copies statiques */
  eleventyConfig.addPassthroughCopy({ "src/assets/fonts": "assets/fonts" });
  eleventyConfig.addPassthroughCopy({ "src/assets/img": "assets/img" });
  eleventyConfig.addPassthroughCopy({ "src/favicon.svg": "favicon.svg" });
  eleventyConfig.addPassthroughCopy({ "src/.nojekyll": ".nojekyll" });
  eleventyConfig.addWatchTarget("src/assets/css/");
  eleventyConfig.addWatchTarget("src/assets/js/");

  /* CSS inline : une seule fois par build */
  let cssCache = null;
  eleventyConfig.on("eleventy.before", () => {
    cssCache = buildCss();
  });
  eleventyConfig.addShortcode("inlineCss", () => cssCache || buildCss());

  /* JS : écrit dans _site/assets/js/main.js */
  eleventyConfig.on("eleventy.after", async ({ dir }) => {
    const js = await buildJs();
    const out = path.join(dir.output, "assets/js");
    fs.mkdirSync(out, { recursive: true });
    fs.writeFileSync(path.join(out, "main.js"), js);
  });

  /* Images responsives (AVIF/WebP) : utilisé dès qu'une vraie photo est fournie */
  eleventyConfig.addAsyncShortcode("image", async function (src, alt, sizes = "100vw", widths = [480, 800, 1200, 1600], cls = "") {
    if (!fs.existsSync(src)) {
      return `<div class="ph ph--3-2 ${cls}" role="img" aria-label="Photo de chantier à fournir"><span class="ph__label">Photo chantier à fournir</span></div>`;
    }
    const metadata = await Image(src, {
      widths,
      formats: ["avif", "webp", "jpeg"],
      outputDir: "./_site/assets/img/opt/",
      urlPath: `${PATH_PREFIX}assets/img/opt/`.replace(/\/{2,}/g, "/"),
      filenameFormat: (id, s, width, format) => `${path.basename(s, path.extname(s))}-${width}.${format}`,
    });
    return Image.generateHTML(metadata, { alt, sizes, loading: "lazy", decoding: "async", class: cls });
  });

  /* Filtres */
  eleventyConfig.addFilter("absoluteUrl", (u, base) => new URL(u, base).href);
  eleventyConfig.addFilter("isoDate", (d) => new Date(d).toISOString().slice(0, 10));
  eleventyConfig.addFilter("frDate", (d) =>
    new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })
  );
  eleventyConfig.addFilter("jsonld", (obj) => JSON.stringify(obj).replace(/</g, "\\u003c"));
  eleventyConfig.addFilter("nbsp", (s) => String(s).replace(/ /g, " "));
  eleventyConfig.addFilter("todo", (s) =>
    String(s).replace(/\[À COMPLÉTER[^\]]*\]|\[lien À COMPLÉTER\]|\[MA MARQUE\]|\[À activer[^\]]*\]/g, (m) => `<mark class="todo">${m}</mark>`)
  );
  eleventyConfig.addFilter("find", (arr, key, val) => (arr || []).find((x) => x[key] === val));
  eleventyConfig.addFilter("where", (arr, key, val) => (arr || []).filter((x) => x[key] === val));
  eleventyConfig.addFilter("limit", (arr, n) => (arr || []).slice(0, n));
  eleventyConfig.addFilter("readingTime", (content) => {
    const words = String(content).replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 200));
  });
  eleventyConfig.addFilter("wordCount", (content) =>
    String(content).replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length
  );

  /* Collections */
  eleventyConfig.addCollection("conseils", (api) =>
    api.getFilteredByGlob("src/conseils/*.md").sort((a, b) => b.date - a.date)
  );

  /* Transforms : minification HTML, liens relatifs en mode prévisualisation */
  eleventyConfig.addTransform("html-post", async function (content) {
    if (!(this.page.outputPath || "").endsWith(".html")) return content;
    let html = content;
    if (LINK_MODE === "relative") {
      const from = this.page.url;
      const strip = (val) => (PATH_PREFIX !== "/" && val.startsWith(PATH_PREFIX) ? "/" + val.slice(PATH_PREFIX.length) : val);
      html = html.replace(/\s(href|src|poster|data-merci)="(\/[^"\/][^"]*|\/)"/g, (m, attr, val) => ` ${attr}="${toRelative(from, strip(val))}"`);
      html = html.replace(/url\("(\/[^"]+)"\)/g, (m, val) => `url("${toRelative(from, strip(val))}")`);
    }
    if (IS_PROD_BUILD) {
      html = await minifyHtml(html, {
        collapseWhitespace: true,
        conservativeCollapse: true,
        removeComments: true,
        minifyCSS: false,
        minifyJS: true,
        keepClosingSlash: true,
      });
    }
    return html;
  });

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    pathPrefix: PATH_PREFIX,
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"],
  };
};
