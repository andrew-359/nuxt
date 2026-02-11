/**
 * Общая точка входа для типов приложения (types/ с подпапками по доменам).
 */
export type {
  CancelEditPayload,
  ConfirmConfigEntry,
  ConfirmKey,
  ConfirmPayloadMap,
  DeleteAccountPayload,
  DeleteNotePayload,
  ModalConfigEntry,
  ModalKey,
  ModalPayloadMap,
  OverlayKey,
  OverlayPayload,
} from './overlay'
export type {
  BuildBindingsFn,
  FieldBindingState,
  FormApi,
  FormRendererKindConfig,
} from './form'
export type { ToolbarButtonConfig } from './notes'
export type {
  SettingsConfig,
  SettingsOptionLabels,
  SettingsPanelCopy,
  SettingsPanelField,
  SettingsPanelFieldNumber,
  SettingsPanelFieldSelect,
} from './settings'
export type { RouteName } from '~/config/routes'
export type { StateMessageType } from '~/config/state-message'
