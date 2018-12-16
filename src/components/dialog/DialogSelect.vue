<template>
  <TDialog :title="title">
    <InputSelect
      v-model="input"
      :options="options"/>
    <TButton slot="actions" @click="close">Cancel</TButton>
    <TButton slot="actions" @click="save">Save</TButton>
  </TDialog>
</template>

<script>
import TDialog from '@/components/dialog/TDialog.vue';
import TButton from '@/components/ui/TButton.vue';
import InputSelect from '@/components/form/InputSelect.vue';

export default {
  name: 'DialogSelect',
  data: () => ({
    input: '',
  }),
  props: {
    value: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      default: '',
    },
    bus: {
      type: Object,
      default: null,
    },
    identifier: {
      type: String,
      default: 'dialog-text',
    },
  },
  methods: {
    save() {
      if (this.bus !== null) {
        this.bus.$emit(`${this.identifier}-save`, this.input);
      }
      this.$emit('close');
    },
    close() {
      this.$emit('close');
    },
  },
  created() {
    this.input = this.value;
  },
  components: {
    TDialog,
    TButton,
    InputSelect,
  },
};
</script>
