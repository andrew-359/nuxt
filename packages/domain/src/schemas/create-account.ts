/**
 * Create-account form: schema + field defs.
 * Single source of truth for validation (frontend + backend) and form structure.
 */

import * as yup from 'yup'
import type { AccountCreate } from '../types'

export interface CreateAccountMessages {
  nameRequired: string
  nameMinLength: string
}

/** Field structure for FormConfig; copy provides labels/placeholders. */
export const CREATE_ACCOUNT_FIELD_DEFS = [
  { name: 'name', kind: 'text' as const },
] as const

export function createAccountSchema(messages: CreateAccountMessages) {
  return yup.object({
    name: yup
      .string()
      .required(messages.nameRequired)
      .min(1, messages.nameMinLength)
      .trim(),
  })
}

export type CreateAccountValues = yup.InferType<
  ReturnType<typeof createAccountSchema>
>

/** Map validated form values to AccountCreate (same shape; explicit for backend reuse). */
export function toAccountCreate(values: CreateAccountValues): AccountCreate {
  return { name: values.name }
}
