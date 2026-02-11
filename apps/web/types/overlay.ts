/**
 * Overlay types: keys, modals, confirms, payloads per key.
 */
import type { Component } from 'vue'
import type { ConfirmKeys, ModalKeys } from '~/config/overlay/keys'

export type ConfirmKey = (typeof ConfirmKeys)[keyof typeof ConfirmKeys]
export type ModalKey = (typeof ModalKeys)[keyof typeof ModalKeys]
export type OverlayKey = ConfirmKey | ModalKey

/** Payload для confirm «Удалить заметку». */
export type DeleteNotePayload = {
  note: { id: string; title: string }
  onConfirm?: () => void | Promise<void>
}

/** Payload для confirm «Удалить аккаунт». */
export type DeleteAccountPayload = {
  accountId?: string
  accountName?: string
  onConfirm?: () => void | Promise<void>
}

/** Payload для confirm «Отменить правки». */
export type CancelEditPayload = {
  onConfirm?: () => void | Promise<void>
}

export type ConfirmPayloadMap = {
  'delete-note': DeleteNotePayload
  'delete-account': DeleteAccountPayload
  'cancel-edit': CancelEditPayload
}

export type ModalPayloadMap = {
  'create-account': Record<string, never>
}

export type OverlayPayload = ConfirmPayloadMap[ConfirmKey] | ModalPayloadMap[ModalKey]

export type ModalConfigEntry = {
  title: string
  description?: string
  component: Component
  /** Закрытие по крестику и клику по оверлею (по умолчанию true). */
  closable?: boolean
}

export type ConfirmConfigEntry = {
  title: string | ((payload: unknown) => string)
  description: string
  cancelLabel: string
  confirmLabel: string
  confirmVariant?: 'primary' | 'danger'
}
