<template>
  <div class="h-screen grid grid-rows-[auto_1fr_auto] bg-default">
    <header
      class="h-14 shrink-0 grid grid-cols-[1fr_auto] items-center gap-4 px-4 border-b border-default bg-elevated shadow-sm"
    >
      <div class="flex justify-between items-center gap-4 w-full min-w-0">
        <h1
          class="header-title m-0 text-xl font-semibold text-highlighted shrink-0 truncate"
        >
          {{ pageTitle }}
        </h1>
        <component :is="view.header.slot" v-if="view.header.slot" />
      </div>
      <nav
        class="flex items-center gap-3 shrink-0"
        :aria-label="aria.accountAndSettings"
      >
        <span
          v-if="view.nav.showAccountName && currentAccountName"
          class="text-sm text-muted truncate max-w-[8rem]"
          :title="currentAccountName"
        >
          {{ currentAccountName }}
        </span>
        <SettingsButton v-if="view.nav.showNav" />
      </nav>
    </header>
    <main class="min-h-0 overflow-auto p-4">
      <CreateAccountOnboarding v-if="!view.nav.showNav" />
      <NuxtPage v-else />
    </main>
    <footer
      class="h-12 shrink-0 border-t border-default bg-elevated text-sm text-muted"
    >
      <component :is="view.footer" v-if="view.footer" />
    </footer>
    <ModalRoot />
    <!--!!Компонент без нашей обертки -->
    <UToaster />
  </div>
</template>

<script setup lang="ts">
/**
 * Лейаут — базовая вёрстка: хедер, контент, футер. Наполнение из конфига (config/_pages + useDefaultLayout).
 */
import { useDefaultLayout } from "~/composables/layout";

defineOptions({ name: "LayoutDefault" });

const aria = useAria();
const localeStore = useLocaleStore();

const { pageTitle, view, currentAccountName } = useDefaultLayout();

useHead(() => ({ title: pageTitle.value }));
useHead(() => ({ htmlAttrs: { lang: localeStore.locale } }));
</script>
