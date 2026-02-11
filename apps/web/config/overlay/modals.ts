/**
 * Modals: config = strings + component for body.
 */
import { defineAsyncComponent } from 'vue'
import type { ModalConfigEntry, ModalKey } from '~/types'
import type { Copy } from '~/config/copy'

export function getModalsConfig(copy: Copy): Record<ModalKey, ModalConfigEntry> {
  return {
    'create-account': {
      title: copy.account.createAccount,
      description: copy.forms.createAccount.description,
      component: defineAsyncComponent(
        () => import('~/components/account/CreateAccountFormContent.vue')
      ),
      /** Крестик и закрытие по клику по оверлею */
      closable: true,
    },
  }
}
