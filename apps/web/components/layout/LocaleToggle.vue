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
      class="flex h-8 min-w-8 flex-shrink-0 items-center justify-center rounded px-2 text-xs font-medium"
      @click="emit('update:modelValue', opt.value)"
    >
      {{ opt.shortLabel }}
    </AppButton>
  </div>
</template>

<script setup lang="ts">
import type { LocaleOption } from '~/composables/layout'
import type { LocaleCode } from '~/config/copy'

defineOptions({ name: 'LocaleToggle' })

defineProps<{
  options: LocaleOption[]
  modelValue: LocaleCode
  groupLabel: string
}>()

const emit = defineEmits<{ 'update:modelValue': [value: LocaleCode] }>()
</script>
