import { expect, test } from '@playwright/test'

const candidate = 'http://localhost:4602'

async function expectSkeletonBlock(
  locator: import('@playwright/test').Locator,
  width: string,
  height: string,
) {
  await expect(locator).toHaveAttribute('aria-hidden', 'true')
  await expect(locator).toHaveCSS('animation-name', 'radcn-pulse')
  await expect(locator).toHaveCSS('width', width)
  await expect(locator).toHaveCSS('height', height)
}

test('candidate alert exposes role variant and custom token hooks', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/alert/demo`)
  await expect(page.locator('[data-radcn-alert-demo] [data-radcn-alert]')).toHaveCount(3)
  await expect(page.locator('[data-radcn-alert-demo] [data-radcn-alert][role="alert"]')).toHaveCount(3)
  await expect(page.locator('[data-radcn-alert-demo] [data-radcn-alert][data-variant="default"]')).toHaveCount(2)
  await expect(page.locator('[data-radcn-alert-demo] [data-radcn-alert][data-variant="destructive"]')).toHaveCount(1)
  await expect(page.locator('[data-radcn-alert-demo] [data-radcn-alert-title]')).toHaveText([
    'Success! Your changes have been saved',
    'This Alert has a title and an icon. No description.',
    'Unable to process your payment.',
  ])
  await expect(page.locator('[data-radcn-alert-demo] [data-radcn-alert-description]')).toContainText([
    'This is an alert with icon, title and description.',
    'Please verify your billing information and try again.Check your card detailsEnsure sufficient fundsVerify billing address',
  ])
  await expect(page.locator('[data-radcn-alert-demo] li')).toHaveText([
    'Check your card details',
    'Ensure sufficient funds',
    'Verify billing address',
  ])
  await expect(page.locator('[data-radcn-fixture-alert-icon]')).toHaveCount(3)

  await page.goto(`${candidate}/fixtures/alert/destructive-upstream`)
  let upstreamDestructive = page.locator('[data-radcn-alert]')
  await expect(upstreamDestructive).toHaveAttribute('role', 'alert')
  await expect(upstreamDestructive).toHaveAttribute('data-variant', 'destructive')
  await expect(page.locator('[data-radcn-alert-title]')).toHaveText('Error')
  await expect(page.locator('[data-radcn-alert-description]')).toHaveText('Your session has expired. Please log in again.')
  await expect(page.locator('[data-radcn-fixture-alert-icon="alert-circle"]')).toHaveCount(1)

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

test('candidate aspect ratio renders named image demo parity', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/aspect-ratio/demo`)
  let root = page.locator('[data-radcn-aspect-ratio]')
  let image = page.locator('[data-radcn-fixture-aspect-ratio-image]')

  await expect(root).toHaveClass(/radcn-aspect-ratio/)
  await expect(root).toHaveClass(/rounded-lg/)
  await expect(root).toHaveClass(/bg-muted/)
  await expect(root).toHaveCSS('width', '420px')
  await expect(root).toHaveCSS('height', '236.25px')
  await expect(root).toHaveCSS('overflow', 'hidden')
  await expect(root).toHaveCSS('background-color', 'rgb(39, 39, 42)')
  await expect(root).toHaveCSS('border-radius', '6px')

  await expect(image).toHaveAttribute('alt', 'Photo by Drew Beamer')
  await expect(image).toHaveAttribute('data-radcn-fixture-image-source', 'remote-unsplash')
  await expect(image).toHaveAttribute('src', 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80')
  await expect(image).toHaveClass(/h-full/)
  await expect(image).toHaveClass(/w-full/)
  await expect(image).toHaveClass(/rounded-lg/)
  await expect(image).toHaveClass(/object-cover/)
  await expect(image).toHaveClass(/dark:brightness-\[0\.2\]/)
  await expect(image).toHaveClass(/dark:grayscale/)
  await expect(image).toHaveCSS('display', 'block')
  await expect(image).toHaveCSS('width', '420px')
  await expect(image).toHaveCSS('height', '236.25px')
  await expect(image).toHaveCSS('object-fit', 'cover')
  await expect(image).toHaveCSS('filter', 'brightness(0.2) grayscale(1)')
})

