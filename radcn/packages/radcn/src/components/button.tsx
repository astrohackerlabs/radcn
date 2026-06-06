import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'

export type ButtonVariant = 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link'
export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon-sm' | 'icon' | 'icon-lg'

export interface ButtonProps {
  ariaDisabled?: boolean
  ariaLabel?: string
  children?: RemixNode
  class?: string
  disabled?: boolean
  href?: string
  name?: string
  rmxDocument?: boolean
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
      ariaLabel,
      children,
      class: className,
      disabled,
      href,
      name,
      rmxDocument,
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
          rmx-document={rmxDocument ? '' : undefined}
          style={style}
          aria-disabled={ariaDisabled ? 'true' : undefined}
          aria-label={ariaLabel}
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
        aria-label={ariaLabel}
      >
        {children}
      </button>
    )
  }
}
