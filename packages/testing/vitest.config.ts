import { defineConfig } from 'vitest/config'
import { resolve } from 'node:path'
import shared from '@todo/shared-config/vitest'

export default defineConfig({
  ...shared,
  resolve: {
    alias: { '@': resolve(__dirname, 'src') },
  },
  test: {
    ...shared.test,
    include: ['src/**/*.{test,spec}.ts'],
  },
})
