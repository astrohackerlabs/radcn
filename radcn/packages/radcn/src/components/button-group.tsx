import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'

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
        class={classes('radcn-button-group', `radcn-button-group--${orientation}`, className)}
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
      <div class={classes('radcn-button-group-text', className)} data-radcn-button-group-text style={style}>
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
        class={classes('radcn-button-group-separator', `radcn-button-group-separator--${orientation}`, className)}
        data-orientation={orientation}
        data-radcn-button-group-separator
        role="separator"
        aria-orientation={orientation}
        style={style}
      />
    )
  }
}
