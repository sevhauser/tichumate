<template>
  <TDialog :title="title">
    <p class="tdialog-content-item">{{ content }}</p>
    <TButton slot="actions" @click="cancel">{{ cancelText }}</TButton>
    <TButton slot="actions" @click="confirm">{{ confirmText }}</TButton>
  </TDialog>
</template>

<script>
import TDialog from '@/components/dialog/TDialog.vue';
import TButton from '@/components/ui/TButton.vue';

export default {
  name: 'DialogConfirm',
  props: {
    title: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      required: true,
    },
    confirmText: {
      type: String,
      default: 'OK',
    },
    cancelText: {
      type: String,
      default: 'Cancel',
    },
    bus: {
      type: Object,
      default: null,
    },
    identifier: {
      type: String,
      default: 'dialog-confirm',
    },
    attributes: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    cancel() {
      this.$emit('close');
    },
    confirm() {
      if (this.bus !== null) {
        this.bus.$emit(`${this.identifier}-confirm`, this.attributes);
      }
      this.$emit('close');
    },
  },
  components: {
    TDialog,
    TButton,
  },
};
</script>

<style>

</style>
