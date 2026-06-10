import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'

export type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link'

// Tailwind utility classes copied verbatim from shadcn/ui v4
// (registry/new-york-v4/ui/badge.tsx). See Issue 6, Experiment 5.
const badgeBase =
  'inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3'

const badgeVariants: Record<BadgeVariant, string> = {
  default: 'bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
  secondary: 'bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
  destructive:
    'bg-destructive text-white focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40 [a&]:hover:bg-destructive/90',
  outline: 'border-border text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
  ghost: '[a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
  link: 'text-primary underline-offset-4 [a&]:hover:underline',
}

export interface BadgeProps {
  children?: RemixNode
  class?: string
  href?: string
  style?: string
  variant?: BadgeVariant
}

export function Badge(handle: Handle<BadgeProps>) {
  return () => {
    let { children, class: className, href, style, variant = 'default' } = handle.props
    let mergedClass = classes(badgeBase, badgeVariants[variant], className)

    if (href) {
      return (
        <a class={mergedClass} data-radcn-badge data-variant={variant} href={href} style={style}>
          {children}
        </a>
      )
    }

    return (
      <span class={mergedClass} data-radcn-badge data-variant={variant} style={style}>
        {children}
      </span>
    )
  }
}
