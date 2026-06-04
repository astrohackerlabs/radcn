import { expect, test } from '@playwright/test'

const candidate = 'http://localhost:4602'

async function closeIfOpen(page: import('@playwright/test').Page) {
  for (let index = 0; index < 4; index += 1) {
    let open = page.locator('[data-radcn-drawer-content]:visible').first()
    if ((await open.count()) === 0) return
    await page.keyboard.press('Escape')
    await expect(open).toBeHidden()
  }
}

async function freshDrawer(page: import('@playwright/test').Page, scenario = 'default', id = `candidate-drawer-${scenario}`) {
  await page.goto(`${candidate}/fixtures/drawer/${scenario}`)
  await closeIfOpen(page)
  let portal = page.locator(`[data-dialog-id="${id}"]`)
  return {
    content: portal.locator('[data-radcn-drawer-content]'),
    handle: portal.locator('[data-radcn-drawer-handle]'),
    overlay: portal.locator('[data-radcn-drawer-overlay]'),
    portal,
    trigger: page.locator(`#${id} [data-radcn-drawer-trigger]`),
  }
}

test('candidate drawer opens with modal semantics focus trap and scroll lock', async ({ page }) => {
  let drawer = await freshDrawer(page)
  await drawer.trigger.click()
  await expect(drawer.content).toBeVisible()
  await expect(drawer.portal).toBeVisible()
  await expect(page.locator('[data-radcn-portal-root] [data-radcn-drawer-portal]')).toHaveCount(1)
  await expect(drawer.trigger).toHaveAttribute('aria-haspopup', 'dialog')
  await expect(drawer.trigger).toHaveAttribute('aria-expanded', 'true')
  await expect(drawer.trigger).toHaveAttribute('aria-controls', await drawer.content.getAttribute('id') || '')
  await expect(drawer.content).toHaveAttribute('role', 'dialog')
  await expect(drawer.content).toHaveAttribute('aria-modal', 'true')
  await expect(drawer.content).toHaveAttribute('aria-labelledby', /title/)
  await expect(drawer.content).toHaveAttribute('aria-describedby', /description/)
  await expect(page.locator('body')).toHaveCSS('overflow', 'hidden')
  await expect(page.locator('[data-drawer-secondary-action]')).toBeFocused()

  await page.keyboard.press('Shift+Tab')
  await expect(page.getByRole('button', { name: 'Cancel' })).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(page.locator('[data-drawer-secondary-action]')).toBeFocused()

  await page.keyboard.press('Escape')
  await expect(drawer.content).toBeHidden()
  await expect(drawer.trigger).toBeFocused()
  await expect(drawer.trigger).toHaveAttribute('aria-expanded', 'false')
  await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden')
})

