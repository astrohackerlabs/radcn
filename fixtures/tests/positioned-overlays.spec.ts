import { expect, test } from '@playwright/test'

const candidate = 'http://localhost:4602'

async function openFreshTooltip(page: import('@playwright/test').Page, scenario = 'default') {
  await page.goto(`${candidate}/fixtures/tooltip/${scenario}`)
  let content = page.locator('[data-radcn-tooltip-content]')
  let trigger = page.locator('[data-radcn-tooltip-trigger]')
  if (await content.isVisible()) {
    await trigger.focus()
    await page.keyboard.press('Escape')
    await expect(content).toBeHidden()
    await trigger.evaluate((element) => (element as HTMLElement).blur())
  }
  await page.mouse.move(20, 20)
  return {
    content,
    trigger,
  }
}

async function openFreshHoverCard(page: import('@playwright/test').Page, scenario = 'default') {
  await page.goto(`${candidate}/fixtures/hover-card/${scenario}`)
  let content = page.locator('[data-radcn-hover-card-content]')
  if (await content.isVisible()) {
    await page.keyboard.press('Escape')
    await expect(content).toBeHidden()
  }
  await page.mouse.move(20, 20)
  return {
    content,
    trigger: page.locator('[data-radcn-hover-card-trigger]'),
  }
}

test('candidate popover opens closes and stays non-modal', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/popover/default`)
  let trigger = page.locator('[data-radcn-popover-trigger]')
  let content = page.locator('[data-radcn-popover-content]')

  await trigger.click()
  await expect(content).toBeVisible()
  await expect(trigger).toHaveAttribute('aria-expanded', 'true')
  await expect(trigger).toHaveAttribute('aria-controls', await content.getAttribute('id') || '')
  await expect(page.locator('[data-radcn-portal-root] [data-radcn-popover-portal]')).toHaveCount(1)
  await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden')

  let beforeTab = await page.evaluate(() => document.activeElement?.getAttribute('data-radcn-popover-trigger'))
  await page.keyboard.press('Tab')
  let afterTab = await page.evaluate(() => document.activeElement?.getAttribute('data-radcn-popover-trigger'))
  expect(beforeTab).toBe('')
  expect(afterTab).not.toBe('')

  await page.keyboard.press('Escape')
  await expect(content).toBeHidden()
  await expect(trigger).toHaveAttribute('aria-expanded', 'false')

  await trigger.click()
  await page.locator('[data-popover-focus]').click()
  await page.locator('[data-radcn-popover-close]').click()
  await expect(content).toBeHidden()
})

test('candidate popover supports default open outside dismissal placement and custom tokens', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/popover/default-open`)
  await expect(page.locator('[data-radcn-popover-content]')).toBeVisible()

  await page.goto(`${candidate}/fixtures/popover/outside-dismiss`)
  await page.locator('[data-radcn-popover-trigger]').click()
  let content = page.locator('[data-radcn-popover-content]')
  await expect(content).toBeVisible()
  await page.mouse.click(20, 20)
  await expect(content).toBeHidden()

  await page.goto(`${candidate}/fixtures/popover/side-align`)
  await page.locator('[data-radcn-popover-trigger]').click()
  content = page.locator('[data-radcn-popover-content]')
  let triggerBox = await page.locator('[data-radcn-popover-trigger]').boundingBox()
  let anchorBox = await page.locator('[data-popover-anchor-box]').boundingBox()
  await expect(content).toHaveAttribute('data-side', 'left')
  await expect(content).toHaveAttribute('data-align', 'end')
  let box = await content.boundingBox()
  let stage = await page.locator('[data-fixture-stage]').boundingBox()
  expect(triggerBox).not.toBeNull()
  expect(anchorBox).not.toBeNull()
  expect(box).not.toBeNull()
  expect(stage).not.toBeNull()
  expect(box!.x).toBeGreaterThanOrEqual(stage!.x)
  expect(box!.x + box!.width).toBeLessThanOrEqual(stage!.x + stage!.width)
  expect(box!.x + box!.width).toBeLessThanOrEqual(anchorBox!.x)
  expect(anchorBox!.x).toBeGreaterThan(triggerBox!.x + triggerBox!.width)

  await page.goto(`${candidate}/fixtures/popover/custom-token`)
  await page.locator('[data-radcn-popover-trigger]').click()
  content = page.locator('[data-radcn-popover-content]')
  await expect(content).toHaveClass(/radcn-fixture-custom-popover/)
  await expect(content).toHaveCSS('border-color', 'rgb(124, 58, 237)')
  await expect(content).toHaveCSS('background-color', 'rgb(250, 245, 255)')
})

