import type { Handle } from 'remix/ui'

import { classes } from '../utils/classes.ts'

export interface InputProps {
  ariaDescribedBy?: string
  ariaInvalid?: boolean
  class?: string
  disabled?: boolean
  id?: string
  name?: string
  placeholder?: string
  required?: boolean
  style?: string
  value?: string
}

export function Input(handle: Handle<InputProps>) {
  return () => {
    let {
      ariaDescribedBy,
      ariaInvalid,
      class: className,
      disabled,
      id,
      name,
      placeholder,
      required,
      style,
      value,
    } = handle.props

    return (
      <input
        class={classes('radcn-input', className)}
        data-radcn-input
        id={id}
        name={name}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        style={style}
        type="text"
        value={value}
        aria-describedby={ariaDescribedBy}
        aria-invalid={ariaInvalid ? 'true' : undefined}
      />
    )
  }
}
