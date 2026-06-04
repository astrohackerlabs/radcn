import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'

export interface FieldProps {
  children?: RemixNode
  class?: string
  invalid?: boolean
  style?: string
}

export interface FieldDescriptionProps {
  children?: RemixNode
  class?: string
  id?: string
  style?: string
}

export interface FieldErrorProps {
  children?: RemixNode
  class?: string
  id?: string
  style?: string
}

export function Field(handle: Handle<FieldProps>) {
  return () => {
    let { children, class: className, invalid, style } = handle.props

    return (
      <div
        class={classes('radcn-field', className)}
        data-invalid={invalid ? 'true' : undefined}
        data-radcn-field
        style={style}
      >
        {children}
      </div>
    )
  }
}

export function FieldDescription(handle: Handle<FieldDescriptionProps>) {
  return () => {
    let { children, class: className, id, style } = handle.props

    return (
      <p class={classes('radcn-field-description', className)} data-radcn-field-description id={id} style={style}>
        {children}
      </p>
    )
  }
}

export function FieldError(handle: Handle<FieldErrorProps>) {
  return () => {
    let { children, class: className, id, style } = handle.props

    return (
      <p class={classes('radcn-field-error', className)} data-radcn-field-error id={id} style={style}>
        {children}
      </p>
    )
  }
}
