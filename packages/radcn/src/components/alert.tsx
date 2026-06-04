import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'

export type AlertVariant = 'default' | 'destructive'

export interface AlertProps {
  children?: RemixNode
  class?: string
  style?: string
  variant?: AlertVariant
}

export interface AlertPartProps {
  children?: RemixNode
  class?: string
  style?: string
}

export function Alert(handle: Handle<AlertProps>) {
  return () => {
    let { children, class: className, style, variant = 'default' } = handle.props

    return (
      <div
        class={classes('radcn-alert', `radcn-alert--${variant}`, className)}
        data-radcn-alert
        data-variant={variant}
        role="alert"
        style={style}
      >
        {children}
      </div>
    )
  }
}

export function AlertTitle(handle: Handle<AlertPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return (
      <div class={classes('radcn-alert-title', className)} data-radcn-alert-title style={style}>
        {children}
      </div>
    )
  }
}

export function AlertDescription(handle: Handle<AlertPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return (
      <div class={classes('radcn-alert-description', className)} data-radcn-alert-description style={style}>
        {children}
      </div>
    )
  }
}

export function AlertAction(handle: Handle<AlertPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return (
      <div class={classes('radcn-alert-action', className)} data-radcn-alert-action style={style}>
        {children}
      </div>
    )
  }
}
