<template>
  <div class="game view">
    <div class="game-app-bar">
     <AppBarRow>
        <TichuIcon slot="left" class="clickable" @click="goBack">
         <IconBack/>
        </TichuIcon>
        <TichuIcon slot="right" class="clickable" @click="editGame">
          <IconOptions/>
        </TichuIcon>
        <TichuIcon slot="right" class="clickable" @click="loadStatistics">
          <IconStatistics/>
        </TichuIcon>
     </AppBarRow>
     <TichuScores
      :teams="game.teams"/>
     <GameScoreInfo
      :game="game"/>
    </div>
    <div class="game-rounds" v-if="loaded">
      <TichuRound
        v-for="(round, index) in rounds"
        :key="round.id"
        :roundNumber="(index + 1)"
        :round="round"
        @round-delete="deleteRound(round.id)"
        @round-edit="editRound(round.id)"
      />
    </div>
    <TFab class="game-fab bg-green" @click="newRound">
      <TichuIcon><IconPlus/></TichuIcon>
    </TFab>
  </div>
</template>

<script>
import AppBarRow from '@/components/ui/AppBarRow.vue';
import TichuScores from '@/components/ui/TichuScores.vue';
import TichuRound from '@/components/ui/TichuRound.vue';
import TichuIcon from '@/components/icons/TichuIcon.vue';
import IconBack from '@/components/icons/IconBack.vue';
import IconOptions from '@/components/icons/IconOptions.vue';
import IconStatistics from '@/components/icons/IconStatistics.vue';
import IconPlus from '@/components/icons/IconPlus.vue';
import TFab from '@/components/ui/TFab.vue';
import GameScoreInfo from '@/components/ui/GameScoreInfo.vue';
import DialogText from '@/components/dialog/DialogText.vue';
import DialogConfirm from '@/components/dialog/DialogConfirm.vue';
import EventBus from '@/EventBus';
import { mapGetters } from 'vuex';
import { repos } from '@/db/repos';

export default {
  name: 'Game',
  data: () => ({
    loaded: false,
    rounds: [],
  }),
  props: {
    gameId: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      currentGame: 'games/game',
    }),
    game() {
      return this.currentGame(this.gameId);
    },
  },
  methods: {
    goBack() {
      this.$router.replace('/games');
    },
    editGame() {
      this.$router.push(`/game/${this.gameId}/edit`);
    },
    loadStatistics() {
      this.$router.push(`/game/${this.gameId}/statistics`);
    },
    newRound() {
      this.$router.push(`/game/${this.gameId}/round/0`);
    },
    deleteRound(roundId) {
      this.$modal.show(
        DialogConfirm,
        {
          bus: EventBus,
          identifier: 'gameedit-delete-round',
          attributes: { roundId },
          content: this.$t('round.deleteQuery'),
        },
        { width: '280', height: 'auto' },
      );
    },
    editRound(roundId) {
      this.$router.push(`/game/${this.gameId}/round/${roundId}`);
    },
    handleDeleteRound(roundId) {
      this.$store.dispatch('games/deleteRound', roundId).then(() => {
        const index = this.rounds.findIndex((el) => el.id === roundId);
        if (index >= 0) {
          this.rounds.splice(index, 1);
        }
      });
    },
    async loadRounds() {
      this.rounds = await this.$store.dispatch('games/getRounds', this.gameId);
    },
  },
  created() {
    this.loadRounds().then(() => {
      this.loaded = true;
    });
    EventBus.$on('gameedit-delete-round-confirm', (msg) => {
      this.handleDeleteRound(msg.roundId);
    });
  },
  components: {
    TichuIcon,
    IconBack,
    IconPlus,
    IconOptions,
    IconStatistics,
    AppBarRow,
    TichuScores,
    TichuRound,
    TFab,
    DialogText,
    DialogConfirm,
    GameScoreInfo,
  },
};
</script>
