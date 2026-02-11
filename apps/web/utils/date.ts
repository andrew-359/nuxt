/**
 * Date formatting for display. Single place so locale/format can be changed or driven by config.
 */

/**
 * Format ISO date string for note card (e.g. "12 февр. 2025 г.").
 */
export function formatNoteDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
