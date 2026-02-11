/**
 * Form types: form API (vee-validate bus) and renderer config.
 */
import type { Ref, MaybeRefOrGetter } from 'vue'
import type { Component } from 'vue'
import type { FieldConfig } from '@todo/domain'

/** Form bus API from useForm (e.g. useCreateAccountForm). Pass to FormRenderer as form-api. */
export interface FormApi {
  defineField: (path: string) => [Ref<string | number | boolean>, Record<string, unknown>]
  handleSubmit: (submitFn: (values: Record<string, unknown>) => void) => (ev: Event) => void
  /** Ref or plain object. Vee-validate returns ComputedRef<Record<string, string>> */
  errors: MaybeRefOrGetter<Record<string, string | undefined> | undefined>
}

export type FieldBindingState = {
  value: unknown
  error: string | undefined
  extra: Record<string, unknown>
  setValue: (v: string | number | boolean) => void
}

export type BuildBindingsFn = (
  field: FieldConfig,
  state: FieldBindingState
) => Record<string, unknown>

export type FormRendererKindConfig = {
  component: Component
  buildBindings: BuildBindingsFn
}
