import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'
import { setupPositionedOverlay } from '../utils/positioned-overlay.ts'
import type { PopoverAlign, PopoverSide } from './popover.tsx'

export interface HoverCardProps {
  children?: RemixNode
  class?: string
  closeDelay?: number
  defaultOpen?: boolean
  id?: string
  openDelay?: number
  style?: string
}

export interface HoverCardPartProps {
  children?: RemixNode
  class?: string
  style?: string
}

export interface HoverCardButtonProps extends HoverCardPartProps {
  ariaLabel?: string
}

export interface HoverCardContentProps extends HoverCardPartProps {
  align?: PopoverAlign
  side?: PopoverSide
  sideOffset?: number
}

export function enhanceHoverCard(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-radcn-hover-card]').forEach((hoverCard) => {
    setupPositionedOverlay(hoverCard, {
      closeDelay: 300,
      contentSelector: '[data-radcn-hover-card-content]',
      mode: 'hover',
      openDelay: 700,
      portalSelector: '[data-radcn-hover-card-portal]',
      readyDataKey: 'radcnHoverCardReady',
      rootSelector: '[data-radcn-hover-card]',
      side: 'bottom',
      sideOffset: 4,
      triggerSelector: '[data-radcn-hover-card-trigger]',
    })
  })
}

export function HoverCard(handle: Handle<HoverCardProps>) {
  return () => {
    let { children, class: className, closeDelay, defaultOpen, id, openDelay, style } = handle.props

    return (
      <span
        class={classes('radcn-hover-card', className)}
        data-close-delay={closeDelay === undefined ? undefined : String(closeDelay)}
        data-default-open={defaultOpen ? 'true' : undefined}
        data-open={defaultOpen ? 'true' : 'false'}
        data-open-delay={openDelay === undefined ? undefined : String(openDelay)}
        data-radcn-hover-card
        data-state={defaultOpen ? 'open' : 'closed'}
        id={id}
        style={style}
      >
        {children}
      </span>
    )
  }
}

export function HoverCardTrigger(handle: Handle<HoverCardButtonProps>) {
  return () => {
    let { ariaLabel, children, class: className, style } = handle.props

    return <button aria-label={ariaLabel} class={classes('radcn-hover-card-trigger', className)} data-radcn-hover-card-trigger data-state="closed" style={style} type="button">{children}</button>
  }
}

export function HoverCardPortal(handle: Handle<HoverCardPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return <span class={classes('radcn-hover-card-portal', className)} data-radcn-hover-card-portal data-state="closed" hidden style={style}>{children}</span>
  }
}

export function HoverCardContent(handle: Handle<HoverCardContentProps>) {
  return () => {
    let { align = 'center', children, class: className, side = 'bottom', sideOffset = 4, style } = handle.props

    return (
      <span
        class={classes('radcn-hover-card-content', className)}
        data-align={align}
        data-radcn-hover-card-content
        data-side={side}
        data-side-offset={String(sideOffset)}
        data-state="closed"
        hidden
        style={style}
      >
        {children}
      </span>
    )
  }
}