test('candidate tooltip opens from hover and focus with accessible relationship', async ({ page }) => {
  let opened = await openFreshTooltip(page)
  await opened.trigger.hover()
  await expect(opened.content).toBeVisible()
  await expect(opened.content).toHaveAttribute('role', 'tooltip')
  await expect(opened.trigger).toHaveAttribute('aria-describedby', await opened.content.getAttribute('id') || '')
  await expect(page.locator('[data-radcn-portal-root] [data-radcn-tooltip-portal]')).toHaveCount(1)
  await expect(page.locator('[data-radcn-tooltip-arrow]')).toBeVisible()
  await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden')

  await page.keyboard.press('Escape')
  await expect(opened.content).toBeHidden()

  opened = await openFreshTooltip(page, 'focus')
  await opened.trigger.focus()
  await expect(opened.content).toBeVisible()
  await opened.trigger.blur()
  await expect(opened.content).toBeHidden()
})

test('candidate tooltip supports delay content hover placement and custom tokens', async ({ page }) => {
  let opened = await openFreshTooltip(page, 'delay')
  await opened.trigger.hover()
  await expect(opened.content).toBeHidden()
  await expect(opened.content).toBeVisible({ timeout: 1000 })

  opened = await openFreshTooltip(page, 'content-hover')
  await opened.trigger.hover()
  await expect(opened.content).toBeVisible()
  let box = await opened.content.boundingBox()
  expect(box).not.toBeNull()
  await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height / 2)
  await expect(opened.content).toBeVisible()

  opened = await openFreshTooltip(page, 'side')
  await opened.trigger.hover()
  await expect(opened.content).toHaveAttribute('data-side', 'right')

  await page.goto(`${candidate}/fixtures/tooltip/custom-token`)
  await page.keyboard.press('Escape')
  await page.locator('[data-radcn-tooltip-trigger]').hover()
  let content = page.locator('[data-radcn-tooltip-content]')
  await expect(content).toHaveCSS('background-color', 'rgb(15, 118, 110)')
  await expect(page.locator('[data-radcn-tooltip-arrow]')).toBeVisible()
})

test('candidate hover card preserves trigger content hover region and timer cancellation', async ({ page }) => {
  let opened = await openFreshHoverCard(page, 'content-hover')
  await opened.trigger.hover()
  await expect(opened.content).toBeVisible()
  let box = await opened.content.boundingBox()
  expect(box).not.toBeNull()
  await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height / 2)
  await expect(opened.content).toBeVisible()

  await page.mouse.move(20, 20)
  await page.waitForTimeout(60)
  await opened.trigger.hover()
  await expect(opened.content).toBeVisible()
  await page.waitForTimeout(150)
  await expect(opened.content).toBeVisible()

  await page.mouse.move(20, 20)
  await expect(opened.content).toBeHidden({ timeout: 1000 })
})

test('candidate hover card supports focus delay placement custom tokens and non-modal behavior', async ({ page }) => {
  let opened = await openFreshHoverCard(page, 'delay')
  await opened.trigger.hover()
  await expect(opened.content).toBeHidden()
  await expect(opened.content).toBeVisible({ timeout: 1000 })
  await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden')

  opened = await openFreshHoverCard(page, 'focus')
  await opened.trigger.focus()
  await expect(opened.content).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(opened.content).toBeHidden()

  await page.goto(`${candidate}/fixtures/hover-card/side-align`)
  await page.keyboard.press('Escape')
  await page.locator('[data-radcn-hover-card-trigger]').hover()
  let content = page.locator('[data-radcn-hover-card-content]')
  await expect(content).toHaveAttribute('data-side', 'left')
  await expect(content).toHaveAttribute('data-align', 'end')
  let box = await content.boundingBox()
  let stage = await page.locator('[data-fixture-stage]').boundingBox()
  expect(box).not.toBeNull()
  expect(stage).not.toBeNull()
  expect(box!.x).toBeGreaterThanOrEqual(stage!.x)
  expect(box!.x + box!.width).toBeLessThanOrEqual(stage!.x + stage!.width)

  await page.goto(`${candidate}/fixtures/hover-card/custom-token`)
  await page.keyboard.press('Escape')
  await page.locator('[data-radcn-hover-card-trigger]').hover()
  content = page.locator('[data-radcn-hover-card-content]')
  await expect(content).toHaveClass(/radcn-fixture-custom-hover-card/)
  await expect(content).toHaveCSS('border-color', 'rgb(15, 118, 110)')
  await expect(content).toHaveCSS('background-color', 'rgb(240, 253, 250)')
})
