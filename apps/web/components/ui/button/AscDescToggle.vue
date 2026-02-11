<template>
  <UButton
    :icon="isAsc ? 'i-lucide-arrow-up' : 'i-lucide-arrow-down'"
    :aria-label="ariaLabel"
    color="neutral"
    variant="outline"
    size="sm"
    class="shrink-0"
    v-bind="$attrs"
    @click="toggle"
  />
</template>

<script setup lang="ts">
/**
 * Кнопка-стрелка: направление сортировки (по возрастанию ↑ / по убыванию ↓).
 * По клику переключает asc ↔ desc.
 */

defineOptions({ name: 'AscDescToggle' })

const copy = useCopy()
const props = defineProps<{
  modelValue: 'asc' | 'desc'
}>()

const emit = defineEmits<{ 'update:modelValue': ['asc' | 'desc'] }>()

const isAsc = computed(() => props.modelValue === 'asc')

const ariaLabel = computed(() =>
  props.modelValue === 'asc'
    ? copy.value.settings.options.sortDir.asc
    : copy.value.settings.options.sortDir.desc
)

function toggle() {
  emit('update:modelValue', props.modelValue === 'asc' ? 'desc' : 'asc')
}
</script>
