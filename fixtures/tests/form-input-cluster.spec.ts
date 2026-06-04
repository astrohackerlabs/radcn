import { readFile } from 'node:fs/promises'

import { expect, test } from '@playwright/test'

const candidate = 'http://localhost:4602'
const repoRoot = new URL('../..', import.meta.url)

async function packageJson() {
  return JSON.parse(await readFile(new URL('packages/radcn/package.json', repoRoot), 'utf8')) as {
    dependencies?: Record<string, string>
    devDependencies?: Record<string, string>
    exports?: Record<string, string>
  }
}

function otpSlot(page: import('@playwright/test').Page, index: number) {
  return page.locator(`[data-radcn-input-otp-slot][data-index="${index}"]`).first()
}

test('form input cluster exports supported source and records form as recipe disposition', async () => {
  let pkg = await packageJson()
  expect(pkg.exports?.['./input-group']).toBe('./src/components/input-group.tsx')
  expect(pkg.exports?.['./input-otp']).toBe('./src/components/input-otp.tsx')
  expect(pkg.exports?.['./form']).toBeUndefined()
  expect({ ...pkg.dependencies, ...pkg.devDependencies }).not.toHaveProperty('react-hook-form')
  expect({ ...pkg.dependencies, ...pkg.devDependencies }).not.toHaveProperty('zod')
  expect({ ...pkg.dependencies, ...pkg.devDependencies }).not.toHaveProperty('@hookform/resolvers')
  expect({ ...pkg.dependencies, ...pkg.devDependencies }).not.toHaveProperty('input-otp')
})

test('candidate input group exposes semantics addon focus and nested button behavior', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/input-group/addons`)
  let group = page.getByRole('group', { name: 'Search query' })
  await expect(group).toHaveAttribute('data-radcn-input-group', '')
  await expect(page.locator('[data-radcn-input-group-addon][data-align="inline-start"]')).toHaveCount(1)
  await expect(page.locator('[data-radcn-input-group-addon][data-align="inline-end"]')).toHaveCount(1)
  await page.locator('[data-radcn-input-group-addon][data-align="inline-start"]').click()
  await expect(page.locator('#candidate-input-group-addons')).toBeFocused()

  await page.goto(`${candidate}/fixtures/input-group/buttons`)
  await page.getByRole('button', { name: 'Go' }).click()
  await expect(page).toHaveURL(/\/fixtures\/input-group\/buttons\?repo=radcn&intent=search$/)
})

test('candidate input group preserves textarea states form reset and custom tokens', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/input-group/textarea`)
  await expect(page.locator('[data-radcn-input-group-control]')).toHaveJSProperty('tagName', 'TEXTAREA')

  await page.goto(`${candidate}/fixtures/input-group/disabled-invalid`)
  await expect(page.locator('#candidate-input-group-disabled')).toBeDisabled()
  await expect(page.locator('#candidate-input-group-invalid')).toHaveAttribute('aria-invalid', 'true')
  await expect(page.locator('#candidate-input-group-invalid')).toHaveAttribute('aria-describedby', 'candidate-input-group-invalid-error')

  await page.goto(`${candidate}/fixtures/input-group/form-submit-reset`)
  let input = page.locator('#candidate-input-group-form')
  await input.fill('changed')
  await page.getByRole('button', { name: 'Reset' }).click()
  await expect(input).toHaveValue('design')
  await page.getByRole('button', { name: 'Submit' }).click()
  await expect(page).toHaveURL(/\/fixtures\/input-group\/form-submit-reset\?workspace=design&intent=submit$/)

  await page.goto(`${candidate}/fixtures/input-group/block-addons`)
  await expect(page.locator('[data-radcn-input-group-addon][data-align="block-start"]')).toHaveCount(1)
  await expect(page.locator('[data-radcn-input-group-addon][data-align="block-end"]')).toHaveCount(1)

  await page.goto(`${candidate}/fixtures/input-group/custom-token`)
  await expect(page.locator('[data-radcn-input-group]')).toHaveClass(/radcn-fixture-custom-input-group/)
  await expect(page.locator('[data-radcn-input-group]')).toHaveCSS('background-color', 'rgb(240, 253, 250)')
})

