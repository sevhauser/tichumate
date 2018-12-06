<template>
  <svg xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    :class="{ 'small' : height < 20 }"
    viewBox="0 0 24 24"
    :aria-labelledby="iconName"
    role="presentation"
    @click="$emit('click')"
  >
    <title :id="iconName" lang="en">{{iconName}} icon</title>
    <g :fill="iconColor">
      <slot />
    </g>
  </svg>
</template>

<script>
export default {
  props: {
    iconName: {
      type: String,
      default: 'box',
    },
    width: {
      type: [Number, String],
      default: 24,
    },
    height: {
      type: [Number, String],
      default: 24,
    },
    iconColor: {
      type: String,
      default: 'currentColor',
    },
  },
};
</script>


<style lang="scss" scoped>
svg {
  display: inline-block;
  vertical-align: baseline;
  margin-bottom: -2px;
  transition: background-color 100ms ease-in-out;
  border-radius: 0.25em;
  path {
    fill: inherit;
  }
  &.small {
    margin-bottom: 0;
  }
  &.clickable:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  &.light {
    g {
      opacity: 0.6;
    }
  }
}
</style>
