<template>
  <div
    class="flex h-9 items-center gap-0.5 rounded-md border border-default bg-default p-0.5"
    role="group"
    :aria-label="groupLabel"
  >
    <AppButton
      v-for="opt in options"
      :key="opt.value"
      type="button"
      :variant="modelValue === opt.value ? 'primary' : 'secondary'"
      :aria-label="opt.label"
      :aria-pressed="modelValue === opt.value"
      class="flex h-8 min-w-8 flex-shrink-0 items-center justify-center rounded p-0"
      @click="emit('update:modelValue', opt.value)"
    >
      <UIcon :name="opt.icon" class="size-4 shrink-0" aria-hidden />
    </AppButton>
  </div>
</template>

<script setup lang="ts">
import type { Theme } from '@todo/domain'
import type { ThemeOption } from '~/composables/layout'

defineOptions({ name: 'ThemeToggle' })

defineProps<{
  options: ThemeOption[]
  modelValue: Theme
  groupLabel: string
}>()

const emit = defineEmits<{ 'update:modelValue': [value: Theme] }>()
</script>
