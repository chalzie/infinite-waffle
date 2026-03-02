<template>
  <div class="sensor-data-row" :class="{ 'text-red-500': item.type === 'ERROR' }">
    <span class="sensor-data-row__time">{{ new Date(item.timestamp).toLocaleString() }}</span>
    <span class="sensor-data-row__value">{{ item.value }}</span>
    <span class="sensor-data-row__message">{{ item.message }}</span>
    <span class="sensor-data-row__device-id">{{ item.device_id }}</span>
    <span class="sensor-data-row__type">{{ item.type }}</span>
  </div>
</template>

<script setup lang="ts">
import type { SensorData } from '../../types/sensor'

defineProps<{
  item: SensorData
}>()
</script>

<style scoped>
.sensor-data-row {
  font-size: 12px;
  display: grid;
  grid-template-columns: 1.5fr 0.5fr 1fr 1fr 1fr;
  gap: 10px;

  will-change: transform;
  content-visibility: auto;
}
</style>
