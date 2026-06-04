import { expect, test } from '@playwright/test'

const candidate = 'http://localhost:4602'

function carousel(page: import('@playwright/test').Page) {
  return page.locator('[data-radcn-carousel]').first()
}

function content(page: import('@playwright/test').Page) {
  return page.locator('[data-radcn-carousel-content]').first()
}

function item(page: import('@playwright/test').Page, index: number) {
  return page.locator(`[data-radcn-carousel-item][data-index="${index}"]`).first()
}

test('candidate carousel exposes region slide semantics and initial state', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/carousel/default`)

  await expect(page.getByRole('region', { name: 'Featured slides' })).toHaveAttribute('aria-roledescription', 'carousel')
  await expect(carousel(page)).toHaveAttribute('data-orientation', 'horizontal')
  await expect(carousel(page)).toHaveAttribute('data-index', '0')
  await expect(carousel(page)).toHaveAttribute('data-current', '1')
  await expect(carousel(page)).toHaveAttribute('data-count', '5')
  await expect(page.locator('[data-radcn-carousel-content]')).toHaveCount(1)
  await expect(page.locator('[data-radcn-carousel-track]')).toHaveCount(1)
  await expect(page.locator('[data-radcn-carousel-item]')).toHaveCount(5)
  await expect(page.getByRole('group', { name: 'Slide 1 of 5' })).toHaveAttribute('aria-roledescription', 'slide')
  await expect(item(page, 0)).toHaveAttribute('data-selected', 'true')
  await expect(page.getByRole('button', { name: 'Previous slide' })).toBeDisabled()
  await expect(page.getByRole('button', { name: 'Next slide' })).toBeEnabled()

  await page.goto(`${candidate}/fixtures/carousel/initial-slide`)
  await expect(carousel(page)).toHaveAttribute('data-index', '2')
  await expect(carousel(page)).toHaveAttribute('data-current', '3')
  await expect(item(page, 2)).toHaveAttribute('data-selected', 'true')
})

test('candidate carousel moves with controls and disables boundaries', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/carousel/disabled-boundaries`)

  let previous = page.getByRole('button', { name: 'Previous slide' })
  let next = page.getByRole('button', { name: 'Next slide' })
  await expect(previous).toBeDisabled()
  await next.click()
  await expect(carousel(page)).toHaveAttribute('data-index', '1')
  await expect(previous).toBeEnabled()

  for (let index = 0; index < 3; index += 1) {
    await next.click()
  }
  await expect(carousel(page)).toHaveAttribute('data-index', '4')
  await expect(next).toBeDisabled()
  await expect(previous).toBeEnabled()
  await previous.click()
  await expect(carousel(page)).toHaveAttribute('data-index', '3')
})

test('candidate carousel supports keyboard and native scroll sync', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/carousel/keyboard`)

  let root = carousel(page)
  await expect(root).toHaveAttribute('data-index', '1')
  await root.focus()
  await page.keyboard.press('ArrowRight')
  await expect(root).toHaveAttribute('data-index', '2')
  await expect(item(page, 2)).toBeFocused()
  await page.keyboard.press('End')
  await expect(root).toHaveAttribute('data-index', '4')
  await expect(page.getByRole('button', { name: 'Next slide' })).toBeDisabled()
  await page.keyboard.press('Home')
  await expect(root).toHaveAttribute('data-index', '0')
  await expect(page.getByRole('button', { name: 'Previous slide' })).toBeDisabled()

  await content(page).evaluate((viewport) => {
    let target = viewport.querySelector<HTMLElement>('[data-radcn-carousel-item][data-index="3"]')
    if (!target) throw new Error('missing target slide')
    viewport.scrollLeft = target.offsetLeft
    viewport.dispatchEvent(new Event('scroll', { bubbles: true }))
  })
  await expect(root).toHaveAttribute('data-index', '3')
  await expect(page.getByRole('button', { name: 'Previous slide' })).toBeEnabled()
  await expect(page.getByRole('button', { name: 'Next slide' })).toBeEnabled()
})

test('candidate carousel supports vertical layout multiple spacing and custom tokens', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/carousel/vertical`)
  await expect(carousel(page)).toHaveAttribute('data-orientation', 'vertical')
  await carousel(page).focus()
  await page.keyboard.press('ArrowDown')
  await expect(carousel(page)).toHaveAttribute('data-index', '1')

  await page.goto(`${candidate}/fixtures/carousel/multiple-visible`)
  let viewportWidth = await content(page).evaluate((node) => node.getBoundingClientRect().width)
  let itemWidth = await item(page, 0).evaluate((node) => node.getBoundingClientRect().width)
  expect(itemWidth).toBeLessThan(viewportWidth / 2)

  await page.goto(`${candidate}/fixtures/carousel/spacing`)
  await expect(page.locator('[data-radcn-carousel-track]').first()).toHaveCSS('gap', '6px')

  await page.goto(`${candidate}/fixtures/carousel/custom-token`)
  await expect(carousel(page)).toHaveClass(/radcn-fixture-custom-carousel/)
  await expect(page.locator('.radcn-carousel-slide-card').first()).toHaveCSS('border-color', 'rgb(15, 118, 110)')
  await expect(page.locator('.radcn-carousel-slide-card').first()).toHaveCSS('background-color', 'rgb(240, 253, 250)')
})
