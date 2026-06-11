import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'
import { fieldDescriptionClass, fieldErrorClass } from './field.tsx'

// Form container surfaces as Tailwind utilities (Issue 6, Experiment 55). Only the
// layout containers migrate; the `.radcn-form-label[data-error]` / field-or-item
// `[data-invalid] .radcn-form-label` error-color rule stays bespoke (it colors the
// Label component, whose own color utilities it must not conflict with) — the
// component keeps emitting radcn-form-label + the field/item keep data-invalid.
// form-message/description styling comes from Field (radcn-field-error/-description).
// Comments here are ASCII.
const formRootClass = 'grid gap-4 w-[min(100%,var(--radcn-form-width,26rem))] text-foreground [font-family:var(--radcn-font)]'
const formFieldClass = 'grid gap-2'
const formControlClass = 'contents'

export type FormMethod = 'get' | 'post' | 'dialog'
export type FormEncType = 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain'
export type FormTarget = '_self' | '_blank' | '_parent' | '_top'

export interface FormProps {
  action?: string
  children?: RemixNode
  class?: string
  encType?: FormEncType
  id?: string
  method?: FormMethod
  name?: string
  style?: string
  target?: FormTarget
}

export interface FormPartProps {
  children?: RemixNode
  class?: string
  id?: string
  style?: string
}

export interface FormFieldProps extends FormPartProps {
  invalid?: boolean
  name?: string
}

export interface FormLabelProps extends FormPartProps {
  disabled?: boolean
  error?: boolean
  for?: string
}

export interface FormControlProps extends FormPartProps {
  ariaDescribedBy?: string
  ariaInvalid?: boolean
}

export interface FormMessageProps extends FormPartProps {
  hidden?: boolean
}

export interface FormFieldIds {
  controlId: string
  descriptionId: string
  messageId: string
}

export interface FormControlAttributes {
  ariaDescribedBy: string
  ariaInvalid?: boolean
  id: string
}

export function formFieldIds(id: string): FormFieldIds {
  return {
    controlId: `${id}-form-item`,
    descriptionId: `${id}-form-item-description`,
    messageId: `${id}-form-item-message`,
  }
}

export function formControlAttributes(
  ids: FormFieldIds,
  options: { invalid?: boolean; message?: boolean } = {},
): FormControlAttributes {
  let ariaDescribedBy = options.message
    ? `${ids.descriptionId} ${ids.messageId}`
    : ids.descriptionId

  return {
    ariaDescribedBy,
    ariaInvalid: options.invalid ? true : undefined,
    id: ids.controlId,
  }
}

export function Form(handle: Handle<FormProps>) {
  return () => {
    let { action, children, class: className, encType, id, method = 'post', name, style, target } = handle.props

    return (
      <form
        action={action}
        class={classes(formRootClass, className)}
        data-radcn-form
        enctype={encType}
        id={id}
        method={method}
        name={name}
        style={style}
        target={target}
      >
        {children}
      </form>
    )
  }
}

export function FormField(handle: Handle<FormFieldProps>) {
  return () => {
    let { children, class: className, id, invalid, name, style } = handle.props

    return (
      <div
        class={classes(formFieldClass, className)}
        data-invalid={invalid ? 'true' : undefined}
        data-name={name}
        data-radcn-form-field
        id={id}
        style={style}
      >
        {children}
      </div>
    )
  }
}

export function FormItem(handle: Handle<FormFieldProps>) {
  return () => {
    let { children, class: className, id, invalid, name, style } = handle.props

    return (
      <div
        class={classes(formFieldClass, className)}
        data-invalid={invalid ? 'true' : undefined}
        data-name={name}
        data-radcn-form-item
        id={id}
        style={style}
      >
        {children}
      </div>
    )
  }
}

export function FormLabel(handle: Handle<FormLabelProps>) {
  return () => {
    let { children, class: className, disabled, error, for: htmlFor, id, style } = handle.props

    return (
      <label
        class={classes('radcn-form-label', 'radcn-label', className)}
        data-disabled={disabled ? 'true' : undefined}
        data-error={error ? 'true' : undefined}
        data-radcn-form-label
        for={htmlFor}
        id={id}
        style={style}
      >
        {children}
      </label>
    )
  }
}

export function FormControl(handle: Handle<FormControlProps>) {
  return () => {
    let { ariaDescribedBy, ariaInvalid, children, class: className, id, style } = handle.props

    return (
      <div
        aria-describedby={ariaDescribedBy}
        aria-invalid={ariaInvalid ? 'true' : undefined}
        class={classes(formControlClass, className)}
        data-radcn-form-control
        id={id}
        style={style}
      >
        {children}
      </div>
    )
  }
}

export function FormDescription(handle: Handle<FormPartProps>) {
  return () => {
    let { children, class: className, id, style } = handle.props

    return (
      <p class={classes('radcn-form-description', 'radcn-field-description', fieldDescriptionClass, className)} data-radcn-form-description id={id} style={style}>
        {children}
      </p>
    )
  }
}

export function FormMessage(handle: Handle<FormMessageProps>) {
  return () => {
    let { children, class: className, hidden, id, style } = handle.props

    if (hidden || !children) {
      return null
    }

    return (
      <p class={classes('radcn-form-message', 'radcn-field-error', fieldErrorClass, className)} data-radcn-form-message id={id} style={style}>
        {children}
      </p>
    )
  }
}
