import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'

export type NavigationMenuOrientation = 'horizontal' | 'vertical'

export interface NavigationMenuProps {
  ariaLabel?: string
  children?: RemixNode
  class?: string
  defaultValue?: string
  delayDuration?: number
  id?: string
  orientation?: NavigationMenuOrientation
  skipDelayDuration?: number
  style?: string
  value?: string
}

export interface NavigationMenuItemProps {
  children?: RemixNode
  class?: string
  disabled?: boolean
  style?: string
  value: string
}

export interface NavigationMenuLinkProps {
  children?: RemixNode
  class?: string
  current?: boolean
  disabled?: boolean
  href?: string
  style?: string
}

export interface NavigationMenuPartProps {
  children?: RemixNode
  class?: string
  disabled?: boolean
  style?: string
}

function enabledControls(root: HTMLElement) {
  return Array.from(root.querySelectorAll<HTMLElement>('[data-radcn-navigation-menu-trigger], [data-radcn-navigation-menu-link]')).filter((control) => {
    if (control.closest('[data-radcn-navigation-menu-content]')) return false
    return control.dataset.disabled !== 'true' && control.getAttribute('aria-disabled') !== 'true'
  })
}

function itemForControl(control: HTMLElement) {
  return control.closest<HTMLElement>('[data-radcn-navigation-menu-item]')
}

function contentForItem(item: HTMLElement | null) {
  return item?.querySelector<HTMLElement>('[data-radcn-navigation-menu-content]') || null
}

function valueForItem(item: HTMLElement | null) {
  return item?.dataset.value || ''
}

export function enhanceNavigationMenu(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-radcn-navigation-menu]').forEach((menu) => {
    if (menu.dataset.radcnNavigationMenuReady === 'true') return
    let orientation = (menu.dataset.orientation || 'horizontal') as NavigationMenuOrientation
    let viewport = menu.querySelector<HTMLElement>('[data-radcn-navigation-menu-viewport]')
    let indicator = menu.querySelector<HTMLElement>('[data-radcn-navigation-menu-indicator]')
    let closeTimer = 0
    let openTimer = 0

    function setActive(item: HTMLElement | null, motion: 'from-start' | 'from-end' | 'idle' = 'idle') {
      let value = valueForItem(item)
      menu.dataset.value = value
      menu.querySelectorAll<HTMLElement>('[data-radcn-navigation-menu-item]').forEach((candidate) => {
        let active = candidate === item
        candidate.dataset.active = active ? 'true' : 'false'
        candidate.dataset.state = active ? 'open' : 'closed'
        let trigger = candidate.querySelector<HTMLElement>('[data-radcn-navigation-menu-trigger]')
        let content = candidate.querySelector<HTMLElement>('[data-radcn-navigation-menu-content]')
        if (trigger) {
          trigger.dataset.state = active ? 'open' : 'closed'
          trigger.setAttribute('aria-expanded', active ? 'true' : 'false')
        }
        if (content) {
          content.dataset.state = active ? 'open' : 'closed'
          content.hidden = !active
        }
      })
      if (viewport) {
        viewport.dataset.state = item && contentForItem(item) ? 'open' : 'closed'
        viewport.dataset.motion = motion
        viewport.hidden = !(item && contentForItem(item))
        let content = contentForItem(item)
        if (content) {
          let box = content.getBoundingClientRect()
          viewport.style.setProperty('--radcn-navigation-menu-viewport-width', `${Math.max(1, Math.round(box.width))}px`)
          viewport.style.setProperty('--radcn-navigation-menu-viewport-height', `${Math.max(1, Math.round(box.height))}px`)
        }
      }
      if (indicator) {
        indicator.dataset.state = item ? 'visible' : 'hidden'
        indicator.hidden = !item
        let control = item?.querySelector<HTMLElement>('[data-radcn-navigation-menu-trigger], [data-radcn-navigation-menu-link]')
        if (control) {
          let rootBox = menu.getBoundingClientRect()
          let box = control.getBoundingClientRect()
          indicator.style.setProperty('--radcn-navigation-menu-indicator-left', `${Math.round(box.left - rootBox.left + box.width / 2)}px`)
        }
      }
    }

    function focusControl(control: HTMLElement) {
      enabledControls(menu).forEach((candidate) => {
        candidate.tabIndex = candidate === control ? 0 : -1
      })
      control.focus()
    }

    function move(control: HTMLElement, direction: 1 | -1) {
      let controls = enabledControls(menu)
      if (controls.length === 0) return
      let index = controls.indexOf(control)
      let next = controls[(index + direction + controls.length) % controls.length]
      if (!next) return
      focusControl(next)
      setActive(itemForControl(next), direction > 0 ? 'from-end' : 'from-start')
    }

    menu.querySelectorAll<HTMLElement>('[data-radcn-navigation-menu-item]').forEach((item) => {
      let content = contentForItem(item)
      let trigger = item.querySelector<HTMLElement>('[data-radcn-navigation-menu-trigger]')
      if (content) {
        content.id = content.id || `${menu.id || 'radcn-navigation-menu'}-content-${item.dataset.value}`
        content.hidden = menu.dataset.value !== item.dataset.value
      }
      if (trigger && content) {
        trigger.setAttribute('aria-controls', content.id)
        trigger.setAttribute('aria-expanded', menu.dataset.value === item.dataset.value ? 'true' : 'false')
      }
    })

    menu.addEventListener('keydown', (event) => {
      let target = event.target
      if (!(target instanceof HTMLElement) || !target.matches('[data-radcn-navigation-menu-trigger], [data-radcn-navigation-menu-link]')) return
      let previousKey = orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp'
      let nextKey = orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown'
      if (event.key === previousKey) {
        event.preventDefault()
        move(target, -1)
      } else if (event.key === nextKey) {
        event.preventDefault()
        move(target, 1)
      } else if (event.key === 'Home') {
        event.preventDefault()
        let first = enabledControls(menu)[0]
        if (first) {
          focusControl(first)
          setActive(itemForControl(first), 'from-start')
        }
      } else if (event.key === 'End') {
        event.preventDefault()
        let last = enabledControls(menu).at(-1)
        if (last) {
          focusControl(last)
          setActive(itemForControl(last), 'from-end')
        }
      } else if (event.key === 'Enter' || event.key === ' ') {
        let item = itemForControl(target)
        if (target.matches('[data-radcn-navigation-menu-trigger]')) {
          event.preventDefault()
          setActive(item, 'idle')
        }
      } else if (event.key === 'Escape') {
        event.preventDefault()
        setActive(null)
        target.focus()
      }
    })

    menu.addEventListener('pointerenter', (event) => {
      let target = event.target
      if (!(target instanceof Element)) return
      let control = target.closest<HTMLElement>('[data-radcn-navigation-menu-trigger], [data-radcn-navigation-menu-link]')
      if (!control || control.dataset.disabled === 'true') return
      window.clearTimeout(closeTimer)
      window.clearTimeout(openTimer)
      openTimer = window.setTimeout(() => setActive(itemForControl(control), 'idle'), Number(menu.dataset.delayDuration || 100))
    }, true)

    menu.addEventListener('focusin', (event) => {
      let target = event.target
      if (!(target instanceof Element)) return
      let control = target.closest<HTMLElement>('[data-radcn-navigation-menu-trigger], [data-radcn-navigation-menu-link]')
      if (control && control.dataset.disabled !== 'true') setActive(itemForControl(control), 'idle')
    })

    menu.addEventListener('focusout', () => {
      window.setTimeout(() => {
        if (!menu.contains(document.activeElement)) setActive(null)
      })
    })

    menu.addEventListener('pointerleave', () => {
      window.clearTimeout(openTimer)
      closeTimer = window.setTimeout(() => setActive(null), Number(menu.dataset.skipDelayDuration || 150))
    })

    let controls = enabledControls(menu)
    controls.forEach((control) => {
      control.tabIndex = control.closest<HTMLElement>('[data-radcn-navigation-menu-item]')?.dataset.value === menu.dataset.value ? 0 : -1
    })
    if (controls.every((control) => control.tabIndex !== 0) && controls[0]) controls[0].tabIndex = 0
    setActive(menu.querySelector<HTMLElement>(`[data-radcn-navigation-menu-item][data-value="${CSS.escape(menu.dataset.value || '')}"]`))
    menu.dataset.radcnNavigationMenuReady = 'true'
  })
}

