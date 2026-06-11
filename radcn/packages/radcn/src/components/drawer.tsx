import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'
import { setupModal } from './dialog.tsx'

// Drawer overlay backdrop as Tailwind utilities (Issue 6, Experiment 30).
// ENTER-only (the JS hides via `hidden`). The Drawer CONTENT is RadCN's
// dependency-free drag-to-dismiss system (direction/transform/drag/border/
// handle, data-direction-keyed) — shadcn uses the vaul library; there is no
// utility analog, so the content stays bespoke in tokens.css.
const drawerOverlayClass = 'fixed inset-0 z-50 bg-black/50 animate-in fade-in-0'

export type DrawerDirection = 'top' | 'right' | 'bottom' | 'left'

export interface DrawerProps {
  children?: RemixNode
  class?: string
  defaultOpen?: boolean
  direction?: DrawerDirection
  dismissible?: boolean
  id?: string
  style?: string
}

export interface DrawerContentProps {
  children?: RemixNode
  class?: string
  direction?: DrawerDirection
  showCloseButton?: boolean
  showHandle?: boolean
  style?: string
}

export interface DrawerPartProps {
  children?: RemixNode
  class?: string
  style?: string
}

export interface DrawerButtonProps extends DrawerPartProps {
  ariaLabel?: string
}

const dragThreshold = 80

function directionDelta(direction: DrawerDirection, startX: number, startY: number, event: PointerEvent) {
  if (direction === 'top') return startY - event.clientY
  if (direction === 'right') return event.clientX - startX
  if (direction === 'left') return startX - event.clientX
  return event.clientY - startY
}

function syncTriggerState(root: HTMLElement, trigger: HTMLElement | null, content: HTMLElement) {
  if (!trigger) return

  trigger.setAttribute('aria-controls', content.id)

  let sync = () => {
    trigger.setAttribute('aria-expanded', root.dataset.state === 'open' ? 'true' : 'false')
  }

  sync()

  new MutationObserver(sync).observe(root, {
    attributeFilter: ['data-state'],
    attributes: true,
  })
}

function setupDrawer(root: HTMLElement) {
  let controller = setupModal(root, {
    closeSelector: '[data-radcn-drawer-close]',
    contentSelector: '[data-radcn-drawer-content]',
    contentStateSelector: '[data-radcn-drawer-overlay], [data-radcn-drawer-content]',
    descriptionSelector: '[data-radcn-drawer-description]',
    overlaySelector: '[data-radcn-drawer-overlay]',
    portalSelector: '[data-radcn-drawer-portal]',
    readyDataKey: 'radcnDrawerReady',
    rootSelector: '[data-radcn-drawer]',
    titleSelector: '[data-radcn-drawer-title]',
    triggerSelector: '[data-radcn-drawer-trigger]',
  })

  if (!controller) return

  let modal = controller
  let content = controller.content
  let direction = (content.dataset.direction || root.dataset.direction || 'bottom') as DrawerDirection
  let startX = 0
  let startY = 0
  let activePointer: number | null = null

  root.dataset.direction = direction
  content.dataset.direction = direction
  content.dataset.vaulDrawerDirection = direction
  syncTriggerState(root, controller.trigger, content)

  function resetDrag() {
    activePointer = null
    content.dataset.dragging = 'false'
    content.style.removeProperty('--radcn-drawer-drag-offset')
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerup', onPointerUp)
    window.removeEventListener('pointercancel', resetDrag)
  }

  function onPointerMove(event: PointerEvent) {
    if (activePointer !== event.pointerId) return
    let delta = Math.max(0, directionDelta(direction, startX, startY, event))
    content.style.setProperty('--radcn-drawer-drag-offset', `${delta}px`)
  }

  function onPointerUp(event: PointerEvent) {
    if (activePointer !== event.pointerId) return
    let delta = Math.max(0, directionDelta(direction, startX, startY, event))
    if (delta >= dragThreshold) modal.close()
    resetDrag()
  }

  content.addEventListener('pointerdown', (event) => {
    let target = event.target
    if (!(target instanceof Element)) return
    let handle = target.closest('[data-radcn-drawer-handle]')
    let interactive = target.closest('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
    if (!handle && interactive) return
    if (root.dataset.state !== 'open') return

    activePointer = event.pointerId
    startX = event.clientX
    startY = event.clientY
    content.dataset.dragging = 'true'
    content.setPointerCapture(event.pointerId)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
    window.addEventListener('pointercancel', resetDrag)
  })

  content.addEventListener('pointermove', onPointerMove)
  content.addEventListener('pointerup', onPointerUp)
  content.addEventListener('pointercancel', resetDrag)
}

export function enhanceDrawer(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-radcn-drawer]').forEach(setupDrawer)
}

