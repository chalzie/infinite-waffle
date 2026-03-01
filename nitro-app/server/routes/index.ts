import type { SensorDataRaw, SensorType } from '@shared/models'
import { defineEventHandler, setResponseHeader } from 'h3'

// /**
//  *  Actual endpoint that sends data to the client.
//  * @param {Event} event - The event object.
//  * @returns {ReadableStream} - The stream of data.
//  */
export default defineEventHandler(async (event) => {
  setResponseHeader(event, 'Content-Type', 'text/event-stream')
  setResponseHeader(event, 'Cache-Control', 'no-cache')
  setResponseHeader(event, 'Connection', 'keep-alive')

  const types: SensorType[] = ['TEMP', 'HEARTBEAT', 'ERROR']

  const stream = new ReadableStream({
    start(controller) {
      const interval = setInterval(() => {
        const type: SensorType = types[Math.floor(Math.random() * types.length)]!

        const data: SensorDataRaw = {
          t: Date.now(), // Timestamp
          v: (Math.random() * 100).toFixed(2), // Value
          m: `Msg_${Math.random().toString(36).slice(-4)}`, // Message
          type,
          metadata: {
            // Note: metadata might be incomplete or missing device_id
            device_id: Math.random() > 0.1 ? 'SENSOR_01' : 'UNKNOWN',
          },
        }

        const message = `data: ${JSON.stringify(data)}\n\n`

        controller.enqueue(new TextEncoder().encode(message))
      }, 100)

      event.node.req.on('close', () => {
        clearInterval(interval)
        controller.close()
      })
    },
  })

  return stream
})
