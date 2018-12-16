<template>
  <div class="view game-stats" v-if="loaded">
    <AppBar
      :title="$t('statistics.gameStatistics')">
      <TichuIcon slot="left" @click="back" class="clickable"><IconBack/></TichuIcon>
    </AppBar>
    <div class="game-stats-contain">
      <div class="list-subtitle game-stats-subheader">{{ $tc('score.score', 2) }}</div>
      <ScoreChart
        class="game-score-chart"
        :statistics="statistics"/>
      <div class="list-subtitle game-stats-subheader">{{ $tc('message.number', 2)}}</div>
      <div class="game-stats-number game-stats-item"
        :class="[`game-stats-numbers--count${statistics.teamScores.length}`]">
        <div class="game-stats-numbers-line game-stats-numbers-line--header">
          <div class="game-stats-numbers-line__entry"></div>
          <div class="game-stats-numbers-line__entry"
            v-for="(stat, index) in statistics.teamScores"
            :key="index">
            {{ stat.teamName }}
          </div>
        </div>
        <div class="game-stats-numbers-line game-stats-numbers-line--line"
          v-for="(entry, i) in numberLayout"
          :key="i">
          <div class="game-stats-numbers-line__entry">{{ $tc(entry.title.lang, entry.title.count) }}</div>
          <div class="game-stats-numbers-line__entry"
            v-for="(stat, index) in statistics.teamScores"
            :key="index">
            {{ stat[entry.key] }}
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
import ScoreChart from '@/components/charts/ScoreChart.vue';
import { GameStatisticsProvider } from '@/db/providers';
import { mapGetters } from 'vuex';

export default {
  name: 'GameStatistics',
  data: () => ({
    loaded: false,
    statistics: null,
    numberLayout: [
      { title: { lang: 'message.win', count: 2 }, key: 'wins'},
      { title: { lang: 'message.doubleWin', count: 2 }, key: 'doubleWins'},
      { title: { lang: 'statistics.maxWinStreak', count: 1 }, key: 'longestWinStreak'},
      { title: { lang: 'statistics.avgScore', count: 1 }, key: 'averagePoints'},
    ],
  }),
  props: {
    gameId: {
      type: Number,
      default: 0,
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
    back() {
      this.$router.replace(`/game/${this.gameId}`);
    },
    async init() {
      this.statistics = new GameStatisticsProvider(this.game);
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
    ScoreChart,
  },
};
</script>
