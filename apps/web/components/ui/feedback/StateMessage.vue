<template>
  <div
    :class="stateClass"
    role="status"
    aria-live="polite"
  >
    <slot>
      <template v-if="type === 'loading'">{{ copy.state.loading }}</template>
      <template v-else-if="type === 'empty' && message">{{ message }}</template>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { stateMessageClass } from '~/config/state-message'
import type { StateMessageType } from '~/config/state-message'

defineOptions({ name: 'StateMessage' })

const copy = useCopy()
const props = withDefaults(
  defineProps<{
    type: StateMessageType
    message?: string
  }>(),
  { message: '' }
)

const stateClass = computed(() => stateMessageClass(props.type))
</script>
