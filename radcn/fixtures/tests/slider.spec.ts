import { expect, test } from '@playwright/test'

const candidate = 'http://localhost:4602'

function root(page: import('@playwright/test').Page) {
  return page.locator('[data-radcn-slider]').first()
}

function input(page: import('@playwright/test').Page) {
  return page.locator('[data-radcn-slider-input]').first()
}

function range(page: import('@playwright/test').Page) {
  return page.locator('[data-radcn-slider-range]').first()
}

function thumb(page: import('@playwright/test').Page) {
  return page.locator('[data-radcn-slider-thumb]').first()
}

test('candidate slider renders direct demo parity', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/slider/demo`)

  let family = page.locator('[data-radcn-fixture-slider-family="slider-demo"]')
  let demoRoot = family.locator('[data-radcn-slider]')
  let demoInput = family.locator('[data-radcn-slider-input]')
  let demoRange = family.locator('[data-radcn-slider-range]')
  let demoThumb = family.locator('[data-radcn-slider-thumb]')

  await expect(family).toHaveAttribute('data-radcn-fixture-slider-width', '60')
  await expect(demoRoot).toHaveAttribute('data-value', '50')
  await expect(demoRoot).toHaveAttribute('data-min', '0')
  await expect(demoRoot).toHaveAttribute('data-max', '100')
  await expect(demoRoot).toHaveAttribute('data-step', '1')
  await expect(demoRoot).toHaveAttribute('data-orientation', 'horizontal')
  await expect(demoRoot).toHaveClass(/w-\[60%\]/)
  await expect(demoRoot).toHaveAttribute('style', /width:60%/)
  await expect(demoInput).toHaveJSProperty('type', 'range')
  await expect(demoInput).toHaveAttribute('id', 'candidate-slider-demo')
  await expect(demoInput).toHaveAttribute('name', 'slider-demo')
  await expect(demoInput).toHaveAttribute('min', '0')
  await expect(demoInput).toHaveAttribute('max', '100')
  await expect(demoInput).toHaveAttribute('step', '1')
  await expect(demoInput).toHaveValue('50')
  await expect(demoInput).toHaveAccessibleName('Slider')
  await expect(family.locator('[data-radcn-slider-track]')).toHaveCount(1)
  await expect(demoRange).toHaveCount(1)
  await expect(demoThumb).toHaveCount(1)
  await expect(
    await demoRoot.evaluate((node) => getComputedStyle(node).getPropertyValue('--radcn-slider-percent').trim()),
  ).toBe('50%')

  await demoInput.evaluate((node: HTMLInputElement) => {
    node.value = '80'
    node.dispatchEvent(new Event('input', { bubbles: true }))
  })
  await expect(demoRoot).toHaveAttribute('data-value', '80')
  await expect(demoInput).toHaveValue('80')
  await expect(
    await demoRoot.evaluate((node) => getComputedStyle(node).getPropertyValue('--radcn-slider-percent').trim()),
  ).toBe('80%')
})

test('candidate slider exposes native range semantics and value hooks', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/slider/default`)

  await expect(root(page)).toHaveAttribute('data-value', '50')
  await expect(root(page)).toHaveAttribute('data-min', '0')
  await expect(root(page)).toHaveAttribute('data-max', '100')
  await expect(root(page)).toHaveAttribute('data-step', '1')
  await expect(root(page)).toHaveAttribute('data-orientation', 'horizontal')
  await expect(input(page)).toHaveJSProperty('type', 'range')
  await expect(input(page)).toHaveAttribute('name', 'volume')
  await expect(input(page)).toHaveAttribute('min', '0')
  await expect(input(page)).toHaveAttribute('max', '100')
  await expect(input(page)).toHaveAttribute('step', '1')
  await expect(input(page)).toHaveValue('50')
  await expect(input(page)).toHaveAccessibleName('Slider')
  await expect(range(page)).toHaveCSS('width', '160px')

  await input(page).evaluate((node: HTMLInputElement) => {
    node.value = '80'
    node.dispatchEvent(new Event('input', { bubbles: true }))
  })
  await expect(root(page)).toHaveAttribute('data-value', '80')
  await expect(input(page)).toHaveValue('80')
  await expect(range(page)).toHaveCSS('width', '256px')
})

test('candidate slider supports explicit value step keyboard and disabled state', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/slider/value`)
  await expect(root(page)).toHaveAttribute('data-value', '72')
  await expect(input(page)).toHaveValue('72')

  await input(page).focus()
  await page.keyboard.press('ArrowRight')
  await expect(input(page)).toHaveValue('73')
  await expect(root(page)).toHaveAttribute('data-value', '73')
  await page.keyboard.press('Home')
  await expect(input(page)).toHaveValue('0')
  await expect(root(page)).toHaveAttribute('data-value', '0')
  await page.keyboard.press('End')
  await expect(input(page)).toHaveValue('100')
  await expect(root(page)).toHaveAttribute('data-value', '100')

  await page.goto(`${candidate}/fixtures/slider/step`)
  await expect(root(page)).toHaveAttribute('data-min', '10')
  await expect(root(page)).toHaveAttribute('data-max', '50')
  await expect(root(page)).toHaveAttribute('data-step', '5')
  await expect(input(page)).toHaveValue('30')
  await input(page).focus()
  await page.keyboard.press('ArrowRight')
  await expect(input(page)).toHaveValue('35')
  await expect(root(page)).toHaveAttribute('data-value', '35')

  await page.goto(`${candidate}/fixtures/slider/disabled`)
  await expect(root(page)).toHaveAttribute('data-disabled', 'true')
  await expect(input(page)).toBeDisabled()
  await expect(input(page)).toHaveValue('40')
  await input(page).evaluate((node: HTMLInputElement) => {
    node.value = '80'
    node.dispatchEvent(new Event('input', { bubbles: true }))
  })
  await expect(root(page)).toHaveAttribute('data-value', '40')
})

test('candidate slider preserves form submit reset behavior', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/slider/form-submit-reset`)

  await expect(input(page)).toHaveValue('25')
  await input(page).evaluate((node: HTMLInputElement) => {
    node.value = '70'
    node.dispatchEvent(new Event('input', { bubbles: true }))
    node.dispatchEvent(new Event('change', { bubbles: true }))
  })
  await expect(root(page)).toHaveAttribute('data-value', '70')

  await page.locator('button[type="submit"]').click()
  await expect(page).toHaveURL(/volume=70/)

  await page.goto(`${candidate}/fixtures/slider/form-submit-reset`)
  await input(page).evaluate((node: HTMLInputElement) => {
    node.value = '70'
    node.dispatchEvent(new Event('input', { bubbles: true }))
  })
  await page.locator('button[type="reset"]').click()
  await expect(input(page)).toHaveValue('25')
  await expect(root(page)).toHaveAttribute('data-value', '25')
})

test('candidate slider exposes custom token hooks', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/slider/custom-token`)

  await expect(root(page)).toHaveClass(/radcn-fixture-custom-slider/)
  await expect(root(page)).toHaveAttribute('data-value', '65')
  await expect(page.locator('[data-radcn-slider-track]')).toHaveCSS('background-color', 'rgb(204, 251, 241)')
  await expect(range(page)).toHaveCSS('background-color', 'rgb(15, 118, 110)')
  await expect(thumb(page)).toHaveCSS('border-color', 'rgb(15, 118, 110)')
  await expect(thumb(page)).toHaveCSS('background-color', 'rgb(240, 253, 250)')
})
