/**
 * Читает конфиг наполнения (getPageFilling, getPageTitle) и отдаёт лейауту
 * компоненты и флаги — без мапперов, конфиг уже хранит ссылки на компоненты.
 */
import { getPageFilling, getPageTitle } from '~/config/_pages'
import { RouteNames } from '~/config/routes'

export function useDefaultLayout() {
  const route = useRoute()
  const copy = useCopy()
  const accountStore = useAccountStore()
  const settingsStore = useSettingsStore()

  const filling = computed(() => getPageFilling(route.name as string))

  const pageTitle = computed(() => getPageTitle(route.name as string, copy.value))

  const currentAccountName = computed(() =>
    settingsStore.activeAccountId
      ? (accountStore.getById(settingsStore.activeAccountId)?.name ?? copy.value.account.noName)
      : ''
  )

  const view = computed(() => ({
    header: { slot: filling.value.header },
    footer: filling.value.footer,
    nav: {
      showAccountName: accountStore.hasAccounts && !!currentAccountName.value,
      showNav: accountStore.hasAccounts,
    },
  }))

  return {
    pageTitle,
    currentAccountName,
    view,
    routeToNotes: () => ({ name: RouteNames.notes }),
  }
}
