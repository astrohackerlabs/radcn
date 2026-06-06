import { expect, test } from '@playwright/test'

const candidate = 'http://localhost:4602'

async function freshCombobox(page: import('@playwright/test').Page, scenario = 'default') {
  await page.goto(`${candidate}/fixtures/combobox/${scenario}`)
  let content = page.locator('[data-radcn-combobox-content]').first()
  let input = page.locator('[data-radcn-combobox-input]').first()
  if (await content.isVisible()) {
    await input.focus()
    await page.keyboard.press('Escape')
    await expect(content).toBeHidden()
  }
  return {
    content,
    input,
    hidden: page.locator('[data-radcn-combobox-hidden-input]').first(),
    root: page.locator('[data-radcn-combobox]').first(),
    trigger: page.locator('[data-radcn-combobox-trigger]').first(),
  }
}

async function freshCommand(page: import('@playwright/test').Page, scenario = 'default') {
  await page.goto(`${candidate}/fixtures/command/${scenario}`)
  return {
    input: page.locator('[data-radcn-command-input]').first(),
    list: page.locator('[data-radcn-command-list]').first(),
    root: page.locator('[data-radcn-command]').first(),
  }
}

function comboHighlight(page: import('@playwright/test').Page) {
  return page.locator('[data-radcn-combobox-item][data-highlighted="true"]')
}

function commandHighlight(page: import('@playwright/test').Page) {
  return page.locator('[data-radcn-command-item][data-highlighted="true"]')
}

test('candidate combobox opens filters selects and syncs form value', async ({ page }) => {
  let opened = await freshCombobox(page, 'default')
  await opened.trigger.click()
  await expect(opened.content).toBeVisible()
  await expect(opened.input).toHaveAttribute('role', 'combobox')
  await expect(opened.input).toHaveAttribute('aria-expanded', 'true')
  await expect(opened.input).toHaveAttribute('aria-controls', await page.locator('[data-radcn-combobox-list]').first().getAttribute('id') || '')
  await expect(page.locator('[data-radcn-portal-root] [data-radcn-combobox-portal]')).toHaveCount(1)
  await expect(page.locator('[data-radcn-combobox-list]').first()).toHaveAttribute('role', 'listbox')
  await expect(page.getByRole('option', { name: /Remix/ })).toHaveAttribute('aria-selected', 'true')

  await opened.input.fill('sv')
  await expect(page.getByRole('option', { name: 'Svelte' })).toBeVisible()
  await expect(page.getByRole('option', { name: 'React' })).toBeHidden()
  await page.keyboard.press('Enter')
  await expect(opened.input).toHaveValue('Svelte')
  await expect(opened.hidden).toHaveValue('svelte')
  await expect(opened.content).toBeHidden()
})

test('candidate combobox demo matches named upstream selection behavior', async ({ page }) => {
  let opened = await freshCombobox(page, 'demo')
  await expect(opened.root).toHaveAttribute('data-value', 'remix')
  await expect(page.locator('[data-fixture-combobox-label]')).toHaveText('Remix')
  await opened.trigger.click()
  await expect(opened.content).toBeVisible()
  await expect(opened.input).toHaveAttribute('role', 'combobox')
  await expect(page.getByRole('option', { name: /Remix/ })).toHaveAttribute('aria-selected', 'true')

  await opened.input.fill('astro')
  await expect(page.getByRole('option', { name: 'Astro' })).toBeVisible()
  await expect(page.getByRole('option', { name: 'Next.js' })).toBeHidden()
  await page.keyboard.press('Enter')
  await expect(opened.hidden).toHaveValue('astro')
  await expect(page.locator('[data-fixture-combobox-label]')).toHaveText('Astro')
  await expect(opened.content).toBeHidden()
})

