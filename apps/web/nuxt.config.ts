// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const currentDir = path.dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  ssr: false,

  app: {
    head: {
      title: 'Заметки',
      htmlAttrs: { lang: 'ru' }, // overwritten by useHead in layout from useLocaleStore()
    },
  },

  vue: {
    config: {
      // @ts-expect-error warnHandler exists at runtime but Nuxt AppConfig types omit it
      warnHandler(msg: string) {
        // Reka UI / Radix: fallthrough attributes on fragment/teleport roots (style, dataAriaHidden) — не исправить в нашем коде
        if (msg.includes('Extraneous non-props attributes') && msg.includes('fragment or text or teleport')) return
      },
    },
  },

  /** Use project root (.) so pages/, components/, layouts/ at root are used (Nuxt 4 default is app/) */
  srcDir: '.',

  /** Components: no path prefix so NoteCard, StateMessage etc. work by filename only; layout parts in layouts/default/ */
  components: [
    { path: '~/components', pathPrefix: false },
    { path: '~/layouts/default', pathPrefix: false },
  ],

  modules: [
    '@pinia/nuxt',
    '@vee-validate/nuxt',
    '@nuxt/a11y',
    '@nuxt/eslint',
    '@nuxt/hints',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui',
  ],

  css: [
    path.join(currentDir, 'assets/css/main.css'),
    path.join(currentDir, 'assets/css/app.scss'),
  ],

  alias: {
    '@todo/domain': path.join(currentDir, '../../packages/domain/src/index.ts'),
    '@todo/storage': path.join(currentDir, '../../packages/storage/src/index.ts'),
  },
})
