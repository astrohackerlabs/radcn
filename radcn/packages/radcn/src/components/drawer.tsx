import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'

// Overlay trigger/close cluster as Tailwind utilities (Issue 6, Experiment 72). Shared
// structure via overlayTriggerBase (border-color a var the visible-border variants set);
// markers kept (button-group cascades + the drawer-content>close cascade + data hooks).
// ASCII comments; no bracketed class-like tokens.
const overlayTriggerBase =
  'inline-flex min-h-[var(--radcn-control-height)] items-center justify-center border border-[var(--radcn-ovl-bc,transparent)] rounded-md cursor-pointer py-2 px-4 font-medium text-[0.875rem] leading-none [font-family:var(--radcn-font)] outline-none focus-visible:shadow-[0_0_0_3px_color-mix(in_srgb,var(--radcn-ring)_35%,transparent)]'
const drawerTriggerClass =
  `${overlayTriggerBase} bg-[var(--radcn-drawer-trigger-bg,var(--radcn-primary))] text-primary-foreground`
const drawerCloseClass =
  `${overlayTriggerBase} [--radcn-ovl-bc:var(--radcn-border)] bg-[var(--radcn-drawer-action-bg,var(--radcn-background))] text-foreground`

// Overlay content sub-elements as Tailwind utilities (Issue 6, Experiment 64). Pure
// layout/typography; marker classes kept. ASCII comments; no bracketed class-like tokens.
const drawerHeaderClass = 'grid gap-1.5 [padding:1rem_1rem_0.5rem] text-center'
const drawerFooterClass = 'grid gap-2 mt-auto p-4'
const drawerTitleClass = 'm-0 text-[var(--radcn-drawer-title-fg,var(--radcn-foreground))] font-semibold text-[1.125rem] leading-[1.2] [font-family:var(--radcn-font)]'
const drawerDescriptionClass = 'm-0 text-muted-foreground text-[0.875rem] leading-[1.4] [font-family:var(--radcn-font)]'
import { setupModal } from './dialog.tsx'

// Drawer overlay/content layout as Tailwind utilities (Issue 6, Experiments 30
// and 77). The dependency-free drag system still owns --radcn-drawer-drag-offset
// and the direction keyframes below remain in tokens.css.
const drawerRootClass = 'contents [font-family:var(--radcn-font)]'
const drawerPortalClass = 'fixed inset-0 z-[var(--radcn-drawer-z,50)] [&[hidden]]:hidden'
const drawerOverlayClass = 'fixed inset-0 z-50 bg-black/50 animate-in fade-in-0 [&[hidden]]:hidden'
const drawerContentClass =
  'fixed z-[var(--radcn-drawer-z,50)] flex flex-col border border-[var(--radcn-drawer-border,var(--radcn-border))] bg-[var(--radcn-drawer-bg,var(--radcn-background))] text-[var(--radcn-drawer-fg,var(--radcn-foreground))] shadow-[0_24px_64px_rgb(0_0_0_/_0.24)] [font-family:var(--radcn-font)] touch-none will-change-transform [&[hidden]]:hidden data-[dragging=true]:transition-none motion-reduce:animate-none data-[direction=bottom]:inset-x-0 data-[direction=bottom]:bottom-0 data-[direction=bottom]:max-h-[min(var(--radcn-drawer-max-height,80vh),calc(100%_-_2rem))] data-[direction=bottom]:border-b-0 data-[direction=bottom]:rounded-t-[var(--radcn-drawer-radius,0.75rem)] data-[direction=bottom]:translate-y-[var(--radcn-drawer-drag-offset,0)] data-[direction=bottom]:animate-[radcn-drawer-bottom-in_160ms_ease-out] data-[direction=top]:inset-x-0 data-[direction=top]:top-0 data-[direction=top]:max-h-[min(var(--radcn-drawer-max-height,80vh),calc(100%_-_2rem))] data-[direction=top]:border-t-0 data-[direction=top]:rounded-b-[var(--radcn-drawer-radius,0.75rem)] data-[direction=top]:translate-y-[calc(var(--radcn-drawer-drag-offset,0)*-1)] data-[direction=top]:animate-[radcn-drawer-top-in_160ms_ease-out] data-[direction=right]:inset-y-0 data-[direction=right]:right-0 data-[direction=right]:w-[min(var(--radcn-drawer-side-width,75vw),var(--radcn-drawer-side-max-width,24rem))] data-[direction=right]:border-r-0 data-[direction=right]:translate-x-[var(--radcn-drawer-drag-offset,0)] data-[direction=right]:animate-[radcn-drawer-right-in_160ms_ease-out] data-[direction=left]:inset-y-0 data-[direction=left]:left-0 data-[direction=left]:w-[min(var(--radcn-drawer-side-width,75vw),var(--radcn-drawer-side-max-width,24rem))] data-[direction=left]:border-l-0 data-[direction=left]:translate-x-[calc(var(--radcn-drawer-drag-offset,0)*-1)] data-[direction=left]:animate-[radcn-drawer-left-in_160ms_ease-out] data-[direction=left]:[&_.radcn-drawer-header]:text-left data-[direction=right]:[&_.radcn-drawer-header]:text-left [&>.radcn-drawer-close]:absolute [&>.radcn-drawer-close]:top-3 [&>.radcn-drawer-close]:right-3 [&>.radcn-drawer-close]:min-h-8 [&>.radcn-drawer-close]:w-8 [&>.radcn-drawer-close]:p-0'
