/**
 * Конфиг панели настроек. Базовый хук — от copy.
 */
import { computed } from 'vue'
import { getSettingsConfig } from '~/config/settings'

export function useSettingsConfig() {
  const copy = useCopy()
  return computed(() => getSettingsConfig(copy.value))
}
