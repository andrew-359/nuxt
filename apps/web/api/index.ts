/**
 * Data API facade. Single entry point for stores; implements domain repository contracts via @todo/storage.
 * Swap implementation here (e.g. HTTP) without changing stores.
 */
import { getAccountsApi } from './accounts.api'
import { getNotesApi } from './notes.api'
import { getSettingsApi } from './settings.api'

export const api = {
  get notes() {
    return getNotesApi()
  },
  get accounts() {
    return getAccountsApi()
  },
  get settings() {
    return getSettingsApi()
  },
}
