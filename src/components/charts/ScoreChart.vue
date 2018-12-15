<template>
  <div class="score-chart" v-if="loaded">
    <LineChart
      v-if="activeChart === 'total'"
      class="score-line-chart"
      :chartData="scoreData.chartData"
      :options="scoreData.options"/>
    <BarChart
      v-else-if="activeChart === 'round'"
      class="score-bar-chart"
      :chartData="roundData.chartData"
      :options="roundData.options"/>
      <div class="score-chart-controls">
        <div class="tinput-chip"
          :class="{active: activeChart === 'total'}"
          @click="activeChart = 'total'">
          <span class="tinput-chip__title">Total</span>
        </div>
        <div class="tinput-chip"
          :class="{active: activeChart === 'round'}"
          @click="activeChart = 'round'">
          <span class="tinput-chip__title">Per Round</span>
        </div>
      </div>
  </div>
</template>

<script>
import LineChart from './LineChart.vue';
import BarChart from './BarChart.vue';
import { GameStatisticsProvider } from '@/db/providers';

export default {
  name: 'ScoreChart',
  data: () => ({
    loaded: false,
    activeChart: 'total',
    scoreData: {
      chartData: {
        labels: [
          'Start',
        ],
        datasets: [],
      },
      options: {
        responsive: true,
        layout: {
          padding: {
            right: 5,
          },
        },
        elements: {
          line: {
            tension: 0,
          },
        },
        scales: {
          yAxes: [{
            ticks: {
              fontFamily: 'Roboto Condensed',
              fontSize: 14,
              padding: 10,
            },
            gridLines: {
              drawBorder: false,
              zeroLineColor: 'rgba(255, 255, 255, 0.2)',
              color: 'rgba(255, 255, 255, 0.2)',
            },
          }],
          xAxes: [{
            ticks: {
              display: false,
            },
            gridLines: {
              drawBorder: false,
              color: 'rgba(255, 255, 255, 0)',
            },
          }],
        },
      },
    },
    roundData: {
      chartData: {
        labels: [],
        datasets: [],
      },
      options: {
        responsive: true,
        scales: {
          yAxes: [{
            ticks: {
              fontFamily: 'Roboto Condensed',
              fontSize: 14,
              padding: 10,
            },
            gridLines: {
              drawBorder: false,
              zeroLineColor: 'rgba(255, 255, 255, 0.2)',
              color: 'rgba(255, 255, 255, 0.2)',
            },
          }],
          xAxes: [{
            ticks: {
              display: false,
            },
            gridLines: {
              drawBorder: false,
              color: 'rgba(255, 255, 255, 0)',
            },
          }],
        },
      },
    },
    colors: [
      '#D67160',
      '#D57390',
      '#B187B9',
      '#709DC8',
      '#27ADB5',
      '#3EB389',
      '#7EB25A',
      '#BBA840',
    ],
  }),
  props: {
    statistics: {
      type: GameStatisticsProvider,
      required: true,
    },
  },
  methods: {
    loadData() {
      // Set up labels
      this.statistics.rounds.forEach((round, index) => {
        this.scoreData.chartData.labels.push(index + 1);
        this.roundData.chartData.labels.push(index + 1);
      });
      // Generate datasets
      let teamIndex = 0;
      for (const stats of this.statistics.teamScores) {
        const totalPointsData = {
          label: stats.teamName,
          backgroundColor: 'rgba(0,0,0,0)',
          borderColor: this.colors[teamIndex],
          pointBackgroundColor: this.colors[teamIndex],
          pointStyle: 'rectRot',
          pointRadius: 4,
          data: [
            0,
          ],
        };

        const pointsPerRoundData = {
          label: stats.teamName,
          backgroundColor: this.colors[teamIndex],
          borderColor: this.colors[teamIndex],
          data: [],
        };

        for (const roundStats of stats.rounds) {
          totalPointsData.data.push(roundStats.totalPoints);
          pointsPerRoundData.data.push(roundStats.points);
        }
        this.scoreData.chartData.datasets.push(totalPointsData);
        this.roundData.chartData.datasets.push(pointsPerRoundData);
        teamIndex += 1;
      }
    },
  },
  created() {
    this.loadData();
    this.loaded = true;
  },
  components: {
    LineChart,
    BarChart,
  },
};
</script>
