import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'
import { setupMenuOverlay } from '../utils/menu-overlay.ts'
import type { DropdownMenuAlign, DropdownMenuItemVariant, DropdownMenuSide } from './dropdown-menu.tsx'
import { menuItemIndicatorClass, menuSubCaretClass } from './dropdown-menu.tsx'

// Menubar + NavigationMenu shared surfaces as Tailwind utilities (Issue 6,
// Experiment 52). The trigger base + active are exported here and reused by
// navigation-menu.tsx (the two shared the trigger/font/disabled rules). KEPT
// bespoke (not these consts): the family radcn-menu-* helpers (Menubar still emits
// them; dropdown/context too) + data-radcn-menu-item. Comments here are ASCII.
export const menubarTriggerBase =
  'inline-flex min-h-8 items-center justify-center border-0 rounded-[calc(var(--radcn-radius)-0.125rem)] bg-transparent text-inherit cursor-pointer px-3 py-1.5 no-underline font-medium text-[0.875rem] leading-none [font-family:var(--radcn-font)] data-[disabled=true]:opacity-50 data-[disabled=true]:pointer-events-none'
export const menubarTriggerActive =
  'data-[state=open]:bg-[var(--radcn-menubar-highlight-bg,var(--radcn-secondary))] data-[state=open]:text-[var(--radcn-menubar-highlight-fg,var(--radcn-foreground))]'
const menubarRootClass =
  '[font-family:var(--radcn-font)] inline-flex gap-0.5 items-center border border-[var(--radcn-menubar-border,var(--radcn-border))] rounded-md bg-[var(--radcn-menubar-bg,var(--radcn-background))] text-[var(--radcn-menubar-fg,var(--radcn-foreground))] p-1 data-[orientation=vertical]:inline-grid data-[orientation=vertical]:items-stretch'
const menubarContentClass =
  'z-[var(--radcn-menubar-z,50)] grid min-w-48 max-h-[min(var(--radcn-menubar-content-max-height,18rem),var(--radcn-menu-available-height,18rem))] overflow-y-auto gap-0.5 border border-[var(--radcn-menubar-border,var(--radcn-border))] rounded-md bg-[var(--radcn-menubar-content-bg,var(--radcn-popover))] text-[var(--radcn-menubar-content-fg,var(--radcn-popover-foreground))] p-1.5 shadow-[0_18px_48px_rgb(0_0_0_/_0.16)] [transform-origin:var(--radcn-menu-transform-origin,top_left)] animate-[radcn-select-in_120ms_ease-out] [&[hidden]]:hidden'
const menubarItemClass =
  'grid min-h-8 grid-cols-[1rem_minmax(0,1fr)_auto] items-center gap-2 border-0 rounded-[calc(var(--radcn-radius)-0.125rem)] bg-transparent text-inherit cursor-default px-2 py-1.5 text-left font-normal text-[0.875rem] leading-[1.25] [font-family:var(--radcn-font)] data-[highlighted=true]:bg-[var(--radcn-menubar-highlight-bg,var(--radcn-secondary))] data-[highlighted=true]:text-[var(--radcn-menubar-highlight-fg,var(--radcn-foreground))] data-[disabled=true]:opacity-50 data-[disabled=true]:pointer-events-none'
const menubarLabelClass =
  'px-7 pt-1.5 pb-1 text-muted-foreground font-semibold text-[0.75rem] leading-[1.2] [font-family:var(--radcn-font)]'
const menubarSeparatorClass = 'h-px my-1 mx-1.5 bg-border'
const menubarShortcutClass = 'text-muted-foreground font-medium text-[0.75rem] leading-none [font-family:var(--radcn-font)]'

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
    return <div aria-orientation={orientation} class={classes(menubarRootClass, className)} data-disabled={disabled ? 'true' : undefined} data-loop={loop ? 'true' : 'false'} data-orientation={orientation} data-radcn-menubar data-value={initialValue} id={id} role="menubar" style={style}>{children}</div>
  }
}

export function MenubarMenu(handle: Handle<MenubarMenuProps>) {
  return () => {
    let { children, class: className, disabled, style, value } = handle.props
    return <div class={classes(className)} data-disabled={disabled ? 'true' : undefined} data-radcn-menubar-menu data-state="closed" data-value={value} style={style}>{children}</div>
  }
}

export function MenubarTrigger(handle: Handle<MenubarTriggerProps>) {
  return () => {
    let { ariaLabel, children, class: className, disabled, style } = handle.props
    return <button aria-disabled={disabled ? 'true' : undefined} aria-label={ariaLabel} class={classes(menubarTriggerBase, menubarTriggerActive, className)} data-disabled={disabled ? 'true' : undefined} data-radcn-menubar-trigger data-state="closed" data-value="" disabled={disabled} role="menuitem" type="button" style={style}>{children}</button>
  }
}

export function MenubarPortal(handle: Handle<MenubarPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props
    return <div class={classes('[&[hidden]]:hidden', className)} data-radcn-menubar-portal data-state="closed" hidden style={style}>{children}</div>
  }
}

export function MenubarContent(handle: Handle<MenubarContentProps>) {
  return () => {
    let { align = 'start', children, class: className, side = 'bottom', sideOffset = 4, style } = handle.props
    return <div class={classes(menubarContentClass, className)} data-align={align} data-radcn-menubar-content data-side={side} data-side-offset={String(sideOffset)} data-state="closed" hidden role="menu" style={style}>{children}</div>
  }
}

