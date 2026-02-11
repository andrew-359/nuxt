/**
 * Общий хук удаления заметки: openConfirm, removeNote, toast, опционально navigate.
 * Используется в useNotesPage (без перехода) и useNoteEditor (с переходом в список).
 */
import { ConfirmKeys } from "~/config/overlay/keys";
import { routeToNotes } from "~/config/routes";

export function useDeleteNoteConfirm(opts?: { navigateAfter?: boolean }) {
  const notesStore = useNotesStore();
  const modalStore = useModalStore();
  const toaster = useToaster();
  const copy = useCopy();
  const navigateAfter = opts?.navigateAfter ?? false;

  function openDeleteModal(note: { id: string; title: string }) {
    modalStore.openConfirm(ConfirmKeys.deleteNote, {
      note: { id: note.id, title: note.title },
      onConfirm: async () => {
        await notesStore.removeNote(note.id);
        toaster.success(copy.value.toasts.noteDeleted);
        if (navigateAfter) await navigateTo(routeToNotes());
      },
    });
  }

  return { openDeleteModal };
}
