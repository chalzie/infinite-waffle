export type SensorType = 'TEMP' | 'HEARTBEAT' | 'ERROR'

export interface SensorDataRaw {
  t: number // Timestamp
  v: string // Value
  m: string // Message
  type: SensorType // Type of sensor data
  metadata: {
    device_id: string | null
  }
}
