import { expect, test } from '@playwright/test'

const candidate = 'http://localhost:4602'

const fruitItems = [
  ['apple', 'Apple'],
  ['banana', 'Banana'],
  ['blueberry', 'Blueberry'],
  ['grapes', 'Grapes'],
  ['pineapple', 'Pineapple'],
] as const

const timezoneGroups = [
  {
    label: 'North America',
    options: [
      ['est', 'Eastern Standard Time (EST)'],
      ['cst', 'Central Standard Time (CST)'],
      ['mst', 'Mountain Standard Time (MST)'],
      ['pst', 'Pacific Standard Time (PST)'],
      ['akst', 'Alaska Standard Time (AKST)'],
      ['hst', 'Hawaii Standard Time (HST)'],
    ],
  },
  {
    label: 'Europe & Africa',
    options: [
      ['gmt', 'Greenwich Mean Time (GMT)'],
      ['cet', 'Central European Time (CET)'],
      ['eet', 'Eastern European Time (EET)'],
      ['west', 'Western European Summer Time (WEST)'],
      ['cat', 'Central Africa Time (CAT)'],
      ['eat', 'East Africa Time (EAT)'],
    ],
  },
  {
    label: 'Asia',
    options: [
      ['msk', 'Moscow Time (MSK)'],
      ['ist', 'India Standard Time (IST)'],
      ['cst_china', 'China Standard Time (CST)'],
      ['jst', 'Japan Standard Time (JST)'],
      ['kst', 'Korea Standard Time (KST)'],
      ['ist_indonesia', 'Indonesia Central Standard Time (WITA)'],
    ],
  },
  {
    label: 'Australia & Pacific',
    options: [
      ['awst', 'Australian Western Standard Time (AWST)'],
      ['acst', 'Australian Central Standard Time (ACST)'],
      ['aest', 'Australian Eastern Standard Time (AEST)'],
      ['nzst', 'New Zealand Standard Time (NZST)'],
      ['fjt', 'Fiji Time (FJT)'],
    ],
  },
  {
    label: 'South America',
    options: [
      ['art', 'Argentina Time (ART)'],
      ['bot', 'Bolivia Time (BOT)'],
      ['brt', 'Brasilia Time (BRT)'],
      ['clt', 'Chile Standard Time (CLT)'],
    ],
  },
] as const

async function freshSelect(page: import('@playwright/test').Page, scenario = 'default') {
  await page.goto(`${candidate}/fixtures/select/${scenario}`)
  let content = page.locator('[data-radcn-select-content]').first()
  let trigger = page.locator('[data-radcn-select-trigger]').first()
  if (await content.isVisible()) {
    await trigger.evaluate((element) => (element as HTMLElement).focus())
    await page.keyboard.press('Escape')
    await expect(content).toBeHidden()
  }

  return {
    content,
    input: page.locator('[data-radcn-select-input]').first(),
    root: page.locator('[data-radcn-select]').first(),
    trigger,
    value: page.locator('[data-radcn-select-value]').first(),
  }
}

async function highlighted(page: import('@playwright/test').Page) {
  return page.locator('[data-radcn-select-item][data-highlighted="true"]')
}

