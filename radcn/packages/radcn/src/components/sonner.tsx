import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'
import { RADCN_TOAST_EVENT, type ToastPayload, type ToastType } from './toast.ts'

export type { ToastPayload, ToastType } from './toast.ts'

// Toast/Sonner surfaces as Tailwind utilities (Issue 6, Experiment 50). The toast
// HTML is emitted BOTH by the JSX components below AND by the runtime renderToast
// template string (toast.push()), so these consts are used in both. The type
// variants only SET CSS vars the icon/base READ, so they migrate to
// data-[type=...]:[--radcn-toast-...:value] var-sets (the Exp-47 propagation
// pattern); the only true child cascade (the loading-icon spin) stays bespoke in
// tokens.css. Comments here are ASCII; no bracketed class-like tokens.
const toasterClass =
  'relative z-30 grid w-[min(100%,var(--radcn-toaster-width,24rem))] text-[var(--radcn-toast-fg,var(--radcn-foreground))] [font-family:var(--radcn-font)]'
const toasterListClass = 'grid m-0 p-0 gap-3 list-none'
const toastClass =
  'grid grid-cols-[auto_minmax(0,1fr)_auto_auto] items-start gap-3 border border-[var(--radcn-toast-border,var(--radcn-border))] rounded-[var(--radcn-toast-radius,var(--radcn-radius))] bg-[var(--radcn-toast-bg,var(--radcn-popover))] text-[var(--radcn-toast-fg,var(--radcn-popover-foreground))] p-3.5 shadow-[0_12px_32px_rgb(0_0_0_/_0.14)] outline-none data-[state=closed]:opacity-0 data-[state=closed]:translate-y-1 data-[state=closed]:transition-[opacity,transform] focus-visible:outline-2 focus-visible:outline-[var(--radcn-ring)] focus-visible:outline-offset-2 data-[type=success]:[--radcn-toast-icon-bg:#dcfce7] data-[type=success]:[--radcn-toast-icon-fg:#166534] data-[type=info]:[--radcn-toast-icon-bg:#dbeafe] data-[type=info]:[--radcn-toast-icon-fg:#1e40af] data-[type=warning]:[--radcn-toast-icon-bg:#fef3c7] data-[type=warning]:[--radcn-toast-icon-fg:#92400e] data-[type=error]:[--radcn-toast-icon-bg:#fee2e2] data-[type=error]:[--radcn-toast-icon-fg:#991b1b] data-[type=error]:[--radcn-toast-border:#fecaca]'
const toastIconClass =
  'inline-grid size-5 place-items-center rounded-[999px] bg-[var(--radcn-toast-icon-bg,var(--radcn-secondary))] text-[var(--radcn-toast-icon-fg,var(--radcn-secondary-foreground))] text-[0.75rem] font-bold leading-none [font-family:var(--radcn-font)]'
const toastTitleClass = 'text-[0.875rem] font-semibold leading-[1.25] [font-family:var(--radcn-font)]'
const toastDescriptionClass =
  'mt-1 text-[var(--radcn-toast-description-fg,var(--radcn-muted-foreground))] text-[0.8125rem] font-normal leading-[1.4] [font-family:var(--radcn-font)]'
const toastActionShared =
  'border border-[var(--radcn-toast-action-border,var(--radcn-border))] rounded-[calc(var(--radcn-radius)-0.125rem)] bg-[var(--radcn-toast-action-bg,var(--radcn-background))] text-[var(--radcn-toast-action-fg,var(--radcn-foreground))] text-[0.8125rem] font-medium leading-none focus-visible:outline-2 focus-visible:outline-[var(--radcn-ring)] focus-visible:outline-offset-2'
const toastActionClass = `${toastActionShared} px-2.5 py-2 no-underline`
const toastDismissClass = `${toastActionShared} inline-grid size-7 place-items-center p-0 cursor-pointer`

export interface ToasterProps {
  ariaLabel?: string
  children?: RemixNode
  class?: string
  defaultDuration?: number
  id?: string
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  style?: string
  toasts?: ToastPayload[]
}

export interface ToastProps extends ToastPayload {
  children?: RemixNode
  class?: string
  style?: string
}

function toastId(toast: ToastPayload, index: number) {
  return toast.id || `radcn-toast-${index + 1}`
}

function toastRole(type: ToastType | undefined) {
  return type === 'error' || type === 'warning' ? 'alert' : 'status'
}

