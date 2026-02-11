/**
 * Composable for the note editor page: load/save note, local state, undo/redo, modals.
 * Page and NoteEditorToolbar use the same instance via provide/inject; no props/emits for toolbar.
 */
import type { InjectionKey } from "vue";
import { ref, computed, watch, onMounted, onUnmounted, reactive } from "vue";
import type { Note, Todo } from "@todo/domain";
import { deepEqual, generateId, sortByOrder } from "@todo/domain";
import { NEW_TODO_KEY_PREFIX } from "~/config/constants";
import { routeToNotes } from "~/config/routes";
import type { TodoRow } from "~/composables/notes/types";
import { useDeleteNoteConfirm } from "~/composables/notes/useDeleteNoteConfirm";
import { useNoteEditorModals } from "~/composables/notes/useNoteEditorModals";
import { useNoteUndoRedo } from "~/composables/notes/useNoteUndoRedo";

export type { TodoRow } from "./types";

export function useNoteEditor() {
  const route = useRoute();
  const settingsStore = useSettingsStore();
  const notesStore = useNotesStore();

  const noteId = computed(() => route.params.id as string);
  const activeAccountId = computed(() => settingsStore.activeAccountId);

  const loading = ref(true);
  const note = ref<Note | null>(null);
  const localTitle = ref("");
  const localTodos = ref<TodoRow[]>([]);
  const savedSnapshot = ref<{ title: string; todos: TodoRow[] } | null>(null);

  const undoRedo = useNoteUndoRedo(localTitle, localTodos);

  const dirty = computed(() => {
    if (!savedSnapshot.value) return false;
    const sameTitle = localTitle.value === savedSnapshot.value.title;
    const sameTodos = deepEqual(
      localTodos.value.map((t) => ({
        text: t.text,
        completed: t.completed,
        order: t.order,
      })),
      savedSnapshot.value.todos.map((t) => ({
        text: t.text,
        completed: t.completed,
        order: t.order,
      })),
    );
    return !sameTitle || !sameTodos;
  });

  function takeSnapshot() {
    savedSnapshot.value = {
      title: localTitle.value,
      todos: localTodos.value.map((t) => ({ ...t })),
    };
  }

  function setTodoAt(index: number, value: TodoRow) {
    const prev = localTodos.value[index];
    const changed =
      prev?.text !== value.text ||
      prev?.completed !== value.completed ||
      prev?.order !== value.order;
    if (changed) undoRedo.pushState();
    const next = [...localTodos.value];
    next[index] = value;
    localTodos.value = next;
  }

  function mapToTodo(t: TodoRow, order: number): Todo {
    const n = note.value!;
    return {
      id: t.id,
      noteId: n.id,
      accountId: n.accountId,
      text: t.text,
      completed: t.completed,
      order,
      createdAt: n.createdAt,
      updatedAt: n.updatedAt,
    };
  }

  async function loadNote() {
    loading.value = true;
    note.value = null;
    try {
      const accountId = activeAccountId.value;
      if (!accountId) return;
      let loaded = await notesStore.loadNoteWithTodos(noteId.value);
      loaded ??= await notesStore.createEmptyNote(accountId, noteId.value);
      if (loaded.accountId !== accountId) {
        await navigateTo(routeToNotes());
        return;
      }
      note.value = loaded;
      const todos = notesStore.getTodosByNoteId(loaded.id);
      localTitle.value = loaded.title;
      const sorted = sortByOrder([...todos]);
      localTodos.value = sorted.map((t) => ({
        id: t.id,
        text: t.text,
        completed: t.completed,
        order: t.order,
      }));
      takeSnapshot();
      undoRedo.clearHistory();
    } finally {
      loading.value = false;
    }
  }

  async function save() {
    if (!note.value || !dirty.value) return;
    const todosToSave = localTodos.value.map((t, i) => mapToTodo(t, i));
    await notesStore.saveNoteWithTodos(
      { ...note.value, title: localTitle.value },
      todosToSave,
    );
    takeSnapshot();
    undoRedo.clearHistory();
  }

  function addTodo() {
    undoRedo.pushState();
    const order = localTodos.value.length;
    localTodos.value = [
      ...localTodos.value,
      { id: generateId(), text: "", completed: false, order },
    ];
  }

  function removeTodoAt(index: number) {
    undoRedo.pushState();
    const next = localTodos.value.filter((_, i) => i !== index);
    localTodos.value = next.map((t, i) => ({ ...t, order: i }));
  }

  function restoreFromSnapshot() {
    if (savedSnapshot.value) {
      localTitle.value = savedSnapshot.value.title;
      localTodos.value = savedSnapshot.value.todos.map((t) => ({ ...t }));
    }
  }

  const { openCancelModal, openBackToListModal } = useNoteEditorModals(
    restoreFromSnapshot,
    dirty,
  );

  const { openDeleteModal: openDeleteNoteConfirm } = useDeleteNoteConfirm({
    navigateAfter: true,
  });
  function openDeleteModal() {
    const n = note.value;
    if (!n) return;
    openDeleteNoteConfirm({ id: n.id, title: n.title });
  }

  function onEditorKeydown(e: KeyboardEvent) {
    undoRedo.handleKeydown(e);
  }

  onMounted(() => {
    loadNote();
    document.addEventListener("keydown", onEditorKeydown, true);
  });
  onUnmounted(() => {
    document.removeEventListener("keydown", onEditorKeydown, true);
  });
  watch(noteId, () => loadNote());

  const state = reactive({
    get loading() {
      return loading.value;
    },
    get note() {
      return note.value;
    },
    get dirty() {
      return dirty.value;
    },
    get localTitle() {
      return localTitle.value;
    },
    set localTitle(v: string) {
      if (v !== localTitle.value) undoRedo.pushState();
      localTitle.value = v;
    },
    get localTodos() {
      return localTodos.value;
    },
    undoRedo,
    NEW_TODO_KEY_PREFIX,
    setTodoAt,
    removeTodoAt,
    addTodo,
    save,
    openCancelModal,
    openBackToListModal,
    openDeleteModal,
    pushState: () => undoRedo.pushState(),
  });
  return state;
}

export const NOTE_EDITOR_KEY = Symbol("noteEditor") as InjectionKey<
  ReturnType<typeof useNoteEditor>
>;
