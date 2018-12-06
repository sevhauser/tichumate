<template>
  <button class="tfab"
    @click="$emit('click')">
    <slot/>
  </button>
</template>

<script>
export default {};
</script>