function toastIcon(type: ToastType | undefined) {
  if (type === 'success') return '✓'
  if (type === 'info') return 'i'
  if (type === 'warning') return '!'
  if (type === 'error') return '×'
  if (type === 'loading') return '…'
  return '•'
}

function toastLabel(payload: Pick<ToastPayload, 'description' | 'title'>) {
  return [payload.title, payload.description].filter(Boolean).join(' ')
}

function hasToastContent(payload: ToastPayload | undefined): payload is ToastPayload {
  return Boolean(payload?.title || payload?.description)
}

function safeDuration(duration: number | undefined, fallback: number | undefined) {
  if (typeof duration === 'number' && Number.isFinite(duration)) return Math.max(0, duration)
  if (typeof fallback === 'number' && Number.isFinite(fallback)) return Math.max(0, fallback)
  return 4000
}

function escapeText(value: string) {
  return value.replace(/[&<>"']/g, (char) => {
    if (char === '&') return '&amp;'
    if (char === '<') return '&lt;'
    if (char === '>') return '&gt;'
    if (char === '"') return '&quot;'
    return '&#39;'
  })
}

function dismissToast(node: HTMLElement) {
  node.dataset.state = 'closed'
  node.setAttribute('aria-hidden', 'true')
  window.setTimeout(() => node.remove(), 120)
}

function setupToastNode(node: HTMLElement, defaultDuration: number) {
  if (node.dataset.radcnToastReady === 'true') return
  node.dataset.radcnToastReady = 'true'

  let duration = safeDuration(Number(node.dataset.duration), defaultDuration)
  if (duration > 0 && node.dataset.type !== 'loading') {
    let timeout = window.setTimeout(() => dismissToast(node), duration)
    node.addEventListener('mouseenter', () => window.clearTimeout(timeout))
    node.addEventListener('mouseleave', () => {
      timeout = window.setTimeout(() => dismissToast(node), duration)
    })
  }
}

function renderToast(payload: ToastPayload, defaultDuration: number) {
  let type = payload.type || 'default'
  let id = payload.id || `radcn-toast-${Date.now()}-${Math.round(Math.random() * 1000)}`
  let dismissible = payload.dismissible !== false
  let duration = safeDuration(payload.duration, defaultDuration)
  let title = payload.title ? `<div class="${toastTitleClass}" data-radcn-toast-title>${escapeText(payload.title)}</div>` : ''
  let description = payload.description ? `<div class="${toastDescriptionClass}" data-radcn-toast-description>${escapeText(payload.description)}</div>` : ''
  let action = payload.actionLabel
    ? `<a class="${toastActionClass}" data-radcn-toast-action href="${escapeText(payload.actionUrl || '#')}">${escapeText(payload.actionLabel)}</a>`
    : ''
  let dismiss = dismissible ? `<button class="${toastDismissClass}" data-radcn-toast-dismiss type="button" aria-label="Dismiss notification">×</button>` : ''
  let node = document.createElement('li')
  node.setAttribute('aria-label', toastLabel(payload))
  node.setAttribute('aria-live', type === 'error' || type === 'warning' ? 'assertive' : 'polite')
  node.className = toastClass
  node.dataset.duration = String(duration)
  node.dataset.radcnToast = ''
  node.dataset.state = 'open'
  node.dataset.type = type
  node.id = id
  node.role = toastRole(type)
  node.tabIndex = -1
  node.innerHTML = `
    <span aria-hidden="true" class="${toastIconClass}" data-radcn-toast-icon>${escapeText(toastIcon(type))}</span>
    <div data-radcn-toast-body>
      ${title}
      ${description}
    </div>
    ${action}
    ${dismiss}
  `
  setupToastNode(node, defaultDuration)
  return node
}

