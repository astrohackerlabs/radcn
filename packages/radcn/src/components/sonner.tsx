import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'
import { RADCN_TOAST_EVENT, type ToastPayload, type ToastType } from './toast.ts'

export type { ToastPayload, ToastType } from './toast.ts'

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
  let description = payload.description ? `<div class="radcn-toast-description" data-radcn-toast-description>${escapeText(payload.description)}</div>` : ''
  let action = payload.actionLabel
    ? `<a class="radcn-toast-action" data-radcn-toast-action href="${escapeText(payload.actionUrl || '#')}">${escapeText(payload.actionLabel)}</a>`
    : ''
  let dismiss = dismissible ? '<button class="radcn-toast-dismiss" data-radcn-toast-dismiss type="button" aria-label="Dismiss notification">×</button>' : ''
  let node = document.createElement('li')
  node.setAttribute('aria-label', toastLabel(payload))
  node.setAttribute('aria-live', type === 'error' || type === 'warning' ? 'assertive' : 'polite')
  node.className = `radcn-toast radcn-toast--${type}`
  node.dataset.duration = String(duration)
  node.dataset.radcnToast = ''
  node.dataset.state = 'open'
  node.dataset.type = type
  node.id = id
  node.role = toastRole(type)
  node.tabIndex = -1
  node.innerHTML = `
    <span aria-hidden="true" class="radcn-toast-icon" data-radcn-toast-icon>${escapeText(toastIcon(type))}</span>
    <div class="radcn-toast-body" data-radcn-toast-body>
      <div class="radcn-toast-title" data-radcn-toast-title>${escapeText(payload.title)}</div>
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
    if (!payload?.title) return
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
    if (!title) return
    event.preventDefault()
    window.dispatchEvent(new CustomEvent<ToastPayload>(RADCN_TOAST_EVENT, {
      detail: {
        actionLabel: trigger.dataset.toastActionLabel,
        actionUrl: trigger.dataset.toastActionUrl,
        description: trigger.dataset.toastDescription,
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
        class={classes('radcn-toaster', `radcn-toaster--${position}`, className)}
        data-default-duration={safeDuration(defaultDuration, 4000)}
        data-position={position}
        data-radcn-toaster
        id={id}
        role="region"
        style={style}
      >
        <ol class="radcn-toaster-list" data-radcn-toaster-list>
          {toasts.map((item, index) => (
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
        class={classes('radcn-toast', `radcn-toast--${type}`, className)}
        data-duration={duration}
        data-radcn-toast
        data-state="open"
        data-type={type}
        id={id}
        role={toastRole(type)}
        style={style}
        tabIndex={-1}
      >
        <span aria-hidden="true" class="radcn-toast-icon" data-radcn-toast-icon>{toastIcon(type)}</span>
        <div class="radcn-toast-body" data-radcn-toast-body>
          <div class="radcn-toast-title" data-radcn-toast-title>{title}</div>
          {description ? <div class="radcn-toast-description" data-radcn-toast-description>{description}</div> : undefined}
          {children}
        </div>
        {actionLabel ? <a class="radcn-toast-action" data-radcn-toast-action href={actionUrl}>{actionLabel}</a> : undefined}
        {dismissible ? (
          <button aria-label="Dismiss notification" class="radcn-toast-dismiss" data-radcn-toast-dismiss type="button">
            ×
          </button>
        ) : undefined}
      </li>
    )
  }
}