export function NavigationMenu(handle: Handle<NavigationMenuProps>) {
  return () => {
    let { ariaLabel = 'Main navigation', children, class: className, defaultValue, delayDuration = 100, id, orientation = 'horizontal', skipDelayDuration = 150, style, value } = handle.props
    let initialValue = value ?? defaultValue ?? ''
    return <nav aria-label={ariaLabel} class={classes('radcn-navigation-menu', className)} data-delay-duration={String(delayDuration)} data-orientation={orientation} data-radcn-navigation-menu data-skip-delay-duration={String(skipDelayDuration)} data-value={initialValue} id={id} style={style}>{children}</nav>
  }
}

export function NavigationMenuList(handle: Handle<NavigationMenuPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props
    return <ul class={classes('radcn-navigation-menu-list', className)} data-radcn-navigation-menu-list style={style}>{children}</ul>
  }
}

export function NavigationMenuItem(handle: Handle<NavigationMenuItemProps>) {
  return () => {
    let { children, class: className, disabled, style, value } = handle.props
    return <li class={classes('radcn-navigation-menu-item', className)} data-active="false" data-disabled={disabled ? 'true' : undefined} data-radcn-navigation-menu-item data-state="closed" data-value={value} style={style}>{children}</li>
  }
}

export function NavigationMenuTrigger(handle: Handle<NavigationMenuPartProps>) {
  return () => {
    let { children, class: className, disabled, style } = handle.props
    return <button aria-disabled={disabled ? 'true' : undefined} aria-expanded="false" class={classes('radcn-navigation-menu-trigger', className)} data-disabled={disabled ? 'true' : undefined} data-radcn-navigation-menu-trigger data-state="closed" disabled={disabled} type="button" style={style}>{children}</button>
  }
}

export function NavigationMenuContent(handle: Handle<NavigationMenuPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props
    return <div class={classes('radcn-navigation-menu-content', className)} data-radcn-navigation-menu-content data-state="closed" hidden style={style}>{children}</div>
  }
}

export function NavigationMenuLink(handle: Handle<NavigationMenuLinkProps>) {
  return () => {
    let { children, class: className, current, disabled, href = '#', style } = handle.props
    return <a aria-current={current ? 'page' : undefined} aria-disabled={disabled ? 'true' : undefined} class={classes('radcn-navigation-menu-link', className)} data-disabled={disabled ? 'true' : undefined} data-radcn-navigation-menu-link href={disabled ? undefined : href} style={style}>{children}</a>
  }
}

export function NavigationMenuIndicator(handle: Handle<NavigationMenuPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props
    return <div aria-hidden="true" class={classes('radcn-navigation-menu-indicator', className)} data-radcn-navigation-menu-indicator data-state="hidden" hidden style={style}>{children}</div>
  }
}

export function NavigationMenuViewport(handle: Handle<NavigationMenuPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props
    return <div aria-hidden="true" class={classes('radcn-navigation-menu-viewport', className)} data-motion="idle" data-radcn-navigation-menu-viewport data-state="closed" hidden style={style}>{children}</div>
  }
}
