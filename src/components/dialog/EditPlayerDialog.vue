<template>
  <TDialog :title="title">
    <div class="tdialog-content-item">
      <InputText
        placeholder="Player Name"
        v-model="result.name"/>
    </div>
    <div class="tdialog-content-item">
      <InputEmoji
        v-model="result.emoji"/>
    </div>
    <TButton slot="actions" @click="cancel">Cancel</TButton>
    <TButton slot="actions" @click="save">Save</TButton>
  </TDialog>
</template>

<script>
import TDialog from '@/components/dialog/TDialog.vue';
import TButton from '@/components/ui/TButton.vue';
import InputText from '@/components/form/InputText.vue';
import InputEmoji from '@/components/form/InputEmoji.vue';

export default {
  name: 'EditPlayerDialog',
  data: () => ({
    result: {
      name: '',
      emoji: '',
    },
  }),
  props: {
    title: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    emoji: {
      type: String,
      default: '',
    },
    bus: {
      type: Object,
      default: null,
    },
    identifier: {
      type: String,
      default: 'player-dialog',
    },
    closeOnSave: {
      type: Boolean,
      default: false,
    },
    attributes: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    save() {
      if (this.bus !== null) {
        this.bus.$emit(`${this.identifier}-saved`, { result: this.result, attributes: this.attributes });
      }
      if (this.closeOnSave) {
        this.close();
      }
    },
    cancel() {
      this.close();
    },
    close() {
      this.$emit('close');
    },
  },
  created() {
    if (this.name !== '') {
      this.result.name = this.name;
    }
    if (this.emoji !== '') {
      this.result.emoji = this.emoji;
    }
    this.bus.$on(`${this.identifier}-close`, this.close);
  },
  components: {
    TDialog,
    TButton,
    InputText,
    InputEmoji,
  },
};
</script>

<style>

</style>
