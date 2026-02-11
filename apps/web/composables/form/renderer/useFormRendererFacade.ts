/**
 * Фасад: композиция useFormFieldBindings + getBindings + submitLabel + handleSubmit.
 * Возвращает plain refs/computeds — компонент деструктурирует в script для auto-unwrap в template.
 */
import type { MaybeRefOrGetter } from 'vue'
import { computed, toValue } from 'vue'
import type { FormConfig, FieldConfig } from '@todo/domain'
import type { FormApi } from '~/types'
import {
  FORM_RENDERER_CONFIG,
  type FieldBindingState,
} from '~/config/form/renderer'
import { useFormFieldBindings } from './useFormFieldBindings'

export function useFormRendererFacade(
  config: MaybeRefOrGetter<FormConfig>,
  formApi: FormApi
) {
  const copy = useCopy()
  const { fieldBindings, formBusValues, formErrors, setValue } =
    useFormFieldBindings(config, formApi)

  function getBindings(field: FieldConfig): Record<string, unknown> {
    const name = field.name
    const state: FieldBindingState = {
      value: formBusValues.value[name],
      error: formErrors.value[name],
      extra: fieldBindings.value[name]?.[1] ?? {},
      setValue: (v) => setValue(name, v),
    }
    return FORM_RENDERER_CONFIG[field.kind].buildBindings(field, state)
  }

  const submitLabel = computed(
    () => toValue(config).submitLabel ?? copy.value.forms.defaultSubmitLabel
  )

  function handleSubmit(callback: (values: Record<string, unknown>) => void) {
    return formApi.handleSubmit(callback)
  }

  return { getBindings, submitLabel, handleSubmit, formErrors }
}
