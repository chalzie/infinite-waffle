<template>
  <div class="app-dashboard text-white p-8 flex flex-col gap-4">
    <div class="averages flex md:flex-row flex-col gap-4 w-full justify-between">
      <AverageValueCard :value="averageTemperature" title="Average temperature" unit="°C" />
      <!-- <AverageValueCard :value="averageHeartbeat" title="Average heartbeat" unit="bpm" /> -->
      <!-- <AverageValueCard :value="averageError" title="Average error" unit="units" /> -->
    </div>
    <SensorDataCard :items="filteredSensorData" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSensor } from '../composables/useSensor'

import { useAppStore } from '../stores'
import { countAverage } from '../utils/helpers'
import AverageValueCard from './dashboard/AverageValueCard.vue'
import SensorDataCard from './dashboard/SensorDataCard.vue'

const { sensorData } = useSensor()

const appStore = useAppStore()

const filteredSensorData = computed(() => {
  if (appStore.settings.filterValue === 'ALL') {
    return sensorData.value
  }
  return sensorData.value.filter(item => item.type === appStore.settings.filterValue)
})

const averageTemperature = computed(() => {
  return countAverage(sensorData.value, 'TEMP', 20)
})
// const averageHeartbeat = computed(() => {
//   return countAverage(sensorData.value, 'HEARTBEAT', 20)
// })
// const averageError = computed(() => {
//   return countAverage(sensorData.value, 'ERROR', 20)
// })
</script>

<style scoped>
.app-dashboard {
  width: 100%;
  height: 100%;

  .averages > div {
    width: 100%;

    &:nth-child(1) {
      background-color: var(--color-accent);
      color: var(--color-black);
      font-size: 1.5rem;
      font-weight: 700;
    }
  }
}

@media (min-width: 576px) {
  .app-dashboard {
    .averages > div {
      &:nth-child(1):only-child {
        width: 33.33%;
      }
    }
  }
}
</style>
