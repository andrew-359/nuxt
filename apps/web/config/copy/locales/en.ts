/**
 * English locale — UI strings.
 */
import type { Copy } from "../types";

export const copy = {
  notesList: {
    title: "Notes",
    createNote: "Create note",
    empty: "No notes. Create the first one.",
    noAccountsIntro: "No accounts yet. Create the first account.",
    filterPlaceholder: "Search by title / task",
    sortBy: "Sort by",
    sortDir: "Direction",
    viewList: "List",
    viewCards: "Cards",
    pageSize: "Per page",
    noResultsForFilter: "No notes match your search.",
  },
  noteEditor: {
    pageTitle: "Note",
    backToList: "Back to list",
    notFound: "Note not found.",
    noTitle: "Untitled",
    titleLabel: "Title",
    titlePlaceholder: "Note title",
    todosTitle: "Tasks",
    todoPlaceholder: "Task text",
    addTodo: "Add task",
    toolbarA11y:
      "Editor actions: undo, redo, save, discard changes, delete note",
    undo: "Undo",
    redo: "Redo",
    save: "Save",
    cancel: "Cancel",
    deleteNote: "Delete note",
    toolbarUndo: "Undo",
    toolbarRedo: "Redo",
    toolbarSave: "Save",
    toolbarCancel: "Cancel",
    toolbarDelete: "Delete",
  },
  state: {
    loading: "Loading…",
  },
  account: {
    label: "Account",
    openList: "Open list",
    selectAccount: "Select account",
    createAccount: "Create account",
    deleteAccount: "Delete account",
    noName: "Unnamed",
  },
  nav: {
    appTitle: "Notes",
    settings: "Settings",
    openSettings: "Open settings",
    accountAndSettings: "Account and settings",
  },
  actions: {
    deleteNote: "Delete note",
    deleteTask: "Delete task",
    taskA11y: (index: number, text: string) =>
      `Task ${index + 1}: ${text || "empty"}`,
    undoA11y: "Undo (Ctrl+Z)",
    redoA11y: "Redo (Ctrl+Shift+Z)",
  },
  symbols: {
    todoDone: "✓",
    todoUndone: "○",
    removeLabel: "×",
    dropdownIcon: "▼",
    placeholderEmpty: "—",
    addTask: "+",
    undoIcon: "↩",
    redoIcon: "↪",
    saveIcon: "●",
    cancelIcon: "✕",
    deleteIcon: "🗑",
  },
  forms: {
    defaultSubmitLabel: "Submit",
    createAccount: {
      description: "Enter a name for the new account.",
      nameLabel: "Account name",
      namePlaceholder: "Enter name",
      submitLabel: "Create account",
      errors: {
        nameRequired: "Enter account name.",
        nameMinLength: "Name cannot be empty.",
      },
    },
  },
  toasts: {
    noteDeleted: "Note deleted",
    accountDeleted: "Account deleted",
    changesDiscarded: "Changes discarded",
  },
  modals: {
    cancel: "Cancel",
    confirmDelete: "Delete",
    deleteNote: {
      titleWithName: (name: string) => `Delete note «${name}»?`,
      description:
        "The note and all its tasks will be deleted. This cannot be undone.",
    },
    deleteAccount: {
      titleWithName: (name: string) => `Delete account «${name}»?`,
      description:
        "All notes and tasks in this account will be deleted. This cannot be undone.",
    },
    cancelEdit: {
      title: "Discard changes?",
      description: "Unsaved changes will be lost.",
      cancelLabel: "Continue editing",
      confirmLabel: "Discard changes",
    },
    deleteTaskConfirm: "Delete this task?",
  },
  settings: {
    title: "Settings",
    close: "Close",
    save: "Save",
    fieldLabels: {
      theme: "Theme",
      notesView: "Notes list view",
      sortBy: "Sort by",
      sortDir: "Direction",
      locale: "Language",
    },
    hints: {
      theme: "Light, dark, or system",
    },
    options: {
      theme: { light: "Light", dark: "Dark", system: "System" },
      notesView: { list: "List", cards: "Cards" },
      sortBy: {
        updatedAt: "Date updated",
        createdAt: "Date created",
        title: "Title",
      },
      sortDir: { asc: "Ascending", desc: "Descending" },
    },
    locale: { ru: "Russian", en: "English" },
    localeShort: { ru: "Ru", en: "En" },
  },
} as const satisfies Copy;
