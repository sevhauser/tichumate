<template>
  <div class="tichu-score">
    <div class="tichu-score__team">
      <span @click="$emit('clickteam')">{{teamName}}</span>
    </div>
    <div class="tichu-score__score">
      <span :class="{ 'txt-yellow' : state == 'winner' }">{{score}}</span>
    </div>
    <div class="tichu-score__players">
      <span @click="$emit('clicktlayers')">{{players}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    teamName: {
      type: String,
      default: '',
    },
    score: {
      required: true,
    },
    state: {
      type: String,
      default: '',
    },
    players: {
      type: String,
      default: '',
    },
    displayType: {
      type: String,
      default: 'default',
    },
  },
};
</script>
