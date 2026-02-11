/**
 * StateMessage: type values and CSS class mapping.
 * Single source for type literals and class names.
 */

export type StateMessageType = 'loading' | 'empty' | 'error'

export const STATE_MESSAGE_CLASS_MAP: Record<StateMessageType, string> = {
  loading: 'p-4 text-center text-gray-500',
  empty: 'p-4 text-center text-gray-500',
  error: 'p-4 text-center text-red-600',
}

export function stateMessageClass(type: StateMessageType): string {
  return STATE_MESSAGE_CLASS_MAP[type] ?? ''
}
