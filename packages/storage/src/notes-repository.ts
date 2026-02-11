import type { NotesRepository, RepoResult } from '@todo/domain'
import { RepoErrorCode } from '@todo/domain'
import type {
  EntityId,
  Note,
  NoteCreate,
  NoteUpdate,
  Todo,
  TodoCreate,
  TodoUpdate,
} from '@todo/domain'
import { generateId, nowISO } from '@todo/domain'
import { getDb } from './db'

const notFoundNote = (): RepoResult<Note> => ({
  ok: false,
  error: { code: RepoErrorCode.NotFound, message: 'Note not found' },
})
const notFoundTodo = (): RepoResult<Todo> => ({
  ok: false,
  error: { code: RepoErrorCode.NotFound, message: 'Todo not found' },
})
const notFoundUndefined = (): RepoResult<undefined> => ({
  ok: false,
  error: { code: RepoErrorCode.NotFound, message: 'Not found' },
})

export const createNotesRepository = (): NotesRepository => {
  const db = getDb()

  const normalizeTodo = (
    raw: TodoCreate | Todo | (Todo & TodoUpdate),
    noteId: EntityId,
    accountId: EntityId,
    order: number
  ): Todo => {
    const now = nowISO()
    if ('id' in raw && raw.id) {
      return {
        id: raw.id,
        noteId: raw.noteId,
        accountId: raw.accountId,
        text: raw.text ?? '',
        completed: raw.completed ?? false,
        order: raw.order ?? order,
        createdAt: raw.createdAt ?? now,
        updatedAt: now,
      }
    }
    return {
      id: generateId(),
      noteId,
      accountId,
      text: raw.text,
      completed: raw.completed ?? false,
      order: raw.order ?? order,
      createdAt: now,
      updatedAt: now,
    }
  }

  return {
    getByAccountId: (accountId: EntityId) =>
      db.notes.where('accountId').equals(accountId).toArray(),

    getById: async (id: EntityId) => {
      const note = await db.notes.get(id)
      if (!note) return notFoundNote()
      return { ok: true, data: note }
    },

    getTodosByNoteId: (noteId: EntityId) =>
      db.todos.where('noteId').equals(noteId).sortBy('order'),

    getTodosByAccountId: async (accountId: EntityId) => {
      const list = await db.todos.where('accountId').equals(accountId).toArray()
      return list.sort(
        (a, b) => a.noteId.localeCompare(b.noteId) || a.order - b.order
      )
    },

    saveNoteWithTodos: async (note, todos) => {
      const now = nowISO()
      const noteId = 'id' in note && note.id ? note.id : generateId()
      const accountIdResolved =
        'accountId' in note && note.accountId
          ? note.accountId
          : (note as NoteCreate & { accountId: EntityId }).accountId
      const noteRecord: Note =
        'id' in note && note.id
          ? { ...note, updatedAt: now }
          : {
              id: noteId,
              accountId: accountIdResolved,
              title: (note as NoteCreate).title ?? '',
              createdAt: now,
              updatedAt: now,
            }
      await db.transaction('rw', db.notes, db.todos, async () => {
        await db.notes.put(noteRecord)
        if (todos !== undefined) {
          await db.todos.where('noteId').equals(noteId).delete()
          const toAdd = todos.map((t, i) =>
            normalizeTodo(t, noteId, accountIdResolved, i)
          )
          await db.todos.bulkAdd(toAdd)
        }
      })
      return noteRecord
    },

    updateNote: async (id: EntityId, data: NoteUpdate) => {
      const existing = await db.notes.get(id)
      if (!existing) return notFoundNote()
      const updated = { ...existing, ...data, updatedAt: nowISO() }
      await db.notes.put(updated)
      return { ok: true, data: updated }
    },

    deleteNote: async (id: EntityId): Promise<RepoResult<undefined>> => {
      const existing = await db.notes.get(id)
      if (!existing) return notFoundUndefined()
      await db.transaction('rw', db.notes, db.todos, async () => {
        await db.todos.where('noteId').equals(id).delete()
        await db.notes.delete(id)
      })
      return { ok: true, data: undefined }
    },

    addTodo: async (data: TodoCreate) => {
      const count = await db.todos.where('noteId').equals(data.noteId).count()
      const todo: Todo = {
        id: generateId(),
        noteId: data.noteId,
        accountId: data.accountId,
        text: data.text,
        completed: data.completed ?? false,
        order: data.order ?? count,
        createdAt: nowISO(),
        updatedAt: nowISO(),
      }
      await db.todos.add(todo)
      return todo
    },

    updateTodo: async (id: EntityId, data: TodoUpdate) => {
      const existing = await db.todos.get(id)
      if (!existing) return notFoundTodo()
      const updated = { ...existing, ...data, updatedAt: nowISO() }
      await db.todos.put(updated)
      return { ok: true, data: updated }
    },

    deleteTodo: async (id: EntityId): Promise<RepoResult<undefined>> => {
      const existing = await db.todos.get(id)
      if (!existing) return notFoundUndefined()
      await db.todos.delete(id)
      return { ok: true, data: undefined }
    },
  }
}

let instance: NotesRepository | null = null

export const getNotesRepository = (): NotesRepository => {
  if (!instance) instance = createNotesRepository()
  return instance
}
