import Vuex from "vuex";
import stores from "./stores";
import mixins from "./mixins";
import "@fortawesome/fontawesome-free/css/all.css";

export default ({ Vue, options, router, siteData }) => {
  Vue.use(Vuex);
  Object.assign(options, {
    store: stores(Vuex)
  });

  Vue.mixin(mixins(Vuex));
};
