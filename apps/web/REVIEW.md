# Ревью: чистота кода и разделение ответственности (apps/web)

## Структура слоёв

```
pages/          → маршруты, минимальная связка (composable + template)
layouts/        → вёрстка, наполнение из конфига
components/     → UI: ui/* примитивы, layout/* навигация, notes/*, form/, modal/, account/
composables/    → логика страниц, фасады конфигов, форма, модалки, аккаунт, layout
config/         → конфиги страниц, overlay, copy, формы, роуты, типы
stores/          → состояние + работа через api
api/             → фасад над @todo/storage (одна точка входа)
lib/             → чистые хелперы (фильтр, вид списка, формат даты)
middleware/      → глобальная проверка аккаунта
```

---

## Что сделано хорошо

### 1. API и хранилище
- **api/index.ts** — единственная точка входа для сторов; реализацию (IndexedDB/localStorage) можно заменить без правок сторов.
- Сторы не импортируют конкретные api-модули, только `~/api`.

### 2. Сторы
- Доменная ответственность: notes, account, settings, overlay (modal), i18n (locale), ui.
- Не содержат UI-логики, только состояние и вызовы API.
- Типы домена из `@todo/domain`.

### 3. Composables
- Фасады композируют хуки: **useAppConfigFacade**, **useLayoutNavSettingsFacade**, **useFormRendererFacade**.
- Логика страниц вынесена из компонентов: **useNotesPage**, **useNoteEditor** — страница только биндит template к composable.
- **useModalRoot** — связка store ↔ ref для модалки, одна точка.
- **useLayoutState** — общий ref (headerEditor), страница регистрирует, layout читает; чёткое разделение.

### 4. Конфиг
- **config/routes.ts** — имена маршрутов и хелперы навигации.
- **config/overlay/** — ключи, конфиги модалок и подтверждений; конфиги зависят только от copy (i18n).
- **config/copy** — строки по локалям, типы в config/copy/types.
- **config/settings.ts**, **config/notes/notes-list.ts** — конфиги от copy или чистые хелперы (lib).

### 5. lib
- **notes-filter**, **notes-list-view**, **date-format**, **note-card-display** — чистые функции, без стора и copy там, где не нужно.

### 6. Middleware
- **account.global.ts** — только проверка наличия аккаунта и редиректы; без бизнес-логики.

### 7. Типизация
- Домен — `@todo/domain`.
- Конфиги — **config/types/**.
- Form API — **types/form.ts** (можно со временем перенести в config/types для единообразия).

---

## Замечания и рекомендации

### 1. ~~Дублирование: NavMenu и SettingsButton~~ (сделано)
- Оставлен только **SettingsButton**, **NavMenu** удалён.

### 2. Конфиг страниц зависит от компонентов страниц
- **config/_pages.ts** импортирует **HeaderNotes**, **FooterNotes**, **NoteHeader** из `~/pages/...`.
- Конфиг оказывается привязан к конкретным Vue-компонентам и к структуре pages.
- **Рекомендация:** при желании усилить разделение — хранить в конфиге идентификаторы (например, `header: 'notes'`), а маппинг id → компонент делать в layout или в одном месте в pages. Текущий вариант допустим для небольшого приложения.

### 3. Form renderer: конфиг знает о компонентах
- **config/form/renderer/form-renderer.ts** импортирует **AppInput**, **AppCheckbox**, **AppSelect** и собирает **INPUT_BY_KIND** / **FORM_RENDERER_CONFIG**.
- Это не «чистый» конфиг данных, а слой привязки kind → компонент + биндинги.
- **Рекомендация:** можно оставить как есть (логичное место для такой сборки) или переименовать/вынести в **composables/form/renderer/** как «регистр компонентов формы», оставив в config только типы и правила биндингов.

### 4. ~~Два пути «создать аккаунт»~~ (сделано)
- **CreateAccountModal.vue** удалён, используется только store + ModalRoot + CreateAccountFormContent.

### 5. ~~Типы в двух корнях~~ (сделано)
- Общий **types/** с подпапками: **types/overlay.ts**, **types/form.ts**, **types/notes.ts**, **types/settings.ts**, **types/index.ts**. **config/types** реэкспортирует из **~/types** для совместимости.

### 6. app.vue и тема
- В **app.vue** — `watch(settings.theme, …)` и синхронизация с **colorMode**.
- В **useNavThemeOptions** при смене темы вызывается и **setSettings**, и **colorMode.preference**.
- Дублирования по смыслу нет: app.vue синхронизирует начальное и последующие изменения темы с Nuxt UI, useNavThemeOptions обрабатывает действие пользователя в меню. Можно оставить как есть; при рефакторинге темы стоит держать «источник истины» в одном месте (например, только в store + app.vue sync).

---

## Зависимости между слоями (направление)

- **pages** → composables, config (routes, copy).
- **layouts** → config (_pages), composables (layout), components.
- **components** → composables, config (copy, overlay), редко stores напрямую (чаще через composables).
- **composables** → stores, config, api (только через stores), lib.
- **config** → copy, типы; часть конфигов импортирует компоненты (см. выше).
- **stores** → api, config (только идентификаторы стора), domain.
- **api** → только @todo/storage и контракты домена.

Главное нарушение: **config** тянет за собой Vue-компоненты (pages, form renderer). Для текущего размера приложения это приемлемо; при росте лучше вынести «сборку» (маппинг id → компонент) из конфига в слой выше.

---

## Итог

- Разделение ответственности в целом соблюдено: API фасад, сторы без UI, логика в composables, конфиги и copy отдельно.
- Главные точки для «чистоты»:
  1. Убрать дубликат **NavMenu** или оставить один компонент меню настроек.
  2. Решить судьбу **CreateAccountModal** (один сценарий открытия модалки создания аккаунта).
  3. При росте — ослабить связь config → компоненты (страницы, form renderer) и упорядочить расположение типов.
