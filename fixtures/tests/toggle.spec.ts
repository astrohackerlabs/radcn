import { expect, test } from '@playwright/test'

const candidate = 'http://localhost:4602'

function toggle(page: import('@playwright/test').Page) {
  return page.locator('[data-radcn-toggle]').first()
}

function group(page: import('@playwright/test').Page) {
  return page.locator('[data-radcn-toggle-group]').first()
}

function groupItem(page: import('@playwright/test').Page, value: string) {
  return page.locator(`[data-radcn-toggle-group-item][data-value="${value}"]`)
}

test('candidate toggle exposes pressed state pointer keyboard disabled and variants', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/toggle/default`)
  await expect(toggle(page)).toHaveJSProperty('tagName', 'BUTTON')
  await expect(toggle(page)).toHaveAttribute('aria-pressed', 'false')
  await expect(toggle(page)).toHaveAttribute('data-state', 'off')

  await toggle(page).click()
  await expect(toggle(page)).toHaveAttribute('aria-pressed', 'true')
  await expect(toggle(page)).toHaveAttribute('data-state', 'on')

  await toggle(page).focus()
  await page.keyboard.press('Space')
  await expect(toggle(page)).toHaveAttribute('aria-pressed', 'false')
  await page.keyboard.press('Enter')
  await expect(toggle(page)).toHaveAttribute('aria-pressed', 'true')

  await page.goto(`${candidate}/fixtures/toggle/pressed`)
  await expect(toggle(page)).toHaveAttribute('aria-pressed', 'true')
  await expect(toggle(page)).toHaveAttribute('data-state', 'on')

  await page.goto(`${candidate}/fixtures/toggle/disabled`)
  await expect(toggle(page)).toBeDisabled()
  await expect(toggle(page)).toHaveAttribute('aria-disabled', 'true')
  await expect(toggle(page)).toHaveAttribute('data-disabled', 'true')
  await toggle(page).click({ force: true })
  await expect(toggle(page)).toHaveAttribute('aria-pressed', 'false')

  await page.goto(`${candidate}/fixtures/toggle/variants-sizes`)
  await expect(page.locator('[data-radcn-toggle]')).toHaveCount(3)
  await expect(page.locator('.radcn-toggle--sm')).toHaveCSS('min-height', '32px')
  await expect(page.locator('.radcn-toggle--outline')).toHaveAttribute('data-variant', 'outline')
  await expect(page.locator('.radcn-toggle--lg')).toHaveCSS('min-height', '44px')
})

test('candidate toggle exposes custom token hooks', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/toggle/custom-token`)

  await expect(toggle(page)).toHaveClass(/radcn-fixture-custom-toggle/)
  await expect(toggle(page)).toHaveCSS('background-color', 'rgb(15, 118, 110)')
  await expect(toggle(page)).toHaveCSS('border-color', 'rgb(15, 118, 110)')
  await expect(toggle(page)).toHaveCSS('color', 'rgb(255, 255, 255)')
})

test('candidate toggle group supports single and multiple pressed state', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/toggle-group/single`)

  await expect(group(page)).toHaveAttribute('role', 'group')
  await expect(group(page)).toHaveAttribute('data-type', 'single')
  await expect(group(page)).toHaveAttribute('data-value', 'bold')
  await expect(groupItem(page, 'bold')).toHaveAttribute('aria-pressed', 'true')
  await expect(groupItem(page, 'italic')).toHaveAttribute('aria-pressed', 'false')

  await groupItem(page, 'italic').click()
  await expect(group(page)).toHaveAttribute('data-value', 'italic')
  await expect(groupItem(page, 'bold')).toHaveAttribute('aria-pressed', 'false')
  await expect(groupItem(page, 'italic')).toHaveAttribute('aria-pressed', 'true')

  await page.goto(`${candidate}/fixtures/toggle-group/multiple`)
  await expect(group(page)).toHaveAttribute('data-type', 'multiple')
  await expect(group(page)).toHaveAttribute('data-value', 'bold underline')
  await expect(groupItem(page, 'bold')).toHaveAttribute('aria-pressed', 'true')
  await expect(groupItem(page, 'underline')).toHaveAttribute('aria-pressed', 'true')

  await groupItem(page, 'italic').click()
  await expect(group(page)).toHaveAttribute('data-value', 'bold underline italic')
  await expect(groupItem(page, 'italic')).toHaveAttribute('aria-pressed', 'true')
  await groupItem(page, 'bold').click()
  await expect(group(page)).toHaveAttribute('data-value', 'underline italic')
  await expect(groupItem(page, 'bold')).toHaveAttribute('aria-pressed', 'false')
})

test('candidate toggle group supports keyboard focus disabled skip and vertical orientation', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/toggle-group/disabled`)

  await expect(groupItem(page, 'italic')).toBeDisabled()
  await expect(groupItem(page, 'italic')).toHaveAttribute('aria-disabled', 'true')
  await expect(groupItem(page, 'italic')).toHaveAttribute('tabindex', '-1')

  await groupItem(page, 'bold').focus()
  await page.keyboard.press('ArrowRight')
  await expect(groupItem(page, 'underline')).toBeFocused()
  await page.keyboard.press('Space')
  await expect(groupItem(page, 'underline')).toHaveAttribute('aria-pressed', 'true')
  await expect(group(page)).toHaveAttribute('data-value', 'underline')
  await groupItem(page, 'italic').click({ force: true })
  await expect(group(page)).toHaveAttribute('data-value', 'underline')

  await page.goto(`${candidate}/fixtures/toggle-group/vertical`)
  await expect(group(page)).toHaveAttribute('data-orientation', 'vertical')
  await expect(group(page)).toHaveClass(/radcn-toggle-group--vertical/)
  await expect(groupItem(page, 'italic')).toHaveAttribute('aria-pressed', 'true')
  await groupItem(page, 'italic').focus()
  await page.keyboard.press('ArrowDown')
  await expect(groupItem(page, 'underline')).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(groupItem(page, 'underline')).toHaveAttribute('aria-pressed', 'true')
  await expect(groupItem(page, 'italic')).toHaveAttribute('aria-pressed', 'false')
})

test('candidate toggle group exposes custom token hooks', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/toggle-group/custom-token`)

  await expect(group(page)).toHaveClass(/radcn-fixture-custom-toggle-group/)
  await expect(groupItem(page, 'underline')).toHaveCSS('background-color', 'rgb(15, 118, 110)')
  await expect(groupItem(page, 'underline')).toHaveCSS('border-color', 'rgb(15, 118, 110)')
  await expect(groupItem(page, 'underline')).toHaveCSS('color', 'rgb(255, 255, 255)')
})
