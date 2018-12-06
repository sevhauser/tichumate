<template>
  <div class="app-bar">
    <div class="app-bar__left">
      <slot name="left"></slot>
    </div>
    <div class="app-bar__title"><h2>{{ title }}</h2></div>
    <div class="app-bar__right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    title: {
      type: String,
      default: '',
    },
  },
};
</script>
