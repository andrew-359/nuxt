import type { Theme } from '@todo/domain'

export type LayoutHeaderEditor = {
  undoRedo: {
    undo: () => void
    redo: () => void
    canUndo: boolean
    canRedo: boolean
  }
  dirty: boolean
  save: () => void
  openCancelModal: () => void
  openBackToListModal: () => void
  openDeleteModal: () => void
}

export type ThemeOption = {
  value: Theme
  icon: string
  label: string
}

export type LocaleOption = {
  value: 'ru' | 'en'
  label: string
  shortLabel: string
}
