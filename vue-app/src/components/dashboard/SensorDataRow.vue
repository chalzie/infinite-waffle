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

@media (max-width: 576px) {
  .sensor-data-row {
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: 1rem 1rem;
    grid-template-areas:
      'time time time value type'
      'message device-id device-id device-id device-id';
    margin-bottom: 1.5rem;
  }

  .sensor-data-row__time {
    grid-area: time;
  }
  .sensor-data-row__value {
    grid-area: value;
  }
  .sensor-data-row__message {
    grid-area: message;
  }
  .sensor-data-row__device-id {
    grid-area: device-id;
  }
  .sensor-data-row__type {
    grid-area: type;
  }
}
</style>
