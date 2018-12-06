<template>
  <div class="tdialog">
    <div class="tdialog__header" v-if="title != ''">
      <span>{{ title }}</span>
    </div>
    <div class="tdialog__content"
      :class="{ 'no-title' : title == ''}">
      <slot/>
    </div>
    <div class="tdialog__actions">
      <slot name="actions"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TDialog',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
};
</script>

<style>

</style>