test('candidate select renders named fruit demo parity', async ({ page }) => {
  let opened = await freshSelect(page, 'demo')
  await expect(opened.root).toHaveAttribute('data-name', 'fruit')
  await expect(opened.value).toHaveText('Select a fruit')
  await expect(opened.trigger).toHaveAttribute('data-placeholder', 'true')
  let triggerBox = await opened.trigger.boundingBox()
  expect(triggerBox).not.toBeNull()
  expect(Math.round(triggerBox!.width)).toBe(180)

  await opened.trigger.click()
  await expect(opened.content).toBeVisible()
  await expect(page.locator('[data-radcn-select-group]')).toHaveCount(1)
  await expect(page.locator('[data-radcn-select-label]')).toHaveText('Fruits')
  await expect(page.locator('[data-radcn-select-item]')).toHaveCount(fruitItems.length)
  await expect(page.locator('[data-radcn-select-item-text]')).toHaveText(fruitItems.map(([, label]) => label))
  for (let [value, label] of fruitItems) {
    await expect(page.locator(`[data-radcn-select-item][data-value="${value}"] [data-radcn-select-item-text]`)).toHaveText(label)
  }

  await page.getByRole('option', { name: 'Blueberry' }).click()
  await expect(opened.value).toHaveText('Blueberry')
  await expect(opened.input).toHaveValue('blueberry')
  await opened.trigger.click()
  await expect(page.locator('[data-radcn-select-item][data-value="blueberry"]')).toHaveAttribute('aria-selected', 'true')
  await expect(page.locator('[data-radcn-select-item][data-value="blueberry"] [data-radcn-select-item-indicator]')).toBeVisible()
})

test('candidate select renders named scrollable timezone parity', async ({ page }) => {
  let opened = await freshSelect(page, 'scrollable-demo')
  await expect(opened.root).toHaveAttribute('data-name', 'timezone')
  await expect(opened.value).toHaveText('Select a timezone')
  let triggerBox = await opened.trigger.boundingBox()
  expect(triggerBox).not.toBeNull()
  expect(Math.round(triggerBox!.width)).toBe(280)

  await opened.trigger.click()
  await expect(opened.content).toBeVisible()
  await expect(page.locator('[data-radcn-select-group]')).toHaveCount(timezoneGroups.length)
  await expect(page.locator('[data-radcn-select-label]')).toHaveText(timezoneGroups.map((group) => group.label))
  let allOptions = timezoneGroups.flatMap((group) => group.options)
  await expect(page.locator('[data-radcn-select-item]')).toHaveCount(allOptions.length)
  await expect(page.locator('[data-radcn-select-item-text]')).toHaveText(allOptions.map(([, label]) => label))
  for (let [value, label] of allOptions) {
    await expect(page.locator(`[data-radcn-select-item][data-value="${value}"] [data-radcn-select-item-text]`)).toHaveText(label)
  }

  await expect(page.locator('[data-radcn-select-scroll-up-button]')).toHaveCount(1)
  await expect(page.locator('[data-radcn-select-scroll-down-button]')).toHaveCount(1)
  let viewport = page.locator('[data-radcn-select-viewport]')
  await expect.poll(() => viewport.evaluate((element) => element.scrollHeight > element.clientHeight)).toBe(true)
  let beforeScroll = await viewport.evaluate((element) => element.scrollTop)
  await page.locator('[data-radcn-select-scroll-down-button]').click()
  await expect.poll(() => viewport.evaluate((element) => element.scrollTop)).toBeGreaterThan(beforeScroll)

  await opened.trigger.focus()
  await page.keyboard.press('j')
  await expect(await highlighted(page)).toContainText('Japan Standard Time (JST)')
  await page.keyboard.press('Enter')
  await expect(opened.value).toHaveText('Japan Standard Time (JST)')
  await expect(opened.input).toHaveValue('jst')
  await opened.trigger.click()
  await expect(page.locator('[data-radcn-select-item][data-value="jst"]')).toHaveAttribute('aria-selected', 'true')
  await expect(page.locator('[data-radcn-select-item][data-value="jst"] [data-radcn-select-item-indicator]')).toBeVisible()
})

