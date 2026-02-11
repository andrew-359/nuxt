<template>
  <div class="max-w-md mx-auto py-6">
    <p class="text-muted mb-4">{{ copy.notesList.noAccountsIntro }}</p>
    <div class="mt-4 p-4 rounded-lg border border-default bg-elevated">
      <FormRenderer
        :config="createAccountFormConfig"
        :form-api="createAccountForm"
        @submit="onSubmit"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCreateAccountFlow } from '~/composables/account'

defineOptions({ name: 'CreateAccountOnboarding' })

const copy = useCopy()
const { createAccountFormConfig, createAccountForm, handleSubmit } =
  useCreateAccountFlow()

async function onSubmit(data: Record<string, unknown>) {
  await handleSubmit(data)
}
</script>
