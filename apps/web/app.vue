<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { useUiSettings } from "~/composables/account";

const { settings } = useUiSettings();
const colorMode = useColorMode();

watch(
  () => settings.value.theme,
  (theme) => {
    if (theme && colorMode.preference !== theme) {
      colorMode.preference = theme;
    }
  },
  { immediate: true },
);
</script>
