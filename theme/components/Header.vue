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
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Header",
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

.Content
  flex-direction row-reverse

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
    .Audio-cover
      animation spin 6s linear infinite

.Audio-cover
  width 100%
  height @width
  background-position center center
  background-repeat no-repeat
  background-size cover
  background-color $backgroundTransparentDarkOver
  position absolute

.Audio-icon
  position relative
  color $fontColorBlack
  text-shadow -1px 1px $backgroundTransparentLight
</style>