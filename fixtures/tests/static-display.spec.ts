import { expect, test } from '@playwright/test'

const candidate = 'http://localhost:4602'

test('candidate alert exposes role variant and custom token hooks', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/alert/destructive`)
  let destructive = page.locator('[data-radcn-alert]')
  await expect(destructive).toHaveAttribute('role', 'alert')
  await expect(destructive).toHaveAttribute('data-variant', 'destructive')
  await expect(page.locator('[data-radcn-alert-title]')).toHaveText('Unable to save changes')

  await page.goto(`${candidate}/fixtures/alert/custom-token`)
  let custom = page.locator('[data-radcn-alert]')
  await expect(custom).toHaveClass(/radcn-fixture-custom-alert/)
  await expect(custom).toHaveCSS('border-color', 'rgb(15, 118, 110)')
})

test('candidate aspect ratio enforces requested layout ratios', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/aspect-ratio/default`)
  let wide = page.locator('[data-radcn-aspect-ratio]')
  await expect(wide).toHaveCSS('width', '420px')
  await expect(wide).toHaveCSS('height', '236.25px')

  await page.goto(`${candidate}/fixtures/aspect-ratio/custom-ratio`)
  let square = page.locator('[data-radcn-aspect-ratio]')
  await expect(square).toHaveCSS('width', '240px')
  await expect(square).toHaveCSS('height', '240px')
})

test('candidate badge exposes variant and customization hooks', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/badge/variants`)
  await expect(page.locator('[data-radcn-badge][data-variant="destructive"]')).toHaveText('Destructive')
  await expect(page.locator('[data-radcn-badge][data-variant="link"]')).toHaveAttribute('href', '/fixtures/badge/variants')

  await page.goto(`${candidate}/fixtures/badge/custom-class`)
  let custom = page.locator('[data-radcn-badge]')
  await expect(custom).toHaveClass(/radcn-fixture-custom-badge/)
  await expect(custom).toHaveCSS('background-color', 'rgb(79, 70, 229)')
})

test('candidate card exposes slot hooks and custom tokens', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/card/default`)
  await expect(page.locator('[data-radcn-card]')).toHaveAttribute('data-size', 'default')
  await expect(page.locator('[data-radcn-card-header]')).toHaveCount(1)
  await expect(page.locator('[data-radcn-card-title]')).toHaveText('Team workspace')
  await expect(page.locator('[data-radcn-card-description]')).toHaveText('Usage and billing summary.')
  await expect(page.locator('[data-radcn-card-content]')).toContainText('12 active members')
  await expect(page.locator('[data-radcn-card-footer]')).toHaveCount(1)
  await expect(page.locator('[data-radcn-card-action]')).toHaveCount(1)

  await page.goto(`${candidate}/fixtures/card/custom-token`)
  let custom = page.locator('[data-radcn-card]')
  await expect(custom).toHaveClass(/radcn-fixture-custom-card/)
  await expect(custom).toHaveCSS('border-color', 'rgb(147, 51, 234)')
})

test('candidate empty and kbd expose semantic slot hooks', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/empty/default`)
  await expect(page.locator('[data-radcn-empty]')).toHaveCount(1)
  await expect(page.locator('[data-radcn-empty-media]')).toHaveAttribute('data-variant', 'default')
  await expect(page.locator('[data-radcn-empty-title]')).toHaveText('No projects yet')
  await expect(page.locator('[data-radcn-empty-description]')).toContainText('Create a project')
  await expect(page.locator('[data-radcn-empty-content]')).toContainText('Create project')

  await page.goto(`${candidate}/fixtures/kbd/default`)
  let group = page.locator('[data-radcn-kbd-group]')
  await expect(group).toHaveCount(1)
  await expect(group).toHaveClass(/radcn-kbd-group/)

  let keys = page.locator('kbd[data-radcn-kbd]')
  await expect(keys).toHaveText(['Cmd', 'K'])
  await expect(keys.first()).toHaveClass(/radcn-kbd/)
})

test('candidate separator spinner and skeleton expose expected semantics', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/separator/orientations`)
  await expect(page.locator('[data-radcn-separator][data-orientation="horizontal"]')).toHaveAttribute('role', 'separator')
  await expect(page.locator('[data-radcn-separator][data-orientation="vertical"]')).toHaveAttribute('aria-orientation', 'vertical')

  await page.goto(`${candidate}/fixtures/spinner/default`)
  let spinner = page.locator('[data-radcn-spinner]')
  await expect(spinner).toHaveAttribute('role', 'status')
  await expect(spinner).toHaveAttribute('aria-label', 'Loading')

  await page.goto(`${candidate}/fixtures/spinner/custom-size`)
  let customSpinner = page.locator('[data-radcn-spinner]')
  await expect(customSpinner).toHaveClass(/radcn-fixture-custom-spinner/)
  await expect(customSpinner).toHaveCSS('width', '32px')

  await page.goto(`${candidate}/fixtures/skeleton/default`)
  let skeleton = page.locator('[data-radcn-skeleton]').first()
  await expect(skeleton).toHaveAttribute('aria-hidden', 'true')
  await expect(skeleton).toHaveCSS('animation-name', 'radcn-pulse')
})
