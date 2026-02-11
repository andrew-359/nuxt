/**
 * Settings API facade. Stores use this; calls @todo/storage settings service (API → service → repo).
 */
import type { EntityId, UserSettings } from '@todo/domain'
import { getSettingsService } from '@todo/storage'

export function getSettingsApi() {
  const service = getSettingsService()
  return {
    getActiveAccountId: () => service.getActiveAccountId(),
    setActiveAccountId: (id: EntityId | null) => service.setActiveAccountId(id),
    getSettings: (accountId: EntityId) => service.getSettings(accountId),
    setSettings: (accountId: EntityId, settings: Partial<UserSettings>) =>
      service.setSettings(accountId, settings),
  }
}
