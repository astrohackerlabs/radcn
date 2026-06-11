import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'

export type ButtonVariant = 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link'
export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon-sm' | 'icon' | 'icon-lg'

// Button (keystone) as Tailwind utilities (Issue 6, Experiment 70). Base↔variant/size
// property conflicts (border-color/min-h/px/py/font-size/width) resolve via the var-set
// pattern: the base READS `--radcn-btn-*` with the legacy defaults; each variant/size
// SETS the var. The radcn-button + --{variant}/--{size} markers are KEPT (specs assert
// them; the button-group cascades reference them). Consumer raw sites append the same
// utilities. Comments here are ASCII; no bracketed class-like tokens.
export const buttonBase =
  'inline-flex items-center justify-center gap-2 w-[var(--radcn-btn-w,max-content)] min-h-[var(--radcn-btn-mh,var(--radcn-control-height))] border border-[var(--radcn-btn-bc,transparent)] rounded-md py-[var(--radcn-btn-py,0.5rem)] px-[var(--radcn-btn-px,1rem)] font-medium text-[length:var(--radcn-btn-fs,0.875rem)] leading-none [font-family:var(--radcn-font)] no-underline whitespace-nowrap outline-none cursor-pointer [transition:background-color_120ms_ease,color_120ms_ease,border-color_120ms_ease] focus-visible:border-[var(--radcn-ring)] focus-visible:shadow-[0_0_0_3px_color-mix(in_srgb,var(--radcn-ring)_35%,transparent)] disabled:cursor-not-allowed disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:opacity-50'
export const buttonVariantClass: Record<ButtonVariant, string> = {
  default: 'bg-[var(--radcn-button-bg,var(--radcn-primary))] text-[var(--radcn-button-fg,var(--radcn-primary-foreground))]',
  secondary: 'bg-secondary text-secondary-foreground',
  outline: '[--radcn-btn-bc:var(--radcn-border)] bg-background text-foreground',
  ghost: 'bg-transparent text-foreground',
  destructive: 'bg-destructive text-destructive-foreground',
  link: '[--radcn-btn-mh:auto] [--radcn-btn-px:0] bg-transparent text-[var(--radcn-button-link-fg,var(--radcn-primary))] underline underline-offset-2',
}
export const buttonSizeClass: Record<ButtonSize, string> = {
  default: '',
  sm: '[--radcn-btn-mh:2rem] [--radcn-btn-px:0.75rem] [--radcn-btn-py:0.375rem] [--radcn-btn-fs:0.8125rem]',
  lg: '[--radcn-btn-mh:2.75rem] [--radcn-btn-px:1.25rem] [--radcn-btn-py:0.625rem] [--radcn-btn-fs:1rem]',
  icon: '[--radcn-btn-w:var(--radcn-control-height)] [--radcn-btn-px:0] [--radcn-btn-py:0]',
  'icon-sm': '[--radcn-btn-w:2rem] [--radcn-btn-mh:2rem] [--radcn-btn-px:0] [--radcn-btn-py:0]',
  'icon-lg': '[--radcn-btn-w:2.75rem] [--radcn-btn-mh:2.75rem] [--radcn-btn-px:0] [--radcn-btn-py:0]',
}

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
    let mergedClass = classes(buttonBase, buttonVariantClass[variant], buttonSizeClass[size], 'radcn-button', `radcn-button--${variant}`, `radcn-button--${size}`, className)

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
