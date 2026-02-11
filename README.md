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
