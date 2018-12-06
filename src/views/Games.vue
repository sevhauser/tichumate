<template>
  <div class="games">
    <div class="list-subtitle">
      29.04.1991
    </div>
    <div class="list-entry" @click="loadGame(1)">
      <div class="list-entry__content game-entry">
        <div class="game-entry-row game-entry-row--double">
          <div class="game-entry-score">
            <div class="game-entry-score__team">Team 1</div>
            <div class="game-entry-score__score">500</div>
            <div class="game-entry-score__players">Alice, Bob</div>
          </div>
          <div class="game-entry-score">
            <div class="game-entry-score__team">Team 2</div>
            <div class="game-entry-score__score txt-yellow">500</div>
            <div class="game-entry-score__players">Clyde, Debbie</div>
          </div>
        </div>
      </div>
    </div>
    <div class="list-entry">
      <div class="list-entry__content game-entry">
        <div class="game-entry-row game-entry-row--triple">
          <div class="game-entry-score">
            <div class="game-entry-score__team">Team 1</div>
            <div class="game-entry-score__score">500</div>
            <div class="game-entry-score__players">Alice, Bob</div>
          </div>
          <div class="game-entry-score">
            <div class="game-entry-score__team">Team 2</div>
            <div class="game-entry-score__score txt-yellow">500</div>
            <div class="game-entry-score__players">Clyde, Debbie</div>
          </div>
          <div class="game-entry-score">
            <div class="game-entry-score__team">Team 3</div>
            <div class="game-entry-score__score txt-yellow">500</div>
            <div class="game-entry-score__players">Clyde, Debbie</div>
          </div>
        </div>
      </div>
    </div>
    <TFabExtended
      @click="newGame"
      class="games-fab bg-green txt-black-dark">
      New Game
    </TFabExtended>
  </div>
</template>

<script>
import TFabExtended from '@/components/ui/TFabExtended.vue';
import { db } from '@/db';

export default {
  name: 'Games',
  data: () => ({
    games: [],
    loaded: false,
  }),
  methods: {
    loadGame(id) {
      this.$router.push(`/game/${id}`);
    },
    newGame() {
      this.$router.push('/game/new');
    },
    async init() {
      this.games = await db.games.toArray();
    },
  },
  created() {
    this.init().then(() => {
      this.loaded = true;
    });
  },
  components: {
    TFabExtended,
  },
};
</script>
