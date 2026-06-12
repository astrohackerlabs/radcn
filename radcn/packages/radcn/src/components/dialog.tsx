import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'

// Overlay trigger/close cluster as Tailwind utilities (Issue 6, Experiment 72). Shared
// structure via overlayTriggerBase (border-color a var the visible-border variants set);
// markers kept (button-group cascades + the drawer-content>close cascade + data hooks).
// ASCII comments; no bracketed class-like tokens.
const overlayTriggerBase =
  'inline-flex min-h-[var(--radcn-control-height)] items-center justify-center border border-[var(--radcn-ovl-bc,transparent)] rounded-md cursor-pointer py-2 px-4 font-medium text-[0.875rem] leading-none [font-family:var(--radcn-font)] outline-none focus-visible:shadow-[0_0_0_3px_color-mix(in_srgb,var(--radcn-ring)_35%,transparent)]'
const dialogTriggerClass =
  `${overlayTriggerBase} bg-[var(--radcn-dialog-trigger-bg,var(--radcn-primary))] text-[var(--radcn-dialog-trigger-fg,var(--radcn-primary-foreground))]`
const dialogCloseClass =
  'cursor-pointer focus-visible:shadow-[0_0_0_3px_color-mix(in_srgb,var(--radcn-ring)_35%,transparent)]'
const dialogCloseIconClass =
  'absolute top-3 right-3 inline-flex w-8 h-8 items-center justify-center border-0 rounded-md bg-transparent text-muted-foreground font-semibold text-base leading-none [font-family:var(--radcn-font)] hover:bg-secondary hover:text-foreground'

// Overlay content sub-elements as Tailwind utilities (Issue 6, Experiment 64). Pure
// layout/typography; marker classes kept. ASCII comments; no bracketed class-like tokens.
const dialogHeaderClass = 'grid gap-1.5'
const dialogFooterClass = 'flex flex-row-reverse gap-2'
const dialogTitleClass = 'm-0 font-semibold text-[1.125rem] leading-[1.25] [font-family:var(--radcn-font)]'
const dialogDescriptionClass = 'm-0 text-muted-foreground text-[0.875rem] leading-[1.5] [font-family:var(--radcn-font)]'

// Dialog overlay + content surface from shadcn/ui v4 (registry/new-york-v4/ui/
// dialog.tsx). See Issue 6, Experiment 27. ENTER-only (the modal JS hides via
// the `hidden` attribute, so shadcn's exit utilities + duration are omitted).
// The header/footer/title/description/close sub-parts stay bespoke (scope:
// overlay + content surface). The shared radcn-dialog-* keyframes remain in
// tokens.css for AlertDialog/Sheet/Drawer.
const dialogOverlayClass = 'fixed inset-0 z-50 bg-black/50 animate-in fade-in-0'
const dialogContentClass =
  'fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background p-6 shadow-lg outline-none animate-in fade-in-0 zoom-in-95 sm:max-w-lg'

export interface DialogProps {
  children?: RemixNode
  class?: string
  defaultOpen?: boolean
  dismissible?: boolean
  id?: string
  style?: string
}

export interface DialogPartProps {
  children?: RemixNode
  class?: string
  style?: string
}

export interface DialogButtonProps extends DialogPartProps {
  ariaLabel?: string
}

export interface DialogContentProps extends DialogPartProps {
  ariaLabel?: string
  showCloseButton?: boolean
}

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

let openDialogs: HTMLElement[] = []
let previousBodyOverflow = ''

export interface ModalSetupOptions {
  closeSelector: string
  contentSelector: string
  contentStateSelector: string
  defaultRole?: 'dialog' | 'alertdialog'
  overlaySelector: string
  portalSelector: string
  readyDataKey: string
  rootSelector: string
  titleSelector: string
  descriptionSelector: string
  triggerSelector: string
}

export interface ModalController {
  close: (restoreFocus?: boolean) => void
  content: HTMLElement
  open: () => void
  portal: HTMLElement
  root: HTMLElement
  trigger: HTMLElement | null
}

function portalHost(scope: HTMLElement | null) {
  let host = scope?.querySelector<HTMLElement>('[data-radcn-portal-root]') || document.querySelector<HTMLElement>('[data-radcn-portal-root]')
  if (host) return host

  host = document.createElement('div')
  host.dataset.radcnPortalRoot = ''
  ;(scope || document.body).append(host)
  return host
}

