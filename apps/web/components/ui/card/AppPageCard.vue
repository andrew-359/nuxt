<template>
  <UPageCard
    :title="title"
    :description="description"
    :to="to"
    :variant="variant"
    :orientation="orientation"
    class="app-card-border app-card-bg app-card-hover"
    v-bind="$attrs"
  >
    <template v-if="$slots.header" #header>
      <slot name="header" />
    </template>
    <template v-if="$slots.body" #body>
      <slot name="body" />
    </template>
    <template v-else #body>
      <slot />
    </template>
    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </UPageCard>
</template>

<script setup lang="ts">
/**
 * Обёртка над UPageCard. Карточка с заголовком, описанием, ссылкой (to).
 * Слоты: header, body, footer, default.
 */
defineProps<{
  title?: string
  description?: string
  to?: string | object
  variant?: 'solid' | 'outline' | 'soft' | 'subtle' | 'ghost' | 'naked'
  orientation?: 'vertical' | 'horizontal'
}>()
</script>
