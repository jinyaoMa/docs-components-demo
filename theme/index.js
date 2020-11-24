const combineThemeConfig = (themeConfig, object) => {
  for (const key in object) {
    if (object[key] instanceof Array) {
      if (!themeConfig.hasOwnProperty(key)) {
        themeConfig[key] = [];
      }
      themeConfig[key] = themeConfig[key].concat(object[key]);
    } else if (typeof object[key] === "object") {
      if (!themeConfig.hasOwnProperty(key)) {
        themeConfig[key] = {};
      }
      combineThemeConfig(themeConfig[key], object[key]);
    } else {
      if (!themeConfig.hasOwnProperty(key)) {
        themeConfig[key] = object[key];
      }
    }
  }
};

module.exports = (themeConfig, context) => {
  const name = "vuepress-theme-yao-ui";

  combineThemeConfig(themeConfig, {
    hitokoto: {
      api: "//v1.hitokoto.cn",
      type: "l" // https://developer.hitokoto.cn/sentence/#请求参数
    }
  });

  const zhCN = require("./locales/zh-CN");
  const enUS = require("./locales/en-US");

  const plugins = [
    [
      // https://vuepress-plugin-blog.ulivz.com/
      "@vuepress/blog",
      {
        directories: [
          {
            id: "archive",
            dirname: "_posts",
            path: "/archive/",
            title: "归档 | Archive",
            layout: "Archive",
            frontmatter: {
              title_zh: zhCN.archive,
              title_en: enUS.archive
            },
            itemLayout: "Post",
            itemPermalink: "/archive/:slug"
          }
        ],
        frontmatters: [
          {
            id: "category",
            keys: ["category", "categories"],
            path: "/category/",
            title: "分类 | Categories",
            layout: "Catagory",
            scopeLayout: "Archive"
          },
          {
            id: "tag",
            keys: ["tag", "tags"],
            path: "/tag/",
            title: "标签 | Tags",
            layout: "Tag",
            scopeLayout: "Archive"
          }
        ]
      }
    ],
    [
      // https://github.com/JoeyBling/vuepress-plugin-helper-live2d
      "vuepress-plugin-helper-live2d",
      {
        log: false,
        live2d: {
          enable: true,
          model: "haruto",
          display: {
            position: "right",
            width: 180,
            height: 270,
            hOffset: 72,
            vOffset: 40
          },
          mobile: {
            show: false
          },
          react: {
            opacity: 1
          }
        }
      }
    ],
    [
      // https://www.vuepress.cn/plugin/official/plugin-search.html
      "@vuepress/search",
      {
        searchMaxSuggestions: 9
      }
    ],
    [
      // https://vuepress.vuejs.org/plugin/official/plugin-nprogress.html#install
      "@vuepress/nprogress"
    ],
    [
      // https://vuepress.github.io/zh/plugins/mathjax/
      "vuepress-plugin-mathjax"
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
        layout: "Home",
        title: "首页 | Home"
      }
    }
  ];

  const extendPageData = ($page) => {
    const markdown_content = $page._strippedContent;

    // pangu
    if (markdown_content) {
      const pangu = require("pangu");
      $page.frontmatter.title = $page.title = pangu.spacing($page.title || "");
      $page.excerpt = pangu.spacing($page.excerpt || "");
    }

    // word count
    if (markdown_content) {
      const zh = (markdown_content.match(/[\u4E00-\u9FA5]/g) || []).length;
      const en = (
        markdown_content
          .replace(/[\u4E00-\u9FA5]/g, "")
          .match(
            /[a-zA-Z0-9_\u0392-\u03c9\u0400-\u04FF]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af\u0400-\u04FF]+|[\u00E4\u00C4\u00E5\u00C5\u00F6\u00D6]+|\w+/g
          ) || []
      ).length;
      $page.frontmatter.wordcount = zh + en;
    } else {
      $page.frontmatter.wordcount = 0;
    }
  };

  const extendMarkdown = (md) => {
    md.use(require("markdown-it-pangu"));
  };

  const { PLUGINS } = require("@vuepress/markdown/lib/constant");

  const chainMarkdown = (config) => {
    config.plugin(PLUGINS.TOC).tap(([options]) => {
      return [Object.assign(options, { includeLevel: [1, 2, 3, 4, 5, 6] })];
    });
  };

  return {
    name,
    plugins,
    alias,
    define,
    additionalPages,
    extendPageData,
    extendMarkdown,
    chainMarkdown
  };
};
