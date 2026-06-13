import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'

// Overlay trigger/close cluster as Tailwind utilities (Issue 6, Experiment 72). Shared
// structure via overlayTriggerBase (border-color a var the visible-border variants set);
// markers kept (button-group cascades + the drawer-content>close cascade + data hooks).
// ASCII comments; no bracketed class-like tokens.
const overlayTriggerBase =
  'inline-flex min-h-[var(--radcn-control-height)] items-center justify-center border border-[var(--radcn-ovl-bc,transparent)] rounded-md cursor-pointer py-2 px-4 font-medium text-[0.875rem] leading-none [font-family:var(--radcn-font)] outline-none focus-visible:shadow-[0_0_0_3px_color-mix(in_srgb,var(--radcn-ring)_35%,transparent)]'
const alertTriggerClass =
  `${overlayTriggerBase} bg-[var(--radcn-modal-action-bg,var(--radcn-primary))] text-[var(--radcn-modal-action-fg,var(--radcn-primary-foreground))]`
const alertActionClass =
  `${overlayTriggerBase} bg-[var(--radcn-modal-action-bg,var(--radcn-primary))] text-[var(--radcn-modal-action-fg,var(--radcn-primary-foreground))]`
const alertCancelClass =
  `${overlayTriggerBase} [--radcn-ovl-bc:var(--radcn-alert-dialog-cancel-border,var(--radcn-border))] bg-background text-foreground`

// Overlay content sub-elements as Tailwind utilities (Issue 6, Experiment 64). Pure
// layout/typography; marker classes kept. ASCII comments; no bracketed class-like tokens.
const alertDialogHeaderClass = 'grid gap-1.5'
const alertDialogFooterClass = 'flex flex-row-reverse gap-2'
const alertDialogMediaClass = 'grid w-10 h-10 place-items-center rounded-[999px] bg-[var(--radcn-alert-dialog-media-bg,var(--radcn-secondary))] text-[var(--radcn-alert-dialog-media-fg,var(--radcn-foreground))] font-bold text-base leading-none [font-family:var(--radcn-font)]'
const alertDialogTitleClass = 'm-0 font-semibold text-[1.125rem] leading-[1.25] [font-family:var(--radcn-font)]'
const alertDialogDescriptionClass = 'm-0 text-muted-foreground text-[0.875rem] leading-[1.5] [font-family:var(--radcn-font)]'
import { setupModal } from './dialog.tsx'

// AlertDialog overlay + content surface from shadcn/ui v4. See Issue 6,
// Experiments 28 and 77 (modal pattern + residual content sizing). ENTER-only
// (the JS hides via `hidden`). Media/action/header/footer/title/description
// sub-parts emit utilities above; data hooks remain.
const alertDialogOverlayClass = 'fixed inset-0 z-50 bg-black/50 animate-in fade-in-0'
const alertDialogContentClass =
  'fixed top-[50%] left-[50%] z-50 grid w-[min(calc(100vw-2rem),var(--radcn-alert-dialog-width,32rem))] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background p-6 shadow-lg outline-none animate-in fade-in-0 zoom-in-95 data-[size=sm]:[--radcn-alert-dialog-width:24rem] data-[size=sm]:[&_.radcn-alert-dialog-footer]:grid data-[size=sm]:[&_.radcn-alert-dialog-footer]:grid-cols-2'

export type AlertDialogSize = 'default' | 'sm'

export interface AlertDialogProps {
  children?: RemixNode
  class?: string
  defaultOpen?: boolean
  dismissible?: boolean
  id?: string
  style?: string
}

export interface AlertDialogContentProps {
  children?: RemixNode
  class?: string
  size?: AlertDialogSize
  style?: string
}

export interface AlertDialogPartProps {
  children?: RemixNode
  class?: string
  style?: string
}

export interface AlertDialogButtonProps extends AlertDialogPartProps {
  ariaLabel?: string
}

export function enhanceAlertDialog(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-radcn-alert-dialog]').forEach((dialog) => {
    setupModal(dialog, {
      closeSelector: '[data-radcn-alert-dialog-action], [data-radcn-alert-dialog-cancel]',
      contentSelector: '[data-radcn-alert-dialog-content]',
      contentStateSelector: '[data-radcn-alert-dialog-overlay], [data-radcn-alert-dialog-content]',
      defaultRole: 'alertdialog',
      descriptionSelector: '[data-radcn-alert-dialog-description]',
      overlaySelector: '[data-radcn-alert-dialog-overlay]',
      portalSelector: '[data-radcn-alert-dialog-portal]',
      readyDataKey: 'radcnAlertDialogReady',
      rootSelector: '[data-radcn-alert-dialog]',
      titleSelector: '[data-radcn-alert-dialog-title]',
      triggerSelector: '[data-radcn-alert-dialog-trigger]',
    })
  })
}

