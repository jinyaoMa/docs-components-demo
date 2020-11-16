<template>
  <div class="Article">
    <Content class="markdown-body" />
  </div>
</template>

<script>
export default {
  name: "Post",
};
</script>

<style lang="stylus" scoped>
.Article
  position relative
  padding $padding * 3
  user-select text

>>> .frame
  line-height 2
  padding 0.5rem 0.25rem 0.5rem 0.75rem
  white-space nowrap
  border-left 0.25rem solid $linkColorFooter
  span
    display inline-block
    &:first-child
      margin-right 0.25rem
      font-weight bold

>>> div[class*='language-']
  border-radius 0
  margin 0 $padding * -3
  color $fontColorWhite
  > pre
    padding-left $padding * 3
    padding-right $padding * 3
</style>