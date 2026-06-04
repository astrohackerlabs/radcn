import type { Handle } from 'remix/ui'

import { classes } from '../utils/classes.ts'

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
        class={classes('radcn-checkbox-wrapper', `radcn-checkbox-wrapper--${state}`, className)}
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
          class="radcn-checkbox-input"
          data-radcn-checkbox-input
          data-state={state}
          disabled={disabled}
          id={id}
          name={name}
          required={required}
          type="checkbox"
          value={value}
        />
        <span aria-hidden="true" class="radcn-checkbox-indicator" data-radcn-checkbox-indicator>
          {indeterminate ? '-' : checked ? 'x' : ''}
        </span>
      </span>
    )
  }
}
