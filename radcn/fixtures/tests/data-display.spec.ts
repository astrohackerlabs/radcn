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

test('data display cluster exports chart and data-table without external table engines', async () => {
  let pkg = await packageJson()
  let deps = { ...pkg.dependencies, ...pkg.devDependencies }
  expect(pkg.exports?.['./chart']).toBe('./src/components/chart.tsx')
  expect(pkg.exports?.['./data-table']).toBe('./src/components/data-table.tsx')
  expect(deps).not.toHaveProperty('recharts')
  expect(deps).not.toHaveProperty('@tanstack/react-table')
  expect(Object.keys(deps).some((key) => key.startsWith('@dnd-kit/'))).toBe(false)
  expect(deps).not.toHaveProperty('zod')
  expect(deps).not.toHaveProperty('sonner')
})

test('candidate chart renders accessible dependency-free SVG bar and line output', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/chart/bar`)
  await expect(page.getByRole('img', { name: 'Monthly visitors' })).toHaveAttribute('data-radcn-chart', '')
  await expect(page.locator('[data-radcn-chart-svg]')).toHaveCount(1)
  await expect(page.locator('[data-radcn-chart-bar]')).toHaveCount(4)
  await expect(page.locator('[data-radcn-chart-bar]').first()).toHaveAttribute('data-label', 'Jan')
  await expect(page.locator('[data-radcn-chart-bar]').first()).toHaveAttribute('data-value', '32')

  await page.goto(`${candidate}/fixtures/chart/line`)
  await expect(page.locator('[data-radcn-chart-line]')).toHaveCount(1)
  await expect(page.locator('[data-radcn-chart-point]')).toHaveCount(4)
})

test('candidate chart exposes legend tooltip details accessibility and custom tokens', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/chart/legend`)
  await expect(page.locator('[data-radcn-chart-legend]')).toHaveCount(1)
  await expect(page.locator('[data-radcn-chart-legend-item]')).toHaveCount(2)

  await page.goto(`${candidate}/fixtures/chart/tooltip`)
  await expect(page.locator('[data-radcn-chart-tooltip]')).toHaveCount(1)
  await expect(page.locator('[data-radcn-chart-tooltip-item]')).toHaveCount(2)
  await expect(page.locator('[data-radcn-chart-tooltip-value]').first()).toHaveText('56')

  await page.goto(`${candidate}/fixtures/chart/accessibility`)
  await expect(page.getByRole('img', { name: 'Accessible signups chart' })).toHaveAttribute('aria-describedby', 'candidate-chart-accessibility-description')

  await page.goto(`${candidate}/fixtures/chart/custom-token`)
  await expect(page.locator('[data-radcn-chart]')).toHaveClass(/radcn-fixture-custom-chart/)
  await expect(page.locator('[data-radcn-chart-svg]')).toHaveCSS('background-color', 'rgb(240, 253, 250)')
})

