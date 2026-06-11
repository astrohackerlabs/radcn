import { expect, test } from '@playwright/test'

const candidate = 'http://localhost:4602'

test('candidate accordion covers named upstream demo composition', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/accordion/demo`)

  let root = page.locator('[data-radcn-accordion]')
  await expect(root).toHaveAttribute('data-type', 'single')
  await expect(root).toHaveAttribute('data-collapsible', 'true')
  await expect(root).toHaveAttribute('data-default-value', 'item-1')
  await expect(root).toHaveAttribute('data-accordion-name', 'candidate-accordion-demo')
  await expect(root).toHaveClass(/w-full/)
  await expect(root).toHaveAttribute('style', /width:\s*100%/)

  let items = page.locator('details[data-radcn-accordion-item]')
  await expect(items).toHaveCount(3)
  for (let index = 0; index < 3; index += 1) {
    await expect(items.nth(index)).toHaveAttribute('name', 'candidate-accordion-demo')
  }
  await expect(items.nth(0)).toHaveAttribute('data-value', 'item-1')
  await expect(items.nth(1)).toHaveAttribute('data-value', 'item-2')
  await expect(items.nth(2)).toHaveAttribute('data-value', 'item-3')
  await expect(items.nth(0)).toHaveAttribute('data-state', 'open')
  await expect(items.nth(1)).toHaveAttribute('data-state', 'closed')
  await expect(items.nth(2)).toHaveAttribute('data-state', 'closed')
  await expect(items.nth(0)).toHaveAttribute('open', '')
  await expect(items.nth(1)).not.toHaveAttribute('open', '')
  await expect(items.nth(2)).not.toHaveAttribute('open', '')

  await expect(page.locator('[data-radcn-accordion-trigger]')).toHaveCount(3)
  await expect(page.locator('[data-radcn-accordion-trigger-text]')).toHaveText([
    'Product Information',
    'Shipping Details',
    'Return Policy',
  ])
  await expect(page.locator('[data-radcn-accordion-icon]')).toHaveCount(3)
  await expect(page.locator('[data-radcn-accordion-content]')).toHaveCount(3)
  await expect(page.locator('[data-radcn-accordion-content]')).toHaveClass([
    /flex flex-col gap-4 text-balance/,
    /flex flex-col gap-4 text-balance/,
    /flex flex-col gap-4 text-balance/,
  ])
  await expect(page.locator('[data-radcn-accordion-content]').first()).toHaveCSS('display', 'flex')
  await expect(page.locator('[data-radcn-accordion-content]').first()).toHaveCSS('flex-direction', 'column')
  await expect(page.locator('[data-radcn-accordion-content]').first()).toHaveCSS('gap', '16px')

  await expect(page.locator('[data-radcn-accordion-content]').nth(0)).toContainText('Our flagship product combines cutting-edge technology with sleek design. Built with premium materials, it offers unparalleled performance and reliability.')
  await expect(page.locator('[data-radcn-accordion-content]').nth(0)).toContainText('Key features include advanced processing capabilities, and an intuitive user interface designed for both beginners and experts.')
  await expect(page.locator('[data-radcn-accordion-content]').nth(1)).toContainText('We offer worldwide shipping through trusted courier partners. Standard delivery takes 3-5 business days, while express shipping ensures delivery within 1-2 business days.')
  await expect(page.locator('[data-radcn-accordion-content]').nth(1)).toContainText('All orders are carefully packaged and fully insured. Track your shipment in real-time through our dedicated tracking portal.')
  await expect(page.locator('[data-radcn-accordion-content]').nth(2)).toContainText("We stand behind our products with a comprehensive 30-day return policy. If you're not completely satisfied, simply return the item in its original condition.")
  await expect(page.locator('[data-radcn-accordion-content]').nth(2)).toContainText('Our hassle-free return process includes free return shipping and full refunds processed within 48 hours of receiving the returned item.')

  await page.getByText('Shipping Details').click()
  await expect(items.nth(0)).not.toHaveAttribute('open', '')
  await expect(items.nth(1)).toHaveAttribute('open', '')
  await expect(items.nth(2)).not.toHaveAttribute('open', '')

  await page.getByText('Shipping Details').click()
  await expect(items.nth(1)).not.toHaveAttribute('open', '')
})

test('candidate accordion exposes native details summary hooks and single behavior', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/accordion/single`)

  let root = page.locator('[data-radcn-accordion]')
  await expect(root).toHaveAttribute('data-type', 'single')
  await expect(root).toHaveAttribute('data-collapsible', 'true')
  await expect(root).toHaveAttribute('data-default-value', '')

  let items = page.locator('details[data-radcn-accordion-item]')
  await expect(items).toHaveCount(2)
  await expect(items.first()).toHaveAttribute('name', 'candidate-accordion-single')
  await expect(items.nth(1)).toHaveAttribute('name', 'candidate-accordion-single')
  await expect(items.first()).toHaveAttribute('open', '')
  await expect(items.nth(1)).not.toHaveAttribute('open', '')
  await expect(page.locator('[data-radcn-accordion-trigger]')).toHaveCount(2)
  await expect(page.locator('[data-radcn-accordion-content]')).toHaveCount(2)
  await expect(page.locator('[data-radcn-accordion-icon]')).toHaveCount(2)

  await page.getByText('Can it collapse?').click()
  await expect(items.first()).not.toHaveAttribute('open', '')
  await expect(items.nth(1)).toHaveAttribute('open', '')

  await page.getByText('Can it collapse?').click()
  await expect(items.nth(1)).not.toHaveAttribute('open', '')
})

