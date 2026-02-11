<template>
  <UCard v-bind="cardProps">
    <template v-if="$slots.header" #header>
      <slot name="header" />
    </template>
    <slot />
    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </UCard>
</template>

<script setup lang="ts">
/**
 * Обёртка над UCard. Варианты: outline, soft, subtle, solid.
 * Слоты: header, default (body), footer.
 */
const props = withDefaults(
  defineProps<{
    variant?: 'solid' | 'outline' | 'soft' | 'subtle'
  }>(),
  { variant: 'outline' }
)

const cardProps = computed(() => ({ variant: props.variant }))
</script>
