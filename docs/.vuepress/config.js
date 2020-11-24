module.exports = {
  // https://www.vuepress.cn/zh/config/

  theme: require.resolve("../../theme"),

  base: "/",

  title: "耀_jinyaoMa",

  description:
    "耀, Mark, jinyaoMa, 部落阁, 博客, Blog, Mustom, VuePress, 耀の个人网站, 耀的个人网站, Mark の Personal Website, Mark's Personal Website",

  themeConfig: {
    backgrounds: [
      // "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596065328389&di=ad7a9cc49e45547721005bd528325f0d&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2%2F58b4ef69ed377.jpg",
      // "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596063652971&di=8b659ee5cd46f4006d082b626eb3bd0d&imgtype=0&src=http%3A%2F%2Fpicture.ik123.com%2Fuploads%2Fallimg%2F180330%2F4-1P330160644.jpg",
      "https://api.btstu.cn/sjbz/?lx=dongman"
    ],
    avatar: "/img/avatar.png",
    author: {
      zh: "耀",
      en: "jinyaoMa"
    },
    menus: [
      {
        text: {
          zh: "博客",
          en: "Blog"
        },
        icon: '<i class="fas fa-blog fa-fw"></i>',
        items: [
          {
            text: {
              zh: "首页",
              en: "Home"
            },
            link: "/"
          },
          {
            text: {
              zh: "归档",
              en: "Archive"
            },
            link: "/archive/"
          },
          {
            text: {
              zh: "分类",
              en: "Categories"
            },
            link: "/category/"
          },
          {
            text: {
              zh: "标签",
              en: "Tags"
            },
            link: "/tag/"
          },
          {
            text: {
              zh: "关于",
              en: "About"
            },
            link: "/about/"
          }
        ]
      },
      {
        text: {
          zh: "耀_UI",
          en: "Yao_UI"
        },
        icon: '<i class="fas fa-tools fa-fw"></i>',
        items: [
          {
            text: {
              zh: "布局容器",
              en: "Container"
            },
            link: "/component/container"
          }
        ]
      }
    ],
    music: `https://api.i-meto.com/meting/api?server=netease&type=playlist&id=4989572738&r=${Math.random()}`,
    copyright: `© 2018 - ${new Date().getFullYear()} jinyaoMa`,
    domain: "https://i.ma-jinyao.cn", // for sitemap generate
    dateFormatter: (time) => {
      // for sitemap dateFormatter used
      const regexAM = /├\w\d\d: AM┤/;
      const regexPM = /├\w\d\d: PM┤/;
      return new Date(
        time.replace(regexAM, "AM").replace(regexPM, "PM")
      ).toISOString();
    },
    searchMaxSuggestions: 12, // max number of search results display
    hitokoto: {
      img: {
        left: "/img/hitokoto.left.png",
        right: "/img/hitokoto.right.png"
      },
      customs: [
        /*{ // format; if customs exist, API will be ignored, and customs will be in use
                word: 'https://developer.hitokoto.cn',
                from: '一言开发者中心'
              }*/
      ],
      type: "i" // https://developer.hitokoto.cn/sentence/#请求参数
    },
    // external links; use for the component that displays after clicking on the left-top button of header
    portals: [
      {
        name: "My Site",
        desc: "耀 の 个人网站 | Mark の Personal Website",
        icon: "/img/avatar.png",
        link: "https://jinyaoma.github.io/vuepress-theme-mustom/"
      },
      {
        name: "Palette",
        desc: "想知道图片主题色？",
        icon: "https://jinyaoma.github.io/Palette/icon.png",
        link: "https://jinyaoma.github.io/Palette/"
      },
      {
        name: "MPlayer",
        desc: "APlayer 个人模仿练习版",
        icon: "https://blog.ma-jinyao.cn/asset/img/icon.medium.png",
        link: "https://jinyaoma.github.io/MPlayer/"
      },
      {
        name: "求职信仓库",
        desc: "Cover Letter Library",
        icon: "https://jinyaoma.github.io/cover-letter-lib/favicon.ico",
        link: "https://jinyaoma.github.io/cover-letter-lib/"
      },
      {
        name: "Resume",
        desc: "Resume Template",
        icon: "https://blog.ma-jinyao.cn/extension/resume/icon.png",
        link: "https://blog.ma-jinyao.cn/extension/resume/english/"
      },
      {
        name: "简历",
        desc: "简历模板",
        icon: "https://blog.ma-jinyao.cn/extension/resume/icon.reverse.png",
        link: "https://blog.ma-jinyao.cn/extension/resume/chinese/"
      }
    ]
  },

  head: [
    [
      "link",
      {
        rel: "icon",
        href: "/favicon.ico",
        type: "image/x-icon"
      }
    ],
    [
      "script",
      {
        src: "https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js"
      }
    ],
    [
      "script",
      {
        src:
          "https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js"
      }
    ],
    [
      "script",
      {
        src: "https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js"
      }
    ],
    [
      "script",
      {
        src: "https://cdn.jsdelivr.net/npm/@babel/standalone/babel.min.js"
      }
    ]
  ],

  plugins: ["demo-block"],

  // https://www.vuepress.cn/zh/config/#markdown
  markdown: {
    lineNumbers: false
    // extractHeaders: ["h1", "h2", "h3", "h4", "h5", "h6"]
  },

  evergreen: false // using old browser ?
};