test('candidate accordion supports multiple open panels and keyboard toggling', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/accordion/multiple`)

  let root = page.locator('[data-radcn-accordion]')
  await expect(root).toHaveAttribute('data-type', 'multiple')
  let items = page.locator('details[data-radcn-accordion-item]')
  await expect(items.first()).toHaveAttribute('open', '')
  await expect(items.nth(1)).toHaveAttribute('open', '')
  await expect(items.first()).not.toHaveAttribute('name', /.+/)

  let firstTrigger = page.locator('[data-radcn-accordion-trigger]').first()
  await firstTrigger.click()
  await expect(items.first()).not.toHaveAttribute('open', '')
  await expect(items.nth(1)).toHaveAttribute('open', '')

  await firstTrigger.focus()
  await page.keyboard.press('Enter')
  await expect(items.first()).toHaveAttribute('open', '')
  await expect(items.nth(1)).toHaveAttribute('open', '')
})

test('candidate accordion exposes disabled and customization hooks', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/accordion/disabled-item`)

  let disabled = page.locator('[data-radcn-accordion-item][data-value="two"]')
  await expect(disabled).toHaveAttribute('data-disabled', 'true')
  await expect(disabled).not.toHaveAttribute('open', '')
  await expect(disabled).toHaveJSProperty('tagName', 'DIV')
  await expect(disabled.locator('[data-radcn-accordion-trigger]')).toHaveCSS('pointer-events', 'none')
  await expect(disabled.locator('[data-radcn-accordion-trigger]')).toHaveAttribute('aria-disabled', 'true')
  await expect(disabled.locator('[data-radcn-accordion-trigger]')).toHaveJSProperty('tagName', 'DIV')
  await expect(disabled.locator('[data-radcn-accordion-content]')).toBeHidden()

  await page.goto(`${candidate}/fixtures/accordion/custom-token`)
  let custom = page.locator('[data-radcn-accordion]')
  await expect(custom).toHaveClass(/radcn-fixture-custom-accordion/)
  await expect(custom).toHaveCSS('border-top-color', 'rgb(15, 118, 110)')
  await expect(page.locator('[data-radcn-accordion-trigger]')).toHaveCSS('color', 'rgb(19, 78, 74)')
  await expect(page.locator('[data-radcn-accordion-content]')).toHaveCSS('color', 'rgb(15, 118, 110)')
})
