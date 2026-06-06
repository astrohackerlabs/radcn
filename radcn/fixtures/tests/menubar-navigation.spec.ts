import { expect, test } from '@playwright/test'

const candidate = 'http://localhost:4602'

async function openMenubar(page: import('@playwright/test').Page, scenario = 'default') {
  await page.goto(`${candidate}/fixtures/menubar/${scenario}`)
  let root = page.locator('[data-radcn-menubar]').first()
  let file = page.getByRole('menuitem', { name: 'File', exact: true }).first()
  await file.click()
  return { file, root }
}

test('candidate menubar covers named upstream demo composition', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/menubar/demo`)
  let demo = page.locator('[data-candidate-menubar-family="menubar-demo"]')
  let root = demo.locator('[data-radcn-menubar]')
  await expect(demo).toBeVisible()
  await expect(root).toHaveAttribute('role', 'menubar')
  await expect(root).toHaveAttribute('aria-orientation', 'horizontal')
  await expect(demo.locator('[data-radcn-menubar-menu]')).toHaveCount(4)
  await expect(demo.locator('[data-radcn-menubar-trigger]')).toHaveText(['File', 'Edit', 'View', 'Profiles'])
  await expect(page.locator('[data-radcn-portal-root] [data-radcn-menubar-portal]')).toHaveCount(4)

  await page.getByRole('menuitem', { name: 'File', exact: true }).click()
  let file = page.getByRole('menuitem', { name: 'File', exact: true })
  let fileContent = page.locator(`#${await file.getAttribute('aria-controls')}`)
  await expect(file).toHaveAttribute('aria-expanded', 'true')
  await expect(fileContent).toHaveAttribute('data-side-offset', '8')
  await expect(fileContent).toHaveAttribute('role', 'menu')
  await expect(fileContent.locator(':scope > [data-radcn-menubar-item]')).toHaveCount(4)
  await expect(fileContent.locator('[data-radcn-menubar-separator]')).toHaveCount(2)
  await expect(fileContent.locator('[data-radcn-menubar-sub]')).toHaveCount(1)
  await expect(fileContent.locator('[data-radcn-menubar-sub-trigger]')).toHaveText(/Share/)
  await expect(fileContent.locator('[data-radcn-menubar-sub-content]')).toHaveCount(1)
  await expect(fileContent.locator('[data-radcn-menubar-shortcut]')).toHaveText(['⌘T', '⌘N', '⌘P'])
  await expect(page.getByRole('menuitem', { name: /New Tab/ })).toBeFocused()
  await expect(page.getByRole('menuitem', { name: /New Incognito Window/ })).toHaveAttribute('aria-disabled', 'true')
  await page.keyboard.press('ArrowDown')
  await expect(page.getByRole('menuitem', { name: /New Window/ })).toBeFocused()
  await page.keyboard.press('ArrowDown')
  await expect(page.getByRole('menuitem', { name: /New Incognito Window/ })).not.toBeFocused()
  await expect(page.getByRole('menuitem', { name: /Share/ })).toBeFocused()
  await page.getByRole('menuitem', { name: /Share/ }).evaluate((element) => {
    element.dispatchEvent(new PointerEvent('pointermove', { bubbles: true }))
  })
  await expect(fileContent.locator('[data-radcn-menubar-sub-content]')).toBeVisible()
  await expect(page.getByRole('menuitem', { name: 'Email link' })).toBeVisible()
  await expect(page.getByRole('menuitem', { name: 'Messages' })).toBeVisible()
  await expect(page.getByRole('menuitem', { name: 'Notes' })).toBeVisible()

  await page.keyboard.press('Escape')
  await expect(file).toHaveAttribute('aria-expanded', 'false')
  await page.getByRole('menuitem', { name: 'Edit', exact: true }).click()
  let edit = page.getByRole('menuitem', { name: 'Edit', exact: true })
  let editContent = page.locator(`#${await edit.getAttribute('aria-controls')}`)
  await expect(edit).toHaveAttribute('aria-expanded', 'true')
  await expect(editContent).toHaveAttribute('data-side-offset', '8')
  await expect(editContent.locator('[data-radcn-menubar-shortcut]')).toHaveText(['⌘Z', '⇧⌘Z'])
  for (let name of ['Undo', 'Redo', 'Find', 'Search the web', 'Find...', 'Find Next', 'Find Previous', 'Cut', 'Copy', 'Paste']) {
    if (['Search the web', 'Find...', 'Find Next', 'Find Previous'].includes(name)) continue
    await expect(page.getByRole('menuitem', { name: new RegExp(name.replace('.', '\\.')) })).toBeVisible()
  }
  await page.getByRole('menuitem', { name: 'Find', exact: true }).evaluate((element) => {
    element.dispatchEvent(new PointerEvent('pointermove', { bubbles: true }))
  })
  await expect(editContent.locator('[data-radcn-menubar-sub-content]')).toBeVisible()
  for (let name of ['Search the web', 'Find...', 'Find Next', 'Find Previous']) {
    await expect(page.getByRole('menuitem', { name: new RegExp(name.replace('.', '\\.')) })).toBeVisible()
  }

  await page.keyboard.press('Escape')
  await page.getByRole('menuitem', { name: 'View', exact: true }).click()
  let view = page.getByRole('menuitem', { name: 'View', exact: true })
  let viewContent = page.locator(`#${await view.getAttribute('aria-controls')}`)
  await expect(viewContent).toHaveAttribute('data-side-offset', '8')
  await expect(viewContent.locator('[data-radcn-menubar-checkbox-item]')).toHaveCount(2)
  await expect(page.getByRole('menuitemcheckbox', { name: 'Always Show Bookmarks Bar' })).toHaveAttribute('aria-checked', 'false')
  await expect(page.getByRole('menuitemcheckbox', { name: 'Always Show Full URLs' })).toHaveAttribute('aria-checked', 'true')
  await expect(viewContent.locator('[data-radcn-menubar-item].radcn-menu-item--inset')).toHaveCount(4)
  await expect(page.getByRole('menuitem', { name: /^Reload/ })).toBeVisible()
  await expect(page.getByRole('menuitem', { name: /Force Reload/ })).toHaveAttribute('aria-disabled', 'true')
  await expect(page.getByRole('menuitem', { name: 'Toggle Fullscreen' })).toBeVisible()
  await expect(page.getByRole('menuitem', { name: 'Hide Sidebar' })).toBeVisible()
  await expect(viewContent.locator('[data-radcn-menubar-shortcut]')).toHaveText(['⌘R', '⇧⌘R'])

  await page.keyboard.press('Escape')
  await page.getByRole('menuitem', { name: 'Profiles', exact: true }).click()
  let profiles = page.getByRole('menuitem', { name: 'Profiles', exact: true })
  let profilesContent = page.locator(`#${await profiles.getAttribute('aria-controls')}`)
  await expect(profilesContent).toHaveAttribute('data-side-offset', '8')
  await expect(profilesContent.locator('[data-radcn-menubar-radio-group]')).toHaveAttribute('data-value', 'benoit')
  await expect(page.getByRole('menuitemradio', { name: 'Andy' })).toHaveAttribute('aria-checked', 'false')
  await expect(page.getByRole('menuitemradio', { name: 'Benoit' })).toHaveAttribute('aria-checked', 'true')
  await expect(page.getByRole('menuitemradio', { name: 'Luis' })).toHaveAttribute('aria-checked', 'false')
  await expect(page.getByRole('menuitem', { name: 'Edit...' })).toBeVisible()
  await expect(page.getByRole('menuitem', { name: 'Add Profile...' })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(profiles).toHaveAttribute('aria-expanded', 'false')
})

