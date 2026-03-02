import type { SensorType } from '@shared/models'

export interface Settings {
  active: boolean
  rowsCount: number
  refreshRate: number
  filterValue: SensorType | 'ALL'
}
