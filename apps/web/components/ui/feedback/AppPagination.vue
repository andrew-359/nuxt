<template>
  <UPagination
    :page="page"
    :total="total"
    :items-per-page="itemsPerPage"
    :sibling-count="siblingCount"
    :show-edges="showEdges"
    v-bind="$attrs"
    @update:page="(v: number) => $emit('update:page', v)"
  />
</template>

<script setup lang="ts">
/**
 * Обёртка над UPagination. v-model:page, total, items-per-page.
 */
withDefaults(
  defineProps<{
    page: number
    total: number
    itemsPerPage?: number
    siblingCount?: number
    showEdges?: boolean
  }>(),
  { itemsPerPage: 10, siblingCount: 1, showEdges: true }
)

defineEmits<{ 'update:page': [value: number] }>()
</script>
