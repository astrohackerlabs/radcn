import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'
import { setupMenuOverlay } from '../utils/menu-overlay.ts'
import { menuContentClass, menuGroupClass, menuItemClass, menuLabelClass, menuPortalClass, menuRootClass, menuSeparatorClass, menuShortcutClass, menuSubClass } from './dropdown-menu.tsx'
import type {
  DropdownMenuContentProps,
  DropdownMenuItemProps,
  DropdownMenuItemVariant,
  DropdownMenuPartProps,
  DropdownMenuRadioGroupProps,
  DropdownMenuRadioItemProps,
} from './dropdown-menu.tsx'

export type ContextMenuItemVariant = DropdownMenuItemVariant

export interface ContextMenuProps {
  children?: RemixNode
  class?: string
  defaultOpen?: boolean
  id?: string
  style?: string
}

export interface ContextMenuTriggerProps extends DropdownMenuPartProps {
  ariaLabel?: string
}

export function enhanceContextMenu(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-radcn-context-menu]').forEach((menu) => {
    setupMenuOverlay(menu, {
      align: 'start',
      contentSelector: '[data-radcn-context-menu-content]',
      itemSelector: '[data-radcn-menu-item]',
      kind: 'context',
      portalSelector: '[data-radcn-context-menu-portal]',
      readyDataKey: 'radcnContextMenuReady',
      rootSelector: '[data-radcn-context-menu]',
      side: 'bottom',
      sideOffset: 4,
      subContentSelector: '[data-radcn-context-menu-sub-content]',
      subTriggerSelector: '[data-radcn-context-menu-sub-trigger]',
      triggerSelector: '[data-radcn-context-menu-trigger]',
    })
  })
}

export function ContextMenu(handle: Handle<ContextMenuProps>) {
  return () => {
    let { children, class: className, defaultOpen, id, style } = handle.props

    return <div class={classes(menuRootClass, className)} data-default-open={defaultOpen ? 'true' : undefined} data-radcn-context-menu data-state={defaultOpen ? 'open' : 'closed'} id={id} style={style}>{children}</div>
  }
}

export function ContextMenuTrigger(handle: Handle<ContextMenuTriggerProps>) {
  return () => {
    let { ariaLabel, children, class: className, style } = handle.props

    return <div aria-label={ariaLabel} class={classes('radcn-context-menu-trigger', className)} data-radcn-context-menu-trigger data-state="closed" role="button" style={style} tabIndex={0}>{children}</div>
  }
}

export function ContextMenuPortal(handle: Handle<DropdownMenuPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return <div class={classes(menuPortalClass, className)} data-radcn-context-menu-portal data-state="closed" hidden style={style}>{children}</div>
  }
}

export function ContextMenuContent(handle: Handle<DropdownMenuContentProps>) {
  return () => {
    let { align = 'start', children, class: className, side = 'bottom', sideOffset = 4, style } = handle.props

    return <div class={classes(menuContentClass, className)} data-align={align} data-radcn-context-menu-content data-side={side} data-side-offset={String(sideOffset)} data-state="closed" hidden style={style}>{children}</div>
  }
}

export function ContextMenuGroup(handle: Handle<DropdownMenuPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return <div class={classes(menuGroupClass, className)} data-radcn-context-menu-group data-radcn-menu-group role="group" style={style}>{children}</div>
  }
}

export function ContextMenuLabel(handle: Handle<DropdownMenuPartProps>) {
  return () => {
    let { children, class: className, inset, style } = handle.props

    return <div class={classes(menuLabelClass, inset && 'radcn-menu-label--inset', className)} data-inset={inset ? 'true' : undefined} data-radcn-context-menu-label data-radcn-menu-label style={style}>{children}</div>
  }
}

export function ContextMenuItem(handle: Handle<DropdownMenuItemProps>) {
  return () => {
    let { children, class: className, disabled, inset, style, textValue, variant = 'default' } = handle.props

    return <button aria-disabled={disabled ? 'true' : undefined} class={classes(menuItemClass, `radcn-menu-item--${variant}`, inset && 'radcn-menu-item--inset', className)} data-disabled={disabled ? 'true' : undefined} data-highlighted="false" data-radcn-context-menu-item data-radcn-menu-item data-text={textValue} data-variant={variant} role="menuitem" style={style} tabIndex={-1} type="button">{children}</button>
  }
}

