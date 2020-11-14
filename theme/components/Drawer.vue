<template>
  <div class="Drawer aside">
    <div class="Drawer-content container container--vertical">
      <div class="Brand" :style="customStyleBackgroundImage">
        <div class="container">
          <div class="Brand-avatar" :style="customAvatarStyle"></div>
          <div
            class="Brand-author"
            v-html="$themeConfig.author[yui$Lang]"
          ></div>
        </div>
      </div>
      <div
        class="Menu"
        v-for="(menu, i) in $themeConfig.menus"
        :key="i"
        :style="{ height: '200vh' }"
      >
        <div v-if="menu.items && !menu.link" class="Submenu">
          <div class="Submenu-caption">
            <span class="Menu-item-icon" v-html="menu.icon"></span>
            <span v-html="menu.text[yui$Lang]"></span>
          </div>
          <div class="Submenu-list">
            <router-link
              class="Menu-item"
              v-for="(item, j) in menu.items"
              :key="j"
              :to="item.link"
              v-html="item.text[yui$Lang]"
            ></router-link>
          </div>
        </div>
        <router-link v-if="!menu.items" class="Menu-item" :to="menu.link">
          <span class="Menu-item-icon" v-html="menu.icon"></span>
          <span v-html="menu.text[yui$Lang]"></span>
        </router-link>
      </div>
    </div>
    <div class="Drawer-switches container" :style="customStyleBackgroundImage">
      <div class="Drawer-switch" @click="yui$SwapLang">
        <span>{{ /^(zh)/i.test(yui$Lang) ? "中" : "A" }}</span>
      </div>
      <div class="Drawer-switch" @click="yui$Nightshift">
        <i v-if="yui$IsNight" class="fas fa-sun"></i>
        <i v-if="!yui$IsNight" class="fas fa-moon"></i>
      </div>
    </div>
    <div class="Scrollbar" ref="scrollbar">
      <div
        class="Scrollbar-thumb"
        :style="{
          height: thumbHeight + 'px',
          transform: `translateY(${thumbTransfrom}px)`,
        }"
        ref="thumb"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Drawer",
  props: ["customStyleBackgroundImage"],
  computed: {
    customAvatarStyle() {
      let backgroundImage = "none";
      if (typeof this.$themeConfig.avatar === "string") {
        const avatar = this.$withBase(this.$themeConfig.avatar);
        backgroundImage = `url('${avatar}')`;
      }
      return {
        backgroundImage,
      };
    },
  },
  methods: {
    initThumb() {
      this.thumbDistance = this.$el.scrollHeight - this.$el.offsetHeight;
      this.thumbHeight =
        (this.$el.offsetHeight / this.$el.scrollHeight) *
        this.$refs.scrollbar.offsetHeight;
      this.limitThumbTranslate =
        this.$refs.scrollbar.offsetHeight - this.thumbHeight;
      this.thumbTransfrom =
        (this.$el.scrollTop / this.thumbDistance) * this.limitThumbTranslate;
    },
    setThumbTransform() {
      this.thumbTransfrom =
        (this.$el.scrollTop / this.thumbDistance) * this.limitThumbTranslate;
    },
  },
  data() {
    return {
      onResize: null,
      onScroll: null,
      thumbDistance: 0,
      thumbHeight: 0,
      limitThumbTranslate: 0,
      thumbTransfrom: 0,
      thumbMouseStart: 0,
      onThumbMousedown: null,
      onThumbMousemove: null,
      onThumbMouseup: null,
    };
  },
  mounted() {
    this.initThumb();
    this.onResize = window.addEventListener("resize", this.initThumb);
    this.onScroll = this.$el.addEventListener("scroll", this.setThumbTransform);
    this.onThumbMousedown = this.$refs.thumb.addEventListener(
      "mousedown",
      (e) => {
        this.$el.removeEventListener("scroll", this.onScroll);
        this.thumbMouseStart = e.y;
        this.$refs.thumb.classList.add("Scrollbar-thumb--show");
      }
    );
    this.onThumbMousemove = document.addEventListener("mousemove", (e) => {
      if (this.thumbMouseStart > 0) {
        const offset = e.y - this.thumbMouseStart;
        this.thumbMouseStart = e.y;
        this.thumbTransfrom += offset;
        this.$el.scrollTop =
          (this.thumbTransfrom / this.limitThumbTranslate) * this.thumbDistance;
        if (this.thumbTransfrom < 0) {
          this.thumbTransfrom = 0;
        } else if (this.thumbTransfrom > this.limitThumbTranslate) {
          this.thumbTransfrom = this.limitThumbTranslate;
        }
      }
    });
    this.onThumbMouseup = document.addEventListener("mouseup", (e) => {
      this.thumbMouseStart = 0;
      this.$refs.thumb.classList.remove("Scrollbar-thumb--show");
      this.onScroll = this.$el.addEventListener(
        "scroll",
        this.setThumbTransform
      );
    });
  },
  destroyed() {
    window.removeEventListener("resize", this.onResize);
    this.$el.removeEventListener("scroll", this.onScroll);
    this.$refs.thumb.removeEventListener("mousedown", this.onThumbMousedown);
    document.removeEventListener("mousemove", this.onThumbMousemove);
    document.removeEventListener("mouseup", this.onThumbMouseup);
  },
};
</script>

