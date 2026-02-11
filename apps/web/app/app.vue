<template>
  <div :data-theme="resolvedTheme">
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { useUiSettings } from '~/composables/account'
const { resolvedTheme } = useUiSettings()
</script>