test('candidate input otp mirrors slots filters input and handles keyboard paste and reset', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/input-otp/digits-only`)
  let input = page.locator('[data-radcn-input-otp-input]')
  await input.focus()
  await page.keyboard.type('12ab34')
  await expect(input).toHaveValue('1234')
  await expect(otpSlot(page, 0)).toHaveAttribute('data-char', '1')
  await expect(otpSlot(page, 1)).toHaveAttribute('data-char', '2')
  await page.keyboard.press('Home')
  await expect(otpSlot(page, 0)).toHaveAttribute('data-active', 'true')
  await page.keyboard.press('End')
  await expect(otpSlot(page, 4)).toHaveAttribute('data-active', 'true')
  await page.keyboard.press('Backspace')
  await expect(input).toHaveValue('123')

  await page.goto(`${candidate}/fixtures/input-otp/paste`)
  input = page.locator('[data-radcn-input-otp-input]')
  await input.focus()
  await input.evaluate((node) => {
    let event = new Event('paste', { bubbles: true, cancelable: true })
    Object.defineProperty(event, 'clipboardData', { value: { getData: () => '12ab34' } })
    node.dispatchEvent(event)
  })
  await expect(input).toHaveValue('1234')
  await expect(page.locator('[data-radcn-input-otp]')).toHaveAttribute('data-value', '1234')

  await page.goto(`${candidate}/fixtures/input-otp/form-submit-reset`)
  input = page.locator('#candidate-input-otp-form')
  await expect(input).toHaveAttribute('required', '')
  await input.focus()
  await page.keyboard.press(process.platform === 'darwin' ? 'Meta+A' : 'Control+A')
  await page.keyboard.type('987654')
  await expect(input).toHaveValue('987654')
  await page.getByRole('button', { name: 'Reset' }).click()
  await expect(input).toHaveValue('123456')
  await page.getByRole('button', { name: 'Submit' }).click()
  await expect(page).toHaveURL(/\/fixtures\/input-otp\/form-submit-reset\?code=123456&intent=submit$/)
})

test('candidate input otp exposes separators invalid disabled and custom token hooks', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/input-otp/separator`)
  await expect(page.locator('[data-radcn-input-otp-separator]')).toHaveAttribute('role', 'separator')
  await expect(otpSlot(page, 5)).toHaveAttribute('data-char', '6')

  await page.goto(`${candidate}/fixtures/input-otp/disabled`)
  await expect(page.locator('[data-radcn-input-otp-input]')).toBeDisabled()

  await page.goto(`${candidate}/fixtures/input-otp/invalid`)
  await expect(page.locator('[data-radcn-input-otp-input]')).toHaveAttribute('aria-invalid', 'true')
  await expect(page.locator('[data-radcn-input-otp-input]')).toHaveAttribute('aria-describedby', 'candidate-input-otp-invalid-error')

  await page.goto(`${candidate}/fixtures/input-otp/custom-token`)
  await expect(page.locator('[data-radcn-input-otp]')).toHaveClass(/radcn-fixture-custom-input-otp/)
  await expect(otpSlot(page, 0)).toHaveCSS('background-color', 'rgb(250, 245, 255)')
})

test('candidate form disposition uses native RadCN primitives without radcn form export', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/form/native-validation`)
  let nativeInput = page.locator('#candidate-form-native-email')
  await expect(nativeInput).toHaveAttribute('required', '')
  await expect(nativeInput).toHaveAttribute('aria-describedby', 'candidate-form-native-email-description')
  await expect(page.locator('[data-radcn-form-recipe]')).toHaveCount(1)

  await page.goto(`${candidate}/fixtures/form/server-errors`)
  let serverInput = page.locator('#candidate-form-server-email')
  await expect(serverInput).toHaveAttribute('aria-invalid', 'true')
  await expect(serverInput).toHaveAttribute('aria-describedby', 'candidate-form-server-email-error')
  await expect(page.locator('#candidate-form-server-email-error')).toHaveText('Use a valid email address.')

  await page.goto(`${candidate}/fixtures/form/action-state`)
  await expect(page.locator('#candidate-form-action-state')).toHaveText('Last saved value: RadCN')

  await page.goto(`${candidate}/fixtures/form/custom-token`)
  await expect(page.locator('[data-radcn-field-error]')).toHaveCSS('color', 'rgb(124, 58, 237)')
})