test('candidate chart covers shadcn component example parity depth', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/chart/bar-demo`)
  await expect(page.getByRole('img', { name: 'Device traffic chart' })).toBeVisible()
  await expect(page.locator('[data-radcn-chart-svg]')).toHaveCount(1)
  await expect(page.locator('[data-radcn-chart-bar]')).toHaveCount(12)
  await expect(page.locator('[data-radcn-chart-bar][data-series="desktop"]')).toHaveCount(6)
  await expect(page.locator('[data-radcn-chart-bar][data-series="mobile"]')).toHaveCount(6)
  await expect(page.locator('[data-radcn-chart-bar][data-series="desktop"]').first()).toHaveAttribute('fill', 'var(--radcn-chart-desktop, var(--radcn-primary))')
  await expect(page.locator('[data-radcn-chart-bar][data-series="mobile"]').first()).toHaveAttribute('fill', 'var(--radcn-chart-mobile, var(--radcn-primary))')

  await page.goto(`${candidate}/fixtures/chart/bar-demo-grid`)
  await expect(page.getByRole('img', { name: 'Device traffic chart with grid' })).toBeVisible()
  await expect(page.locator('[data-radcn-chart-grid]')).toHaveCount(5)

  await page.goto(`${candidate}/fixtures/chart/bar-demo-axis`)
  await expect(page.getByRole('img', { name: 'Device traffic chart with axis' })).toBeVisible()
  await expect(page.locator('[data-radcn-chart-tick]')).toHaveCount(6)
  await expect(page.locator('[data-radcn-chart-tick]').first()).toHaveText('Jan')

  await page.goto(`${candidate}/fixtures/chart/bar-demo-legend`)
  await expect(page.getByRole('img', { name: 'Device traffic chart with legend' })).toBeVisible()
  await expect(page.locator('[data-radcn-chart-legend-item]')).toHaveCount(2)
  await expect(page.locator('[data-radcn-chart-tooltip-item]')).toHaveCount(2)
  await expect(page.locator('[data-radcn-chart-tooltip-label]')).toHaveText('June')

  await page.goto(`${candidate}/fixtures/chart/bar-demo-tooltip`)
  await expect(page.getByRole('img', { name: 'Device traffic chart with tooltip' })).toBeVisible()
  await expect(page.locator('[data-radcn-chart-tooltip-item][data-indicator="line"]')).toHaveCount(2)
  await expect(page.locator('[data-radcn-chart-tooltip-value]').first()).toHaveText('214 visitors')

  await page.goto(`${candidate}/fixtures/chart/tooltip-demo`)
  await expect(page.locator('[data-radcn-chart-tooltip-demo]')).toBeVisible()
  await expect(page.locator('[data-radcn-chart-tooltip-item][data-indicator="dot"]')).toHaveCount(2)
  await expect(page.locator('[data-radcn-chart-tooltip-item][data-indicator="dashed"]')).toHaveCount(2)
  await expect(page.locator('[data-radcn-chart-tooltip-item][data-indicator="line"]')).toHaveCount(1)
  await expect(page.locator('[data-radcn-chart-tooltip-item][data-indicator="none"]')).toHaveCount(1)
  await expect(page.locator('[data-radcn-chart-tooltip][data-hide-label="true"]')).toHaveCount(2)
})

test('candidate data-table recipe renders semantic table selection and pagination', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/data-table/default`)
  await expect(page.locator('[data-radcn-data-table]')).toHaveCount(1)
  await expect(page.locator('[data-radcn-data-table-content]')).toHaveCount(1)
  await expect(page.getByRole('table')).toHaveCount(1)
  await expect(page.getByRole('columnheader', { name: 'Task' })).toBeVisible()
  await expect(page.getByRole('cell', { name: 'Port chart' })).toBeVisible()

  await page.goto(`${candidate}/fixtures/data-table/selection`)
  await expect(page.locator('[data-radcn-data-table-selection-summary]')).toHaveText('1 row selected')
  await expect(page.locator('[data-radcn-checkbox-input][value="radcn-101"]')).toBeChecked()

  await page.goto(`${candidate}/fixtures/data-table/pagination`)
  await expect(page.locator('[data-radcn-data-table-pagination]')).toHaveAttribute('data-page', '1')
  await expect(page.getByRole('navigation', { name: 'Pagination' })).toBeVisible()
  await expect(page.getByRole('link', { name: '1' })).toHaveAttribute('aria-current', 'page')
})

