/**
 * A11y-строки (aria-label и т.д.) — один источник, в т.ч. для i18n.
 */
import type { Copy } from '~/config/copy'

export function getAriaConfig(copy: Copy) {
  return {
    deleteNote: copy.actions.deleteNote,
    deleteTask: copy.actions.deleteTask,
    taskItem: copy.actions.taskA11y,
    undo: copy.actions.undoA11y,
    redo: copy.actions.redoA11y,
    openSettings: copy.nav.openSettings,
    accountAndSettings: copy.nav.accountAndSettings,
    accountTrigger: (accountName: string) =>
      `${copy.account.label}: ${accountName}. ${copy.account.openList}`,
    selectAccount: copy.account.selectAccount,
    deleteAccount: copy.account.deleteAccount,
    themeSwitcher: copy.settings.fieldLabels.theme,
  } as const
}
