import { readFile } from 'node:fs/promises'
import path from 'node:path'

import { expect, test } from '@playwright/test'

const excludedExports = new Set(['.', './styles', './theme.css', './package.json'])
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

    await page.goto('/docs/components/label')
    let labelDemo = page.locator('[data-radcn-docs-label-family="label-demo"]')
    let labelDemoCheckbox = labelDemo.locator('[data-radcn-checkbox-input]')
    let labelDemoLabel = labelDemo.locator('[data-radcn-label]')
    await expect(labelDemo).toBeVisible()
    await expect(labelDemo).toHaveAttribute('data-radcn-docs-label-layout', 'inline')
    await expect(labelDemo).toHaveCSS('display', 'flex')
    await expect(labelDemo).toHaveCSS('align-items', 'center')
    await expect(labelDemo).toHaveCSS('gap', '8px')
    await expect(labelDemo.locator('[data-radcn-checkbox-wrapper]')).toHaveCount(1)
    await expect(labelDemo.locator('[data-radcn-checkbox-indicator]')).toHaveCount(1)
    await expect(labelDemoCheckbox).toHaveAttribute('id', 'terms')
    await expect(labelDemoCheckbox).toHaveAttribute('name', 'terms')
    await expect(labelDemoLabel).toHaveAttribute('for', 'terms')
    await expect(labelDemoLabel).toHaveText('Accept terms and conditions')
    await expect(labelDemoCheckbox).not.toBeChecked()
    await labelDemoLabel.click()
    await expect(labelDemoCheckbox).toBeChecked()
    await expect(page.getByText('The upstream htmlFor prop maps to the native for prop in Remix UI.').first()).toBeVisible()
    await expect(page.getByText('className, cn, and data-slot map to class and data-radcn-label hooks.').first()).toBeVisible()
    await expect(page.getByText('use client and Radix LabelPrimitive Root map to native label markup.').first()).toBeVisible()
    await expect(page.getByText('group-data disabled and peer-disabled behavior map to explicit disabled props, native disabled controls, and app-owned composition.').first()).toBeVisible()
    await expect(page.getByText('Vendor source remains read-only evidence and is not imported by RadCN.').first()).toBeVisible()

    await page.goto('/docs/components/menubar')
    let menubarDemo = page.locator('[data-radcn-docs-menubar-family="menubar-demo"]')
    let menubarRoot = menubarDemo.locator('[data-radcn-menubar]')
    await expect(menubarDemo).toBeVisible()
    await expect(menubarRoot).toHaveAttribute('role', 'menubar')
    await expect(menubarRoot).toHaveAttribute('aria-orientation', 'horizontal')
    await expect(menubarDemo.locator('[data-radcn-menubar-menu]')).toHaveCount(4)
    await expect(menubarDemo.locator('[data-radcn-menubar-trigger]')).toHaveText(['File', 'Edit', 'View', 'Profiles'])
    await expect(page.locator('[data-radcn-portal-root] [data-radcn-menubar-portal]')).toHaveCount(4)
    await page.getByRole('menuitem', { name: 'File', exact: true }).click()
    let docsFile = page.getByRole('menuitem', { name: 'File', exact: true })
    let docsFileContent = page.locator(`#${await docsFile.getAttribute('aria-controls')}`)
    await expect(docsFileContent).toHaveAttribute('data-side-offset', '8')
    await expect(docsFileContent.locator(':scope > [data-radcn-menubar-item]')).toHaveCount(4)
    await expect(docsFileContent.locator('[data-radcn-menubar-separator]')).toHaveCount(2)
    await expect(docsFileContent.locator('[data-radcn-menubar-sub-trigger]')).toHaveText(/Share/)
    await expect(docsFileContent.locator('[data-radcn-menubar-shortcut]')).toHaveText(['⌘T', '⌘N', '⌘P'])
    await expect(page.getByRole('menuitem', { name: /New Incognito Window/ })).toHaveAttribute('aria-disabled', 'true')
    await page.getByRole('menuitem', { name: /Share/ }).evaluate((element) => {
      element.dispatchEvent(new PointerEvent('pointermove', { bubbles: true }))
    })
    await expect(docsFileContent.locator('[data-radcn-menubar-sub-content]')).toBeVisible()
    await expect(page.getByRole('menuitem', { name: 'Email link' })).toBeVisible()
    await expect(page.getByRole('menuitem', { name: 'Messages' })).toBeVisible()
    await expect(page.getByRole('menuitem', { name: 'Notes' })).toBeVisible()
    await page.keyboard.press('Escape')
    await page.getByRole('menuitem', { name: 'Edit', exact: true }).click()
    let docsEdit = page.getByRole('menuitem', { name: 'Edit', exact: true })
    let docsEditContent = page.locator(`#${await docsEdit.getAttribute('aria-controls')}`)
    await expect(docsEditContent.locator('[data-radcn-menubar-shortcut]')).toHaveText(['⌘Z', '⇧⌘Z'])
    await page.getByRole('menuitem', { name: 'Find', exact: true }).evaluate((element) => {
      element.dispatchEvent(new PointerEvent('pointermove', { bubbles: true }))
    })
    await expect(docsEditContent.locator('[data-radcn-menubar-sub-content]')).toBeVisible()
    for (let name of ['Search the web', 'Find...', 'Find Next', 'Find Previous', 'Cut', 'Copy', 'Paste']) {
      await expect(page.getByRole('menuitem', { name: new RegExp(name.replace('.', '\\.')) })).toBeVisible()
    }
    await page.keyboard.press('Escape')
    await page.getByRole('menuitem', { name: 'View', exact: true }).click()
    let docsView = page.getByRole('menuitem', { name: 'View', exact: true })
    let docsViewContent = page.locator(`#${await docsView.getAttribute('aria-controls')}`)
    await expect(docsViewContent).toHaveAttribute('data-side-offset', '8')
    await expect(page.getByRole('menuitemcheckbox', { name: 'Always Show Bookmarks Bar' })).toHaveAttribute('aria-checked', 'false')
    await expect(page.getByRole('menuitemcheckbox', { name: 'Always Show Full URLs' })).toHaveAttribute('aria-checked', 'true')
    await expect(page.getByRole('menuitem', { name: /^Reload/ })).toBeVisible()
    await expect(page.getByRole('menuitem', { name: /Force Reload/ })).toHaveAttribute('aria-disabled', 'true')
    await expect(page.getByRole('menuitem', { name: 'Toggle Fullscreen' })).toBeVisible()
    await expect(page.getByRole('menuitem', { name: 'Hide Sidebar' })).toBeVisible()
    await page.keyboard.press('Escape')
    await page.getByRole('menuitem', { name: 'Profiles', exact: true }).click()
    let docsProfiles = page.getByRole('menuitem', { name: 'Profiles', exact: true })
    let docsProfilesContent = page.locator(`#${await docsProfiles.getAttribute('aria-controls')}`)
    await expect(docsProfilesContent.locator('[data-radcn-menubar-radio-group]')).toHaveAttribute('data-value', 'benoit')
    await expect(page.getByRole('menuitemradio', { name: 'Andy' })).toHaveAttribute('aria-checked', 'false')
    await expect(page.getByRole('menuitemradio', { name: 'Benoit' })).toHaveAttribute('aria-checked', 'true')
    await expect(page.getByRole('menuitemradio', { name: 'Luis' })).toHaveAttribute('aria-checked', 'false')
    await expect(page.getByRole('menuitem', { name: 'Edit...' })).toBeVisible()
    await expect(page.getByRole('menuitem', { name: 'Add Profile...' })).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(docsProfiles).toHaveAttribute('aria-expanded', 'false')
    await expect(page.getByText('use client and Radix Menubar primitives map to server-rendered Menubar markup plus scoped enhanceMenubar browser behavior.').first()).toBeVisible()
    await expect(page.getByText('lucide CheckIcon, ChevronRightIcon, and CircleIcon map to RadCN-owned text indicators and app-owned presentation, not a package dependency.').first()).toBeVisible()
    await expect(page.getByText('data-slot maps to public data-radcn-menubar* hooks and shared data-radcn-menu-* hooks.').first()).toBeVisible()
    await expect(page.getByText('The named demo passes sideOffset={8} to match upstream MenubarContent placement without changing the package default.').first()).toBeVisible()
    await expect(page.getByText('Vendor source remains read-only evidence and is not imported by RadCN.').first()).toBeVisible()

    await page.goto('/docs/components/navigation-menu')
    let navigationMenuDemo = page.locator('[data-radcn-docs-navigation-menu-family="navigation-menu-demo"]')
    let navigationMenuRoot = navigationMenuDemo.locator('[data-radcn-navigation-menu]')
    await expect(navigationMenuDemo).toBeVisible()
    await expect(navigationMenuRoot).toHaveAttribute('aria-label', 'Main navigation')
    await expect(navigationMenuRoot).toHaveAttribute('data-value', 'home')
    await expect(navigationMenuDemo.locator('[data-radcn-navigation-menu-item]')).toHaveCount(6)
    await expect(navigationMenuDemo.locator('[data-radcn-navigation-menu-trigger]')).toHaveText([
      'Home',
      'Components',
      'List',
      'Simple',
      'With Icon',
    ])
    await expect(navigationMenuDemo.getByRole('link', { name: 'Docs' })).toHaveClass(/radcn-navigation-menu-link/)
    await expect(navigationMenuDemo.getByRole('link', { name: 'Docs' })).toHaveClass(/radcn-docs-navigation-menu-trigger-link/)
    await expect(navigationMenuDemo.locator('.radcn-docs-navigation-menu-desktop-only')).toHaveCount(3)
    await expect(navigationMenuDemo.locator('[data-radcn-navigation-menu-viewport]')).toHaveAttribute('data-state', 'open')
    await expect(navigationMenuDemo.locator('[data-radcn-navigation-menu-indicator]')).toHaveAttribute('data-state', 'visible')

    let docsNavigationHome = navigationMenuDemo.getByRole('button', { name: 'Home' })
    let docsNavigationHomeContent = page.locator(`#${await docsNavigationHome.getAttribute('aria-controls')}`)
    await expect(docsNavigationHome).toHaveAttribute('aria-expanded', 'true')
    await expect(docsNavigationHomeContent.getByText('shadcn/ui')).toBeVisible()
    await expect(docsNavigationHomeContent.getByText('Beautifully designed components built with Tailwind CSS.')).toBeVisible()
    await expect(docsNavigationHomeContent.getByRole('link', { name: /Introduction/ })).toBeVisible()
    await expect(docsNavigationHomeContent.getByText('Re-usable components built using Radix UI and Tailwind CSS.')).toBeVisible()
    await expect(docsNavigationHomeContent.getByRole('link', { name: /Installation/ })).toBeVisible()
    await expect(docsNavigationHomeContent.getByText('How to install dependencies and structure your app.')).toBeVisible()
    await expect(docsNavigationHomeContent.getByRole('link', { name: /Typography/ })).toBeVisible()
    await expect(docsNavigationHomeContent.getByText('Styles for headings, paragraphs, lists...etc')).toBeVisible()

    await navigationMenuDemo.getByRole('button', { name: 'Components' }).focus()
    let docsNavigationComponents = navigationMenuDemo.getByRole('button', { name: 'Components' })
    let docsNavigationComponentsContent = page.locator(`#${await docsNavigationComponents.getAttribute('aria-controls')}`)
    for (let [title, description] of [
      ['Alert Dialog', 'A modal dialog that interrupts the user with important content and expects a response.'],
      ['Hover Card', 'For sighted users to preview content available behind a link.'],
      ['Progress', 'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.'],
      ['Scroll-area', 'Visually or semantically separates content.'],
      ['Tabs', 'A set of layered sections of content—known as tab panels—that are displayed one at a time.'],
      ['Tooltip', 'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.'],
    ]) {
      await expect(docsNavigationComponentsContent.getByRole('link', { name: new RegExp(title) })).toBeVisible()
      await expect(docsNavigationComponentsContent.getByText(description)).toBeVisible()
    }

    await navigationMenuDemo.getByRole('button', { name: 'List' }).focus()
    let docsNavigationList = navigationMenuDemo.getByRole('button', { name: 'List' })
    let docsNavigationListContent = page.locator(`#${await docsNavigationList.getAttribute('aria-controls')}`)
    await expect(docsNavigationListContent.getByText('Browse all components in the library.')).toBeVisible()
    await expect(docsNavigationListContent.getByText('Learn how to use the library.')).toBeVisible()
    await expect(docsNavigationListContent.getByText('Read our latest blog posts.')).toBeVisible()

    await navigationMenuDemo.getByRole('button', { name: 'Simple' }).focus()
    let docsNavigationSimple = navigationMenuDemo.getByRole('button', { name: 'Simple' })
    let docsNavigationSimpleContent = page.locator(`#${await docsNavigationSimple.getAttribute('aria-controls')}`)
    await expect(docsNavigationSimpleContent.getByRole('link', { name: 'Components' })).toBeVisible()
    await expect(docsNavigationSimpleContent.getByRole('link', { name: 'Documentation' })).toBeVisible()
    await expect(docsNavigationSimpleContent.getByRole('link', { name: 'Blocks' })).toBeVisible()

    await navigationMenuDemo.getByRole('button', { name: 'With Icon' }).focus()
    let docsNavigationWithIcon = navigationMenuDemo.getByRole('button', { name: 'With Icon' })
    let docsNavigationWithIconContent = page.locator(`#${await docsNavigationWithIcon.getAttribute('aria-controls')}`)
    await expect(docsNavigationWithIconContent.getByRole('link', { name: 'Backlog' })).toBeVisible()
    await expect(docsNavigationWithIconContent.getByRole('link', { name: 'To Do' })).toBeVisible()
    await expect(docsNavigationWithIconContent.getByRole('link', { name: 'Done' })).toBeVisible()
    await expect(docsNavigationWithIconContent.locator('[data-radcn-docs-navigation-menu-icon]')).toHaveText(['?', 'o', '✓'])
    await page.keyboard.press('Escape')
    await expect(navigationMenuDemo.locator('[data-radcn-navigation-menu-viewport]')).toBeHidden()
    await expect(page.getByText('The Docs link uses the public NavigationMenuLink class as the RadCN equivalent of upstream navigationMenuTriggerStyle().').first()).toBeVisible()
    await expect(page.getByText('The upstream viewport={isMobile} recipe maps to explicit NavigationMenuViewport composition plus documented app-owned responsive behavior.').first()).toBeVisible()
    await expect(page.getByText('use client, React state, Next Link, useIsMobile, Radix Navigation Menu, and cva map to server-rendered RadCN markup plus scoped enhanceNavigationMenu browser behavior.').first()).toBeVisible()
    await expect(page.getByText('lucide ChevronDownIcon, CircleHelpIcon, CircleIcon, and CircleCheckIcon remain app presentation and are not RadCN dependencies.').first()).toBeVisible()
    await expect(page.getByText('NavigationMenuIndicator is package capability evidence; the upstream demo relies on root-rendered viewport behavior rather than explicitly rendering an indicator.').first()).toBeVisible()
    await expect(page.getByText('Vendor source remains read-only evidence and is not imported by RadCN.').first()).toBeVisible()

    await page.goto('/docs/components/pagination')
    let paginationDemo = page.locator('[data-radcn-docs-pagination-family="pagination-demo"]')
    await expect(paginationDemo).toBeVisible()
    await expect(paginationDemo.getByRole('navigation', { name: 'pagination' })).toHaveAttribute('data-radcn-pagination', '')
    await expect(paginationDemo.locator('[data-radcn-pagination-content]')).toHaveCount(1)
    await expect(paginationDemo.locator('[data-radcn-pagination-item]')).toHaveCount(6)
    await expect(paginationDemo.locator('[data-radcn-pagination-link]')).toHaveCount(5)
    await expect(paginationDemo.locator('[data-radcn-pagination-previous-text]')).toHaveText('Previous')
    await expect(paginationDemo.locator('[data-radcn-pagination-next-text]')).toHaveText('Next')
    await expect(paginationDemo.locator('[data-radcn-pagination-link]').nth(1)).toHaveText('1')
    await expect(paginationDemo.locator('[data-radcn-pagination-link][aria-current="page"]')).toHaveText('2')
    await expect(paginationDemo.locator('[data-radcn-pagination-link][aria-current="page"]')).toHaveAttribute('data-active', 'true')
    await expect(paginationDemo.locator('[data-radcn-pagination-link]').nth(3)).toHaveText('3')
    await expect(paginationDemo.locator('[data-radcn-pagination-ellipsis]')).toHaveText('...More pages')
    await expect(paginationDemo.locator('[data-radcn-pagination-ellipsis] .radcn-sr-only')).toHaveText('More pages')
    await expect(paginationDemo.locator('[data-radcn-pagination-icon="previous"]')).toHaveText('<')
    await expect(paginationDemo.locator('[data-radcn-pagination-icon="next"]')).toHaveText('>')
    await expect(paginationDemo.getByRole('link', { name: 'Go to previous page' })).toHaveAttribute('href', '#')
    await expect(paginationDemo.getByRole('link', { name: 'Go to next page' })).toHaveAttribute('href', '#')
    await expect(page.getByText('export function PaginationDemo()').first()).toBeVisible()
    await expect(page.getByText('<PaginationLink href="#" isActive>').first()).toBeVisible()
    await expect(page.getByText('buttonVariants and Button size typing map to radcn-pagination-link classes').first()).toBeVisible()
    await expect(page.getByText('className maps to class, cn maps to explicit class composition, and data-slot maps to public data-radcn-pagination').first()).toBeVisible()
    await expect(page.getByText('lucide ChevronLeftIcon, ChevronRightIcon, and MoreHorizontalIcon map to RadCN-owned icon affordance hooks').first()).toBeVisible()
    await expect(page.getByText('Tailwind mx-auto, flex, gap, size, px, hidden sm:block, ghost, outline, and active utilities').first()).toBeVisible()
    await expect(page.getByText('The named docs demo uses upstream href="#" values').first()).toBeVisible()
    await expect(page.getByText('Vendor source remains read-only evidence and is not imported by RadCN.').first()).toBeVisible()

    await page.goto('/docs/components/popover')
    let popoverDemo = page.locator('[data-radcn-docs-popover-family="popover-demo"]')
    let popoverTrigger = popoverDemo.locator('[data-radcn-popover-trigger]')
    let popoverContent = page.locator('[data-radcn-popover-content]').first()
    await expect(popoverDemo).toBeVisible()
    await expect(popoverDemo.locator('[data-radcn-popover]')).toHaveAttribute('id', 'docs-popover-demo')
    await expect(popoverTrigger).toHaveText('Open popover')
    await expect(popoverTrigger).toHaveClass(/radcn-button/)
    await expect(popoverTrigger).toHaveClass(/radcn-button--outline/)
    await expect(popoverContent).toBeHidden()
    await popoverTrigger.click()
    await expect(popoverContent).toBeVisible()
    await expect(popoverTrigger).toHaveAttribute('aria-expanded', 'true')
    await expect(popoverContent).toHaveAttribute('data-align', 'center')
    await expect(popoverContent).toHaveAttribute('data-side', 'bottom')
    await expect(popoverContent).toHaveAttribute('data-side-offset', '4')
    await expect(popoverContent).toHaveClass(/w-80/)
    await expect(popoverContent).toHaveCSS('width', '320px')
    await expect(page.locator('[data-radcn-portal-root] [data-radcn-popover-portal]')).toHaveCount(1)
    await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden')
    await expect(popoverContent.getByRole('heading', { name: 'Dimensions' })).toBeVisible()
    await expect(popoverContent.getByText('Set the dimensions for the layer.')).toBeVisible()
    for (let [label, id, value] of [
      ['Width', 'docs-popover-demo-width', '100%'],
      ['Max. width', 'docs-popover-demo-maxWidth', '300px'],
      ['Height', 'docs-popover-demo-height', '25px'],
      ['Max. height', 'docs-popover-demo-maxHeight', 'none'],
    ]) {
      let input = popoverContent.getByLabel(label, { exact: true })
      await expect(input).toHaveAttribute('id', id)
      await expect(input).toHaveValue(value)
    }
    await page.keyboard.press('Escape')
    await expect(popoverContent).toBeHidden()
    await expect(popoverTrigger).toHaveAttribute('aria-expanded', 'false')
    await expect(page.getByText('export function PopoverDemo()').first()).toBeVisible()
    await expect(page.getByText('<PopoverContent class="w-80" style="width:20rem;">').first()).toBeVisible()
    await expect(page.getByText('PopoverTrigger asChild and Button variant="outline" map to explicit trigger styling').first()).toBeVisible()
    await expect(page.getByText('Radix implicit Popover portal maps to explicit PopoverPortal composition').first()).toBeVisible()
    await expect(page.getByText('className maps to class, cn maps to explicit class composition, and data-slot maps to public data-radcn-popover').first()).toBeVisible()
    await expect(page.getByText('Tailwind grid, gap, width, col-span, height, leading, font, text-sm, muted foreground, transition, data-state, and data-side utilities').first()).toBeVisible()
    await expect(page.getByText('Input defaultValue maps to RadCN Input value').first()).toBeVisible()
    await expect(page.getByText('Vendor source remains read-only evidence and is not imported by RadCN.').first()).toBeVisible()

    await page.goto('/docs/components/progress')
    let progressDemo = page.locator('[data-radcn-docs-progress-family="progress-demo"]')
    let progress = progressDemo.locator('progress[data-radcn-progress]')
    let progressWrapper = progressDemo.locator('[data-radcn-progress-wrapper]')
    let progressIndicator = progressDemo.locator('[data-radcn-progress-indicator]')
    await expect(progressDemo).toBeVisible()
    await expect(progress).toHaveAttribute('aria-label', 'Progress')
    await expect(progress).toHaveAttribute('max', '100')
    await expect(progress).toHaveAttribute('value', '13')
    await expect(progressWrapper).toHaveAttribute('data-state', 'determinate')
    await expect(progressWrapper).toHaveClass(/w-\[60%\]/)
    await expect(progressWrapper).toHaveAttribute('style', /width:60%/)
    await expect(progressDemo.locator('[data-radcn-progress-track]')).toHaveCount(1)
    await expect(progressIndicator).toHaveAttribute('style', 'width:13%')
    await expect(progress).toHaveAttribute('value', '66', { timeout: 1500 })
    await expect(progressIndicator).toHaveAttribute('style', 'width: 66%;')
    await expect(page.getByText('export function ProgressDemo()').first()).toBeVisible()
    await expect(page.getByText('value={13}').first()).toBeVisible()
    await expect(page.getByText('style="width:60%;"').first()).toBeVisible()
    await expect(page.getByText('use client, React useState, React useEffect, and the 500ms timeout map to scoped dependency-free browser behavior').first()).toBeVisible()
    await expect(page.getByText('ProgressPrimitive.Root maps to data-radcn-progress-wrapper plus the native progress element').first()).toBeVisible()
    await expect(page.getByText('className maps to class, cn maps to explicit class composition, and data-slot maps to public data-radcn-progress').first()).toBeVisible()
    await expect(page.getByText('Upstream translateX indicator movement maps to equivalent visible percentage progress through indicator width').first()).toBeVisible()
    await expect(page.getByText('Vendor source remains read-only evidence and is not imported by RadCN.').first()).toBeVisible()

    await page.goto('/docs/components/radio-group')
    let radioGroupDemo = page.locator('[data-radcn-docs-radio-group-family="radio-group-demo"]')
    let radioGroup = radioGroupDemo.locator('[data-radcn-radio-group]')
    await expect(radioGroupDemo).toBeVisible()
    await expect(radioGroup).toHaveAttribute('role', 'radiogroup')
    await expect(radioGroup).toHaveAttribute('data-name', 'radio-group-demo')
    await expect(radioGroupDemo.locator('[data-radcn-radio-item]')).toHaveCount(3)
    await expect(radioGroupDemo.locator('[data-radcn-radio-input]')).toHaveCount(3)
    await expect(radioGroupDemo.locator('[data-radcn-radio-indicator]')).toHaveCount(3)
    await expect(radioGroupDemo.locator('[data-radcn-docs-radio-group-row]')).toHaveCount(3)
    await expect(radioGroupDemo.locator('[data-radcn-docs-radio-group-row]').first()).toHaveClass(/flex/)
    await expect(radioGroupDemo.locator('[data-radcn-docs-radio-group-row]').first()).toHaveClass(/items-center/)
    await expect(radioGroupDemo.locator('[data-radcn-docs-radio-group-row]').first()).toHaveClass(/gap-3/)
    await expect(radioGroupDemo.locator('[data-radcn-docs-radio-group-row]').first()).toHaveCSS('display', 'flex')
    await expect(radioGroupDemo.locator('[data-radcn-docs-radio-group-row]').first()).toHaveCSS('align-items', 'center')
    await expect(radioGroupDemo.locator('[data-radcn-docs-radio-group-row]').first()).toHaveCSS('gap', '12px')
    for (let [label, id, value] of [
      ['Default', 'r1', 'default'],
      ['Comfortable', 'r2', 'comfortable'],
      ['Compact', 'r3', 'compact'],
    ]) {
      let input = radioGroupDemo.getByLabel(label, { exact: true })
      await expect(input).toHaveAttribute('id', id)
      await expect(input).toHaveAttribute('name', 'radio-group-demo')
      await expect(input).toHaveAttribute('value', value)
    }
    await expect(radioGroupDemo.locator('#r2')).toBeChecked()
    await expect(radioGroupDemo.locator('[data-radcn-radio-item]').nth(1)).toHaveAttribute('data-state', 'checked')
    await radioGroupDemo.getByLabel('Compact', { exact: true }).check()
    await expect(radioGroupDemo.locator('#r3')).toBeChecked()
    await expect(radioGroupDemo.locator('#r2')).not.toBeChecked()
    await expect(page.getByText('export function RadioGroupDemo()').first()).toBeVisible()
    await expect(page.getByText('<RadioGroupItem value="comfortable" id="r2" name="radio-group-demo" checked />').first()).toBeVisible()
    await expect(page.getByText('use client, React component props, and Radix Radio Group primitives map to server-rendered RadCN markup with native radio inputs.').first()).toBeVisible()
    await expect(page.getByText('RadioGroupPrimitive.Root maps to data-radcn-radio-group').first()).toBeVisible()
    await expect(page.getByText('lucide CircleIcon maps to package CSS indicator presentation').first()).toBeVisible()
    await expect(page.getByText('className maps to class, cn maps to explicit class composition, and data-slot maps to public data-radcn-radio').first()).toBeVisible()
    await expect(page.getByText('Label htmlFor maps to RadCN Label for while preserving native label/input association.').first()).toBeVisible()
    await expect(page.getByText('Vendor source remains read-only evidence and is not imported by RadCN.').first()).toBeVisible()

    await page.goto('/docs/components/table')
    let tableDemo = page.locator('[data-radcn-docs-table-family="table-demo"]')
    await expect(tableDemo).toBeVisible()
    await expect(tableDemo.locator('[data-radcn-table-container]')).toHaveCount(1)
    await expect(tableDemo.locator('table[data-radcn-table]')).toHaveCount(1)
    await expect(tableDemo.locator('caption[data-radcn-table-caption]')).toHaveText('A list of your recent invoices.')
    await expect(tableDemo.locator('thead[data-radcn-table-header]')).toHaveCount(1)
    await expect(tableDemo.locator('tbody[data-radcn-table-body]')).toHaveCount(1)
    await expect(tableDemo.locator('tfoot[data-radcn-table-footer]')).toHaveCount(1)
    let tableRows = tableDemo.locator('tbody[data-radcn-table-body] tr[data-radcn-table-row]')
    await expect(tableRows).toHaveCount(7)
    await expect(tableDemo.getByRole('columnheader', { name: 'Invoice' })).toHaveAttribute('scope', 'col')
    await expect(tableDemo.getByRole('columnheader', { name: 'Invoice' })).toHaveClass(/w-\[100px\]/)
    await expect(tableDemo.getByRole('columnheader', { name: 'Invoice' })).toHaveCSS('width', '100px')
    await expect(tableDemo.getByRole('columnheader', { name: 'Status' })).toBeVisible()
    await expect(tableDemo.getByRole('columnheader', { name: 'Method' })).toBeVisible()
    await expect(tableDemo.getByRole('columnheader', { name: 'Amount' })).toHaveClass(/text-right/)
    await expect(tableDemo.getByRole('columnheader', { name: 'Amount' })).toHaveCSS('text-align', 'right')
    for (let [index, [invoice, status, method, amount]] of [
      ['INV001', 'Paid', 'Credit Card', '$250.00'],
      ['INV002', 'Pending', 'PayPal', '$150.00'],
      ['INV003', 'Unpaid', 'Bank Transfer', '$350.00'],
      ['INV004', 'Paid', 'Credit Card', '$450.00'],
      ['INV005', 'Paid', 'PayPal', '$550.00'],
      ['INV006', 'Pending', 'Bank Transfer', '$200.00'],
      ['INV007', 'Unpaid', 'Credit Card', '$300.00'],
    ].entries()) {
      let row = tableRows.nth(index)
      await expect(row.locator('[data-radcn-table-cell]').nth(0)).toHaveText(invoice)
      await expect(row.locator('[data-radcn-table-cell]').nth(0)).toHaveClass(/font-medium/)
      await expect(row.locator('[data-radcn-table-cell]').nth(0)).toHaveCSS('font-weight', '500')
      await expect(row.locator('[data-radcn-table-cell]').nth(1)).toHaveText(status)
      await expect(row.locator('[data-radcn-table-cell]').nth(2)).toHaveText(method)
      await expect(row.locator('[data-radcn-table-cell]').nth(3)).toHaveText(amount)
      await expect(row.locator('[data-radcn-table-cell]').nth(3)).toHaveClass(/text-right/)
      await expect(row.locator('[data-radcn-table-cell]').nth(3)).toHaveCSS('text-align', 'right')
    }
    let tableFooterCells = tableDemo.locator('tfoot[data-radcn-table-footer] [data-radcn-table-cell]')
    await expect(tableFooterCells.nth(0)).toHaveText('Total')
    await expect(tableFooterCells.nth(0)).toHaveAttribute('colspan', '3')
    await expect(tableFooterCells.nth(1)).toHaveText('$2,500.00')
    await expect(tableFooterCells.nth(1)).toHaveClass(/text-right/)
    await expect(tableFooterCells.nth(1)).toHaveCSS('text-align', 'right')
    await expect(page.getByText('export function TableDemo()').first()).toBeVisible()
    await expect(page.getByText('<TableCell colSpan={3}>Total</TableCell>').first()).toBeVisible()
    await expect(page.getByText('use client and React intrinsic ComponentProps aliases map to explicit Remix UI props and native table elements.').first()).toBeVisible()
    await expect(page.getByText('data-slot maps to public data-radcn-table-container').first()).toBeVisible()
    await expect(page.getByText('className maps to class, cn maps to explicit class composition, and Tailwind utilities map to package CSS').first()).toBeVisible()
    await expect(page.getByText('radcn/data-table is related composition evidence, not a substitute for direct plain Table example parity.').first()).toBeVisible()
    await expect(page.getByText('Vendor source remains read-only evidence and is not imported by RadCN.').first()).toBeVisible()

    await page.goto('/docs/components/slider')
    let sliderDemo = page.locator('[data-radcn-docs-slider-family="slider-demo"]')
    let sliderRoot = sliderDemo.locator('[data-radcn-slider]')
    let sliderInput = sliderDemo.locator('[data-radcn-slider-input]')
    await expect(sliderDemo).toBeVisible()
    await expect(sliderDemo).toHaveAttribute('data-radcn-docs-slider-width', '60')
    await expect(sliderRoot).toHaveAttribute('data-value', '50')
    await expect(sliderRoot).toHaveAttribute('data-min', '0')
    await expect(sliderRoot).toHaveAttribute('data-max', '100')
    await expect(sliderRoot).toHaveAttribute('data-step', '1')
    await expect(sliderRoot).toHaveAttribute('data-orientation', 'horizontal')
    await expect(sliderRoot).toHaveClass(/w-\[60%\]/)
    await expect(sliderRoot).toHaveAttribute('style', /width:60%/)
    await expect(sliderInput).toHaveJSProperty('type', 'range')
    await expect(sliderInput).toHaveAttribute('name', 'slider-demo')
    await expect(sliderInput).toHaveAttribute('min', '0')
    await expect(sliderInput).toHaveAttribute('max', '100')
    await expect(sliderInput).toHaveAttribute('step', '1')
    await expect(sliderInput).toHaveValue('50')
    await expect(sliderInput).toHaveAccessibleName('Slider')
    await expect(sliderDemo.locator('[data-radcn-slider-track]')).toHaveCount(1)
    await expect(sliderDemo.locator('[data-radcn-slider-range]')).toHaveCount(1)
    await expect(sliderDemo.locator('[data-radcn-slider-thumb]')).toHaveCount(1)
    await expect(
      await sliderRoot.evaluate((node) => getComputedStyle(node).getPropertyValue('--radcn-slider-percent').trim()),
    ).toBe('50%')
    await expect(page.getByText('export function SliderDemo').first()).toBeVisible()
    await expect(page.getByText('defaultValue={50}').first()).toBeVisible()
    await expect(page.getByText('style="width:60%;"').first()).toBeVisible()
    await expect(page.getByText('The named demo maps upstream defaultValue={[50]} to scalar defaultValue={50}').first()).toBeVisible()
    await expect(page.getByText('use client, React component props, React.ComponentProps<typeof Slider>, and React useMemo map to explicit Remix UI props plus browser-owned range state.').first()).toBeVisible()
    await expect(page.getByText('Radix SliderPrimitive.Root, SliderPrimitive.Track, SliderPrimitive.Range, and SliderPrimitive.Thumb map to RadCN root').first()).toBeVisible()
    await expect(page.getByText('className maps to class, cn maps to explicit class composition, and data-slot maps to public data-radcn-slider').first()).toBeVisible()
    await expect(page.getByText('Vendor source remains read-only evidence and is not imported by RadCN.').first()).toBeVisible()

    await page.goto('/docs/components/switch')
    let switchDemo = page.locator('[data-radcn-docs-switch-family="switch-demo"]')
    let switchRoot = switchDemo.locator('[data-radcn-switch-wrapper]')
    let switchInput = switchDemo.locator('[data-radcn-switch-input]')
    let switchLabel = switchDemo.locator('[data-radcn-label]')
    await expect(switchDemo).toBeVisible()
    await expect(switchDemo).toHaveClass(/flex/)
    await expect(switchDemo).toHaveClass(/items-center/)
    await expect(switchDemo).toHaveClass(/space-x-2/)
    await expect(switchDemo).toHaveCSS('display', 'flex')
    await expect(switchDemo).toHaveCSS('align-items', 'center')
    await expect(switchDemo).toHaveCSS('gap', '8px')
    await expect(switchRoot).toHaveAttribute('data-state', 'unchecked')
    await expect(switchRoot).toHaveAttribute('data-size', 'default')
    await expect(switchInput).toHaveAttribute('id', 'airplane-mode')
    await expect(switchInput).toHaveAttribute('role', 'switch')
    await expect(switchInput).toHaveAttribute('type', 'checkbox')
    await expect(switchInput).toHaveAttribute('data-state', 'unchecked')
    await expect(switchInput).toHaveAttribute('data-size', 'default')
    await expect(switchInput).toHaveAccessibleName('Airplane Mode')
    await expect(switchInput).not.toBeChecked()
    await expect(switchDemo.locator('[data-radcn-switch-thumb]')).toHaveCount(1)
    await expect(switchLabel).toHaveAttribute('for', 'airplane-mode')
    await expect(switchLabel).toHaveText('Airplane Mode')
    await switchLabel.click()
    await expect(switchInput).toBeChecked()
    await expect(switchRoot).toHaveAttribute('data-state', 'checked')
    await expect(switchInput).toHaveAttribute('data-state', 'checked')
    await expect(page.getByText('export function SwitchDemo()').first()).toBeVisible()
    await expect(page.getByText('<Switch id="airplane-mode" />').first()).toBeVisible()
    await expect(page.getByText('<Label for="airplane-mode">Airplane Mode</Label>').first()).toBeVisible()
    await expect(page.getByText('use client, React component props, and React.ComponentProps<typeof SwitchPrimitive.Root> map to explicit Remix UI props').first()).toBeVisible()
    await expect(page.getByText('Radix SwitchPrimitive.Root maps to the RadCN switch wrapper plus native input').first()).toBeVisible()
    await expect(page.getByText('size = "default" maps to RadCN size="default" plus data-size="default" metadata.').first()).toBeVisible()
    await expect(page.getByText('Label htmlFor maps to RadCN Label for while preserving native label/input association.').first()).toBeVisible()
    await expect(page.getByText('Vendor source remains read-only evidence and is not imported by RadCN.').first()).toBeVisible()

    await page.goto('/docs/components/separator')
    let separatorDemo = page.locator('[data-radcn-docs-separator-family="separator-demo"]')
    let separatorHorizontal = separatorDemo.locator('[data-radcn-separator][data-orientation="horizontal"]')
    let separatorVertical = separatorDemo.locator('[data-radcn-separator][data-orientation="vertical"]')
    let separatorRow = separatorDemo.locator('[data-radcn-docs-separator-row]')
    await expect(separatorDemo).toBeVisible()
    await expect(separatorDemo.getByRole('heading', { name: 'Radix Primitives' })).toBeVisible()
    await expect(separatorDemo.getByText('An open-source UI component library.')).toBeVisible()
    await expect(separatorDemo.getByText('Blog', { exact: true })).toBeVisible()
    await expect(separatorDemo.getByText('Docs', { exact: true })).toBeVisible()
    await expect(separatorDemo.getByText('Source', { exact: true })).toBeVisible()
    await expect(separatorDemo.locator('[data-radcn-separator]')).toHaveCount(3)
    await expect(separatorHorizontal).toHaveCount(1)
    await expect(separatorHorizontal).toHaveClass(/my-4/)
    await expect(separatorHorizontal).toHaveAttribute('data-orientation', 'horizontal')
    await expect(separatorHorizontal).toHaveAttribute('role', 'none')
    await expect(separatorHorizontal).toHaveCSS('height', '1px')
    await expect(separatorVertical).toHaveCount(2)
    await expect(separatorVertical.first()).toHaveAttribute('data-orientation', 'vertical')
    await expect(separatorVertical.first()).toHaveAttribute('role', 'none')
    await expect(separatorVertical.first()).toHaveCSS('width', '1px')
    await expect(separatorRow).toHaveClass(/flex/)
    await expect(separatorRow).toHaveClass(/h-5/)
    await expect(separatorRow).toHaveClass(/items-center/)
    await expect(separatorRow).toHaveClass(/space-x-4/)
    await expect(separatorRow).toHaveClass(/text-sm/)
    await expect(separatorRow).toHaveCSS('display', 'flex')
    await expect(separatorRow).toHaveCSS('height', '20px')
    await expect(separatorRow).toHaveCSS('align-items', 'center')
    await expect(separatorRow).toHaveCSS('gap', '16px')
    await expect(separatorRow).toHaveCSS('font-size', '14px')
    await expect(page.getByText('export function SeparatorDemo()').first()).toBeVisible()
    await expect(page.getByText('<Separator class="my-4" style="margin:1rem 0;" />').first()).toBeVisible()
    await expect(page.getByText('use client, React component props, and Radix Separator primitive map to dependency-free server-rendered RadCN markup.').first()).toBeVisible()
    await expect(page.getByText('SeparatorPrimitive.Root maps to a div with data-radcn-separator and data-orientation.').first()).toBeVisible()
    await expect(page.getByText('className maps to class, cn maps to explicit class composition, and data-slot maps to public data-radcn-separator plus data-orientation hooks.').first()).toBeVisible()
    await expect(page.getByText('decorative={true} maps to role="none"; semantic decorative={false} maps to role="separator" with aria-orientation.').first()).toBeVisible()
    await expect(page.getByText('Vendor source remains read-only evidence and is not imported by RadCN.').first()).toBeVisible()

    await page.goto('/docs/components/data-table')
    let dataTableDemo = page.locator('[data-radcn-docs-data-table-family="data-table-demo"]')
    await expect(dataTableDemo).toBeVisible()
    await expect(dataTableDemo.locator('[data-radcn-data-table]')).toHaveAttribute('data-row-count', '5')
    await expect(dataTableDemo.locator('[data-radcn-data-table]')).toHaveAttribute('data-selected-count', '1')
    await expect(dataTableDemo.locator('[data-radcn-data-table-toolbar]')).toHaveCount(1)
    await expect(dataTableDemo.locator('[data-radcn-data-table-filter]')).toHaveCount(1)
    await expect(dataTableDemo.getByPlaceholder('Filter emails...')).toBeVisible()
    await expect(dataTableDemo.locator('[data-radcn-data-table-column-controls]')).toHaveCount(1)
    await expect(dataTableDemo.locator('[data-radcn-table]')).toHaveCount(1)
    await expect(dataTableDemo.locator('[data-radcn-data-table-empty]')).toHaveText('No results.')
    await expect(dataTableDemo.locator('[data-radcn-data-table-empty]')).toHaveAttribute('colspan', '5')
    await expect(dataTableDemo.locator('[data-radcn-data-table-selection-summary]')).toHaveText('1 of 5 row(s) selected.')
    await expect(dataTableDemo.getByRole('checkbox', { name: 'Select all' })).toHaveCount(1)
    await expect(dataTableDemo.getByRole('checkbox', { name: 'Select row' })).toHaveCount(5)
    await expect(dataTableDemo.locator('[data-radcn-checkbox-input][value="m5gr84i9"]')).toBeChecked()
    await expect(dataTableDemo.locator('[data-radcn-data-table-row][data-state="selected"]')).toHaveCount(1)
    await expect(dataTableDemo.getByRole('columnheader', { name: 'Status' })).toBeVisible()
    await expect(dataTableDemo.getByRole('columnheader', { name: /Email/ })).toHaveAttribute('aria-sort', 'ascending')
    await expect(dataTableDemo.locator('[data-radcn-data-table-sort]')).toContainText('Email')
    await expect(dataTableDemo.locator('[data-radcn-docs-data-table-icon="arrow-up-down"]')).toHaveText('↕')
    await expect(dataTableDemo.getByRole('columnheader', { name: 'Amount' })).toHaveCSS('text-align', 'right')
    await expect(dataTableDemo.getByRole('columnheader', { name: 'Actions' })).toHaveCSS('text-align', 'right')
    await expect(dataTableDemo.locator('[data-radcn-docs-data-table-icon="chevron-down"]')).toHaveText('v')
    await expect(dataTableDemo.locator('[data-radcn-docs-data-table-icon="more-horizontal"]').first()).toHaveText('...')
    for (let [id, status, statusLabel, email, amount] of [
      ['m5gr84i9', 'success', 'Success', 'ken99@example.com', '$316.00'],
      ['3u1reuv4', 'success', 'Success', 'abe45@example.com', '$242.00'],
      ['derv1ws0', 'processing', 'Processing', 'monserrat44@example.com', '$837.00'],
      ['5kma53ae', 'success', 'Success', 'silas22@example.com', '$874.00'],
      ['bhqecj4p', 'failed', 'Failed', 'carmella@example.com', '$721.00'],
    ]) {
      let emailCell = dataTableDemo.locator(`[data-payment-id="${id}"]`)
      let row = emailCell.locator('xpath=ancestor::tr')
      await expect(row.locator(`[data-payment-status="${status}"]`)).toHaveText(statusLabel)
      await expect(emailCell).toHaveText(email)
      await expect(row.getByText(amount)).toHaveCSS('text-align', 'right')
      await expect(row.getByText(amount)).toHaveCSS('font-weight', '500')
    }
    let docsColumnMenu = page.locator('#docs-data-table-columns-content')
    await expect(docsColumnMenu).toBeVisible()
    let docsColumnItems = docsColumnMenu.locator('[data-radcn-dropdown-menu-checkbox-item]')
    await expect(docsColumnItems).toHaveCount(3)
    await expect(docsColumnItems.nth(0)).toHaveAttribute('data-text', 'status')
    await expect(docsColumnItems.nth(1)).toHaveAttribute('data-text', 'email')
    await expect(docsColumnItems.nth(2)).toHaveAttribute('data-text', 'amount')
    await expect(docsColumnMenu).not.toContainText('select')
    await expect(docsColumnMenu).not.toContainText('actions')
    let docsRowMenu = page.locator('#docs-data-table-row-m5gr84i9-content')
    await expect(docsRowMenu).toBeVisible()
    await expect(docsRowMenu.locator('[data-radcn-dropdown-menu-label]')).toHaveText('Actions')
    await expect(docsRowMenu.locator('[data-radcn-dropdown-menu-item]')).toHaveText(['Copy payment ID', 'View customer', 'View payment details'])
    await expect(docsRowMenu.locator('[data-payment-copy-id="m5gr84i9"]')).toHaveText('Copy payment ID')
    await expect(dataTableDemo.getByRole('button', { name: 'Previous' })).toBeDisabled()
    await expect(dataTableDemo.getByRole('button', { name: 'Next' })).toBeEnabled()
    await expect(page.getByText('use client, React state, useReactTable, ColumnDef, row models, and flexRender map to explicit server state').first()).toBeVisible()
    await expect(page.getByText('TanStack Table remains an app choice, not a RadCN dependency.').first()).toBeVisible()
    await expect(page.getByText('lucide ArrowUpDown, ChevronDown, and MoreHorizontal map to app-owned icon presentation.').first()).toBeVisible()
    await expect(page.getByText('navigator.clipboard.writeText stays app-owned browser behavior around visible payment id data.').first()).toBeVisible()

    await page.goto('/docs/components/hover-card')
    let hoverCardDemo = page.locator('[data-radcn-docs-hover-card-family="hover-card-demo"]')
    await expect(hoverCardDemo).toBeVisible()
    await expect(hoverCardDemo.locator('[data-radcn-hover-card]')).toHaveAttribute('data-radcn-hover-card-ready', 'true')
    let hoverCardTrigger = hoverCardDemo.locator('[data-radcn-hover-card-trigger]')
    let hoverCardContent = page.locator('#docs-hover-card-demo-content')
    await expect(hoverCardTrigger).toHaveText('@nextjs')
    await expect(hoverCardTrigger).toHaveClass(/radcn-button--link/)
    await expect(hoverCardContent).toBeHidden()
    await hoverCardTrigger.hover()
    await expect(hoverCardContent).toBeVisible({ timeout: 1000 })
    await expect(hoverCardContent).toHaveAttribute('data-side', 'bottom')
    await expect(hoverCardContent).toHaveAttribute('data-align', 'center')
    await expect(hoverCardContent).toHaveAttribute('data-side-offset', '4')
    await expect(hoverCardContent).toHaveCSS('width', '320px')
    await expect(hoverCardContent.locator('[data-radcn-avatar]')).toHaveCount(1)
    await expect(hoverCardContent.locator('[data-radcn-avatar-image]')).toHaveAttribute('src', 'https://github.com/vercel.png')
    await expect(hoverCardContent.locator('[data-radcn-avatar-image]')).toHaveAttribute('alt', '@vercel')
    await expect(hoverCardContent.locator('[data-radcn-avatar-fallback]')).toHaveText('VC')
    await expect(hoverCardContent.locator('[data-radcn-docs-hover-card-layout="profile"]')).toBeVisible()
    await expect(hoverCardContent.getByRole('heading', { name: '@nextjs' })).toBeVisible()
    await expect(hoverCardContent.getByText('The React Framework – created and maintained by @vercel.')).toBeVisible()
    await expect(hoverCardContent.getByText('Joined December 2021')).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(hoverCardContent).toBeHidden()
    await hoverCardTrigger.focus()
    await expect(hoverCardContent).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(hoverCardContent).toBeHidden()
    await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden')
    await expect(page.getByText('use client and Radix Hover Card primitives map to server-rendered Remix UI markup plus scoped enhanceHoverCard browser behavior.').first()).toBeVisible()
    await expect(page.getByText('HoverCardTrigger asChild maps to explicit RadCN trigger styling; RadCN does not need Slot for this example.').first()).toBeVisible()
    await expect(page.getByText('The upstream CalendarIcon import is unused source noise and does not introduce an icon dependency.').first()).toBeVisible()

    await page.goto('/docs/components/accordion')
    let accordionDemo = page.locator('[data-radcn-docs-accordion-family="accordion-demo"]')
    await expect(accordionDemo).toBeVisible()
    await expect(accordionDemo.locator('[data-radcn-accordion]')).toHaveAttribute('data-type', 'single')
    await expect(accordionDemo.locator('[data-radcn-accordion]')).toHaveAttribute('data-collapsible', 'true')
    await expect(accordionDemo.locator('[data-radcn-accordion]')).toHaveAttribute('data-default-value', 'item-1')
    await expect(accordionDemo.locator('[data-radcn-accordion]')).toHaveAttribute('data-accordion-name', 'accordion-demo')
    await expect(accordionDemo.locator('[data-radcn-accordion]')).toHaveClass(/w-full/)
    await expect(accordionDemo.locator('[data-radcn-accordion-item]')).toHaveCount(3)
    for (let index = 0; index < 3; index += 1) {
      await expect(accordionDemo.locator('[data-radcn-accordion-item]').nth(index)).toHaveAttribute('name', 'accordion-demo')
    }
    await expect(accordionDemo.locator('[data-radcn-accordion-item]').nth(0)).toHaveAttribute('data-value', 'item-1')
    await expect(accordionDemo.locator('[data-radcn-accordion-item]').nth(1)).toHaveAttribute('data-value', 'item-2')
    await expect(accordionDemo.locator('[data-radcn-accordion-item]').nth(2)).toHaveAttribute('data-value', 'item-3')
    await expect(accordionDemo.locator('[data-radcn-accordion-item]').nth(0)).toHaveAttribute('data-state', 'open')
    await expect(accordionDemo.locator('[data-radcn-accordion-item]').nth(1)).toHaveAttribute('data-state', 'closed')
    await expect(accordionDemo.locator('[data-radcn-accordion-item]').nth(2)).toHaveAttribute('data-state', 'closed')
    await expect(accordionDemo.locator('[data-radcn-accordion-item]').nth(0)).toHaveAttribute('open', '')
    await expect(accordionDemo.locator('[data-radcn-accordion-trigger]')).toHaveCount(3)
    await expect(accordionDemo.locator('[data-radcn-accordion-trigger-text]')).toHaveText([
      'Product Information',
      'Shipping Details',
      'Return Policy',
    ])
    await expect(accordionDemo.locator('[data-radcn-accordion-icon]')).toHaveCount(3)
    await expect(accordionDemo.locator('[data-radcn-accordion-content]')).toHaveClass([
      /flex flex-col gap-4 text-balance/,
      /flex flex-col gap-4 text-balance/,
      /flex flex-col gap-4 text-balance/,
    ])
    await expect(accordionDemo).toContainText('Our flagship product combines cutting-edge technology with sleek design.')
    await expect(accordionDemo).toContainText('Key features include advanced processing capabilities, and an intuitive user interface designed for both beginners and experts.')
    await expect(accordionDemo).toContainText('We offer worldwide shipping through trusted courier partners.')
    await expect(accordionDemo).toContainText('All orders are carefully packaged and fully insured. Track your shipment in real-time through our dedicated tracking portal.')
    await expect(accordionDemo).toContainText("We stand behind our products with a comprehensive 30-day return policy. If you're not completely satisfied, simply return the item in its original condition.")
    await expect(accordionDemo).toContainText('Our hassle-free return process includes free return shipping and full refunds processed within 48 hours of receiving the returned item.')
    await expect(page.getByText('Root defaultValue and name are metadata hooks').first()).toBeVisible()
    await expect(page.getByText('Radix Accordion maps to browser-native details/summary markup').first()).toBeVisible()
    await expect(page.getByText('lucide ChevronDownIcon maps to the package-owned accordion icon hook').first()).toBeVisible()
    await expect(page.getByText('Tailwind flex, gap, and text-balance content utilities map to class').first()).toBeVisible()

    await page.goto('/docs/components/alert-dialog')
    let alertDialogDemo = page.locator('[data-radcn-docs-alert-dialog-family="alert-dialog-demo"]')
    await expect(alertDialogDemo).toBeVisible()
    await expect(alertDialogDemo.locator('[data-radcn-alert-dialog]')).toHaveAttribute('data-state', 'closed')
    await expect(alertDialogDemo.locator('[data-radcn-alert-dialog-trigger]')).toHaveText('Show Dialog')
    await expect(alertDialogDemo.locator('[data-radcn-alert-dialog-trigger]')).toHaveAttribute('aria-haspopup', 'dialog')
    await expect(alertDialogDemo.locator('[data-radcn-alert-dialog-trigger]')).toHaveClass(/radcn-button/)
    await expect(alertDialogDemo.locator('[data-radcn-alert-dialog-trigger]')).toHaveClass(/radcn-button--outline/)
    await expect(alertDialogDemo.locator('[data-radcn-alert-dialog-portal]')).toHaveCount(1)
    await expect(alertDialogDemo.locator('[data-radcn-alert-dialog-overlay]')).toHaveCount(1)
    await expect(alertDialogDemo.locator('[data-radcn-alert-dialog-content]')).toBeVisible()
    await expect(alertDialogDemo.locator('[data-radcn-alert-dialog-content]')).toHaveAttribute('data-size', 'default')
    await expect(alertDialogDemo.locator('[data-radcn-alert-dialog-header]')).toHaveCount(1)
    await expect(alertDialogDemo.locator('[data-radcn-alert-dialog-title]')).toHaveText('Are you absolutely sure?')
    await expect(alertDialogDemo.locator('[data-radcn-alert-dialog-description]')).toHaveText(
      'This action cannot be undone. This will permanently delete your account and remove your data from our servers.',
    )
    await expect(alertDialogDemo.locator('[data-radcn-alert-dialog-footer]')).toHaveCount(1)
    await expect(alertDialogDemo.locator('[data-radcn-alert-dialog-cancel]')).toHaveText('Cancel')
    await expect(alertDialogDemo.locator('[data-radcn-alert-dialog-action]')).toHaveText('Continue')
    await expect(alertDialogDemo.locator('[data-radcn-alert-dialog-media]')).toHaveCount(0)
    await expect(page.getByText('Button asChild maps to explicit AlertDialogTrigger styling').first()).toBeVisible()
    await expect(page.getByText('Radix AlertDialog map to dependency-free Remix UI markup').first()).toBeVisible()
    await expect(page.getByText('className maps to class, data-slot maps to data-radcn-alert-dialog').first()).toBeVisible()
    await expect(page.getByText('Tailwind fixed positioning, overlay/content animation utilities').first()).toBeVisible()
    await expect(page.getByText('Content size defaults to data-size="default"').first()).toBeVisible()
    await expect(page.getByText('AlertDialogMedia is intentionally omitted').first()).toBeVisible()
    await expect(page.getByText('Vendor source remains read-only evidence').first()).toBeVisible()

    await page.goto('/docs/components/aspect-ratio')
    let aspectRatioDemo = page.locator('[data-radcn-docs-aspect-ratio-family="aspect-ratio-demo"]')
    let aspectRatioImage = aspectRatioDemo.locator('[data-radcn-docs-aspect-ratio-image]')
    await expect(aspectRatioDemo).toBeVisible()
    await expect(aspectRatioDemo).toHaveAttribute('data-radcn-theme', 'dark')
    await expect(aspectRatioDemo.locator('[data-radcn-aspect-ratio]')).toHaveClass(/radcn-docs-aspect-ratio-demo/)
    await expect(aspectRatioDemo.locator('[data-radcn-aspect-ratio]')).toHaveClass(/rounded-lg/)
    await expect(aspectRatioDemo.locator('[data-radcn-aspect-ratio]')).toHaveClass(/bg-muted/)
    await expect(aspectRatioDemo.locator('[data-radcn-aspect-ratio]')).toHaveCSS('overflow', 'hidden')
    await expect(aspectRatioImage).toHaveAttribute('alt', 'Photo by Drew Beamer')
    await expect(aspectRatioImage).toHaveAttribute('data-radcn-docs-image-source', 'remote-unsplash')
    await expect(aspectRatioImage).toHaveAttribute('src', 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80')
    await expect(aspectRatioImage).toHaveClass(/h-full/)
    await expect(aspectRatioImage).toHaveClass(/w-full/)
    await expect(aspectRatioImage).toHaveClass(/rounded-lg/)
    await expect(aspectRatioImage).toHaveClass(/object-cover/)
    await expect(aspectRatioImage).toHaveClass(/dark:brightness-\[0\.2\]/)
    await expect(aspectRatioImage).toHaveClass(/dark:grayscale/)
    await expect(aspectRatioImage).toHaveCSS('object-fit', 'cover')
    await expect(aspectRatioImage).toHaveCSS('filter', 'brightness(0.2) grayscale(1)')
    await expect(page.getByText('Next Image fill maps to a native img').first()).toBeVisible()
    await expect(page.getByText('React client component markers and Radix AspectRatio map to dependency-free CSS aspect-ratio markup').first()).toBeVisible()
    await expect(page.getByText('Next Image is not a RadCN dependency').first()).toBeVisible()
    await expect(page.getByText('data-slot="aspect-ratio" maps to data-radcn-aspect-ratio').first()).toBeVisible()
    await expect(page.getByText('Tailwind rounded-lg, bg-muted, h-full, w-full, object-cover').first()).toBeVisible()
    await expect(page.getByText('Remote image loading remains app-owned').first()).toBeVisible()

    await page.goto('/docs/components/avatar')
    let avatarDemo = page.locator('[data-radcn-docs-avatar-family="avatar-demo"]')
    let avatarRow = avatarDemo.locator('[data-radcn-docs-avatar-row]')
    let avatars = avatarDemo.locator('[data-radcn-avatar]')
    let images = avatarDemo.locator('[data-radcn-avatar-image]')
    let fallbacks = avatarDemo.locator('[data-radcn-avatar-fallback]')
    let group = avatarDemo.locator('[data-radcn-avatar-group]')
    await expect(avatarDemo).toBeVisible()
    await expect(avatarRow).toHaveClass(/flex/)
    await expect(avatarRow).toHaveClass(/flex-row/)
    await expect(avatarRow).toHaveClass(/flex-wrap/)
    await expect(avatarRow).toHaveClass(/items-center/)
    await expect(avatarRow).toHaveClass(/gap-12/)
    await expect(avatarRow).toHaveCSS('display', 'flex')
    await expect(avatarRow).toHaveCSS('gap', '48px')
    await expect(avatars).toHaveCount(5)
    await expect(images).toHaveCount(5)
    await expect(fallbacks).toHaveText(['CN', 'ER', 'CN', 'LR', 'ER'])
    await expect(images.nth(0)).toHaveAttribute('src', 'https://github.com/shadcn.png')
    await expect(images.nth(0)).toHaveAttribute('alt', '@shadcn')
    await expect(images.nth(1)).toHaveAttribute('src', 'https://github.com/evilrabbit.png')
    await expect(images.nth(1)).toHaveAttribute('alt', '@evilrabbit')
    await expect(images.nth(2)).toHaveAttribute('src', 'https://github.com/shadcn.png')
    await expect(images.nth(2)).toHaveAttribute('alt', '@shadcn')
    await expect(images.nth(3)).toHaveAttribute('src', 'https://github.com/maxleiter.png')
    await expect(images.nth(3)).toHaveAttribute('alt', '@maxleiter')
    await expect(images.nth(4)).toHaveAttribute('src', 'https://github.com/evilrabbit.png')
    await expect(images.nth(4)).toHaveAttribute('alt', '@evilrabbit')
    for (let index = 0; index < 5; index += 1) {
      await expect(fallbacks.nth(index)).toHaveAttribute('aria-hidden', 'true')
    }
    let docsDefaultRadius = await avatars.nth(0).evaluate((node) => getComputedStyle(node).borderRadius)
    let docsRoundedRadius = await avatars.nth(1).evaluate((node) => getComputedStyle(node).borderRadius)
    expect(docsDefaultRadius).toBe('999px')
    expect(docsRoundedRadius).not.toBe(docsDefaultRadius)
    await expect(avatars.nth(1)).toHaveClass(/rounded-lg/)
    await expect(avatars.nth(1)).toHaveClass(/radcn-docs-avatar-rounded/)
    await expect(group).toHaveAttribute('aria-label', 'RadCN contributors')
    await expect(group).toHaveClass(/-space-x-2/)
    await expect(group.locator('[data-radcn-avatar]')).toHaveCount(3)
    await expect(group.locator('[data-radcn-avatar]').nth(1)).toHaveCSS('margin-left', '-8px')
    await expect(group.locator('[data-radcn-avatar]').nth(1)).not.toHaveCSS('box-shadow', 'none')
    await expect(group.locator('[data-radcn-avatar-image]').nth(0)).toHaveClass(/grayscale/)
    await expect(group.locator('[data-radcn-avatar-image]').nth(0)).toHaveCSS('filter', 'grayscale(1)')
    await expect(page.getByText('React client component markers and Radix Avatar primitives map to dependency-free native img').first()).toBeVisible()
    await expect(page.getByText('data-slot="avatar", data-slot="avatar-image", and data-slot="avatar-fallback" map to data-radcn-avatar').first()).toBeVisible()
    await expect(page.getByText('data-size maps to RadCN data-size plus size classes').first()).toBeVisible()
    await expect(page.getByText('className maps to class and cn maps to explicit class composition').first()).toBeVisible()
    await expect(page.getByText('Tailwind flex, flex-row, flex-wrap, items-center, gap-12').first()).toBeVisible()
    await expect(page.getByText('Remote GitHub avatar images are content choices').first()).toBeVisible()
    await expect(page.getByText('AvatarBadge and AvatarGroupCount are package capabilities').first()).toBeVisible()

    await page.goto('/docs/components/collapsible')
    let collapsibleDemo = page.locator('[data-radcn-docs-collapsible-family="collapsible-demo"]')
    let collapsibleRoot = collapsibleDemo.locator('[data-radcn-collapsible]')
    let collapsibleHeader = collapsibleDemo.locator('[data-radcn-docs-collapsible-header]')
    let collapsibleTrigger = collapsibleDemo.locator('[data-radcn-collapsible-trigger]')
    let collapsibleIconButton = collapsibleDemo.locator('[data-radcn-docs-collapsible-icon-button]')
    let collapsibleRows = collapsibleDemo.locator('[data-radcn-docs-collapsible-row]')
    await expect(collapsibleDemo).toBeVisible()
    await expect(collapsibleRoot).toHaveJSProperty('tagName', 'DETAILS')
    await expect(collapsibleRoot).toHaveAttribute('data-state', 'closed')
    await expect(collapsibleRoot).not.toHaveAttribute('open', '')
    await expect(collapsibleRoot).toHaveClass(/flex/)
    await expect(collapsibleRoot).toHaveClass(/w-\[350px\]/)
    await expect(collapsibleRoot).toHaveClass(/flex-col/)
    await expect(collapsibleRoot).toHaveClass(/gap-2/)
    await expect(collapsibleRoot).toHaveCSS('display', 'flex')
    await expect(collapsibleRoot).toHaveCSS('width', '350px')
    await expect(collapsibleRoot).toHaveCSS('flex-direction', 'column')
    await expect(collapsibleRoot).toHaveCSS('gap', '8px')
    await expect(collapsibleHeader).toHaveClass(/flex/)
    await expect(collapsibleHeader).toHaveClass(/items-center/)
    await expect(collapsibleHeader).toHaveClass(/justify-between/)
    await expect(collapsibleHeader).toHaveClass(/gap-4/)
    await expect(collapsibleHeader).toHaveClass(/px-4/)
    await expect(collapsibleHeader).toHaveCSS('display', 'flex')
    await expect(collapsibleHeader).toHaveCSS('justify-content', 'space-between')
    await expect(collapsibleHeader).toHaveCSS('gap', '16px')
    await expect(collapsibleHeader).toHaveCSS('padding-left', '16px')
    await expect(collapsibleHeader).toHaveCSS('padding-right', '16px')
    await expect(collapsibleDemo.getByText('@peduarte starred 3 repositories')).toBeVisible()
    await expect(collapsibleTrigger).toHaveClass(/w-\[350px\]/)
    await expect(collapsibleTrigger).toHaveClass(/flex-col/)
    await expect(collapsibleTrigger).toHaveCSS('width', '350px')
    await expect(collapsibleTrigger).toHaveCSS('flex-direction', 'column')
    await expect(collapsibleTrigger).toContainText('Toggle')
    await expect(collapsibleTrigger.locator('.radcn-sr-only')).toHaveText('Toggle')
    await expect(collapsibleTrigger.locator('[data-radcn-collapsible-icon]')).toBeHidden()
    await expect(collapsibleIconButton).toHaveClass(/radcn-button/)
    await expect(collapsibleIconButton).toHaveClass(/radcn-button--ghost/)
    await expect(collapsibleIconButton).toHaveClass(/radcn-button--icon/)
    await expect(collapsibleIconButton).toHaveClass(/size-8/)
    await expect(collapsibleTrigger.locator('[data-radcn-docs-collapsible-chevrons]')).toHaveAttribute('aria-hidden', 'true')
    await expect(collapsibleIconButton).toHaveCSS('width', '32px')
    await expect(collapsibleIconButton).toHaveCSS('height', '32px')
    await expect(collapsibleRows).toHaveCount(3)
    await expect(collapsibleRows).toHaveText(['@radix-ui/primitives', '@radix-ui/colors', '@stitches/react'])
    await expect(collapsibleRows.nth(0)).toBeVisible()
    await expect(collapsibleRows.nth(1)).toBeHidden()
    await expect(collapsibleRows.nth(2)).toBeHidden()
    await expect(collapsibleRows.first()).toHaveClass(/rounded-md/)
    await expect(collapsibleRows.first()).toHaveClass(/border/)
    await expect(collapsibleRows.first()).toHaveClass(/px-4/)
    await expect(collapsibleRows.first()).toHaveClass(/py-2/)
    await expect(collapsibleRows.first()).toHaveClass(/font-mono/)
    await expect(collapsibleRows.first()).toHaveClass(/text-sm/)
    await expect(collapsibleRows.first()).toHaveCSS('border-top-style', 'solid')
    await expect(collapsibleRows.first()).toHaveCSS('padding-left', '16px')
    await expect(collapsibleRows.first()).toHaveCSS('padding-top', '8px')
    await collapsibleTrigger.click()
    await expect(collapsibleRoot).toHaveAttribute('open', '')
    await expect(collapsibleRows.nth(1)).toBeVisible()
    await expect(collapsibleRows.nth(2)).toBeVisible()
    await expect(page.getByText('React client component markers and Radix Collapsible map to dependency-free native details/summary').first()).toBeVisible()
    await expect(page.getByText('React useState(false), open, and onOpenChange map to native details[open] state').first()).toBeVisible()
    await expect(page.getByText('data-slot maps to public data-radcn-collapsible* hooks').first()).toBeVisible()
    await expect(page.getByText('className maps to class, and cn maps to explicit class composition').first()).toBeVisible()
    await expect(page.getByText('Tailwind width, flex, gap, spacing, border, rounded, and font utilities').first()).toBeVisible()
    await expect(page.getByText('CollapsibleTrigger asChild and Button composition map to styling the summary trigger directly').first()).toBeVisible()
    await expect(page.getByText('lucide ChevronsUpDown maps to app-owned decorative chevrons icon markup').first()).toBeVisible()
    await expect(page.getByText('Custom tokens remain available through Collapsible CSS variables').first()).toBeVisible()
    await expect(page.getByText('Vendor source remains read-only evidence').first()).toBeVisible()

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

    await page.goto('/docs/components/context-menu')
    let contextMenuDemo = page.locator('[data-radcn-docs-context-menu-family="context-menu-demo"]')
    let contextMenuTrigger = contextMenuDemo.locator('[data-radcn-context-menu-trigger]')
    let contextMenuContent = page.locator('#docs-context-menu-demo-content')
    let contextMenuSubTrigger = contextMenuContent.locator('[data-radcn-context-menu-sub-trigger]')
    let contextMenuSubContent = contextMenuContent.locator('[data-radcn-context-menu-sub-content]')
    await expect(contextMenuDemo).toBeVisible()
    await expect(contextMenuDemo.locator('[data-radcn-context-menu]')).toHaveCount(1)
    await expect(contextMenuContent.locator('[data-radcn-context-menu-sub]')).toHaveCount(1)
    await expect(contextMenuTrigger).toHaveText('Right click here')
    await expect(contextMenuTrigger).toHaveClass(/flex/)
    await expect(contextMenuTrigger).toHaveClass(/h-\[150px\]/)
    await expect(contextMenuTrigger).toHaveClass(/w-\[300px\]/)
    await expect(contextMenuTrigger).toHaveClass(/items-center/)
    await expect(contextMenuTrigger).toHaveClass(/justify-center/)
    await expect(contextMenuTrigger).toHaveClass(/rounded-md/)
    await expect(contextMenuTrigger).toHaveClass(/border-dashed/)
    await expect(contextMenuTrigger).toHaveClass(/text-sm/)
    await expect(contextMenuTrigger).toHaveCSS('display', 'flex')
    await expect(contextMenuTrigger).toHaveCSS('width', '300px')
    await expect(contextMenuTrigger).toHaveCSS('height', '150px')
    await expect(contextMenuTrigger).toHaveCSS('border-top-style', 'dashed')
    await expect(contextMenuContent).toBeVisible()
    await expect(contextMenuContent).toHaveClass(/w-52/)
    await expect(contextMenuContent).toHaveCSS('width', '208px')
    await contextMenuTrigger.click({ button: 'right' })
    await expect(contextMenuContent).toBeVisible()
    await expect(contextMenuContent.locator('[data-radcn-context-menu-item]').filter({ hasText: 'Back' })).toHaveClass(/radcn-menu-item--inset/)
    await expect(contextMenuContent.locator('[data-radcn-context-menu-item]').filter({ hasText: 'Forward' })).toHaveAttribute('aria-disabled', 'true')
    await expect(contextMenuContent.locator('[data-radcn-context-menu-item]').filter({ hasText: 'Reload' })).toHaveClass(/radcn-menu-item--inset/)
    await expect(contextMenuContent.locator('[data-radcn-context-menu-shortcut]')).toHaveText(['⌘[', '⌘]', '⌘R'])
    await expect(contextMenuSubTrigger).toContainText('More Tools')
    await expect(contextMenuSubTrigger).toHaveClass(/radcn-menu-item--inset/)
    await expect(contextMenuSubTrigger.locator('.radcn-menu-sub-caret')).toHaveText('›')
    await contextMenuSubTrigger.hover()
    await expect(contextMenuSubContent).toBeVisible()
    await expect(contextMenuSubContent).toHaveClass(/w-44/)
    await expect(contextMenuSubContent).toHaveCSS('width', '176px')
    await expect(contextMenuSubContent.locator('[data-radcn-context-menu-item]')).toHaveText([
      'Save Page...',
      'Create Shortcut...',
      'Name Window...',
      'Developer Tools',
      'Delete',
    ])
    await expect(contextMenuSubContent.locator('[data-radcn-context-menu-item]').filter({ hasText: 'Delete' })).toHaveAttribute('data-variant', 'destructive')
    await expect(contextMenuContent.locator('[data-radcn-context-menu-separator]')).toHaveCount(4)
    await expect(contextMenuContent.locator('[data-radcn-context-menu-checkbox-item]').filter({ hasText: 'Show Bookmarks' })).toHaveAttribute('data-state', 'checked')
    await expect(contextMenuContent.locator('[data-radcn-context-menu-checkbox-item]').filter({ hasText: 'Show Bookmarks' }).locator('[data-radcn-menu-item-indicator]')).toBeVisible()
    await expect(contextMenuContent.locator('[data-radcn-context-menu-checkbox-item]').filter({ hasText: 'Show Full URLs' })).toHaveAttribute('data-state', 'unchecked')
    await expect(contextMenuContent.locator('[data-radcn-context-menu-radio-group]')).toHaveAttribute('data-value', 'pedro')
    await expect(contextMenuContent.locator('[data-radcn-context-menu-label]')).toHaveText('People')
    await expect(contextMenuContent.locator('[data-radcn-context-menu-label]')).toHaveClass(/radcn-menu-label--inset/)
    await expect(contextMenuContent.locator('[data-radcn-context-menu-radio-item]').filter({ hasText: 'Pedro Duarte' })).toHaveAttribute('data-state', 'checked')
    await expect(contextMenuContent.locator('[data-radcn-context-menu-radio-item]').filter({ hasText: 'Colm Tuite' })).toHaveAttribute('data-state', 'unchecked')
    await expect(page.getByText('React client component markers and Radix Context Menu primitives map to dependency-free RadCN menu-overlay enhancement').first()).toBeVisible()
    await expect(page.getByText('Radix Portal, Content, Sub, CheckboxItem, RadioGroup, and RadioItem mechanics map to explicit RadCN').first()).toBeVisible()
    await expect(page.getByText('data-slot maps to data-radcn-context-menu* and shared data-radcn-menu-* hooks').first()).toBeVisible()
    await expect(page.getByText('className maps to class, and cn maps to explicit class composition').first()).toBeVisible()
    await expect(page.getByText('Tailwind sizing, layout, border, typography, animation, focus, and inset utilities').first()).toBeVisible()
    await expect(page.getByText('lucide CheckIcon, ChevronRightIcon, and CircleIcon map to package-owned indicator/caret glyphs').first()).toBeVisible()
    await expect(page.getByText('Custom tokens remain available through menu CSS variables').first()).toBeVisible()
    await expect(page.getByText('Vendor source remains read-only evidence').first()).toBeVisible()

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

    await page.goto('/docs/components/sonner')
    for (let slug of ['sonner-demo', 'sonner-types']) {
      await expect(page.locator(`[data-radcn-docs-sonner-family="${slug}"]`), `${slug} docs example`).toBeVisible()
    }
    await expect(page.locator('[data-radcn-docs-sonner-family="sonner-demo"] [data-radcn-button]')).toHaveText('Show Toast')
    await expect(page.locator('[data-radcn-docs-sonner-family="sonner-demo"] [data-radcn-toast-title]')).toHaveText('Event has been created')
    await expect(page.locator('[data-radcn-docs-sonner-family="sonner-demo"] [data-radcn-toast-description]')).toHaveText('Sunday, December 03, 2023 at 9:00 AM')
    await expect(page.locator('[data-radcn-docs-sonner-family="sonner-demo"] [data-radcn-toast-action]')).toHaveText('Undo')
    await expect(page.locator('[data-radcn-docs-sonner-family="sonner-demo"] [data-radcn-toast]')).toHaveAttribute('role', 'status')
    await expect(page.locator('[data-radcn-docs-sonner-family="sonner-types"] [data-radcn-button]')).toHaveText([
      'Default',
      'Success',
      'Info',
      'Warning',
      'Error',
      'Promise',
    ])
    await expect(page.locator('[data-radcn-docs-sonner-family="sonner-types"] [data-radcn-toast]')).toHaveCount(6)
    await expect(page.locator('[data-radcn-docs-sonner-family="sonner-types"] [data-radcn-toast][data-type="success"]')).toContainText('Event has been created')
    await expect(page.locator('[data-radcn-docs-sonner-family="sonner-types"] [data-radcn-toast][data-type="info"]')).toContainText('Be at the area 10 minutes before the event time')
    await expect(page.locator('[data-radcn-docs-sonner-family="sonner-types"] [data-radcn-toast][data-type="warning"]')).toHaveAttribute('role', 'alert')
    await expect(page.locator('[data-radcn-docs-sonner-family="sonner-types"] [data-radcn-toast][data-type="warning"]')).toContainText('Event start time cannot be earlier than 8am')
    await expect(page.locator('[data-radcn-docs-sonner-family="sonner-types"] [data-radcn-toast][data-type="error"]')).toHaveAttribute('role', 'alert')
    await expect(page.locator('[data-radcn-docs-sonner-family="sonner-types"] [data-radcn-toast][data-type="error"]')).toContainText('Event has not been created')
    await expect(page.locator('[data-radcn-docs-sonner-family="sonner-types"] [data-radcn-toast][data-type="loading"]')).toContainText('Loading...')
    await expect(page.getByText('toast.promise maps to app-owned orchestration').first()).toBeVisible()
    await expect(page.getByText('success message Event has been created or error message Error').first()).toBeVisible()
    await expect(page.getByText('upstream sonner package, next-themes, lucide icons').first()).toBeVisible()
    await expect(page.getByText('Custom classes, styles, and tokens attach to public RadCN hooks').first()).toBeVisible()
    await expect(page.getByText('Button composition stays explicit').first()).toBeVisible()

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

    await page.goto('/docs/components/sheet')
    for (let slug of [
      'sheet-demo',
      'sheet-side',
    ]) {
      await expect(page.locator(`[data-radcn-docs-sheet-family="${slug}"]`), `${slug} docs example`).toBeVisible()
    }
    let sheetDemo = page.locator('[data-radcn-docs-sheet-family="sheet-demo"]')
    await expect(sheetDemo.locator('[data-radcn-sheet-trigger]')).toHaveText('Open')
    await expect(sheetDemo.locator('[data-radcn-sheet-trigger]')).toHaveClass(/radcn-button--outline/)
    await expect(sheetDemo.locator('[data-radcn-sheet-portal]')).toBeAttached()
    await expect(sheetDemo.locator('[data-radcn-sheet-overlay]')).toBeAttached()
    await expect(sheetDemo.locator('[data-radcn-sheet-content]')).toHaveAttribute('data-side', 'right')
    await expect(sheetDemo.locator('[data-radcn-sheet-content]')).toHaveClass(/radcn-docs-sheet-demo-content/)
    await expect(sheetDemo.locator('[data-radcn-sheet-header]')).toBeAttached()
    await expect(sheetDemo.locator('[data-radcn-sheet-title]')).toHaveText('Edit profile')
    await expect(sheetDemo.locator('[data-radcn-sheet-description]')).toHaveText("Make changes to your profile here. Click save when you're done.")
    await expect(sheetDemo.locator('[data-radcn-docs-sheet-form] [data-radcn-label]')).toHaveText(['Name', 'Username'])
    await expect(sheetDemo.locator('#sheet-demo-name')).toHaveValue('Pedro Duarte')
    await expect(sheetDemo.locator('#sheet-demo-username')).toHaveValue('@peduarte')
    await expect(sheetDemo.locator('[data-radcn-sheet-content] > [data-radcn-sheet-close][aria-label="Close"]')).toHaveClass(/radcn-sheet-close--icon/)
    await expect(sheetDemo.locator('[data-radcn-sheet-content] > [data-radcn-sheet-close][aria-label="Close"]')).toHaveCSS('position', 'absolute')
    await expect(sheetDemo.locator('[data-radcn-sheet-footer] [data-radcn-button]')).toHaveText('Save changes')
    await expect(sheetDemo.locator('[data-radcn-sheet-footer] [data-radcn-sheet-close]')).toHaveText('Close')
    await expect(sheetDemo.locator('[data-radcn-sheet-footer] [data-radcn-sheet-close]')).toHaveCSS('position', 'static')

    let sheetSide = page.locator('[data-radcn-docs-sheet-family="sheet-side"]')
    await expect(sheetSide.locator('[data-radcn-docs-sheet-side-triggers] [data-radcn-sheet-trigger]')).toHaveText([
      'top',
      'right',
      'bottom',
      'left',
    ])
    await expect(sheetSide.locator('[data-radcn-sheet-content]')).toHaveCount(4)
    await expect(sheetSide.locator('[data-radcn-sheet-content]').nth(0)).toHaveAttribute('data-side', 'top')
    await expect(sheetSide.locator('[data-radcn-sheet-content]').nth(1)).toHaveAttribute('data-side', 'right')
    await expect(sheetSide.locator('[data-radcn-sheet-content]').nth(2)).toHaveAttribute('data-side', 'bottom')
    await expect(sheetSide.locator('[data-radcn-sheet-content]').nth(3)).toHaveAttribute('data-side', 'left')
    await expect(sheetSide.locator('[data-radcn-sheet-title]')).toHaveText([
      'Edit profile',
      'Edit profile',
      'Edit profile',
      'Edit profile',
    ])
    await expect(sheetSide.locator('[data-radcn-sheet-description]')).toHaveText([
      "Make changes to your profile here. Click save when you're done.",
      "Make changes to your profile here. Click save when you're done.",
      "Make changes to your profile here. Click save when you're done.",
      "Make changes to your profile here. Click save when you're done.",
    ])
    for (let side of ['top', 'right', 'bottom', 'left']) {
      let sideContent = sheetSide.locator(`[data-radcn-sheet-content][data-side="${side}"]`)
      await expect(sideContent.locator(`#sheet-side-${side}-name`)).toHaveValue('Pedro Duarte')
      await expect(sideContent.locator(`#sheet-side-${side}-username`)).toHaveValue('@peduarte')
      await expect(sideContent.locator('[data-radcn-label]')).toHaveText(['Name', 'Username'])
      await expect(sideContent.locator(':scope > [data-radcn-sheet-close][aria-label="Close"]')).toHaveClass(/radcn-sheet-close--icon/)
      await expect(sideContent.locator(':scope > [data-radcn-sheet-close][aria-label="Close"]')).toHaveCSS('position', 'absolute')
      await expect(sideContent.locator('[data-radcn-sheet-footer] [data-radcn-sheet-close]')).toHaveText('Save changes')
      await expect(sideContent.locator('[data-radcn-sheet-footer] [data-radcn-sheet-close]')).toHaveCSS('position', 'static')
    }
    await expect(page.getByText('React props, Radix Dialog primitives').first()).toBeVisible()
    await expect(page.getByText('className, data-slot, Tailwind utilities, cn').first()).toBeVisible()
    await expect(page.getByText('asChild maps to explicit SheetTrigger and SheetClose').first()).toBeVisible()
    await expect(page.getByText('SHEET_SIDES, React keys, and repeated rendering').first()).toBeVisible()
    await expect(page.getByText('Button, Input, and Label composition stays app-owned').first()).toBeVisible()
    await expect(page.getByText('Form submit actions, profile persistence, and input state remain app-owned').first()).toBeVisible()
    await expect(page.getByText('vendor source remains read-only evidence').first()).toBeVisible()

    await page.goto('/docs/components/skeleton')
    let skeletonCard = page.locator('[data-radcn-docs-skeleton-family="skeleton-card"]')
    let skeletonDemo = page.locator('[data-radcn-docs-skeleton-family="skeleton-demo"]')
    await expect(skeletonCard).toBeVisible()
    await expect(skeletonDemo).toBeVisible()
    await expect(skeletonCard.locator('[data-radcn-skeleton]')).toHaveCount(3)
    await expect(skeletonCard.locator('[data-radcn-skeleton]').nth(0)).toHaveCSS('width', '250px')
    await expect(skeletonCard.locator('[data-radcn-skeleton]').nth(0)).toHaveCSS('height', '125px')
    await expect(skeletonCard.locator('[data-radcn-skeleton]').nth(0)).toHaveCSS('border-radius', '12px')
    await expect(skeletonCard.locator('[data-radcn-skeleton]').nth(1)).toHaveCSS('width', '250px')
    await expect(skeletonCard.locator('[data-radcn-skeleton]').nth(1)).toHaveCSS('height', '16px')
    await expect(skeletonCard.locator('[data-radcn-skeleton]').nth(2)).toHaveCSS('width', '200px')
    await expect(skeletonCard.locator('[data-radcn-skeleton]').nth(2)).toHaveCSS('height', '16px')
    await expect(skeletonDemo.locator('[data-radcn-skeleton]')).toHaveCount(3)
    await expect(skeletonDemo.locator('[data-radcn-skeleton]').nth(0)).toHaveCSS('width', '48px')
    await expect(skeletonDemo.locator('[data-radcn-skeleton]').nth(0)).toHaveCSS('height', '48px')
    await expect(skeletonDemo.locator('[data-radcn-skeleton]').nth(0)).toHaveCSS('border-radius', '999px')
    await expect(skeletonDemo.locator('[data-radcn-skeleton]').nth(1)).toHaveCSS('width', '250px')
    await expect(skeletonDemo.locator('[data-radcn-skeleton]').nth(1)).toHaveCSS('height', '16px')
    await expect(skeletonDemo.locator('[data-radcn-skeleton]').nth(2)).toHaveCSS('width', '200px')
    await expect(skeletonDemo.locator('[data-radcn-skeleton]').nth(2)).toHaveCSS('height', '16px')
    await expect(skeletonDemo.locator('[data-radcn-skeleton]').first()).toHaveAttribute('aria-hidden', 'true')
    await expect(skeletonDemo.locator('[data-radcn-skeleton]').first()).toHaveCSS('animation-name', 'pulse')
    await expect(page.getByText('React props, className, data-slot').first()).toBeVisible()
    await expect(page.getByText('Tailwind utilities, cn').first()).toBeVisible()
    await expect(page.getByText('data-slot="skeleton" maps to data-radcn-skeleton').first()).toBeVisible()
    await expect(page.getByText('Fixed dimensions and rounded shapes remain app-owned').first()).toBeVisible()
    await expect(page.getByText('vendor source remains read-only evidence').first()).toBeVisible()

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
    let tabsDemo = page.locator('[data-radcn-docs-tabs-family="tabs-demo"]')
    await expect(tabsDemo).toBeVisible()
    await expect(tabsDemo).toHaveClass(/flex/)
    await expect(tabsDemo).toHaveClass(/w-full/)
    await expect(tabsDemo).toHaveClass(/max-w-sm/)
    await expect(tabsDemo).toHaveClass(/flex-col/)
    await expect(tabsDemo).toHaveClass(/gap-6/)
    await expect(tabsDemo).toHaveCSS('max-width', '384px')
    await expect(tabsDemo).toHaveCSS('gap', '24px')
    await expect(tabsDemo.locator('[data-radcn-tabs]')).toHaveAttribute('data-default-value', 'account')
    await expect(tabsDemo.locator('[data-radcn-tabs]')).toHaveAttribute('data-value', 'account')
    await expect(tabsDemo.locator('[data-radcn-tabs-list]')).toHaveAttribute('role', 'tablist')
    await expect(tabsDemo.locator('[data-radcn-tabs-trigger][data-value="account"]')).toHaveText('Account')
    await expect(tabsDemo.locator('[data-radcn-tabs-trigger][data-value="password"]')).toHaveText('Password')
    await expect(tabsDemo.locator('[data-radcn-tabs-trigger][data-value="account"]')).toHaveAttribute('aria-selected', 'true')
    await expect(tabsDemo.locator('[data-radcn-tabs-content][data-value="account"]')).toBeVisible()
    await expect(tabsDemo.locator('[data-radcn-tabs-content][data-value="password"]')).toBeHidden()
    let accountPanel = tabsDemo.locator('[data-radcn-tabs-content][data-value="account"]')
    await expect(accountPanel.locator('[data-radcn-card]')).toHaveCount(1)
    await expect(accountPanel.locator('[data-radcn-card-title]')).toHaveText('Account')
    await expect(accountPanel.locator('[data-radcn-card-description]')).toHaveText(
      "Make changes to your account here. Click save when you're done.",
    )
    await expect(accountPanel.locator('[data-radcn-card-content]')).toHaveClass(/grid/)
    await expect(accountPanel.locator('[data-radcn-card-content]')).toHaveClass(/gap-6/)
    await expect(accountPanel.locator('[data-radcn-card-content]')).toHaveCSS('gap', '24px')
    await expect(accountPanel.locator('label[for="tabs-demo-name"]')).toHaveText('Name')
    await expect(accountPanel.locator('#tabs-demo-name')).toHaveValue('Pedro Duarte')
    await expect(accountPanel.locator('label[for="tabs-demo-username"]')).toHaveText('Username')
    await expect(accountPanel.locator('#tabs-demo-username')).toHaveValue('@peduarte')
    await expect(accountPanel.getByRole('button', { name: 'Save changes' })).toHaveAttribute('data-radcn-button', '')
    await tabsDemo.locator('[data-radcn-tabs-trigger][data-value="password"]').click()
    await expect(tabsDemo.locator('[data-radcn-tabs]')).toHaveAttribute('data-value', 'password')
    await expect(tabsDemo.locator('[data-radcn-tabs-content][data-value="account"]')).toBeHidden()
    let passwordPanel = tabsDemo.locator('[data-radcn-tabs-content][data-value="password"]')
    await expect(passwordPanel).toBeVisible()
    await expect(passwordPanel.locator('[data-radcn-card-title]')).toHaveText('Password')
    await expect(passwordPanel.locator('[data-radcn-card-description]')).toHaveText(
      "Change your password here. After saving, you'll be logged out.",
    )
    await expect(passwordPanel.locator('label[for="tabs-demo-current"]')).toHaveText('Current password')
    await expect(passwordPanel.locator('#tabs-demo-current')).toHaveAttribute('type', 'password')
    await expect(passwordPanel.locator('label[for="tabs-demo-new"]')).toHaveText('New password')
    await expect(passwordPanel.locator('#tabs-demo-new')).toHaveAttribute('type', 'password')
    await expect(passwordPanel.getByRole('button', { name: 'Save password' })).toHaveAttribute('data-radcn-button', '')
    await expect(page.getByText('export function TabsDemo()').first()).toBeVisible()
    await expect(page.getByText('<Tabs defaultValue="account">').first()).toBeVisible()
    await expect(page.getByText('<Input id="tabs-demo-name" value="Pedro Duarte" />').first()).toBeVisible()
    await expect(page.getByText('use client, React component props, and Radix TabsPrimitive.Root/List/Trigger/Content').first()).toBeVisible()
    await expect(page.getByText('cva, VariantProps, tabsListVariants, className, Tailwind utilities, cn, data-slot').first()).toBeVisible()
    await expect(page.getByText('AppWindowIcon and CodeIcon are unused upstream lucide-react imports').first()).toBeVisible()
    await expect(page.getByText('Upstream Input defaultValue maps to RadCN Input value').first()).toBeVisible()
    await expect(page.getByText('Vendor source remains read-only evidence and is not imported by RadCN.').first()).toBeVisible()

    await page.goto('/docs/components/tooltip')
    let tooltipDemo = page.locator('[data-radcn-docs-tooltip-family="tooltip-demo"]')
    await expect(tooltipDemo).toBeVisible()
    await expect(tooltipDemo.locator('[data-radcn-tooltip-provider]')).toHaveAttribute('data-delay-duration', '0')
    await expect(tooltipDemo.locator('[data-radcn-tooltip]')).toHaveAttribute('id', 'docs-tooltip-demo')
    await expect(tooltipDemo.locator('[data-radcn-tooltip]')).toHaveAttribute('data-open', 'false')
    let tooltipTrigger = tooltipDemo.locator('[data-radcn-tooltip-trigger]')
    let tooltipContent = page.locator('[data-radcn-tooltip-content]')
    await expect(tooltipTrigger).toHaveText('Hover')
    await expect(tooltipTrigger).toHaveClass(/radcn-button/)
    await expect(tooltipTrigger).toHaveClass(/radcn-button--outline/)
    await expect(tooltipTrigger.locator('button')).toHaveCount(0)
    await expect(tooltipContent).toHaveText('Add to library')
    await expect(tooltipContent).toHaveAttribute('role', 'tooltip')
    await expect(tooltipContent).toHaveAttribute('data-side', 'top')
    await expect(tooltipContent).toHaveAttribute('data-side-offset', '0')
    await expect(tooltipContent).toBeHidden()
    await expect(page.locator('[data-radcn-portal-root] [data-radcn-tooltip-portal]')).toHaveCount(1)
    await expect(page.locator('[data-radcn-tooltip-arrow]')).toHaveCount(1)
    await tooltipTrigger.hover()
    await expect(tooltipContent).toBeVisible()
    await expect(tooltipTrigger).toHaveAttribute('aria-describedby', await tooltipContent.getAttribute('id') || '')
    await expect(tooltipDemo.locator('[data-radcn-tooltip]')).toHaveAttribute('data-state', 'open')
    await expect(page.locator('[data-radcn-tooltip-arrow]')).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(tooltipContent).toBeHidden()
    await tooltipTrigger.focus()
    await expect(tooltipContent).toBeVisible()
    await tooltipTrigger.blur()
    await expect(tooltipContent).toBeHidden()
    await expect(page.getByText('export function TooltipDemo()').first()).toBeVisible()
    await expect(page.getByText('<TooltipProvider delayDuration={0}>').first()).toBeVisible()
    await expect(page.getByText('<TooltipTrigger class="radcn-button radcn-button--outline">Hover</TooltipTrigger>').first()).toBeVisible()
    await expect(page.getByText('<p>Add to library</p>').first()).toBeVisible()
    await expect(page.getByText('use client, React component props, and Radix TooltipPrimitive.Provider/Root/Trigger/Portal/Content/Arrow').first()).toBeVisible()
    await expect(page.getByText('TooltipTrigger asChild maps to styling RadCN TooltipTrigger').first()).toBeVisible()
    await expect(page.getByText('className, Tailwind utilities, cn, data-slot, data-state, and data-side').first()).toBeVisible()
    await expect(page.getByText('Provider delayDuration = 0 and content sideOffset = 0').first()).toBeVisible()
    await expect(page.getByText('Vendor source remains read-only evidence and is not imported by RadCN.').first()).toBeVisible()

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
