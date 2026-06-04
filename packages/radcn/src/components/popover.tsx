import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'
import { setupPositionedOverlay } from '../utils/positioned-overlay.ts'

export type PopoverSide = 'top' | 'right' | 'bottom' | 'left'
export type PopoverAlign = 'start' | 'center' | 'end'

export interface PopoverProps {
  children?: RemixNode
  class?: string
  defaultOpen?: boolean
  id?: string
  style?: string
}

export interface PopoverPartProps {
  children?: RemixNode
  class?: string
  style?: string
}

export interface PopoverButtonProps extends PopoverPartProps {
  ariaLabel?: string
}

export interface PopoverContentProps extends PopoverPartProps {
  align?: PopoverAlign
  side?: PopoverSide
  sideOffset?: number
}

export function enhancePopover(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-radcn-popover]').forEach((popover) => {
    setupPositionedOverlay(popover, {
      anchorSelector: '[data-radcn-popover-anchor]',
      closeSelector: '[data-radcn-popover-close]',
      contentSelector: '[data-radcn-popover-content]',
      expanded: true,
      mode: 'click',
      outsideDismiss: true,
      portalSelector: '[data-radcn-popover-portal]',
      readyDataKey: 'radcnPopoverReady',
      rootSelector: '[data-radcn-popover]',
      side: 'bottom',
      sideOffset: 4,
      triggerSelector: '[data-radcn-popover-trigger]',
    })
  })
}

export function Popover(handle: Handle<PopoverProps>) {
  return () => {
    let { children, class: className, defaultOpen, id, style } = handle.props

    return (
      <div
        class={classes('radcn-popover', className)}
        data-default-open={defaultOpen ? 'true' : undefined}
        data-open={defaultOpen ? 'true' : 'false'}
        data-radcn-popover
        data-state={defaultOpen ? 'open' : 'closed'}
        id={id}
        style={style}
      >
        {children}
      </div>
    )
  }
}

export function PopoverTrigger(handle: Handle<PopoverButtonProps>) {
  return () => {
    let { ariaLabel, children, class: className, style } = handle.props

    return (
      <button
        aria-haspopup="dialog"
        aria-label={ariaLabel}
        aria-expanded="false"
        class={classes('radcn-popover-trigger', className)}
        data-radcn-popover-trigger
        data-state="closed"
        style={style}
        type="button"
      >
        {children}
      </button>
    )
  }
}

export function PopoverAnchor(handle: Handle<PopoverPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return <span class={classes('radcn-popover-anchor', className)} data-radcn-popover-anchor style={style}>{children}</span>
  }
}

export function PopoverPortal(handle: Handle<PopoverPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return <div class={classes('radcn-popover-portal', className)} data-radcn-popover-portal data-state="closed" hidden style={style}>{children}</div>
  }
}

export function PopoverContent(handle: Handle<PopoverContentProps>) {
  return () => {
    let { align = 'center', children, class: className, side = 'bottom', sideOffset = 4, style } = handle.props

    return (
      <div
        class={classes('radcn-popover-content', className)}
        data-align={align}
        data-radcn-popover-content
        data-side={side}
        data-side-offset={String(sideOffset)}
        data-state="closed"
        hidden
        style={style}
      >
        {children}
      </div>
    )
  }
}

export function PopoverClose(handle: Handle<PopoverButtonProps>) {
  return () => {
    let { ariaLabel, children, class: className, style } = handle.props

    return <button aria-label={ariaLabel} class={classes('radcn-popover-close', className)} data-radcn-popover-close style={style} type="button">{children}</button>
  }
}

export function PopoverHeader(handle: Handle<PopoverPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return <div class={classes('radcn-popover-header', className)} data-radcn-popover-header style={style}>{children}</div>
  }
}

export function PopoverTitle(handle: Handle<PopoverPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return <h2 class={classes('radcn-popover-title', className)} data-radcn-popover-title style={style}>{children}</h2>
  }
}

export function PopoverDescription(handle: Handle<PopoverPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return <p class={classes('radcn-popover-description', className)} data-radcn-popover-description style={style}>{children}</p>
  }
}
