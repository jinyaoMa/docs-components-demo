<template>
  <div class="yui-header" :style="{ height: height }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "YuiHeader",
  componentName: "YuiHeader",
  props: {
    height: {
      type: String,
      default: "60px"
    }
  }
};
</script>

<style lang="stylus">
.yui-header
  padding 0 20px
  box-sizing border-box
  flex-shrink 0
</style>
