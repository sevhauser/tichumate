<template>
  <div class="game-score-info">
    <div class="game-score-info__content"
      :style="{ transform: `translateY(-${offset * 100}%)`}">
      <div
        class="game-score-info-line"
        v-for="(info, index) in infos"
        :key="index">
        {{ info }}
      </div>
    </div>
  </div>
</template>

<script>
import { Game } from '@/db/entity';

export default {
  name: 'GameScoreInfo',
  data: () => ({
    timer: null,
    offset: 0,
  }),
  props: {
    game: {
      type: Game,
      required: true,
    },
  },
  computed: {
    infos() {
      // Pretty ugly method, I know
      // TODO: refactor to simplify and adjust to multiple teams
      const result = [];
      let teamName = '';
      let teamScore = 0;
      let difference = 0;
      let winner = 0;
      this.game.teams.forEach((el, index) => {
        if (el.win) {
          winner = index;
        }
      });
      if (winner !== 0) {
        result.push(this.$t('game.hasWon', {team: this.game.teams[winner].name}));
      }
      if (this.game.teams[0].score > this.game.teams[1].score) {
        difference = this.game.teams[0].score - this.game.teams[1].score;
        teamName = this.game.teams[0].name;
        teamScore = this.game.teams[0].score;
      } else if (this.game.teams[1].score > this.game.teams[0].score) {
        difference = this.game.teams[1].score - this.game.teams[0].score;
        teamName = this.game.teams[1].name;
        teamScore = this.game.teams[1].score;
      } else {
        teamScore = this.game.teams[0].score;
      }
      let points = 0;
      if (difference === 0) {
        result.push(this.$t('game.itsATie'));
        if (this.game.winConditions.type === 1) {
          points = this.game.winConditions.value - teamScore;
        } else {
          points = this.game.winConditions.value - difference;
        }
      } else {
        result.push(this.$tc('game.pointsAhead', difference, { team: teamName }));
        if (this.game.winConditions.type === 1) {
          points = this.game.winConditions.value - teamScore;
        } else {
          points = this.game.winConditions.value - difference;
        }
      }
      if (winner === 0) {
        result.push(this.$tc('game.pointsToWin', points));
      }
      return result;
    },
  },
  methods: {
    tick() {
      if (this.offset >= this.infos.length - 1) {
        this.offset = 0;
      } else {
        this.offset += 1;
      }
    },
    setSlideTimer() {
      if (this.timer !== null) {
        clearInterval(this.timer);
      }
      this.timer = setInterval(() => {
        this.tick();
      }, 5000);
    },
  },
  created() {
    this.setSlideTimer();
  },
};
</script>
