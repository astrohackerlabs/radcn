import { readFile } from 'node:fs/promises'

import { expect, test } from '@playwright/test'

const candidate = 'http://localhost:4602'
const repoRoot = new URL('../..', import.meta.url)

async function packageJson() {
  return JSON.parse(await readFile(new URL('packages/radcn/package.json', repoRoot), 'utf8')) as {
    dependencies?: Record<string, string>
    devDependencies?: Record<string, string>
    exports?: Record<string, string>
  }
}

test('candidate calendar exposes grid semantics and date state hooks', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/calendar/selected`)
  let calendar = page.locator('[data-radcn-calendar]').first()
  await expect(calendar).toHaveAttribute('aria-label', 'Calendar')
  await expect(calendar).toHaveAttribute('data-month', '2026-06')
  await expect(page.locator('[data-radcn-calendar-caption]').first()).toContainText('June 2026')
  await expect(page.locator('[data-radcn-calendar-grid]').first()).toHaveAttribute('role', 'grid')
  await expect(page.getByRole('gridcell').filter({ has: page.getByRole('button', { name: /Friday, June 12, 2026/ }) })).toHaveAttribute('data-selected', 'true')
  await expect(page.locator('[data-radcn-calendar-hidden-input]')).toHaveValue('2026-06-12')

  await page.goto(`${candidate}/fixtures/calendar/range`)
  await expect(page.locator('[data-radcn-calendar-day][data-range-start="true"]')).toHaveCount(1)
  await expect(page.locator('[data-radcn-calendar-day][data-range-middle="true"]')).toHaveCount(4)
  await expect(page.locator('[data-radcn-calendar-day][data-range-end="true"]')).toHaveCount(1)

  await page.goto(`${candidate}/fixtures/calendar/two-months`)
  await expect(page.locator('[data-radcn-calendar-month]')).toHaveCount(2)
})

test('candidate calendar supports keyboard and pointer selection', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/calendar/selected`)
  let selected = page.getByRole('button', { name: /Friday, June 12, 2026/ })
  await selected.focus()
  await page.keyboard.press('ArrowRight')
  await expect(page.getByRole('button', { name: /Saturday, June 13, 2026/ })).toBeFocused()
  await page.keyboard.press('ArrowDown')
  await expect(page.getByRole('button', { name: /Saturday, June 20, 2026/ })).toBeFocused()
  await page.keyboard.press('Home')
  await expect(page.getByRole('button', { name: /Sunday, June 14, 2026/ })).toBeFocused()
  await page.keyboard.press('End')
  await expect(page.getByRole('button', { name: /Saturday, June 20, 2026/ })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.locator('[data-radcn-calendar-hidden-input]')).toHaveValue('2026-06-20')

  await page.goto(`${candidate}/fixtures/calendar/selected`)
  await page.getByRole('button', { name: /Monday, June 15, 2026/ }).click()
  await expect(page.locator('[data-radcn-calendar-hidden-input]')).toHaveValue('2026-06-15')

  await page.getByRole('button', { name: /Tuesday, June 16, 2026/ }).focus()
  await page.keyboard.press('Space')
  await expect(page.locator('[data-radcn-calendar-hidden-input]')).toHaveValue('2026-06-16')

  await page.goto(`${candidate}/fixtures/calendar/month-navigation`)
  await page.getByRole('button', { name: /Friday, June 12, 2026/ }).focus()
  await page.keyboard.press('PageDown')
  await expect(page.locator('[data-radcn-calendar]').first()).toHaveAttribute('data-month', '2026-07')
  await expect(page.locator('[data-radcn-calendar-caption]').first()).toContainText('July 2026')
  await expect(page.getByRole('button', { name: /Sunday, July 12, 2026/ })).toBeFocused()
  await page.keyboard.press('PageUp')
  await expect(page.locator('[data-radcn-calendar]').first()).toHaveAttribute('data-month', '2026-06')
  await expect(page.locator('[data-radcn-calendar-caption]').first()).toContainText('June 2026')
  await expect(page.getByRole('button', { name: /Friday, June 12, 2026/ })).toBeFocused()

  await page.goto(`${candidate}/fixtures/calendar/disabled`)
  await page.getByRole('button', { name: /Tuesday, June 9, 2026/ }).focus()
  await page.keyboard.press('ArrowRight')
  await expect(page.getByRole('button', { name: /Friday, June 12, 2026/ })).toBeFocused()
})