export function AlertDialog(handle: Handle<AlertDialogProps>) {
  return () => {
    let { children, class: className, defaultOpen, dismissible = false, id, style } = handle.props

    return (
      <div
        class={classes('radcn-alert-dialog', className)}
        data-default-open={defaultOpen ? 'true' : undefined}
        data-dismissible={dismissible ? 'true' : 'false'}
        data-open={defaultOpen ? 'true' : 'false'}
        data-radcn-alert-dialog
        data-state={defaultOpen ? 'open' : 'closed'}
        id={id}
        style={style}
      >
        {children}
      </div>
    )
  }
}

export function AlertDialogTrigger(handle: Handle<AlertDialogButtonProps>) {
  return () => {
    let { ariaLabel, children, class: className, style } = handle.props

    return (
      <button
        aria-haspopup="dialog"
        aria-label={ariaLabel}
        class={classes('radcn-alert-dialog-trigger', alertTriggerClass, className)}
        data-radcn-alert-dialog-trigger
        data-state="closed"
        style={style}
        type="button"
      >
        {children}
      </button>
    )
  }
}

export function AlertDialogPortal(handle: Handle<AlertDialogPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return (
      <div class={classes('radcn-alert-dialog-portal', className)} data-radcn-alert-dialog-portal data-state="closed" hidden style={style}>
        {children}
      </div>
    )
  }
}

export function AlertDialogOverlay(handle: Handle<AlertDialogPartProps>) {
  return () => {
    let { class: className, style } = handle.props

    return (
      <div
        class={classes(alertDialogOverlayClass, className)}
        data-radcn-alert-dialog-overlay
        data-state="closed"
        hidden
        style={style}
      />
    )
  }
}

export function AlertDialogContent(handle: Handle<AlertDialogContentProps>) {
  return () => {
    let { children, class: className, size = 'default', style } = handle.props

    return (
      <div
        class={classes(alertDialogContentClass, className)}
        data-radcn-alert-dialog-content
        data-size={size}
        data-state="closed"
        hidden
        style={style}
      >
        {children}
      </div>
    )
  }
}

export function AlertDialogHeader(handle: Handle<AlertDialogPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return (
      <div class={classes('radcn-alert-dialog-header', alertDialogHeaderClass, className)} data-radcn-alert-dialog-header style={style}>
        {children}
      </div>
    )
  }
}

export function AlertDialogFooter(handle: Handle<AlertDialogPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return (
      <div class={classes('radcn-alert-dialog-footer', alertDialogFooterClass, className)} data-radcn-alert-dialog-footer style={style}>
        {children}
      </div>
    )
  }
}

export function AlertDialogMedia(handle: Handle<AlertDialogPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return (
      <div class={classes('radcn-alert-dialog-media', alertDialogMediaClass, className)} data-radcn-alert-dialog-media style={style}>
        {children}
      </div>
    )
  }
}

export function AlertDialogTitle(handle: Handle<AlertDialogPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return (
      <h2 class={classes('radcn-alert-dialog-title', alertDialogTitleClass, className)} data-radcn-alert-dialog-title style={style}>
        {children}
      </h2>
    )
  }
}

export function AlertDialogDescription(handle: Handle<AlertDialogPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return (
      <p class={classes('radcn-alert-dialog-description', alertDialogDescriptionClass, className)} data-radcn-alert-dialog-description style={style}>
        {children}
      </p>
    )
  }
}

export function AlertDialogAction(handle: Handle<AlertDialogButtonProps>) {
  return () => {
    let { ariaLabel, children, class: className, style } = handle.props

    return (
      <button
        aria-label={ariaLabel}
        class={classes('radcn-alert-dialog-action', alertActionClass, className)}
        data-radcn-alert-dialog-action
        style={style}
        type="button"
      >
        {children}
      </button>
    )
  }
}

export function AlertDialogCancel(handle: Handle<AlertDialogButtonProps>) {
  return () => {
    let { ariaLabel, children, class: className, style } = handle.props

    return (
      <button
        aria-label={ariaLabel}
        class={classes('radcn-alert-dialog-cancel', alertCancelClass, className)}
        data-radcn-alert-dialog-cancel
        style={style}
        type="button"
      >
        {children}
      </button>
    )
  }
}
