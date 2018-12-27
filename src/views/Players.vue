<template>
  <div class="players">
    <ListEmpty v-if="playerList.length === 0"/>
    <template
      v-for="(entry, index) in playerList">
      <PlayerListEntry
        v-if="entry.type === 'entry'"
        :key="index"
        :player="entry.content"
        @click="playerClicked(entry.content.id)"
        @edit-player="editPlayer(entry.content.id)"
        @delete-player="deletePlayer(entry.content.id)"/>
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
import DialogConfirm from '@/components/dialog/DialogConfirm.vue';
import PlayerListEntry from '@/components/ui/PlayerListEntry.vue';
import ListEmpty from '@/components/ui/ListEmpty.vue';
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
    deletePlayer(playerId) {
      this.$modal.show(DialogConfirm, {
        content: this.$t('player.deleteQuery'),
        closeOnSave: true,
        bus: EventBus,
        attributes: { playerId },
        identifier: 'players-delete-player',
      }, {
        width: '280',
        height: 'auto',
      });
    },
    playerClicked(playerId) {
      this.$router.push(`/player/${playerId}`);
    },
    handleDeletePlayer(playerId) {
      this.$store.dispatch('players/deletePlayer', playerId).then(() => {
        this.$store.dispatch('games/loadGames');
      });
    },
  },
  mounted() {
    EventBus.$on('players-delete-player-confirm', (msg) => {
      this.handleDeletePlayer(msg.playerId);
    });
  },
  components: {
    EditPlayerDialog,
    DialogConfirm,
    PlayerListEntry,
    TFabExtended,
    ListEmpty,
  },
};
</script>
