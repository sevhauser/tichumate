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
        <TichuRoundScore
          :team="round.game.teams[0]"
          :score="round.scores[0]"
        />
        <div class="game-scores__spacer">:</div>
        <TichuRoundScore
          :team="round.game.teams[1]"
          :score="round.scores[1]"
        />
      </div>
    </div>
    <div class="round-inputs">
      <InputWrapper title="Card Points">
        <InputSlider
          v-model="scoreDistribution"
          :disabled="round.scores[0].win === 2 || round.scores[1].win === 2"/>
      </InputWrapper>
      <InputWrapper
          title="Winner"
          wrapContent="col2">
          <InputWin
            :value="round.scores[0].win"
            @changed="winChanged(0, $event)"/>
          <InputWin
            :value="round.scores[1].win"
            @changed="winChanged(1, $event)"/>
        </InputWrapper>
        <InputWrapper
          v-for="tichu in tichus"
            :key="tichu.id"
            :title="tichu.lang ? $t(tichu.lang) : tichu.title"
            wrapContent="col2">
          <InputTichu/>
          <InputTichu/>
        </InputWrapper>
        <InputWrapper title="Additional Points"
          wrapContent="col2">
          <InputNumber v-model="round.scores[0].penalty"/>
          <InputNumber v-model="round.scores[1].penalty"/>
        </InputWrapper>
    </div>
  </div>
</template>

<script>
import AppBarRow from '@/components/ui/AppBarRow.vue';
import TichuRoundScore from '@/components/ui/TichuRoundScore.vue';
import InputSlider from '@/components/form/InputSlider.vue';
import InputWrapper from '@/components/form/InputWrapper.vue';
import InputTichu from '@/components/form/InputTichu.vue';
import InputWin from '@/components/form/InputWin.vue';
import InputNumber from '@/components/form/InputNumber.vue';
import TichuIcon from '@/components/icons/TichuIcon.vue';
import IconCancel from '@/components/icons/IconCancel.vue';
import IconConfirm from '@/components/icons/IconConfirm.vue';
import { mapState } from 'vuex';

export default {
  name: 'Round',
  data: () => ({
    loaded: false,
    round: null,
    scoreDistribution: 0,
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
  },
  computed: {
    viewTitle() {
      return this.roundId === 0 ? 'Add Round' : 'Edit Round';
    },
    ...mapState({
      tichus: (state) => state.tichus.tichus,
    }),
  },
  watch: {
    scoreDistribution(newVal) {
      this.setCardScores(parseInt(newVal, 10));
    },
  },
  methods: {
    cancelEdit() {
      this.$router.replace(`/game/${this.gameId}`);
    },
    winChanged(index, value) {
      this.round.setWin(index, value);
    },
    saveRound() {},
    async init() {
      this.game = await this.$store.dispatch('games/getGame', this.gameId);
      this.round = await this.$store.dispatch('rounds/newRound', this.game);
    },
    setCardScores(distribution) {
      this.round.scores[0].setCardPoints(50 - distribution);
      this.round.scores[1].setCardPoints(50 + distribution);
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
    TichuRoundScore,
    InputSlider,
    InputWrapper,
    InputTichu,
    InputWin,
    InputNumber,
  },
};
</script>