test('candidate select opens with portal listbox semantics and deterministic highlight', async ({ page }) => {
  let opened = await freshSelect(page)
  await opened.trigger.click()

  await expect(opened.content).toBeVisible()
  await expect(opened.content).toHaveAttribute('data-state', 'open')
  await expect(opened.trigger).toHaveAttribute('role', 'combobox')
  await expect(opened.trigger).toHaveAttribute('aria-haspopup', 'listbox')
  await expect(opened.trigger).toHaveAttribute('aria-expanded', 'true')
  await expect(opened.trigger).toHaveAttribute('aria-controls', await page.locator('[data-radcn-select-viewport]').first().getAttribute('id') || '')
  await expect(page.locator('[data-radcn-portal-root] [data-radcn-select-portal]')).toHaveCount(1)
  await expect(page.locator('[data-radcn-select-viewport]').first()).toHaveAttribute('role', 'listbox')
  await expect(page.getByRole('option', { name: /Remix/ })).toHaveAttribute('aria-selected', 'true')
  await expect(await highlighted(page)).toContainText('Remix')

  await page.keyboard.press('Escape')
  await expect(opened.content).toBeHidden()
  await expect(opened.trigger).toBeFocused()
})

test('candidate select supports placeholder click and keyboard selection paths', async ({ page }) => {
  let opened = await freshSelect(page, 'placeholder')
  await expect(opened.value).toHaveText('Choose framework')
  await expect(opened.trigger).toHaveAttribute('data-placeholder', 'true')

  await opened.trigger.click()
  await page.getByRole('option', { name: 'Vue' }).click()
  await expect(opened.value).toHaveText('Vue')
  await expect(opened.input).toHaveValue('vue')
  await expect(opened.content).toBeHidden()

  for (let key of ['Enter', 'Space', 'ArrowDown', 'ArrowUp']) {
    opened = await freshSelect(page, 'keyboard-typeahead')
    await opened.trigger.focus()
    await page.keyboard.press(key)
    await expect(opened.content).toBeVisible()
    await expect(await highlighted(page)).toContainText('Alpha')
  }

  opened = await freshSelect(page, 'keyboard-typeahead')
  await opened.trigger.focus()
  await page.keyboard.press('Enter')
  await page.keyboard.press('ArrowDown')
  await expect(await highlighted(page)).toContainText('Gamma')
  await page.keyboard.press('Enter')
  await expect(opened.value).toHaveText('Gamma')
  await expect(opened.input).toHaveValue('gamma')
  await expect(opened.content).toBeHidden()

  opened = await freshSelect(page, 'keyboard-typeahead')
  await opened.trigger.focus()
  await page.keyboard.press('Space')
  await page.keyboard.press('ArrowDown')
  await page.keyboard.press('Space')
  await expect(opened.value).toHaveText('Gamma')
})

test('candidate select roves wraps skips disabled and typeaheads', async ({ page }) => {
  let opened = await freshSelect(page, 'keyboard-typeahead')
  await opened.trigger.click()
  await expect(await highlighted(page)).toContainText('Alpha')
  await page.keyboard.press('ArrowDown')
  await expect(await highlighted(page)).toContainText('Gamma')
  await page.keyboard.press('ArrowDown')
  await expect(await highlighted(page)).toContainText('Delta')
  await page.keyboard.press('ArrowDown')
  await expect(await highlighted(page)).toContainText('Alpha')
  await page.keyboard.press('Home')
  await expect(await highlighted(page)).toContainText('Alpha')
  await page.keyboard.press('End')
  await expect(await highlighted(page)).toContainText('Delta')
  await page.keyboard.press('g')
  await expect(await highlighted(page)).toContainText('Gamma')

  await page.getByRole('option', { name: /Beta disabled/ }).click({ force: true })
  await expect(opened.content).toBeVisible()
  await expect(opened.value).toHaveText('Alpha')
})

test('candidate select closes on outside pointer and tab without changing selection', async ({ page }) => {
  let opened = await freshSelect(page)
  await opened.trigger.click()
  await page.mouse.click(12, 12)
  await expect(opened.content).toBeHidden()
  await expect(opened.value).toHaveText('Remix')

  opened = await freshSelect(page)
  await opened.trigger.focus()
  await page.keyboard.press('Enter')
  await page.keyboard.press('Tab')
  await expect(opened.content).toBeHidden()
  await expect(opened.value).toHaveText('Remix')

  opened = await freshSelect(page)
  await opened.trigger.focus()
  await page.keyboard.press('Enter')
  await page.keyboard.press('Shift+Tab')
  await expect(opened.content).toBeHidden()
  await expect(opened.value).toHaveText('Remix')
})

