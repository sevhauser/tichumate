<template>
  <RowSlider
    @slide-edit="$emit('edit-player')"
    @slide-delete="$emit('delete-player')">
    <div class="player-entry"
      @click="$emit('click')">
      <div class="player-entry__content">
        <div>{{player.emoji}}</div>
        <div>{{player.name}}</div>
      </div>
    </div>
  </RowSlider>
</template>

<script>
import { Player } from '@/db/entity';
import RowSlider from '@/components/ui/RowSlider.vue';

export default {
  name: 'PlayerListEntry',
  props: {
    player: {
      type: Player,
      required: true,
    },
  },
  components: {
    RowSlider,
  },
};
</script>

<style>

</style>
