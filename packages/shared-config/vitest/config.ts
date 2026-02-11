import { defineConfig } from 'vitest/config'

/**
 * Base Vitest config for packages (non-Nuxt).
 * Extend and override in package vitest.config.ts as needed.
 */
export default defineConfig({
  test: {
    globals: false,
    environment: 'node',
    include: ['**/*.{test,spec}.{ts,js}'],
    exclude: ['**/node_modules/**', '**/dist/**'],
  },
})
