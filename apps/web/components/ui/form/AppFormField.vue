<template>
  <UFormField
    :label="label"
    :required="required"
    :error="error"
    :help="help"
  >
    <slot />
  </UFormField>
</template>

<script setup lang="ts">
/**
 * Обёртка над UFormField. Label, required, error, help; слот — для AppInput, AppSelect, AppCheckbox.
 */
defineProps<{
  label?: string
  required?: boolean
  error?: string
  help?: string
}>()
</script>