export function ContextMenuCheckboxItem(handle: Handle<DropdownMenuItemProps & { checked?: boolean }>) {
  return () => {
    let { checked, children, class: className, disabled, inset, style, textValue } = handle.props

    return <button aria-checked={checked ? 'true' : 'false'} aria-disabled={disabled ? 'true' : undefined} class={classes(menuItemClass, inset && 'radcn-menu-item--inset', className)} data-checked={checked ? 'true' : 'false'} data-disabled={disabled ? 'true' : undefined} data-highlighted="false" data-radcn-context-menu-checkbox-item data-radcn-menu-checkbox-item="true" data-radcn-menu-item data-state={checked ? 'checked' : 'unchecked'} data-text={textValue} role="menuitemcheckbox" style={style} tabIndex={-1} type="button"><span class="radcn-menu-item-indicator" data-radcn-menu-item-indicator hidden={!checked}>✓</span>{children}</button>
  }
}

export function ContextMenuRadioGroup(handle: Handle<DropdownMenuRadioGroupProps>) {
  return () => {
    let { children, class: className, style, value } = handle.props

    return <div class={classes(menuGroupClass, className)} data-radcn-context-menu-radio-group data-radcn-menu-radio-group data-value={value} role="group" style={style}>{children}</div>
  }
}

export function ContextMenuRadioItem(handle: Handle<DropdownMenuRadioItemProps>) {
  return () => {
    let { children, class: className, disabled, inset, style, textValue, value } = handle.props

    return <button aria-checked="false" aria-disabled={disabled ? 'true' : undefined} class={classes(menuItemClass, inset && 'radcn-menu-item--inset', className)} data-disabled={disabled ? 'true' : undefined} data-highlighted="false" data-radcn-context-menu-radio-item data-radcn-menu-item data-radcn-menu-radio-item="true" data-state="unchecked" data-text={textValue} data-value={value} role="menuitemradio" style={style} tabIndex={-1} type="button"><span class="radcn-menu-item-indicator" data-radcn-menu-item-indicator hidden>●</span>{children}</button>
  }
}

export function ContextMenuSeparator(handle: Handle<DropdownMenuPartProps>) {
  return () => {
    let { class: className, style } = handle.props

    return <div class={classes(menuSeparatorClass, className)} data-radcn-context-menu-separator data-radcn-menu-separator role="separator" style={style} />
  }
}

export function ContextMenuShortcut(handle: Handle<DropdownMenuPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return <span class={classes(menuShortcutClass, className)} data-radcn-context-menu-shortcut data-radcn-menu-shortcut style={style}>{children}</span>
  }
}

export function ContextMenuSub(handle: Handle<DropdownMenuPartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return <div class={classes(menuSubClass, className)} data-radcn-context-menu-sub data-radcn-menu-sub style={style}>{children}</div>
  }
}

export function ContextMenuSubTrigger(handle: Handle<DropdownMenuItemProps>) {
  return () => {
    let { children, class: className, disabled, inset, style, textValue } = handle.props
    let id = `radcn-context-sub-${Math.random().toString(36).slice(2)}`

    return <button aria-controls={id} aria-disabled={disabled ? 'true' : undefined} aria-expanded="false" aria-haspopup="menu" class={classes(menuItemClass, inset && 'radcn-menu-item--inset', className)} data-disabled={disabled ? 'true' : undefined} data-highlighted="false" data-radcn-context-menu-sub-trigger data-radcn-menu-item data-radcn-menu-sub-trigger="true" data-state="closed" data-text={textValue} role="menuitem" style={style} tabIndex={-1} type="button">{children}<span class="radcn-menu-sub-caret" aria-hidden="true">›</span></button>
  }
}

export function ContextMenuSubContent(handle: Handle<DropdownMenuContentProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return <div class={classes(menuContentClass, className)} data-radcn-context-menu-sub-content data-radcn-menu-sub-content data-state="closed" hidden role="menu" style={style}>{children}</div>
  }
}
