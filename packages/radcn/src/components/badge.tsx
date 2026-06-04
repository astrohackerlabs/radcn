import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'

export type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link'

export interface BadgeProps {
  children?: RemixNode
  class?: string
  href?: string
  style?: string
  variant?: BadgeVariant
}

export function Badge(handle: Handle<BadgeProps>) {
  return () => {
    let { children, class: className, href, style, variant = 'default' } = handle.props
    let mergedClass = classes('radcn-badge', `radcn-badge--${variant}`, className)

    if (href) {
      return (
        <a class={mergedClass} data-radcn-badge data-variant={variant} href={href} style={style}>
          {children}
        </a>
      )
    }

    return (
      <span class={mergedClass} data-radcn-badge data-variant={variant} style={style}>
        {children}
      </span>
    )
  }
}