test('candidate calendar exposes disabled navigation and custom tokens', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/calendar/disabled`)
  await expect(page.getByRole('button', { name: /Wednesday, June 10, 2026/ })).toBeDisabled()
  await expect(page.getByRole('button', { name: /Thursday, June 11, 2026/ })).toBeDisabled()

  await page.goto(`${candidate}/fixtures/calendar/month-navigation`)
  let calendar = page.locator('[data-radcn-calendar]').first()
  await page.getByRole('button', { name: 'Next month' }).click()
  await expect(calendar).toHaveAttribute('data-month', '2026-07')
  await expect(page.locator('[data-radcn-calendar-caption]').first()).toContainText('July 2026')
  await expect(page.getByRole('button', { name: /Wednesday, July 15, 2026/ })).toBeVisible()
  await page.getByRole('button', { name: 'Previous month' }).click()
  await expect(calendar).toHaveAttribute('data-month', '2026-06')
  await expect(page.locator('[data-radcn-calendar-caption]').first()).toContainText('June 2026')

  await page.goto(`${candidate}/fixtures/calendar/custom-token`)
  await expect(page.locator('[data-radcn-calendar]').first()).toHaveClass(/radcn-fixture-custom-calendar/)
  await expect(page.locator('[data-radcn-calendar]').first()).toHaveCSS('border-color', 'rgb(15, 118, 110)')
})

test('candidate date picker package covers single presets range and forms', async ({ page }) => {
  let pkg = await packageJson()
  expect(pkg.exports?.['./date-picker']).toBe('./src/components/date-picker.tsx')
  expect({ ...pkg.dependencies, ...pkg.devDependencies }).not.toHaveProperty('react-day-picker')
  expect({ ...pkg.dependencies, ...pkg.devDependencies }).not.toHaveProperty('date-fns')

  await page.goto(`${candidate}/fixtures/date-picker/popover`)
  await expect(page.locator('[data-radcn-date-picker]')).toHaveAttribute('data-value', '2026-06-12')
  await expect(page.locator('[data-radcn-date-picker-label]')).toHaveText('Jun 12, 2026')
  await expect(page.locator('[data-radcn-popover-content]')).toBeVisible()
  await expect(page.locator('[data-radcn-calendar]')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.locator('[data-radcn-popover-content]')).toBeHidden()

  await page.goto(`${candidate}/fixtures/date-picker/form-submit-reset`)
  await expect(page.locator('[data-radcn-date-picker-hidden-input]')).toHaveValue('2026-06-12')
  await page.getByRole('button', { name: /Jun 12, 2026/ }).click()
  await page.getByRole('button', { name: /Monday, June 15, 2026/ }).click()
  await expect(page.locator('[data-radcn-date-picker-hidden-input]')).toHaveValue('2026-06-15')
  await page.getByRole('button', { name: 'Reset' }).click()
  await expect(page.locator('[data-radcn-date-picker-hidden-input]')).toHaveValue('2026-06-12')
  await page.getByRole('button', { name: 'Submit' }).click()
  await expect(page).toHaveURL(/\/fixtures\/date-picker\/form-submit-reset\?date=2026-06-12&intent=submit$/)

  await page.goto(`${candidate}/fixtures/date-picker/presets`)
  await page.locator('[data-radcn-date-picker-preset-select]').selectOption('2026-06-15')
  await expect(page.locator('[data-radcn-date-picker]')).toHaveAttribute('data-value', '2026-06-15')
  await expect(page.locator('[data-radcn-date-picker-label]')).toHaveText('Jun 15, 2026')
  await expect(page.locator('[data-radcn-calendar-day][data-selected="true"]')).toHaveAttribute('data-date', '2026-06-15')

  await page.goto(`${candidate}/fixtures/date-picker/range`)
  await expect(page.locator('[data-radcn-date-picker]')).toHaveCount(1)
  await expect(page.locator('[data-radcn-calendar-month]')).toHaveCount(2)
  await expect(page.locator('[data-radcn-date-picker-label]')).toHaveText('Jun 12, 2026 - Jun 18, 2026')
  await page.getByRole('button', { name: /Wednesday, June 10, 2026/ }).click()
  await page.getByRole('button', { name: /Sunday, June 14, 2026/ }).click()
  await expect(page.locator('[data-radcn-date-picker]')).toHaveAttribute('data-value', '2026-06-10..2026-06-14')
  await expect(page.locator('[data-radcn-calendar-day][data-range-start="true"]')).toHaveAttribute('data-date', '2026-06-10')
  await expect(page.locator('[data-radcn-calendar-day][data-range-end="true"]')).toHaveAttribute('data-date', '2026-06-14')

  await page.goto(`${candidate}/fixtures/date-picker/disabled`)
  await expect(page.getByRole('button', { name: 'Pick a date' })).toBeDisabled()

  await page.goto(`${candidate}/fixtures/date-picker/custom-token`)
  await expect(page.locator('[data-radcn-date-picker]').first()).toHaveClass(/radcn-fixture-custom-date-picker/)
})

test('candidate date picker covers named upstream examples', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/date-picker/demo`)
  await expect(page.locator('[data-radcn-date-picker]')).toHaveAttribute('data-value', '')
  await expect(page.locator('[data-radcn-date-picker-label]')).toHaveText('Pick a date')
  await expect(page.locator('[data-radcn-date-picker-hidden-input]')).toHaveValue('')
  await expect(page.locator('[data-radcn-popover-content]')).toBeVisible()
  await expect(page.locator('[data-radcn-calendar]')).toBeVisible()
  await page.getByRole('button', { name: /Monday, June 15, 2026/ }).click()
  await expect(page.locator('[data-radcn-date-picker]')).toHaveAttribute('data-value', '2026-06-15')
  await expect(page.locator('[data-radcn-date-picker-label]')).toHaveText('Jun 15, 2026')
  await expect(page.locator('[data-radcn-date-picker-hidden-input]')).toHaveValue('2026-06-15')
  await expect(page.locator('[data-radcn-calendar-day][data-selected="true"]')).toHaveAttribute('data-date', '2026-06-15')

  await page.goto(`${candidate}/fixtures/date-picker/with-presets`)
  await expect(page.locator('[data-radcn-date-picker]')).toHaveAttribute('data-value', '')
  await expect(page.locator('[data-radcn-date-picker-preset-select] option')).toHaveText([
    'Select',
    'Today',
    'Tomorrow',
    'In 3 days',
    'In a week',
  ])
  await page.locator('[data-radcn-date-picker-preset-select]').selectOption('2026-06-19')
  await expect(page.locator('[data-radcn-date-picker]')).toHaveAttribute('data-value', '2026-06-19')
  await expect(page.locator('[data-radcn-date-picker-label]')).toHaveText('Jun 19, 2026')
  await expect(page.locator('[data-radcn-calendar-day][data-selected="true"]')).toHaveAttribute('data-date', '2026-06-19')

  await page.goto(`${candidate}/fixtures/date-picker/with-range`)
  await expect(page.locator('[data-radcn-date-picker]')).toHaveAttribute('data-value', '2026-06-12..2026-06-18')
  await expect(page.locator('[data-radcn-date-picker-label]')).toHaveText('Jun 12, 2026 - Jun 18, 2026')
  await expect(page.locator('[data-radcn-calendar-month]')).toHaveCount(2)
  await expect(page.locator('[data-radcn-calendar-day][data-range-start="true"]')).toHaveAttribute('data-date', '2026-06-12')
  await expect(page.locator('[data-radcn-calendar-day][data-range-end="true"]')).toHaveAttribute('data-date', '2026-06-18')
  await page.getByRole('button', { name: /Wednesday, June 10, 2026/ }).click()
  await page.getByRole('button', { name: /Sunday, June 14, 2026/ }).click()
  await expect(page.locator('[data-radcn-date-picker]')).toHaveAttribute('data-value', '2026-06-10..2026-06-14')
  await expect(page.locator('[data-radcn-calendar-day][data-range-start="true"]')).toHaveAttribute('data-date', '2026-06-10')
  await expect(page.locator('[data-radcn-calendar-day][data-range-end="true"]')).toHaveAttribute('data-date', '2026-06-14')
})
