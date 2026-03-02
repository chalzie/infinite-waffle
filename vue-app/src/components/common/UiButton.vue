<template>
  <button class="ui-button flex items-center justify-center">
    <slot />
  </button>
</template>

<script setup lang="ts">
</script>

<style scoped>
.ui-button {
  background-color: var(--color-accent);
  border: none;
  outline: none;
  padding: 0;
  border-radius: 0.5rem;
  margin: 0;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.5rem;

  &:focus-visible {
    outline: 2px solid var(--color-accent);
  }
}
</style>
