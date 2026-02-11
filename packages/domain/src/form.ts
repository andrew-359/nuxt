/**
 * Form config types for declarative form constructor.
 * Field kinds, validation, submit — no UI, only contracts.
 */

/** Supported field kinds for the form constructor */
export const FIELD_KINDS = ['text', 'number', 'checkbox', 'select'] as const
export type FieldKind = (typeof FIELD_KINDS)[number]

/** Sync validator: returns error message or null */
export type Validator<T = string> = (value: T) => string | null

/** Validation rule: optional validator + optional required flag */
export interface ValidationRule<T = string> {
  required?: boolean
  validate?: Validator<T>
  minLength?: number
  maxLength?: number
}

export interface BaseFieldConfig<T = string> {
  name: string
  label: string
  validation?: ValidationRule<T>
  defaultValue?: T
}

export interface TextFieldConfig extends BaseFieldConfig<string> {
  kind: 'text'
  placeholder?: string
}

export interface NumberFieldConfig extends BaseFieldConfig<number> {
  kind: 'number'
  min?: number
  max?: number
  step?: number
}

export interface CheckboxFieldConfig extends BaseFieldConfig<boolean> {
  kind: 'checkbox'
}

export interface SelectOption {
  value: string
  label: string
}

export interface SelectFieldConfig extends BaseFieldConfig<string> {
  kind: 'select'
  options: SelectOption[]
}

export type FieldConfig =
  | TextFieldConfig
  | NumberFieldConfig
  | CheckboxFieldConfig
  | SelectFieldConfig

/** Form definition: list of fields + optional submit label (config is immutable) */
export interface FormConfig<T = Record<string, unknown>> {
  id?: string
  readonly fields: readonly FieldConfig[]
  submitLabel?: string
  /** Optional: default values for the whole form (overrides field defaultValue) */
  defaultValues?: Partial<T>
}

/** Discriminated union: use .ok to narrow to success or error message */
export type FieldValidationResult =
  | { readonly ok: true }
  | { readonly ok: false; readonly message: string }

/** Discriminated union: use .ok to narrow to data or errors map */
export type FormValidationResult =
  | { readonly ok: true; readonly data: Record<string, unknown> }
  | { readonly ok: false; readonly errors: Record<string, string> }

const validateField = (
  field: FieldConfig,
  value: unknown
): FieldValidationResult => {
  const required = field.validation?.required
  const empty = value === undefined || value === null || value === ''

  if (required && empty) {
    return { ok: false, message: `${field.label} is required` }
  }
  if (empty && field.kind !== 'checkbox') {
    return { ok: true }
  }

  if (field.kind === 'text' && typeof value === 'string') {
    const min = field.validation?.minLength
    const max = field.validation?.maxLength
    if (min !== undefined && value.length < min) {
      return { ok: false, message: `Min length ${min}` }
    }
    if (max !== undefined && value.length > max) {
      return { ok: false, message: `Max length ${max}` }
    }
  }

  const validator = field.validation?.validate as Validator<unknown> | undefined
  if (validator) {
    const msg = validator(value)
    if (msg) return { ok: false, message: msg }
  }

  return { ok: true }
}

/**
 * Validate form values against config.
 * @returns Ok with merged data, or errors keyed by field name
 */
export const validateForm = (
  config: FormConfig,
  values: Record<string, unknown>
): FormValidationResult => {
  const errors: Record<string, string> = {}
  const data: Record<string, unknown> = {}

  for (const field of config.fields) {
    const value = values[field.name]
    const result = validateField(field, value)
    if (!result.ok) {
      errors[field.name] = result.message
    } else {
      data[field.name] = value ?? field.defaultValue
    }
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors }
  }
  return { ok: true, data }
}
