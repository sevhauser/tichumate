<template>
  <div class="games">
    <ListEmpty v-if="gamesList.length === 0"/>
    <template v-for="(entry, index) in gamesList">
      <GameListEntry
        v-if="entry.type === 'entry'"
        :game="entry.content"
        :key="index"
        @edit-game="editGame(entry.content.id)"
        @delete-game="deleteGame(entry.content.id)"
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
      {{ $t("game.new") }}
    </TFabExtended>
  </div>
</template>

<script>
import TFabExtended from '@/components/ui/TFabExtended.vue';
import GameListEntry from '@/components/ui/GameListEntry.vue';
import ListEmpty from '@/components/ui/ListEmpty.vue';
import DialogConfirm from '@/components/dialog/DialogConfirm.vue';
import EventBus from '@/EventBus';
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
    editGame(id) {
      this.$router.push(`/game/${id}/edit`);
    },
    deleteGame(gameId) {
      this.$modal.show(
        DialogConfirm,
        {
          bus: EventBus,
          identifier: 'games-delete-game',
          attributes: { gameId },
          content: this.$t('game.deleteQuery'),
        },
        { width: '280', height: 'auto' },
      );
    },
    handleDeleteGame(gameId) {
      this.$store.dispatch('games/deleteGame', gameId);
    },
    async init() {},
  },
  created() {
    EventBus.$on('games-delete-game-confirm', (msg) => {
      this.handleDeleteGame(msg.gameId);
    });
    this.init().then(() => {
      this.loaded = true;
    });
  },
  components: {
    TFabExtended,
    GameListEntry,
    DialogConfirm,
    ListEmpty,
  },
};
</script>
