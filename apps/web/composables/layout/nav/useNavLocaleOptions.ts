/**
 * Опции локали для nav dropdown. Локали — тот же источник, что и для i18n (config/copy).
 */
import { LOCALE_CODES, type LocaleCode } from '~/config/copy'
import type { LocaleOption } from '../types'

export type { LocaleOption } from '../types'

export function useNavLocaleOptions() {
  const copy = useCopy()
  const localeStore = useLocaleStore()

  const currentLocale = computed(() => localeStore.locale)

  const localeOptions = computed<LocaleOption[]>(() =>
    LOCALE_CODES.map((code) => ({
      value: code,
      label: copy.value.settings.locale[code],
      shortLabel: copy.value.settings.localeShort[code],
    }))
  )

  function setLocale(code: LocaleCode) {
    localeStore.setLocale(code)
  }

  return { localeOptions, currentLocale, setLocale }
}
