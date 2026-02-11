/**
 * Pure domain utilities: id, dates, equality, sorting.
 * No I/O, no framework. Uses es-toolkit for generic helpers (isEqual, orderBy, trim).
 */

import { isEqual } from 'es-toolkit'
import { orderBy } from 'es-toolkit/array'
import { trim } from 'es-toolkit/string'
import type { SortBy, SortDir } from './constants'
import type { Account, EntityId, IsoDate, Note, Todo } from './types'

/** Deep equality (for dirty check). Re-export from es-toolkit. */
export const deepEqual = isEqual

/** Normalize search query: trim + lowercase. Use for consistent filtering. */
export function normalizeSearchQuery(q: string | undefined): string {
  return trim((q ?? '').toLowerCase())
}

/**
 * Suggest next active account id after removal.
 * Preserves selection at same index when possible; otherwise last or first.
 */
export function suggestNextAccountId(
  remaining: Account[],
  removedIndex: number
): EntityId | null {
  if (remaining.length === 0) return null
  const target = Math.min(removedIndex, remaining.length - 1)
  return remaining[target]?.id ?? remaining[0]?.id ?? null
}

const fallbackUuid = (): string =>
  '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c) => {
    const n = Number.parseInt(c, 10)
    return (n ^ (crypto.getRandomValues(new Uint8Array(1))[0]! & (15 >> (n / 4)))).toString(16)
  })

/** Generate a UUID v4 (client-side). */
export const generateId = (): string => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return fallbackUuid()
}

/** Current time as ISO string */
export const nowISO = (): IsoDate => new Date().toISOString()

/** Lookup: for each SortBy, how to get a comparable string from a Note. Exhaustive over SortBy. */
const NOTE_SORT_ACCESSORS: Record<SortBy, (note: Note) => string> = {
  title: (n) => n.title.toLowerCase(),
  createdAt: (n) => n.createdAt,
  updatedAt: (n) => n.updatedAt,
}

/** Sort notes by sortBy/sortDir (returns new array). Uses es-toolkit orderBy. */
export const sortNotes = (
  notes: Note[],
  sortBy: SortBy,
  sortDir: SortDir
): Note[] => {
  const accessor = NOTE_SORT_ACCESSORS[sortBy]
  return orderBy(notes, [accessor], [sortDir])
}

/** Returns true if text contains query (case-insensitive). Query should be normalized (trim+lower) by caller. Empty query = no match (for highlight); filtering uses empty-query check before calling this. */
export function matchesQuery(text: string, query: string): boolean {
  if (!query) return false
  return (text ?? '').toLowerCase().includes(query)
}

/**
 * Filter notes by search query (title or todo text).
 * Query should be normalized (trim+lower) by caller. Empty query returns all notes.
 */
export function filterNotesByQuery(
  notes: Note[],
  query: string,
  todosByNoteId: Record<EntityId, Todo[]>
): Note[] {
  if (!query) return notes
  return notes.filter((n) => {
    if (matchesQuery(n.title ?? '', query)) return true
    const todos = todosByNoteId[n.id] ?? []
    return todos.some((t) => matchesQuery(t.text ?? '', query))
  })
}

/** Sort array of items by numeric `order` field (asc). Uses es-toolkit orderBy. */
export function sortByOrder<T extends { order: number }>(items: T[]): T[] {
  return orderBy(items, ['order'], ['asc'])
}

/** Slice array by page (1-based) and page size. */
export function slicePage<T>(array: T[], page: number, pageSize: number): T[] {
  const from = (page - 1) * pageSize
  return array.slice(from, from + pageSize)
}

/** Total number of pages (at least 1). */
export function totalPages(totalItems: number, pageSize: number): number {
  return Math.max(1, Math.ceil(totalItems / pageSize))
}

