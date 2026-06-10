import type { Handle } from 'remix/ui'

import { classes } from '../utils/classes.ts'

export interface SkeletonProps {
  class?: string
  style?: string
}

export function Skeleton(handle: Handle<SkeletonProps>) {
  return () => {
    let { class: className, style } = handle.props

    return <div aria-hidden="true" class={classes('animate-pulse rounded-md bg-accent', className)} data-radcn-skeleton style={style} />
  }
}
