<template>
  <UModal
    :open="unref(open) ?? false"
    :title="title"
    :description="description"
    :close="unref(closable)"
    :dismissible="unref(closable)"
    :ui="modalUi"
    @update:open="emit('update:open', $event)"
  >
    <template v-if="$slots.content" #body>
      <slot name="content" />
    </template>
    <template v-if="$slots.footer" #footer="slotProps">
      <slot name="footer" v-bind="slotProps" />
    </template>
  </UModal>
</template>

<script setup lang="ts">
/**
 * Обёртка над UModal. Состояние открыт/закрыт — у родителя (стор).
 * Любое закрытие из UModal (крестик, оверлей, Escape) → update:open(false) → родитель вызывает close().
 */
import { computed, unref, type MaybeRef } from 'vue'

const props = withDefaults(
  defineProps<{
    /** Состояние открыт/закрыт (поддержка ref/computed для v-model). */
    open?: MaybeRef<boolean>
    title?: string
    description?: string
    /** Закрытие по крестику и клику по оверлею (по умолчанию true). */
    closable?: MaybeRef<boolean>
    /** Доп. ui для UModal (например { width: 'max-w-md', footer: 'justify-end gap-2' }) */
    ui?: Record<string, string>
  }>(),
  { open: undefined, title: undefined, description: undefined, closable: true, ui: undefined }
)

const emit = defineEmits<{ 'update:open': [value: boolean] }>()

// Контент модала — pointer-events-auto, чтобы клики не уходили сквозь него. Оверлей без переопределения — клик по нему закрывает модал (поведение UModal по умолчанию).
const modalUi = computed(() => {
  const u = props.ui ?? {}
  return {
    ...u,
    content: ['pointer-events-auto', u.content].filter(Boolean).join(' '),
  }
})
</script>
