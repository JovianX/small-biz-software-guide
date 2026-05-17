/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default function (eleventyConfig) {
  eleventyConfig.amendLibrary("md", (mdLib) => {
    const prevOpen = mdLib.renderer.rules.table_open;
    const prevClose = mdLib.renderer.rules.table_close;

    mdLib.renderer.rules.table_open = (tokens, idx, options, env, self) => {
      const inner = prevOpen
        ? prevOpen(tokens, idx, options, env, self)
        : self.renderToken(tokens, idx, options);
      return `<div class="prose-table-wrap">\n${inner}`;
    };

    mdLib.renderer.rules.table_close = (tokens, idx, options, env, self) => {
      const inner = prevClose
        ? prevClose(tokens, idx, options, env, self)
        : self.renderToken(tokens, idx, options);
      return `${inner}\n</div>`;
    };
  });

  eleventyConfig.addPassthroughCopy({
    "src/assets": "assets",
    "src/CNAME": "CNAME",
  });

  eleventyConfig.addFilter("readableDate", (value) => {
    if (!value) return "";
    const d = value instanceof Date ? value : new Date(value);
    return d.toLocaleDateString("en", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });
  });

  eleventyConfig.addFilter("htmlDate", (value) => {
    if (!value) return "";
    const d = value instanceof Date ? value : new Date(value);
    return d.toISOString().slice(0, 10);
  });

  eleventyConfig.addFilter("contentTypeLabel", (type) => {
    const map = {
      reviews: "Review",
      roundups: "Roundup",
      comparisons: "Comparison",
      news: "News",
      guides: "Guide",
    };
    return map[type] || (type ? String(type) : "Article");
  });

  eleventyConfig.addFilter("stripTrailingSlash", (value) => String(value ?? "").replace(/\/+$/, ""));

  eleventyConfig.addFilter("canonicalUrl", (pageUrl, siteRoot) => {
    const base = String(siteRoot ?? "").replace(/\/+$/, "");
    let path = String(pageUrl ?? "/").split("#")[0].split("?")[0] || "/";
    if (!path.startsWith("/")) path = `/${path}`;
    path = path.replace(/\/index\.html$/i, "");
    if (path === "") path = "/";
    if (path !== "/" && !path.endsWith("/")) path = `${path}/`;
    return `${base}${path}`;
  });

  eleventyConfig.addFilter("absUrl", (path, siteRoot) => {
    if (!path) return "";
    const base = String(siteRoot ?? "").replace(/\/+$/, "");
    const p = String(path);
    if (/^https?:\/\//i.test(p)) return p;
    const normalized = p.startsWith("/") ? p : `/${p}`;
    return `${base}${normalized}`;
  });

  eleventyConfig.addFilter("jsonEncode", (value) => JSON.stringify(value ?? ""));

  eleventyConfig.addCollection("posts", (api) =>
    api.getFilteredByGlob("**/posts/**/*.md").sort((a, b) => b.date - a.date),
  );

  eleventyConfig.addShortcode("year", () => String(new Date().getUTCFullYear()));

  return {
    pathPrefix: process.env.BASE_PATH || "/",
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
