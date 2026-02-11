<template>
  <AppModal
    v-model:open="modal.isOpen"
    :title="title"
    :description="description || undefined"
    :closable="!!modalConfig?.closable"
    :ui="
      modal.store.overlayType === 'modal'
        ? modalContentUi
        : { footer: 'justify-end gap-2' }
    "
  >
    <template
      v-if="modal.store.overlayType === 'confirm' && confirmConfig"
      #footer
    >
      <AppButton variant="secondary" @click="modal.close()">
        {{ confirmConfig.cancelLabel }}
      </AppButton>
      <AppButton
        :variant="
          confirmConfig.confirmVariant === 'danger' ? 'danger' : 'primary'
        "
        @click="modal.onConfirm"
      >
        {{ confirmConfig.confirmLabel }}
      </AppButton>
    </template>
    <template
      v-else-if="modal.store.overlayType === 'modal' && modalConfig"
      #content
    >
      <component
        :is="modalConfig?.component ?? 'div'"
        :payload="modal.store.payload"
        @close="modal.close()"
      />
    </template>
  </AppModal>
</template>

<script setup lang="ts">
import type { ConfirmKey, ModalKey } from "~/types";
import { computed } from "vue";
import { getConfirmTitle } from "~/config/overlay/confirms";
import { useModalRoot } from "~/composables/modal";
import { useAppConfigFacade } from "~/composables/i18n";

defineOptions({ name: "ModalRoot" });

const modal = useModalRoot();
const { copy, confirmsConfig, modalsConfig } = useAppConfigFacade();

//TODO
const confirmConfig = computed(() => {
  if (modal.store.overlayType !== "confirm" || modal.store.key == null)
    return null;
  return confirmsConfig.value[modal.store.key as ConfirmKey] ?? null;
});

const modalConfig = computed(() => {
  if (modal.store.overlayType !== "modal" || modal.store.key == null)
    return null;
  return modalsConfig.value[modal.store.key as ModalKey] ?? null;
});

const title = computed(() =>
  confirmConfig.value
    ? getConfirmTitle(
        copy.value,
        modal.store.key as ConfirmKey,
        modal.store.payload,
      )
    : (modalConfig.value?.title ?? ""),
);

const description = computed(
  () =>
    confirmConfig.value?.description ?? modalConfig.value?.description ?? "",
);

const modalContentUi = {
  content: "overflow-y-auto overflow-x-hidden min-w-0 max-h-[85vh]",
  width: "max-w-md w-[calc(100vw-2rem)]",
};
</script>
