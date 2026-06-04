import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'

export interface LabelProps {
  children?: RemixNode
  class?: string
  disabled?: boolean
  for?: string
  style?: string
}

export function Label(handle: Handle<LabelProps>) {
  return () => {
    let { children, class: className, disabled, for: htmlFor, style } = handle.props

    return (
      <label
        class={classes('radcn-label', className)}
        data-disabled={disabled ? 'true' : undefined}
        data-radcn-label
        for={htmlFor}
        style={style}
      >
        {children}
      </label>
    )
  }
}