function focusableElements(content: HTMLElement) {
  return Array.from(content.querySelectorAll<HTMLElement>(focusableSelector)).filter((element) => {
    if (element.hasAttribute('disabled')) return false
    if (element.getAttribute('aria-hidden') === 'true') return false
    return element.offsetParent !== null || element === document.activeElement
  })
}

function lockScroll() {
  if (openDialogs.length > 0) return
  previousBodyOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
}

function unlockScroll() {
  if (openDialogs.length > 0) return
  document.body.style.overflow = previousBodyOverflow
}

function setState(root: HTMLElement, portal: HTMLElement, options: ModalSetupOptions, state: 'open' | 'closed') {
  root.dataset.state = state
  root.dataset.open = state === 'open' ? 'true' : 'false'
  portal.dataset.state = state
  portal.hidden = state !== 'open'
  portal.querySelectorAll<HTMLElement>(options.contentStateSelector).forEach((part) => {
    part.dataset.state = state
    part.hidden = state !== 'open'
  })
  root.querySelectorAll<HTMLElement>(options.triggerSelector).forEach((trigger) => {
    trigger.dataset.state = state
  })
}

export function setupModal(root: HTMLElement, options: ModalSetupOptions): ModalController | undefined {
  if (root.dataset[options.readyDataKey] === 'true') return

  let dialogId = root.id || `radcn-modal-${Math.random().toString(36).slice(2)}`
  root.id = dialogId

  let portal = root.querySelector<HTMLElement>(options.portalSelector)
  let content = root.querySelector<HTMLElement>(options.contentSelector)
  if (!portal || !content) return
  let dialogPortal = portal
  let dialogContent = content

  let trigger = root.querySelector<HTMLElement>(options.triggerSelector)
  let title = dialogContent.querySelector<HTMLElement>(options.titleSelector)
  let description = dialogContent.querySelector<HTMLElement>(options.descriptionSelector)
  let dismissible = root.dataset.dismissible !== 'false'
  let lastFocused: HTMLElement | null = null

  dialogPortal.dataset.dialogId = dialogId
  dialogContent.id = dialogContent.id || `${dialogId}-content`
  dialogContent.setAttribute('role', options.defaultRole || 'dialog')
  dialogContent.setAttribute('aria-modal', 'true')
  dialogContent.tabIndex = -1

  if (title) {
    title.id = title.id || `${dialogId}-title`
    dialogContent.setAttribute('aria-labelledby', title.id)
  }

  if (description) {
    description.id = description.id || `${dialogId}-description`
    dialogContent.setAttribute('aria-describedby', description.id)
  }

  portalHost(root.closest<HTMLElement>('[data-fixture-stage]')).append(dialogPortal)

  function open() {
    lastFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null
    lockScroll()
    if (!openDialogs.includes(root)) openDialogs.push(root)
    setState(root, dialogPortal, options, 'open')
    let first = focusableElements(dialogContent)[0]
    ;(first || dialogContent).focus()
  }

  function close(restoreFocus = true) {
    openDialogs = openDialogs.filter((dialog) => dialog !== root)
    setState(root, dialogPortal, options, 'closed')
    unlockScroll()
    if (restoreFocus) (lastFocused || trigger)?.focus()
  }

  root.addEventListener('click', (event) => {
    let target = event.target
    if (!(target instanceof Element)) return

    let triggerButton = target.closest<HTMLElement>(options.triggerSelector)
    if (triggerButton && root.contains(triggerButton)) {
      event.preventDefault()
      open()
    }
  })

  dialogPortal.addEventListener('click', (event) => {
    let target = event.target
    if (!(target instanceof Element)) return

    if (target.closest(options.closeSelector)) {
      event.preventDefault()
      close()
      return
    }

    if (dismissible && target.closest(options.overlaySelector)) {
      close()
    }
  })

  dialogPortal.addEventListener('keydown', (event) => {
    if (dialogPortal.hidden) return

    if (event.key === 'Escape' && dismissible) {
      event.preventDefault()
      close()
      return
    }

    if (event.key !== 'Tab') return

    let focusable = focusableElements(dialogContent)
    if (focusable.length === 0) {
      event.preventDefault()
      dialogContent.focus()
      return
    }

    let first = focusable[0]
    let last = focusable[focusable.length - 1]
    let active = document.activeElement

    if (event.shiftKey && active === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && active === last) {
      event.preventDefault()
      first.focus()
    }
  })

  if (root.dataset.defaultOpen === 'true') open()
  else setState(root, dialogPortal, options, 'closed')

  root.dataset[options.readyDataKey] = 'true'

  return {
    close,
    content: dialogContent,
    open,
    portal: dialogPortal,
    root,
    trigger,
  }
}