export function Drawer(handle: Handle<DrawerProps>) {
  return () => {
    let { children, class: className, defaultOpen, direction = 'bottom', dismissible = true, id, style } = handle.props

    return (
      <div
        class={classes('radcn-drawer', className)}
        data-default-open={defaultOpen ? 'true' : undefined}
        data-direction={direction}
        data-dismissible={dismissible ? 'true' : 'false'}
        data-open={defaultOpen ? 'true' : 'false'}
        data-radcn-drawer
        data-state={defaultOpen ? 'open' : 'closed'}
        id={id}
        style={style}
      >
        {children}
      </div>
    )
  }
}

export function DrawerTrigger(handle: Handle<DrawerButtonProps>) {
  return () => {
    let { ariaLabel, children, class: className, style } = handle.props

    return (
      <button
        aria-haspopup="dialog"
        aria-label={ariaLabel}
        class={classes('radcn-drawer-trigger', className)}
        data-radcn-drawer-trigger
        data-state="closed"
        style={style}
        type="button"
      >
        {children}
      </button>
    )
  }
}

export function DrawerPortal(handle: Handle<DrawerPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return <div class={classes('radcn-drawer-portal', className)} data-radcn-drawer-portal data-state="closed" hidden style={style}>{children}</div>
  }
}

export function DrawerOverlay(handle: Handle<DrawerPartProps>) {
  return () => {
    let { class: className, style } = handle.props

    return <div class={classes(drawerOverlayClass, className)} data-radcn-drawer-overlay data-state="closed" hidden style={style} />
  }
}

export function DrawerContent(handle: Handle<DrawerContentProps>) {
  return () => {
    let { children, class: className, direction = 'bottom', showCloseButton = false, showHandle = direction === 'bottom', style } = handle.props

    return (
      <div
        class={classes('radcn-drawer-content', `radcn-drawer-content--${direction}`, className)}
        data-direction={direction}
        data-radcn-drawer-content
        data-state="closed"
        data-vaul-drawer-direction={direction}
        hidden
        style={style}
      >
        {showHandle && <div aria-hidden="true" class="radcn-drawer-handle" data-radcn-drawer-handle />}
        {children}
        {showCloseButton && (
          <button aria-label="Close" class="radcn-drawer-close" data-radcn-drawer-close type="button">
            <span aria-hidden="true">x</span>
          </button>
        )}
      </div>
    )
  }
}

export function DrawerClose(handle: Handle<DrawerButtonProps>) {
  return () => {
    let { ariaLabel, children, class: className, style } = handle.props

    return <button aria-label={ariaLabel} class={classes('radcn-drawer-close', className)} data-radcn-drawer-close style={style} type="button">{children}</button>
  }
}

export function DrawerHeader(handle: Handle<DrawerPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return <div class={classes('radcn-drawer-header', className)} data-radcn-drawer-header style={style}>{children}</div>
  }
}

export function DrawerFooter(handle: Handle<DrawerPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return <div class={classes('radcn-drawer-footer', className)} data-radcn-drawer-footer style={style}>{children}</div>
  }
}

export function DrawerTitle(handle: Handle<DrawerPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return <h2 class={classes('radcn-drawer-title', className)} data-radcn-drawer-title style={style}>{children}</h2>
  }
}

export function DrawerDescription(handle: Handle<DrawerPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return <p class={classes('radcn-drawer-description', className)} data-radcn-drawer-description style={style}>{children}</p>
  }
}
