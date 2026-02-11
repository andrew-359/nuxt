/**
 * Notes list query params and result types.
 * Used by data services for pagination, filter, sort.
 */
import type { EntityId, Note, Todo } from './types'
import type { SortBy, SortDir } from './constants'

export interface NotesQueryParams {
  accountId: EntityId
  filterQuery?: string
  sortBy: SortBy
  sortDir: SortDir
  page: number
  pageSize: number
}

export interface NotesPageResult {
  items: Note[]
  totalCount: number
  totalPages: number
  /** Todos by noteId for returned items (for preview, search highlight). */
  todosByNoteId: Record<EntityId, Todo[]>
}
