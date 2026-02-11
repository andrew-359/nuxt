/**
 * Конфиг кнопок тулбара редактора заметки.
 * Маппинг id → { variant, icon, getDisabled, getAria, getLabel, onClick }.
 */
import type { Copy } from '~/config/copy'
import type { getAriaConfig } from '~/config/aria'
import type { ToolbarButtonConfig } from '~/types'

export function getNoteEditorToolbarButtons(
  _copy: Copy,
  _aria: ReturnType<typeof getAriaConfig>
): ToolbarButtonConfig[] {
  return [
    {
      id: 'undo',
      variant: 'secondary',
      icon: 'i-lucide-undo-2',
      getDisabled: (e) => !e.undoRedo.canUndo,
      getAria: (_, a) => a.undo,
      getLabel: (c) => c.noteEditor.toolbarUndo,
      onClick: (e) => e.undoRedo.undo(),
    },
    {
      id: 'redo',
      variant: 'secondary',
      icon: 'i-lucide-redo-2',
      getDisabled: (e) => !e.undoRedo.canRedo,
      getAria: (_, a) => a.redo,
      getLabel: (c) => c.noteEditor.toolbarRedo,
      onClick: (e) => e.undoRedo.redo(),
    },
    {
      id: 'save',
      variant: 'secondary',
      icon: 'i-lucide-save',
      getDisabled: (e) => !e.dirty,
      getAria: (c) => c.noteEditor.toolbarSave,
      getLabel: (c) => c.noteEditor.toolbarSave,
      onClick: (e) => e.save(),
    },
    {
      id: 'cancel',
      variant: 'secondary',
      icon: 'i-lucide-x',
      getDisabled: (e) => !e.dirty,
      getAria: (c) => c.noteEditor.toolbarCancel,
      getLabel: (c) => c.noteEditor.toolbarCancel,
      onClick: (e) => e.openCancelModal(),
    },
    {
      id: 'delete',
      variant: 'danger',
      icon: 'i-lucide-trash-2',
      getDisabled: () => false,
      getAria: (_, a) => a.deleteNote,
      getLabel: (c) => c.noteEditor.toolbarDelete,
      onClick: (e) => e.openDeleteModal(),
    },
  ]
}
