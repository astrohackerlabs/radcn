import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'

// Field message surfaces as Tailwind utilities (Issue 6, Experiment 65). Exported so
// Form's message/description (which reuse the radcn-field-* classes) emit the same
// utilities. The marker classes are kept. ASCII comments; no bracketed class-like tokens.
export const fieldDescriptionClass = 'm-0 text-muted-foreground text-[0.8125rem] leading-[1.4] [font-family:var(--radcn-font)]'
export const fieldErrorClass =
  'm-0 text-[var(--radcn-field-error,var(--radcn-destructive))] font-medium text-[0.8125rem] leading-[1.4] [font-family:var(--radcn-font)]'

export type FieldOrientation = 'vertical' | 'horizontal' | 'responsive'
export type FieldLegendVariant = 'default' | 'label'

export interface FieldProps {
  children?: RemixNode
  class?: string
  invalid?: boolean
  orientation?: FieldOrientation
  style?: string
}

export interface FieldPartProps {
  children?: RemixNode
  class?: string
  id?: string
  style?: string
}

export interface FieldLabelProps extends FieldPartProps {
  disabled?: boolean
  for?: string
}

export interface FieldLegendProps extends FieldPartProps {
  variant?: FieldLegendVariant
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

// Field surfaces as Tailwind utilities (Issue 6, Experiment 37). Token-
// referencing utilities keep the custom-field fixture working. The invalid
// parent-state → label color (incl. the Label `[data-radcn-label]` cross-ref)
// and the consumer-applied `.radcn-field--choice-card` modifier stay bespoke in
// tokens.css.
const fieldRootClass = 'grid gap-2 max-w-96 text-foreground'
const fieldOrientationClass: Record<FieldOrientation, string> = {
  vertical: '',
  horizontal: 'grid-cols-[auto_minmax(0,1fr)] items-center',
  responsive: 'grid-cols-[minmax(0,12rem)_minmax(0,1fr)] items-start gap-x-4 gap-y-3 max-w-3xl max-[640px]:grid-cols-1',
}
const fieldSetClass = 'grid gap-3 min-w-0 m-0 border-0 p-0 text-foreground'
const fieldLegendClass = 'text-foreground text-[0.9375rem] font-semibold leading-[1.2] mb-1 p-0'
const fieldLegendVariantClass: Record<FieldLegendVariant, string> = {
  default: '',
  label: 'text-sm font-medium',
}
const fieldGroupClass = 'grid gap-4 min-w-0'
const fieldContentClass = 'grid gap-1.5 min-w-0'
const fieldLabelClass = 'text-foreground text-sm font-medium leading-[1.2] data-[disabled=true]:text-muted-foreground'
const fieldTitleClass = 'text-foreground text-sm font-medium leading-[1.2]'
const fieldSeparatorClass = 'h-px w-full m-0 border-0 bg-border'

export function Field(handle: Handle<FieldProps>) {
  return () => {
    let { children, class: className, invalid, orientation = 'vertical', style } = handle.props

    return (
      <div
        class={classes(fieldRootClass, fieldOrientationClass[orientation], className)}
        data-invalid={invalid ? 'true' : undefined}
        data-orientation={orientation}
        data-radcn-field
        style={style}
      >
        {children}
      </div>
    )
  }
}

export function FieldLabel(handle: Handle<FieldLabelProps>) {
  return () => {
    let { children, class: className, disabled, for: htmlFor, id, style } = handle.props

    return (
      <label
        class={classes(fieldLabelClass, className)}
        data-disabled={disabled ? 'true' : undefined}
        data-radcn-field-label
        for={htmlFor}
        id={id}
        style={style}
      >
        {children}
      </label>
    )
  }
}

export function FieldSet(handle: Handle<FieldPartProps>) {
  return () => {
    let { children, class: className, id, style } = handle.props

    return (
      <fieldset class={classes(fieldSetClass, className)} data-radcn-field-set id={id} style={style}>
        {children}
      </fieldset>
    )
  }
}

export function FieldLegend(handle: Handle<FieldLegendProps>) {
  return () => {
    let { children, class: className, id, style, variant = 'default' } = handle.props

    return (
      <legend class={classes(fieldLegendClass, fieldLegendVariantClass[variant], className)} data-radcn-field-legend data-variant={variant} id={id} style={style}>
        {children}
      </legend>
    )
  }
}

export function FieldGroup(handle: Handle<FieldPartProps>) {
  return () => {
    let { children, class: className, id, style } = handle.props

    return (
      <div class={classes(fieldGroupClass, className)} data-radcn-field-group id={id} style={style}>
        {children}
      </div>
    )
  }
}

export function FieldContent(handle: Handle<FieldPartProps>) {
  return () => {
    let { children, class: className, id, style } = handle.props

    return (
      <div class={classes(fieldContentClass, className)} data-radcn-field-content id={id} style={style}>
        {children}
      </div>
    )
  }
}

export function FieldTitle(handle: Handle<FieldPartProps>) {
  return () => {
    let { children, class: className, id, style } = handle.props

    return (
      <div class={classes(fieldTitleClass, className)} data-radcn-field-title id={id} style={style}>
        {children}
      </div>
    )
  }
}

export function FieldSeparator(handle: Handle<FieldPartProps>) {
  return () => {
    let { class: className, id, style } = handle.props

    return (
      <hr aria-hidden="true" class={classes(fieldSeparatorClass, className)} data-radcn-field-separator id={id} style={style} />
    )
  }
}

export function FieldDescription(handle: Handle<FieldDescriptionProps>) {
  return () => {
    let { children, class: className, id, style } = handle.props

    return (
      <p class={classes('radcn-field-description', fieldDescriptionClass, className)} data-radcn-field-description id={id} style={style}>
        {children}
      </p>
    )
  }
}

export function FieldError(handle: Handle<FieldErrorProps>) {
  return () => {
    let { children, class: className, id, style } = handle.props

    return (
      <p class={classes('radcn-field-error', fieldErrorClass, className)} data-radcn-field-error id={id} style={style}>
        {children}
      </p>
    )
  }
}
