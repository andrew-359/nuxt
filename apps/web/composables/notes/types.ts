export type TodoRow = {
  id: string
  text: string
  completed: boolean
  order: number
}

export type TodoSnapshotItem = TodoRow

export type NoteEditorSnapshot = {
  title: string
  todos: TodoSnapshotItem[]
}
