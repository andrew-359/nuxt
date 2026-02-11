/**
 * Keys for overlay: confirms and modals.
 * Single source for store and configs; no dependency on stores.
 * Types ConfirmKey, ModalKey, OverlayKey — в ~/types (types/overlay.ts).
 */

export const ConfirmKeys = {
  deleteNote: 'delete-note',
  deleteAccount: 'delete-account',
  cancelEdit: 'cancel-edit',
} as const

export const ModalKeys = {
  createAccount: 'create-account',
} as const
