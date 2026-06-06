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

test('form input cluster exports supported package source', async () => {
  let pkg = await packageJson()
  expect(pkg.exports?.['./input-group']).toBe('./src/components/input-group.tsx')
  expect(pkg.exports?.['./input-otp']).toBe('./src/components/input-otp.tsx')
  expect(pkg.exports?.['./form']).toBe('./src/components/form.tsx')
  expect({ ...pkg.dependencies, ...pkg.devDependencies }).not.toHaveProperty('react-hook-form')
  expect({ ...pkg.dependencies, ...pkg.devDependencies }).not.toHaveProperty('zod')
  expect({ ...pkg.dependencies, ...pkg.devDependencies }).not.toHaveProperty('@hookform/resolvers')
  expect({ ...pkg.dependencies, ...pkg.devDependencies }).not.toHaveProperty('input-otp')
  expect({ ...pkg.dependencies, ...pkg.devDependencies }).not.toHaveProperty('react-textarea-autosize')
  expect({ ...pkg.dependencies, ...pkg.devDependencies }).not.toHaveProperty('lucide-react')
  expect({ ...pkg.dependencies, ...pkg.devDependencies }).not.toHaveProperty('@tabler/icons-react')
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

test('candidate input group covers button popover and ButtonGroup parity', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/input-group/button`)
  await expect(page.getByRole('button', { name: 'Copy URL' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Explain clone URL' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Favorite repository' })).toBeVisible()
  await expect(page.locator('#candidate-input-group-copy')).toHaveAttribute('readonly', '')
  await expect(page.locator('#candidate-input-group-button-search')).toHaveAttribute('type', 'text')
  await page.getByRole('button', { name: 'Search' }).click()
  await expect(page).toHaveURL(/\/fixtures\/input-group\/button\?repo=radcn&intent=search$/)

  await page.goto(`${candidate}/fixtures/input-group/button-group`)
  await expect(page.getByRole('group', { name: 'Workspace URL' })).toHaveAttribute('data-radcn-button-group', '')
  await expect(page.locator('[data-radcn-button-group] [data-radcn-input-group]')).toHaveCount(1)
  await expect(page.getByLabel('https://')).toHaveValue('radcn')
  await expect(page.getByText('.dev')).toBeVisible()
})

test('candidate input group covers overlays icons labels spinners and native types', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/input-group/dropdown`)
  await expect(page.locator('[data-radcn-dropdown-menu]')).toHaveCount(1)
  await expect(page.getByRole('button', { name: 'Search scope' })).toBeVisible()

  await page.goto(`${candidate}/fixtures/input-group/icon`)
  await expect(page.locator('#candidate-input-group-email')).toHaveAttribute('type', 'email')
  await expect(page.getByRole('button', { name: 'Favorite card' })).toBeVisible()

  await page.goto(`${candidate}/fixtures/input-group/label`)
  await expect(page.locator('#candidate-input-group-label-inline')).toHaveValue('radcn')
  await expect(page.locator('#candidate-input-group-label-block')).toHaveValue('radcn-token')
  await expect(page.locator('[data-radcn-tooltip]')).toHaveCount(1)

  await page.goto(`${candidate}/fixtures/input-group/spinner`)
  await expect(page.getByRole('status', { name: 'Saving' })).toBeVisible()
  await expect(page.getByRole('status', { name: 'Loading invite' })).toBeVisible()
  await expect(page.locator('[data-radcn-input-group] input:disabled')).toHaveCount(2)

  await page.goto(`${candidate}/fixtures/input-group/tooltip`)
  await expect(page.locator('#candidate-input-group-password')).toHaveAttribute('type', 'password')
  await expect(page.locator('#candidate-input-group-tooltip-email')).toHaveAttribute('type', 'email')
  await expect(page.getByRole('button', { name: 'Password requirements' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Owner help' })).toBeVisible()
})

test('candidate input group covers demo text custom and textarea toolbar examples', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/input-group/custom`)
  await expect(page.locator('[data-radcn-input-group-control]')).toHaveJSProperty('tagName', 'TEXTAREA')
  await expect(page.getByText('Native textarea; autosize is app-owned.')).toBeVisible()

  await page.goto(`${candidate}/fixtures/input-group/demo`)
  await expect(page.locator('[data-radcn-dropdown-menu]')).toHaveCount(1)
  await expect(page.locator('[data-radcn-tooltip]')).toHaveCount(1)
  await expect(page.locator('[data-radcn-separator][data-orientation="vertical"]')).toHaveCount(1)
  await expect(page.getByText('63%')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Send' })).toBeDisabled()
  await expect(page.getByText('✓ verified')).toBeVisible()

  await page.goto(`${candidate}/fixtures/input-group/text`)
  await expect(page.getByText('$')).toBeVisible()
  await expect(page.getByText('USD')).toBeVisible()
  await expect(page.getByText('.dev')).toBeVisible()
  await expect(page.getByText('42 / 280')).toBeVisible()

  await page.goto(`${candidate}/fixtures/input-group/textarea`)
  await expect(page.locator('[data-radcn-input-group-addon][data-align="block-start"]')).toHaveCount(1)
  await expect(page.locator('[data-radcn-input-group-addon][data-align="block-end"]')).toHaveCount(1)
  await expect(page.getByRole('button', { name: 'Copy code' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Run' })).toBeVisible()
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

test('candidate input otp matches named upstream examples', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/input-otp/demo`)
  let input = page.locator('#candidate-input-otp-demo')
  await expect(page.locator('[data-radcn-input-otp-group]')).toHaveCount(2)
  await expect(page.locator('[data-radcn-input-otp-separator]')).toHaveCount(1)
  await expect(page.locator('[data-radcn-input-otp-slot]')).toHaveCount(6)
  await expect(input).toHaveValue('123456')
  await expect(otpSlot(page, 5)).toHaveAttribute('data-char', '6')
  await input.focus()
  await page.keyboard.press('Home')
  await expect(otpSlot(page, 0)).toHaveAttribute('data-active', 'true')

  await page.goto(`${candidate}/fixtures/input-otp/pattern`)
  input = page.locator('#candidate-input-otp-pattern')
  await expect(input).toHaveAttribute('pattern', '[0-9A-Za-z]*')
  await input.focus()
  await page.keyboard.type('A1- b?2')
  await expect(input).toHaveValue('A1b2')
  await expect(otpSlot(page, 0)).toHaveAttribute('data-char', 'A')
  await expect(otpSlot(page, 3)).toHaveAttribute('data-char', '2')

  await page.goto(`${candidate}/fixtures/input-otp/separator-2-2-2`)
  await expect(page.locator('[data-radcn-input-otp-group]')).toHaveCount(3)
  await expect(page.locator('[data-radcn-input-otp-separator]')).toHaveCount(2)
  await expect(page.locator('[data-radcn-input-otp-slot]')).toHaveCount(6)
  await expect(otpSlot(page, 5)).toHaveAttribute('data-char', '6')

  await page.goto(`${candidate}/fixtures/input-otp/controlled`)
  input = page.locator('#candidate-input-otp-controlled')
  await expect(page.getByText('Enter your one-time password.')).toBeVisible()
  await input.focus()
  await page.keyboard.type('987654')
  await expect(input).toHaveValue('987654')
  await expect(page.getByText('You entered: 987654')).toBeVisible()
  await expect(otpSlot(page, 5)).toHaveAttribute('data-char', '4')
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

test('candidate form package uses native RadCN primitives and explicit wiring', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/form/basic`)
  await expect(page.locator('#candidate-form-workspace-form-item')).toHaveAttribute('required', '')
  await expect(page.locator('#candidate-form-workspace-form-item')).toHaveValue('radcn')

  await page.goto(`${candidate}/fixtures/form/native-validation`)
  let nativeInput = page.locator('#candidate-form-native-email-form-item')
  await expect(nativeInput).toHaveAttribute('required', '')
  await expect(nativeInput).toHaveAttribute('aria-describedby', 'candidate-form-native-email-form-item-description')
  await expect(page.locator('[data-radcn-form]')).toHaveCount(1)
  await expect(page.locator('[data-radcn-form-field]')).toHaveCount(1)
  await expect(page.locator('[data-radcn-form-label]')).toHaveCount(1)

  await page.goto(`${candidate}/fixtures/form/server-errors`)
  let serverInput = page.locator('#candidate-form-server-email-form-item')
  await expect(serverInput).toHaveAttribute('aria-invalid', 'true')
  await expect(serverInput).toHaveAttribute(
    'aria-describedby',
    'candidate-form-server-email-form-item-description candidate-form-server-email-form-item-message',
  )
  await expect(page.locator('#candidate-form-server-email-form-item-message')).toHaveText('Use a valid email address.')

  await page.goto(`${candidate}/fixtures/form/action-state`)
  let actionInput = page.locator('#candidate-form-action-name-form-item')
  await expect(actionInput).toHaveAttribute('aria-describedby', 'candidate-form-action-name-form-item-description')
  await expect(page.locator('#candidate-form-action-name-form-item-description')).toHaveText('Last saved value: RadCN')

  await page.goto(`${candidate}/fixtures/form/custom-token`)
  await expect(page.locator('[data-radcn-form-message]')).toHaveCSS('color', 'rgb(124, 58, 237)')
})

test('candidate form examples cover control behavior clusters', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/form/textarea`)
  await expect(page.locator('#candidate-form-about-form-item')).toHaveJSProperty('tagName', 'TEXTAREA')
  await expect(page.locator('#candidate-form-about-form-item')).toHaveAttribute('aria-describedby', 'candidate-form-about-form-item-description')

  await page.goto(`${candidate}/fixtures/form/select`)
  await expect(page.locator('[data-radcn-select]')).toHaveAttribute('data-value', 'typescript')
  await expect(page.locator('[data-radcn-select-input][name="language"]')).toHaveValue('typescript')

  await page.goto(`${candidate}/fixtures/form/checkbox-group`)
  await expect(page.locator('[data-radcn-checkbox-input][name="notifications"]')).toHaveCount(2)
  await expect(page.locator('[data-radcn-checkbox-input][value="deploys"]')).toBeChecked()
  await expect(page.locator('[data-radcn-checkbox-input][value="reviews"]')).toBeChecked()

  await page.goto(`${candidate}/fixtures/form/radio-group`)
  await expect(page.locator('[data-radcn-radio-group]')).toHaveAttribute('data-name', 'plan')
  await expect(page.locator('#candidate-form-plan-basic')).toBeChecked()

  await page.goto(`${candidate}/fixtures/form/switch`)
  await expect(page.locator('#candidate-form-two-factor-form-item')).toBeChecked()
  await expect(page.locator('#candidate-form-two-factor-form-item')).toHaveAttribute('role', 'switch')

  await page.goto(`${candidate}/fixtures/form/array-list`)
  await expect(page.locator('input[name="emails"]')).toHaveCount(2)
  await expect(page.locator('#candidate-form-email-0')).toHaveValue('ada@example.com')

  await page.goto(`${candidate}/fixtures/form/password-strength`)
  await expect(page.locator('[data-radcn-input-group]')).toHaveAttribute('data-invalid', 'true')
  await expect(page.getByRole('progressbar', { name: 'Password strength' })).toHaveAttribute('value', '38')
  await expect(page.locator('#candidate-form-password-form-item-message')).toHaveText('Add a number and a symbol.')

  await page.goto(`${candidate}/fixtures/form/complex`)
  await expect(page.locator('[data-radcn-card]')).toBeVisible()
  await expect(page.locator('input[name="addons"][value="analytics"]')).toBeChecked()
  await expect(page.locator('#candidate-form-complex-notifications')).toBeChecked()

  await page.goto(`${candidate}/fixtures/form/server-errors-rich`)
  await expect(page.locator('[data-radcn-form-message]')).toHaveCount(2)
  await expect(page.locator('#candidate-form-rich-workspace-form-item-message')).toHaveText('That workspace is already taken.')
})
