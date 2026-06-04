import type { Handle } from 'remix/ui'

import { classes } from '../utils/classes.ts'

export interface TextareaProps {
  ariaDescribedBy?: string
  ariaInvalid?: boolean
  class?: string
  disabled?: boolean
  id?: string
  name?: string
  placeholder?: string
  required?: boolean
  rows?: number
  style?: string
  value?: string
}

export function Textarea(handle: Handle<TextareaProps>) {
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
      rows,
      style,
      value,
    } = handle.props

    return (
      <textarea
        class={classes('radcn-textarea', className)}
        data-radcn-textarea
        disabled={disabled}
        id={id}
        name={name}
        placeholder={placeholder}
        required={required}
        rows={rows}
        style={style}
        value={value}
        aria-describedby={ariaDescribedBy}
        aria-invalid={ariaInvalid ? 'true' : undefined}
      />
    )
  }
}
