/**
 * Confirms: string-only config (title, description, button labels).
 */
import type {
  ConfirmKey,
  ConfirmConfigEntry,
  DeleteNotePayload,
  DeleteAccountPayload,
} from '~/types'
import type { Copy } from '~/config/copy'

export function getConfirmsConfig(copy: Copy): Record<ConfirmKey, ConfirmConfigEntry> {
  return {
    'delete-note': {
      title: (p: unknown) => {
        const payload = (p ?? null) as DeleteNotePayload | null
        return copy.modals.deleteNote.titleWithName(payload?.note?.title || copy.noteEditor.noTitle)
      },
      description: copy.modals.deleteNote.description,
      cancelLabel: copy.modals.cancel,
      confirmLabel: copy.modals.confirmDelete,
      confirmVariant: 'danger',
    },
    'delete-account': {
      title: (p: unknown) => {
        const payload = (p ?? null) as DeleteAccountPayload | null
        return copy.modals.deleteAccount.titleWithName(payload?.accountName ?? copy.symbols.placeholderEmpty)
      },
      description: copy.modals.deleteAccount.description,
      cancelLabel: copy.modals.cancel,
      confirmLabel: copy.modals.confirmDelete,
      confirmVariant: 'danger',
    },
    'cancel-edit': {
      title: copy.modals.cancelEdit.title,
      description: copy.modals.cancelEdit.description,
      cancelLabel: copy.modals.cancelEdit.cancelLabel,
      confirmLabel: copy.modals.cancelEdit.confirmLabel,
    },
  }
}

export function getConfirmTitle(
  copy: Copy,
  key: ConfirmKey,
  payload: unknown,
): string {
  const config = getConfirmsConfig(copy)
  const entry = config[key]
  if (!entry) return ''
  return typeof entry.title === 'function' ? entry.title(payload) : entry.title
}
