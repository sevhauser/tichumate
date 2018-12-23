<template>
  <div class="tichu-score">
    <div class="tichu-score__team">
      <span>{{team.name }}</span>
    </div>
    <div class="tichu-score__score">
      <span :class="{ 'txt-yellow' : score.win > 0 }">{{ score.points }}</span>
    </div>
    <div class="tichu-score__players">
      <span>{{ playerNames }}</span>
    </div>
  </div>
</template>

<script>
import { Team, Score } from '@/db/entity';
import { mapGetters } from 'vuex';

export default {
  name: 'TichuRoundScore',
  props: {
    team: {
      type: Team,
      required: true,
    },
    winner: {
      type: Boolean,
      default: false,
    },
    score: {
      type: Score,
    },
    displayType: {
      type: String,
      default: 'default',
    },
  },
  computed: {
    ...mapGetters('players', [
      'player',
    ]),
    playerNames() {
      return this.team.playerIds.reduce((result, playerId) => {
        if (result.length !== 0) {
          return result + ` ${this.player(playerId).emoji}${this.player(playerId).name}`;
        }
        return `${this.player(playerId).emoji}${this.player(playerId).name}`;
      }, '');
    },
  },
};
</script>
