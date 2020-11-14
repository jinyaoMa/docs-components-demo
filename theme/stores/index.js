import _storage from "../utils/storage";
import lang from "./lang";
import nightshift from "./nightshift";

const savedata = _storage.get() || {};
savedata.__set__ = (key, value) => {
  savedata[key] = value;
  _storage.set(savedata);
};

const combine = (...stores) => {
  const result = {};
  stores.forEach((store) => {
    for (const key in store) {
      if (!result[key]) {
        result[key] = {};
      }
      Object.assign(result[key], store[key]);
    }
  });
  return result;
};

export default (Vuex) => {
  return new Vuex.Store(
    combine(
      {
        state: {}
      },
      lang(savedata),
      nightshift(savedata)
    )
  ); // Add-in here
};
