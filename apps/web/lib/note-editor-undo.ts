/**
 * Чистые функции для undo/redo редактора заметки: снапшоты, сравнение, разбор клавиш.
 */
import type {
  NoteEditorSnapshot,
  TodoSnapshotItem,
} from "~/composables/notes/types";

export function deepCloneTodos(todos: TodoSnapshotItem[]): TodoSnapshotItem[] {
  return todos.map((t) => ({ ...t }));
}

export function snapEqual(
  a: NoteEditorSnapshot,
  b: NoteEditorSnapshot,
): boolean {
  if (a.title !== b.title) return false;
  if (a.todos.length !== b.todos.length) return false;
  return a.todos.every((t, i) => {
    const u = b.todos[i];
    if (u === undefined) return false;
    return (
      t.id === u.id &&
      t.text === u.text &&
      t.completed === u.completed &&
      t.order === u.order
    );
  });
}

export function createSnapshot(
  title: string,
  todos: TodoSnapshotItem[],
): NoteEditorSnapshot {
  return { title, todos: deepCloneTodos(todos) };
}

/** Возвращает действие по Ctrl+Z / Ctrl+Shift+Z / Ctrl+Y. */
export function getUndoRedoKeydownAction(
  e: KeyboardEvent,
): "undo" | "redo" | null {
  if (e.key !== "z" && e.key !== "y") return null;
  const ctrl = e.ctrlKey || e.metaKey;
  if (!ctrl) return null;
  if (e.key === "z") return e.shiftKey ? "redo" : "undo";
  if (e.key === "y") return "redo";
  return null;
}
