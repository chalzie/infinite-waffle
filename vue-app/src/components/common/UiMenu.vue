<template>
  <div class="ui-menu">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>

<style scoped>
.ui-menu {
  background-color: var(--color-primary);
  padding: 20px;
  margin-bottom: 20px;
}
</style>
