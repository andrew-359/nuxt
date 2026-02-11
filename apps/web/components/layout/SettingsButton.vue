<template>
  <UDropdownMenu
    v-model:open="dropdownOpen"
    :items="dropdownItems"
    :content="{ align: 'end', sideOffset: 8 }"
    :ui="{ content: 'text-sm' }"
    :aria-label="aria.accountAndSettings"
  >
    <UButton
      icon="i-lucide-settings"
      color="neutral"
      variant="ghost"
      size="sm"
      :aria-label="copy.nav.openSettings"
    />
    <template #content-top>
      <div class="flex items-center justify-center gap-3 px-3 py-2 border-b border-default">
        <ThemeToggle
          :options="themeOptions"
          :model-value="currentTheme"
          :group-label="copy.settings.fieldLabels.theme"
          @update:model-value="setTheme"
        />
        <LocaleToggle
          :options="localeOptions"
          :model-value="currentLocale"
          :group-label="copy.settings.fieldLabels.locale"
          @update:model-value="setLocale"
        />
      </div>
    </template>
    <template #content-bottom>
      <div class="flex w-full items-center gap-2 border-t border-default px-3 py-2">
        <UButton
          icon="i-lucide-plus"
          size="xs"
          color="neutral"
          variant="ghost"
          class="flex-1 min-w-0 justify-center"
          :aria-label="copy.account.createAccount"
          @click="onCreateAccountClick"
        />
        <UButton
          icon="i-lucide-trash-2"
          size="xs"
          color="error"
          variant="ghost"
          class="flex-1 min-w-0 justify-center"
          :aria-label="copy.account.deleteAccount"
          @click="onDeleteAccountClick"
        />
      </div>
    </template>
    <template v-for="a in accounts" :key="a.id" #[`account-${a.id}-trailing`]>
      <UIcon
        v-if="activeAccountId === a.id"
        name="i-lucide-check"
        class="shrink-0 size-5 text-primary"
        aria-hidden
      />
    </template>
  </UDropdownMenu>
</template>

<script setup lang="ts">
import { useLayoutNavSettingsFacade } from "~/composables/layout/useLayoutNavSettingsFacade";

defineOptions({ name: "SettingsButton" });

const copy = useCopy();
const aria = useAria();

const nav = useLayoutNavSettingsFacade();
const dropdownOpen = nav.dropdownOpen;
const themeOptions = nav.themeOptions;
const currentTheme = nav.currentTheme;
const setTheme = nav.setTheme;
const localeOptions = nav.localeOptions;
const currentLocale = nav.currentLocale;
const setLocale = nav.setLocale;
const dropdownItems = nav.dropdownItems;
const accounts = nav.accounts;
const activeAccountId = nav.activeAccountId;
const onCreateAccountClick = nav.onCreateAccountClick;
const onDeleteAccountClick = nav.onDeleteAccountClick;
</script>
