/**
 * Accounts API facade. Stores use this; calls @todo/storage accounts service (API → service → repo).
 */
import type { Account, AccountCreate, EntityId } from '@todo/domain'
import { getAccountsService } from '@todo/storage'

export function getAccountsApi() {
  const service = getAccountsService()
  return {
    getAll: (): Promise<Account[]> => service.getAll(),
    getById: (id: EntityId) => service.getById(id),
    create: (data: AccountCreate) => service.create(data),
    update: (id: EntityId, data: Partial<Pick<Account, 'name'>>) => service.update(id, data),
    delete: (id: EntityId) => service.delete(id),
  }
}
