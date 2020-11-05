import "../icons/dist/yui-icon.css";
import "./theme.styl";
import Container from "./container";
import Header from "./header";
import Aside from "./aside";
import Main from "./main";
import Footer from "./footer";
import Link from "./link";

const components = {
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Link
};

const install = function(Vue) {
  if (install.installed) return;
  install.installed = true;

  for (const key in components) {
    Vue.component(components[key].name, components[key]);
  }
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  ...components
};
