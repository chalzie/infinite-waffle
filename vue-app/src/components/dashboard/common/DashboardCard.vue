<template>
  <div class="dashboard-card p-5">
    <header class="dashboard-card__header mb-8">
      <h3 class="title">
        {{ title }}
      </h3>
    </header>
    <slot name="content" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  isPrimary?: boolean
  title?: string
}>()
const backgroundColor = computed(() => props.isPrimary ? 'var(--color-accent)' : 'var(--color-transparent)')
const textColor = computed(() => props.isPrimary ? 'var(--color-black)' : 'var(--color-gray)')
</script>

<style scoped>
.dashboard-card {
  border-radius: var(--border-radius-card);
  box-shadow: var(--box-shadow-card);

  background-color: v-bind(backgroundColor);
  color: v-bind(textColor);

  .dashboard-card__header {
    .title {
      position: relative;
      text-transform: uppercase;
      font-size: 0.8rem;
      height: 20px;

      &::after {
        content: '';
        width: 100%;
        height: 1px;
        position: absolute;
        bottom: -8px;
        left: 0;

        background-color: var(--color-gray);
      }
    }
  }
}
</style>
