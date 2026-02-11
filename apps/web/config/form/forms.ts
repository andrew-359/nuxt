import type { FormConfig, TextFieldConfig, CreateAccountValues } from '@todo/domain'
import { CREATE_ACCOUNT_FIELD_DEFS } from '@todo/domain'
import type { Copy } from '~/config/copy'

/** Форма «Создать аккаунт» — поле из schema (domain), labels/placeholder из copy. */
export function getCreateAccountFormConfig(copy: Copy): FormConfig<CreateAccountValues> {
  const c = copy.forms.createAccount
  const fields: TextFieldConfig[] = CREATE_ACCOUNT_FIELD_DEFS.map((def) => ({
    kind: 'text',
    name: def.name,
    label: c.nameLabel,
    placeholder: c.namePlaceholder,
  }))
  return {
    fields,
    submitLabel: c.submitLabel,
  }
}
