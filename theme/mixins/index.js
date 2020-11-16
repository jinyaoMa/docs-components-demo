import jsonp from "../utils/jsonp";
import axios from "axios";

export default (Vuex) => {
  return {
    data() {
      return {
        yui$Busuanzi: {
          pv: "∞",
          uv: "∞"
        },
        yui$Hitokoto: {
          word: "Loading...",
          from: "Loading..."
        }
      };
    },
    methods: {
      ...Vuex.mapActions({
        yui$SwapLang: "swapLang",
        yui$Nightshift: "nightshift"
      }),
      yui$InitBusuanzi() {
        jsonp(
          "//busuanzi.ibruce.info/busuanzi",
          {
            jsonpCallback:
              "BusuanziCallback_" + Math.floor(1099511627776 * Math.random())
          },
          (result) => {
            this.yui$Busuanzi.pv = result.site_pv;
            this.yui$Busuanzi.uv = result.site_uv;
          },
          true
        );
      },
      yui$InitHitokoto() {
        let that = this;
        if (
          that.$themeConfig.hitokoto.customs &&
          that.$themeConfig.hitokoto.customs.length
        ) {
          const rand = Math.floor(
            Math.random() * that.$themeConfig.hitokoto.customs.length
          );
          that.yui$Hitokoto.word = customs[rand].word;
          that.yui$Hitokoto.from = customs[rand].from;
        } else {
          axios
            .get(that.$themeConfig.hitokoto.api, {
              params: {
                c: that.$themeConfig.hitokoto.type
              }
            })
            .then((result) => {
              result = result.data;
              if (
                typeof result.hitokoto === "string" &&
                result.hitokoto.trim().length > 0
              ) {
                that.yui$Hitokoto.word = result.hitokoto.trim();
              }
              if (
                typeof result.from_who === "string" &&
                result.from_who.trim().length > 0
              ) {
                that.yui$Hitokoto.from = result.from_who.trim();
              } else if (
                typeof result.from === "string" &&
                result.from.trim().length > 0
              ) {
                that.yui$Hitokoto.from = result.from.trim();
              }
            });
        }
      }
    },
    computed: {
      ...Vuex.mapGetters({
        yui$Lang: "lang",
        yui$Locale: "locale",
        yui$IsNight: "isNight"
      }),
      yui$SiteTotalWords() {
        let result = 0;
        this.$site.pages
          .filter((p) => !!p.title)
          .forEach((page) => {
            result += page.frontmatter.wordcount;
          });
        if (result >= 1000) {
          result = Math.round(result / 100) / 10 + "k";
        }
        return result;
      },
      yui$SitePosts() {
        return this.$site.pages
          .filter((p) => p.id === "archive")
          .sort((a, b) => {
            if (a.frontmatter.date < b.frontmatter.date) {
              return 1;
            } else if (a.frontmatter.date > b.frontmatter.date) {
              return -1;
            }
            return 0;
          });
      }
    }
  };
};
