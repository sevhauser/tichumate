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
import InputChipSelect from '@/components/form/InputChipSelect.vue';
import InputRadio from '@/components/form/InputRadio.vue';
import InputNumber from '@/components/form/InputNumber.vue';
import TichuIcon from '@/components/icons/TichuIcon.vue';
import IconCancel from '@/components/icons/IconCancel.vue';
import IconConfirm from '@/components/icons/IconConfirm.vue';
import EditPlayerDialog from '@/components/dialog/EditPlayerDialog.vue';
import EventBus from '@/EventBus';
import { Game, Team, Player } from '@/db/entity';
import { repos } from '@/db/repos';
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
        attributes: { teamId },
      }, {
        width: '280',
        height: 'auto',
      });
    },
    handleSavePlayer(event) {
      const player = new Player();
      player.name = event.result.name;
      player.emoji = event.result.emoji;
      this.newPlayer(player).then((newPlayer) => {
        this.teams[event.attributes.teamId].playerIds.push(newPlayer.id);
        EventBus.$emit('player-dialog-close');
      });
    },
    async newPlayer(player) {
      const newPlayer = await repos.players.create(player);
      this.players.push(newPlayer);
      return newPlayer;
    },
    async saveGame() {
      if (this.gameId === 0) {
        for (const team of this.teams) {
          const newTeam = await repos.teams.create(team);
          this.game.teamIds.push(newTeam.id);
        }
        const game = await repos.games.create(this.game);
        return game.id;
      }
      await repos.games.update(this.game);
      for (const team of this.teams) {
        await repos.teams.update(team);
      }
      return this.game.id;
    },
    async fetchPlayers() {
      this.players = await repos.players.getAll();
    },
    async fetchRules() {
      this.rules = await repos.rules.getAll();
    },
    async fetchGame() {
      const game = await repos.games.get(this.gameId);
      this.game = game;
      for (const team of game.teamIds) {
        await this.fetchTeam(team);
      }
    },
    async fetchTeam(teamId) {
      const team = await repos.teams.get(teamId);
      this.teams.push(team);
    },
    async init() {
      await this.fetchPlayers();
      await this.fetchRules();
      if (this.gameId === 0) {
        this.game = new Game();
        this.teams.push(new Team());
        this.teams.push(new Team());
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
