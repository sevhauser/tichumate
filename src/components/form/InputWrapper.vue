<template>
  <div class="tinput tinput-custom">
    <div class="tinput__title">{{ title }}</div>
    <div class="tinput__content"
      :class="contentClass">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    wrapContent: {
      type: String,
      default: '',
    },
  },
  computed: {
    contentClass() {
      let result;
      switch (this.wrapContent) {
        case 'col2':
          result = 'tinput__content--col2';
          break;
        case 'rows':
          result = 'tinput__content--rows';
          break;
        default:
          result = '';
      }
      return result;
    },
  },
};
</script>
