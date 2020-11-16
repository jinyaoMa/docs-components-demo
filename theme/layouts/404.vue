<template>
  <div class="NotFound">
    <div class="Head">404</div>
    <div class="Hint" v-html="hint"></div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
  computed: {
    hint() {
      return `Page <strong>${this.$route.path}</strong> Not Found`;
    },
  },
};
</script>

<style lang="stylus" scoped>
.NotFound
  text-align center
  padding $padding * 3

.Head
  font-size 4rem
  font-weight bold
  line-height 2
  letter-spacing 0.25em

.Hint
  font-size 1.25rem
  line-height 1
  >>> strong
    font-weight normal
    padding $gap
    display inline-block
    background-color $backgroundTransparentLight
    box-shadow 0 0 1px $backgroundTransparentDark
    user-select text
</style>