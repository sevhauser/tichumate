<template>
  <input type="number"
    @input="emitInput($event.target.value)"
    :value="val"
    placeholder="0"
    class="tinput-number">
</template>

<script>
export default {
  props: {
    value: {
      default: 0,
    },
  },
  computed: {
    val() {
      return this.value || '';
    },
  },
  methods: {
    emitInput(value) {
      this.$emit('input', value === '' ? 0 : parseInt(value, 10));
    },
  },
};
</script>
