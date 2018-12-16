<template>
  <input type="text"
    @input="$emit('input', $event.target.value)"
    :value="value"
    ref="input"
    :maxlength="maxLength"
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
    maxLength: {
      type: Number,
      default: 200,
    },
  },
};
</script>
