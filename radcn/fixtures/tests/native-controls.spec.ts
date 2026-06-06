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

test('candidate button covers shadcn example parity depth', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/button/link-variant`)
  let linkVariant = page.locator('[data-radcn-button]')
  await expect(linkVariant).toHaveAttribute('data-variant', 'link')
  await expect(linkVariant).toHaveClass(/radcn-button--link/)

  await page.goto(`${candidate}/fixtures/button/as-child-or-link`)
  let hrefButton = page.getByRole('link', { name: 'Link Button' })
  await expect(hrefButton).toHaveAttribute('data-radcn-button', '')
  await expect(hrefButton).toHaveAttribute('href', '/fixtures/button/default')

  await page.goto(`${candidate}/fixtures/button/with-icon`)
  await expect(page.getByRole('button', { name: 'New Branch' })).toHaveAttribute('data-size', 'sm')
  await expect(page.locator('svg[aria-hidden="true"]')).toHaveCount(1)

  await page.goto(`${candidate}/fixtures/button/loading`)
  let loading = page.getByRole('button', { name: /Submit/ })
  await expect(loading).toBeDisabled()
  await expect(loading.locator('[data-radcn-spinner]')).toHaveCount(1)

  await page.goto(`${candidate}/fixtures/button/icon-only`)
  await expect(page.getByRole('button', { name: 'Submit' })).toHaveAttribute('aria-label', 'Submit')

  await page.goto(`${candidate}/fixtures/button/rounded`)
  let rounded = page.getByRole('button', { name: 'Upload' })
  await expect(rounded).toHaveClass(/radcn-fixture-rounded-button/)
  await expect(rounded).toHaveCSS('border-radius', '999px')

  await page.goto(`${candidate}/fixtures/button/sizes`)
  let small = page.getByRole('button', { name: 'Small', exact: true })
  let defaultButton = page.getByRole('button', { name: 'Default' })
  let large = page.getByRole('button', { name: 'Large', exact: true })
  await expect(small).toHaveCSS('min-height', '32px')
  await expect(defaultButton).toHaveCSS('min-height', '36px')
  await expect(large).toHaveCSS('min-height', '44px')

  let iconSmall = page.getByRole('button', { name: 'Submit small' })
  let icon = page.getByRole('button', { name: 'Submit', exact: true })
  let iconLarge = page.getByRole('button', { name: 'Submit large' })
  await expect(iconSmall).toHaveAttribute('data-size', 'icon-sm')
  await expect(icon).toHaveAttribute('data-size', 'icon')
  await expect(iconLarge).toHaveAttribute('data-size', 'icon-lg')
  await expect(iconSmall).toHaveCSS('width', '32px')
  await expect(icon).toHaveCSS('width', '36px')
  await expect(iconLarge).toHaveCSS('width', '44px')
  await expect(iconSmall).toHaveCSS('min-height', '32px')
  await expect(icon).toHaveCSS('min-height', '36px')
  await expect(iconLarge).toHaveCSS('min-height', '44px')
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
