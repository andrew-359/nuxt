/**
 * Accounts service. All account access goes through this layer.
 * Delegates to AccountRepository.
 */
import type { Account, AccountCreate, EntityId } from '@todo/domain'
import { getAccountRepository } from '../account-repository'

export function getAccountsService() {
  const repo = getAccountRepository()
  return {
    getAll: () => repo.getAll(),
    getById: (id: EntityId) => repo.getById(id),
    create: (data: AccountCreate) => repo.create(data),
    update: (id: EntityId, data: Partial<Pick<Account, 'name'>>) => repo.update(id, data),
    delete: (id: EntityId) => repo.delete(id),
  }
}
