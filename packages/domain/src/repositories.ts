/**
 * Repository interfaces (contracts).
 * Implementations live in packages/storage.
 */

import type {
  Account,
  AccountCreate,
  EntityId,
  Note,
  NoteCreate,
  NoteUpdate,
  Todo,
  TodoCreate,
  TodoUpdate,
} from './types'
import type { UserSettings } from './settings'

/**
 * Discriminated union for repository operations that can fail.
 * Use `result.ok` to narrow: `result.ok ? result.data : result.error`
 */
export type RepoResult<T, E = RepoError> =
  | { readonly ok: true; readonly data: T }
  | { readonly ok: false; readonly error: E }

export const RepoErrorCode = {
  NotFound: 'NOT_FOUND',
  Conflict: 'CONFLICT',
  Invalid: 'INVALID',
  Unknown: 'UNKNOWN',
} as const

export type RepoErrorCodeType = (typeof RepoErrorCode)[keyof typeof RepoErrorCode]

export interface RepoError {
  readonly code: RepoErrorCodeType
  readonly message: string
}

/** Account CRUD — IndexedDB table `accounts` */
export interface AccountRepository {
  getAll(): Promise<Account[]>
  getById(id: EntityId): Promise<RepoResult<Account>>
  create(data: AccountCreate): Promise<Account>
  update(id: EntityId, data: Partial<Pick<Account, 'name'>>): Promise<RepoResult<Account>>
  delete(id: EntityId): Promise<RepoResult<undefined>>
}

/** Notes + Todos — IndexedDB tables `notes`, `todos`; saveNoteWithTodos runs in one transaction */
export interface NotesRepository {
  getByAccountId(accountId: EntityId): Promise<Note[]>
  getById(id: EntityId): Promise<RepoResult<Note>>
  getTodosByNoteId(noteId: EntityId): Promise<Todo[]>
  getTodosByAccountId(accountId: EntityId): Promise<Todo[]>
  /** Save note and optionally replace its todos in one transaction */
  saveNoteWithTodos(
    note: NoteCreate | Note,
    todos?: Array<TodoCreate | Todo | (Todo & TodoUpdate)>
  ): Promise<Note>
  updateNote(id: EntityId, data: NoteUpdate): Promise<RepoResult<Note>>
  deleteNote(id: EntityId): Promise<RepoResult<undefined>>
  addTodo(data: TodoCreate): Promise<Todo>
  updateTodo(id: EntityId, data: TodoUpdate): Promise<RepoResult<Todo>>
  deleteTodo(id: EntityId): Promise<RepoResult<undefined>>
}

/** Active account + per-account UI settings — localStorage keys `activeAccountId`, `settings:<id>` */
export interface SettingsRepository {
  getActiveAccountId(): Promise<EntityId | null>
  setActiveAccountId(id: EntityId | null): Promise<void>
  getSettings(accountId: EntityId): Promise<UserSettings>
  setSettings(accountId: EntityId, settings: Partial<UserSettings>): Promise<void>
}
