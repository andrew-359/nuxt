/**
 * Опции темы для nav dropdown. Базовый хук.
 */
import type { Theme } from '@todo/domain'
import type { ThemeOption } from '../types'

export type { ThemeOption } from '../types'

export function useNavThemeOptions() {
  const copy = useCopy()
  const settingsStore = useSettingsStore()
  const { settings, setSettings } = useUiSettings()
  const colorMode = useColorMode()

  const currentTheme = computed(() => settings.value.theme)

  //под расширение
  const themeOptions = computed<ThemeOption[]>(() => [
    { value: 'light' as Theme, icon: 'i-lucide-sun', label: copy.value.settings.options.theme.light },
    { value: 'system' as Theme, icon: 'i-lucide-monitor', label: copy.value.settings.options.theme.system },
    { value: 'dark' as Theme, icon: 'i-lucide-moon', label: copy.value.settings.options.theme.dark },
  ])

  function setTheme(value: Theme) {
    const id = settingsStore.activeAccountId
    if (id) setSettings(id, { theme: value })
    colorMode.preference = value
  }

  return { themeOptions, currentTheme, setTheme }
}
