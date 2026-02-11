/**
 * Domain: types, rules, repository contracts, form config.
 * No storage, no UI.
 */

export type {
  Account,
  AccountCreate,
  EntityId,
  IsoDate,
  Note,
  NoteCreate,
  NoteUpdate,
  Todo,
  TodoCreate,
  TodoUpdate,
} from "./types";

export { NOTES_VIEW, SORT_BY, SORT_DIR, THEME } from "./constants";
export type { NotesView, SortBy, SortDir, Theme } from "./constants";

export { DEFAULT_USER_SETTINGS, normalizeUserSettings } from "./settings";
export type { UserSettings } from "./settings";

export type {
  AccountRepository,
  NotesRepository,
  RepoError,
  RepoErrorCodeType,
  SettingsRepository,
} from "./repositories";
export { RepoErrorCode } from "./repositories";
export type { RepoResult } from "./repositories";

export {
  deepEqual,
  filterNotesByQuery,
  generateId,
  matchesQuery,
  normalizeSearchQuery,
  nowISO,
  slicePage,
  sortByOrder,
  sortNotes,
  suggestNextAccountId,
  totalPages,
} from "./utils";

export {
  createAccountSchema,
  toAccountCreate,
  CREATE_ACCOUNT_FIELD_DEFS,
} from "./schemas/create-account";
export type {
  CreateAccountMessages,
  CreateAccountValues,
} from "./schemas/create-account";

export { FIELD_KINDS, validateForm } from "./form";
export type {
  BaseFieldConfig,
  CheckboxFieldConfig,
  FieldConfig,
  FieldKind,
  FieldValidationResult,
  FormConfig,
  FormValidationResult,
  NumberFieldConfig,
  SelectFieldConfig,
  SelectOption,
  TextFieldConfig,
  ValidationRule,
  Validator,
} from "./form";

export type { NotesPageResult, NotesQueryParams } from "./notes-query";
