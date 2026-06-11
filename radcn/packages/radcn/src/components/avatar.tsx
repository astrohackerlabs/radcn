import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'

export type AvatarSize = 'default' | 'sm' | 'lg'

// Avatar surfaces as Tailwind utilities (Issue 6, Experiment 32). Token-
// referencing arbitrary values reproduce RadCN's exact computed values and keep
// the custom-avatar fixture tokens working without translation. The avatar-group
// overlap (negative margins + ring) stays a bespoke composition rule in
// tokens.css (the children are separate components), keyed on the data attrs.
const avatarBaseClass =
  "relative inline-flex size-[var(--radcn-avatar-size,2.5rem)] shrink-0 items-center justify-center overflow-hidden rounded-[999px] bg-[var(--radcn-avatar-bg,var(--radcn-secondary))] text-[var(--radcn-avatar-fg,var(--radcn-secondary-foreground))] text-sm font-semibold leading-none select-none after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:border after:border-[var(--radcn-avatar-border,var(--radcn-border))] after:content-['']"
const avatarSizeClass: Record<AvatarSize, string> = {
  default: '',
  sm: 'text-xs [--radcn-avatar-size:2rem] [--radcn-avatar-badge-size:0.5rem]',
  lg: 'text-base [--radcn-avatar-size:3rem] [--radcn-avatar-badge-size:0.75rem]',
}
const avatarImageClass = 'absolute inset-0 z-[1] size-full object-cover'
const avatarFallbackClass =
  'flex size-full items-center justify-center bg-[var(--radcn-avatar-fallback-bg,var(--radcn-secondary))] text-[var(--radcn-avatar-fallback-fg,var(--radcn-secondary-foreground))]'
const avatarBadgeClass =
  'absolute right-0 bottom-0 z-[2] inline-flex size-[var(--radcn-avatar-badge-size,0.625rem)] items-center justify-center rounded-[999px] border-2 border-[var(--radcn-background)] bg-[var(--radcn-avatar-badge-bg,#16a34a)] text-[var(--radcn-avatar-badge-fg,#ffffff)]'
const avatarGroupClass = 'flex items-center isolate'
const avatarGroupCountClass =
  'inline-flex size-10 items-center justify-center rounded-[999px] bg-[var(--radcn-avatar-count-bg,var(--radcn-secondary))] text-[var(--radcn-avatar-count-fg,var(--radcn-secondary-foreground))] text-[0.8125rem] font-semibold leading-none'

export interface AvatarProps {
  children?: RemixNode
  class?: string
  size?: AvatarSize
  style?: string
}

export interface AvatarImageProps {
  alt?: string
  class?: string
  height?: number | string
  loading?: 'eager' | 'lazy'
  src?: string
  style?: string
  width?: number | string
}

export interface AvatarFallbackProps {
  ariaHidden?: boolean
  children?: RemixNode
  class?: string
  style?: string
}

export interface AvatarPartProps {
  ariaLabel?: string
  children?: RemixNode
  class?: string
  style?: string
}

export function Avatar(handle: Handle<AvatarProps>) {
  return () => {
    let { children, class: className, size = 'default', style } = handle.props

    return (
      <span
        class={classes(avatarBaseClass, avatarSizeClass[size], className)}
        data-radcn-avatar
        data-size={size}
        style={style}
      >
        {children}
      </span>
    )
  }
}

export function AvatarImage(handle: Handle<AvatarImageProps>) {
  return () => {
    let { alt = '', class: className, height, loading = 'lazy', src, style, width } = handle.props

    return (
      <img
        alt={alt}
        class={classes(avatarImageClass, className)}
        data-radcn-avatar-image
        height={height}
        loading={loading}
        src={src}
        style={style}
        width={width}
      />
    )
  }
}

export function AvatarFallback(handle: Handle<AvatarFallbackProps>) {
  return () => {
    let { ariaHidden, children, class: className, style } = handle.props

    return (
      <span
        aria-hidden={ariaHidden ? 'true' : undefined}
        class={classes(avatarFallbackClass, className)}
        data-radcn-avatar-fallback
        style={style}
      >
        {children}
      </span>
    )
  }
}

export function AvatarBadge(handle: Handle<AvatarPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return (
      <span aria-hidden="true" class={classes(avatarBadgeClass, className)} data-radcn-avatar-badge style={style}>
        {children}
      </span>
    )
  }
}

export function AvatarGroup(handle: Handle<AvatarPartProps>) {
  return () => {
    let { ariaLabel, children, class: className, style } = handle.props

    return (
      <div aria-label={ariaLabel} class={classes(avatarGroupClass, className)} data-radcn-avatar-group style={style}>
        {children}
      </div>
    )
  }
}

export function AvatarGroupCount(handle: Handle<AvatarPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return (
      <div class={classes(avatarGroupCountClass, className)} data-radcn-avatar-group-count style={style}>
        {children}
      </div>
    )
  }
}