test('candidate menubar opens menu content with semantics and portal state', async ({ page }) => {
  let opened = await openMenubar(page)
  await expect(opened.root).toHaveAttribute('role', 'menubar')
  await expect(opened.root).toHaveAttribute('aria-orientation', 'horizontal')
  await expect(opened.file).toHaveAttribute('aria-haspopup', 'menu')
  await expect(opened.file).toHaveAttribute('aria-expanded', 'true')
  await expect(page.locator('[data-radcn-portal-root] [data-radcn-menubar-portal]')).toHaveCount(3)
  await expect(page.locator('[data-radcn-menubar-content]').first()).toHaveAttribute('role', 'menu')
  await expect(page.getByRole('menuitem', { name: /New Tab/ })).toBeFocused()
})

test('candidate menubar roves triggers and menu items with keyboard', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/menubar/keyboard-typeahead`)
  let file = page.getByRole('menuitem', { name: 'File', exact: true }).first()
  await file.focus()
  await page.keyboard.press('ArrowRight')
  await expect(page.getByRole('menuitem', { name: 'View', exact: true }).first()).toBeFocused()
  await page.keyboard.press('End')
  await expect(page.getByRole('menuitem', { name: 'Help' }).first()).toBeFocused()
  await page.keyboard.press('Home')
  await expect(file).toBeFocused()
  await page.keyboard.press('Enter')
  await page.keyboard.press('n')
  await expect(page.getByRole('menuitem', { name: /New Tab/ })).toBeFocused()
  await page.keyboard.press('ArrowDown')
  await expect(page.getByRole('menuitem', { name: 'New Window' })).toBeFocused()
  await page.keyboard.press('ArrowDown')
  await expect(page.getByRole('menuitem', { name: /Import disabled/ })).not.toBeFocused()
  await page.keyboard.press('Escape')
  await expect(file).toBeFocused()
  await expect(file).toHaveAttribute('aria-expanded', 'false')

  await page.goto(`${candidate}/fixtures/menubar/vertical`)
  file = page.getByRole('menuitem', { name: 'File', exact: true }).first()
  await file.focus()
  await page.keyboard.press('ArrowDown')
  await expect(page.getByRole('menuitem', { name: 'View', exact: true }).first()).toBeFocused()
})

test('candidate menubar synchronizes checked radio submenu disabled and custom hooks', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/menubar/checkbox-radio`)
  await page.getByRole('menuitem', { name: 'View', exact: true }).first().click()
  let sidebar = page.getByRole('menuitemcheckbox', { name: /Show Sidebar/ })
  await expect(sidebar).toHaveAttribute('aria-checked', 'true')
  await sidebar.click()
  await expect(page.locator('[data-radcn-menubar-checkbox-item]').first()).toHaveAttribute('aria-checked', 'false')

  await page.getByRole('menuitem', { name: 'View', exact: true }).first().click()
  let compact = page.getByRole('menuitemradio', { name: /Compact/ })
  await compact.click()
  await expect(page.locator('[data-radcn-menubar-radio-item][data-value="compact"]')).toHaveAttribute('aria-checked', 'true')

  await page.goto(`${candidate}/fixtures/menubar/submenu`)
  await page.getByRole('menuitem', { name: 'File', exact: true }).first().click()
  await page.getByRole('menuitem', { name: 'Help' }).first().hover()
  await expect(page.getByRole('menuitem', { name: 'File', exact: true }).first()).toHaveAttribute('aria-expanded', 'false')
  await expect(page.getByRole('menuitem', { name: 'Help' }).first()).toHaveAttribute('aria-expanded', 'true')
  await expect(page.locator('[data-radcn-menubar-content]:visible')).toHaveCount(1)
  await page.getByRole('menuitem', { name: /Resources/ }).hover()
  await expect(page.locator('[data-radcn-menubar-sub-content]').first()).toBeVisible()

  await page.goto(`${candidate}/fixtures/menubar/disabled`)
  await expect(page.getByRole('menuitem', { name: /Edit disabled/ })).toBeDisabled()

  await page.goto(`${candidate}/fixtures/menubar/custom-token`)
  await expect(page.locator('[data-radcn-menubar]').first()).toHaveClass(/radcn-fixture-custom-menubar/)
  await expect(page.locator('[data-radcn-menubar]').first()).toHaveCSS('border-color', 'rgb(15, 118, 110)')
})

