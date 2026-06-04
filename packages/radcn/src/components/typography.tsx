import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'

export interface TypographyProps {
  children?: RemixNode
  class?: string
  style?: string
}

export function TypographyH1(handle: Handle<TypographyProps>) {
  return () => {
    let { children, class: className, style } = handle.props
    return <h1 class={classes('radcn-typography-h1', className)} data-radcn-typography-h1 style={style}>{children}</h1>
  }
}

export function TypographyH2(handle: Handle<TypographyProps>) {
  return () => {
    let { children, class: className, style } = handle.props
    return <h2 class={classes('radcn-typography-h2', className)} data-radcn-typography-h2 style={style}>{children}</h2>
  }
}

export function TypographyH3(handle: Handle<TypographyProps>) {
  return () => {
    let { children, class: className, style } = handle.props
    return <h3 class={classes('radcn-typography-h3', className)} data-radcn-typography-h3 style={style}>{children}</h3>
  }
}

export function TypographyH4(handle: Handle<TypographyProps>) {
  return () => {
    let { children, class: className, style } = handle.props
    return <h4 class={classes('radcn-typography-h4', className)} data-radcn-typography-h4 style={style}>{children}</h4>
  }
}

export function TypographyP(handle: Handle<TypographyProps>) {
  return () => {
    let { children, class: className, style } = handle.props
    return <p class={classes('radcn-typography-p', className)} data-radcn-typography-p style={style}>{children}</p>
  }
}

export function TypographyBlockquote(handle: Handle<TypographyProps>) {
  return () => {
    let { children, class: className, style } = handle.props
    return <blockquote class={classes('radcn-typography-blockquote', className)} data-radcn-typography-blockquote style={style}>{children}</blockquote>
  }
}

export function TypographyList(handle: Handle<TypographyProps>) {
  return () => {
    let { children, class: className, style } = handle.props
    return <ul class={classes('radcn-typography-list', className)} data-radcn-typography-list style={style}>{children}</ul>
  }
}

export function TypographyListItem(handle: Handle<TypographyProps>) {
  return () => {
    let { children, class: className, style } = handle.props
    return <li class={classes('radcn-typography-list-item', className)} data-radcn-typography-list-item style={style}>{children}</li>
  }
}

export function TypographyInlineCode(handle: Handle<TypographyProps>) {
  return () => {
    let { children, class: className, style } = handle.props
    return <code class={classes('radcn-typography-inline-code', className)} data-radcn-typography-inline-code style={style}>{children}</code>
  }
}

export function TypographyLead(handle: Handle<TypographyProps>) {
  return () => {
    let { children, class: className, style } = handle.props
    return <p class={classes('radcn-typography-lead', className)} data-radcn-typography-lead style={style}>{children}</p>
  }
}

export function TypographyLarge(handle: Handle<TypographyProps>) {
  return () => {
    let { children, class: className, style } = handle.props
    return <div class={classes('radcn-typography-large', className)} data-radcn-typography-large style={style}>{children}</div>
  }
}

export function TypographySmall(handle: Handle<TypographyProps>) {
  return () => {
    let { children, class: className, style } = handle.props
    return <small class={classes('radcn-typography-small', className)} data-radcn-typography-small style={style}>{children}</small>
  }
}

export function TypographyMuted(handle: Handle<TypographyProps>) {
  return () => {
    let { children, class: className, style } = handle.props
    return <p class={classes('radcn-typography-muted', className)} data-radcn-typography-muted style={style}>{children}</p>
  }
}
