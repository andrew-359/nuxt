/**
 * Composable for ModalRoot: store + handlers. Конфиг, title, description — в ModalRoot.
 */
import { computed } from 'vue'

export function useModalRoot() {
  const store = useModalStore()

  const isOpen = computed({
    get: () =>
      store.isOpen &&
      (store.overlayType === 'confirm' || store.overlayType === 'modal'),
    set: (v) => {
      if (!v) store.close()
    },
  })

  async function onConfirm() {
    const p = store.payload as { onConfirm?: () => void | Promise<void> } | null
    if (p && 'onConfirm' in p && p.onConfirm) await p.onConfirm()
    store.close()
  }

  function close() {
    store.close()
  }

  return {
    store,
    isOpen,
    onConfirm,
    close,
  }
}
