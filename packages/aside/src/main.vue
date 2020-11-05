<template>
  <div class="yui-aside" :style="{ width: width }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "YuiAside",
  componentName: "YuiAside",
  props: {
    width: {
      type: String,
      default: "300px"
    }
  }
};
</script>

<style lang="stylus">
.yui-aside
  box-sizing border-box
  flex-shrink 0
  overflow auto
</style>
