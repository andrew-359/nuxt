/**
 * Фасад: композиция useCreateAccountFormConfig (i18n) + useCreateAccountForm.
 * Всё необходимое для формы «Создать аккаунт».
 */
import { useCreateAccountFormConfig } from '~/composables/i18n'
import { useCreateAccountForm } from './useCreateAccountForm'

export function useCreateAccountFormFacade() {
  return {
    createAccountFormConfig: useCreateAccountFormConfig(),
    createAccountForm: useCreateAccountForm(),
  }
}
