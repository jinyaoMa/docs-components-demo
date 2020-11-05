<template>
  <a
    class="yui-link"
    :class="customClass"
    :href="customHref"
    :style="customStyle"
  >
    <i v-if="!!icon" :class="`yui-icon yui-icon-${icon}`"></i>
    <slot v-if="type !== 'image'"></slot>
  </a>
</template>

<script>
export default {
  name: "YuiLink",
  componentName: "YuiLink",
  props: {
    type: {
      type: String,
      default: "default",
      validator(value) {
        const regex = /^(default|primary|success|warning|danger|info|image)$/;
        return regex.test(value);
      }
    },
    underline: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    href: {
      type: String
    },
    image: {
      type: String
    },
    width: {
      type: String,
      default: "60px"
    },
    height: {
      type: String,
      default: "60px"
    },
    icon: {
      type: String
    }
  },
  computed: {
    customClass() {
      const options = {};
      options[`yui-link--${this.type}`] = true;
      options["is-underline"] = this.underline;
      options["is-disabled"] = this.disabled;
      return options;
    },
    customStyle() {
      if (this.image) {
        return {
          width: this.width,
          height: this.height,
          backgroundImage: `url('${this.image}')`
        };
      }
      return {};
    },
    customHref() {
      return this.disabled ? "" : this.href;
    }
  }
};
</script>

<style lang="stylus">
.yui-link
  display inline-flex
  flex-direction row
  align-items center
  justify-content center
  vertical-align middle
  position relative
  text-decoration none
  outline none
  cursor pointer
  padding 0
  font-size var(--yui-font-size-base)
  line-height var(--yui-line-height-tight)
  font-weight 500
  box-sizing border-box
  transition color 0.3s ease-out
  &.is-disabled
    cursor not-allowed
  &.is-underline:not(.is-disabled):not(&--image)
    &:after
      content ''
      position absolute
      right 0
      bottom 0
      width 0
      height 0
      border-bottom var(--yui-border-width-solid) solid
      transition width 0.3s ease-out
    &:hover:after
      left 0
      width 100%
  &--default
    color var(--yui-color-font-primary)
    &:hover
      color var(--yui-color-brand)
    &.is-disabled
      color var(--yui-color-font-secondary)
  &--primary
    color var(--yui-color-brand)
    &:hover
      color var(--yui-color-brand-2)
    &.is-disabled
      color var(--yui-color-brand-4)
  &--success
    color var(--yui-color-success)
    &:hover
      color var(--yui-color-success-2)
    &.is-disabled
      color var(--yui-color-success-4)
  &--warning
    color var(--yui-color-warning)
    &:hover
      color var(--yui-color-warning-2)
    &.is-disabled
      color var(--yui-color-warning-4)
  &--danger
    color var(--yui-color-danger)
    &:hover
      color var(--yui-color-danger-2)
    &.is-disabled
      color var(--yui-color-danger-4)
  &--info
    color var(--yui-color-info)
    &:hover
      color var(--yui-color-info-2)
    &.is-disabled
      color var(--yui-color-info-4)
  &--image
    line-height var(--yui-line-height-none)
    background-position center center
    background-repeat no-repeat
    background-size contain

.yui-icon
  margin-right 0.1em
</style>
