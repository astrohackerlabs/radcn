import { expect, test } from '@playwright/test'

const candidate = 'http://localhost:4602'

test('candidate breadcrumb exposes navigation current page and separator hooks', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/breadcrumb/collapsed`)
  await expect(page.locator('nav[data-radcn-breadcrumb]')).toHaveAttribute('aria-label', 'breadcrumb')
  await expect(page.locator('ol[data-radcn-breadcrumb-list]')).toHaveCount(1)
  await expect(page.locator('[data-radcn-breadcrumb-page]')).toHaveAttribute('aria-current', 'page')
  await expect(page.locator('[data-radcn-breadcrumb-ellipsis]')).toHaveCount(1)

  await page.goto(`${candidate}/fixtures/breadcrumb/custom-separator`)
  await expect(page.locator('[data-radcn-breadcrumb]')).toHaveClass(/radcn-fixture-custom-breadcrumb/)
  await expect(page.locator('[data-radcn-breadcrumb-separator]').first()).toHaveText('>')
  await expect(page.locator('[data-radcn-breadcrumb]')).toHaveCSS('color', 'rgb(15, 118, 110)')
})

test('candidate button group exposes orientation text and separator hooks', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/button-group/horizontal`)
  await expect(page.locator('[data-radcn-button-group]')).toHaveAttribute('role', 'group')
  await expect(page.locator('[data-radcn-button-group]')).toHaveAttribute('data-orientation', 'horizontal')

  await page.goto(`${candidate}/fixtures/button-group/vertical`)
  await expect(page.locator('[data-radcn-button-group]')).toHaveAttribute('data-orientation', 'vertical')
  await expect(page.locator('[data-radcn-button-group]')).toHaveClass(/radcn-button-group--vertical/)

  await page.goto(`${candidate}/fixtures/button-group/with-separator`)
  await expect(page.locator('[data-radcn-button-group-text]')).toHaveText('Draft')
  await expect(page.locator('[data-radcn-button-group-separator]')).toHaveAttribute('aria-orientation', 'vertical')
})

