<template>
  <div class="tichu-score">
    <div class="tichu-score__team">
      <span>{{team.name }}</span>
    </div>
    <div class="tichu-score__score">
      <span :class="{ 'txt-yellow' : team.win }">
        {{ team.score }}
      </span>
    </div>
    <div class="tichu-score__players">
      <span>{{ playerNames }}</span>
    </div>
  </div>
</template>

<script>
import { Team } from '@/db/entity';
import { mapGetters } from 'vuex';

export default {
  props: {
    team: {
      type: Team,
      required: true,
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
          return result + `, ${this.player(playerId).name}`;
        }
        return this.player(playerId).name;
      }, '');
    },
  },
};
</script>
