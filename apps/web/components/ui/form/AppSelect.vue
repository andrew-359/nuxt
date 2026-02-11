<template>
  <USelect
    :model-value="modelValue"
    :items="items"
    value-key="value"
    class="w-full min-w-0"
    v-bind="$attrs"
    @update:model-value="emit('update:modelValue', $event)"
  />
</template>

<script setup lang="ts">
/**
 * Обёртка над USelect. items: { label, value }[]; v-model — значение (string).
 */
defineProps<{
  modelValue?: string
  items: Array<{ label: string; value: string }>
}>()

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
</script>