test('candidate badge exposes variant and customization hooks', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/badge/variants`)
  await expect(page.locator('[data-radcn-badge][data-variant="destructive"]')).toHaveText('Destructive')
  await expect(page.locator('[data-radcn-badge][data-variant="link"]')).toHaveAttribute('href', '/fixtures/badge/variants')

  await page.goto(`${candidate}/fixtures/badge/demo`)
  await expect(page.locator('[data-radcn-badge-demo] [data-radcn-badge]')).toHaveCount(8)
  await expect(page.locator('[data-radcn-badge-demo] [data-radcn-badge]').nth(0)).toHaveText('Badge')
  await expect(page.locator('[data-radcn-badge-demo] [data-radcn-badge][data-variant="secondary"]').first()).toContainText('Secondary')
  await expect(page.locator('[data-radcn-badge-demo] [data-radcn-badge][data-variant="destructive"]').first()).toHaveText('Destructive')
  await expect(page.locator('[data-radcn-badge-demo] [data-radcn-badge][data-variant="outline"]').first()).toHaveText('Outline')
  await expect(page.locator('[data-radcn-badge-icon]')).toHaveText('✓')
  await expect(page.locator('[data-radcn-badge-demo] [data-radcn-badge]').filter({ hasText: 'Verified' })).toHaveClass(/radcn-fixture-custom-badge/)
  await expect(page.locator('[data-radcn-badge-demo] [data-radcn-badge]').filter({ hasText: 'Verified' })).toHaveCSS('background-color', 'rgb(37, 99, 235)')
  await expect(page.locator('[data-radcn-badge-demo] .radcn-fixture-count-badge')).toHaveText(['8', '99', '20+'])
  await expect(page.locator('[data-radcn-badge-demo] .radcn-fixture-count-badge').first()).toHaveCSS('border-radius', '999px')

  await page.goto(`${candidate}/fixtures/badge/destructive`)
  await expect(page.locator('[data-radcn-badge]')).toHaveAttribute('data-variant', 'destructive')
  await expect(page.locator('[data-radcn-badge]')).toHaveText('Destructive')

  await page.goto(`${candidate}/fixtures/badge/outline`)
  await expect(page.locator('[data-radcn-badge]')).toHaveAttribute('data-variant', 'outline')
  await expect(page.locator('[data-radcn-badge]')).toHaveText('Outline')

  await page.goto(`${candidate}/fixtures/badge/secondary`)
  await expect(page.locator('[data-radcn-badge]')).toHaveAttribute('data-variant', 'secondary')
  await expect(page.locator('[data-radcn-badge]')).toHaveText('Secondary')

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

test('candidate card covers named upstream examples', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/card/demo`)
  let demo = page.locator('[data-radcn-card]').first()
  await expect(demo).toHaveClass(/radcn-fixture-card-demo/)
  await expect(page.locator('[data-radcn-card-header]')).toHaveCount(1)
  await expect(page.locator('[data-radcn-card-title]')).toHaveText('Login to your account')
  await expect(page.locator('[data-radcn-card-description]')).toHaveText('Enter your email below to login to your account')
  await expect(page.locator('[data-radcn-card-action] [data-radcn-button]')).toHaveAttribute('data-variant', 'link')
  await expect(page.locator('[data-radcn-card-action] [data-radcn-button]')).toHaveText('Sign Up')
  await expect(page.locator('form[data-radcn-card-demo-form="login"] [data-radcn-card-content]')).toHaveCount(1)
  await expect(page.getByLabel('Email')).toHaveAttribute('type', 'email')
  await expect(page.getByLabel('Email')).toHaveAttribute('required', '')
  await expect(page.getByLabel('Password')).toHaveAttribute('type', 'password')
  await expect(page.getByLabel('Password')).toHaveAttribute('required', '')
  await expect(page.getByRole('link', { name: 'Forgot your password?' })).toBeVisible()
  await expect(page.locator('form[data-radcn-card-demo-form="login"] [data-radcn-card-footer] [data-radcn-button]').nth(0)).toHaveText('Login')
  await expect(page.locator('form[data-radcn-card-demo-form="login"] [data-radcn-card-footer] [data-radcn-button]').nth(0)).toHaveAttribute('type', 'submit')
  await expect(page.locator('form[data-radcn-card-demo-form="login"] [data-radcn-card-footer] [data-radcn-button]').nth(0)).toHaveAttribute('style', /width:100%/)
  await expect(page.locator('[data-radcn-card-footer] [data-radcn-button]').nth(1)).toHaveAttribute('data-variant', 'outline')
  await expect(page.locator('[data-radcn-card-footer] [data-radcn-button]').nth(1)).toHaveText('Login with Google')

  await page.goto(`${candidate}/fixtures/card/with-form`)
  let project = page.locator('[data-radcn-card]').first()
  await expect(project).toHaveClass(/radcn-fixture-card-with-form/)
  await expect(page.locator('[data-radcn-card-title]')).toHaveText('Create project')
  await expect(page.locator('[data-radcn-card-description]')).toHaveText('Deploy your new project in one-click.')
  await expect(page.locator('form[data-radcn-card-demo-form="project"] [data-radcn-card-content]')).toHaveCount(1)
  await expect(page.getByLabel('Name')).toHaveAttribute('placeholder', 'Name of your project')
  await expect(page.locator('[data-radcn-select]')).toHaveAttribute('data-default-open', 'true')
  await expect(page.locator('[data-radcn-select-trigger]')).toBeVisible()
  await expect(page.locator('[data-radcn-select-content] [data-radcn-select-item-text]')).toHaveText([
    'Next.js',
    'SvelteKit',
    'Astro',
    'Nuxt.js',
  ])
  await expect(page.locator('[data-radcn-card-footer]')).toHaveAttribute('style', /justify-content:space-between/)
  await expect(page.locator('[data-radcn-card-footer] [data-radcn-button]').nth(0)).toHaveAttribute('data-variant', 'outline')
  await expect(page.locator('[data-radcn-card-footer] [data-radcn-button]')).toHaveText(['Cancel', 'Deploy'])
  await expect(page.locator('form[data-radcn-card-demo-form="project"] [data-radcn-card-footer] [data-radcn-button]').nth(1)).toHaveAttribute('type', 'submit')
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

