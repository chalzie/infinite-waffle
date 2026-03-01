import { fileURLToPath, URL } from 'node:url'
import { defineNitroConfig } from 'nitropack/config'

// https://nitro.build/config
export default defineNitroConfig({
  compatibilityDate: 'latest',
  srcDir: 'server',
  imports: false,
  alias: {
    '@shared': fileURLToPath(new URL('../shared', import.meta.url)),
  },
})
