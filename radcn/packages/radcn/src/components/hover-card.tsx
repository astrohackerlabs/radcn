import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'

// Overlay trigger/close cluster as Tailwind utilities (Issue 6, Experiment 72). Shared
// structure via overlayTriggerBase (border-color a var the visible-border variants set);
// markers kept (button-group cascades + the drawer-content>close cascade + data hooks).
// ASCII comments; no bracketed class-like tokens.
const overlayTriggerBase =
  'inline-flex min-h-[var(--radcn-control-height)] items-center justify-center border border-[var(--radcn-ovl-bc,transparent)] rounded-md cursor-pointer py-2 px-4 font-medium text-[0.875rem] leading-none [font-family:var(--radcn-font)] outline-none focus-visible:shadow-[0_0_0_3px_color-mix(in_srgb,var(--radcn-ring)_35%,transparent)]'
const hoverCardTriggerClass =
  `${overlayTriggerBase} bg-[var(--radcn-overlay-trigger-bg,var(--radcn-primary))] text-[var(--radcn-overlay-trigger-fg,var(--radcn-primary-foreground))]`

import { setupPositionedOverlay } from '../utils/positioned-overlay.ts'
import type { PopoverAlign, PopoverSide } from './popover.tsx'

// HoverCardContent surface from shadcn/ui v4 (registry/new-york-v4/ui/
// hover-card.tsx). See Issue 6, Experiment 26 (mirrors Popover, Experiment 25).
// ENTER-only (the JS hides via the `hidden` attribute); the width default +
// two-column profile layout + collision clamp + transform origin stay in the
// [data-radcn-hover-card-content] bespoke rule.
const hoverCardContentClass =
  'z-50 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden animate-in fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2'

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

    return <button aria-label={ariaLabel} class={classes('radcn-hover-card-trigger', hoverCardTriggerClass, className)} data-radcn-hover-card-trigger data-state="closed" style={style} type="button">{children}</button>
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
        class={classes(hoverCardContentClass, className)}
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
