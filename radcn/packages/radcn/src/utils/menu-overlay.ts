type MenuAlign = 'start' | 'center' | 'end'
type MenuSide = 'top' | 'right' | 'bottom' | 'left'
type MenuKind = 'dropdown' | 'context'

export interface MenuOverlayOptions {
  align?: MenuAlign
  contentSelector: string
  itemSelector: string
  kind: MenuKind
  portalSelector: string
  readyDataKey: string
  rootSelector: string
  side?: MenuSide
  sideOffset?: number
  subContentSelector: string
  subTriggerSelector: string
  triggerSelector: string
}

const cleanupKey = '__radcnMenuOverlayCleanup'

interface MenuOverlayRoot extends HTMLElement {
  [cleanupKey]?: () => void
}

interface AnchorPoint {
  height: number
  width: number
  x: number
  y: number
}

function portalHost(scope: HTMLElement | null) {
  let host = scope?.querySelector<HTMLElement>('[data-radcn-portal-root]') || document.querySelector<HTMLElement>('[data-radcn-portal-root]')
  if (host) return host

  host = document.createElement('div')
  host.dataset.radcnPortalRoot = ''
  ;(scope || document.body).append(host)
  return host
}

function boundaryRect(anchor: HTMLElement | null) {
  let stage = anchor?.closest<HTMLElement>('[data-fixture-stage]')
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

function pointFromElement(element: HTMLElement): AnchorPoint {
  let box = element.getBoundingClientRect()
  return { height: box.height, width: box.width, x: box.left, y: box.top }
}

function positionElement(content: HTMLElement, anchor: AnchorPoint, boundaryAnchor: HTMLElement | null, side: MenuSide, align: MenuAlign, offset: number) {
  let contentBox = content.getBoundingClientRect()
  let boundary = boundaryRect(boundaryAnchor)
  let gap = 8
  let left = anchor.x
  let top = anchor.y + anchor.height + offset

  if (side === 'top') top = anchor.y - contentBox.height - offset
  if (side === 'right') {
    left = anchor.x + anchor.width + offset
    top = anchor.y
  }
  if (side === 'left') {
    left = anchor.x - contentBox.width - offset
    top = anchor.y
  }

  if (side === 'top' || side === 'bottom') {
    if (align === 'center') left = anchor.x + (anchor.width - contentBox.width) / 2
    if (align === 'end') left = anchor.x + anchor.width - contentBox.width
  } else {
    if (align === 'center') top = anchor.y + (anchor.height - contentBox.height) / 2
    if (align === 'end') top = anchor.y + anchor.height - contentBox.height
  }

  left = clamp(left, boundary.left + gap, boundary.right - contentBox.width - gap)
  top = clamp(top, boundary.top + gap, boundary.bottom - contentBox.height - gap)

  content.style.position = 'fixed'
  content.style.left = `${Math.round(left)}px`
  content.style.top = `${Math.round(top)}px`
  content.style.setProperty('--radcn-menu-transform-origin', `${align === 'end' ? 'right' : align === 'center' ? 'center' : 'left'} ${side === 'top' ? 'bottom' : 'top'}`)
  content.style.setProperty('--radcn-menu-available-height', `${Math.max(0, boundary.height - gap * 2)}px`)
  content.dataset.side = side
  content.dataset.align = align
}

function containsTarget(element: HTMLElement | null, target: EventTarget | null) {
  return target instanceof Node && !!element?.contains(target)
}

function enabledItems(container: HTMLElement, selector: string) {
  return Array.from(container.querySelectorAll<HTMLElement>(selector)).filter((item) => {
    if (item.closest('[data-radcn-menu-sub-content][hidden]')) return false
    return item.dataset.disabled !== 'true' && item.getAttribute('aria-disabled') !== 'true'
  })
}

function clearHighlight(container: HTMLElement, selector: string) {
  container.querySelectorAll<HTMLElement>(selector).forEach((item) => {
    item.dataset.highlighted = 'false'
    item.tabIndex = -1
  })
}

function highlightItem(container: HTMLElement, selector: string, item: HTMLElement | null, focus = true) {
  if (!item || item.dataset.disabled === 'true') return
  clearHighlight(container, selector)
  item.dataset.highlighted = 'true'
  item.tabIndex = 0
  if (focus) item.focus()
}

function itemText(item: HTMLElement) {
  return (item.dataset.text || item.textContent || '').trim().toLowerCase()
}

function syncCheckedItem(item: HTMLElement, checked: boolean) {
  item.dataset.state = checked ? 'checked' : 'unchecked'
  item.setAttribute('aria-checked', checked ? 'true' : 'false')
  let indicator = item.querySelector<HTMLElement>('[data-radcn-menu-item-indicator]')
  if (indicator) indicator.hidden = !checked
}

function initializeCheckedState(content: HTMLElement) {
  content.querySelectorAll<HTMLElement>('[data-radcn-menu-checkbox-item]').forEach((item) => {
    syncCheckedItem(item, item.dataset.checked === 'true' || item.dataset.state === 'checked')
  })

  content.querySelectorAll<HTMLElement>('[data-radcn-menu-radio-group]').forEach((group) => {
    let value = group.dataset.value
    group.querySelectorAll<HTMLElement>('[data-radcn-menu-radio-item]').forEach((item) => {
      syncCheckedItem(item, !!value && item.dataset.value === value)
    })
  })
}

export function setupMenuOverlay(root: HTMLElement, options: MenuOverlayOptions) {
  let menuRoot = root as MenuOverlayRoot
  if (root.dataset[options.readyDataKey] === 'true') return menuRoot[cleanupKey]

  let portal = root.querySelector<HTMLElement>(options.portalSelector)
  let content = root.querySelector<HTMLElement>(options.contentSelector)
  let trigger = root.querySelector<HTMLElement>(options.triggerSelector)
  if (!portal || !content || !trigger) return
  let menuPortal = portal
  let menuContent = content
  let menuTrigger = trigger

  let menuId = root.id || `radcn-menu-${Math.random().toString(36).slice(2)}`
  let controller = new AbortController()
  let listenerOptions = { signal: controller.signal }
  let typeahead = ''
  let typeaheadTimer = 0
  let currentAnchor: AnchorPoint | null = null
  let side = (menuContent.dataset.side as MenuSide | undefined) || options.side || 'bottom'
  let align = (menuContent.dataset.align as MenuAlign | undefined) || options.align || 'start'
  let sideOffset = Number(menuContent.dataset.sideOffset || options.sideOffset || 4)

  root.id = menuId
  menuContent.id = menuContent.id || `${menuId}-content`
  menuTrigger.setAttribute('aria-haspopup', 'menu')
  menuTrigger.setAttribute('aria-controls', menuContent.id)
  menuTrigger.setAttribute('aria-expanded', root.dataset.defaultOpen === 'true' ? 'true' : 'false')
  menuContent.setAttribute('role', 'menu')
  menuContent.tabIndex = -1

  portalHost(root.closest<HTMLElement>('[data-fixture-stage]')).append(menuPortal)

  function setOpen(state: 'open' | 'closed') {
    root.dataset.state = state
    root.dataset.open = state === 'open' ? 'true' : 'false'
    menuPortal.dataset.state = state
    menuContent.dataset.state = state
    menuTrigger.dataset.state = state
    menuTrigger.setAttribute('aria-expanded', state === 'open' ? 'true' : 'false')
    menuPortal.hidden = state !== 'open'
    menuContent.hidden = state !== 'open'
    if (state === 'closed') {
      closeSubmenus()
      clearHighlight(menuContent, options.itemSelector)
    }
  }

  function updatePosition() {
    if (menuPortal.hidden) return
    let anchor = currentAnchor || pointFromElement(menuTrigger)
    positionElement(menuContent, anchor, menuTrigger, side, align, sideOffset)
    positionOpenSubmenus()
  }

  function focusInitial(openReason: string) {
    let items = enabledItems(menuContent, options.itemSelector)
    let item = openReason === 'ArrowUp' ? items.at(-1) : items[0]
    highlightItem(menuContent, options.itemSelector, item || null)
  }

  function open(anchor: AnchorPoint | null, openReason: string) {
    currentAnchor = anchor
    initializeCheckedState(menuContent)
    setOpen('open')
    updatePosition()
    requestAnimationFrame(updatePosition)
    focusInitial(openReason)
  }

  function close(restoreFocus = true) {
    window.clearTimeout(typeaheadTimer)
    typeahead = ''
    setOpen('closed')
    if (restoreFocus) menuTrigger.focus()
  }

  function moveHighlight(container: HTMLElement, direction: 1 | -1) {
    let items = enabledItems(container, options.itemSelector)
    if (items.length === 0) return
    let active = document.activeElement instanceof HTMLElement ? document.activeElement : null
    let index = active ? items.indexOf(active) : -1
    let next = items[(index + direction + items.length) % items.length]
    highlightItem(container, options.itemSelector, next)
  }

  function typeaheadTo(container: HTMLElement, key: string) {
    window.clearTimeout(typeaheadTimer)
    typeahead += key.toLowerCase()
    typeaheadTimer = window.setTimeout(() => {
      typeahead = ''
    }, 700)

    let match = enabledItems(container, options.itemSelector).find((item) => itemText(item).startsWith(typeahead))
    if (match) highlightItem(container, options.itemSelector, match)
  }

  function closeSubmenus() {
    menuContent.querySelectorAll<HTMLElement>(options.subTriggerSelector).forEach((subTrigger) => {
      subTrigger.dataset.state = 'closed'
      subTrigger.setAttribute('aria-expanded', 'false')
    })
    menuContent.querySelectorAll<HTMLElement>(options.subContentSelector).forEach((subContent) => {
      subContent.dataset.state = 'closed'
      subContent.hidden = true
    })
  }

  function subContentFor(subTrigger: HTMLElement) {
    let id = subTrigger.getAttribute('aria-controls')
    if (id) {
      let explicit = menuContent.querySelector<HTMLElement>(`#${CSS.escape(id)}`)
      if (explicit) return explicit
    }
    return subTrigger.parentElement?.querySelector<HTMLElement>(options.subContentSelector) || null
  }

  function openSubmenu(subTrigger: HTMLElement, focus = false) {
    if (subTrigger.dataset.disabled === 'true') return
    let subContent = subContentFor(subTrigger)
    if (!subContent) return
    subTrigger.dataset.state = 'open'
    subTrigger.setAttribute('aria-expanded', 'true')
    subContent.dataset.state = 'open'
    subContent.hidden = false
    positionElement(subContent, pointFromElement(subTrigger), menuTrigger, 'right', 'start', 4)
    if (focus) highlightItem(subContent, options.itemSelector, enabledItems(subContent, options.itemSelector)[0] || null)
  }

  function closeSubmenuFromContent(subContent: HTMLElement) {
    let id = subContent.id
    let subTrigger = id ? menuContent.querySelector<HTMLElement>(`${options.subTriggerSelector}[aria-controls="${CSS.escape(id)}"]`) : null
    subContent.dataset.state = 'closed'
    subContent.hidden = true
    if (subTrigger) {
      subTrigger.dataset.state = 'closed'
      subTrigger.setAttribute('aria-expanded', 'false')
      highlightItem(menuContent, options.itemSelector, subTrigger)
    }
  }

  function positionOpenSubmenus() {
    menuContent.querySelectorAll<HTMLElement>(options.subTriggerSelector).forEach((subTrigger) => {
      if (subTrigger.dataset.state === 'open') openSubmenu(subTrigger)
    })
  }

  function activateItem(item: HTMLElement) {
    if (item.dataset.disabled === 'true') return
    if (item.dataset.radcnMenuSubTrigger === 'true') {
      openSubmenu(item, true)
      return
    }
    if (item.dataset.radcnMenuCheckboxItem === 'true') {
      syncCheckedItem(item, item.dataset.state !== 'checked')
      close()
      return
    }
    if (item.dataset.radcnMenuRadioItem === 'true') {
      let group = item.closest<HTMLElement>('[data-radcn-menu-radio-group]')
      if (group) {
        group.dataset.value = item.dataset.value || ''
        group.querySelectorAll<HTMLElement>('[data-radcn-menu-radio-item]').forEach((radio) => syncCheckedItem(radio, radio === item))
      }
      close()
      return
    }
    close()
  }

  menuTrigger.addEventListener('keydown', (event) => {
    if (options.kind === 'dropdown' && (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
      event.preventDefault()
      open(pointFromElement(menuTrigger), event.key)
    }
    if (options.kind === 'context' && (event.key === 'ContextMenu' || (event.shiftKey && event.key === 'F10'))) {
      event.preventDefault()
      open(pointFromElement(menuTrigger), event.key)
    }
  }, listenerOptions)

  menuTrigger.addEventListener('click', (event) => {
    if (options.kind !== 'dropdown') return
    event.preventDefault()
    if (root.dataset.state === 'open') close()
    else open(pointFromElement(menuTrigger), 'click')
  }, listenerOptions)

  menuTrigger.addEventListener('contextmenu', (event) => {
    if (options.kind !== 'context') return
    event.preventDefault()
    open({ height: 0, width: 0, x: event.clientX, y: event.clientY }, 'contextmenu')
  }, listenerOptions)

  menuPortal.addEventListener('pointermove', (event) => {
    let target = event.target
    if (!(target instanceof Element)) return
    let item = target.closest<HTMLElement>(options.itemSelector)
    if (!item || item.dataset.disabled === 'true') return
    let container = item.closest<HTMLElement>(`${options.contentSelector}, ${options.subContentSelector}`)
    if (container) highlightItem(container, options.itemSelector, item, false)
    if (item.dataset.radcnMenuSubTrigger === 'true') openSubmenu(item)
  }, listenerOptions)

  menuPortal.addEventListener('click', (event) => {
    let target = event.target
    if (!(target instanceof Element)) return
    let item = target.closest<HTMLElement>(options.itemSelector)
    if (!item) return
    event.preventDefault()
    activateItem(item)
  }, listenerOptions)

  menuPortal.addEventListener('keydown', (event) => {
    if (menuPortal.hidden) return
    let active = document.activeElement instanceof HTMLElement ? document.activeElement : null
    let container = active?.closest<HTMLElement>(`${options.contentSelector}, ${options.subContentSelector}`) || menuContent

    if (event.key === 'Tab') {
      close(false)
      return
    }
    if (event.key === 'Escape') {
      event.preventDefault()
      close()
      return
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      moveHighlight(container, 1)
      return
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      moveHighlight(container, -1)
      return
    }
    if (event.key === 'Home') {
      event.preventDefault()
      highlightItem(container, options.itemSelector, enabledItems(container, options.itemSelector)[0] || null)
      return
    }
    if (event.key === 'End') {
      event.preventDefault()
      highlightItem(container, options.itemSelector, enabledItems(container, options.itemSelector).at(-1) || null)
      return
    }
    if (event.key === 'ArrowRight' && active?.matches(options.subTriggerSelector)) {
      event.preventDefault()
      openSubmenu(active, true)
      return
    }
    if (event.key === 'ArrowLeft' && container.matches(options.subContentSelector)) {
      event.preventDefault()
      closeSubmenuFromContent(container)
      return
    }
    if ((event.key === 'Enter' || event.key === ' ') && active?.matches(options.itemSelector)) {
      event.preventDefault()
      activateItem(active)
      return
    }
    if (event.key.length === 1 && !event.metaKey && !event.ctrlKey && !event.altKey) {
      typeaheadTo(container, event.key)
    }
  }, listenerOptions)

  document.addEventListener('pointerdown', (event) => {
    if (root.dataset.state !== 'open') return
    if (containsTarget(menuTrigger, event.target) || containsTarget(menuPortal, event.target)) return
    close(false)
  }, listenerOptions)

  window.addEventListener('resize', updatePosition, listenerOptions)
  window.addEventListener('scroll', updatePosition, { capture: true, signal: controller.signal })

  if (root.dataset.defaultOpen === 'true') open(pointFromElement(menuTrigger), 'default')
  else setOpen('closed')

  function cleanup() {
    window.clearTimeout(typeaheadTimer)
    controller.abort()
    delete root.dataset[options.readyDataKey]
    delete menuRoot[cleanupKey]
  }

  menuRoot[cleanupKey] = cleanup
  root.dataset[options.readyDataKey] = 'true'
  return cleanup
}
