import type { Ref } from 'vue'

export type FormFieldBindings = Record<
  string,
  [Ref<string | number | boolean>, Record<string, unknown>]
>
