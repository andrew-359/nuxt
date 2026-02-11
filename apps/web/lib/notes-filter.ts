/**
 * Pure functions for filtering notes by search query and finding extra match todo.
 * Used by useNotesPage; testable without Vue/stores.
 */
import type { Note } from '@todo/domain'
import { matchesQuery } from '@todo/domain'

export type TodoForFilter = { id: string; text: string; completed: boolean }

/**
 * Filter notes that contain query in title or in any todo text.
 * Query should be trimmed and lowercased by caller.
 */
export function filterNotesByQuery(
  notes: Note[],
  query: string,
  getTodosForNote: (noteId: string) => Array<{ text?: string }>
): Note[] {
  if (!query) return notes
  return notes.filter((n) => {
    if (matchesQuery(n.title ?? '', query)) return true
    const todos = getTodosForNote(n.id)
    return todos.some((t) => matchesQuery(t.text ?? '', query))
  })
}

/**
 * First todo after preview range (index >= previewCount) that matches query.
 * Used to show "4th line" with highlight when match is in a task beyond preview.
 */
export function getExtraMatchTodo(
  todos: TodoForFilter[],
  query: string,
  previewCount: number
): TodoForFilter | null {
  if (!query) return null
  for (let i = previewCount; i < todos.length; i++) {
    const t = todos[i]
    if (t && matchesQuery(t.text, query))
      return { id: t.id, text: t.text ?? '', completed: t.completed }
  }
  return null
}
