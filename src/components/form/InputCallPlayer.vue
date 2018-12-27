<template>
  <div
    v-if="callState !== 0"
    class="tinput-call-player"
    @click="$emit('click')">
    <div class="no-selected" v-if="value === 0">🤔</div>
    <div v-else>{{ playerEmoji }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'InputCallPlayer',
  props: {
    value: {
      type: Number,
      default: 0,
    },
    callState: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    ...mapGetters({
      player: 'players/player',
    }),
    playerEmoji() {
      return this.player(this.value).emoji;
    },
  },
};
</script>
