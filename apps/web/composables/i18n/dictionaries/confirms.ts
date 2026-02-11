/**
 * Конфиг подтверждений (confirm-диалоги). Базовый хук — от copy.
 */
import { computed } from 'vue'
import { getConfirmsConfig } from '~/config/overlay/confirms'

export function useConfirmsConfig() {
  const copy = useCopy()
  return computed(() => getConfirmsConfig(copy.value))
}
