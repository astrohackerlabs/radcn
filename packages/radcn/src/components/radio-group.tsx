import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'

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
        class={classes('radcn-radio-group', className)}
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
        class={classes('radcn-radio-item', `radcn-radio-item--${state}`, className)}
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
          class="radcn-radio-input"
          data-radcn-radio-input
          data-state={state}
          disabled={disabled}
          id={id}
          name={name}
          required={required}
          type="radio"
          value={value}
        />
        <span aria-hidden="true" class="radcn-radio-indicator" data-radcn-radio-indicator />
      </span>
    )
  }
}