export function MenubarGroup(handle: Handle<MenubarPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props
    return <div class={classes(className)} data-radcn-menubar-group data-radcn-menu-group role="group" style={style}>{children}</div>
  }
}

export function MenubarLabel(handle: Handle<MenubarPartProps>) {
  return () => {
    let { children, class: className, inset, style } = handle.props
    return <div class={classes(menubarLabelClass, inset && 'radcn-menu-label--inset', className)} data-inset={inset ? 'true' : undefined} data-radcn-menubar-label data-radcn-menu-label style={style}>{children}</div>
  }
}

export function MenubarItem(handle: Handle<MenubarItemProps>) {
  return () => {
    let { children, class: className, disabled, inset, style, textValue, variant = 'default' } = handle.props
    return <button aria-disabled={disabled ? 'true' : undefined} class={classes(menubarItemClass, `radcn-menu-item--${variant}`, inset && 'radcn-menu-item--inset', className)} data-disabled={disabled ? 'true' : undefined} data-highlighted="false" data-radcn-menubar-item data-radcn-menu-item data-text={textValue} data-variant={variant} role="menuitem" style={style} tabIndex={-1} type="button">{children}</button>
  }
}

export function MenubarCheckboxItem(handle: Handle<MenubarCheckboxItemProps>) {
  return () => {
    let { checked, children, class: className, disabled, inset, style, textValue } = handle.props
    return <button aria-checked={checked ? 'true' : 'false'} aria-disabled={disabled ? 'true' : undefined} class={classes(menubarItemClass, inset && 'radcn-menu-item--inset', className)} data-checked={checked ? 'true' : 'false'} data-disabled={disabled ? 'true' : undefined} data-highlighted="false" data-radcn-menubar-checkbox-item data-radcn-menu-checkbox-item="true" data-radcn-menu-item data-state={checked ? 'checked' : 'unchecked'} data-text={textValue} role="menuitemcheckbox" style={style} tabIndex={-1} type="button"><span class={menuItemIndicatorClass} data-radcn-menubar-item-indicator data-radcn-menu-item-indicator hidden={!checked}>✓</span>{children}</button>
  }
}

export function MenubarRadioGroup(handle: Handle<MenubarRadioGroupProps>) {
  return () => {
    let { children, class: className, style, value } = handle.props
    return <div class={classes(className)} data-radcn-menubar-radio-group data-radcn-menu-radio-group data-value={value} role="group" style={style}>{children}</div>
  }
}

export function MenubarRadioItem(handle: Handle<MenubarRadioItemProps>) {
  return () => {
    let { children, class: className, disabled, inset, style, textValue, value } = handle.props
    return <button aria-checked="false" aria-disabled={disabled ? 'true' : undefined} class={classes(menubarItemClass, inset && 'radcn-menu-item--inset', className)} data-disabled={disabled ? 'true' : undefined} data-highlighted="false" data-radcn-menubar-radio-item data-radcn-menu-item data-radcn-menu-radio-item="true" data-state="unchecked" data-text={textValue} data-value={value} role="menuitemradio" style={style} tabIndex={-1} type="button"><span class={menuItemIndicatorClass} data-radcn-menubar-item-indicator data-radcn-menu-item-indicator hidden>●</span>{children}</button>
  }
}

export function MenubarItemIndicator(handle: Handle<MenubarPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props
    return <span class={classes(menuItemIndicatorClass, className)} data-radcn-menubar-item-indicator data-radcn-menu-item-indicator style={style}>{children || '✓'}</span>
  }
}

export function MenubarSeparator(handle: Handle<MenubarPartProps>) {
  return () => {
    let { class: className, style } = handle.props
    return <div class={classes(menubarSeparatorClass, className)} data-radcn-menubar-separator data-radcn-menu-separator role="separator" style={style} />
  }
}

export function MenubarShortcut(handle: Handle<MenubarPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props
    return <span class={classes(menubarShortcutClass, className)} data-radcn-menubar-shortcut data-radcn-menu-shortcut style={style}>{children}</span>
  }
}

export function MenubarSub(handle: Handle<MenubarPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props
    return <div class={classes(className)} data-radcn-menubar-sub data-radcn-menu-sub style={style}>{children}</div>
  }
}

export function MenubarSubTrigger(handle: Handle<MenubarItemProps>) {
  return () => {
    let { children, class: className, disabled, inset, style, textValue } = handle.props
    let id = `radcn-menubar-sub-${Math.random().toString(36).slice(2)}`
    return <button aria-controls={id} aria-disabled={disabled ? 'true' : undefined} aria-expanded="false" aria-haspopup="menu" class={classes(menubarItemClass, inset && 'radcn-menu-item--inset', className)} data-disabled={disabled ? 'true' : undefined} data-highlighted="false" data-radcn-menubar-sub-trigger data-radcn-menu-item data-radcn-menu-sub-trigger="true" data-state="closed" data-text={textValue} role="menuitem" style={style} tabIndex={-1} type="button">{children}<span class={menuSubCaretClass} aria-hidden="true">›</span></button>
  }
}

export function MenubarSubContent(handle: Handle<MenubarContentProps>) {
  return () => {
    let { children, class: className, style } = handle.props
    return <div class={classes(menubarContentClass, className)} data-radcn-menubar-sub-content data-radcn-menu-sub-content data-state="closed" hidden role="menu" style={style}>{children}</div>
  }
}