test('candidate button group covers shadcn example parity depth', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/button-group/demo`)
  await expect(page.getByRole('group', { name: 'Message actions' })).toHaveAttribute('data-radcn-button-group', '')
  await expect(page.locator('[data-radcn-button-group]')).toHaveCount(4)
  await expect(page.getByRole('button', { name: 'Go back' })).toHaveAttribute('data-size', 'icon')
  await expect(page.locator('[data-radcn-dropdown-menu]')).toHaveCount(1)
  await expect(page.locator('[data-radcn-dropdown-menu-radio-group]')).toHaveAttribute('data-value', 'personal')
  await expect(page.locator('[data-radcn-dropdown-menu-item][data-variant="destructive"]')).toContainText('Trash')

  await page.goto(`${candidate}/fixtures/button-group/dropdown`)
  await expect(page.locator('[data-radcn-dropdown-menu-trigger]')).toHaveAccessibleName('Conversation actions')
  await expect(page.locator('[data-radcn-dropdown-menu-item]')).toContainText(['Mute Conversation', 'Mark as Read', 'Share Conversation', 'Delete Conversation'])

  await page.goto(`${candidate}/fixtures/button-group/input`)
  await expect(page.locator('[data-radcn-button-group] [data-radcn-input]')).toHaveValue('radcn')
  await expect(page.getByRole('button', { name: 'Search' })).toHaveAttribute('data-radcn-button', '')

  await page.goto(`${candidate}/fixtures/button-group/input-group`)
  await expect(page.locator('[data-radcn-input-group]')).toHaveAttribute('data-disabled', 'true')
  await expect(page.locator('[data-radcn-input-group-control]')).toBeDisabled()
  await expect(page.locator('[data-radcn-tooltip-trigger]')).toHaveAccessibleName('Voice Mode')

  await page.goto(`${candidate}/fixtures/button-group/nested`)
  let nestedGroups = page.locator('[data-radcn-button-group]')
  await expect(nestedGroups).toHaveCount(3)
  await expect(page.getByRole('group', { name: 'Pagination controls' })).toHaveAttribute('data-radcn-button-group', '')
  await expect(page.getByRole('button', { name: 'Previous' })).toHaveAttribute('data-size', 'icon-sm')
  await expect(page.getByRole('group', { name: 'Pagination controls' })).toHaveCSS('gap', '8px')

  await page.goto(`${candidate}/fixtures/button-group/orientation`)
  await expect(page.getByRole('group', { name: 'Media controls' })).toHaveAttribute('data-orientation', 'vertical')
  await expect(page.getByRole('button', { name: 'Increase' })).toHaveAttribute('data-size', 'icon')

  await page.goto(`${candidate}/fixtures/button-group/popover`)
  await expect(page.locator('[data-radcn-popover-trigger]')).toHaveAccessibleName('Open Popover')
  await expect(page.locator('[data-radcn-popover-content]')).toContainText('Agent Tasks')
  await expect(page.locator('[data-radcn-textarea]')).toHaveValue('Review the ButtonGroup examples.')

  await page.goto(`${candidate}/fixtures/button-group/select`)
  await expect(page.locator('[data-radcn-select-trigger]')).toHaveAccessibleName('Currency')
  await expect(page.locator('[data-radcn-select-input]')).toHaveValue('usd')
  await expect(page.locator('#candidate-button-group-amount')).toHaveValue('10.00')
  await expect(page.getByRole('button', { name: 'Send' })).toHaveAttribute('data-size', 'icon')

  await page.goto(`${candidate}/fixtures/button-group/separator`)
  await expect(page.locator('[data-radcn-button-group-separator]')).toHaveCount(1)
  await expect(page.getByRole('button', { name: 'Copy' })).toHaveAttribute('data-variant', 'secondary')
  await expect(page.getByRole('button', { name: 'Paste' })).toHaveAttribute('data-variant', 'secondary')

  await page.goto(`${candidate}/fixtures/button-group/size`)
  await expect(page.getByRole('button', { name: 'Small', exact: true })).toHaveAttribute('data-size', 'sm')
  await expect(page.getByRole('button', { name: 'Default', exact: true })).toHaveAttribute('data-size', 'default')
  await expect(page.getByRole('button', { name: 'Large', exact: true })).toHaveAttribute('data-size', 'lg')
  await expect(page.getByRole('button', { name: 'Add small' })).toHaveAttribute('data-size', 'icon-sm')
  await expect(page.getByRole('button', { name: 'Add default' })).toHaveAttribute('data-size', 'icon')
  await expect(page.getByRole('button', { name: 'Add large' })).toHaveAttribute('data-size', 'icon-lg')

  await page.goto(`${candidate}/fixtures/button-group/split`)
  await expect(page.locator('[data-radcn-button-group-separator]')).toHaveCount(1)
  await expect(page.getByRole('button', { name: 'Button' })).toHaveAttribute('data-variant', 'secondary')
  await expect(page.getByRole('button', { name: 'Add' })).toHaveAttribute('data-size', 'icon')
})

test('candidate item exposes group variants slots and separators', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/item/default`)
  await expect(page.locator('[data-radcn-item-group]')).toHaveAttribute('role', 'list')
  await expect(page.locator('[data-radcn-item]')).toHaveAttribute('role', 'listitem')
  await expect(page.locator('[data-radcn-item-media]')).toHaveAttribute('data-variant', 'image')
  await expect(page.locator('[data-radcn-item-title]')).toHaveText('RadCN project')
  await expect(page.locator('[data-radcn-item-description]')).toContainText('fixture coverage')
  await expect(page.locator('[data-radcn-item-actions]')).toContainText('Open')

  await page.goto(`${candidate}/fixtures/item/variants`)
  await expect(page.locator('[data-radcn-item][data-variant="outline"]')).toHaveAttribute('data-size', 'sm')
  await expect(page.locator('[data-radcn-item-media][data-variant="icon"]')).toHaveCount(1)

  await page.goto(`${candidate}/fixtures/item/grouped`)
  await expect(page.locator('[data-radcn-item-header]')).toContainText('Storage')
  await expect(page.locator('[data-radcn-item-footer]')).toContainText('72%')
  await expect(page.locator('[data-radcn-item-separator]')).toHaveAttribute('role', 'separator')
})

