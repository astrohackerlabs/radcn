import { expect, test } from '@playwright/test'

const candidate = 'http://localhost:4602'

test('candidate checkbox exposes native state semantics and hooks', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/checkbox/default`)
  let input = page.locator('input[data-radcn-checkbox-input]')
  await expect(input).toHaveAttribute('type', 'checkbox')
  await expect(page.getByLabel('Email notifications')).toHaveId('candidate-checkbox-default')
  await expect(page.locator('[data-radcn-checkbox-wrapper]')).toHaveAttribute('data-state', 'unchecked')
  await expect(page.locator('[data-radcn-checkbox-indicator]')).toHaveCount(1)
  await expect(input).not.toBeChecked()
  await input.check()
  await expect(input).toBeChecked()

  await page.goto(`${candidate}/fixtures/checkbox/checked`)
  await expect(page.locator('input[data-radcn-checkbox-input]')).toBeChecked()
  await expect(page.locator('[data-radcn-checkbox-wrapper]')).toHaveAttribute('data-state', 'checked')

  await page.goto(`${candidate}/fixtures/checkbox/disabled`)
  await expect(page.locator('input[data-radcn-checkbox-input]')).toBeDisabled()

  await page.goto(`${candidate}/fixtures/checkbox/invalid`)
  let invalid = page.locator('input[data-radcn-checkbox-input]')
  await expect(invalid).toHaveAttribute('aria-invalid', 'true')
  await expect(invalid).toHaveAttribute('aria-describedby', 'candidate-checkbox-error')
  await expect(page.locator('[data-radcn-field-error]')).toHaveText('Accept the terms to continue.')

  await page.goto(`${candidate}/fixtures/checkbox/indeterminate`)
  let mixed = page.locator('input[data-radcn-checkbox-input]')
  await expect(mixed).toHaveAttribute('aria-checked', 'mixed')
  await expect(mixed).toHaveAttribute('data-state', 'indeterminate')
  await expect(page.locator('[data-radcn-checkbox-wrapper]')).toHaveAttribute('data-state', 'indeterminate')
  expect(await mixed.evaluate((element) => (element as HTMLInputElement).indeterminate)).toBe(false)
})

test('candidate checkbox preserves form reset submit and customization', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/checkbox/form-submit-reset`)
  let input = page.locator('#candidate-checkbox-form')
  await expect(input).toBeChecked()
  await input.uncheck()
  await expect(input).not.toBeChecked()
  await page.getByRole('button', { name: 'Reset' }).click()
  await expect(input).toBeChecked()
  await page.getByRole('button', { name: 'Submit' }).click()
  await expect(page).toHaveURL(/\/fixtures\/checkbox\/form-submit-reset\?agree=yes&intent=submit$/)

  await page.goto(`${candidate}/fixtures/checkbox/custom-token`)
  let custom = page.locator('[data-radcn-checkbox-wrapper]')
  await expect(custom).toHaveClass(/radcn-fixture-custom-checkbox/)
  await expect(custom).toHaveCSS('background-color', 'rgb(15, 118, 110)')
})

