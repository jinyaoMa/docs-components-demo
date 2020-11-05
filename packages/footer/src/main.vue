<template>
  <div class="yui-footer" :style="{ height: height }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "YuiFooter",
  componentName: "YuiFooter",
  props: {
    height: {
      type: String,
      default: "60px"
    }
  }
};
</script>

<style lang="stylus">
.yui-footer
  padding 0 20px
  box-sizing border-box
  flex-shrink 0
</style>
