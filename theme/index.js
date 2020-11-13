module.exports = (themeConfig, context) => {
  const name = "vuepress-theme-yao-ui";

  const additionalPages = [
    {
      path: "/",
      frontmatter: {
        layout: "Layout"
      }
    }
  ];

  return {
    name,
    additionalPages
  };
};
