<template>
  <ul
    v-if="previewTodos.length > 0 || extraMatchTodo"
    class="m-0 p-0 list-none space-y-1.5 text-muted min-w-0"
    :class="NOTE_CARD_TODO_TEXT_CLASS"
  >
    <NoteCardTodoRow
      v-for="todo in previewTodos"
      :key="todo.id"
      :todo="todo"
      :highlight-class="todoMatchesSearch(todo) ? searchHighlightTodoRowClass : undefined"
      :placeholder="placeholder"
    />
    <NoteCardTodoRow
      v-if="extraMatchTodo"
      :todo="extraMatchTodo"
      :highlight-class="searchHighlightExtraRowClass"
      :placeholder="placeholder"
    />
  </ul>
</template>

<script setup lang="ts">
import type { TodoForFilter } from '~/lib/notes-filter'
import { NOTE_CARD_TODO_TEXT_CLASS } from '~/config/constants'
import {
  SEARCH_HIGHLIGHT_EXTRA_ROW,
  SEARCH_HIGHLIGHT_TODO_ROW_MATCH,
} from '~/config/ui'

defineOptions({ name: 'NoteCardTodosPreview' })

defineProps<{
  previewTodos: TodoForFilter[]
  extraMatchTodo: TodoForFilter | null
  todoMatchesSearch: (todo: { text?: string }) => boolean
  placeholder: string
}>()

const searchHighlightTodoRowClass = SEARCH_HIGHLIGHT_TODO_ROW_MATCH
const searchHighlightExtraRowClass = SEARCH_HIGHLIGHT_EXTRA_ROW
</script>
