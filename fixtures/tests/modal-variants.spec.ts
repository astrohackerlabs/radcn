import { expect, test } from '@playwright/test'

const candidate = 'http://localhost:4602'

async function openAlertDialog(page: import('@playwright/test').Page, scenario = 'default') {
  await page.goto(`${candidate}/fixtures/alert-dialog/${scenario}`)
  let trigger = page.locator('[data-radcn-alert-dialog-trigger]')
  await trigger.click()
  return {
    content: page.locator('[data-radcn-alert-dialog-content]'),
    trigger,
  }
}

async function openSheet(page: import('@playwright/test').Page, scenario = 'right') {
  await page.goto(`${candidate}/fixtures/sheet/${scenario}`)
  let trigger = page.locator('[data-radcn-sheet-trigger]')
  await trigger.click()
  return {
    content: page.locator('[data-radcn-sheet-content]'),
    trigger,
  }
}

test('candidate alert dialog opens as non-dismissible alertdialog', async ({ page }) => {
  let { content, trigger } = await openAlertDialog(page)
  await expect(trigger).toHaveAttribute('data-state', 'open')
  await expect(content).toBeVisible()
  await expect(content).toHaveAttribute('role', 'alertdialog')
  await expect(content).toHaveAttribute('aria-modal', 'true')
  await expect(page.locator('body')).toHaveCSS('overflow', 'hidden')

  let titleId = await page.locator('[data-radcn-alert-dialog-title]').getAttribute('id')
  let descriptionId = await page.locator('[data-radcn-alert-dialog-description]').getAttribute('id')
  await expect(content).toHaveAttribute('aria-labelledby', titleId || '')
  await expect(content).toHaveAttribute('aria-describedby', descriptionId || '')
  await expect(page.locator('[data-radcn-portal-root] [data-radcn-alert-dialog-portal]')).toHaveCount(1)

  await page.keyboard.press('Escape')
  await expect(content).toBeVisible()

  await page.locator('[data-radcn-alert-dialog-overlay]').click({ position: { x: 10, y: 10 } })
  await expect(content).toBeVisible()
})

test('candidate alert dialog traps focus and closes from action or cancel', async ({ page }) => {
  let opened = await openAlertDialog(page, 'cancel-action')
  await expect(page.locator('[data-radcn-alert-dialog-action]')).toBeFocused()
  await page.keyboard.press('Shift+Tab')
  await expect(page.locator('[data-radcn-alert-dialog-cancel]')).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(page.locator('[data-radcn-alert-dialog-action]')).toBeFocused()
  await page.locator('[data-radcn-alert-dialog-cancel]').click()
  await expect(opened.content).toBeHidden()
  await expect(opened.trigger).toBeFocused()
  await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden')

  opened = await openAlertDialog(page, 'cancel-action')
  await page.locator('[data-radcn-alert-dialog-action]').click()
  await expect(opened.content).toBeHidden()
  await expect(opened.trigger).toBeFocused()
})

test('candidate alert dialog supports default open size and custom tokens', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/alert-dialog/default-open`)
  let content = page.locator('[data-radcn-alert-dialog-content]')
  await expect(content).toBeVisible()
  await expect(content).toHaveAttribute('data-state', 'open')

  await page.goto(`${candidate}/fixtures/alert-dialog/small`)
  await page.locator('[data-radcn-alert-dialog-trigger]').click()
  await expect(page.locator('[data-radcn-alert-dialog-content]')).toHaveAttribute('data-size', 'sm')

  await page.goto(`${candidate}/fixtures/alert-dialog/custom-token`)
  await page.locator('[data-radcn-alert-dialog-trigger]').click()
  content = page.locator('[data-radcn-alert-dialog-content]')
  await expect(content).toHaveClass(/radcn-fixture-custom-alert-dialog/)
  await expect(content).toHaveCSS('border-color', 'rgb(153, 27, 27)')
  await expect(page.locator('[data-radcn-alert-dialog-overlay]')).toHaveCSS('background-color', 'rgba(127, 29, 29, 0.35)')
})

test('candidate sheet opens modal side variants and restores focus', async ({ page }) => {
  for (let side of ['right', 'left', 'top', 'bottom']) {
    let { content, trigger } = await openSheet(page, side)
    await expect(content).toBeVisible()
    await expect(content).toHaveAttribute('role', 'dialog')
    await expect(content).toHaveAttribute('aria-modal', 'true')
    await expect(content).toHaveAttribute('data-side', side)
    await expect(page.locator('[data-sheet-name-input]')).toBeFocused()
    await expect(page.locator('body')).toHaveCSS('overflow', 'hidden')

    let box = await content.boundingBox()
    expect(box).not.toBeNull()
    if (side === 'right') expect(Math.round((box?.x || 0) + (box?.width || 0))).toBeGreaterThan(1200)
    if (side === 'left') expect(Math.round(box?.x || 0)).toBeLessThanOrEqual(10)
    if (side === 'top') expect(Math.round(box?.y || 0)).toBeLessThanOrEqual(10)
    if (side === 'bottom') expect(Math.round((box?.y || 0) + (box?.height || 0))).toBeGreaterThan(850)

    await page.keyboard.press('Escape')
    await expect(content).toBeHidden()
    await expect(trigger).toBeFocused()
  }
})

test('candidate sheet traps focus closes outside and supports custom tokens', async ({ page }) => {
  let opened = await openSheet(page, 'right')
  await page.keyboard.press('Shift+Tab')
  await expect(page.locator('[data-radcn-sheet-close][aria-label="Close"]')).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(page.locator('[data-sheet-name-input]')).toBeFocused()
  await page.locator('[data-radcn-sheet-overlay]').click({ position: { x: 10, y: 10 } })
  await expect(opened.content).toBeHidden()
  await expect(opened.trigger).toBeFocused()

  await page.goto(`${candidate}/fixtures/sheet/custom-token`)
  await page.locator('[data-radcn-sheet-trigger]').click()
  let content = page.locator('[data-radcn-sheet-content]')
  await expect(content).toHaveClass(/radcn-fixture-custom-sheet/)
  await expect(content).toHaveCSS('border-color', 'rgb(15, 118, 110)')
  await expect(content).toHaveCSS('background-color', 'rgb(240, 253, 250)')
  await expect(page.locator('[data-radcn-sheet-overlay]')).toHaveCSS('background-color', 'rgba(15, 118, 110, 0.25)')
})
