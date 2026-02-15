# Notes · Todo

## SPA для заметок с тудушками. Локальное хранение (IndexedDB). Monorepo.

## Стек

**Apps:** Nuxt 4 (Vue 3), Pinia, VeeValidate + Yup, Nuxt UI  
**Packages:** `domain` (типы, схемы, контракты репозиториев) · `storage` (IndexedDB) · `shared-config` · `testing`

---

## Идея архитектуры

Слои: **pages** → composables + template, **layouts** → конфиг наполнения, **components** → примитивы и блоки по доменам, **composables** → логика и фасады, **config** → ключи и декларативные описания, **stores** → состояние, **api** → фасад хранилища, **lib** → чистые хелперы.

Под всё подложены **шины** — одна точка входа, один канал:

- **Данные:** сторы ходят только в `api`; замена IndexedDB на HTTP = правки в api.
- **Оверлей:** модалки и подтверждения — один store (ключ + payload), открытие через `openConfirm` / `openModal`, конфиг по ключу.
- **Контент и i18n:** copy по локали, конфиги форм/модалок/настроек зависят от copy; строки и перечисления в одном месте.

Логика не в компонентах: страница тянет хук, компонент биндит данные и колбэки. Правила и сущности — в `domain`, в приложении только связки и UI.
`{ ssr: false } - так как в ТЗ указанно SPA.`

---

## К доработке (то что не успел)

- **Реализовать транзакцию на удаление юзера** сейчас записи остаются в бд - нужна транзакция на уровне репозитория, удаление аккаунта должно каскадно удалять его данные (оверхед в рамках того что мы пишем фе).

- **useNotesPage()** Разделить на:
  Model composable (без side effects),
  Controller composable (с side effects) (синглтон не рекомендую)

- **watch()** почистить лишние вотчеры.
- **Циклические зависимости** - меньше использовать barrel-реэкспорты (index.ts) (оставить только для модулей) и правильно декомпозировать все, что касается i18n.
---

## Структура репо

```
apps/web          — Nuxt SPA
  composables/    — по доменам: form, account, notes, layout, modal
  components/     — ui/, layout/, notes/, form/, modal/, account/
  config/         — overlay, copy, формы, роуты; декларативно
  lib/            — фильтры, поиск, формат даты
  stores/         — состояние; данные только через api/
  api/            — фасад над @todo/storage

packages/domain   — сущности, репозитории (интерфейсы)
packages/storage  — реализация репозиториев (IndexedDB)
```

---

## Запуск

```bash
npm install
npm run dev        # apps/web
npm run typecheck
npm run test:unit
```

По ТЗ (со старыми версиями могут быть проблемы):
Docker: `docker-compose up` → http://0.0.0.0:3000/

Рекомендовано (новая вер. compose в пакете Docker):
Docker: `docker compose up` → http://0.0.0.0:3000/
