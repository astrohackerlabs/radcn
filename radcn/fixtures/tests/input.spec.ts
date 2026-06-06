import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'

import { expect, test } from '@playwright/test'

const candidate = 'http://localhost:4602'

test('candidate input covers demo disabled and file examples', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/input/demo`)
  await expect(page.locator('[data-radcn-input]')).toHaveAttribute('type', 'email')
  await expect(page.locator('[data-radcn-input]')).toHaveAttribute('placeholder', 'Email')

  await page.goto(`${candidate}/fixtures/input/disabled`)
  let disabled = page.locator('[data-radcn-input]')
  await expect(disabled).toBeDisabled()
  await expect(disabled).toHaveCSS('cursor', 'not-allowed')

  await page.goto(`${candidate}/fixtures/input/file`)
  let fileInput = page.getByLabel('Picture')
  await expect(fileInput).toHaveAttribute('type', 'file')
  await expect(fileInput).not.toHaveAttribute('role', 'textbox')
  await expect(fileInput).toHaveCSS('color', 'rgb(113, 113, 122)')
  let selectorBackground = await fileInput.evaluate((node) => getComputedStyle(node, '::file-selector-button').backgroundColor)
  expect(selectorBackground).toBe('rgb(244, 244, 245)')

  let dir = await mkdtemp(path.join(os.tmpdir(), 'radcn-input-file-'))
  let fixtureFile = path.join(dir, 'avatar.txt')
  try {
    await writeFile(fixtureFile, 'radcn file input')
    await fileInput.setInputFiles(fixtureFile)
    await expect(fileInput).toHaveJSProperty('files.length', 1)
  } finally {
    await rm(dir, { force: true, recursive: true })
  }
})

test('candidate input covers button label and text composition', async ({ page }) => {
  await page.goto(`${candidate}/fixtures/input/with-button`)
  await expect(page.locator('#candidate-input-subscribe')).toHaveAttribute('type', 'email')
  await expect(page.getByRole('button', { name: 'Subscribe' })).toHaveAttribute('data-variant', 'outline')
  await page.locator('#candidate-input-subscribe').fill('team@radcn.dev')
  await page.getByRole('button', { name: 'Subscribe' }).click()
  await expect(page).toHaveURL(/\/fixtures\/input\/with-button\?email=team%40radcn\.dev&intent=subscribe$/)

  await page.goto(`${candidate}/fixtures/input/with-label`)
  await expect(page.getByLabel('Email')).toHaveId('candidate-input-label-email')
  await expect(page.getByLabel('Email')).toHaveAttribute('placeholder', 'Email')

  await page.goto(`${candidate}/fixtures/input/with-text`)
  let described = page.getByLabel('Email')
  await expect(described).toHaveId('candidate-input-text-email')
  await expect(described).toHaveAttribute('aria-describedby', 'candidate-input-text-description')
  await expect(page.locator('#candidate-input-text-description')).toHaveText('Enter the email address connected to this workspace.')
})
