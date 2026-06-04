import { expect, test } from '@playwright/test'

const candidate = 'http://localhost:4602'

async function openMenubar(page: import('@playwright/test').Page, scenario = 'default') {
  await page.goto(`${candidate}/fixtures/menubar/${scenario}`)
  let root = page.locator('[data-radcn-menubar]').first()
  let file = page.getByRole('menuitem', { name: 'File' }).first()
  await file.click()
  return { file, root }
}

test('candidate menubar opens menu content with semantics and portal state', async ({ page }) => {
  let opened = await openMenubar(page)
  await expect(opened.root).toHaveAttribute('role', 'menubar')
  await expect(opened.root).toHaveAttribute('aria-orientation', 'horizontal')
  await expect(opened.file).toHaveAttribute('aria-haspopup', 'menu')
  await expect(opened.file).toHaveAttribute('aria-expanded', 'true')
  await expect(page.locator('[data-radcn-portal-root] [data-radcn-menubar-portal]')).toHaveCount(3)
  await expect(page.locator('[data-radcn-menubar-content]').first()).toHaveAttribute('role', 'menu')
  await expect(page.getByRole('menuitem', { name: /New Tab/ })).toBeFocused()
})

test('candidate menubar roves triggers and menu items with keyboard', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/menubar/keyboard-typeahead`)
  let file = page.getByRole('menuitem', { name: 'File' }).first()
  await file.focus()
  await page.keyboard.press('ArrowRight')
  await expect(page.getByRole('menuitem', { name: 'View' }).first()).toBeFocused()
  await page.keyboard.press('End')
  await expect(page.getByRole('menuitem', { name: 'Help' }).first()).toBeFocused()
  await page.keyboard.press('Home')
  await expect(file).toBeFocused()
  await page.keyboard.press('Enter')
  await page.keyboard.press('n')
  await expect(page.getByRole('menuitem', { name: /New Tab/ })).toBeFocused()
  await page.keyboard.press('ArrowDown')
  await expect(page.getByRole('menuitem', { name: 'New Window' })).toBeFocused()
  await page.keyboard.press('ArrowDown')
  await expect(page.getByRole('menuitem', { name: /Import disabled/ })).not.toBeFocused()
  await page.keyboard.press('Escape')
  await expect(file).toBeFocused()
  await expect(file).toHaveAttribute('aria-expanded', 'false')

  await page.goto(`${candidate}/fixtures/menubar/vertical`)
  file = page.getByRole('menuitem', { name: 'File' }).first()
  await file.focus()
  await page.keyboard.press('ArrowDown')
  await expect(page.getByRole('menuitem', { name: 'View' }).first()).toBeFocused()
})

test('candidate menubar synchronizes checked radio submenu disabled and custom hooks', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/menubar/checkbox-radio`)
  await page.getByRole('menuitem', { name: 'View' }).first().click()
  let sidebar = page.getByRole('menuitemcheckbox', { name: /Show Sidebar/ })
  await expect(sidebar).toHaveAttribute('aria-checked', 'true')
  await sidebar.click()
  await expect(page.locator('[data-radcn-menubar-checkbox-item]').first()).toHaveAttribute('aria-checked', 'false')

  await page.getByRole('menuitem', { name: 'View' }).first().click()
  let compact = page.getByRole('menuitemradio', { name: /Compact/ })
  await compact.click()
  await expect(page.locator('[data-radcn-menubar-radio-item][data-value="compact"]')).toHaveAttribute('aria-checked', 'true')

  await page.goto(`${candidate}/fixtures/menubar/submenu`)
  await page.getByRole('menuitem', { name: 'File' }).first().click()
  await page.getByRole('menuitem', { name: 'Help' }).first().hover()
  await expect(page.getByRole('menuitem', { name: 'File' }).first()).toHaveAttribute('aria-expanded', 'false')
  await expect(page.getByRole('menuitem', { name: 'Help' }).first()).toHaveAttribute('aria-expanded', 'true')
  await expect(page.locator('[data-radcn-menubar-content]:visible')).toHaveCount(1)
  await page.getByRole('menuitem', { name: /Resources/ }).hover()
  await expect(page.locator('[data-radcn-menubar-sub-content]').first()).toBeVisible()

  await page.goto(`${candidate}/fixtures/menubar/disabled`)
  await expect(page.getByRole('menuitem', { name: /Edit disabled/ })).toBeDisabled()

  await page.goto(`${candidate}/fixtures/menubar/custom-token`)
  await expect(page.locator('[data-radcn-menubar]').first()).toHaveClass(/radcn-fixture-custom-menubar/)
  await expect(page.locator('[data-radcn-menubar]').first()).toHaveCSS('border-color', 'rgb(15, 118, 110)')
})

test('candidate navigation menu exposes links viewport indicator and keyboard behavior', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/navigation-menu/default`)
  let root = page.locator('[data-radcn-navigation-menu]').first()
  await expect(root).toHaveAttribute('aria-label', 'Main navigation')
  await expect(page.locator('[data-radcn-navigation-menu-list]')).toHaveCount(1)
  await expect(page.getByRole('button', { name: 'Product' })).toHaveAttribute('aria-expanded', 'true')
  await expect(page.locator('[data-radcn-navigation-menu-content]').first()).toBeVisible()
  await expect(page.locator('[data-radcn-navigation-menu-viewport]')).toHaveAttribute('data-state', 'open')
  await expect(page.locator('[data-radcn-navigation-menu-indicator]')).toHaveAttribute('data-state', 'visible')
  await expect(page.getByRole('link', { name: 'Pricing' })).toHaveAttribute('href', '/fixtures/card/default')

  await page.getByRole('button', { name: 'Product' }).focus()
  await page.keyboard.press('ArrowRight')
  await expect(page.getByRole('button', { name: 'Docs' })).toBeFocused()
  await expect(page.getByRole('button', { name: 'Docs' })).toHaveAttribute('aria-expanded', 'true')
  await page.keyboard.press('End')
  await expect(page.getByRole('link', { name: 'Pricing' })).toBeFocused()
  await page.keyboard.press('Escape')
  await expect(page.locator('[data-radcn-navigation-menu-viewport]')).toBeHidden()
  await page.getByRole('button', { name: 'Docs' }).focus()
  await expect(page.locator('[data-radcn-navigation-menu-viewport]')).toBeVisible()
  await page.getByRole('button', { name: 'After navigation' }).focus()
  await expect(page.locator('[data-radcn-navigation-menu-viewport]')).toBeHidden()

  await page.goto(`${candidate}/fixtures/navigation-menu/vertical`)
  await page.getByRole('button', { name: 'Product' }).focus()
  await page.keyboard.press('ArrowDown')
  await expect(page.getByRole('button', { name: 'Docs' })).toBeFocused()
})

test('candidate navigation menu handles disabled and custom token hooks', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/navigation-menu/disabled`)
  await expect(page.getByRole('button', { name: 'Disabled' })).toBeDisabled()

  await page.goto(`${candidate}/fixtures/navigation-menu/custom-token`)
  await expect(page.locator('[data-radcn-navigation-menu]').first()).toHaveClass(/radcn-fixture-custom-navigation-menu/)
  await expect(page.locator('[data-radcn-navigation-menu-list]').first()).toHaveCSS('border-color', 'rgb(15, 118, 110)')
})
