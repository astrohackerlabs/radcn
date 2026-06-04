import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'

export type NativeSelectSize = 'default' | 'sm'

export interface NativeSelectProps {
  ariaDescribedBy?: string
  ariaInvalid?: boolean
  children?: RemixNode
  class?: string
  disabled?: boolean
  id?: string
  name?: string
  required?: boolean
  size?: NativeSelectSize
  style?: string
}

export interface NativeSelectOptionProps {
  children?: RemixNode
  class?: string
  disabled?: boolean
  selected?: boolean
  value?: string
}

export interface NativeSelectOptGroupProps {
  children?: RemixNode
  class?: string
  disabled?: boolean
  label: string
}

export function NativeSelect(handle: Handle<NativeSelectProps>) {
  return () => {
    let {
      ariaDescribedBy,
      ariaInvalid,
      children,
      class: className,
      disabled,
      id,
      name,
      required,
      size = 'default',
      style,
    } = handle.props

    return (
      <div
        class={classes('radcn-native-select-wrapper', `radcn-native-select-wrapper--${size}`, className)}
        data-radcn-native-select-wrapper
        data-size={size}
        style={style}
      >
        <select
          aria-describedby={ariaDescribedBy}
          aria-invalid={ariaInvalid ? 'true' : undefined}
          class={classes('radcn-native-select', `radcn-native-select--${size}`)}
          data-radcn-native-select
          data-size={size}
          disabled={disabled}
          id={id}
          name={name}
          required={required}
        >
          {children}
        </select>
        <span aria-hidden="true" class="radcn-native-select-icon" data-radcn-native-select-icon>
          v
        </span>
      </div>
    )
  }
}

export function NativeSelectOption(handle: Handle<NativeSelectOptionProps>) {
  return () => {
    let { children, class: className, disabled, selected, value } = handle.props

    return (
      <option
        class={classes('radcn-native-select-option', className)}
        data-radcn-native-select-option
        disabled={disabled}
        selected={selected}
        value={value}
      >
        {children}
      </option>
    )
  }
}

export function NativeSelectOptGroup(handle: Handle<NativeSelectOptGroupProps>) {
  return () => {
    let { children, class: className, disabled, label } = handle.props

    return (
      <optgroup class={classes('radcn-native-select-optgroup', className)} data-radcn-native-select-optgroup disabled={disabled} label={label}>
        {children}
      </optgroup>
    )
  }
}
