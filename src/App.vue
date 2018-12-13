<template>
  <div id="app" v-if="loaded">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'TichuMate',
  data: () => ({
    loaded: false,
  }),
  methods: {
    async initialize() {
      await this.$store.dispatch('initialize');
    },
  },
  created() {
    this.initialize().then(() => {
      this.loaded = true;
    });
  },
};
</script>
