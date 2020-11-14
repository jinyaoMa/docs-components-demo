module.exports = (themeConfig, context) => {
  const name = "vuepress-theme-yao-ui";

  const plugins = [
    [
      // https://vuepress-plugin-blog.ulivz.com/
      "@vuepress/blog",
      {
        directories: [
          {
            id: "post",
            title: "归档 | Archive",
            dirname: "_posts",
            path: "/archive/",
            pagination: {
              lengthPerPage: Infinity
            },
            layout: "Archive",
            itemLayout: "Post"
          }
        ],
        frontmatters: [
          {
            id: "tags",
            title: "标签 | Tags",
            keys: ["tags"],
            path: "/tag/",
            scopeLayout: "Archive"
          },
          {
            id: "categories",
            title: "分类 | Categories",
            keys: ["categories"],
            path: "/category/",
            scopeLayout: "Archive"
          }
        ],
        sitemap: {
          hostname: themeConfig.domain || "https://ma-jinyao.cn",
          dateFormatter:
            themeConfig.dateFormatter ||
            ((time) => new Date(time).toISOString())
        },
        comment:
          themeConfig.comment /* { // https://vuepress-plugin-blog.ulivz.com/guide/getting-started.html#comment
          service: 'vssue',
          owner: 'You',
          repo: 'Your repo',
          clientId: 'Your clientId',
          clientSecret: 'Your clientSecret',
        }*/
      }
    ]
  ];

  const alias = () => {
    return {
      "@theme": context.themeAPI.themePath
    };
  };

  const define = () => {
    return {
      BUILD_TIMESTAMP: Date.now(),
      BUILD_YEAR: new Date().getFullYear(),
      VUEPRESS_OFFICIAL_SITE: "//vuepress.vuejs.org/",
      THEME_REPO_URL: "//github.com/jinyaoMa/yao-ui",
      THEME_NAME: name,
      THEME_SHORTNAME: "YaoUI",
      THEME_AUTHOR: "jinyaoMa",
      THEME_AUTHOR_LINK: "//github.com/jinyaoMa",
      CC_LICENSE_LINK: "//creativecommons.org/licenses/by-nc-sa/4.0/"
    };
  };

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
    plugins,
    alias,
    define,
    additionalPages
  };
};