test('candidate combobox dropdown menu composes searchable label submenu', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/combobox/dropdown-menu`)
  let example = page.locator('[data-fixture-combobox-example="combobox-dropdown-menu"]')
  await expect(example.locator('[data-fixture-combobox-label]')).toHaveText('feature')

  await example.locator('[data-radcn-dropdown-menu-trigger]').click()
  await expect(page.locator('[data-radcn-dropdown-menu-content]')).toBeVisible()
  await page.locator('[data-radcn-dropdown-menu-sub-trigger]').hover()
  let subContent = page.locator('[data-radcn-dropdown-menu-sub-content]')
  await expect(subContent).toBeVisible()
  await expect(subContent.locator('[data-radcn-command]')).toBeVisible()

  let input = subContent.locator('[data-radcn-command-input]')
  await input.fill('design')
  await expect(page.getByRole('option', { name: 'design' })).toBeVisible()
  await expect(page.getByRole('option', { name: 'feature' })).toBeHidden()
  await page.getByRole('option', { name: 'design' }).click()
  await expect(example.locator('[data-fixture-combobox-label]')).toHaveText('design')
  await expect(page.locator('[data-radcn-dropdown-menu-content]')).toBeHidden()
})

test('candidate combobox popover composes side status picker', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/combobox/popover`)
  let example = page.locator('[data-fixture-combobox-example="combobox-popover"]')
  await expect(example.locator('[data-fixture-combobox-label]')).toHaveText('+ Set status')
  await example.locator('[data-radcn-popover-trigger]').click()
  let content = page.locator('[data-radcn-popover-content]')
  await expect(content).toBeVisible()
  await expect(content).toHaveAttribute('data-side', 'right')
  await expect(content).toHaveAttribute('data-align', 'start')

  await content.locator('[data-radcn-command-input]').fill('done')
  await expect(page.getByRole('option', { name: 'Done' })).toBeVisible()
  await page.getByRole('option', { name: 'Done' }).click()
  await expect(example.locator('[data-fixture-combobox-label]')).toHaveText('Done')
  await expect(content).toHaveAttribute('data-state', 'closed')
})

test('candidate combobox responsive composes desktop popover and mobile drawer branches', async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 720 })
  await page.goto(`${candidate}/fixtures/combobox/responsive`)
  let desktop = page.locator('[data-fixture-combobox-responsive-branch="desktop"]')
  let mobile = page.locator('[data-fixture-combobox-responsive-branch="mobile"]')
  await expect(desktop).toBeVisible()
  await expect(mobile).toBeHidden()
  await desktop.locator('[data-radcn-popover-trigger]').click()
  await expect(page.locator('[data-radcn-popover-content]')).toBeVisible()
  await page.locator('[data-radcn-popover-content] [data-radcn-command-input]').fill('todo')
  await page.getByRole('option', { name: 'Todo' }).click()
  await expect(desktop.locator('[data-fixture-combobox-label]')).toHaveText('Todo')

  await page.setViewportSize({ width: 390, height: 720 })
  await page.goto(`${candidate}/fixtures/combobox/responsive`)
  desktop = page.locator('[data-fixture-combobox-responsive-branch="desktop"]')
  mobile = page.locator('[data-fixture-combobox-responsive-branch="mobile"]')
  await expect(desktop).toBeHidden()
  await expect(mobile).toBeVisible()
  await mobile.locator('[data-radcn-drawer-trigger]').click()
  let drawerContent = page.locator('[data-radcn-drawer-content]:visible')
  await expect(drawerContent).toBeVisible()
  await drawerContent.locator('[data-radcn-combobox-trigger]').click()
  await drawerContent.locator('[data-radcn-combobox-input]').fill('canceled')
  await page.keyboard.press('Enter')
  await expect(mobile.locator('[data-fixture-combobox-label]')).toHaveText('Canceled')
  await expect(page.locator('[data-radcn-drawer-content]')).toHaveAttribute('data-state', 'closed')
})

test('candidate combobox keyboard roves skips disabled clears and closes safely', async ({ page }) => {
  let opened = await freshCombobox(page, 'groups')
  await opened.trigger.click()
  await page.keyboard.press('ArrowDown')
  await expect(comboHighlight(page)).toContainText('Remix')
  await page.keyboard.press('Home')
  await expect(comboHighlight(page)).toContainText('React')
  await page.keyboard.press('End')
  await expect(comboHighlight(page)).toContainText('SvelteKit')
  await page.keyboard.press('Escape')
  await expect(opened.content).toBeHidden()

  opened = await freshCombobox(page, 'clearable')
  await opened.trigger.click()
  await page.locator('[data-radcn-combobox-clear]').click()
  await expect(opened.input).toHaveValue('')
  await expect(opened.hidden).toHaveValue('')
  await expect(opened.input).toBeFocused()

  opened = await freshCombobox(page, 'default')
  await opened.trigger.click()
  await page.keyboard.press('Tab')
  await expect(opened.content).toBeHidden()
})

