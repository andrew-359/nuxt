/**
 * Domain constants for UI and sorting.
 * Uses `as const` for literal tuple types and type-safe unions (TypeScript handbook).
 */
export const THEME = ['light', 'dark', 'system'] as const
export type Theme = (typeof THEME)[number]

export const NOTES_VIEW = ['list', 'cards'] as const
export type NotesView = (typeof NOTES_VIEW)[number]

export const SORT_BY = ['updatedAt', 'createdAt', 'title'] as const
export type SortBy = (typeof SORT_BY)[number]

export const SORT_DIR = ['asc', 'desc'] as const
export type SortDir = (typeof SORT_DIR)[number]

