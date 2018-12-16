<template>
  <div id="app" v-if="loaded">
    <router-view/>
  </div>
</template>

<script>
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
    },
  },
  created() {
    this.initialize().then(() => {
      this.loaded = true;
    });
  },
};
</script>
