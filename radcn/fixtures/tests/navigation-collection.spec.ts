import { expect, test } from '@playwright/test'

const candidate = 'http://localhost:4602'

test('candidate breadcrumb exposes navigation current page and separator hooks', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/breadcrumb/collapsed`)
  await expect(page.locator('nav[data-radcn-breadcrumb]')).toHaveAttribute('aria-label', 'breadcrumb')
  await expect(page.locator('ol[data-radcn-breadcrumb-list]')).toHaveCount(1)
  await expect(page.locator('[data-radcn-breadcrumb-page]')).toHaveAttribute('aria-current', 'page')
  await expect(page.locator('[data-radcn-breadcrumb-ellipsis]')).toHaveCount(1)
  await expect(page.locator('[data-radcn-breadcrumb-ellipsis] .sr-only')).toHaveText('More')

  await page.goto(`${candidate}/fixtures/breadcrumb/custom-separator`)
  await expect(page.locator('[data-radcn-breadcrumb]')).toHaveClass(/radcn-fixture-custom-breadcrumb/)
  await expect(page.locator('[data-radcn-breadcrumb-separator]').first()).toHaveText('/')
  await expect(page.locator('[data-radcn-breadcrumb]')).toHaveCSS('color', 'rgb(15, 118, 110)')
})

test('candidate breadcrumb covers shadcn example parity depth', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/breadcrumb/link`)
  await expect(page.getByRole('navigation', { name: 'breadcrumb' })).toHaveAttribute('data-radcn-breadcrumb', '')
  await expect(page.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
  await expect(page.getByRole('link', { name: 'Components' })).toHaveAttribute('href', '/components')
  await expect(page.locator('[data-radcn-breadcrumb-page]')).toHaveText('Breadcrumb')
  await expect(page.locator('[data-radcn-breadcrumb-page]')).toHaveAttribute('aria-current', 'page')
  await expect(page.locator('[data-radcn-breadcrumb-separator]').first()).toHaveText('›')

  await page.goto(`${candidate}/fixtures/breadcrumb/ellipsis`)
  await expect(page.locator('[data-radcn-breadcrumb-ellipsis]')).toHaveCount(1)
  await expect(page.locator('[data-radcn-breadcrumb-ellipsis] .sr-only')).toHaveText('More')

  await page.goto(`${candidate}/fixtures/breadcrumb/separator`)
  await expect(page.locator('[data-radcn-breadcrumb-separator]')).toHaveCount(2)
  await expect(page.locator('[data-radcn-breadcrumb-separator]').first()).toHaveText('/')

  await page.goto(`${candidate}/fixtures/breadcrumb/demo`)
  await expect(page.getByRole('button', { name: 'Toggle menu' })).toHaveAttribute('data-radcn-dropdown-menu-trigger', '')
  await page.getByRole('button', { name: 'Toggle menu' }).click()
  await expect(page.getByRole('menuitem', { name: 'Documentation' })).toBeVisible()
  await expect(page.getByRole('menuitem', { name: 'Themes' })).toBeVisible()
  await expect(page.getByRole('menuitem', { name: 'GitHub' })).toBeVisible()

  await page.goto(`${candidate}/fixtures/breadcrumb/dropdown`)
  await expect(page.getByRole('button', { name: 'Components' })).toHaveAttribute('data-radcn-dropdown-menu-trigger', '')
  await page.getByRole('button', { name: 'Components' }).click()
  await expect(page.getByRole('menuitem', { name: 'Documentation' })).toBeVisible()

  await page.setViewportSize({ width: 1024, height: 700 })
  await page.goto(`${candidate}/fixtures/breadcrumb/responsive`)
  await expect(page.locator('.radcn-breadcrumb-responsive-desktop')).toBeVisible()
  await expect(page.locator('.radcn-breadcrumb-responsive-mobile')).toBeHidden()
  await page.getByRole('button', { name: 'Toggle menu' }).click()
  await expect(page.getByRole('menuitem', { name: 'Documentation' })).toBeVisible()
  await expect(page.locator('.radcn-breadcrumb-truncate').first()).toHaveCSS('overflow', 'hidden')

  await page.setViewportSize({ width: 390, height: 700 })
  await page.goto(`${candidate}/fixtures/breadcrumb/responsive`)
  await expect(page.locator('.radcn-breadcrumb-responsive-desktop')).toBeHidden()
  await expect(page.locator('.radcn-breadcrumb-responsive-mobile')).toBeVisible()
  await page.getByRole('button', { name: 'Toggle Menu' }).click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Navigate to' })).toBeVisible()
  await expect(page.getByText('Select a page to navigate to.')).toBeVisible()
  await expect(page.locator('.radcn-breadcrumb-drawer-links').getByRole('link', { name: 'Documentation' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Close' })).toHaveClass(/radcn-button--outline/)
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

test('candidate item covers shadcn example parity depth', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/item/avatar`)
  await expect(page.locator('[data-radcn-item]')).toHaveCount(2)
  await expect(page.locator('[data-radcn-item-media] [data-radcn-avatar]')).toHaveCount(3)
  await expect(page.locator('[data-radcn-avatar-group]')).toHaveAccessibleName('Review team')
  await expect(page.getByRole('button', { name: 'Invite Ada Radley' })).toHaveAttribute('data-size', 'icon-sm')

  await page.goto(`${candidate}/fixtures/item/demo`)
  await expect(page.locator('[data-radcn-item]')).toHaveCount(2)
  await expect(page.locator('[data-radcn-item][data-size="sm"] [data-radcn-item-link]')).toHaveAttribute('href', '/fixtures/item/demo')
  await expect(page.getByRole('link', { name: /Verified profile/ })).toHaveAttribute('data-radcn-item-link', '')

  await page.goto(`${candidate}/fixtures/item/dropdown`)
  await expect(page.getByRole('button', { name: 'Open team menu' })).toHaveAttribute('aria-expanded', 'true')
  await expect(page.locator('[data-radcn-dropdown-menu-item] [data-radcn-item]')).toHaveCount(2)
  await expect(page.locator('[data-radcn-dropdown-menu-item] [data-radcn-avatar]')).toHaveCount(2)
  await expect(page.locator('[data-radcn-dropdown-menu-item]').first()).toContainText('RadCN Core')

  await page.goto(`${candidate}/fixtures/item/group`)
  await expect(page.locator('[data-radcn-item-group]')).toHaveAttribute('role', 'list')
  await expect(page.locator('[data-radcn-item]')).toHaveCount(2)
  await expect(page.locator('[data-radcn-item]').first()).toHaveAttribute('role', 'listitem')
  await expect(page.locator('[data-radcn-item-separator]')).toHaveCount(1)
  await expect(page.getByRole('button', { name: 'Message Alex Lee' })).toHaveAttribute('data-size', 'icon-sm')

  await page.goto(`${candidate}/fixtures/item/header`)
  await expect(page.locator('[data-radcn-item-header] img')).toHaveCount(2)
  await expect(page.locator('[data-radcn-item-header] img').first()).toHaveAttribute('src', /data:image\/svg\+xml/)

  await page.goto(`${candidate}/fixtures/item/icon`)
  await expect(page.locator('[data-radcn-item-media][data-variant="icon"]')).toHaveCount(1)
  await expect(page.getByRole('button', { name: 'Review' })).toHaveAttribute('data-variant', 'outline')

  await page.goto(`${candidate}/fixtures/item/image`)
  await expect(page.locator('[data-radcn-item]')).toHaveCount(2)
  await expect(page.locator('[data-radcn-item][role="listitem"]')).toHaveCount(2)
  await expect(page.locator('[data-radcn-item-link]')).toHaveCount(2)
  await expect(page.locator('[data-radcn-item-media][data-variant="image"] img')).toHaveCount(2)
  await expect(page.locator('.radcn-fixture-item-meta').first()).toContainText('3:42')

  await page.goto(`${candidate}/fixtures/item/link`)
  await expect(page.locator('[data-radcn-item]')).toHaveCount(2)
  await expect(page.locator('[data-radcn-item][role="listitem"]')).toHaveCount(2)
  await expect(page.getByRole('link', { name: /Visit docs/ })).toHaveAttribute('href', '/fixtures/item/link')
  let externalLink = page.getByRole('link', { name: /External reference/ })
  await expect(externalLink).toHaveAttribute('href', 'https://example.com/radcn')
  await expect(externalLink).toHaveAttribute('target', '_blank')
  await expect(externalLink).toHaveAttribute('rel', 'noreferrer')

  await page.goto(`${candidate}/fixtures/item/size`)
  let defaultItem = page.locator('[data-radcn-item][data-size="default"]').first()
  let smallItem = page.locator('[data-radcn-item][data-size="sm"]').first()
  await expect(defaultItem).toBeVisible()
  await expect(smallItem).toBeVisible()
  let defaultBox = await defaultItem.boundingBox()
  let smallBox = await smallItem.boundingBox()
  expect(defaultBox?.height ?? 0).toBeGreaterThan(smallBox?.height ?? 0)
  await expect(page.getByRole('link', { name: /Small link/ })).toHaveAttribute('href', '/fixtures/item/size')

  await page.goto(`${candidate}/fixtures/item/variant`)
  await expect(page.locator('[data-radcn-item][data-variant="default"]')).toHaveCount(1)
  await expect(page.locator('[data-radcn-item][data-variant="outline"]')).toHaveCount(1)
  await expect(page.locator('[data-radcn-item][data-variant="muted"]')).toHaveCount(1)
  await expect(page.locator('[data-radcn-item-actions] [data-radcn-button]')).toHaveCount(3)
})

test('candidate pagination exposes navigation active page and label hooks', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/pagination/demo`)
  await expect(page.getByRole('navigation', { name: 'pagination' })).toHaveAttribute('data-radcn-pagination', '')
  await expect(page.locator('[data-radcn-pagination-content]')).toHaveCount(1)
  await expect(page.locator('[data-radcn-pagination-item]')).toHaveCount(6)
  await expect(page.locator('[data-radcn-pagination-link]')).toHaveCount(5)
  await expect(page.locator('[data-radcn-pagination-previous-text]')).toHaveText('Previous')
  await expect(page.locator('[data-radcn-pagination-next-text]')).toHaveText('Next')
  await expect(page.locator('[data-radcn-pagination-link]').nth(1)).toHaveText('1')
  await expect(page.locator('[data-radcn-pagination-link][aria-current="page"]')).toHaveText('2')
  await expect(page.locator('[data-radcn-pagination-link][aria-current="page"]')).toHaveAttribute('data-active', 'true')
  await expect(page.locator('[data-radcn-pagination-link]').nth(3)).toHaveText('3')
  await expect(page.locator('[data-radcn-pagination-ellipsis]')).toHaveText('...More pages')
  await expect(page.locator('[data-radcn-pagination-ellipsis] .sr-only')).toHaveText('More pages')
  await expect(page.locator('[data-radcn-pagination-icon="previous"]')).toHaveText('<')
  await expect(page.locator('[data-radcn-pagination-icon="next"]')).toHaveText('>')
  await expect(page.getByRole('link', { name: 'Go to previous page' })).toHaveAttribute('href', '#')
  await expect(page.getByRole('link', { name: 'Go to next page' })).toHaveAttribute('href', '#')
  for (let index of [1, 2, 3]) {
    await expect(page.locator('[data-radcn-pagination-link]').nth(index)).toHaveAttribute('href', '#')
  }

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
  await page.goto(`${candidate}/fixtures/table/demo`)
  let tableDemo = page.locator('[data-radcn-fixture-table-family="table-demo"]')
  await expect(tableDemo).toBeVisible()
  await expect(tableDemo.locator('[data-radcn-table-container]')).toHaveCount(1)
  await expect(tableDemo.locator('table[data-radcn-table]')).toHaveCount(1)
  await expect(tableDemo.locator('caption[data-radcn-table-caption]')).toHaveText('A list of your recent invoices.')
  await expect(tableDemo.locator('thead[data-radcn-table-header]')).toHaveCount(1)
  await expect(tableDemo.locator('tbody[data-radcn-table-body]')).toHaveCount(1)
  await expect(tableDemo.locator('tfoot[data-radcn-table-footer]')).toHaveCount(1)
  let invoiceRows = tableDemo.locator('tbody[data-radcn-table-body] tr[data-radcn-table-row]')
  await expect(invoiceRows).toHaveCount(7)
  await expect(tableDemo.getByRole('columnheader', { name: 'Invoice' })).toHaveAttribute('scope', 'col')
  await expect(tableDemo.getByRole('columnheader', { name: 'Invoice' })).toHaveClass(/w-\[100px\]/)
  await expect(tableDemo.getByRole('columnheader', { name: 'Invoice' })).toHaveCSS('width', '100px')
  await expect(tableDemo.getByRole('columnheader', { name: 'Status' })).toBeVisible()
  await expect(tableDemo.getByRole('columnheader', { name: 'Method' })).toBeVisible()
  await expect(tableDemo.getByRole('columnheader', { name: 'Amount' })).toHaveClass(/text-right/)
  await expect(tableDemo.getByRole('columnheader', { name: 'Amount' })).toHaveCSS('text-align', 'right')

  let invoices = [
    ['INV001', 'Paid', 'Credit Card', '$250.00'],
    ['INV002', 'Pending', 'PayPal', '$150.00'],
    ['INV003', 'Unpaid', 'Bank Transfer', '$350.00'],
    ['INV004', 'Paid', 'Credit Card', '$450.00'],
    ['INV005', 'Paid', 'PayPal', '$550.00'],
    ['INV006', 'Pending', 'Bank Transfer', '$200.00'],
    ['INV007', 'Unpaid', 'Credit Card', '$300.00'],
  ] as const

  for (let [index, [invoice, status, method, amount]] of invoices.entries()) {
    let row = invoiceRows.nth(index)
    await expect(row.locator('[data-radcn-table-cell]').nth(0)).toHaveText(invoice)
    await expect(row.locator('[data-radcn-table-cell]').nth(0)).toHaveClass(/font-medium/)
    await expect(row.locator('[data-radcn-table-cell]').nth(0)).toHaveCSS('font-weight', '500')
    await expect(row.locator('[data-radcn-table-cell]').nth(1)).toHaveText(status)
    await expect(row.locator('[data-radcn-table-cell]').nth(2)).toHaveText(method)
    await expect(row.locator('[data-radcn-table-cell]').nth(3)).toHaveText(amount)
    await expect(row.locator('[data-radcn-table-cell]').nth(3)).toHaveClass(/text-right/)
    await expect(row.locator('[data-radcn-table-cell]').nth(3)).toHaveCSS('text-align', 'right')
  }

  let footerCells = tableDemo.locator('tfoot[data-radcn-table-footer] [data-radcn-table-cell]')
  await expect(footerCells.nth(0)).toHaveText('Total')
  await expect(footerCells.nth(0)).toHaveAttribute('colspan', '3')
  await expect(footerCells.nth(1)).toHaveText('$2,500.00')
  await expect(footerCells.nth(1)).toHaveClass(/text-right/)
  await expect(footerCells.nth(1)).toHaveCSS('text-align', 'right')

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
