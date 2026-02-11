import type { AccountRepository, RepoResult } from '@todo/domain'
import { RepoErrorCode } from '@todo/domain'
import type { Account, AccountCreate, EntityId } from '@todo/domain'
import { generateId, nowISO } from '@todo/domain'
import { getDb } from './db'

const notFound = (): RepoResult<never> => ({
  ok: false,
  error: { code: RepoErrorCode.NotFound, message: 'Account not found' },
})

export const createAccountRepository = (): AccountRepository => {
  const db = getDb()

  return {
    getAll: () => db.accounts.toArray(),

    getById: async (id: EntityId) => {
      const account = await db.accounts.get(id)
      if (!account) return notFound()
      return { ok: true, data: account }
    },

    create: async (data: AccountCreate) => {
      const now = nowISO()
      const account: Account = {
        id: generateId(),
        name: data.name,
        createdAt: now,
        updatedAt: now,
      }
      await db.accounts.add(account)
      return account
    },

    update: async (id: EntityId, data: Partial<Pick<Account, 'name'>>) => {
      const existing = await db.accounts.get(id)
      if (!existing) return notFound()
      const updated: Account = {
        ...existing,
        ...data,
        updatedAt: nowISO(),
      }
      await db.accounts.put(updated)
      return { ok: true, data: updated }
    },

    delete: async (id: EntityId) => {
      const existing = await db.accounts.get(id)
      if (!existing) return notFound()
      await db.accounts.delete(id)
      return { ok: true, data: undefined }
    },
  }
}

let instance: AccountRepository | null = null

export const getAccountRepository = (): AccountRepository => {
  if (!instance) instance = createAccountRepository()
  return instance
}