function setupToaster(root: HTMLElement) {
  if (root.dataset.radcnToasterReady === 'true') return

  let list = root.querySelector<HTMLElement>('[data-radcn-toaster-list]')
  if (!list) return
  let defaultDuration = safeDuration(Number(root.dataset.defaultDuration), 4000)

  list.querySelectorAll<HTMLElement>('[data-radcn-toast]').forEach((node) => setupToastNode(node, defaultDuration))

  root.addEventListener('click', (event) => {
    let target = event.target
    if (!(target instanceof Element)) return
    let dismiss = target.closest<HTMLElement>('[data-radcn-toast-dismiss]')
    if (!dismiss) return
    event.preventDefault()
    let node = dismiss.closest<HTMLElement>('[data-radcn-toast]')
    if (node) dismissToast(node)
  })

  root.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return
    let target = event.target
    if (!(target instanceof Element)) return
    let node = target.closest<HTMLElement>('[data-radcn-toast]')
    if (!node) return
    event.preventDefault()
    dismissToast(node)
  })

  window.addEventListener(RADCN_TOAST_EVENT, (event) => {
    let payload = (event as CustomEvent<ToastPayload>).detail
    if (!hasToastContent(payload)) return
    list.append(renderToast(payload, defaultDuration))
  })

  root.dataset.radcnToasterReady = 'true'
}

function setupToastTriggers(root: ParentNode) {
  let marker = root instanceof Document ? root.documentElement : undefined
  if (marker?.dataset.radcnToastTriggersReady === 'true') return

  root.addEventListener('click', (event) => {
    let target = event.target
    if (!(target instanceof Element)) return
    let trigger = target.closest<HTMLElement>('[data-radcn-toast-trigger]')
    if (!trigger) return
    let title = trigger.dataset.toastTitle
    let description = trigger.dataset.toastDescription
    if (!title && !description) return
    event.preventDefault()
    window.dispatchEvent(new CustomEvent<ToastPayload>(RADCN_TOAST_EVENT, {
      detail: {
        actionLabel: trigger.dataset.toastActionLabel,
        actionUrl: trigger.dataset.toastActionUrl,
        description,
        dismissible: trigger.dataset.toastDismissible === 'false' ? false : undefined,
        duration: trigger.dataset.toastDuration ? Number(trigger.dataset.toastDuration) : undefined,
        id: trigger.dataset.toastId,
        title,
        type: trigger.dataset.toastType as ToastType | undefined,
      },
    }))
  })

  if (marker) marker.dataset.radcnToastTriggersReady = 'true'
}

export function enhanceToaster(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-radcn-toaster]').forEach(setupToaster)
  setupToastTriggers(root)
}

export function Toaster(handle: Handle<ToasterProps>) {
  return () => {
    let {
      ariaLabel = 'Notifications',
      children,
      class: className,
      defaultDuration = 4000,
      id,
      position = 'bottom-right',
      style,
      toasts = [],
    } = handle.props

    return (
      <section
        aria-label={ariaLabel}
        class={classes(toasterClass, className)}
        data-default-duration={safeDuration(defaultDuration, 4000)}
        data-position={position}
        data-radcn-toaster
        id={id}
        role="region"
        style={style}
      >
        <ol class={toasterListClass} data-radcn-toaster-list>
          {toasts.filter(hasToastContent).map((item, index) => (
            <Toast
              actionLabel={item.actionLabel}
              actionUrl={item.actionUrl}
              description={item.description}
              dismissible={item.dismissible}
              duration={item.duration}
              id={toastId(item, index)}
              title={item.title}
              type={item.type}
            />
          ))}
        </ol>
        {children}
      </section>
    )
  }
}

export function Toast(handle: Handle<ToastProps>) {
  return () => {
    let {
      actionLabel,
      actionUrl = '#',
      children,
      class: className,
      description,
      dismissible = true,
      duration,
      id,
      style,
      title,
      type = 'default',
    } = handle.props

    return (
      <li
        aria-label={toastLabel({ description, title })}
        aria-live={type === 'error' || type === 'warning' ? 'assertive' : 'polite'}
        class={classes(toastClass, className)}
        data-duration={duration}
        data-radcn-toast
        data-state="open"
        data-type={type}
        id={id}
        role={toastRole(type)}
        style={style}
        tabIndex={-1}
      >
        <span aria-hidden="true" class={toastIconClass} data-radcn-toast-icon>{toastIcon(type)}</span>
        <div data-radcn-toast-body>
          {title ? <div class={toastTitleClass} data-radcn-toast-title>{title}</div> : undefined}
          {description ? <div class={toastDescriptionClass} data-radcn-toast-description>{description}</div> : undefined}
          {children}
        </div>
        {actionLabel ? <a class={toastActionClass} data-radcn-toast-action href={actionUrl}>{actionLabel}</a> : undefined}
        {dismissible ? (
          <button aria-label="Dismiss notification" class={toastDismissClass} data-radcn-toast-dismiss type="button">
            ×
          </button>
        ) : undefined}
      </li>
    )
  }
}
