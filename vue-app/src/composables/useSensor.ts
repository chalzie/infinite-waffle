import type { SensorDataRaw, SensorType } from '@shared/models'
import type { SensorData } from '../types/sensor'

import { onMounted, onUnmounted, ref, shallowRef } from 'vue'
import { useAppStore } from '../stores'

const parseData = (data: string, counter: number) => {
  const parsed = JSON.parse(data) as SensorDataRaw
  const processedData: SensorData = {
    id: counter,
    // date: new Date(parsed.t).toDateString(),
    timestamp: parsed.t,
    value: Number.parseFloat(parsed.v),
    message: parsed.m,
    type: parsed.type as SensorType,
    device_id: parsed.metadata.device_id || 'UNKNOWN',
  }
  return Object.freeze(processedData)
}

/**
 * Composable for managing sensor data stream via Server-Sent Events
 * @param url - The URL for the EventSource endpoint (default: '/api')
 * @returns Reactive state and methods for managing sensor connection
 */
export function useSensor(url: string = '/api') {
  const appStore = useAppStore()

  let eventSource: EventSource | null = null
  const error = ref<Error | null>(null)

  const queue: SensorData[] = []
  const sensorData = shallowRef<SensorData[]>([])

  let counter = 0
  let lastUpdate = 0
  let rafId: number | null = null
  let head = 0
  let isFull = false

  const loopRAF = (timestamp: number) => {
    // Only update every 300ms, but sync it with a fresh animation frame
    if (timestamp - lastUpdate >= appStore.settings.refreshRate) {
      // if (queue.length > 0) {
      // const incoming = [...queue]
      // queue.length = 0

      // Atomic update
      // sensorData.value = [...sensorData.value, ...incoming].slice(-appStore.settings.rowsCount)
      // }
      const orderedData = isFull
        ? [...queue.slice(head), ...queue.slice(0, head)]
        : queue.slice(0, head)

      sensorData.value = orderedData
      lastUpdate = timestamp
    }
    rafId = requestAnimationFrame(loopRAF)
  }

  const connect = () => {
    if (eventSource) {
      return
    }

    try {
      eventSource = new EventSource(url)
      eventSource.onopen = () => {
        error.value = null
      }
      eventSource.onerror = (_event: Event) => {
        error.value = new Error('Failed to connect to the sensor data stream')
      }
      eventSource.onmessage = (event: MessageEvent) => {
        if (appStore.settings.active) {
          const parsedData: SensorData = parseData(event.data, counter++)
          // queue.push(parsedData)

          queue[head] = parsedData
          head = (head + 1) % appStore.settings.rowsCount
          if (head === 0)
            isFull = true
        }
      }
    }
    catch (err) {
      error.value = err as Error
    }
    rafId = requestAnimationFrame(loopRAF)
  }

  const disconnect = () => {
    if (eventSource) {
      eventSource.close()
      eventSource = null
    }
    if (rafId) {
      cancelAnimationFrame(rafId)
      rafId = null
    }
  }

  onMounted(() => connect())
  onUnmounted(() => disconnect())

  return { sensorData }
}
