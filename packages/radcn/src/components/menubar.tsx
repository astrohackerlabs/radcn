import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'
import { setupMenuOverlay } from '../utils/menu-overlay.ts'
import type { DropdownMenuAlign, DropdownMenuItemVariant, DropdownMenuSide } from './dropdown-menu.tsx'

export type MenubarAlign = DropdownMenuAlign
export type MenubarItemVariant = DropdownMenuItemVariant
export type MenubarOrientation = 'horizontal' | 'vertical'
export type MenubarSide = DropdownMenuSide

export interface MenubarProps {
  children?: RemixNode
  class?: string
  defaultValue?: string
  disabled?: boolean
  id?: string
  loop?: boolean
  orientation?: MenubarOrientation
  style?: string
  value?: string
}

export interface MenubarMenuProps {
  children?: RemixNode
  class?: string
  disabled?: boolean
  style?: string
  value: string
}

export interface MenubarPartProps {
  children?: RemixNode
  class?: string
  inset?: boolean
  style?: string
}

export interface MenubarTriggerProps extends MenubarPartProps {
  ariaLabel?: string
  disabled?: boolean
}

export interface MenubarContentProps extends MenubarPartProps {
  align?: MenubarAlign
  side?: MenubarSide
  sideOffset?: number
}

export interface MenubarItemProps extends MenubarPartProps {
  disabled?: boolean
  textValue?: string
  variant?: MenubarItemVariant
}

export interface MenubarCheckboxItemProps extends MenubarItemProps {
  checked?: boolean
}

export interface MenubarRadioGroupProps extends MenubarPartProps {
  value?: string
}

export interface MenubarRadioItemProps extends MenubarItemProps {
  value: string
}

function enabledTriggers(menubar: HTMLElement) {
  return Array.from(menubar.querySelectorAll<HTMLElement>('[data-radcn-menubar-trigger]')).filter((trigger) => trigger.dataset.disabled !== 'true' && trigger.getAttribute('aria-disabled') !== 'true')
}

function closeSiblingMenus(trigger: HTMLElement) {
  let menubar = trigger.closest<HTMLElement>('[data-radcn-menubar]')
  menubar?.querySelectorAll<HTMLElement>('[data-radcn-menubar-trigger][aria-expanded="true"]').forEach((candidate) => {
    if (candidate !== trigger) candidate.click()
  })
}

function openMenuTrigger(trigger: HTMLElement) {
  closeSiblingMenus(trigger)
  if (trigger.getAttribute('aria-expanded') !== 'true') trigger.click()
}

export function enhanceMenubar(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-radcn-menubar-menu]').forEach((menu) => {
    setupMenuOverlay(menu, {
      align: 'start',
      contentSelector: '[data-radcn-menubar-content]',
      itemSelector: '[data-radcn-menu-item]',
      kind: 'dropdown',
      portalSelector: '[data-radcn-menubar-portal]',
      readyDataKey: 'radcnMenubarMenuReady',
      rootSelector: '[data-radcn-menubar-menu]',
      side: 'bottom',
      sideOffset: 4,
      subContentSelector: '[data-radcn-menubar-sub-content]',
      subTriggerSelector: '[data-radcn-menubar-sub-trigger]',
      triggerSelector: '[data-radcn-menubar-trigger]',
    })
  })

  root.querySelectorAll<HTMLElement>('[data-radcn-menubar]').forEach((menubar) => {
    if (menubar.dataset.radcnMenubarReady === 'true') return
    let orientation = (menubar.dataset.orientation || 'horizontal') as MenubarOrientation

    function syncTabStops(active: HTMLElement | null = null) {
      let triggers = enabledTriggers(menubar)
      let target = active || triggers.find((trigger) => trigger.dataset.value === menubar.dataset.value) || triggers[0] || null
      triggers.forEach((trigger) => {
        trigger.tabIndex = trigger === target ? 0 : -1
      })
    }

    function move(current: HTMLElement, direction: 1 | -1, open = false) {
      let triggers = enabledTriggers(menubar)
      if (triggers.length === 0) return
      let index = triggers.indexOf(current)
      let nextIndex = index + direction
      if (menubar.dataset.loop === 'true') nextIndex = (nextIndex + triggers.length) % triggers.length
      else nextIndex = Math.min(Math.max(nextIndex, 0), triggers.length - 1)
      let next = triggers[nextIndex]
      if (!next) return
      syncTabStops(next)
      next.focus()
      menubar.dataset.value = next.dataset.value || ''
      if (open) openMenuTrigger(next)
    }

    menubar.addEventListener('keydown', (event) => {
      let target = event.target
      if (!(target instanceof HTMLElement) || !target.matches('[data-radcn-menubar-trigger]')) return
      let previousKey = orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp'
      let nextKey = orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown'
      let opened = target.getAttribute('aria-expanded') === 'true'

      if (event.key === previousKey) {
        event.preventDefault()
        event.stopPropagation()
        move(target, -1, opened)
      } else if (event.key === nextKey) {
        event.preventDefault()
        event.stopPropagation()
        move(target, 1, opened)
      } else if (event.key === 'Home') {
        event.preventDefault()
        event.stopPropagation()
        let first = enabledTriggers(menubar)[0]
        if (first) {
          syncTabStops(first)
          first.focus()
          if (opened) openMenuTrigger(first)
        }
      } else if (event.key === 'End') {
        event.preventDefault()
        event.stopPropagation()
        let last = enabledTriggers(menubar).at(-1)
        if (last) {
          syncTabStops(last)
          last.focus()
          if (opened) openMenuTrigger(last)
        }
      }
    }, true)

    menubar.addEventListener('pointerenter', (event) => {
      let target = event.target
      if (!(target instanceof Element)) return
      let trigger = target.closest<HTMLElement>('[data-radcn-menubar-trigger]')
      if (!trigger || trigger.dataset.disabled === 'true') return
      let hasOpenMenu = enabledTriggers(menubar).some((candidate) => candidate.getAttribute('aria-expanded') === 'true')
      if (hasOpenMenu) openMenuTrigger(trigger)
    }, true)

    menubar.querySelectorAll<HTMLElement>('[data-radcn-menubar-trigger]').forEach((trigger) => {
      trigger.dataset.value = trigger.closest<HTMLElement>('[data-radcn-menubar-menu]')?.dataset.value || ''
      trigger.setAttribute('role', 'menuitem')
      trigger.tabIndex = -1
    })
    syncTabStops()
    menubar.dataset.radcnMenubarReady = 'true'
  })
}

