/**
 * Undo/redo для редактора заметки: стеки past/future, pushState перед правкой, Ctrl+Z / Ctrl+Shift+Z.
 * Чистая логика — в lib/note-editor-undo.
 */
import { computed, ref, type Ref } from "vue";
import {
  createSnapshot,
  deepCloneTodos,
  getUndoRedoKeydownAction,
  snapEqual,
} from "../../lib/note-editor-undo";
import type { NoteEditorSnapshot, TodoSnapshotItem } from "./types";

export type { NoteEditorSnapshot, TodoSnapshotItem } from "./types";

export function useNoteUndoRedo(
  localTitle: Ref<string>,
  localTodos: Ref<TodoSnapshotItem[]>,
  options: { onApply?: () => void } = {},
) {
  const past = ref<NoteEditorSnapshot[]>([]);
  const future = ref<NoteEditorSnapshot[]>([]);
  const applyingUndoRedo = ref(false);

  const canUndo = computed(() => past.value.length > 0);
  const canRedo = computed(() => future.value.length > 0);

  function takeSnapshot(): NoteEditorSnapshot {
    return createSnapshot(localTitle.value, localTodos.value);
  }

  function applySnapshot(snap: NoteEditorSnapshot) {
    applyingUndoRedo.value = true;
    try {
      localTitle.value = snap.title;
      localTodos.value = deepCloneTodos(snap.todos);
      options.onApply?.();
    } finally {
      applyingUndoRedo.value = false;
    }
  }

  function pushState() {
    if (applyingUndoRedo.value) return;
    const snap = takeSnapshot();
    const last = past.value.at(-1);
    if (last && snapEqual(snap, last)) return;
    past.value.push(snap);
    future.value = [];
  }

  function undo() {
    if (past.value.length === 0) return;
    const prev = past.value.pop()!;
    future.value.push(takeSnapshot());
    applySnapshot(prev);
  }

  function redo() {
    if (future.value.length === 0) return;
    const next = future.value.pop()!;
    past.value.push(takeSnapshot());
    applySnapshot(next);
  }

  function clearHistory() {
    past.value = [];
    future.value = [];
  }

  function handleKeydown(e: KeyboardEvent) {
    const action = getUndoRedoKeydownAction(e);
    if (!action) return;
    e.preventDefault();
    if (action === "undo") undo();
    else redo();
  }

  return {
    canUndo,
    canRedo,
    pushState,
    undo,
    redo,
    clearHistory,
    handleKeydown,
  };
}
