<template>
  <div
    class="flex flex-wrap items-center justify-between gap-3 py-3 border-b border-default"
  >
    <UInput
      :model-value="notes.filterText"
      icon="i-lucide-search"
      size="sm"
      variant="outline"
      :placeholder="copy.notesList.filterPlaceholder"
      class="w-full sm:min-w-[12rem] sm:max-w-xs"
      @update:model-value="notes.setFilterText($event)"
    />
    <div
      class="w-full flex items-center gap-2 sm:w-auto sm:shrink-0 min-w-0"
    >
      <USelect
        :model-value="notes.settings.sortBy"
        :items="notes.sortByItems"
        value-key="value"
        icon="i-lucide-arrow-down-wide-narrow"
        size="sm"
        variant="outline"
        color="neutral"
        class="min-w-0 flex-1"
        :aria-label="copy.notesList.sortBy"
        @update:model-value="onSortByChange($event)"
      />
      <span class="shrink-0">
        <AscDescToggle
          :model-value="notes.settings.sortDir"
          @update:model-value="notes.setSortDir($event)"
        />
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SortBy, SortDir } from "@todo/domain";

defineOptions({ name: "NotesListToolbar" });

const copy = useCopy();
const props = defineProps<{
  notes: {
    filterText: string;
    setFilterText: (v: string) => void;
    settings: { sortBy: SortBy; sortDir: SortDir };
    sortByItems: Array<{ label: string; value: string }>;
    setSortBy: (value: SortBy) => void;
    setSortDir: (value: SortDir) => void;
  };
}>();

function onSortByChange(value: string) {
  props.notes.setSortBy(value as SortBy);
}
</script>
