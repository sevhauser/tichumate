<template>
  <TDialog :title="title">
    <div class="tdialog-content-item">
      <InputText
        :placeholder="$t('message.name')"
        v-model="result.title"/>
    </div>
    <div class="tdialog-content-item">
      <InputNumber
        v-model="result.value"/>
    </div>
    <TButton slot="actions" @click="cancel">{{$t('message.cancel')}}</TButton>
    <TButton slot="actions" @click="save">{{$t('message.save')}}</TButton>
  </TDialog>
</template>

<script>
import TDialog from '@/components/dialog/TDialog.vue';
import TButton from '@/components/ui/TButton.vue';
import InputText from '@/components/form/InputText.vue';
import InputNumber from '@/components/form/InputNumber.vue';
import { Tichu } from '@/db/entity';
import { mapGetters } from 'vuex';

export default {
  name: 'EditPlayerDialog',
  data: () => ({
    result: {
      id: 0,
      title: '',
      value: 0,
    },
  }),
  props: {
    tichuId: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      required: true,
    },
    bus: {
      type: Object,
      default: null,
    },
    identifier: {
      type: String,
      default: 'tichu-dialog',
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
  computed: {
    ...mapGetters({
      tichu: 'tichus/tichu',
    }),
  },
  methods: {
    save() {
      this.saveChanges().then((playerId) => {
        if (this.bus !== null) {
          this.bus.$emit(`${this.identifier}-saved`, { result: this.result.id, attributes: this.attributes });
        }
        if (this.closeOnSave) {
          this.close();
        }
      });
    },
    async saveChanges() {
      let tichuId = this.tichuId;
      if (this.tichuId === 0) {
        const newTichu = await this.$store.dispatch('tichus/createTichu', this.result);
        tichuId = newTichu.id;
      } else {
        await this.$store.dispatch('tichus/updateTichu', this.result);
      }
      return tichuId;
    },
    cancel() {
      this.close();
    },
    close() {
      this.$emit('close');
    },
    loadTichu() {
      if (this.tichuId !== 0) {
        const tichu = this.tichu(this.tichuId);
        this.result = tichu;
      } else {
        this.result = new Tichu();
      }
    },
  },
  created() {
    this.loadTichu();
    this.bus.$on(`${this.identifier}-close`, this.close);
  },
  components: {
    TDialog,
    TButton,
    InputNumber,
    InputText,
  },
};
</script>

<style>

</style>
