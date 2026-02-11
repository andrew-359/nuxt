/**
 * Overlay store (bus): which overlay is open and its payload.
 * openConfirm / openModal — типизация по ключу через overloads.
 */
import type {
  ConfirmKey,
  ModalKey,
  ConfirmPayloadMap,
  ModalPayloadMap,
  OverlayPayload,
} from '~/types'
import { STORE_MODAL } from '~/config/stores'

export const useModalStore = defineStore(STORE_MODAL, () => {
  const isOpen = ref(false)
  const overlayType = ref<'confirm' | 'modal' | null>(null)
  const key = ref<ConfirmKey | ModalKey | null>(null)
  const payload = ref<OverlayPayload | null>(null)

  function openConfirm<K extends ConfirmKey>(
    confirmKey: K,
    overlayPayload?: ConfirmPayloadMap[K],
  ): void {
    overlayType.value = 'confirm'
    key.value = confirmKey
    payload.value = overlayPayload ?? null
    isOpen.value = true
  }

  function openModal<K extends ModalKey>(
    modalKey: K,
    overlayPayload?: ModalPayloadMap[K],
  ): void {
    overlayType.value = 'modal'
    key.value = modalKey
    payload.value = overlayPayload ?? null
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
    overlayType.value = null
    key.value = null
    payload.value = null
  }

  return {
    isOpen,
    overlayType,
    key,
    payload,
    openConfirm,
    openModal,
    close,
  }
})

export type { ModalState } from '~/stores/types'
