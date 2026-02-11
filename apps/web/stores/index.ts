/**
 * Root barrel: re-exports all stores by domain.
 * Import by module: from '~/stores/overlay' | '~/stores/notes' | …
 * Or flat: from '~/stores' (all in one namespace).
 * Pinia auto-import picks up useXxxStore from nested dirs.
 */
export * from './overlay'
export * from './i18n'
export * from './account'
export * from './settings'
export * from './notes'
export * from './ui'
