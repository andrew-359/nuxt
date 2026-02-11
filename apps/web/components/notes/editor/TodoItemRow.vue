<template>
  <li class="list-none mb-2 last:mb-0">
    <UCard variant="subtle" class="overflow-hidden">
      <div
        :class="[
          'flex items-center gap-3',
          modelValue.completed && 'opacity-90'
        ]"
      >
        <AppCheckbox
          :model-value="modelValue.completed"
          :aria-label="aria.taskItem(index, modelValue.text)"
          class="shrink-0"
          @update:model-value="onToggle"
        />
        <AppInput
          :model-value="modelValue.text"
          type="text"
          :placeholder="copy.noteEditor.todoPlaceholder"
          :class="modelValue.completed && 'text-muted line-through'"
          @update:model-value="onTextInput"
          @focus="emit('focus')"
        />
        <AppButton
          type="button"
          variant="danger"
          :aria-label="aria.deleteTask"
          class="shrink-0 w-10 h-10 p-0 inline-flex items-center justify-center"
          @click="emit('remove')"
        >
          <UIcon name="i-lucide-trash-2" class="size-4 shrink-0" aria-hidden />
        </AppButton>
      </div>
    </UCard>
  </li>
</template>

<script setup lang="ts">
defineOptions({ name: 'TodoItemRow' })

const copy = useCopy()
const aria = useAria()
const props = defineProps<{
  modelValue: { id: string; text: string; completed: boolean; order: number }
  index: number
}>()
const emit = defineEmits<{
  'update:modelValue': [value: typeof props.modelValue]
  remove: []
  focus: []
}>()

function onToggle(value: boolean) {
  emit('update:modelValue', {
    ...props.modelValue,
    completed: value,
  })
}

function onTextInput(value: string | number) {
  emit('update:modelValue', { ...props.modelValue, text: String(value) })
}
</script>
