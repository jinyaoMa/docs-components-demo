<template>
  <div class="Title" :class="{ 'align-center': this.$page.id === 'archive' }">
    {{ title }}
  </div>
</template>

<script>
export default {
  name: "Title",
  computed: {
    title() {
      const index = /^(zh)/i.test(this.yui$Lang) ? 0 : 1;
      let result = this.$title.split(" | ")[index].trim();
      if (this.$currentCategory || this.$currentTag) {
        const pos = this.$title.indexOf(" ");
        const front = this.$title.substring(0, pos).trim();
        const extra = this.$title
          .substring(pos, this.$title.length)
          .split(" | ")
          [index].trim();
        result = `${extra} | ${front}`;
      } else if (this.$page.id === "archive") {
        result = this.$title.split(" | ")[0].trim();
      }
      return result;
    },
  },
};
</script>

<style lang="stylus" scoped>
.Title
  padding $padding ($padding + $gap)
  font-size 2rem
  border-bottom $gap dashed $dividerColorDark
  font-weight bold
  text-transform uppercase

.align-center
  text-align center
</style>