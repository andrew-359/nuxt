<template>
  <div class="max-w-4xl mx-auto notes-page">
    <NotesListToolbar :notes="notes" />
    <NoteList :notes="notes" />
  </div>
</template>

<script setup lang="ts">
import { RouteNames } from "~/config/routes";
import { useNotesPage } from "~/composables/notes/useNotesPage";

definePageMeta({ name: RouteNames.notes });
defineOptions({ name: "NotesPage" });

const notes = useNotesPage();
</script>
