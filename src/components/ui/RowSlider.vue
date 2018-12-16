<template>
  <div class="list-row-slider list-entry
    list-entry--no-padding list-entry--transparent" ref="container">
    <div class="list-row-slider__options">
      <div class="slide-delete"
        :class="{ 'active' : xValue == 1 }">
        <TichuIcon><IconDelete/></TichuIcon>
      </div>
      <div class="slide-edit"
        :class="{ 'active' : xValue == -1 }">
        <TichuIcon><IconEdit/></TichuIcon>
      </div>
    </div>
    <div class="list-row-slider__content list-entry__content"
      @mousedown="dragStart" @touchstart="dragStart"
      @mousemove="dragMoving" @mouseup="dragFinish"
      @touchmove="dragMoving" @touchend="dragFinish"
      ref="slide"
      :class="{ 'is-moving' : isMoving }">
      <slot/>
    </div>
  </div>
</template>

<script>
import TichuIcon from '@/components/icons/TichuIcon.vue';
import IconDelete from '@/components/icons/IconDelete.vue';
import IconEdit from '@/components/icons/IconEdit.vue';

export default {
  data: () => ({
    x: 0,
    isMoving: false,
    isPassing: false,
    xValue: 0,
  }),
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
          this.$emit('slide-delete');
        } else {
          this.$emit('slide-edit');
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
