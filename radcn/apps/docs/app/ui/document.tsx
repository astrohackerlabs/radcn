import type { Handle, RemixNode } from 'remix/ui'
import { createElement, css } from 'remix/ui'
import { radcnStyles } from 'radcn/styles'

import { routes } from '../routes.ts'
import { docsBrand, docsThemeStyles } from './brand.ts'

export interface DocumentProps {
  children?: RemixNode
  head?: RemixNode
  title?: string
}

const DEFAULT_TITLE = readAppDisplayName('Docs')

export function Document(handle: Handle<DocumentProps>) {
  return () => {
    let { children, head, title = DEFAULT_TITLE } = handle.props

    return (
      <html data-radcn-theme="light" data-radcn-theme-mode="system" lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#ff2d20" media="(prefers-color-scheme: light)" />
          <meta name="theme-color" content="#ff4a3d" media="(prefers-color-scheme: dark)" />
          <meta name="color-scheme" content="light dark" />
          <link rel="icon" type="image/png" href="/favicon.ico" />
          <title>{title}</title>
          <InitialThemeScript />
          <link rel="stylesheet" href={routes.assets.href({ path: 'app/assets/tailwind.generated.css' })} />
          <RadcnStyle />
          <DocsThemeStyle />
          {head}
        </head>
        <body mix={css({ margin: 0 })}>
          {children}
          <script type="module" src={routes.assets.href({ path: 'app/assets/entry.ts' })}></script>
        </body>
      </html>
    )
  }
}

function RadcnStyle() {
  return () =>
    createElement('style', {
      'data-radcn-styles': '',
      innerHTML: radcnStyles.replace(/<\/style/gi, '<\\/style'),
    })
}

function DocsThemeStyle() {
  return () =>
    createElement('style', {
      'data-radcn-docs-theme': '',
      innerHTML: docsThemeStyles.replace(/<\/style/gi, '<\\/style'),
    })
}

function InitialThemeScript() {
  return () =>
    createElement('script', {
      innerHTML: `(() => {
  const modeKey = 'radcn-theme-mode'
  const legacyKey = 'radcn-theme'
  const isMode = (value) => value === 'system' || value === 'light' || value === 'dark'
  const resolve = (mode) => {
    if (mode === 'light' || mode === 'dark') return mode
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  }

  let mode = 'system'
  try {
    const storedMode = localStorage.getItem(modeKey)
    const legacyTheme = localStorage.getItem(legacyKey)
    mode = isMode(storedMode)
      ? storedMode
      : legacyTheme === 'light' || legacyTheme === 'dark'
        ? legacyTheme
        : 'system'
  } catch {
    mode = 'system'
  }

  const theme = resolve(mode)
  document.documentElement.dataset.radcnThemeMode = mode
  document.documentElement.dataset.radcnTheme = theme
  document.documentElement.style.colorScheme = theme
})()`.replace(/<\/script/gi, '<\\/script'),
    })
}

function readAppDisplayName(value: string): string {
  return value.startsWith('%%') ? 'Remix App' : decodeURIComponent(value)
}
