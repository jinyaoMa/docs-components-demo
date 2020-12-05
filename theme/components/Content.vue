<template>
  <div class="Content container container--vertical">
    <Header></Header>
    <div class="Subpage main">
      <div class="Main container container--vertical">
        <div class="Center main">
          <slot></slot>
        </div>
        <Footer></Footer>
      </div>
    </div>
    <div class="Goingto container container--vertical" :class="{ noScroll }">
      <div class="Goingto-button" @click="goingtoTop">
        <i class="fas fa-arrow-up"></i>
      </div>
      <div class="Goingto-button" @click="goingtoBottom">
        <i class="fas fa-arrow-down"></i>
      </div>
    </div>
    <div class="Scrollbar" ref="scrollbar" :class="{ noScroll }">
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
import Header from "./Header";
import Footer from "./Footer";

export default {
  name: "Content",
  components: {
    Header,
    Footer,
  },
  methods: {
    initThumb() {
      this.thumbDistance = this.$el.scrollHeight - this.$el.offsetHeight;
      this.noScroll = this.thumbDistance <= 0;
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
    goingtoTop() {
      this.$el.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    goingtoBottom() {
      this.$el.scrollTo({
        top: this.$el.scrollHeight,
        behavior: "smooth",
      });
    },
  },
  data() {
    return {
      onResize: null,
      onScroll: null,
      noScroll: true,
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
  computed: {
    currentPath() {
      return this.$route.path;
    },
  },
  watch: {
    currentPath: {
      handler() {
        if (typeof window === "undefined") return;
        const waiter = window.setInterval(() => {
          if (this.$refs.scrollbar && this.$slots.default.length) {
            this.initThumb();
            console.log(this.$route);
            window.clearInterval(waiter);
          }
        }, 600);
      },
      immediate: true,
    },
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
    if (typeof window != "undefined") {
      window.removeEventListener("resize", this.onResize);
    }
    if (typeof this.$el != "undefined") {
      this.$el && this.$el.removeEventListener("scroll", this.onScroll);
    }
    if (typeof this.$refs.thumb != "undefined") {
      this.$refs.thumb.removeEventListener("mousedown", this.onThumbMousedown);
    }
    if (typeof document != "undefined") {
      document.removeEventListener("mousemove", this.onThumbMousemove);
      document.removeEventListener("mouseup", this.onThumbMouseup);
    }
  },
};
</script>

<style lang="stylus" scoped>
.Content
  height 100vh
  background-color $backgroundTransparentLight
  overflow auto
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
  bottom $gap * 0.5
  top @bottom
  right @bottom
  z-index 1
  pointer-events none
  &.noScroll
    opacity 0 !important

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

.Center
  padding 0

.Goingto
  position fixed
  right $padding
  bottom 0
  width $avatarSize + $padding * 2
  padding $padding
  pointer-events none
  transition transform 0.6s
  &.noScroll
    transform s(
      'translateX(%s)',
      $avatarSize + $padding * 3
    ) !important

.Goingto-button
  height $avatarSize
  width @height
  background-color $backgroundTransparentLightOver
  text-align center
  font-size $avatarSize * 0.5
  line-height $avatarSize
  cursor pointer
  pointer-events auto
  &:not(:first-child)
    margin-top $padding * 0.5
  &:hover
    background-color $backgroundTransparentLight

.Subpage
  padding $padding * 2 ($padding * 4 + $avatarSize)
  padding-bottom $avatarSize + $padding * 4
  max-width $maxMainWidth
  margin 0 auto
  width 100%

.Main
  height 100%
  background-color $backgroundTransparentLightSecondary
</style>