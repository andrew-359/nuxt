/**
 * Copy по локалям и useCopy() — единая точка доступа к строкам интерфейса.
 * Локаль берётся из useLocaleStore().
 */
import { computed } from "vue";
import type { Copy } from "./types";
import { copy as copyRu } from "./locales/ru";
import { copy as copyEn } from "./locales/en";

export type { Copy } from "./types";
export type LocaleCode = 'ru' | 'en';

/** Коды локалей — единый источник с i18n (copyByLocale). */
export const LOCALE_CODES: readonly LocaleCode[] = ['ru', 'en']

const copyByLocale: Record<LocaleCode, Copy> = {
  ru: copyRu,
  en: copyEn,
};

export const defaultLocale: LocaleCode = "ru";

/** Copy для конкретной локали (без реактивности). Для SSR или тестов. */
export function getCopyForLocale(locale: LocaleCode): Copy {
  return copyByLocale[locale] ?? copyByLocale[defaultLocale];
}

export function useCopy() {
  const localeStore = useLocaleStore();
  return computed<Copy>(
    () => copyByLocale[localeStore.locale] ?? copyByLocale[defaultLocale],
  );
}
