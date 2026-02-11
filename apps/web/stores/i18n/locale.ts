/**
 * Локаль приложения (i18n). Сохраняется в localStorage.
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { STORE_LOCALE } from '~/config/stores'
import { defaultLocale, type LocaleCode } from '~/config/copy'

const STORAGE_KEY = 'todo-locale'

export const useLocaleStore = defineStore(STORE_LOCALE, () => {
  const locale = ref<LocaleCode>(readStoredLocale())

  function readStoredLocale(): LocaleCode {
    if (import.meta.client && typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored === 'ru' || stored === 'en') return stored
    }
    return defaultLocale
  }

  function setLocale(code: LocaleCode) {
    locale.value = code
    if (import.meta.client && typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, code)
    }
  }

  return { locale, setLocale }
})
