/**
 * UI config: CSS classes for dynamic states (e.g. search highlight).
 * Single place to change highlight/markup styles.
 */

/** Classes for search match in note card title (inline highlight) */
export const SEARCH_HIGHLIGHT_TITLE_MATCH =
  'bg-yellow-300 dark:bg-yellow-600 rounded px-0.5'

/** Classes for todo row in preview when it matches search */
export const SEARCH_HIGHLIGHT_TODO_ROW_MATCH =
  'bg-yellow-100 dark:bg-yellow-900/40 border border-yellow-300 dark:border-yellow-600'

/** Classes for extra match todo row (4+ task shown as 4th line with dimmed style) */
export const SEARCH_HIGHLIGHT_EXTRA_ROW =
  'opacity-70 bg-yellow-100 dark:bg-yellow-900/40 border border-yellow-400 dark:border-yellow-500'
