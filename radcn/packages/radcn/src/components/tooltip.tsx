import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'

// Overlay trigger/close cluster as Tailwind utilities (Issue 6, Experiment 72). Shared
// structure via overlayTriggerBase (border-color a var the visible-border variants set);
// markers kept (button-group cascades + the drawer-content>close cascade + data hooks).
// ASCII comments; no bracketed class-like tokens.
const overlayTriggerBase =
  'inline-flex min-h-[var(--radcn-control-height)] items-center justify-center border border-[var(--radcn-ovl-bc,transparent)] rounded-md cursor-pointer py-2 px-4 font-medium text-[0.875rem] leading-none [font-family:var(--radcn-font)] outline-none focus-visible:shadow-[0_0_0_3px_color-mix(in_srgb,var(--radcn-ring)_35%,transparent)]'
const tooltipTriggerClass =
  `${overlayTriggerBase} bg-[var(--radcn-overlay-trigger-bg,var(--radcn-primary))] text-[var(--radcn-overlay-trigger-fg,var(--radcn-primary-foreground))]`

import { setupPositionedOverlay } from '../utils/positioned-overlay.ts'
import type { PopoverAlign, PopoverSide } from './popover.tsx'

// Tailwind utility classes from shadcn/ui v4 (registry/new-york-v4/ui/
// tooltip.tsx). See Issue 6, Experiment 24. ENTER-only animation (the JS hides
// the content via the `hidden` attribute, so shadcn's exit utilities are
// omitted). The overlay-positioning glue (transform-origin, available-width
// clamp) and the arrow data-side placement stay as data-attribute-keyed bespoke
// rules in tokens.css (RadCN's dependency-free positioning system).
const tooltipContentClass =
  'z-50 w-fit rounded-md bg-foreground px-3 py-1.5 text-xs text-balance text-background animate-in fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2'
const tooltipArrowClass = 'absolute size-2 rotate-45 bg-foreground'

export interface TooltipProviderProps {
  children?: RemixNode
  class?: string
  delayDuration?: number
  style?: string
}

export interface TooltipProps {
  children?: RemixNode
  class?: string
  defaultOpen?: boolean
  delayDuration?: number
  id?: string
  style?: string
}

export interface TooltipPartProps {
  children?: RemixNode
  class?: string
  style?: string
}

export interface TooltipButtonProps extends TooltipPartProps {
  ariaLabel?: string
}

export interface TooltipContentProps extends TooltipPartProps {
  align?: PopoverAlign
  side?: PopoverSide
  sideOffset?: number
}

export function enhanceTooltip(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-radcn-tooltip]').forEach((tooltip) => {
    let provider = tooltip.closest<HTMLElement>('[data-radcn-tooltip-provider]')
    if (provider && !tooltip.dataset.openDelay) tooltip.dataset.openDelay = provider.dataset.delayDuration || '0'

    setupPositionedOverlay(tooltip, {
      closeDelay: 80,
      contentSelector: '[data-radcn-tooltip-content]',
      describedBy: true,
      mode: 'hover',
      openDelay: 0,
      portalSelector: '[data-radcn-tooltip-portal]',
      readyDataKey: 'radcnTooltipReady',
      rootSelector: '[data-radcn-tooltip]',
      side: 'top',
      sideOffset: 0,
      triggerSelector: '[data-radcn-tooltip-trigger]',
    })
  })
}

export function TooltipProvider(handle: Handle<TooltipProviderProps>) {
  return () => {
    let { children, class: className, delayDuration = 0, style } = handle.props

    return (
      <div class={classes('radcn-tooltip-provider', className)} data-delay-duration={String(delayDuration)} data-radcn-tooltip-provider style={style}>
        {children}
      </div>
    )
  }
}

export function Tooltip(handle: Handle<TooltipProps>) {
  return () => {
    let { children, class: className, defaultOpen, delayDuration, id, style } = handle.props

    return (
      <span
        class={classes('radcn-tooltip', className)}
        data-default-open={defaultOpen ? 'true' : undefined}
        data-open={defaultOpen ? 'true' : 'false'}
        data-open-delay={delayDuration === undefined ? undefined : String(delayDuration)}
        data-radcn-tooltip
        data-state={defaultOpen ? 'open' : 'closed'}
        id={id}
        style={style}
      >
        {children}
      </span>
    )
  }
}

export function TooltipTrigger(handle: Handle<TooltipButtonProps>) {
  return () => {
    let { ariaLabel, children, class: className, style } = handle.props

    return <button aria-label={ariaLabel} class={classes('radcn-tooltip-trigger', tooltipTriggerClass, className)} data-radcn-tooltip-trigger data-state="closed" style={style} type="button">{children}</button>
  }
}

export function TooltipPortal(handle: Handle<TooltipPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return <span class={classes('radcn-tooltip-portal', className)} data-radcn-tooltip-portal data-state="closed" hidden style={style}>{children}</span>
  }
}

export function TooltipContent(handle: Handle<TooltipContentProps>) {
  return () => {
    let { align = 'center', children, class: className, side = 'top', sideOffset = 0, style } = handle.props

    return (
      <span
        class={classes(tooltipContentClass, className)}
        data-align={align}
        data-radcn-tooltip-content
        data-side={side}
        data-side-offset={String(sideOffset)}
        data-state="closed"
        hidden
        role="tooltip"
        style={style}
      >
        {children}
        <TooltipArrow />
      </span>
    )
  }
}

export function TooltipArrow(handle?: Handle<TooltipPartProps>) {
  return () => {
    let props = handle?.props || {}
    let { class: className, style } = props

    return <span aria-hidden="true" class={classes(tooltipArrowClass, className)} data-radcn-tooltip-arrow style={style} />
  }
}
