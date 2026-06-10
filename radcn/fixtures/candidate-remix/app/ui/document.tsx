import type { Handle, RemixNode } from 'remix/ui'
import { css } from 'remix/ui'
import { radcnStyles } from 'radcn/styles'

import { routes } from '../routes.ts'

export interface DocumentProps {
  children?: RemixNode
  head?: RemixNode
  title?: string
}

const DEFAULT_TITLE = 'RadCN Candidate Fixtures'

export function Document(handle: Handle<DocumentProps>) {
  return () => {
    let { children, head, title = DEFAULT_TITLE } = handle.props

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>{title}</title>
          <link rel="stylesheet" href={routes.assets.href({ path: 'app/assets/tailwind.generated.css' })} />
          <style>{radcnStyles}</style>
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
