<template>
  <div class="Tag">
    <Title></Title>
    <div class="List container">
      <router-link
        v-for="(item, i) in items"
        :key="i"
        :to="$withBase(item.path)"
        :style="{ fontSize: 0.5 + item.pages.length / maxNumber + 'rem' }"
      >
        <span class="Item-head">{{ item.name }}</span>
        <span class="Item-tail">{{ item.pages.length }}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import Title from "../components/Title";

export default {
  name: "Tag",
  components: {
    Title,
  },
  computed: {
    items() {
      return this.$tag.list.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        } else if (a.name < b.name) {
          return -1;
        }
        return 0;
      });
    },
    maxNumber() {
      let result = 0;
      this.$tag.list.forEach((tag) => {
        if (tag.pages.length > result) {
          result = tag.pages.length;
        }
      });
      return result;
    },
  },
};
</script>

<style lang="stylus" scoped>
.List
  padding $padding * 3
  flex-wrap wrap
  user-select text

a
  text-decoration none
  color $linkColorFooter
  display inline-flex
  position relative
  margin 0 $padding $padding 0
  background-color $backgroundTransparentLight
  line-height 1.5rem
  border-radius $gap * 0.5
  box-shadow 0 0 1px $backgroundTransparentDark
  &:hover
    box-shadow 0 0 $gap 1px $backgroundTransparentDarkOver

.Item-head
  padding $gap $padding

.Item-tail
  padding $gap $padding
  border-left 1px solid $dividerColorDark
  color $linkColorSup
  font-size 0.88em
  line-height 1.5rem
  user-select none
</style>