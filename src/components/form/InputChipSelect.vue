<template>
  <div class="tinput-chip-el"
    v-on-clickaway="inputFocusOut">
    <div class="tinput-chip-field">
        <InputChip
          color="yellow"
          v-for="item in chipList"
          :title="item.name"
          :key="item.id"
          :emoji="item.emoji"
          @remove="remove(item.id)"/>
          <input type="text"
            class="tinput-chip-field__input"
            :class="{ 'full-width' : value.length == 0}"
            v-model="input"
            :placeholder="inputLabel"
            ref="input"
            @focus="inputFocused = true">
    </div>
    <div class="tinput-chip-select" v-if="inputFocused">
      <div class="tinput-chip-select__content">
        <div class="tinput-chip-select-item"
          v-for="item in filteredValues"
          :key="item.id"
          @click="addSelection(item.id)">
          <span class="tinput-chip-select-item__icon">
            <template v-if="'emoji' in item">
            {{ item.emoji }}
            </template>
            <TichuIcon v-else
              width="20"
              height="20">
              <IconFace/>
            </TichuIcon>
          </span>
          <span>{{ item.name }}</span>
        </div>
        <div class="tinput-chip-select-item tinput-chip-select-item--create"
          v-show="allowCreate"
          @click="create">
          <TichuIcon class="tinput-chip-select-item__icon">
            <IconPlusCircle/>
          </TichuIcon>
          <span v-if="input != ''">{{ input }}</span>
          <span v-else>Create new</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway';
import InputChip from '@/components/form/InputChip.vue';
import TichuIcon from '@/components/icons/TichuIcon.vue';
import IconFace from '@/components/icons/IconFace.vue';
import IconPlusCircle from '@/components/icons/IconPlusCircle.vue';

export default {
  name: 'InputChipSelect',
  mixins: [clickaway],
  data: () => ({
    input: '',
    inputFocused: false,
  }),
  props: {
    label: {
      type: String,
      default: '',
    },
    value: {
      type: Array,
      default: () => ([]),
    },
    lookupValues: {
      type: Array,
      default: () => ([]),
    },
    allowCreate: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    filteredValues() {
      const values = this.lookupValues;
      return values.filter((el) => {
        if (this.value.find((e) => (e === el.id)) !== undefined) {
          return false;
        }
        if (this.input !== '') {
          return (el.name.toLowerCase().indexOf(this.input.toLowerCase()) >= 0);
        }
        return true;
      }).sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });
    },
    chipList() {
      return this.lookupValues.filter((el) => this.value.includes(el.id));
    },
    inputLabel() {
      return this.value.length ? '' : this.label;
    },
  },
  methods: {
    addSelection(id) {
      const vals = JSON.parse(JSON.stringify(this.value));
      vals.push(id);
      this.$emit('input', vals);
      this.input = '';
      this.$refs.input.focus();
    },
    inputFocusOut() {
      this.inputFocused = false;
    },
    remove(id) {
      const vals = JSON.parse(JSON.stringify(this.value));
      const index = vals.findIndex((e) => e === id);
      if (index >= 0) {
        vals.splice(index, 1);
      }
      this.$emit('input', vals);
    },
    create() {
      this.$emit('create', this.input.trim());
      this.input = '';
      this.$refs.input.focus();
    },
  },
  components: {
    InputChip,
    TichuIcon,
    IconFace,
    IconPlusCircle,
  },
};
</script>