export function Menubar(handle: Handle<MenubarProps>) {
  return () => {
    let { children, class: className, defaultValue, disabled, id, loop = true, orientation = 'horizontal', style, value } = handle.props
    let initialValue = value ?? defaultValue
    return <div aria-orientation={orientation} class={classes('radcn-menubar', className)} data-disabled={disabled ? 'true' : undefined} data-loop={loop ? 'true' : 'false'} data-orientation={orientation} data-radcn-menubar data-value={initialValue} id={id} role="menubar" style={style}>{children}</div>
  }
}

export function MenubarMenu(handle: Handle<MenubarMenuProps>) {
  return () => {
    let { children, class: className, disabled, style, value } = handle.props
    return <div class={classes('radcn-menubar-menu', className)} data-disabled={disabled ? 'true' : undefined} data-radcn-menubar-menu data-state="closed" data-value={value} style={style}>{children}</div>
  }
}

export function MenubarTrigger(handle: Handle<MenubarTriggerProps>) {
  return () => {
    let { ariaLabel, children, class: className, disabled, style } = handle.props
    return <button aria-disabled={disabled ? 'true' : undefined} aria-label={ariaLabel} class={classes('radcn-menubar-trigger', className)} data-disabled={disabled ? 'true' : undefined} data-radcn-menubar-trigger data-state="closed" data-value="" disabled={disabled} role="menuitem" type="button" style={style}>{children}</button>
  }
}

export function MenubarPortal(handle: Handle<MenubarPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props
    return <div class={classes('radcn-menubar-portal', className)} data-radcn-menubar-portal data-state="closed" hidden style={style}>{children}</div>
  }
}

export function MenubarContent(handle: Handle<MenubarContentProps>) {
  return () => {
    let { align = 'start', children, class: className, side = 'bottom', sideOffset = 4, style } = handle.props
    return <div class={classes('radcn-menubar-content', className)} data-align={align} data-radcn-menubar-content data-side={side} data-side-offset={String(sideOffset)} data-state="closed" hidden role="menu" style={style}>{children}</div>
  }
}

export function MenubarGroup(handle: Handle<MenubarPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props
    return <div class={classes('radcn-menubar-group', className)} data-radcn-menubar-group data-radcn-menu-group role="group" style={style}>{children}</div>
  }
}

export function MenubarLabel(handle: Handle<MenubarPartProps>) {
  return () => {
    let { children, class: className, inset, style } = handle.props
    return <div class={classes('radcn-menubar-label', inset && 'radcn-menu-label--inset', className)} data-inset={inset ? 'true' : undefined} data-radcn-menubar-label data-radcn-menu-label style={style}>{children}</div>
  }
}

