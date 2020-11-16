<template>
  <div class="Catagory">
    <Title></Title>
    <div class="List">
      <ul class="Item" v-for="(item, i) in items" :key="i">
        <li v-if="!item.name.includes(',')">
          <router-link :to="$withBase(item.path)">
            {{ item.name }}
            <span class="Item-sup">{{ item.pages.length }}</span>
          </router-link>
        </li>
        <li
          v-if="item.name.includes(',')"
          :class="`Item--indent-${item.name.match(/,/g).length}`"
        >
          <router-link :to="$withBase(item.path)">
            {{ item.name.split(",")[item.name.match(/,/g).length] }}
            <span class="Item-sup">{{ item.pages.length }}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Title from "../components/Title";

export default {
  name: "Catagory",
  components: {
    Title,
  },
  computed: {
    items() {
      return this.$category.list.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        } else if (a.name < b.name) {
          return -1;
        }
        return 0;
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
.List
  padding $padding * 3
  user-select text

for i in 1 .. 6
  .Item--indent-{i}
    margin-left $padding * 2 * i
    if ((i == 1) || (i == 4))
      list-style-type circle
    if ((i == 2) || (i == 5))
      list-style-type disc
    if ((i == 3) || (i == 6))
      list-style-type square

ul
  list-style-type square
  font-size 1.25rem
  line-height 2
  padding 0 $padding

li
  padding $gap 0

a
  text-decoration none
  color $linkColorFooter
  position relative
  display inline-flex
  &:before
    content ''
    display block
    position absolute
    bottom 0
    width 100%
    border-bottom 1px solid $linkColorFooter
    opacity 0
  &:hover:before
    opacity 1

.Item-sup
  background $linkColorSup
  height 1.2rem
  width 1.2rem
  text-align center
  display inline-block
  font-size 0.88rem
  line-height 1.2rem
  color $fontColorWhite
  border-radius 0.6rem
  margin-left 0.5em
  user-select none
</style>