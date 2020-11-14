<template>
  <div class="Footer container">
    <div class="Main main">
      <div class="Copyright" v-html="$themeConfig.copyright"></div>
      <div class="Powered" v-html="powered"></div>
      <div class="Themed" v-html="themed"></div>
      <div class="Counter">
        <span :title="yui$Locale.footer.pv">
          <i class="fas fa-eye fa-fw" />
          {{ yui$Busuanzi.pv }}
        </span>
        <span :title="yui$Locale.footer.uv">
          <i class="fas fa-user-tie fa-fw" />
          {{ yui$Busuanzi.uv }}
        </span>
        <span :title="yui$Locale.footer.wd">
          <i class="fas fa-file-word fa-fw" />
        </span>
      </div>
      <div class="License" v-html="license"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  computed: {
    powered() {
      return this.yui$Locale.footer.powered.replace(
        "[:vuepress:]",
        `<a target="_blank" href="${VUEPRESS_OFFICIAL_SITE}" title="VuePress v${__VUEPRESS__.version}">VuePress</a>`
      );
    },
    themed() {
      return this.yui$Locale.footer.themed
        .replace(
          "[:theme:]",
          `<a target="_blank" href="${THEME_REPO_URL}" title="${THEME_NAME}">${THEME_SHORTNAME}</a>`
        )
        .replace(
          "[:author:]",
          `<a target="_blank" href="${THEME_AUTHOR_LINK}" title="${THEME_AUTHOR}">${THEME_AUTHOR}</a>`
        );
    },
    license() {
      return `<a target="_blank" href="${CC_LICENSE_LINK}" title="${this.yui$Locale.footer.license}"></a>`;
    },
  },
  mounted() {
    this.yui$InitBusuanzi();
  },
};
</script>

<style lang="stylus" scoped>
.Footer
  color $fontColorBlack

.Main > div
  padding 0 $padding
  &:not(:first-child):not(:last-child)
    margin $gap 0

>>> a
  text-decoration none
  color $linkColorFooter
  display inline-flex
  position relative
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

.License
  height 15px
  >>> a
    display inline-block
    height 15px
    width 80px
    background url('../statics/by-nc-sa.png')
    background-color $backgroundTransparentDarkOver
    background-size cover
    &:before
      display none

.Counter > span
  display inline-block
  margin-right 0.1em
</style>