const drawerHandleClass =
  'w-[var(--radcn-drawer-handle-width,6.25rem)] h-[var(--radcn-drawer-handle-height,0.5rem)] flex-none self-center rounded-full bg-[var(--radcn-drawer-handle-bg,var(--radcn-muted))] [margin-block:0.75rem_0.25rem]'

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
        class={classes('radcn-drawer', drawerRootClass, className)}
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
        class={classes('radcn-drawer-trigger', drawerTriggerClass, className)}
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

    return <div class={classes('radcn-drawer-portal', drawerPortalClass, className)} data-radcn-drawer-portal data-state="closed" hidden style={style}>{children}</div>
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
        class={classes('radcn-drawer-content', drawerContentClass, `radcn-drawer-content--${direction}`, className)}
        data-direction={direction}
        data-radcn-drawer-content
        data-state="closed"
        data-vaul-drawer-direction={direction}
        hidden
        style={style}
      >
        {showHandle && <div aria-hidden="true" class={classes('radcn-drawer-handle', drawerHandleClass)} data-radcn-drawer-handle />}
        {children}
        {showCloseButton && (
          <button aria-label="Close" class={classes('radcn-drawer-close', drawerCloseClass)} data-radcn-drawer-close type="button">
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

    return <button aria-label={ariaLabel} class={classes('radcn-drawer-close', drawerCloseClass, className)} data-radcn-drawer-close style={style} type="button">{children}</button>
  }
}

export function DrawerHeader(handle: Handle<DrawerPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return <div class={classes('radcn-drawer-header', drawerHeaderClass, className)} data-radcn-drawer-header style={style}>{children}</div>
  }
}

export function DrawerFooter(handle: Handle<DrawerPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return <div class={classes('radcn-drawer-footer', drawerFooterClass, className)} data-radcn-drawer-footer style={style}>{children}</div>
  }
}

export function DrawerTitle(handle: Handle<DrawerPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return <h2 class={classes('radcn-drawer-title', drawerTitleClass, className)} data-radcn-drawer-title style={style}>{children}</h2>
  }
}

export function DrawerDescription(handle: Handle<DrawerPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return <p class={classes('radcn-drawer-description', drawerDescriptionClass, className)} data-radcn-drawer-description style={style}>{children}</p>
  }
}
