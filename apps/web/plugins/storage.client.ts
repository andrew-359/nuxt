/**
 * Hydrate stores from api (IndexedDB + localStorage) on app init (client only).
 */
import { api } from '~/api'

export default defineNuxtPlugin(async () => {
  const accountStore = useAccountStore()
  const settingsStore = useSettingsStore()

  const [accounts, activeId] = await Promise.all([
    api.accounts.getAll(),
    api.settings.getActiveAccountId(),
  ])

  accountStore.setAccounts(accounts)
  settingsStore.setActiveAccountIdSync(activeId)
  if (activeId) {
    await settingsStore.getSettings(activeId)
  }
})
