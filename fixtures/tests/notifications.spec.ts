import { readFile } from 'node:fs/promises'

import { expect, test } from '@playwright/test'

const candidate = 'http://localhost:4602'
const repoRoot = new URL('../..', import.meta.url)

async function packageJson() {
  return JSON.parse(await readFile(new URL('packages/radcn/package.json', repoRoot), 'utf8')) as {
    dependencies?: Record<string, string>
    devDependencies?: Record<string, string>
    exports?: Record<string, string>
  }
}

test('notification cluster exports sonner and toast without React notification dependencies', async () => {
  let pkg = await packageJson()
  let deps = { ...pkg.dependencies, ...pkg.devDependencies }
  expect(pkg.exports?.['./sonner']).toBe('./src/components/sonner.tsx')
  expect(pkg.exports?.['./toast']).toBe('./src/components/toast.ts')
  expect(deps).not.toHaveProperty('sonner')
  expect(deps).not.toHaveProperty('next-themes')
  expect(deps).not.toHaveProperty('react')
  expect(deps).not.toHaveProperty('react-dom')
})

test('candidate toaster renders accessible initial notifications and variants', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/sonner/default`)
  await expect(page.getByRole('region', { name: 'Notifications' })).toHaveAttribute('data-radcn-toaster', '')
  await expect(page.getByRole('status', { name: /Notification ready/ })).toBeVisible()
  await expect(page.locator('[data-radcn-toast]')).toHaveAttribute('data-type', 'default')

  await page.goto(`${candidate}/fixtures/sonner/success`)
  await expect(page.getByRole('status', { name: /Project published/ })).toBeVisible()
  await expect(page.locator('[data-radcn-toast]')).toHaveAttribute('data-type', 'success')

  await page.goto(`${candidate}/fixtures/sonner/error`)
  await expect(page.getByRole('alert', { name: /Build failed/ })).toBeVisible()
  await expect(page.locator('[data-radcn-toast]')).toHaveAttribute('data-type', 'error')

  await page.goto(`${candidate}/fixtures/sonner/loading`)
  await expect(page.getByRole('status', { name: /Syncing changes/ })).toBeVisible()
  await expect(page.locator('[data-radcn-toast]')).toHaveAttribute('data-type', 'loading')
})

test('candidate toaster covers actions dismiss stack and custom tokens', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/sonner/action`)
  await expect(page.locator('[data-radcn-toast-action]')).toHaveText('Undo')
  await expect(page.locator('[data-radcn-toast-action]')).toHaveAttribute('href', '/fixtures/sonner/action?undo=1')

  await page.goto(`${candidate}/fixtures/sonner/dismiss`)
  await expect(page.locator('[data-radcn-toast]')).toHaveCount(1)
  await page.getByRole('button', { name: 'Dismiss notification' }).click()
  await expect(page.locator('[data-radcn-toast]')).toHaveCount(0)

  await page.goto(`${candidate}/fixtures/sonner/stack`)
  await expect(page.locator('[data-radcn-toast]')).toHaveCount(3)
  await expect(page.locator('[data-radcn-toast][data-type="warning"]')).toContainText('Deploy paused')

  await page.goto(`${candidate}/fixtures/sonner/custom-token`)
  await expect(page.locator('[data-radcn-toaster]')).toHaveClass(/radcn-fixture-custom-toaster/)
  await expect(page.locator('[data-radcn-toast]')).toHaveCSS('background-color', 'rgb(240, 253, 250)')
})

test('candidate toast event dispatches browser notifications', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/toast/event`)
  await expect(page.locator('[data-radcn-toast]')).toHaveCount(0)
  await page.getByRole('button', { name: 'Show toast' }).click()
  await expect(page.getByRole('status', { name: /Event notification/ })).toBeVisible()
  await expect(page.locator('[data-radcn-toast]')).toHaveAttribute('data-type', 'success')
  await expect(page.locator('[data-radcn-toast-description]')).toHaveText('The RadCN toaster listens for browser events.')
})

test('candidate toast disposition supports server rendered action and no-js initial patterns', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/toast/form-action`)
  await expect(page.locator('[data-radcn-toast-recipe]')).toHaveCount(1)
  await expect(page.getByRole('status', { name: /Changes saved/ })).toBeVisible()
  await page.getByRole('button', { name: 'Save changes' }).click()
  await expect(page).toHaveURL(/\/fixtures\/toast\/form-action\?intent=notify$/)

  await page.goto(`${candidate}/fixtures/toast/no-js-initial`)
  await expect(page.getByRole('status', { name: /Server notification/ })).toBeVisible()
  await expect(page.locator('[data-radcn-toast]')).toHaveCount(1)
})