test('candidate pagination exposes navigation active page and label hooks', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/pagination/active`)
  await expect(page.locator('nav[data-radcn-pagination]')).toHaveAttribute('aria-label', 'pagination')
  await expect(page.locator('[data-radcn-pagination-content]')).toHaveCount(1)
  await expect(page.locator('[data-radcn-pagination-link][aria-current="page"]')).toHaveText('3')
  await expect(page.locator('[data-radcn-pagination-ellipsis]')).toHaveCount(1)

  await page.goto(`${candidate}/fixtures/pagination/custom-labels`)
  await expect(page.locator('[data-radcn-pagination-previous-text]')).toHaveText('Back')
  await expect(page.locator('[data-radcn-pagination-next-text]')).toHaveText('Forward')
  await expect(page.locator('[data-radcn-pagination-link]').first()).toHaveAttribute('aria-label', 'Go to previous page')
})

test('candidate table exposes semantic table sections and dense hook', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/table/default`)
  await expect(page.locator('[data-radcn-table-container]')).toHaveCount(1)
  await expect(page.locator('table[data-radcn-table]')).toHaveCount(1)
  await expect(page.locator('caption[data-radcn-table-caption]')).toHaveText('Recent component ports.')
  await expect(page.locator('thead[data-radcn-table-header]')).toHaveCount(1)
  await expect(page.locator('tbody[data-radcn-table-body]')).toHaveCount(1)
  await expect(page.locator('th[data-radcn-table-head]').first()).toHaveAttribute('scope', 'col')
  await expect(page.locator('td[data-radcn-table-cell]').first()).toHaveText('Button')

  await page.goto(`${candidate}/fixtures/table/dense`)
  await expect(page.locator('table[data-radcn-table]')).toHaveAttribute('data-dense', 'true')

  await page.goto(`${candidate}/fixtures/table/footer`)
  await expect(page.locator('tfoot[data-radcn-table-footer]')).toContainText('Total')
})

test('candidate typography exposes semantic recipes and custom tokens', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/typography/article`)
  await expect(page.locator('h1[data-radcn-typography-h1]')).toHaveText('Build interfaces with the web')
  await expect(page.locator('h2[data-radcn-typography-h2]')).toHaveText('Principles')
  await expect(page.locator('p[data-radcn-typography-p]')).toContainText('stable hooks')
  await expect(page.locator('ul[data-radcn-typography-list]')).toContainText('Use native elements first.')
  await expect(page.locator('blockquote[data-radcn-typography-blockquote]')).toContainText('browser-observed')

  await page.goto(`${candidate}/fixtures/typography/inline`)
  await expect(page.locator('[data-radcn-typography-lead]')).toContainText('documentation copy')
  await expect(page.locator('[data-radcn-typography-large]')).toHaveText('Large text label')
  await expect(page.locator('code[data-radcn-typography-inline-code]')).toHaveText('pnpm add radcn')
  await expect(page.locator('small[data-radcn-typography-small]')).toHaveText('Small supporting text')
  await expect(page.locator('[data-radcn-typography-muted]')).toHaveText('Muted metadata text')

  await page.goto(`${candidate}/fixtures/typography/table`)
  await expect(page.locator('[data-radcn-typography-h2]')).toHaveText('Release status')
  await expect(page.locator('[data-radcn-table]')).toBeVisible()
  await expect(page.getByRole('columnheader', { name: 'Component' })).toBeVisible()
  await expect(page.getByRole('cell', { name: 'Typography' })).toBeVisible()

  await page.goto(`${candidate}/fixtures/typography/custom-token`)
  await expect(page.locator('[data-radcn-typography-h1]')).toHaveCSS('font-size', '40px')
  await expect(page.locator('[data-radcn-typography-muted]')).toHaveCSS('color', 'rgb(124, 58, 237)')
})
