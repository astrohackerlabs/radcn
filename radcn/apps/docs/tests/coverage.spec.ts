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

    await page.goto('/docs/components/alert')
    for (let slug of [
      'alert-demo',
      'alert-destructive',
    ]) {
      await expect(page.locator(`[data-radcn-docs-alert-family="${slug}"]`), `${slug} docs example`).toBeVisible()
    }
    await expect(page.locator('[data-radcn-docs-alert-family="alert-demo"] [data-radcn-alert]')).toHaveCount(3)
    await expect(page.locator('[data-radcn-docs-alert-family="alert-demo"] [data-radcn-alert][role="alert"]')).toHaveCount(3)
    await expect(page.locator('[data-radcn-docs-alert-family="alert-demo"] [data-radcn-alert][data-variant="default"]')).toHaveCount(2)
    await expect(page.locator('[data-radcn-docs-alert-family="alert-demo"] [data-radcn-alert][data-variant="destructive"]')).toHaveCount(1)
    await expect(page.locator('[data-radcn-docs-alert-family="alert-demo"] [data-radcn-alert-title]')).toHaveText([
      'Success! Your changes have been saved',
      'This Alert has a title and an icon. No description.',
      'Unable to process your payment.',
    ])
    await expect(page.locator('[data-radcn-docs-alert-family="alert-demo"] [data-radcn-alert-description]')).toContainText([
      'This is an alert with icon, title and description.',
      'Please verify your billing information and try again.Check your card detailsEnsure sufficient fundsVerify billing address',
    ])
    await expect(page.locator('[data-radcn-docs-alert-family="alert-demo"] li')).toHaveText([
      'Check your card details',
      'Ensure sufficient funds',
      'Verify billing address',
    ])
    await expect(page.locator('[data-radcn-docs-alert-family="alert-demo"] [data-radcn-docs-alert-icon]')).toHaveCount(3)
    await expect(page.locator('[data-radcn-docs-alert-family="alert-destructive"] [data-radcn-alert]')).toHaveAttribute('data-variant', 'destructive')
    await expect(page.locator('[data-radcn-docs-alert-family="alert-destructive"] [data-radcn-alert]')).toHaveAttribute('role', 'alert')
    await expect(page.locator('[data-radcn-docs-alert-family="alert-destructive"] [data-radcn-alert-title]')).toHaveText('Error')
    await expect(page.locator('[data-radcn-docs-alert-family="alert-destructive"] [data-radcn-alert-description]')).toHaveText('Your session has expired. Please log in again.')
    await expect(page.getByText('className maps to class').first()).toBeVisible()
    await expect(page.getByText('data-slot maps to data-radcn-alert* hooks').first()).toBeVisible()
    await expect(page.getByText('cva and Tailwind utilities map to RadCN package classes').first()).toBeVisible()
    await expect(page.getByText('AlertCircleIcon, CheckCircle2Icon, PopcornIcon, and lucide-react').first()).toBeVisible()
    await expect(page.getByText('Icon grid and SVG layout stay in docs or application markup').first()).toBeVisible()
    await expect(page.getByText('Alert Dialog is a separate component surface').first()).toBeVisible()
    await expect(page.getByText('vendor source remains read-only evidence').first()).toBeVisible()

    await page.goto('/docs/components/checkbox')
    for (let slug of [
      'checkbox-demo',
      'checkbox-disabled',
      'checkbox-with-text',
    ]) {
      await expect(page.locator(`[data-radcn-docs-checkbox-family="${slug}"]`), `${slug} docs example`).toBeVisible()
    }
    await expect(page.locator('[data-radcn-docs-checkbox-family="checkbox-demo"] [data-radcn-checkbox-wrapper]')).toHaveCount(4)
    await expect(page.locator('[data-radcn-docs-checkbox-family="checkbox-demo"] [data-radcn-checkbox-input]:checked')).toHaveCount(2)
    await expect(page.locator('[data-radcn-docs-checkbox-family="checkbox-demo"] [data-radcn-checkbox-input]:disabled')).toHaveCount(1)
    await expect(page.locator('[data-radcn-docs-checkbox-family="checkbox-demo"] .radcn-docs-checkbox-card')).toBeVisible()
    await expect(page.locator('[data-radcn-docs-checkbox-family="checkbox-disabled"] [data-radcn-checkbox-input]')).toBeDisabled()
    await expect(page.locator('[data-radcn-docs-checkbox-family="checkbox-with-text"] [data-radcn-checkbox-input]')).not.toBeChecked()
    await expect(page.getByText('You agree to our Terms of Service and Privacy Policy.').first()).toBeVisible()
    await expect(page.getByText('defaultChecked maps to RadCN checked').first()).toBeVisible()
    await expect(page.getByText('className maps to class').first()).toBeVisible()
    await expect(page.getByText('data-slot maps to data-radcn-checkbox-* hooks').first()).toBeVisible()
    await expect(page.getByText('CheckboxPrimitive.Root').first()).toBeVisible()
    await expect(page.getByText('CheckboxPrimitive.Indicator').first()).toBeVisible()
    await expect(page.getByText('CheckIcon and lucide-react').first()).toBeVisible()
    await expect(page.getByText('Tailwind peer and has selectors').first()).toBeVisible()
    await expect(page.getByText('vendor source remains read-only evidence').first()).toBeVisible()

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

    await page.goto('/docs/components/input-otp')
    for (let slug of [
      'input-otp-controlled',
      'input-otp-demo',
      'input-otp-pattern',
      'input-otp-separator',
    ]) {
      await expect(page.locator(`[data-radcn-docs-input-otp-family="${slug}"]`), `${slug} docs example`).toBeVisible()
    }
    await expect(page.locator('[data-radcn-docs-input-otp-family="input-otp-demo"] [data-radcn-input-otp-separator]')).toHaveCount(1)
    await expect(page.locator('[data-radcn-docs-input-otp-family="input-otp-pattern"] [data-radcn-input-otp-input]')).toHaveAttribute('pattern', '[0-9A-Za-z]*')
    await expect(page.locator('[data-radcn-docs-input-otp-family="input-otp-separator"] [data-radcn-input-otp-separator]')).toHaveCount(2)
    await expect(page.locator('[data-radcn-docs-input-otp-family="input-otp-controlled"] [data-radcn-input-otp-slot]')).toHaveCount(6)
    await expect(page.getByText('Enter your one-time password.').first()).toBeVisible()
    await expect(page.getByText('InputOTPGroup').first()).toBeVisible()
    await expect(page.getByText('InputOTPSeparator').first()).toBeVisible()
    await expect(page.getByText('REGEXP_ONLY_DIGITS_AND_CHARS').first()).toBeVisible()
    await expect(page.getByText('radcn-input-otp-change').first()).toBeVisible()
    await expect(page.getByText('React useState, value, and onChange examples map to explicit RadCN').first()).toBeVisible()
    await expect(page.getByText('upstream input-otp package and OTPInput context are not RadCN dependencies').first()).toBeVisible()
    await expect(page.getByText('lucide-react separator icons are app-owned presentation').first()).toBeVisible()
    await expect(page.getByText('Tailwind utilities map to class, containerClass, style').first()).toBeVisible()
    await expect(page.getByText('className maps to class').first()).toBeVisible()
    await expect(page.getByText('containerClassName maps to containerClass').first()).toBeVisible()
    await expect(page.getByText('data-slot maps to data-radcn-input-otp-* hooks').first()).toBeVisible()
    await expect(page.getByText('vendor source remains read-only evidence').first()).toBeVisible()
    await expect(page.getByText('Controlled entered-value display text is app-owned').first()).toBeVisible()

    await page.goto('/docs/components/native-select')
    for (let slug of [
      'native-select-demo',
      'native-select-disabled',
      'native-select-groups',
      'native-select-invalid',
    ]) {
      await expect(page.locator(`[data-radcn-docs-native-select-family="${slug}"]`), `${slug} docs example`).toBeVisible()
    }
    await expect(page.locator('[data-radcn-docs-native-select-family="native-select-demo"] option[data-radcn-native-select-option]')).toHaveText([
      'Select status',
      'Todo',
      'In Progress',
      'Done',
      'Cancelled',
    ])
    await expect(page.locator('[data-radcn-docs-native-select-family="native-select-disabled"] select[data-radcn-native-select]')).toBeDisabled()
    await expect(page.locator('[data-radcn-docs-native-select-family="native-select-disabled"] option[data-radcn-native-select-option]')).toHaveText([
      'Select priority',
      'Low',
      'Medium',
      'High',
      'Critical',
    ])
    await expect(page.locator('[data-radcn-docs-native-select-family="native-select-groups"] optgroup[data-radcn-native-select-optgroup]')).toHaveCount(3)
    await expect(page.locator('[data-radcn-docs-native-select-family="native-select-groups"] option[data-radcn-native-select-option]')).toHaveText([
      'Select department',
      'Frontend',
      'Backend',
      'DevOps',
      'Sales Rep',
      'Account Manager',
      'Sales Director',
      'Customer Support',
      'Product Manager',
      'Operations Manager',
    ])
    await expect(page.locator('[data-radcn-docs-native-select-family="native-select-invalid"] select[data-radcn-native-select]')).toHaveAttribute('aria-invalid', 'true')
    await expect(page.locator('[data-radcn-docs-native-select-family="native-select-invalid"] option[data-radcn-native-select-option]')).toHaveText([
      'Select role',
      'Admin',
      'Editor',
      'Viewer',
      'Guest',
    ])
    await expect(page.getByText('NativeSelectOption').first()).toBeVisible()
    await expect(page.getByText('NativeSelectOptGroup').first()).toBeVisible()
    await expect(page.getByText('data-radcn-native-select-wrapper').first()).toBeVisible()
    await expect(page.getByText('--radcn-native-select-border').first()).toBeVisible()
    await expect(page.getByText('React props and state examples map to explicit RadCN props').first()).toBeVisible()
    await expect(page.getByText('className maps to class').first()).toBeVisible()
    await expect(page.getByText('data-slot maps to data-radcn-native-select-* hooks').first()).toBeVisible()
    await expect(page.getByText('aria-invalid maps to ariaInvalid').first()).toBeVisible()
    await expect(page.getByText('ChevronDownIcon and lucide-react are app-owned presentation').first()).toBeVisible()
    await expect(page.getByText('Tailwind utilities map to RadCN classes').first()).toBeVisible()
    await expect(page.getByText('Canvas and CanvasText').first()).toBeVisible()
    await expect(page.getByText('Browser-native option popup rendering is intentionally not forced').first()).toBeVisible()
    await expect(page.getByText('vendor source remains read-only evidence').first()).toBeVisible()

    await page.goto('/docs/components/resizable')
    for (let slug of [
      'resizable-demo',
      'resizable-demo-with-handle',
      'resizable-handle',
      'resizable-vertical',
    ]) {
      await expect(page.locator(`[data-radcn-docs-resizable-family="${slug}"]`), `${slug} docs example`).toBeVisible()
    }
    await expect(page.locator('[data-radcn-docs-resizable-family="resizable-demo"] [data-radcn-resizable-panel-group]')).toHaveCount(2)
    await expect(page.locator('[data-radcn-docs-resizable-family="resizable-demo"] [data-radcn-resizable-handle]')).toHaveCount(2)
    await expect(page.locator('[data-radcn-docs-resizable-family="resizable-demo"] [data-radcn-resizable-handle-grip]')).toHaveCount(0)
    await expect(page.locator('[data-radcn-docs-resizable-family="resizable-demo-with-handle"] [data-radcn-resizable-handle-grip]')).toHaveCount(2)
    await expect(page.locator('[data-radcn-docs-resizable-family="resizable-handle"] [data-radcn-resizable-panel]').first()).toHaveAttribute('data-size', '25')
    await expect(page.locator('[data-radcn-docs-resizable-family="resizable-vertical"] [data-radcn-resizable-panel-group]')).toHaveAttribute('data-orientation', 'vertical')
    await expect(page.getByText('ResizablePanelGroup').first()).toBeVisible()
    await expect(page.getByText('ResizablePanel').first()).toBeVisible()
    await expect(page.getByText('ResizableHandle').first()).toBeVisible()
    await expect(page.getByText('radcn-resizable-change').first()).toBeVisible()
    await expect(page.getByText('aria-orientation').first()).toBeVisible()
    await expect(page.getByText('--radcn-resizable-border').first()).toBeVisible()
    await expect(page.getByText('react-resizable-panels mechanics map to RadCN dependency-free').first()).toBeVisible()
    await expect(page.getByText('defaultSize, minSize, orientation, and withHandle map to explicit RadCN props').first()).toBeVisible()
    await expect(page.getByText('className maps to class').first()).toBeVisible()
    await expect(page.getByText('data-slot maps to data-radcn-resizable-* hooks').first()).toBeVisible()
    await expect(page.getByText('GripVerticalIcon and lucide-react are app-owned presentation').first()).toBeVisible()
    await expect(page.getByText('Tailwind utilities map to class, style, CSS variables').first()).toBeVisible()
    await expect(page.getByText('Nested panel groups are supported as independent groups').first()).toBeVisible()
    await expect(page.getByText('vendor source remains read-only evidence').first()).toBeVisible()

    await page.goto('/docs/components/date-picker')
    for (let slug of [
      'date-picker-demo',
      'date-picker-with-presets',
      'date-picker-with-range',
    ]) {
      await expect(page.locator(`[data-radcn-docs-date-picker-family="${slug}"]`), `${slug} docs example`).toBeVisible()
    }
    await expect(page.locator('[data-radcn-docs-date-picker-family="date-picker-demo"] [data-radcn-date-picker-label]')).toHaveText('Pick a date')
    await expect(page.locator('[data-radcn-docs-date-picker-family="date-picker-demo"] [data-radcn-popover-content]')).toHaveCount(1)
    await expect(page.locator('[data-radcn-docs-date-picker-family="date-picker-demo"] [data-radcn-calendar]')).toHaveCount(1)
    await expect(page.locator('[data-radcn-docs-date-picker-family="date-picker-with-presets"] [data-radcn-date-picker-preset-select] option')).toHaveText([
      'Select',
      'Today',
      'Tomorrow',
      'In 3 days',
      'In a week',
    ])
    await expect(page.locator('[data-radcn-docs-date-picker-family="date-picker-with-range"] [data-radcn-date-picker-label]')).toHaveText('Jun 12, 2026 - Jun 18, 2026')
    await expect(page.locator('[data-radcn-docs-date-picker-family="date-picker-with-range"] [data-radcn-calendar-month]')).toHaveCount(2)
    await expect(page.locator('[data-radcn-date-picker-hidden-input]')).toHaveCount(3)
    await expect(page.getByText('React useState and onSelect map to explicit DatePicker props').first()).toBeVisible()
    await expect(page.getByText('date-fns format and addDays map to ISO values').first()).toBeVisible()
    await expect(page.getByText('react-day-picker DateRange maps to YYYY-MM-DD..YYYY-MM-DD').first()).toBeVisible()
    await expect(page.getByText('defaultMonth maps to month').first()).toBeVisible()
    await expect(page.getByText('numberOfMonths maps to numberOfMonths').first()).toBeVisible()
    await expect(page.getByText('className maps to class').first()).toBeVisible()
    await expect(page.getByText('asChild maps to explicit DatePicker trigger composition').first()).toBeVisible()
    await expect(page.getByText('CalendarIcon and lucide-react are app-owned presentation').first()).toBeVisible()
    await expect(page.getByText('Tailwind utilities map to RadCN classes').first()).toBeVisible()
    await expect(page.getByText('Popover and Calendar composition remains package-owned coordination').first()).toBeVisible()
    await expect(page.getByText('vendor source remains read-only evidence').first()).toBeVisible()

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
    await expect(page.locator('[data-radcn-date-picker]')).toHaveCount(3)

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
