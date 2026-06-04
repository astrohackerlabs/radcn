import type { Handle } from 'remix/ui'

import { classes } from '../utils/classes.ts'

export type SwitchSize = 'default' | 'sm'

export interface SwitchProps {
  ariaDescribedBy?: string
  ariaInvalid?: boolean
  checked?: boolean
  class?: string
  disabled?: boolean
  id?: string
  name?: string
  required?: boolean
  size?: SwitchSize
  style?: string
  value?: string
}

export function Switch(handle: Handle<SwitchProps>) {
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
      size = 'default',
      style,
      value = 'on',
    } = handle.props
    let state = checked ? 'checked' : 'unchecked'

    return (
      <span
        class={classes('radcn-switch-wrapper', `radcn-switch-wrapper--${size}`, `radcn-switch-wrapper--${state}`, className)}
        data-disabled={disabled ? 'true' : undefined}
        data-invalid={ariaInvalid ? 'true' : undefined}
        data-radcn-switch-wrapper
        data-size={size}
        data-state={state}
        style={style}
      >
        <input
          aria-describedby={ariaDescribedBy}
          aria-invalid={ariaInvalid ? 'true' : undefined}
          checked={checked}
          class="radcn-switch-input"
          data-radcn-switch-input
          data-size={size}
          data-state={state}
          disabled={disabled}
          id={id}
          name={name}
          required={required}
          role="switch"
          type="checkbox"
          value={value}
        />
        <span aria-hidden="true" class="radcn-switch-thumb" data-radcn-switch-thumb />
      </span>
    )
  }
}
