import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'

// DirectionProvider surface as Tailwind utilities (Issue 6, Experiment 56). Only
// the provider migrates; the radcn-direction-sample/-nested classes are fixture/docs
// demo raw classes (kept bespoke). Comments here are ASCII.
const directionProviderClass =
  'grid w-[min(100%,var(--radcn-direction-width,24rem))] gap-3 border border-[var(--radcn-direction-border,var(--radcn-border))] rounded-md bg-[var(--radcn-direction-bg,var(--radcn-background))] text-[var(--radcn-direction-fg,var(--radcn-foreground))] p-4 [font-family:var(--radcn-font)]'

export type DirectionValue = 'ltr' | 'rtl'

export interface DirectionProviderProps {
  children?: RemixNode
  class?: string
  dir?: DirectionValue
  direction?: DirectionValue
  id?: string
  style?: string
}

export function DirectionProvider(handle: Handle<DirectionProviderProps>) {
  return () => {
    let { children, class: className, dir = 'ltr', direction, id, style } = handle.props
    let value = direction ?? dir

    return (
      <div class={classes(directionProviderClass, className)} data-direction={value} data-radcn-direction-provider dir={value} id={id} style={style}>
        {children}
      </div>
    )
  }
}

export const Direction = DirectionProvider
