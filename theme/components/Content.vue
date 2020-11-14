<template>
  <div class="Content container container--vertical">
    <Header></Header>
    <div class="main">
      <div class="Subpage container">
        <slot></slot>
      </div>
    </div>
    <Footer></Footer>
    <div class="Goingto container container--vertical">
      <div class="Goingto-button" @click="goingtoTop">
        <i class="fas fa-arrow-up"></i>
      </div>
      <div class="Goingto-button" @click="goingtoBottom">
        <i class="fas fa-arrow-down"></i>
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
    window.setTimeout(this.initThumb, 200);
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

.Goingto
  position fixed
  right $padding
  bottom 0
  width $avatarSize + $padding * 2
  padding $padding
  pointer-events none

.Goingto-button
  height $avatarSize
  width @height
  margin-top $padding * 0.5
  background-color $backgroundTransparentLightOver
  text-align center
  font-size $avatarSize * 0.5
  line-height $avatarSize
  cursor pointer
  pointer-events auto
  &:hover
    background-color $backgroundTransparentLight

.Subpage
  padding 0 $padding
</style>