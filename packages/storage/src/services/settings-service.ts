/**
 * Settings service: wrapper over localStorage.
 * Keys: activeAccountId, settings:<accountId>. No DB layer.
 */
import type { EntityId, UserSettings } from '@todo/domain'
import {
  DEFAULT_USER_SETTINGS,
  normalizeUserSettings,
} from '@todo/domain'

const KEY_ACTIVE = 'activeAccountId'
const KEY_SETTINGS_PREFIX = 'settings:'

const getSettingsKey = (accountId: EntityId) => `${KEY_SETTINGS_PREFIX}${accountId}`

function getItem(key: string): string | null {
  if (typeof localStorage === 'undefined') return null
  return localStorage.getItem(key)
}

function setItem(key: string, value: string): void {
  if (typeof localStorage === 'undefined') return
  localStorage.setItem(key, value)
}

export function getSettingsService() {
  return {
    getActiveAccountId: async (): Promise<EntityId | null> => {
      const raw = getItem(KEY_ACTIVE)
      return raw === null || raw === '' ? null : raw
    },

    setActiveAccountId: async (id: EntityId | null): Promise<void> => {
      if (id === null) setItem(KEY_ACTIVE, '')
      else setItem(KEY_ACTIVE, id)
    },

    getSettings: async (accountId: EntityId): Promise<UserSettings> => {
      const raw = getItem(getSettingsKey(accountId))
      if (!raw) return { ...DEFAULT_USER_SETTINGS }
      try {
        const partial = JSON.parse(raw) as Partial<UserSettings>
        return normalizeUserSettings(partial)
      } catch {
        return { ...DEFAULT_USER_SETTINGS }
      }
    },

    setSettings: async (accountId: EntityId, partial: Partial<UserSettings>): Promise<void> => {
      const raw = getItem(getSettingsKey(accountId))
      const current = raw
        ? normalizeUserSettings(JSON.parse(raw) as Partial<UserSettings>)
        : { ...DEFAULT_USER_SETTINGS }
      const next = normalizeUserSettings({ ...current, ...partial })
      setItem(getSettingsKey(accountId), JSON.stringify(next))
    },
  }
}
