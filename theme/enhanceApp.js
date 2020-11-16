import Vuex from "vuex";
import stores from "./stores";
import mixins from "./mixins";
import "@fortawesome/fontawesome-free/css/all.css";
import "github-markdown-css";
import "@vuepress/theme-default/styles";

export default ({ Vue, options, router, siteData }) => {
  Vue.use(Vuex);
  Object.assign(options, {
    store: stores(Vuex)
  });

  Vue.mixin(mixins(Vuex));
};
