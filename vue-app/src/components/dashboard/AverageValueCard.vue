<template>
  <DashboardCard :title="title" class="average-value-card">
    <template #content>
      <div class="average-value-card__content">
        <div class="average-value-card__content-item flex items-center gap-2">
          <span class="average-value-card__content-item-label">
            {{ value }}
          </span>
          <span class="average-value-card__content-item-unit">
            {{ unit }}
          </span>
        </div>
      </div>
    </template>
  </DashboardCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import DashboardCard from './common/DashboardCard.vue'

const props = defineProps<{
  value: number
  title?: string
  unit?: string
}>()

const title = computed(() => props.title || 'Average value')
</script>

<style scoped>
.average-value-card {
  height: 130px;
}
.average-value-card__content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
