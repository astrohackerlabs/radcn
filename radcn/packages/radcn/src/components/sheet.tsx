import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'

// Overlay trigger/close cluster as Tailwind utilities (Issue 6, Experiment 72). Shared
// structure via overlayTriggerBase (border-color a var the visible-border variants set);
// markers kept (button-group cascades + the drawer-content>close cascade + data hooks).
// ASCII comments; no bracketed class-like tokens.
const overlayTriggerBase =
  'inline-flex min-h-[var(--radcn-control-height)] items-center justify-center border border-[var(--radcn-ovl-bc,transparent)] rounded-md cursor-pointer py-2 px-4 font-medium text-[0.875rem] leading-none [font-family:var(--radcn-font)] outline-none focus-visible:shadow-[0_0_0_3px_color-mix(in_srgb,var(--radcn-ring)_35%,transparent)]'
const sheetTriggerClass =
  `${overlayTriggerBase} bg-[var(--radcn-modal-action-bg,var(--radcn-primary))] text-[var(--radcn-modal-action-fg,var(--radcn-primary-foreground))]`
const sheetCloseClass =
  'cursor-pointer focus-visible:shadow-[0_0_0_3px_color-mix(in_srgb,var(--radcn-ring)_35%,transparent)]'
const sheetCloseIconClass =
  'absolute top-3 right-3 inline-flex w-8 h-8 items-center justify-center border-0 rounded-md bg-transparent text-muted-foreground font-semibold text-base leading-none [font-family:var(--radcn-font)] hover:bg-secondary hover:text-foreground'

// Overlay content sub-elements as Tailwind utilities (Issue 6, Experiment 64). Pure
// layout/typography; marker classes kept. ASCII comments; no bracketed class-like tokens.
const sheetHeaderClass = 'grid gap-1.5'
const sheetFooterClass = 'flex flex-row-reverse gap-2'
const sheetTitleClass = 'm-0 font-semibold text-[1.125rem] leading-[1.25] [font-family:var(--radcn-font)]'
const sheetDescriptionClass = 'm-0 text-muted-foreground text-[0.875rem] leading-[1.5] [font-family:var(--radcn-font)]'
import { setupModal } from './dialog.tsx'

// Sheet overlay + content surface as Tailwind utilities. See Issue 6,
// Experiments 29 and 77 (modal pattern + side geometry). ENTER-only (the JS
// hides via `hidden`). The radcn-sheet-slide-in keyframe remains in tokens.css.
const sheetOverlayClass = 'fixed inset-0 z-50 bg-black/50 animate-in fade-in-0'
const sheetContentClass = 'fixed z-50 flex flex-col gap-4 border bg-background p-6 shadow-lg outline-none animate-[radcn-sheet-slide-in_140ms_ease-out] motion-reduce:animate-none data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:w-[min(100vw,var(--radcn-sheet-width,24rem))] data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:w-[min(100vw,var(--radcn-sheet-width,24rem))] data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:min-h-[var(--radcn-sheet-height,14rem)] data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:min-h-[var(--radcn-sheet-height,14rem)]'

export type SheetSide = 'top' | 'right' | 'bottom' | 'left'

export interface SheetProps {
  children?: RemixNode
  class?: string
  defaultOpen?: boolean
  dismissible?: boolean
  id?: string
  style?: string
}

export interface SheetContentProps {
  children?: RemixNode
  class?: string
  showCloseButton?: boolean
  side?: SheetSide
  style?: string
}

export interface SheetPartProps {
  children?: RemixNode
  class?: string
  style?: string
}

export interface SheetButtonProps extends SheetPartProps {
  ariaLabel?: string
}

export function enhanceSheet(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-radcn-sheet]').forEach((sheet) => {
    setupModal(sheet, {
      closeSelector: '[data-radcn-sheet-close]',
      contentSelector: '[data-radcn-sheet-content]',
      contentStateSelector: '[data-radcn-sheet-overlay], [data-radcn-sheet-content]',
      descriptionSelector: '[data-radcn-sheet-description]',
      overlaySelector: '[data-radcn-sheet-overlay]',
      portalSelector: '[data-radcn-sheet-portal]',
      readyDataKey: 'radcnSheetReady',
      rootSelector: '[data-radcn-sheet]',
      titleSelector: '[data-radcn-sheet-title]',
      triggerSelector: '[data-radcn-sheet-trigger]',
    })
  })
}

export function Sheet(handle: Handle<SheetProps>) {
  return () => {
    let { children, class: className, defaultOpen, dismissible = true, id, style } = handle.props

    return (
      <div
        class={classes('radcn-sheet', className)}
        data-default-open={defaultOpen ? 'true' : undefined}
        data-dismissible={dismissible ? 'true' : 'false'}
        data-open={defaultOpen ? 'true' : 'false'}
        data-radcn-sheet
        data-state={defaultOpen ? 'open' : 'closed'}
        id={id}
        style={style}
      >
        {children}
      </div>
    )
  }
}

export function SheetTrigger(handle: Handle<SheetButtonProps>) {
  return () => {
    let { ariaLabel, children, class: className, style } = handle.props

    return (
      <button
        aria-haspopup="dialog"
        aria-label={ariaLabel}
        class={classes('radcn-sheet-trigger', sheetTriggerClass, className)}
        data-radcn-sheet-trigger
        data-state="closed"
        style={style}
        type="button"
      >
        {children}
      </button>
    )
  }
}

export function SheetPortal(handle: Handle<SheetPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return <div class={classes('radcn-sheet-portal', className)} data-radcn-sheet-portal data-state="closed" hidden style={style}>{children}</div>
  }
}

export function SheetOverlay(handle: Handle<SheetPartProps>) {
  return () => {
    let { class: className, style } = handle.props

    return <div class={classes(sheetOverlayClass, className)} data-radcn-sheet-overlay data-state="closed" hidden style={style} />
  }
}

export function SheetContent(handle: Handle<SheetContentProps>) {
  return () => {
    let { children, class: className, showCloseButton = true, side = 'right', style } = handle.props

    return (
      <div
        class={classes(sheetContentClass, className)}
        data-radcn-sheet-content
        data-side={side}
        data-state="closed"
        hidden
        style={style}
      >
        {children}
        {showCloseButton && (
          <button aria-label="Close" class={classes('radcn-sheet-close', sheetCloseClass, 'radcn-sheet-close--icon', sheetCloseIconClass)} data-radcn-sheet-close type="button">
            <span aria-hidden="true">x</span>
          </button>
        )}
      </div>
    )
  }
}

export function SheetClose(handle: Handle<SheetButtonProps>) {
  return () => {
    let { ariaLabel, children, class: className, style } = handle.props

    return <button aria-label={ariaLabel} class={classes('radcn-sheet-close', sheetCloseClass, className)} data-radcn-sheet-close style={style} type="button">{children}</button>
  }
}

export function SheetHeader(handle: Handle<SheetPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return <div class={classes('radcn-sheet-header', sheetHeaderClass, className)} data-radcn-sheet-header style={style}>{children}</div>
  }
}

export function SheetFooter(handle: Handle<SheetPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return <div class={classes('radcn-sheet-footer', sheetFooterClass, className)} data-radcn-sheet-footer style={style}>{children}</div>
  }
}

export function SheetTitle(handle: Handle<SheetPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return <h2 class={classes('radcn-sheet-title', sheetTitleClass, className)} data-radcn-sheet-title style={style}>{children}</h2>
  }
}

export function SheetDescription(handle: Handle<SheetPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return <p class={classes('radcn-sheet-description', sheetDescriptionClass, className)} data-radcn-sheet-description style={style}>{children}</p>
  }
}
