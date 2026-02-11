/**
 * Notes store. Persists via api (facade over IndexedDB).
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type {
  EntityId,
  Note,
  NotesPageResult,
  NotesQueryParams,
  Todo,
  TodoCreate,
  TodoUpdate,
} from '@todo/domain'
import { nowISO, sortByOrder } from '@todo/domain'
import { api } from '~/api'
import { STORE_NOTES } from '~/config/stores'

export const useNotesStore = defineStore(STORE_NOTES, () => {
  const notes = ref<Note[]>([])
  const todos = ref<Todo[]>([])
  const paginatedResult = ref<NotesPageResult | null>(null)

  const getByAccountId = (accountId: EntityId): Note[] =>
    notes.value.filter((n) => n.accountId === accountId)

  const getById = (id: EntityId): Note | undefined =>
    notes.value.find((n) => n.id === id)

  const getTodosByNoteId = (noteId: EntityId): Todo[] =>
    sortByOrder(todos.value.filter((t) => t.noteId === noteId))

  const loadNotesPaginated = async (params: NotesQueryParams): Promise<void> => {
    paginatedResult.value = await api.notes.getNotesPaginated(params)
  }

  /** Load notes and all their todos for an account via api */
  const loadNotesForAccount = async (accountId: EntityId): Promise<void> => {
    const [notesList, todosList] = await Promise.all([
      api.notes.getByAccountId(accountId),
      api.notes.getTodosByAccountId(accountId),
    ])
    notes.value = notesList
    todos.value = todosList
  }

  /** Ensure a single note and its todos are in store (e.g. after direct link or refresh) */
  const loadNoteWithTodos = async (noteId: EntityId): Promise<Note | null> => {
    const result = await api.notes.getById(noteId)
    if (!result.ok) return null
    const note = result.data
    const existing = notes.value.find((n) => n.id === noteId)
    if (existing) {
      notes.value = notes.value.map((n) => (n.id === noteId ? note : n))
    } else {
      notes.value = [...notes.value.filter((n) => n.accountId !== note.accountId), note]
    }
    const noteTodos = await api.notes.getTodosByNoteId(noteId)
    todos.value = [
      ...todos.value.filter((t) => t.noteId !== noteId),
      ...noteTodos,
    ]
    return note
  }

  const createEmptyNote = async (accountId: EntityId, noteId: EntityId): Promise<Note> => {
    const now = nowISO()
    const notePayload: Note = {
      id: noteId,
      accountId,
      title: '',
      createdAt: now,
      updatedAt: now,
    }
    const note = await api.notes.saveNoteWithTodos(notePayload, [])
    notes.value = [...notes.value, note]
    return note
  }

  const saveNoteWithTodos = async (
    note: Note,
    todosList: Array<Todo | (Todo & TodoUpdate)>
  ): Promise<Note> => {
    const saved = await api.notes.saveNoteWithTodos(note, todosList)
    const savedTodos = await api.notes.getTodosByNoteId(saved.id)
    notes.value = notes.value.map((n) => (n.id === saved.id ? saved : n))
    todos.value = [...todos.value.filter((t) => t.noteId !== saved.id), ...savedTodos]
    return saved
  }

  const updateNoteTitle = async (id: EntityId, title: string): Promise<boolean> => {
    const result = await api.notes.updateNote(id, { title })
    if (!result.ok) return false
    notes.value = notes.value.map((n) => (n.id === id ? result.data : n))
    return true
  }

  const addTodoToNote = async (data: TodoCreate): Promise<Todo | null> => {
    const todo = await api.notes.addTodo(data)
    todos.value = [...todos.value, todo]
    return todo
  }

  const updateTodoItem = async (id: EntityId, data: TodoUpdate): Promise<boolean> => {
    const result = await api.notes.updateTodo(id, data)
    if (!result.ok) return false
    todos.value = todos.value.map((t) => (t.id === id ? result.data : t))
    return true
  }

  const removeTodoItem = async (id: EntityId): Promise<boolean> => {
    const result = await api.notes.deleteTodo(id)
    if (!result.ok) return false
    todos.value = todos.value.filter((t) => t.id !== id)
    return true
  }

  const removeNote = async (id: EntityId): Promise<boolean> => {
    const result = await api.notes.deleteNote(id)
    if (!result.ok) return false
    notes.value = notes.value.filter((n) => n.id !== id)
    todos.value = todos.value.filter((t) => t.noteId !== id)
    return true
  }

  return {
    notes,
    todos,
    paginatedResult,
    getByAccountId,
    getById,
    getTodosByNoteId,
    loadNotesPaginated,
    loadNotesForAccount,
    loadNoteWithTodos,
    createEmptyNote,
    saveNoteWithTodos,
    updateNoteTitle,
    addTodoToNote,
    updateTodoItem,
    removeTodoItem,
    removeNote,
  }
})
