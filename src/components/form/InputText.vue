<template>
  <input type="text"
    @input="$emit('input', $event.target.value)"
    :value="value"
    ref="input"
    :placeholder="label"
    class="tinput-text">
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
  },
};
</script>
