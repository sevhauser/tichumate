<template>
  <RowSlider
    @slide-edit="$emit('edit-game')"
    @slide-delete="$emit('delete-game')">
    <div class="game-entry" @click="$emit('click')">
      <div class="game-entry-row game-entry-row--count2">
        <div
          v-for="team in game.teams"
          :key="team.id"
          class="game-entry-score-team">
          {{ team.name }}
        </div>
      </div>
      <div class="game-entry-row game-entry-row--count2">
        <div
          v-for="team in game.teams"
          :key="team.id"
          class="game-entry-score-score"
          :class="{ 'txt-yellow': team.win }">
          {{ team.score }}
        </div>
      </div>
      <div class="game-entry-row game-entry-row--count2">
        <div class="game-entry-score-players"
          v-for="team in game.teams"
          :key="team.id">
            {{ playerNames(team.playerIds) }}
          </div>
      </div>
    </div>
  </RowSlider>
</template>

<script>
import { Game } from '@/db/entity';
import RowSlider from '@/components/ui/RowSlider.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'GameListEntry',
  props: {
    game: {
      type: Game,
      required: true,
    },
  },
  computed: {
    ...mapGetters('players', [
      'player',
    ]),
  },
  methods: {
    playerNames(playerIds) {
      return playerIds.reduce((result, playerId) => {
        if (result.length !== 0) {
          return result + `, ${this.player(playerId).name}`;
        }
        return this.player(playerId).name;
      }, '');
    },
  },
  components: {
    RowSlider,
  },
};
</script>

<style>

</style>
