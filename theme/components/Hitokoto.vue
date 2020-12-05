<template>
  <div class="Hitokoto main">
    <div class="Before" :style="beforeStyle"></div>
    <div class="Word" v-html="yui$Hitokoto.word"></div>
    <div class="From" v-html="yui$Hitokoto.from"></div>
    <div class="After" :style="afterStyle"></div>
  </div>
</template>

<script>
import _h_l from "../statics/hitokoto.left.png";
import _h_r from "../statics/hitokoto.right.png";

export default {
  name: "Hitokoto",
  mounted() {
    this.yui$InitHitokoto();
  },
  computed: {
    beforeStyle() {
      return this.$themeConfig.hitokoto &&
        this.$themeConfig.hitokoto.img &&
        this.$themeConfig.hitokoto.img.left
        ? {
            backgroundImage: `url('${this.$withBase(
              this.$themeConfig.hitokoto.img.left
            )}')`,
          }
        : {
            backgroundImage: `url('${_h_l}')`,
          };
    },
    afterStyle() {
      return this.$themeConfig.hitokoto &&
        this.$themeConfig.hitokoto.img &&
        this.$themeConfig.hitokoto.img.right
        ? {
            backgroundImage: `url('${this.$withBase(
              this.$themeConfig.hitokoto.img.right
            )}')`,
          }
        : {
            backgroundImage: `url('${_h_r}')`,
          };
    },
  },
};
</script>

<style lang="stylus" scoped>
.Hitokoto
  position relative
  padding-bottom $hitokotoImgHeight * 0.66
  text-align center
  border-bottom $gap dashed $dividerColorDark

.Before, .After
  position absolute
  bottom 0
  height $hitokotoImgHeight * 0.66
  width $hitokotoImgWidth * 0.66
  background-size cover
  @media (max-width $smallestWidth)
    height $hitokotoImgHeight * 0.33
    width $hitokotoImgWidth * 0.33

.Before
  left $padding

.After
  right $padding

.Word
  padding 2rem
  position relative
  font-size 1.25rem
  user-select text
  &:before
    content '『'
    position absolute
    left 0.5rem
    top 1rem
  &:after
    content '』'
    position absolute
    right 0.5rem
    bottom 1rem

.From
  position absolute
  width 100%
  padding 1rem 0
  z-index 1
  left 0
  user-select text
  &:before, &:after
    content ' — '
</style>