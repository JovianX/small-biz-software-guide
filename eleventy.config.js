/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default function (eleventyConfig) {
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
