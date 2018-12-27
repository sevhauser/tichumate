<template>
  <div class="customize">
    <div class="list-subtitle">{{ $tc('tichu.tichu', 2).toUpperCase() }}</div>
    <TichuListEntry
      v-for="tichu in tichus"
      :key="tichu.id"
      :tichu="tichu"
      @edit-tichu="editTichu(tichu.id)"
      @toggle-tichu="toggleTichuActive(tichu.id)"/>
    <TFabExtended
      @click="newTichu"
      class="customize-fab bg-green txt-black-dark">
      {{ $t("tichu.new") }}
    </TFabExtended>
  </div>
</template>

<script>
import TFabExtended from '@/components/ui/TFabExtended.vue';
import TichuListEntry from '@/components/ui/TichuListEntry.vue';
import EditTichuDialog from '@/components/dialog/EditTichuDialog.vue';
import DialogConfirm from '@/components/dialog/DialogConfirm.vue';
import { mapState } from 'vuex';
import EventBus from '@/EventBus';

export default {
  name: 'Customize',
  computed: {
    ...mapState({
      tichus: (state) => state.tichus.tichus,
    }),
  },
  methods: {
    toggleTichuActive(id) {
      this.$store.dispatch('tichus/toggleTichuActive', id);
    },
    newTichu() {
      this.$modal.show(EditTichuDialog, {
        title: this.$t('tichu.create'),
        closeOnSave: true,
        bus: EventBus,
        identifier: 'tichus-create-tichu',
      }, {
        width: '280',
        height: 'auto',
      });
    },
    editTichu(tichuId) {
      this.$modal.show(EditTichuDialog, {
        title: this.$t('tichu.edit'),
        tichuId,
        closeOnSave: true,
        bus: EventBus,
        identifier: 'tichus-edit-tichu',
      }, {
        width: '280',
        height: 'auto',
      });
    },
  },
  created() {
    EventBus.$on('tichus-delete-tichu-confirm', (msg) => {
      this.$store.dispatch('tichus/deleteTichu', msg.tichuId);
    });
  },
  components: {
    TFabExtended,
    TichuListEntry,
    DialogConfirm,
    EditTichuDialog,
  },
};
</script>
