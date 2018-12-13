<template>
  <div class="games">
    <template v-for="(entry, index) in gamesList">
      <GameListEntry
        v-if="entry.type === 'entry'"
        :game="entry.content"
        :key="index"
        @click="loadGame(entry.content.id)"/>
      <div class="list-subtitle"
        v-else
        :key="index">
        {{ entry.content }}
      </div>
    </template>
    <TFabExtended
      @click="newGame"
      class="games-fab bg-green txt-black-dark">
      New Game
    </TFabExtended>
  </div>
</template>

<script>
import TFabExtended from '@/components/ui/TFabExtended.vue';
import GameListEntry from '@/components/ui/GameListEntry.vue';
import { mapGetters } from 'vuex';
import { formatDate } from '@/helpers/datetime';

export default {
  name: 'Games',
  data: () => ({
    loaded: false,
  }),
  computed: {
    ...mapGetters('games', [
        'games',
    ]),
    gamesList() {
      const result = [];
      let currentDate = 0;
      for (const game of this.games) {
        if (formatDate(game.date) !== currentDate) {
          currentDate = formatDate(game.date);
          result.push({ type: 'subheader', content: currentDate });
        }
        result.push({ type: 'entry', content: game });
      }
      return result;
    },
  },
  methods: {
    loadGame(id) {
      this.$router.push(`/game/${id}`);
    },
    newGame() {
      this.$router.push('/game/new');
    },
    async init() {},
  },
  created() {
    this.init().then(() => {
      this.loaded = true;
    });
  },
  components: {
    TFabExtended,
    GameListEntry,
  },
};
</script>
