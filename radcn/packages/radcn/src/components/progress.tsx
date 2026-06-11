import type { Handle } from 'remix/ui'

import { classes } from '../utils/classes.ts'

// Tailwind utility classes adapted from shadcn/ui v4 (registry/new-york-v4/ui/
// progress.tsx) onto RadCN's width-based indicator architecture. See Issue 6,
// Experiment 21. The wrapper is the visible bar (shadcn Root); the indicator
// keeps its inline width:X% (RadCN's width-driven approach), so `w-0` is the
// empty default that the inline width overrides. The indeterminate state keeps
// the RadCN extension class radcn-progress-wrapper--indeterminate (+ its bespoke
// keyframe rule) — shadcn has no indeterminate Progress.
const progressWrapperClass = 'relative block h-2 w-full overflow-hidden rounded-full bg-primary/20'
const progressNativeClass = 'absolute inset-0 size-full opacity-0'
const progressTrackClass = 'block size-full'
const progressIndicatorClass = 'block h-full w-0 rounded-[inherit] bg-primary transition-all'

export interface ProgressProps {
  ariaLabel?: string
  class?: string
  max?: number
  style?: string
  value?: number
}

export function Progress(handle: Handle<ProgressProps>) {
  return () => {
    let { ariaLabel = 'Progress', class: className, max = 100, style, value } = handle.props
    let indeterminate = value === undefined
    let percent = value === undefined ? undefined : Math.max(0, Math.min(100, (value / max) * 100))
    let indicatorStyle = percent === undefined ? undefined : `width:${percent}%`

    return (
      <span
        class={classes(progressWrapperClass, indeterminate ? 'radcn-progress-wrapper--indeterminate' : undefined, className)}
        data-radcn-progress-wrapper
        data-state={indeterminate ? 'indeterminate' : 'determinate'}
        style={style}
      >
        <progress
          aria-label={ariaLabel}
          class={progressNativeClass}
          data-radcn-progress
          data-state={indeterminate ? 'indeterminate' : 'determinate'}
          max={max}
          value={value}
        />
        <span aria-hidden="true" class={progressTrackClass} data-radcn-progress-track>
          <span class={progressIndicatorClass} data-radcn-progress-indicator style={indicatorStyle} />
        </span>
      </span>
    )
  }
}
