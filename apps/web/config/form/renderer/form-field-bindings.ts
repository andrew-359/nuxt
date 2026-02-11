/**
 * Pure config: FieldKind → buildBindings (no Vue components).
 * Описание правил привязки полей к пропсам инпутов.
 */
import type {
  FieldConfig,
  FieldKind,
  NumberFieldConfig,
  SelectFieldConfig,
  TextFieldConfig,
} from '@todo/domain'
import type { BuildBindingsFn, FieldBindingState } from '~/types'

function buildTextBindings(
  field: TextFieldConfig,
  state: FieldBindingState
): Record<string, unknown> {
  const modelValue =
    typeof state.value === 'boolean' ? undefined : state.value
  return {
    modelValue,
    type: 'text',
    placeholder: field.placeholder,
    'aria-invalid': !!state.error,
    ...state.extra,
    'onUpdate:modelValue': state.setValue,
  }
}

function buildNumberBindings(
  field: NumberFieldConfig,
  state: FieldBindingState
): Record<string, unknown> {
  const modelValue =
    typeof state.value === 'boolean' ? undefined : state.value
  return {
    modelValue,
    type: 'number',
    min: field.min,
    max: field.max,
    step: field.step,
    'aria-invalid': !!state.error,
    ...state.extra,
    'onUpdate:modelValue': state.setValue,
  }
}

function buildCheckboxBindings(
  _field: FieldConfig,
  state: FieldBindingState
): Record<string, unknown> {
  const modelValue =
    typeof state.value === 'boolean' ? state.value : undefined
  return {
    modelValue,
    'aria-invalid': !!state.error,
    ...state.extra,
    'onUpdate:modelValue': state.setValue,
  }
}

function buildSelectBindings(
  field: SelectFieldConfig,
  state: FieldBindingState
): Record<string, unknown> {
  return {
    modelValue: (state.value ?? '') as string,
    items: field.options,
    'aria-invalid': !!state.error,
    ...state.extra,
    'onUpdate:modelValue': state.setValue,
  }
}

/** Чистый маппинг: kind → функция построения bindings (без компонентов). */
export const BUILD_BINDINGS_BY_KIND: Record<FieldKind, BuildBindingsFn> = {
  text: buildTextBindings as BuildBindingsFn,
  number: buildNumberBindings as BuildBindingsFn,
  checkbox: buildCheckboxBindings,
  select: buildSelectBindings as BuildBindingsFn,
}
