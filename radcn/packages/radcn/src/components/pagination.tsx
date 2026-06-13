import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'

// Pagination surfaces as Tailwind utilities (Issue 6, Experiment 49). The base
// content/item/link rules were SHARED with Breadcrumb; both migrate together so
// the shared rules are fully removed. Comments here are ASCII.
const paginationNavClass = 'flex w-full justify-center [font-family:var(--radcn-font)]'
const paginationContentClass =
  'flex flex-wrap items-center gap-2 m-0 p-0 list-none text-muted-foreground text-[0.875rem] leading-[1.4] [font-family:var(--radcn-font)]'
const paginationItemClass = 'inline-flex items-center gap-1.5'
const paginationLinkClass =
  'inline-flex items-center justify-center min-h-8 rounded-md text-inherit no-underline outline-none hover:text-foreground min-w-8 px-2.5'
const paginationLinkActiveClass = 'text-foreground font-medium border border-border bg-background'
const paginationEllipsisClass =
  'inline-flex min-w-6 min-h-6 items-center justify-center text-muted-foreground'

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
      <nav aria-label={ariaLabel} class={classes(paginationNavClass, className)} data-radcn-pagination role="navigation" style={style}>
        {children}
      </nav>
    )
  }
}

export function PaginationContent(handle: Handle<PaginationPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return (
      <ul class={classes(paginationContentClass, className)} data-radcn-pagination-content style={style}>
        {children}
      </ul>
    )
  }
}

export function PaginationItem(handle: Handle<PaginationPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return (
      <li class={classes(paginationItemClass, className)} data-radcn-pagination-item style={style}>
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
        class={classes(paginationLinkClass, isActive ? paginationLinkActiveClass : undefined, className)}
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
      <PaginationLink ariaLabel="Go to previous page" class={classes('gap-1.5', className)} href={href}>
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
      <PaginationLink ariaLabel="Go to next page" class={classes('gap-1.5', className)} href={href}>
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
      <span aria-hidden="true" class={classes(paginationEllipsisClass, className)} data-radcn-pagination-ellipsis style={style}>
        {children}
        <span class="sr-only">More pages</span>
      </span>
    )
  }
}
