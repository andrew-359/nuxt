/**
 * User UI settings (per account).
 * Persisted in localStorage under settings:<accountId>.
 */

import type { Theme, NotesView, SortBy, SortDir } from './constants'

export interface UserSettings {
  theme: Theme
  notesView: NotesView
  sortBy: SortBy
  sortDir: SortDir
}

/** Defaults for new or missing settings; use normalizeUserSettings to merge partials */
export const DEFAULT_USER_SETTINGS = {
  theme: 'system',
  notesView: 'cards',
  sortBy: 'updatedAt',
  sortDir: 'desc',
} as const satisfies UserSettings

export const normalizeUserSettings = (partial: Partial<UserSettings>): UserSettings => ({
  theme: partial.theme ?? DEFAULT_USER_SETTINGS.theme,
  notesView: partial.notesView ?? DEFAULT_USER_SETTINGS.notesView,
  sortBy: partial.sortBy ?? DEFAULT_USER_SETTINGS.sortBy,
  sortDir: partial.sortDir ?? DEFAULT_USER_SETTINGS.sortDir,
})
