import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'

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
      <nav aria-label={ariaLabel} class={classes('radcn-breadcrumb', className)} data-radcn-breadcrumb style={style}>
        {children}
      </nav>
    )
  }
}

export function BreadcrumbList(handle: Handle<BreadcrumbPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return (
      <ol class={classes('radcn-breadcrumb-list', className)} data-radcn-breadcrumb-list style={style}>
        {children}
      </ol>
    )
  }
}

export function BreadcrumbItem(handle: Handle<BreadcrumbPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return (
      <li class={classes('radcn-breadcrumb-item', className)} data-radcn-breadcrumb-item style={style}>
        {children}
      </li>
    )
  }
}

export function BreadcrumbLink(handle: Handle<BreadcrumbLinkProps>) {
  return () => {
    let { children, class: className, href = '#', style } = handle.props

    return (
      <a class={classes('radcn-breadcrumb-link', className)} data-radcn-breadcrumb-link href={href} style={style}>
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
        class={classes('radcn-breadcrumb-page', className)}
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
    let { children = '/', class: className, style } = handle.props

    return (
      <li
        aria-hidden="true"
        class={classes('radcn-breadcrumb-separator', className)}
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
        class={classes('radcn-breadcrumb-ellipsis', className)}
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
