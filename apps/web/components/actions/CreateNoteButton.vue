<template>
  <AppButton
    variant="primary"
    icon="i-lucide-plus"
    class="cursor-pointer"
    :aria-label="copy.notesList.createNote"
    @click="notes.createNote"
  >
    <span class="hidden sm:inline">{{ copy.notesList.createNote }}</span>
  </AppButton>
</template>

<script setup lang="ts">
import { useNotesPage } from "~/composables/notes/useNotesPage";

defineOptions({ name: "CreateNoteButton" });

const copy = useCopy();
const notes = useNotesPage();
</script>
