/**
 * Note card display logic: search segments, match check.
 * Title truncation — через CSS (text-ellipsis) на карточке.
 */
import type { Note } from '@todo/domain'
import {
  getHighlightSegments,
  matchesQuery,
  type HighlightSegment,
} from '~/lib/search-highlight'

export type { HighlightSegment } from '~/lib/search-highlight'

/** Note fields needed for card display (title, date, link) */
export type NoteCardNote = Pick<Note, 'id' | 'title' | 'createdAt'>

/**
 * Display title for card (raw or placeholder). Truncation via CSS on the card.
 */
export function getDisplayTitle(rawTitle: string, noTitleCopy: string): string {
  return rawTitle || noTitleCopy
}

/**
 * Split title into segments for search highlight (re-exports logic).
 */
export function getTitleSegments(
  rawTitle: string,
  searchQuery: string,
  noTitleCopy: string
): HighlightSegment[] {
  if (!searchQuery) return []
  const raw = rawTitle || noTitleCopy
  return getHighlightSegments(raw, searchQuery)
}

/**
 * Returns true if todo text contains search query (case-insensitive).
 */
export function todoMatchesSearch(
  todo: { text?: string },
  query: string
): boolean {
  return matchesQuery(todo.text ?? '', query ?? '')
}
