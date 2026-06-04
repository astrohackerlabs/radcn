import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'
import { setupMenuOverlay } from '../utils/menu-overlay.ts'

export type DropdownMenuAlign = 'start' | 'center' | 'end'
export type DropdownMenuSide = 'top' | 'right' | 'bottom' | 'left'
export type DropdownMenuItemVariant = 'default' | 'destructive'

export interface DropdownMenuProps {
  children?: RemixNode
  class?: string
  defaultOpen?: boolean
  id?: string
  style?: string
}

export interface DropdownMenuPartProps {
  children?: RemixNode
  class?: string
  inset?: boolean
  style?: string
}

export interface DropdownMenuTriggerProps extends DropdownMenuPartProps {
  ariaLabel?: string
}

export interface DropdownMenuContentProps extends DropdownMenuPartProps {
  align?: DropdownMenuAlign
  side?: DropdownMenuSide
  sideOffset?: number
}

export interface DropdownMenuItemProps extends DropdownMenuPartProps {
  disabled?: boolean
  textValue?: string
  variant?: DropdownMenuItemVariant
}

export interface DropdownMenuCheckboxItemProps extends DropdownMenuItemProps {
  checked?: boolean
}

export interface DropdownMenuRadioGroupProps extends DropdownMenuPartProps {
  value?: string
}

export interface DropdownMenuRadioItemProps extends DropdownMenuItemProps {
  value: string
}

export function enhanceDropdownMenu(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-radcn-dropdown-menu]').forEach((menu) => {
    setupMenuOverlay(menu, {
      align: 'start',
      contentSelector: '[data-radcn-dropdown-menu-content]',
      itemSelector: '[data-radcn-menu-item]',
      kind: 'dropdown',
      portalSelector: '[data-radcn-dropdown-menu-portal]',
      readyDataKey: 'radcnDropdownMenuReady',
      rootSelector: '[data-radcn-dropdown-menu]',
      side: 'bottom',
      sideOffset: 4,
      subContentSelector: '[data-radcn-dropdown-menu-sub-content]',
      subTriggerSelector: '[data-radcn-dropdown-menu-sub-trigger]',
      triggerSelector: '[data-radcn-dropdown-menu-trigger]',
    })
  })
}

export function DropdownMenu(handle: Handle<DropdownMenuProps>) {
  return () => {
    let { children, class: className, defaultOpen, id, style } = handle.props

    return (
      <div class={classes('radcn-dropdown-menu', className)} data-default-open={defaultOpen ? 'true' : undefined} data-radcn-dropdown-menu data-state={defaultOpen ? 'open' : 'closed'} id={id} style={style}>
        {children}
      </div>
    )
  }
}

export function DropdownMenuTrigger(handle: Handle<DropdownMenuTriggerProps>) {
  return () => {
    let { ariaLabel, children, class: className, style } = handle.props

    return <button aria-label={ariaLabel} class={classes('radcn-dropdown-menu-trigger', className)} data-radcn-dropdown-menu-trigger data-state="closed" type="button" style={style}>{children}</button>
  }
}

export function DropdownMenuPortal(handle: Handle<DropdownMenuPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return <div class={classes('radcn-dropdown-menu-portal', className)} data-radcn-dropdown-menu-portal data-state="closed" hidden style={style}>{children}</div>
  }
}

export function DropdownMenuContent(handle: Handle<DropdownMenuContentProps>) {
  return () => {
    let { align = 'start', children, class: className, side = 'bottom', sideOffset = 4, style } = handle.props

    return (
      <div class={classes('radcn-dropdown-menu-content', className)} data-align={align} data-radcn-dropdown-menu-content data-side={side} data-side-offset={String(sideOffset)} data-state="closed" hidden style={style}>
        {children}
      </div>
    )
  }
}

export function DropdownMenuGroup(handle: Handle<DropdownMenuPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return <div class={classes('radcn-dropdown-menu-group', className)} data-radcn-dropdown-menu-group data-radcn-menu-group role="group" style={style}>{children}</div>
  }
}

export function DropdownMenuLabel(handle: Handle<DropdownMenuPartProps>) {
  return () => {
    let { children, class: className, inset, style } = handle.props

    return <div class={classes('radcn-dropdown-menu-label', inset && 'radcn-menu-label--inset', className)} data-inset={inset ? 'true' : undefined} data-radcn-dropdown-menu-label data-radcn-menu-label style={style}>{children}</div>
  }
}

