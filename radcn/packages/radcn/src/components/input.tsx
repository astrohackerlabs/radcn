import type { Handle } from 'remix/ui'

import { classes } from '../utils/classes.ts'

export type InputType = 'text' | 'email' | 'file' | 'password' | 'tel' | 'url'

export interface InputProps {
  ariaDescribedBy?: string
  ariaInvalid?: boolean
  class?: string
  disabled?: boolean
  id?: string
  name?: string
  placeholder?: string
  readOnly?: boolean
  required?: boolean
  style?: string
  type?: InputType
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
      readOnly,
      required,
      style,
      type = 'text',
      value,
    } = handle.props
    let sharedProps = {
      class: classes('radcn-input', className),
      'data-radcn-input': true,
      id,
      name,
      placeholder,
      readonly: readOnly,
      required,
      disabled,
      style,
      value,
      'aria-describedby': ariaDescribedBy,
    }

    if (type === 'file' || type === 'password') {
      return <input {...sharedProps} type={type} aria-invalid={ariaInvalid ? 'true' : undefined} />
    }

    return (
      <input
        {...sharedProps}
        aria-invalid={ariaInvalid ? 'true' : undefined}
        role="textbox"
        type={type}
      />
    )
  }
}
