<template>
  <div class="view settings">
    <AppBar
      :title="$tc('settings.settings', 2)">
      <TichuIcon
        class="clickable"
        @click="back"
        slot="left"
      ><IconBack/></TichuIcon>
    </AppBar>
    <div class="settings-content">
      <div class="list-subtitle">{{ $tc('message.option', 2).toUpperCase() }}</div>
      <div class="settings-entry">
        <div class="settings-option">
          <div class="settings-option__icon">
          </div>
          <div class="settings-option__content">
            <div class="settings-option__content-title">{{ $tc('languages.language', 1) }}</div>
            <div class="settings-option__content-text" @click="changeLanguage">{{ $t(`languages.${setting(settingKeys.LANG).value}`) }}</div>
          </div>
        </div>
      </div>
      <div class="list-subtitle">{{ $tc('settings.about', 2).toUpperCase() }}</div>
      <div class="settings-entry settings-entry--text" v-html="$t('settings.aboutText')"></div>
      <div class="list-subtitle">{{ $tc('settings.openSource', 2).toUpperCase() }}</div>
      <div class="settings-entry settings-entry--text" v-html="$t('settings.openSourceText')"></div>
    </div>
  </div>
</template>

<script>
import TichuIcon from '@/components/icons/TichuIcon.vue';
import IconBack from '@/components/icons/IconBack.vue';
import IconEdit from '@/components/icons/IconEdit.vue';
import AppBar from '@/components/ui/AppBar.vue';
import DialogSelect from '@/components/dialog/DialogSelect.vue';
import EventBus from '@/EventBus';
import { mapState, mapGetters } from 'vuex';
import { SettingKey } from '@/db/entity/setting';

export default {
  name: 'Settings',
  data: () => ({
    settingKeys: SettingKey,
  }),
  computed: {
    ...mapState({
      languages: (state) => state.settings.languages,
    }),
    ...mapGetters({
      setting: 'settings/setting',
    }),
    languageSelect() {
      const result = [];
      this.languages.forEach((val) => {
        result.push({
          name: this.$t(val.lang),
          value: val.value,
        });
      });
      return result;
    },
  },
  methods: {
    back() {
      this.$router.back();
    },
    changeLanguage() {
      this.$modal.show(DialogSelect, {
        title: this.$t('settings.changeLanguage'),
        options: this.languageSelect,
        value: this.setting(SettingKey.LANG).value,
        bus: EventBus,
        closeOnSave: true,
        identifier: 'settings-language-dialog',
      }, {
        width: '280',
        height: 'auto',
      });
    },
  },
  created() {
    EventBus.$on('settings-language-dialog-save', (msg) => {
      this.$store.dispatch('settings/changeLanguage', msg);
    });
  },
  components: {
    AppBar,
    TichuIcon,
    IconBack,
    IconEdit,
    DialogSelect,
  },
};
</script>
