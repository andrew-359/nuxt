/**
 * Фасад: форма «Создать аккаунт» + submit: addAccount, setActiveAccountIdSync, getSettings.
 * Устраняет дублирование submit-логики в CreateAccountFormContent и CreateAccountOnboarding.
 */
import type { CreateAccountValues } from '@todo/domain'
import { toAccountCreate } from '@todo/domain'
import { useCreateAccountFormFacade } from '~/composables/form'

export function useCreateAccountFlow() {
  const { createAccountFormConfig, createAccountForm } = useCreateAccountFormFacade()
  const accountStore = useAccountStore()
  const settingsStore = useSettingsStore()

  async function handleSubmit(data: Record<string, unknown>) {
    const values = data as CreateAccountValues
    const account = await accountStore.addAccount(toAccountCreate(values))
    await settingsStore.setActiveAccountId(account.id)
    await settingsStore.getSettings(account.id)
  }

  return {
    createAccountFormConfig,
    createAccountForm,
    handleSubmit,
  }
}
