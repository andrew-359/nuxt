/**
 * Фасад: композиция базовых хуков для SettingsButton.
 * Возвращает plain refs/computeds — компонент деструктурирует в script для auto-unwrap в template.
 */
import { useNavThemeOptions, useNavLocaleOptions, useNavAccountDropdown } from './nav'

export function useLayoutNavSettingsFacade() {
  const dropdownOpen = ref(false)
  const theme = useNavThemeOptions()
  const locale = useNavLocaleOptions()
  const account = useNavAccountDropdown()

  function onCreateAccountClick() {
    dropdownOpen.value = false
    account.openCreateModal()
  }

  function onDeleteAccountClick() {
    dropdownOpen.value = false
    account.openDeleteModal()
  }

  return {
    dropdownOpen,
    themeOptions: theme.themeOptions,
    currentTheme: theme.currentTheme,
    setTheme: theme.setTheme,
    localeOptions: locale.localeOptions,
    currentLocale: locale.currentLocale,
    setLocale: locale.setLocale,
    dropdownItems: account.dropdownItems,
    accounts: account.accounts,
    activeAccountId: account.activeAccountId,
    onCreateAccountClick,
    onDeleteAccountClick,
  }
}
