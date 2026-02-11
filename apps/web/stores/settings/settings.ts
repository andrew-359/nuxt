/**
 * Settings store. Persists via api (facade over localStorage).
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { normalizeUserSettings, type EntityId, type UserSettings } from '@todo/domain'
import { api } from '~/api'
import { STORE_SETTINGS } from '~/config/stores'

export const useSettingsStore = defineStore(STORE_SETTINGS, () => {
  const activeAccountId = ref<EntityId | null>(null)
  const settingsByAccount = ref<Record<string, Partial<UserSettings>>>({})

  const getSettings = async (accountId: EntityId): Promise<UserSettings> => {
    const s = await api.settings.getSettings(accountId)
    settingsByAccount.value[accountId] = s
    return s
  }

  const getSettingsSync = (accountId: EntityId): UserSettings =>
    normalizeUserSettings(settingsByAccount.value[accountId] ?? {})

  const setActiveAccountId = async (id: EntityId | null) => {
    await api.settings.setActiveAccountId(id)
    activeAccountId.value = id
  }

  const setActiveAccountIdSync = (id: EntityId | null) => {
    activeAccountId.value = id
  }

  const setSettings = async (accountId: EntityId, partial: Partial<UserSettings>) => {
    settingsByAccount.value[accountId] = {
      ...settingsByAccount.value[accountId],
      ...partial,
    }
    await api.settings.setSettings(accountId, partial)
  }

  return {
    activeAccountId,
    settingsByAccount,
    getSettings,
    getSettingsSync,
    setActiveAccountId,
    setActiveAccountIdSync,
    setSettings,
  }
})
