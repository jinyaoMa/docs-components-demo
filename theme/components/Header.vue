<template>
  <div class="Header head">
    <div class="Content container">
      <div
        class="Audio"
        v-if="this.$themeConfig.music"
        :class="{ isPlayed }"
        @click="togglePlay"
      >
        <div class="Audio-cover" :style="customAudioStyle"></div>
        <div class="Audio-icon">
          <i v-if="!isPlayed" class="fas fa-music"></i>
          <i v-if="isPlayed" class="fas fa-pause"></i>
        </div>
      </div>
      <SearchBox class="Search"></SearchBox>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SearchBox from "@vuepress/plugin-search/SearchBox";

export default {
  name: "Header",
  components: {
    SearchBox,
  },
  mounted() {
    this.initAudio();
  },
  data() {
    return {
      playlist: [],
      audio: null,
      cover: "none",
      isPlayed: false,
      currentIndex: 0,
    };
  },
  computed: {
    customAudioStyle() {
      return {
        backgroundImage: `url('${this.cover}')`,
      };
    },
  },
  methods: {
    initAudio() {
      if (!this.$themeConfig.music) return;
      axios.get(this.$themeConfig.music).then((res) => {
        this.playlist = res.data;
        if (this.playlist.length > 0) {
          this.audio = new Audio();
          this.audio.volume = 1;
          this.audioSrc();
          // Events
          this.audio.onended = (e) => {
            this.audioNext();
            this.audioPlay();
          };
          this.audio.onerror = (e) => {
            if (!this.audio.paused) {
              window.setTimeout(this.audio.onended, 1000);
            }
          };
          this.audio.onplay = (e) => {
            if (!this.audio.paused) {
              this.isPlayed = true;
            }
          };
          this.audio.onpause = (e) => {
            if (this.audio.paused) {
              this.isPlayed = false;
            }
          };
        }
      });
    },
    audioSrc() {
      this.audio.src = this.playlist[this.currentIndex].url || "";
      this.cover = this.playlist[this.currentIndex].pic || "none";
    },
    audioNext() {
      this.currentIndex += 1;
      if (this.currentIndex > this.playlist.length - 1) {
        this.currentIndex = 0;
      }
      this.audioSrc();
    },
    audioPlay() {
      if (this.audio.paused) {
        this.audio.play().catch((e) => {
          if (e.name === "NotAllowedError") {
            this.isPlayed = false;
          }
        });
      }
    },
    togglePlay() {
      if (!this.audio) return;
      if (this.audio.paused) {
        this.audio.play().catch((e) => {
          if (e.name === "NotAllowedError") {
            this.isPlayed = false;
          }
        });
      } else {
        this.audio.pause();
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
.Header
  padding $padding $padding * 2
  height $avatarSize + $padding * 2
  position sticky
  top 0
  z-index 1

.Content
  flex-direction row-reverse
  justify-content space-between

.Audio
  height $avatarSize
  width @height
  line-height @height
  font-size @height * 0.4
  text-align center
  border-radius 50%
  overflow hidden
  cursor pointer
  opacity 0.6
  position relative
  box-shadow 0 0 $gap 2px $backgroundTransparentDarkOver
  &:hover
    opacity 1
  &.isPlayed
    opacity 1
    .Audio-cover
      animation spin 6s linear infinite

.Audio-cover
  width 100%
  height @width
  background-position center center
  background-repeat no-repeat
  background-size cover
  background-color $backgroundTransparentDarkSecondary
  position absolute

.Audio-icon
  position relative
  color $fontColorBlack
  text-shadow -1px 1px $backgroundTransparentLight
  background-color $dividerColorLight

>>> .Search
  $searchWidth = $minPageWidth - $sideWidth - $padding * 4
  input
    width $avatarSize
    height $avatarSize
    padding-left s(
      'calc(%s - 0.5rem)',
      @height
    )
    padding-right 0.5rem
    border-radius $avatarSize * 0.5
    background-color $fontColorWhite
    background-position s(
      'calc(%s - 0.5rem)',
      $avatarSize * 0.5
    ) s(
      'calc(%s - 0.5rem)',
      $avatarSize * 0.5
    )
    border-width 0
    box-shadow 0 0 $gap 1px darken($borderColor, 10%)
    &:focus
      width $searchWidth * 0.5
      padding-right s(
        'calc(%s - 0.5rem)',
        $avatarSize * 0.5
      )
  .suggestions
    width $searchWidth
    top $avatarSize + $padding
    left 0
    border-width 0
    box-shadow 0 0 $gap darken($borderColor, 10%)
  a
    text-decoration none
</style>