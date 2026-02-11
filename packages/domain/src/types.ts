/**
 * Domain entities and core types.
 * No storage — pure data shapes. Use for API contracts and persistence.
 */

export type EntityId = string

/** ISO 8601 date string (e.g. from Date.prototype.toISOString()) */
export type IsoDate = string

/** Local account — data isolated by accountId everywhere */
export interface Account {
  id: EntityId
  name: string
  createdAt: IsoDate
  updatedAt: IsoDate
}

/** Note — belongs to one account; has many Todo */
export interface Note {
  id: EntityId
  accountId: EntityId
  title: string
  createdAt: IsoDate
  updatedAt: IsoDate
}

/** Todo item — belongs to one Note and one Account */
export interface Todo {
  id: EntityId
  noteId: EntityId
  accountId: EntityId
  text: string
  completed: boolean
  order: number
  createdAt: IsoDate
  updatedAt: IsoDate
}

/** Payload for creating an account (id and timestamps set by repo) */
export type AccountCreate = Pick<Account, 'name'>

/** Payload for creating a note (id, accountId, timestamps set by repo) */
export type NoteCreate = Pick<Note, 'title'>

/** Payload for creating a todo */
export type TodoCreate = Pick<Todo, 'noteId' | 'accountId' | 'text'> &
  Partial<Pick<Todo, 'completed' | 'order'>>

/** Partial update for note (e.g. title only) */
export type NoteUpdate = Partial<Pick<Note, 'title'>>

/** Partial update for todo */
export type TodoUpdate = Partial<Pick<Todo, 'text' | 'completed' | 'order'>>
