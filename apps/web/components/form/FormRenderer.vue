<template>
  <form
    class="flex flex-col gap-4 min-w-0 max-w-full"
    v-bind="$attrs"
    @submit.prevent="onSubmit"
  >
    <template v-for="field in resolvedConfig.fields" :key="field.name">
      <AppFormField
        :label="field.label"
        :required="field.validation?.required"
        :error="formErrors[field.name]"
      >
        <component
          :is="INPUT_BY_KIND[field.kind]"
          v-bind="getBindings(field)"
        />
        <p
          v-if="field.kind === 'checkbox' && formErrors[field.name]"
          class="text-sm text-red-500 mt-1"
          role="alert"
        >
          {{ formErrors[field.name] }}
        </p>
      </AppFormField>
    </template>
    <div class="mt-2 w-full">
      <AppButton type="submit" variant="primary" class="w-full sm:w-auto">
        {{ submitLabel }}
      </AppButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import type { FormApi } from "~/types";
import type { FormConfig } from "@todo/domain";
import type { MaybeRefOrGetter } from "vue";
import { toValue } from "vue";
import { INPUT_BY_KIND } from "~/config/form/renderer";
import { useFormRendererFacade } from "~/composables/form";

const props = defineProps<{
  config: MaybeRefOrGetter<FormConfig>;
  formApi: FormApi;
}>();

const emit = defineEmits<{
  submit: [data: Record<string, unknown>];
}>();

const resolvedConfig = computed(() => toValue(props.config));
const renderer = useFormRendererFacade(resolvedConfig, props.formApi);
const getBindings = renderer.getBindings;
const submitLabel = renderer.submitLabel;
const handleSubmit = renderer.handleSubmit;
const formErrors = renderer.formErrors;

function onSubmit(ev: Event) {
  handleSubmit((values) => {
    emit("submit", values as Record<string, unknown>);
  })(ev);
}
</script>
