<template>
  <div class="relative min-w-0">
    <AppPageCard
      :to="routeToNote(note.id)"
      :orientation="notesView === 'list' ? 'horizontal' : 'vertical'"
      variant="soft"
      class="min-w-0 max-w-full overflow-hidden"
    >
      <template #body>
        <div class="min-w-0 overflow-hidden">
          <NoteCardTitle
            :display-title="display.displayTitle"
            :title-segments="display.titleSegments"
            :has-search-match="display.hasSearchMatchInTitle"
            title-class="m-0 mb-2 text-highlighted overflow-hidden text-ellipsis whitespace-nowrap pr-8"
          />
          <p v-if="note.createdAt" class="m-0 mb-2 text-xs text-muted">
            {{ formatNoteDate(note.createdAt) }}
          </p>
          <NoteCardTodosPreview
            :preview-todos="previewTodos"
            :extra-match-todo="extraMatchTodo ?? null"
            :todo-matches-search="display.todoMatchesSearch"
            :placeholder="copy.symbols.placeholderEmpty"
          />
        </div>
      </template>
    </AppPageCard>
    <button
      type="button"
      class="absolute top-2 right-2 z-10 w-7 h-7 inline-flex items-center justify-center rounded text-muted hover:text-highlighted hover:bg-accented focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      :aria-label="aria.deleteNote"
      @click.stop.prevent="emit('delete')"
    >
      <UIcon name="i-lucide-x" class="size-4" aria-hidden />
    </button>
  </div>
</template>

<script setup lang="ts">
import type { NotesView } from '@todo/domain'
import {
  type NoteCardNote,
  getDisplayTitle,
  getTitleSegments,
  todoMatchesSearch as todoMatchesSearchFn,
} from '~/lib/note-card-display'
import type { TodoForFilter } from '~/lib/notes-filter'
import { routeToNote } from '~/config/routes'
import { formatNoteDate } from '~/utils/date'

defineOptions({ name: 'NoteCard' })

const copy = useCopy()
const aria = useAria()
const props = defineProps<{
  note: NoteCardNote
  previewTodos: TodoForFilter[]
  notesView: NotesView
  /** Поисковый запрос (trim + toLowerCase) — рамка на задаче 1–3 при совпадении; 4-я строка при совпадении в задаче 4+ */
  searchQuery?: string
  /** Первая задача после превью (4+) с совпадением — показываем 4-й строкой с рамкой и полупрозрачностью */
  extraMatchTodo?: TodoForFilter | null
}>()

const display = computed(() => {
  const rawTitle = props.note.title ?? ''
  const query = props.searchQuery ?? ''
  const noTitleCopy = copy.value.noteEditor.noTitle
  const titleSegments = getTitleSegments(rawTitle, query, noTitleCopy)
  return {
    displayTitle: getDisplayTitle(rawTitle, noTitleCopy),
    titleSegments,
    hasSearchMatchInTitle: titleSegments.some((s) => s.type === 'match'),
    todoMatchesSearch: (todo: { text?: string }) => todoMatchesSearchFn(todo, query),
  }
})

const emit = defineEmits<{ delete: [] }>()
</script>
