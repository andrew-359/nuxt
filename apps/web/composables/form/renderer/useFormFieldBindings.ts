/**
 * Базовый хук: fieldBindings, formBusValues, formErrors, setValue для FormRenderer.
 */
import type { MaybeRefOrGetter } from 'vue'
import { computed, toValue } from 'vue'
import type { FormConfig } from '@todo/domain'
import type { FormApi } from '~/types'
import type { FormFieldBindings } from '~/composables/form/types'

export function useFormFieldBindings(
  config: MaybeRefOrGetter<FormConfig>,
  formApi: FormApi
) {
  const fieldBindings = computed<FormFieldBindings>(() => {
    const cfg = toValue(config)
    const map: FormFieldBindings = {}
    for (const field of cfg.fields) {
      map[field.name] = formApi.defineField(field.name)
    }
    return map
  })

  const formBusValues = computed((): Record<string, string | number | boolean> =>
    Object.fromEntries(
      Object.entries(fieldBindings.value).map(([name, [ref]]) => [
        name,
        ref.value,
      ])
    )
  )

  const formErrors = computed(
    (): Record<string, string | undefined> =>
      toValue(formApi.errors) ?? {}
  )

  function setValue(name: string, value: string | number | boolean) {
    const ref = fieldBindings.value[name]?.[0]
    if (ref) ref.value = value
  }

  return { fieldBindings, formBusValues, formErrors, setValue }
}
