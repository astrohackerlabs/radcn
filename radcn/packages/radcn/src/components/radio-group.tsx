import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'

// RadioGroup surfaces as Tailwind utilities (Issue 6, Experiment 39). The item
// shares the native-input control base/state with Checkbox (both migrated in
// Exp 39 → the shared rules are fully removed); the item styles itself from its
// input via has-[…]: variants reading --radcn-control-* tokens. The checked-dot
// reveal stays a bespoke parent-state->child rule in tokens.css.
const radioGroupClass = 'grid gap-3'
const radioItemClass =
  'relative inline-flex shrink-0 items-center justify-center size-4 rounded-full border border-[var(--radcn-control-border,var(--radcn-input))] bg-[var(--radcn-control-bg,var(--radcn-background))] text-[var(--radcn-control-fg,var(--radcn-primary-foreground))] outline-none transition-[border-color,background-color,box-shadow] has-[:focus-visible]:border-[var(--radcn-ring)] has-[:focus-visible]:shadow-[0_0_0_3px_color-mix(in_srgb,var(--radcn-ring)_35%,transparent)] has-[:checked]:border-[var(--radcn-control-checked-bg,var(--radcn-primary))] has-[:checked]:bg-[var(--radcn-control-checked-bg,var(--radcn-primary))] data-[invalid=true]:border-[var(--radcn-control-invalid,var(--radcn-destructive))] data-[invalid=true]:shadow-[0_0_0_3px_color-mix(in_srgb,var(--radcn-control-invalid,var(--radcn-destructive))_20%,transparent)] data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50'
const radioInputClass = 'absolute inset-0 m-0 opacity-0 cursor-pointer'
const radioIndicatorClass = 'size-1.5 rounded-full bg-current opacity-0 pointer-events-none'

export interface RadioGroupProps {
  ariaDescribedBy?: string
  ariaInvalid?: boolean
  children?: RemixNode
  class?: string
  name: string
  style?: string
}

export interface RadioGroupItemProps {
  ariaDescribedBy?: string
  ariaInvalid?: boolean
  checked?: boolean
  class?: string
  disabled?: boolean
  id?: string
  name: string
  required?: boolean
  style?: string
  value: string
}

export function RadioGroup(handle: Handle<RadioGroupProps>) {
  return () => {
    let { ariaDescribedBy, ariaInvalid, children, class: className, name, style } = handle.props

    return (
      <div
        aria-describedby={ariaDescribedBy}
        aria-invalid={ariaInvalid ? 'true' : undefined}
        class={classes(radioGroupClass, className)}
        data-invalid={ariaInvalid ? 'true' : undefined}
        data-name={name}
        data-radcn-radio-group
        role="radiogroup"
        style={style}
      >
        {children}
      </div>
    )
  }
}

export function RadioGroupItem(handle: Handle<RadioGroupItemProps>) {
  return () => {
    let {
      ariaDescribedBy,
      ariaInvalid,
      checked,
      class: className,
      disabled,
      id,
      name,
      required,
      style,
      value,
    } = handle.props
    let state = checked ? 'checked' : 'unchecked'

    return (
      <span
        class={classes(radioItemClass, className)}
        data-disabled={disabled ? 'true' : undefined}
        data-invalid={ariaInvalid ? 'true' : undefined}
        data-radcn-radio-item
        data-state={state}
        style={style}
      >
        <input
          aria-describedby={ariaDescribedBy}
          aria-invalid={ariaInvalid ? 'true' : undefined}
          checked={checked}
          class={radioInputClass}
          data-radcn-radio-input
          data-state={state}
          disabled={disabled}
          id={id}
          name={name}
          required={required}
          type="radio"
          value={value}
        />
        <span aria-hidden="true" class={radioIndicatorClass} data-radcn-radio-indicator />
      </span>
    )
  }
}
