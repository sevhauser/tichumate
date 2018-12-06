<template>
  <div class="list-entry" @click="loadGame(1)">
    <div class="list-entry__content game-entry">
      <div class="game-entry-row game-entry-row--double">
        <div class="game-entry-score">
          <div class="game-entry-score__team">Team 1</div>
          <div class="game-entry-score__score">500</div>
          <div class="game-entry-score__players">Alice, Bob</div>
        </div>
        <div class="game-entry-score">
          <div class="game-entry-score__team">Team 2</div>
          <div class="game-entry-score__score txt-yellow">500</div>
          <div class="game-entry-score__players">Clyde, Debbie</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameListEntry',
  props: {
    game: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>

</style>