test('candidate drawer supports default open outside and close controls', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/drawer/default-open`)
  let defaultOpen = page.locator('[data-dialog-id="candidate-drawer-default-open"] [data-radcn-drawer-content]')
  await expect(defaultOpen).toBeVisible()
  await expect(page.locator('body')).toHaveCSS('overflow', 'hidden')
  await page.keyboard.press('Escape')
  await expect(defaultOpen).toBeHidden()

  let drawer = await freshDrawer(page, 'close-actions')
  await drawer.trigger.click()
  await expect(drawer.content).toBeVisible()
  await expect(drawer.content.locator('> [data-radcn-drawer-close]')).toBeVisible()
  await drawer.content.locator('> [data-radcn-drawer-close]').click()
  await expect(drawer.content).toBeHidden()

  drawer = await freshDrawer(page, 'close-actions')
  await drawer.trigger.click()
  await drawer.overlay.click({ position: { x: 10, y: 10 } })
  await expect(drawer.content).toBeHidden()

  drawer = await freshDrawer(page, 'close-actions')
  await drawer.trigger.click()
  await page.getByRole('button', { name: 'Cancel' }).click()
  await expect(drawer.content).toBeHidden()
})

test('candidate drawer exposes directions handle visibility and custom tokens', async ({ page }) => {
  let drawer = await freshDrawer(page, 'directions', 'candidate-drawer-bottom')
  await drawer.trigger.click()
  await expect(drawer.content).toHaveAttribute('data-direction', 'bottom')
  await expect(drawer.handle).toHaveCount(0)
  let bottomBox = await drawer.content.boundingBox()
  let viewport = page.viewportSize()
  expect(bottomBox).not.toBeNull()
  expect(viewport).not.toBeNull()
  expect(Math.round(bottomBox!.y + bottomBox!.height)).toBeGreaterThanOrEqual(viewport!.height - 2)

  await page.keyboard.press('Escape')
  drawer = await freshDrawer(page, 'directions', 'candidate-drawer-right')
  await drawer.trigger.click()
  await expect(drawer.content).toHaveAttribute('data-direction', 'right')
  let rightBox = await drawer.content.boundingBox()
  viewport = page.viewportSize()
  expect(rightBox).not.toBeNull()
  expect(viewport).not.toBeNull()
  expect(Math.round(rightBox!.x + rightBox!.width)).toBeGreaterThanOrEqual(viewport!.width - 2)

  await page.keyboard.press('Escape')
  drawer = await freshDrawer(page, 'directions', 'candidate-drawer-top')
  await drawer.trigger.click()
  await expect(drawer.content).toHaveAttribute('data-direction', 'top')
  let topBox = await drawer.content.boundingBox()
  expect(topBox).not.toBeNull()
  expect(Math.round(topBox!.y)).toBeLessThanOrEqual(2)

  await page.keyboard.press('Escape')
  drawer = await freshDrawer(page, 'directions', 'candidate-drawer-left')
  await drawer.trigger.click()
  await expect(drawer.content).toHaveAttribute('data-direction', 'left')
  let leftBox = await drawer.content.boundingBox()
  expect(leftBox).not.toBeNull()
  expect(Math.round(leftBox!.x)).toBeLessThanOrEqual(2)

  drawer = await freshDrawer(page, 'custom-token')
  await drawer.trigger.click()
  await expect(drawer.content).toHaveClass(/radcn-fixture-custom-drawer/)
  await expect(drawer.content).toHaveCSS('border-top-color', 'rgb(15, 118, 110)')
  await expect(drawer.handle).toHaveCSS('background-color', 'rgb(15, 118, 110)')
})

test('candidate drawer scrolls internally and implements drag threshold policy', async ({ page }) => {
  let drawer = await freshDrawer(page, 'scrollable-content')
  await drawer.trigger.click()
  let scrollBody = page.locator('[data-drawer-scroll-body]')
  await expect(scrollBody).toBeVisible()
  await scrollBody.evaluate((node) => {
    node.scrollTop = 120
  })
  await expect.poll(() => scrollBody.evaluate((node) => node.scrollTop)).toBeGreaterThan(0)
  await expect(page.locator('body')).toHaveCSS('overflow', 'hidden')
  await page.keyboard.press('Escape')

  drawer = await freshDrawer(page, 'default')
  await drawer.trigger.click()
  let box = await drawer.content.boundingBox()
  expect(box).not.toBeNull()
  await page.mouse.move(box!.x + box!.width / 2, box!.y + 12)
  await page.mouse.down()
  await page.mouse.move(box!.x + box!.width / 2, box!.y + 52)
  await page.mouse.up()
  await expect(drawer.content).toBeVisible()
  await expect(drawer.content).not.toHaveAttribute('style', /--radcn-drawer-drag-offset/)

  box = await drawer.content.boundingBox()
  expect(box).not.toBeNull()
  await page.mouse.move(box!.x + box!.width / 2, box!.y + 12)
  await page.mouse.down()
  await page.mouse.move(box!.x + box!.width / 2, box!.y + 130)
  await page.mouse.up()
  await expect(drawer.content).toBeHidden()

  drawer = await freshDrawer(page, 'gesture-dismiss')
  await drawer.trigger.click()
  await expect(drawer.handle).toBeVisible()
  await page.waitForTimeout(200)
  box = await drawer.handle.boundingBox()
  expect(box).not.toBeNull()
  await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height / 2)
  await page.mouse.down()
  await page.mouse.move(box!.x + box!.width / 2 + 120, box!.y + box!.height / 2)
  await page.mouse.up()
  await expect(drawer.content).toBeHidden()
})