test('candidate kbd covers shadcn example parity depth', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/kbd/button`)
  await expect(page.locator('[data-radcn-button]')).toHaveCount(2)
  await expect(page.locator('[data-radcn-button][data-variant="outline"]')).toHaveCount(2)
  await expect(page.locator('[data-radcn-button][data-size="sm"]')).toHaveCount(2)
  await expect(page.locator('[data-radcn-button] kbd[data-radcn-kbd]')).toHaveText(['⏎', 'Esc'])

  await page.goto(`${candidate}/fixtures/kbd/demo`)
  await expect(page.locator('[data-radcn-kbd-group]')).toHaveCount(2)
  await expect(page.locator('[data-radcn-kbd-group]').nth(0).locator('kbd[data-radcn-kbd]')).toHaveText(['⌘', '⇧', '⌥', '⌃'])
  await expect(page.locator('[data-radcn-kbd-group]').nth(1)).toContainText('Ctrl+B')
  await expect(page.locator('[data-radcn-kbd-group]').nth(1).locator('span')).toHaveText('+')

  await page.goto(`${candidate}/fixtures/kbd/group`)
  await expect(page.locator('[data-radcn-fixture-kbd-prose] [data-radcn-kbd-group]')).toHaveCount(2)
  await expect(page.locator('[data-radcn-fixture-kbd-prose] [data-radcn-kbd-group]').nth(0).locator('kbd[data-radcn-kbd]')).toHaveText(['Ctrl', 'B'])
  await expect(page.locator('[data-radcn-fixture-kbd-prose] [data-radcn-kbd-group]').nth(1).locator('kbd[data-radcn-kbd]')).toHaveText(['Ctrl', 'K'])

  await page.goto(`${candidate}/fixtures/kbd/input-group`)
  await expect(page.locator('[data-radcn-input-group]')).toHaveAttribute('role', 'group')
  await expect(page.locator('[data-radcn-fixture-search-icon]')).toHaveAttribute('aria-hidden', 'true')
  await expect(page.locator('[data-radcn-input-group-addon][data-align="inline-end"] kbd[data-radcn-kbd]')).toHaveText(['⌘', 'K'])
  await expect(page.getByRole('textbox', { name: '' })).toHaveAttribute('placeholder', 'Search documentation')

  await page.goto(`${candidate}/fixtures/kbd/tooltip`)
  await expect(page.locator('[data-radcn-button-group]')).toHaveAttribute('role', 'group')
  await expect(page.locator('[data-radcn-tooltip]')).toHaveCount(2)
  await expect(page.locator('[data-radcn-tooltip-trigger]')).toHaveText(['Save', 'Print'])
  await expect(page.locator('[data-radcn-tooltip-content]')).toHaveCount(2)
  await expect(page.locator('[data-radcn-tooltip-content]').nth(0).locator('kbd[data-radcn-kbd]')).toHaveText('S')
  await expect(page.locator('[data-radcn-tooltip-content]').nth(1).locator('[data-radcn-kbd-group] kbd[data-radcn-kbd]')).toHaveText(['Ctrl', 'P'])
})

test('candidate empty covers shadcn example parity depth', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/empty/demo`)
  await expect(page.locator('[data-radcn-empty]')).toHaveCount(1)
  await expect(page.locator('[data-radcn-empty-media]')).toHaveAttribute('data-variant', 'icon')
  await expect(page.locator('[data-radcn-empty-title]')).toHaveText('No projects yet')
  await expect(page.getByRole('button', { name: 'Create Project' })).toHaveAttribute('data-variant', 'default')
  await expect(page.getByRole('button', { name: 'Import Project' })).toHaveAttribute('data-variant', 'outline')
  await expect(page.getByRole('link', { name: 'Learn More' })).toHaveAttribute('data-variant', 'link')
  await expect(page.getByRole('link', { name: 'Learn More' })).toHaveAttribute('href', '/fixtures/empty/demo')

  await page.goto(`${candidate}/fixtures/empty/icon-grid`)
  let iconGridItems = page.locator('[data-radcn-empty]')
  await expect(iconGridItems).toHaveCount(4)
  await expect(page.locator('[data-radcn-empty-media][data-variant="icon"]')).toHaveCount(4)
  await expect(page.locator('[data-radcn-empty-title]')).toHaveText([
    'No messages',
    'No favorites',
    'No likes',
    'No bookmarks',
  ])

  await page.goto(`${candidate}/fixtures/empty/avatar`)
  await expect(page.locator('[data-radcn-empty-media] [data-radcn-avatar]')).toHaveCount(1)
  await expect(page.locator('[data-radcn-avatar-image]')).toHaveAttribute('alt', 'Riley Chen')
  await expect(page.locator('[data-radcn-avatar-fallback]')).toHaveText('RC')
  await expect(page.getByRole('button', { name: 'Leave Message' })).toHaveAttribute('data-radcn-button', '')

  await page.goto(`${candidate}/fixtures/empty/avatar-group`)
  await expect(page.locator('[data-radcn-empty-media] [data-radcn-avatar-group]')).toHaveAttribute('aria-label', 'Invited members')
  await expect(page.locator('[data-radcn-avatar-group] [data-radcn-avatar]')).toHaveCount(3)
  await expect(page.locator('[data-radcn-avatar-group-count]')).toHaveText('+2')
  await expect(page.getByRole('button', { name: 'Invite Members' })).toHaveAttribute('data-radcn-button', '')

  await page.goto(`${candidate}/fixtures/empty/input-group`)
  await expect(page.locator('[data-radcn-empty-title]')).toHaveText('Page not found')
  await expect(page.locator('[data-radcn-empty-content] [data-radcn-input-group]')).toHaveAttribute('role', 'group')
  await expect(page.getByRole('textbox', { name: '' })).toHaveAttribute('placeholder', 'Search documentation')
  await expect(page.locator('[data-radcn-input-group-addon][data-align="inline-end"] [data-radcn-kbd]')).toHaveText('/')
  await expect(page.getByRole('link', { name: 'contact support' })).toHaveAttribute('href', '/fixtures/empty/input-group')

  await page.goto(`${candidate}/fixtures/empty/outline`)
  let outline = page.locator('[data-radcn-empty]')
  await expect(outline).toHaveClass(/radcn-fixture-empty-outline/)
  await expect(outline).toHaveCSS('border-style', 'dashed')
  await expect(page.getByRole('button', { name: 'Upload Files' })).toHaveAttribute('data-variant', 'outline')

  await page.goto(`${candidate}/fixtures/empty/background`)
  let background = page.locator('[data-radcn-empty]')
  await expect(background).toHaveClass(/radcn-fixture-empty-background/)
  await expect(background).toHaveCSS('background-color', 'rgb(244, 244, 245)')
  await expect(page.getByRole('button', { name: 'Refresh' })).toHaveAttribute('data-variant', 'outline')
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

