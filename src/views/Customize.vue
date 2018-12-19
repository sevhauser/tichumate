<template>
  <div class="customize">
    <div class="list-subtitle">{{ $tc('tichu.tichu', 2).toUpperCase() }}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Customize',
  computed: {
    ...mapState({
      tichus: state => state.tichus.tichus,
    }),
  },
};
</script>
