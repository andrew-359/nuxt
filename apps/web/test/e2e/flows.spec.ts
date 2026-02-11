/**
 * E2E: confirm "discard and leave" from editor — modal opens, confirm discards and navigates to list.
 */
import { test, expect } from '@playwright/test'

async function ensureAccount(page: import('@playwright/test').Page) {
  await page.goto('/')
  const form = page.getByPlaceholder('Введите имя')
  if (await form.isVisible()) {
    await form.fill('E2E')
    await page.getByRole('button', { name: 'Создать аккаунт' }).click()
    await expect(page.getByRole('button', { name: 'Создать заметку' })).toBeVisible({ timeout: 10000 })
  } else {
    await expect(page.getByRole('button', { name: 'Создать заметку' })).toBeVisible({ timeout: 5000 })
  }
}

test.describe('editor discard confirm', () => {
  test('cancel-edit from editor: confirm discards and navigates to list', async ({
    page,
  }) => {
    await ensureAccount(page)
    const noteId = crypto.randomUUID()
    await page.goto(`/note/${noteId}`)
    await expect(page.getByPlaceholder('Название заметки')).toBeVisible({ timeout: 10000 })

    await page.getByPlaceholder('Название заметки').fill('E2E cancel test')
    await page.getByRole('button', { name: 'Отмена' }).click()

    await expect(
      page.getByRole('dialog').getByRole('button', { name: 'Отменить изменения' }),
    ).toBeVisible()
    await page
      .getByRole('dialog')
      .getByRole('button', { name: 'Отменить изменения' })
      .click()

    await expect(page).toHaveURL('/')
    await expect(page.getByRole('dialog')).not.toBeVisible()
  })
})
