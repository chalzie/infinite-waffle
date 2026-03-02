<template>
  <select v-model="model" class="ui-select" tabindex="0" aria-label="Select an option">
    <option v-for="option in options" :key="option.key" :value="option.value">
      {{ option.key }}
    </option>
  </select>
</template>

<script setup lang="ts">
defineProps<{
  options: Record<string, string>[]
}>()

const model = defineModel<string>({ required: true })
</script>

<style scoped>
.ui-select {
  background-color: var(--color-accent);

  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.2);

  option {
    color: var(--color-black);
    background-color: var(--primary-color);
  }
}
</style>
