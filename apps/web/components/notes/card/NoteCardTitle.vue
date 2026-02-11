<template>
  <h2 :class="[NOTE_CARD_TITLE_CLASS, titleClass]">
    <template v-if="hasSearchMatch && titleSegments.length">
      <template v-for="(seg, i) in titleSegments" :key="i">
        <span v-if="seg.type === 'match'" :class="searchHighlightClass">{{ seg.value }}</span>
        <span v-else>{{ seg.value }}</span>
      </template>
    </template>
    <template v-else>{{ displayTitle }}</template>
  </h2>
</template>

<script setup lang="ts">
import type { HighlightSegment } from '~/lib/note-card-display'
import { NOTE_CARD_TITLE_CLASS } from '~/config/constants'
import { SEARCH_HIGHLIGHT_TITLE_MATCH } from '~/config/ui'

defineOptions({ name: 'NoteCardTitle' })

defineProps<{
  displayTitle: string
  titleSegments: HighlightSegment[]
  hasSearchMatch: boolean
  titleClass?: string
}>()

const searchHighlightClass = SEARCH_HIGHLIGHT_TITLE_MATCH
</script>
