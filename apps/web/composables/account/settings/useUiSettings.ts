/**
 * Resolved UI settings for the active account and theme to apply to the root.
 * Theme 'system' is resolved to 'light' | 'dark' via prefers-color-scheme.
 */
import { usePreferredDark } from '@vueuse/core'
import { computed, watch } from 'vue'
import { DEFAULT_USER_SETTINGS } from '@todo/domain'
import { useSettingsStore } from '~/stores'

export function useUiSettings() {
  const settingsStore = useSettingsStore()
  const systemDark = usePreferredDark()

  const activeAccountId = computed(() => settingsStore.activeAccountId)
  const settings = computed(() =>
    activeAccountId.value
      ? settingsStore.getSettingsSync(activeAccountId.value)
      : DEFAULT_USER_SETTINGS
  )

  const resolvedTheme = computed((): 'light' | 'dark' => {
    const theme = settings.value.theme
    if (theme === 'system') return systemDark.value ? 'dark' : 'light'
    return theme
  })

  watch(activeAccountId, (id) => {
    if (id) settingsStore.getSettings(id)
  })

  return { settings, resolvedTheme, setSettings: settingsStore.setSettings }
}
