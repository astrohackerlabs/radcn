import { expect, test } from '@playwright/test'

const candidate = 'http://localhost:4602'

async function openDialog(page: import('@playwright/test').Page, scenario = 'default') {
  await page.goto(`${candidate}/fixtures/dialog/${scenario}`)
  let trigger = page.locator('[data-radcn-dialog-trigger]')
  await trigger.click()
  return {
    content: page.locator('[data-radcn-dialog-content]'),
    trigger,
  }
}

test('candidate dialog opens with modal semantics and relationships', async ({ page }) => {
  let { content, trigger } = await openDialog(page)
  await expect(trigger).toHaveAttribute('data-state', 'open')
  await expect(content).toBeVisible()
  await expect(content).toHaveAttribute('role', 'dialog')
  await expect(content).toHaveAttribute('aria-modal', 'true')

  let titleId = await page.locator('[data-radcn-dialog-title]').getAttribute('id')
  let descriptionId = await page.locator('[data-radcn-dialog-description]').getAttribute('id')
  await expect(content).toHaveAttribute('aria-labelledby', titleId || '')
  await expect(content).toHaveAttribute('aria-describedby', descriptionId || '')
  await expect(page.locator('[data-radcn-portal-root] [data-radcn-dialog-portal]')).toHaveCount(1)
})

test('candidate dialog traps focus restores focus and locks scroll', async ({ page }) => {
  let { content, trigger } = await openDialog(page)
  await expect(page.locator('[data-dialog-name-input]')).toBeFocused()
  await expect(page.locator('body')).toHaveCSS('overflow', 'hidden')

  await page.keyboard.press('Shift+Tab')
  await expect(page.locator('[data-radcn-dialog-close][aria-label="Close"]')).toBeFocused()

  await page.keyboard.press('Tab')
  await expect(page.locator('[data-dialog-name-input]')).toBeFocused()

  await page.keyboard.press('Escape')
  await expect(content).toBeHidden()
  await expect(trigger).toBeFocused()
  await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden')
})

test('candidate dialog closes from close button and outside pointer', async ({ page }) => {
  let opened = await openDialog(page, 'close-button')
  await page.getByRole('button', { name: 'Cancel' }).click()
  await expect(opened.content).toBeHidden()
  await expect(opened.trigger).toBeFocused()

  opened = await openDialog(page, 'outside-dismiss')
  await page.locator('[data-radcn-dialog-overlay]').click({ position: { x: 10, y: 10 } })
  await expect(opened.content).toBeHidden()
  await expect(opened.trigger).toBeFocused()
})

test('candidate dialog supports default open state and custom tokens', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/dialog/default-open`)
  let content = page.locator('[data-radcn-dialog-content]')
  await expect(content).toBeVisible()
  await expect(content).toHaveAttribute('data-state', 'open')
  await page.keyboard.press('Escape')
  await expect(content).toBeHidden()

  await page.goto(`${candidate}/fixtures/dialog/custom-token`)
  await page.locator('[data-radcn-dialog-trigger]').click()
  content = page.locator('[data-radcn-dialog-content]')
  await expect(content).toHaveClass(/radcn-fixture-custom-dialog/)
  await expect(content).toHaveCSS('border-color', 'rgb(15, 118, 110)')
  await expect(content).toHaveCSS('background-color', 'rgb(240, 253, 250)')
  await expect(page.locator('[data-radcn-dialog-overlay]')).toHaveCSS('background-color', 'rgba(15, 118, 110, 0.35)')
})

test('candidate dialog demo matches upstream edit profile composition', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/dialog/demo`)
  let trigger = page.getByRole('button', { name: 'Open Dialog' })
  await expect(page.locator('[data-radcn-dialog]')).toBeVisible()
  await expect(page.locator('[data-radcn-dialog-trigger]')).toHaveClass(/radcn-button--outline/)

  await trigger.click()
  let content = page.locator('.radcn-fixture-dialog-demo-content')
  await expect(content).toBeVisible()
  await expect(content).toHaveAttribute('role', 'dialog')
  await expect(content).toHaveAttribute('aria-modal', 'true')
  await expect(content).toHaveCSS('width', '425px')
  await expect(page.locator('[data-radcn-dialog-title]')).toHaveText('Edit profile')
  await expect(page.locator('[data-radcn-dialog-description]')).toHaveText("Make changes to your profile here. Click save when you're done.")
  await expect(page.locator('form[data-dialog-demo-form]')).toBeVisible()
  await expect(page.getByLabel('Name', { exact: true })).toHaveValue('Pedro Duarte')
  await expect(page.getByLabel('Username')).toHaveValue('@peduarte')
  await expect(page.getByRole('button', { name: 'Cancel' })).toHaveClass(/radcn-button--outline/)
  // The footer Cancel button must stay in normal flow; only the icon close
  // button is absolutely positioned. Otherwise the two overlap and the icon
  // button intercepts clicks meant for Cancel.
  await expect(page.getByRole('button', { name: 'Cancel' })).toHaveCSS('position', 'static')
  let iconClose = content.locator('> [data-radcn-dialog-close][aria-label="Close"]')
  await expect(iconClose).toHaveClass(/radcn-dialog-close--icon/)
  await expect(iconClose).toHaveCSS('position', 'absolute')
  await expect(page.getByRole('button', { name: 'Save changes' })).toHaveAttribute('type', 'submit')
  await expect(page.getByLabel('Name', { exact: true })).toBeFocused()

  await page.keyboard.press('Escape')
  await expect(content).toBeHidden()
  await expect(trigger).toBeFocused()

  await trigger.click()
  await page.getByRole('button', { name: 'Cancel' }).click()
  await expect(content).toBeHidden()
  await expect(trigger).toBeFocused()
})

test('candidate dialog close button demo matches upstream share link composition', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/dialog/close-button-demo`)
  let trigger = page.getByRole('button', { name: 'Share' })
  await expect(page.locator('[data-radcn-dialog]')).toBeVisible()
  await expect(page.locator('[data-radcn-dialog-trigger]')).toHaveClass(/radcn-button--outline/)

  await trigger.click()
  let content = page.locator('.radcn-fixture-dialog-close-button-content')
  await expect(content).toBeVisible()
  await expect(content).toHaveAttribute('role', 'dialog')
  await expect(content).toHaveAttribute('aria-modal', 'true')
  await expect(content).toHaveCSS('width', '448px')
  await expect(page.locator('[data-radcn-dialog-title]')).toHaveText('Share link')
  await expect(page.locator('[data-radcn-dialog-description]')).toHaveText('Anyone who has this link will be able to view this.')
  let linkInput = page.locator('#candidate-dialog-share-link')
  await expect(linkInput).toHaveValue('https://ui.shadcn.com/docs/installation')
  await expect(linkInput).toHaveAttribute('readonly', '')
  await expect(page.locator('label[for="candidate-dialog-share-link"]')).toHaveClass(/radcn-sr-only/)
  await expect(page.locator('.radcn-fixture-dialog-footer-start')).toHaveCSS('justify-content', 'flex-start')
  let footerClose = page.locator('.radcn-fixture-dialog-footer-start [data-radcn-dialog-close]')
  await expect(footerClose).toHaveText('Close')
  await expect(footerClose).toHaveClass(/radcn-button--secondary/)
  await expect(page.getByRole('button', { name: /copy/i })).toHaveCount(0)

  await footerClose.click()
  await expect(content).toBeHidden()
  await expect(trigger).toBeFocused()
})
