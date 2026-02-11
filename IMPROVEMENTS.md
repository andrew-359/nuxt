# Доработки

Компоненты, рекомендованные к декомпозиции:

| Компонент                                       | Строк | Что разнести                                                           |
| ----------------------------------------------- | ----- | ---------------------------------------------------------------------- |
| `apps/web/components/layout/SettingsButton.vue` | 86    | Блок настроек (тема/локаль) и блок аккаунтов — в отдельные компоненты. |
| `apps/web/components/modal/ModalRoot.vue`       | 86    | Confirm и modal — в отдельные подкомпоненты по типу оверлея.           |
| `apps/web/components/notes/card/NoteCard.vue`   | 80    | Кнопку удаления — в `NoteCardDeleteButton.vue`.                        |

---


**Config импортирует компоненты** (`config/_pages.ts`, `config/form/renderer/form-renderer.ts`) — временное решение для удобства. Позже маппинг id → компонент — в layout/composables.
