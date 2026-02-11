/**
 * Global middleware: ensure we have an active account when entering app routes.
 * No accounts: allow only notes list. For note page redirect to notes. Has accounts but no active -> set first.
 */
import { RouteNames, routeToNotes } from '~/config/routes'

export default defineNuxtRouteMiddleware(async (to) => {
  const accountStore = useAccountStore()
  const settingsStore = useSettingsStore()

  if (!accountStore.hasAccounts) {
    if (to.name === RouteNames.note) return navigateTo(routeToNotes())
    return
  }

  if (!settingsStore.activeAccountId) {
    const first = accountStore.accounts[0]
    if (first) await settingsStore.setActiveAccountId(first.id)
  }
})
