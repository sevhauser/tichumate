<template>
  <div class="tour" v-if="tourActive">
    <div class="tour-content">
      <div class="tour-view-content">
        <FirstTimeTourContent v-if="activeView.key === tourKeys.FIRST_TIME_INFO"/>
        <GameEditTourContent v-if="activeView.key === tourKeys.GAME_EDIT"/>
        <GameTourContent v-if="activeView.key === tourKeys.GAME_VIEW"/>
        <RoundTourContent v-if="activeView.key === tourKeys.ROUND_VIEW"/>
      </div>
      <div class="tour-controls">
        <button class="tour-controls-btn" v-if="views.length > 1" @click="closeClicked()">
          {{ $t('message.close') }}
        </button>
        <button class="tour-controls-btn" @click="confirmClicked()">
          {{ $t('message.ok') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { tourManager, TourKeys } from '@/helpers/tour';
import { mapState } from 'vuex';
import FirstTimeTourContent from '@/components/tour/contents/FirstTimeTourContent.vue';
import GameEditTourContent from '@/components/tour/contents/GameEditTourContent.vue';
import GameTourContent from '@/components/tour/contents/GameTourContent.vue';
import RoundTourContent from '@/components/tour/contents/RoundTourContent.vue';

export default {
  name: 'TourLayer',
  computed: {
    ...mapState({
      views: (state) => state.tour.views,
    }),
    tourKeys() {
      return TourKeys;
    },
    activeView() {
      return this.views[0];
    },
    tourActive() {
      return this.views.length > 0;
    },
  },
  methods: {
    confirmClicked() {
      tourManager.setViewSeen(this.activeView);
      this.$store.dispatch('tour/popTourView');
    },
    closeClicked() {
      for (const view of this.views) {
        tourManager.setViewSeen(view);
      }
    },
  },
  components: {
    FirstTimeTourContent,
    GameEditTourContent,
    GameTourContent,
    RoundTourContent,
  },
};
</script>

