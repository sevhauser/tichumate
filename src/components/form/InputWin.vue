<template>
  <div class="tinput-win">
    <div class="tinput-win__element"
     :class="{ 'active' : value > 0 }"
     @click="win()">WIN</div>
    <div class="tinput-win__element"
     :class="{ 'active' : value == 2 }"
     @click="doubleWin()">DOUBLE</div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    win() {
      if (this.value === 2) {
        this.$emit('changed', 1);
      } else {
        this.$emit('changed', 1 - this.value);
      }
    },
    doubleWin() {
      if (this.value === 2) {
        this.$emit('changed', 1);
      } else {
        this.$emit('changed', 2);
      }
    },
  },
};
</script>