test('candidate select exposes grouped scroll popper disabled invalid and custom hooks', async ({ page }) => {
  let opened = await freshSelect(page, 'groups')
  await opened.trigger.click()
  await expect(page.locator('[data-radcn-select-group]')).toHaveCount(2)
  await expect(page.locator('[data-radcn-select-label]')).toHaveCount(2)
  await expect(page.locator('[data-radcn-select-separator]')).toHaveCount(1)
  await expect(page.locator('[data-radcn-select-item-indicator]:not([hidden])')).toHaveCount(1)

  await page.goto(`${candidate}/fixtures/select/disabled-invalid`)
  await expect(page.locator('#candidate-select-disabled [data-radcn-select-trigger]')).toBeDisabled()
  await page.locator('#candidate-select-disabled [data-radcn-select-trigger]').click({ force: true })
  await expect(page.locator('#candidate-select-disabled [data-radcn-select-content]')).toBeHidden()
  await expect(page.locator('#candidate-select-invalid [data-radcn-select-trigger]')).toHaveAttribute('aria-invalid', 'true')

  opened = await freshSelect(page, 'scrollable')
  await opened.trigger.click()
  await expect(page.locator('[data-radcn-select-scroll-up-button]')).toHaveCount(1)
  await expect(page.locator('[data-radcn-select-scroll-down-button]')).toHaveCount(1)
  let viewport = page.locator('[data-radcn-select-viewport]')
  let beforeScroll = await viewport.evaluate((element) => element.scrollTop)
  await page.locator('[data-radcn-select-scroll-down-button]').click()
  await expect.poll(() => viewport.evaluate((element) => element.scrollTop)).toBeGreaterThan(beforeScroll)
  await page.locator('[data-radcn-select-scroll-up-button]').focus()
  await page.keyboard.press('Enter')
  await expect.poll(() => viewport.evaluate((element) => element.scrollTop)).toBeLessThanOrEqual(beforeScroll + 48)

  opened = await freshSelect(page, 'popper-placement')
  await opened.trigger.click()
  await expect(opened.content).toHaveAttribute('data-position', 'popper')
  await expect(opened.content).toHaveAttribute('data-side', 'right')
  await expect(opened.content).toHaveAttribute('data-align', 'end')
  let box = await opened.content.boundingBox()
  let stage = await page.locator('[data-fixture-stage]').boundingBox()
  expect(box).not.toBeNull()
  expect(stage).not.toBeNull()
  expect(box!.x + box!.width).toBeLessThanOrEqual(stage!.x + stage!.width)

  opened = await freshSelect(page, 'custom-token')
  await opened.trigger.click()
  await expect(opened.content).toHaveClass(/radcn-fixture-custom-select/)
  await expect(opened.content).toHaveCSS('border-color', 'rgb(15, 118, 110)')
  await expect(opened.content).toHaveCSS('background-color', 'rgb(240, 253, 250)')
})

test('candidate select synchronizes hidden form value and reset', async ({ page }) => {
  let opened = await freshSelect(page, 'form-submit-reset')
  await opened.trigger.click()
  await page.getByRole('option', { name: 'Vue' }).click()
  await expect(opened.input).toHaveValue('vue')
  await page.getByRole('button', { name: 'Reset' }).click()
  await expect(opened.input).toHaveValue('react')
  await expect(opened.value).toHaveText('React')

  await opened.trigger.click()
  await page.getByRole('option', { name: 'Vue' }).click()
  await page.getByRole('button', { name: 'Submit' }).click()
  await expect(page).toHaveURL(/\/fixtures\/select\/form-submit-reset\?framework=vue&intent=submit$/)
})
