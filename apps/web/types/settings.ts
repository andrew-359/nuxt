/**
 * Settings panel types.
 */
import type { NotesView, SortBy, SortDir, Theme } from '@todo/domain'

export type SettingsPanelFieldSelect = {
  id: 'theme' | 'notesView' | 'sortBy' | 'sortDir'
  type: 'select'
  label: string
  hint?: string
  options: readonly string[]
  getOptionLabel: (value: string) => string
}

export type SettingsPanelFieldNumber = {
  id: string
  type: 'number'
  label: string
  hint?: string
  min?: number
  max?: number
}

export type SettingsPanelField = SettingsPanelFieldSelect | SettingsPanelFieldNumber

export type SettingsOptionLabels = {
  theme: Record<Theme, string>
  notesView: Record<NotesView, string>
  sortBy: Record<SortBy, string>
  sortDir: Record<SortDir, string>
}

export type SettingsPanelCopy = {
  title: string
  close: string
  save: string
}

export type SettingsConfig = {
  optionLabels: SettingsOptionLabels
  panelFields: SettingsPanelFieldSelect[]
  panelCopy: SettingsPanelCopy
}
