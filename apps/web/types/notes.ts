/**
 * Notes config types.
 */
import type { Copy } from '~/config/copy'
import type { LayoutHeaderEditor } from '~/composables/layout'
import type { getAriaConfig } from '~/config/aria'

type AriaConfig = ReturnType<typeof getAriaConfig>

export type ToolbarButtonConfig = {
  id: string
  variant: 'secondary' | 'danger'
  icon: string
  getDisabled: (editor: LayoutHeaderEditor) => boolean
  getAria: (copy: Copy, aria: AriaConfig) => string
  getLabel: (copy: Copy) => string
  onClick: (editor: LayoutHeaderEditor) => void
}
