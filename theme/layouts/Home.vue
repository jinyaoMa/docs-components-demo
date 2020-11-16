<template>
  <div class="Home">
    <Hitokoto></Hitokoto>
    <div class="Portal container">
      <a
        target="_blank"
        v-for="(portal, i) in $themeConfig.portals"
        :key="i"
        :href="portal.link"
        :title="portal.name"
      >
        <div
          class="Portal-icon"
          :style="{ backgroundImage: 'url(\'' + portal.icon + '\')' }"
        ></div>
        <div class="Portal-info">
          <div class="Portal-info-name">{{ portal.name }}</div>
          <div class="Portal-info-desc">{{ portal.desc }}</div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import Hitokoto from "../components/Hitokoto";

export default {
  name: "Home",
  components: {
    Hitokoto,
  },
};
</script>

<style lang="stylus" scoped>
.Portal
  flex-wrap wrap
  justify-content space-evenly
  padding $padding 0
  padding-bottom $padding * 2
  > a
    display inline-block
    position relative
    width $sideWidth - $padding
    margin-top $padding
    margin-left $padding
    margin-right $padding
    padding $padding
    background-color $backgroundTransparentLight
    height s(
      'calc(4rem + %s)',
      $padding * 2
    )
    text-decoration none
    border-radius $gap * 0.5
    box-shadow 0 0 1px $backgroundTransparentDark
    &:hover
      box-shadow 0 0 $gap 1px $backgroundTransparentDarkOver

.Portal-icon
  height 4rem
  width 4rem
  position absolute
  left $padding
  top $padding
  background-size cover
  background-color $dividerColorDark
  border-radius $gap * 0.5

.Portal-info
  margin-left s('calc(4rem + %s)', $padding)

.Portal-info-name, .Portal-info-desc
  white-space nowrap
  overflow hidden
  text-overflow ellipsis

.Portal-info-name
  color $fontColorBlack
  line-height 2.4rem
  font-size 1.25rem

.Portal-info-desc
  color $fontColorBlackHelper
  line-height 1.2rem
  font-size 0.8rem
</style>