/**
 * Settings panel: поля панели и подписи опций для селектов.
 * Конфиг строится от copy (i18n).
 */
import type { NotesView, SortBy, SortDir, Theme } from '@todo/domain'
import { NOTES_VIEW, SORT_BY, SORT_DIR, THEME } from '@todo/domain'
import type { Copy } from '~/config/copy'
import type {
  SettingsConfig,
  SettingsOptionLabels,
  SettingsPanelCopy,
  SettingsPanelFieldSelect,
} from '~/types'

function selectField(
  id: SettingsPanelFieldSelect['id'],
  label: string,
  options: readonly string[],
  getOptionLabel: (v: string) => string,
  hint?: string
): SettingsPanelFieldSelect {
  return { id, type: 'select', label, hint, options, getOptionLabel }
}

export function getSettingsConfig(copy: Copy): SettingsConfig {
  const optionLabels: SettingsOptionLabels = {
    theme: copy.settings.options.theme as Record<Theme, string>,
    notesView: copy.settings.options.notesView as Record<NotesView, string>,
    sortBy: copy.settings.options.sortBy as Record<SortBy, string>,
    sortDir: copy.settings.options.sortDir as Record<SortDir, string>,
  }
  const panelFields: SettingsPanelFieldSelect[] = [
    selectField(
      'theme',
      copy.settings.fieldLabels.theme,
      THEME,
      (v) => optionLabels.theme[v as Theme],
      copy.settings.hints.theme
    ),
    selectField(
      'notesView',
      copy.settings.fieldLabels.notesView,
      NOTES_VIEW,
      (v) => optionLabels.notesView[v as NotesView]
    ),
    selectField('sortBy', copy.settings.fieldLabels.sortBy, SORT_BY, (v) => optionLabels.sortBy[v as SortBy]),
    selectField('sortDir', copy.settings.fieldLabels.sortDir, SORT_DIR, (v) => optionLabels.sortDir[v as SortDir]),
  ]
  const panelCopy: SettingsPanelCopy = {
    title: copy.settings.title,
    close: copy.settings.close,
    save: copy.settings.save,
  }
  return { optionLabels, panelFields, panelCopy }
}
