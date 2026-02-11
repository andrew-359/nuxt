/**
 * Модалки редактора: отмена правок (cancel) и возврат в список с отменой (back to list).
 * Восстановление из снапшота, опционально toast и navigate.
 */
import type { Ref } from "vue";
import { ConfirmKeys } from "~/config/overlay/keys";
import { routeToNotes } from "~/config/routes";

export function useNoteEditorModals(
  restore: () => void,
  dirty: Ref<boolean> | { value: boolean },
) {
  const modalStore = useModalStore();
  const toaster = useToaster();
  const copy = useCopy();

  function openCancelModal() {
    if (!dirty.value) return;
    modalStore.openConfirm(ConfirmKeys.cancelEdit, {
      onConfirm: restore,
    });
  }

  function openBackToListModal() {
    if (!dirty.value) {
      navigateTo(routeToNotes());
      return;
    }
    modalStore.openConfirm(ConfirmKeys.cancelEdit, {
      onConfirm: () => {
        restore();
        toaster.info(copy.value.toasts.changesDiscarded);
        navigateTo(routeToNotes());
      },
    });
  }

  return { openCancelModal, openBackToListModal };
}
