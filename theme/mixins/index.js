import jsonp from "../utils/jsonp";

export default (Vuex) => {
  return {
    data() {
      return {
        yui$Busuanzi: {
          pv: "∞",
          uv: "∞"
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
      }
    }
  };
};
