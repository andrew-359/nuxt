/**
 * Typed route names — single source for navigateTo and NuxtLink.
 * Set the same names in definePageMeta on each page.
 */

export const RouteNames = {
  /** Notes list (index) */
  notes: "notes",
  /** Note editor — requires params: { id: string } */
  note: "note",
} as const;

export type RouteName = (typeof RouteNames)[keyof typeof RouteNames];

/** Location for notes list */
export function routeToNotes() {
  return { name: RouteNames.notes };
}

/** Location for a single note */
export function routeToNote(id: string) {
  return { name: RouteNames.note, params: { id } };
}
