/**
 * Composable for AccountSwitcher: account list, active id, and actions.
 * Popover UI is handled by UPopover in the component.
 */
import { computed } from 'vue'
import { ConfirmKeys, ModalKeys } from '~/config/overlay/keys'
import { RouteNames, routeToNotes } from '~/config/routes'

export function useAccountSwitcher() {
  const accountStore = useAccountStore()
  const settingsStore = useSettingsStore()
  const modalStore = useModalStore()
  const route = useRoute()
  const copy = useCopy()
  const toaster = useToaster()
  const { deleteAccountAndSelectNext } = useDeleteAccountAndSwitch()

  const accounts = computed(() => accountStore.accounts)
  const activeAccountId = computed(() => settingsStore.activeAccountId)
  const currentAccountName = computed(() => {
    if (!activeAccountId.value) return ''
    const a = accountStore.getById(activeAccountId.value)
    return a?.name ?? copy.value.account.noName
  })

  async function selectAccount(id: string) {
    await settingsStore.setActiveAccountId(id)
    if (route.name === RouteNames.note) await navigateTo(routeToNotes())
  }

  function openCreateModal() {
    modalStore.openModal(ModalKeys.createAccount)
  }

  function openDeleteModal() {
    const id = activeAccountId.value
    if (!id) return
    modalStore.openConfirm(ConfirmKeys.deleteAccount, {
      accountId: id,
      accountName: currentAccountName.value,
      onConfirm: async () => {
        const done = await deleteAccountAndSelectNext(id)
        if (!done) return
        toaster.success(copy.value.toasts.accountDeleted)
        if (route.name === RouteNames.note) await navigateTo(routeToNotes())
      },
    })
  }

  return {
    accounts,
    activeAccountId,
    currentAccountName,
    selectAccount,
    openCreateModal,
    openDeleteModal,
  }
}
