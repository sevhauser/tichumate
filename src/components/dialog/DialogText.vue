<template>
  <TDialog :title="title">
    <InputText
      :placeholder="placeholder"
      ref="input"
      v-model="input"/>
    <TButton slot="actions" @click="close">Cancel</TButton>
    <TButton slot="actions" @click="save">Save</TButton>
  </TDialog>
</template>

<script>
import TDialog from '@/components/dialog/TDialog.vue';
import TButton from '@/components/ui/TButton.vue';
import InputText from '@/components/form/InputText.vue';

export default {
  name: 'DialogText',
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
    placeholder: {
      type: String,
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
  mounted() {
    this.$refs.input.$refs.input.focus();
  },
  components: {
    TDialog,
    TButton,
    InputText,
  },
};
</script>
