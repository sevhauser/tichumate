<template>
  <TDialog :title="title" class="tdialog-select-player">
    <div class="tdialog-select-player-list">
      <div class="tdialog-select-player-option"
        v-for="playerId in players"
        :key="playerId"
        :class="{ 'selected': playerId === selected}"
        @click="playerSelected(playerId)">
        <div>{{ player(playerId).emoji }}</div><div>{{ player(playerId).name }}</div>
      </div>
    </div>
    <TButton slot="actions" @click="close">Cancel</TButton>
    <TButton slot="actions" @click="clear">Clear</TButton>
  </TDialog>
</template>

<script>
import TDialog from '@/components/dialog/TDialog.vue';
import TButton from '@/components/ui/TButton.vue';
import InputSelect from '@/components/form/InputSelect.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'DialogSelectPlayer',
  computed: {
    ...mapGetters({
      player: 'players/player',
    }),
  },
  props: {
    selected: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      default: '',
    },
    players: {
      type: Array,
      default: '',
    },
    attributes: {
      type: Object,
      default: {},
    },
    bus: {
      type: Object,
      required: true,
      default: null,
    },
    identifier: {
      type: String,
      default: 'dialog-select-player',
    },
  },
  methods: {
    playerSelected(playerId) {
      this.emit(playerId);
    },
    clear() {
      this.emit(0);
      this.close();
    },
    emit(playerId) {
      this.bus.$emit(`${this.identifier}-selected`, { result: playerId, attributes: this.attributes });
      this.close();
    },
    close() {
      this.$emit('close');
    },
  },
  components: {
    TDialog,
    TButton,
    InputSelect,
  },
};
</script>
