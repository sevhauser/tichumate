<template>
  <div class="tinput-chip tinput-chip--input bg-yellow"
    :class="{ 'tinput-chip--emoji' : emoji !== '' }">
    <span class="tinput-chip__emoji" v-if="emoji !== ''">
      {{ emoji }}
    </span>
    <span class="tinput-chip__title">{{title}}</span>
    <TichuIcon
      class="tinput-chip__icon"
      :width="18"
      :height="18"
      iconColor="#212126"
      @click="$emit('remove')"><IconCancelCircle/>
    </TichuIcon>
  </div>
</template>

<script>
import TichuIcon from '@/components/icons/TichuIcon.vue';
import IconCancelCircle from '@/components/icons/IconCancelCircle.vue';

export default {
  name: 'InputChip',
  props: {
    title: {
      type: String,
      default: '',
    },
    emoji: {
      type: String,
      default: '',
    },
  },
  components: {
    TichuIcon,
    IconCancelCircle,
  },
};
</script>

<style>

</style>
