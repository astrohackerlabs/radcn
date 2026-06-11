import type { Handle } from 'remix/ui'

import { classes } from '../utils/classes.ts'

// Checkbox surfaces as Tailwind utilities (Issue 6, Experiment 39). RadCN's
// native-input control: the wrapper styles itself from the input's :checked /
// :focus-visible via has-[…]: variants (reading --radcn-control-* tokens). The
// base/input/state rules were SHARED with RadioGroup; both migrate together in
// Exp 39 so the shared rules are fully removed. The checked "x" mark reveal stays
// a bespoke parent-state->child rule in tokens.css.
const checkboxWrapperClass =
  'relative inline-flex shrink-0 items-center justify-center size-4 rounded-[calc(var(--radcn-radius)-0.1875rem)] border border-[var(--radcn-control-border,var(--radcn-input))] bg-[var(--radcn-control-bg,var(--radcn-background))] text-[var(--radcn-control-fg,var(--radcn-primary-foreground))] outline-none transition-[border-color,background-color,box-shadow] has-[:focus-visible]:border-[var(--radcn-ring)] has-[:focus-visible]:shadow-[0_0_0_3px_color-mix(in_srgb,var(--radcn-ring)_35%,transparent)] has-[:checked]:border-[var(--radcn-control-checked-bg,var(--radcn-primary))] has-[:checked]:bg-[var(--radcn-control-checked-bg,var(--radcn-primary))] data-[state=indeterminate]:border-[var(--radcn-control-checked-bg,var(--radcn-primary))] data-[state=indeterminate]:bg-[var(--radcn-control-checked-bg,var(--radcn-primary))] data-[invalid=true]:border-[var(--radcn-control-invalid,var(--radcn-destructive))] data-[invalid=true]:shadow-[0_0_0_3px_color-mix(in_srgb,var(--radcn-control-invalid,var(--radcn-destructive))_20%,transparent)] data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50'
const checkboxInputClass = 'absolute inset-0 m-0 opacity-0 cursor-pointer'
const checkboxIndicatorClass =
  'grid place-items-center size-full text-[var(--radcn-control-fg,var(--radcn-primary-foreground))] text-[0.6875rem] font-bold leading-none pointer-events-none'

export type CheckboxState = 'checked' | 'unchecked' | 'indeterminate'

export interface CheckboxProps {
  ariaDescribedBy?: string
  ariaInvalid?: boolean
  checked?: boolean
  class?: string
  disabled?: boolean
  id?: string
  indeterminate?: boolean
  name?: string
  required?: boolean
  style?: string
  value?: string
}

export function Checkbox(handle: Handle<CheckboxProps>) {
  return () => {
    let {
      ariaDescribedBy,
      ariaInvalid,
      checked,
      class: className,
      disabled,
      id,
      indeterminate,
      name,
      required,
      style,
      value = 'on',
    } = handle.props
    let state: CheckboxState = indeterminate ? 'indeterminate' : checked ? 'checked' : 'unchecked'

    return (
      <span
        class={classes(checkboxWrapperClass, className)}
        data-disabled={disabled ? 'true' : undefined}
        data-invalid={ariaInvalid ? 'true' : undefined}
        data-radcn-checkbox-wrapper
        data-state={state}
        style={style}
      >
        <input
          aria-checked={indeterminate ? 'mixed' : undefined}
          aria-describedby={ariaDescribedBy}
          aria-invalid={ariaInvalid ? 'true' : undefined}
          checked={checked}
          class={checkboxInputClass}
          data-radcn-checkbox-input
          data-state={state}
          disabled={disabled}
          id={id}
          name={name}
          required={required}
          type="checkbox"
          value={value}
        />
        <span aria-hidden="true" class={checkboxIndicatorClass} data-radcn-checkbox-indicator>
          {indeterminate ? '-' : ''}
        </span>
      </span>
    )
  }
}
