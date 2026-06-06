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

    await page.goto('/docs/components/badge')
    for (let slug of [
      'badge-demo',
      'badge-destructive',
      'badge-outline',
      'badge-secondary',
    ]) {
      await expect(page.locator(`[data-radcn-docs-badge-family="${slug}"]`), `${slug} docs example`).toBeVisible()
    }
    await expect(page.locator('[data-radcn-docs-badge-family="badge-demo"] [data-radcn-badge]')).toHaveCount(8)
    await expect(page.locator('[data-radcn-docs-badge-family="badge-demo"] [data-radcn-badge]').filter({ hasText: 'Verified' })).toHaveClass(/radcn-docs-badge-verified/)
    await expect(page.locator('[data-radcn-docs-badge-family="badge-demo"] .radcn-docs-badge-count')).toHaveText(['8', '99', '20+'])
    await expect(page.locator('[data-radcn-docs-badge-family="badge-destructive"] [data-radcn-badge]')).toHaveAttribute('data-variant', 'destructive')
    await expect(page.locator('[data-radcn-docs-badge-family="badge-outline"] [data-radcn-badge]')).toHaveAttribute('data-variant', 'outline')
    await expect(page.locator('[data-radcn-docs-badge-family="badge-secondary"] [data-radcn-badge]')).toHaveAttribute('data-variant', 'secondary')
    await expect(page.getByText('variant="secondary"').first()).toBeVisible()
    await expect(page.getByText('variant="destructive"').first()).toBeVisible()
    await expect(page.getByText('variant="outline"').first()).toBeVisible()
    await expect(page.getByText('data-radcn-badge').first()).toBeVisible()
    await expect(page.getByText('data-variant').first()).toBeVisible()
    await expect(page.getByText('className maps to RadCN class').first()).toBeVisible()
    await expect(page.getByText('data-slot="badge" maps to data-radcn-badge').first()).toBeVisible()
    await expect(page.getByText('React prop spreading maps to explicit Remix UI props').first()).toBeVisible()
    await expect(page.getByText('Tailwind utility styling maps to RadCN classes').first()).toBeVisible()
    await expect(page.getByText('lucide-react icons are app-owned presentation').first()).toBeVisible()
    await expect(page.getByText('Icon and count/pill badge presentation remains app-owned').first()).toBeVisible()

    await page.goto('/docs/components/combobox')
    for (let slug of [
      'combobox-demo',
      'combobox-dropdown-menu',
      'combobox-popover',
      'combobox-responsive',
    ]) {
      await expect(page.locator(`[data-radcn-docs-combobox-family="${slug}"]`), `${slug} docs example`).toBeVisible()
    }
    await expect(page.locator('[data-radcn-docs-combobox-family="combobox-demo"] [data-radcn-combobox]')).toBeVisible()
    await expect(page.locator('[data-radcn-docs-combobox-family="combobox-dropdown-menu"] [data-radcn-dropdown-menu]')).toBeVisible()
    await expect(page.locator('[data-radcn-docs-combobox-family="combobox-dropdown-menu"] [data-radcn-command]')).toHaveCount(1)
    await expect(page.locator('[data-radcn-docs-combobox-family="combobox-popover"] [data-radcn-popover]')).toBeVisible()
    await expect(page.locator('[data-radcn-docs-combobox-family="combobox-responsive"] [data-radcn-popover]')).toBeVisible()
    await expect(page.locator('[data-radcn-docs-combobox-family="combobox-responsive"] [data-radcn-drawer]')).toBeVisible()
    await expect(page.getByText('ComboboxInput').first()).toBeVisible()
    await expect(page.getByText('ComboboxItem').first()).toBeVisible()
    await expect(page.getByText('DropdownMenu').first()).toBeVisible()
    await expect(page.getByText('Popover').first()).toBeVisible()
    await expect(page.getByText('Drawer').first()).toBeVisible()
    await expect(page.getByText('Command').first()).toBeVisible()
    await expect(page.getByText('React useState and onSelect map to RadCN').first()).toBeVisible()
    await expect(page.getByText('Button asChild maps to explicit ComboboxTrigger').first()).toBeVisible()
    await expect(page.getByText('useMediaQuery maps to CSS breakpoints').first()).toBeVisible()
    await expect(page.getByText('lucide-react icons remain app-owned presentation').first()).toBeVisible()
    await expect(page.getByText('Tailwind width, padding, flex, and responsive utilities map to RadCN').first()).toBeVisible()
    await expect(page.getByText('className maps to class').first()).toBeVisible()
    await expect(page.getByText('data-slot maps to data-radcn-* hooks').first()).toBeVisible()
    await expect(page.getByText('vendor source remains read-only evidence').first()).toBeVisible()
    await expect(page.getByText('combobox-form is adjacent Form/Combobox evidence').first()).toBeVisible()

    await page.goto('/docs/components/dropdown-menu')
    for (let slug of [
      'dropdown-menu-checkboxes',
      'dropdown-menu-demo',
      'dropdown-menu-dialog',
      'dropdown-menu-radio-group',
    ]) {
      await expect(page.locator(`[data-radcn-docs-dropdown-menu-family="${slug}"]`), `${slug} docs example`).toBeVisible()
    }
    await expect(page.locator('[data-radcn-docs-dropdown-menu-family="dropdown-menu-demo"] [data-radcn-dropdown-menu-sub-trigger]')).toHaveCount(1)
    await expect(page.locator('[data-radcn-docs-dropdown-menu-family="dropdown-menu-checkboxes"] [data-radcn-dropdown-menu-checkbox-item]')).toHaveCount(3)
    await expect(page.locator('[data-radcn-docs-dropdown-menu-family="dropdown-menu-radio-group"] [data-radcn-dropdown-menu-radio-item]')).toHaveCount(3)
    await expect(page.locator('[data-radcn-docs-dropdown-menu-family="dropdown-menu-dialog"] [data-radcn-dialog]')).toBeVisible()
    await expect(page.locator('[data-radcn-docs-dropdown-menu-family="dropdown-menu-dialog"] [data-radcn-field]')).toHaveCount(2)
    await expect(page.locator('[data-radcn-docs-dropdown-menu-family="dropdown-menu-dialog"] [data-radcn-input]')).toHaveCount(1)
    await expect(page.locator('[data-radcn-docs-dropdown-menu-family="dropdown-menu-dialog"] [data-radcn-textarea]')).toHaveCount(1)
    await expect(page.getByText('DropdownMenuCheckboxItem').first()).toBeVisible()
    await expect(page.getByText('DropdownMenuRadioGroup').first()).toBeVisible()
    await expect(page.getByText('Dialog').first()).toBeVisible()
    await expect(page.getByText('Field').first()).toBeVisible()
    await expect(page.getByText('Input').first()).toBeVisible()
    await expect(page.getByText('Textarea').first()).toBeVisible()
    await expect(page.getByText('React useState, onCheckedChange, onValueChange, and onSelect map to explicit RadCN').first()).toBeVisible()
    await expect(page.getByText('modal={false} maps to RadCN Dropdown Menu non-modal behavior').first()).toBeVisible()
    await expect(page.getByText('Button asChild maps to explicit DropdownMenuTrigger').first()).toBeVisible()
    await expect(page.getByText('lucide-react icons are app-owned presentation').first()).toBeVisible()
    await expect(page.getByText('Radix primitive types are read-only upstream evidence').first()).toBeVisible()
    await expect(page.getByText('Tailwind width, padding, flex, and alignment utilities map to RadCN').first()).toBeVisible()
    await expect(page.getByText('className maps to class').first()).toBeVisible()
    await expect(page.getByText('data-slot maps to data-radcn-* hooks').first()).toBeVisible()
    await expect(page.getByText('vendor source remains read-only evidence').first()).toBeVisible()
    await expect(page.getByText('Checkbox and radio persistence, menu-to-dialog effects, and form values remain app-owned state').first()).toBeVisible()

    await page.goto('/docs/components/input')
    await expect(page.locator('[data-radcn-input]').first()).toBeVisible()
    for (let slug of [
      'input-demo',
      'input-disabled',
      'input-file',
      'input-with-button',
      'input-with-label',
      'input-with-text',
    ]) {
      await expect(page.locator(`[data-radcn-docs-example="${slug}"]`), `${slug} docs example`).toBeVisible()
    }
    await expect(page.locator('[data-radcn-docs-example="input-file"] input')).toHaveAttribute('type', 'file')
    await expect(page.getByText('ariaDescribedBy').first()).toBeVisible()
    await expect(page.getByText('type="file"').first()).toBeVisible()
    await expect(page.getByText("import { Button } from 'radcn/button'").first()).toBeVisible()
    await expect(page.getByText("import { Label } from 'radcn/label'").first()).toBeVisible()

    await page.goto('/docs/components/textarea')
    for (let slug of [
      'textarea-demo',
      'textarea-disabled',
      'textarea-with-button',
      'textarea-with-label',
      'textarea-with-text',
    ]) {
      await expect(page.locator(`[data-radcn-docs-textarea-family="${slug}"]`), `${slug} docs example`).toBeVisible()
    }
    await expect(page.locator('[data-radcn-docs-textarea-family="textarea-demo"] textarea[data-radcn-textarea]')).toHaveAttribute('placeholder', 'Type your message here.')
    await expect(page.locator('[data-radcn-docs-textarea-family="textarea-disabled"] textarea[data-radcn-textarea]')).toBeDisabled()
    await expect(page.locator('[data-radcn-docs-textarea-family="textarea-with-button"] [data-radcn-button]')).toHaveText('Send message')
    await expect(page.getByText('Button').first()).toBeVisible()
    await expect(page.getByText('Label').first()).toBeVisible()
    await expect(page.getByText('data-slot').first()).toBeVisible()
    await expect(page.getByText('ariaDescribedBy').first()).toBeVisible()
    await expect(page.getByText('Tailwind utility styling maps to RadCN classes').first()).toBeVisible()
    await expect(page.getByText('React prop spreading maps to explicit Remix UI props').first()).toBeVisible()
    await expect(page.getByText('Autosize behavior, form-library integration, toast results, and icon presentation are app-owned').first()).toBeVisible()

    await page.goto('/docs/components/toast')
    for (let slug of [
      'toast-demo',
      'toast-destructive',
      'toast-simple',
      'toast-with-action',
      'toast-with-title',
    ]) {
      await expect(page.locator(`[data-radcn-docs-toast-family="${slug}"]`), `${slug} docs example`).toBeVisible()
    }
    await expect(page.locator('[data-radcn-docs-toast-family="toast-demo"] [data-radcn-button]')).toHaveText('Add to calendar')
    await expect(page.locator('[data-radcn-docs-toast-family="toast-demo"] [data-radcn-toast-action]')).toHaveText('Undo')
    await expect(page.locator('[data-radcn-docs-toast-family="toast-destructive"] [data-radcn-toast]')).toHaveAttribute('data-type', 'error')
    await expect(page.locator('[data-radcn-docs-toast-family="toast-simple"] [data-radcn-toast-title]')).toHaveCount(0)
    await expect(page.locator('[data-radcn-docs-toast-family="toast-simple"] [data-radcn-toast-description]')).toHaveText('Your message has been sent.')
    await expect(page.locator('[data-radcn-docs-toast-family="toast-with-action"] [data-radcn-toast-action]')).toHaveText('Try again')
    await expect(page.locator('[data-radcn-docs-toast-family="toast-with-title"] [data-radcn-toast-action]')).toHaveCount(0)
    await expect(page.getByText('createToastEvent').first()).toBeVisible()
    await expect(page.getByText('toast').first()).toBeVisible()
    await expect(page.getByText('Toaster').first()).toBeVisible()
    await expect(page.getByText('Button').first()).toBeVisible()
    await expect(page.getByText('actionLabel').first()).toBeVisible()
    await expect(page.getByText('actionUrl').first()).toBeVisible()
    await expect(page.getByText('type: "error"').first()).toBeVisible()
    await expect(page.getByText('Description-only payloads are valid').first()).toBeVisible()
    await expect(page.getByText('useToast maps to explicit toast()').first()).toBeVisible()
    await expect(page.getByText('ToastAction maps to actionLabel and actionUrl').first()).toBeVisible()
    await expect(page.getByText('Current upstream sonner examples are tracked separately').first()).toBeVisible()
    await expect(page.getByText('does not depend on React, Sonner, lucide, next-themes').first()).toBeVisible()

    await page.goto('/docs/components/dialog')
    await expect(page.locator('[data-radcn-dialog-content]').first()).toBeVisible()

    await page.goto('/docs/components/tabs')
    await expect(page.locator('[data-radcn-tabs]').first()).toBeVisible()

    await page.goto('/docs/components/toggle')
    await expect(page.locator('[data-radcn-toggle]').first()).toBeVisible()
    for (let slug of [
      'toggle-demo',
      'toggle-disabled',
      'toggle-lg',
      'toggle-outline',
      'toggle-sm',
      'toggle-with-text',
    ]) {
      await expect(page.locator(`[data-radcn-docs-toggle-family="${slug}"]`), `${slug} docs example`).toBeVisible()
    }
    await expect(page.getByText('ariaLabel').first()).toBeVisible()
    await expect(page.getByText('size="sm"').first()).toBeVisible()
    await expect(page.getByText('size="lg"').first()).toBeVisible()
    await expect(page.getByText('variant="outline"').first()).toBeVisible()
    await expect(page.getByText('data-state').first()).toBeVisible()
    await expect(page.getByText('lucide icons are not RadCN package dependencies').first()).toBeVisible()
    await expect(page.getByText('Radix Toggle maps to RadCN native button markup').first()).toBeVisible()

    await page.goto('/docs/components/kbd')
    for (let slug of [
      'kbd-button',
      'kbd-demo',
      'kbd-group',
      'kbd-input-group',
      'kbd-tooltip',
    ]) {
      await expect(page.locator(`[data-radcn-docs-kbd-family="${slug}"]`), `${slug} docs example`).toBeVisible()
    }
    await expect(page.locator('[data-radcn-docs-kbd-family="kbd-button"] [data-radcn-button]')).toHaveCount(2)
    await expect(page.locator('[data-radcn-docs-kbd-family="kbd-demo"] [data-radcn-kbd-group]')).toHaveCount(2)
    await expect(page.locator('[data-radcn-docs-kbd-family="kbd-input-group"] [data-radcn-input-group]')).toHaveCount(1)
    await expect(page.locator('[data-radcn-docs-kbd-family="kbd-tooltip"] [data-radcn-tooltip-content]')).toHaveCount(2)
    await expect(page.getByText('KbdGroup').first()).toBeVisible()
    await expect(page.getByText('InputGroup').first()).toBeVisible()
    await expect(page.getByText('TooltipContent').first()).toBeVisible()
    await expect(page.getByText('ButtonGroup').first()).toBeVisible()
    await expect(page.getByText('data-slot').first()).toBeVisible()
    await expect(page.getByText('asChild').first()).toBeVisible()
    await expect(page.getByText('lucide icons are app presentation choices').first()).toBeVisible()

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
