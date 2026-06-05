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
