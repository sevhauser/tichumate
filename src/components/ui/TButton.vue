<template>
  <button class="tbutton"
    @click="$emit('click')">
    <slot/>
  </button>
</template>

<script>
export default {
  name: 'TButton',
};
</script>
