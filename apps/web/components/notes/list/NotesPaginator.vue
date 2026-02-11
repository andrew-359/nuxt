<template>
  <AppPagination
    :page="notes.page"
    :total="notes.totalNotes"
    :items-per-page="notes.pageSize"
    @update:page="(v: number) => (notes.page = v)"
  />
</template>

<script setup lang="ts">
import { useNotesPage } from "~/composables/notes/useNotesPage";

defineOptions({ name: "NotesPaginator" });

const notes = useNotesPage();
</script>
