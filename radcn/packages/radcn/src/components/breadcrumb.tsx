import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'

// Breadcrumb surfaces as Tailwind utilities (Issue 6, Experiment 49). The base
// list/item/link/page/separator rules were SHARED with Pagination; both migrate
// together so the shared rules are fully removed. The trigger/glyph/truncate/
// responsive-*/drawer-links classes are a raw-class styling API the fixtures+docs
// apply directly (NOT emitted here) — their rules stay bespoke in tokens.css.
// Comments here are ASCII.
const breadcrumbListClass =
  'flex flex-wrap items-center gap-2 m-0 p-0 list-none text-muted-foreground text-[0.875rem] leading-[1.4] [font-family:var(--radcn-font)]'
const breadcrumbItemClass = 'inline-flex items-center gap-1.5'
const breadcrumbLinkClass =
  'inline-flex items-center justify-center min-h-8 rounded-md text-inherit no-underline outline-none hover:text-foreground'
const breadcrumbPageClass = 'text-foreground font-medium'
const breadcrumbSeparatorClass =
  'inline-flex min-w-6 min-h-6 items-center justify-center text-muted-foreground text-[length:var(--radcn-breadcrumb-separator-size,1rem)] leading-none'
const breadcrumbEllipsisClass =
  'inline-flex min-w-6 min-h-6 items-center justify-center text-muted-foreground rounded-md tracking-normal'

export interface BreadcrumbProps {
  ariaLabel?: string
  children?: RemixNode
  class?: string
  style?: string
}

export interface BreadcrumbPartProps {
  children?: RemixNode
  class?: string
  style?: string
}

export interface BreadcrumbLinkProps extends BreadcrumbPartProps {
  href?: string
}

export function Breadcrumb(handle: Handle<BreadcrumbProps>) {
  return () => {
    let { ariaLabel = 'breadcrumb', children, class: className, style } = handle.props

    return (
      <nav aria-label={ariaLabel} class={classes(className)} data-radcn-breadcrumb style={style}>
        {children}
      </nav>
    )
  }
}

export function BreadcrumbList(handle: Handle<BreadcrumbPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return (
      <ol class={classes(breadcrumbListClass, className)} data-radcn-breadcrumb-list style={style}>
        {children}
      </ol>
    )
  }
}

export function BreadcrumbItem(handle: Handle<BreadcrumbPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return (
      <li class={classes(breadcrumbItemClass, className)} data-radcn-breadcrumb-item style={style}>
        {children}
      </li>
    )
  }
}

export function BreadcrumbLink(handle: Handle<BreadcrumbLinkProps>) {
  return () => {
    let { children, class: className, href = '#', style } = handle.props

    return (
      <a class={classes(breadcrumbLinkClass, className)} data-radcn-breadcrumb-link href={href} style={style}>
        {children}
      </a>
    )
  }
}

export function BreadcrumbPage(handle: Handle<BreadcrumbPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return (
      <span
        aria-current="page"
        aria-disabled="true"
        class={classes(breadcrumbPageClass, className)}
        data-radcn-breadcrumb-page
        role="link"
        style={style}
      >
        {children}
      </span>
    )
  }
}

export function BreadcrumbSeparator(handle: Handle<BreadcrumbPartProps>) {
  return () => {
    let { children = '›', class: className, style } = handle.props

    return (
      <li
        aria-hidden="true"
        class={classes(breadcrumbSeparatorClass, className)}
        data-radcn-breadcrumb-separator
        role="presentation"
        style={style}
      >
        {children}
      </li>
    )
  }
}

export function BreadcrumbEllipsis(handle: Handle<BreadcrumbPartProps>) {
  return () => {
    let { children = '...', class: className, style } = handle.props

    return (
      <span
        aria-hidden="true"
        class={classes(breadcrumbEllipsisClass, className)}
        data-radcn-breadcrumb-ellipsis
        role="presentation"
        style={style}
      >
        {children}
        <span class="radcn-sr-only">More</span>
      </span>
    )
  }
}
