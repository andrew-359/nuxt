export type ToasterVariant = 'success' | 'error' | 'info'

export type ToasterOptions = {
  /** Дополнительный текст под основным сообщением */
  description?: string
  /** Длительность показа в мс (по умолчанию — из UToaster) */
  duration?: number
}
