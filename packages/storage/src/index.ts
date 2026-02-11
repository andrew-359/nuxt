/**
 * IndexedDB (Dexie) and localStorage adapters.
 * Notes/accounts: API → service → repo. Settings: API → service (localStorage only).
 */

export { getDb } from './db'
export type { TodoDb } from './db'
export {
  createAccountRepository,
  getAccountRepository,
} from './account-repository'
export {
  createNotesRepository,
  getNotesRepository,
} from './notes-repository'
export { getNotesService } from './services/notes-service'
export { getAccountsService } from './services/accounts-service'
export { getSettingsService } from './services/settings-service'

export type { EntityId } from '@todo/domain'
