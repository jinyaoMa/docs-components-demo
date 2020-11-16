<template>
  <div class="Footer foot">
    <div class="Main main">
      <div class="Copyright" v-html="$themeConfig.copyright"></div>
      |
      <div class="Powered" v-html="powered"></div>
      |
      <div class="Themed" v-html="themed"></div>
      |
      <div class="Counter" :title="yui$Locale.footer.pv">
        <i class="fas fa-eye" />
        {{ yui$Busuanzi.pv }}
      </div>
      |
      <div class="Counter" :title="yui$Locale.footer.uv">
        <i class="fas fa-user-tie" />
        {{ yui$Busuanzi.uv }}
      </div>
      |
      <div class="Counter" :title="yui$Locale.footer.wd">
        <i class="fas fa-file-word" />
        {{ yui$SiteTotalWords }}
      </div>
      |
      <div class="License" v-html="license"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  computed: {
    powered() {
      let result = this.yui$Locale.footer.powered.replace(
        "[:vuepress:]",
        `<a target="_blank" href="${VUEPRESS_OFFICIAL_SITE}" title="VuePress">VuePress</a>`
      );
      if (typeof __VUEPRESS__ !== "undefined") {
        result = this.yui$Locale.footer.powered.replace(
          "[:vuepress:]",
          `<a target="_blank" href="${VUEPRESS_OFFICIAL_SITE}" title="VuePress v${
            __VUEPRESS__ ? __VUEPRESS__.version : "?"
          }">VuePress</a>`
        );
      }
      return result;
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
  text-align center
  font-size 0.88em
  border-top $gap dashed $dividerColorDark

.Main
  line-height 2
  max-width $maxMainWidth
  margin 0 auto
  > div
    display inline-block

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
  height $padding
  >>> a
    display inline-block
    height 15px
    width 80px
    background url('../statics/by-nc-sa.png')
    background-color $backgroundTransparentDarkOver
    background-size cover
    background-repeat no-repeat
    vertical-align text-top
    &:before
      display none

.Counter i
  font-size 0.88em
</style>