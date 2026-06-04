import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'

export interface AspectRatioProps {
  children?: RemixNode
  class?: string
  ratio?: string
  style?: string
}

export function AspectRatio(handle: Handle<AspectRatioProps>) {
  return () => {
    let { children, class: className, ratio = '16 / 9', style } = handle.props
    let mergedStyle = style ? `aspect-ratio:${ratio};${style}` : `aspect-ratio:${ratio}`

    return (
      <div class={classes('radcn-aspect-ratio', className)} data-radcn-aspect-ratio style={mergedStyle}>
        {children}
      </div>
    )
  }
}
