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
      <div class="tichu-round-score">
        <div class="tichu-round-score__flags">
          <span
            v-for="(flag, index) in scores[0].flags"
            :key="index"
            :class="{
              'txt-green' : flag.success,
              'txt-red' : flag.fail
            }">
            {{ flag.letter }}
          </span>
        </div>
        <div class="tichu-round-score__score">
          {{ scores[0].score }}
        </div>
        <div class="tichu-round-score__flags">
          <span v-if="scores[0].win" class="txt-yellow">
            {{ scores[0].winLetter }}
          </span>
        </div>
      </div>
      <div class="tichu-round__number">{{ roundNumber }}</div>
      <div class="tichu-round-score">
        <div class="tichu-round-score__flags">
          <span v-if="scores[1].win" class="txt-yellow">
            {{ scores[1].winLetter }}
          </span>
        </div>
        <div class="tichu-round-score__score">
          {{ scores[1].score }}
        </div>
        <div class="tichu-round-score__flags">
          <span
            v-for="(flag, index) in scores[1].flags"
            :key="index"
            :class="{
              'txt-green' : flag.success,
              'txt-red' : flag.fail
            }">
            {{ flag.letter }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TichuIcon from '@/components/icons/TichuIcon.vue';
import IconDelete from '@/components/icons/IconDelete.vue';
import IconEdit from '@/components/icons/IconEdit.vue';

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
    id: {
      type: Number,
      required: true,
    },
    roundNumber: {
      type: Number,
      required: true,
    },
    scores: {
      type: Array,
      required: true,
    },
  },
  methods: {
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
          this.$emit('round-delete', this.id);
        } else {
          this.$emit('round-edit', this.id);
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
