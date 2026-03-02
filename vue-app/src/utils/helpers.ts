import type { SensorType } from '@shared/models'

import type { SensorData } from '@/types/sensor'

export const countAverage = (data: SensorData[], type: SensorType, targetCount: number = 20) => {
  let sum = 0
  let foundCount = 0

  for (let i = data.length - 1; i >= 0; i--) {
    const item = data[i] as SensorData
    if (item?.type === type) {
      sum += item?.value || 0
      foundCount++
    }
    if (foundCount === targetCount)
      break
  }
  return Math.round(foundCount > 0 ? sum / foundCount : 0)
}
