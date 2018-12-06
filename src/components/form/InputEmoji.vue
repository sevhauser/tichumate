<template>
  <div class="tinput-emoji"
   v-on-clickaway="focusOut">
    <div class="tinput-emoji-field"
      @click="focusIn">
      {{ value }}
    </div>
    <div class="tinput-emoji-select"
      v-show="isFocused">
      <div class="tinput-emoji-select__content">
        <div class="tinput-emoji-select-item"
          @click="$emit('input', emoji)"
          :class="{ 'active' : emoji === value }"
          v-for="(emoji, index) in list"
          :key="index">
            {{ emoji }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway';
import TichuIcon from '@/components/icons/TichuIcon.vue';
import IconFace from '@/components/icons/IconFace.vue';
import emojis from '@/assets/emojis';

export default {
  name: 'InputEmoji',
  mixins: [clickaway],
  data: () => ({
    list: emojis,
    isFocused: false,
  }),
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  methods: {
    focusIn() {
      this.isFocused = true;
    },
    focusOut() {
      this.isFocused = false;
    },
  },
  created() {
    if (this.value === '') {
      this.$emit('input', '😊');
    }
  },
  components: {
    TichuIcon,
    IconFace,
  },
};
</script>
