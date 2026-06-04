import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'

export type EmptyMediaVariant = 'default' | 'icon'

export interface EmptyProps {
  children?: RemixNode
  class?: string
  style?: string
}

export interface EmptyPartProps {
  children?: RemixNode
  class?: string
  style?: string
}

export interface EmptyMediaProps extends EmptyPartProps {
  variant?: EmptyMediaVariant
}

export function Empty(handle: Handle<EmptyProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return (
      <div class={classes('radcn-empty', className)} data-radcn-empty style={style}>
        {children}
      </div>
    )
  }
}

export function EmptyHeader(handle: Handle<EmptyPartProps>) {
  return () => emptyPart('radcn-empty-header', 'data-radcn-empty-header', handle.props)
}

export function EmptyTitle(handle: Handle<EmptyPartProps>) {
  return () => emptyPart('radcn-empty-title', 'data-radcn-empty-title', handle.props)
}

export function EmptyDescription(handle: Handle<EmptyPartProps>) {
  return () => emptyPart('radcn-empty-description', 'data-radcn-empty-description', handle.props)
}

export function EmptyContent(handle: Handle<EmptyPartProps>) {
  return () => emptyPart('radcn-empty-content', 'data-radcn-empty-content', handle.props)
}

export function EmptyMedia(handle: Handle<EmptyMediaProps>) {
  return () => {
    let { children, class: className, style, variant = 'default' } = handle.props

    return (
      <div
        class={classes('radcn-empty-media', `radcn-empty-media--${variant}`, className)}
        data-radcn-empty-media
        data-variant={variant}
        style={style}
      >
        {children}
      </div>
    )
  }
}

function emptyPart(className: string, dataAttribute: string, props: EmptyPartProps) {
  let { children, class: extraClass, style } = props

  return (
    <div class={classes(className, extraClass)} {...{ [dataAttribute]: true }} style={style}>
      {children}
    </div>
  )
}
