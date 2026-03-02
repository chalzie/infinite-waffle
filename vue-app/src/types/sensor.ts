import type { SensorType } from '@shared/models'

export interface SensorData {
  id: number
  timestamp: number
  value: number | null
  message: string
  type: SensorType
  device_id: string | 'UNKNOWN'
}
