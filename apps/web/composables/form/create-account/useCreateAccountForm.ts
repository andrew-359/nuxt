import type { FormApi } from '~/types'
import { createAccountSchema } from '@todo/domain'
import { toTypedSchema } from '@vee-validate/yup'

/**
 * Form bus for create-account: vee-validate + yup schema from domain.
 * Use the returned API in FormRenderer (form-api prop) and handle submit in the parent.
 */
export function useCreateAccountForm(): FormApi {
  const copy = useCopy()
  const schema = createAccountSchema(copy.value.forms.createAccount.errors)

  const form = useForm({
    validationSchema: toTypedSchema(schema),
    initialValues: { name: '' },
  })

  return form as unknown as FormApi
}
