<template>
  <div class="view round"
    v-if="loaded">
    <div class="round-app-bar">
      <AppBarRow :title="viewTitle">
        <TichuIcon slot="left" @click="cancelEdit" iconColor="#FFFFFF">
          <IconCancel/>
        </TichuIcon>
        <TichuIcon slot="right" @click="saveRound" iconColor="#FFFFFF">
          <IconConfirm/>
        </TichuIcon>
      </AppBarRow>
      <div class="round-scores round-scores--double">
        <TichuScore
          :state="win1 > 0 ? 'winner' : ''"
          :teamName="team1.name"
          :score="team1Score"
          :players="playerNames(team1players)"
        />
        <div class="game-scores__spacer">:</div>
        <TichuScore
          :state="win2 > 0 ? 'winner' : ''"
          :teamName="team2.name"
          :score="team2Score"
          :players="playerNames(team2players)"
        />
      </div>
    </div>
    <div class="round-inputs">
      <InputWrapper title="Card Points">
        <InputSlider v-model="scoreDistribution"/>
      </InputWrapper>
        <InputWrapper
          title="Winner"
          wrapContent="col2">
          <InputWin v-model="win1"/>
          <InputWin v-model="win2"/>
        </InputWrapper>
        <InputWrapper
          v-for="tichu in tichus"
            :key="tichu.id"
            :title="tichu.lang ? $t(tichu.lang) : tichu.title"
            wrapContent="col2">
            <InputTichu
              :success="callState(1, 1, tichu.id)"
              :fail="callState(-1, 1, tichu.id)"
              @t-success="callToggle(1, 1, tichu.id)"
              @t-fail="callToggle(-1, 1, tichu.id)"
              />
            <InputTichu
              :success="callState(1, 1, tichu.id)"
              :fail="callState(-1, 1, tichu.id)"
              @t-success="callToggle(1, 2, tichu.id)"
              @t-fail="callToggle(-1, 2, tichu.id)"
              />
        </InputWrapper>
        <InputWrapper title="Additional Points"
          wrapContent="col2">
          <InputNumber v-model="penalty1"/>
          <InputNumber v-model="penalty2"/>
        </InputWrapper>
    </div>
  </div>
</template>

<script>
import AppBarRow from '@/components/ui/AppBarRow.vue';
import TichuScore from '@/components/ui/TichuScore.vue';
import InputSlider from '@/components/form/InputSlider.vue';
import InputWrapper from '@/components/form/InputWrapper.vue';
import InputTichu from '@/components/form/InputTichu.vue';
import InputWin from '@/components/form/InputWin.vue';
import InputNumber from '@/components/form/InputNumber.vue';
import TichuIcon from '@/components/icons/TichuIcon.vue';
import IconCancel from '@/components/icons/IconCancel.vue';
import IconConfirm from '@/components/icons/IconConfirm.vue';
import { TichuDB, models } from '@/db';

export default {
  name: 'Round',
  data: () => ({
    loaded: false,
    game: null,
    round: null,
    rules: null,
    tichus: null,
    score1: null,
    score2: null,
    scoreDistribution: 0,
    calls1: [],
    callsRep1: [],
    calls2: [],
    callsRep2: [],
    team1: null,
    team1players: [],
    team2: null,
    team2players: [],
    win1: 0,
    win2: 0,
    penalty1: 0,
    penalty2: 0,
  }),
  props: {
    roundId: {
      type: Number,
      default: 0,
      required: true,
    },
    gameId: {
      type: Number,
      default: 0,
      required: true,
    },
    teamIds: {
      type: Array,
      default: null,
    },
  },
  computed: {
    viewTitle() {
      return this.roundId === 0 ? 'Add Round' : 'Edit Round';
    },
    team1Score() {
      return this.teamScore(1);
    },
    team2Score() {
      return this.teamScore(2);
    },
  },
  methods: {
    cancelEdit() {
      this.$router.replace(`/game/${this.gameId}`);
    },
    teamScore(teamNumber) {
      let score = 0;
      if (teamNumber === 1) {
        score = 50 - parseInt(this.scoreDistribution, 10);
      } else {
        score = 50 + parseInt(this.scoreDistribution, 10);
      }
      if (this[`win${teamNumber}`] === 2) {
        score = 200;
      } else if (this[`win${teamNumber}`] === -1) {
        score = 0;
      }
      return score;
    },
    saveRound() {},
    callToggle(state, teamId, tichuId) {
      const index = this[`calls${teamId}`].findIndex((el) => (el.tichuId === tichuId && el.success === state));
      if (index >= 0) {
        this[`calls${teamId}`].splice(index, 1);
      } else {
        this[`calls${teamId}`].push(models.new('call', {
          tichuId,
          success: state,
        }));
      }
    },
    callState(state, teamId, tichuId) {
      const index = this[`calls${teamId}`].findIndex((el) => (el.tichuId === tichuId && el.success === state));
      return index >= 0;
    },
    playerNames(players) {
      const playerNames = players.reduce((res, player) => {
        res.push(player.name);
        return res;
      }, []);
      return playerNames.join(', ');
    },
    async fetchGame() {
      const game = await TichuDB.games.get(this.gameId);
      this.game = game;
    },
    async fetchRules() {
      const rules = await TichuDB.rules.getAll();
      this.rules = rules;
    },
    async fetchTichus() {
      const tichus = await TichuDB.tichus.getAll();
      this.tichus = tichus;
    },
    async fetchTeams() {
      if (this.teamIds.length === 2) {
        this.team1 = await TichuDB.teams.get(this.teamIds[0]);
        this.team2 = await TichuDB.teams.get(this.teamIds[1]);
      }
    },
    async fetchPlayers() {
      for (const playerId of this.team1.players) {
        const player = await TichuDB.players.get(playerId);
        this.team1players.push(player);
      }
      for (const playerId of this.team2.players) {
        const player = await TichuDB.players.get(playerId);
        this.team2players.push(player);
      }
    },
    async fetchRound() {
      if (this.roundId === 0) {
        this.round = models.new('round');
        this.round.teams = this.teamIds || [];
      } else {
        const round = await TichuDB.rounds.get(this.roundId);
        this.round = round;
      }
    },
    setup() {
      for (const tichu of this.tichus) {
        this.calls1.push(models.new('call', {
          tichuId: tichu.id,
          wager: tichu.value,
        }));
        this.calls2.push(models.new('call', {
          tichuId: tichu.id,
          wager: tichu.value,
        }));
      }
    },
    async init() {
      await this.fetchGame();
      await this.fetchRound();
      await this.fetchRules();
      await this.fetchTeams();
      await this.fetchPlayers();
      await this.fetchTichus();
      this.setup();
    },
  },
  watch: {
    win1(newVal) {
      if (newVal > 0) {
        this.win2 = newVal === 2 ? -1 : 0;
      }
    },
    win2(newVal) {
      if (newVal > 0) {
        this.win1 = newVal === 2 ? -1 : 0;
      }
    },
  },
  created() {
    this.init().then(() => {
      this.loaded = true;
    });
  },
  components: {
    AppBarRow,
    TichuIcon,
    IconConfirm,
    IconCancel,
    TichuScore,
    InputSlider,
    InputWrapper,
    InputTichu,
    InputWin,
    InputNumber,
  },
};
</script>
