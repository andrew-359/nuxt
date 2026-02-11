/**
 * Notes list view state: loading | empty | list.
 * Pure helper: no copy, no stores. Caller passes loading + isEmpty (e.g. from composable).
 */
export type NotesListView = 'loading' | 'empty' | 'list'

export function getNotesListView(p: {
  loading: boolean
  isEmpty: boolean
}): NotesListView {
  if (p.loading) return 'loading'
  if (p.isEmpty) return 'empty'
  return 'list'
}
