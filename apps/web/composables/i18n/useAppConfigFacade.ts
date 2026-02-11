/**
 * Фасад: единая точка доступа к конфигам, зависящим от copy (i18n).
 * Чистая композиция базовых хуков.
 */
import {
  useConfirmsConfig,
  useModalsConfig,
  useSettingsConfig,
  useCreateAccountFormConfig,
} from "./dictionaries";
import { useAria } from "./useAria";

export function useAppConfigFacade() {
  return {
    copy: useCopy(),
    confirmsConfig: useConfirmsConfig(),
    modalsConfig: useModalsConfig(),
    aria: useAria(),
    settingsConfig: useSettingsConfig(),
    createAccountFormConfig: useCreateAccountFormConfig(),
  };
}
