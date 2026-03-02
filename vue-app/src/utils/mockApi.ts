import type { SensorDataRaw, SensorType } from '@shared/models'

/**
 * Simulates an incoming API stream.
 * @param {Function} callback - Called whenever a new data packet arrives.
 */
export const startPulseStream = (callback: (data: SensorDataRaw) => void) => {
  setInterval(() => {
    const types: SensorType[] = ['TEMP', 'HEARTBEAT', 'ERROR']
    const type: SensorType = types[Math.floor(Math.random() * types.length)]!
    const data: SensorDataRaw = {
      t: Date.now(), // Timestamp
      v: (Math.random() * 100).toFixed(2), // Value
      m: `Msg_${Math.random().toString(36).slice(-4)}`, // Message
      type,
      metadata: {
        // Note: metadata might be incomplete or missing device_id
        device_id: Math.random() > 0.1 ? 'SENSOR_01' : null,
      },
    }
    callback(data)
  }, 100)
}
