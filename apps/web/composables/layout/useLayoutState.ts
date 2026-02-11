/**
 * Shared layout state: note page registers its editor so the layout header can render the toolbar.
 * Layout reads; note page sets on mount and clears on unmount.
 */
import type { Ref } from 'vue'
import type { LayoutHeaderEditor } from './types'

export type { LayoutHeaderEditor } from './types'

const headerEditor: Ref<LayoutHeaderEditor | null> = ref(null)

export function useLayoutState() {
  return {
    headerEditor,
    setHeaderEditor(editor: LayoutHeaderEditor | null) {
      headerEditor.value = editor
    },
  }
}
