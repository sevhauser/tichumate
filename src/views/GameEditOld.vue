<template>
  <div class="view game-edit" v-if="loaded">
    <AppBar
      :title="viewTitle">
      <TichuIcon slot="left" @click="cancel" class="clickable"><IconCancel/></TichuIcon>
      <TichuIcon slot="right" @click="save" class="clickable"><IconConfirm/></TichuIcon>
    </AppBar>
    <div class="game-edit-content">
      <InputWrapper
        v-for="(team, index) in teams"
        :key="index"
        wrapContent="rows"
        :title="`Team ${ index + 1}`">
        <InputText
          v-model="team.name"
          label="Team Name"/>
        <InputChipSelect
          label="Players"
          :allowCreate="true"
          v-model="team.players"
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
import InputChipSelect from '@/components/form/InputChipSelect.vue';
import InputRadio from '@/components/form/InputRadio.vue';
import InputNumber from '@/components/form/InputNumber.vue';
import TichuIcon from '@/components/icons/TichuIcon.vue';
import IconCancel from '@/components/icons/IconCancel.vue';
import IconConfirm from '@/components/icons/IconConfirm.vue';
import EditPlayerDialog from '@/components/dialog/EditPlayerDialog.vue';
import EventBus from '@/EventBus';
import { TichuDB, models } from '@/db';

export default {
  name: 'GameEdit',
  data: () => ({
    loaded: false,
    game: null,
    teams: [],
    rules: [],
    players: [],
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
    viewTitle() {
      return this.gameId === 0 ? this.$t('game.new') : this.$t('game.edit');
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
        attributes: { teamId },
      }, {
        width: '280',
        height: 'auto',
      });
    },
    handleSavePlayer(event) {
      const player = models.new('player', event.result);
      this.newPlayer(player).then((newPlayer) => {
        this.teams[event.attributes.teamId].players.push(newPlayer);
        EventBus.$emit('player-dialog-close');
      });
    },
    async newPlayer(player) {
      const newPlayerId = await TichuDB.players.create(player);
      const newPlayer = await TichuDB.players.get(newPlayerId);
      this.players.push(newPlayer);
      return newPlayerId;
    },
    async saveGame() {
      if (this.gameId === 0) {
        const newGameId = await TichuDB.games.newGame(this.game, this.teams);
        return newGameId;
      }
      await TichuDB.games.updateGame(this.game, this.teams);
      return this.game.id;
    },
    async fetchPlayers() {
      this.players = await TichuDB.players.getAll();
    },
    async fetchRules() {
      this.rules = await TichuDB.rules.getAll();
    },
    async fetchGame() {
      const game = await TichuDB.games.get(this.gameId);
      this.game = game;
      for (let i = 0; i < game.teams.length; i += 1) {
        await this.fetchTeam(game.teams[i]);
      }
    },
    async fetchTeam(teamId) {
      const team = await TichuDB.teams.get(teamId);
      this.teams.push(team);
    },
    async init() {
      await this.fetchPlayers();
      await this.fetchRules();
      if (this.gameId === 0) {
        this.game = models.new('game', { type: this.gameType });
        this.teams.push(models.new('team'));
        this.teams.push(models.new('team'));
      } else {
        await this.fetchGame();
      }
    },
  },
  created() {
    EventBus.$on('player-dialog-saved', this.handleSavePlayer);
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
    InputChipSelect,
    InputRadio,
    InputNumber,
    EditPlayerDialog,
  },
};
</script>
