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
      <InputWrapper :title="$t('round.cardPoints')">
        <InputSlider
          v-model="scoreDistribution"
          :disabled="round.scores[0].win === 2 || round.scores[1].win === 2"/>
      </InputWrapper>
      <InputWrapper
          :title="$tc('message.winner', 1)"
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
          <InputTichu
            :value="round.scores[0].callState(tichu.id)"
            @t-change="callChange(0, tichu.id, $event)"/>
          <InputTichu
            :value="round.scores[1].callState(tichu.id)"
            @t-change="callChange(1, tichu.id, $event)"/>
        </InputWrapper>
        <InputWrapper
          :title="$t('round.additionalPoints')"
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
import { mapState, mapGetters } from 'vuex';

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
      return this.roundId === 0 ? this.$t('round.new') : this.$t('round.edit');
    },
    ...mapState({
      tichus: (state) => state.tichus.tichus,
    }),
    ...mapGetters({
      tichu: 'tichus/tichu',
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
    back() {
      this.$router.replace(`/game/${this.gameId}`);
    },
    winChanged(index, value) {
      this.round.setWin(index, value);
    },
    callChange(index, tichuId, value) {
      const tichu = this.tichu(tichuId);
      this.round.scores[index].callChange(tichuId, value, tichu.value);
    },
    saveRound() {
      this.save().then(() => {
        this.back();
      });
    },
    async save() {
      if (this.roundId === 0) {
        await this.$store.dispatch('games/createRound', this.round);
      } else {
        await this.$store.dispatch('games/saveRound', this.round);
      }
    },
    async init() {
      this.game = await this.$store.dispatch('games/getGame', this.gameId);
      if (this.roundId === 0) {
        this.round = await this.$store.dispatch('games/newRound', this.game);
      } else {
        this.round = await this.$store.dispatch('games/getRound', this.roundId);
      }
      this.scoreDistribution = this.round.scoreDistribution;
    },
    setCardScores(distribution) {
      this.round.scoreDistribution = distribution;
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
