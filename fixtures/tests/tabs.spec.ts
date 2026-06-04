import { expect, test } from '@playwright/test'

const candidate = 'http://localhost:4602'

function tabsRoot(page: import('@playwright/test').Page) {
  return page.locator('[data-radcn-tabs]')
}

function trigger(page: import('@playwright/test').Page, value: string) {
  return page.locator(`[data-radcn-tabs-trigger][data-value="${value}"]`)
}

function panel(page: import('@playwright/test').Page, value: string) {
  return page.locator(`[data-radcn-tabs-content][data-value="${value}"]`)
}

test('candidate tabs exposes tablist semantics and default selected state', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/tabs/default`)

  await expect(tabsRoot(page)).toHaveAttribute('data-default-value', 'account')
  await expect(tabsRoot(page)).toHaveAttribute('data-value', 'account')
  await expect(page.locator('[data-radcn-tabs-list]')).toHaveAttribute('role', 'tablist')
  await expect(page.locator('[data-radcn-tabs-trigger]')).toHaveCount(3)
  await expect(page.locator('[data-radcn-tabs-content]')).toHaveCount(3)

  await expect(trigger(page, 'account')).toHaveAttribute('role', 'tab')
  await expect(trigger(page, 'account')).toHaveAttribute('aria-selected', 'true')
  await expect(trigger(page, 'account')).toHaveAttribute('data-state', 'active')
  await expect(trigger(page, 'account')).toHaveAttribute('tabindex', '0')
  await expect(trigger(page, 'account')).toHaveAttribute('aria-controls', /content-account/)
  await expect(panel(page, 'account')).toHaveAttribute('role', 'tabpanel')
  await expect(panel(page, 'account')).toHaveAttribute('aria-labelledby', /trigger-account/)
  await expect(panel(page, 'account')).toHaveAttribute('data-state', 'active')
  await expect(panel(page, 'account')).toBeVisible()

  await expect(trigger(page, 'password')).toHaveAttribute('aria-selected', 'false')
  await expect(trigger(page, 'password')).toHaveAttribute('tabindex', '-1')
  await expect(panel(page, 'password')).toBeHidden()
})

test('candidate tabs supports pointer activation and default value', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/tabs/default-value`)

  await expect(tabsRoot(page)).toHaveAttribute('data-default-value', 'billing')
  await expect(tabsRoot(page)).toHaveAttribute('data-value', 'billing')
  await expect(trigger(page, 'billing')).toHaveAttribute('aria-selected', 'true')
  await expect(panel(page, 'billing')).toBeVisible()
  await expect(panel(page, 'account')).toBeHidden()

  await trigger(page, 'account').click()
  await expect(tabsRoot(page)).toHaveAttribute('data-value', 'account')
  await expect(trigger(page, 'account')).toHaveAttribute('aria-selected', 'true')
  await expect(trigger(page, 'billing')).toHaveAttribute('aria-selected', 'false')
  await expect(panel(page, 'account')).toBeVisible()
  await expect(panel(page, 'billing')).toBeHidden()
})

test('candidate tabs supports horizontal keyboard navigation', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/tabs/default`)

  await trigger(page, 'account').focus()
  await page.keyboard.press('ArrowRight')
  await expect(trigger(page, 'password')).toBeFocused()
  await expect(trigger(page, 'password')).toHaveAttribute('aria-selected', 'true')
  await expect(panel(page, 'password')).toBeVisible()

  await page.keyboard.press('End')
  await expect(trigger(page, 'billing')).toBeFocused()
  await expect(trigger(page, 'billing')).toHaveAttribute('aria-selected', 'true')

  await page.keyboard.press('Home')
  await expect(trigger(page, 'account')).toBeFocused()
  await expect(trigger(page, 'account')).toHaveAttribute('aria-selected', 'true')
})

test('candidate tabs supports manual keyboard activation', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/tabs/manual`)

  await expect(tabsRoot(page)).toHaveAttribute('data-activation-mode', 'manual')
  await expect(trigger(page, 'account')).toHaveAttribute('aria-selected', 'true')
  await trigger(page, 'account').focus()

  await page.keyboard.press('ArrowRight')
  await expect(trigger(page, 'password')).toBeFocused()
  await expect(trigger(page, 'account')).toHaveAttribute('aria-selected', 'true')
  await expect(trigger(page, 'password')).toHaveAttribute('aria-selected', 'false')
  await expect(panel(page, 'account')).toBeVisible()
  await expect(panel(page, 'password')).toBeHidden()

  await page.keyboard.press('Enter')
  await expect(trigger(page, 'password')).toHaveAttribute('aria-selected', 'true')
  await expect(panel(page, 'password')).toBeVisible()

  await page.keyboard.press('ArrowRight')
  await expect(trigger(page, 'billing')).toBeFocused()
  await expect(trigger(page, 'password')).toHaveAttribute('aria-selected', 'true')
  await expect(trigger(page, 'billing')).toHaveAttribute('aria-selected', 'false')

  await page.keyboard.press('Space')
  await expect(trigger(page, 'billing')).toHaveAttribute('aria-selected', 'true')
  await expect(panel(page, 'billing')).toBeVisible()
})

test('candidate tabs keeps disabled triggers out of selection', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/tabs/disabled`)

  let disabled = trigger(page, 'password')
  await expect(disabled).toHaveAttribute('data-disabled', 'true')
  await expect(disabled).toHaveAttribute('aria-disabled', 'true')
  await expect(disabled).toBeDisabled()
  await expect(disabled).toHaveAttribute('tabindex', '-1')

  await trigger(page, 'account').focus()
  await page.keyboard.press('ArrowRight')
  await expect(trigger(page, 'billing')).toBeFocused()
  await expect(trigger(page, 'billing')).toHaveAttribute('aria-selected', 'true')
  await expect(panel(page, 'billing')).toBeVisible()

  await disabled.click({ force: true })
  await expect(tabsRoot(page)).toHaveAttribute('data-value', 'billing')
  await expect(disabled).toHaveAttribute('aria-selected', 'false')
  await expect(panel(page, 'password')).toBeHidden()
})

test('candidate tabs supports vertical keyboard orientation and custom tokens', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/tabs/vertical`)

  await expect(tabsRoot(page)).toHaveAttribute('data-orientation', 'vertical')
  await expect(tabsRoot(page)).toHaveClass(/radcn-tabs--vertical/)
  await expect(trigger(page, 'password')).toHaveAttribute('aria-selected', 'true')
  await trigger(page, 'password').focus()
  await page.keyboard.press('ArrowDown')
  await expect(trigger(page, 'billing')).toBeFocused()
  await expect(trigger(page, 'billing')).toHaveAttribute('aria-selected', 'true')
  await page.keyboard.press('ArrowUp')
  await expect(trigger(page, 'password')).toBeFocused()

  await page.goto(`${candidate}/fixtures/tabs/custom-token`)
  await expect(tabsRoot(page)).toHaveClass(/radcn-fixture-custom-tabs/)
  await expect(page.locator('[data-radcn-tabs-list]')).toHaveCSS('background-color', 'rgb(204, 251, 241)')
  await expect(trigger(page, 'billing')).toHaveCSS('background-color', 'rgb(15, 118, 110)')
  await expect(trigger(page, 'billing')).toHaveCSS('color', 'rgb(255, 255, 255)')
  await expect(panel(page, 'billing')).toHaveCSS('background-color', 'rgb(240, 253, 250)')
  await expect(panel(page, 'billing')).toHaveCSS('border-color', 'rgb(15, 118, 110)')
  await expect(panel(page, 'billing')).toHaveCSS('color', 'rgb(19, 78, 74)')
})
