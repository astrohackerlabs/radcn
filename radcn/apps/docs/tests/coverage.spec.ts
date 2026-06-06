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
  dialog: '[data-radcn-dialog-trigger]',
  drawer: '[data-radcn-drawer-trigger]',
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

    await page.goto('/docs/components/card')
    for (let slug of [
      'card-demo',
      'card-with-form',
    ]) {
      await expect(page.locator(`[data-radcn-docs-card-family="${slug}"]`), `${slug} docs example`).toBeVisible()
    }
    await expect(page.locator('[data-radcn-docs-card-family="card-demo"] [data-radcn-card]')).toHaveClass(/radcn-docs-card-demo/)
    await expect(page.locator('[data-radcn-docs-card-family="card-demo"] [data-radcn-card-title]')).toHaveText('Login to your account')
    await expect(page.locator('[data-radcn-docs-card-family="card-demo"] [data-radcn-card-description]')).toHaveText('Enter your email below to login to your account')
    await expect(page.locator('[data-radcn-docs-card-family="card-demo"] [data-radcn-card-action] [data-radcn-button]')).toHaveAttribute('data-variant', 'link')
    await expect(page.locator('[data-radcn-docs-card-family="card-demo"] form[data-radcn-docs-card-form="login"] [data-radcn-card-content]')).toHaveCount(1)
    await expect(page.getByLabel('Email')).toHaveAttribute('type', 'email')
    await expect(page.getByLabel('Email')).toHaveAttribute('required', '')
    await expect(page.getByLabel('Password')).toHaveAttribute('type', 'password')
    await expect(page.getByLabel('Password')).toHaveAttribute('required', '')
    await expect(page.getByRole('link', { name: 'Forgot your password?' })).toBeVisible()
    await expect(page.locator('[data-radcn-docs-card-family="card-demo"] form[data-radcn-docs-card-form="login"] [data-radcn-card-footer] [data-radcn-button]')).toHaveText(['Login', 'Login with Google'])
    await expect(page.locator('[data-radcn-docs-card-family="card-demo"] form[data-radcn-docs-card-form="login"] [data-radcn-card-footer] [data-radcn-button]').nth(0)).toHaveAttribute('type', 'submit')
    await expect(page.locator('[data-radcn-docs-card-family="card-demo"] [data-radcn-card-footer] [data-radcn-button]').nth(1)).toHaveAttribute('data-variant', 'outline')
    await expect(page.locator('[data-radcn-docs-card-family="card-with-form"] [data-radcn-card]')).toHaveClass(/radcn-docs-card-with-form/)
    await expect(page.locator('[data-radcn-docs-card-family="card-with-form"] [data-radcn-card-title]')).toHaveText('Create project')
    await expect(page.locator('[data-radcn-docs-card-family="card-with-form"] [data-radcn-card-description]')).toHaveText('Deploy your new project in one-click.')
    await expect(page.locator('[data-radcn-docs-card-family="card-with-form"] form[data-radcn-docs-card-form="project"] [data-radcn-card-content]')).toHaveCount(1)
    await expect(page.getByLabel('Name')).toHaveAttribute('placeholder', 'Name of your project')
    await expect(page.locator('[data-radcn-docs-card-family="card-with-form"] [data-radcn-select]')).toBeVisible()
    await expect(page.locator('[data-radcn-select-content] [data-radcn-select-item-text]')).toHaveText([
      'Next.js',
      'SvelteKit',
      'Astro',
      'Nuxt.js',
    ])
    await expect(page.locator('[data-radcn-docs-card-family="card-with-form"] [data-radcn-card-footer] [data-radcn-button]')).toHaveText(['Cancel', 'Deploy'])
    await expect(page.locator('[data-radcn-docs-card-family="card-with-form"] form[data-radcn-docs-card-form="project"] [data-radcn-card-footer] [data-radcn-button]').nth(1)).toHaveAttribute('type', 'submit')
    await expect(page.getByText('className maps to class').first()).toBeVisible()
    await expect(page.getByText('data-slot maps to data-radcn-card* hooks').first()).toBeVisible()
    await expect(page.getByText('cn and Tailwind utilities map to RadCN package classes').first()).toBeVisible()
    await expect(page.getByText('width utilities such as w-full, max-w-sm, and w-[350px]').first()).toBeVisible()
    await expect(page.getByText('CardAction, Button variant="link", Button variant="outline"').first()).toBeVisible()
    await expect(page.getByText('Input type="email", Input type="password", and Select position="popper"').first()).toBeVisible()
    await expect(page.getByText('Native form semantics remain app-owned').first()).toBeVisible()
    await expect(page.getByText('Form, Chart, and Carousel Card references are separate resolved clusters').first()).toBeVisible()
    await expect(page.getByText('block Card references stay block parity work').first()).toBeVisible()
    await expect(page.getByText('switch registry dependency in card-demo.json').first()).toBeVisible()
    await expect(page.getByText('vendor source remains read-only evidence').first()).toBeVisible()

    await page.goto('/docs/components/command')
    for (let slug of [
      'command-demo',
      'command-dialog',
    ]) {
      await expect(page.locator(`[data-radcn-docs-command-family="${slug}"]`), `${slug} docs example`).toBeVisible()
    }
    await expect(page.locator('[data-radcn-docs-command-family="command-demo"] [data-radcn-command]')).toHaveClass(/radcn-docs-command-demo/)
    await expect(page.locator('[data-radcn-docs-command-family="command-demo"] [data-radcn-command-input]')).toHaveAttribute('placeholder', 'Type a command or search...')
    await expect(page.locator('[data-radcn-docs-command-family="command-demo"] [data-radcn-command-group-heading]')).toHaveText(['Suggestions', 'Settings'])
    await expect(page.locator('[data-radcn-docs-command-family="command-demo"] [data-radcn-command-separator]')).toHaveCount(1)
    await expect(page.locator('[data-radcn-docs-command-family="command-demo"] [data-radcn-docs-command-icon]')).toHaveCount(6)
    await expect(page.locator('[data-radcn-docs-command-family="command-demo"] [data-radcn-command-shortcut]')).toHaveText(['⌘P', '⌘B', '⌘S'])
    await expect(page.getByRole('option', { name: 'Calendar' })).toBeVisible()
    await expect(page.getByRole('option', { name: 'Search Emoji' })).toBeVisible()
    await expect(page.getByRole('option', { name: 'Calculator' }).first()).toHaveAttribute('aria-disabled', 'true')
    await expect(page.getByRole('option', { name: /Profile/ })).toBeVisible()
    await expect(page.getByRole('option', { name: /Billing/ })).toBeVisible()
    await expect(page.getByRole('option', { name: /Settings/ })).toBeVisible()

    let commandDialog = page.locator('.radcn-command-dialog[data-radcn-dialog-content]').first()
    await expect(page.locator('[data-radcn-docs-command-dialog-guidance]')).toContainText('Press')
    await expect(page.locator('[data-radcn-docs-command-family="command-dialog"] [data-radcn-kbd]')).toHaveText(['⌘', 'J'])
    await expect(commandDialog).toBeHidden()
    await page.keyboard.press('ControlOrMeta+J')
    await expect(commandDialog).toBeVisible()
    await expect(commandDialog).toHaveAttribute('role', 'dialog')
    await expect(page.locator('[data-radcn-dialog-title]')).toHaveText('Command Palette')
    await expect(page.locator('[data-radcn-dialog-description]')).toHaveText('Search for a command to run...')
    await expect(page.locator('.radcn-command-dialog [data-radcn-command-group-heading]')).toHaveText(['Suggestions', 'Settings'])
    await expect(page.locator('.radcn-command-dialog [data-radcn-command-shortcut]')).toHaveText(['⌘P', '⌘B', '⌘S'])
    await expect(page.locator('.radcn-command-dialog [data-radcn-command-item][data-value="calculator"]')).not.toHaveAttribute('aria-disabled', 'true')
    await page.keyboard.press('Escape')
    await expect(commandDialog).toBeHidden()

    await expect(page.getByText('CommandGroup heading renders visible text').first()).toBeVisible()
    await expect(page.getByText('data-radcn-command-group-heading').first()).toBeVisible()
    await expect(page.getByText('React useState, useEffect, open, and onOpenChange').first()).toBeVisible()
    await expect(page.getByText('cmdk and CommandPrimitive are upstream React implementation details').first()).toBeVisible()
    await expect(page.getByText('SearchIcon, Calendar, Smile, Calculator, User, CreditCard, Settings').first()).toBeVisible()
    await expect(page.getByText('lucide-react').first()).toBeVisible()
    await expect(page.getByText('className maps to class').first()).toBeVisible()
    await expect(page.getByText('data-slot maps to data-radcn-command* hooks').first()).toBeVisible()
    await expect(page.getByText('cn and Tailwind utilities map to RadCN package classes').first()).toBeVisible()
    await expect(page.getByText('global keyboard routing').first()).toBeVisible()
    await expect(page.getByText('vendor source remains read-only evidence').first()).toBeVisible()

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

    await page.goto('/docs/components/calendar')
    for (let slug of [
      'calendar-demo',
      'calendar-hijri',
    ]) {
      await expect(page.locator(`[data-radcn-docs-calendar-family="${slug}"]`), `${slug} docs example`).toBeVisible()
    }
    await expect(page.locator('[data-radcn-docs-calendar-family="calendar-demo"] [data-radcn-calendar]')).toHaveAttribute('data-caption-layout', 'dropdown')
    await expect(page.locator('[data-radcn-docs-calendar-family="calendar-demo"] [data-radcn-calendar-month-select]')).toHaveValue('5')
    await expect(page.locator('[data-radcn-docs-calendar-family="calendar-demo"] [data-radcn-calendar-year-select]')).toHaveValue('2026')
    await expect(page.locator('[data-radcn-docs-calendar-family="calendar-demo"] [data-radcn-calendar-hidden-input]')).toHaveValue('2026-06-12')
    await expect(page.locator('[data-radcn-docs-calendar-family="calendar-demo"] [data-radcn-calendar-grid]')).toHaveAttribute('role', 'grid')
    await expect(page.getByRole('button', { name: /Friday, June 12, 2026/ }).first()).toBeVisible()
    await expect(page.locator('[data-radcn-docs-calendar-family="calendar-demo"] [data-radcn-calendar-day][data-selected="true"]')).toHaveAttribute('data-date', '2026-06-12')
    await expect(page.locator('[data-radcn-docs-calendar-family="calendar-hijri"] [data-radcn-docs-calendar-divergence="calendar-hijri"]')).toBeVisible()
    await expect(page.getByText('calendar-hijri is an intentional divergence').first()).toBeVisible()
    await expect(page.getByText('defaultMonth maps to defaultMonth/month ISO props').first()).toBeVisible()
    await expect(page.getByText('selected and onSelect map to selected/defaultSelected props').first()).toBeVisible()
    await expect(page.getByText('captionLayout maps to package-owned label or dropdown captions').first()).toBeVisible()
    await expect(page.getByText('className, classNames, data-slot, cva, or Tailwind utilities').first()).toBeVisible()
    await expect(page.getByText('react-day-picker, DayPicker, DayButton, and getDefaultClassNames').first()).toBeVisible()
    await expect(page.getByText('buttonVariants, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, and lucide-react').first()).toBeVisible()
    await expect(page.getByText('react-day-picker/persian, next/font/google, Vazirmatn, and RTL chevron behavior').first()).toBeVisible()
    await expect(page.getByText('Button composition stays inside the Calendar day and navigation controls').first()).toBeVisible()
    await expect(page.getByText('Date Picker composition remains separate package evidence').first()).toBeVisible()
    await expect(page.getByText('block/sidebar separation').first()).toBeVisible()
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
    for (let slug of [
      'dialog-demo',
      'dialog-close-button',
    ]) {
      await expect(page.locator(`[data-radcn-docs-dialog-family="${slug}"]`), `${slug} docs example`).toBeVisible()
    }
    await expect(page.locator('[data-radcn-docs-dialog-family="dialog-demo"] [data-radcn-dialog-trigger]')).toHaveText('Open Dialog')
    await expect(page.locator('[data-radcn-docs-dialog-family="dialog-demo"] [data-radcn-dialog-content]')).toBeAttached()
    await expect(page.locator('[data-radcn-docs-dialog-family="dialog-demo"] [data-radcn-dialog-content]')).toHaveClass(/radcn-docs-dialog-demo-content/)
    await expect(page.locator('[data-radcn-docs-dialog-family="dialog-demo"] [data-radcn-dialog-title]')).toHaveText('Edit profile')
    await expect(page.locator('[data-radcn-docs-dialog-family="dialog-demo"] [data-radcn-dialog-description]')).toHaveText("Make changes to your profile here. Click save when you're done.")
    await expect(page.locator('[data-radcn-docs-dialog-family="dialog-demo"] form[data-radcn-docs-dialog-form="profile"]')).toBeAttached()
    await expect(page.locator('[data-radcn-docs-dialog-family="dialog-demo"] [data-radcn-label]')).toHaveText(['Name', 'Username'])
    await expect(page.locator('[data-radcn-docs-dialog-family="dialog-demo"] [data-radcn-input]').nth(0)).toHaveValue('Pedro Duarte')
    await expect(page.locator('[data-radcn-docs-dialog-family="dialog-demo"] [data-radcn-input]').nth(1)).toHaveValue('@peduarte')
    await expect(page.locator('[data-radcn-docs-dialog-family="dialog-demo"] [data-radcn-dialog-footer] [data-radcn-dialog-close]')).toHaveText('Cancel')
    await expect(page.locator('[data-radcn-docs-dialog-family="dialog-demo"] [data-radcn-button]')).toHaveText('Save changes')
    await expect(page.locator('[data-radcn-docs-dialog-family="dialog-close-button"] [data-radcn-dialog-trigger]')).toHaveText('Share')
    await expect(page.locator('[data-radcn-docs-dialog-family="dialog-close-button"] [data-radcn-dialog-content]')).toBeAttached()
    await expect(page.locator('[data-radcn-docs-dialog-family="dialog-close-button"] [data-radcn-dialog-content]')).toHaveClass(/radcn-docs-dialog-close-button-content/)
    await expect(page.locator('[data-radcn-docs-dialog-family="dialog-close-button"] [data-radcn-dialog-title]')).toHaveText('Share link')
    await expect(page.locator('[data-radcn-docs-dialog-family="dialog-close-button"] [data-radcn-dialog-description]')).toHaveText('Anyone who has this link will be able to view this.')
    await expect(page.locator('[data-radcn-docs-dialog-family="dialog-close-button"] label[for="docs-dialog-share-link"]')).toHaveClass(/radcn-sr-only/)
    await expect(page.locator('[data-radcn-docs-dialog-family="dialog-close-button"] [data-radcn-input]')).toHaveValue('https://ui.shadcn.com/docs/installation')
    await expect(page.locator('[data-radcn-docs-dialog-family="dialog-close-button"] [data-radcn-input]')).toHaveAttribute('readonly', '')
    await expect(page.locator('[data-radcn-docs-dialog-family="dialog-close-button"] .radcn-docs-dialog-footer-start')).toHaveCSS('justify-content', 'flex-start')
    await expect(page.locator('[data-radcn-docs-dialog-family="dialog-close-button"] [data-radcn-dialog-footer] [data-radcn-dialog-close]')).toHaveText('Close')
    await expect(page.getByText('asChild Button composition maps to Button classes').first()).toBeVisible()
    await expect(page.getByText('React open/onOpenChange, Radix DialogPrimitive').first()).toBeVisible()
    await expect(page.getByText('DialogFooter showCloseButton is an upstream convenience API').first()).toBeVisible()
    await expect(page.getByText('does not add copy-to-clipboard behavior').first()).toBeVisible()

    await page.goto('/docs/components/drawer')
    for (let slug of [
      'drawer-demo',
      'drawer-dialog',
    ]) {
      await expect(page.locator(`[data-radcn-docs-drawer-family="${slug}"]`), `${slug} docs example`).toBeVisible()
    }
    await expect(page.locator('[data-radcn-docs-drawer-family="drawer-demo"] [data-radcn-drawer-trigger]')).toHaveText('Open Drawer')
    await expect(page.locator('[data-radcn-docs-drawer-family="drawer-demo"] [data-radcn-drawer-content]')).toBeAttached()
    await expect(page.locator('[data-radcn-docs-drawer-family="drawer-demo"] [data-radcn-drawer-content]')).toHaveClass(/radcn-docs-drawer-demo-content/)
    await expect(page.locator('[data-radcn-docs-drawer-family="drawer-demo"] [data-radcn-drawer-handle]')).toBeAttached()
    await expect(page.locator('[data-radcn-docs-drawer-family="drawer-demo"] [data-radcn-drawer-title]')).toHaveText('Move Goal')
    await expect(page.locator('[data-radcn-docs-drawer-family="drawer-demo"] [data-radcn-drawer-description]')).toHaveText('Set your daily activity goal.')
    await expect(page.locator('[data-radcn-docs-drawer-layout="move-goal"]')).toBeAttached()
    await expect(page.locator('[data-radcn-docs-drawer-goal-value]')).toHaveText('350')
    await expect(page.locator('[data-radcn-docs-drawer-family="drawer-demo"]')).toContainText('Calories/day')
    await expect(page.locator('[data-radcn-docs-drawer-family="drawer-demo"] button[aria-label="Decrease"]')).toBeAttached()
    await expect(page.locator('[data-radcn-docs-drawer-family="drawer-demo"] button[aria-label="Increase"]')).toBeAttached()
    await expect(page.locator('[data-radcn-docs-drawer-family="drawer-demo"] button[aria-label="Decrease at minimum"]')).toBeDisabled()
    await expect(page.locator('[data-radcn-docs-drawer-family="drawer-demo"] button[aria-label="Increase at maximum"]')).toBeDisabled()
    await expect(page.locator('[data-radcn-docs-drawer-chart]')).toBeAttached()
    await expect(page.locator('[data-radcn-docs-drawer-bar]')).toHaveCount(13)
    await expect(page.locator('[data-radcn-docs-drawer-family="drawer-demo"] [data-radcn-drawer-footer] [data-radcn-button]')).toHaveText('Submit')
    await expect(page.locator('[data-radcn-docs-drawer-family="drawer-demo"] [data-radcn-drawer-footer] [data-radcn-drawer-close]')).toHaveText('Cancel')
    await expect(page.locator('[data-radcn-docs-drawer-dialog-branch="desktop"] [data-radcn-dialog-trigger]')).toHaveText('Edit Profile')
    await expect(page.locator('[data-radcn-docs-drawer-dialog-branch="desktop"] [data-radcn-dialog-content]')).toBeAttached()
    await expect(page.locator('[data-radcn-docs-drawer-dialog-branch="desktop"] [data-radcn-dialog-content]')).toHaveClass(/radcn-docs-drawer-dialog-desktop-content/)
    await expect(page.locator('[data-radcn-docs-drawer-dialog-branch="desktop"] [data-radcn-dialog-title]')).toHaveText('Edit profile')
    await expect(page.locator('[data-radcn-docs-drawer-dialog-branch="desktop"] [data-radcn-dialog-description]')).toHaveText("Make changes to your profile here. Click save when you're done.")
    await expect(page.locator('[data-radcn-docs-drawer-form="desktop"] [data-radcn-label]')).toHaveText(['Email', 'Username'])
    await expect(page.locator('[data-radcn-docs-drawer-form="desktop"] [data-radcn-input]').nth(0)).toHaveValue('shadcn@example.com')
    await expect(page.locator('[data-radcn-docs-drawer-form="desktop"] [data-radcn-input]').nth(1)).toHaveValue('@shadcn')
    await expect(page.locator('[data-radcn-docs-drawer-form="desktop"] [data-radcn-button]')).toHaveText('Save changes')
    await expect(page.locator('[data-radcn-docs-drawer-dialog-branch="mobile"] [data-radcn-drawer-trigger]')).toHaveText('Edit Profile')
    await expect(page.locator('[data-radcn-docs-drawer-dialog-branch="mobile"] [data-radcn-drawer-content]')).toBeAttached()
    await expect(page.locator('[data-radcn-docs-drawer-dialog-branch="mobile"] [data-radcn-drawer-content]')).toHaveClass(/radcn-docs-drawer-dialog-mobile-content/)
    await expect(page.locator('[data-radcn-docs-drawer-dialog-branch="mobile"] [data-radcn-drawer-title]')).toHaveText('Edit profile')
    await expect(page.locator('[data-radcn-docs-drawer-dialog-branch="mobile"] [data-radcn-drawer-description]')).toHaveText("Make changes to your profile here. Click save when you're done.")
    await expect(page.locator('[data-radcn-docs-drawer-form="mobile"] [data-radcn-label]')).toHaveText(['Email', 'Username'])
    await expect(page.locator('[data-radcn-docs-drawer-form="mobile"] [data-radcn-input]').nth(0)).toHaveValue('shadcn@example.com')
    await expect(page.locator('[data-radcn-docs-drawer-form="mobile"] [data-radcn-input]').nth(1)).toHaveValue('@shadcn')
    await expect(page.locator('[data-radcn-docs-drawer-form="mobile"] [data-radcn-button]')).toHaveText('Save changes')
    await expect(page.locator('[data-radcn-docs-drawer-dialog-branch="mobile"] [data-radcn-drawer-footer] [data-radcn-drawer-close]')).toHaveText('Cancel')
    await expect(page.getByText('React props/state, Vaul DrawerPrimitive').first()).toBeVisible()
    await expect(page.getByText('Button asChild maps to styling DrawerTrigger').first()).toBeVisible()
    await expect(page.getByText('Minus, Plus, lucide-react, Recharts').first()).toBeVisible()
    await expect(page.getByText('dependency-free chart bars as the Recharts composition substitute').first()).toBeVisible()
    await expect(page.getByText('responsive Dialog/Drawer example is proven with deterministic desktop and mobile branch fixtures').first()).toBeVisible()
    await expect(page.getByText('Vendor source remains read-only evidence').first()).toBeVisible()

    await page.goto('/docs/components/scroll-area')
    for (let slug of [
      'scroll-area-demo',
      'scroll-area-horizontal-demo',
    ]) {
      await expect(page.locator(`[data-radcn-docs-scroll-area-family="${slug}"]`), `${slug} docs example`).toBeVisible()
    }
    let scrollAreaDemo = page.locator('[data-radcn-docs-scroll-area-family="scroll-area-demo"]')
    await expect(scrollAreaDemo.locator('[data-radcn-scroll-area]')).toHaveClass(/radcn-docs-scroll-area-demo/)
    await expect(scrollAreaDemo.locator('[data-radcn-scroll-area]')).toHaveCSS('width', '192px')
    await expect(scrollAreaDemo.locator('[data-radcn-scroll-area]')).toHaveCSS('height', '288px')
    await expect(scrollAreaDemo.locator('[data-radcn-scroll-area-viewport]')).toHaveAttribute('aria-label', 'Tags')
    await expect(scrollAreaDemo.getByRole('heading', { name: 'Tags' })).toBeVisible()
    await expect(scrollAreaDemo.locator('[data-radcn-docs-scroll-area-tag]')).toHaveCount(50)
    await expect(scrollAreaDemo.locator('[data-radcn-docs-scroll-area-tag]').first()).toHaveText('v1.2.0-beta.50')
    await expect(scrollAreaDemo.locator('[data-radcn-docs-scroll-area-tag]').last()).toHaveText('v1.2.0-beta.1')
    await expect(scrollAreaDemo.locator('[data-radcn-separator]')).toHaveCount(49)
    await expect(scrollAreaDemo.locator('[data-radcn-scroll-area-scrollbar][data-orientation="vertical"]')).toHaveCount(1)
    await expect(scrollAreaDemo.locator('[data-radcn-scroll-area-thumb]')).toHaveCount(1)
    await expect.poll(() => scrollAreaDemo.locator('[data-radcn-scroll-area-viewport]').evaluate((node) => {
      node.scrollTop = 180
      return node.scrollTop
    })).toBeGreaterThan(0)

    let scrollAreaHorizontal = page.locator('[data-radcn-docs-scroll-area-family="scroll-area-horizontal-demo"]')
    await expect(scrollAreaHorizontal.locator('[data-radcn-scroll-area]')).toHaveClass(/radcn-docs-scroll-area-horizontal-demo/)
    await expect(scrollAreaHorizontal.locator('[data-radcn-scroll-area]')).toHaveCSS('white-space', 'nowrap')
    await expect(scrollAreaHorizontal.locator('[data-radcn-scroll-area-viewport]')).toHaveAttribute('aria-label', 'Artwork gallery')
    await expect(scrollAreaHorizontal.locator('[data-radcn-docs-scroll-area-artwork-strip]')).toBeAttached()
    await expect(scrollAreaHorizontal.locator('figure[data-radcn-docs-scroll-area-artwork]')).toHaveCount(3)
    await expect(scrollAreaHorizontal.locator('[data-radcn-docs-scroll-area-artwork-caption]')).toHaveText([
      'Photo by Ornella Binni',
      'Photo by Tom Byrom',
      'Photo by Vladimir Malyavko',
    ])
    for (let artist of ['Ornella Binni', 'Tom Byrom', 'Vladimir Malyavko']) {
      let image = scrollAreaHorizontal.getByRole('img', { name: `Photo by ${artist}` })
      await expect(image).toBeAttached()
      await expect(image).toHaveAttribute('width', '300')
      await expect(image).toHaveAttribute('height', '400')
      let src = await image.getAttribute('src')
      expect(src).toBeTruthy()
      expect(src!).not.toMatch(/^https?:/i)
      expect(src!).not.toContain('images.unsplash.com')
    }
    await expect(scrollAreaHorizontal.locator('[data-radcn-scroll-area-scrollbar][data-orientation="horizontal"]')).toHaveCount(1)
    await expect(scrollAreaHorizontal.locator('[data-radcn-scroll-area-thumb]')).toHaveCount(1)
    await expect(scrollAreaHorizontal.locator('[data-radcn-scroll-area-corner]')).toHaveCount(1)
    await expect.poll(() => scrollAreaHorizontal.locator('[data-radcn-scroll-area-viewport]').evaluate((node) => {
      node.scrollLeft = 240
      return node.scrollLeft
    })).toBeGreaterThan(0)
    await expect(page.getByText('React props, Radix ScrollAreaPrimitive').first()).toBeVisible()
    await expect(page.getByText('The upstream default vertical ScrollBar maps to explicit ScrollBar composition').first()).toBeVisible()
    await expect(page.getByText('React fragments and keys are upstream rendering mechanics').first()).toBeVisible()
    await expect(page.getByText('next/image, remote Unsplash URLs, and image optimization').first()).toBeVisible()
    await expect(page.getByText('deterministic non-network artwork data').first()).toBeVisible()
    await expect(page.getByText('vendor source remains read-only evidence').first()).toBeVisible()

    await page.goto('/docs/components/select')
    for (let slug of [
      'select-demo',
      'select-scrollable',
    ]) {
      await expect(page.locator(`[data-radcn-docs-select-family="${slug}"]`), `${slug} docs example`).toBeVisible()
    }
    let selectDemo = page.locator('[data-radcn-docs-select-family="select-demo"]')
    await expect(selectDemo.locator('[data-radcn-select]')).toHaveAttribute('data-name', 'fruit')
    await expect(selectDemo.locator('[data-radcn-select-trigger]')).toHaveCSS('width', '180px')
    await expect(selectDemo.locator('[data-radcn-select-value]')).toHaveText('Select a fruit')
    await expect(selectDemo.locator('[data-radcn-select-label]')).toHaveText('Fruits')
    await expect(selectDemo.locator('[data-radcn-select-item]')).toHaveCount(5)
    await expect(selectDemo.locator('[data-radcn-select-item-text]')).toHaveText([
      'Apple',
      'Banana',
      'Blueberry',
      'Grapes',
      'Pineapple',
    ])
    for (let [value, label] of [
      ['apple', 'Apple'],
      ['banana', 'Banana'],
      ['blueberry', 'Blueberry'],
      ['grapes', 'Grapes'],
      ['pineapple', 'Pineapple'],
    ]) {
      await expect(selectDemo.locator(`[data-radcn-select-item][data-value="${value}"]`)).toContainText(label)
    }

    let selectScrollable = page.locator('[data-radcn-docs-select-family="select-scrollable"]')
    await expect(selectScrollable.locator('[data-radcn-select]')).toHaveAttribute('data-name', 'timezone')
    await expect(selectScrollable.locator('[data-radcn-select-trigger]')).toHaveCSS('width', '280px')
    await expect(selectScrollable.locator('[data-radcn-select-value]')).toHaveText('Select a timezone')
    await expect(selectScrollable.locator('[data-radcn-select-label]')).toHaveText([
      'North America',
      'Europe & Africa',
      'Asia',
      'Australia & Pacific',
      'South America',
    ])
    let timezoneOptions = [
      ['est', 'Eastern Standard Time (EST)'],
      ['cst', 'Central Standard Time (CST)'],
      ['mst', 'Mountain Standard Time (MST)'],
      ['pst', 'Pacific Standard Time (PST)'],
      ['akst', 'Alaska Standard Time (AKST)'],
      ['hst', 'Hawaii Standard Time (HST)'],
      ['gmt', 'Greenwich Mean Time (GMT)'],
      ['cet', 'Central European Time (CET)'],
      ['eet', 'Eastern European Time (EET)'],
      ['west', 'Western European Summer Time (WEST)'],
      ['cat', 'Central Africa Time (CAT)'],
      ['eat', 'East Africa Time (EAT)'],
      ['msk', 'Moscow Time (MSK)'],
      ['ist', 'India Standard Time (IST)'],
      ['cst_china', 'China Standard Time (CST)'],
      ['jst', 'Japan Standard Time (JST)'],
      ['kst', 'Korea Standard Time (KST)'],
      ['ist_indonesia', 'Indonesia Central Standard Time (WITA)'],
      ['awst', 'Australian Western Standard Time (AWST)'],
      ['acst', 'Australian Central Standard Time (ACST)'],
      ['aest', 'Australian Eastern Standard Time (AEST)'],
      ['nzst', 'New Zealand Standard Time (NZST)'],
      ['fjt', 'Fiji Time (FJT)'],
      ['art', 'Argentina Time (ART)'],
      ['bot', 'Bolivia Time (BOT)'],
      ['brt', 'Brasilia Time (BRT)'],
      ['clt', 'Chile Standard Time (CLT)'],
    ]
    await expect(selectScrollable.locator('[data-radcn-select-item]')).toHaveCount(27)
    await expect(selectScrollable.locator('[data-radcn-select-item-text]')).toHaveText(timezoneOptions.map(([, label]) => label))
    for (let [value, label] of timezoneOptions) {
      await expect(selectScrollable.locator(`[data-radcn-select-item][data-value="${value}"]`)).toContainText(label)
    }
    await expect(selectScrollable.locator('[data-radcn-select-scroll-up-button]')).toHaveCount(1)
    await expect(selectScrollable.locator('[data-radcn-select-scroll-down-button]')).toHaveCount(1)
    await expect(selectScrollable.locator('[data-radcn-select-viewport]')).toHaveAttribute('style', /max-height:12rem;overflow:auto/)
    await expect(page.getByText('React props, Radix SelectPrimitive').first()).toBeVisible()
    await expect(page.getByText('className, data-slot, Tailwind utilities, cn').first()).toBeVisible()
    await expect(page.getByText('CheckIcon, ChevronDownIcon, ChevronUpIcon, and lucide-react').first()).toBeVisible()
    await expect(page.getByText('Trigger widths such as w-[180px] and w-[280px]').first()).toBeVisible()
    await expect(page.getByText('Fruit options, timezone groups, option labels').first()).toBeVisible()
    await expect(page.getByText('Portal behavior is supported through SelectPortal').first()).toBeVisible()
    await expect(page.getByText('vendor source remains read-only evidence').first()).toBeVisible()

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
