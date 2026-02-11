/**
 * Конфиг наполнения страниц: по маршруту — компоненты хедера/футера и флаги вёрстки.
 * undefined = слот пустой (ничего не рендерим).
 */
import type { Component } from "vue";
import type { Copy } from "~/config/copy";
import type { RouteName } from "~/config/routes";
import { RouteNames } from "~/config/routes";
import HeaderNotes from "~/pages/__Header.vue";
import FooterNotes from "~/pages/_Footer.vue";
import NoteHeader from "~/pages/note/__Header.vue";

export type PageFilling = {
  header: Component | undefined;
  footer: Component | undefined;
  /** Заголовок страницы (для <title> и h1). */
  title: (copy: Copy) => string;
};

export const PAGE_FILLING: Record<RouteName, PageFilling> = {
  [RouteNames.notes]: {
    header: HeaderNotes,
    footer: FooterNotes,
    title: (c) => c.notesList.title,
  },
  [RouteNames.note]: {
    header: NoteHeader,
    footer: undefined,
    title: (c) => c.noteEditor.pageTitle,
  },
};

export function getPageFilling(routeName: string | undefined): PageFilling {
  if (!routeName) throw new Error("getPageFilling: routeName is required");
  const filling = PAGE_FILLING[routeName as RouteName];
  if (!filling)
    throw new Error(`getPageFilling: no config for route "${routeName}"`);
  return filling;
}

export function getPageTitle(
  routeName: string | undefined,
  copy: Copy,
): string {
  return getPageFilling(routeName).title(copy);
}
