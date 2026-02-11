<template>
  <StateMessage v-if="notes.listView === 'loading'" type="loading" />
  <StateMessage
    v-else-if="notes.listView === 'empty'"
    type="empty"
    :message="notes.emptyMessage"
  />
  <div
    v-else
    data-testid="notes-list"
    class="notes-list-grid mt-4 grid gap-4"
  >
    <NoteCard
      v-for="note in notes.paginatedNotes"
      :key="note.id"
      :note="note"
      :preview-todos="notes.previewTodos(note.id)"
      :search-query="notes.normalizedFilterQuery || undefined"
      :extra-match-todo="notes.getExtraMatchTodo(note.id)"
      :notes-view="notes.settings.notesView"
      @delete="notes.openDeleteModal(note)"
    />
  </div>
</template>

<script setup lang="ts">
import type { Note, NotesView } from '@todo/domain'
import type { TodoForFilter } from '~/lib/notes-filter'
import type { NotesListView } from '~/config/notes/notes-list'

defineOptions({ name: 'NoteList' })

defineProps<{
  notes: {
    listView: NotesListView
    emptyMessage: string
    settings: { notesView: NotesView }
    paginatedNotes: Note[]
    normalizedFilterQuery: string
    previewTodos: (noteId: string) => TodoForFilter[]
    getExtraMatchTodo: (noteId: string) => TodoForFilter | null
    openDeleteModal: (note: Note) => void
  }
}>()
</script>
