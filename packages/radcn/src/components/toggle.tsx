import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'

export type ToggleSize = 'default' | 'sm' | 'lg'
export type ToggleVariant = 'default' | 'outline'

export interface ToggleProps {
  ariaLabel?: string
  children?: RemixNode
  class?: string
  disabled?: boolean
  pressed?: boolean
  size?: ToggleSize
  style?: string
  variant?: ToggleVariant
}

function setToggleState(button: HTMLButtonElement, pressed: boolean) {
  button.setAttribute('aria-pressed', pressed ? 'true' : 'false')
  button.dataset.state = pressed ? 'on' : 'off'
}

function setupToggle(button: HTMLButtonElement) {
  if (button.dataset.radcnToggleReady === 'true') return

  setToggleState(button, button.getAttribute('aria-pressed') === 'true')
  button.dataset.radcnToggleReady = 'true'

  button.addEventListener('click', () => {
    if (button.disabled || button.getAttribute('aria-disabled') === 'true') return
    setToggleState(button, button.getAttribute('aria-pressed') !== 'true')
  })
}

export function enhanceToggle(root: ParentNode = document) {
  root.querySelectorAll<HTMLButtonElement>('[data-radcn-toggle]').forEach(setupToggle)
}

export function Toggle(handle: Handle<ToggleProps>) {
  return () => {
    let {
      ariaLabel,
      children,
      class: className,
      disabled,
      pressed,
      size = 'default',
      style,
      variant = 'default',
    } = handle.props
    let state = pressed ? 'on' : 'off'

    return (
      <button
        aria-disabled={disabled ? 'true' : undefined}
        aria-label={ariaLabel}
        aria-pressed={pressed ? 'true' : 'false'}
        class={classes('radcn-toggle', `radcn-toggle--${variant}`, `radcn-toggle--${size}`, className)}
        data-disabled={disabled ? 'true' : undefined}
        data-radcn-toggle
        data-state={state}
        data-variant={variant}
        disabled={disabled}
        style={style}
        type="button"
      >
        {children}
      </button>
    )
  }
}
