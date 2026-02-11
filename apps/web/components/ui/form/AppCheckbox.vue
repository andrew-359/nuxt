<template>
  <UCheckbox
    :model-value="Boolean(modelValue)"
    v-bind="$attrs"
    @update:model-value="emit('update:modelValue', Boolean($event))"
  />
</template>

<script setup lang="ts">
/**
 * Обёртка над UCheckbox. v-model (boolean).
 */
defineProps<{
  modelValue?: boolean
}>()

const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>()
</script>
