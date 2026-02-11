declare module "vue-router" {
  interface RouteMeta {
    /** Заголовок страницы в хедере (слева) */
    pageTitle?: string;
    /** Header left zone: 'default' | 'notes' | 'note' */
    layoutHeader?: string;
    /** Footer: 'default' (year only) | 'notes' (year + paginator) */
    layoutFooter?: string;
  }
}
