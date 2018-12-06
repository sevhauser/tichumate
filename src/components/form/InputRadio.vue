<template>
  <div class="tinput-radio">
    <div class="tinput-radio-item"
      v-for="option in options"
      :key="option.id">
      <TichuIcon
        class="tinput-radio-item__icon"
        :iconColor="value == option.id ? '#F2C109' : 'rgba(255, 255, 255, 0.6)'">
        <IconRadioChecked v-if="value == option.id"/>
        <IconRadioUnchecked v-else/>
      </TichuIcon>
      <input
        type="radio" :name="option.id"
        v-model="input"
        :value="option.id"
        :id="option.id"
        @input="inputChanged($event.target.value)">
        <label :for="option.id">
          <template v-if="option.lang == ''">{{ option.title }}</template>
          <template v-else>{{ $t(option.lang) }}</template>
        </label>
    </div>
  </div>
</template>

<script>
import TichuIcon from '@/components/icons/TichuIcon.vue';
import IconRadioChecked from '@/components/icons/IconRadioChecked.vue';
import IconRadioUnchecked from '@/components/icons/IconRadioUnchecked.vue';

export default {
  name: 'InputRadio',
  data: () => ({
    input: '',
  }),
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    options: {
      type: Array,
      default: () => ({}),
    },
  },
  methods: {
    inputChanged(value) {
      let result = value;
      if (typeof this.value === 'number') {
        result = parseInt(value, 10);
      }
      this.$emit('input', result);
    },
  },
  watch: {
    value(newVal) {
      this.input = newVal;
    },
  },
  created() {
    this.input = this.value;
  },
  components: {
    TichuIcon,
    IconRadioChecked,
    IconRadioUnchecked,
  },
};
</script>
