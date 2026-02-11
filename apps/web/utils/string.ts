/**
 * String helpers: truncation, regex escaping.
 * normalizeSearchQuery lives in @todo/domain (uses es-toolkit trim).
 */
import { trim } from 'es-toolkit/string'
export { normalizeSearchQuery } from '@todo/domain'

/**
 * Truncate text to maxChars and append ellipsis if truncated.
 */
export function truncateWithEllipsis(
  text: string,
  maxChars: number,
  ellipsis = '…'
): string {
  if (text.length <= maxChars) return text
  return text.slice(0, maxChars) + ellipsis
}

/**
 * Escape special regex characters in a string for use in RegExp.
 */
export function escapeRegex(str: string): string {
  return str.replaceAll(/[.*+?^${}()|[\]\\]/g, (m) => '\\' + m)
}

/**
 * Coerce value to trimmed string. Non-strings become ''.
 * Use for form inputs and unknown data. Uses es-toolkit trim.
 */
export function toTrimmedString(value: unknown): string {
  return typeof value === 'string' ? trim(value) : ''
}
