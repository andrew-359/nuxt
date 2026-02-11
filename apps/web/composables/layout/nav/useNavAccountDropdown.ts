/**
 * Dropdown аккаунтов для nav. Базовый хук.
 */
import type { Account } from '@todo/domain'
import type { DropdownMenuItem } from '@nuxt/ui'
import { useAccountSwitcher } from '~/composables/account'

export function useNavAccountDropdown() {
  const copy = useCopy()
  const {
    accounts,
    activeAccountId,
    selectAccount,
    openCreateModal,
    openDeleteModal,
  } = useAccountSwitcher()

  const dropdownItems = computed<DropdownMenuItem[][]>(() => {
    const c = copy.value
    return [
      [
        { type: 'label' as const, label: c.account.label },
        ...accounts.value.map((a: Account) => ({
          label: a.name || c.account.noName,
          slot: `account-${a.id}` as const,
          onSelect: () => selectAccount(a.id),
        })),
      ],
    ]
  })

  return { dropdownItems, accounts, activeAccountId, openCreateModal, openDeleteModal }
}
