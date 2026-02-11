/**
 * Search highlight: segment text by query (for inline highlight) and check if text matches.
 * Used by NoteCard; classes come from config.
 */
import { matchesQuery } from '@todo/domain'
import { escapeRegex } from '~/utils/string'

export type HighlightSegment = { type: 'text' | 'match'; value: string }

export { matchesQuery }

/**
 * Split text into segments where query matches (case-insensitive). Regex-safes the query.
 */
export function getHighlightSegments(text: string, query: string): HighlightSegment[] {
  if (!query || !text) return [{ type: 'text', value: text }]
  const re = new RegExp(escapeRegex(query), 'gi')
  const segments: HighlightSegment[] = []
  let lastIndex = 0
  let m: RegExpExecArray | null
  re.lastIndex = 0
  while ((m = re.exec(text)) !== null) {
    if (m.index > lastIndex)
      segments.push({ type: 'text', value: text.slice(lastIndex, m.index) })
    segments.push({ type: 'match', value: m[0] })
    lastIndex = re.lastIndex
  }
  if (lastIndex < text.length)
    segments.push({ type: 'text', value: text.slice(lastIndex) })
  return segments.length > 0 ? segments : [{ type: 'text', value: text }]
}