test('candidate data-table recipe covers sort filter actions detail and custom tokens', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/data-table/sort-filter`)
  await expect(page.getByRole('columnheader', { name: 'Task ↑' })).toHaveAttribute('aria-sort', 'ascending')
  await expect(page.locator('[data-radcn-data-table-sort]')).toHaveText('Task ↑')
  await page.getByRole('button', { name: 'Apply' }).click()
  await expect(page).toHaveURL(/\/fixtures\/data-table\/sort-filter\?q=port&intent=filter$/)

  await page.goto(`${candidate}/fixtures/data-table/row-actions`)
  await expect(page.locator('[data-radcn-data-table-row-actions]')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Open row' })).toBeVisible()

  await page.goto(`${candidate}/fixtures/data-table/column-controls`)
  await expect(page.locator('[data-radcn-data-table-column-controls]')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Columns' })).toBeVisible()

  await page.goto(`${candidate}/fixtures/data-table/responsive-detail`)
  await expect(page.locator('[data-radcn-data-table-detail]')).toContainText('Responsive detail panels are recipe code')

  await page.goto(`${candidate}/fixtures/data-table/empty`)
  await expect(page.locator('[data-radcn-data-table-empty]')).toHaveText('No tasks match this filter.')
  await expect(page.locator('[data-radcn-data-table-empty]')).toHaveAttribute('colspan', '4')

  await page.goto(`${candidate}/fixtures/data-table/row-editing`)
  await expect(page.locator('[data-radcn-data-table-detail]')).toContainText('Task')
  await expect(page.getByRole('button', { name: 'Save row' })).toBeVisible()

  await page.goto(`${candidate}/fixtures/data-table/dashboard-composition`)
  await expect(page.locator('[data-radcn-data-table-column-controls]')).toBeVisible()
  await expect(page.locator('[data-radcn-data-table-row][data-reorderable="true"]')).toHaveCount(1)
  await expect(page.locator('[data-radcn-data-table-selection-summary]')).toHaveAttribute('data-selected-count', '1')

  await page.goto(`${candidate}/fixtures/data-table/custom-token`)
  await expect(page.locator('[data-radcn-data-table]')).toHaveClass(/radcn-fixture-custom-data-table/)
  await expect(page.locator('[data-radcn-data-table]')).toHaveCSS('background-color', 'rgb(250, 245, 255)')
})

test('candidate data-table matches named demo example composition', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/data-table/demo`)

  await expect(page.locator('[data-radcn-data-table]')).toHaveCount(1)
  await expect(page.locator('[data-radcn-data-table-toolbar]')).toHaveCount(1)
  await expect(page.locator('[data-radcn-data-table-filter]')).toHaveCount(1)
  await expect(page.locator('[data-radcn-data-table-column-controls]')).toHaveCount(1)
  await expect(page.locator('[data-radcn-data-table-content]')).toHaveCount(1)
  await expect(page.locator('[data-radcn-table-container]')).toHaveCount(1)
  await expect(page.locator('[data-radcn-table]')).toHaveCount(1)
  await expect(page.locator('[data-radcn-table-header]')).toHaveCount(1)
  await expect(page.locator('[data-radcn-table-body]')).toHaveCount(1)
  await expect(page.locator('[data-radcn-data-table-pagination]')).toHaveCount(1)
  await expect(page.locator('[data-radcn-data-table-selection-summary]')).toHaveText('1 of 5 row(s) selected.')
  await expect(page.locator('[data-radcn-data-table-empty]')).toHaveText('No results.')
  await expect(page.locator('[data-radcn-data-table-empty]')).toHaveAttribute('colspan', '5')

  await expect(page.getByPlaceholder('Filter emails...')).toBeVisible()
  await expect(page.getByRole('columnheader', { name: 'Status' })).toBeVisible()
  await expect(page.getByRole('columnheader', { name: /Email/ })).toHaveAttribute('aria-sort', 'ascending')
  await expect(page.locator('[data-radcn-data-table-sort]')).toContainText('Email')
  await expect(page.locator('[data-candidate-data-table-icon="arrow-up-down"]')).toHaveText('↕')
  await expect(page.getByRole('columnheader', { name: 'Amount' })).toHaveCSS('text-align', 'right')
  await expect(page.getByRole('columnheader', { name: 'Actions' })).toHaveCSS('text-align', 'right')

  await expect(page.getByRole('checkbox', { name: 'Select all' })).toHaveCount(1)
  await expect(page.getByRole('checkbox', { name: 'Select row' })).toHaveCount(5)
  await expect(page.locator('[data-radcn-checkbox-input][value="m5gr84i9"]')).toBeChecked()
  await expect(page.locator('[data-radcn-data-table-row][data-state="selected"]')).toHaveCount(1)

  let expectedRows = [
    ['m5gr84i9', 'success', 'Success', 'ken99@example.com', '$316.00'],
    ['3u1reuv4', 'success', 'Success', 'abe45@example.com', '$242.00'],
    ['derv1ws0', 'processing', 'Processing', 'monserrat44@example.com', '$837.00'],
    ['5kma53ae', 'success', 'Success', 'silas22@example.com', '$874.00'],
    ['bhqecj4p', 'failed', 'Failed', 'carmella@example.com', '$721.00'],
  ]

  for (let [id, status, statusLabel, email, amount] of expectedRows) {
    let emailCell = page.locator(`[data-payment-id="${id}"]`)
    let row = emailCell.locator('xpath=ancestor::tr')
    await expect(row.locator(`[data-payment-status="${status}"]`)).toHaveText(statusLabel)
    await expect(emailCell).toHaveText(email)
    await expect(emailCell).toHaveClass(/lowercase/)
    await expect(row.getByText(amount)).toHaveCSS('text-align', 'right')
    await expect(row.getByText(amount)).toHaveCSS('font-weight', '500')
  }

  await page.getByRole('button', { name: /Columns/ }).click()
  let columnMenu = page.locator('[data-radcn-dropdown-menu-content]').filter({ hasText: 'status' }).first()
  await expect(columnMenu).toBeVisible()
  let columnItems = columnMenu.locator('[data-radcn-dropdown-menu-checkbox-item]')
  await expect(columnItems).toHaveCount(3)
  await expect(columnItems.nth(0)).toHaveAttribute('data-text', 'status')
  await expect(columnItems.nth(1)).toHaveAttribute('data-text', 'email')
  await expect(columnItems.nth(2)).toHaveAttribute('data-text', 'amount')
  await expect(columnMenu).not.toContainText('select')
  await expect(columnMenu).not.toContainText('actions')
  await expect(page.locator('[data-candidate-data-table-icon="chevron-down"]')).toHaveText('v')
  await page.keyboard.press('Escape')

  await page.getByRole('button', { name: 'Open menu' }).first().click()
  let rowMenu = page.locator('[data-radcn-dropdown-menu-content]').filter({ hasText: 'Copy payment ID' }).first()
  await expect(rowMenu).toBeVisible()
  await expect(rowMenu.locator('[data-radcn-dropdown-menu-label]')).toHaveText('Actions')
  await expect(rowMenu.locator('[data-radcn-dropdown-menu-item]')).toHaveText([
    'Copy payment ID',
    'View customer',
    'View payment details',
  ])
  await expect(rowMenu.locator('[data-radcn-dropdown-menu-separator]')).toHaveCount(1)
  await expect(rowMenu.locator('[data-payment-copy-id="m5gr84i9"]')).toHaveText('Copy payment ID')
  await expect(page.locator('[data-candidate-data-table-icon="more-horizontal"]').first()).toHaveText('...')

  await expect(page.getByRole('button', { name: 'Previous' })).toBeDisabled()
  await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled()
  await expect(page.getByText('Copy payment ID stays app-owned browser behavior over visible payment id data.')).toBeVisible()
})
