<template>
  <select :name="name"
    :value="value"
    @input="$emit('input', $event.target.value)"
    class="tinput-select">
    <option
      v-for="option in options"
      :key="option.value"
      :value="option.value">{{ option.name }}</option>
  </select>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      default: [],
    },
    name: {
      type: String,
      default: '',
    },
  },
};
</script>
