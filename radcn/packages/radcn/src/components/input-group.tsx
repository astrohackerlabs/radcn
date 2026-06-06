import type { Handle, RemixNode } from 'remix/ui'

import { Button, type ButtonSize, type ButtonVariant } from './button.tsx'
import type { InputProps, InputType } from './input.tsx'
import type { TextareaProps } from './textarea.tsx'
import { classes } from '../utils/classes.ts'

export type InputGroupAddonAlign = 'inline-start' | 'inline-end' | 'block-start' | 'block-end'
export type InputGroupButtonSize = 'xs' | 'sm' | 'icon-xs' | 'icon-sm'

export interface InputGroupProps {
  ariaLabel?: string
  ariaLabelledby?: string
  children?: RemixNode
  class?: string
  disabled?: boolean
  invalid?: boolean
  style?: string
}

export interface InputGroupAddonProps {
  align?: InputGroupAddonAlign
  children?: RemixNode
  class?: string
  style?: string
}

export interface InputGroupButtonProps {
  ariaDisabled?: boolean
  ariaLabel?: string
  children?: RemixNode
  class?: string
  disabled?: boolean
  name?: string
  size?: InputGroupButtonSize
  style?: string
  type?: 'button' | 'submit' | 'reset'
  value?: string
  variant?: ButtonVariant
}

export interface InputGroupTextProps {
  children?: RemixNode
  class?: string
  style?: string
}

export interface InputGroupInputProps extends Omit<InputProps, 'type'> {
  type?: Exclude<InputType, 'file'>
}

export interface InputGroupTextareaProps extends TextareaProps {}

export function enhanceInputGroup(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-radcn-input-group-addon]').forEach((addon) => {
    if (addon.dataset.radcnInputGroupAddonReady === 'true') return
    addon.addEventListener('click', (event) => {
      let target = event.target
      if (target instanceof Element && target.closest('button, a, input, textarea, select, [data-radcn-input-group-button]')) {
        return
      }
      let group = addon.closest<HTMLElement>('[data-radcn-input-group]')
      let control = group?.querySelector<HTMLInputElement | HTMLTextAreaElement>(
        '[data-radcn-input-group-control]:not(:disabled)',
      )
      control?.focus()
    })
    addon.dataset.radcnInputGroupAddonReady = 'true'
  })
}

export function InputGroup(handle: Handle<InputGroupProps>) {
  return () => {
    let { ariaLabel, ariaLabelledby, children, class: className, disabled, invalid, style } = handle.props

    return (
      <div
        aria-label={ariaLabelledby ? undefined : ariaLabel}
        aria-labelledby={ariaLabelledby}
        class={classes('radcn-input-group', className)}
        data-disabled={disabled ? 'true' : undefined}
        data-invalid={invalid ? 'true' : undefined}
        data-radcn-input-group
        role="group"
        style={style}
      >
        {children}
      </div>
    )
  }
}

export function InputGroupAddon(handle: Handle<InputGroupAddonProps>) {
  return () => {
    let { align = 'inline-start', children, class: className, style } = handle.props

    return (
      <div
        class={classes('radcn-input-group-addon', `radcn-input-group-addon--${align}`, className)}
        data-align={align}
        data-radcn-input-group-addon
        role="group"
        style={style}
      >
        {children}
      </div>
    )
  }
}

export function InputGroupButton(handle: Handle<InputGroupButtonProps>) {
  return () => {
    let {
      ariaDisabled,
      ariaLabel,
      children,
      class: className,
      disabled,
      name,
      size = 'xs',
      style,
      type = 'button',
      value,
      variant = 'ghost',
    } = handle.props
    let buttonSize: ButtonSize = size.startsWith('icon') ? 'icon' : 'sm'

    return (
      <Button
        ariaDisabled={ariaDisabled}
        ariaLabel={ariaLabel}
        class={classes('radcn-input-group-button', `radcn-input-group-button--${size}`, className)}
        disabled={disabled}
        name={name}
        size={buttonSize}
        style={style}
        type={type}
        value={value}
        variant={variant}
      >
        <span data-radcn-input-group-button data-size={size}>
          {children}
        </span>
      </Button>
    )
  }
}

export function InputGroupText(handle: Handle<InputGroupTextProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return (
      <span class={classes('radcn-input-group-text', className)} data-radcn-input-group-text style={style}>
        {children}
      </span>
    )
  }
}

export function InputGroupInput(handle: Handle<InputGroupInputProps>) {
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
      'aria-describedby': ariaDescribedBy,
      'aria-invalid': ariaInvalid ? true : undefined,
      class: classes('radcn-input', 'radcn-input-group-input', className),
      'data-radcn-input': true,
      'data-radcn-input-group-control': true,
      disabled,
      id,
      name,
      placeholder,
      readonly: readOnly,
      required,
      style,
      value,
    }

    if (type === 'password') {
      return <input {...sharedProps} type="password" aria-invalid={ariaInvalid ? 'true' : undefined} />
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

export function InputGroupTextarea(handle: Handle<InputGroupTextareaProps>) {
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
        aria-describedby={ariaDescribedBy}
        aria-invalid={ariaInvalid ? 'true' : undefined}
        class={classes('radcn-textarea', 'radcn-input-group-textarea', className)}
        data-radcn-input-group-control
        data-radcn-textarea
        disabled={disabled}
        id={id}
        name={name}
        placeholder={placeholder}
        required={required}
        rows={rows}
        style={style}
        value={value}
      />
    )
  }
}
