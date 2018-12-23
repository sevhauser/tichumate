<template>
  <div id="app" v-if="loaded">
    <router-view/>
    <TourLayer/>
  </div>
</template>

<script>
import TourLayer from '@/components/tour/TourLayer.vue';
import { tourManager } from '@/helpers/tour';
import { mapGetters } from 'vuex';
import { SettingKey } from '@/db/entity/setting';

export default {
  name: 'TichuMate',
  data: () => ({
    loaded: false,
  }),
  computed: {
    ...mapGetters({
      setting: 'settings/setting',
    }),
  },
  methods: {
    async initialize() {
      await this.$store.dispatch('initialize');
      this.$i18n.locale = this.setting(SettingKey.LANG).value;
      this.versionCheck();
    },
    versionCheck() {
      // If not set, first time launch. Set it to zero
      if (localStorage.getItem('tichumate-version') === null) {
        localStorage.setItem('tichumate-version', '0');
      }
      const appVersion = localStorage.getItem('tichumate-version');
      if (appVersion !== process.env.VUE_APP_VERSION) {
        localStorage.setItem('tichumate-version', process.env.VUE_APP_VERSION);
        // Version change. Switch to base Url
        const current = this.$router.currentRoute.path;
        if (current !== '/games' && current !== '/') {
          this.$router.replace('/games');
        }
      }
    },
  },
  created() {
    this.initialize().then(() => {
      this.loaded = true;
    });
  },
  components: {
    TourLayer,
  },
};
</script>
