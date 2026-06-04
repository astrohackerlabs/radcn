type OverlayMode = 'click' | 'hover'
type OverlaySide = 'top' | 'right' | 'bottom' | 'left'
type OverlayAlign = 'start' | 'center' | 'end'

export interface PositionedOverlayOptions {
  align?: OverlayAlign
  anchorSelector?: string
  closeDelay?: number
  closeSelector?: string
  contentSelector: string
  describedBy?: boolean
  expanded?: boolean
  mode: OverlayMode
  openDelay?: number
  portalSelector: string
  readyDataKey: string
  rootSelector: string
  side?: OverlaySide
  sideOffset?: number
  triggerSelector: string
  outsideDismiss?: boolean
}

const cleanupKey = '__radcnPositionedOverlayCleanup'

interface PositionedOverlayRoot extends HTMLElement {
  [cleanupKey]?: () => void
}

function portalHost(scope: HTMLElement | null) {
  let host = scope?.querySelector<HTMLElement>('[data-radcn-portal-root]') || document.querySelector<HTMLElement>('[data-radcn-portal-root]')
  if (host) return host

  host = document.createElement('div')
  host.dataset.radcnPortalRoot = ''
  ;(scope || document.body).append(host)
  return host
}

function numberFromData(element: HTMLElement, name: string, fallback: number) {
  let raw = element.dataset[name]
  if (!raw) return fallback
  let value = Number(raw)
  return Number.isFinite(value) ? value : fallback
}

function sideFromData(element: HTMLElement, fallback: OverlaySide): OverlaySide {
  let side = element.dataset.side
  if (side === 'top' || side === 'right' || side === 'bottom' || side === 'left') return side
  return fallback
}

function alignFromData(element: HTMLElement, fallback: OverlayAlign): OverlayAlign {
  let align = element.dataset.align
  if (align === 'start' || align === 'center' || align === 'end') return align
  return fallback
}

function setState(root: HTMLElement, trigger: HTMLElement | null, portal: HTMLElement, content: HTMLElement, state: 'open' | 'closed') {
  root.dataset.state = state
  root.dataset.open = state === 'open' ? 'true' : 'false'
  portal.dataset.state = state
  content.dataset.state = state
  portal.hidden = state !== 'open'
  content.hidden = state !== 'open'
  if (trigger) {
    trigger.dataset.state = state
  }
}

function transformOrigin(side: OverlaySide, align: OverlayAlign) {
  let x = align === 'start' ? 'left' : align === 'end' ? 'right' : 'center'
  let y = align === 'start' ? 'top' : align === 'end' ? 'bottom' : 'center'

  if (side === 'top') return `${x} bottom`
  if (side === 'bottom') return `${x} top`
  if (side === 'left') return `right ${y}`
  return `left ${y}`
}

function boundaryRect(anchor: HTMLElement) {
  let stage = anchor.closest<HTMLElement>('[data-fixture-stage]')
  if (stage) return stage.getBoundingClientRect()
  return {
    bottom: window.innerHeight,
    height: window.innerHeight,
    left: 0,
    right: window.innerWidth,
    top: 0,
    width: window.innerWidth,
    x: 0,
    y: 0,
  } as DOMRect
}

function clamp(value: number, min: number, max: number) {
  if (max < min) return min
  return Math.min(Math.max(value, min), max)
}

function positionContent(anchor: HTMLElement, content: HTMLElement, options: PositionedOverlayOptions) {
  let side = sideFromData(content, options.side || 'bottom')
  let align = alignFromData(content, options.align || 'center')
  let offset = numberFromData(content, 'sideOffset', options.sideOffset || 0)
  let anchorBox = anchor.getBoundingClientRect()
  let contentBox = content.getBoundingClientRect()
  let boundary = boundaryRect(anchor)
  let gap = 8
  let left = anchorBox.left
  let top = anchorBox.bottom + offset

  if (side === 'top') top = anchorBox.top - contentBox.height - offset
  if (side === 'right') {
    left = anchorBox.right + offset
    top = anchorBox.top + (anchorBox.height - contentBox.height) / 2
  }
  if (side === 'left') {
    left = anchorBox.left - contentBox.width - offset
    top = anchorBox.top + (anchorBox.height - contentBox.height) / 2
  }

  if (side === 'top' || side === 'bottom') {
    if (align === 'start') left = anchorBox.left
    if (align === 'center') left = anchorBox.left + (anchorBox.width - contentBox.width) / 2
    if (align === 'end') left = anchorBox.right - contentBox.width
  } else {
    if (align === 'start') top = anchorBox.top
    if (align === 'center') top = anchorBox.top + (anchorBox.height - contentBox.height) / 2
    if (align === 'end') top = anchorBox.bottom - contentBox.height
  }

  left = clamp(left, boundary.left + gap, boundary.right - contentBox.width - gap)
  top = clamp(top, boundary.top + gap, boundary.bottom - contentBox.height - gap)

  content.dataset.side = side
  content.dataset.align = align
  content.style.position = 'fixed'
  content.style.left = `${Math.round(left)}px`
  content.style.top = `${Math.round(top)}px`
  content.style.setProperty('--radcn-overlay-transform-origin', transformOrigin(side, align))
  content.style.setProperty('--radcn-overlay-available-width', `${Math.max(0, boundary.width - gap * 2)}px`)
  content.style.setProperty('--radcn-overlay-available-height', `${Math.max(0, boundary.height - gap * 2)}px`)
}

