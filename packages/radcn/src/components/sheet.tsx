import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'
import { setupModal } from './dialog.tsx'

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
        class={classes('radcn-sheet-trigger', className)}
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

    return <div class={classes('radcn-sheet-overlay', className)} data-radcn-sheet-overlay data-state="closed" hidden style={style} />
  }
}

export function SheetContent(handle: Handle<SheetContentProps>) {
  return () => {
    let { children, class: className, showCloseButton = true, side = 'right', style } = handle.props

    return (
      <div
        class={classes('radcn-sheet-content', `radcn-sheet-content--${side}`, className)}
        data-radcn-sheet-content
        data-side={side}
        data-state="closed"
        hidden
        style={style}
      >
        {children}
        {showCloseButton && (
          <button aria-label="Close" class="radcn-sheet-close" data-radcn-sheet-close type="button">
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

    return <button aria-label={ariaLabel} class={classes('radcn-sheet-close', className)} data-radcn-sheet-close style={style} type="button">{children}</button>
  }
}

export function SheetHeader(handle: Handle<SheetPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return <div class={classes('radcn-sheet-header', className)} data-radcn-sheet-header style={style}>{children}</div>
  }
}

export function SheetFooter(handle: Handle<SheetPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return <div class={classes('radcn-sheet-footer', className)} data-radcn-sheet-footer style={style}>{children}</div>
  }
}

export function SheetTitle(handle: Handle<SheetPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return <h2 class={classes('radcn-sheet-title', className)} data-radcn-sheet-title style={style}>{children}</h2>
  }
}

export function SheetDescription(handle: Handle<SheetPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return <p class={classes('radcn-sheet-description', className)} data-radcn-sheet-description style={style}>{children}</p>
  }
}