test('candidate skeleton covers named upstream examples', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/skeleton/card`)
  let card = page.locator('[data-radcn-skeleton-card]')
  await expect(card.locator('[data-radcn-skeleton]')).toHaveCount(3)
  await expectSkeletonBlock(card.locator('[data-radcn-skeleton]').nth(0), '250px', '125px')
  await expect(card.locator('[data-radcn-skeleton]').nth(0)).toHaveCSS('border-radius', '12px')
  await expectSkeletonBlock(card.locator('[data-radcn-skeleton]').nth(1), '250px', '16px')
  await expectSkeletonBlock(card.locator('[data-radcn-skeleton]').nth(2), '200px', '16px')

  await page.goto(`${candidate}/fixtures/skeleton/demo`)
  let demo = page.locator('[data-radcn-skeleton-demo]')
  await expect(demo.locator('[data-radcn-skeleton]')).toHaveCount(3)
  await expectSkeletonBlock(demo.locator('[data-radcn-skeleton]').nth(0), '48px', '48px')
  await expect(demo.locator('[data-radcn-skeleton]').nth(0)).toHaveCSS('border-radius', '999px')
  await expectSkeletonBlock(demo.locator('[data-radcn-skeleton]').nth(1), '250px', '16px')
  await expectSkeletonBlock(demo.locator('[data-radcn-skeleton]').nth(2), '200px', '16px')
})

test('candidate spinner covers shadcn example parity depth', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/spinner/basic`)
  await expect(page.getByRole('status', { name: 'Loading' })).toHaveAttribute('data-radcn-spinner', '')

  await page.goto(`${candidate}/fixtures/spinner/size`)
  let spinners = page.locator('[data-radcn-spinner]')
  await expect(spinners).toHaveCount(4)
  await expect(spinners.nth(0)).toHaveCSS('width', '12px')
  await expect(spinners.nth(1)).toHaveCSS('width', '16px')
  await expect(spinners.nth(2)).toHaveCSS('width', '24px')
  await expect(spinners.nth(3)).toHaveCSS('width', '32px')

  await page.goto(`${candidate}/fixtures/spinner/color`)
  let colors = page.locator('[data-radcn-spinner]')
  await expect(colors).toHaveCount(5)
  await expect(colors.nth(0)).toHaveCSS('color', 'rgb(220, 38, 38)')
  await expect(colors.nth(1)).toHaveCSS('color', 'rgb(22, 163, 74)')
  await expect(colors.nth(2)).toHaveCSS('color', 'rgb(37, 99, 235)')
  await expect(colors.nth(3)).toHaveCSS('color', 'rgb(202, 138, 4)')
  await expect(colors.nth(4)).toHaveCSS('color', 'rgb(147, 51, 234)')

  await page.goto(`${candidate}/fixtures/spinner/button`)
  let loadingButtons = page.locator('[data-radcn-button]')
  await expect(loadingButtons).toHaveCount(3)
  await expect(loadingButtons.nth(0)).toBeDisabled()
  await expect(loadingButtons.nth(1)).toBeDisabled()
  await expect(loadingButtons.nth(2)).toBeDisabled()
  await expect(page.locator('[data-radcn-button] [data-radcn-spinner]')).toHaveCount(3)
  await expect(page.getByRole('button', { name: /Loading/ })).toContainText('Loading...')
  await expect(page.getByRole('button', { name: /Please wait/ })).toHaveAttribute('data-variant', 'outline')
  await expect(page.getByRole('button', { name: /Processing/ })).toHaveAttribute('data-variant', 'secondary')

  await page.goto(`${candidate}/fixtures/spinner/badge`)
  await expect(page.locator('[data-radcn-badge]')).toHaveCount(3)
  await expect(page.locator('[data-radcn-badge] [data-radcn-spinner]')).toHaveCount(3)
  await expect(page.locator('[data-radcn-badge][data-variant="secondary"]')).toContainText('Updating')
  await expect(page.locator('[data-radcn-badge][data-variant="outline"]')).toContainText('Processing')

  await page.goto(`${candidate}/fixtures/spinner/input-group`)
  await expect(page.locator('[data-radcn-input-group]')).toHaveCount(2)
  await expect(page.locator('[data-radcn-input-group] [data-radcn-spinner]')).toHaveCount(2)
  await expect(page.locator('[data-radcn-input-group] input:disabled')).toHaveCount(1)
  await expect(page.locator('[data-radcn-input-group] textarea:disabled')).toHaveCount(1)
  await expect(page.getByRole('button', { name: 'Send message' })).toHaveAttribute('data-radcn-button', '')
  await expect(page.getByRole('button', { name: 'Send message' })).toHaveClass(/radcn-input-group-button/)

  await page.goto(`${candidate}/fixtures/spinner/empty`)
  await expect(page.locator('[data-radcn-empty-media][data-variant="icon"] [data-radcn-spinner]')).toHaveCount(1)
  await expect(page.locator('[data-radcn-empty-title]')).toHaveText('Processing your request')
  await expect(page.getByRole('button', { name: 'Cancel' })).toHaveAttribute('data-variant', 'outline')

  await page.goto(`${candidate}/fixtures/spinner/demo`)
  await expect(page.locator('[data-radcn-item][data-variant="muted"] [data-radcn-spinner]')).toHaveCount(1)
  await expect(page.locator('.radcn-fixture-spinner-meta')).toContainText('$100.00')

  await page.goto(`${candidate}/fixtures/spinner/item`)
  await expect(page.locator('[data-radcn-item-media][data-variant="icon"] [data-radcn-spinner]')).toHaveCount(1)
  await expect(page.getByRole('button', { name: 'Cancel' })).toHaveAttribute('data-variant', 'outline')
  await expect(page.locator('[data-radcn-item-footer] [data-radcn-progress]')).toHaveAttribute('value', '75')

  await page.goto(`${candidate}/fixtures/spinner/custom`)
  await expect(page.getByRole('status', { name: 'Custom loading' })).toHaveAttribute('data-radcn-custom-spinner', '')
})
