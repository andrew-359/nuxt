<template>
  <UInput
    :model-value="modelValue"
    :type="type"
    :placeholder="placeholder"
    :min="min"
    :max="max"
    :step="step"
    :disabled="disabled"
    class="w-full min-w-0"
    v-bind="$attrs"
    @update:model-value="emit('update:modelValue', $event)"
  />
</template>

<script setup lang="ts">
/**
 * Обёртка над UInput. Пробрасывает type, placeholder, min, max, step, disabled.
 * Класс w-full min-w-0 задан по умолчанию (формы, модалки).
 */
defineProps<{
  modelValue?: string | number
  type?: 'text' | 'number'
  placeholder?: string
  min?: number
  max?: number
  step?: number
  disabled?: boolean
}>()

const emit = defineEmits<{ 'update:modelValue': [value: string | number] }>()
</script>
