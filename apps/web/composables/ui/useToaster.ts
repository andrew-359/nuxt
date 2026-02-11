/**
 * Обёртка над useToast (Nuxt UI): один вход и три метода по типам тостов.
 * Вызов из любого места: toaster.success('Сохранено'), toaster.error('Ошибка'), toaster.info('Подсказка').
 */
import type { ToasterOptions, ToasterVariant } from './types'

export type { ToasterOptions, ToasterVariant } from './types'

export function useToaster() {
  const toast = useToast()

  function show(
    message: string,
    color: ToasterVariant,
    options?: ToasterOptions,
  ) {
    return toast.add({
      title: message,
      description: options?.description,
      color,
      ...(options?.duration !== undefined && { duration: options.duration }),
    })
  }

  return {
    success: (message: string, options?: ToasterOptions) =>
      show(message, 'success', options),
    error: (message: string, options?: ToasterOptions) =>
      show(message, 'error', options),
    info: (message: string, options?: ToasterOptions) =>
      show(message, 'info', options),
  }
}
