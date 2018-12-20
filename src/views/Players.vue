<template>
  <div class="players">
    <template
      v-for="(entry, index) in playerList">
      <div class="list-entry"
        v-if="entry.type === 'entry'"
        :key="index"
        @click="editPlayer(entry.content.id)">
        <div class="list-entry__content">
          {{entry.content.emoji}}
          {{entry.content.name}}
        </div>
      </div>
      <div class="list-subtitle"
        :key="index"
        v-else>
        {{ entry.content }}
      </div>
    </template>
    <TFabExtended
      @click="createPlayer"
      class="players-fab bg-green txt-black-dark">
      New Player
    </TFabExtended>
  </div>
</template>

<script>
import EditPlayerDialog from '@/components/dialog/EditPlayerDialog.vue';
import TFabExtended from '@/components/ui/TFabExtended.vue';
import EventBus from '@/EventBus';
import { mapGetters } from 'vuex';
export default {
  name: 'Players',
  computed: {
    ...mapGetters('players', [
        'players',
        'player',
    ]),
    playerList() {
      const result = [];
      let currentLetter = '';
      for (const player of this.players) {
        if (player.name.length > 0 && player.name.charAt(0).toUpperCase() !== currentLetter) {
          currentLetter = player.name.charAt(0).toUpperCase();
          result.push({type: 'subheader', content: currentLetter });
        }
        result.push({ type: 'entry', content: player});
      }
      return result;
    },
  },
  methods: {
    createPlayer() {
      this.$modal.show(EditPlayerDialog, {
        title: this.$t('player.create'),
        closeOnSave: true,
        bus: EventBus,
        identifier: 'players-edit-player',
      }, {
        width: '280',
        height: 'auto',
      });
    },
    editPlayer(playerId) {
      this.$modal.show(EditPlayerDialog, {
        title: this.$t('player.edit'),
        playerId,
        closeOnSave: true,
        bus: EventBus,
        identifier: 'players-create-player',
      }, {
        width: '280',
        height: 'auto',
      });
    },
  },
  components: {
    EditPlayerDialog,
    TFabExtended,
  },
};
</script>