<style lang="stylus" scoped>
.Drawer-switches, .Brand
  background-position center center
  background-attachment fixed
  background-repeat no-repeat
  background-size cover

.Drawer
  height 100vh
  background-color $backgroundTransparentDark
  position relative
  user-select none
  // Hide scrollbar for IE, Edge and Firefox
  -ms-overflow-style none // IE and Edge
  scrollbar-width none // Firefox
  // Hide scrollbar for Chrome, Safari and Opera
  &::-webkit-scrollbar
    display none
  &:hover
    .Scrollbar-thumb
      opacity 1

.Scrollbar
  position fixed
  left $sideWidth + $gap * 0.5
  bottom $gap * 0.5
  top @bottom
  z-index 1
  pointer-events none

.Scrollbar-thumb
  width $gap * 0.75
  position relative
  border-radius $gap * 0.5
  background-color $backgroundTransparentDarkOver
  pointer-events auto
  cursor pointer
  opacity 0
  &:hover
    background-color $backgroundTransparentDark

.Scrollbar-thumb--show
  opacity 1

.Drawer-content
  min-height s(
    'calc(100% - %s)',
    $avatarSize + $padding * 2
  )

.Brand
  padding $padding
  color $fontColorWhite
  position sticky
  top 0
  z-index 1
  &:before
    content ''
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    background-color $backgroundTransparentDark

.Brand-avatar
  position relative
  height $avatarSize
  width @height
  border-radius 50%
  background-position center center
  background-repeat no-repeat
  background-size cover
  box-shadow 0 0 $gap * 0.5 1px $backgroundTransparentLight

.Brand-author
  position relative
  line-height $avatarSize
  padding 0 $padding
  font-size @line-height * 0.5
  user-select text

.Submenu-caption
  text-transform uppercase

.Submenu-caption, .Menu-item
  display block
  line-height 3
  color $fontColorWhite

.Submenu-caption, .Menu > .Menu-item
  padding-left $padding

.Menu-item-icon
  margin-right 0.75em

.Submenu-list > .Menu-item
  padding-left s('calc(1em + %s)', $padding)

.Menu-item
  text-decoration none
  position relative
  white-space nowrap
  text-overflow ellipsis
  overflow hidden
  &:after
    content ''
    position absolute
    right $padding + $gap
    top s(
      'calc(50% - %s)',
      $padding * 0.4
    )
    height $padding * 0.8
    width 0
    transition width 0.6s
    background-color $backgroundTransparentLight
  &.router-link-exact-active
    background-color $backgroundTransparentDark
    padding-right $padding * 2 + $gap * 2
    &:after
      width $padding * 0.8
  &:hover
    background-color $backgroundTransparentLightOver

.Drawer-switches
  height $avatarSize + $padding * 2
  position sticky
  bottom 0
  width 100%
  color $fontColorWhite
  padding $padding
  &:before
    content ''
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    background-color $backgroundTransparentDark

.Drawer-switch
  position relative
  height $avatarSize
  width @height
  margin-right $padding * 0.5
  background-color $backgroundTransparentDarkOver
  text-align center
  font-size $avatarSize * 0.5
  line-height $avatarSize
  cursor pointer
  &:hover
    background-color $backgroundTransparentLightOver
</style>