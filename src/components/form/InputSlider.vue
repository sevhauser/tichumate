<template>
  <input type="range" class="tinput-slider"
    min="-75" max="75" step="5"
    :value="value"
    @input="$emit('input', $event.target.value)"
    :disabled="disabled">
</template>

<script>
export default {
  props: {
    value: {
      default: 0,
    },
    title: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
