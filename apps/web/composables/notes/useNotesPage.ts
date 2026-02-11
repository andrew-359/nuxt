/**
 * Composable for the notes list page (index).
 * Composes useNotesPaginatedList with createNote, openDeleteModal, listView, emptyMessage, sortByItems.
 */
import type { Note, UserSettings } from "@todo/domain";
import { generateId } from "@todo/domain";
import {
  getNotesListView,
  type NotesListView,
} from "~/config/notes/notes-list";
import { routeToNote } from "~/config/routes";
import { useDeleteNoteConfirm } from "~/composables/notes/useDeleteNoteConfirm";
import { useNotesPaginatedList } from "~/composables/notes/useNotesPaginatedList";
import { useSettingsConfig } from "~/composables/i18n";

export function useNotesPage() {
  const list = useNotesPaginatedList();
  const settingsConfig = useSettingsConfig();
  const copy = useCopy();
  const { openDeleteModal } = useDeleteNoteConfirm({ navigateAfter: false });

  function createNote() {
    const id = list.activeAccountId.value;
    if (!id) return;
    const noteId = generateId();
    navigateTo(routeToNote(noteId));
  }

  const isEmpty = computed(() => list.totalNotes.value === 0);
  const listView = computed<NotesListView>(() =>
    getNotesListView({
      loading: list.loading.value,
      isEmpty: isEmpty.value,
    }),
  );
  const emptyMessage = computed(() =>
    list.normalizedFilterQuery.value
      ? copy.value.notesList.noResultsForFilter
      : copy.value.notesList.empty,
  );
  const sortByItems = computed(() =>
    (["updatedAt", "createdAt", "title"] as const).map((v) => ({
      label: settingsConfig.value.optionLabels.sortBy[v],
      value: v,
    })),
  );

  return reactive({
    get loading(): boolean {
      return list.loading.value;
    },
    get settings(): UserSettings {
      return list.settings.value;
    },
    get filterText(): string {
      return list.filterText.value;
    },
    set filterText(v: string) {
      list.setFilterText(v);
    },
    get normalizedFilterQuery(): string {
      return list.normalizedFilterQuery.value;
    },
    setFilterText: list.setFilterText,
    get page(): number {
      return list.page.value;
    },
    set page(v: number) {
      list.page.value = v;
    },
    get pageSize(): number {
      return list.pageSize;
    },
    get paginatedNotes(): Note[] {
      return list.paginatedNotes.value;
    },
    get totalNotes(): number {
      return list.totalNotes.value;
    },
    get totalPages(): number {
      return list.totalPages.value;
    },
    get sortByItems(): Array<{ label: string; value: string }> {
      return sortByItems.value;
    },
    get isEmpty() {
      return isEmpty.value;
    },
    get listView() {
      return listView.value;
    },
    get emptyMessage() {
      return emptyMessage.value;
    },
    previewTodos: list.previewTodos,
    getExtraMatchTodo: list.getExtraMatchTodo,
    createNote,
    openDeleteModal,
    setSortBy: list.setSortBy,
    setSortDir: list.setSortDir,
  });
}
