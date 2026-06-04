import type { Handle } from 'remix/ui'

import { classes } from '../utils/classes.ts'

export interface SpinnerProps {
  ariaLabel?: string
  class?: string
  style?: string
}

export function Spinner(handle: Handle<SpinnerProps>) {
  return () => {
    let { ariaLabel = 'Loading', class: className, style } = handle.props

    return (
      <svg
        aria-label={ariaLabel}
        class={classes('radcn-spinner', className)}
        data-radcn-spinner
        fill="none"
        role="status"
        style={style}
        viewBox="0 0 24 24"
      >
        <circle class="radcn-spinner-track" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="radcn-spinner-head" d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" stroke-linecap="round" stroke-width="4" />
      </svg>
    )
  }
}