export function DropdownMenuItem(handle: Handle<DropdownMenuItemProps>) {
  return () => {
    let { children, class: className, disabled, inset, style, textValue, variant = 'default' } = handle.props

    return <button aria-disabled={disabled ? 'true' : undefined} class={classes('radcn-dropdown-menu-item', `radcn-menu-item--${variant}`, inset && 'radcn-menu-item--inset', className)} data-disabled={disabled ? 'true' : undefined} data-highlighted="false" data-radcn-dropdown-menu-item data-radcn-menu-item data-text={textValue} data-variant={variant} role="menuitem" style={style} tabIndex={-1} type="button">{children}</button>
  }
}

export function DropdownMenuCheckboxItem(handle: Handle<DropdownMenuCheckboxItemProps>) {
  return () => {
    let { checked, children, class: className, disabled, inset, style, textValue } = handle.props

    return (
      <button aria-checked={checked ? 'true' : 'false'} aria-disabled={disabled ? 'true' : undefined} class={classes('radcn-dropdown-menu-checkbox-item', inset && 'radcn-menu-item--inset', className)} data-checked={checked ? 'true' : 'false'} data-disabled={disabled ? 'true' : undefined} data-highlighted="false" data-radcn-dropdown-menu-checkbox-item data-radcn-menu-checkbox-item="true" data-radcn-menu-item data-state={checked ? 'checked' : 'unchecked'} data-text={textValue} role="menuitemcheckbox" style={style} tabIndex={-1} type="button">
        <span class="radcn-menu-item-indicator" data-radcn-menu-item-indicator hidden={!checked}>✓</span>
        {children}
      </button>
    )
  }
}

export function DropdownMenuRadioGroup(handle: Handle<DropdownMenuRadioGroupProps>) {
  return () => {
    let { children, class: className, style, value } = handle.props

    return <div class={classes('radcn-dropdown-menu-radio-group', className)} data-radcn-dropdown-menu-radio-group data-radcn-menu-radio-group data-value={value} role="group" style={style}>{children}</div>
  }
}

export function DropdownMenuRadioItem(handle: Handle<DropdownMenuRadioItemProps>) {
  return () => {
    let { children, class: className, disabled, inset, style, textValue, value } = handle.props

    return (
      <button aria-checked="false" aria-disabled={disabled ? 'true' : undefined} class={classes('radcn-dropdown-menu-radio-item', inset && 'radcn-menu-item--inset', className)} data-disabled={disabled ? 'true' : undefined} data-highlighted="false" data-radcn-dropdown-menu-radio-item data-radcn-menu-item data-radcn-menu-radio-item="true" data-state="unchecked" data-text={textValue} data-value={value} role="menuitemradio" style={style} tabIndex={-1} type="button">
        <span class="radcn-menu-item-indicator" data-radcn-menu-item-indicator hidden>●</span>
        {children}
      </button>
    )
  }
}

export function DropdownMenuSeparator(handle: Handle<DropdownMenuPartProps>) {
  return () => {
    let { class: className, style } = handle.props

    return <div class={classes('radcn-dropdown-menu-separator', className)} data-radcn-dropdown-menu-separator data-radcn-menu-separator role="separator" style={style} />
  }
}

export function DropdownMenuShortcut(handle: Handle<DropdownMenuPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return <span class={classes('radcn-dropdown-menu-shortcut', className)} data-radcn-dropdown-menu-shortcut data-radcn-menu-shortcut style={style}>{children}</span>
  }
}

export function DropdownMenuSub(handle: Handle<DropdownMenuPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return <div class={classes('radcn-dropdown-menu-sub', className)} data-radcn-dropdown-menu-sub data-radcn-menu-sub style={style}>{children}</div>
  }
}

export function DropdownMenuSubTrigger(handle: Handle<DropdownMenuItemProps>) {
  return () => {
    let { children, class: className, disabled, inset, style, textValue } = handle.props
    let id = `radcn-dropdown-sub-${Math.random().toString(36).slice(2)}`

    return <button aria-controls={id} aria-disabled={disabled ? 'true' : undefined} aria-expanded="false" aria-haspopup="menu" class={classes('radcn-dropdown-menu-sub-trigger', inset && 'radcn-menu-item--inset', className)} data-disabled={disabled ? 'true' : undefined} data-highlighted="false" data-radcn-dropdown-menu-sub-trigger data-radcn-menu-item data-radcn-menu-sub-trigger="true" data-state="closed" data-text={textValue} role="menuitem" style={style} tabIndex={-1} type="button">{children}<span class="radcn-menu-sub-caret" aria-hidden="true">›</span></button>
  }
}

export function DropdownMenuSubContent(handle: Handle<DropdownMenuContentProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return <div class={classes('radcn-dropdown-menu-sub-content', className)} data-radcn-dropdown-menu-sub-content data-radcn-menu-sub-content data-state="closed" hidden role="menu" style={style}>{children}</div>
  }
}