export function MenubarItem(handle: Handle<MenubarItemProps>) {
  return () => {
    let { children, class: className, disabled, inset, style, textValue, variant = 'default' } = handle.props
    return <button aria-disabled={disabled ? 'true' : undefined} class={classes('radcn-menubar-item', `radcn-menu-item--${variant}`, inset && 'radcn-menu-item--inset', className)} data-disabled={disabled ? 'true' : undefined} data-highlighted="false" data-radcn-menubar-item data-radcn-menu-item data-text={textValue} data-variant={variant} role="menuitem" style={style} tabIndex={-1} type="button">{children}</button>
  }
}

export function MenubarCheckboxItem(handle: Handle<MenubarCheckboxItemProps>) {
  return () => {
    let { checked, children, class: className, disabled, inset, style, textValue } = handle.props
    return <button aria-checked={checked ? 'true' : 'false'} aria-disabled={disabled ? 'true' : undefined} class={classes('radcn-menubar-checkbox-item', inset && 'radcn-menu-item--inset', className)} data-checked={checked ? 'true' : 'false'} data-disabled={disabled ? 'true' : undefined} data-highlighted="false" data-radcn-menubar-checkbox-item data-radcn-menu-checkbox-item="true" data-radcn-menu-item data-state={checked ? 'checked' : 'unchecked'} data-text={textValue} role="menuitemcheckbox" style={style} tabIndex={-1} type="button"><span class="radcn-menu-item-indicator" data-radcn-menubar-item-indicator data-radcn-menu-item-indicator hidden={!checked}>✓</span>{children}</button>
  }
}

export function MenubarRadioGroup(handle: Handle<MenubarRadioGroupProps>) {
  return () => {
    let { children, class: className, style, value } = handle.props
    return <div class={classes('radcn-menubar-radio-group', className)} data-radcn-menubar-radio-group data-radcn-menu-radio-group data-value={value} role="group" style={style}>{children}</div>
  }
}

export function MenubarRadioItem(handle: Handle<MenubarRadioItemProps>) {
  return () => {
    let { children, class: className, disabled, inset, style, textValue, value } = handle.props
    return <button aria-checked="false" aria-disabled={disabled ? 'true' : undefined} class={classes('radcn-menubar-radio-item', inset && 'radcn-menu-item--inset', className)} data-disabled={disabled ? 'true' : undefined} data-highlighted="false" data-radcn-menubar-radio-item data-radcn-menu-item data-radcn-menu-radio-item="true" data-state="unchecked" data-text={textValue} data-value={value} role="menuitemradio" style={style} tabIndex={-1} type="button"><span class="radcn-menu-item-indicator" data-radcn-menubar-item-indicator data-radcn-menu-item-indicator hidden>●</span>{children}</button>
  }
}

export function MenubarItemIndicator(handle: Handle<MenubarPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props
    return <span class={classes('radcn-menu-item-indicator', className)} data-radcn-menubar-item-indicator data-radcn-menu-item-indicator style={style}>{children || '✓'}</span>
  }
}

export function MenubarSeparator(handle: Handle<MenubarPartProps>) {
  return () => {
    let { class: className, style } = handle.props
    return <div class={classes('radcn-menubar-separator', className)} data-radcn-menubar-separator data-radcn-menu-separator role="separator" style={style} />
  }
}

export function MenubarShortcut(handle: Handle<MenubarPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props
    return <span class={classes('radcn-menubar-shortcut', className)} data-radcn-menubar-shortcut data-radcn-menu-shortcut style={style}>{children}</span>
  }
}

export function MenubarSub(handle: Handle<MenubarPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props
    return <div class={classes('radcn-menubar-sub', className)} data-radcn-menubar-sub data-radcn-menu-sub style={style}>{children}</div>
  }
}

export function MenubarSubTrigger(handle: Handle<MenubarItemProps>) {
  return () => {
    let { children, class: className, disabled, inset, style, textValue } = handle.props
    let id = `radcn-menubar-sub-${Math.random().toString(36).slice(2)}`
    return <button aria-controls={id} aria-disabled={disabled ? 'true' : undefined} aria-expanded="false" aria-haspopup="menu" class={classes('radcn-menubar-sub-trigger', inset && 'radcn-menu-item--inset', className)} data-disabled={disabled ? 'true' : undefined} data-highlighted="false" data-radcn-menubar-sub-trigger data-radcn-menu-item data-radcn-menu-sub-trigger="true" data-state="closed" data-text={textValue} role="menuitem" style={style} tabIndex={-1} type="button">{children}<span class="radcn-menu-sub-caret" aria-hidden="true">›</span></button>
  }
}

export function MenubarSubContent(handle: Handle<MenubarContentProps>) {
  return () => {
    let { children, class: className, style } = handle.props
    return <div class={classes('radcn-menubar-sub-content', className)} data-radcn-menubar-sub-content data-radcn-menu-sub-content data-state="closed" hidden role="menu" style={style}>{children}</div>
  }
}
