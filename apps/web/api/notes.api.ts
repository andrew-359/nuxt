/**
 * Notes API facade. Stores use this; calls @todo/storage notes service (API → service → repo).
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
import { getNotesService } from '@todo/storage'

export function getNotesApi() {
  const service = getNotesService()
  return {
    getNotesPaginated: (params: NotesQueryParams): Promise<NotesPageResult> =>
      service.getNotesPaginated(params),
    getByAccountId: (accountId: EntityId) => service.getByAccountId(accountId),
    getById: (id: EntityId) => service.getById(id),
    getTodosByNoteId: (noteId: EntityId) => service.getTodosByNoteId(noteId),
    getTodosByAccountId: (accountId: EntityId) => service.getTodosByAccountId(accountId),
    saveNoteWithTodos: (
      note: NoteCreate | Note,
      todos?: Array<TodoCreate | Todo | (Todo & TodoUpdate)>
    ) => service.saveNoteWithTodos(note, todos),
    updateNote: (id: EntityId, data: NoteUpdate) => service.updateNote(id, data),
    deleteNote: (id: EntityId) => service.deleteNote(id),
    addTodo: (data: TodoCreate) => service.addTodo(data),
    updateTodo: (id: EntityId, data: TodoUpdate) => service.updateTodo(id, data),
    deleteTodo: (id: EntityId) => service.deleteTodo(id),
  }
}
