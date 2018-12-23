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
      const result = [];
      let teamName = '';
      let teamScore = 0;
      let difference = 0;
      if (this.game.teams[0].score > this.game.teams[1].score) {
        difference = this.game.teams[0].score - this.game.teams[1].score;
        teamName = this.game.teams[0].name;
        teamScore = this.game.teams[0].score;
      } else if (this.game.teams[1].score > this.game.teams[0].score) {
        difference = this.game.teams[1].score - this.game.teams[0].score;
        teamName = this.game.teams[1].name;
        teamScore = this.game.teams[1].score;
      }
      if (difference === 0) {
        result.push('Both teams are on par');
        if (this.game.winConditions.type === 1) {
          result.push(`${this.game.winConditions.value - teamScore} Points to win`);
        } else {
          result.push(`${this.game.winConditions.value - difference} Points to win`);
        }
      } else {
        result.push(`${teamName} is ${difference} points ahead`);
        if (this.game.winConditions.type === 1) {
          result.push(`${this.game.winConditions.value - teamScore} Points to win`);
        } else {
          result.push(`${this.game.winConditions.value - difference} Points to win`);
        }
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