test('candidate radio group exposes native radios hooks and forms', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/radio-group/default`)
  let group = page.locator('[data-radcn-radio-group]')
  await expect(group).toHaveAttribute('role', 'radiogroup')
  await expect(group).toHaveAttribute('data-name', 'priority')
  await expect(page.locator('input[data-radcn-radio-input][name="priority"]')).toHaveCount(2)
  await expect(page.getByLabel('Low')).toHaveId('candidate-radio-default-low')
  await expect(page.locator('#candidate-radio-default-low')).toBeChecked()
  await page.locator('#candidate-radio-default-high').check()
  await expect(page.locator('#candidate-radio-default-high')).toBeChecked()
  await expect(page.locator('#candidate-radio-default-low')).not.toBeChecked()

  await page.goto(`${candidate}/fixtures/radio-group/disabled`)
  await expect(page.locator('#candidate-radio-disabled-low')).toBeDisabled()
  await expect(page.locator('#candidate-radio-disabled-high')).toBeDisabled()

  await page.goto(`${candidate}/fixtures/radio-group/invalid`)
  await expect(page.locator('[data-radcn-radio-group]')).toHaveAttribute('aria-invalid', 'true')
  await expect(page.locator('input[data-radcn-radio-input]').first()).toHaveAttribute('aria-invalid', 'true')
  await expect(page.locator('[data-radcn-field-error]')).toHaveText('Choose a plan.')

  await page.goto(`${candidate}/fixtures/radio-group/form-submit-reset`)
  await page.locator('#candidate-radio-form-sms').check()
  await expect(page.locator('#candidate-radio-form-sms')).toBeChecked()
  await page.getByRole('button', { name: 'Reset' }).click()
  await expect(page.locator('#candidate-radio-form-email')).toBeChecked()
  await page.getByRole('button', { name: 'Submit' }).click()
  await expect(page).toHaveURL(/\/fixtures\/radio-group\/form-submit-reset\?contact=email&intent=submit$/)

  await page.goto(`${candidate}/fixtures/radio-group/custom-token`)
  let custom = page.locator('[data-radcn-radio-item]').first()
  await expect(custom).toHaveClass(/radcn-fixture-custom-radio/)
  await expect(custom).toHaveCSS('background-color', 'rgb(15, 118, 110)')
})

test('candidate switch exposes checkbox role switch hooks and forms', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/switch/default`)
  let input = page.locator('input[data-radcn-switch-input]')
  await expect(input).toHaveAttribute('type', 'checkbox')
  await expect(input).toHaveAttribute('role', 'switch')
  await expect(page.getByLabel('Available')).toHaveId('candidate-switch-default')
  await expect(page.locator('[data-radcn-switch-wrapper]')).toHaveAttribute('data-state', 'unchecked')
  await expect(input).not.toBeChecked()
  await input.check()
  await expect(input).toBeChecked()

  await page.goto(`${candidate}/fixtures/switch/checked`)
  await expect(page.locator('input[data-radcn-switch-input]')).toBeChecked()
  await expect(page.locator('[data-radcn-switch-wrapper]')).toHaveAttribute('data-state', 'checked')

  await page.goto(`${candidate}/fixtures/switch/disabled`)
  await expect(page.locator('input[data-radcn-switch-input]')).toBeDisabled()

  await page.goto(`${candidate}/fixtures/switch/form-submit-reset`)
  let formSwitch = page.locator('#candidate-switch-form')
  await formSwitch.uncheck()
  await expect(formSwitch).not.toBeChecked()
  await page.getByRole('button', { name: 'Reset' }).click()
  await expect(formSwitch).toBeChecked()
  await page.getByRole('button', { name: 'Submit' }).click()
  await expect(page).toHaveURL(/\/fixtures\/switch\/form-submit-reset\?dark=on&intent=submit$/)

  await page.goto(`${candidate}/fixtures/switch/custom-token`)
  let custom = page.locator('[data-radcn-switch-wrapper]')
  await expect(custom).toHaveAttribute('data-size', 'sm')
  await expect(custom).toHaveClass(/radcn-fixture-custom-switch/)
  await expect(custom).toHaveCSS('background-color', 'rgb(15, 118, 110)')
  await expect(page.locator('[data-radcn-switch-thumb]')).toHaveCount(1)
})

test('candidate progress exposes native progress semantics and customization', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/progress/default`)
  let progress = page.locator('progress[data-radcn-progress]')
  await expect(progress).toHaveAttribute('aria-label', 'Upload progress')
  await expect(progress).toHaveAttribute('max', '100')
  await expect(progress).toHaveAttribute('value', '48')
  await expect(page.locator('[data-radcn-progress-wrapper]')).toHaveAttribute('data-state', 'determinate')
  await expect(page.locator('[data-radcn-progress-indicator]')).toHaveAttribute('style', 'width:48%')

  await page.goto(`${candidate}/fixtures/progress/indeterminate`)
  let indeterminate = page.locator('progress[data-radcn-progress]')
  await expect(indeterminate).not.toHaveAttribute('value', /.+/)
  await expect(page.locator('[data-radcn-progress-wrapper]')).toHaveAttribute('data-state', 'indeterminate')

  await page.goto(`${candidate}/fixtures/progress/custom-token`)
  let custom = page.locator('[data-radcn-progress-wrapper]')
  await expect(custom).toHaveClass(/radcn-fixture-custom-progress/)
  await expect(custom).toHaveCSS('background-color', 'rgb(204, 251, 241)')
  await expect(page.locator('[data-radcn-progress-indicator]')).toHaveCSS('background-color', 'rgb(15, 118, 110)')
})
