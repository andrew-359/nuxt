<template>
  <UButton v-bind="{ ...kitProps, ...$attrs }">
    <slot />
  </UButton>
</template>

<script setup lang="ts">
/**
 * Обёртка над UButton. Свой API: variant = primary | secondary | danger.
 * Позиционирование — Tailwind на родителе.
 */
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'danger'
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    /** Проброс классов (Tailwind) — для позиции не используем, только для размеров при необходимости */
    class?: string
    /** aria-label и остальные атрибуты пробрасываются через $attrs */
  }>(),
  { variant: 'secondary', type: 'button', disabled: false, class: undefined }
)

const kitColor = computed((): 'primary' | 'error' | 'neutral' => {
  if (props.variant === 'primary') return 'primary'
  if (props.variant === 'danger') return 'error'
  return 'neutral'
})
const kitVariant = computed((): 'outline' | 'solid' => (props.variant === 'secondary' ? 'outline' : 'solid'))
const kitProps = computed(() => {
  const dangerClass = props.variant === 'danger' ? '!text-white' : ''
  const mergedClass = [props.class, dangerClass].filter(Boolean).join(' ')
  return {
    color: kitColor.value,
    variant: kitVariant.value,
    type: props.type,
    disabled: props.disabled,
    class: mergedClass || undefined,
  }
})
</script>
