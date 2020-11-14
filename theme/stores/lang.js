import zhCN from "@theme/locales/zh-CN";
import enUS from "@theme/locales/en-US";

const ZH = "zh";
const EN = "en";

const isChinese = (o) => {
  if (typeof window === "undefined") return;
  return /^(zh)/i.test(
    window.navigator.browserLanguage || window.navigator.language || ZH
  );
};

export default (savedata) => {
  return {
    state: {
      lang: savedata.lang || (isChinese() ? ZH : EN)
    },
    getters: {
      lang(state) {
        return state.lang;
      },
      locale(state) {
        switch (state.lang) {
          case ZH:
            return zhCN;
          case EN:
            return enUS;
        }
        return zhCN;
      }
    },
    mutations: {
      swapLang(state) {
        switch (state.lang) {
          case ZH:
            state.lang = EN;
            savedata.__set__("lang", EN);
            break;
          case EN:
            state.lang = ZH;
            savedata.__set__("lang", ZH);
            break;
        }
      }
    },
    actions: {
      swapLang(context) {
        context.commit("swapLang");
      }
    }
  };
};
