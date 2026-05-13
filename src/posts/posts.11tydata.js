export default {
  layout: "layouts/post.njk",
  eleventyComputed: {
    permalink: (data) => {
      const slug = data.page.fileSlug;
      const type = data.type || "articles";
      return `/${type}/${slug}/index.html`;
    },
  },
};
