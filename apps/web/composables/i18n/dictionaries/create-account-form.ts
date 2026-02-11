/**
 * Конфиг формы «Создать аккаунт». Базовый хук — от copy.
 */
import { computed } from 'vue'
import { getCreateAccountFormConfig } from '~/config/form/forms'

export function useCreateAccountFormConfig() {
  const copy = useCopy()
  return computed(() => getCreateAccountFormConfig(copy.value))
}
