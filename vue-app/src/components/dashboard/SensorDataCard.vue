<template>
  <DashboardCard title="Sensor data" class="sensor-data-card flex flex-col justify-start">
    <template #content>
      <SensorDataTools />

      <div class="sensor-data-card__rows flex flex-col">
        <div v-for="item in items" :key="item.id">
          <SensorDataRow :item="item" />
        </div>
      </div>
    </template>
  </DashboardCard>
</template>

<script setup lang="ts">
import type { SensorData } from '../../types/sensor'

import { computed } from 'vue'

import { useAppStore } from '../../stores'

import DashboardCard from './common/DashboardCard.vue'
import SensorDataRow from './SensorDataRow.vue'

import SensorDataTools from './SensorDataTools.vue'

defineProps<{
  items: SensorData[]
}>()

const appStore = useAppStore()

const overflow = computed(() => {
  return appStore.settings.active ? 'hidden' : 'scroll'
})
</script>

<style scoped>
.sensor-data-card {
  flex: 1 0 0%;
  min-height: 0px;
}
.sensor-data-card__rows {
  height: 100%;
  overflow-y: v-bind(overflow);
  overflow-x: hidden;
}
</style>
