import { expect, test } from '@playwright/test'

const candidate = 'http://localhost:4602'

test('candidate native select exposes real select option and optgroup hooks', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/native-select/default`)
  let select = page.locator('select[data-radcn-native-select]')
  await expect(page.locator('[data-radcn-native-select-wrapper]')).toHaveAttribute('data-size', 'default')
  await expect(select).toHaveAttribute('name', 'status')
  await expect(select).toHaveValue('todo')
  await expect(page.getByLabel('Status')).toHaveId('candidate-status')
  await expect(page.locator('option[data-radcn-native-select-option]')).toHaveCount(5)
  await expect(page.locator('[data-radcn-native-select-icon]')).toHaveAttribute('aria-hidden', 'true')

  await page.goto(`${candidate}/fixtures/native-select/groups`)
  await expect(page.locator('optgroup[data-radcn-native-select-optgroup]').first()).toHaveAttribute('label', 'Engineering')
  await expect(page.locator('option[data-radcn-native-select-option][value="frontend"]')).toHaveText('Frontend')
})

test('candidate native select exposes disabled invalid size and custom hooks', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/native-select/disabled`)
  await expect(page.locator('select[data-radcn-native-select]')).toBeDisabled()

  await page.goto(`${candidate}/fixtures/native-select/invalid`)
  let invalid = page.locator('select[data-radcn-native-select]')
  await expect(invalid).toHaveAttribute('aria-invalid', 'true')
  await expect(invalid).toHaveAttribute('aria-describedby', 'candidate-role-error')
  await expect(page.locator('[data-radcn-field-error]')).toHaveText('Choose a role.')

  await page.goto(`${candidate}/fixtures/native-select/sizes`)
  await expect(page.locator('[data-radcn-native-select-wrapper][data-size="default"]')).toHaveCount(1)
  await expect(page.locator('[data-radcn-native-select-wrapper][data-size="sm"]')).toHaveCount(1)
  await expect(page.locator('select[data-radcn-native-select][data-size="sm"]')).toHaveClass(/radcn-native-select--sm/)

  await page.goto(`${candidate}/fixtures/native-select/custom-token`)
  let custom = page.locator('[data-radcn-native-select-wrapper]')
  await expect(custom).toHaveClass(/radcn-fixture-custom-native-select/)
  await expect(page.locator('select[data-radcn-native-select]')).toHaveCSS('border-color', 'rgb(15, 118, 110)')
})

test('candidate native select preserves submit reset and required validation', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/native-select/form-submit-reset`)
  let select = page.locator('#candidate-form-status')
  await expect(select).toHaveValue('todo')
  await select.selectOption('done')
  await expect(select).toHaveValue('done')
  await page.getByRole('button', { name: 'Reset' }).click()
  await expect(select).toHaveValue('todo')
  await page.getByRole('button', { name: 'Submit' }).click()
  await expect(page).toHaveURL(/\/fixtures\/native-select\/form-submit-reset\?status=todo&intent=submit$/)

  await page.goto(`${candidate}/fixtures/native-select/required-validation`)
  let required = page.locator('#candidate-required-status')
  await expect(required).toHaveJSProperty('required', true)
  await expect(required).toHaveValue('')
  expect(await required.evaluate((element) => (element as HTMLSelectElement).validity.valid)).toBe(false)
  await page.getByRole('button', { name: 'Submit' }).click()
  await expect(page).toHaveURL(/\/fixtures\/native-select\/required-validation$/)
  await required.selectOption('done')
  expect(await required.evaluate((element) => (element as HTMLSelectElement).validity.valid)).toBe(true)
})
