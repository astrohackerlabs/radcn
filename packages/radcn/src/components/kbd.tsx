import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'

export interface KbdProps {
  children?: RemixNode
  class?: string
  style?: string
}

export interface KbdGroupProps {
  children?: RemixNode
  class?: string
  style?: string
}

export function Kbd(handle: Handle<KbdProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return (
      <kbd class={classes('radcn-kbd', className)} data-radcn-kbd style={style}>
        {children}
      </kbd>
    )
  }
}

export function KbdGroup(handle: Handle<KbdGroupProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return (
      <div class={classes('radcn-kbd-group', className)} data-radcn-kbd-group style={style}>
        {children}
      </div>
    )
  }
}
