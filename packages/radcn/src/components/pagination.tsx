import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'

export interface PaginationProps {
  ariaLabel?: string
  children?: RemixNode
  class?: string
  style?: string
}

export interface PaginationPartProps {
  children?: RemixNode
  class?: string
  style?: string
}

export interface PaginationLinkProps extends PaginationPartProps {
  ariaLabel?: string
  href?: string
  isActive?: boolean
}

export interface PaginationPreviousNextProps extends PaginationLinkProps {
  text?: string
}

export function Pagination(handle: Handle<PaginationProps>) {
  return () => {
    let { ariaLabel = 'pagination', children, class: className, style } = handle.props

    return (
      <nav aria-label={ariaLabel} class={classes('radcn-pagination', className)} data-radcn-pagination role="navigation" style={style}>
        {children}
      </nav>
    )
  }
}

export function PaginationContent(handle: Handle<PaginationPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return (
      <ul class={classes('radcn-pagination-content', className)} data-radcn-pagination-content style={style}>
        {children}
      </ul>
    )
  }
}

export function PaginationItem(handle: Handle<PaginationPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return (
      <li class={classes('radcn-pagination-item', className)} data-radcn-pagination-item style={style}>
        {children}
      </li>
    )
  }
}

export function PaginationLink(handle: Handle<PaginationLinkProps>) {
  return () => {
    let { ariaLabel, children, class: className, href = '#', isActive, style } = handle.props

    return (
      <a
        aria-current={isActive ? 'page' : undefined}
        aria-label={ariaLabel}
        class={classes('radcn-pagination-link', isActive ? 'radcn-pagination-link--active' : undefined, className)}
        data-active={isActive ? 'true' : undefined}
        data-radcn-pagination-link
        href={href}
        style={style}
      >
        {children}
      </a>
    )
  }
}

export function PaginationPrevious(handle: Handle<PaginationPreviousNextProps>) {
  return () => {
    let { class: className, href = '#', text = 'Previous' } = handle.props

    return (
      <PaginationLink ariaLabel="Go to previous page" class={classes('radcn-pagination-previous', className)} href={href}>
        <span aria-hidden="true" data-radcn-pagination-icon="previous">&lt;</span>
        <span data-radcn-pagination-previous-text>{text}</span>
      </PaginationLink>
    )
  }
}

export function PaginationNext(handle: Handle<PaginationPreviousNextProps>) {
  return () => {
    let { class: className, href = '#', text = 'Next' } = handle.props

    return (
      <PaginationLink ariaLabel="Go to next page" class={classes('radcn-pagination-next', className)} href={href}>
        <span data-radcn-pagination-next-text>{text}</span>
        <span aria-hidden="true" data-radcn-pagination-icon="next">&gt;</span>
      </PaginationLink>
    )
  }
}

export function PaginationEllipsis(handle: Handle<PaginationPartProps>) {
  return () => {
    let { children = '...', class: className, style } = handle.props

    return (
      <span aria-hidden="true" class={classes('radcn-pagination-ellipsis', className)} data-radcn-pagination-ellipsis style={style}>
        {children}
        <span class="radcn-sr-only">More pages</span>
      </span>
    )
  }
}
