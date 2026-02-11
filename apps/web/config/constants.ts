/**
 * App-wide constants: magic numbers, key prefixes, a11y id helpers, store names.
 * Single place to change layout/UI constants.
 */

/** Сколько задач показывать в превью карточки заметки (фиксировано, не настройка) */
export const PREVIEW_COUNT = 3

/** Tailwind-класс размера/начертания названия на карточке заметки */
export const NOTE_CARD_TITLE_CLASS = 'text-base font-semibold'

/** Tailwind-класс размера текста задачи в превью карточки */
export const NOTE_CARD_TODO_TEXT_CLASS = 'text-sm'

/** Prefix for temporary key of new (unsaved) todo in editor list */
export const NEW_TODO_KEY_PREFIX = 'new-'

/** Key for useState: notes list page (shared with FooterNotes) */
export const STATE_KEY_NOTES_LIST_PAGE = 'notes-list-page'

/** ID for settings panel modal title (aria-labelledby) */
export const SETTINGS_MODAL_TITLE_ID = 'settings-modal-title'

export function settingsFieldId(fieldId: string): string {
  return `settings-${fieldId}`
}

export function settingsFieldDescId(fieldId: string): string {
  return `settings-${fieldId}-desc`
}

export function modalTitleId(modalKey: string): string {
  return `${modalKey}-modal-title`
}