function containsTarget(element: HTMLElement | null, target: EventTarget | null) {
  return target instanceof Node && !!element?.contains(target)
}

export function setupPositionedOverlay(root: HTMLElement, options: PositionedOverlayOptions) {
  let overlayRoot = root as PositionedOverlayRoot
  if (root.dataset[options.readyDataKey] === 'true') return overlayRoot[cleanupKey]

  let portal = root.querySelector<HTMLElement>(options.portalSelector)
  let content = root.querySelector<HTMLElement>(options.contentSelector)
  let trigger = root.querySelector<HTMLElement>(options.triggerSelector)
  let anchor = (options.anchorSelector && root.querySelector<HTMLElement>(options.anchorSelector)) || trigger
  if (!portal || !content || !anchor) return
  let overlayPortal = portal
  let overlayContent = content
  let overlayAnchor = anchor

  let overlayId = root.id || `radcn-overlay-${Math.random().toString(36).slice(2)}`
  let openDelay = numberFromData(root, 'openDelay', options.openDelay || 0)
  let closeDelay = numberFromData(root, 'closeDelay', options.closeDelay || 0)
  let openTimer = 0
  let closeTimer = 0
  let controller = new AbortController()
  let listenerOptions = { signal: controller.signal }

  root.id = overlayId
  overlayContent.id = overlayContent.id || `${overlayId}-content`
  overlayPortal.dataset.overlayId = overlayId

  if (trigger) {
    if (options.expanded) {
      trigger.setAttribute('aria-controls', overlayContent.id)
      trigger.setAttribute('aria-expanded', root.dataset.defaultOpen === 'true' ? 'true' : 'false')
    }

    if (options.describedBy) {
      trigger.setAttribute('aria-describedby', overlayContent.id)
    }
  }

  portalHost(root.closest<HTMLElement>('[data-fixture-stage]')).append(overlayPortal)

  function updatePosition() {
    if (overlayPortal.hidden) return
    positionContent(overlayAnchor, overlayContent, options)
  }

  function open() {
    window.clearTimeout(closeTimer)
    window.clearTimeout(openTimer)
    setState(root, trigger, overlayPortal, overlayContent, 'open')
    if (trigger && options.expanded) trigger.setAttribute('aria-expanded', 'true')
    updatePosition()
    requestAnimationFrame(updatePosition)
  }

  function close() {
    window.clearTimeout(openTimer)
    window.clearTimeout(closeTimer)
    setState(root, trigger, overlayPortal, overlayContent, 'closed')
    if (trigger && options.expanded) trigger.setAttribute('aria-expanded', 'false')
  }

  function scheduleOpen() {
    window.clearTimeout(closeTimer)
    window.clearTimeout(openTimer)
    openTimer = window.setTimeout(open, openDelay)
  }

  function scheduleClose() {
    window.clearTimeout(openTimer)
    window.clearTimeout(closeTimer)
    closeTimer = window.setTimeout(close, closeDelay)
  }

  if (options.mode === 'click' && trigger) {
    trigger.addEventListener('click', (event) => {
      event.preventDefault()
      if (root.dataset.state === 'open') close()
      else open()
    }, listenerOptions)

    overlayPortal.addEventListener('click', (event) => {
      let target = event.target
      if (!(target instanceof Element)) return
      if (options.closeSelector && target.closest(options.closeSelector)) {
        event.preventDefault()
        close()
      }
    }, listenerOptions)

    document.addEventListener('pointerdown', (event) => {
      if (root.dataset.state !== 'open' || !options.outsideDismiss) return
      if (containsTarget(trigger, event.target) || containsTarget(overlayContent, event.target)) return
      close()
    }, listenerOptions)
  }

  if (options.mode === 'hover' && trigger) {
    for (let element of [trigger, overlayContent]) {
      element.addEventListener('pointerenter', scheduleOpen, listenerOptions)
      element.addEventListener('pointerleave', scheduleClose, listenerOptions)
      element.addEventListener('focusin', scheduleOpen, listenerOptions)
      element.addEventListener('focusout', (event) => {
        let next = event.relatedTarget
        if (containsTarget(trigger, next) || containsTarget(overlayContent, next)) return
        scheduleClose()
      }, listenerOptions)
    }
  }

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || root.dataset.state !== 'open') return
    event.preventDefault()
    close()
  }, listenerOptions)

  window.addEventListener('resize', updatePosition, listenerOptions)
  window.addEventListener('scroll', updatePosition, { capture: true, signal: controller.signal })

  if (root.dataset.defaultOpen === 'true') open()
  else setState(root, trigger, overlayPortal, overlayContent, 'closed')

  function cleanup() {
    window.clearTimeout(openTimer)
    window.clearTimeout(closeTimer)
    controller.abort()
    delete root.dataset[options.readyDataKey]
    delete overlayRoot[cleanupKey]
  }

  overlayRoot[cleanupKey] = cleanup
  root.dataset[options.readyDataKey] = 'true'
  return cleanup
}
