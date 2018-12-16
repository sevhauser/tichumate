<template>
  <div class="tinput-tichu">
    <div class="tinput-tichu__element"
      :class="{ 'active-red' : state === -1 }"
      @click="fail()">{{ $t('round.fail').toUpperCase() }}</div>
    <div class="tinput-tichu__element"
      :class="{ 'active-green' : state === 1 }"
      @click="success()">{{ $t('round.success').toUpperCase() }}</div>
  </div>
</template>

<script>
export default {
  name: 'InputTichu',
  data: () => ({
    state: 0,
  }),
  props: {
    value: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    fail() {
      if (this.state !== -1) {
        this.state = -1;
      } else {
        this.state = 0;
      }
      this.$emit('t-change', this.state);
    },
    success() {
      if (this.state !== 1) {
        this.state = 1;
      } else {
        this.state = 0;
      }
      this.$emit('t-change', this.state);
    },
  },
  watch: {
    value(newValue) {
      this.value = newValue;
    },
  },
  created() {
    this.state = this.value;
  },
};
</script>
