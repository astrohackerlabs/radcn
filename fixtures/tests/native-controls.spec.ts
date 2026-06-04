import { expect, test } from '@playwright/test'

const candidate = 'http://localhost:4602'

test('candidate button preserves native submit and reset behavior', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/button/form-submit`)

  let input = page.locator('#candidate-button-form-value')
  await input.fill('changed')
  await page.getByRole('button', { name: 'Reset' }).click()
  await expect(input).toHaveValue('initial')

  await page.getByRole('button', { name: 'Submit' }).click()
  await expect(page).toHaveURL(/\/fixtures\/button\/form-submit\?value=initial&intent=submit$/)
})

test('candidate field wires label help invalid and error semantics', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/field/input-invalid`)

  let input = page.locator('#candidate-email-invalid')
  await expect(page.getByLabel('Email')).toHaveId('candidate-email-invalid')
  await expect(input).toHaveAttribute('aria-invalid', 'true')
  await expect(input).toHaveAttribute('aria-describedby', 'candidate-email-invalid-error')
  await expect(page.locator('#candidate-email-invalid-error')).toHaveText('Enter a valid email address.')
})

test('candidate native controls expose disabled and required state', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/field/input-disabled`)
  await expect(page.locator('#candidate-email-disabled')).toBeDisabled()

  await page.goto(`${candidate}/fixtures/field/required`)
  await expect(page.locator('#candidate-email-required')).toHaveAttribute('required', '')

  await page.goto(`${candidate}/fixtures/textarea/disabled`)
  await expect(page.locator('#candidate-message-disabled')).toBeDisabled()
})

test('candidate customization hooks affect rendered styles', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/button/custom-class`)
  let button = page.locator('[data-radcn-button]')
  await expect(button).toHaveClass(/radcn-fixture-custom-button/)
  await expect(button).toHaveCSS('background-color', 'rgb(15, 118, 110)')

  await page.goto(`${candidate}/fixtures/field/custom-error-token`)
  let error = page.locator('[data-radcn-field-error]')
  await expect(error).toHaveCSS('color', 'rgb(124, 58, 237)')
})
