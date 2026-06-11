import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'

// ButtonGroup own surfaces as Tailwind utilities (Issue 6, Experiment 63). The
// `radcn-button-group` + `--{orientation}` marker classes are KEPT: the cross-component
// border-merge/sizing cascades and the --vertical/--clustered modifiers reference them
// and (being unlayered radcnStyles) reliably override the nested migrated Button's
// @layer-utilities radius (empirically probed). Those cascades + the separator
// orientation rules stay bespoke. Comments here are ASCII; no bracketed class-like tokens.
const buttonGroupBaseClass = 'flex w-fit items-stretch gap-0'
const buttonGroupTextClass =
  'inline-flex items-center justify-center border border-[var(--radcn-border)] bg-muted px-3 text-muted-foreground text-[0.8125rem] font-medium leading-none [font-family:var(--radcn-font)]'
const buttonGroupSeparatorClass = 'self-stretch bg-[var(--radcn-border)]'

export type ButtonGroupOrientation = 'horizontal' | 'vertical'

export interface ButtonGroupProps {
  ariaLabel?: string
  ariaLabelledby?: string
  children?: RemixNode
  class?: string
  orientation?: ButtonGroupOrientation
  style?: string
}

export interface ButtonGroupPartProps {
  children?: RemixNode
  class?: string
  style?: string
}

export interface ButtonGroupSeparatorProps {
  class?: string
  orientation?: ButtonGroupOrientation
  style?: string
}

export function ButtonGroup(handle: Handle<ButtonGroupProps>) {
  return () => {
    let { ariaLabel, ariaLabelledby, children, class: className, orientation = 'horizontal', style } = handle.props

    return (
      <div
        aria-label={ariaLabelledby ? undefined : ariaLabel}
        aria-labelledby={ariaLabelledby}
        class={classes('radcn-button-group', buttonGroupBaseClass, `radcn-button-group--${orientation}`, className)}
        data-orientation={orientation}
        data-radcn-button-group
        role="group"
        style={style}
      >
        {children}
      </div>
    )
  }
}

export function ButtonGroupText(handle: Handle<ButtonGroupPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return (
      <div class={classes('radcn-button-group-text', buttonGroupTextClass, className)} data-radcn-button-group-text style={style}>
        {children}
      </div>
    )
  }
}

export function ButtonGroupSeparator(handle: Handle<ButtonGroupSeparatorProps>) {
  return () => {
    let { class: className, orientation = 'vertical', style } = handle.props

    return (
      <div
        class={classes('radcn-button-group-separator', buttonGroupSeparatorClass, `radcn-button-group-separator--${orientation}`, className)}
        data-orientation={orientation}
        data-radcn-button-group-separator
        role="separator"
        aria-orientation={orientation}
        style={style}
      />
    )
  }
}
