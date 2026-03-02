<template>
  <div class="sensor-data-tools flex items-center gap-4 mb-4">
    <UiButton
      class="toggle-button"
      aria-label="Toggle active"
      tabindex="0"
      @click="appStore.toggleActive"
      @keydown.enter="appStore.toggleActive"
    >
      <SvgPauseIcon v-if="appStore.settings.active" />
      <SvgPlayIcon v-else />
    </UiButton>
    <div class="sensor-data-tools__status flex flex-col justify-center items-start w-24">
      <span class="sensor-data-tools__status-label">
        Status
      </span>
      <span class="sensor-data-tools__status-text font-bold">
        {{ appStore.settings.active ? 'Running' : 'Paused' }}
      </span>
    </div>
    <UiSelect v-model="selectedType" :options="typeOptions" class="select-type" />
  </div>
</template>

<script setup lang="ts">
import type { SensorType } from '@shared/models'

import { computed, ref, watch } from 'vue'

import SvgPauseIcon from '@/assets/icons/pause.svg'
import SvgPlayIcon from '@/assets/icons/play.svg'

import { useAppStore } from '@/stores'

import UiButton from '../common/UiButton.vue'
import UiSelect from '../common/UiSelect.vue'

const appStore = useAppStore()

const selectedType = ref<SensorType | 'ALL'>('ALL')
watch(selectedType, (value) => {
  appStore.settings.filterValue = value
})

const typeOptions = [
  { key: 'All', value: 'ALL' },
  { key: 'Error', value: 'ERROR' },
  { key: 'Temperature', value: 'TEMP' },
  { key: 'Heartbeat', value: 'HEARTBEAT' },
]

const colorStatus = computed(() => {
  return appStore.settings.active ? 'var(--color-accent)' : 'var(--color-error)'
})
</script>

<style scoped>
.sensor-data-tools {
  .toggle-button {
    min-width: 3rem;
  }
  .sensor-data-tools__status-label {
    font-size: 0.75rem;
    text-transform: uppercase;
  }
  .sensor-data-tools__status-text {
    color: v-bind(colorStatus);
  }
  .select-type {
    width: min(100%, 400px);
  }
}
</style>
