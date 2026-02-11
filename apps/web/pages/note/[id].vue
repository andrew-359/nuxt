<template>
  <div class="max-w-[40rem] mx-auto">
    <StateMessage v-if="editor.loading" type="loading" />
    <StateMessage
      v-else-if="!editor.note"
      type="empty"
      :message="copy.noteEditor.notFound"
    />
    <template v-else>
      <div class="outline-none flex flex-col gap-6">
        <NoteEditorToolbar class="flex flex-wrap items-center gap-2 text-sm" />
        <NoteEditorForm />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { RouteNames } from "~/config/routes";
import { useLayoutState } from "~/composables/layout/useLayoutState";
import {
  useNoteEditor,
  NOTE_EDITOR_KEY,
} from "~/composables/notes/useNoteEditor";

definePageMeta({ name: RouteNames.note });
defineOptions({ name: "NoteEditorPage" });

const copy = useCopy();
const editor = useNoteEditor();
const { setHeaderEditor } = useLayoutState();

provide(NOTE_EDITOR_KEY, editor);

// Регистрируем editor в layout state — кнопка «К списку» (ToListButton) получает его для openBackToListModal
onMounted(() => setHeaderEditor(editor));
onUnmounted(() => setHeaderEditor(null));
</script>
