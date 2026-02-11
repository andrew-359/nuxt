/**
 * Тип copy — контракт для всех локалей (ru, en, …).
 * Локали должны совпадать по структуре с этим типом.
 */
export interface Copy {
  readonly notesList: {
    readonly title: string
    readonly createNote: string
    readonly empty: string
    readonly noAccountsIntro: string
    readonly filterPlaceholder: string
    readonly sortBy: string
    readonly sortDir: string
    readonly viewList: string
    readonly viewCards: string
    readonly pageSize: string
    readonly noResultsForFilter: string
  }
  readonly noteEditor: {
    readonly pageTitle: string
    readonly backToList: string
    readonly notFound: string
    readonly noTitle: string
    readonly titleLabel: string
    readonly titlePlaceholder: string
    readonly todosTitle: string
    readonly todoPlaceholder: string
    readonly addTodo: string
    readonly toolbarA11y: string
    readonly undo: string
    readonly redo: string
    readonly save: string
    readonly cancel: string
    readonly deleteNote: string
    readonly toolbarUndo: string
    readonly toolbarRedo: string
    readonly toolbarSave: string
    readonly toolbarCancel: string
    readonly toolbarDelete: string
  }
  readonly state: {
    readonly loading: string
  }
  readonly account: {
    readonly label: string
    readonly openList: string
    readonly selectAccount: string
    readonly createAccount: string
    readonly deleteAccount: string
    readonly noName: string
  }
  readonly nav: {
    readonly appTitle: string
    readonly settings: string
    readonly openSettings: string
    readonly accountAndSettings: string
  }
  readonly actions: {
    readonly deleteNote: string
    readonly deleteTask: string
    readonly taskA11y: (index: number, text: string) => string
    readonly undoA11y: string
    readonly redoA11y: string
  }
  readonly symbols: {
    readonly todoDone: string
    readonly todoUndone: string
    readonly removeLabel: string
    readonly dropdownIcon: string
    readonly placeholderEmpty: string
    readonly addTask: string
    readonly undoIcon: string
    readonly redoIcon: string
    readonly saveIcon: string
    readonly cancelIcon: string
    readonly deleteIcon: string
  }
  readonly forms: {
    readonly defaultSubmitLabel: string
    readonly createAccount: {
      readonly description: string
      readonly nameLabel: string
      readonly namePlaceholder: string
      readonly submitLabel: string
      readonly errors: {
        readonly nameRequired: string
        readonly nameMinLength: string
      }
    }
  }
  readonly toasts: {
    readonly noteDeleted: string
    readonly accountDeleted: string
    readonly changesDiscarded: string
  }
  readonly modals: {
    readonly cancel: string
    readonly confirmDelete: string
    readonly deleteNote: {
      readonly titleWithName: (name: string) => string
      readonly description: string
    }
    readonly deleteAccount: {
      readonly titleWithName: (name: string) => string
      readonly description: string
    }
    readonly cancelEdit: {
      readonly title: string
      readonly description: string
      readonly cancelLabel: string
      readonly confirmLabel: string
    }
    readonly deleteTaskConfirm: string
  }
  readonly settings: {
    readonly title: string
    readonly close: string
    readonly save: string
    readonly fieldLabels: {
      readonly theme: string
      readonly notesView: string
      readonly sortBy: string
      readonly sortDir: string
      readonly locale: string
    }
    readonly hints: {
      readonly theme: string
    }
    readonly options: {
      readonly theme: { readonly light: string; readonly dark: string; readonly system: string }
      readonly notesView: { readonly list: string; readonly cards: string }
      readonly sortBy: {
        readonly updatedAt: string
        readonly createdAt: string
        readonly title: string
      }
      readonly sortDir: { readonly asc: string; readonly desc: string }
    }
    readonly locale: { readonly ru: string; readonly en: string }
    readonly localeShort: { readonly ru: string; readonly en: string }
  }
}
