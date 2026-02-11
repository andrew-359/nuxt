<template>
  <AppButton
    v-if="headerEditor"
    variant="secondary"
    class="inline-flex items-center gap-2 cursor-pointer"
    :aria-label="copy.noteEditor.backToList"
    @click="headerEditor.openBackToListModal()"
  >
    <UIcon name="i-lucide-arrow-left" class="size-4 shrink-0" aria-hidden />
    <span class="hidden sm:inline">{{ copy.noteEditor.backToList }}</span>
  </AppButton>
</template>

<script setup lang="ts">
/** Кнопка «К списку»; при несохранённых изменениях открывает модалку подтверждения. */
import { useLayoutState } from "~/composables/layout/useLayoutState";

defineOptions({ name: "ToListButton" });

const copy = useCopy();
const { headerEditor } = useLayoutState();
</script>
