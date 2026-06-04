import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'

export type ButtonVariant = 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive'
export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon'

export interface ButtonProps {
  ariaDisabled?: boolean
  children?: RemixNode
  class?: string
  disabled?: boolean
  href?: string
  name?: string
  size?: ButtonSize
  style?: string
  type?: 'button' | 'submit' | 'reset'
  value?: string
  variant?: ButtonVariant
}

export function Button(handle: Handle<ButtonProps>) {
  return () => {
    let {
      ariaDisabled,
      children,
      class: className,
      disabled,
      href,
      name,
      size = 'default',
      style,
      type = 'button',
      value,
      variant = 'default',
    } = handle.props
    let mergedClass = classes('radcn-button', `radcn-button--${variant}`, `radcn-button--${size}`, className)

    if (href) {
      return (
        <a
          class={mergedClass}
          data-radcn-button
          data-size={size}
          data-variant={variant}
          href={href}
          style={style}
          aria-disabled={ariaDisabled ? 'true' : undefined}
        >
          {children}
        </a>
      )
    }

    return (
      <button
        class={mergedClass}
        data-radcn-button
        data-size={size}
        data-variant={variant}
        disabled={disabled}
        name={name}
        style={style}
        type={type}
        value={value}
        aria-disabled={ariaDisabled ? 'true' : undefined}
      >
        {children}
      </button>
    )
  }
}
