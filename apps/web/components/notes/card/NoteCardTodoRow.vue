<template>
  <li :class="rowClass">
    <UIcon
      :name="todo.completed ? 'i-lucide-circle-check-big' : 'i-lucide-circle'"
      :class="['shrink-0 size-4', todo.completed ? 'text-green-600' : 'text-muted']"
      aria-hidden
    />
    <span class="min-w-0 truncate">{{ todo.text || placeholder }}</span>
  </li>
</template>

<script setup lang="ts">
import type { TodoForFilter } from '~/lib/notes-filter'

defineOptions({ name: 'NoteCardTodoRow' })

const props = defineProps<{
  todo: TodoForFilter
  /** Additional class for search match highlight */
  highlightClass?: string
  placeholder?: string
}>()

const rowClass = computed(() => [
  'flex items-center gap-2 rounded px-1.5 py-0.5 -mx-0.5 min-w-0',
  props.todo.completed && 'line-through opacity-90',
  props.highlightClass,
].filter(Boolean))
</script>
