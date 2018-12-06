<template>
  <div class="tinput-tichu">
    <div class="tinput-tichu__element"
      :class="{ 'active-red' : failState }"
      @click="emitFail()">FAIL</div>
    <div class="tinput-tichu__element"
      :class="{ 'active-green' : successState }"
      @click="$emit('t-success', 1 - success)">SUCCESS</div>
  </div>
</template>

<script>
export default {
  name: 'InputTichu',
  data: () => ({
    successState: false,
    failState: false,
  }),
  props: {
    success: {
      type: Boolean,
      default: false,
    },
    fail: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    emitFail() {
      this.failState = 1 - this.failState;
      this.$emit('t-fail', this.failState);
    },
    emitSuccess() {
      this.successState = 1 - this.successState;
      this.$emit('t-success', this.successState);
    },
  },
  watch: {
    success(newState) {
      this.successState = newState;
    },
    fail(newState) {
      this.failState = newState;
    },
  },
  created() {
    this.successState = this.success;
    this.failState = this.fail;
  },
};
</script>
