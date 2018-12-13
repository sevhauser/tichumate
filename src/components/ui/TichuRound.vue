<template>
  <div class="tichu-round tichu-round--double list-entry
    list-entry--no-padding list-entry--transparent" ref="container">
    <div class="tichu-round__options">
      <div class="round-delete"
        :class="{ 'active' : xValue == 1 }">
        <TichuIcon><IconDelete/></TichuIcon>
      </div>
      <div class="round-edit"
        :class="{ 'active' : xValue == -1 }">
        <TichuIcon><IconEdit/></TichuIcon>
      </div>
    </div>
    <div class="tichu-round__content"
      @mousedown="dragStart" @touchstart="dragStart"
      @mousemove="dragMoving" @mouseup="dragFinish"
      @touchmove="dragMoving" @touchend="dragFinish"
      ref="slide"
      :class="{ 'is-moving' : isMoving }">
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
  </div>
</template>

<script>
import TichuIcon from '@/components/icons/TichuIcon.vue';
import IconDelete from '@/components/icons/IconDelete.vue';
import IconEdit from '@/components/icons/IconEdit.vue';
import { Round } from '@/db/entity';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      x: 0,
      isMoving: false,
      isPassing: false,
      xValue: 0,
    };
  },
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
    dragStart(e) {
      this.isMoving = true;
      this.x = (e.pageX || e.touches[0].pageX);
    },
    dragMoving(e) {
      if (this.isMoving) {
        const deltaX = (e.pageX || e.touches[0].pageX) - this.x;
        const { slide, container } = this.$refs;
        const containerWidth = container.clientWidth;
        if (Math.abs(deltaX) <= (containerWidth / 2)) {
          this.isPassing = false;
          slide.style.left = `${deltaX}px`;
          this.xValue = 0;
        } else {
          this.isPassing = true;
          if (deltaX > 0) {
            this.xValue = 1;
          } else {
            this.xValue = -1;
          }
        }
      }
    },
    dragFinish() {
      if (this.isMoving && this.isPassing) {
        if (this.xValue > 0) {
          this.$emit('round-delete');
        } else {
          this.$emit('round-edit');
        }
        this.$refs.slide.style.left = '0';
        this.isPassing = false;
      } else if (this.isMoving && !this.isPassing) {
        this.isMoving = false;
        this.$refs.slide.style.left = '0';
      }
    },
  },
  components: {
    TichuIcon,
    IconDelete,
    IconEdit,
  },
};
</script>

<style>

</style>
