import type { Handle } from 'remix/ui'

import { classes } from '../utils/classes.ts'

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
        class={classes('radcn-progress-wrapper', indeterminate ? 'radcn-progress-wrapper--indeterminate' : undefined, className)}
        data-radcn-progress-wrapper
        data-state={indeterminate ? 'indeterminate' : 'determinate'}
        style={style}
      >
        <progress
          aria-label={ariaLabel}
          class="radcn-progress"
          data-radcn-progress
          data-state={indeterminate ? 'indeterminate' : 'determinate'}
          max={max}
          value={value}
        />
        <span aria-hidden="true" class="radcn-progress-track" data-radcn-progress-track>
          <span class="radcn-progress-indicator" data-radcn-progress-indicator style={indicatorStyle} />
        </span>
      </span>
    )
  }
}
