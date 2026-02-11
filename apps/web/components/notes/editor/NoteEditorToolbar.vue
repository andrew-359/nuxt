<template>
  <div
    v-if="editor"
    class="flex items-center gap-2 flex-wrap"
    role="group"
    :aria-label="copy.noteEditor.toolbarA11y"
  >
    <AppButton
      v-for="btn in toolbarButtons"
      :key="btn.id"
      :variant="btn.variant"
      :aria-label="btn.getAria(copy, aria)"
      :disabled="btn.getDisabled(editor)"
      class="inline-flex items-center gap-1.5 sm:gap-2 text-inherit"
      @click="btn.onClick(editor)"
    >
      <UIcon :name="btn.icon" class="size-4 shrink-0" aria-hidden />
      <span class="hidden sm:inline">{{ btn.getLabel(copy) }}</span>
    </AppButton>
  </div>
</template>

<script setup lang="ts">
/**
 * 7.1 Блок кнопок редактора (Назад, Вперёд, Сохранить, Отмена, Удалить).
 * Рендерится на странице редактора заметки; editor берётся через inject(NOTE_EDITOR_KEY).
 * На мобиле — только иконки (hidden sm:inline у подписей), на десктопе — иконка + текст.
 */
import type { LayoutHeaderEditor } from "~/composables/layout";
import { getNoteEditorToolbarButtons } from "~/config/notes/note-editor-toolbar";
import { inject } from "vue";
import { NOTE_EDITOR_KEY } from "~/composables/notes/useNoteEditor";

defineOptions({ name: "NoteEditorToolbar" });

const copy = useCopy();
const aria = useAria();

const toolbarButtons = computed(() =>
  getNoteEditorToolbarButtons(copy.value, aria.value)
);

const props = defineProps<{
  /** В хедере передаётся из layout state; в контенте (мобилка) — не передавать, используется inject */
  editor?: LayoutHeaderEditor | null;
  optional?: boolean;
}>();

const injected = inject<LayoutHeaderEditor | null>(NOTE_EDITOR_KEY, null);
const editor = computed(() => props.editor ?? injected);
</script>
