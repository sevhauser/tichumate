<template>
  <div class="game-scores">
    <div class="tichu-scores tichu-scores--count2">
      <div class="tichu-scores-row tichu-scores-row--teams">
        <div class="tichu-scores-team"
          v-for="team in teams"
          :key="team.id">
          <span>{{ team.name }}</span>
        </div>
      </div>
      <div class="tichu-scores-row tichu-scores-row--scores">
        <template
          v-for="team in teams">
          <div
            :key="team.id"
            class="tichu-scores-score">
            <span :class="{ 'txt-yellow' : team.win }">
            {{ team.score }}
          </span>
          </div>
        </template>
      </div>
      <div class="tichu-scores-row tichu-scores-row--players"
        @click="cyclePlayerOffset">
        <div class="tichu-scores-players"
          v-for="team in teams"
          :key="team.id">
          <div class="tichu-scores-players__content"
            :style="{ transform: `translateY(-${playersOffset * 100}%)`}">
            <div class="tichu-scores-players-line">
              <span>{{ playerNames(team) }}</span>
            </div>
            <div class="tichu-scores-players-line">
              <span>{{ playerEmojis(team) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TichuScores',
  data: () => ({
    playersOffset: 0,
  }),
  props: {
    teams: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapGetters('players', [
      'player',
    ]),
    plns() {
      return this.team.playerIds.reduce((result, playerId) => {
        if (result.length !== 0) {
          return result + `, ${this.player(playerId).name}`;
        }
        return `${this.player(playerId).name}`;
      }, '');
    },
  },
  methods: {
    playerNames(team) {
      return team.playerIds.reduce((result, playerId) => {
        if (result.length !== 0) {
          return result + `, ${this.player(playerId).name}`;
        }
        return `${this.player(playerId).name}`;
      }, '');
    },
    playerEmojis(team) {
      return team.playerIds.reduce((result, playerId) => {
        if (result.length !== 0) {
          return result + ` ${this.player(playerId).emoji}`;
        }
        return `${this.player(playerId).emoji}`;
      }, '');
    },
    cyclePlayerOffset() {
      if (this.playersOffset >= this.teams.length - 1) {
        this.playersOffset = 0;
      } else {
        this.playersOffset += 1;
      }
    },
  },
};
</script>