export function enhanceDialog(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-radcn-dialog]').forEach((dialog) => {
    setupModal(dialog, {
      closeSelector: '[data-radcn-dialog-close]',
      contentSelector: '[data-radcn-dialog-content]',
      contentStateSelector: '[data-radcn-dialog-overlay], [data-radcn-dialog-content]',
      descriptionSelector: '[data-radcn-dialog-description]',
      overlaySelector: '[data-radcn-dialog-overlay]',
      portalSelector: '[data-radcn-dialog-portal]',
      readyDataKey: 'radcnDialogReady',
      rootSelector: '[data-radcn-dialog]',
      titleSelector: '[data-radcn-dialog-title]',
      triggerSelector: '[data-radcn-dialog-trigger]',
    })
  })
}

export function Dialog(handle: Handle<DialogProps>) {
  return () => {
    let { children, class: className, defaultOpen, dismissible = true, id, style } = handle.props

    return (
      <div
        class={classes('radcn-dialog', className)}
        data-default-open={defaultOpen ? 'true' : undefined}
        data-dismissible={dismissible ? 'true' : 'false'}
        data-open={defaultOpen ? 'true' : 'false'}
        data-radcn-dialog
        data-state={defaultOpen ? 'open' : 'closed'}
        id={id}
        style={style}
      >
        {children}
      </div>
    )
  }
}

export function DialogTrigger(handle: Handle<DialogButtonProps>) {
  return () => {
    let { ariaLabel, children, class: className, style } = handle.props

    return (
      <button
        aria-haspopup="dialog"
        aria-label={ariaLabel}
        class={classes('radcn-dialog-trigger', dialogTriggerClass, className)}
        data-radcn-dialog-trigger
        data-state="closed"
        style={style}
        type="button"
      >
        {children}
      </button>
    )
  }
}

export function DialogPortal(handle: Handle<DialogPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return (
      <div class={classes('radcn-dialog-portal', className)} data-radcn-dialog-portal data-state="closed" hidden style={style}>
        {children}
      </div>
    )
  }
}

export function DialogOverlay(handle: Handle<DialogPartProps>) {
  return () => {
    let { class: className, style } = handle.props

    return <div class={classes(dialogOverlayClass, className)} data-radcn-dialog-overlay data-state="closed" hidden style={style} />
  }
}

export function DialogContent(handle: Handle<DialogContentProps>) {
  return () => {
    let { ariaLabel, children, class: className, showCloseButton = true, style } = handle.props

    return (
      <div
        aria-label={ariaLabel}
        class={classes(dialogContentClass, className)}
        data-radcn-dialog-content
        data-state="closed"
        hidden
        style={style}
      >
        {children}
        {showCloseButton && (
          <button aria-label="Close" class={classes('radcn-dialog-close', dialogCloseClass, 'radcn-dialog-close--icon', dialogCloseIconClass)} data-radcn-dialog-close type="button">
            <span aria-hidden="true">x</span>
          </button>
        )}
      </div>
    )
  }
}

export function DialogClose(handle: Handle<DialogButtonProps>) {
  return () => {
    let { ariaLabel, children, class: className, style } = handle.props

    return (
      <button aria-label={ariaLabel} class={classes('radcn-dialog-close', dialogCloseClass, className)} data-radcn-dialog-close style={style} type="button">
        {children}
      </button>
    )
  }
}

export function DialogHeader(handle: Handle<DialogPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return (
      <div class={classes('radcn-dialog-header', dialogHeaderClass, className)} data-radcn-dialog-header style={style}>
        {children}
      </div>
    )
  }
}

export function DialogFooter(handle: Handle<DialogPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return (
      <div class={classes('radcn-dialog-footer', dialogFooterClass, className)} data-radcn-dialog-footer style={style}>
        {children}
      </div>
    )
  }
}

export function DialogTitle(handle: Handle<DialogPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return (
      <h2 class={classes('radcn-dialog-title', dialogTitleClass, className)} data-radcn-dialog-title style={style}>
        {children}
      </h2>
    )
  }
}

export function DialogDescription(handle: Handle<DialogPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return (
      <p class={classes('radcn-dialog-description', dialogDescriptionClass, className)} data-radcn-dialog-description style={style}>
        {children}
      </p>
    )
  }
}
