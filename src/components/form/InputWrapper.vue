<template>
  <div class="tinput tinput-custom">

    <div class="tinput-top" v-if="slotsUsed">
      <div class="tinput-top__left">
        <slot name="left"/>
      </div>
      <div class="tinput__title">{{ title }}</div>
      <div class="tinput-top__right">
        <slot name="right"/>
      </div>
    </div>
    <div v-else class="tinput__title">{{ title }}</div>
    <div class="tinput__content"
      :class="contentClass">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    slotsUsed: {
      type: Boolean,
      default: false,
    },
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
