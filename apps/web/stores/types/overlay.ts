/**
 * Types for overlay (modal/confirm) store.
 */
import type { OverlayKey } from '~/types'

export interface ModalState {
  isOpen: boolean
  overlayType: 'confirm' | 'modal' | null
  key: OverlayKey | null
  payload: unknown
}