test('candidate navigation menu exposes links viewport indicator and keyboard behavior', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/navigation-menu/default`)
  let root = page.locator('[data-radcn-navigation-menu]').first()
  await expect(root).toHaveAttribute('aria-label', 'Main navigation')
  await expect(page.locator('[data-radcn-navigation-menu-list]')).toHaveCount(1)
  await expect(page.getByRole('button', { name: 'Product' })).toHaveAttribute('aria-expanded', 'true')
  await expect(page.locator('[data-radcn-navigation-menu-content]').first()).toBeVisible()
  await expect(page.locator('[data-radcn-navigation-menu-viewport]')).toHaveAttribute('data-state', 'open')
  await expect(page.locator('[data-radcn-navigation-menu-indicator]')).toHaveAttribute('data-state', 'visible')
  await expect(page.getByRole('link', { name: 'Pricing' })).toHaveAttribute('href', '/fixtures/card/default')

  await page.getByRole('button', { name: 'Product' }).focus()
  await page.keyboard.press('ArrowRight')
  await expect(page.getByRole('button', { name: 'Docs' })).toBeFocused()
  await expect(page.getByRole('button', { name: 'Docs' })).toHaveAttribute('aria-expanded', 'true')
  await page.keyboard.press('End')
  await expect(page.getByRole('link', { name: 'Pricing' })).toBeFocused()
  await page.keyboard.press('Escape')
  await expect(page.locator('[data-radcn-navigation-menu-viewport]')).toBeHidden()
  await page.getByRole('button', { name: 'Docs' }).focus()
  await expect(page.locator('[data-radcn-navigation-menu-viewport]')).toBeVisible()
  await page.getByRole('button', { name: 'After navigation' }).focus()
  await expect(page.locator('[data-radcn-navigation-menu-viewport]')).toBeHidden()

  await page.goto(`${candidate}/fixtures/navigation-menu/vertical`)
  await page.getByRole('button', { name: 'Product' }).focus()
  await page.keyboard.press('ArrowDown')
  await expect(page.getByRole('button', { name: 'Docs' })).toBeFocused()
})

test('candidate navigation menu covers named upstream demo composition', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/navigation-menu/demo`)
  let demo = page.locator('[data-candidate-navigation-menu-family="navigation-menu-demo"]')
  let root = demo.locator('[data-radcn-navigation-menu]')
  await expect(demo).toBeVisible()
  await expect(root).toHaveAttribute('aria-label', 'Main navigation')
  await expect(root).toHaveAttribute('data-value', 'home')
  await expect(demo.locator('[data-radcn-navigation-menu-item]')).toHaveCount(6)
  await expect(demo.locator('[data-radcn-navigation-menu-trigger]')).toHaveText([
    'Home',
    'Components',
    'List',
    'Simple',
    'With Icon',
  ])
  await expect(demo.getByRole('link', { name: 'Docs' })).toHaveClass(/radcn-navigation-menu-link/)
  await expect(demo.getByRole('link', { name: 'Docs' })).toHaveClass(/radcn-candidate-navigation-menu-trigger-link/)
  await expect(demo.locator('.radcn-candidate-navigation-menu-desktop-only')).toHaveCount(3)
  await expect(demo.locator('[data-radcn-navigation-menu-viewport]')).toHaveAttribute('data-state', 'open')
  await expect(demo.locator('[data-radcn-navigation-menu-indicator]')).toHaveAttribute('data-state', 'visible')

  let home = demo.getByRole('button', { name: 'Home' })
  let homeContent = page.locator(`#${await home.getAttribute('aria-controls')}`)
  await expect(home).toHaveAttribute('aria-expanded', 'true')
  await expect(homeContent).toBeVisible()
  await expect(homeContent.getByText('shadcn/ui')).toBeVisible()
  await expect(homeContent.getByText('Beautifully designed components built with Tailwind CSS.')).toBeVisible()
  await expect(homeContent.getByRole('link', { name: /Introduction/ })).toBeVisible()
  await expect(homeContent.getByText('Re-usable components built using Radix UI and Tailwind CSS.')).toBeVisible()
  await expect(homeContent.getByRole('link', { name: /Installation/ })).toBeVisible()
  await expect(homeContent.getByText('How to install dependencies and structure your app.')).toBeVisible()
  await expect(homeContent.getByRole('link', { name: /Typography/ })).toBeVisible()
  await expect(homeContent.getByText('Styles for headings, paragraphs, lists...etc')).toBeVisible()

  let components = demo.getByRole('button', { name: 'Components' })
  let componentsContent = page.locator(`#${await components.getAttribute('aria-controls')}`)
  await components.evaluate((element) => {
    element.dispatchEvent(new PointerEvent('pointerenter', { bubbles: true }))
  })
  await expect(components).toHaveAttribute('aria-expanded', 'true')
  await expect(componentsContent).toBeVisible()
  await expect(demo.locator('[data-radcn-navigation-menu-viewport]')).toHaveAttribute('data-state', 'open')
  await expect(demo.locator('[data-radcn-navigation-menu-indicator]')).toHaveAttribute('data-state', 'visible')
  for (let [title, description] of [
    ['Alert Dialog', 'A modal dialog that interrupts the user with important content and expects a response.'],
    ['Hover Card', 'For sighted users to preview content available behind a link.'],
    ['Progress', 'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.'],
    ['Scroll-area', 'Visually or semantically separates content.'],
    ['Tabs', 'A set of layered sections of content—known as tab panels—that are displayed one at a time.'],
    ['Tooltip', 'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.'],
  ]) {
    await expect(componentsContent.getByRole('link', { name: new RegExp(title) })).toBeVisible()
    await expect(componentsContent.getByText(description)).toBeVisible()
  }

  await demo.getByRole('button', { name: 'List' }).focus()
  let list = demo.getByRole('button', { name: 'List' })
  let listContent = page.locator(`#${await list.getAttribute('aria-controls')}`)
  await expect(listContent.getByRole('link', { name: /Components/ })).toBeVisible()
  await expect(listContent.getByText('Browse all components in the library.')).toBeVisible()
  await expect(listContent.getByRole('link', { name: /Documentation/ })).toBeVisible()
  await expect(listContent.getByText('Learn how to use the library.')).toBeVisible()
  await expect(listContent.getByRole('link', { name: /Blog/ })).toBeVisible()
  await expect(listContent.getByText('Read our latest blog posts.')).toBeVisible()

  await demo.getByRole('button', { name: 'Simple' }).focus()
  let simple = demo.getByRole('button', { name: 'Simple' })
  let simpleContent = page.locator(`#${await simple.getAttribute('aria-controls')}`)
  await expect(simpleContent.getByRole('link', { name: 'Components' })).toBeVisible()
  await expect(simpleContent.getByRole('link', { name: 'Documentation' })).toBeVisible()
  await expect(simpleContent.getByRole('link', { name: 'Blocks' })).toBeVisible()

  await demo.getByRole('button', { name: 'With Icon' }).focus()
  let withIcon = demo.getByRole('button', { name: 'With Icon' })
  let withIconContent = page.locator(`#${await withIcon.getAttribute('aria-controls')}`)
  await expect(withIconContent.getByRole('link', { name: 'Backlog' })).toBeVisible()
  await expect(withIconContent.getByRole('link', { name: 'To Do' })).toBeVisible()
  await expect(withIconContent.getByRole('link', { name: 'Done' })).toBeVisible()
  await expect(withIconContent.locator('[data-candidate-navigation-menu-icon]')).toHaveText(['?', 'o', '✓'])

  await page.keyboard.press('Home')
  await expect(home).toBeFocused()
  await page.keyboard.press('End')
  await expect(demo.getByRole('button', { name: 'With Icon' })).toBeFocused()
  await page.keyboard.press('Escape')
  await expect(demo.locator('[data-radcn-navigation-menu-viewport]')).toBeHidden()
  await demo.getByRole('button', { name: 'After navigation' }).focus()
  await expect(demo.locator('[data-radcn-navigation-menu-viewport]')).toBeHidden()
})

test('candidate navigation menu handles disabled and custom token hooks', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/navigation-menu/disabled`)
  await expect(page.getByRole('button', { name: 'Disabled' })).toBeDisabled()

  await page.goto(`${candidate}/fixtures/navigation-menu/custom-token`)
  await expect(page.locator('[data-radcn-navigation-menu]').first()).toHaveClass(/radcn-fixture-custom-navigation-menu/)
  await expect(page.locator('[data-radcn-navigation-menu-list]').first()).toHaveCSS('border-color', 'rgb(15, 118, 110)')
})
