<template>
  <div class="customize-row" @click="clicked">
    <div class="customize-row__content">
      <div>
        <span class="customize-lock" v-if="tichu.protected">🔏</span>
        <template v-if="tichu.lang !== ''">{{ $t(tichu.lang) }}</template>
        <template v-else>{{ tichu.title }}</template>
      </div>
      <div>
        {{ tichu.value }} {{ $tc('message.point', 2) }}
      </div>
    </div>
    <div class="customize-row__icon">
      <TichuIcon @click="$emit('toggle-tichu')">
        <IconVisible v-if="tichu.active"/>
        <IconInvisible style="opacity: 0.6" v-else/>
      </TichuIcon>
    </div>
  </div>
</template>

<script>
import { Tichu } from '@/db/entity';
import TichuIcon from '@/components/icons/TichuIcon.vue';
import IconVisible from '@/components/icons/IconVisible.vue';
import IconInvisible from '@/components/icons/IconInvisible.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'TichuListEntry',
  props: {
    tichu: {
      type: Tichu,
      required: true,
    },
  },
  methods: {
    clicked() {
      if (!this.tichu.protected) {
        this.$emit('edit-tichu');
      }
    },
  },
  components: {
    TichuIcon,
    IconVisible,
    IconInvisible,
  },
};
</script>

<style>

</style>
