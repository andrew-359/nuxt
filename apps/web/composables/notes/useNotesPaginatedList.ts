/**
 * Пагинация, фильтр и сортировка списка заметок.
 * Загрузка, watchers, clamping страницы. useNotesPage использует этот хук и добавляет UI-логику.
 */
import type { SortBy, SortDir } from "@todo/domain";
import { DEFAULT_USER_SETTINGS } from "@todo/domain";
import {
  PREVIEW_COUNT as CONFIG_PREVIEW_COUNT,
  STATE_KEY_NOTES_LIST_PAGE,
} from "~/config/constants";
import {
  getExtraMatchTodo as getExtraMatchTodoFn,
  type TodoForFilter,
} from "~/lib/notes-filter";
import { normalizeSearchQuery } from "~/utils/string";

const PAGE_SIZE = 9;

export const NOTES_PAGE_SIZE = PAGE_SIZE;

export function useNotesPaginatedList() {
  const settingsStore = useSettingsStore();
  const notesStore = useNotesStore();
  const modalStore = useModalStore();

  const loading = ref(true);
  const filterText = ref("");
  const page = useState(STATE_KEY_NOTES_LIST_PAGE, () => 1);

  const activeAccountId = computed(() => settingsStore.activeAccountId);
  const settings = computed(() => {
    const id = activeAccountId.value;
    return id ? settingsStore.getSettingsSync(id) : DEFAULT_USER_SETTINGS;
  });

  const paginatedResult = computed(() => notesStore.paginatedResult);
  const paginatedNotes = computed(() => paginatedResult.value?.items ?? []);
  const totalNotes = computed(() => paginatedResult.value?.totalCount ?? 0);
  const totalPages = computed(() => paginatedResult.value?.totalPages ?? 1);

  function previewTodos(noteId: string): TodoForFilter[] {
    const todos = paginatedResult.value?.todosByNoteId[noteId] ?? [];
    return CONFIG_PREVIEW_COUNT <= 0
      ? []
      : todos.slice(0, CONFIG_PREVIEW_COUNT).map((t) => ({
          id: t.id,
          text: t.text ?? "",
          completed: t.completed,
        }));
  }

  function getExtraMatchTodo(noteId: string): TodoForFilter | null {
    const q = normalizeSearchQuery(filterText.value);
    const all = paginatedResult.value?.todosByNoteId[noteId] ?? [];
    return getExtraMatchTodoFn(
      all.map((t) => ({
        id: t.id,
        text: t.text ?? "",
        completed: t.completed,
      })),
      q,
      CONFIG_PREVIEW_COUNT,
    );
  }

  async function loadNotesPage() {
    const id = activeAccountId.value;
    if (!id) return;
    await notesStore.loadNotesPaginated({
      accountId: id,
      filterQuery: filterText.value,
      sortBy: settings.value.sortBy,
      sortDir: settings.value.sortDir,
      page: page.value,
      pageSize: PAGE_SIZE,
    });
  }

  async function ensureData() {
    const id = activeAccountId.value;
    if (!id) {
      loading.value = false;
      return;
    }
    loading.value = true;
    try {
      await settingsStore.getSettings(id);
      await loadNotesPage();
    } finally {
      loading.value = false;
    }
  }

  function setSortBy(value: SortBy) {
    const id = activeAccountId.value;
    if (id) settingsStore.setSettings(id, { sortBy: value });
    page.value = 1;
  }
  function setSortDir(value: SortDir) {
    const id = activeAccountId.value;
    if (id) settingsStore.setSettings(id, { sortDir: value });
    page.value = 1;
  }
  function setFilterText(value: string) {
    filterText.value = value;
    page.value = 1;
  }

  watch([() => settings.value.sortBy, () => settings.value.sortDir], () => {
    page.value = 1;
  });
  watch(page, (p) => {
    const max = totalPages.value;
    if (max > 0 && p > max) page.value = max;
  });
  watch(
    [filterText, page, () => settings.value.sortBy, () => settings.value.sortDir],
    () => {
      if (activeAccountId.value && !loading.value) loadNotesPage();
    },
  );
  onMounted(() => ensureData());
  watch(activeAccountId, (id) => {
    if (id) ensureData();
  });
  watch(
    () => modalStore.key,
    (key, prev) => {
      if (prev != null && key === null && activeAccountId.value) loadNotesPage();
    },
  );

  return {
    loading,
    page,
    filterText,
    setFilterText,
    setSortBy,
    setSortDir,
    settings,
    activeAccountId,
    paginatedResult,
    paginatedNotes,
    totalNotes,
    totalPages,
    pageSize: PAGE_SIZE,
    previewTodos,
    getExtraMatchTodo,
    normalizedFilterQuery: computed(() => normalizeSearchQuery(filterText.value)),
  };
}
