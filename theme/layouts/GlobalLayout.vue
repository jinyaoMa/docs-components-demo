<template>
  <div
    class="GlobalLayout container"
    :class="{ isNight: yui$IsNight }"
    :style="customStyleBackgroundImage"
  >
    <Drawer :customStyleBackgroundImage="customStyleBackgroundImage"></Drawer>
    <Content>
      <component :is="layout" />
    </Content>
  </div>
</template>

<script>
import Drawer from "../components/Drawer";
import Content from "../components/Content";

export default {
  name: "GlobalLayout",
  components: {
    Drawer,
    Content,
  },
  computed: {
    layout() {
      if (this.$page.path) {
        const layout = this.$frontmatter.layout;
        if (
          layout &&
          (this.$vuepress.getLayoutAsyncComponent(layout) ||
            this.$vuepress.getVueComponent(layout))
        ) {
          return layout;
        }
        return "Layout";
      }
      return "NotFound";
    },
    customStyleBackgroundImage() {
      let backgroundImage = "";
      if (
        this.$themeConfig.backgrounds &&
        this.$themeConfig.backgrounds.length
      ) {
        const index = Math.floor(
          Math.random() * this.$themeConfig.backgrounds.length
        );
        backgroundImage = `url('${this.$themeConfig.backgrounds[index]}')`;
      }
      return {
        backgroundImage,
      };
    },
  },
};
</script>

<style lang="stylus" scoped>
.GlobalLayout
  height 100vh
  background-position center center
  background-attachment fixed
  background-repeat no-repeat
  background-size cover
  user-select none
  &.isNight
    filter brightness(50%)
</style>
