import type { Handle } from 'remix/ui'

import { classes } from '../utils/classes.ts'

export type SeparatorOrientation = 'horizontal' | 'vertical'

export interface SeparatorProps {
  class?: string
  decorative?: boolean
  orientation?: SeparatorOrientation
  style?: string
}

export function Separator(handle: Handle<SeparatorProps>) {
  return () => {
    let { class: className, decorative = true, orientation = 'horizontal', style } = handle.props

    return (
      <div
        class={classes('radcn-separator', `radcn-separator--${orientation}`, className)}
        data-orientation={orientation}
        data-radcn-separator
        role={decorative ? 'none' : 'separator'}
        aria-orientation={decorative ? undefined : orientation}
        style={style}
      />
    )
  }
}
