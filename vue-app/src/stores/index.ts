import type { Settings } from '../types/application'

import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useAppStore = defineStore('app', () => {
  const settings = reactive<Settings>({
    active: true,
    rowsCount: 50,
    refreshRate: 200,
    filterValue: 'ALL',
  })

  const toggleActive = () => {
    settings.active = !settings.active
  }

  return {
    settings,
    toggleActive,
  }
})
