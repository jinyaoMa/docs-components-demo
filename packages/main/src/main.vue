<template>
  <div class="yui-main">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "YuiMain",
  componentName: "YuiMain"
};
</script>

<style lang="stylus">
.yui-main
  flex 1
  flex-basis auto
  padding 20px
  box-sizing border-box
  overflow auto
</style>
