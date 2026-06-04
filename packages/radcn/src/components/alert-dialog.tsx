import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'
import { setupModal } from './dialog.tsx'

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
        class={classes('radcn-alert-dialog-trigger', className)}
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
        class={classes('radcn-alert-dialog-overlay', className)}
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
        class={classes('radcn-alert-dialog-content', `radcn-alert-dialog-content--${size}`, className)}
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
      <div class={classes('radcn-alert-dialog-header', className)} data-radcn-alert-dialog-header style={style}>
        {children}
      </div>
    )
  }
}

export function AlertDialogFooter(handle: Handle<AlertDialogPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return (
      <div class={classes('radcn-alert-dialog-footer', className)} data-radcn-alert-dialog-footer style={style}>
        {children}
      </div>
    )
  }
}

export function AlertDialogMedia(handle: Handle<AlertDialogPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return (
      <div class={classes('radcn-alert-dialog-media', className)} data-radcn-alert-dialog-media style={style}>
        {children}
      </div>
    )
  }
}

export function AlertDialogTitle(handle: Handle<AlertDialogPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return (
      <h2 class={classes('radcn-alert-dialog-title', className)} data-radcn-alert-dialog-title style={style}>
        {children}
      </h2>
    )
  }
}

export function AlertDialogDescription(handle: Handle<AlertDialogPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return (
      <p class={classes('radcn-alert-dialog-description', className)} data-radcn-alert-dialog-description style={style}>
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
        class={classes('radcn-alert-dialog-action', className)}
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
        class={classes('radcn-alert-dialog-cancel', className)}
        data-radcn-alert-dialog-cancel
        style={style}
        type="button"
      >
        {children}
      </button>
    )
  }
}
