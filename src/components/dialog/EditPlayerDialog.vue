<template>
  <TDialog :title="title">
    <div class="tdialog-content-item">
      <InputText
        placeholder="Player Name"
        v-model="result.name"/>
    </div>
    <div class="tdialog-content-item">
      <InputEmoji
        v-model="result.emoji"/>
    </div>
    <TButton slot="actions" @click="cancel">Cancel</TButton>
    <TButton slot="actions" @click="save">Save</TButton>
  </TDialog>
</template>

<script>
import TDialog from '@/components/dialog/TDialog.vue';
import TButton from '@/components/ui/TButton.vue';
import InputText from '@/components/form/InputText.vue';
import InputEmoji from '@/components/form/InputEmoji.vue';
import { Player } from '@/db/entity';
import { mapGetters } from 'vuex';

export default {
  name: 'EditPlayerDialog',
  data: () => ({
    result: {
      id: 0,
      name: '',
      emoji: '',
    },
  }),
  props: {
    playerId: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    emoji: {
      type: String,
      default: '',
    },
    bus: {
      type: Object,
      default: null,
    },
    identifier: {
      type: String,
      default: 'player-dialog',
    },
    closeOnSave: {
      type: Boolean,
      default: false,
    },
    attributes: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    ...mapGetters({
      player: 'players/player',
    }),
  },
  methods: {
    save() {
      this.saveChanges().then((playerId) => {
        if (this.bus !== null) {
          this.bus.$emit(`${this.identifier}-saved`, { result: playerId, attributes: this.attributes });
        }
        if (this.closeOnSave) {
          this.close();
        }
      });
    },
    async saveChanges() {
      let playerId = this.playerId;
      if (this.playerId === 0) {
        const newPlayer = await this.$store.dispatch('players/createPlayer', this.result);
        playerId = newPlayer.id;
      } else {
        await this.$store.dispatch('players/updatePlayer', this.result);
      }
      return playerId;
    },
    cancel() {
      this.close();
    },
    close() {
      this.$emit('close');
    },
    loadPlayer() {
      if (this.playerId !== 0) {
        const player = this.player(this.playerId);
        this.result = player;
      } else {
        this.result = new Player();
        this.result.name = this.name;
        this.result.emoji = this.emoji;
      }
    },
  },
  created() {
    this.loadPlayer();
    this.bus.$on(`${this.identifier}-close`, this.close);
  },
  components: {
    TDialog,
    TButton,
    InputText,
    InputEmoji,
  },
};
</script>

<style>

</style>