test('candidate combobox exposes chips invalid popper custom and form reset', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/combobox/disabled-invalid`)
  await expect(page.locator('#candidate-combobox-disabled [data-radcn-combobox-input]')).toBeDisabled()
  await expect(page.locator('#candidate-combobox-invalid [data-radcn-combobox-input]')).toHaveAttribute('aria-invalid', 'true')

  let opened = await freshCombobox(page, 'chips-multiple')
  await opened.trigger.click()
  await expect(page.locator('[data-radcn-combobox-chip]:visible')).toHaveCount(2)
  await page.getByRole('option', { name: 'Svelte' }).click()
  await expect(opened.hidden).toHaveValue('react,remix,svelte')

  opened = await freshCombobox(page, 'popper-placement')
  await opened.trigger.click()
  await expect(opened.content).toHaveAttribute('data-side', 'right')
  await expect(opened.content).toHaveAttribute('data-align', 'end')
  let box = await opened.content.boundingBox()
  let stage = await page.locator('[data-fixture-stage]').boundingBox()
  expect(box).not.toBeNull()
  expect(stage).not.toBeNull()
  expect(box!.x + box!.width).toBeLessThanOrEqual(stage!.x + stage!.width)

  opened = await freshCombobox(page, 'custom-token')
  await opened.trigger.click()
  await expect(opened.content).toHaveClass(/radcn-fixture-custom-combobox/)
  await expect(opened.content).toHaveCSS('border-color', 'rgb(15, 118, 110)')

  opened = await freshCombobox(page, 'form-submit-reset')
  await opened.trigger.click()
  await opened.input.fill('vue')
  await page.keyboard.press('Enter')
  await expect(opened.hidden).toHaveValue('vue')
  await page.getByRole('button', { name: 'Reset' }).click()
  await expect(opened.hidden).toHaveValue('react')
  await page.getByRole('button', { name: 'Submit' }).click()
  await expect(page).toHaveURL(/\/fixtures\/combobox\/form-submit-reset\?framework=react&intent=submit$/)
})

test('candidate command filters activates skips disabled and shows empty state', async ({ page }) => {
  let opened = await freshCommand(page)
  await expect(opened.list).toHaveAttribute('role', 'listbox')
  await opened.input.fill('set')
  await expect(page.getByRole('option', { name: /Settings/ })).toBeVisible()
  await expect(page.locator('[data-radcn-command-item][data-value="open-file"]')).toBeHidden()
  await page.keyboard.press('Enter')
  await expect(opened.root).toHaveAttribute('data-value', 'settings')

  opened = await freshCommand(page)
  await opened.input.focus()
  await page.keyboard.press('ArrowDown')
  await expect(commandHighlight(page)).toContainText('Open File')
  await page.keyboard.press('End')
  await expect(commandHighlight(page)).toContainText('Settings')
  await page.keyboard.press('Home')
  await expect(commandHighlight(page)).toContainText('Open File')
  await page.getByRole('option', { name: /Deploy disabled/ }).click({ force: true })
  await expect(opened.root).not.toHaveAttribute('data-value', 'deploy')
  await opened.input.fill('zzzz')
  await expect(page.locator('[data-radcn-command-empty]')).toBeVisible()
})

test('candidate command exposes groups shortcuts checked dialog and custom hooks', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/command/groups`)
  await expect(page.locator('[data-radcn-command-group]')).toHaveCount(2)
  await expect(page.locator('[data-radcn-command-separator]')).toHaveCount(1)

  await page.goto(`${candidate}/fixtures/command/shortcuts`)
  await expect(page.locator('[data-radcn-command-shortcut]')).toHaveCount(3)

  await page.goto(`${candidate}/fixtures/command/checked`)
  await expect(page.locator('[data-radcn-command-item]')).toHaveAttribute('data-checked', 'true')

  await page.goto(`${candidate}/fixtures/command/dialog`)
  await expect(page.locator('[data-radcn-dialog-content]')).toBeVisible()
  await expect(page.locator('[data-radcn-dialog-content]')).toHaveAttribute('role', 'dialog')
  await expect(page.locator('[data-radcn-command]')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.locator('[data-radcn-dialog-content]')).toBeHidden()

  await page.goto(`${candidate}/fixtures/command/custom-token`)
  await expect(page.locator('[data-radcn-command]')).toHaveClass(/radcn-fixture-custom-command/)
  await expect(page.locator('[data-radcn-command]')).toHaveCSS('border-color', 'rgb(15, 118, 110)')
})
