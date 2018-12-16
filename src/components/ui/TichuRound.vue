<template>
  <RowSlider
    @slide-edit="$emit('round-edit')"
    @slide-delete="$emit('round-delete')">
    <div class="tichu-round"
      :class="[ `tichu-round--count${round.scores.length}`]">
      <template
        v-for="(score, scoreIndex) in round.scores">
        <div class="tichu-round-score"
          :key="scoreIndex">
          <div class="tichu-round-score__flags">
            <span
              v-for="(call, index) in score.calls"
              :key="index"
              :class="{
                'txt-green' : call.success === 1,
                'txt-red' : call.success === -1
              }">
              {{ tichuLetter(call.tichuId) }}
            </span>
          </div>
          <div class="tichu-round-score__score">
            {{ score.points }}
          </div>
          <div class="tichu-round-score__flags">
            <span v-if="score.win" class="txt-yellow">
              <template v-if="score.win === 1">W</template>
              <template v-else-if="score.win === 2">DW</template>
            </span>
          </div>
        </div>
        <div :key="-scoreIndex -1" class="tichu-round__number" v-if="scoreIndex === 0">{{ roundNumber }}</div>
      </template>
    </div>
  </RowSlider>
</template>

<script>
import RowSlider from '@/components/ui/RowSlider.vue';
import { Round } from '@/db/entity';
import { mapGetters } from 'vuex';

export default {
  props: {
    round: {
      type: Round,
      required: true,
    },
    roundNumber: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      tichu: 'tichus/tichu',
    }),
  },
  methods: {
    tichuLetter(tichuId) {
      const tichu = this.tichu(tichuId);
      if (tichu.lang !== '') {
        return this.$t(tichu.lang).charAt(0);
      } else {
        return tichu.title.charAt(0);
      }
    },
  },
  components: {
    RowSlider,
  },
};
</script>

<style>

</style>
