<template>
  <div class="yui-container" :class="{ 'is-horizontal': isHorizontal }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "YuiContainer",
  componentName: "YuiContainer",
  props: {
    direction: {
      type: String,
      default: "vertical"
    }
  },
  computed: {
    isHorizontal() {
      if (this.direction === "vertical") {
        return false;
      }
      return true;
    }
  }
};
</script>

<style lang="stylus">
.yui-container
  display flex
  flex-direction column
  flex 1
  flex-basis auto
  box-sizing border-box
  min-width 0
  &.is-horizontal
    flex-direction row
</style>
