<template>
  <div class="view game-edit" v-if="loaded">
    <AppBar
      :title="viewTitle">
      <TichuIcon slot="left" @click="cancel" class="clickable"><IconCancel/></TichuIcon>
      <TichuIcon slot="right" @click="save" class="clickable"><IconConfirm/></TichuIcon>
    </AppBar>
    <div class="game-edit-content">
      <InputWrapper
        v-for="(team, index) in game.teams"
        :key="index"
        wrapContent="rows"
        :title="`Team ${ index + 1}`">
        <InputText
          v-model="team.name"
          label="Team Name"/>
        <InputChipPlayerSelect
          label="Players"
          :allowCreate="true"
          v-model="team.playerIds"
          @create="createPlayer($event, index)"
          :lookupValues="players"/>
      </InputWrapper>
      <InputWrapper
        title="Winning Conditions">
        <InputRadio
          v-model="game.winConditions.type"
          :options="rules"
        />
        <InputNumber
          v-model="game.winConditions.value"/>
      </InputWrapper>
    </div>
  </div>
</template>

<script>
import AppBar from '@/components/ui/AppBar.vue';
import InputWrapper from '@/components/form/InputWrapper.vue';
import InputText from '@/components/form/InputText.vue';
import InputChipPlayerSelect from '@/components/form/InputChipPlayerSelect.vue';
import InputRadio from '@/components/form/InputRadio.vue';
import InputNumber from '@/components/form/InputNumber.vue';
import TichuIcon from '@/components/icons/TichuIcon.vue';
import IconCancel from '@/components/icons/IconCancel.vue';
import IconConfirm from '@/components/icons/IconConfirm.vue';
import EditPlayerDialog from '@/components/dialog/EditPlayerDialog.vue';
import EventBus from '@/EventBus';
import { Game, Team, Player } from '@/db/entity';
import { mapGetters, mapState, mapActions } from 'vuex';

export default {
  name: 'GameEdit',
  data: () => ({
    loaded: false,
    game: null,
    teams: [],
  }),
  props: {
    gameId: {
      type: Number,
      default: 0,
      required: true,
    },
    gameType: {
      type: String,
      default: 'classic',
    },
  },
  computed: {
    ...mapState({
      rules: (state) => state.rules.rules,
    }),
    ...mapGetters({
      players: 'players/players',
    }),
    viewTitle() {
      return this.gameId === 0 ? 'New Game' : 'Edit Game';
    },
  },
  methods: {
    save() {
      this.saveGame().then((gameId) => {
        this.$router.replace(`/game/${gameId}`);
      });
    },
    cancel() {
      if (this.gameId !== 0) {
        this.$router.replace(`/game/${this.game.id}`);
      } else {
        this.$router.replace('/games');
      }
    },
    createPlayer(playerName, teamId) {
      this.$modal.show(EditPlayerDialog, {
        title: 'Create Player',
        name: playerName,
        bus: EventBus,
        closeOnSave: true,
        identifier: 'gameedit-player-dialog',
        attributes: { teamId },
      }, {
        width: '280',
        height: 'auto',
      });
    },
    handleSavePlayer(event) {
      this.game.teams[event.attributes.teamId].playerIds.push(event.result);
    },
    async saveGame() {
      if  (this.gameId === 0) {
        this.game = await this.$store.dispatch('games/createGame', this.game);
      } else {
        this.game = await this.$store.dispatch('games/saveGame', this.game);
      }
      return this.game.id;
    },
    async fetchGame() {
      const game = await repos.games.get(this.gameId);
      this.game = game;
    },
    async init() {
      if (this.gameId === 0) {
        this.game = await this.$store.dispatch('games/newGame');
      } else {
        this.game = await this.$store.dispatch('games/getGame', this.gameId);
      }
    },
  },
  created() {
    EventBus.$on('gameedit-player-dialog-saved', this.handleSavePlayer);
    this.init().then(() => {
      this.loaded = true;
    });
  },
  components: {
    AppBar,
    TichuIcon,
    IconCancel,
    IconConfirm,
    InputWrapper,
    InputText,
    InputChipPlayerSelect,
    InputRadio,
    InputNumber,
    EditPlayerDialog,
  },
};
</script>
