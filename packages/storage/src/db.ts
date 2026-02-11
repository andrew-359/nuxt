/**
 * IndexedDB via Dexie.
 * Schema: accounts, notes, todos. Indexes for accountId, noteId.
 */
import Dexie from 'dexie'
import type { Account, Note, Todo } from '@todo/domain'

export class TodoDb extends Dexie {
  accounts!: Dexie.Table<Account, string>
  notes!: Dexie.Table<Note, string>
  todos!: Dexie.Table<Todo, string>

  constructor() {
    super('TodoDb')
    this.version(1).stores({
      accounts: 'id',
      notes: 'id, accountId',
      todos: 'id, noteId, accountId',
    })
  }
}

let dbInstance: TodoDb | null = null

export const getDb = (): TodoDb => {
  if (!dbInstance) dbInstance = new TodoDb()
  return dbInstance
}
