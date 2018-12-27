<template>
  <div class="player view" v-if="loaded">
    <AppBar
      :title="`${player.emoji} ${player.name}`">
      <TichuIcon
        class="clickable"
        @click="back"
        slot="left">
        <IconBack/>
      </TichuIcon>
    </AppBar>
    <div class="player-content">
      <div class="list-subtitle">CREATED</div>
      <div class="list-entry player-list-entry">
        {{ formatDate(player.created) }}
      </div>
      <div class="list-subtitle">GAMES</div>
      <div class="list-entry player-stats">
        <div class="player-stats-row player-stats-row--double">
          <div class="player-stats-entry">
              <div>First game</div>
              <div>{{ firstGame }}</div>
          </div>
          <div class="player-stats-entry">
            <div>Latest game</div>
            <div>{{ lastGame }}</div>
          </div>
        </div>
        <div class="player-stats-row player-stats-row--double">
          <div class="player-stats-entry">
            <div>Games played</div>
            <div>{{ statistics.playerStats.numberOfGames }}</div>
          </div>
          <div class="player-stats-entry">
            <div>Games won</div>
            <div class="txt-green">{{ statistics.playerStats.gamesWon }}</div>
          </div>
        </div>
      </div>
      <div class="list-subtitle">ROUNDS</div>
      <div class="list-entry player-stats">
        <div class="player-stats-row player-stats-row--triple">
          <div class="player-stats-entry">
            <div>Rounds won</div>
            <div class="txt-green">{{ statistics.playerStats.wins }}</div>
          </div>
          <div class="player-stats-entry">
            <div>Double wins</div>
            <div class="txt-yellow">{{ statistics.playerStats.doubleWins }}</div>
          </div>
          <div class="player-stats-entry">
            <div>Rounds lost</div>
            <div class="txt-red">{{ statistics.playerStats.roundsLost }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppBar from '@/components/ui/AppBar.vue';
import TichuIcon from '@/components/icons/TichuIcon.vue';
import IconBack from '@/components/icons/IconBack.vue';
import { formatDate } from '@/helpers/datetime';
import { mapGetters } from 'vuex';
import { PlayerStatisticsProvider } from '@/db/providers';

export default {
  name: 'Player',
  data: () => ({
    loaded: false,
    statistics: null,
  }),
  props: {
    playerId: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      getPlayer: 'players/player',
    }),
    player() {
      return this.getPlayer(this.playerId);
    },
    firstGame() {
      return this.statistics.playerStats.firstGame !== 0 ? formatDate(this.statistics.playerStats.firstGame) : '-';
    },
    lastGame() {
      return this.statistics.playerStats.lastGame !== 0 ? formatDate(this.statistics.playerStats.lastGame) : '-';
    },
  },
  methods: {
    formatDate(val) {
      return formatDate(val);
    },
    back() {
      this.$router.replace('/players');
    },
    async init() {
      this.statistics = new PlayerStatisticsProvider(this.player);
      await this.statistics.init();
    },
  },
  created() {
    this.init().then(() => {
      this.loaded = true;
    });
  },
  components: {
    AppBar,
    TichuIcon,
    IconBack,
  },
};
</script>
