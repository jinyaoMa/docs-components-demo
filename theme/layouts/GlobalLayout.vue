<template>
  <yui-container class="GlobalLayout">
    <component :is="layout" />
  </yui-container>
</template>

<script>
export default {
  name: "GlobalLayout",
  components: {},
  data() {
    return {};
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
  },
};
</script>

<style lang="stylus" scoped></style>