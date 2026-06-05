import type { Handle, RemixNode } from 'remix/ui'
import { createElement, css } from 'remix/ui'
import { radcnStyles } from 'radcn/styles'

import { routes } from '../routes.ts'
import { docsBrand } from './brand.ts'

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
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content={docsBrand.color.accent} />
          <meta name="color-scheme" content="light" />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <title>{title}</title>
          <RadcnStyle />
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

function readAppDisplayName(value: string): string {
  return value.startsWith('%%') ? 'Remix App' : decodeURIComponent(value)
}
