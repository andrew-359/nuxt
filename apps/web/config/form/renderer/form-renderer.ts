/**
 * Привязка FieldKind к Vue-компонентам.
 * Чистые правила bindings — в form-field-bindings.ts.
 */
import type { Component } from 'vue'
import type { FieldKind } from '@todo/domain'
import { FIELD_KINDS } from '@todo/domain'
import AppInput from '~/components/ui/form/AppInput.vue'
import AppCheckbox from '~/components/ui/form/AppCheckbox.vue'
import AppSelect from '~/components/ui/form/AppSelect.vue'
import { BUILD_BINDINGS_BY_KIND } from './form-field-bindings'
import type { FormRendererKindConfig } from '~/types'

const COMPONENT_BY_KIND: Record<FieldKind, Component> = {
  text: AppInput,
  number: AppInput,
  checkbox: AppCheckbox,
  select: AppSelect,
}

export const FORM_RENDERER_CONFIG: Record<FieldKind, FormRendererKindConfig> =
  (FIELD_KINDS as readonly FieldKind[]).reduce(
    (acc, kind) => {
      acc[kind] = {
        component: COMPONENT_BY_KIND[kind],
        buildBindings: BUILD_BINDINGS_BY_KIND[kind],
      }
      return acc
    },
    {} as Record<FieldKind, FormRendererKindConfig>
  )

export const INPUT_BY_KIND: Record<FieldKind, Component> = COMPONENT_BY_KIND
