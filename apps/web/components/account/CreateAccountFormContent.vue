<template>
  <div class="p-4 flex flex-col gap-4 min-w-0 max-w-full overflow-hidden">
    <FormRenderer
      :config="createAccountFormConfig"
      :form-api="createAccountForm"
      class="w-full min-w-0 max-w-full"
      @submit="onSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { useCreateAccountFlow } from '~/composables/account'

defineOptions({ name: 'CreateAccountFormContent' })

const emit = defineEmits<{ close: [] }>()
const { createAccountFormConfig, createAccountForm, handleSubmit } =
  useCreateAccountFlow()

async function onSubmit(data: Record<string, unknown>) {
  await handleSubmit(data)
  emit('close')
}
</script>
