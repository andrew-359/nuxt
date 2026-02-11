/**
 * Service logic: delete account and switch active to suggested next.
 * Used by account switcher (delete-account confirm).
 */
import type { EntityId } from '@todo/domain'
import { suggestNextAccountId } from '@todo/domain'

export function useDeleteAccountAndSwitch() {
  const accountStore = useAccountStore()
  const settingsStore = useSettingsStore()

  async function deleteAccountAndSelectNext(accountId: EntityId): Promise<boolean> {
    const list = accountStore.accounts
    const removedIndex = list.findIndex((a) => a.id === accountId)
    const ok = await accountStore.removeAccount(accountId)
    if (!ok) return false
    const suggested = suggestNextAccountId(accountStore.accounts, removedIndex)
    await settingsStore.setActiveAccountId(suggested)
    return true
  }

  return { deleteAccountAndSelectNext }
}
