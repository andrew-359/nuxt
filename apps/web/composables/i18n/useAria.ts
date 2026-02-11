/**
 * A11y-строки (aria-label и т.д.). Базовый хук — от copy.
 */
import { computed } from 'vue'
import { getAriaConfig } from '~/config/aria'

export function useAria() {
  const copy = useCopy()
  return computed(() => getAriaConfig(copy.value))
}
