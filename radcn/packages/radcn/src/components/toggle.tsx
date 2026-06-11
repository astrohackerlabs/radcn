import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'

export type ToggleSize = 'default' | 'sm' | 'lg'
export type ToggleVariant = 'default' | 'outline'

// Shared Toggle button surface as Tailwind utilities (Issue 6, Experiment 47).
// Toggle AND ToggleGroupItem render the same pressable button, exported here and
// reused by toggle-group.tsx. KEY: both variant (border/bg) AND size
// (min-height/padding/font-size) propagate via INHERITED CSS vars that utilities
// READ, never via a bespoke parent->child cascade — a cascade overriding a
// migrated child's border-color/min-height fails (Exp 45/47 diagnosis: it gives
// currentColor / loses to the child's utility), but a utility reading an inherited
// var works. Each toggle/group SETS the vars from its own data-variant/data-size;
// a variant/size-LESS group item inherits the group's vars; an item with its own
// variant/size re-sets them locally (local set beats inherited). The readers'
// fallbacks (transparent / control-height / 0.75rem / 0.5rem / 0.875rem) match the
// default. The font-size reader uses the length: hint (a bare text-[var] is color).
// Comments here are ASCII; no bracketed class-like tokens.
export const toggleBaseClass =
  'inline-flex items-center justify-center gap-2 border rounded-md cursor-pointer font-medium leading-none [font-family:var(--radcn-font)] outline-none transition-[background-color,color,border-color,box-shadow] text-[var(--radcn-toggle-fg,var(--radcn-foreground))] border-[color:var(--radcn-toggle-bc,transparent)] bg-[var(--radcn-toggle-bgc,transparent)] min-h-[var(--radcn-toggle-mh,var(--radcn-control-height))] px-[var(--radcn-toggle-px,0.75rem)] py-[var(--radcn-toggle-py,0.5rem)] text-[length:var(--radcn-toggle-fs,0.875rem)] data-[variant=outline]:[--radcn-toggle-bc:var(--radcn-toggle-border,var(--border))] data-[variant=outline]:[--radcn-toggle-bgc:var(--radcn-background)] data-[size=sm]:[--radcn-toggle-mh:2rem] data-[size=sm]:[--radcn-toggle-px:0.625rem] data-[size=sm]:[--radcn-toggle-py:0.375rem] data-[size=sm]:[--radcn-toggle-fs:0.8125rem] data-[size=lg]:[--radcn-toggle-mh:2.75rem] data-[size=lg]:[--radcn-toggle-px:1rem] data-[size=lg]:[--radcn-toggle-py:0.625rem] data-[size=lg]:[--radcn-toggle-fs:1rem] hover:bg-[var(--radcn-toggle-hover-bg,var(--radcn-secondary))] focus-visible:border-[var(--radcn-ring)] focus-visible:shadow-[0_0_0_3px_color-mix(in_srgb,var(--radcn-ring)_35%,transparent)] data-[state=on]:bg-[var(--radcn-toggle-pressed-bg,var(--radcn-primary))] data-[state=on]:text-[var(--radcn-toggle-pressed-fg,var(--radcn-primary-foreground))] data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50 disabled:cursor-not-allowed disabled:opacity-50'

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
        class={classes(toggleBaseClass, `radcn-toggle--${variant}`, `radcn-toggle--${size}`, className)}
        data-disabled={disabled ? 'true' : undefined}
        data-radcn-toggle
        data-size={size}
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
