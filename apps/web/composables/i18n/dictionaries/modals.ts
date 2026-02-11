/**
 * Конфиг модалок. Базовый хук — от copy.
 */
import { computed } from 'vue'
import { getModalsConfig } from '~/config/overlay/modals'

export function useModalsConfig() {
  const copy = useCopy()
  return computed(() => getModalsConfig(copy.value))
}
