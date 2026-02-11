/**
 * Account store. Persists via api (facade over IndexedDB).
 */
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Account, AccountCreate, EntityId } from '@todo/domain'
import { api } from '~/api'
import { STORE_ACCOUNT } from '~/config/stores'

export const useAccountStore = defineStore(STORE_ACCOUNT, () => {
  const accounts = ref<Account[]>([])

  const hasAccounts = computed(() => accounts.value.length > 0)

  const getById = (id: EntityId): Account | undefined =>
    accounts.value.find((a) => a.id === id)

  const setAccounts = (list: Account[]) => {
    accounts.value = list
  }

  const addAccount = async (data: AccountCreate): Promise<Account> => {
    const account = await api.accounts.create(data)
    accounts.value.push(account)
    return account
  }

  const removeAccount = async (id: EntityId): Promise<boolean> => {
    const result = await api.accounts.delete(id)
    if (!result.ok) return false
    accounts.value = accounts.value.filter((a) => a.id !== id)
    return true
  }

  return {
    accounts,
    hasAccounts,
    getById,
    setAccounts,
    addAccount,
    removeAccount,
  }
})
