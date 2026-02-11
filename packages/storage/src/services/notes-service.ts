/**
 * Notes service. All notes/todos access goes through this layer.
 * Pagination/filter/sort logic here; CRUD delegates to NotesRepository.
 */
import type {
  EntityId,
  Note,
  NoteCreate,
  NotesPageResult,
  NotesQueryParams,
  NoteUpdate,
  Todo,
  TodoCreate,
  TodoUpdate,
} from '@todo/domain'
import {
  filterNotesByQuery,
  normalizeSearchQuery,
  sortNotes,
  slicePage,
  totalPages as totalPagesFn,
} from '@todo/domain'
import { getNotesRepository } from '../notes-repository'

function getNotesPaginated(params: NotesQueryParams): Promise<NotesPageResult> {
  const repo = getNotesRepository()
  const { accountId, filterQuery, sortBy, sortDir, page, pageSize } = params

  return (async () => {
    const [notes, todos] = await Promise.all([
      repo.getByAccountId(accountId),
      repo.getTodosByAccountId(accountId),
    ])

    const todosByNoteId: Record<EntityId, Todo[]> = {}
    for (const t of todos) {
      const list = todosByNoteId[t.noteId] ?? []
      list.push(t)
      todosByNoteId[t.noteId] = list
    }

    const sorted = sortNotes(notes, sortBy, sortDir)
    const query = normalizeSearchQuery(filterQuery)
    const filtered = filterNotesByQuery(sorted, query, todosByNoteId)
    const count = filtered.length
    const totalPages = totalPagesFn(count, pageSize)
    const items = slicePage(filtered, page, pageSize)

    const todosByNoteIdForPage: Record<EntityId, Todo[]> = {}
    for (const n of items) {
      const list = todosByNoteId[n.id]
      if (list?.length) todosByNoteIdForPage[n.id] = list
    }

    return { items, totalCount: count, totalPages, todosByNoteId: todosByNoteIdForPage }
  })()
}

export function getNotesService() {
  const repo = getNotesRepository()
  return {
    getNotesPaginated,
    getByAccountId: (accountId: EntityId) => repo.getByAccountId(accountId),
    getById: (id: EntityId) => repo.getById(id),
    getTodosByNoteId: (noteId: EntityId) => repo.getTodosByNoteId(noteId),
    getTodosByAccountId: (accountId: EntityId) => repo.getTodosByAccountId(accountId),
    saveNoteWithTodos: (
      note: NoteCreate | Note,
      todos?: Array<TodoCreate | Todo | (Todo & TodoUpdate)>
    ) => repo.saveNoteWithTodos(note, todos),
    updateNote: (id: EntityId, data: NoteUpdate) => repo.updateNote(id, data),
    deleteNote: (id: EntityId) => repo.deleteNote(id),
    addTodo: (data: TodoCreate) => repo.addTodo(data),
    updateTodo: (id: EntityId, data: TodoUpdate) => repo.updateTodo(id, data),
    deleteTodo: (id: EntityId) => repo.deleteTodo(id),
  }
}
