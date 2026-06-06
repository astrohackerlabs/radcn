import { readFile } from 'node:fs/promises'
import path from 'node:path'

import { expect, test } from '@playwright/test'

const excludedExports = new Set(['.', './styles', './package.json'])
const nonExportedDispositions: string[] = []
const publicPreviewHooks: Record<string, string> = {
  accordion: '[data-radcn-accordion]',
  alert: '[data-radcn-alert]',
  'alert-dialog': '[data-radcn-alert-dialog-content]',
  'aspect-ratio': '[data-radcn-aspect-ratio]',
  avatar: '[data-radcn-avatar]',
  badge: '[data-radcn-badge]',
  breadcrumb: '[data-radcn-breadcrumb]',
  button: '[data-radcn-button]',
  'button-group': '[data-radcn-button-group]',
  calendar: '[data-radcn-calendar]',
  carousel: '[data-radcn-carousel]',
  card: '[data-radcn-card]',
  chart: '[data-radcn-chart]',
  checkbox: '[data-radcn-checkbox-wrapper]',
  collapsible: '[data-radcn-collapsible]',
  combobox: '[data-radcn-combobox]',
  command: '[data-radcn-command]',
  'context-menu': '[data-radcn-context-menu]',
  'data-table': '[data-radcn-data-table]',
  'date-picker': '[data-radcn-date-picker]',
  direction: '[data-radcn-direction-provider]',
  dialog: '[data-radcn-dialog-content]',
  drawer: '[data-radcn-drawer-content]',
  'dropdown-menu': '[data-radcn-dropdown-menu]',
  empty: '[data-radcn-empty]',
  field: '[data-radcn-field]',
  form: '[data-radcn-form]',
  'hover-card': '[data-radcn-hover-card]',
  input: '[data-radcn-input]',
  'input-group': '[data-radcn-input-group]',
  'input-otp': '[data-radcn-input-otp]',
  item: '[data-radcn-item]',
  kbd: '[data-radcn-kbd]',
  label: '[data-radcn-label]',
  menubar: '[data-radcn-menubar]',
  'native-select': '[data-radcn-native-select-wrapper]',
  'navigation-menu': '[data-radcn-navigation-menu]',
  pagination: '[data-radcn-pagination]',
  popover: '[data-radcn-popover]',
  progress: '[data-radcn-progress-wrapper]',
  'radio-group': '[data-radcn-radio-group]',
  resizable: '[data-radcn-resizable-panel-group]',
  'scroll-area': '[data-radcn-scroll-area]',
  select: '[data-radcn-select]',
  separator: '[data-radcn-separator]',
  sheet: '[data-radcn-sheet-content]',
  sidebar: '[data-radcn-sidebar-provider]',
  skeleton: '[data-radcn-skeleton]',
  slider: '[data-radcn-slider]',
  sonner: '[data-radcn-toaster]',
  spinner: '[data-radcn-spinner]',
  switch: '[data-radcn-switch-wrapper]',
  table: '[data-radcn-table]',
  tabs: '[data-radcn-tabs]',
  textarea: '[data-radcn-textarea]',
  toast: '[data-radcn-button]',
  toggle: '[data-radcn-toggle]',
  'toggle-group': '[data-radcn-toggle-group]',
  tooltip: '[data-radcn-tooltip]',
  typography: '[data-radcn-typography-lead]',
}

test.describe('docs registry coverage', () => {
  test('every RadCN public subpath and known disposition has a docs route', async ({
    page,
  }) => {
    let requiredSlugs = await publicRadcnSlugs()

    for (let slug of [...requiredSlugs, ...nonExportedDispositions]) {
      let response = await page.goto(`/docs/components/${slug}`)
      expect(response?.ok(), `${slug} route should load`).toBe(true)
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
      await expect(page.getByText('Intended future install command')).toBeVisible()
      await expect(page.getByText('not published to npm yet')).toBeVisible()
    }
  })

  test('every exported public subpath is authored and renders a RadCN preview', async ({
    page,
  }) => {
    let publicSlugs = await publicRadcnSlugs()

    for (let slug of publicSlugs) {
      let hook = publicPreviewHooks[slug]
      expect(hook, `${slug} should have an expected public preview hook`).toBeTruthy()

      await page.goto(`/docs/components/${slug}`)
      await expect(
        page.getByText('Unexpected fallback preview'),
        `${slug} should not show generic draft registry copy`,
      ).toHaveCount(0)
      await expect(page.getByText(`from 'radcn/${slug}'`).first()).toBeVisible()
      await expect(page.locator(hook).first(), `${slug} should render ${hook}`).toBeVisible()
    }
  })

  test('non-exported dispositions are honest draft pages', async ({ page }) => {
    for (let slug of nonExportedDispositions) {
      await page.goto(`/docs/components/${slug}`)
      await expect(page.getByText('not-shipped-yet')).toBeVisible()
      await expect(page.getByText('not an importable RadCN package API today')).toBeVisible()
      await expect(page.getByRole('heading', { name: 'Planned block disposition' })).toBeVisible()
      await expect(page.getByRole('heading', { name: 'Live package example' })).toHaveCount(0)
      await expect(
        page.getByText(`// ${titleFromSlug(slug)} is not shipped by RadCN yet.`).first(),
      ).toBeVisible()
    }
  })

  test('representative rich-example pages still render RadCN components', async ({ page }) => {
    await page.goto('/docs/components/button')
    await expect(page.locator('[data-radcn-button]').first()).toBeVisible()

    await page.goto('/docs/components/input')
    await expect(page.locator('[data-radcn-input]').first()).toBeVisible()

    await page.goto('/docs/components/dialog')
    await expect(page.locator('[data-radcn-dialog-content]').first()).toBeVisible()

    await page.goto('/docs/components/tabs')
    await expect(page.locator('[data-radcn-tabs]').first()).toBeVisible()

    await page.goto('/docs/components/chart')
    await expect(page.locator('[data-radcn-chart]')).toHaveCount(5)
    await expect(page.locator('[data-radcn-chart-grid]')).toHaveCount(20)
    await expect(page.locator('[data-radcn-chart-tick]')).toHaveCount(18)
    await expect(page.locator('[data-radcn-chart-tooltip-item][data-indicator="line"]').first()).toBeVisible()
    await expect(page.getByText('ChartTooltipItem').first()).toBeVisible()
  })

  test('date picker docs render multiple instances without duplicate ids', async ({
    page,
  }) => {
    await page.goto('/docs/components/date-picker')
    await expect(page.locator('[data-radcn-date-picker]')).toHaveCount(2)

    let ids = await page.locator('[id]').evaluateAll((nodes) => nodes.map((node) => node.id))
    let duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index)
    expect(duplicateIds).toEqual([])
  })
})

async function publicRadcnSlugs() {
  let packageJsonPath = path.resolve(process.cwd(), 'radcn/packages/radcn/package.json')
  let packageJson = JSON.parse(await readFile(packageJsonPath, 'utf8')) as {
    exports: Record<string, string>
  }

  return Object.keys(packageJson.exports)
    .filter((subpath) => !excludedExports.has(subpath))
    .map((subpath) => subpath.replace(/^\.\//, ''))
    .sort()
}

function titleFromSlug(slug: string) {
  return slug
    .split('-')
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(' ')
}
